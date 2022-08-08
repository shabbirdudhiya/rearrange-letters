////////////////////////////////////////////////////////////
// EDIT TERMINALS
////////////////////////////////////////////////////////////
var edit = { show: true, xmlFile: '', templateFile: '', mode: 'landscape', sortNum: 0, templateNum: 0, categoryNum: 0, videoNum: 0, replay: false, con: '' };

/*!
 * 
 * EDIT READY
 * 
 */
$(function () {
	$.editor.enable = true;
});

function loadEditPage() {
	jQuery.ajax({
		url: "editTools.html", dataType: "html"
	}).done(function (responseHtml) {
		$("body").prepend(responseHtml);

		if ($('#mainHolder').hasClass('jsondata')) {
			$("#selectQuestionWrapper").remove();
			$("#removeQuestion").remove();
			$("#sortQuestion").remove();
			$("#actionCategory").remove();
			$("#actionSave").remove();
			$("#categoryWrapper").remove();
			$("#questionCategory").remove();
			$("#newQuestion").val('Choose Template');
			$('#addNewTemplate').val('Select');

			$('#templatelist').empty();
			for (var n = 0; n < edit.templateFile.length; n++) {
				$('#templatelist').append($("<option/>", {
					value: n,
					text: edit.templateFile[n].landscape.question.text
				}));
			};
		} else {
			loadTemplateXML('template.xml');
		}

		buildEditButtons();
		loadEditQuestion(true);

		$('#editWrapper').show();
		$('#gameHolder').addClass('editBorder');
		$('#option').hide();
	});
}

function buildEditButtons() {
	$('#toggleShowOption').click(function () {
		toggleShowOption();
	});

	$("#modelist").change(function () {
		if ($(this).val() != edit.mode) {
			edit.mode = $(this).val();
			gameData.mode = $(this).val();

			var modeValue = 'Landscape';
			if (edit.mode == 'landscape') {
				modeValue = 'Portrait';
			}

			$('#gameHolder').removeClass('portraitMode');

			if (gameData.mode == 'landscape') {
				gameData.targetArray = quesLandscape_arr;
				gameData.targetAudio = audioLandscape_arr;
			} else {
				$('#gameHolder').addClass('portraitMode');
				gameData.targetArray = quesPortrait_arr;
				gameData.targetAudio = audioPortrait_arr;
			}

			$('#updateQuestion').val('Update To ' + modeValue);

			loadEditQuestion(true);
			loadEditDescription();
			loadEditBackground();
			loadEditVideo();
			resizeGameFunc();
		}
	});

	buildQuestionList();

	$("#questionslist").change(function () {
		if ($(this).val() != '') {
			gameData.questionNum = Number($(this).val());
			gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
			edit.videoNum = 0;
			loadEditQuestion(true);
		}
	});

	$('#sortQuestion').click(function () {
		toggleEditOption('sort');
	});

	$('#newQuestion').click(function () {
		toggleEditOption('template');
	});

	$('#removeQuestion').click(function () {
		actionQuestion('remove');
	});

	$('#prevQuestion').click(function () {
		toggleQuestion(false);
	});

	$('#nextQuestion').click(function () {
		toggleQuestion(true);
	});

	$('#editCategory').click(function () {
		toggleEditOption('category');
	});

	$('#editQuestion').click(function () {
		toggleEditOption('question');
	});

	$('#editDescription').click(function () {
		toggleEditOption('description');
	});

	$('#editBackground').click(function () {
		toggleEditOption('background');
	});

	$('#editVideo').click(function () {
		toggleEditOption('video');
	});

	$('#generateXML').click(function () {
		generateXML();
	});

	$('#saveXML').click(function () {
		var n = prompt('Enter password to save.');
		if (n != null && n != "") {
			saveXML(n);
		}
	});

	$('#doneQuestion').click(function () {
		updateQuestion(edit.mode);
		toggleEditOption('');
	});

	$('#previewQuestion').click(function () {
		updateQuestion(edit.mode);
	});

	$('#updateQuestion').click(function () {
		updateQuestion('landscape');
		updateQuestion('portrait');
	});

	$("#questiontype").change(function () {
		gameData.targetArray[gameData.sequenceNum].type = $('#questiontype').val();
		toggleMultiOptions();
	});

	//template
	$('#doneTemplate').click(function () {
		toggleEditOption('');
	});

	$('#addNewTemplate').click(function () {
		actionQuestion('add');
	});

	$("#templatelist").change(function () {
		if ($(this).val() != gameData.templateNum) {
			gameData.templateNum = $(this).val();
		}
	});

	//sort
	$('#moveQuestionUp').click(function () {
		swapQuestion(false);
	});

	$('#moveQuestionDown').click(function () {
		swapQuestion(true);
	});

	$('#doneSort').click(function () {
		toggleEditOption('');
	});

	$("#sortquestionslist").change(function () {
		if ($(this).val() != '') {
			edit.sortNum = Number($(this).val());
		}
	});

	//category
	$("#categorylist").change(function () {
		if ($(this).val() != '') {
			var categoryIndex = edit.tempCategory.indexOf($(this).val());
			edit.categoryNum = categoryIndex;
			loadEditCategory();
		}
	});

	$('#addNewCategory').click(function () {
		actionCategory('add');
	});

	$('#addNewSubCategory').click(function () {
		actionCategory('addSub');
	});

	$('#removeCategory').click(function () {
		actionCategory('remove');
	});

	$('#updateCategory').click(function () {
		updateCategory();
	});

	$('#doneCategory').click(function () {
		updateCategory();
		toggleEditOption('');
	});

	//description
	$('#doneDescription').click(function () {
		updateDescription(edit.mode);
		toggleEditOption('');
	});

	$('#previewDescription').click(function () {
		updateDescription();
		playAudioLoop('description');
	});

	//background
	$('#doneBackground').click(function () {
		updateBackground(edit.mode);
		toggleEditOption('');
	});

	$('#previewBackground').click(function () {
		updateBackground();
	});

	//video
	$("#videoEmbed").change(function () {
		if ($(this).val() != '') {
			checkVideoArray($(this).val());
			loadEditVideo();
		}
	});

	$('#removeVideoContainer').click(function () {
		actionVideo('removeContainer');
	});

	$("#videoslist").change(function () {
		if ($(this).val() != '') {
			edit.videoNum = Number($(this).val());
			loadEditVideo();
		}
	});

	$('#prevVideo').click(function () {
		toggleVideo(false);
	});

	$('#nextVideo').click(function () {
		toggleVideo(true);
	});

	$('#removeVideo').click(function () {
		actionVideo('remove');
	});

	$('#addVideo').click(function () {
		actionVideo('add');
	});

	$('#doneVideo').click(function () {
		updateVideo(edit.mode);
		toggleEditOption('');
	});

	$('#previewVideo').click(function () {
		updateVideo(edit.mode);
	});
}

