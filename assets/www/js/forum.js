var forumData, favouriteData = {};
var forumServiceUrl = webserviceUrl + 'Forum.php';
var postAnswerQuestionId = "";
var forumPageScrollCount, forumPageCommentsScrollCount, forumPageFavouriteScrollCount = 2;
var isAnswerFrom, serchTextGlobal = "";
var questionIndex = 0;
var isReadMoreComment, isReadMoreQuestion, isReadMoreFavourite = false;
var emailSetting = 0;
var mediaImage = "";
var mediaAnswerImage = "";
Appyscript.openForumPage = function openForumPage() {
 Appyscript.hideWebViewFragment();

    if (pageData.setting.emailnotification) {
        emailSetting = 1;
    }
    
    if (pageData.autoLogin == 'YES' && localStorage.getItem("email") == null) {
        Appyscript.loginPage('true');
        callbackLogin = Appyscript.openForumPage;
        return;
    }
    AppyTemplate.global.alluseranswerimage = pageData.setting.alluseranswerimage;

    forumPageScrollCount = 2;
    serchTextGlobal = "";
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getForumQuestion","appId":"' + appId + '","pageId":"' + pageIdentifie + '","offset":"1","search":"","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                Appyscript.closeModal();
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    forumData = result;
                    if (!result.data)
                        result.data = [];
                    $$.get("pages/forum.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.pageTitle;
                        result.allowUserToAddQues = pageData.setting.allowUserToAddQues;
                        result.allowUserToShare = pageData.setting.allowusertoshare;
                        var userName = localStorage.getItem("username");
                        result.isLogin = false;
                        if (localStorage.getItem("profileImage") != null && localStorage.getItem("profileImage") != undefined && localStorage.getItem("profileImage") != "") {
                            result.profileImage = localStorage.getItem("profileImage")
                        } else {
                            result.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-forum-default.png";
                        }
                        if (userName != "" && userName != undefined && userName != null) {
                            result.isLogin = true;
                            result.userName = userName;
                        }
                        $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');

                        var html = compiledTemplate(result);
                        if(AppyTemplate.global.style.layout == "slidemenu" || AppyTemplate.global.style.layout == "slidemenu3d") {
                       if(AppyTemplate.global.style.layout == "slidemenu3d" || AppyTemplate.global.style.layout == "slidemenu")
                                                       {
                                                       mainView.router.load({
                                                                                    content: html,
                                                                                    animatePages: true
                                                                                    });}
                                                  else{
                                                     mainView.router.reloadContent(html);}}
                        else
                        {
                        mainView.router.load({
                                                  content: html,
                                                animatePages: true
                                          });
                        }

                    });
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

Appyscript.onPageInit('forum-Page', function (page) {

    var displayOption = false;
    $$("body").on("click", ".questionDivParent", function (e) {
            console.log("else");
            $$(".questionDivParent").hide();
            $$(this).children(".questionOptionsList").removeClass("slideUp");
            $$(".page-content").css("overflow", "auto");
            $$(".addButton").show();
    })
    $$("body").on("click", ".openOptions", function (e) {
        $$(this).next().show();
        $$(this).next().children(".questionOptionsList").addClass("slideUp");
        $$(".page-content").css("overflow", "hidden");
        $$(".addButton").hide();
        e.stopPropagation();
    });
    var pullercontent = $$('.pull-to-refresh-content');
    pullercontent.on('refresh', function (e) {
        searchQuestion();

    });
    var email = localStorage.getItem("email");
    if (email != undefined && email != '') {
        AppyTemplate.global.loginCheck = true;
        AppyTemplate.global.email = email;
        AppyTemplate.global.Name = localStorage.getItem("username");
        var image = localStorage.getItem("profileImage");
        if (image) {
            if (image.indexOf("http") != -1 && (image.indexOf(".jpg") != -1 || image.indexOf(".png") != -1)) {
                AppyTemplate.global.profileImage = localStorage.getItem("profileImage");
                AppyTemplate.global.profileImagecheck = true;
            }
            else {
                AppyTemplate.global.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-forum-default.png";
            }
        }
        else {
            AppyTemplate.global.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-forum-default.png";
        }

    }
});

Appyscript.onPageInit('forum-forumAddAnswer', function (page) {
    $$(".postAnswerWrapper section textarea").css("height", $$("div[data-page='forum-forumAddAnswer'] .page-content").height() - parseInt($$("div[data-page='forum-forumAddAnswer'] .questionDiv").height() + 100) + "px");
});

Appyscript.onPageInit('forum-forumAllAnswer', function (page) {
    $$("body").on("click", ".questionAnswer--number a", function () {
        $$(".questionBlocks").removeClass("active");
        $$(this).closest(".questionBlocks").addClass("active");
    })
});

function goToPostAnswer(index, from, questionId) {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }

   index = forumData.data.findIndex(function(a){
      return a.questionId == questionId;
      });

    postAnswerQuestionId = forumData.data[index].questionId;
    questionIndex = index;
    isAnswerFrom = from;
    var question = forumData.data[index].question;
    $$.get("pages/forum-add-answer.html", function (template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var result = {};
        result.title = pageData.languageSetting.FORUM_WRITE_ANSWER;
        result.question = question;
        result.questionId = "";
        result.isAllowAnonymously = pageData.setting.allowAnonymously;
        result.imageURL = forumData.data[index].image;
//        $$("[id='imageForum']").attr(forumData.data[index].image);

        var html = compiledTemplate(result);
        mainView.router.load({
            content: html,
            animatePages: true
        });
        if(pageData.setting.alluseranswerimage == false){
                $$("#hideimgAnswere").hide();
            }else{
                $$("#hideimgAnswere").show();
            }

    });
}

