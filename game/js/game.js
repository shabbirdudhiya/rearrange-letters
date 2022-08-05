////////////////////////////////////////////////////////////
// GAME v2.7
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

var screenSettings = {
    stageW: 1200, //game width
    stageH: 650, //game height
    portraitW: 380, //game portrait width
    portraitH: 600, //game portrait height
    fitToScreen: true, //fit to browser screen
    maintainAspectRatio: true, //maintain aspect ratio
    viewportMode: { enable: false, viewport: "portrait", text: "Rotate your device <br/>to portrait" }, //device viewport mode, portrait or landscape
}

//title settings
var titleSettings = {
    text: ["REARRANGE", "LETTERS|2"], //array for new lines, use | for spacing
    fontSize: 120,
    lineHeight: 120,
    shadow: 15,
    color: "#ccff00",
    spaceX: 10,
    spaceY: 10,
    x: 50,
    y: 40,
    tween: 0.3,
    portrait: {
        fontSize: 40,
        lineHeight: 40,
        spaceX: 5,
        spaceY: 5,
        x: 50,
        y: 35,
        tween: 0.3
    }
}

//category settings
var categorySettings = {
    status: true, //show/hide category select page
    allOption: true, //add ALL category select option
    allText: "ALL", //text for all category select option
    sort: true, //sort category alphatically, except All option always at last
    breadcrumb: " > ",//symbol for breadcrumb
    breadcrumbTop: "BACK" //breadcrumb top level name
};

//question settings
var questionSettings = {
    totalQuestionLimit: 0, //set more than 0 to limit total questions,
    randomQuestion: true, //true or false to enable randomize questions
    loader: "LOADING QUESTION...", //loader text display
    totalText: "[NUMBER]/[TOTAL]", //total question text display
    correctText: "FOUND NEW WORD!", //correct answer text display
    scoreText: "YOU SCORE 1PTS!", //score text display
    answerLeftText: "ANSWER LEFT : [NUMBER]" //answer left text display
};

//timer settings
var timerSettings = {
    status: true, //true or false to enable timer
    mode: "default", //default or countdown mode
    session: "all", //single for one questions, all for whole session
    timer: 25000, //total timer for countdown mode
    timesupText: "TIME'S UP", //time"s up text display
};

//reveal answer settings
var revealAnswerSettings = {
    status: true, //true or false to enable reveal answer
    timer: 10000, //10 second timer to show reveal button
    tween: 1 //reveal answer animation tween speed
}

//drag settings
var dragSettings = {
    shadow: 15, //letters normal shadow
    shadowHover: 20, //letters dragging shadow
    hoverScale: 1.3, //letters dragging scale
    hoverTween: 1, //letters scale animation tween speed
    answerAnimateTween: 0.4, //answer aniamtion tween speed
    answerAnimateScale: 1.3 //answer aniamtion scale
}

//single letter settings
var wordProperty = {
    fontSize: 120,
    lineHeight: 120,
    color: "#ccff00",
    x: 50,
    y: 40,
    spaceX: 10,
    spaceY: 10,
    width: 80
};

//single letter unused settings	(multiple word with different length)
var wordBottomProperty = {
    fontSize: 100,
    lineHeight: 100,
    color: "#ccc",
    x: 50,
    y: 52,
    spaceX: 10,
    spaceY: 10,
    width: 80
};

//sentence settings
var sentenceProperty = {
    fontSize: 60,
    lineHeight: 60,
    color: "#ccff00",
    x: 50,
    y: 40,
    spaceX: 20,
    spaceY: 10,
    width: 70,
};

//description settings
var descriptionProperty = {
    fontSize: 30,
    lineHeight: 30,
    color: "#fff",
    align: "center",
    top: 65,
    left: 10,
    width: 80,
    height: 20,
};

//background settings
var backgroundProperty = {
    top: 0,
    left: 0,
    width: 100,
    height: 100,
};

//video settings
var videoProperty = {
    top: 15,
    left: 30,
    width: 40,
    height: 41,
    autoplay: true,
    controls: true

};

//audio settings
var audioSettings = {
    description: 500, //.5 second delay to play description
    answer: 1000, //1 second delay to play description
};

//result settings
var resultSettings = {
    mode: "score", //display result by "score" or "timer"
    reverse: false, //display result in reverse
    scoreText: "YOUR SCORE : [NUMBER]", //score text display
    timerText: "BEST TIME : [NUMBER]" //timer text display
};

//Social share, [SCORE] will replace with game score
var shareSettings = {
    shareEnable: true, //toggle share
    shareTitle: "Highscore on Rearrange Letters 2 Game is [SCORE]", //social share score title
    shareMessage: "[SCORE] is mine new highscore on Rearrange Letters 2 Game! Try it now!", //social share score message
}

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = { enable: false };

var playerData = { score: 0, timer: 0 };
var gameData = {
    page: '',
    questionNum: 0,
    sequenceNum: 0,
    categoryNum: 0,
    category_arr: [],
    categoryThumb_arr: [],
    sequence_arr: [],
    targetArray: null,
    targetAnswerSequence: null,
    mode: 'landscape',
    oldMode: 'landscape',
    build: false,
    dragging: false,
    isUserScore: false,
    isUserCorrect: false,
    readyForNext: false,
    readyComplete: false,
    answered: false,
    settings: {}
};
var storeData = { status: false, timerDate: 0, revealDate: 0 };

var titleData = { title: [], shuffle: [], index: 0, status: false };
var questionData = {
    type: 0,
    reveal: false,
    text: '',
    value: '',
    sentence: [],
    word: [],
    shuffle: [],
    abandon: [],
    pos: [],
    abandonPos: [],
    correct: [],
    totalCorrect: 0,
    currentCorrect: 0,
    complete: []
};

var quesLandscape_arr = [];
var quesPortrait_arr = [];
var quesLandscapeSequence_arr = [];
var quesPortraitSequence_arr = [];
var categoryData = { page: 1, total: 0, thumb: 16, max: 3, level: 0, parent: '', breadcrumb: [] };

var audioLandscape_arr = [];
var audioPortrait_arr = [];
var audioData = { audioNum: 0, audioInterval: null, playing: false };

var dragData = { dx: 0, dy: 0, recoupLeft: 0, recoupTop: 0 };
var timeData = { enable: false, startDate: null, nowDate: null, timer: 0, accumulate: 0, countdown: 0 };
var revealData = { enable: false, startDate: null, nowDate: null, timer: 0, reset: false };

var gameSettingsObjects = ['questionSettings', 'timerSettings', 'revealAnswerSettings', 'dragSettings', 'resultSettings', 'shareSettings'];
var gameSettingsData = {};

/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */
function buildGameButton() {
    $('#buttonStart').click(function () {
        playSound('soundClick');

        if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
            if (checkMemberProceed()) {
                if (memberData.category) {
                    goPage('category');
                } else {
                    postMemberQuestionStart();
                }
            }
        } else {
            if (categorySettings.status) {
                goPage('category');
            } else {
                goPage('game');
            }
        }
    });

    $('#buttonNextCat').click(function () {
        playSound('soundClick');
        toggleCategory(true);
    });

    $('#buttonPrevCat').click(function () {
        playSound('soundClick');
        toggleCategory(false);
    });

    $('#buttonReveal').click(function () {
        playSound('soundClick');
        revealAnswers();
    });

    $('#buttonOk').click(function () {
        playSound('soundClick');
        toggleConfirm(false);
        stopGame();
        goPage('main');
        if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
            goMemberPage();
        }
    });

    $('#buttonCancel').click(function () {
        playSound('soundClick');
        toggleConfirm(false);
    });

    $('#buttonReplay').click(function () {
        playSound('soundClick');
        if (categorySettings.status) {
            goPage('category');
        } else {
            goPage('game');
        }
    });

    $('#buttonFacebook').click(function () {
        share('facebook');
    });

    $('#buttonTwitter').click(function () {
        share('twitter');
    });

    $('#buttonGoogle').click(function () {
        share('whatsapp');
    });

    $('#buttonOption').click(function () {
        playSound('soundClick');
        toggleGameOption();
    });

    $('#buttonSound').click(function () {
        playSound('soundClick');
        toggleGameMute();
    });

    $('#buttonFullscreen').click(function () {
        playSound('soundClick');
        toggleFullScreen();
    });

    $('#buttonExit').click(function () {
        playSound('soundClick');
        toggleGameOption();
        toggleConfirm(true);
    });

    $(window).focus(function () {
        //resizeGameDetail();
    });
}

/*!
 *
 * GAME SETTINGS - This is the function that runs to store game settings
 *
 */
function storeSettings() {
    for (var n = 0; n < gameSettingsObjects.length; n++) {
        if (typeof window[gameSettingsObjects[n]] != 'undefined') {
            gameSettingsData[gameSettingsObjects[n]] = {};

            $.each(window[gameSettingsObjects[n]], function (objKey, objValue) {
                gameSettingsData[gameSettingsObjects[n]][objKey] = objValue;
            });
        }
    }
}

/*!
 *
 * GAME STYLE - This is the function that runs to build game style
 *
 */
function buildGameStyle() {
    $('#gameStatus .gameAnswer').hide();
    $('#gameStatus .gameDisplay').hide();
    $('#buttonReveal').hide();

    $('.preloadText').html(questionSettings.loader);

    toggleConfirm(false);
}


/*!
 *
 * DISPLAY PAGES - This is the function that runs to display pages
 *
 */
function goPage(page) {
    gameData.page = page;
    $('#logoHolder').hide();
    $('#categoryHolder').hide();
    $('#gameHolder').hide();
    $('#resultHolder').hide();
    $('#buttonExit').show();

    toggleAniamteTitle(false);

    var targetContainer = ''
    switch (page) {
        case 'main':
            targetContainer = $('#logoHolder');
            $('#buttonExit').hide();
            toggleAniamteTitle(true);
            break;

        case 'category':
            targetContainer = $('#categoryHolder');
            break;

        case 'game':
            targetContainer = $('#gameHolder');
            startGame();
            break;

        case 'result':
            targetContainer = $('#resultHolder');
            if (!shareSettings.shareEnable) {
                $('#shareOption').hide();
            }

            stopGame();
            playSound('soundComplete');

            if (resultSettings.mode == 'score') {
                $('#resultScore').html(resultSettings.scoreText.replace('[NUMBER]', playerData.score));
                if (categorySettings.status) {
                    saveGame(playerData.score, gameData.category_arr[gameData.categoryNum]);
                } else {
                    saveGame(playerData.score, '');
                }
            } else if (resultSettings.mode == 'timer') {
                playerData.timer = timeData.timer;
                $('#resultScore').html(resultSettings.timerText.replace('[NUMBER]', millisecondsToTime(playerData.timer)));
                if (categorySettings.status) {
                    saveGame(playerData.timer, gameData.category_arr[gameData.categoryNum]);
                } else {
                    saveGame(playerData.timer, '');
                }
            }

            goScorePage('');

            if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
                toggleSaveButton(false);
            } else {
                toggleSaveButton(true);
            }
            break;
    }

    targetContainer.show();
    TweenMax.to(targetContainer, 0, { opacity: 0, overwrite: true });
    TweenMax.to(targetContainer, 1, { opacity: 1, overwrite: true });
    resizeGameDetail();
}

/*!
 *
 * BUILD CATEGORY - This is the function that runs to build category page
 *
 */
function buildCategory() {
    categoryData.thumb = findCategoryLevel();
    resetCategory();

    $('#categoryList').empty();
    for (var c = 0; c < gameData.categoryThumb_arr.length; c++) {
        var createThumbnail = false;
        var thumbSrc = 'assets/item_thumb.svg';

        if (categoryData.level == 0) {
            if (gameData.categoryThumb_arr[c].parent == '') {
                createThumbnail = true;
                if (gameData.categoryThumb_arr[c].src != '') {
                    thumbSrc = gameData.categoryThumb_arr[c].src;
                }
            }
        } else {
            if (gameData.categoryThumb_arr[c].parent == categoryData.breadcrumb[categoryData.breadcrumb.length - 1]) {
                createThumbnail = true;
                if (gameData.categoryThumb_arr[c].src != '') {
                    thumbSrc = gameData.categoryThumb_arr[c].src;
                }
            }
        }

        if (createThumbnail) {
            var catID = '';
            if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
                catID = 'data-id="' + gameData.categoryThumb_arr[c].id + '"';
            }
            var categoryHTML = '<li class="categoryThumb buttonClick" ' + catID + '><div><img src="' + thumbSrc + '" /></div><div class="categoryTitle fontCategory resizeFont" data-fontSize="30" data-lineHeight="30">' + gameData.categoryThumb_arr[c].name + '</div></li>';
            $('#categoryList').append(categoryHTML);
        }
    }

    $('#categoryNav').empty();
    var breadcrumbHTML = '';
    for (var c = 0; c < categoryData.breadcrumb.length; c++) {
        var activeClass = 'buttonClick active';
        if (categoryData.breadcrumb.length == 1 && c == 0) {
            activeClass = '';
        } else if (c == categoryData.breadcrumb.length - 1) {
            activeClass = '';
        }

        if (c != 0) {
            breadcrumbHTML += '<span class="fontCategoryNav resizeFont" data-fontSize="30" data-lineHeight="30">' + categorySettings.breadcrumb + '</span>';
        }

        breadcrumbHTML += '<span class="categoryNavName fontCategoryNav resizeFont ' + activeClass + '" data-fontSize="30" data-lineHeight="30" data-parent="' + c + '">' + categoryData.breadcrumb[c] + '</span>';

        if (categoryData.breadcrumb.length == 1 && c == 0) {
            breadcrumbHTML = '';
        }
    }

    $('#categoryNav').append(breadcrumbHTML);
    $('.categoryThumb').click(function () {
        playSound('soundClick');

        if (gameData.categoryLevel_arr.indexOf($(this).text()) == -1) {
            gameData.categoryNum = gameData.category_arr.indexOf($(this).text());

            if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
                playerData.category = $(this).attr('data-id');
                postMemberQuestionStart();
            } else {
                if (categorySettings.allOption && $(this).text() == categorySettings.allText) {
                    if (gameData.targetArray.length > 0) {
                        goPage('game');
                    } else {
                        alert('There are no question in selected category!');
                    }
                } else {
                    var categoryExist = gameData.targetArray.findIndex(x => x.category === $(this).text());
                    if (categoryExist != -1) {
                        goPage('game');
                    } else {
                        alert('There are no question in selected category!');
                    }
                }
            }
        } else {
            categoryData.level++;
            categoryData.breadcrumb.push($(this).text());

            categoryData.page = 1;
            buildCategory();
            resizeGameDetail();
        }
    });

    $('.categoryNavName').click(function () {
        if ($(this).hasClass('active')) {
            playSound('soundClick');

            var parentLevel = Number($(this).attr('data-parent'));
            categoryData.breadcrumb.length = parentLevel + 1;
            categoryData.level = parentLevel;

            categoryData.page = 1;
            buildCategory();
            resizeGameDetail();
        }
    });

    displayCategory();
}