/*!
 * 
 * TOGGLE DISPLAY OPTION - This is the function that runs to toggle display option
 * 
 */

function toggleShowOption() {
	if (edit.show) {
		edit.show = false;
		$('#editOption').hide();
		$('#toggleShowOption').val('Show Edit Option');
	} else {
		edit.show = true;
		$('#editOption').show();
		$('#toggleShowOption').val('Hide Edit Option');
	}
}

function toggleEditOption(con) {
	edit.con = con;

	$('#actionWrapper').hide();
	$('#sortWrapper').hide();
	$('#templateWrapper').hide();
	$('#questionWrapper').hide();
	$('#descriptionWrapper').hide();
	$('#topWrapper').hide();
	$('#selectQuestionWrapper').hide();
	$('#backgroundWrapper').hide();
	$('#categoryWrapper').hide();

	$('#questionHolder').show();
	$('#descriptionHolder').show();
	$('#backgroundHolder').show();
	$('#videoWrapper').hide();

	if (con == 'sort') {
		$('#sortWrapper').show();
	} else if (con == 'template') {
		gameData.templateNum = -1;
		$('#templateWrapper').show();
	} else if (con == 'category') {
		$('#categoryWrapper').show();
		buildEditCategory();
	} else if (con == 'question') {
		$('#questionWrapper').show();
		$('#selectQuestionWrapper').show();
		$('#multipleWrapper').hide();
		playAudioLoop();
	} else if (con == 'description') {
		$('#descriptionWrapper').show();
		playAudioLoop('description');
	} else if (con == 'background') {
		$('#backgroundWrapper').show();
	} else if (con == 'video') {
		$('#videoWrapper').show();
	} else {
		$('#actionWrapper').show();
		$('#topWrapper').show();
		$('#selectQuestionWrapper').show();
	}

	setBorderFocus();
	loadEditQuestion(false);
}


/*!
 * 
 * TOGGLE QUESTION - This is the function that runs to toggle question
 * 
 */
function toggleQuestion(con) {
	if (con) {
		gameData.questionNum++;
		gameData.questionNum = gameData.questionNum > gameData.targetArray.length - 1 ? 0 : gameData.questionNum;
	} else {
		gameData.questionNum--;
		gameData.questionNum = gameData.questionNum < 0 ? gameData.targetArray.length - 1 : gameData.questionNum;
	}

	gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
	edit.videoNum = 0;
	$('#questionslist').prop("selectedIndex", gameData.sequenceNum);
	loadEditQuestion(true);
}

/*!
 * 
 * ACTION QUESTION - This is the function that runs to add/remove quesiton
 * 
 */
function actionQuestion(con) {
	if (con == 'add') {
		if (gameData.templateNum == -1) {
			alert('Please select a template to add');
			return;
		}
		toggleEditOption('');

		if ($('#mainHolder').hasClass('jsondata')) {
			pushJSONDataArray(edit.templateFile[gameData.templateNum]);
		} else {
			var newTemplate = $(edit.templateFile).find('item').eq(gameData.templateNum).clone();
			$(edit.xmlFile).find('questions').append(newTemplate);

			var lastArrayNum = gameData.targetArray.length;
			$(edit.xmlFile).find('item').each(function (questionIndex, questionElement) {
				if (lastArrayNum == questionIndex) {
					pushDataArray(questionIndex, questionElement);
				}
			});
		}

		filterCategoryQuestion();
		gameData.questionNum = gameData.targetArray.length - 1;
	} else {
		filterCategoryQuestion();
		quesLandscape_arr.splice(gameData.sequenceNum, 1);
		quesPortrait_arr.splice(gameData.sequenceNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).remove();

		gameData.questionNum = 0;
	}

	gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
	filterCategoryQuestion();
	buildQuestionList();
	loadEditQuestion(false);
}

/*!
 * 
 * LOAD EDIT QUESTION - This is the function that runs to load question value
 * 
 */
function loadEditQuestion(con) {
	$('#youtubeTypeWrapper').hide();
	$('#removeVideoContainer').hide();

	buildEditCategory();

	//edit question
	$('#category').val(gameData.targetArray[gameData.sequenceNum].category);

	var questionType = Number(gameData.targetArray[gameData.sequenceNum].type);

	$('#questiontype').prop("selectedIndex", questionType);
	$('#questionText').val(gameData.targetArray[gameData.sequenceNum].text);
	$('#questionAudio').val(gameData.targetArray[gameData.sequenceNum].audio);
	$('#questionFontSize').val(gameData.targetArray[gameData.sequenceNum].fontSize);
	$('#questionLineHeight').val(gameData.targetArray[gameData.sequenceNum].lineHeight);

	var questionX = gameData.targetArray[gameData.sequenceNum].x;
	questionX = questionX == undefined ? '' : questionX;
	var questionY = gameData.targetArray[gameData.sequenceNum].y;
	questionY = questionY == undefined ? '' : questionY;

	var questionSpaceX = gameData.targetArray[gameData.sequenceNum].spaceX;
	questionSpaceX = questionSpaceX == undefined ? '' : questionSpaceX;
	var questionSpaceY = gameData.targetArray[gameData.sequenceNum].spaceY;
	questionSpaceY = questionSpaceY == undefined ? '' : questionSpaceY;

	$('#questionPosition').val(questionX + ',' + questionY);
	$('#questionSpace').val(questionSpaceX + ',' + questionSpaceY);
	$('#questionColor').val(gameData.targetArray[gameData.sequenceNum].color);
	$('#questionWidth').val(gameData.targetArray[gameData.sequenceNum].width);
	$('#questionShadow').val(gameData.targetArray[gameData.sequenceNum].shadow);
	$('#questionShadowHover').val(gameData.targetArray[gameData.sequenceNum].shadowHover);

	var questionBottomX = gameData.targetArray[gameData.sequenceNum].bottomX;
	questionBottomX = questionBottomX == undefined ? '' : questionBottomX;
	var questionBottomY = gameData.targetArray[gameData.sequenceNum].bottomY;
	questionBottomY = questionBottomY == undefined ? '' : questionBottomY;

	var questionBottomSpaceX = gameData.targetArray[gameData.sequenceNum].bottomSpaceX;
	questionBottomSpaceX = questionBottomSpaceX == undefined ? '' : questionBottomSpaceX;
	var questionBottomSpaceY = gameData.targetArray[gameData.sequenceNum].bottomSpaceY;
	questionBottomSpaceY = questionBottomSpaceY == undefined ? '' : questionBottomSpaceY;

	$('#questionBottomFontSize').val(gameData.targetArray[gameData.sequenceNum].bottomFontSize);
	$('#questionBottomLineHeight').val(gameData.targetArray[gameData.sequenceNum].bottomLineHeight);
	$('#questionBottomPosition').val(questionBottomX + ',' + questionBottomY);
	$('#questionBottomSpace').val(questionBottomSpaceX + ',' + questionBottomSpaceY);
	$('#questionBottomColor').val(gameData.targetArray[gameData.sequenceNum].bottomColor);
	$('#questionBottomWidth').val(gameData.targetArray[gameData.sequenceNum].bottomWidth);

	loadEditDescription();
	loadEditBackground();

	//edit video
	if (gameData.targetArray[gameData.sequenceNum].videos[0] != undefined) {
		$('#videoslist').empty();
		for (n = 0; n < gameData.targetArray[gameData.sequenceNum].videos[0].types.length; n++) {
			$('#videoslist').append($("<option/>", {
				value: n,
				text: 'Video Type ' + (n + 1) + ' : (' + gameData.targetArray[gameData.sequenceNum].videos[0].types[n].type + ')'
			}));
		}
		$('#videoslist').prop("selectedIndex", edit.videoNum);
		loadEditVideo();
	} else {
		$('#videoslist').empty();
		$('#videoSrc').val('');
		$('#youtubeSrc').val('');
	}

	edit.replay = con;

	toggleMultiOptions();
	loadQuestion();
}