function goToPostQuestion() {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getAllForumCategory","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    $$.get("pages/forum-add-question.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.languageSetting.FORUM_WRITE_QUESTION;
                        result.userName = localStorage.getItem("username");
                        result.questionId = "";
                        result.questionValue = "";
                        result.displayAnswerSegment = false;
                        result.isAllowAnonymously = pageData.setting.allowAnonymously;
                        result.actionButtonText = pageData.languageSetting.FORUM_ADD;
                         result.alluserquestionimage = pageData.setting.alluserquestionimage
                        var html = compiledTemplate(result);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                    });
                    Appyscript.closeModal();
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(pageData.languageSetting.FORUM_CATEGORY_NOT_FOUND, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function submitAnswer(answerId) {
    var answerText = $$('#postAnswerText').val();
    answerText = answerText.replace(/\n/g, ' ');
    var userEmail = localStorage.getItem("email");
    var postedBy = 3;
    var anonymousAnswer = $$("#anonymousAnswer").prop('checked');
    if (anonymousAnswer)
        postedBy = 2;
    if (answerText == "" || answerText == null || answerText == " ") {
        Appyscript.alert(pageData.languageSetting.FORUM_WRITE_YOUR_ANSWER);
        return false;
    }
    var isAnswerApprove = "0";
    var isAnswerAutoApprove = pageData.setting.allowautoapproveanswer;
    if (isAnswerAutoApprove) {
        isAnswerApprove = "1";
    }
//    if (isOnline()) {
//        Appyscript.showIndicator();
//        var postData = '{"method":"addForumAnswer","appId":"' + appId + '","pageId":"' + pageIdentifie + '","postedBy":"' + postedBy + '","userEmail":"' + userEmail + '","questionId":"' + postAnswerQuestionId + '","answer":"' + answerText + '","answerId":"' + answerId + '","isAnswerApprove":"' + isAnswerApprove + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
//        $$.ajax({
//            url: forumServiceUrl,
//            data: postData,
//            type: 'post',
//            //321 headers: {'accessToken': deviceEncryptedToken},
//            async: true,
//            success: function (result) {
//                result = JSON.parse(result);
//                Appyscript.hideIndicator();
//                if (isAnswerFrom == "Home") {
//                    for (var i = 0; i < 1; i++) {
//                        mainView.router.back({ ignoreCache: true, animatePages: false });
//                    }
//                    searchQuestion();
//                }
//                if (isAnswerFrom == "Comments") {
//                    for (var i = 0; i < 2; i++) {
//                        mainView.router.back({ ignoreCache: true, animatePages: false });
//
//                    }
//                    getAllAnswers(questionIndex);
//                }
//                if (isAnswerFrom == "Favourite") {
//                    for (var i = 0; i < 2; i++) {
//                        mainView.router.back({ ignoreCache: true, animatePages: false });
//                    }
//                    getFavouriteList();
//                }
//            },
//            error: function () {
//                Appyscript.hideIndicator();
//                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
//            }
//        });
//    }
//    else {
//        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
//    }

Appyscript.showIndicator();
var savedAnswerForum = new FormData();
savedAnswerForum.append("method","addForumAnswer");
savedAnswerForum.append("appId",appId);
savedAnswerForum.append("pageId",pageIdentifie);
savedAnswerForum.append("postedBy",postedBy);
savedAnswerForum.append("userEmail",userEmail);
savedAnswerForum.append("questionId",postAnswerQuestionId);
savedAnswerForum.append("answer",answerText);
savedAnswerForum.append("answerId",answerId);
savedAnswerForum.append("isAnswerApprove",isAnswerApprove);
savedAnswerForum.append("appUserName",localStorage.getItem("username"));
savedAnswerForum.append("appName",localStorage.appName);
savedAnswerForum.append("lang",localStorage.lang);
savedAnswerForum.append("sendEmailNotification",emailSetting);
if(isAnswerApprove =="0")
{
Appyscript.alert(AppyTemplate.global.pageLanguageSetting.FORUM_ANSWER_AUTOAPPROVED_OFF);
}
if(mediaAnswerImage!=""){
            savedAnswerForum.append("aImageName",mediaAnswerImage, "aImageName.jpg")
   }
var from = "add";
        submitImageAnswer(savedAnswerForum, from);
}
function submitImageAnswer(fddd,from){
          var xhr = new XMLHttpRequest();
          xhr.addEventListener("load", uploadCompleteProfileAnswer);
          xhr.addEventListener("error", uploadFailedLoginAnswer);
          xhr.addEventListener("abort", uploadCanceledLoginAnswer);
          xhr.open("POST", forumServiceUrl);
    //321      xhr.setRequestHeader("accessToken", deviceEncryptedToken);
          xhr.setRequestHeader("contentType", "application/x-www-form-urlencoded;charset=utf-8");
//          savedImageForum.set("saveStatus",1);
          xhr.send(fddd);
//          var savedImageForum = new FormData();
//          var savedImageForum = false;
//          return false;


  function uploadCompleteProfileAnswer(evt)
  {
        Appyscript.hideIndicator();
        if (isAnswerFrom == "Home") {
            for (var i = 0; i < 1; i++) {
                mainView.router.back({ ignoreCache: true, animatePages: false });
            }
            searchQuestion();
        }
        if (isAnswerFrom == "Comments") {
            for (var i = 0; i < 2; i++) {
                mainView.router.back({ ignoreCache: true, animatePages: false });

            }
            getAllAnswers(questionIndex,postAnswerQuestionId);
        }
        if (isAnswerFrom == "Favourite") {
            for (var i = 0; i < 2; i++) {
                mainView.router.back({ ignoreCache: true, animatePages: false });
            }
            getFavouriteList();
        }

        mediaAnswerImage="";
        mediaImage="";
   }


     function uploadFailedLoginAnswer(evt)
     {
                  mediaImage="";
                     mediaAnswerImage="";
         Appyscript.hideIndicator();
         Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

     }

     function uploadCanceledLoginAnswer(evt)
     {
                  mediaImage="";
                     mediaAnswerImage="";
              Appyscript.hideIndicator();
         Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

     }

     }

/////////////////answer
function submitQuestion(quesIdForUpdate) {
    var userEmail = localStorage.getItem("email");
    var questionText = $$('#questionText').val();
    questionText = questionText.replace(/\n/g, ' ');
    questionText=questionText.trim();
    var answerText = $$('#answerText').val();
    answerText = answerText.replace(/\n/g, ' ');

    var questionCategory = $$('#questionCategory').val();
    var questionAnswerCheck = $$("#questionAnswerCheck").prop('checked');
    var addMediaCheck = $$("#addMediaCheck").prop('checked');
    var questionAnonymousCheck = $$("#questionAnonymousCheck").prop('checked');

//var qImageName = $$("#questionimage").attr("src");
//
//    mediaImage = $$("#questionimage").show();
//    console.log("===== profilePic : " + forumImage);
    var postedBy = 3;
    if (questionAnonymousCheck) {
        postedBy = 2;
    }
    if (questionText == "" || questionText == null) {
        Appyscript.alert(pageData.languageSetting.WRITE_YOUR_QUESTION);
        return false;
    }
    if (questionCategory == "Select Category") {
        Appyscript.alert(pageData.languageSetting.FORUM_PLEASE_SELECT_CATEGORY);
        return false;
    }
    if (questionAnswerCheck) {
        if (answerText == "" || answerText == null) {
            Appyscript.alert(pageData.languageSetting.FORUM_WRITE_YOUR_ANSWER);
            return false;
        }
    }

    var elem = document.getElementById("questionCategory");
    var catId = elem.options[elem.selectedIndex].value;
    var isQuestionAutoApprove = pageData.setting.allowautoapprove;
    var isAnswerAutoApprove = pageData.setting.allowautoapproveanswer;
    var isAnswerApprove = "0";
    var isApprove = "0";
    if (isQuestionAutoApprove) {
        isApprove = "1";
    }
    if (isAnswerAutoApprove) {
        isAnswerApprove = "1";
    }
//    if (isOnline()) {
//        Appyscript.showIndicator();
//        var postData = '{"method":"addForumQuestion","appId":"' + appId + '","pageId":"' + pageIdentifie + '","question":"' + questionText + '","forumimage":"' + forumImage + '","catId":"' + catId + '","postedBy":"' + postedBy + '","userEmail":"' + userEmail + '","isApprove":"' + isApprove + '","questionId":"' + quesIdForUpdate + '","answer":"' + answerText + '","isAnswerApprove":"' + isAnswerApprove + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
//        $$.ajax({
//            url: forumServiceUrl,
//            data: postData,
//            type: 'post',
//             //321 headers: {'accessToken': deviceEncryptedToken},
//            async: true,
//            success: function (result) {
//                result = JSON.parse(result);
//                Appyscript.hideIndicator();
//                mainView.router.back();
//                setTimeout(function () {
//                    searchQuestion();
//                }, 500);
//            },
//            error: function () {
//                Appyscript.hideIndicator();
//                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
//            }
//        });
//    }
//    else {
//        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
//    }

Appyscript.showIndicator();
var savedImageForum = new FormData();
  savedImageForum.append("method","addForumQuestion");
  savedImageForum.append("appId",appId);
  savedImageForum.append("pageId",pageIdentifie);
  savedImageForum.append("question",questionText);
  savedImageForum.append("catId",catId);
  savedImageForum.append("postedBy",postedBy);
  savedImageForum.append("userEmail",userEmail);
  savedImageForum.append("isApprove",isApprove);
  savedImageForum.append("questionId",quesIdForUpdate);
  savedImageForum.append("answer",answerText);
  savedImageForum.append("isAnswerApprove",isAnswerApprove);
  savedImageForum.append("appUserName",localStorage.getItem("username"));
  savedImageForum.append("appName",localStorage.appName);
  savedImageForum.append("lang",localStorage.lang);
  savedImageForum.append("sendEmailNotification",emailSetting);
  if(isApprove =="0")
  {
  Appyscript.alert(AppyTemplate.global.pageLanguageSetting.FORUM_AUTOAPPROVED_QUESTION_OFF);
  }

  if(mediaImage!="")
        {
            savedImageForum.append("qImageName",mediaImage, "qImageName.jpg");

//            savedImageForum.append("aImageName",mediaImage, "aImageName.jpg");
        }

//   if(mediaAnswerImage!=""){
//            savedImageForum.append("aImageName",mediaAnswerImage, "aImageName.jpg")
//   }
        var from = "add";
        submitImageQuestion(savedImageForum, from);
}
function submitImageQuestion(fdd,from){
          var xhr = new XMLHttpRequest();
          xhr.addEventListener("load", uploadCompleteProfile);
          xhr.addEventListener("error", uploadFailedLogin);
          xhr.addEventListener("abort", uploadCanceledLogin);
          xhr.open("POST", forumServiceUrl);
  //321        xhr.setRequestHeader("accessToken", deviceEncryptedToken);
          xhr.setRequestHeader("contentType", "application/x-www-form-urlencoded;charset=utf-8");
//          savedImageForum.set("saveStatus",1);
          xhr.send(fdd);

//          var savedImageForum = new FormData();
//          var savedImageForum = false;
//          return false;


  function uploadCompleteProfile(evt)
  {
                mediaImage="";
                mediaAnswerImage="";
                Appyscript.hideIndicator();
                mainView.router.back();
                setTimeout(function () {
                    searchQuestion();
                }, 500);

     }

     function uploadFailedLogin(evt)
     {
                  mediaImage="";
                     mediaAnswerImage="";
         Appyscript.hideIndicator();
         Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

     }

     function uploadCanceledLogin(evt)
     {
                  mediaImage="";
                     mediaAnswerImage="";
              Appyscript.hideIndicator();
         Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

     }

     }


////////////////////shanu



function searchQuestion() {
    forumPageScrollCount = 2;
    var searchText = $$('#searchTextBox').val();

    searchText = searchText.replace(/\n/g, ' ');
     searchText =searchText.trim();
    if (searchText == undefined || searchText == null)
        searchText = "";
    if (isOnline()) {
        Appyscript.showIndicator();
        serchTextGlobal = searchText
        var postData = '{"method":"getForumQuestion","appId":"' + appId + '","pageId":"' + pageIdentifie + '","offset":"1","search":"' + searchText + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    forumData = result;
                    if (result.data) {
                        $$.get("pages/forum.html", function (template) {
                            var compiledTemplate = AppyTemplate.compile(template);
                            result.title = pageData.pageTitle;
                            result.allowUserToAddQues = pageData.setting.allowUserToAddQues;
                            result.allowUserToShare = pageData.setting.allowusertoshare;
                            var userName = localStorage.getItem("username");
                            result.isLogin = false;
                            if (localStorage.getItem("profileImage") != null && localStorage.getItem("profileImage") != undefined && localStorage.getItem("profileImage") != "") {
                                result.profileImage = localStorage.getItem("profileImage")
                            } else {
                                result.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-forum-default.png";
                            }
                            if (userName != "" && userName != undefined && userName != null) {
                                result.isLogin = true;
                                result.userName = userName;
                            }
                            var html = compiledTemplate(result);
                            mainView.router.reloadContent(html);
                        });
                    } else {
                        Appyscript.hideIndicator();

                       Appyscript.alert(data.languageSetting.empty_search_mcom , appnameglobal_allpages);
                    }
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function checkLogin() {
    var email = localStorage.getItem("email");
    AppyTemplate.global.loginCheck = false;
    if (email != undefined && email != '') {
        return true;
    } else {
        return false;
    }
}

function displayUserAnswer() {
    if ($$("#questionAnswerCheck").prop('checked')) {
        $$('#userAnswerBlock').show();
    } else {
        $$('#userAnswerBlock').hide();
    }
}
var displayMediaCheck = function() {
    if ($$("#addMediaCheck")) {
        $$('#userMediaBlock').show();
    } else {
        $$('#userMediaBlock').hide();
    }
}

var getAnsQuestionId;
function getAllAnswers(index, getQuestionID) {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    index = forumData.data.findIndex(function(a){
                return a.questionId == getQuestionID;
            });
    var questionData = forumData.data[index];
    var questionId = questionData.questionId;
    forumPageCommentsScrollCount = 2;
    questionIndex = index;
    postAnswerQuestionId = questionId;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getAnswer","appId":"' + appId + '","questionId":"' + questionId + '","offset":"1","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '","sortAnswerby":"' + pageData.setting.sortanswerbyorder + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    $$.get("pages/forum-answers.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.languageSetting.FORUM_ANSWERS;
                        result.question = questionData.question;
                        result.index = index;
                        result.questionId = questionId;
                        getAnsQuestionId = questionId;
                        result.addedOn = questionData.addedon;
                        result.allowUserToShare = pageData.setting.allowusertoshare;
                        result.loginUserEmail = localStorage.getItem("email");
                        result.imageURLL = forumData.data[index].image;
                        var html = compiledTemplate(result);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                    });
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function sharePost(index, questionId) {
if(questionId == undefined){
    questionId = getAnsQuestionId;
}

var index = forumData.data.findIndex(function(a){
return a.questionId == questionId;
})
    var questionData = forumData.data[index];
    Appyscript.shareText(questionData.question);
}

function addToFlaggedQuestion(index, questionId) {
if(questionId == undefined){
    questionId = getAnsQuestionId;
}

var index = forumData.data.findIndex(function(a){
    return a.questionId == questionId;
    });
    var questionData = forumData.data[index];
    var questionId = questionData.questionId;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"changeStatus","appId":"' + appId + '","questionId":"' + questionId + '","status":"3","type":"1","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    Appyscript.showToast(pageData.languageSetting.FORUM_QUESTION_FALGGED);
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function addToFlaggedFavourite(index) {
    var favouriteRow = favouriteData.data[index];
    var questionId = favouriteRow.questionId;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"changeStatus","appId":"' + appId + '","questionId":"' + questionId + '","status":"3","type":"1","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    Appyscript.showToast(pageData.languageSetting.FORUM_QUESTION_FALGGED);
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function addToFlaggedAnswer(answerId) {
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"changeStatus","appId":"' + appId + '","questionId":"' + answerId + '","status":"3","type":"2","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    Appyscript.showToast(pageData.languageSetting.FORUM_ANSWER_FLAGGED);
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function addToFavouriteForum(index, questionId) {

if(questionId == undefined){
    questionId = getAnsQuestionId;
}

var index = forumData.data.findIndex(function(a){
return a.questionId == questionId;
});
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    var questionData = forumData.data[index];
    var questionId = questionData.questionId;
    var userEmail = localStorage.getItem("email");
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"addQuestionToFav","appId":"' + appId + '","questionId":"' + questionId + '","appUserEmail":"' + userEmail + '","pageId":"' + pageIdentifie + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    Appyscript.showToast(pageData.languageSetting.FORUM_ADDED_TO_FAV_LIST);
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function getFavouriteList() {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    var userEmail = localStorage.getItem("email");
    forumPageFavouriteScrollCount = 2;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getListOfFavQuestion","appId":"' + appId + '","pageId":"' + pageIdentifie + '","appUserEmail":"' + userEmail + '","offset":"1","search":"","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    favouriteData = result;
                    if (!result.data) {
                        result.data = [];
                    }
                    $$.get("pages/forum-favourite-list.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.languageSetting.FORUM_FAV_QUESTION_LIST;
                        result.allowUserToShare = pageData.setting.allowusertoshare;
                        var html = compiledTemplate(result);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                        Appyscript.closeModal();
                    });
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function getAllFavouriteAnswers(index) {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    var favData = favouriteData.data[index];
    var questionId = favData.questionId;
    forumPageCommentsScrollCount = 2;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getAnswer","appId":"' + appId + '","questionId":"' + questionId + '","offset":"1","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '","sortAnswerby":"' + pageData.setting.sortanswerbyorder + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    $$.get("pages/forum-answers.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.languageSetting.FORUM_ANSWERS;
                        result.question = favData.question;
                        result.index = index;
                        result.questionId = questionId;
                        result.addedOn = favData.addedon;
                        result.allowUserToShare = pageData.setting.allowusertoshare;
                        result.loginUserEmail = localStorage.getItem("email");
                        var html = compiledTemplate(result);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                    });
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function removeFromFavourite(index) {
    var favouriteQuestion = favouriteData.data[index];
        var userEmail = localStorage.getItem("email");
    var questionId = favouriteQuestion.questionId;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"removFavQuestion","questionId":"' + questionId + '","pageId":"' + pageIdentifie + '","appId":"' + appId + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","userEmail": "' + userEmail + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    $$('#favouriteList' + index).hide();
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function getMyQuestionsList() {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    var userEmail = localStorage.getItem("email");
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getForumQuestion","appId":"' + appId + '","pageId":"' + pageIdentifie + '","offset":"1","search":"","appUserEmail":"' + userEmail + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    $$.get("pages/forum-myquestions.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.languageSetting.FORUM_MY_QUESTIONS;
                        if (!result.data)
                            result.data = [];
                        var html = compiledTemplate(result);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                    });
                    Appyscript.popupClose();
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function deleteQuestion(questionId, index) {
    Appyscript.confirmation(pageData.languageSetting.FORUM_DELETE_QUESTION_POPUP, pageData.languageSetting.FORUM_WARNING, pageData.languageSetting.sdelete, pageData.languageSetting.cancel,
       function () {
           confirmDeleteQuestion(questionId, index);
       },
       function () {
           //mainView.router.back();
       });
}

function confirmDeleteQuestion(questionId, index) {
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"removQuestion","questionId":"' + questionId + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    $$('#questionListRow' + index).hide();
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function editQuestion(questionId) {
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getForumQuestion","appId":"' + appId + '","pageId":"' + pageIdentifie + '","offset":"1","search":"","questionId":"' + questionId + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (questionResult) {
                questionResult = JSON.parse(questionResult);
                Appyscript.hideIndicator();
                if (questionResult.status == 1) {
                    if (isOnline()) {
                        Appyscript.showIndicator();
                        var postData = '{"method":"getAllForumCategory","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
                        $$.ajax({
                            url: forumServiceUrl,
                            data: postData,
                            type: 'post',
                            //321 headers: {'accessToken': deviceEncryptedToken},
                            async: true,
                            success: function (result) {
                                result = JSON.parse(result);
                                Appyscript.hideIndicator();
                                if (result.status == 1) {
                                    $$.get("pages/forum-add-question.html", function (template) {
                                        var compiledTemplate = AppyTemplate.compile(template);

                                        result.title = pageData.languageSetting.FORUM_EDIT_QUESTION;
                                        result.userName = localStorage.getItem("username");
                                        result.questionValue = questionResult.data[0].question;
                                        result.displayAnswerSegment = true;
                                        result.actionButtonText = pageData.languageSetting.FORUM_UPDATE;
                                        result.questionId = questionResult.data[0].questionId;
                                         result.alluserquestionimage = pageData.setting.alluserquestionimage
                                        var html = compiledTemplate(result);
                                        mainView.router.load({
                                            content: html,
                                            animatePages: true
                                        });
                                        setTimeout(function () {
                                            var questionPostedBy = questionResult.data[0].postedBy;
                                            if (questionPostedBy == "2") {
                                                $$('#questionAnonymousCheck').prop('checked', true);
                                            }
                                            var catId = questionResult.data[0].catId;
                                            $$("#questionCategory").val(catId);
                                        }, 200);
                                    });
                                    Appyscript.closeModal();
                                } else {
                                    Appyscript.hideIndicator();
                                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                                }
                            },
                            error: function () {
                                Appyscript.hideIndicator();
                                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                            }
                        })
                    }
                    else {
                        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                    }
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

Appyscript.scrollForumPage = function (self) {
    var scrollContentDiv = document.getElementById("forumPageScrollContent");
    if ((scrollContentDiv.scrollTop + scrollContentDiv.clientHeight) >= scrollContentDiv.scrollHeight) {
        setTimeout(function () {
            Appyscript.forumScrolPage(forumPageScrollCount);
        }, 200);
    }
}

Appyscript.scrollForumCommentsPage = function (self) {
    var scrollContentDiv = document.getElementById("forumCommentListDataId");
    if ((scrollContentDiv.scrollTop + scrollContentDiv.clientHeight) >= scrollContentDiv.scrollHeight) {
        setTimeout(function () {
            Appyscript.forumScrolCommentsPage(forumPageCommentsScrollCount);
        }, 200);
    }
}

Appyscript.scrollForumFavouritePage = function (self) {
    var scrollContentDiv = document.getElementById("forumFavouriteScrollContent");
    if ((scrollContentDiv.scrollTop + scrollContentDiv.clientHeight) >= scrollContentDiv.scrollHeight) {
        setTimeout(function () {
            Appyscript.forumScrollFavouritePPage(forumPageFavouriteScrollCount);
        }, 200);
    }
};
Appyscript.scrollForumPageAns = function(self) {
    var scrollContentDiv = document.getElementById("forumPageScrollContentAns");
    if ((scrollContentDiv.scrollTop + scrollContentDiv.clientHeight) >= scrollContentDiv.scrollHeight) {
        setTimeout(function() {
            Appyscript.forumScrolAnswerePage(forumPageCommentsScrollCount);
        }, 200);
    }
};

Appyscript.forumScrolPage = function (pageIndex) {
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getForumQuestion","appId":"' + appId + '","pageId":"' + pageIdentifie + '","offset":"' + pageIndex + '","search":"' + serchTextGlobal + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    if (result.data && result.data.length > 0) {
                        $$.each(result.data, function (index, element) {
                            forumData.data.push(element);
                        });
                        var template = '{{> forumListData}}'
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.pageTitle;
                        console.log(result);
                        var html = compiledTemplate(result);
                        $$("#forumListDataId").append(html);
                        forumPageScrollCount++;
                    }
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

Appyscript.forumScrolAnswerePage = function (pageIndex) {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    var questionData = forumData.data[questionIndex];
    var questionId = questionData.questionId;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getAnswer","appId":"' + appId + '","questionId":"' + questionId + '","offset":"' + pageIndex + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '","sortAnswerby":"' + pageData.setting.sortanswerbyorder + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    if (result.data && result.data.length > 0) {
                        var template = '{{> forumCommentsListData}}'
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(result);
                        $$("#forumCommentListDataId").append(html);
                        forumPageCommentsScrollCount++;
                    }
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

Appyscript.forumScrollFavouritePPage = function (pageIndex) {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    var userEmail = localStorage.getItem("email");
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getListOfFavQuestion","appId":"' + appId + '","pageId":"' + pageIdentifie + '","appUserEmail":"' + userEmail + '","offset":"' + pageIndex + '","search":"","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    if (result.data && result.data.length > 0) {
                        $$.each(result.data, function (index, element) {
                            favouriteData.data.push(element);
                        });
                        var template = '{{> forumFavouriteListData}}';
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.languageSetting.FORUM_FAV_LIST;
                        result.allowUserToShare = pageData.setting.allowusertoshare;
                        var html = compiledTemplate(result);
                        $$('#favouriteListId').append(html);
                        forumPageFavouriteScrollCount++;
                    }
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function readMoreQuestion(answerId) {
    if (isReadMoreQuestion) {
        $$('#' + answerId).css("white-space", "nowrap");
        $$('#readMore' + answerId).text(pageData.languageSetting.FORUM_READ_MORE);
    } else {
        $$('#' + answerId).css("white-space", "normal");
        $$('#readMore' + answerId).text(pageData.languageSetting.FORUM_READ_LESS);
    }
    isReadMoreQuestion = !isReadMoreQuestion;
}

function readMoreFavourite(answerId) {
    if (isReadMoreFavourite) {
        $$('#favourite' + answerId).css("white-space", "nowrap");
        $$('#readMoreFavourite' + answerId).text(pageData.languageSetting.FORUM_READ_MORE);
    } else {
        $$('#favourite' + answerId).css("white-space", "normal");
        $$('#readMoreFavourite' + answerId).text(pageData.languageSetting.FORUM_READ_LESS);
    }
    isReadMoreFavourite = !isReadMoreFavourite;
}

function readMoreComment(answerId) {
    if (isReadMoreComment) {
        $$('#comment' + answerId).css("white-space", "nowrap");
        $$('#readMoreComment' + answerId).text(pageData.languageSetting.FORUM_READ_MORE);
    } else {
        $$('#comment' + answerId).css("white-space", "normal");
        $$('#readMoreComment' + answerId).text(pageData.languageSetting.FORUM_READ_LESS);
    }
    isReadMoreComment = !isReadMoreComment;
}

function deleteAnswer(answerId, self) {
    Appyscript.confirmation(pageData.languageSetting.FORUM_DELETE_ANSWER_CONFIRM_MSG, pageData.languageSetting.FORUM_WARNING, pageData.languageSetting.sdelete, pageData.languageSetting.cancel,
      function () {
          confirmDeleteAnswer(answerId, self);
      },
      function () {
      });
}

function confirmDeleteAnswer(answerId, self) {
    if (isOnline()) {
       var index=$$(self).parent().attr("data-index");
        Appyscript.showIndicator();
        var postData = '{"method":"removAnswer","answerId":"' + answerId + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {

                    $$('#answerListRow' + index).hide();
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

//function isReadMoreComment(answerId, index) {
//    if (isOnline()) {
//        Appyscript.showIndicator();
//        var postData = '{"method":"removAnswer","answerId":"' + answerId + '"}';
//        $$.ajax({
//            url: forumServiceUrl,
//            data: postData,
//            type: 'post',
////321 headers: {'accessToken': deviceEncryptedToken},
//            async: true,
//            success: function (result) {
//                result = JSON.parse(result);
//                Appyscript.hideIndicator();
//                if (result.status == 1) {
//                    $$('#answerListRow' + index).hide();
//                } else {
//                    Appyscript.hideIndicator();
//                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
//                }
//            },
//            error: function () {
//                Appyscript.hideIndicator();
//                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
//            }
//        })

//    }
//    else {
//        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
//    }
//}

function editAnswer(answerId) {
    if (!checkLogin()) {
        Appyscript.loginPage('true');
        return false;
    }
    var questionData = forumData.data[questionIndex];
    var questionId = questionData.questionId;
    var question = questionData.question;
    isAnswerFrom = "Comments";
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getAnswer","appId":"' + appId + '","questionId":"' + questionId + '","offset":"1","answerId":"' + answerId + '","appUserName": "' + localStorage.getItem("username") + '","appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","sendEmailNotification": "' + emailSetting + '","sortAnswerby":"' + pageData.setting.sortanswerbyorder + '"}';
        $$.ajax({
            url: forumServiceUrl,
            data: postData,
            type: 'post',
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                Appyscript.hideIndicator();
                if (result.status == 1) {
                    $$.get("pages/forum-add-answer.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        result.title = pageData.languageSetting.FORUM_EDIT_ANSWER;
                        result.actionButtonText = pageData.languageSetting.FORUM_UPDATE;
                        result.isAllowAnonymously = pageData.setting.allowAnonymously;
                        result.answer = result.data[0].answer;
                        result.answerId = result.data[0].answerId;
                        result.question = question;
                        var html = compiledTemplate(result);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                        setTimeout(function () {
                            var questionPostedBy = result.data[0].postedBy;
                            if (questionPostedBy == "2") {
                                $$('#anonymousAnswer').prop('checked', true);
                            }

                            if(pageData.setting.alluseranswerimage == false){
                            $$("#hideimgAnswere").hide();
                            }else{
                            $$("#hideimgAnswere").show();
                            }
                        }, 200);
                    });
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })

    }
    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

/* This function is used to edit profile */
Appyscript.forumEditProfile = function () {
    if (localStorage.getItem("email") == null) {
        Appyscript.loginPage('true');
        callbackLogin = Appyscript.forumEditProfile;
        return;
    }
    callbackLogin = null;

    var jsondata = {};
    jsondata.name = localStorage.getItem("username");
    jsondata.location = localStorage.getItem("CurrentCity");
    jsondata.image = localStorage.getItem("profileImage");
    jsondata.saveBtnTxt = "Save";

    $$.get("popups/forum-edit-profile.html", function (template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(jsondata);
        Appyscript.popup(html);
    });
}

Appyscript.saveProfilePicForForum = function () {
    var name = $$("#profileName").val();

    if (name.trim() == "") {
        Appyscript.alert("User Name can't be blank.", "Alert!");
        $$("#profileName").focus();
        return;
    }

    Appyscript.showIndicator();
    var profilePicPath = $$("#profileImageDir").attr("image");
    if (isOnline()) {
        Appyscript.updateDirProfile(localStorage.getItem("appid"), name, localStorage.getItem("email"), profilePicPath, "Forum", "", "");
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function profileUpdateCallBackForForum(isProfileUpdate, name, imgurl) {
    Appyscript.hideIndicator();
    if (isProfileUpdate == "success") {
        localStorage.setItem("username", name);
        if (imgurl != null && imgurl.trim() != "" && imgurl.indexOf("http") != -1) {
            localStorage.setItem("profileImage", imgurl.trim());
        }
        Appyscript.alert("Profile updated successfully", appnameglobal_allpages);

    } else {


        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

    }
}

function closeBottomMenu() {
    $$(this).parents(".questionDivParent").css("display", "none");
}

var termscontent,privacycontent;
Appyscript.openForumMenuPage = function () {
    var menuJsonData = {};
    menuJsonData.name = "";
    menuJsonData.location = "";
    menuJsonData.allowUserToAddQues = pageData.setting.allowUserToAddQues;
    if (localStorage.getItem("profileImage") != null && localStorage.getItem("profileImage") != undefined && localStorage.getItem("profileImage") != "") {
        menuJsonData.image = localStorage.getItem("profileImage")
    } else {
        menuJsonData.image = AppyTemplate.global.style.reseller + "/newui/images/user-forum-default.png";
    }
    menuJsonData.setting = pageData.setting;
    if (localStorage.getItem("email") != null) {
        menuJsonData.setting.isLogin = "true";
        menuJsonData.name = localStorage.getItem("username");
        menuJsonData.location = localStorage.getItem("CurrentCity");
    } else {
        menuJsonData.setting.isLogin = "false";
    }
    menuJsonData.languageSetting = pageData.languageSetting;
    termscontent = pageData.cmsInfo.termsAndCondition;
            privacycontent = pageData.cmsInfo.privacyAndPolicy;
    $$.get("popups/forum-menu.html", function (template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(menuJsonData);
        Appyscript.popup(html);
        if(termscontent=="")
       {
       $$("#terms").hide();
       }else
       {
       $$("#terms").show();
       }
       if(privacycontent=="")
       {
       $$("#priv").hide();
       }else
       {
       $$("#priv").show();
       }
    });
}


function setContentHeight() {
    setTimeout(function () {``
        var newhr = $$(".questionDiv").height();
        $$(".page-on-center .page-content").scrollTop(parseInt(newhr + 10));
    }, 300);
}



AppyTemplate.registerPartial('forumListData', `{{#data}}<div class="userBlockQuestionList {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="background-color:{{@global.styleAndNavigation.contentBgColor}}">` +
    ` <div class="questionList"> <div class="questionList_question "> <div class="questionName">  ` +
                             ` <p style="color:{{@global.styleAndNavigation.content[2]}}; font-size:12px">{{catName}}</p> ` +
                             ` <h2 onclick="getAllAnswers({{@index}},'{{questionId}}')" class="{{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}">{{question}}</h2>  ` +
    ` {{#if image}} <div class="questionImage"><img src="images/image-5x3.png" style="background-image:url({{image}})" onclick="Appyscript.openPortFolio(this, 0, '{{image}}')"></div>{{/if}} <span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}">{{@global.pageLanguageSetting.posted_by}} <b>{{userName}}</b> {{@global.pageLanguageSetting.posted_on}} <b>{{addedon}}</b> </span>` +
    ` </div> <div class="questionOptions"> <span style="color:{{@global.styleAndNavigation.icon[0]}}" class="icon-dot-3 openOptions"></span> <div class="questionDivParent"> ` +
    ` <div class="questionOptionsList" style=" "> <ul> {{#if @root.allowUserToShare}}  ` +
    `<li onclick="sharePost({{@index}}, '{{questionId}}')"><a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}"  style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" >{{@global.pageLanguageSetting.common_share}}</a></li>` +
    ` {{/if}} <li  onclick="addToFlaggedQuestion({{@index}}, '{{questionId}}')"><a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}"  style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)">{{@global.pageLanguageSetting.FORUM_FLAGGED}}</a></li>` +
    ` <li onclick="addToFavouriteForum({{@index}}, '{{questionId}}')"><a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}"  style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" >{{@global.pageLanguageSetting.FORUM_ADD_FAV}}</a></li>` +
    ` <li onclick="closeBottomMenu()"><a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}"  style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" class="closePopUp" >{{@global.pageLanguageSetting.cancel}}</a></li> </ul> </div> </div> </div> </div>` +
    ` {{#firstAnswer}} <div class="userAsked"> <figure> <img src="{{userImage}}" alt="user_img" /> <figcaption  class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}"> {{username}}` +
    ` <span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}} low-opacity" style="color:{{@global.styleAndNavigation.content[2]}}">{{@global.pageLanguageSetting.FORUM_ANSWERED}} {{addedon}}</span> </figcaption> </figure> </div> {{/firstAnswer}} <div class="questionAnswer"> {{#firstAnswer}}` +
    ` <p class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}" id="{{answerId}}">{{answer}}</p> {{/firstAnswer}} <div class="questionAnswer--number"> ` +
                             ` <span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}" onclick="getAllAnswers({{@index}},'{{questionId}}')">{{totalAnswer}} {{@global.pageLanguageSetting.FORUM_ANSWERS}}</span> {{#firstAnswer}}` +
    ` <a href="javascript:void(0)"  style="{{#js_compare "this.answer.length < 50"}}display:none;{{/js_compare}} color:{{@global.styleAndNavigation.linkColor}}"  onclick="readMoreQuestion('{{answerId}}')" id="readMore{{answerId}}" class="type-button">{{@global.pageLanguageSetting.FORUM_READ_MORE}}</a>` +
    ` {{/firstAnswer}} </div> </div> </div> <div class="linkToAnswer" style="background-color:{{@global.styleAndNavigation.contentBgColor}};border-color{{@global.styleAndNavigation.borderColor}}" data-question="{{question}}" onclick="goToPostAnswer({{@index}},'Home','{{questionId}}')"> ` +
    ` <span class="icon-edit-2" style="color:{{@global.styleAndNavigation.icon[0]}};"></span> <span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}">{{@global.pageLanguageSetting.FORUM_ANSWER}}</span> </div> </div> {{/data}}`);

AppyTemplate.registerPartial('forumCommentsListData', `{{#data}} <div id="answerListRow{{@index}}" class="questionBlocks {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="background-color:{{@global.styleAndNavigation.contentBgColor}}"> <div class="userAsked"> <figure> ` +
` <img src="{{userImage}}" alt="user_img" /> <figcaption> <span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}">{{username}}</span> ` +
`<span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}} low-opacity" style="color:{{@global.styleAndNavigation.content[2]}}">{{@global.pageLanguageSetting.FORUM_ANSWERED}} {{addedon}}</span> </figcaption> </figure>` +
` <div class="questionOptions"> <span style="color:{{@global.styleAndNavigation.icon[0]}}" class="icon-dot-3 openOptions"></span> <div class="questionDivParent">` +
` <div class="questionOptionsList" style=" "> <ul data-index="{{@index}}"> {{#root_Compare userEmail "==" @root.loginUserEmail}} ` +
` <li onclick="editAnswer('{{answerId}}')">` +
`<a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}" style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" >{{@global.pageLanguageSetting.edit_mcom}}</a></li> ` +
` <li onclick="deleteAnswer('{{answerId}}',this)">` +
`<a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}" style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" >{{@global.pageLanguageSetting.sdelete}}</a></li> ` +
` {{else}}<li onclick="addToFlaggedAnswer('{{answerId}}')">` +
`<a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}" style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" >{{@global.pageLanguageSetting.FORUM_FLAGGED}}</a></li>{{/root_Compare}} ` +
` <li>` +
`<a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}" style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" class="closePopUp" >{{@global.pageLanguageSetting.cancel}}</a></li> </ul> </div> </div> </div> </div> ` +
` <div class="questionAnswer">{{#if image}}<img src={{image}} onclick="Appyscript.openPortFolio(this, 0, '{{image}}')" class="ansImage">{{/if}}` +
`<p class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}" id="comment{{answerId}}">{{answer}}</p> <div class="questionAnswer--number">` +
` <a style="{{#js_compare "this.answer.length < 50"}}display:none;{{/js_compare}} color:{{@global.styleAndNavigation.linkColor}}" onclick="readMoreComment("{{answerId}}")" class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" id="readMoreComment{{answerId}}">{{@global.pageLanguageSetting.FORUM_READ_MORE}}</a> ` +
` </div> </div> </div> {{else}} <div class="noAns {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.contentBgColor}}"> No Answer</div> {{/data}}`);

AppyTemplate.registerPartial('forumFavouriteListData', `{{#data}} <div class="userBlockQuestionList {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="background-color:{{@global.styleAndNavigation.contentBgColor}}" id="favouriteList{{@index}}">` +
` <div class="questionList"> <div class="questionList_question"> <div class="questionName"> <h2 onclick="getAllFavouriteAnswers('{{@index}}')" class="{{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}">{{question}}</h2> <span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}">{{@global.pageLanguageSetting.posted_by}}  <b>{{userName}}</b>  {{@global.pageLanguageSetting.posted_on}}  <b>{{addedon}}</b> </span>` +
` </div> <div class="questionOptions"> <span style="color:{{@global.styleAndNavigation.icon[0]}}" class="icon-dot-3 openOptions"></span> <div class="questionDivParent">` +
` <div class="questionOptionsList" style=" "> <ul> {{#if @root.allowUserToShare}} <li onclick="sharePost({{@index}}, '{{questionId}}')"><a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}" style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" >{{@global.pageLanguageSetting.common_share}}</a></li> {{/if}}` +
` <li onclick="addToFlaggedFavourite({{@index}})"><a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}" style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" >{{@global.pageLanguageSetting.FORUM_FLAGGED}}</a></li> ` +
` <li onclick="removeFromFavourite({{@index}})"><a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}" style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" >Remove from favourites</a></li> ` +
` <li onclick="closeBottomMenu()"><a class="{{@global.styleAndNavigation.flag[0]}} {{@global.styleAndNavigation.flag[1]}}" style="color:{{@global.styleAndNavigation.flag[2]}};border-color:{{@global.styleAndNavigation.flag[3]}}; " href="javascript:void(0)" class="closePopUp" >{{@global.pageLanguageSetting.cancel}}</a></li></ul> </div> </div> </div> </div> {{#firstAnswer}}` +
` <div class="userAsked"> <figure> <img src="{{userImage}}" alt="user_img" /> <figcaption class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}">` +
` {{username}}<span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}} low-opacity" style="color:{{@global.styleAndNavigation.content[2]}}">{{@global.pageLanguageSetting.FORUM_ANSWERED}} {{addedon}}</span> </figcaption> </figure> </div> {{/firstAnswer}} ` +
` <div class="questionAnswer"> {{#firstAnswer}} <p class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}" id="favourite{{answerId}}">{{answer}}</p> {{/firstAnswer}} <div class="questionAnswer--number">` +
` <span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}" onclick="getAllFavouriteAnswers('{{@index}}')">{{totalAnswer}} {{@global.pageLanguageSetting.FORUM_ANSWERS}}</span>` +
` {{#firstAnswer}}<a onclick="readMoreFavourite('{{answerId}}')" id="readMoreFavourite{{answerId}}" class="type-button" style="{{#js_compare "this.answer.length < 50"}}display:none;{{/js_compare}} color:{{@global.styleAndNavigation.linkColor}}" href="javascript:void(0)" >{{@global.pageLanguageSetting.FORUM_READ_MORE}}</a> {{/firstAnswer}}` +
`</div> </div> </div> <div class="linkToAnswer" style="background-color:{{@global.styleAndNavigation.contentBgColor}};border-color{{@global.styleAndNavigation.borderColor}}" data-question="{{question}}" onclick="goToPostAnswer({{@index}},'Favourite', '{{questionId}}')">` +
` <span class="icon-edit-2" style="color:{{@global.styleAndNavigation.icon[0]}};"></span> <span class="{{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}">{{@global.pageLanguageSetting.FORUM_ANSWER}}</span> </div> </div> {{/data}}`);
////////* photo_event

/* PHOTO SECTION*/
var selectedImageIndex = 0
var currentSelected = 0
function selectEventPhotoForForum() {



    Appyscript.modal({
                     title: pageData.languageSetting.click_to_upload_image_dir,
                     verticalButtons: true,
                     buttons: [{
                               text: AppyTemplate.global.commonLanguageSetting.Camera_social_network,
                               onClick: function() {
                               getPhotoFromCameraForum(0)

                               }

                               }, {
                               text: AppyTemplate.global.commonLanguageSetting.common_upload_from_gallery,
                               onClick: function() {
                               if (Appyscript.device.android)
                               Appyscript.storagePermission('runEventGalleryForum', 'Appyscript.permissionDenied')
                               else
                               runEventGalleryForum();

                               }
                               }, {
                               text: AppyTemplate.global.commonLanguageSetting.common_cancel,
                               onClick: function() {

                               }
                               }]
                     })
}

function runEventGalleryForum(){
    var options = {
    quality: 80,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: navigator.camera.DestinationType.FILE_URI
    }

    currentSelected = selectedImageIndex;
    navigator.camera.getPicture(fromEventGalleryForum, errImageUpload, options);
}

function fromEventGalleryForum(imageURI){
    finalEventImgUploadForum(imageURI,"0");
    $$("#answerImage").attr("src",imageURI).show();
}

function fromEventCameraForum(mediaFiles){
    finalEventImgUploadForum(mediaFiles,"1");

}

function errEventImageUploadForum(e){
    console.log(e);

}

function finalEventImgUploadForum(mediaFiles, flag){
    Appyscript.showIndicator()

    getEventFileFromUrl(mediaFiles, flag).then(function(file){
                                               displayEventImageForum(mediaFiles, flag, currentSelected);
                                               mediaImage = file;
                                               mediaAnswerImage = file;
                                               }, function(e){
                                               console.warn(e);
                                               Appyscript.hideIndicator();

                                               });

}

function addNewImageElementForum() {
    if(currentSelected != 0 && !(addEventModel.imageFileMap.has(currentSelected))){
        addEventImageElement();

    }

}

function displayEventImageForum(url, flag, displayEventIndex) {
    if(flag == "0"){
        // $$("#questionimage").attr("src", url).css("display", "block")
        //  $$("#answerImage").attr("src", url).css("displ    ay", "block")

        $$(".addQuestionBlock .mediaImg").hide();
        $$(".addQuestionBlock .mediaImg.active").show();
        $$(".addQuestionBlock .mediaImg.active .img").css("background-image","url("+url+")");
    }

    setTimeout(function(){Appyscript.hideIndicator();  },2000);

}


function getEventFileFromUrlForum(url, flag){
    return new Promise(function (resolveEvent, rejectEvent) {

                       function eventfail(e) {
                       console.log('Cannot found requested file');
                       rejectEvent(e);
                       }

                       function gotEventImgFile(fileEntry) {

                       fileEntry.file(function(file) {
                                      var reader = new FileReader();
                                      reader.onloadend = function(e) {
                                      var imgBlob = new Blob([this.result], { type:file.type});
                                      resolveEvent(imgBlob);
                                      };
                                      reader.readAsArrayBuffer(file);

                                      });
                       }

                       if(flag == "0") {
                       window.resolveLocalFileSystemURL(url, gotEventImgFile, eventfail);

                       }else if(flag == "1") {

                       if(Appyscript.device.android)
                       window.resolveLocalFileSystemURL(url, gotEventImgFile, eventfail);
                       else
                       window.resolveLocalFileSystemURL(url, gotEventImgFile, eventfail);

                       }

                       })

}

function getPhotoFromCameraForum() {

    currentSelected = 0;
    if(Appyscript.device.android)
    {
        Appyscript.cameraPermission('Appyscript.customphotocaptureimagecamera3Forum','Appyscript.permissionDenied')

    }
    else
    {
        Appyscript.customphotocaptureimagecamera3Forum()

    }

}

//get custom photo from camera
Appyscript.customphotocaptureimagecamera3Forum = function(event) {

    navigator.camera.getPicture(onSuccessImgForum, onFailImgForum, {
                                quality: 100,

                                destinationType: Camera.DestinationType.FILE_URI,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                encodingType: Camera.EncodingType.JPEG,
                                correctOrientation: true

                                });

    function onSuccessImgForum(mediaFiles) {

        $$(".addQuestionBlock .mediaImg").hide();
        $$(".addQuestionBlock .mediaImg.active").show();
        $$(".addQuestionBlock .mediaImg.active .img").css("background-image","url("+mediaFiles+")");
        $$("#answerImage").attr("src", mediaFiles).show();

        // $$("#questionimage").attr("src", mediaFiles).css("display", "block")
        //  $$("#answerImage").attr("src", mediaFiles).css("display", "block")

        fromEventCameraForum(mediaFiles);
        //alert("shanu");
    }

    function onFailImgForum(message) {
        //alert("priya");
    }

}

function toRemoveImage(mediaFiles){
    $$(".addQuestionBlock .mediaImg").show();
    $$(".addQuestionBlock .mediaImg.active").hide();

}

Appyscript.openPortFolio = function(a, index, imgArray) {
    Appyscript.openGallary(imgArray, 0, "", "", "", "On", pageData.pageTitle, "No");
}


function cleartImage() {
mediaImage = "";
mediaAnswerImage = "";
$$("#answerImage").attr("src", "");
}



function gettermsAndCondition() {

    Appyscript.showIndicator();
    var frv=pageData.cmsInfo.termsAndCondition;
    pageData.cmsInfo.termsAndCondition=frv.replace(/\n/g, '<br/>');
    $$.get("pages/forum-term0n-condition.html", function (template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(pageData);
           mainView.router.load({
                                content: html,
                                animatePages: true
                                });
           Appyscript.closeModal();

           });



}
function getprivacyAndPolicy() {

    Appyscript.showIndicator();
    var frv=pageData.cmsInfo.privacyAndPolicy;
    pageData.cmsInfo.privacyAndPolicy=frv.replace(/\n/g, '<br/>');
    $$.get("pages/forum-privacy-policy.html", function (template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(pageData);
           mainView.router.load({
                                content: html,
                                animatePages: true
                                });
           Appyscript.closeModal();

           });
}