function buildCategoryLevel() {
    if (typeof memberData != 'undefined' && memberSettings.enableMembership) {

    } else {
        if (categorySettings.sort) {
            sortOnObject(gameData.categoryThumb_arr, 'name');
            for (var c = 0; c < gameData.categoryThumb_arr.length; c++) {
                if (gameData.categoryThumb_arr[c].name == categorySettings.allText) {
                    gameData.categoryThumb_arr.push({
                        src: gameData.categoryThumb_arr[c].src,
                        name: gameData.categoryThumb_arr[c].name,
                        parent: gameData.categoryThumb_arr[c].parent,
                        settings: {}
                    });
                    gameData.categoryThumb_arr.splice(c, 1);
                    c = gameData.categoryThumb_arr.length;
                }
            }
            ;
        }
    }

    categoryData.breadcrumb.push(categorySettings.breadcrumbTop);

    gameData.categoryLevel_arr = [];
    for (var c = 0; c < gameData.categoryThumb_arr.length; c++) {
        if (gameData.categoryThumb_arr[c].parent != '') {
            gameData.categoryLevel_arr.push(gameData.categoryThumb_arr[c].parent);
        }
    }
    ;
}

function findCategoryLevel() {
    var totalCategory = 0;
    for (var t = 0; t < gameData.categoryThumb_arr.length; t++) {
        if (categoryData.level == 0) {
            if (gameData.categoryThumb_arr[t].parent == '') {
                totalCategory++;
            }
        } else {
            if (gameData.categoryThumb_arr[t].parent == categoryData.breadcrumb[categoryData.breadcrumb.length - 1]) {
                totalCategory++;
            }
        }
    }

    return totalCategory;
}

function resetCategory() {
    if (gameData.mode == 'portrait') {
        categoryData.max = 4;
    } else {
        categoryData.max = 3;
    }

    categoryData.total = categoryData.thumb / categoryData.max;
    if (String(categoryData.total).indexOf('.') > -1) {
        categoryData.total = Math.floor(categoryData.total) + 1;
    }

    displayCategory();
}

function toggleCategory(con) {
    if (con) {
        categoryData.page++;
        categoryData.page = categoryData.page > categoryData.total ? categoryData.total : categoryData.page;
    } else {
        categoryData.page--;
        categoryData.page = categoryData.page < 1 ? 1 : categoryData.page;
    }
    displayCategory();
}

function displayCategory() {
    $('#buttonPrevCat').hide();
    $('#buttonNextCat').hide();

    var startPageNum = (categoryData.page - 1) * categoryData.max;
    var endPageNum = startPageNum + categoryData.max;

    if (categoryData.page > 1) {
        $('#buttonPrevCat').show();
    }

    if (categoryData.total > 1 && categoryData.page != categoryData.total) {
        $('#buttonNextCat').show();
    }

    var startPageNum = (categoryData.page - 1) * categoryData.max;
    var endPageNum = startPageNum + categoryData.max;
    $('#categoryList li').hide();
    $('#categoryList li').each(function (index, element) {
        if (index >= startPageNum && index < endPageNum) {
            $(this).show();
        }
    });
}

/*!
 *
 * FILTER CATEGORY - This is the function that runs to filter category
 *
 */
function filterCategoryQuestion() {
    gameData.sequence_arr = [];
    for (n = 0; n < gameData.targetArray.length; n++) {
        gameData.sequence_arr.push(n);
    }

    if ($.editor.enable) {
        return;
    }

    //do nothing if category page is off
    if (!categorySettings.status) {
        return;
    }

    //do nothing if category all is selected
    if (categorySettings.allOption && gameData.category_arr[gameData.categoryNum] == categorySettings.allText) {
        return;
    }

    //filter the category
    gameData.sequence_arr = [];
    for (n = 0; n < gameData.targetArray.length; n++) {
        if (gameData.category_arr[gameData.categoryNum] == gameData.targetArray[n].category) {
            gameData.sequence_arr.push(n);
        }
    }
}

/*!
 *
 * FILTER CATEGORY - This is the function that runs to filter category
 *
 */
function checkCategorySettings() {
    //reset
    for (var n = 0; n < gameSettingsObjects.length; n++) {
        $.each(gameSettingsData[gameSettingsObjects[n]], function (objKey, objValue) {
            window[gameSettingsObjects[n]][objKey] = gameSettingsData[gameSettingsObjects[n]][objKey];
        });
    }

    //retrieve
    var categoryIndex = gameData.categoryThumb_arr.findIndex(x => x.id === String(playerData.category));
    if (categoryIndex != -1) {
        var retrieveCategorySettings = gameData.categoryThumb_arr[categoryIndex].settings;
        $.each(retrieveCategorySettings, function (objSKey, objSValue) {
            //exist settings
            if (gameSettingsObjects.indexOf(objSKey) != -1) {
                //exist settings value
                $.each(objSValue, function (objKey, objValue) {
                    if (window[objSKey][objKey] != undefined) {
                        window[objSKey][objKey] = retrieveCategorySettings[objSKey][objKey];
                    }
                });
            }
        });
    }
}

/*!
 *
 * START GAME - This is the function that runs to start play game
 *
 */
function startGame() {
    checkCategorySettings();

    gameData.questionNum = 0;
    gameData.sequenceNum = 0;
    playerData.score = 0;
    playerData.time = 0;

    $('#gameStatus .gameDisplay').hide();
    $('#gameStatus .gameQuestionStatus').html('');
    $('#gameStatus .gameAnswerStatus').html('');

    timeData.accumulate = 0;
    timeData.countdown = timerSettings.timer;

    if (timerSettings.mode == 'countdown') {
        $('#gameStatus .gameTimerStatus').html(millisecondsToTime(timerSettings.timer));
    } else {
        $('#gameStatus .gameTimerStatus').html('00:00');
    }


    if (typeof memberData != 'undefined' && memberSettings.enableMembership) {

    } else {
        filterCategoryQuestion();
        if (questionSettings.randomQuestion && !$.editor.enable) {
            shuffle(gameData.sequence_arr);
        }

        loadQuestion();
    }
}

/*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame() {
    stopAudio();
    TweenMax.killAll(false, true, false);
    resetQuestion();
}

function saveGame(score, type) {


    if (typeof toggleScoreboardSave == 'function') {
        $.scoreData.score = score;
        if (typeof type != 'undefined') {
            $.scoreData.type = type;
        }
        toggleScoreboardSave(true);
    }

    /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}


/*!
 *
 * BUILD TITLE - This is the function that runs to build title
 *
 */
function buildTitle() {
    var currentText = titleSettings.text;

    for (var n = 0; n < titleSettings.text.length; n++) {
        var thisArray = titleSettings.text[n].split("");
        for (var a = 0; a < thisArray.length; a++) {
            titleData.title.push(thisArray[a]);
        }
    }

    for (var n = 0; n < titleData.title.length; n++) {
        var currentWord = '<div class="fontQuestion resizeFont titleWord" data-fontSize="' + titleSettings.fontSize + '" data-lineHeight="' + titleSettings.lineHeight + '" data-shadow="' + titleSettings.shadow + '" style="font-size:' + titleSettings.fontSize + 'px; line-height:' + titleSettings.lineHeight + 'px; color:' + titleSettings.color + '; position:absolute;">' + titleData.title[n] + '</div>';
        $('#titleHolder').append(currentWord);

        var currentWord = '<div class="fontQuestion resizeFont titleFixedWord" data-fontSize="' + titleSettings.fontSize + '" data-lineHeight="' + titleSettings.lineHeight + '" data-shadow="' + titleSettings.shadow + '" style="font-size:' + titleSettings.fontSize + 'px; line-height:' + titleSettings.lineHeight + 'px; color:' + titleSettings.color + '; position:absolute;">' + titleData.title[n] + '</div>';
        $('#titleFixedHolder').append(currentWord);

        titleData.shuffle.push(n);
    }

    checkTitleWordData();
    positionTitle();
}

function checkTitleWordData() {
    titleSettings.fontSize
    titleSettings.lineHeight

    var thisFontSize = titleSettings.fontSize;
    var thisLineHeight = titleSettings.lineHeight;

    if (gameData.mode == 'portrait') {
        thisFontSize = titleSettings.portrait.fontSize;
        thisLineHeight = titleSettings.portrait.lineHeight;
    }

    $('.titleWord, .titleFixedWord').each(function (index, element) {
        $(this).attr('data-fontSize', thisFontSize);
        $(this).attr('data-lineHeight', thisLineHeight);
    });

    resizeGameFonts();

    $('.titleWord').each(function (index, element) {
        $(this).attr('data-width', $('.titleFixedWord').eq(index).outerWidth());
        $(this).attr('data-height', $('.titleFixedWord').eq(index).outerHeight());

        $(this).attr('data-center-x', $('.titleFixedWord').eq(index).outerWidth() / 2);
        $(this).attr('data-center-y', $('.titleFixedWord').eq(index).outerHeight() / 2);
    });
}

function positionTitle() {
    var targetArray = titleData.title;
    var thisSpaceX = titleSettings.spaceX * scalePercent;
    var thisSpaceY = titleSettings.spaceY * scalePercent;
    var thisCenterX = titleSettings.x;
    var thisCenterY = titleSettings.y;

    if (gameData.mode == 'portrait') {
        thisSpaceX = titleSettings.portrait.spaceX * scalePercent;
        thisSpaceY = titleSettings.portrait.spaceY * scalePercent;
        thisCenterX = titleSettings.portrait.x;
        thisCenterY = titleSettings.portrait.y;
    }


    var posArr = [];
    var currentW = 0;
    var posIndex = 0;

    var singleH = 0;
    var titleIndex = 0;

    for (var n = 0; n < titleSettings.text.length; n++) {
        posArr.push({ width: 0, count: 0 });

        var thisArray = titleSettings.text[n].split("");
        currentW = 0;
        for (var a = 0; a < thisArray.length; a++) {

            var currentIndex = titleIndex;
            var singleW = Number($('.titleWord').eq(currentIndex).attr('data-width'));
            singleH = Number($('.titleWord').eq(currentIndex).attr('data-height'));
            currentW += Number($('.titleWord').eq(currentIndex).attr('data-width'));

            if (thisArray[a] == '|') {
                $('.titleWord').eq(currentIndex).hide();
            }

            posArr[posIndex].width = currentW + (thisArray.length * thisSpaceX);
            posArr[posIndex].count++;
            titleIndex++;
        }
        posIndex++;
    }

    var startCenterX = holderW / 100 * thisCenterX;
    var startCenterY = holderH / 100 * thisCenterY;
    posIndex = 0;

    var startX = startCenterX - (posArr[posIndex].width / 2);
    var startY = startCenterY - (((posArr.length * (singleH)) + (posArr.length * thisSpaceY)) / 2);

    var count = 0;

    for (var n = 0; n < targetArray.length; n++) {
        var currentIndex = n;
        var centerX = Number($('.titleWord').eq(currentIndex).attr('data-center-x'));
        var centerY = Number($('.titleWord').eq(currentIndex).attr('data-center-y'));
        var thisW = Number($('.titleWord').eq(currentIndex).attr('data-width'));
        var thisH = Number($('.titleWord').eq(currentIndex).attr('data-height'));

        $('.titleWord').eq(currentIndex).css('left', startX);
        $('.titleWord').eq(currentIndex).css('top', startY);

        startX += Number($('.titleWord').eq(currentIndex).attr('data-width')) + (thisSpaceX);
        count++;

        if (posIndex < posArr.length) {
            if (count >= posArr[posIndex].count) {
                posIndex++;
                if (posIndex < posArr.length) {
                    startX = startCenterX - (posArr[posIndex].width / 2);
                    startY += (singleH) + thisSpaceY;
                    count = 0;
                }
            }
        }
    }
}