function toggleMultiOptions() {
	var questionType = Number(gameData.targetArray[gameData.sequenceNum].type);
	var multi_arr = [1, 2];
	if (multi_arr.indexOf(questionType) != -1) {
		$('#multipleWrapper').show();
	} else {
		$('#multipleWrapper').hide();
	}
}

/*!
 * 
 * LOAD EDIT DESCRIPTION - This is the function that runs to load description value
 * 
 */
function loadEditDescription() {
	var descriptionType = gameData.targetArray[gameData.sequenceNum].description.type == 'image' ? 1 : 0;
	$('#descriptiontype').prop("selectedIndex", descriptionType);

	var descriptionAlign = gameData.targetArray[gameData.sequenceNum].description.align;
	if (descriptionAlign == undefined) {
		descriptionAlign = 1;
	} else {
		if (descriptionAlign == 'left') {
			descriptionAlign = 0;
		} else if (descriptionAlign == 'center') {
			descriptionAlign = 1;
		} else {
			descriptionAlign = 2;
		}
	}

	$('#descriptionText').val(gameData.targetArray[gameData.sequenceNum].description.text);
	$('#descriptionFontSize').val(gameData.targetArray[gameData.sequenceNum].description.fontSize);
	$('#descriptionLineHeight').val(gameData.targetArray[gameData.sequenceNum].description.lineHeight);
	$('#descriptionWidth').val(gameData.targetArray[gameData.sequenceNum].description.width);
	$('#descriptionHeight').val(gameData.targetArray[gameData.sequenceNum].description.height);
	$('#descriptionTop').val(gameData.targetArray[gameData.sequenceNum].description.top);
	$('#descriptionLeft').val(gameData.targetArray[gameData.sequenceNum].description.left);
	$('#descriptionColor').val(gameData.targetArray[gameData.sequenceNum].description.color);
	$('#descriptionAlign').prop("selectedIndex", descriptionAlign);
	$('#descriptionAudio').val(gameData.targetArray[gameData.sequenceNum].description.audio);

	setBorderFocus();
}

/*!
 * 
 * LOAD EDIT DESCRIPTION - This is the function that runs to load description value
 * 
 */
function loadEditBackground() {
	$('#backgroundPath').val(gameData.targetArray[gameData.sequenceNum].background.text);
	$('#backgroundWidth').val(gameData.targetArray[gameData.sequenceNum].background.width);
	$('#backgroundHeight').val(gameData.targetArray[gameData.sequenceNum].background.height);
	$('#backgroundTop').val(gameData.targetArray[gameData.sequenceNum].background.top);
	$('#backgroundLeft').val(gameData.targetArray[gameData.sequenceNum].background.left);

	setBorderFocus();
}

/*!
 * 
 * UPDATE QUESTION - This is the function that runs to update question value
 * 
 */
function updateQuestion() {
	//update array
	quesLandscape_arr[gameData.sequenceNum].category = $('#category').val();
	quesPortrait_arr[gameData.sequenceNum].category = $('#category').val();

	var questionFontSize = $('#questionFontSize').val();
	questionFontSize = questionFontSize == 0 ? undefined : questionFontSize;
	var questionLineHeight = $('#questionLineHeight').val();
	questionLineHeight = questionLineHeight == 0 ? undefined : questionLineHeight;
	var quetionPosition = $('#questionPosition').val().split(',');
	var questionX = quetionPosition[0];
	questionX = questionX == 0 ? undefined : questionX;
	var questionY = quetionPosition[1];
	questionY = questionY == 0 ? undefined : questionY;
	var quetionSpace = $('#questionSpace').val().split(',');
	var questionSpaceX = quetionSpace[0];
	questionSpaceX = questionSpaceX == 0 ? undefined : questionSpaceX;
	var questionSpaceY = quetionSpace[1];
	questionSpaceY = questionSpaceY == 0 ? undefined : questionSpaceY;
	var questionWidth = $('#questionWidth').val();
	questionWidth = questionWidth == 0 ? undefined : questionWidth;
	var questionShadow = $('#questionShadow').val();
	questionShadow = questionShadow == 0 ? undefined : questionShadow;
	var questionShadowHover = $('#questionShadowHover').val();
	questionShadowHover = questionShadowHover == 0 ? undefined : questionShadowHover;

	var questionBottomFontSize = $('#questionBottomFontSize').val();
	questionBottomFontSize = questionBottomFontSize == 0 ? undefined : questionBottomFontSize;
	var questionBottomLineHeight = $('#questionBottomLineHeight').val();
	questionBottomLineHeight = questionBottomLineHeight == 0 ? undefined : questionBottomLineHeight;

	var quetionBottomPosition = $('#questionBottomPosition').val().split(',');
	var questionBottomX = quetionBottomPosition[0];
	questionBottomX = questionBottomX == 0 ? undefined : questionBottomX;
	var questionBottomY = quetionBottomPosition[1];
	questionBottomY = questionBottomY == 0 ? undefined : questionBottomY;
	var questionBottomSpace = $('#questionBottomSpace').val().split(',');
	var questionBottomSpaceX = questionBottomSpace[0];
	questionBottomSpaceX = questionBottomSpaceX == 0 ? undefined : questionBottomSpaceX;
	var questionBottomSpaceY = questionBottomSpace[1];
	questionBottomSpaceY = questionBottomSpaceY == 0 ? undefined : questionBottomSpaceY;
	var questionBottomWidth = $('#questionBottomWidth').val();
	questionBottomWidth = questionBottomWidth == 0 ? undefined : questionBottomWidth;

	gameData.targetArray[gameData.sequenceNum].type = $('#questiontype').val();
	gameData.targetArray[gameData.sequenceNum].fontSize = questionFontSize;
	gameData.targetArray[gameData.sequenceNum].lineHeight = questionLineHeight;
	gameData.targetArray[gameData.sequenceNum].x = questionX;
	gameData.targetArray[gameData.sequenceNum].y = questionY;
	gameData.targetArray[gameData.sequenceNum].spaceX = questionSpaceX;
	gameData.targetArray[gameData.sequenceNum].spaceY = questionSpaceY;
	gameData.targetArray[gameData.sequenceNum].text = $('#questionText').val();
	gameData.targetArray[gameData.sequenceNum].audio = $('#questionAudio').val();
	gameData.targetArray[gameData.sequenceNum].color = $('#questionColor').val();
	gameData.targetArray[gameData.sequenceNum].width = questionWidth;
	gameData.targetArray[gameData.sequenceNum].shadow = questionShadow;
	gameData.targetArray[gameData.sequenceNum].shadowHover = questionShadowHover;

	gameData.targetArray[gameData.sequenceNum].bottomFontSize = questionBottomFontSize;
	gameData.targetArray[gameData.sequenceNum].bottomLineHeight = questionBottomLineHeight;
	gameData.targetArray[gameData.sequenceNum].bottomX = questionBottomX;
	gameData.targetArray[gameData.sequenceNum].bottomY = questionBottomY;
	gameData.targetArray[gameData.sequenceNum].bottomSpaceX = questionBottomSpaceX;
	gameData.targetArray[gameData.sequenceNum].bottomSpaceY = questionBottomSpaceY;
	gameData.targetArray[gameData.sequenceNum].bottomColor = $('#questionBottomColor').val();
	gameData.targetArray[gameData.sequenceNum].bottomWidth = questionBottomWidth;

	//update XML
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find('category').text($('#category').val());

	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('type', $('#questiontype').val());

	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').html('<![CDATA[' + $('#questionText').val() + ']]>');

	updateXMLFirst('question', 'audio', $('#questionAudio').val());
	updateXMLFirst('question', 'fontSize', questionFontSize, true);
	updateXMLFirst('question', 'lineHeight', questionLineHeight, true);
	updateXMLFirst('question', 'x', questionLineHeight, true);
	updateXMLFirst('question', 'questionX', questionX, true);
	updateXMLFirst('question', 'questionY', questionY, true);
	updateXMLFirst('question', 'questionSpaceX', questionSpaceX, true);
	updateXMLFirst('question', 'questionSpaceY', questionSpaceY, true);
	updateXMLFirst('question', 'questionSpaceY', questionShadow, true);
	updateXMLFirst('question', 'questionSpaceY', questionShadowHover, true);
	updateXMLFirst('question', 'questionSpaceY', questionBottomFontSize, true);
	updateXMLFirst('question', 'questionSpaceY', questionBottomLineHeight, true);
	updateXMLFirst('question', 'questionSpaceY', questionBottomX, true);
	updateXMLFirst('question', 'questionSpaceY', questionBottomY, true);
	updateXMLFirst('question', 'questionSpaceY', questionBottomSpaceX, true);
	updateXMLFirst('question', 'questionSpaceY', questionBottomSpaceY, true);
	updateXMLFirst('question', 'questionSpaceY', questionBottomWidth, true);
	updateXMLFirst('question', 'color', $('#questionColor').val());
	updateXMLFirst('question', 'color', $('#questionBottomColor').val());
	updateXMLFirst('question', 'color', $('#questionBottomColor').val());

	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE EXPLANATION - This is the function that runs to update explanation value
 * 
 */
function updateDescription() {
	//update array
	var descriptionFontSize = $('#descriptionFontSize').val();
	descriptionFontSize = descriptionFontSize == 0 ? undefined : descriptionFontSize;
	var descriptionLineHeight = $('#descriptionLineHeight').val();
	descriptionLineHeight = descriptionLineHeight == 0 ? undefined : descriptionLineHeight;
	var descriptionTop = $('#descriptionTop').val();
	descriptionTop = descriptionTop == 0 ? undefined : descriptionTop;
	var descriptionLeft = $('#descriptionLeft').val();
	descriptionLeft = descriptionLeft == 0 ? undefined : descriptionLeft;
	var descriptionWidth = $('#descriptionWidth').val();
	descriptionWidth = descriptionWidth == 0 ? undefined : descriptionWidth;
	var descriptionHeight = $('#descriptionHeight').val();
	descriptionHeight = descriptionHeight == 0 ? undefined : descriptionHeight;

	gameData.targetArray[gameData.sequenceNum].description.type = $('#descriptiontype').val();
	gameData.targetArray[gameData.sequenceNum].description.fontSize = descriptionFontSize;
	gameData.targetArray[gameData.sequenceNum].description.lineHeight = descriptionLineHeight;
	gameData.targetArray[gameData.sequenceNum].description.align = $('#descriptionAlign').val();
	gameData.targetArray[gameData.sequenceNum].description.top = descriptionTop;
	gameData.targetArray[gameData.sequenceNum].description.left = descriptionLeft;
	gameData.targetArray[gameData.sequenceNum].description.width = descriptionWidth;
	gameData.targetArray[gameData.sequenceNum].description.height = descriptionHeight;
	gameData.targetArray[gameData.sequenceNum].description.text = $('#descriptionText').val();
	gameData.targetArray[gameData.sequenceNum].description.color = $('#descriptionColor').val();
	gameData.targetArray[gameData.sequenceNum].description.audio = $('#descriptionAudio').val();

	if ($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('description').length == 0) {
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<description />');
	}

	//update XML
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('description').attr('type', $('#descriptiontype').val());

	if ($('#descriptiontype').val() == 'text') {
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('description').html('<![CDATA[' + $('#descriptionText').val() + ']]>');
	} else {
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('description').html($('#descriptionText').val());
	}

	updateXMLChild('description', 'fontSize', descriptionFontSize, true);
	updateXMLChild('description', 'lineHeight', descriptionLineHeight, true);
	updateXMLChild('description', 'top', descriptionTop, true);
	updateXMLChild('description', 'left', descriptionLeft, true);
	updateXMLChild('description', 'width', descriptionWidth, true);
	updateXMLChild('description', 'height', descriptionHeight, true);
	updateXMLChild('description', 'align', $('#descriptionAlign').val());
	updateXMLChild('description', 'audio', $('#descriptionAudio').val());
	updateXMLChild('description', 'color', $('#descriptionColor').val());

	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE BACKGROUND - This is the function that runs to update explanation value
 * 
 */
function updateBackground() {
	//update array
	var bgTop = $('#backgroundTop').val();
	bgTop = bgTop == 0 ? undefined : bgTop;
	var bgLeft = $('#backgroundLeft').val();
	bgLeft = bgLeft == 0 ? undefined : bgLeft;
	var bgWidth = $('#backgroundWidth').val();
	bgWidth = bgWidth == 0 ? undefined : bgWidth;
	var bgHeight = $('#backgroundHeight').val();
	bgHeight = bgHeight == 0 ? undefined : bgHeight;

	gameData.targetArray[gameData.sequenceNum].background.top = bgTop;
	gameData.targetArray[gameData.sequenceNum].background.left = bgLeft;
	gameData.targetArray[gameData.sequenceNum].background.width = bgWidth;
	gameData.targetArray[gameData.sequenceNum].background.height = bgHeight;
	gameData.targetArray[gameData.sequenceNum].background.text = $('#backgroundPath').val();

	if ($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('background').length == 0) {
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<background />');
	}

	//update XML
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('background').html($('#backgroundPath').val());

	updateXMLChild('background', 'left', bgLeft, true);
	updateXMLChild('background', 'top', bgTop, true);
	updateXMLChild('background', 'width', bgWidth, true);
	updateXMLChild('background', 'height', bgHeight, true);

	loadEditQuestion(true);
}

/*!
 * 
 * GENERATE ARRAY - This is the function that runs to generate array
 * 
 */
function generateXML() {
	var xmlstr = edit.xmlFile.xml ? edit.xmlFile.xml : (new XMLSerializer()).serializeToString(edit.xmlFile);
	$('#outputXML').val(xmlstr);
}

function saveXML(pass) {
	var xmlstr = edit.xmlFile.xml ? edit.xmlFile.xml : (new XMLSerializer()).serializeToString(edit.xmlFile);

	$.ajax({
		type: "POST",
		url: "save.php",
		data: {
			password: pass,
			data: xmlstr
		}

	}).done(function (o) {
		try {
			$.parseJSON(o);
		} catch (e) {
			alert('Error, file cannot save!');
		}

		var data = $.parseJSON(o);
		if (!data || data === null) {
			alert('Error, file cannot save!');
		} else {
			if (data.status == true) {
				alert('File save successful!');
			} else {
				if (data.option == true) {
					alert('Wrong password, file cannot save!');
				} else {
					alert('Save option disabled!');
				}
			}
		}
	});
}

/*!
 * 
 * LOAD TEMPLATE XML - This is the function that runs to load template xml file
 * 
 */
function loadTemplateXML(src) {
	$.ajax({
		url: src,
		type: "GET",
		dataType: "xml",
		success: function (result) {
			edit.templateFile = result;

			$('#templatelist').empty();
			$(edit.templateFile).find('item').each(function (index, element) {
				$('#templatelist').append($("<option/>", {
					value: index,
					text: $(element).find('landscape type').text()
				}));
			});
		}
	});
}

/*!
 * 
 * SWAP QUESTION - This is the function that runs to swap question
 * 
 */
function swapQuestion(con) {
	var tmpLandscape = quesLandscape_arr[edit.sortNum];
	var tmpPortrait = quesPortrait_arr[edit.sortNum];
	var tmpXML = $(edit.xmlFile).find('item').eq(edit.sortNum).clone();

	edit.sortNum = Number(edit.sortNum);
	if (con) {
		if (edit.sortNum + 1 < quesLandscape_arr.length) {
			quesLandscape_arr[edit.sortNum] = quesLandscape_arr[edit.sortNum + 1];
			quesLandscape_arr[edit.sortNum + 1] = tmpLandscape;

			quesPortrait_arr[edit.sortNum] = quesPortrait_arr[edit.sortNum + 1];
			quesPortrait_arr[edit.sortNum + 1] = tmpPortrait;

			$(edit.xmlFile).find('item').eq(edit.sortNum).replaceWith($(edit.xmlFile).find('item').eq(edit.sortNum + 1).clone());
			$(edit.xmlFile).find('item').eq(edit.sortNum + 1).replaceWith(tmpXML);

			edit.sortNum++;
		}
	} else {
		if (edit.sortNum - 1 >= 0) {
			quesLandscape_arr[edit.sortNum] = quesLandscape_arr[edit.sortNum - 1];
			quesLandscape_arr[edit.sortNum - 1] = tmpLandscape;

			quesPortrait_arr[edit.sortNum] = quesPortrait_arr[edit.sortNum - 1];
			quesPortrait_arr[edit.sortNum - 1] = tmpPortrait;

			$(edit.xmlFile).find('item').eq(edit.sortNum).replaceWith($(edit.xmlFile).find('item').eq(edit.sortNum - 1).clone());
			$(edit.xmlFile).find('item').eq(edit.sortNum - 1).replaceWith(tmpXML);

			edit.sortNum--;
		}
	}

	filterCategoryQuestion();
	buildQuestionList();
	scrollSelectTo(edit.sortNum);
	loadEditQuestion(false);
}

function scrollSelectTo(num) {
	$('#sortquestionslist').prop("selectedIndex", edit.sortNum);
	var $s = $('#sortquestionslist');
	var optionTop = $s.find('[value="' + num + '"]').offset().top;
	var selectTop = $s.offset().top;
	$s.scrollTop($s.scrollTop() + (optionTop - selectTop));
}

/*!
 * 
 * BUILD CATEGORY LIST - This is the function that runs to build category list
 * 
 */
function buildEditCategory() {
	$('#categorylist').empty();
	$('#category').empty();

	edit.tempCategory = [];
	$(edit.xmlFile).find('thumb').each(function (index, element) {
		edit.tempCategory.push($(element).attr('name'));
	});

	var matchCategory = [];
	for (var n = 0; n < 5; n++) {
		var newCategory = [];
		var newSubCategory = [];

		$(edit.xmlFile).find('thumb').each(function (index, element) {
			if (n == 0) {
				if ($(element).attr('parent') == '' || $(element).attr('parent') == undefined) {
					matchCategory.push($(element).attr('name'));
					buildEditCategoryDD($(element).attr('name'), n);
				}
			} else {
				if (matchCategory.indexOf($(element).attr('parent')) != -1) {
					newCategory.unshift($(element).attr('name'));
					newSubCategory.unshift({ name: $(element).attr('name'), level: n, parent: $(element).attr('parent') });
				}
			}
		});

		if (n > 0) {
			if (newCategory.length > 0) {
				for (var s = 0; s < newSubCategory.length; s++) {
					buildEditCategoryDD(newSubCategory[s].name, newSubCategory[s].level, newSubCategory[s].parent);
				}
				matchCategory = newCategory;
			} else {
				n = 5;
			}
		}
	}

	edit.categoryNum = 0;
	$('#categorylist').prop("selectedIndex", 0);
	$('#category').prop("selectedIndex", 0);
	loadEditCategory();
}

function buildEditCategoryDD(name, level, parent) {
	if (level == 0) {
		$('#categorylist').append($("<option/>", {
			value: name,
			text: name
		}));

		$('#category').append($("<option/>", {
			value: name,
			text: name
		}));
	} else {
		var symbol = '';
		for (var s = 0; s < level; s++) {
			symbol += ' -  ';
		}

		$("#categorylist").val(parent);
		$('#categorylist option:selected').after($("<option/>", {
			value: name,
			text: symbol + name
		}));

		$("#category").val(parent);
		$('#category option:selected').after($("<option/>", {
			value: name,
			text: symbol + name
		}));
	}
}


/*!
 * 
 * LOAD CATEGORY VALUE - This is the function that runs to load category list
 * 
 */
function loadEditCategory() {
	$('#categoryName').val($(edit.xmlFile).find('thumb').eq(edit.categoryNum).attr('name'));
	$('#categoryThumbnail').val($(edit.xmlFile).find('thumb').eq(edit.categoryNum).text());
}

/*!
 * 
 * ACTION CATEGORY - This is the function that runs to action category
 * 
 */
function actionCategory(con) {
	if (con == 'add') {
		var newTemplate = '<thumb name="CATEGORY">assets/item_thumb.svg</thumb>';
		$(edit.xmlFile).find('category').eq(0).append(newTemplate);
	} else if (con == 'addSub') {
		var newTemplate = '<thumb name="CATEGORY" parent="' + $("#categorylist").val() + '">assets/item_thumb.png</thumb>';
		$(edit.xmlFile).find('category').eq(0).append(newTemplate);
	} else {
		$(edit.xmlFile).find('thumb').eq(edit.categoryNum).remove();
		removeQuestiosCategory();
		edit.categoryNum = 0;
	}

	buildEditCategory();
}

function removeQuestiosCategory() {
	var categoryArray = [];
	$(edit.xmlFile).find('thumb').each(function (index, element) {
		categoryArray.push($(element).attr('name'));
	});

	for (var n = 0; n < quesLandscape_arr.length; n++) {
		if (categoryArray.indexOf(quesLandscape_arr[n].category) == -1) {
			quesLandscape_arr[n].category = '';
			$(edit.xmlFile).find('item').eq(n).find('category').text('');
		}
	}

	for (var n = 0; n < quesPortrait_arr.length; n++) {
		if (categoryArray.indexOf(quesPortrait_arr[n].category) == -1) {
			quesPortrait_arr[n].category = '';
			$(edit.xmlFile).find('item').eq(n).find('category').text('');
		}
	}
}

/*!
 * 
 * UPDATE CATEGORY - This is the function that runs to update category
 * 
 */
function updateCategory() {
	$(edit.xmlFile).find('thumb').eq(edit.categoryNum).attr('name', $('#categoryName').val());
	$(edit.xmlFile).find('thumb').eq(edit.categoryNum).text($('#categoryThumbnail').val());
	buildEditCategory()
}

/*!
 * 
 * BUILD QUESTION LIST - This is the function that runs to build question list
 * 
 */
function buildQuestionList() {
	$('#questionslist').empty();
	$('#sortquestionslist').empty();

	for (n = 0; n < quesLandscape_arr.length; n++) {
		$('#questionslist').append($("<option/>", {
			value: n,
			text: 'Question ' + (n + 1) + ' : (' + quesLandscape_arr[n].text + ')'
		}));
		$('#sortquestionslist').append($("<option/>", {
			value: n,
			text: (n + 1) + ' : ' + quesLandscape_arr[n].text
		}));
	}

	$('#questionslist').prop("selectedIndex", gameData.sequenceNum);
}

/*!
 * 
 * TOGGLE VIDEOS - This is the function that runs to toggle video
 * 
 */
function toggleVideo(con) {
	if (con) {
		edit.videoNum++;
		edit.videoNum = edit.videoNum > gameData.targetArray[gameData.sequenceNum].videos[0].types.length - 1 ? 0 : edit.videoNum;
	} else {
		edit.videoNum--;
		edit.videoNum = edit.videoNum < 0 ? gameData.targetArray[gameData.sequenceNum].videos[0].types.length - 1 : edit.videoNum;
	}

	$('#videoslist').prop("selectedIndex", edit.videoNum);
	loadEditVideo();
}

/*!
 * 
 * ACTION VIDEO - This is the function that runs to add/remove video
 * 
 */
function actionVideo(con) {
	if (con == 'add') {
		if (gameData.targetArray[gameData.sequenceNum].videos[0] == undefined) {
			gameData.targetArray[gameData.sequenceNum].videos = [];
			gameData.targetArray[gameData.sequenceNum].videos.push({
				width: '',
				height: '',
				top: '',
				left: '',
				autoplay: true,
				controls: true,
				embed: 'html',
				types: []
			})
		}

		gameData.targetArray[gameData.sequenceNum].videos[0].types.push({
			src: '',
			type: 'video/mp4'
		});

		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').append('<video></video>');
		$('#videoSrc').val('');
		$('#youtubeSrc').val('');

		edit.videoNum = gameData.targetArray[gameData.sequenceNum].videos[0].types.length - 1;
		updateVideo();
	} else if (con == 'remove') {
		gameData.targetArray[gameData.sequenceNum].videos[0].types.splice(edit.videoNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).remove();

		edit.videoNum = 0;
		loadEditQuestion(false);
	} else {
		gameData.targetArray[gameData.sequenceNum].videos[0] = undefined;
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).remove();

		edit.videoNum = 0;
		loadEditQuestion(false);
	}
}

/*!
 * 
 * LOAD EDIT VIDEO - This is the function that runs to load video value
 * 
 */
function checkVideoArray(embed) {
	actionVideo('removeContainer');
	if (gameData.targetArray[gameData.sequenceNum].videos[0] == undefined) {
		actionVideo('add');
	}

	gameData.targetArray[gameData.sequenceNum].videos[0].embed = embed;
	edit.videoNum = 0;
}

function loadEditVideo() {
	if (gameData.targetArray[gameData.sequenceNum].videos[0] != undefined) {
		$('#removeVideoContainer').show();
	}

	if (gameData.targetArray[gameData.sequenceNum].videos[0] == undefined) {
		$('.resetVideo').val('');
		$('#videoAutoplay').prop("selectedIndex", 0);
		$('#videoControls').prop("selectedIndex", 0);
		return;
	}

	if (gameData.targetArray[gameData.sequenceNum].videos[0].types == undefined) {
		$('.resetVideo').val('');
		$('#videoAutoplay').prop("selectedIndex", 0);
		$('#videoControls').prop("selectedIndex", 0);
		return;
	}

	if (gameData.targetArray[gameData.sequenceNum].videos[0].types.length <= 0) {
		$('.resetVideo').val('');
		$('#videoAutoplay').prop("selectedIndex", 0);
		$('#videoControls').prop("selectedIndex", 0);
		return;
	}

	var videoEmbed = gameData.targetArray[gameData.sequenceNum].videos[0].embed == undefined ? 'html' : gameData.targetArray[gameData.sequenceNum].videos[0].embed;

	$('#videoTypeWrapper, #youtubeTypeWrapper').hide();

	if (videoEmbed == 'html') {
		$('#videoTypeWrapper').show();
		$('#videoAutoplayField').show();
		$('#videoControlsField').show();
	} else {
		$('#youtubeTypeWrapper').show();
		$('#videoAutoplayField').hide();
		$('#videoControlsField').hide();
	}

	var videoAutoplay = getEditBoolean(gameData.targetArray[gameData.sequenceNum].videos[0].autoplay);
	var videoControls = getEditBoolean(gameData.targetArray[gameData.sequenceNum].videos[0].controls);
	var videoType = gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].type;

	if (videoType == undefined) {
		videoType = 0;
	} else {
		if (videoType == 'video/mp4') {
			videoType = 0;
		} else if (videoType == 'video/webm') {
			videoType = 1;
		} else if (videoType == 'video/ogg') {
			videoType = 2;
		}
	}

	$('#videotype').prop("selectedIndex", videoType);
	if ($('#videoEmbed').val() == 'youtube') {
		$('#youtubeSrc').val(gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].src);
	} else {
		$('#videoSrc').val(gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].src);
	}
	$('#videoWidth').val(gameData.targetArray[gameData.sequenceNum].videos[0].width);
	$('#videoHeight').val(gameData.targetArray[gameData.sequenceNum].videos[0].height);
	$('#videoTop').val(gameData.targetArray[gameData.sequenceNum].videos[0].top);
	$('#videoLeft').val(gameData.targetArray[gameData.sequenceNum].videos[0].left);
	$('#videoEmbed').val(videoEmbed);
	$('#videoAutoplay').prop("selectedIndex", videoAutoplay);
	$('#videoControls').prop("selectedIndex", videoControls);
}