/*!
 *
 * TITLE ANIMATION - This is the function that runs to animate title
 *
 */
function toggleAniamteTitle(con) {
    titleData.status = con;

    if (con) {
        $('.titleWord').each(function (index, element) {
            TweenMax.to($('.titleWord').eq(index), 0, { scale: 1, overwrite: true });
        });

        shuffle(titleData.shuffle);
        titleData.index = 0;
        findNextTitle();
    }
}

function findNextTitle() {
    if (titleData.title[titleData.shuffle[titleData.index]] == '|') {
        titleData.index++;
    }

    if (titleData.index > titleData.shuffle.length - 1) {
        shuffle(titleData.shuffle);
        titleData.index = 0;
    }

    animateTitle();
}

function animateTitle() {
    if (!titleData.status) {
        return;
    }

    TweenMax.to($('.titleWord').eq(titleData.shuffle[titleData.index]), titleSettings.tween, {
        scale: 1.5, overwrite: true, ease: Sine.easeIn, onComplete: function () {
            TweenMax.to($('.titleWord').eq(titleData.shuffle[titleData.index]), titleSettings.tween, {
                scale: 1, overwrite: true, ease: Sine.easeOut, onComplete: function () {
                    titleData.index++;
                    findNextTitle();
                }
            });
        }
    });
}

/*!
 *
 * LOAD QUESTION - This is the function that runs to load new question
 *
 */
function loadQuestion() {
    gameData.dragging = false;
    gameData.isUserScore = false;
    gameData.isUserCorrect = false;
    gameData.answered = false;
    questionData.complete = [];
    questionData.correct = [];
    questionData.totalCorrect = 0;
    revealData.reset = false;

    audioData.playing = false;

    storeData.timerDate = 0;
    storeData.revealDate = 0;
    storeData.status = false;

    $('#gameStatus .gameAnswer').hide();
    $('#gameStatus .gameDisplay').hide();
    $('#questionHolder').show();
    $('#descriptionHolder').show();
    $('#buttonReveal').hide();

    toggleQuestionLoader(true);
    toggleResult(true);
    removeSoundAssets();
    resetQuestion();

    fileFest = [];
    audioLandscape_arr = [];
    audioPortrait_arr = [];
    gameData.build = false;
    gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];

    if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
        gameData.sequenceNum = 0;
    }

    //landscape
    var thisMode = 'landscape';
    var descriptionAudio = quesLandscape_arr[gameData.sequenceNum].description.audio;
    descriptionAudio = descriptionAudio == undefined ? '' : descriptionAudio;

    if (descriptionAudio != '') {
        audioLandscape_arr.push({ type: 'description', id: thisMode + 'DescriptionAudio', list: 0 });
        fileFest.push({
            src: quesLandscape_arr[gameData.sequenceNum].description.audio,
            id: thisMode + 'DescriptionAudio'
        });
    }

    var answerAudio = quesLandscape_arr[gameData.sequenceNum].audio;
    answerAudio = answerAudio == undefined ? '' : answerAudio;

    if (answerAudio != '') {
        var audioArray = answerAudio.split(',');
        for (var n = 0; n < audioArray.length; n++) {
            audioLandscape_arr.push({ type: 'answer', id: thisMode + 'AnswerAudio' + n, sort: n });
            fileFest.push({ src: audioArray[n], id: thisMode + 'AnswerAudio' + n })
        }
    }

    if (quesLandscape_arr[gameData.sequenceNum].descriptionType == 'image') {
        fileFest.push({
            src: quesLandscape_arr[gameData.sequenceNum].description.type,
            id: thisMode + 'descriptionImage'
        })
    }

    var descriptionType = quesLandscape_arr[gameData.sequenceNum].description.type;
    descriptionType = descriptionType == undefined ? '' : descriptionType;
    if (descriptionType == 'image') {
        fileFest.push({ src: descriptionType, id: thisMode + 'descriptionImage', type: createjs.LoadQueue.IMAGE })
    }

    var backgroundImage = quesLandscape_arr[gameData.sequenceNum].background.text;
    backgroundImage = backgroundImage == undefined ? '' : backgroundImage;
    if (backgroundImage != '') {
        fileFest.push({ src: backgroundImage, id: thisMode + 'backgroundImage', type: createjs.LoadQueue.IMAGE })
    }

    //portrait
    var thisMode = 'portrait';
    var descriptionAudio = quesPortrait_arr[gameData.sequenceNum].description.audio;
    descriptionAudio = descriptionAudio == undefined ? '' : descriptionAudio;

    if (descriptionAudio != '') {
        audioPortrait_arr.push({ type: 'description', id: thisMode + 'DescriptionAudio', list: 0 });
        fileFest.push({
            src: quesPortrait_arr[gameData.sequenceNum].description.audio,
            id: thisMode + 'DescriptionAudio'
        })
    }

    var answerAudio = quesPortrait_arr[gameData.sequenceNum].audio;
    answerAudio = answerAudio == undefined ? '' : answerAudio;

    if (answerAudio != '') {
        var audioArray = answerAudio.split(',');
        for (var n = 0; n < audioArray.length; n++) {
            audioPortrait_arr.push({ type: 'answer', id: thisMode + 'AnswerAudio' + n, sort: n });
            fileFest.push({ src: audioArray[n], id: thisMode + 'AnswerAudio' + n })
        }
    }

    var descriptionType = quesPortrait_arr[gameData.sequenceNum].description.type;
    descriptionType = descriptionType == undefined ? '' : descriptionType;
    if (descriptionType == 'image') {
        fileFest.push({ src: descriptionType, id: thisMode + 'descriptionImage', type: createjs.LoadQueue.IMAGE })
    }

    var backgroundImage = quesPortrait_arr[gameData.sequenceNum].background.text;
    backgroundImage = backgroundImage == undefined ? '' : backgroundImage;
    if (backgroundImage != '') {
        fileFest.push({ src: backgroundImage, id: thisMode + 'backgroundImage', type: createjs.LoadQueue.IMAGE })
    }

    if (fileFest.length > 0) {
        loadQuestionAssets();
    } else {
        buildQuestion();
    }
}

/*!
 *
 * BUILD QUESTION - This is the function that runs to build question
 *
 */

function buildQuestion() {
    gameData.build = true;
    gameData.readyComplete = false;
    audioData.playing = false;

    toggleQuestionLoader(false);
    stopAudio();
    resetQuestion();

    if (gameData.mode == 'landscape') {
        gameData.targetArray = quesLandscape_arr;
        gameData.targetAudio = audioLandscape_arr;
    } else {
        gameData.targetArray = quesPortrait_arr;
        gameData.targetAudio = audioPortrait_arr;
    }

    var currentText = gameData.targetArray[gameData.sequenceNum].text;
    questionData.value = getArrayValue('question');
    questionData.text = currentText;

    questionData.word = [];
    questionData.sentence = [];
    questionData.reveal = false;

    if (questionData.value.type == 0) {
        questionData.word = currentText.split("");
    } else if (questionData.value.type == 1) {
        questionData.word = findLetters(currentText);
    } else if (questionData.value.type == 2) {
        questionData.word = findLetters(currentText);
    } else if (questionData.value.type == 3) {
        questionData.sentence = currentText.split(" ");
    }
    questionData.shuffle = [];
    questionData.pos = [];
    questionData.abandon = [];
    questionData.abandonPos = [];

    for (var n = 0; n < questionData.sentence.length; n++) {
        var currentWord = '<div class="fontQuestion resizeFont draggable" data-fontSize="' + questionData.value.fontSize + '" data-lineHeight="' + questionData.value.lineHeight + '" data-shadow="' + questionData.value.shadow + '" data-shadowhover="' + questionData.value.shadowHover + '" style="font-size:' + questionData.value.fontSize + 'px; line-height:' + questionData.value.lineHeight + 'px; color:' + questionData.value.color + '; position:absolute;">' + questionData.sentence[n] + '' + questionData.sentence[n + 1] + '</div>';
        $('#questionHolder').append(currentWord);
        questionData.pos.push([0, 0]);
        questionData.shuffle.push(n);
    }

    for (var n = 0; n < questionData.word.length; n++) {
        var currentWord = '<div class="fontQuestion resizeFont draggable" data-fontSize="' + questionData.value.fontSize + '" data-lineHeight="' + questionData.value.lineHeight + '" data-shadow="' + questionData.value.shadow + '" data-shadowhover="' + questionData.value.shadowHover + '" style="font-size:' + questionData.value.fontSize + 'px;  line-height:' + questionData.value.lineHeight + 'px; color:' + questionData.value.color + '; position:absolute;">' + questionData.word[n] + '' + questionData.word[n + 1] + '</div>';
        $('#questionHolder').append(currentWord);
        questionData.pos.push([0, 0]);
        questionData.abandonPos.push([0, 0]);
        questionData.shuffle.push(n);
    }

    for (var n = 0; n < questionData.sentence.length; n++) {
        var currentWord = '<div class="fontQuestion resizeFont fixedPosition" data-fontSize="' + questionData.value.fontSize + '" data-lineHeight="' + questionData.value.lineHeight + '" data-shadow="' + questionData.value.shadow + '" data-shadowhover="' + questionData.value.shadowHover + '" style="font-size:' + questionData.value.fontSize + 'px; line-height:' + questionData.value.lineHeight + 'px; color:' + questionData.value.color + '; position:absolute;">' + questionData.sentence[n] + '' + questionData.sentence[n + 1] + '</div>';
        $('#questionFixedHolder').append(currentWord);
    }

    for (var n = 0; n < questionData.word.length; n++) {
        var currentWord = '<div class="fontQuestion resizeFont fixedPosition" data-fontSize="' + questionData.value.fontSize + '" data-shadow="' + questionData.value.shadow + '" data-shadowhover="' + questionData.value.shadowHover + '" style="font-size:' + questionData.value.fontSize + 'px; line-height:' + questionData.value.lineHeight + 'px; color:' + questionData.value.color + '; position:absolute;">' + questionData.word[n] + '' + questionData.word[n + 1] + '</div>';
        $('#questionFixedHolder').append(currentWord);
    }

    if (questionData.value.type == 2) {
        shuffle(questionData.shuffle);
        var divide = Math.round(questionData.shuffle.length / 3);
        var minimum = Number((questionData.shuffle.length - divide));
        for (var n = questionData.shuffle.length - 1; n >= minimum; n--) {
            questionData.abandon.push(questionData.shuffle[n]);
            questionData.shuffle.splice(n, 1);
        }
    }

    playerData.answerArray = [];
    playerData.answerCorrectStatus = false;
    playerData.answerRevealed = false;
    playerData.answerResult = false;

    buildDescription();
    buildBackground();
    buildVideo();

    randomizeWord();

    checkWordData();
    positionSentenceNow(false);
    setupDragEvents();

    $('#questionWrapperHolder').css('opacity', 0);
    TweenMax.to($('#questionWrapperHolder'), .5, {
        delay: .5, alpha: 1, overwrite: true, onComplete: function () {
            playAudioLoop('description');
        }
    });

    if ($.editor.enable) {
        setBorderFocus();
    }

    updateGameStatus();
    toggleGameTimer(true);
    toggleRevealTimer(true, 'continue');

    storeData.status = true;
    gameData.dragging = true;

    if (gameData.answered) {
        if (questionData.value.type == 1 || questionData.value.type == 2) {
            if (questionData.totalCorrect == questionData.correct.length) {
                prepareNextQuestion();
            } else {
                gameData.answered = false;
            }
        } else {
            prepareNextQuestion();
        }
    }
}

function randomizeWord() {
    var targetArray = questionData.word;

    if (questionData.value.type == 3) {
        targetArray = questionData.sentence;
    }

    for (var s = 0; s < 10; s++) {
        shuffle(questionData.shuffle);

        var countNum = 0;
        for (var n = 0; n < targetArray.length; n++) {
            var currentIndex = questionData.shuffle[n];
            if (targetArray[currentIndex] == targetArray[n]) {
                countNum++;
            }
        }
        if (countNum < targetArray.length) {
            s = 10;
        }
    }
}

function findLetters(currentText) {
    var finalArray = [];
    var checkArray = [];
    var possibleWords = currentText.split(",");

    for (var n = 0; n < possibleWords.length; n++) {
        checkArray = [];
        for (var a = 0; a < finalArray.length; a++) {
            checkArray.push(finalArray[a]);
        }

        var thisWord = possibleWords[n];
        if (!storeData.status) {
            questionData.correct.push({ word: thisWord, status: false, answer: false });
        }

        for (var l = 0; l < thisWord.length; l++) {
            var thisLetter = thisWord.substring(l, l + 1);
            if (checkArray.indexOf(thisLetter) == -1) {
                finalArray.push(thisLetter);
            } else {
                checkArray.splice(checkArray.indexOf(thisLetter), 1);
            }
        }
    }

    return finalArray;
}

/*!
 *
 * SETUP DRAG EVENTS - This is the function that runs to setup drag events
 *
 */
function setupDragEvents() {
    $(".draggable").draggable({
        //revert: true,
        zIndex: 100,
        drag: function (event, ui) {
            //resize bug fix ui drag `enter code here`
            dragData.dx = ui.position.left - ui.originalPosition.left;

            dragData.dy = ui.position.top - ui.originalPosition.top;
            ui.position.left = ui.originalPosition.left + (dragData.dx);
            ui.position.top = ui.originalPosition.top + (dragData.dy);
            ui.position.left += dragData.recoupLeft;
            ui.position.top += dragData.recoupTop;

            shuffleWord($(this));
        },
        start: function (event, ui) {
            //resize bug fix ui drag
            var left = parseInt($(this).css('left'), 10);
            left = isNaN(left) ? 0 : left;
            var top = parseInt($(this).css('top'), 10);
            top = isNaN(top) ? 0 : top;
            dragData.recoupLeft = left - ui.position.left;
            dragData.recoupTop = top - ui.position.top;
        },
        stop: function (event, ui) {
            $('.draggable').removeClass('dragging');
        }
    });

    $(".draggable").mousedown(function (ev) {
        if (gameData.dragging) {
            playSound('soundPress');

            TweenMax.to($(this), dragSettings.hoverTween, { scale: dragSettings.hoverScale, overwrite: true });
            $(this).addClass('dragging');
            positionSentenceNow(true);
            shuffleWord($(this));
        }
    });

    $(".draggable").mouseup(function (ev) {
        if (gameData.dragging) {
            playSound('soundRelease');

            $('.draggable').removeClass('dragging');
            checkWordData();
            positionSentenceNow(true);
            checkCorrectAnswer();
        }
    });
}

/*!
 *
 * ARRANGE WORD - This is the function that runs to arrange word
 *
 */
function shuffleWord(obj) {
    var position = { x: 0, y: 0 };
    position.x = parseInt(obj.css('left')) + (Number(obj.attr('data-width')) / 2);
    position.y = parseInt(obj.css('top')) + (Number(obj.attr('data-height')) / 2);

    arrangeWord(obj, position, 0);
    if (questionData.value.type == 2) {
        arrangeWord(obj, position, 1);
    }
}

function arrangeWord(obj, position, group) {
    var currentPixelX = position.x;
    var currentPixelY = position.y;

    var targetArray = questionData.shuffle;
    var targetOppositeArray = questionData.abandon;
    var thisPos = questionData.pos;
    var thisSpaceX = questionData.value.spaceX * scalePercent;
    var thisSpaceY = questionData.value.spaceY * scalePercent;
    var thisCenterX = questionData.value.x;
    var thisCenterY = questionData.value.y;

    if (group == 1) {
        targetArray = questionData.abandon;
        targetOppositeArray = questionData.shuffle;
        thisPos = questionData.abandonPos;
        thisSpaceX = questionData.value.bottomSpaceX * scalePercent;
        thisSpaceY = questionData.value.bottomSpaceY * scalePercent;
        thisCenterX = questionData.value.bottomX;
        thisCenterY = questionData.value.bottomY;
    }

    var firstIndex = true;
    var side = { l: 0, r: 0 };
    for (var n = 0; n < targetArray.length; n++) {
        var nextIndex = -1;
        var currentIndex = targetArray[n];

        var centerX = Number($('.draggable').eq(currentIndex).attr('data-center-x'));
        var centerY = Number($('.draggable').eq(currentIndex).attr('data-center-y'));
        var thisW = Number($('.draggable').eq(currentIndex).attr('data-width'));
        var thisH = Number($('.draggable').eq(currentIndex).attr('data-height'));
        var thisRow = Number($('.draggable').eq(currentIndex).attr('data-row'));

        if (n < targetArray.length - 1) {
            nextIndex = targetArray[n + 1];

            var nextCenterX = Number($('.draggable').eq(nextIndex).attr('data-center-x'));
            var nextCenterY = Number($('.draggable').eq(nextIndex).attr('data-center-y'));
            var nextW = Number($('.draggable').eq(nextIndex).attr('data-width'));
            var nextH = Number($('.draggable').eq(nextIndex).attr('data-height'));
            var nextRow = Number($('.draggable').eq(nextIndex).attr('data-row'));
        }

        if (firstIndex) {
            firstIndex = false;
            side.l = 0;

            if (nextIndex != -1) {
                side.r = getCenterPosition(thisPos[currentIndex][0], thisPos[currentIndex][1], thisPos[nextIndex][0], thisPos[nextIndex][1]).x;
            } else {
                //single word
                side.r = holderW;
            }
        } else if (n == targetArray.length - 1) {
            //last sentence
            side.l = side.r;
            side.r = holderW;
        } else if (thisRow != nextRow) {
            //last row sentence
            side.l = side.r;
            side.r = holderW;
            firstIndex = true;
        } else {
            side.l = side.r;
            side.r = getCenterPosition(thisPos[currentIndex][0], thisPos[currentIndex][1], thisPos[nextIndex][0], thisPos[nextIndex][1]).x;
        }

        if (currentPixelX >= side.l && currentPixelX <= side.r) {
            if (currentPixelY >= (thisPos[currentIndex][1] - (thisH / 2)) && currentPixelY <= (thisPos[currentIndex][1] + (thisH / 2))) {

                if (targetArray.indexOf(obj.index()) == -1) {
                    targetOppositeArray.splice(targetOppositeArray.indexOf(obj.index()), 1);
                    targetArray.insert(n, obj.index());
                } else if (currentIndex != obj.index()) {
                    if (thisRow != Number(obj.attr('data-row'))) {
                        targetArray.splice(targetArray.indexOf(obj.index()), 1);
                        targetArray.insert(n, obj.index());
                    } else {
                        targetArray.swap(n, targetArray.indexOf(obj.index()));
                    }
                }
                checkWordData();
                positionSentenceNow(true);
            }
        }
    }

    if (targetArray.length == 0) {
        side.l = 0;
        side.r = holderW;
        var startCenterY = holderH / 100 * thisCenterY;

        if (currentPixelX >= side.l && currentPixelX <= side.r) {
            var thisH = Number($('.draggable').eq(1).attr('data-height'));
            var heightNum = (thisH + thisSpaceY) / 2;

            if (currentPixelY >= startCenterY - (heightNum) && currentPixelY <= startCenterY + (heightNum)) {
                targetOppositeArray.splice(targetOppositeArray.indexOf(obj.index()), 1);
                targetArray.push(obj.index());

                checkWordData()
                positionSentenceNow(true);
            }
        }
    }
}

/*!
 *
 * POSITION WORDS - This is the function that runs to position words
 *
 */
function checkWordData() {
    $('.draggable').each(function (index, element) {
        $(this).removeClass('dragFocus');
    });

    for (var n = 0; n < questionData.shuffle.length; n++) {
        var currentIndex = questionData.shuffle[n];
        $('.draggable').eq(currentIndex).addClass('dragFocus');

        $('.draggable').eq(currentIndex).attr('data-fontSize', questionData.value.fontSize);
        $('.draggable').eq(currentIndex).attr('data-lineHeight', questionData.value.lineHeight);
        $('.draggable').eq(currentIndex).css('color', questionData.value.color);

        $('.fixedPosition').eq(currentIndex).attr('data-fontSize', questionData.value.fontSize);
        $('.fixedPosition').eq(currentIndex).attr('data-lineHeight', questionData.value.lineHeight);
        $('.fixedPosition').eq(currentIndex).css('color', questionData.value.color);
    }

    for (var n = 0; n < questionData.abandon.length; n++) {
        var currentIndex = questionData.abandon[n];
        $('.draggable').eq(currentIndex).attr('data-fontSize', questionData.value.bottomFontSize);
        $('.draggable').eq(currentIndex).attr('data-lineHeight', questionData.value.bottomLineHeight);
        $('.draggable').eq(currentIndex).css('color', questionData.value.bottomColor);

        $('.fixedPosition').eq(currentIndex).attr('data-fontSize', questionData.value.bottomFontSize);
        $('.fixedPosition').eq(currentIndex).attr('data-lineHeight', questionData.value.bottomLineHeight);
        $('.fixedPosition').eq(currentIndex).css('color', questionData.value.bottomColor);
    }

    resizeGameFonts();

    $('.draggable').each(function (index, element) {
        $(this).attr('data-width', $('.fixedPosition').eq(index).outerWidth());
        $(this).attr('data-height', $('.fixedPosition').eq(index).outerHeight());

        $(this).attr('data-center-x', $('.fixedPosition').eq(index).outerWidth() / 2);
        $(this).attr('data-center-y', $('.fixedPosition').eq(index).outerHeight() / 2);
        $(this).attr('data-drag', false);
    });
}

function positionSentenceNow(con) {
    positionSentence(con, 0);
    positionSentence(con, 1);
}

function positionSentence(con, group) {
    var targetArray = questionData.shuffle;
    var thisSpaceX = questionData.value.spaceX * scalePercent;
    var thisSpaceY = questionData.value.spaceY * scalePercent;
    var thisCenterX = questionData.value.x;
    var thisCenterY = questionData.value.y;
    var thisWidth = questionData.value.width;
    var thisPos = questionData.pos;

    if (group == 1) {
        targetArray = questionData.abandon;
        thisSpaceX = questionData.value.bottomSpaceX * scalePercent;
        thisSpaceY = questionData.value.bottomSpaceY * scalePercent;
        thisCenterX = questionData.value.bottomX;
        thisCenterY = questionData.value.bottomY;
        thisWidth = questionData.value.bottomWidth;
        thisPos = questionData.abandonPos;
    }

    if (targetArray.length == 0) {
        return;
    }

    var posArr = [];
    posArr.push({ width: 0, count: 0 });

    var currentW = 0;
    var posIndex = 0;

    var maxW = holderW / 100 * thisWidth;
    var singleH = 0;
    for (var n = 0; n < targetArray.length; n++) {
        var space = thisSpaceX;

        if (n == targetArray.length - 1) {
            space = 0;
        }

        var currentIndex = targetArray[n];
        var singleW = Number($('.draggable').eq(currentIndex).attr('data-width'));
        singleH = Number($('.draggable').eq(currentIndex).attr('data-height'));
        currentW += Number($('.draggable').eq(currentIndex).attr('data-width'));

        if (currentW >= maxW && questionData.value.type == 3) {
            if (posArr[posIndex].count == 0) {
                //if single sentence is larger
                posArr[posIndex].width = currentW;
                posArr[posIndex].count++;
            } else {
                currentW = Number($('.draggable').eq(currentIndex).attr('data-width'));
                posArr.push({ width: currentW, count: 1 });
                posIndex++;
            }
        } else {
            posArr[posIndex].width = currentW;
            posArr[posIndex].count++;
        }
    }

    for (var n = 0; n < posArr.length; n++) {
        var space = (posArr[n].count - 1) * thisSpaceX;
        posArr[n].width += space;
    }

    var startCenterX = holderW / 100 * thisCenterX;
    var startCenterY = holderH / 100 * thisCenterY;
    posIndex = 0;

    var startX = startCenterX - (posArr[posIndex].width / 2);
    var startY = startCenterY - (((posArr.length * (singleH)) + (posArr.length * thisSpaceY)) / 2);

    var count = 0;

    for (var n = 0; n < targetArray.length; n++) {
        var currentIndex = targetArray[n];
        var centerX = Number($('.draggable').eq(currentIndex).attr('data-center-x'));
        var centerY = Number($('.draggable').eq(currentIndex).attr('data-center-y'));
        var thisW = Number($('.draggable').eq(currentIndex).attr('data-width'));
        var thisH = Number($('.draggable').eq(currentIndex).attr('data-height'));

        thisPos[currentIndex] = [startX + (thisW / 2), startY + (thisH / 2)];

        $('.draggable').eq(currentIndex).attr('data-row', posIndex);
        if (!$('.draggable').eq(currentIndex).hasClass('dragging')) {
            if (con == false) {
                $('.draggable').eq(currentIndex).css('left', startX);
                $('.draggable').eq(currentIndex).css('top', startY);
            } else {
                var tweenSpeed = .3;

                if (questionData.reveal) {
                    tweenSpeed = revealAnswerSettings.tween;
                }
                TweenMax.to($('.draggable').eq(currentIndex), tweenSpeed, {
                    left: startX,
                    top: startY,
                    scale: 1,
                    overwrite: true
                });
            }
        }

        startX += Number($('.draggable').eq(currentIndex).attr('data-width')) + (thisSpaceX);
        count++;

        if (posIndex < posArr.length) {
            if (count >= posArr[posIndex].count) {
                posIndex++;
                if (posIndex < posArr.length) {
                    startX = startCenterX - (posArr[posIndex].width / 2);
                    startY += (singleH) + thisSpaceY;
                    count = 0;
                }
            }
        }
    }
}


/*!
 *
 * RESET QUESTIONS - This is the function that runs to reset questions
 *
 */
function resetQuestion() {
    TweenMax.killTweensOf($('#questionHolder'));
    $('#questionHolder').empty();
    $('#questionFixedHolder').empty();
    $('#descriptionHolder').empty();
    $('#backgroundHolder').empty();
}

/*!
 *
 * CHECK ANSWER - This is the function that runs to check answer
 *
 */