/*!
 * 
 * UPDATE VIDEO - This is the function that runs to update video value
 * 
 */
function updateVideo() {
	if (gameData.targetArray[gameData.sequenceNum].videos[0] == undefined) {
		return;
	}

	if (gameData.targetArray[gameData.sequenceNum].videos[0].types.length <= 0) {
		return;
	}

	//update array
	var videoWidth = $('#videoWidth').val();
	videoWidth = videoWidth == 0 ? undefined : videoWidth;
	var videoHeight = $('#videoHeight').val();
	videoHeight = videoHeight == 0 ? undefined : videoHeight;
	var videoTop = $('#videoTop').val();
	videoTop = videoTop == 0 ? undefined : videoTop;
	var videoLeft = $('#videoLeft').val();
	videoLeft = videoLeft == 0 ? undefined : videoLeft;

	gameData.targetArray[gameData.sequenceNum].videos[0].width = videoWidth;
	gameData.targetArray[gameData.sequenceNum].videos[0].height = videoHeight;
	gameData.targetArray[gameData.sequenceNum].videos[0].top = videoTop;
	gameData.targetArray[gameData.sequenceNum].videos[0].left = videoLeft;
	gameData.targetArray[gameData.sequenceNum].videos[0].autoplay = $('#videoAutoplay').val();
	gameData.targetArray[gameData.sequenceNum].videos[0].controls = $('#videoControls').val();
	gameData.targetArray[gameData.sequenceNum].videos[0].embed = $('#videoEmbed').val();

	if (gameData.targetArray[gameData.sequenceNum].videos[0].types.length > 0) {
		if ($('#videoEmbed').val() == 'youtube') {
			gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].src = $('#youtubeSrc').val();
			gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].type = 'youtube';
		} else {
			gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].src = $('#videoSrc').val();
			gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].type = $('#videotype').val();
		}
	}

	//update XML
	if ($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').length == 0) {
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<videos/>');
	}

	if ($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').length == 0) {
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').append('<video/>');
	}

	if (gameData.targetArray[gameData.sequenceNum].videos[0].types.length > 0) {
		if ($('#videoEmbed').val() == 'youtube') {
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).html('<![CDATA[' + $('#youtubeSrc').val() + ']]>');
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).attr('type', 'youtube');
		} else {
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).html($('#videoSrc').val());
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).attr('type', $('#videotype').val());
		}
	}

	updateXMLChild('videos', 'left', videoLeft, true);
	updateXMLChild('videos', 'top', videoTop, true);
	updateXMLChild('videos', 'width', videoWidth, true);
	updateXMLChild('videos', 'height', videoHeight, true);

	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('autoplay', $('#videoAutoplay').val());
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('controls', $('#videoControls').val());
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('embed', $('#videoEmbed').val());

	loadEditQuestion(true);
}