function checkCorrectAnswer() {
    gameData.dragging = false;

    var countNum = 0;
    var winCon = false;

    if (questionData.value.type == 0) {
        var finalDrag = '';
        for (var n = 0; n < questionData.word.length; n++) {
            var currentIndex = questionData.shuffle[n];
            if (questionData.word[currentIndex] == questionData.word[n]) {
                finalDrag += (questionData.word[n]);
                countNum++;
            }
        }

        if (countNum >= questionData.word.length) {
            playerData.answerArray.push(finalDrag);
            playerData.score++;
            questionData.currentCorrect = 0;
            winCon = gameData.isUserScore = gameData.isUserCorrect = true;
        }
    } else if (questionData.value.type == 1 || questionData.value.type == 2) {
        var currentWord = '';

        for (var n = 0; n < questionData.shuffle.length; n++) {
            var currentIndex = questionData.shuffle[n];
            currentWord += questionData.word[currentIndex];
        }

        for (var c = 0; c < questionData.complete.length; c++) {
            for (var n = 0; n < questionData.correct.length; n++) {
                if (questionData.complete[c] == questionData.correct[n].word && !questionData.correct[n].status) {
                    playerData.answerArray.push(questionData.complete[c]);
                    questionData.correct[n].answer = true;
                    questionData.correct[n].status = true;
                }
            }
        }

        var totalAnswerCorrect = 0;
        for (var n = 0; n < questionData.correct.length; n++) {
            if (currentWord == questionData.correct[n].word && !questionData.correct[n].status) {
                playerData.answerArray.push(questionData.correct[n].word);
                questionData.complete.push(questionData.correct[n].word);
                questionData.currentCorrect = n;
                questionData.correct[n].answer = true;
                questionData.correct[n].status = true;
                questionData.totalCorrect++;
                winCon = gameData.isUserCorrect = true;
            }

            if (questionData.correct[n].answer) {
                totalAnswerCorrect++;
            }
        }

        if (totalAnswerCorrect == questionData.correct.length) {
            gameData.isUserScore = true;
            playerData.score++;
        }
    } else if (questionData.value.type == 3) {
        var finalSentece = '';
        for (var n = 0; n < questionData.sentence.length; n++) {
            var currentIndex = questionData.shuffle[n];
            if (questionData.sentence[currentIndex] == questionData.sentence[n]) {
                finalSentece += (questionData.sentence[n]) + ' ';
                countNum++;
            }
        }
        if (countNum >= questionData.sentence.length) {
            playerData.answerArray.push(finalSentece);
            playerData.score++;
            questionData.currentCorrect = 0;
            winCon = gameData.isUserScore = gameData.isUserCorrect = true;
        }
    }

    if (winCon) {
        animateWord();
    } else {
        gameData.dragging = true;
    }
}

/*!
 *
 * REVEAL ANSWER - This is the function that runs to reveal answer
 *
 */

function revealAnswers() {
    if (questionData.value.type == 1 || questionData.value.type == 2) {
        $('#gameStatus .gameAnswer').fadeIn();
    }

    if (questionData.value.type == 0 || questionData.value.type == 3) {
        questionData.currentCorrect = 0;
        questionData.shuffle.sort(function (a, b) {
            return a - b
        });
    } else if (questionData.value.type == 1) {
        questionData.shuffle = [];

        var wordArray = [];
        var indexArray = [];

        for (var n = 0; n < questionData.word.length; n++) {
            wordArray.push(questionData.word[n]);
            indexArray.push(n);
        }

        var revealWord = '';
        for (var n = 0; n < questionData.correct.length; n++) {
            if (!questionData.correct[n].status && revealWord == '') {
                questionData.currentCorrect = n;
                questionData.totalCorrect++;
                questionData.correct[n].status = true;
                revealWord = questionData.correct[n].word;
                questionData.complete.push(revealWord);
            }
        }

        for (var n = 0; n < revealWord.length; n++) {
            var thisLetter = revealWord.substring(n, n + 1);
            var targetIndex = wordArray.indexOf(thisLetter);

            questionData.shuffle.push(indexArray[targetIndex]);
            wordArray.splice(targetIndex, 1);
            indexArray.splice(targetIndex, 1);
        }
    } else if (questionData.value.type == 2) {
        questionData.shuffle = [];

        var wordArray = [];
        var indexArray = [];

        for (var n = 0; n < questionData.word.length; n++) {
            wordArray.push(questionData.word[n]);
            indexArray.push(n);
        }

        var revealWord = '';
        for (var n = 0; n < questionData.correct.length; n++) {
            if (!questionData.correct[n].status && revealWord == '') {
                questionData.currentCorrect = n;
                questionData.totalCorrect++;
                questionData.correct[n].status = true;
                revealWord = questionData.correct[n].word;
                questionData.complete.push(revealWord);
            }
        }

        for (var n = 0; n < revealWord.length; n++) {
            var thisLetter = revealWord.substring(n, n + 1);
            var targetIndex = wordArray.indexOf(thisLetter);

            questionData.shuffle.push(indexArray[targetIndex]);
            wordArray.splice(targetIndex, 1);
            indexArray.splice(targetIndex, 1);
        }

        questionData.abandon = indexArray;
    }

    questionData.reveal = true;
    checkWordData();
    positionSentenceNow(true);
    animateWord();
}

/*!
 *
 * ANIMATE WORD - This is the function that runs to aniamte word
 *
 */

function animateWord() {
    gameData.answered = true;

    toggleGameTimer(false);
    toggleRevealTimer(false);
    $('#buttonReveal').hide();

    $(".draggable").draggable({ disabled: true });
    gameData.readyComplete = false;

    stopAudio();
    playAudioLoop();
    playSound('soundConfirm');
    revealData.reset = true;

    TweenMax.to($('#questionHolder'), 1, {
        overwrite: true, onComplete: function () {
            TweenMax.to($('.dragFocus'), dragSettings.answerAnimateTween, {
                scale: dragSettings.answerAnimateScale, overwrite: true, onComplete: function () {
                    TweenMax.to($('.dragFocus'), dragSettings.answerAnimateTween, {
                        scale: 1, overwrite: true, onComplete: function () {
                            questionData.reveal = false;
                            updateGameStatus();

                            gameData.readyForNext = true;
                            if (questionData.value.type == 1 || questionData.value.type == 2) {
                                if (questionData.totalCorrect < questionData.correct.length) {
                                    gameData.readyForNext = false;
                                    gameData.answered = false;
                                }
                            }

                            gameData.readyComplete = true;
                            if (!audioData.playing) {
                                animateWordComplete();
                            }
                        }
                    });
                }
            });
        }
    });
}

function animateWordComplete() {
    if (gameData.readyForNext && !$.editor.enable) {
        //complete questions
        gameData.readyForNext = false;

        if (gameData.isUserScore) {
            playerData.answerCorrectStatus = true;
            gameData.isUserScore = false;
            gameData.isUserCorrect = false;
        }

        checkDisplayGameStatus();
    } else {
        //found new word
        if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
            postMemberProgress(false);
        } else {
            returnAfterProgress();
        }
    }
}

function returnAfterProgress() {
    toggleQuestionLoader(false);

    toggleGameTimer(true);
    toggleRevealTimer(true, 'reset');

    //found new word
    if (gameData.isUserCorrect) {
        gameData.isUserScore = false;
        gameData.isUserCorrect = false;
        displayGameStatus('correct');
    }

    gameData.dragging = true;
    $(".draggable").draggable({ disabled: false });
}

/*!
 *
 * DISPLAY QUESTION RESULT - This is the function that runs to display question result
 *
 */
function checkDisplayGameStatus() {
    if (!playerData.answerRevealed) {
        playerData.answerRevealed = true;

        if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
            playerData.answerArray = playerData.answerArray.toString();
            postMemberProgress();
        } else {
            returnToQuestion();
        }
    }
}

function returnToQuestion() {
    if (playerData.answerResult) {
        toggleResult(false);
        displayGameStatus('timesup');
        TweenMax.to($('#questionHolder'), 3, {
            overwrite: true, onComplete: function () {
                goPage('result');
            }
        });
    } else {
        animateCorrectAnswers();
    }
}

function animateCorrectAnswers() {
    if (playerData.answerCorrectStatus) {
        displayGameStatus('score');
    }

    TweenMax.to($('#questionHolder'), 3, {
        overwrite: true, onComplete: function () {
            if (gameData.answered) {
                toggleQuestionLoader(true);
                prepareNextQuestion();
            }
        }
    });
}

/*!
 *
 * DISPLAY GAME STATUS - This is the function that runs to display game status
 *
 */
function displayGameStatus(con) {
    playerData.answer = con;
    $('#buttonReveal').hide();
    $('#gameStatus .gameAnswer').hide();

    var displayText = '';
    if (playerData.answer == 'correct') {
        playSound('soundCorrect');
        displayText = questionSettings.correctText;
    } else if (playerData.answer == 'score') {
        playSound('soundCorrect');
        displayText = questionSettings.scoreText;
    } else if (playerData.answer == 'timesup') {
        displayText = timerSettings.timesupText;
    }

    $('#gameStatus .gameDisplayStatus').html(displayText)
    $('#gameStatus .gameDisplay').show();

    TweenMax.to($('#gameStatus .gameDisplay'), .3, {
        scale: 1.5, overwrite: true, onComplete: function () {
            TweenMax.to($('#gameStatus .gameDisplay'), .3, {
                scale: 1, overwrite: true, onComplete: function () {
                    TweenMax.to($('#gameStatus .gameDisplay'), 2, {
                        scale: 1, overwrite: true, onComplete: function () {
                            $('#gameStatus .gameDisplay').hide();
                            updateGameStatus();
                        }
                    });
                }
            });
        }
    });
}

/*!
 *
 * GET ARRAY VALUE - This is the function that runs to get array value
 *
 */
function getArrayValue(type, answerNum, n) {
    var value = {
        type: '',
        text: '',
        x: '',
        y: '',
        fontSize: '',
        lineHeight: '',
        color: '',
        bottomX: '',
        bottomY: '',
        bottomFontSize: '',
        bottomLineHeight: '',
        bottomColor: '',
    };

    if (type == 'question') {
        value.type = Number(gameData.targetArray[gameData.sequenceNum].type);

        if (value.type == 3) {
            value.x = !checkValue(gameData.targetArray[gameData.sequenceNum].x) ? sentenceProperty.x : gameData.targetArray[gameData.sequenceNum].x;
            value.y = !checkValue(gameData.targetArray[gameData.sequenceNum].y) ? sentenceProperty.y : gameData.targetArray[gameData.sequenceNum].y;

            value.spaceX = !checkValue(gameData.targetArray[gameData.sequenceNum].spaceX) ? sentenceProperty.spaceX : gameData.targetArray[gameData.sequenceNum].spaceX;
            value.spaceY = !checkValue(gameData.targetArray[gameData.sequenceNum].spaceY) ? sentenceProperty.spaceY : gameData.targetArray[gameData.sequenceNum].spaceY;

            value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].fontSize) ? sentenceProperty.fontSize : gameData.targetArray[gameData.sequenceNum].fontSize;
            value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].lineHeight) ? sentenceProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].lineHeight;
            value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].color) ? sentenceProperty.color : gameData.targetArray[gameData.sequenceNum].color;
            value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].width) ? sentenceProperty.width : gameData.targetArray[gameData.sequenceNum].width;
            value.shadow = !checkValue(gameData.targetArray[gameData.sequenceNum].shadow) ? 0 : gameData.targetArray[gameData.sequenceNum].shadow;
            value.shadowHover = !checkValue(gameData.targetArray[gameData.sequenceNum].shadowHover) ? 0 : gameData.targetArray[gameData.sequenceNum].shadowHover;
        } else {
            value.x = !checkValue(gameData.targetArray[gameData.sequenceNum].x) ? wordProperty.x : gameData.targetArray[gameData.sequenceNum].x;
            value.y = !checkValue(gameData.targetArray[gameData.sequenceNum].y) ? wordProperty.y : gameData.targetArray[gameData.sequenceNum].y;

            value.spaceX = !checkValue(gameData.targetArray[gameData.sequenceNum].spaceX) ? wordProperty.spaceX : gameData.targetArray[gameData.sequenceNum].spaceX;
            value.spaceY = !checkValue(gameData.targetArray[gameData.sequenceNum].spaceY) ? wordProperty.spaceY : gameData.targetArray[gameData.sequenceNum].spaceY;

            value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].fontSize) ? wordProperty.fontSize : gameData.targetArray[gameData.sequenceNum].fontSize;
            value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].lineHeight) ? wordProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].lineHeight;
            value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].color) ? wordProperty.color : gameData.targetArray[gameData.sequenceNum].color;
            value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].width) ? wordProperty.width : gameData.targetArray[gameData.sequenceNum].width;
            value.shadow = !checkValue(gameData.targetArray[gameData.sequenceNum].shadow) ? 0 : gameData.targetArray[gameData.sequenceNum].shadow;
            value.shadowHover = !checkValue(gameData.targetArray[gameData.sequenceNum].shadowHover) ? 0 : gameData.targetArray[gameData.sequenceNum].shadowHover;
        }


        value.bottomX = !checkValue(gameData.targetArray[gameData.sequenceNum].bottomX) ? wordBottomProperty.x : gameData.targetArray[gameData.sequenceNum].bottomX;
        value.bottomY = !checkValue(gameData.targetArray[gameData.sequenceNum].bottomY) ? wordBottomProperty.y : gameData.targetArray[gameData.sequenceNum].bottomY;
        value.bottomSpaceX = !checkValue(gameData.targetArray[gameData.sequenceNum].bottomSpaceX) ? wordBottomProperty.spaceX : gameData.targetArray[gameData.sequenceNum].bottomSpaceX;
        value.bottomSpaceY = !checkValue(gameData.targetArray[gameData.sequenceNum].bottomSpaceY) ? wordBottomProperty.spaceY : gameData.targetArray[gameData.sequenceNum].bottomSpaceY;
        value.bottomFontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].bottomFontSize) ? wordBottomProperty.fontSize : gameData.targetArray[gameData.sequenceNum].bottomFontSize;
        value.bottomLineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].bottomLineHeight) ? wordBottomProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].bottomLineHeight;
        value.bottomColor = !checkValue(gameData.targetArray[gameData.sequenceNum].bottomColor) ? wordBottomProperty.color : gameData.targetArray[gameData.sequenceNum].bottomColor;
        value.bottomWidth = !checkValue(gameData.targetArray[gameData.sequenceNum].bottomWidth) ? wordBottomProperty.width : gameData.targetArray[gameData.sequenceNum].bottomWidth;

    } else if (type == 'description') {
        value.type = gameData.targetArray[gameData.sequenceNum].description.type;
        value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].description.top) ? descriptionProperty.top : gameData.targetArray[gameData.sequenceNum].description.top;
        value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].description.left) ? descriptionProperty.left : gameData.targetArray[gameData.sequenceNum].description.left;
        value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].description.width) ? descriptionProperty.width : gameData.targetArray[gameData.sequenceNum].description.width;
        value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].description.height) ? descriptionProperty.height : gameData.targetArray[gameData.sequenceNum].description.height;
        value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].description.fontSize) ? descriptionProperty.fontSize : gameData.targetArray[gameData.sequenceNum].description.fontSize;
        value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].description.lineHeight) ? descriptionProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].description.lineHeight;
        value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].description.color) ? descriptionProperty.color : gameData.targetArray[gameData.sequenceNum].description.color;
        value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].description.align) ? descriptionProperty.align : gameData.targetArray[gameData.sequenceNum].description.align;
    } else if (type == 'background') {
        value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].background.top) ? backgroundProperty.top : gameData.targetArray[gameData.sequenceNum].background.top;
        value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].background.left) ? backgroundProperty.left : gameData.targetArray[gameData.sequenceNum].background.left;
        value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].background.width) ? backgroundProperty.width : gameData.targetArray[gameData.sequenceNum].background.width;
        value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].background.height) ? backgroundProperty.height : gameData.targetArray[gameData.sequenceNum].background.height;
        value.background = gameData.targetArray[gameData.sequenceNum].background.text;
    } else if (type == 'video') {
        value.embed = gameData.targetArray[gameData.sequenceNum].videos[answerNum].embed;
        value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].top) ? videoProperty.top : gameData.targetArray[gameData.sequenceNum].videos[answerNum].top;
        value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].left) ? videoProperty.left : gameData.targetArray[gameData.sequenceNum].videos[answerNum].left;
        value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].width) ? videoProperty.width : gameData.targetArray[gameData.sequenceNum].videos[answerNum].width;
        value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].height) ? videoProperty.height : gameData.targetArray[gameData.sequenceNum].videos[answerNum].height;
        value.autoplay = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].autoplay) ? videoProperty.autoplay : gameData.targetArray[gameData.sequenceNum].videos[answerNum].autoplay;
        value.controls = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].controls) ? videoProperty.controls : gameData.targetArray[gameData.sequenceNum].videos[answerNum].controls;
    }

    return value;
}