function updateXMLFirst(item, attr, val, number) {
	if (number) {
		if (isNaN(val) || val == '') {
			//not number
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).removeAttr(attr);
		} else {
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).attr(attr, val);
		}
	} else {
		if (val == '') {
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).removeAttr(attr);
		} else {
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).attr(attr, val);
		}
	}
}

function updateXMLChild(item, attr, val, number) {
	var editNum = 0;
	if (number) {
		if (isNaN(val) || val == '') {
			//not number
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).eq(editNum).removeAttr(attr);
		} else {
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).eq(editNum).attr(attr, val);
		}
	} else {
		if (val == '') {
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).eq(editNum).removeAttr(attr);
		} else {
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).eq(editNum).attr(attr, val);
		}
	}
}

function getEditBoolean(data) {
	var videoAutoplay = 0;
	if (data == undefined || data == 'true') {
		videoAutoplay = 0;
	} else {
		videoAutoplay = 1;
	}
	return videoAutoplay;
}

function setBorderFocus() {
	$('.editDrag').draggable("destroy");
	$('.editDrag').resizable("destroy");
	$('.editDrag').remove();

	$('#descriptionHolder .description').removeClass('editBorderFocus');
	$('#backgroundHolder .background').removeClass('editBorderFocus');

	if (edit.con == 'description') {
		$('#descriptionHolder .description').addClass('editBorderFocus');
		createDragArea('#descriptionHolder .description');
	} else if (edit.con == 'background') {
		$('#backgroundHolder .background').addClass('editBorderFocus');
		createDragArea('#backgroundHolder .background');
	} else if (edit.con == 'video') {
		$('#videoHolder').addClass('editBorderFocus');
		createDragArea('#videoHolder');
	}

	$(".editDrag").draggable({
		drag: function (event, ui) {
			var target = $(this).attr('data-target');
			$(target).css('width', $(this).css('width'));
			$(target).css('height', $(this).css('height'));
			$(target).css('top', $(this).css('top'));
			$(target).css('left', $(this).css('left'));

			updateDragValue($(target));
		}
	}).resizable({
		resize: function (event, ui) {
			var target = $(this).attr('data-target');
			$(target).css('width', $(this).css('width'));
			$(target).css('height', $(this).css('height'));
			$(target).css('top', $(this).css('top'));
			$(target).css('left', $(this).css('left'));

			updateDragValue($(target));
		}
	});
}

function createDragArea(target, con) {
	var className = con == false ? 'editSecondIndex' : 'editFrontIndex';
	var dragHTML = $('<div class="editDrag ' + className + '"></div>');
	$(dragHTML).insertAfter(target);

	dragHTML.attr('data-target', target);
	dragHTML.css('width', $(target).css('width'));
	dragHTML.css('height', $(target).css('height'));
	dragHTML.css('top', $(target).css('top'));
	dragHTML.css('left', $(target).css('left'));
}

function updateDragValue(obj) {
	var value = { obj: '', top: '', left: '', width: '', height: '' };
	if (edit.con == 'description') {
		value.obj = '#descriptionHolder .description';
		value.top = '#descriptionTop';
		value.left = '#descriptionLeft';
		value.width = '#descriptionWidth';
		value.height = '#descriptionHeight';
	} else if (edit.con == 'background') {
		value.obj = '#backgroundHolder .background';
		value.top = '#backgroundTop';
		value.left = '#backgroundLeft';
		value.width = '#backgroundWidth';
		value.height = '#backgroundHeight';
	} else if (edit.con == 'video') {
		value.obj = '#videoHolder';
		value.top = '#videoTop';
		value.left = '#videoLeft';
		value.width = '#videoWidth';
		value.height = '#videoHeight';
	}

	$(value.top).val(getValuePercent(value.obj, 'top'));
	$(value.left).val(getValuePercent(value.obj, 'left'));
	$(value.width).val(getValuePercent(value.obj, 'width'));
	$(value.height).val(getValuePercent(value.obj, 'height'));
}