function checkValue(value) {
    if (value == undefined || value == '') {
        return false;
    } else {
        return true;
    }
}

/*!
 *
 * AUDIO - This is the function that runs to play question and description audio
 *
 */
function playAudioLoop(con) {
    if (gameData.targetAudio.length <= 0) {
        return;
    }

    if (con == 'description') {
        audioData.audioNum = 0;
        if (gameData.targetAudio[audioData.audioNum].type == 'description') {
            audioData.playing = true;
            TweenMax.to(audioData, audioSettings.description / 1000, {
                overwrite: true, onComplete: function () {
                    playAudio(gameData.targetAudio[audioData.audioNum].id);
                }
            });
        }
    } else {
        for (var n = 0; n < gameData.targetAudio.length; n++) {
            if (gameData.targetAudio[n].type == 'answer' && gameData.targetAudio[n].sort == questionData.currentCorrect) {
                audioData.playing = true;
                audioData.audioNum = n;
            }
        }

        TweenMax.to(audioData, audioSettings.answer / 1000, {
            overwrite: true, onComplete: function () {
                playAudio(gameData.targetAudio[audioData.audioNum].id);
            }
        });
    }
}

function playAudioComplete() {
    audioData.playing = false;

    if (gameData.targetAudio[audioData.audioNum].type == 'answer' && gameData.readyComplete) {
        animateWordComplete();
    }
}

/*!
 *
 * BUILD DESCRIPTION - This is the function that runs to build description
 *
 */
function buildDescription() {
    var value = getArrayValue('description');
    if (value.type == 'image') {
        var desriptionHTML = '<div class="description fontDescription fitImg" style="top:' + value.top + '%; left:' + value.left + '%; width:' + value.width + '%; "><img src="' + gameData.targetArray[gameData.sequenceNum].description.text + '" /></div>';

    } else {
        var desriptionHTML = '<div class="description fontDescription resizeFont" data-fontSize="' + value.fontSize + '" data-lineHeight="' + value.lineHeight + '" style="font-size:' + value.fontSize + 'px; line-height:' + value.lineHeight + 'px; color:' + value.color + ';  text-align:' + value.align + '; top:' + value.top + '%; left:' + value.left + '%; width:' + value.width + '%; height:' + value.height + '%; ">' + gameData.targetArray[gameData.sequenceNum].description.text + '</div>';
    }
    $('#descriptionHolder').append(desriptionHTML);
}

/*!
 *
 * BUILD BACKGROUND - This is the function that runs to build background
 *
 */
function buildBackground() {
    var value = getArrayValue('background');
    if (value.background != '') {
        var backgroundHTML = '<div class="background fitImg" style="top:' + value.top + '%; left:' + value.left + '%; width:' + value.width + '%; "><img src="' + gameData.targetArray[gameData.sequenceNum].background.text + '" /></div>';
        $('#backgroundHolder').append(backgroundHTML);
    }
}


/*!
 *
 * BUILD VIDEO - This is the function that runs to build video
 *
 */
function buildVideo() {
    if (gameData.targetArray[gameData.sequenceNum].videos[0] == undefined) {
        return;
    }
    if (gameData.targetArray[gameData.sequenceNum].videos[0].types.length <= 0) {
        return;
    }

    var value = getArrayValue('video', 0);
    var videoProperty = '';
    var videoWrapperHTML = '<div id="videoHolder" style="top:' + value.top + '%; left:' + value.left + '%; width:' + value.width + '%; height:' + value.height + '%;">';

    if (value.embed == 'youtube') {
        for (var n = 0; n < gameData.targetArray[gameData.sequenceNum].videos[0].types.length; n++) {
            videoWrapperHTML += gameData.targetArray[gameData.sequenceNum].videos[0].types[n].src;
        }
        videoWrapperHTML += '</div>';
    } else {
        if (value.autoplay == 'true' || value.autoplay == true) {
            videoProperty += ' autoplay';
        }
        if (value.controls == 'true' || value.controls == true) {
            videoProperty += ' controls';
        }
        videoWrapperHTML += '<video width="100%" height="100%"' + videoProperty + '>';
        for (var n = 0; n < gameData.targetArray[gameData.sequenceNum].videos[0].types.length; n++) {
            videoWrapperHTML += '<source src="' + gameData.targetArray[gameData.sequenceNum].videos[0].types[n].src + '" type="' + gameData.targetArray[gameData.sequenceNum].videos[0].types[n].type + '">';
        }
        videoWrapperHTML += 'Your browser does not support the video tag.';
        videoWrapperHTML += '</video>';
        videoWrapperHTML += '</div>';
    }

    $('#descriptionHolder').append(videoWrapperHTML);
    if (value.embed == 'youtube') {
        $('#videoHolder iframe').attr('data-src', $('#videoHolder iframe').attr('src'));
    }
}


/*!
 *
 * PREPARE NEXT QUESTION - This is the function that runs for next question
 *
 */
function prepareNextQuestion() {
    $('#gameStatus .gameAnswer').hide();
    $('#gameStatus .gameDisplay').hide();
    $('#buttonReveal').hide();

    stopVideoPlayer(false);

    TweenMax.killTweensOf($('#questionHolder'));
    gameData.answered = false;
    stopAudio();

    var totalQuestionsLength = gameData.sequence_arr.length;
    if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
        totalQuestionsLength = gameData.questionList.length;
    }

    if (questionSettings.totalQuestionLimit != 0) {
        gameData.questionNum++;
        if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
            gameData.questionIndex++;
        }

        var totalMax = questionSettings.totalQuestionLimit > totalQuestionsLength ? totalQuestionsLength : questionSettings.totalQuestionLimit;
        if (gameData.questionNum < totalMax) {
            if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
                loadMemberQuestion(gameData.questionList[gameData.questionIndex]);
            } else {
                loadQuestion();
            }
        } else {
            goPage('result');
        }
    } else {
        if (gameData.questionNum < totalQuestionsLength - 1) {
            gameData.questionNum++;
            if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
                gameData.questionIndex++;
                loadMemberQuestion(gameData.questionList[gameData.questionIndex]);
            } else {
                loadQuestion();
            }
        } else {
            goPage('result');
        }
    }
}

function playYoutubeVideo() {
    $('#videoHolder iframe').attr('src', $('#videoHolder iframe').attr('data-src'));
}

function stopVideoPlayer(con) {
    $("video").each(function () {
        $(this).get(0).pause();
    });

    if (con) {
        $('#videoHolder iframe').attr('src', '');
    }
}

/*!
 *
 * UPDATE GAME STATUS - This is the function that runs to update game status
 *
 */

function updateGameStatus() {
    //total display
    var curQuestionText = questionSettings.totalText.replace('[NUMBER]', (Number(gameData.questionNum) + 1));
    var totalQuestionsLength = gameData.sequence_arr.length;
    if (typeof memberData != 'undefined' && memberSettings.enableMembership) {
        totalQuestionsLength = gameData.questionList.length;
    }
    if (questionSettings.totalQuestionLimit != 0) {
        var totalMax = questionSettings.totalQuestionLimit > totalQuestionsLength ? gameData.sequence_arr.length : totalQuestionsLength;
        curQuestionText = curQuestionText.replace('[TOTAL]', totalMax);
    } else {
        curQuestionText = curQuestionText.replace('[TOTAL]', totalQuestionsLength);
    }
    $('#gameStatus .gameQuestionStatus').html(curQuestionText);

    //total answer
    if (questionData.value.type == 1 || questionData.value.type == 2) {
        var answerNum = questionData.correct.length - questionData.totalCorrect;
        var curAnswerText = questionSettings.answerLeftText.replace('[NUMBER]', answerNum);
        //curAnswerText = curAnswerText.replace('[TOTAL]', questionData.correct.length);
        $('#gameStatus .gameAnswerStatus').html(curAnswerText);

        if (!$('#gameStatus .gameAnswer').is(":visible")) {
            $('#gameStatus .gameAnswer').hide();
            $('#gameStatus .gameAnswer').fadeIn();
        }

        if (answerNum == 0) {
            $('#gameStatus .gameAnswer').hide();
        }
    }

    //description
    var completeString = '';
    var comma = ', ';
    for (var n = 0; n < questionData.complete.length; n++) {
        completeString += questionData.complete[n];
        if (n != questionData.complete.length - 1) {
            completeString += comma;
        }
    }
    $('#descriptionHolder .description').html(gameData.targetArray[gameData.sequenceNum].description.text.replace('[COMPLETE]', completeString));
}

/*!
 *
 * TOGGLE QUESTION LOADER - This is the function that runs to display question loader
 *
 */
function toggleQuestionLoader(con) {
    if (con) {
        $('#questionLoaderHolder').show();
        $('#questionWrapperHolder').hide();
    } else {
        $('#questionLoaderHolder').hide();
        $('#questionWrapperHolder').show();
    }
}

/*!
 *
 * GAME TIMER - This is the function that runs for game timer
 *
 */
function toggleGameTimer(con) {
    $('.gameTimer').hide();

    if ($.editor.enable) {
        return;
    }

    if (!timerSettings.status) {
        return;
    }

    $('.gameTimer').show();

    if (con) {
        if (storeData.status) {
            timeData.startDate = storeData.timerDate;
        } else {
            timeData.startDate = storeData.timerDate = new Date();
        }
        loopGameTimer();
    } else {
        if (timerSettings.session == 'all') {
            timeData.accumulate = timeData.timer;
            timeData.countdown = timeData.timer;
        }
    }
    timeData.enable = con;
}

function loopGameTimer() {
    TweenMax.to(timeData, .2, { overwrite: true, onComplete: updateGameTimer });
}

function updateGameTimer() {
    if (!timeData.enable) {
        return;
    }

    timeData.nowDate = new Date();
    var elapsedTime = (timeData.nowDate.getTime() - timeData.startDate.getTime());

    if (timerSettings.mode == 'default') {
        timeData.timer = Math.floor(elapsedTime + timeData.accumulate);
    } else if (timerSettings.mode == 'countdown') {
        timeData.timer = Math.floor(((timeData.countdown)) - (elapsedTime))
    }

    $('.gameTimerStatus').html(millisecondsToTime(timeData.timer));

    var timerContinue = true;
    if (timerSettings.mode == 'countdown') {
        if (timeData.timer <= 0) {
            playSound('soundOver');
            timerContinue = false;
        }
    }

    if (timerContinue) {
        loopGameTimer();
    } else {
        gameData.dragging = false;
        $('.gameTimerStatus').html(millisecondsToTime(0));
        playerData.answerResult = true;
        checkDisplayGameStatus();
    }
}

/*!
 *
 * GAME REVEAL TIMER - This is the function that runs for game reveal timer
 *
 */
function toggleRevealTimer(con, type) {
    if ($.editor.enable) {
        return;
    }

    if (!revealAnswerSettings.status) {
        return;
    }

    if (con) {
        if (revealData.reset) {
            revealData.reset = false;
            revealData.startDate = storeData.revealDate = new Date();
        } else if (storeData.status && type == 'continue') {
            revealData.startDate = storeData.revealDate;
        } else {
            revealData.reset = false;
            revealData.startDate = storeData.revealDate = new Date();
        }
        loopRevealTimer();
    } else {
        TweenMax.killTweensOf(revealData);
    }
    revealData.enable = con;
}

function loopRevealTimer() {
    TweenMax.to(revealData, .2, { overwrite: true, onComplete: updateRevealTimer });
}

function updateRevealTimer() {
    if (!revealData.enable) {
        return;
    }

    revealData.nowDate = new Date();
    revealData.timer = (revealData.nowDate.getTime() - revealData.startDate.getTime());

    if (revealData.timer >= revealAnswerSettings.timer) {
        toggleRevealTimer(false);

        if (!gameData.answered) {
            playSound('soundReveal');
            $('#gameStatus .gameAnswer').hide();
            $('#buttonReveal').fadeIn();
        }
    } else {
        loopRevealTimer()
    }
}

/*!
 *
 * TOGGLE RESULT - This is the function that runs to toggle result
 *
 */
function toggleResult(con) {
    if (con) {
        $('.itemWinnerCup img').attr('src', 'assets/item_cup.svg');
    } else {
        $('.itemWinnerCup img').attr('src', 'assets/item_cup_over.svg');
    }
}

/*!
 *
 * XML - This is the function that runs to load word from xml
 *
 */
function loadXML(src) {
    $('.preloadText').show();
    $('#buttonStart').hide();

    $.ajax({
        url: src,

        type: "GET",
        dataType: "xml",
        success: function (result) {
            if ($.editor.enable) {
                edit.xmlFile = result;
            }

            $(result).find('thumb').each(function (catIndex, catElement) {
                var parent = $(catElement).attr('parent') == undefined ? '' : $(catElement).attr('parent');
                gameData.categoryThumb_arr.push({
                    src: $(catElement).text(),
                    name: $(catElement).attr('name'),
                    parent: parent
                });
            });

            $(result).find('item').each(function (questionIndex, questionElement) {
                pushDataArray(questionIndex, questionElement);
            });

            loadXMLComplete();
        }
    });
}

function pushDataArray(questionIndex, questionElement) {
    var curCategory = $(questionElement).find('category').text();
    if (curCategory != '') {
        gameData.category_arr.push($(questionElement).find('category').text());
    }

    //landscape
    $(questionElement).find('landscape').each(function (landscapeIndex, landscapeElement) {
        quesLandscape_arr.push({

            category: curCategory,
            text: $(landscapeElement).find('question').text(),
            audio: $(landscapeElement).find('question').attr('audio'),
            type: $(landscapeElement).find('question').attr('type'),
            fontSize: $(landscapeElement).find('question').attr('fontSize'),
            lineHeight: $(landscapeElement).find('question').attr('lineHeight'),
            color: $(landscapeElement).find('question').attr('color'),
            x: $(landscapeElement).find('question').attr('x'),
            y: $(landscapeElement).find('question').attr('y'),
            spaceX: $(landscapeElement).find('question').attr('spaceX'),
            spaceY: $(landscapeElement).find('question').attr('spaceY'),
            width: $(landscapeElement).find('question').attr('width'),
            shadow: $(landscapeElement).find('question').attr('shadow'),
            shadowHover: $(landscapeElement).find('question').attr('shadowHover'),
            bottomFontSize: $(landscapeElement).find('question').attr('bottomFontSize'),
            bottomLineHeight: $(landscapeElement).find('question').attr('bottomLineHeight'),
            bottomColor: $(landscapeElement).find('question').attr('bottomColor'),
            bottomX: $(landscapeElement).find('question').attr('bottomX'),
            bottomY: $(landscapeElement).find('question').attr('bottomY'),
            bottomSpaceX: $(landscapeElement).find('question').attr('bottomSpaceX'),
            bottomSpaceY: $(landscapeElement).find('question').attr('bottomSpaceY'),
            bottomWidth: $(landscapeElement).find('question').attr('bottomWidth'),

            description: {
                type: $(landscapeElement).find('description').attr('type'),
                text: $(landscapeElement).find('description').text(),
                fontSize: $(landscapeElement).find('description').attr('fontSize'),
                lineHeight: $(landscapeElement).find('description').attr('lineHeight'),
                color: $(landscapeElement).find('description').attr('color'),
                align: $(landscapeElement).find('description').attr('align'),
                top: $(landscapeElement).find('description').attr('top'),
                left: $(landscapeElement).find('description').attr('left'),
                width: $(landscapeElement).find('description').attr('width'),
                height: $(landscapeElement).find('description').attr('height'),
                audio: $(landscapeElement).find('description').attr('audio'),
            },
            background: {
                text: $(landscapeElement).find('background').text(),
                top: $(landscapeElement).find('background').attr('top'),
                left: $(landscapeElement).find('background').attr('left'),
                width: $(landscapeElement).find('background').attr('width'),
                height: $(landscapeElement).find('background').attr('height')
            },
            videos: []
        });

        $(landscapeElement).find('videos').each(function (videosIndex, videosElement) {
            quesLandscape_arr[questionIndex].videos.push({
                width: $(videosElement).attr('width'),
                height: $(videosElement).attr('height'),
                top: $(videosElement).attr('top'),
                left: $(videosElement).attr('left'),
                autoplay: $(videosElement).attr('autoplay'),
                controls: $(videosElement).attr('controls'),
                embed: $(videosElement).attr('embed'),
                types: []
            });

            $(videosElement).find('video').each(function (videoIndex, videoElement) {
                quesLandscape_arr[questionIndex].videos[videosIndex].types.push({
                    src: $(videoElement).text(),
                    type: $(videoElement).attr('type')
                });
            });
        });
    });

    //portrait
    $(questionElement).find('portrait').each(function (portraitIndex, portraitElement) {
        quesPortrait_arr.push({

            category: curCategory,
            text: $(portraitElement).find('question').text(),
            audio: $(portraitElement).find('question').attr('audio'),
            type: $(portraitElement).find('question').attr('type'),
            fontSize: $(portraitElement).find('question').attr('fontSize'),
            lineHeight: $(portraitElement).find('question').attr('lineHeight'),
            color: $(portraitElement).find('question').attr('color'),
            x: $(portraitElement).find('question').attr('x'),
            y: $(portraitElement).find('question').attr('y'),
            spaceX: $(portraitElement).find('question').attr('spaceX'),
            spaceY: $(portraitElement).find('question').attr('spaceY'),
            width: $(portraitElement).find('question').attr('width'),
            shadow: $(portraitElement).find('question').attr('shadow'),
            shadowHover: $(portraitElement).find('question').attr('shadowHover'),
            bottomFontSize: $(portraitElement).find('question').attr('bottomFontSize'),
            bottomLineHeight: $(portraitElement).find('question').attr('bottomLineHeight'),
            bottomColor: $(portraitElement).find('question').attr('bottomColor'),
            bottomX: $(portraitElement).find('question').attr('bottomX'),
            bottomY: $(portraitElement).find('question').attr('bottomY'),
            bottomSpaceX: $(portraitElement).find('question').attr('bottomSpaceX'),
            bottomSpaceY: $(portraitElement).find('question').attr('bottomSpaceY'),
            bottomWidth: $(portraitElement).find('question').attr('bottomWidth'),


            description: {
                type: $(portraitElement).find('description').attr('type'),
                text: $(portraitElement).find('description').text(),
                fontSize: $(portraitElement).find('description').attr('fontSize'),
                lineHeight: $(portraitElement).find('description').attr('lineHeight'),
                color: $(portraitElement).find('description').attr('color'),
                align: $(portraitElement).find('description').attr('align'),
                top: $(portraitElement).find('description').attr('top'),
                left: $(portraitElement).find('description').attr('left'),
                width: $(portraitElement).find('description').attr('width'),
                height: $(portraitElement).find('description').attr('height'),
                audio: $(portraitElement).find('description').attr('audio'),
            },
            background: {
                text: $(portraitElement).find('background').text(),
                top: $(portraitElement).find('background').attr('top'),
                left: $(portraitElement).find('background').attr('left'),
                width: $(portraitElement).find('background').attr('width'),
                height: $(portraitElement).find('background').attr('height')
            },
            videos: []
        });

        $(portraitElement).find('videos').each(function (videosIndex, videosElement) {
            quesPortrait_arr[questionIndex].videos.push({
                width: $(videosElement).attr('width'),
                height: $(videosElement).attr('height'),
                top: $(videosElement).attr('top'),
                left: $(videosElement).attr('left'),
                autoplay: $(videosElement).attr('autoplay'),
                controls: $(videosElement).attr('controls'),
                embed: $(videosElement).attr('embed'),
                types: []
            });

            $(videosElement).find('video').each(function (videoIndex, videoElement) {
                quesPortrait_arr[questionIndex].videos[videosIndex].types.push({
                    src: $(videoElement).text(),
                    type: $(videoElement).attr('type')
                });
            });
        });

    });
}