function getValuePercent(obj, type) {
	var pos = $(obj).position();

	if (type == 'left') {
		return Number((pos.left / $('#gameHolder').outerWidth() * 100).toFixed());
	} else if (type == 'top') {
		return Number((pos.top / $('#gameHolder').outerHeight() * 100).toFixed());
	} else if (type == 'width') {
		return Number(($(obj).outerWidth() / $('#gameHolder').outerWidth() * 100).toFixed());
	} else if (type == 'height') {
		return Number(($(obj).outerHeight() / $('#gameHolder').outerHeight() * 100).toFixed());
	}
}

/*!
 * 
 * LOAD TEMPLATE JSON - This is the function that runs to load template json file
 * 
 */
function loadTemplateJSON(src) {
	$.ajax({
		url: src,
		type: "GET",
		dataType: "json",
		success: function (result) {
			edit.templateFile = result;

			if (IsJsonString($("#question_details", top.document).val())) {
				var detailsJSON = JSON.parse($("#question_details", top.document).val());
				pushJSONDataArray(detailsJSON);
			} else {
				pushJSONDataArray(edit.templateFile[0]);
			}

			gameData.targetArray = quesLandscape_arr;
			loadEditPage();
			goPage('game');
		}
	});
}

function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

/*!
 * 
 * OUTPUT JSON DATA - This is the function that runs to output json data
 * 
 */
function outputJSON() {
	var landscapeOuput = getJSONData(quesLandscape_arr[0]);
	var portraitOuput = getJSONData(quesPortrait_arr[0]);

	var output = '{"landscape": {' + landscapeOuput + '}, "portrait":{' + portraitOuput + '}}';

	try {
		var jsonObj = JSON.parse(output);
		var jsonPretty = JSON.stringify(jsonObj, null, '\t');
		$("#question_details", top.document).val(jsonPretty);
	}
	catch (err) {
		alert('Invalid data, can\'t convert to JSON format!');
	}
}

function getJSONData(array) {
	var questionOutput = '';
	var videosOutput = '';
	var videoListOutput = '';
	var descriptionOutput = '';
	var backgroundOutput = '';

	$.each(array, function (key, value) {
		if (value != undefined) {
			if (key == 'background') {
				$.each(value, function (bgKey, bgValue) {
					if (bgValue != undefined && bgValue != '') {
						backgroundOutput += JSON.stringify(bgKey) + ':' + JSON.stringify(bgValue) + ',';
					}
				});
				if (backgroundOutput != '') {
					backgroundOutput = backgroundOutput.substring(0, backgroundOutput.length - 1);
					backgroundOutput = '"background":{' + backgroundOutput + '}';
				}
			} else if (key == 'description') {
				$.each(value, function (descKey, descValue) {
					if (descValue != undefined && descValue != '') {
						descriptionOutput += JSON.stringify(descKey) + ':' + JSON.stringify(descValue) + ',';
					}
				});
				if (descriptionOutput != '') {
					descriptionOutput = descriptionOutput.substring(0, descriptionOutput.length - 1);
					descriptionOutput = '"explanation":{' + descriptionOutput + '}';
				}
			} else if (key == 'videos') {
				$.each(value[0], function (videosKey, videosValue) {
					//console.log(videosKey + " : " + videosValue);
					if (videosValue != undefined && videosValue != '') {
						if (videosKey == 'types') {
							for (var n = 0; n < array.videos[0].types.length; n++) {
								var videoOutput = '';
								$.each(array.videos[0].types[n], function (videoKey, videoValue) {
									if (videoValue != undefined && videoValue != '') {
										videoOutput += JSON.stringify(videoKey) + ':' + JSON.stringify(videoValue) + ',';
									}
								});

								if (videoOutput != '') {
									videoOutput = videoOutput.substring(0, videoOutput.length - 1);
									videoListOutput += '{' + videoOutput + '},';
								}
							}

							if (videoListOutput != '') {
								videoListOutput = videoListOutput.substring(0, videoListOutput.length - 1);
								videoListOutput = '"video":[' + videoListOutput + ']';
							}
						} else {
							videosOutput += JSON.stringify(videosKey) + ':' + JSON.stringify(videosValue) + ',';
						}
					}
				});
				if (videoListOutput != '' || videosOutput != '') {
					if (videoListOutput == '') {
						videosOutput = videosOutput.substring(0, videosOutput.length - 1);
					}
					videosOutput = '"videos":{' + videosOutput + videoListOutput + '}';
				}
			} else {
				//console.log(key + " : " + value);
				questionOutput += JSON.stringify(key) + ':' + JSON.stringify(value) + ',';
			}
		}
	});

	if (questionOutput != '') {
		questionOutput = questionOutput.substring(0, questionOutput.length - 1);
		questionOutput = '"question":{' + questionOutput + '}';
	}
	var finalOuput = questionOutput;
	if (videosOutput != '') {
		finalOuput += ',' + videosOutput;
	}
	if (descriptionOutput != '') {
		finalOuput += ',' + descriptionOutput;
	}
	if (backgroundOutput != '') {
		finalOuput += ',' + backgroundOutput;
	}

	return finalOuput;
}