function pushJSONDataArray(questionElement) {
    var questionIndex = 0;
    quesLandscape_arr = [];
    quesPortrait_arr = [];

    if (typeof questionElement.landscape.description == 'undefined') {
        questionElement.landscape.description = { text: '' };
    }

    if (typeof questionElement.landscape.background == 'undefined') {
        questionElement.landscape.background = { text: '' };
    }

    if (typeof questionElement.landscape.videos == 'undefined') {
        questionElement.landscape.videos = { video: [] };
    }

    //landscape
    quesLandscape_arr.push({
        text: questionElement.landscape.question.text,
        audio: questionElement.landscape.question.audio,
        type: questionElement.landscape.question.type,
        fontSize: questionElement.landscape.question.fontSize,
        lineHeight: questionElement.landscape.question.lineHeight,
        color: questionElement.landscape.question.color,
        x: questionElement.landscape.question.x,
        y: questionElement.landscape.question.y,
        spaceX: questionElement.landscape.question.spaceX,
        spaceY: questionElement.landscape.question.spaceY,
        width: questionElement.landscape.question.width,
        shadow: questionElement.landscape.question.shadow,
        shadowHover: questionElement.landscape.question.shadowHover,
        bottomFontSize: questionElement.landscape.question.bottomFontSize,
        bottomLineHeight: questionElement.landscape.question.bottomLineHeight,
        bottomColor: questionElement.landscape.question.bottomColor,
        bottomX: questionElement.landscape.question.bottomX,
        bottomY: questionElement.landscape.question.bottomY,
        bottomSpaceX: questionElement.landscape.question.bottomSpaceX,
        bottomSpaceY: questionElement.landscape.question.bottomSpaceY,
        bottomWidth: questionElement.landscape.question.bottomWidth,
        description: {
            text: !checkValue(questionElement.landscape.description.text) ? '' : questionElement.landscape.description.text,
            fontSize: questionElement.landscape.description.fontSize,
            lineHeight: questionElement.landscape.description.lineHeight,
            color: questionElement.landscape.description.color,
            align: questionElement.landscape.description.align,
            top: questionElement.landscape.description.top,
            left: questionElement.landscape.description.left,
            width: questionElement.landscape.description.width,
            height: questionElement.landscape.description.height,
            type: questionElement.landscape.description.type,
            audio: questionElement.landscape.description.audio,
        },
        background: {
            text: !checkValue(questionElement.landscape.background.text) ? '' : questionElement.landscape.background.text,
            top: questionElement.landscape.background.top,
            left: questionElement.landscape.background.left,
            width: questionElement.landscape.background.width,
            height: questionElement.landscape.background.height
        },
        videos: []
    });

    //videos
    quesLandscape_arr[questionIndex].videos.push({
        width: questionElement.landscape.videos.width,
        height: questionElement.landscape.videos.height,
        top: questionElement.landscape.videos.top,
        left: questionElement.landscape.videos.left,
        autoplay: questionElement.landscape.videos.autoplay,
        controls: questionElement.landscape.videos.controls,
        embed: questionElement.landscape.videos.embed,
        types: []
    });

    for (var n = 0; n < questionElement.landscape.videos.video.length; n++) {
        quesLandscape_arr[questionIndex].videos[0].types.push({
            src: questionElement.landscape.videos.video[n].src,
            type: questionElement.landscape.videos.video[n].type
        });
    }
    ;

    //portrait
    if (typeof questionElement.portrait.description == 'undefined') {
        questionElement.portrait.description = { text: '' };
    }

    if (typeof questionElement.portrait.background == 'undefined') {
        questionElement.portrait.background = { text: '' };
    }

    if (typeof questionElement.portrait.videos == 'undefined') {
        questionElement.portrait.videos = { video: [] };
    }

    //portrait
    quesPortrait_arr.push({
        text: questionElement.portrait.question.text,
        audio: questionElement.portrait.question.audio,
        type: questionElement.portrait.question.type,
        fontSize: questionElement.portrait.question.fontSize,
        lineHeight: questionElement.portrait.question.lineHeight,
        color: questionElement.portrait.question.color,
        x: questionElement.portrait.question.x,
        y: questionElement.portrait.question.y,
        spaceX: questionElement.portrait.question.spaceX,
        spaceY: questionElement.portrait.question.spaceY,
        width: questionElement.portrait.question.width,
        shadow: questionElement.portrait.question.shadow,
        shadowHover: questionElement.portrait.question.shadowHover,
        bottomFontSize: questionElement.portrait.question.bottomFontSize,
        bottomLineHeight: questionElement.portrait.question.bottomLineHeight,
        bottomColor: questionElement.portrait.question.bottomColor,
        bottomX: questionElement.portrait.question.bottomX,
        bottomY: questionElement.portrait.question.bottomY,
        bottomSpaceX: questionElement.portrait.question.bottomSpaceX,
        bottomSpaceY: questionElement.portrait.question.bottomSpaceY,
        bottomWidth: questionElement.portrait.question.bottomWidth,
        description: {
            text: !checkValue(questionElement.portrait.description.text) ? '' : questionElement.portrait.description.text,
            fontSize: questionElement.portrait.description.fontSize,
            lineHeight: questionElement.portrait.description.lineHeight,
            color: questionElement.portrait.description.color,
            align: questionElement.portrait.description.align,
            top: questionElement.portrait.description.top,
            left: questionElement.portrait.description.left,
            width: questionElement.portrait.description.width,
            height: questionElement.portrait.description.height,
            type: questionElement.portrait.description.type,
            audio: questionElement.portrait.description.audio,
        },
        background: {
            text: !checkValue(questionElement.portrait.background.text) ? '' : questionElement.portrait.background.text,
            top: questionElement.portrait.background.top,
            left: questionElement.portrait.background.left,
            width: questionElement.portrait.background.width,
            height: questionElement.portrait.background.height
        },
        videos: []
    });

    //videos
    quesPortrait_arr[questionIndex].videos.push({
        width: questionElement.portrait.videos.width,
        height: questionElement.portrait.videos.height,
        top: questionElement.portrait.videos.top,
        left: questionElement.portrait.videos.left,
        autoplay: questionElement.portrait.videos.autoplay,
        controls: questionElement.portrait.videos.controls,
        embed: questionElement.portrait.videos.embed,
        types: []
    });

    for (var n = 0; n < questionElement.portrait.videos.video.length; n++) {
        quesPortrait_arr[questionIndex].videos[0].types.push({
            src: questionElement.portrait.videos.video[n].src,
            type: questionElement.portrait.videos.video[n].type
        });
    }
    ;
}

function loadXMLComplete() {
    $('.preloadText').hide();
    $('#buttonStart').show();

    gameData.targetArray = quesLandscape_arr;
    if (gameData.targetArray.length != 0) {
        gameData.category_arr = unique(gameData.category_arr);
        gameData.category_arr.sort();
        if (categorySettings.allOption) {
            gameData.category_arr.push(categorySettings.allText);
        }
    }

    if (categorySettings.status) {
        buildCategoryLevel();
        buildCategory();
    }

    if ($.editor.enable) {
        loadEditPage();
        goPage('game');
    } else {
        goPage('main');
    }
}

/*!
 *
 * QUESTION AND IMAGE PRELOADER - This is the function that runs to preload question image
 *
 */
var imageLoader, fileFest;

function loadQuestionAssets() {
    imageLoader = new createjs.LoadQueue(false);
    createjs.Sound.alternateExtensions = ["mp3"];
    imageLoader.installPlugin(createjs.Sound);

    imageLoader.addEventListener("complete", handleImageComplete);
    imageLoader.loadManifest(fileFest);
}

function handleImageComplete() {
    buildQuestion();
};

function removeSoundAssets() {
    stopAudio();

    for (var n = 0; n < audioLandscape_arr.length; n++) {
        createjs.Sound.removeSound(audioLandscape_arr[n].id);
    }
    for (var n = 0; n < audioPortrait_arr.length; n++) {
        createjs.Sound.removeSound(audioPortrait_arr[n].id);
    }
}

/*!
 *
 * RESIZE GAME - This is the function that runs to resize game
 *
 */
function resizeGameDetail() {
    if (gameData.mode != gameData.oldMode) {
        gameData.oldMode = gameData.mode;

        if (gameData.build && gameData.page == 'game') {
            buildQuestion();
        }
    }

    if (gameData.mode == 'portrait') {
        resetCategory();
        $('.fontPreload').attr('data-fontSize', 20);
        $('.fontPreload').attr('data-lineHeight', 20);
        $('.fontCategory').attr('data-fontSize', 16);
        $('.fontCategory').attr('data-lineHeight', 16);
        $('.fontCategoryNav').attr('data-fontSize', 16);
        $('.fontCategoryNav').attr('data-lineHeight', 26);

        $('.gameQuestionStatus').attr('data-fontSize', 20);
        $('.gameQuestionStatus').attr('data-lineHeight', 20);
        $('.gameTimerStatus').attr('data-fontSize', 20);
        $('.gameTimerStatus').attr('data-lineHeight', 20);
        $('.gameAnswerStatus').attr('data-fontSize', 18);
        $('.gameAnswerStatus').attr('data-lineHeight', 18);
        $('.gameDisplayStatus').attr('data-fontSize', 18);
        $('.gameDisplayStatus').attr('data-lineHeight', 18);

        $('.fontResultScore').attr('data-fontSize', 40);
        $('.fontResultScore').attr('data-lineHeight', 40);
        $('.fontShare').attr('data-fontSize', 25);
        $('.fontShare').attr('data-lineHeight', 25);

        $('.fontMessage').attr('data-fontSize', 25);
        $('.fontMessage').attr('data-lineHeight', 25);

        $('.fontScoreTitle').attr('data-fontSize', 25);
        $('.fontScoreTitle').attr('data-lineHeight', 25);
        $('.fontSubmitTitle').attr('data-fontSize', 25);
        $('.fontSubmitTitle').attr('data-lineHeight', 25);
        $('.fontScoreList').attr('data-fontSize', 15);
        $('.fontScoreList').attr('data-lineHeight', 15);

        $('.fontLabel').attr('data-fontSize', 20);
        $('.fontLabel').attr('data-lineHeight', 20);
        $('.fontInput').attr('data-fontSize', 20);
        $('.fontInput').attr('data-lineHeight', 20);
    } else {
        resetCategory();
        $('.fontPreload').attr('data-fontSize', 30);
        $('.fontPreload').attr('data-lineHeight', 30);
        $('.fontCategory').attr('data-fontSize', 30);
        $('.fontCategory').attr('data-lineHeight', 30);
        $('.fontCategoryNav').attr('data-fontSize', 20);
        $('.fontCategoryNav').attr('data-lineHeight', 30);

        $('.gameQuestionStatus').attr('data-fontSize', 40);
        $('.gameQuestionStatus').attr('data-lineHeight', 40);
        $('.gameTimerStatus').attr('data-fontSize', 40);
        $('.gameTimerStatus').attr('data-lineHeight', 40);
        $('.gameAnswerStatus').attr('data-fontSize', 30);
        $('.gameAnswerStatus').attr('data-lineHeight', 30);
        $('.gameDisplayStatus').attr('data-fontSize', 30);
        $('.gameDisplayStatus').attr('data-lineHeight', 30);

        $('.fontResultScore').attr('data-fontSize', 50);
        $('.fontResultScore').attr('data-lineHeight', 50);
        $('.fontShare').attr('data-fontSize', 30);
        $('.fontShare').attr('data-lineHeight', 30);

        $('.fontMessage').attr('data-fontSize', 30);
        $('.fontMessage').attr('data-lineHeight', 30);

        $('.fontScoreTitle').attr('data-fontSize', 50);
        $('.fontScoreTitle').attr('data-lineHeight', 50);
        $('.fontSubmitTitle').attr('data-fontSize', 50);
        $('.fontSubmitTitle').attr('data-lineHeight', 50);
        $('.fontScoreList').attr('data-fontSize', 20);
        $('.fontScoreList').attr('data-lineHeight', 20);

        $('.fontLabel').attr('data-fontSize', 30);
        $('.fontLabel').attr('data-lineHeight', 30);
        $('.fontInput').attr('data-fontSize', 30);
        $('.fontInput').attr('data-lineHeight', 30);
    }

    resizeGameFonts();

    checkTitleWordData();
    positionTitle();

    checkWordData();
    positionSentenceNow(false);
}

/*!
 *
 * RESIZE GAME FONTS - This is the function that runs to resize game fonts
 *
 */
function resizeGameFonts() {
    $('.resizeFont').each(function (index, element) {
        $(this).css('font-size', Math.round(Number($(this).attr('data-fontSize')) * scalePercent) + 'px');
        $(this).css('line-height', Math.round(Number($(this).attr('data-lineHeight')) * scalePercent) + 'px');
    });


    var shadowNum = dragSettings.shadow;
    var shadowHoverNum = dragSettings.shadowHover;

    if (gameData.mode == 'portrait') {
        shadowNum = dragSettings.shadow - 5;
        shadowHoverNum = dragSettings.shadowHover - 5;
    }

    $('.draggable, .titleWord').each(function (index, element) {
        var currentShadow = Number($(this).attr('data-shadow'));
        var pixel = shadowNum * scalePercent;
        if (currentShadow != 0) {
            pixel = currentShadow;
        }
        $(this).css('text-shadow', '0px ' + pixel + 'px 0px rgba(28,110,164,.5)');
    });

    $('.dragging').each(function (index, element) {
        var currentShadow = Number($(this).attr('data-shadowhover'));
        var pixel = shadowHoverNum * scalePercent;
        if (currentShadow != 0) {
            pixel = currentShadow;
        }
        $(this).css('text-shadow', '0px ' + pixel + 'px 0px rgba(28,110,164,.5)');
    });
}

/*!
 *
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 *
 */
function millisecondsToTime(milli) {
    var milliseconds = milli % 1000;
    var seconds = Math.floor((milli / 1000) % 60);
    var minutes = Math.floor((milli / (60 * 1000)) % 60);

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
}


/*!
 *
 * TOGGLE CONFIRM - This is the function that runs to toggle confirm exit
 *
 */
function toggleConfirm(con) {
    if (con) {
        $('#confirmHolder').show();
    } else {
        $('#confirmHolder').hide();
    }
}

/*!
 *
 * OPTIONS - This is the function that runs to mute and fullscreen
 *
 */
function toggleGameOption() {
    if ($('#buttonOption').hasClass('buttonOptionOn')) {
        $('#buttonOption').removeClass('buttonOptionOn');
        $('#buttonOption').addClass('buttonOptionOff');
        $('#optionList').hide();
    } else {
        $('#buttonOption').removeClass('buttonOptionOff');
        $('#buttonOption').addClass('buttonOptionOn');
        $('#optionList').show();
    }
}

function toggleGameMute() {
    if ($('#buttonSound').hasClass('buttonSoundOn')) {
        $('#buttonSound').removeClass('buttonSoundOn');
        $('#buttonSound').addClass('buttonSoundOff');
        toggleMute(true);
    } else {
        $('#buttonSound').removeClass('buttonSoundOff');
        $('#buttonSound').addClass('buttonSoundOn');
        toggleMute(false);
    }
}


function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();

        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}


/*!
 *
 * SHARE - This is the function that runs to open share url
 *
 */
function share(action) {
    gtag('event', 'click', { 'event_category': 'share', 'event_label': action });

    var loc = location.href
    loc = loc.substring(0, loc.lastIndexOf("/") + 1);

    var title = '';
    var text = '';

    if (resultSettings.mode == 'score') {
        title = shareSettings.shareTitle.replace("[SCORE]", playerData.score);
        text = shareSettings.shareMessage.replace("[SCORE]", playerData.score);
    } else if (resultSettings.mode == 'timer') {
        title = shareSettings.shareTitle.replace("[SCORE]", millisecondsToTime(playerData.timer));
        text = shareSettings.shareMessage.replace("[SCORE]", millisecondsToTime(playerData.timer));
    }
    var shareurl = '';

    if (action == 'twitter') {
        shareurl = 'https://twitter.com/intent/tweet?url=' + loc + '&text=' + text;
    } else if (action == 'facebook') {
        shareurl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(loc + 'share.php?desc=' + text + '&title=' + title + '&url=' + loc + '&thumb=' + loc + 'share.jpg&width=590&height=300');
    } else if (action == 'whatsapp') {
        shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
    }

    window.open(shareurl);
}