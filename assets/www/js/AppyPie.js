             //App Configartion
             var AWSPage = true;
             var isGlobalPlusCodeRequest = false;
               var loginFromSocialNetwork = false;
             var pageValue;
             var countplusclick=0;
             AppyTemplate.global.glblheaderbartitle = data.appData.headerBarTitle
             AppyTemplate.global.glblheading = data.appData.termcondition.heading;
             AppyTemplate.global.glblAcceptButton = data.appData.termcondition.acceptButton;
             AppyTemplate.global.glbltermsdata = data.appData.termcondition.content;
             AppyTemplate.global.appname = data.appData.appName;
             AppyTemplate.global.pagefrom = "";
             AppyTemplate.global.eulaheaderbartitle = data.appData.userlicenceagreement.heading;
             AppyTemplate.global.eulaheading = data.appData.userlicenceagreement.heading;
             AppyTemplate.global.eulaAcceptButton = data.appData.userlicenceagreement.acceptButton;
             AppyTemplate.global.eulacontent = data.appData.userlicenceagreement.content;
                 AppyTemplate.global.defaultDateFormat=data.defaultDateFormat;
             AppyTemplate.global.dineinlocationcheck = true;
             AppyTemplate.global.termandconditionfix = false;
             var notificationcountvalue = true;
             AppyTemplate.global.servicelistid = '';
             AppyTemplate.global.moreIconval = data.appData.moreIcon;
             AppyTemplate.global.checkpageIdentifier = false;
             var commonPageArraylist = [];
             var checkGroup = false;
             var dataGlobalDownloadPage = '';
             var EWallet_BaseUrl = webserviceUrl + "Ewallet.php";
             var fileSystemGlobal;
             var customFormCase = false;;
             localStorage.popup = false;
             var isFromDirectory = false;
             var fromNotificationCheck_Hyperlocal = "fromDefault";
             /*radical initialised with false*/
             if (localStorage.getItem("mergeAppsBackButton") == undefined) {
                 localStorage.setItem("mergeAppsBackButton", "");
             }
             //console.log("loaddd******************************")
             //   localStorage.setItem("acceptedtermscheck","false")
             var before = {};
             //Manoj 12/07/2017
             var bottomNavigationForFragment = "";
             AppyTemplate.global.dirPageIdForHyperlocal = "";
             AppyTemplate.global.dirPageIdFordirectory = "";
             AppyTemplate.global.foodcourtlocationcheck = true;
             if (data.appData.layout != 'slidemenu' && data.appData.layout != 'slidemenu3d') {
                 Appyscript = new AppyFrame({
                     cache: true,
                     animateNavBackIcon: true,
                     tapHold: true,
                     modalButtonOk: AppyTemplate.global.commonLanguageSetting.ok_mcom,
                     modalTitle: AppyTemplate.global.commonLanguageSetting.alert_food
                 });
             } else if (data.appData.lang == 'sa') {
                 Appyscript = new AppyFrame({
                     cache: true,
                     swipePanel: 'right',
                     animateNavBackIcon: true,
                     imagesLazyLoadSequential: false,
                     tapHold: true,
                     modalButtonOk: AppyTemplate.global.commonLanguageSetting.ok_mcom,
                     modalTitle: AppyTemplate.global.commonLanguageSetting.alert_food
                 });
             } else {
                 Appyscript = new AppyFrame({
                     cache: true,
                     swipePanel: 'left',
                     animateNavBackIcon: true,
                     imagesLazyLoadSequential: false,
                     tapHold: true,
                     modalButtonOk: AppyTemplate.global.commonLanguageSetting.ok_mcom,
                     modalTitle: AppyTemplate.global.commonLanguageSetting.alert_food
                 });
             }

             if (data.appData.lang == 'sa') {
                 $$('#rtlCss').attr('href', 'css/appyFrame.rtl.min.css');
                 $$("body").addClass("sa");
                 Appyscript.rtl = true;
             } else {
                 $$('#rtlCss').attr('href', '');
                 $$("body").removeClass("sa");
                 Appyscript.rtl = false;
             }
             var $$ = Dom7;
             var appid, prevVersion = 0,
                 pageId, pageData, pageIdentifie, animate = 'true';
             var gettingStartedView = '';

             var mainView = Appyscript.addView('.view-main', {
                 // Because we want to use dynamic navbar, we need to enable it for this view:
                 dynamicNavbar: true,
                 swipeBackPage: false,
             });

             //           var leftView = Appyscript.addView('.view-left', {});

             localStorage.setItem("login", false);

             //-- global helper for global code
             /*$$(document).on('ajaxStart', function (event) {
             var url = event.detail.xhr.requestUrl;
             if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1) {
             Appyscript.showIndicator();
             }
             });

             $$(document).on('ajaxComplete', function (event) {
             var url = event.detail.xhr.requestUrl;
             if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1) {
             Appyscript.hideIndicator();
             }
             });*/


             //------Call Layout Page
             var autoFirstPage = true,
                 mainViewOn = true,
                 globalPage = false;

             Appyscript.layoutPage = function(file, options, groupval) {

                 //            if(data.home.length == 1) {
                 //                var firstItem = data.home[0];
                 //                Appyscript.pageData(firstItem.pageid, firstItem.pageIdentifierBecon);
                 //                return false;
                 //            }

                 $$.get(file, function(template) {

                     var compiledTemplate = AppyTemplate.compile(template);
                     var context = options && options.context ? options.context : {};
                     var html = compiledTemplate(context);

                     // mainView.router.load({content: html, animatePages: false});
                     var backgroundTemplate = '{{> mainBackground}}',
                         compiledBGTemplate = AppyTemplate.compile(backgroundTemplate),
                         bghtml = compiledBGTemplate(context);
                     $$(".background-view").html(bghtml);


                     switch (data.appData.layout) {
                         case 'slidemenu':
                             //                  leftView.router.load({content: html, animatePages: false});
                             if (data.appData.lang == 'sa') {
                                 $$(".view-right .pages").html('').html(html);
                             } else {
                                 $$(".view-left .pages").html('').html(html);
                             }
                             $$.get('layout/mainPage.html', function(template) {
                                 var cmainPageemplate = AppyTemplate.compile(template);
                                 var html = cmainPageemplate(context);
                                 if (mainViewOn) {
                                     mainViewOn = false;
                                     mainView.router.load({
                                         content: html,
                                         animatePages: false
                                     });
                                 } else {
                                     if (groupval) {
                                         mainView.router.reloadPreviousContent(html);

                                     } else {


                                         mainView.router.reloadContent(html);
                                     }
                                 }
                                 if ($$(".panel .hide-compress").length == 1) {
                                     $$("body").addClass("compress");
                                 }
                                 if (data.login.autoLogin == 'true') {
                                     if (localStorage.getItem("email") != null && localStorage.getItem("email") != "") {
                                         if (AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                                             if (autoFirstPage) {
                                                 if (!AppyTemplate.global.mergeAppsBackButton) {
                                                     $$(".app_navigation_slidemenu a").eq(0).click();
                                                 } else {
                                                     $$(".app_navigation_slidemenu a").eq(1).click();
                                                 }
                                             }
                                         }
                                     }
                                 } else {
                                     if (AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                                         if (autoFirstPage) {
                                             if (!AppyTemplate.global.mergeAppsBackButton) {
                                                 $$(".app_navigation_slidemenu a").eq(0).click();
                                             } else {
                                                 $$(".app_navigation_slidemenu a").eq(1).click();
                                             }
                                         }
                                     }
                                 }
                             });
                             if (JSON.stringify(data.appData.hideLayout).indexOf("background") > 0) {
                                 $$(".panel .page-content").removeAttr("style");
                             }
                             break;
                         case 'slidemenu3d':
                             //                  leftView.router.load({content: html, animatePages: false});
                             if (data.appData.lang == 'sa') {
                                 $$(".view-right .pages").html('').html(html);
                             } else {
                                 $$(".view-left .pages").html('').html(html);
                             }
                             $$.get('layout/mainPage.html', function(template) {
                                 var cmainPageemplate = AppyTemplate.compile(template);
                                 var html = cmainPageemplate(context);
                                 if (mainViewOn) {
                                     mainViewOn = false;
                                     mainView.router.load({
                                         content: html,
                                         animatePages: false
                                     });
                                 } else {
                                     if (groupval) {
                                         mainView.router.reloadPreviousContent(html);

                                     } else {
                                         mainView.router.reloadContent(html);
                                     }
                                 }
                                 //if($$(".panel .hide-compress").length == 1) {
                                 //							$$("body").addClass("compress");
                                 //						}
                                 if (data.login.autoLogin == 'true') {
                                     if (localStorage.getItem("email") != null && localStorage.getItem("email") != "") {
                                         if (AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                                             if (autoFirstPage) {
                                                 if (!AppyTemplate.global.mergeAppsBackButton) {
                                                     $$(".app_navigation_slidemenu3d a").eq(0).click();
                                                 } else {
                                                     $$(".app_navigation_slidemenu3d a").eq(1).click();
                                                 }
                                             }
                                         }
                                     }
                                 } else {
                                     if (AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                                         if (autoFirstPage) {
                                             if (!AppyTemplate.global.mergeAppsBackButton) {
                                                 $$(".app_navigation_slidemenu3d a").eq(0).click();
                                             } else {
                                                 $$(".app_navigation_slidemenu3d a").eq(1).click();
                                             }
                                         }
                                     }
                                 }
                             });
                             if (JSON.stringify(data.appData.hideLayout).indexOf("background") > 0) {
                                 $$(".panel .page-content").removeAttr("style");
                             }
                             break;
                         case 'bottom':
                             $$(".toolbar").html(html);
                             $$.get('layout/mainPage.html', function(template) {
                                 var cmainPageemplate = AppyTemplate.compile(template);
                                 var html = cmainPageemplate(context);
                                 if (mainViewOn) {
                                     if (data.login.autoLogin == "true") {
                                         mainViewOn = true;
                                     } else {
                                         mainViewOn = false;
                                     }
                                      if (groupval) {
                                     mainView.router.reloadContent(html);
                                     }
                                     else{
                                      mainView.router.load({
                                      content: html,
                                      animatePages: false
                                  });
                                     }

                                 } else {
                                     if (groupval) {

                                         mainView.router.reloadPreviousContent(html);


                                         if (data.home.length == 1) {
                                             removeAnimation();
                                             Appyscript.bottomLayout();

                                         }

                                     } else {
                                         removeAnimation();
                                         mainView.router.reloadContent(html);

                                     }
                                 }
                                 //Appyscript.bottomLayout();





                                 if (AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                                     if (data.login.autoLogin == 'true') {
                                         if (localStorage.getItem("email") != null && localStorage.getItem("email") != "") {
                                             if (autoFirstPage) {
                                                 if (!AppyTemplate.global.mergeAppsBackButton) {
                                                     $$(".toolbar .app_navigation_bottom a").eq(0).click();
                                                 } else {
                                                     $$(".toolbar .app_navigation_bottom a").eq(1).click();
                                                 }
                                             }

                                         }

                                     } else {
                                         if (autoFirstPage) {
                                             if (!AppyTemplate.global.mergeAppsBackButton) {
                                                 if (data.home[0].pageid == "ereader") {
                                                     setTimeout(function() {
                                                         $$(".toolbar .app_navigation_bottom a").eq(0).click();;
                                                     }, 700);
                                                 } else {
                                                     $$(".toolbar .app_navigation_bottom a").eq(0).click();
                                                 }
                                             } else {
                                                 $$(".toolbar .app_navigation_bottom a").eq(1).click();
                                             }
                                         }
                                     }
                                 }


                             });
                             break;
                         default:
                             if (mainViewOn) {


                                 mainViewOn = false;
                                 mainView.router.load({
                                     content: html,
                                     animatePages: false
                                 });
                             } else {

                                 if (groupval) {
                                     if (data.appData.layout == "skew") {


                                         setTimeout(function() {
                                             mainView.router.reloadContent(html);
                                             mainView.router.reloadPreviousContent(html);
                                         }, 0)

                                     } else {
                                         mainView.router.reloadContent(html);
                                         mainView.router.reloadPreviousContent(html);
                                     }

                                 } else {
                                     mainView.router.reloadContent(html);
                                     if (AppyTemplate.global.termandconditionfix == true) {
                                         mainView.router.reloadPreviousContent(html);
                                     }
                                 }

                             }
                             break;

                     }

                 });
                 /*   by satish for checking user kill app without selecting group or not  */
                 if (data.loginfield.loginSetting.groupEnable == 1) {
                     if (localStorage.getItem("firsttimefromfacebook") == "firsttimefromfacebook") {

                         if (localStorage.getItem("appkillfacebookwtlogin") == null || localStorage.getItem("appkillfacebookwtlogin") == undefined || localStorage.getItem("appkillfacebookwtlogin") == '') {
                             Appyscript.notificationprofile("groupval");
                             return false;

                         }
                     }
                 }

                 /* end of function */

                 setTimeout(function() {
                     loginOnLaunchToFetchNewInformation();
                 }, 500)
                 Appyscript.popupClose();
                 //if(grop=="grouptest"){Appyscript.popupClose();}
                 if (newdata.home != null) {


                     if (newdata.home.length > 0) {} else {
                         Appyscript.alert(data.languageSetting.you_have_not_permission_for_page, appnameglobal_allpages);
                     }
                 }
                 newResizeBackground();
             }
             //--- call Pages
             var folderPage = false;
             Appyscript.pagesChange = function(file, options) {
                 $$.get(file, function(template) {
                     var compiledTemplate = AppyTemplate.compile(template);
                     var context = options && options.context ? options.context : {};
                     var html = compiledTemplate(context);


                    // Added by Dharamendra
                        var currentPageName = mainView.activePage.name.split("-")[0];
                        if(currentPageName == pageId){
                             Appyscript.hideIndicator();
                             mainView.router.reloadContent(html);
                        return false;
                        }

                    // End


                     if (animate == 'true') {
                         switch (data.appData.layout) {
                             case 'slidemenu':
                                 Appyscript.closePanel();
                                 if (AppyTemplate.global.innerLayout == 0 && (folderPage == false)) {
                                     Appyscript.resetRouter(html);
                                 } else {
                                     mainView.router.load({
                                         content: html,
                                         animatePages: true
                                     });
                                 }
                                 break;
                             case 'slidemenu3d':
                                 Appyscript.closePanel();
                                 if (AppyTemplate.global.innerLayout == 0 && (folderPage == false)) {
                                     Appyscript.resetRouter(html);
                                 } else {
                                     mainView.router.load({
                                         content: html,
                                         animatePages: true
                                     });
                                 }
                                 break;
                             case 'bottom':
                                 $$(".page,.navbar").show();
                                 var bottomNavigation = $$(".toolbar").find("#app_navigation_bottom");
                                 bottomNavigation.hide().removeClass("on");
                                 if ((AppyTemplate.global.innerLayout == 0) && (folderPage == false)) {
                                     Appyscript.resetRouter(html);
                                 } else {
                                     mainView.router.load({
                                         content: html,
                                         animatePages: true
                                     });
                                 }
                                 break;
                             default:
                                 mainView.router.load({
                                     content: html,
                                     animatePages: true
                                 });
                                 break;

                         };
                         //mainView.router.load({content: html, animatePages: true});
                     } else {
                         mainView.router.reloadContent(html);
                     }
                 });




                 //  if(pageId!="appypiedb")
                 //  Appyscript.hideIndicator();
             }
             var mergeOrientation = "";
             Appyscript.ClickEventMergePage = function() {
                 Appyscript.showIndicator();
                 pageId = $$(this).data('productid');
                 localStorage.setItem("appid", pageId);
                 localStorage.setItem("prevVersion", 0);
                 localStorage.setItem("mergeAppsBackButton", true);
                 AppyTemplate.global.mergeAppsBackButton = localStorage.getItem("mergeAppsBackButton");
                 JsonDownloadAtStart();
                 setTimeout(function() {
                     mergeOrientation = data.appData.setOrientations;
                     AppyPieNative.getOrientationFromMergeApp(mergeOrientation);
                 }, 3000);


             }

             //--- Page Link o click event
             Appyscript.ClickEvent = function() {
                 if (AppyTemplate.global.style.layout == "bottom") {
                     AppyTemplate.global.innerLayout = 0;
                     $$(".toolbar a").removeClass("active");
                     $$(this).addClass("active");
                 }
                 if (AppyTemplate.global.style.layout == "slidemenu") {
                     AppyTemplate.global.innerLayout = 0;

                 }
                 if (AppyTemplate.global.style.layout == "slidemenu3d") {
                     AppyTemplate.global.innerLayout = 0;
                 }
                 if (!$$(this).parents(".page").is(".folderPage")) {
                     folderPage = false;
                 }
                 pageId = $$(this).data('productid');
                 pageIdentifie = $$(this).data('productIdentifier');
                 //Appyscript.pageData(pageId, pageIdentifie);
                 if (pageId == "event") {
                     //Appyscript.genericLocationServices();
                     posrequestpage = 'eventlocation';
                     Appyscript.locationPermission('ce_hitLocation', 'Appyscript.ce_loc_permissionDenied');
                 } else {
                     if (AppyTemplate.global.style.layout == "slidemenu") {
                         // folderPage = false;
                     }
                     Appyscript.pageData(pageId, pageIdentifie);
                 }
                 pageProductName = $$(this).data('productName');
             }

             var mergeappclickeventFalse = false;

             function ClickEvent() {
                 AppyTemplate.global.ecommCurrencySymbol = data.currencyFormat;
                 pageIdentifie = $$(this).data('productIdentifier');
                 if (data.appData.plan != "Gold" && data.appData.plan != "Platinum") {
                     for (i = 0; i < data.premiumPages.length; i++) {
                         if (pageIdentifie == data.premiumPages[i]) {
                             Appyscript.alert(data.languageSetting.PERMISSION_DENIED_PREMIUM, appnameglobal_allpages);
                             return;
                         }
                     }
                 }
                 if (!mergeappclickeventFalse) {
                     console.log("Fgggggggggggggggggggggg>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                     mergeappclickeventFalse = true;
                     globalPage = false;
                     if (AppyTemplate.global.style.layout == "bottom") {
                         AppyTemplate.global.innerLayout = 0;
                         $$(".toolbar a").removeClass("active");
                         $$(this).addClass("active");
                     }
                     if (AppyTemplate.global.style.layout == "slidemenu") {
                         AppyTemplate.global.innerLayout = 0;
                     }
                     if (AppyTemplate.global.style.layout == "slidemenu3d") {
                         AppyTemplate.global.innerLayout = 0;
                     }
                     if (!$$(this).parents(".page").is(".folderPage")) {
                         folderPage = false;
                     }
                     pageId = $$(this).data('productid');
                     pageIdentifie = $$(this).data('productIdentifier');
                     console.log(pageId + "  :  " + pageIdentifie);
                     localStorage.setItem("quizpageIdentifie", pageIdentifie);
                     if (AppyTemplate.global.style.layout == "slidemenu") {
                         //  folderPage = false;
                     }
                     if (pageId == "realestate" && AppyTemplate.global.style.layout == "bottom") {
                         Appyscript.hideWebViewFragment();
                     }

//                     if(pageId == "app-sheet") {
//
//                       if (localStorage.getItem("email") == null || localStorage.getItem("email") == '') {
//                           Appyscript.loginPage('true');
//                           return;
//                       } else{
//                           Appyscript.pageData(pageId, pageIdentifie);
//                           setTimeout(function() {
//                             mergeappclickeventFalse = false;
//                           }, 2000);
//                       }
//                     }

                     Appyscript.pageData(pageId, pageIdentifie);
                     setTimeout(function() {
                         mergeappclickeventFalse = false;
                     }, 2000);
                 }
             }

             //---  Width geting
             Appyscript.DeviceWidth = function() {
                 var w = $$(window).width();
                 var layout = 'matrix';
                 $$("#app_navigation").removeClass(layout + "-size-" + $$("#app_navigation").attr("size"));
                 var aWidth = 105;
                 var size = parseInt(w / aWidth);
                 if (size > 5) {
                     size = "max";
                 }
                 $$("#app_navigation").attr("size", size).addClass(layout + "-size-" + size);
             }

             ///by satish user permission
             var newdataval = {};
             var newdata = {};
             var grop;

             var forgroupcheck;

             function createApplication(valtest, NewallowedPages, groupIdval) {

                 if(data.appData.resellerId!=0){
                      calculatedate();
                 }




                 if (data.updateSettings.zopimChatCode != '') {
                     var s = document.createElement("script");
                     s.id = "ze-snippet";
                     s.src = "https://static.zdassets.com/ekr/snippet.js?key=" + data.updateSettings.zopimChatCode;
                     document.body.appendChild(s);
                     setTimeout(function() {
                         zE(function() {
                             zE.setLocale(data.appData.lang);
                         });
                         zE(function() {
                             zE.hide();
                         });
                     }, 2000)

                 }

                 imageMode = true;
                 forgroupcheck = false;

                 if (localStorage.getItem("email") && folderPage) {
                     forgroupcheck = true;
                 }
                 if (groupIdval) {
                     forgroupcheck = true;
                     console.log("groupIdval  " + groupIdval)
                 }

                 if (googleMapLoad == "false") {
                     //var mapkey= "AIzaSyA7KFb_YPxkehANZAlddsfcNH_E16fjs_M";
                     //data.googlePlacesApiKey = "AIzaSyBOu76yXJ7KJNAjb16V4GEwd4Lb5ZEfyFY";
                     var mapkey = data.googlePlacesApiKey;
                     var googleApi = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" + mapkey + "&sensor=true&libraries=places";
                     var s = document.createElement("script");
                     s.type = "text/javascript";
                     s.src = googleApi;
                     document.getElementsByTagName("head")[0].appendChild(s);
                     googleMapLoad = "true";

                 }

                 if (!localStorage.getItem("mergeAppsBackButton")) {
                     $$(".fixedback").hide();
                 }
                 // pageId=null, pageData='', pageIdentifie='',
                 autoFirstPage = true,
                     globalPage = false,
                     modeSize = 0;
                 lastIndex = 0;
                 gIndex = 0;
                 newdataval = {};
                 grop = valtest;
                 if (NewallowedPages) {
                     //localStorage.setItem("NewallowedPages",JSON.stringify(NewallowedPages))
                 }
                 // by satish for group  user
                 newdata = {};
                 // var data;
                 if (localStorage.getItem("email") && data.loginfield.loginSetting.showRestricatedPage == 1 && data.loginfield.loginSetting.groupEnable != 0) {
                     if (localStorage.getItem("NwwgroupId") == null || localStorage.getItem("NwwgroupId") == "undefined" || localStorage.getItem("NwwgroupId") == '') {
                         newdata = data;
                         localStorage.setItem("NewallowedPages", JSON.stringify(data.home));
                         NewallowedPages = data.home;


                     } else {
                         if (valtest == "grouptest") {


                             newdata.appData = data.appData;
                             newdata.home = NewallowedPages;
                             newdata.login = data.login;
                             newdata.notificationConfigSettings = data.notificationConfigSettings;
                             newdata.geoFencing = data.geoFencing;
                             newdata.languageSetting = data.languageSetting;
                             newdata.updateSettings = data.updateSettings;
                             newdata.rateshare = data.rateshare;
                             newdata.piwikId = data.piwikId;
                             newdata.loginfield = data.loginfield;
                             //  data=newdata;
                         } else {

                             newdata.appData = data.appData;
                             newdata.home = JSON.parse(localStorage.getItem("NewallowedPages"));
                             newdata.login = data.login;
                             newdata.notificationConfigSettings = data.notificationConfigSettings;
                             newdata.geoFencing = data.geoFencing;
                             newdata.languageSetting = data.languageSetting;
                             newdata.updateSettings = data.updateSettings;
                             newdata.rateshare = data.rateshare;
                             newdata.piwikId = data.piwikId;
                             newdata.loginfield = data.loginfield;
                         }
                     }

                 } else {
                     newdata = data;
                 }
                 //  end of group  user  code
                 Appyscript.stopSplash();
                 Appyscript.popupClose();
                 AppyTemplate.global.moreStuffKey = data.appData.more;
                 localStorage.setItem("login", data.login.autoLogin);
                 localStorage.setItem("termscondition" + data.appData.appId, "true");
                 Appyscript.resizeBackground();
                 if (data.mergeAppsFlag == "YES") {
                     AppyTemplate.global.mergeAppsFlag = data.mergeAppsFlag;
                     AppyTemplate.global.mergeApps = data.mergeApps;
                     localStorage.setItem("mergeAppsBackButton", true);
                     localStorage.setItem("mergeAppbackbuttonLanguage", data.mergeAppsLang.backtohome);
                     AppyTemplate.global.mergeAppbackbuttonLanguage = localStorage.getItem("mergeAppbackbuttonLanguage");
                     //data.home = data.mergeApps;
                 }
                 if (localStorage.getItem("mergeAppsBackButton") != undefined || localStorage.getItem("mergeAppsBackButton") != "") {
                     AppyTemplate.global.mergeAppsBackButton = localStorage.getItem("mergeAppsBackButton");
                 }
                 if (localStorage.getItem("mergeAppbackbuttonLanguage") != undefined) {
                     AppyTemplate.global.mergeAppbackbuttonLanguage = localStorage.getItem("mergeAppbackbuttonLanguage");
                 }
                 $$("html").attr("lang", AppyTemplate.global.style.lang);
                 if (data.mergeAppsFlag === "YES") {
                     Appyscript.layoutPage('layout/mergeApp.html', {
                         context: {
                             title: data.appData.headerBarTitle,
                             home: newdata
                         }
                     }, forgroupcheck);
                     $$('#layoutCSS').attr('href', 'css/mergeApp.css');
                 } else {
                     switch (data.appData.layout) {
                         case 'matrix':
                             Appyscript.layoutPage('layout/matrix.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/matrix.css');
                             break;
                         case 'list':
                             Appyscript.layoutPage('layout/list.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/list.css');
                             break;
                         case 'bottom':
                             Appyscript.layoutPage('layout/bottom.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/bottom.css');
                             break;
                         case 'imglist':
                             Appyscript.layoutPage('layout/imglist.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/imglist.css');
                             break;
                         case 'imgmatrix':
                             Appyscript.layoutPage('layout/imgmatrix.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/imgmatrix.css');
                             break;
                         case 'slidemenu':
                             Appyscript.layoutPage('layout/slidemenu.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/slidemenu.css');
                             break;
                         case 'fixedmatrix':
                             Appyscript.layoutPage('layout/fixedmatrix.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/fixedmatrix.css');
                             break;
                         case 'crossmatrix':
                             Appyscript.layoutPage('layout/crossmatrix.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/crossmatrix.css');
                             break;
                         case 'slideshutter':
                             Appyscript.layoutPage('layout/slideshutter.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/slideshutter.css');
                             break;
                         case 'slidemenu3d':
                             Appyscript.layoutPage('layout/slidemenu3d.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/slidemenu3d.css');
                             break;
                         case 'colorlist':
                             Appyscript.layoutPage('layout/colorlist.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/colorlist.css');
                             break;
                         case 'grid':
                             Appyscript.layoutPage('layout/grid.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/grid.css');
                             break;
                         case 'skew':
                             Appyscript.layoutPage('layout/skew.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/skew.css');
                             break;
                         case 'halflist':
                             Appyscript.layoutPage('layout/halflist.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/halflist.css');
                             break;
                         case 'diamond':
                             Appyscript.layoutPage('layout/diamond.html', {
                                 context: {
                                     title: data.appData.headerBarTitle,
                                     home: newdata
                                 }
                             }, forgroupcheck);
                             $$('#layoutCSS').attr('href', 'css/diamond.css');
                             break;
                     }
                 }
                 //NEW CODE//
                 var getLoginKeysPair = localStorage.getItem("loginKeysPair");
                 if (!getLoginKeysPair || getLoginKeysPair == 'null') {
                     getLoginKeysPair = [];
                 } else {
                     getLoginKeysPair = JSON.parse(getLoginKeysPair);
                 }
                 var appIdExists = false;
                 $$.each(getLoginKeysPair, function(key, value) {
                     if (value.appId == data.appData.appId) {
                         localStorage.setItem("username", value.username);
                         localStorage.setItem("email", value.emailid);
                         localStorage.setItem("validateEmail", value.validateEmail);
                         localStorage.setItem("emailid", value.emailid);
                         localStorage.setItem("phone", value.phone);
                         localStorage.setItem("password", value.password);
                         localStorage.setItem("userid", value.userid);
                         localStorage.setItem("userId", value.userId);
                         localStorage.setItem("profileImage", value.profileImage);
                         appIdExists = true;
                     } else {
                         if (!appIdExists)
                             appIdExists = false;
                     }
                 });

                 if (!appIdExists) {
                     localStorage.removeItem("username");
                     localStorage.removeItem("email");
                     // localStorage.removeItem("validateEmail");
                     localStorage.removeItem("emailid");
                     localStorage.removeItem("phone");
                     localStorage.removeItem("password");
                     localStorage.removeItem("userid");
                     localStorage.removeItem("userId");
                     localStorage.removeItem("profileImage");
                 }
                 //END CODE//

                 if (data.login.autoLogin == 'true' && (localStorage.getItem("email") == "undefined" || localStorage.getItem("email") == undefined || localStorage.getItem("email") == "") && (localStorage.getItem("userid") == "undefined" || localStorage.getItem("userid") == undefined || localStorage.getItem("userid") == "")) {
                     Appyscript.loginPage();
                     //                    if(data.appData.appId == "52e4c6693c04")
                     //                    {  Appyscript.popupPage('signup');
                     //                    }
                     //                   else {
                     //                   //Appyscript.popupPage('signup');
                     //

                 } else if (data.login.autoLogin == 'true' && localStorage.getItem("email") != "undefined" && localStorage.getItem("email") != undefined && localStorage.getItem("email") != "" && localStorage.getItem("userid") != "undefined" && localStorage.getItem("userid") != undefined && localStorage.getItem("userid") != "") {
                     var loginServiceURL = site_url + '/webservices/Appuser.php';
                     var userId = localStorage.getItem("userid");

                     if (userId == undefined || userId == "")
                         return;

                     var password = localStorage.getItem("password");
                     if (isOnline()) {
                         Appyscript.showIndicator();
                         var serviceData = '{"method":"passwordexpirecheck","pass":"' + password + '","userId":"' + userId + '","chkUserStatus":"1"}';
                         serviceData = EncryptOrDecrypt("encrypt", serviceData);
                         serviceData = serviceData.replace(/\s/g, '');

                         $$.ajax({
                             url: loginServiceURL,
                             data: serviceData,
                             type: "post",
                             //321  headers: {'accessToken': deviceEncryptedToken},
                             async: true,
                             success: function(jsonData, textStatus) {
                                 Appyscript.hideIndicator();
                                 jsonData = jsonData.trim();
                                 jsonData = ReturnHexDataWithSpace(jsonData);
                                 jsonData = EncryptOrDecrypt("decrypt", jsonData);
                                 var object = JSON.parse(jsonData);
                                 if (object['status'] == 1) {
                                     if (object['loginAllowedPages'].length > 0 && data.loginfield.loginSetting.groupEnable == 1 && checkGroup == false) {
                                         checkGroup = true;
                                         localStorage.setItem("NewallowedPages", JSON.stringify(object.loginAllowedPages));
                                         localStorage.setItem("test", JSON.stringify(object.loginAllowedPages));

                                         createApplication();
                                         return;
                                     }
                                     if (data.loginfield.loginSetting.addvanceLogin == 1 && jsonData['days'] >= 46) {
                                         Appyscript.popupPage('reset-password');
                                     } else if (data.loginfield.loginSetting.enableTouchId == 1 && !valtest) {
                                         Appyscript.loginPage();
                                     } else if (localStorage.getItem("paymentstatus") == "NO") {
                                         Appyscript.dismisspayment();
                                     }
                                 } else {
                                     localStorage.setItem("username", "");
                                     localStorage.setItem("email", "");
                                     localStorage.setItem("phone", "");
                                     localStorage.setItem("password", "");
                                     localStorage.setItem("userid", "");
                                     localStorage.setItem("loginTouchId", "false");
                                     localStorage.setItem("loginKeysPair", "");
                                     AppyTemplate.global.loginCheck = false;
                                     AppyTemplate.global.email = "";
                                     AppyTemplate.global.username = "";

                                     if (data.login.autoLogin == 'true') {
                                         Appyscript.loginPage();
                                     }
                                 }
                             },
                             error: function(error) {
                                 Appyscript.hideIndicator();
                                 console.log("Error: " + error.code + " " + error.message);
                             }
                         });
                     }
                 }

                 if (!localStorage.getItem("locationAllow")) Appyscript.getLocalCordsForPush();



                 var _arr = data.home;
                 _arr = _arr.filter(function(v) {
                     return v.pageid == "messenger"

                     if (_arr.length == 1) {
                         //check either chatRoom activated or not.
                         if (localStorage.getItem("userChatRoomLoggedin") == "true") {
                             AppyPieNative.intiliazeHomeSinch();
                         } else {
                             AppyPieNative.stopSinchClient();
                         }
                     }

                 });


             }

             AppyTemplate.registerPartial('navbar',
                 '<div class="navbar-inner {{@global.style.headerBarFont}} " style="background-color: {{@global.style.headerBarBackgroundColor}}; color: {{@global.style.headerBarTextColor}};{{#root_Compare @global.style.headerBarType "==" "image"}} background-image:url({{@global.style.nav_header_image_name}}){{/root_Compare}}">' +
                 ' <div class="left sliding">' +
                 '{{#root_Compare @global.style.layout "==" "slidemenu"}}' +
                 '{{#if @global.innerLayout}}' +
                 '<a href="index" class="link back" style="color:{{@global.style.headerBarIconColor}};">' +
                 '<i class="icon icon-left-open-2"></i>' +
                 '</a>' +
                 '{{else}}' +
                 '<a onclick="Appyscript.openSlide()" class="menu-down" style="color:{{@global.style.headerBarIconColor}};">' +
                 '<i class="icon icon-menu"></i>' +
                 '</a>' +
                 '{{/if}}' +
                 '{{else}}' +
                 '{{#root_Compare @global.style.layout "==" "slidemenu3d"}}' +
                 '{{#if @global.innerLayout}}' +
                 '<a href="index" class="link back" style="color:{{@global.style.headerBarIconColor}};">' +
                 '<i class="icon icon-left-open-2"></i>' +
                 '</a>' +
                 '{{else}}' +
                 '<a onclick="Appyscript.openSlide()" class="menu-down" style="color:{{@global.style.headerBarIconColor}};">' +
                 '<i class="icon icon-menu"></i>' +
                 '</a>' +
                 '{{/if}}' +
                 '{{else}}' +
                 '<a href="index" class="link back bottomBack" style="color:{{@global.style.headerBarIconColor}};">' +
                 '<i class="icon icon-left-open-2"></i>' +
                 '</a>' +
                 '{{/root_Compare}}' +
                 '{{/root_Compare}}' +
                 '</div>' +
                 '<div class="center sliding {{@global.style.headerBarSize}} {{@global.style.headerBarFont}}" {{#root_Compare @global.style.headerBarType "==" "image"}}style="visibility:hidden;"{{/root_Compare}}>' +
                 '{{#root_Compare @global.style.headerBarTitle "==" ""}}' +
                 '{{@global.style.appName}}' +
                 '{{else}}' +
                 '{{@global.style.headerBarTitle}}' +
                 '{{/root_Compare}}' +
                 '</div>' +
                 '<div class="right"></div>' +
                 '</div>');


             AppyTemplate.registerPartial('backgroundAnimation',
                 '{{#root_Compare @global.style.backgroundType "===" "bganimation"}}' +
                 '<div class="backgroundAnimation">' +
                 '{{#@global.style.appBackground}}' +
                 '<img src="{{this}}" />' +
                 '{{/@global.style.appBackground}}' +
                 '</div>' +
                 '{{/root_Compare}}');

             Appyscript.loginPage = function(a) {

                 /*for (var i = 0; i < Appyscript.views.length; i ++) {
                         var view = Appyscript.views[i];
                         if(view.selector==".loginView"){
                           return false;
                           //break;
                         }
                      }*/

                 if (a == "true" && data.login.autoLogin == "true") {
                     return;
                 }


                 Appyscript.closeModal();
                 Appyscript.hideIndicator();
                 var tess = "";
                 $$.get("popups/login.html", function(template) {
                     var compiledTemplate = AppyTemplate.compile(template);
                     if (a != undefined && Appyscript.isFunction(a) == true) {
                         data.callback_method = a;
                         localStorage.setItem("popup", true);

                     } else if (a != undefined || a != '' && a == true) {
                         data.callback_method = undefined;
                         data.inner = true;
                         localStorage.setItem("popup", true);

                     } else {
                         data.callback_method = undefined;
                         data.inner = false;

                     }
                     data.title = data.loginfield.loginPageName;
                     var html = compiledTemplate(data);
                     $$.get("popups/loginmain.html", function(template) {
                         Appyscript.popup(html);
                         var compiledTemplate = AppyTemplate.compile(template);
                         tess = compiledTemplate(data);

                         login_showLoader()
                         setTimeout(function() {

                             login_hideLoader()
                             Appyscript.hideWebViewFragment();
                             gettingStartedView = Appyscript.addView('.loginView', {
                                 dynamicNavbar: true,
                                 swipeBackPage: false
                             });
                             gettingStartedView.router.load({
                                 content: tess,
                                 animatePages: false
                             });
                             if (data.loginfield.loginSetting.enableRememberMe == 1 ) {
                             if(localStorage.getItem("remembermevalue")=="true")
                              {
                              var getLoginKeysPair = localStorage.getItem("loginKeysPair2");
                              if (!getLoginKeysPair || getLoginKeysPair == 'null') {
                                  getLoginKeysPair = [];
                              } else {
                                  getLoginKeysPair = JSON.parse(getLoginKeysPair);
                              }
                              $$.each(getLoginKeysPair, function(key, value) {
                                  if (value.appId == data.appData.appId) {
                                      $$("#loginid").val(value.emailid);
                                      $$("#loginpass").val(value.password);
                                      var rememberme= document.getElementById("rememberme");
                                      rememberme.checked=true;
                                  } else {
                                  }
                              });
                              }
                              }
                         }, 5000);

                     });
                 });

             }
             var foodcourtValPopup = "";
             Appyscript.popupPage = function(popupName, val) {
                 foodcourtValPopup = val;
                 if (popupName == "dating-menu") {
                     localStorage.setItem("settingProfile", "dattingMenu_Setting");
                 }

                 if (popupName == "login") {
                     popupName = "loginmain"
                 }

                 var dataTmp = undefined;
                 if (popupName == "terms-wallet") {
                     var page_title = (pageData != undefined && pageData.pageTitle != undefined) ? pageData.pageTitle : "Wallet";
                     var btnTitle = (data.languageSetting.cookies_accept != undefined) ? data.languageSetting.cookies_accept : "I Accept";
                     var termandConTitle = (data.loginfield.signup.appTermcondLabel != undefined) ? data.loginfield.signup.appTermcondLabel : "";
                     var termandConTxt = (pageData != undefined && pageData.terms_and_conditions != undefined) ? pageData.terms_and_conditions : "";
                     var privacyTitle = (data.loginfield.signup.appPvPolicyLabel != undefined) ? data.loginfield.signup.appPvPolicyLabel : "";
                     var privacyTxt = (pageData != undefined && pageData.privacy_policy != undefined) ? pageData.privacy_policy : "";

                     var contentData = '<h5 style="font-size: large;margin: 0;margin-bottom: 5px;">' + termandConTitle + '</h5><p style="margin-bottom: 20px;">' + termandConTxt + '</p><h5 style="font-size: large;margin: 0;margin-bottom: 5px;">' + privacyTitle + '</h5> <p>' + privacyTxt + '</p>'

                     dataTmp = {
                         "heading": (page_title + ""),
                         "acceptButton": (btnTitle + ""),
                         "content": contentData
                     };
                     dataTmp.wallet = true;
                     popupName = "terms";

                 }


                 $$.get("popups/" + popupName + ".html", function(template) {
                     var compiledTemplate = AppyTemplate.compile(template);

                     var flag = false;
                     for (var i = 0; i < Appyscript.views.length; i++) {
                         var view = Appyscript.views[i];
                         if (view.selector == ".loginView") {
                             flag = true;
                             break;
                         }
                     }

                     if (popupName == "news-menu") {
                         var jsonData = localStorage.getItem("menu-json");
                         var datas = JSON.parse(jsonData);
                         if (localStorage.getItem("email")) {

                             datas.login = "yes";
                         }
                         datas.langSetting = pageData.languageSetting;
                         for (var i = 0; i < datas.list.length; i++) {
                             if (datas.list[i].newsType) {
                                 if (datas.list[i].newsType == 2) {

                                     datas.rss = "yes";
                                     $$(".bookmark-btn").hide();
                                 }
                             }
                         }

                         var html = compiledTemplate(datas);
                         Appyscript.popup(html);
                     } else if (popupName == "foodcourt-filter") {
                         person = [];
                         timrval = '', priceval = '', vendorMiniOrderVariation, vendorFilterMaxval, vendorFilterminval;
                         var filterdata = {
                             "filter": val,
                             "vendorMiniOrderVariation": vendorMiniOrderVariation,
                             "vendorFilterMaxval": vendorFilterMaxval,
                             "vendorFilterminval": vendorFilterminval
                         };
                         cusineListData.filterdata = filterdata;
                         console.log("cusineListData@@@ " + JSON.stringify(cusineListData));
                         var html = compiledTemplate(cusineListData);
                         Appyscript.popup(html);

                       if(JSON.parse(localStorage.getItem("person_val")))
                       {
                         for(var i=0;i<cusineListData.cuisineList.list.length;i++)
                         {

                        for(var j=0;j< JSON.parse(localStorage.getItem("person_val")).length;j++)
                         {
                         if(cusineListData.cuisineList.list[i].cuisine_id==JSON.parse(localStorage.getItem("person_val"))[j])
                          {

                             // $$("#filter"+cusineListData.cuisineList.list[i].cuisine_id).checked = true;
    $$("#filter"+cusineListData.cuisineList.list[i].cuisine_id).attr("checked",true)
                               $$("#"+cusineListData.cuisineList.list[i].cuisine_id).addClass("checked")
                           }
                        }
                       }
                            $$(".toolbarcuine").show();
                       }




                     } else if (popupName == "foodcourt-timining") {
                         var storetime = detailsdatadata.storetime;
                         var aa = {
                             "storetime": storetime
                         };
                         var html = compiledTemplate(aa);
                         Appyscript.popup(html);
                     } else if (popupName == "dinein-filter") {
                         person = [];
                         timrval = '', priceval = '';
                         var filterdata = {
                             "filter": val
                         };
                         cusineListDataDineIn.filterdata = filterdata;
                         var html = compiledTemplate(cusineListDataDineIn);
                         Appyscript.popup(html);
                     } else if (popupName == "dinein-timining") {
                         var storetime = detailsdatadataDineIn.storetime;
                         var aa = {
                             "storetime": storetime
                         };
                         var html = compiledTemplate(aa);
                         Appyscript.popup(html);
                     } else if (popupName == "dinein-call-waiter") {
                         var callwaiter = detailsdatadataDineIn;
                         var callW = {
                             "callwaiter": callwaiter
                         };
                         var html = compiledTemplate(callW);
                         Appyscript.popup(html);
                     } else if (popupName == "dinein-call-bill") {
                         var callBill = detailsdatadataDineIn;
                         var callB = {
                             "callBill": callBill
                         };
                         var html = compiledTemplate(callB);
                         Appyscript.popup(html);
                     } else if (popupName == "dinein-table-list") {
                         var tablelist = detailsdatadataDineIn;
                         var tableL = {
                             "tablelist": tablelist
                         };
                         var html = compiledTemplate(tableL);
                         Appyscript.popup(html);
                     } else if (popupName == "news-settings") {

                         if (localStorage.getItem("email")) {
                             var wsUrl = webserviceUrl + "News.php";
                             var appid = localStorage.getItem("appid");
                             var deviceToken = Appyscript.getDeviceToken();
                             var json = '{"method":"notificationStatus","appId":"' + appid + '","pageIdentifire":"' + pageIdentifie + '","deviceType":"Android","deviceToken":"' + deviceToken + '","userEmail":"' + localStorage.getItem("email") + '"}';
                             console.log("json--setting--" + json);
                             if (isOnline()) {
                                 Appyscript.showIndicator();
                                 $$.ajax({
                                     url: wsUrl,
                                     data: json,
                                     type: "post",
                                     //321  headers: {'accessToken': deviceEncryptedToken},
                                     async: true,
                                     success: function(jsonData, textStatus) {
                                         Appyscript.hideIndicator();
                                         localStorage.setItem("setting-json", jsonData);
                                         var html = compiledTemplate(JSON.parse(jsonData));
                                         Appyscript.popup(html);
                                     },
                                     error: function(error) {
                                         Appyscript.hideIndicator();
                                         Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                                         console.log("Error: " + error.code + " " + error.message);
                                     }
                                 });
                             }
                         } else {
                             localStorage.setItem("isfrom", "newsstand");
                             Appyscript.loginPage("true");
                         }
                     } else if (popupName == "signup") {
                         if (!isOnline()) {
                             Appyscript.hideIndicator();
                             Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);

                         }
                         var loginServiceURL = site_url + "/webservices/Appuser.php";
                         var serviceData = '{"method":"getCustomLoginForm","appId":"' + localStorage.getItem("appid") + '","pageId":"' + data.loginfield.signup.loginPageId + '","prevVersion":"0","userId":""}';
                         serviceData = EncryptOrDecrypt("encrypt", serviceData);
                         serviceData = serviceData.replace(/\s/g, '');
                         if (isOnline()) {
                             Appyscript.showIndicator();
                             $$.ajax({
                                 url: loginServiceURL,
                                 data: serviceData,
                                 type: "post",
                                 //321  headers: {'accessToken': deviceEncryptedToken},
                                 success: function(jsonData, textStatus) {
                                     Appyscript.hideIndicator();
                                     if (jsonData != '') {
                                         jsonData = jsonData.trim();
                                         jsonData = ReturnHexDataWithSpace(jsonData);
                                         console.log(jsonData);
                                         jsonData = EncryptOrDecrypt("decrypt", jsonData);
                                         data.signUpCustom = JSON.parse(jsonData);
                                         console.log("signup data value ==" + data.signUpCustom);
                                     }
                                     data.title = "Signup"
                                     var html = compiledTemplate(data);
                                     console.log(JSON.stringify(data));
                                     console.log("signup data flag ==" + flag);
                                     if (flag) {
                                         gettingStartedView.router.load({
                                             content: html,
                                             animatePages: true
                                         });
                                         Appyscript.formSettings();

                                     } else {
                                         Appyscript.popup(html);
                                         Appyscript.formSettings();
                                     }

                                 },
                                 error: function(error) {
                                     console.log("Error: " + error.code + " " + error.message);
                                 }
                             });

                             if (AppyTemplate.global.loginData.loginSetting.phoneWithCountryCode == '1') {
                                 Appyscript.setCountryCodeByLocation();
                             }

                         }
                     } else if (popupName == "login-counrtyCode") {
                         Appyscript.getDefaultLanguage();
                         Appyscript.showIndicator();
                         $$.getJSON('res/areacode.json', function(areaCode) {
                             areaCode.title = "Country Code";
                             if (flag) {
                                 areaCode.inner = true;
                             }
                             console.log("calling df data responce ", areaCode);
                             var html = compiledTemplate(areaCode);
                             if (flag) {

                                 gettingStartedView.router.load({
                                     content: html,
                                     animatePages: true
                                 });
                                 Appyscript.hideIndicator();
                             } else {
                                 Appyscript.popup(html);
                                 Appyscript.hideIndicator();
                             }
                             setTimeout(function() {
                                 messengerSearchbar = Appyscript.searchbar('.searchbar', {
                                     searchList: '.countryList',
                                     searchIn: '.item-title'
                                 });
                             }, 1000)

                         })
                     } else if (popupName == "paymentlogin") {
                         var paymentsmethode = {};
                         var paymentsmethode = {
                             "method": "stripe",
                             "tabClassId": "stripe",
                             "tabActive": " active",
                             "label": "Stripe",
                             "paymentMethodKey": "",
                             "clientId": data.loginfield.inp.stripePublicKey,
                             "secretKey": data.loginfield.inp.stripeSecretKey,
                             "page": "login"
                         };
                         $$.get("popups/paymentlogin.html", function(template) {
                             var compiledTemplate = AppyTemplate.compile(template);
                             var html = compiledTemplate(paymentsmethode);
                             Appyscript.popup(html);

                             Appyscript.hideIndicator();
                         });
                     } else if (popupName == "paymentloginvel"){

                       //                                     applicationLicense_Id = data.loginfield.inp.velocityApplicationLicence;
                       //                                     key = data.loginfield.inp.paymentMethod;
                                                                      var paymentsmethode = {};
                                                                          var paymentsmethode = {
                                                                              "method": "velocity",
                                                                              "tabClassId": "velocity",
                                                                              "tabActive": " active",
                                                                              "label": "Velocity",
                                                                              "paymentMethodKey": "",
                                                                              "applicationProfileId": data.loginfield.inp.velocityProfileId,
                                                                              "workflowId": data.loginfield.inp.velocityWorkflowId,
                                                                              "merchantProfileId": data.loginfield.inp.velocityMerchantId,
                                                                              "identityToken": data.loginfield.inp.velocityTokenId,
                                                      //                         "applicationLicenseID": applicationLicense_Id,
                                                                              "page": "login"
                                                                          };
                                                                          $$.get("popups/paymentloginvel.html", function(template) {
                                                                                  var compiledTemplate = AppyTemplate.compile(template);
                                                                                  var html = compiledTemplate(paymentsmethode);
                                                                                  Appyscript.popup(html);

                                                                                  Appyscript.hideIndicator();
                                                                           });
                                                                  }


                     else {
                         if (popupName == "login" || popupName == "loginmain") {
                             data.title = "Login";
                         } else if (popupName == "signup") {
                             data.title = "Signup";
                         } else if (popupName == "reset-password") {
                             data.title = "Reset Password";
                         } else if (popupName == "forgot-password") {
                             data.title = data.loginfield.forgetpwdpage.forgotpwdtext;
                         } else if (popupName == "email-verification") {
                             data.title = "Code Verification";
                         } else if (popupName == "otp-verification") {
                             data.title = "OTP Verification";
                         } else if (popupName == "change-password") {
                             data.title = "Change Password";
                         } else if (popupName == "paymentlogin") {
                             data.title = "Stripe Payment";
                         } else if (popupName == "map") {
                             if (pageData.mappageTitle) {
                                 data.pageTitle = pageData.mappageTitle;
                             } else if (val) {
                                 data.pageTitle = val;
                             } else {
                                 data.pageTitle = pageData.pageTitle;
                             }
                         }

                         var html;

                         if (popupName == "terms" && dataTmp != undefined) {
                             html = compiledTemplate(dataTmp);

                         } else {
                             html = compiledTemplate(data);

                         }


                         if (flag && (popupName == "login" || popupName == "loginmain" || popupName == "signup" || popupName == "forgot-password" || popupName == "email-verification" || popupName == "otp-verification" || popupName == "change-password" || popupName == "paymentlogin")) {
                             gettingStartedView.router.load({
                                 content: html,
                                 animatePages: true
                             });
                         } else {
                             Appyscript.popup(html);
                             if (popupName == "messenger-searcharea") {
                                 if (selectedTab) {
                                     $$("#" + selectedTab).attr("checked", true);
                                 }
                             }

                             if (popupName == "crop-image") {
                                 addCropMethods()
                             }

                         }
                     }
                 });


             }

             Appyscript.popupClose = function() {
                 Appyscript.closeModal();
                 localStorage.setItem("popup", false);
             }

             Appyscript.measurement = function(h) {

                 var height, width, B = document.body,
                     H = document.documentElement;

                 if (typeof document.width !== 'undefined') {
                     width = document.width; // For webkit browsers
                 } else {
                     width = Math.max(B.scrollWidth, B.offsetWidth, H.clientWidth, H.scrollWidth, H.offsetWidth);
                 }
                 if (typeof document.height !== 'undefined') {
                     height = document.height; // For webkit browsers
                 } else {
                     height = Math.max(B.scrollHeight, B.offsetHeight, H.clientHeight, H.scrollHeight, H.offsetHeight);
                 }
                 switch (h) {
                     case 'height':
                         return height;
                         break;
                     case 'width':
                         return width;
                         break;
                 }
             }




             Appyscript.onPageBeforeAnimation("*", function (e) {
                 Appyscript.resetCSS(e);
             });
             Appyscript.onPageAfterBack("*", function (e) {
                 console.log(" =======================================");
                 // handle back
                 AppyPieNative.cancelAWSNetworkRequest();
                 console.log("CANCELLED AWS =======================================");

             });

             Appyscript.resetCSS = function(e) {
                 var oddPage = ['NotificationProfilePage', 'NotificationSharePage', 'NotificationPage', 'paymentPage', 'commanPage', 'thankyou', 'error', 'weather', 'bottom_website', 'user', 'CountdownPage', 'pluscode'];
                 var nesjs = mainView.activePage.name.split("-")[0];
                 console.log("onPageBeforeAnimation" + nesjs);

                 if (nesjs == "services") {
                     if (AppyTemplate.global.dirAutoSuggestSearchKey == "0") {


                         Keyboard.hideFormAccessoryBar(false);
                     } else {

                         Keyboard.hideFormAccessoryBar(true);

                         $$(".dir_cat_search").removeClass("on");
                         $$("body").removeClass("none-scroll");
                     }
                 } else {
                     Keyboard.hideFormAccessoryBar(false);
                 }
                 if (AppyTemplate.global.isSearchInLargeDir = true) {
                     AppyTemplate.global.isSearchInLargeDir = false
                 };
                 if (AppyTemplate.global.isSearchInLargeHyp = true) {
                     AppyTemplate.global.isSearchInLargeHyp = false
                 };

                 if (nesjs != pageId && data.appData.layout != nesjs && oddPage.indexOf(nesjs) == "-1") {
                     if (AppyTemplate.global.isSearchInLargeDir = true) {
                         AppyTemplate.global.isSearchInLargeDir = false
                     };
                     console.log("onPageBeforeAnimation" + pageId);
                     $$('#pagesCSS').attr('href', 'css/' + nesjs + '.css');
                 }
                 if (customFormCase) {
                     if (e.name != null && e.name != "paymentPage") {
                         var thisPageID = e.name.split("-")[0];
                         $$('#pagesCSS').attr('href', 'css/' + thisPageID + '.css');
                     }
                 }
                 if (nesjs == "services" || nesjs == "hyperlocal" || nesjs == "realestate" || nesjs == "customevent" || nesjs == "event" || nesjs == "demanddelivery") {
                     if (AppyTemplate.global.dirMode == 1) {
                         pageData = pageDataDir;
                         pageIdentifie = AppyTemplate.global.dirPageIdFordirectory;
                         AppyTemplate.global.styleAndNavigation = styleAndNavigationDir;

                         // $$('#pagesCSS').attr('href','css/services.css');
                         $$('#pagesCSS').attr('href', 'css/' + nesjs + '.css');
                         if (nesjs == "hyperlocal") {
                             $$(".hyper-swiper").css('height', 'auto ');
                         }
                         AppyTemplate.global.dirMode = 0;

                     }
                 }
             }

             Appyscript.resetCSSBottom = function(e) {
                 if (e.type == "pageBeforeInit") {
                     var oddPage = ['NotificationProfilePage', 'NotificationSharePage', 'NotificationPage', 'paymentPage', 'commanPage', 'thankyou', 'error', 'weather', 'bottom_website', 'user', 'pluscode'];
                     var nesjs = mainView.activePage.name.split("-")[0];


                     if (nesjs == "services") {


                         if (AppyTemplate.global.dirAutoSuggestSearchKey == "0") {


                             Keyboard.hideFormAccessoryBar(false);
                         } else {

                             Keyboard.hideFormAccessoryBar(true);

                             $$(".dir_cat_search").removeClass("on");
                             $$("body").removeClass("none-scroll");
                         }
                     } else {

                         Keyboard.hideFormAccessoryBar(false);
                     }
                     var nesjs = mainView.activePage.name.split("-")[0];
                     if (AppyTemplate.global.style.layout == "bottom") {
                         if (data.appData.layout != nesjs && oddPage.indexOf(nesjs) == "-1") {
                             $$('#pagesCSS').attr('href', 'css/' + nesjs + '.css');
                         }
                     }
                 }
             }



             //---------- Get Json Data for page
             var jsLoad = true;
             var notification_val;
             Appyscript.pageData = function(pageId, pageIdentifie, from) {
                 if (jsLoad) {
                     jsLoad = false;
                     pageJsupload();

                 }
                 notification_val=from;
                 // by satish for group user
                 if (localStorage.getItem("NwwgroupId")) {
                     if (data.loginfield.loginSetting.groupEnable == 1 && localStorage.email) {
                         if (from == true) {
                             folderPage = true;
                         }
                         var newTEst = "" + JSON.stringify(data.publicPages) + "" + localStorage.NewallowedPages;
                         localStorage.setItem("totalpagevalue", newTEst);

                         localStorage.NewallowedPages = localStorage.NewallowedPages ? localStorage.NewallowedPages : "";
                         if (newTEst.indexOf(pageIdentifie) == -1 && !folderPage) {
                             Appyscript.popupClose();
                             Appyscript.showIndicator();


                             setTimeout(function() {
                                 Appyscript.alert(data.languageSetting.you_have_not_permission, appnameglobal_allpages);
                                 Appyscript.hideIndicator();
                             }, 1000)

                             return false;
                         }
                     }
                 }
                 // end of function  group user




                 if ((AppyTemplate.global.style.layout == "slidemenu" || AppyTemplate.global.style.layout == "slidemenu3d") && mainView.activePage.name == "quote-page") {
                     Appyscript.params.swipePanelActiveArea = 0;
                 }
                 localStorage.setItem("pageName", pageId);
                 localStorage.setItem("pageIdentifie", pageIdentifie);
                 var pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '" }';

                 if (pageId == "rss") {
                     $$("#postcommentblog").hide();
                 }



                 if (typeof from === "undefined" || from == null) {
                     if (pageId == "ecommerce") {
                         var emailId = '';
                         if (localStorage.getItem("email") != undefined) {
                             emailId = localStorage.getItem("email");
                         }
                         pagePostData = '{"method":"getPages","formType":"directory","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","emailId":"' + emailId + '"}';
                     } else if (pageId == "event") {
                         posrequestpage = 'eventlocation';
                         //alert("hgghghgh");
                         Appyscript.locationPermission('ce_hitLocation', 'Appyscript.ce_loc_permissionDenied');
                         var localLatitude = localStorage.getItem("localLatitude");
                         var localLongitude = localStorage.getItem("localLongitude");
                         //localLatitude = 0; localLongitude = 0;
                         console.log(localLatitude + "_rad_" + localLongitude)
                         pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","lat":"' + localLatitude + '","long":"' + localLongitude + '"}';
                     } else if (pageId == "services") {

                         var localLatitude = parseFloat(localStorage.getItem("localLatitude"));
                         var localLongitude = parseFloat(localStorage.getItem("localLongitude"));
                         pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","lat":"' + localLatitude + '","long":"' + localLongitude + '"}';

                     }


                     else if (pageId == "realestate") {

                         pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","emailId":"' + localStorage.getItem("userId") + '"}';
                         isFromDirectory = false;

                     } else {
                         if (pageId == 'coupon') {
                             var coupondeviceid = Appyscript.getDeviceId();
                             pageIdentifirecoupan = pageIdentifie

                             pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","deviceId":"' + coupondeviceid + '"}';
                         }

                         else {
                             pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '"}';
                         }

                         isFromDirectory = false;
                     }
                 } else {
                     if (from == "directory") {
                         pagePostData = '{"method":"getPages","formType":"directory","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","lat":"' + localLatitude + '","long":"' + localLongitude + '"}';
                         isFromDirectory = true;
                     }

                      else if (pageId == "event") {
                            posrequestpage = 'eventlocation';
                            Appyscript.locationPermission('ce_hitLocation', 'Appyscript.ce_loc_permissionDenied');
                            var localLatitude = localStorage.getItem("localLatitude");
                            var localLongitude = localStorage.getItem("localLongitude");
                            pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","lat":"' + localLatitude + '","long":"' + localLongitude + '"}';
                        }
                         else if (pageId == 'coupon') {
                                                     var coupondeviceid = Appyscript.getDeviceId();
                                                     pageIdentifirecoupan = pageIdentifie

                                                     pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","deviceId":"' + coupondeviceid + '"}';

                                                 }
                     else if (from == "realestate") {
                         pagePostData = '{"method":"getPages","formType":"directory","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '","emailId":"' + localStorage.getItem("userId") + '"}';
                         isFromDirectory = true;
                     } else {
                         pagePostData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '"}';
                         isFromDirectory = false;
                     }
                 }
                 if (isOnline()) {
                     console.log("============== = == = = == = ");
                     console.log(pagePostData);


                     var deviceModel = Appyscript.getDeviceModel();




                        if (pageId=="services" || pageId=="textpage" || pageId=="loyalty" || pageId=="foodcourt"|| notification_val==false||
                                                pageId=="website"|| pageId=="religious"|| pageId=="crm"|| pageId=="donation" || pageId=="foursquare" || pageId=="survey" ||
                                                pageId=="video" || pageId=="linkedin" || pageId=="codepage" || pageId=="editorpage" || pageId=="social" || pageId=="shareas"||
                                                pageId=="folder"|| pageId=="eecommerce" || pageId =="taxi-ride" || pageId == "news" || pageId == "event" || pageId=="app-sheet"  ||
                                                pageId=="grubhub" || pageId=="app-sheet"|| pageId=="twitter"||
                                                 pageId=="googleplus"|| pageId=="review"|| pageId=="todolist"|| pageId=="photo"|| pageId=="education"|| pageId=="scheduling"||
                                                  pageId=="deeplink"|| pageId=="tools"|| pageId=="chatroom"|| pageId=="event"|| pageId=="crm"|| pageId=="social"||
                                                  pageId=="formbuilder"|| pageId=="facebook"|| pageId=="audio"|| pageId=="blog"|| pageId=="rss"|| pageId=="forum"||
                                                  pageId=="ereader"|| pageId=="realestate" || pageId=="coupon" || pageId=="appsheets" || pageId=="ewallet"|| pageId=="quiz-poll" || pageId=="hyperstore") {
                                                    AWSPage = false;
                                                }else if(deviceModel == "SM-T531" && pageId == "formbuilder"){
                                                    AWSPage = false;
                                                }else {
                                                    AWSPage = true;
                                                }




                      // update pageidentifier
                      if(AWSPage){
                         AppyPieNative.fetchPageDataUsingAWS(pagePostData);
                         }
                         else{


                         var query = webserviceUrl + 'Page.php';

                         Appyscript.showIndicator();
                         $$.ajax({
                             url: query,
                             data: Appyscript.validateJSONData(pagePostData),
                             type: "post",
                             headers: {'accessToken': deviceEncryptedToken},
                             async: true,
                             success: function (data, textStatus) {


                                 if (data == "null") {
                                     loadPageData();
                                 } else {
                                     dataGlobalDownloadPage = data;
                                     fileSystemGlobal.root.getFile(pageIdentifie + '.json', {
                                         create: true,
                                         exclusive: false
                                     }, gotFileEntryPage, failPage);
                                 }
                             },
                             error: function (error) {
                                 failPage();
                                 Appyscript.hideIndicator();
                                 console.log("Error: " + error.code + " " + error.message);
                             }
                         });}
                     } else {
                         Appyscript.hideIndicator();
                         loadPageData();
                     }
                 };
             function proceedWithAWSResponse(response){
                         console.log("===11111=1=1=1=1=1=1==1=1=1=1=1==========================");
                         var data = JSON.stringify(response)
                         console.log(data);
                         console.log("===11111=1=1=1=1=1=1==1=1=1=1=1==========================");

                             if (data == null) {
                                 loadPageData();
                             } else {

                              if(localStorage.popup=="true"){

                               }
                                 dataGlobalDownloadPage = data;
                                if (pageId == 'coupon')
                                {
 //                                commonPageArraylist.push({
 //                                               pageId:pageId,
 //                                               pageIdentifie:pageIdentifie,
 //                                               pageData:pageData,
 //                                 });
                             }

                                 fileSystemGlobal.root.getFile(pageIdentifie + '.json', {
                                     create: true,
                                     exclusive: false
                                 }, gotFileEntryPage, failPage);
                             }
             }

             function proceedWithAWSError(error) {
                 failPage();
                 AppyPieNative.cancelAWSNetworkRequest();
                 Appyscript.hideIndicator();
                 console.log("Error: " + error.code + " " + error.message);
             }

             function failPage() {
                 /* $$.getJSON('/data/data/'+Appyscript.getPackageName()+'/files/files/'+pageIdentifie+'.json', function (data) {
            pageData = data;
            Appyscript.changePage();
            });
*/
                 $$.getJSON('jsonData/' + pageId + '.json', function(data) {
                     pageData = data;
                     Appyscript.changePage();
                 });
             }

             function gotFileEntryPage(fileEntry) {
                 fileEntry.createWriter(gotFileWriterPage, failPage);
             }

             function gotFileWriterPage(writer) {

                 writer.write(dataGlobalDownloadPage);
                 writer.onwriteend = function(evt) {
                     loadPageData();
                     writer.seek(writer.length);
                 };

             }

             //shiv
             function gotFileEntryPageSaveData(fileEntry) {
                 fileEntry.createWriter(gotFileWriterPageSaveData, failPage);
             }

             function gotFileWriterPageSaveData(writer) {
                 writer.onwriteend = function(evt) {
                     writer.onwriteend = function(evt) {
                         writer.seek(4);
                         writer.write(dataGlobalDownloadPage);
                         writer.onwriteend = function(evt) {}
                     };
                 };
                 writer.write(dataGlobalDownloadPage);

             }

             function loadPageData(from) {
                 var fileSystem = fileSystemGlobal;
                 window.rootFS = fileSystem.root;
                 var documentPath = fileSystem.root.toURL();
                 var xmlPath = documentPath;
                 if (documentPath.indexOf('file://') != -1) {
                     documentPath = documentPath.replace('file://', '');
                     xmlPath = xmlPath.replace('file://', '');
                     if (documentPath.indexOf('//') != -1) {
                         documentPath = documentPath.replace('//', '/');
                         xmlPath = xmlPath.replace('//', '/');
                     }
                 }

                 pageIdentifie = localStorage.getItem("pageIdentifie");
                 xmlPath = xmlPath + pageIdentifie + ".json";
                 console.log("xmlPath     : " + xmlPath)
                 //dharmendra
                                  var currentPageName = mainView.activePage.name.split("-")[0];
                                  if(currentPageName == pageId){
                                   Appyscript.hideIndicator();}
                                   else
                                   {Appyscript.showIndicator();}
                 $$.ajax({
                     type: 'get',
                     url: xmlPath,
                     data: {},
                     success: function(jsonString) {
                         if (pageId != 'loyaltycard') {
                             if (pageId != 'appypiedb') {
                                 //if (pageId != 'ereader')
                                 Appyscript.hideIndicator();
                             }
                         }
                         var temp = pageData;
                         pageData = JSON.parse(jsonString);

                         if (pageData.show404Page == '1') {
                             Appyscript.changePage();
                             return false;
                         }

                         if (pageId == 'coupon') {
                             expirecoupon();
                         }

                         if (pageId == 'map'){
                            var bottomNavigation = $$(".toolbar").find("#app_navigation_bottom");
                            bottomNavigation.hide().removeClass("on");
                         }


                         if (isFromDirectory) {
                             AppyTemplate.global.styleAndNavigation = pageData.styleAndNavigation;
                             if (!pageData.list) {
                                 pageData = temp;
                                 AppyTemplate.global.styleAndNavigation = pageData.styleAndNavigation;
                                 $$.get("pages/service-request.html", function(template) {
                                     var compiledTemplate = AppyTemplate.compile(template);
                                     var html = compiledTemplate(pageData.languageSetting);
                                     mainView.router.load({
                                         content: html,
                                         animatePages: true
                                     });

                                 });
                             } else {

                                 if (pageData.list.length == 1) {
                                     Appyscript.formBuilder(0);
                                     AppyTemplate.global.innerLayout = 1;
                                 } else {
                                     for (var i = 0; i < pageData.list.length; i++) {
                                         if (pageData.list[i].identifire == "custom") {
                                             Appyscript.resetLayout(true);
                                             Appyscript.formBuilder(i);
                                         }
                                     }
                                 }
                             }
                         } else {
                             Appyscript.changePage();
                         }

                     },
                     error: function(response, textStatus, errorThrown) {
                         Appyscript.hideIndicator();
                         if (!AppyTemplate.global.checkpageIdentifier)
                             Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                         //failPage();
                     }
                 });
             }

             Appyscript.changePage = function(jsonData) {
                 isSinglePage = false;
                 callbackLogin = null;

                  if (AppyTemplate.global.style.layout == "bottom") {
                                    var bottomNavigation = $$(".toolbar").find("#app_navigation_bottom");
                                                         bottomNavigation.hide().removeClass("on");

                                  }





                 if (data.appData.appName && typeof appnameglobal_allpages === "undefined") {
                     appnameglobal_allpages = data.appData.appName;
                 }

                 if (data.languageSetting.something_went_wrong_please_try_again && something_went_wrong_please_try_again === "undefined") {
                     something_went_wrong_please_try_again = data.languageSetting.something_went_wrong_please_try_again;
                 }

                 if (data.languageSetting.check_internet_connection && internetconnectionmessage === "undefined") {
                     internetconnectionmessage = data.languageSetting.check_internet_connection;
                 }

                 if (localStorage.getItem("pageName") != null) {
                     pageId = localStorage.getItem("pageName");
                 }
                 initGoogleAnalytic();

                 if (jsonData != undefined) {
                     pageData = jsonData;
                 }
                 if (pageId == 'newsstand' && dataGlobalDownloadPage != '' && dataGlobalDownloadPage != 'undefined' && dataGlobalDownloadPage != 'null') {
                     pageData = JSON.parse(dataGlobalDownloadPage)
                 }
                 console.log(pageData);
                 if (pageData.msg == "Sorry! This page reference doesn't exist") {
                     Appyscript.hideIndicator();
                     //Appyscript.alert(pageData.msg, appnameglobal_allpages);
                     return;
                 }

                 AppyTemplate.global.styleAndNavigation = pageData.styleAndNavigation;

                 if (pageData.languageSetting) {
                     AppyTemplate.global.pageLanguageSetting = pageData.languageSetting;
                 }
                 AppyTemplate.global.os = Appyscript.device.os;

                 if (pageData.setting != null) {
                     AppyTemplate.global.setting = pageData.setting;
                 }
                 if (pageId == "news") {
                     if (pageData.settings) {
                         AppyTemplate.global.setting = pageData.settings;
                     }
                 }
                 if (pageId == "event") {
                     if (pageData.settings) {
                         AppyTemplate.global.setting = pageData.settings;
                     }
                 }

                 if (pageId == "services") {
                     AppyTemplate.global.dirAutoSuggestSearchKey = pageData.setting.dirAutoSuggestSearchKey;
                     initializeService();
                 } else if (pageId == "hyperlocal") {
                     initializehyperLocal();
                 }

                 if (AppyTemplate.global.style.layout == "slidemenu") {
                     Appyscript.closePanel();
                 }
                 if (AppyTemplate.global.style.layout == "slidemenu3d") {
                     Appyscript.closePanel();
                 }

                 if (pageData.setting && pageData.setting.currency && data.currencySymbol) {

                     if (!AppyTemplate.global.setting) {
                         AppyTemplate.global.setting = {};
                     }

                     AppyTemplate.global.setting.actualCurrencySymbol = data.currencySymbol[pageData.setting.currency];

                 }

                 if (pageId == "app-sheet") {
                    if (localStorage.getItem("email") == null || localStorage.getItem("email") == '') {
                         Appyscript.loginPage('true');
                         return;
                     }
                 }

                 if (pageData.show404Page == '1' ) {
                     show404page(pageData.pageTitle, "appyicon-no-data", "Data Not Found");
                     return false;
                 }

                 if (pageData.autoLogin == 'YES' && !localStorage.getItem("email")) {
                     if (localStorage.getItem("email") == undefined || localStorage.getItem("email") == "") {

                         Appyscript.loginPage("true");
                         callbackLogin = Appyscript.changePage;

                     } else if (pageId == "services" || pageId == "hyperlocal") {
                         openPage(pageId, pageData);
                     }

                     if (pageId == "socialnetwork") {
                         if (localStorage.getItem("acceptedtermscheck") == "false" || !localStorage.getItem("acceptedtermscheck")) {
                             if (AppyTemplate.global.glblheading != "") {
                                 Appyscript.popupPage('social-eula');
                                 return;
                             }
                         }
                     } else if (pageId == "dating") {
                         if (localStorage.getItem("acceptedtermscheck") == "false" || !localStorage.getItem("acceptedtermscheck")) {
                             if (AppyTemplate.global.glblheading != "") {
                                 Appyscript.popupPage('dating-eula');
                                 return;
                             }
                         }
                     } else if (pageId == "chatroom") {
                         if (localStorage.getItem("acceptedtermscheck") == "false" || !localStorage.getItem("acceptedtermscheck")) {
                             if (!AppyTemplate.global.glblheading) {
                                 Appyscript.popupPage('eula');
                                 return;
                             }
                         }
                     }


                 } else if (pageId == "recipe") {
                     if (localStorage.getItem("email") == null || localStorage.getItem("email") == '') {
                         Appyscript.loginPage('true');
                         return;
                     } else {
                         var pageIdentifie = localStorage.getItem("pageIdentifie");
                         var email = localStorage.getItem("email");
                         var userId = localStorage.getItem("useridval");
                         var userName = localStorage.getItem("name");
                         var a = JSON.stringify(pageData)

                         Appyscript.initializeRecipe(a, appId, pageIdentifie, email, userId, userName)
                     }
                 } else if (pageId == "auction") {
                     if (localStorage.getItem("email") == null || localStorage.getItem("email") == '') {
                         Appyscript.loginPage('true');
                         return;
                     } else {
                         var pageIdentifie = localStorage.getItem("pageIdentifie");
                         var email = localStorage.getItem("email");
                         var userId = localStorage.getItem("useridval");
                         var userName = localStorage.getItem("name");
                         var userphoneno = localStorage.getItem("phone");
                         var language = newdata.appData.lang;
                         var appnameVal = newdata.appData.appname;
                         var pageval = JSON.stringify(pageData)
                         Appyscript.initializeAuction(pageval, appId, pageIdentifie, email, userId, userName, language, appnameVal, userphoneno)
                     }
                 } else if (pageId == "app-sheet") {
                             if (localStorage.getItem("email") == null || localStorage.getItem("email") == '') {
                                                                               Appyscript.loginPage('true');
                                                                               return;
                                                                           } else {
                                                                              var pageIdentifie = localStorage.getItem("pageIdentifie");
                                                                              var language = newdata.appData.lang;
                                                                              var appnameVal = newdata.appData.appname;

                                                                              var pageval = JSON.stringify(pageData)

                                                                              Appyscript.initAppSheet(pageval, appId, pageIdentifie, language, appnameVal)
                                                        }



                  }


                else if (pageId == "quiz-poll") {

                        if (!isOnline()) {
                             Appyscript.hideIndicator();
                             Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                             return false;

                         }
                        var pageIdentifie = localStorage.getItem("pageIdentifie");
                         var language = newdata.appData.lang;
                         var appnameVal = newdata.appData.appname;
                         var userId = localStorage.getItem("userId")
                         console.log(
                         '234567890-'+userId)

                         var pageval = JSON.stringify(pageData)

                        Appyscript.initializeAuction(pageval, appId, pageIdentifie, email, userId, userName, language, appnameVal, userphoneno)

                  }else if (pageId == "hyperstore") {

                       if (localStorage.getItem("email") == null || localStorage.getItem("email") == '') {
                                               Appyscript.loginPage('true');
                                               return;
                                           } else {
                      var pageIdentifie = localStorage.getItem("pageIdentifie");
                      var email = localStorage.getItem("email");
                      var userId = localStorage.getItem("useridval");
                      var userName = localStorage.getItem("name");
                      var userphoneno = localStorage.getItem("phone");

                       Appyscript.initHyperStore(appId, pageIdentifie, userId,userName,userphoneno)
                        }
                   }



                  else {

                     if (localStorage.getItem("paymentstatus") == "NO") {
                         Appyscript.dismisspayment();
                     }
                     if (pageData.pageTitle != undefined) {

                         pageData.pageId = pageId;
                         var strval = pageData.pageTitle.replace(/[^\w\s]/gi, '').trim();
                         console.log("strval====" + strval);
                         facebookAnalyticPageView(strval);

                     }

                     switch (pageId) {

                         case 'social':
                         case 'cms':
                         case 'religious':
                         case 'donation':
                         case 'survey':
                         case 'linkedin':
                         case 'eecommerce':
                         case 'foursquare':
                         case 'opentable':
                         case 'grubhub':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(false);
                                 openCommonPage("singlePage");
                                 Appyscript.openWebSiteView(pageData.list[0].value, "false", "0", "No", pageData.pageTitle);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'shareas':
                             Appyscript.shareAppMenu(data.appData.androidAppLink);
                             break;

                         case 'ewallet':

                             var blockUser = false;

                             function allowPageAccess() {
                                 pageId = 'ewallet';
                                 pageData.userProfilePic = localStorage.profileImage;
                                 pageData.userName = localStorage.username;

                                 if (checkPaymentcredential_ewallet(pageData)) {
                                     if (localStorage.getItem("acceptedtermscheck_wallet") != "true") {

                                     AppyPieNative.disabledeviceback("1");
                                         Appyscript.popupPage("terms-wallet");
                                     }
                                     pageData.styleAndNavigation.heading = pageData.styleAndNavigation.content;
                                     pageData.styleAndNavigation.tab = ["#4ba61f", "#ffffff", "#4ba61f", "#ffffff"];
                                     pageData.styleAndNavigation.menu = ["#FFFFFF", "#000000", "#000000"];
                                     pageData.styleAndNavigation.button = ["palatinoLinotype", "largeContent", "rgb(75,166,31)", "#ffffff"];
                                     pageData.styleAndNavigation.secondaryButton = ["palatinoLinotype", "largeContent", "rgb(255,173,48)", "#ffffff"];
                                     if (!AppyTemplate.global.style.termcondition.termsStyleNavigarion) {
                                         var localstyle = {
                                             "contentFont": "palatinoLinotype",
                                             "pageBgColor": "#ffffff",
                                             "contentColor": "#000000"
                                         }
                                         AppyTemplate.global.style.termcondition.termsStyleNavigarion = localstyle
                                     }
                                     requestforEwalletProfile(pageId, pageData);
                                 } else {
                                     Appyscript.alert(((pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.error_paymentMethod != undefined && pageData.languageSetting.error_paymentMethod != "undefined" && pageData.languageSetting.error_paymentMethod.length > 0) ? pageData.languageSetting.error_paymentMethod : "Payment method not integrated. Please contact App Admin."), appnameglobal_allpages);
                                 }
                             }

                             var loginStatus = authenticatelogin(blockUser);
                             if (loginStatus == true) {
                                 allowPageAccess();
                             }


                             break;

                     case 'appsheets':
                                                  let _list = pageData.list || []

                                                  if(_list.length == 0){
                                                      Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                                                      AppyPieNative.cancelAWSNetworkRequest();
                                                      return false;
                                                  }

                                                  if (_list.length == 1) {
                                                      if (pageData.list[0].identifire == "timesheet") {
                                                          gettimezone();
                                                      } else {
                                                          googleSheetApi({
                                                              sheetSettings: pageData.settings,
                                                              sheetConfig: pageData.list[0].selectedSpreadSheet,
                                                              languageSetting: pageData.languageSetting
                                                          });
                                                      }
                                                      openCommonPage("singlePage");
                                                  } else {
                                                      openCommonPage();
                                                  }

                                                  break;
                         case 'website':
                             if (pageData.list.length == 1) {


                             if(IsPermissionTrue=="false" && data.home.length==1&& data.appData.layout == "bottom"){
                                      return false;
                             }
                                bottomPageLoad()

                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'socialnetwork':
                             if (!loginFromSocialNetwork) {
                                 checkSocialIAPPayment();
                                 return false;
                             }
                             break;
                         case 'codepage':
                             Appyscript.resetLayout(false);
                             openCommonPage("singlePage");
                             pageData.list = [];

                             var hideHeader = false;
                             if (data.appData.layout == 'bottom' && AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                                 hideHeader = true;
                             }

                             Appyscript.openWebSiteView(pageData.codePageBodyHtml, (pageData.codepageBackFrwd) ? "true" : "false", "0", "No", pageData.pageTitle, localStorage.getItem("mergeAppsBackButton"), hideHeader);
                             break;
                         case 'editorpage':
                             Appyscript.resetLayout(false);
                             openCommonPage("singlePage");
                             Appyscript.openWebSiteView(pageData.editorPageBodyHtml, (pageData.editorpageBackFrwd) ? "true" : "false", "0", "No", pageData.pageTitle, localStorage.getItem("mergeAppsBackButton"));
                             break;
                         case 'twitter':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(false);
                                 openCommonPage("singlePage");
                                 pageValue = pageData.list[0].value;
                                 Appyscript.openTwitter(pageValue, pageData.list[0].name);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'chatroom':
//                             if (pageData.list.length == 1) {
//                                 if (pageData.list[0].identifire == "skype" || pageData.list[0].identifire == "whatsapp") {
//                                     openCommonPage("singlePage");
//                                     Appyscript.resetLayout(false);
//                                 } else {
//                                     Appyscript.resetLayout(true);
//                                 }
//                                 Appyscript.chatroomPage(0);
//                             } else {
//                                 openCommonPage();
//                             }
                              if (pageData.list.length == 1) {

                                Appyscript.resetLayout(true);
                                $$('#pagesCSS').attr('href', 'css/chatroom.css');

                                if ((data.appData.layout == 'slidemenu' || data.appData.layout == 'bottom' || data.appData.layout == 'slidemenu3d') && !folderPage) {
                                    if (pageData.list[0].identifire != "chatroom") {
                                        pageId = 'commanPage';
                                        openPage(pageId, pageData);
                                        singlechatpage = true;
                                        Appyscript.chatroomPage(0);
                                    } else {
                                        Appyscript.chatroomPage(0);
                                        singlechatpage = true;
                                    }
                                } else {
                                    Appyscript.chatroomPage(0);
                                }

                                } else {
                                    pageId = 'commanPage';
                                    openPage(pageId, pageData);
                                }
                             break;
                         case 'crm':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(true);
                                 openCommonPage("singlePage");
                                 openCRM(pageData.list[0].value, pageData.list[0].name, pageData.list[0].identifire);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'googleplus':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(true);
                                 pageValue = pageData.list[0].value;
                                 Appyscript.openGooglePlus(pageValue);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'facebook':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(true);
                                 openCommonPage("singlePage");
                                 pageValue = pageData.list[0].value;
                                 Appyscript.openFacebookFeeds(pageValue, pageData.list[0].name);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'review':
                             if (pageData.list.length == 1) {
                                 if (pageData.list[0].identifire == "review") {
                                     Appyscript.resetLayout(false);
                                     Appyscript.ReviewDetailPage(pageData);
                                 } else {
                                     Appyscript.resetLayout(false);
                                     openCommonPage("singlePage");
                                     Appyscript.openWebView(pageData.list[0].value);
                                 }
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'photo':
                             if (pageData.list.length == 1) {
                                 AppyTemplate.global.innerLayout = 0;
                                 Appyscript.resetLayout(false);
                                 Appyscript.PhotoPage(0, pageData.list[0].identifire);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'todolist':
                             if (pageData.list.length == 1) {
                                 AppyTemplate.global.innerLayout = 0;
                                 Appyscript.resetLayout(true);
                                 Appyscript.todoList(0);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'education':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(true);
                                 Appyscript.EducationPage(0, pageData.list[0].identifire);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'deeplink':
                             if (pageData.list.length == 1) {
                                 openCommonPage("singlePage");
                                 pageValue = pageData.list[0].value;
                                 Appyscript.openDeepLinkPage(pageValue)
                                 //Appyscript.openDeepLink(pageValue);
                             } else {
                                 Appyscript.openDeepLinkPage(pageValue)
                                 //openCommonPage();
                                 //Appyscript.openDeepLink(pageValue);
                             }

                             break;
                         case 'scheduling':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(false);
                                 openCommonPage("singlePage");
                                 Appyscript.openWebView(pageData.list[0].value);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'tools':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(true);
                                 if (pageData.list[0].identifire != "countdown" && pageData.list[0].identifire != "pluscode" && pageData.list[0].identifire != "notes" && pageData.list[0].identifire != "weather" && pageData.list[0].identifire != "mortgageCalculator") {
                                     //Manoj 12/07/2017 start
                                     if (data.appData.layout == 'bottom' && !folderPage) {
                                         isSinglePage = true;
                                         openCommonPage("singlePage");
                                     } else {
                                         if(data.appData.layout !== 'slideshutter'){

                                         openCommonPage();
                                         }

                                     }
                                 }
                                 //Manoj 12/07/2017 end
                                 openPocketTools(0, pageData.list[0].identifire, pageData.list[0].name);
                             } else {
                                 openCommonPage();
                             }

                             break;
                         case 'chat':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(false);
                                 Appyscript.openWebView(pageData.list[0].url);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'event':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(false);
                                 openCommonPage("singlePage");
                                 Appyscript.eventPage(0);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'share':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(false);
                                 openCommonPage("singlePage");
                                 Appyscript.openWebView(pageData.list[0].url);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'formbuilder':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(false);
                                 Appyscript.formBuilder(0);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'audio':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(true);
                                 openCommonPage("singlePage");
                                 AudioPage(0, pageData.list[0].identifire, '');
                             } else {
                                 openCommonPage();
                             }
                             break;

                             //case 'video':
                             //openPage(pageId, pageData);
                         case 'video':
                             //                            if ((pageData.list.length == 1) && (pageData.list[0].list.length == 1)) {
                             //                                Appyscript.resetLayout(true);
                             //                                singleVideoPage = false;
                             //                                Appyscript.singleVedioPage();
                             //                            } else {
                             //                               dfsdsdsd=true;
                             //                                openPage(pageId, pageData);
                             //                            }
                             //                            if(data.appData.layout=="bottom")
                             //                            {
                             //                            Appyscript.hideWebViewFragment();
                             //                            }
                             if ((pageData.list.length == 1) && (pageData.list[0].list.length == 1)) {
                                 Appyscript.resetLayout(true);
                                 singleVideoPage = false;
                                 Appyscript.singleVedioPage();
                                 if ((data.appData.layout == 'slidemenu' || data.appData.layout == 'bottom' || data.appData.layout == 'slidemenu3d') && !folderPage) {
                                     Appyscript.hideWebViewFragment();
                                     openPage(pageId, pageData);
                                 }
                             } else {
                                 dfsdsdsd = true;
                                 openPage(pageId, pageData);
                             }
                             break;
                         case 'blog':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(false);
                                 Appyscript.BlogPage(0);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'rss':
                             if (pageData.list.length == 1) {
                                 if (data.appData.layout != 'slidemenu' || data.appData.layout != 'slidemenu3d') {
                                     Appyscript.resetLayout(true);
                                 }
                                 Appyscript.RssPage(0);
                             } else {
                                 openCommonPage();
                             }
                             break;
                         case 'appypiedb':
                             Appyscript.parseDBData();
                             break;
                         case 'polling':
                             Appyscript.displayMobileAds();
                             Appyscript.openPollPage();
                             break;
                         case 'loyaltycard':
                             Appyscript.checkmemberloggedin(pageId, pageData);
                             break;
                         case 'ereader':
                             if (pageData.list.length == 1 && pageData.list[0].list.length == 1) {

                                 Appyscript.resetLayout(true);
                                 pageValue = pageData.list[0].list[0].url;
                                 openCommonPage("singlePage");
                                 Appyscript.openPdfReaderFile(pageValue, 0, pageData.list[0].list[0].name, pageData.enablePdfThirdparty);
                             } else if (pageData.list.length == 1) {

                                 Appyscript.resetLayout(true);
                                 //openCommonPage("singlePage");
                                 Appyscript.openEReaderBookPage(0);


                             } else {

                                 openCommonPage();
                             }
                             break;
                         case 'onetouch':
                             Appyscript.onetouch();
                             break;

                         case 'realestate':
                             if (pageData.list.length == 1) {
                                 Appyscript.resetLayout(true);
                                 Appyscript.openRealstatePage(0);
                             } else {
                                 openCommonPage();
                             }
                             break;

                         case 'dating':
                             Appyscript.openDating();

                             break;
                         case 'accommodation':
                             Appyscript.openHotel();
                             break;

                         case 'demanddelivery':
                             Appyscript.openDemandDelivery();
                             break;
                         case 'document':
                             Appyscript.openDocmain2();
                             break;

                         case 'taxi-ride':
                             Appyscript.startTaxi(JSON.stringify(pageData));
                             break;
                         case 'wikitude':
                             Appyscript.startWikitude(pageData);
                             break;
                         case 'messenger':
                             Appyscript.initializeMessenger();
                             break;
                         case 'forum':
                             Appyscript.resetLayout(true);
                             Appyscript.displayMobileAds();
                             Appyscript.openForumPage();

                             break;
                         default:
                             AppyTemplate.global.innerLayout = 0;
                             openPage(pageId, pageData);
                             break;
                     }
                 }
             }

             var currencyFomatterSymbol = data.locales;
             var currencyFomatterSymbolProductList;

             function openPage(pageId, pageData) {

                 console.log("pageId  " + pageId)
                 try {
                     AppyPieNative.flurryAnalyticsPage(pageId);
                 } catch (err) {
                     console.log("flurryAnalyticsPage ERROR: " + err);
                 }

                 /* Start WebviewFragment */
                 if (AppyTemplate.global.style.layout == "bottom") {
                     isOpenFragmentWithBottom = false;
                     isHideBackButton = false;
                     Appyscript.hideWebViewFragment();

                 }
                 /* End WebviewFragment */

                 if (data.appData.appMobIdBanner.length > 5 || data.appData.appMobIdInterstitial.length > 5 || data.appData.plan == "Free" || data.appData.appyjumpAndroid == "True" || data.appData.appBandwidthExceeded == "true" || data.appData.blockDeviceType.indexOf("Android") != -1)
                 {

                     ///As discuss we will show ads all condition
                     //            if(pageId=="messenger" || pageId=="chatbot")
                     //            {
                     //                // AppyPieNative.pauseAds();
                     //
                     //            }
                     //            else
                     //               { //AppyPieNative.resumeAds();
                     if (pageId != "dating") {
                         Appyscript.displayMobileAds();
                     }

                 }
                 if (pageId == "ecommerce") {
                     localStorage.setItem("ecommpageId", "ecommerce");
                     if (pageData.categoryList != undefined && pageData.categoryList.length > 0 && pageData.categoryList[0].productList != undefined) {
                         var productListPriceArr = pageData.categoryList[0].productList;
                         currencyFomatterSymbolProductList = pageData.categoryList[0].productList[0].currency;
                         AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                         localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                         AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                         AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                         localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                         AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

                         console.log("DDddAS  " + localStorage.getItem("curSymForSym") + "    " + typeof localStorage.getItem("curSymForSym"));
                         for (var key in productListPriceArr) {
                             productListPriceArr[key].maxPriceStore = currencyFomatter(parseFloat(productListPriceArr[key].price));
                         }
                     }
                 }
                 Appyscript.pagesChange('pages/' + pageId + '.html', {
                     context: pageData
                 });
                 if (pageId == "commanPage") {
                     $$('#pagesCSS').attr('href', 'css/' + pageData.pageId + '.css');
                 } else {
                     if (AppyTemplate.global.style.layout == "slidemenu") {
                         $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');
                     } else {
                         $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');
                     }
                 }

                 if (AppyTemplate.global.mergeAppsBackButton) {
                     Appyscript.closeModal();
                 }
             }

             //            function currencyFomatter(str){
             //                 var x;
             //
             //                 if((String(str)).indexOf(",") !=-1)
             //                 {
             //                  x = str.replace(/,/g,"")
             //
             //                 }
             //                 else
             //                 {
             //                  x=str;
             //                 }
             //                // return (x.toLocaleString(AppyTemplate.global.curSymFor));
             //             //   return new Intl.NumberFormat(AppyTemplate.global.curSymFor, { maximumFractionDigits: 2 }).format(x)
             ////             var priceValues = (x.toLocaleString(AppyTemplate.global.curSymFor)).split('.');
             ////                      if(priceValues.length>1){
             ////                        return String(priceValues[0])+"."+(String(priceValues[1]).length>=2 ? String(priceValues[1]).substring(0,2) : String(priceValues[1])+"0");
             ////                      }else{
             ////                         return (x.toLocaleString(AppyTemplate.global.curSymFor));
             ////                      }
             //
             //                  if(AppyTemplate.global.curSymFor==="en-US"){
             //                         var newNumber =  parseFloat(new Intl.NumberFormat(AppyTemplate.global.curSymFor, { maximumFractionDigits: 2 }).format(x))
             //                         newNumber=(newNumber.toString()).indexOf(".") > -1 ? (newNumber).toFixed(2) : newNumber;
             //                         return newNumber
             //                    }else{
             //                        return new Intl.NumberFormat(AppyTemplate.global.curSymFor, { maximumFractionDigits: 2 }).format(x)
             //                    }
             //
             //           }

             function currencyFomatter(str) {
                 //#123716
                 var x;
                 if ((String(str)).indexOf(",") != -1) {
                     x = str.replace(/,/g, "")

                 } else {
                     x = str;
                 }

                 var currencySymbol = AppyTemplate.global.curSymFor || "en-US";
                 var currencyCode = AppyTemplate.global.curSymCode || "USD";

                 if(currencySymbol=="undefined"||currencySymbol==undefined ||currencySymbol ==null ||currencySymbol==""){
                    currencySymbol="en-US";
                 }
                 if(currencyCode=="undefined"||currencyCode==undefined ||currencyCode =="null" ||currencyCode==""){
                    currencyCode="USD";
                 }

                 x = parseFloat(x).toLocaleString(currencySymbol, {
                     style: 'currency',
                     currency: currencyCode,
                     currencyDisplay: 'code'
                 });
                 return x.replace(/[a-z]{3}/i, "").trim() || ""
             }

             function authenticatelogin(blockUser) {
                 var isLogin = localStorage.getItem("email");
                 if (isLogin == null || isLogin == "") {

                     if (blockUser == true) {
                         Appyscript.loginPage();
                         return false;
                     } else {
                         Appyscript.loginPage("true");
                         return false
                     }
                 } else {
                     return true;
                 }
             }


             function requestforEwalletProfile(pageId, pageData) {
                 Appyscript.showIndicator();

                 var appId = ewalletModel.getewalletAppId()
                 var localUserId = ewalletModel.getewalletpayId()

                 var tmp = Appyscript.validateJSONData('{"method":"getTransactionHistory","appId":"' + appId + '", "appUserId":"' + localUserId + '", "fromDate":"" ,"toDate":"" ,"paymentStatus":"" ,"offset":"0", "count":"4","deviceType":"android"}');

                 console.log("requestforEwalletProfile" + tmp)

                 if (isOnline() && (localUserId != undefined && localUserId != "undefined") && (localUserId != undefined && localUserId != "undefined") && localUserId.length > 0) {
                     $$.ajax({
                         url: EWallet_BaseUrl,
                         data: Appyscript.validateJSONData('{"method":"getTransactionHistory","appId":"' + appId + '", "appUserId":"' + localUserId + '", "fromDate":"" ,"toDate":"" ,"paymentStatus":"" ,"offset":"0", "count":"4","deviceType":"android"}'),
                         type: 'post',
                         async: true,
                         //321  headers: {'accessToken': deviceEncryptedToken},
                         success: function(data) {
                             Appyscript.hideIndicator();
                             var resData = JSON.parse(data);
                             if (resData.status != "failure") {
                                 if (resData.userData != undefined && resData.userData.balanceAmount != undefined) {
                                     ewalletModel.setbalanceAmount(parseFloat((resData.userData.balanceAmount == "" ? "0" : resData.userData.balanceAmount)).toFixed(2))
                                     ewalletModel.setcurrencySymbolName(resData.userData.currency)
                                     ewalletModel.setcurrencySymbol(Appyscript.getcurrencySymbol(resData.userData.currency))
                                 }
                                 var transactionsHistory = sortanArraybasedOnTime(resData.userTransactionHistory);
                                 pageData.userData = resData.userData;
                                 pageData.transactions = transactionsHistory;
                                 openPage(pageId, pageData);
                             } else {
                                 Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                             }

                         },
                         error: function() {
                             Appyscript.hideIndicator();
                             Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                         }
                     })

                 } else {
                     Appyscript.hideIndicator();
                     if ((localUserId != undefined && localUserId != "undefined") && localUserId.length != 0) {
                         Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                     }
                 }
             }

             function sortanArraybasedOnTime(arr) {
                 var arrTmp = arr;
                 arrTmp.sort(function(a, b) {
                     if ((a.addedon != "" && a.addedon != undefined) && (b.addedon != "" && b.addedon != undefined)) {
                         return new Date(parseInt(b.addedon) * 1000) - new Date(parseInt(a.addedon) * 1000);

                     }

                     return 0;

                 });

                 return arrTmp;

             }




             Appyscript.commanPage = function(a) {
                 AppyTemplate.global.innerLayout = 1;
                 var pageName = $$(a).attr("data-page");
                 var pageIdentifier = $$(a).attr("data-identifire");
                 pageValue = $$(a).attr("data-value");
                 var pageIndex = $$(a).attr("data-index");

                 var hideHeader = false;
                 if (data.appData.layout == 'bottom' && AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                     hideHeader = true;
                 }

                 switch (pageName) {
                     case 'social':
                     case 'cms':
                     case 'religious':
                     case 'donation':
                     case 'survey':
                     case 'linkedin':
                     case 'scheduling':
                     case 'eecommerce':
                     case 'foursquare':
                     case 'opentable':
                     case 'grubhub':
                         Appyscript.openWebView(pageValue, pageData.list[pageIndex].name);
                         break;
                     case "appsheets":
                         if (pageData.list[pageIndex].identifire == "timesheet") {
                             gettimezone();
                         } else {
                             googleSheetApi({
                                 sheetSettings: pageData.settings,
                                 sheetConfig: pageData.list[pageIndex].selectedSpreadSheet,
                                 languageSetting: pageData.languageSetting
                             });
                         }
                         break;
                     case 'website':
                         Appyscript.openWebSiteView(pageValue, pageData.list[pageIndex].inAppNavigation, pageData.list[pageIndex].websiteAuthCheck, pageData.list[pageIndex].nativeOsBrowser, pageData.list[pageIndex].name, localStorage.getItem("mergeAppsBackButton"), hideHeader);
                         break;
                     case 'twitter':
                         Appyscript.openTwitter(pageValue, pageData.list[pageIndex].name);
                         break;

                     case 'ereader':
                         if (pageData.list[pageIndex].list.length == 1)
                             Appyscript.openPdfReaderFile(pageData.list[pageIndex].list[0].url, "0", pageData.list[pageIndex].list[0].name, pageData.enablePdfThirdparty);
                         else
                             Appyscript.openEReaderBookPage(pageIndex);
                         break;

                     case 'googleplus':
                         Appyscript.openGooglePlus(pageValue);
                         break;

                     case 'review':
                         if (pageIdentifier == "review") {
                             Appyscript.ReviewDetailPage(pageData);
                         } else {
                             Appyscript.openWebView(pageValue, pageData.list[pageIndex].name);
                         }
                         break;
                     case 'tools':
                         openPocketTools(pageIndex, pageIdentifier, pageData.list[pageIndex].name);
                         //localStorage.setItem("toolstermsaccepted","false");
                         //if(localStorage.getItem("toolstermsaccepted")!="true")
                         if (localStorage.getItem("termscondition" + data.appData.appId) != "true") {
                             if (AppyTemplate.global.glblheading != "") {
                                 Appyscript.popupPage('tools-eula');
                                 return;
                             }
                         }
                         break;
                     case 'photo':
                         Appyscript.PhotoPage(pageIndex, pageIdentifier);
                         break;

                     case 'audio':
                         AudioPage(pageIndex, pageIdentifier, '');
                         break;

                     case 'blog':
                         Appyscript.BlogPage(pageIndex);
                         break;

                     case 'rss':
                         Appyscript.RssPage(pageIndex);
                         break;
                     case 'education':
                         Appyscript.EducationPage(pageIndex, pageIdentifier);
                         break;
                     case 'formbuilder':
                         Appyscript.formBuilder(pageIndex);
                         break;

                     case 'event':
                         Appyscript.eventPage(pageIndex);
                         break;

                     case 'chatroom':
                         Appyscript.chatroomPage(pageIndex);
                         break;
                     case 'deeplink':

                          if (pageData.list.length == 1) {
                                         Appyscript.openDeepLinkPage()
                                     } else {
                                         pageId = 'commanPage';
                                         openPage(pageId, pageData);
                                     }

                         break;
                     case 'facebook':
                         Appyscript.openFacebookFeeds(pageValue, pageData.list[pageIndex].name);
                         break;
                     case 'crm':
                         openCRM(pageValue, pageData.list[pageIndex].name, pageIdentifier);
                         break;
                     case 'realestate':
                         Appyscript.openRealstatePage(pageIndex);
                         break;
                     case 'todolist':
                         Appyscript.todoList(pageIndex);
                         break;
                     case 'forum':
                         Appyscript.openForumPage();
                         break;

                 }
             }


             Appyscript.pageToPopup = function() {
                 var popupName = $$(this).data('page');
                 var jsonID = $$(this).data('jsonID');



                 if (jsonID != '' && jsonID !== undefined) {
                     $$.getJSON('jsonData/' + jsonID + '.json', function(data) {

                         $$.get("popups/" + popupName + ".html", function(template) {
                             var compiledTemplate = AppyTemplate.compile(template);
                             var html = compiledTemplate();
                             Appyscript.popup(html);
                         });

                     });

                 } else {
                     $$.get("popups/" + popupName + ".html", function(template) {
                         var compiledTemplate = AppyTemplate.compile(template);
                         var html = compiledTemplate();
                         Appyscript.popup(html);
                     });
                 }

                 $$.get("popups/" + popupName + ".html", function(template) {
                     var compiledTemplate = AppyTemplate.compile(template);
                     // var context = options && options.context ? options.context : {};
                     var html = compiledTemplate();
                     //  console.log(context);
                     Appyscript.popup(html);
                     //  gettingStartedView.router.load({content: html, animatePages: true});
                     // Appyscript.clickevent('.page-link');

                 });

             }




             // PopUp To Page Function

             Appyscript.popupToPage = function() {
                 Appyscript.closeModal();

                 var animate = $$(this).data('animate');
                 var page = $$(this).data('page');
                 var jsonID = $$(this).data('jsonID');
                 var back = $$(this).data('back');
                 var catid = $$(this).data('catid');
                 var home = $$(this).data('home');
                 var bookmark = $$(this).data("bookmark");
                 var catName = $$(this).data("catName");
                 var newsType = $$(this).data("newsType");
                 //    var obj = JSON.parse(jsonID);
                 if (!localStorage.getItem("pageName")) {
                     localStorage.setItem("pageName", pageId)
                 }
                 var array;
                 if (bookmark) {
                     array = "{" + jsonID + ",'pageIdentifire':'" + pageIdentifie + "', 'appId':'" + localStorage.getItem("appid") + "', 'newsIds':'" + localStorage.getItem("arrayBook") + "'}";
                     array = array.replace(/\'/g, "\"");
                 } else {
                     array = "{" + jsonID + ",'pageIdentifire':'" + pageIdentifie + "', 'appId':'" + localStorage.getItem("appid") + "'}";
                     array = array.replace(/\'/g, "\"");
                 }
                 console.log("array--jason bookmark--" + array);
                 switch (localStorage.getItem("pageName")) {
                     case 'news':
                         if (isOnline()) {
                             if (home) {
                                 var url = webserviceUrl + 'Page.php'
                             } else {
                                 var url = webserviceUrl + 'News.php'
                             }
                             Appyscript.showIndicator();
                             $$.ajax({
                                 url: url,
                                 data: array,
                                 type: "post",
                                 //321  headers: {'accessToken': deviceEncryptedToken},
                                 async: true,
                                 success: function(jsonData, textStatus) {
                                     //Appyscript.hideIndicator();
                                     var data = JSON.parse(jsonData);
                                     //                            data.title='pageId';

                                     if (bookmark) {
                                         data.catId = "bookmark";
                                         data.catName = catName;
                                     } else {
                                         data.catId = catid;
                                         data.catName = catName;
                                     }
                                     console.log("json-------" + jsonData);
                                     if (newsType == "2") {
                                         var obj = JSON.stringify(data.list[0]);
                                         var objj = JSON.parse(obj);
                                         var url = objj.newsRss;
                                         listRssView(url, catName);
                                         $$(".bookmark-btn").hide();
                                     } else {
                                         $$.get('pages/' + page + '.html', function(template) {
                                             Appyscript.popupClose()
                                             Appyscript.hideIndicator();
                                             var compiledTemplate = AppyTemplate.compile(template);
                                             var html = compiledTemplate(data);
                                             mainView.router.reloadContent(html);
                                         });
                                     }



                                 },
                                 error: function(error) {
                                     Appyscript.hideIndicator();
                                 }
                             });
                         }
                         break;

                     case 'foodordering':
                         console.log(page);
                         switch (page) {
                             default:
                                 Appyscript.closeModal();
                                 openPage(pageId, pageData)
                                 break;
                         }
                         break;

                     case 'ecommerce':
                         var baseurl = webserviceUrl + 'Ecomm.php'; //'http://angularml.pbodev.info/webservices/Ecomm.php';
                         var jsonPostecom;
                         var ecommstatus = '0';
                         var productliststatus = '0';
                         var oredrdetails = '0';
                         var useremailid = localStorage.getItem("email");
                         switch (page) {
                             case 'login':
                                 Appyscript.loginPage("true");
                                 ecommstatus = '1';
                                 break;
                             case 'ecommerce-my-account':
                                 ecommstatus = '1';
                                 jsonPostecom = '{"method":"ecommDefaultAddressBook", "appId":"' + app_id + '", "userName":"' + useremailid + '"}'; //{"method":"ecommDefaultAddressBook","appId":"6e870b43edda","userName":"abhishekraics001@gmail.com"}
                                 //console.log(jsonPostecom);
                                 openInnerPage(page, '');
                                 //Appyscript.pagesChange('pages/'+page+'.html',{context: ''});
                                 break;
                             case 'ecommerce-product':
                                 Appyscript.ecomAddToCartProduct('cartview');
                                 break;
                             case 'ecommerce-my-order':
                                 jsonPostecom = '{"method":"ecommOrderListDetail", "appId":"' + app_id + '", "emailId":"' + useremailid + '", "userId":"' + localStorage.getItem("userid") + '", "lang":"' + lang + '"}'; //{"method":"ecommOrderListDetail","appId":"6e870b43edda","emailId":"abhishekraics001@gmail.com","userId":"","lang":"en"}
                                 console.log(jsonPostecom);
                                 break;
                             case 'ecommerce-view-item':
                                 ecomorderId = catid;
                                 productliststatus = '1';
                                 oredrdetails = '1';
                                 jsonPostecom = '{"method":"ecommOrderProductDetail", "appId":"' + app_id + '", "orderId":"' + ecomorderId + '"}'; //{"method":"ecommOrderProductDetail","appId":"94a395a3187a","orderId":"ap1469619439341"}
                                 console.log(jsonPostecom);
                                 break;
                             case 'ecommerce-offer':
                                 productliststatus = '1';
                                 jsonPostecom = '{"method":"offeredProductList", "appId":"' + app_id + '", "emailId":"' + useremailid + '"}'; //{"method":"offeredProductList","appId":"94a395a3187a"}
                                 console.log(jsonPostecom);
                                 break;
                             case 'ecommerce-featuredproduct':
                                 productliststatus = '1';
                                 jsonPostecom = '{"method":"getFeaturedProduct", "appId":"' + app_id + '", "emailId":"' + useremailid + '"}'; //{"method":"getFeaturedProduct","appId":"94a395a3187a"}
                                 console.log(jsonPostecom);
                                 break;
                             case 'ecommerce-wishlist':
                                 productliststatus = '1';
                                 jsonPostecom = '{"method":"wishList", "appId":"' + app_id + '", "email":"' + useremailid + '"}'; //{"method":"wishList","appId":"6e870b43edda","email":"Abhishekraics001@gmail.com"}
                                 console.log(jsonPostecom);
                                 break;
                             case 'ecommerce-term-n-condition':
                                 jsonPostecom = '{"method":"ecommCms", "appId":"' + app_id + '", "identifire":"terms_and_conditions"}'; //{"method":"ecommCms","appId":"6e870b43edda","identifire":"terms_and_conditions"}
                                 console.log(jsonPostecom);
                                 break;
                             case 'ecommerce-privacy-policy':
                                 jsonPostecom = '{"method":"ecommCms", "appId":"' + app_id + '", "identifire":"privacy_policy"}'; //{"method":"ecommCms","appId":"6e870b43edda","identifire":"privacy_policy"}
                                 console.log(jsonPostecom);
                                 break;
                             case 'ecommerce-review':
                                 jsonPostecom = '{"method":"reviewList", "appId":"' + app_id + '", "productId":"' + DetailsProductID + '"}'; //{"method":"reviewList","appId":"6e870b43edda","productId":"21720"}
                                 console.log(jsonPostecom);
                                 break;
                             case 'ecommerce':
                                 ecommstatus = '1';
                                 Appyscript.closeModal();
                                 openPage(pageId, pageData);
                                 break;
                             default:
                                 ecommstatus = '1';
                                 openPage(pageId, pageData);
                                 console.log("ecom default page ");
                                 break;
                         }

                         console.log(jsonPostecom);
                         console.log("ecommDefaultAddressBook :baseurl    " + baseurl + "  jsonPostecom  " + jsonPostecom);
                         if (ecommstatus == '0') {
                             if (isOnline()) {
                                 Appyscript.showIndicator();
                                 $$.ajax({
                                     url: baseurl,
                                     data: Appyscript.validateJSONData(jsonPostecom),
                                     type: "post",
                                     //321  headers: {'accessToken': deviceEncryptedToken},
                                     async: true,
                                     success: function(jsonData, textStatus) {
                                         var ecommjsonData = JSON.parse(jsonData);
                                         if (localStorage.getItem("ecommpageId") == "ecommerce") {
                                             var productListPriceArr = ecommjsonData.orderList;
                                             for (var key in productListPriceArr) {
                                                 productListPriceArr[key].maxSubTotalStore = currencyFomatter(parseFloat(productListPriceArr[key].subtotal));
                                                 //productListPriceArr[key].maxGrandTotalStore = currencyFomatter(parseFloat(productListPriceArr[key].subtotal + productListPriceArr[key].delivery + productListPriceArr[key].tax + productListPriceArr[key].tip - productListPriceArr[key].discount - productListPriceArr[key].coupon));
                                                 if (productListPriceArr[key].misctax.length > 0) {
                                                     productListPriceArr[key].maxGrandTotalStore = currencyFomatter(parseFloat(productListPriceArr[key].subtotal + productListPriceArr[key].delivery + productListPriceArr[key].tax + productListPriceArr[key].tip + parseFloat(productListPriceArr[key].misctax[0].taxAmount) - productListPriceArr[key].discount - productListPriceArr[key].coupon));
                                                 } else
                                                     productListPriceArr[key].maxGrandTotalStore = currencyFomatter(parseFloat(productListPriceArr[key].subtotal + productListPriceArr[key].delivery + productListPriceArr[key].tax + productListPriceArr[key].tip /* + parseFloat(productListPriceArr[key].misctax[0].taxAmount)*/ - productListPriceArr[key].discount - productListPriceArr[key].coupon));
                                             }
                                             var productPriceArr = ecommjsonData.productList;
                                             for (var key in productPriceArr) {
                                                 productPriceArr[key].maxPriceStore = currencyFomatter(parseFloat(productPriceArr[key].price));
                                             }
                                         }
                                         console.log("DDDDDDASAA:__  " + JSON.stringify(ecommjsonData));
                                         ecommjsonData.styleAndNavigation = pageData.styleAndNavigation;
                                         if (productList.totalproduct) {
                                             ecommjsonData.totalproduct = productList.totalproduct;
                                         } else {
                                             ecommjsonData.totalproduct = 0;
                                         }
                                         if (productliststatus == '1') {
                                             subProductList = ecommjsonData;
                                             if (oredrdetails == '1') {
                                                 $$.each(subProductList.productList, function(ind, val) {
                                                     reorderproductid.push(val.productId);
                                                 })
                                             } else {
                                                 resetStoreData(subProductList.productList);
                                             }
                                         }
                                         openInnerPage(page, ecommjsonData);

                                     },
                                     error: function(error) {
                                         console.log("ApplyCoupanCode : Error " + error.code + " " + error.message);
                                         Appyscript.hideIndicator();
                                         updatecartCount();
                                         Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                                     }
                                 });
                             } else {
                                 Appyscript.hideIndicator();
                                 Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                             }
                         }

                         break;
                     default:
                         if (jsonID != '' && jsonID !== undefined) {
                             $$.getJSON('jsonData/' + jsonID + '.json', function(data) {
                                 $$.get('pages/' + page + '.html', function(template) {
                                     var compiledTemplate = AppyTemplate.compile(template);
                                     var html = compiledTemplate(data);
                                     if (back != '' && back !== undefined) {
                                         mainView.router.load({
                                             content: html,
                                             animatePages: animate
                                         });
                                     } else {
                                         mainView.router.reloadContent(html);
                                     }
                                 });
                             })
                         } else {
                             $$.get('pages/' + page + '.html', function(template) {
                                 var compiledTemplate = AppyTemplate.compile(template);
                                 console.log(compiledTemplate);
                                 var html = compiledTemplate();
                                 if (back != '' && back !== undefined) {
                                     mainView.router.load({
                                         content: html,
                                         animatePages: animate
                                     });
                                 } else {
                                     mainView.router.reloadContent(html);
                                 }
                             });
                         }
                         break;
                 }
             }

             $$(document).on('click', '.close-tutorial', Appyscript.popupClose);
             $$(document).on('click', '.page-link', ClickEvent);
             $$(document).on('click', '.merge-page-link', Appyscript.ClickEventMergePage);
             $$(document).on('click', '.popupWithJson', Appyscript.popupWithJson);
             $$(document).on('click', '.popupToPage', Appyscript.popupToPage);
             $$(document).on('click', '.pageToPopup', Appyscript.pageToPopup);
             $$(document).on('click', '.dirBack', function() {
                 if (AppyTemplate.global.dirMode == 1) {
                     pageData = pageDataDir;
                     pageIdentifie = AppyTemplate.global.dirPageIdFordirectory;
                     AppyTemplate.global.styleAndNavigation = styleAndNavigationDir;
                     $$('#pagesCSS').attr('href', 'css/services.css');
                     if (pageData.pageId == "hyperlocal") {
                         $$(".hyper-swiper").css('height', 'auto ');
                     }
                     AppyTemplate.global.dirMode = 0;
                 }
             });

             $$(document).on('pageInit pageAfterBack', function(e) {
                 setTimeout(function() {
                     Appyscript.initToolbar();
                 }, 200)
                 Appyscript.resizeHeader();
             })
             $$(document).on('pageBeforeInit pageAfterBack', function(e) {
                 if (AppyTemplate.global.style.layout == "bottom") {
                     hideSlideNavigation();
                 }
                 if (e.type === "pageAfterBack") {
                     console.log("work me")
                     //                            if(commonPageArraylist.length) {
                     //                                alert("3009 appypie.ks");
                     //                              var oldData = commonPageArraylist.pop();
                     //                             pageId = oldData.pageId;
                     //                             pageIdentifie = oldData.pageIdentifie
                     //                             pageData = oldData.pageData
                     //                             AppyTemplate.global.styleAndNavigation = pageData.styleAndNavigation;
                     //
                     //                           }
                 }


                 var navbarInner = $$(e.detail.page.navbarInnerContainer);
                 var container = $$(e.target);
                 var style = 'style="color:' + AppyTemplate.global.style.headerBarIconColor + '"';
                 if (AppyTemplate.global.style.layout == "bottom") {
                     if (folderPage == true) {
                         navbarInner.find(".bottomBack").css("visibility", "visible");
                     } else {
                         navbarInner.find(".bottomBack").css("visibility", "hidden");
                     }
                 }
                 //if(AppyTemplate.global.style.layout == "slidemenu")
                 if ((AppyTemplate.global.style.layout == "slidemenu" || AppyTemplate.global.style.layout == "slidemenu3d") && localStorage.popup != "true") {
                     var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messessnger|accommodation|education|fitness|forum|dinein|coupondirectory|ewallet|demanddelivery";
                     if ((strList.indexOf(pageId) == -1) && !globalPage) {
                         var historyGet = true;
                         if (e.type == "pageBeforeInit") {
                             if ((e.detail.page.name != mainView.activePage.name) && (mainView.history.length == 3)) {
                                 historyGet = false;
                             }
                         }

                         if (navbarInner.find(".bottomBack").length != 1) {
                             if ((navbarInner.find(".right a").length == 0) && (mainView.history.length > 2) && historyGet) {
                                 navbarInner.find(".right").html('<a href="index" class="link back" ' + style + '><i class="icon icon-left-open-2"></i></a>');
                             }
                         }
                         if (navbarInner.find(".left .back").length == 1) {
                             navbarInner.find(".left").html('<a onclick="Appyscript.openSlide()" ' + style + '><i class="icon icon-menu"></i></a>');
                         }
                     }
                 }
                 if (navbarInner.find(".right a").length == 0) {
                     notificationMenu = true;
                 } else {
                     if (navbarInner.find(".right a.iconz-option-vertical").length == 1) {
                         notificationMenu = true;
                     } else {
                         if (navbarInner.find(".right a").length > 1) {
                             notificationMenu = true;
                         } else {
                             notificationMenu = false;
                         }
                     }
                 }
                 Appyscript.notificationMenu(navbarInner, e.detail.page.name);
                 setTimeout(function() {
                     Appyscript.notificationMenu(navbarInner, e.detail.page.name);
                     // Appyscript.resetToolbar(container);
                 }, 1000);
                 setTimeout(function() {
                     Appyscript.resetToolbar(container);
                 }, 100);
                 Appyscript.resetCSSBottom(e);
             })

             $$(window).resize(function() {
                 Appyscript.resizeHeader();
             })



             /*
             Global method to make HTTP request ..
             params: requestPath,requestData,returnPage,httpMethod
             */
             Appyscript.makeHttpRequest = function(requestPath, requestData, callBackMethod, httpMethod) {
                 requestPath = requestPath.trim();
                 console.log("requested url>>>" + requestPath);
                 if (isOnline()) {
                     Appyscript.showIndicator();
                     $$.ajax({
                         url: requestPath,
                         type: httpMethod,
                         data: requestData,
                         async: true,
                         contentType: "text/json",
                         success: function(data, textStatus) {
                             callBackMethod(data, textStatus);
                             if (pageId != "appypiedb") {
                                 Appyscript.hideIndicator();
                             }
                         },
                         error: function(error) {
                             Appyscript.hideIndicator();
                             Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                         }
                     });

                 } else {
                     Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                 }
             }


             Appyscript.onPageInit('matrix', function(page) {
                 if ($$(".navigationSlider").length != 0) {
                     return false;
                 }
                 var thisContainer = $$(page.container);
                 var thisClass = $$("#app_navigation").attr("class");
                 var template = '<div class="swiper-wrapper">\
	{{#list}}<div class="swiper-slide">{{#list}}\
        	<a href="#" data-productid="{{pageid}}"  data-productidentifier="{{pageIdentifierBecon}}" class="page-link" style="border-color:{{@global.style.navBorderColor}}; {{#if @global.style.showMatrixBackgrondText}} {{else}} background-color:{{@global.style.navBackgroundColor}}{{/if}}">{{#js_compare "this.pageiconType === \'img\' "}} <img src="images/image-1x1.png"  style="border-color:{{@global.style.navBorderColor}}; {{#if @global.style.showMatrixBackgrondText}} {{else}} background-color:{{@global.style.navBackgroundColor}}{{/if}};background-image:url({{@global.homeIconPath}}{{iconName}})">{{else}} <img src="images/image-1x1.png" style="border-color:rgba(0,0,0,0);background-color:rgba(0,0,0,0)" /> <i class="{{iconName}}" style="border-color:{{@global.style.navBorderColor}};color:{{@global.style.navIconColor}}; {{#if @global.style.showMatrixBackgrondText}} {{else}} background-color:{{@global.style.navBackgroundColor}}{{/if}}"></i>{{/js_compare}} <span style="background-color:{{@global.style.navBackgroundColor}}; color:{{@global.style.navTextColor}}">{{pageNewid}}</span></a>\
        {{/list}}</div>{{/list}}\
		</div><div class="swiper-pagination" style="position:fixed; left:0; bottom:5px"></div>';

                 function matrixHTML() {
                     var matrixData = {
                         "list": []
                     }

                     var pageW = $$(window).width();
                     var pageH = $$(window).height() - 30 //30px for bullets navigation;
                     var itemH = 96 //90 + 6;
                     var marginCalc = 6;
                     if (thisClass.indexOf("rounded-option") != -1) {
                         itemH = 106; //96 + 10;
                         marginCalc = 10;
                     }
                     if (thisContainer.is(".navbar-through")) {
                         pageH = pageH - 44; //44px for header;
                     }
                     if (thisContainer.is(".toolbar-through")) {
                         pageH = pageH - 44; //44px for footer;
                     }
                     var rowSize = parseInt(pageH / itemH);
                     var itemSize = rowSize * 3;
                     var marginTop = parseInt((pageH - (rowSize * itemH)) / rowSize) + marginCalc;


                     var list = [];
                     $$.each(newdata.home, function(i, v) {
                         if (i != 0) {
                             if ((i % itemSize) == 0) {
                                 matrixData.list.push({
                                     "list": list
                                 });
                                 list = [];
                             }
                         }
                         list.push(v);
                     })
                     if (list.length != 0) {
                         matrixData.list.push({
                             "list": list
                         });
                     }
                     var compiledTemplate = AppyTemplate.compile(template);
                     var html = compiledTemplate(matrixData);

                     if (matrixData.list.length > 1) {
                         $$("#app_navigation").remove();
                         thisContainer.find(".page-content").append('<div id="app_navigation" class="' + thisClass + '" animation="' + AppyTemplate.global.style.animationEffect + '"></div>');
                         $$("#app_navigation").addClass("swiper-container").css("height", (pageH + 30) + "px").html(html);
                         var matrixSwiper = Appyscript.swiper('#app_navigation', {
                             pagination: '.swiper-pagination',
                             paginationClickable: true
                         });
                         thisContainer.find(".page-link").css("margin-top", marginTop + "px");
                     } else {
                         $$("#app_navigation").remove();
                         thisContainer.find(".page-content").append('<div id="app_navigation" class="' + thisClass + '" animation="' + AppyTemplate.global.style.animationEffect + '"></div>');
                         $$(html).find("a").appendTo($$("#app_navigation"));
                     }
                 }
                 matrixHTML();
                 $$(window).resize(matrixHTML);
             });
             var imageMode = true;
             Appyscript.resizeHeader = function() {



                 var w = $$(window).width();

                 /*if(data.appData.innerNavbarImage) {
                 	return false;
                 }*/
                 if (AppyTemplate.global.style.headerBarType == "text") {
                     return false;
                 }
                 if (AppyTemplate.global.style.headerBarType == "none") {
                     return false;
                 }

                 /* if(data.appData.innerNavbarText) {
		$$(".navbar-inner .center").css("visibility", "hidden");
	}*/
                 var dataHeader = {
                     "portrait": AppyTemplate.global.style.nav_header_image_name,
                     "landscape": AppyTemplate.global.style.nav_header_ipad_image_name
                 }
                 if (data.appData.innerNavbarBlurImage) {
                     dataHeader.portraitBlur = AppyTemplate.global.style.nav_header_image_name_blur;
                     dataHeader.landscapeBlur = AppyTemplate.global.style.nav_header_ipad_image_name_blur;
                 }

                 var headerBlurMode = false;
                 var layoutList = "mainPage|list|imgmatrix|imglist|slideMenu|matrix|fixedmatrix|crossmatrix|slidemenu3d|slideshutter";
                 if (layoutList.indexOf(mainView.activePage.name) != -1) {
                     headerBlurMode = false;
                     if (localStorage.popup != "false") {

                         if (!data.appData.innerNavbarImage) {
                             if (data.appData.innerNavbarBlurImage) {
                                 headerBlurMode = true;

                             }
                         } else {
                             return false;
                         }


                     }
                 } else {
                     if (data.appData.innerNavbarBlurImage) {
                         headerBlurMode = true;
                     }
                     //					if(data.appData.innerNavbarText) {
                     //						if(localStorage.popup == "true") {
                     //							$$(".navbar-inner .center").css("visibility", "hidden");
                     //						}
                     //					}
                 }
                 var customHeader = JSON.stringify(AppyTemplate.global.style.customHeaderImage);
                 customHeader = customHeader.replace(/_44":/gi, '":');
                 customHeader = customHeader.replace(/header_640_88":/gi, 'header_320":');
                 customHeader = customHeader.replace(/header_640_88":/gi, 'header_480":');
                 customHeader = customHeader.replace(/header_750_88":/gi, 'header_375":');
                 customHeader = customHeader.replace(/header_980_88":/gi, 'header_490":');
                 customHeader = customHeader.replace(/header_1334_88":/gi, 'header_667":');
                 customHeader = customHeader.replace(/header_1136_88":/gi, 'header_568":');
                 customHeader = customHeader.replace(/header_1536_88":/gi, 'header_768":');
                 customHeader = customHeader.replace(/header_2048_88":/gi, 'header_1024":');
                 customHeader = customHeader.replace(/header_1242_132":/gi, 'header_414":');
                 customHeader = customHeader.replace(/header_2208_132":/gi, 'header_736":');

                 customHeader = customHeader.replace(/_88":/gi, '":');
                 customHeader = customHeader.replace(/_132":/gi, '":');
                 customHeader = customHeader.replace(/"header_/gi, '"header');
                 customHeader = JSON.parse(customHeader);

                 var customHeaderBlur = JSON.stringify(AppyTemplate.global.style.customHeaderImageBlur);
                 customHeaderBlur = customHeaderBlur.replace(/_44":/gi, '":');

                 customHeaderBlur = customHeaderBlur.replace(/header_640_88":/gi, 'header_320":');
                 customHeaderBlur = customHeaderBlur.replace(/header_750_88":/gi, 'header_375":');
                 customHeaderBlur = customHeaderBlur.replace(/header_980_88":/gi, 'header_490":');
                 customHeaderBlur = customHeaderBlur.replace(/header_1334_88":/gi, 'header_667":');
                 customHeaderBlur = customHeaderBlur.replace(/header_1136_88":/gi, 'header_568":');
                 customHeaderBlur = customHeaderBlur.replace(/header_1536_88":/gi, 'header_768":');
                 customHeaderBlur = customHeaderBlur.replace(/header_2048_88":/gi, 'header_1024":');
                 customHeaderBlur = customHeaderBlur.replace(/header_1242_132":/gi, 'header_414":');
                 customHeaderBlur = customHeaderBlur.replace(/header_2208_132":/gi, 'header_736":');

                 customHeaderBlur = customHeaderBlur.replace(/_88":/gi, '":');
                 customHeaderBlur = customHeaderBlur.replace(/_132":/gi, '":');
                 customHeaderBlur = customHeaderBlur.replace(/"header_/gi, '"header');
                 customHeaderBlur = JSON.parse(customHeaderBlur);

                 var size = [200, 320, 375, 414, 480, 490, 568, 640, 667, 720, 736, 768, 800, 1024, 1280];
                 //size = size.sort();

                 var lastIndex = 0;
                 $$.each(size, function(index, value) {
                     if (value <= w) {
                         lastIndex = index;
                     }
                 })
                 lastIndex = (w == 412) ? lastIndex + 1 : lastIndex;


                 if (layoutList.indexOf(mainView.activePage.name) == -1 || pageId == "dating") {
                     if (data.appData.innerNavbarImage) {
                         return false;
                     }
                     if (data.appData.innerNavbarText) {


                         $$(".navbar-inner .center").css("visibility", "hidden");
                     }
                 } else {
                     if (data.appData.innerNavbarImage) {
                         if (localStorage.popup == "true") {
                             return false;
                         }
                     }
                     if (data.appData.innerNavbarText) {
                         if (localStorage.popup == "true") {
                             $$(".navbar-inner .center").css("visibility", "hidden");
                         }
                     }
                 }
                 //	if(Appyscript.device.android) {
                 //		//if(imageMode) {
                 //			globalImageUrls = JSON.parse(AppyPieNative.getHeaderBGImg());
                 //			//imageMode = false;
                 //		//}
                 //		if(data.appData.appHeaderType == "library_image") {
                 //			globalImageUrls.headerPortImgURL = AppyTemplate.global.style.nav_header_image_name;
                 //			globalImageUrls.headerLandImgURL = AppyTemplate.global.style.nav_header_ipad_image_name;
                 //			if(headerBlurMode) {
                 //				globalImageUrls.headerPortImgURLBlur = AppyTemplate.global.style.nav_header_image_name_blur;
                 //				globalImageUrls.headerLandImgURLBlur = AppyTemplate.global.style.nav_header_ipad_image_name_blur;
                 //			}
                 //		}
                 //		if($$(window).width() > $$(window).height()) {
                 //			if(headerBlurMode) {
                 //				$$(".navbar-inner").css("background-image", "urbackground-imagel("+globalImageUrls.headerLandImgURLBlur+")");
                 //			}
                 //			else {
                 //				$$(".navbar-inner").css("background-image", "url("+globalImageUrls.headerLandImgURL+")");
                 //			}
                 //		}
                 //		else {
                 //			if(headerBlurMode) {
                 //				$$(".navbar-inner").css("background-image", "url("+globalImageUrls.headerPortImgURLBlur+")");
                 //			}
                 //			else {
                 //				$$(".navbar-inner").css("background-image", "url("+globalImageUrls.headerPortImgURL+")");
                 //			}
                 //		}
                 //	}
                 //	else{
                 if ((AppyTemplate.global.style.customHeaderImage.length == 0) || (customHeader["header" + size[lastIndex]] == null) || data.appData.appHeaderType == "library_image") {
                     var imageKey = "";
                     if ($$(window).width() > $$(window).height()) {
                         imageKey = "landscape";
                     } else {
                         imageKey = "portrait";
                     }
                     if (headerBlurMode) {
                         imageKey += "Blur";
                     }
                     $$(".navbar-inner").css("background-image", "url(" + dataHeader[imageKey] + ")");
                 } else {
                     if (headerBlurMode) {
                         $$(".navbar-inner").css("background-image", "url(" + customHeaderBlur["header" + size[lastIndex]] + ")");
                     } else {
                         $$(".navbar-inner").css("background-image", "url(" + customHeader["header" + size[lastIndex]] + ")");
                     }
                 }
                 //}

                 /*(var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt";
                 if(strList.indexOf(pageId) != -1) {
                 	if(data.appData.innerNavbarText) {
                 		$$(".navbar-inner .center").css("visibility", "visible");
                 	}
                 }
                 else {
                 	if(data.appData.innerNavbarText) {
                 		$$(".navbar-inner .center").css("visibility", "hidden");
                 	}
                 }*/

             }


             Appyscript.resizeBackground = function() {
                 var w = $$(window).width();
                 var h = $$(window).height();
                 var l = "";
                 var p = "";
                 var backgroundImage = AppyTemplate.global.style.customBackgroundImage;
                 if (AppyTemplate.global.style.backgroundType == "custom_image") {
                     if (h == 568) {
                         p = "bg_640_1136";
                         l = "bg_1136_640";
                     } else if (h == 480) {
                         p = "bg_320_480";
                         l = "bg_480_320";
                     } else if (h == 667) {
                         p = "bg_750_1334";
                         l = "bg_1334_750";
                     } else if (h == 736) {
                         p = "bg_1242_2208";
                         l = "bg_2208_1242";
                     } else if (h == 320 && w == 568) {
                         p = "bg_640_1136"
                         l = "bg_1136_640"
                     } else if (h == 320 && w == 480) {
                         p = "bg_320_480"
                         l = "bg_480_320"
                     } else if (h == 375 && w == 667) {
                         p = "bg_750_1334"
                         l = "bg_1334_750"
                     } else if (h == 414 && w == 736) {
                         p = "bg_1242_2208"
                         l = "bg_2208_1242"
                     } else if (h == 1024 || w == 1004) {
                         p = "bg_768_1024"
                         l = "bg_1024_768"
                     } else if (h == 768 && (w == 1024 || h == 1004)) {
                         p = "bg_768_1024"
                         l = "bg_1024_768"
                     }


                     if (Appyscript.device.android) {
                         //if(imageMode) {
                         try {
                             globalImageUrls = JSON.parse(AppyPieNative.getHeaderBGImg());
                             //	imageMode = false;
                             //}
                             if (backgroundImage != null) {
                                 AppyTemplate.global.style.appBackground[0] = globalImageUrls.bgPortImgURL;
                                 AppyTemplate.global.style.appIpadBackground[0] = globalImageUrls.bgLandImgURL;
                             }
                         } catch (error) {}
                     } else {
                         if (backgroundImage != null) {
                             if (backgroundImage[p]) {
                                 AppyTemplate.global.style.appBackground[0] = backgroundImage[p];
                             }
                             if (backgroundImage[l]) {
                                 AppyTemplate.global.style.appIpadBackground[0] = backgroundImage[l];
                             }
                         }
                     }
                 }
             }
             var bottomSwiper;
             AppyTemplate.global.hidemorebutton = false;
             Appyscript.bottomLayout = function() {
                 var publicandshowpage = {};

                 var bottomNavigation = $$(".toolbar").find("#app_navigation_bottom");
                 //Manoj 12/07/2017 start
                 bottomNavigationForFragment = bottomNavigation;
                 //Manoj 12/07/2017 end
                 if (data.loginfield.loginSetting.groupEnable == 1) {
                     if (data.loginfield.loginSetting.showRestricatedPage == 1) {
                         AppyTemplate.global.hidemorebutton = true;

                         publicandshowpage = JSON.parse(localStorage.getItem("NewallowedPages"));
                     } else {
                         AppyTemplate.global.hidemorebutton = true;
                         publicandshowpage = localStorage.getItem("totalpagevalue");
                     }
                 } else {
                     AppyTemplate.global.hidemorebutton = true;
                 }
                 publicandshowpage = publicandshowpage ? publicandshowpage : "";
                 if (publicandshowpage && publicandshowpage != "") {
                     if (publicandshowpage.length > 5) {
                         AppyTemplate.global.hidemorebutton = true;
                     } else {
                         AppyTemplate.global.hidemorebutton = false;
                     }
                 }

                 if (data.updateSettings.zopimChatCode != '') {
                     $$("#zohochat").attr("style", "bottom: 50px !important;");
                 }
                 if (AppyTemplate.global.style.moreBottomScroll == "YES") {
                     var size = parseInt($$(window).width() / 64);
                     if (size >= newdata.home.length) {
                         size = newdata.home.length;
                     }
                     bottomSwiper = new Swiper('.app_navigation_bottom', {
                         slidesPerView: size
                     });
                     $$(window).resize(function() {
                         var size = parseInt($$(window).width() / 64);
                         if (size >= newdata.home.length) {
                             size = newdata.home.length;
                         }
                         bottomSwiper.params.slidesPerView = size;
                         bottomSwiper.onResize();
                     })
                 } else {
                     if (newdata.home.length > 5) {
                         bottomNavigation.find("a").each(function(i) {
                             if (i <= 3) {
                                 $$(this).remove();
                             }
                         })
                         $$(".toolbar .app_navigation_bottom a").each(function(i) {
                             if (i > 3) {
                                 if (!$$(this).is(".more")) {
                                     $$(this).remove();
                                 }
                             }
                         })

                         $$(".app_navigation_bottom a.more").click(function() {

                             //Manoj 12/07/2017 end
                             event.stopImmediatePropagation();
                             // Manoj 12/07/2017 start
                             /*Nitin*/
                             if ($$(this).is(".morewithSlide")) {
                                 /*Manoj WebviewFragment*/
                                 var datap = $$(mainView.activePage.container).attr("data-page");
                                 if (datap == "bottom_website" && isOpenFragmentWithBottom && AppyTemplate.global.style.layout == "bottom") {
                                     Appyscript.hideWebViewFragment();
                                 }
                                 /*End WebviewFragment*/
                                 if ($$(".toolbar .newLayoutSliderMenu").is(".on")) {
                                     hideSlideNavigation()
                                     if (datap == "bottom_website" && isOpenFragmentWithBottom && AppyTemplate.global.style.layout == "bottom") {
                                         Appyscript.showWebViewFragment();
                                     }
                                 } else {
                                     $$(".page,.navbar").show();
                                     $$(".toolbar .newLayoutSliderMenu").show().addClass("on");
                                 }
                                 return false;
                             }
                             /*Close Nitin*/



                             if (bottomNavigation.is(".on")) {
                                 $$(".page,.navbar").show();
                                 bottomNavigation.hide().removeClass("on");

                                 /*Start Manoj WebviewFragment*/
                                 var datap = $$(mainView.activePage.container).attr("data-page");
                                 if (datap == "bottom_website" && isOpenFragmentWithBottom && AppyTemplate.global.style.layout == "bottom") {
                                     Appyscript.showWebViewFragment();
                                 }
                                 /*End WebviewFragment*/
                             } else {

                                 /*Manoj WebviewFragment*/
                                 var datap = $$(mainView.activePage.container).attr("data-page");
                                 if (datap == "bottom_website" && isOpenFragmentWithBottom && AppyTemplate.global.style.layout == "bottom") {
                                     Appyscript.hideWebViewFragment();
                                 }
                                 /*End WebviewFragment*/

                                 $$(".page,.navbar").hide();
                                 bottomNavigation.show().addClass("on");
                             }
                         })



                     } else {
                         $$(".app_navigation_bottom a.more").remove();
                     }
                 }
             }
             var hideSlideNavigation = function() {
                 $$(".page,.navbar").show();
                 $$(".toolbar .newLayoutSliderMenu").hide().removeClass("on");
             }

             Appyscript.resetToolbar = function(container) {
                 if (mainView.activePage == null) {
                     return false;
                 }
                 if (mainView.activePage.name == "error-page") {
                     return false;
                 }
                 if (localStorage.popup == "true") {
                     return false;
                 }
                 var thisPageID = "";
                 if (mainView.activePage.name != null) {
                     thisPageID = mainView.activePage.name.split("-")[0];
                 }
                 if (thisPageID == "coupon") {
                     thisPageID = "showBottom";
                 }
                 if (AppyTemplate.global.style.layout == "bottom") {
                     var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|fitness|paymentPage|forum|dinein|coupondirectory|ewallet|demanddelivery";
                     if ((strList.indexOf(thisPageID) == -1) && !globalPage) {
                         $$(".toolbar").removeClass("toolbar-hidden");
                         $$(container).removeClass("no-toolbar").addClass("toolbar-through");
                         if (!$$(mainView.pagesContainer).hasClass('bottom_height')) {
                             $$(mainView.pagesContainer).addClass("bottom_height");
                         }
                     } else {


                         if (data.home[0].pageid == "folder" && mainView.history.length === 2 && AppyTemplate.global.style.layout == "bottom") {
                             var tempArr = data.home[0].folderPages.filter(function(v) {
                                 return v.pageid == "event"
                             });
                             if (tempArr.length > 0) {
                                 $$(".toolbar").removeClass("toolbar-hidden");
                                 return false;
                             }
                         } // Workaround for folder page and custom event
                         $$(".toolbar").addClass("toolbar-hidden");
                         $$(container).addClass("no-toolbar").removeClass("toolbar-through");
                         if ($$(mainView.pagesContainer).hasClass('bottom_height')) {
                             $$(mainView.pagesContainer).removeClass("bottom_height");
                         }
                     }
                 }
             }

             Appyscript.initToolbar = function() {
                 if (mainView.activePage.name == "error-page") {
                     return false;
                 }
                 var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|fitness|paymentPage|forum|dinein|coupondirectory|ewallet|demanddelivery";
                 if (localStorage.popup == "true") {
                     $$(".popup").find(".toolbar").removeClass("toolbar-hidden");
                     return false;
                 }
                 var container = $$(mainView.activePage.container);

                 if (pageId == "coupon") {
                     pageId = "showBottom";
                 }

                 if (AppyTemplate.global.style.layout == "bottom") {
                     if ((strList.indexOf(pageId) != -1) || globalPage) {
                         if (container.find(".toolbar").length != 0) {
                             $$(".toolbar").addClass("toolbar-hidden");
                             container.find(".toolbar").removeClass("toolbar-hidden");
                             container.removeClass("no-toolbar").addClass("toolbar-through");
                             //				if(!$$(mainView.pagesContainer).hasClass('bottom_height')){$$(mainView.pagesContainer).addClass("bottom_height");}
                         }
                     }
                 } else {
                     if (container.is(".toolbar-through")) {
                         console.log("done - 2");
                         $$(".toolbar").addClass("toolbar-hidden");
                         container.removeClass("no-toolbar").addClass("toolbar-through");
                         container.find(".toolbar").removeClass("toolbar-hidden");
                         //			if(!$$(mainView.pagesContainer).hasClass('bottom_height')){$$(mainView.pagesContainer).addClass("bottom_height");}
                     }
                 }

                 if (AppyTemplate.global.style.headerBarType == "none") {
                     if (AppyTemplate.global.style.layout == "bottom" || AppyTemplate.global.style.layout == "slidemenu" || AppyTemplate.global.style.layout == "slidemenu3d") {
                         var pageInner = $$(mainView.activePage.container);
                         var navbarInner = $$(mainView.activePage.navbarInnerContainer);
                         pageInner.removeClass("no-navbar").removeClass("navbar-through");
                         if ((strList.indexOf(pageId) == -1) && !globalPage) {
                             if (navbarInner.find(".bottomBack").length == 1) {
                                 pageInner.addClass("no-navbar");
                                 $$(".navbar").addClass("navbar-hidden");
                             } else {
                                 pageInner.addClass("navbar-through");
                                 $$(".navbar").removeClass("navbar-hidden");
                             }
                         } else {
                             pageInner.addClass("navbar-through");
                             $$(".navbar").removeClass("navbar-hidden");
                         }
                     }
                 }

                 if (AppyTemplate.global.style.layout == "slidemenu" || AppyTemplate.global.style.layout == "slidemenu3d") {
                     if ((strList.indexOf(pageId) == -1) && !globalPage) {
                         Appyscript.params.swipePanelActiveArea = 0;
                     } else {
                         Appyscript.params.swipePanelActiveArea = 0.5;
                     }
                 }
             }

             var notificationMenu = true;

             Appyscript.notificationMenu = function(container, name) {
                 //container = $$(e.detail.page.navbarInnerContainer);
                 setTimeout(function() {
                     Appyscript.notificationcount();
                 }, 500);


                 var ewalletStatus = "none";
                 var ewalletPageid = "";
                 var pageid = undefined;

                 for (var i = 0; i < data.home.length; i++) {
                     if (data.home[i].pageid == "ewallet") {
                         ewalletPageid = data.home[i].pageIdentifierBecon;
                         pageid = data.home[i].pageid;
                         break;
                     }

                 }

                 if (ewalletPageid != "" && localStorage.getItem("email")) {
                     ewalletStatus = "yes";

                 }


                 var modeN = "none";
                 if (data.notificationConfigSettings.enableGroupNotifcation == 1 && localStorage.getItem("email")) {
                     modeN = "yes";
                 }
                 var mode = "none";
                 if (localStorage.getItem("email")) {
                     mode = "yes";
                 }
                 var touchid = "none";
                 if (data.loginfield.loginSetting.enableTouchId == 1 && localStorage.getItem("loginTouchId") != "true") {
                     touchid = "yes";
                 }
                 var enableShare = "none";
                 if (data.updateSettings.enableShare == "On") {
                     enableShare = "on";
                 }
                 var style = AppyTemplate.global.style;
                 var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|fitness|forum|dinein|quote|demanddelivery";
                 var menuICON = '<a class="iconz-option-vertical" onclick="toggle_menu(this);" style="color:' + style.headerBarIconColor + ';"></a>';

                 var menuHTML = '<div class="dropdown-overlay" ontouchstart="toggle_menu()"></div><div class="dropdown-content" id="drmenu" style="background-color:' + style.navMenuBgcolor + ';"><span class="before" style="border-bottom-color:' + style.navMenuBgcolor + '"></span>' +
                     '<a class="first" onclick="Appyscript.notificationPage(this);" style="color:' + style.navMenuTextcolor + ';border-color:' + style.navMenuTextcolor + '"><i class="icon-bell-alt" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.updateSettings.notification + '<span id="unreadnotification">0</span></a>' +
                     '<a onclick="Appyscript.pageSearch(this);" style="color:' + style.navMenuTextcolor + ';border-color:' + style.navMenuTextcolor + '" class="hide-'+style.hideSearchOption+'"><i class="icon-search-3" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.updateSettings.search + '</a>' +
                     '<a onclick="Appyscript.RateNow()" class="rate ' + enableShare + '" style="color:' + style.navMenuTextcolor + ';border-color:' + style.navMenuTextcolor + '"><i class="iconz-thumbs-up" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.updateSettings.rateNow + '</a>' +
                     '<a onclick="Appyscript.shareAppMenu()" class="share ' + enableShare + '" style="color:' + style.navMenuTextcolor + ';border-color:' + style.navMenuTextcolor + '"><i class="icon-share-1" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.updateSettings.shareNow + '</a>' +
                     '<a class="profile ' + mode + '" onclick="Appyscript.notificationprofile(this);" style="color:' + style.navMenuTextcolor + ';"><i class="iconz-user" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.updateSettings.profile + '</a>' +
                     //                    '<a class="page-link ewallet '+ewalletStatus+' " data-productidentifier="'+ewalletPageid+'" data-productid="ewallet" style="color:' + style.navMenuTextcolor + ';"><i class="iconz-user" style="color:' + style.navMenuIconcolor + ';"></i> ' + "My Money" + '</a>' +'<a class="profile ' + modeN + '" onclick="Appyscript.notificationGroup(this);" style="color:' + style.navMenuTextcolor + ';"><i class="icon-cog" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.updateSettings.notificationSettings + '</a>' +
                     '<a class="logout ' + mode + '" onclick=""  style="color:' + style.navMenuTextcolor + ';" border-color:' + style.navMenuTextcolor + '"><i class="icon-arrows-cw" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.languageSetting.clear_cache + '</a>' +
                     '<a class="myfiles ' + mode + '"  onclick="Appyscript.getadminfile()" style="color:' + style.navMenuTextcolor + ';" border-color:' + style.navMenuTextcolor + '"><i class="icon-doc-alt" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.languageSetting.new_file_update + '</a>' +
                     '<a class="logout ' + touchid + '" onclick="Appyscript.Enabletouch()" style="color:' + style.navMenuTextcolor + ';" style="color:' + style.navMenuIconcolor + ';"><i class="appyicon-onetouch"  style="color:' + style.navMenuIconcolor + ';"></i>' + data.languageSetting.enable_touch + '</a>' +
                     '<a class="logout ' + mode + '" onclick="Appyscript.allLogout()" style="color:' + style.navMenuTextcolor + ';border-color:' + style.navMenuTextcolor + '"><i class="iconz-login" style="color:' + style.navMenuIconcolor + ';"></i> ' + data.updateSettings.logout + '</a>' +
                     '</div>';


                 //	+'<a href="#" class="iconz-user login '+mode+'" onclick="Appyscript.loginPage(true)"> Log in</a>'
                 if (localStorage.popup == "true") {
                     return false;

                 }

                 var thisPageID;
                 if (name != null) {
                     thisPageID = name.split("-")[0];
                 }
                 if ((strList.indexOf(thisPageID) == -1) && !globalPage) {
                     if (notificationMenu && thisPageID != 'loyaltycard' && thisPageID != 'todolist' && thisPageID != "bottom_website" && name !== "coupondirectory-page") {
                         container.find(".right").html(menuICON);
                     }
                 } else if (data.appData.layout == "bottom" && mainView.activePage.name == "mainPage") {
                     if (notificationMenu && thisPageID != 'loyaltycard') {
                         container.find(".right").html(menuICON);
                     }
                 }



                 $$(".dropdown-content,.dropdown-overlay").remove();
                 $$("body").append(menuHTML);
             }

             Appyscript.resetRouter = function(html) {
                 if (mainView.history.length > 2) {
                     for (var i = 0; i < (mainView.history.length - 1); i++) {
                         mainView.router.back({
                             ignoreCache: true,
                             animatePages: false
                         })
                     }
                 }
                 setTimeout(function() {
                     mainView.router.reloadContent(html);
                     if (mainView.activePage.name != "") {
                         var thisPageID = mainView.activePage.name.split("-")[0];
                         $$('#pagesCSS').attr('href', 'css/' + thisPageID + '.css');
                     }
                 }, 10);
             }


             Appyscript.onPageInit('folder-Page', function(page) {
                 folderPage = true;
                 if (AppyTemplate.global.style.layout == "bottom") {
                     setTimeout(function() {
                         /*	$$(".navbar-inner .bottomBack").css("visibility", "hidden");  */
                         $$(page.container).find(".navbar-inner .bottomBack").css("visibility", "hidden");
                     }, 250)
                 }
             })

             Appyscript.onPageBeforeAnimation('folder-Page', function(page) {
                 folderPage = true;
                 if (AppyTemplate.global.style.layout == "bottom") {

                     setTimeout(function() {
                         //folderPage = false;
                         $$(".navbar-inner .bottomBack").css("visibility", "hidden");
                     }, 250)
                 }
             })

             function openInnerPage(page, data) {
                 $$.get('pages/' + page + '.html', function(template) {
                     var compiledTemplate = AppyTemplate.compile(template);
                     var html = compiledTemplate(data);

                     mainView.router.load({
                         content: html,
                         animatePages: true
                     });
                     Appyscript.hideIndicator();
                     if (pageId == 'ecommerce') {
                         updatecartCount();
                     }
                 })
             }


             Appyscript.onetouch = function() {
                 console.log("my data-  page----" + JSON.stringify(pageData));
                 if (pageData.onetouch_option_1 == "sms") {
                     Appyscript.alert("We are not supporting this feature any more", "");
                     /*var country_code = pageData.country_code_1;
                     var onetouch_val_1 = pageData.onetouch_val_1;
                     var default_sms_1 = pageData.default_sms_1;
                     Appyscript.openSMS(country_code + onetouch_val_1, default_sms_1);*/
                 }
                 if (pageData.onetouch_option_1 == "email") {
                     var country_code = pageData.country_code_1;
                     var onetouch_val_1 = pageData.onetouch_val_1;
                     var default_content_1 = pageData.default_content_1;
                     var default_subject_1 = pageData.default_subject_1;
                     Appyscript.sendMail(onetouch_val_1, default_subject_1, default_content_1);
                 }
                 if (pageData.onetouch_option_1 == "phone") {
                     var country_code = pageData.country_code_1;
                     var onetouch_val_1 = pageData.onetouch_val_1;
                     Appyscript.call(country_code + onetouch_val_1);
                 }
                 if (pageData.onetouch_option_1 == "external_link") {

                     /* Start WebviewFragment */

                     if (AppyTemplate.global.style.layout == "bottom") {
                         isOpenFragmentWithBottom = false;
                         var bottomNavigation = $$(".toolbar").find("#app_navigation_bottom");
                         if (bottomNavigation != undefined && bottomNavigation.is(".on")) {
                             $$(".page,.navbar").show();
                             bottomNavigation.hide().removeClass("on");

                         }
                         Appyscript.hideWebViewFragment();
                     }

                     /* End WebviewFragment */

                     var onetouch_val_1 = pageData.onetouch_val_1;
                     var headerurl = onetouch_val_1;
                     Appyscript.openWebView(onetouch_val_1, pageData.pageTitle, '', '', '');

                 }
             }

             function openCRM(pageValue, pageTitle, pageIdentifier) {
                 if (pageIdentifier == "salesforce")
                     pageValue = "https://login.salesforce.com";
                 else
                     pageValue = "https://accounts.zoho.com";

                 Appyscript.openWebView(pageValue, pageTitle);
             }


             function checkAuthpassword(paymentTypeObject) {
                 var a = $$(paymentTypeObject).parent();
                 var paymentMethodKey = a.attr("data-key");

                 if ((paymentMethodKey == "ewallet" || ($("#ewalletbalance" + paymentMethodKey).length > 0 && $("#ewalletbalance" + paymentMethodKey).children().children()[0].checked)) && (ewalletModel.getewalletAvailableStatus() == true || ewalletModel.getewalletAvailableStatus() == "true")) {
                     return true;
                 }
                 return false;
             }



             Appyscript.paymentRegistrationInfo = function(paymentTypeObject, page) {
                Appyscript.showIndicator();
                if (page == "food") {
                    foodPaymentRegistrationInfo(paymentTypeObject)
                }
                else if (page == "formbuilder") {
                    Appyscript.showIndicator();
                    executePaybyVelocity(paymentTypeObject);
                } else if (page == "login") {
                    if(data.loginfield.inp.paymentMethod == "velocity")
                    {
                        if(isOnline)
                        {
                            signupUsingVelocity(paymentTypeObject);
                        }
                        else
                        {
                            Appyscript.hideIndicator();
                            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                        }
                    }
                    else{
                        stripePaymentOnNativeSideLogin(paymentTypeObject);
                    }
                }
                else
                {
                    commonPaymentRegistrationInfo(paymentTypeObject, page);
                }

                //foodCourtPaymentRegistrationInfo(paymentTypeObject);
                 /*if (page == "ecom") {
                     if (checkAuthpassword(paymentTypeObject)) {
                         if (ewalletValidator.validateAuthPassword() && !ewalletModel.gettouchidOrfaceidStatus()) {
                             Appyscript.loginWithTouchID()
                             return;
                         }

                         ecommPaymentRegistrationInfo(paymentTypeObject)

                     } else {
                         ecommPaymentRegistrationInfo(paymentTypeObject)

                     }

                 } else if (page == "food") {
                     foodPaymentRegistrationInfo(paymentTypeObject)
                 } else if (page == "accommodation") {
                     Appyscript.customShowIndicator();
                     accommodationPaymentRegistrationInfo(paymentTypeObject)
                 } else if (page == "dinein") {
                     DineInPaymentRegistrationInfo(paymentTypeObject);
                 } else if (page == "foodCourt") {
                     foodCourtPaymentRegistrationInfo(paymentTypeObject);
                 } else if (page == "hyperlocal") {
                     Appyscript.showIndicator();
                     hyperlocalAppointmentPayment(paymentTypeObject);
                 } else if (page == "demanddelivery") {
                     Appyscript.showIndicator();
                     demanDeliveryBookPayment(paymentTypeObject);

                 } else if (page == "formbuilder") {
                     Appyscript.showIndicator();
                     executePaybyVelocity(paymentTypeObject);
                 } else if (page == "login") {
                     if(data.loginfield.inp.paymentMethod == "velocity")
                                        {
                     if(isOnline)
                        {
                        signupUsingVelocity(paymentTypeObject);
                        }
                        else
                        { Appyscript.hideIndicator();
                        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                        }
                        }
                        else{
                         stripePaymentOnNativeSideLogin(paymentTypeObject);
                        }
                 } else {
                     stripePaymentOnNativeSide(paymentTypeObject)
                 }*/

             }



             function gotFileEntryPageSaveData(fileEntry) {
                 fileEntry.createWriter(gotFileWriterPageSaveData, failPage);
             }

             function gotFileWriterPageSaveData(writer) {
                 writer.onwriteend = function(evt) {
                     writer.onwriteend = function(evt) {
                         writer.seek(4);
                         writer.write(dataGlobalDownloadPage);
                         writer.onwriteend = function(evt) {}
                     };
                 };
                 writer.write(dataGlobalDownloadPage);
             }

             function loginOnLaunchToFetchNewInformation() {
               var deviceId=Appyscript.getDeviceId();
                 if (localStorage.email != null && localStorage.email != "" && localStorage.email != undefined) {
                     var loginServiceURL = webserviceUrl + 'Appuser.php';
                     var username = localStorage.getItem("emailid");
                     var password = localStorage.getItem("password");;
                     var profileId = "";
                     if (localStorage.getItem("profileId") != null && localStorage.getItem("profileId") != "") {
                         profileId = localStorage.getItem("profileId");
                         if (!password) {
                             password = "12345678";
                         }
                     }
                     var advanceLogin;
                     if (window.data.loginfield.loginSetting.addvanceLogin == 1) {
                         advanceLogin = "advance";
                     } else {
                         advanceLogin = "old";
                     }
                     var serviceData = '{"method":"login","appId":"' + data.appData.appId + '","deviceId":"'+deviceId+'","email":"' + username + '","password":"' + password + '","tokenId":"","deviceType":"android","profileId":"","loginType":"' + advanceLogin + '"}';
                     console.log("serviceData==00000" + serviceData);
                     serviceData = EncryptOrDecrypt("encrypt", serviceData);
                     serviceData = serviceData.replace(/\s/g, '');
                     Appyscript.showIndicator();

                     $$.ajax({
                         url: loginServiceURL,
                         data: serviceData,
                         type: "post",
                         //321  headers: {'accessToken': deviceEncryptedToken},
                         async: true,
                         success: function(jsonData, textStatus) {
                             Appyscript.hideIndicator();
                             jsonData = jsonData.trim();
                             jsonData = ReturnHexDataWithSpace(jsonData);
                             jsonData = EncryptOrDecrypt("decrypt", jsonData);
                             var object = JSON.parse(jsonData);

                             console.log("login==sdfgewf=" + JSON.stringify(object));
                             if (object["status"] == 'failure') {
                                 var userStatus = object["userStatus"];
                                 var paidStatus = object['paidStatus'];
                                 var emailVerified = object['emailVerified'];
                                 if (userStatus == 4) {
                                     Appyscript.AppLogout();
                                     Appyscript.alert(data.languageSetting.this_account_is_inactive_block + " " + window.data.loginfield.loginSetting.userAdminEmail + ".");
                                 } else if (userStatus == 2 && emailVerified == 0) {
                                     clearAllDataOfLoginUser();
                                 }
                                  else if (userStatus ==6) {
                                   Appyscript.AppLogout();

                                   clearAllDataOfLoginUser();
                                   }
                                 else if (paidStatus == 2) {
                                     clearAllDataOfLoginUser();
                                     Appyscript.popupPage('login');
                                 } else if (userStatus == 3) {
                                     clearAllDataOfLoginUser();
                                     if (!localStorage.getItem("mergeAppsBackButton")) {
                                         Appyscript.popupPage('login');
                                     }

                                     Appyscript.alert(data.languageSetting.this_account_doesnot_exist, function() {
                                         localStorage.popup = true
                                     });
                                 } else if (userStatus == 0) {
                                     clearAllDataOfLoginUser();
                                 }
                                 return;
                             }

                             //NEW CODE//
                             var getLoginKeysPair = localStorage.getItem("loginKeysPair");
                             if (!getLoginKeysPair || getLoginKeysPair == 'null') {
                                 getLoginKeysPair = [];
                             } else {
                                 getLoginKeysPair = JSON.parse(getLoginKeysPair);
                             }
                             if (getLoginKeysPair.length > 0) {
                                 var appIdExists = false;
                                 $$.each(getLoginKeysPair, function(key, value) {
                                     if (value.appId == data.appData.appId) {
                                         value.userid = object["userId"];
                                         value.userId = object["userId"];
                                         value.password = password;
                                         value.username = object["userName"];
                                         value.email = object["usermail"];
                                         value.phone = object["phoneNo"];
                                         appIdExists = true;
                                     } else {
                                         if (!appIdExists)
                                             appIdExists = false;
                                     }
                                 });
                                 if (!appIdExists) {
                                     var keyData = {
                                         appId: data.appData.appId,
                                         userid: object["userId"],
                                         userId: object["userId"],
                                         password: password,
                                         username: object["userName"],
                                         email: object["usermail"],
                                         phone: object["phoneNo"]
                                     };
                                     getLoginKeysPair.push(keyData);
                                 }
                                 localStorage.setItem("loginKeysPair", JSON.stringify(getLoginKeysPair))
                             } else {
                                 var loginDataArray = [];
                                 //value don't exists in local storage
                                 var keyData = {
                                     appId: data.appData.appId,
                                     userid: object["userId"],
                                     userId: object["userId"],
                                     password: password,
                                     username: object["userName"],
                                     email: object["usermail"],
                                     phone: object["phoneNo"]
                                 };
                                 loginDataArray.push(keyData);
                                 localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray));
                             }
                             //END CODE//

                             localStorage.setItem("username", object["userName"]);
                             localStorage.setItem("email", object["usermail"]);
                             localStorage.setItem("phone", object["phoneNo"]);
                             localStorage.setItem("password", password);
                             localStorage.setItem("userid", object["userId"]);
                             localStorage.setItem("userId", object["userId"]);
                             localStorage.setItem("name", object["userName"]);
                             localStorage.setItem("emailid", object["usermail"]);

                             if (object["profileImage"] == "") {
                                 localStorage.setItem("profileImage", AppyTemplate.global.style.reseller + "/newui/images/user-pic-news.png");
                                 AppyTemplate.global.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-pic-news.png";
                             } else {
                                 localStorage.setItem("profileImage", object["profileImage"]);
                                 AppyTemplate.global.profileImage = object["profileImage"];
                             }
                             AppyTemplate.global.loginCheck = true;
                             AppyTemplate.global.email = object["usermail"];
                             AppyTemplate.global.username = object["username"];

                         },
                         error: function(error) {
                             Appyscript.hideIndicator();
                             console.log("Error: " + error.code + " " + error.message);
                         }
                     });
                 }
             }

             Appyscript.pageSearch = function() {
                 localStorage.popup = "true";
                 $$.get("popups/page-search.html", function(template) {
                     var compiledTemplate = AppyTemplate.compile(template);
                     var html = compiledTemplate(data);
                     Appyscript.popup(html)
                 })
             }

             Appyscript.onPageInit('search-page', function(page) {
                 $$(".pageSearch a").hide();
                 $$("#pageSearch").on("change keyup keydown", function() {
                     var error = true;
                     var value = $$(this).val().trim();
                     $$(".pageSearch a").hide();
                     if (value != "") {
                         $$(".pageSearch a").each(function() {
                             // $(this).text().toLowerCase().indexOf(term.toLowerCase()) > -1
                             if ($$(this).find(".searchText").text().toLowerCase().indexOf(value.toLowerCase()) != -1) {
                                 $$(this).show();
                                 error = false;
                             }
                         })
                     }
                     if (error) {
                         $$(".search-nodata").show();
                         $$("#noResultSearch").html(data.languageSetting.empty_search_mcom);
                     } else {
                         $$(".search-nodata").hide();
                         $$("#noResultSearch").html("");
                     }
                 })
             })

             Appyscript.resetLayout = function(mode) {
                 AppyTemplate.global.innerLayout = 0;
                 if (mode) {
                     $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');
                 }
                 if (AppyTemplate.global.style.layout == "slidemenu" || AppyTemplate.global.style.layout == "slidemenu3d") {
                     Appyscript.closePanel();
                 }
                 if (AppyTemplate.global.style.layout == "bottom") {
                     $$(".page,.navbar").show();
                     var bottomNavigation = $$(".toolbar").find("#app_navigation_bottom");
                     bottomNavigation.hide().removeClass("on");
                 }
             }


             //for zopim chat
             if (data.updateSettings.zopimChatCode != '') {
                 $$("#zohochat").show();

             }

             function closeopenZopimchat() {
                 $$("#zohochat").hide();
             }

             function openZopimchat() {
                 if (isOnline()) {
                     //                    Appyscript.openWebView("https://v2.zopim.com/widget/livechat.html?key=" + data.updateSettings.zopimChatCode+"&lang="+data.appData.lang, data.updateSettings.zopimName);
                     zE.activate({
                         hideOnClose: true
                     });
                 } else {

                     Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);

                 }
             }

             Appyscript.checksinHeaderForWebView = function(a) {
                 var val = $$(a).attr("value");

                 var header = $$(a).attr("header");
                 if (header.indexOf("'s") != -1) {
                     header = header.replace(/'/g, "");
                 } else {}
                 setTimeout(function() {
                     if (appid == "22bcbc56ef88") AppyPieNative.openWebSiteView(val, "no", "no", "true", "", Appyscript.isBottom(header), "1");
                     else Appyscript.openWebView(val, header);
                 }, 500);

             }

             function openCommonPage(pageValue) {
                 if (!pageValue) {
                     pageId = 'commanPage';
                     openPage(pageId, pageData);
                 }
                 if (pageValue == "singlePage" && (data.appData.layout == 'slidemenu' || data.appData.layout == 'bottom' || data.appData.layout == 'slidemenu3d') && !folderPage) {
                     pageId = 'commanPage';
                     openPage(pageId, pageData);
                 }

                 if (pageValue == "singlePage" && data.appData.layout == 'bottom' && !folderPage) {
                     isSinglePage = true;
                 }


             }

             function initGoogleAnalytic() {
                 var uaId = data.appData.uaId;
                 if (uaId != null || uaId != undefined || uaId != '') {
                     var dataform = {};
                     dataform.v = 1;

//                     dataform.tid = uaId;
//                     dataform.cid = Appyscript.getDeviceId();
//                     dataform.t = "appview";
//                     dataform.an = "name";
//                     dataform.av = "1";
//                     dataform.ua = navigator.userAgent
//                     dataform.cd = pageData.pageTitle;

                        cordova.plugins.firebase.analytics.setCurrentScreen(pageData.pageTitle);
                        dataform.tid = uaId;
                        dataform.cid = Appyscript.getDeviceId();
                        dataform.t = "pageview";
                        dataform.an = data.appData.appName;
                        dataform.av = "1";
                        dataform.ua=navigator.userAgent
                        dataform.cd = pageData.pageTitle;
                        dataform.dh = pageData.pageTitle;
                        dataform.dp = pageData.pageTitle;
                        dataform.dt = pageData.pageTitle;

                     var testurl = "https://www.google-analytics.com/collect";
                     $$.ajax({
                         url: testurl,
                         type: "post",
                         data: dataform,
                         async: true,

                         success: function(result) {

                             console.log("result======" + result);
                         },
                         error: function(error) {
                             console.log("result error======" + fail);
                         }
                     });

                 }
             }

             Appyscript.onPageInit('commanPage', function(page) {
                 if (data.appData.hideLayout) {
                     if (data.appData.hideLayout.indexOf("border") != -1) {
                         $$("[data-page='commanPage']").find(".page-content").addClass("hideBorder");
                     }
                 }
             })

             Appyscript.onPageInit('mainPage', function(page) {
                 if (AppyTemplate.global.style.layout == "bottom") {
                     Appyscript.bottomLayout();
                     loadNavsAnimation(page)

                 }

                 if (AppyTemplate.global.style.layout == "slidemenu") {
                     $$("body").addClass("slidemenu");
                     var slideBackground = '{{> slideBackground}}',
                         compiledBackground = AppyTemplate.compile(slideBackground),
                         html = compiledBackground({});
                     $$("#slideBackground").remove();
                     $$("head").append(html);
                 }
                 if (AppyTemplate.global.style.layout == "slidemenu3d") {
                     $$("body").addClass("slidemenu");
                     var slideBackground = '{{> slideBackground}}',
                         compiledBackground = AppyTemplate.compile(slideBackground),
                         html = compiledBackground({});
                     $$("#slideBackground").remove();
                     $$("head").append(html);

                 }
             })

             Appyscript.onPageInit('matrix', function(page) {
                 setTimeout(function() {
                     loadNavsAnimation(page);
                 }, 500)
             })


             Appyscript.onPageInit('list', function(page) {
                 loadNavsAnimation(page);
             })
             Appyscript.onPageInit('grid', function(page) {
                 //loadNavsAnimation(page);
             })

             Appyscript.onPageInit('colorlist', function(page) {
                 loadNavsAnimation(page);
             })

             Appyscript.onPageInit('skew', function(page) {
                 loadNavsAnimation(page);
             })

             Appyscript.onPageInit('imglist', function(page) {
                 loadNavsAnimation(page);
             })

             Appyscript.onPageInit('imgmatrix', function(page) {
                 loadNavsAnimation(page);
             })


             function loadNavsAnimation(page) {
                 if (!isOnline()) {
                     removeAnimation();
                     return false;
                 }
                 if (data.appData.backgroundType == "custom_color") {
                     loadImages();
                 } else {
                     if (data.appData.appBackground[0] == data.appData.appIpadBackground[0]) {
                         var appBackground = new Image();
                         appBackground.src = data.appData.appBackground[0];
                         appBackground.onload = function() {
                             loadImages();
                         }
                     } else {
                         var appBackground = new Image();
                         appBackground.src = data.appData.appBackground[0];
                         appBackground.onload = function() {
                             var appIpadBackground = new Image();
                             appIpadBackground.src = data.appData.appIpadBackground[0];
                             appIpadBackground.onload = function() {
                                 loadImages();
                             }
                         }
                     }
                 }

                 function loadLayoutAnimation() {
                     $$(".layout-preloader").remove();
                     if (AppyTemplate.global.style.layout == "bottom") {
                         bottomAnimation();
                     }
                     if (AppyTemplate.global.style.layout == "matrix") {
                         navigationAnimationMatrix();
                     }
                     if (AppyTemplate.global.style.layout == "list" || AppyTemplate.global.style.layout == "colorlist") {
                         listAnimation();
                     }
                     if (AppyTemplate.global.style.layout == "skew") {
                         //       skewAnimation();

                     }

                     if (AppyTemplate.global.style.layout == "imglist") {
                         imglistAnimation(page)
                     }
                     if (AppyTemplate.global.style.layout == "imgmatrix") {
                         imgmatrixAnimation(page);
                     }
                     if (AppyTemplate.global.style.layout == "grid") {
                         gridAnimation(page);
                     }
                 }

                 window.addEventListener('orientationchange', function() {
                     animationLoad = false;
                     var navigation = $$(".app_navigation_" + AppyTemplate.global.style.layout);
                     $$(".layout-preloader").remove();
                     $$(".layout-disabled").remove();
                     navigation.addClass("done").removeClass("animation");

                 })
                 $$(window).resize(function() {
                     animationLoad = false;
                     var navigation = $$(".app_navigation_" + AppyTemplate.global.style.layout);
                     $$(".layout-preloader").remove();
                     $$(".layout-disabled").remove();
                     navigation.addClass("done").removeClass("animation");
                 })

                 function loadImages() {

                     var size = 0;
                     if (AppyTemplate.global.style.layout == "bottom") {
                         size = parseInt($$(window).width() / 64);
                         if (data.appData.moreBottomScroll == "NO") {
                             size = 5;
                         }
                     }
                     if (AppyTemplate.global.style.layout == "matrix") {
                         var navigation = $$(".app_navigation_" + data.appData.layout);
                         var rowSize = 0;
                         var colSize = 0;
                         if (data.appData.layoutHeader) {
                             colSize = parseInt(($$(window).height() - ($$(window).width() / 2)) / navigation.find("a").eq(0).height());
                             var windowW = $$(window).width();
                             if (windowW <= 640) {
                                 rowSize = 3;
                             } else if (windowW > 640 && windowW <= 979) {
                                 rowSize = 4;
                             } else if (windowW > 979 && windowW <= 1024) {
                                 rowSize = 5;
                             } else {
                                 rowSize = 6;
                             }
                         } else {
                             rowSize = 3;
                             colSize = parseInt($$(window).height() / 106)
                         }
                         size = rowSize * colSize + rowSize;

                     }

                     if (AppyTemplate.global.style.layout == "list") {
                         size = parseInt($$(window).height() / 60) + 2;
                     }
                     if (AppyTemplate.global.style.layout == "imgmatrix") {
                         size = parseInt($$(window).height() / parseInt($$(window).height() / 2)) * 2 + 2;
                     }
                     if (AppyTemplate.global.style.layout == "grid") {
                         size = parseInt($$(window).height() / parseInt($$(window).height() / 2)) * 2 + 2;
                     }
                     if (AppyTemplate.global.style.layout == "imglist") {
                         size = parseInt($$(window).height() / parseInt($$(window).height() / 2)) + 1;
                     }

                     var loadIndex = 0;
                     $$.each(newdata.home, function(index, value) {
                         if (index < newdata.home.length) {
                             if (value.pageiconType == "img") {
                                 var thisImage = new Image();
                                 thisImage.src = AppyTemplate.global.homeIconPath + value.iconName;
                                 thisImage.onload = function() {
                                     loadIndex++;
                                     if (loadIndex == newdata.home.length) {
                                         loadLayoutAnimation();
                                     }
                                 }
                                 thisImage.onerror = function() {
                                     loadIndex++;
                                     if (loadIndex == newdata.home.length) {
                                         loadLayoutAnimation();
                                     }
                                 }
                             } else {
                                 loadIndex++;
                                 if (loadIndex == newdata.home.length) {
                                     loadLayoutAnimation();
                                 }
                             }
                         }
                     })
                 }
             }
             var animationLoad = true;

             function bottomAnimation() {

                 var size = parseInt($$(window).width() / 64);
                 if (data.appData.moreBottomScroll == "NO") {
                     size = 5;
                 }
                 var timer = 1500 + size * 100;
                 var navigation = $$(".app_navigation_" + AppyTemplate.global.style.layout);
                 if (navigation.is(".animation-1")) {
                     if (animationLoad) {
                         navigation.addClass("animation");
                         navigation.find("a").each(function(i) {
                             $$(this).addClass("on" + i)
                         })
                         setTimeout(function() {
                             navigation.find("a").each(function(i) {
                                 if (i < size) {
                                     $$(this).addClass("on");
                                 }
                             });
                             setTimeout(function() {
                                 removeAnimation();
                                 animationLoad = false;
                             }, timer);
                         }, 1500)
                     } else {
                         removeAnimation();
                     }


                 }
             }

             function navigationAnimationMatrix() {
                 var navigation = $$(".app_navigation_" + AppyTemplate.global.style.layout);
                 if (!navigation.is(".animation-1")) {
                     return false;
                 }
                 if (!animationLoad) {
                     removeAnimation();
                     return false;
                 }
                 var animationEffect = navigation.attr("animation");
                 var popup = '@keyframes popupName {';
                 if (animationEffect == "left") {
                     popup += '0%   {opacity:0;transform: translate(-popupNameValuepx, 0);}';
                     popup += '25%  {opacity:1;}';
                     popup += '50%  {opacity:1;transform: translate(100px, 0);}';
                     popup += '75%  {opacity:1;transform: translate(-30px, 0); }';
                     popup += '100% {opacity:1;transform: translate(0, 0); }}';
                 }
                 if (animationEffect == "right") {
                     popup += '0%   {opacity:0;transform: translate(popupNameValuepx, 0);}';
                     popup += '25%  {opacity:1;}';
                     popup += '50%  {opacity:1;transform: translate(-100px, 0);}';
                     popup += '75%  {opacity:1;transform: translate(30px, 0); }';
                     popup += '100% {opacity:1;transform: translate(0, 0); }}';
                 }
                 if (animationEffect == "top") {
                     popup += '0%   {opacity:0;transform: translate(0, -popupNameValuepx);}';
                     popup += '25%  {opacity:1;}';
                     popup += '50%  {opacity:1;transform: translate(0, 100px);}';
                     popup += '75%  {opacity:1;transform: translate(0, -30px); }';
                     popup += '100% {opacity:1;transform: translate(0, 0); }}';
                 }
                 if (animationEffect == "bottom") {
                     popup += '0%   {opacity:0;transform: translate(0, popupNameValuepx);}';
                     popup += '25%  {opacity:1;}';
                     popup += '50%  {opacity:1;transform: translate(0, -100px);}';
                     popup += '75%  {opacity:1;transform: translate(0, 30px); }';
                     popup += '100% {opacity:1;transform: translate(0, 0); }}';
                 }
                 if (animationEffect == "max") {
                     popup = '.app_navigation_matrix a {transition-property: all; transition-duration: 0.5s; transition-timing-function: ease; transform-origin: 50% 50%;}';
                 }
                 if (animationEffect == "min") {
                     popup = '.app_navigation_matrix a {transition-property: all; transition-duration: 0.5s; transition-timing-function: ease; transform-origin: 50% 50%;}';
                 }


                 var popupClass = '.app_navigation_matrix.animation a.popupClass {animation: popupName popupDelays  ease-in-out forwards;}';
                 if (animationEffect == "max") {
                     popupClass = '.app_navigation_matrix.animation a { opacity:0; transform: scale(2);}';
                     popupClass += '.app_navigation_matrix.animation a.popupClass { opacity:1; transform: scale(1);}';
                 }
                 if (animationEffect == "min") {
                     popupClass = '.app_navigation_matrix.animation a { opacity:0; transform: scale(0);}';
                     popupClass += '.app_navigation_matrix.animation a.popupClass { opacity:1; transform: scale(1);}';
                 }
                 var rowSize = 3;
                 var colSize = parseInt($$(window).height() / navigation.find("a").eq(0).height());
                 if (data.appData.layoutHeader) {
                     colSize = parseInt(($$(window).height() - ($$(window).width() / 2)) / navigation.find("a").eq(0).height());
                     var windowW = $$(window).width();
                     if (windowW <= 640) {
                         rowSize = 3;
                     } else if (windowW > 640 && windowW <= 979) {
                         rowSize = 4;
                     } else if (windowW > 979 && windowW <= 1024) {
                         rowSize = 5;
                     } else {
                         rowSize = 6;
                     }
                 } else {
                     rowSize = 3;
                     colSize = parseInt($$(window).height() / 106)

                 }
                 var size = rowSize * colSize + rowSize;

                 var popupIndex = 1;
                 var popupValue = 160;
                 var timeStart = 1;
                 if (animationEffect == "max") {
                     timeStart = 0.5;
                 }
                 if (animationEffect == "min") {
                     timeStart = 0.5;
                 }
                 navigation.find("a").each(function(i) {
                     if (i == 0) {
                         var cssPopup = popup.replace("popupName", "popup" + popupIndex).replace("popupNameValue", popupValue);
                         $$("#animationCSS").append(cssPopup);
                     } else {
                         if (i % rowSize == 0) {
                             popupIndex++;
                             popupValue = popupValue + 100;
                             var cssPopup = popup.replace("popupName", "popup" + popupIndex);
                             $$("#animationCSS").append(cssPopup);
                         }
                     }
                     var classPopup = popupClass.replace("popupClass", "on" + (i + 1))
                         .replace("popupName", "popup" + popupIndex)
                         .replace("popupDelay", timeStart + 0.05 * i);
                     $$("#animationCSS").append(classPopup);
                 })


                 navigation.removeClass("animation").find("a").removeClass("on");
                 navigation.addClass("animation");
                 var index = 0;

                 function callIndex() {
                     navigation.find("a").eq(index).addClass("on" + (index + 1));
                     if (size == index) {
                         setTimeout(function() {
                             removeAnimation();
                         }, 1000 + 100 * size)
                     } else {
                         setTimeout(function() {
                             index++;
                             callIndex();
                         }, 1)
                     }
                 }
                 setTimeout(function() {
                     //alert(size)
                     callIndex();
                     animationLoad = false;
                 }, 1200)
             }

             function listAnimation() {
                 var navigation = $$(".app_navigation_" + AppyTemplate.global.style.layout);
                 var size = parseInt($$(window).height() / navigation.find("a").eq(0).height()) + 1;
                 var timer = 1000 + size * 100;
                 if (navigation.is(".animation-1")) {
                     if (animationLoad) {
                         navigation.addClass("animation");
                         navigation.find("a").each(function(i) {
                             $$(this).addClass("on" + i)
                         })
                         setTimeout(function() {
                             navigation.find("a").each(function(i) {
                                 if (i < size) {
                                     $$(this).addClass("on");
                                 }
                             });
                             setTimeout(function() {
                                 removeAnimation();
                                 animationLoad = false;
                             }, timer);
                         }, 1200)
                     } else {
                         removeAnimation();
                     }
                 }
             }

             function navigationAnimationSlide() {
                 var navigation = $$(".app_navigation_" + AppyTemplate.global.style.layout);
                 var size = parseInt(($$(window).height() / 50)) + 2;
                 if ($$("body").is(".compress")) {
                     size = parseInt(($$(window).height() / 78)) + 2;
                 }
                 if (navigation.is(".animation-1")) {
                     navigation.removeClass("animation").find("a").removeClass("on");
                     navigation.addClass("animation");
                     setTimeout(function() {
                         var scrollTop = $$("[data-page='slideMenu'] .page-content")[0].scrollTop;
                         $$(".layout-disabled").remove();
                         $$("[data-page='slideMenu'] .page-content").append('<div class="layout-disabled" ontouchstart="return false;" ontouchmove="return false;" ontouchend="return false;"></div>');
                         if (scrollTop >= 160) {
                             removeAnimation();
                             return false;
                         }

                         var index = 0;

                         function callIndex() {
                             navigation.find("a").eq(index).addClass("on");
                             if (size == index) {
                                 animationLoad = false;
                                 setTimeout(function() {
                                     removeAnimation();
                                 }, 500)
                             } else {
                                 index++;
                                 setTimeout(function() {
                                     callIndex();
                                 }, 100)
                             }
                         }
                         callIndex();
                     }, 100)
                 }
             }


             function imglistAnimation(page) {
                 var navigation = $$(page.container).find(".app_navigation_" + AppyTemplate.global.style.layout);
                 var size = parseInt($$(window).height() / parseInt($$(window).width() / 2)) + 1;
                 navigation.find("a").each(function(i) {
                     if (i < size) {
                         $$(this).addClass("on" + i);
                     }
                 })
                 var timer = 1000 + size * 100;
                 if (navigation.is(".animation-1")) {
                     if (animationLoad) {
                         navigation.addClass("animation");
                         setTimeout(function() {
                             navigation.find("a").each(function(i) {
                                 if (i < size) {
                                     $$(this).addClass("on");
                                 }
                             });
                             setTimeout(function() {
                                 removeAnimation();
                                 animationLoad = false;
                             }, timer);
                         }, 1200)
                     } else {
                         removeAnimation();
                     }
                 }
             }


             function imgmatrixAnimation(page) {
                 var navigation = $$(page.container).find(".app_navigation_" + AppyTemplate.global.style.layout);
                 var size = parseInt($$(window).height() / parseInt($$(window).width() / 2)) * 2 + 2;
                 navigation.find("a").each(function(i) {
                     if (i < size) {
                         $$(this).addClass("on" + i);
                     }
                 })
                 var timer = 1000 + size * 100;
                 if (navigation.is(".animation-1")) {
                     if (animationLoad) {
                         navigation.addClass("animation");
                         setTimeout(function() {
                             navigation.find("a").each(function(i) {
                                 if (i < size) {
                                     $$(this).addClass("on");
                                 }
                             });
                             setTimeout(function() {
                                 removeAnimation();
                                 animationLoad = false;
                             }, timer);
                         }, 1200)
                     } else {
                         removeAnimation();
                     }
                 }
             }

             function gridAnimation(page) {
                 var navigation = $$(page.container).find(".app_navigation_" + AppyTemplate.global.style.layout);
                 var size = parseInt($$(window).height() / parseInt($$(window).width() / 2)) * 2 + 2;

                 navigation.find("li").each(function(i) {
                     if (i < size) {
                         $$(this).addClass("on" + i);
                     }
                 })
                 var timer = 1000 + size * 100;
                 if (navigation.is(".animation-1")) {
                     if (animationLoad) {
                         navigation.addClass("animation");
                         setTimeout(function() {
                             navigation.find("li").each(function(i) {
                                 if (i < size) {
                                     $$(this).addClass("on");
                                 }
                             });
                             setTimeout(function() {
                                 removeAnimation();
                                 animationLoad = false;
                             }, timer);
                         }, 1200)
                     } else {
                         removeAnimation();
                     }
                 }
             }


             $$(document).on('click', '.panel-overlay', function() {
                 if (AppyTemplate.global.style.layout == "slidemenu") {
                     $$(".app_navigation_slidemenu").addClass("done").removeClass("animation")
                 }
             });


             function removeAnimation() {
                 var navigation = $$(".app_navigation_" + AppyTemplate.global.style.layout);
                 $$(".layout-preloader").remove();
                 $$(".layout-disabled").remove();
                 navigation.addClass("done").removeClass("animation");
             }



             /* Fixed Layout */
             Appyscript.onPageInit('fixedmatrix', function(page) {
                 if ($$(page.container).find(".app_navigation_fixedmatrix .page-link").length > 5) {
                     $$(page.container).find(".app_navigation_fixedmatrix .page-link").each(function(i) {
                         if (i > 3) {
                             $$(this).remove();
                         }
                     });
                     var a = $$(".app_navigation_newLayout_" + AppyTemplate.global.style.moreNavigation.layout);
                     //var a = $$(".app_navigation_fixedmatrix").eq(0);
                     $$(page.container).find(".more, .closeLt, .fixedback").click(callFixedMore)
                     $$(".navbar").find("a.fixedback").click(callFixedMore)

                     function callFixedMore() {

                         if (a.is(".on")) {
                             //if(data.appData.headerBarType!="none"){$$(".closeLt").hide()}
                             if (data.appData.headerBarType != "none") {
                                 $$(".fixedback").hide();
                                 $$("#backFromMerge").show();
                             }
                             if (data.appData.headerBarType != "none") {
                                 $$(".closeLt").hide()
                             }
                             $$(".app_navigation_fixedmatrix").show();
                             //$$(".page-content").removeClass("sliderplus");
                             $$(".navigationSlider").show();
                             a.removeClass("on").hide();
                         } else {
                             if (data.appData.headerBarType != "none") {
                                 $$(".fixedback").show();
                                 $$("#backFromMerge").hide();
                             }
                             if (data.appData.headerBarType == "none") {
                                 $$(".closeLt").show()
                             }
                             $$(".app_navigation_fixedmatrix").hide();
                             //$$(".page-content").addClass("sliderplus");
                             $$(".navigationSlider").hide();
                             a.addClass("on").show();
                             //$$(".closeLt").show();
                         }

                     }
                     a.find("a").each(function(i) {
                         if (i <= 3) {
                             $$(this).remove();
                         }
                     });
                     if (window.data.loginfield.loginSetting.groupEnable == "1") {
                         for (var j = 0; j < 4; j++) {
                             $$($$($$(".app_navigation_newLayout_" + AppyTemplate.global.style.moreNavigation.layout)[1]).find('a')[j]).remove();
                         }
                     }
                 } else {
                     $$(".app_navigation_newLayout_" + AppyTemplate.global.style.moreNavigation.layout).remove();
                 }
             });


             var modeSize = 0;
             var lastIndex = 0;
             var gIndex = 0;
             Appyscript.onPageInit('slideshutter', function(page) {
                 modeSize = 0;

                 gIndex = 0;
                 newIndexvalue = 0;

                 setTimeout(function() {
                     if ($$(window).width() > 767) {
                         modeSize = 2;
                     };
                     //var a = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"];
                     lastIndex = 0;
                     $$("#box a").each(function(i) {
                         //$$(this).css("background-image", "url(fashion/"+a[i]+")");
                         $$(this).attr("class", "none").attr("gIndex", i);
                         if (i == 0) {
                             $$(this).attr("class", "full");
                         } else {
                             if (i < (4 - modeSize)) {
                                 $$(this).attr("class", "half");
                             }
                         }
                         if (i > ($$("#box a").length - (5 - modeSize))) {
                             $$(this).attr("type", "last").attr("index", lastIndex);
                             lastIndex++;
                         } else {
                             $$(this).attr("type", "");
                         }
                     })


                     $$("#box a").click(function() {
                         if ($$(this).is(".full")) {
                             $$(this).addClass("page-link")
                             return false;
                         }
                         gIndex = $$(this).attr("gIndex");
                         newIndexvalue = $$(this).attr("gIndex");
                         //alert(gIndex);
                         goIndex(gIndex);
                     })


                 }, 800)
                 var el = $$("#box")[0];
                 /* swipedetect(el, function (swipedir) {
                      if (swipedir == "up") {
                          if (gIndex != ($$("#box a").length - 1)) {
                              gIndex++;
                              goIndex(gIndex);
                          }
                      }
                      if (swipedir == "down") {
                          if (gIndex != 0) {
                              gIndex--;
                              goIndex(gIndex);
                          }
                      }

                  })*/

             });


             function goIndex(index) {
                 modeSize = 0;
                 lastIndex = 0;
                 gIndex = 0;
                 console.log("goindex");

                 var thisElement = $$("#box a").eq(index);
                 console.log("index " + index);
                 if (thisElement.attr("type") == "last") {
                     console.log("index" + index);

                     if (thisElement.attr("index") == "0") {
                         $$("#box a").attr("class", "none");
                         $$("#box a[type='last']").attr("class", "half");
                         thisElement.attr("class", "full");
                     }
                     if (thisElement.attr("index") == "1") {
                         $$("#box a").attr("class", "none");
                         $$("#box a[type='last']").attr("class", "half");
                         thisElement.attr("class", "full");
                     }
                     if (thisElement.attr("index") == "2") {
                         $$("#box a").attr("class", "none");
                         $$("#box a[type='last']").attr("class", "half");
                         thisElement.attr("class", "full");
                     }
                     if (thisElement.attr("index") == "3") {
                         $$("#box a").attr("class", "none");
                         $$("#box a[type='last']").attr("class", "half");
                         thisElement.attr("class", "full");
                     }
                 } else {
                     var meIndex = 0;
                     $$("#box a").attr("class", "none");
                     $$("#box a").each(function(i) {
                         if (i > index) {
                             if (meIndex < (3 - modeSize)) {
                                 $$(this).attr("class", "half");
                             }
                             meIndex++;
                         }
                     })
                     $$("#box a").eq(index).attr("class", "full");
                 }
             }




             //    $$(document).on("touchstart mousedown","#box",function(){  console.log("touchstart");});
             //     $$(document).on("touchmove mousemove","#box",function(){  console.log("move");});
             //     $$(document).on("touchend mouseup","#box",function(){  console.log("end");})


             function thousST(e) {

                 var touchobj = e.changedTouches[0]
                 threshold = 30, //required min distance traveled to be considered swipe
                     restraint = 100, // maximum distance allowed at the same time in perpendicular direction
                     allowedTime = 200, // maximum time allowed to travel that distance
                     swipedir = 'none'
                 dist = 0
                 startX = touchobj.pageX
                 startY = touchobj.pageY
                 startTime = new Date().getTime() // record time when finger first makes contact with surface
                 //e.preventDefault()

             }

             function thousMO(e) {

                 //e.preventDefault()
             }

             function thousEN(e) {
                 var touchobj = e.changedTouches[0];
                 var newtime = new Date().getTime();
                 distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
                 distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
                 elapsedTime = newtime - startTime // get time elapsed
                 if (elapsedTime <= allowedTime) { // first condition for awipe met
                     if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                         swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                     } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                         swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                     }
                 }
                 if (swipedir == "up") {
                     if (newIndexvalue != ($$("#box a").length - 1)) {
                         newIndexvalue++;
                         goIndex(newIndexvalue);
                     }
                 }
                 if (swipedir == "down") {
                     if (newIndexvalue != 0) {
                         newIndexvalue--;
                         goIndex(newIndexvalue);
                     }
                 }
                 //  e.preventDefault()

             }
             $$(document).on("touchstart mousedown", "#box", thousST);
             $$(document).on("touchmove mousemove", "#box", thousMO);
             $$(document).on("touchend mouseup", "#box", thousEN)


             /*function swipedetect(el, callback) {
                    modeSize = 0;
                    lastIndex = 0;
                    gIndex = 0;
                   var touchsurface = el,
                       swipedir,
                       startX,
                       startY,
                       distX,
                       distY,
                       threshold = 30, //required min distance traveled to be considered swipe
                       restraint = 100, // maximum distance allowed at the same time in perpendicular direction
                       allowedTime = 200, // maximum time allowed to travel that distance
                       elapsedTime,
                       startTime,
                       handleswipe = callback || function (swipedir) {}

                   touchsurface.addEventListener('touchstart', function (e) {
                       var touchobj = e.changedTouches[0]
                       swipedir = 'none'
                       dist = 0
                       startX = touchobj.pageX
                       startY = touchobj.pageY
                       startTime = new Date().getTime() // record time when finger first makes contact with surface
                       e.preventDefault()
                   }, false)

                   touchsurface.addEventListener('touchmove', function (e) {
                       e.preventDefault() // prevent scrolling when inside DIV
                   }, false)

                   touchsurface.addEventListener('touchend', function (e) {
                       var touchobj = e.changedTouches[0]
                       distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
                       distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
                       elapsedTime = new Date().getTime() - startTime // get time elapsed
                       if (elapsedTime <= allowedTime) { // first condition for awipe met
                           if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                               swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                           } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                               swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                           }
                       }
                       handleswipe(swipedir)
                       e.preventDefault()
                   }, false)
               }*/

             Appyscript.onPageInit('imglist', function(page) {
                 if ($$(page.container).find(".app_navigation_slidemore .page-link").length > 4) {
                     $$(page.container).find(".moreslidelist .page-link").each(function(i) {
                         if (i > 3) {
                             $$(this).remove();
                         }
                     });
                     var a = $$(".app_navigation_slidemore");
                     a.find("a").each(function(i) {
                         if (i <= 3) {
                             $$(this).remove();
                         }
                     });

                     $$('.app_navigation_slidemore_btn, .slidemore-overlay').click(function(event) {
                         if ($$('.newLayoutSliderMenu').is(".on")) {
                             $$('.newLayoutSliderMenu').removeClass("on");
                             $$('.slidemore-overlay').hide().parents(".page-content").removeAttr("style");
                         } else {
                             $$('.newLayoutSliderMenu').addClass("on");
                             $('.slidemore-overlay').show().parents(".page-content").css("overflow", "hidden");
                         }
                     });

                 } else {
                     $$('.app_navigation_slidemore_btn, .slidemore-overlay').hide();
                 }
             });
             Appyscript.onPageInit('imgmatrix', function(page) {
                 if ($$(page.container).find(".app_navigation_slidemore .page-link").length > 8) {
                     $$(page.container).find(".moreslidelist .page-link").each(function(i) {
                         if (i > 7) {
                             $$(this).remove();
                         }
                     });
                     var a = $$(".app_navigation_slidemore");
                     a.find("a").each(function(i) {
                         if (i <= 7) {
                             $$(this).remove();
                         }
                     });

                     $$('.app_navigation_slidemore_btn, .slidemore-overlay').click(function(event) {
                         if ($$('.newLayoutSliderMenu').is(".on")) {
                             $$('.newLayoutSliderMenu').removeClass("on");
                             $$('.slidemore-overlay').hide().parents(".page-content").removeAttr("style");
                         } else {
                             $$('.newLayoutSliderMenu').addClass("on");
                             $('.slidemore-overlay').show().parents(".page-content").css("overflow", "hidden");
                         }
                     });

                 } else {
                     $$('.app_navigation_slidemore_btn, .slidemore-overlay').hide();
                 }
             });

             Appyscript.onPageInit('crossmatrix', function(page) {
                 var crossleghideborder = newdata.home.length * 73;
                 var crossleg = newdata.home.length * 70;
                 if (data.appData.hideLayout) {
                     if (data.appData.hideLayout.indexOf("border") != -1) {
                         $$(".diamond-grid").css("width", crossleghideborder + "px");
                     } else {
                         $$(".diamond-grid").css("width", crossleg + "px");
                     }
                 }
             });

             // grid layout

             Appyscript.onPageInit('grid', function(page) {



                 var size = 4;
                 var sizeMax = parseInt($$(".app_navigation_grid").attr("size"))
                 if (sizeMax <= 2) {
                     size = 1;
                 } else if (sizeMax > 2 && sizeMax <= 5) {
                     size = 2;
                 } else if (sizeMax > 5 && sizeMax <= 7) {
                     size = 3;
                 }

                 setTimeout(function() {
                     var h = ($$(".app_navigation_grid").height() - 4) / size;
                     $$(".app_navigation_grid li").each(function(i) {
                         if ($$(this).is(".box2")) {
                             $$(this).css({
                                 "height": h + "px"
                             });
                         } else {
                             $$(this).css({
                                 "height": h + "px"
                             });
                         }

                     })

                     if (sizeMax != 4) {
                         $$(".box3, .box4").css("height", ((h / 2)) + "px");
                     }
                     $$(".app_navigation_grid li.items").each(function(i) {
                         if (i > 8) {
                             $$(this).remove();
                         }
                     });
                     $$("#app_navigation a").each(function(i) {
                         if (i < 8) {
                             $$(this).remove();
                         }
                     });

                     if (sizeMax > 9) {
                         $$(".app_navigation_grid li.items.box8").remove();
                     }


                 }, 1000);

                 function moreButton() {
                     if (AppyTemplate.global.style.moreNavigation.layout == "slidemenu") {
                         $$("#app_navigation").addClass("showMenu");
                         $$(".slidemore-overlay").show();
                         return false;

                     }
                     $$("#app_navigation, .fixedback").show();
                     $$("#backFromMerge").hide();
                     $$(".app_navigation_grid").hide();
                     if (data.appData.headerBarType == "none") {
                         $$(".closebtn").show();
                     }

                 }

                 function backMainMenu() {
                     $$("#app_navigation, .fixedback").hide();
                     $$("#backFromMerge").show();
                     $$(".app_navigation_grid").show();
                     if (data.appData.headerBarType == "none") {

                     }
                 }

                 function crsbtn() {
                     $$(".closebtn").hide();
                     $$("#app_navigation").hide();
                     $$(".app_navigation_grid").show();
                     $$(".moreButton").css("display", "block");
                 }

                 function showslide() {
                     $$("#app_navigation").removeClass("showMenu");
                     $$("#app_navigation, .slidemore-overlay").removeAttr("style");
                     $$("#app_navigation").css("background", AppyTemplate.global.style.navBackgroundColor);
                 }

                 $$(document).on('click', '.moreBtnClick', moreButton);
                 $$(document).on('click', '.fixedback', backMainMenu);
                 $$(document).on('click', '.slidemore-overlay', showslide);
                 $$(document).on('click', '.closebtn', crsbtn);
                 loadNavsAnimation(page);
             });

             // skew layout

             Appyscript.onPageInit('skew', function(page) {

                 if (data.home.length > 4) {
                     $$(".moreBtnClick").show();

                 } else {
                     $$(".moreBtnClick").hide();
                 }


                 function resizeLayout() {
                     $$(".app_navigation_skew li").each(function(i) {
                         if (i > 3) {
                             $$(this).remove();

                         }

                     });


                     if ($$("#app_navigation_skew a").length > 4) {
                         $$("#app_navigation_skew a").each(function(i) {
                             if (i < 4) {
                                 $$(this).remove();

                             }
                         });
                     }



                     var size = 3;
                     if ($$(".size-3").length) {
                         size = 2;
                     }
                     if ($$(".size-2").length) {
                         size = 1;
                     }
                     if ($$(".size-1").length) {
                         size = 0;
                     }
                     var w = $$(window).width();
                     var h = ($$(window).height() - 44) / size;
                     var d = Math.sqrt(w * w + h * h);
                     var b = Math.asin((h / d));
                     var a = b / (Math.PI / 180);
                     //alert(a);
                     $$(".before").css("transform", "skewY(-" + a + "deg)");
                     $$(".icon1").css("transform", "skewY(" + a + "deg) translateY(-50%)");
                     $$(".sa .before").css("transform", "skewY(" + a + "deg)");
                     $$(".sa .icon1").css("transform", "skewY(-" + a + "deg) translateY(50%)");

                     if (data.appData.headerBarType == "none") {
                         var w = $$(window).width();
                         var h = $$(window).height() / size;
                         var d = Math.sqrt(w * w + h * h);
                         var b = Math.asin((h / d));
                         var a = b / (Math.PI / 180);
                         //alert(a);
                         $$(".before").css("transform", "skewY(-" + a + "deg)");
                         $$(".icon1").css("transform", "skewY(" + a + "deg) translateY(-50%)");
                         $$(".sa .before").css("transform", "skewY(" + a + "deg)");
                         $$(".sa .icon1").css("transform", "skewY(-" + a + "deg) translateY(50%)");
                     }

                 }

                 $$(window).resize(resizeLayout);
                 resizeLayout();




                 function moreButton2() {
                     if (AppyTemplate.global.style.moreNavigation.layout == "slidemenu") {
                         if ($$(this).hasClass("on")) {
                             $$("#app_navigation_skew, .slidemore-overlay").removeAttr("style");
                             $$("#app_navigation_skew").css("background", AppyTemplate.global.style.navBackgroundColor);
                             $$("#app_navigation_skew").removeClass("showMenu");
                             $$(this).removeClass("on");
                         } else {
                             $$("#app_navigation_skew").addClass("showMenu");
                             $$(".slidemore-overlay").show();
                             $$(this).addClass("on");
                         }
                         return false;

                     }
                     $$("#app_navigation_skew, .fixedback").show();
                     $$("#backFromMerge").hide();
                     $$(".app_navigation_skew").hide();
                     $$(".moreBtnClick").css("display", "none");
                     if (data.appData.headerBarType == "none") {
                         $$(".closeLt").show()
                     }

                 }



                 function backMainMenu2() {
                     $$("#app_navigation_skew, .fixedback").hide();
                     $$("#backFromMerge").show();
                     $$(".app_navigation_skew").show();
                     $$(".moreBtnClick").css("display", "block");
                     if (data.appData.headerBarType == "none") {


                     }
                 }

                 function cross() {
                     $$(".closeLt").hide();
                     $$("#app_navigation_skew").hide();
                     $$(".app_navigation_skew").show();
                     $$(".moreBtnClick").css("display", "block");
                 }

                 function showslide2() {
                     $$("#app_navigation_skew").removeClass("showMenu");
                     $$("#app_navigation_skew, .slidemore-overlay").removeAttr("style");
                     $$("#app_navigation_skew").css("background", AppyTemplate.global.style.navBackgroundColor);
                     $$(".moreBtnClick").$$(".app_navigation_skew").show();
                 }

                 $$(document).on('click', '.moreBtnClick', moreButton2);
                 $$(document).on('click', '.fixedback', backMainMenu2);
                 $$(document).on('click', '.slidemore-overlay', showslide2);
                 $$(document).on('click', '.closeLt', cross);


             });

             // Halflist
             Appyscript.onPageInit('halflist', function(page) {



                 setTimeout(function() {
                     $$('.right_menu li').addClass('active');
                     $$(".right_menu li").each(function(i) {
                         $$(this).addClass("active").css("-webkit-transition-delay", 0.3 * i + "s");
                     })
                     $$('.right_menu').addClass("menuBgcolor");
                 }, 200)


                 setTimeout(function() {
                     $$('.right_menu li').removeClass('menuBgcolor');

                 }, 5000);

             });



             //diamond

             Appyscript.onPageInit('diamond', function(page) {

                 // $$(".app_navigation_diamond").css("width", $$(window).width() - 200 + "px");
                 // $$(".app_navigation_diamond").css("height", $$(window).width() - 200 + "px");

                 if ($$(".app_navigation_diamond li").length == 3) {
                     $$(".moreBtnClick a").hide();
                 } else {
                     if ($$(".app_navigation_diamond li").length <= 8) {
                         $$(".moreBtnClick").remove();
                     }
                 }
                 $$("#app_navigation a").each(function(i) {
                     if (i < 6) {
                         $$(this).remove();
                     }
                 });


                 var size = $$(".app_navigation_diamond li").length - 1;
                 console.log(size);
                 if (size == 0) {
                     console.log(size);
                     //return false;
                 }
                 if (size > 7) {
                     size = 6;
                 }


                 var angle = 360 / size;
                 console.log(angle);
                 var lieStart = angle / 2;
                 console.log(lieStart);

                 var ratio = 2.0;
                 if ($$(window).width() > 700) {
                     ratio = 2.5
                 }
                 var radius = ($$(window).width() - 100) / ratio;


                 console.log(size, angle, radius)

                 $$(".app_navigation_diamond li").each(function(i) {
                     //console.log(angle*i)
                     if (size > 1) {
                         var lineAngle = lieStart + angle * i;
                         console.log(lineAngle);
                         $$(".line").eq(i).css("transform", "rotate(" + lineAngle + "deg)").show();
                     }
                     $$(this).css("left", -1 * radius * Math.cos(2 * Math.PI * (i / size)) + "px")
                         .css("top", -1 * radius * Math.sin(2 * Math.PI * (i / size)) + "px");
                     console.log(this);
                 })

                 if (size == 1) {
                     //$(".morw_btn").removeClass("morw_btn");
                     return false;
                 }
                 if (size == "2" && newdata.home.length == "2") {
                     $$(".line").hide();
                     $$(".line").eq(0).show().addClass("line2")

                 }
                 $$(".app_navigation_diamond li:last-child").removeAttr("style").addClass("last more_btn").css("background", AppyTemplate.global.style.moreNavigation.backgoundColor);

                 if ($$(page.container).find(".app_navigation_diamond li").length > 7) {
                     $$(page.container).find(".app_navigation_diamond li").each(function(i) {
                         if (i > 5) {
                             if (!$$(this).is(".moreBtnClick")) {
                                 $$(this).remove();
                             }

                         }
                     });
                 }



                 function moreBtn() {
                     if (AppyTemplate.global.style.moreNavigation.layout == "slidemenu") {
                         $$("#app_navigation").addClass("showMenu");
                         $$(".slidemore-overlay").show();



                         return false;

                     }
                     $$("#app_navigation, .fixedback").show();
                     $$("#backFromMerge").hide();
                     $$(".app_navigation_diamond").hide();
                     $$(".diamondlayout_diamond").css("background", "none");
                     if (data.appData.headerBarType == "none") {
                         $$(".closeLt").show()
                     }

                 }
                 $$(".diamondlayout_diamond").css("background", AppyTemplate.global.style.navBackgroundColor);

                 function backbtn() {
                     $$("#app_navigation, .fixedback").hide();
                     $$("#backFromMerge").show();
                     $$(".app_navigation_diamond").show();
                     $$(".diamondlayout_diamond").css("background", AppyTemplate.global.style.navBackgroundColor);
                     if (data.appData.headerBarType == "none") {

                     }
                 }

                 function cross1() {
                     $$(".closeLt").hide();
                     $$("#app_navigation").hide();
                     $$(".app_navigation_diamond").show();

                 }

                 function showslidenew() {
                     $$("#app_navigation").removeClass("showMenu");
                     $$("#app_navigation, .slidemore-overlay").removeAttr("style");
                     $$("#app_navigation").css("background", AppyTemplate.global.style.navBackgroundColor);
                 }

                 $$(document).on('click', '.moreBtnClick', moreBtn);
                 $$(document).on('click', '.fixedback', backbtn);
                 $$(document).on('click', '.slidemore-overlay', showslidenew);
                 $$(document).on('click', '.closeLt', cross1);
             });
             Appyscript.onPageInit('mergeApp', function(page) {
                 function mergeApp() {
                     var newheight = Math.min($(window).height());
                     var newwidth = Math.min($(window).width());
                     var liheight = newwidth / 2;
                     $(".apps").height(liheight);
                     var pagelength = $$(page.container).find(".merger_matrix .apps").length;
                     if (pagelength < 1) {
                         $$(".merger_matrix").addClass("merger_matrix2");
                         return false
                     }
                     if (pagelength < 6) {
                         if (newheight < liheight * pagelength) {
                             $$(".merger_matrix").addClass("merger_matrixlist");
                         } else {
                             $$(".merger_matrix").removeClass("merger_matrixlist");
                         }
                     } else {
                         $$(".merger_matrix").addClass("merger_matrix2");
                     }
                 }

                 mergeApp()
                 setTimeout(function() {
                     $$(window).resize(function() {
                         mergeApp()
                     })
                 }, 1000);


             })

             function socialDatingIAPpopupClose() {
                 Appyscript.popupClose();
             }

             function show404page(titlename, iconname, textstr, hypernoImg) {
                 var errorheader = {};
                 errorheader.title = titlename;
                 errorheader.errorIcon = iconname;
                 errorheader.errortext = textstr;
                 errorheader.hyperNoImg = hypernoImg;
                 $$.get("pages/show404error.html", function(template) {
                     var compiledTemplate = AppyTemplate.compile(template);
                     var html = compiledTemplate(errorheader);
                     switch (data.appData.layout) {
                         case 'bottom':
                         case 'slidemenu':
                         case 'slidemenu3d':
                             mainView.router.reloadContent(html);
                             break;
                         default:
                             mainView.router.load({
                                 content: html,
                                 animatePages: true
                             });
                             break;
                     }
                     Appyscript.hideIndicator();
                     Appyscript.resetLayout(true);
                 });

             }


             function openHyperlocalNotification(hasExtra) {
                 Appyscript.showIndicator();
                 setTimeout(function() {
                     var jsArrayVal = ["js/hyperlocal.js"];
                     for (var i = 0; i < jsArrayVal.length; i++) {
                         var s = document.createElement("script");
                         s.type = "text/javascript";
                         s.src = jsArrayVal[i];
                         document.body.appendChild(s);
                     }
                     fromNotificationCheck_Hyperlocal = "fromNotification";
                     loadPageDataHyperlocal(hasExtra);
                 }, 5000)
             }

             function loadPageDataHyperlocal(hasExtra) {
                 Appyscript.showIndicator();
                 fromNotificationCheck_Hyperlocal = "fromNotification";
                 var url = webserviceUrl + 'Page.php';
                 ServiceURL = webserviceUrl + 'Hyperlocal.php';
                 if (hasExtra !== undefined) {
                     pageIdentifie = hasExtra.split("#")[0];
                 }
                 // pageIdentifie="hyperlocal_1524722937504_65";
                 var postData = '{"method":"getPages","appId":"' + localStorage.getItem("appid") + '","pageIdentifire":"' + pageIdentifie + '"}'
                 if (isOnline()) {
                     Appyscript.showIndicator();
                     $$.ajax({
                         url: url,
                         data: postData,
                         type: "post",
                         //321  headers: {'accessToken': deviceEncryptedToken},
                         async: true,
                         success: function(data, textStatus) {
                             data = JSON.parse(data);
                             dataGlobalDownloadPage = data;
                             pageData = data;

                             //                     if(mainView.activePage.name.indexOf("hyperlocal")>-1){
                             //                        open_MyBookings();
                             //                     }else{
                             Appyscript.changePage();
                             //                     }
                             Appyscript.hideIndicator();
                         },
                         error: function(error) {
                             Appyscript.hideIndicator();
                             updatecartCount();
                             Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                         }
                     });
                 } else {
                     Appyscript.hideIndicator();
                     Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                 }
             }

             function gm_authFailure() {
                 locationCheck = "false" // here you define your authentication failed message
             };

             //AppyTemplate.registerHelper('currencyFormatHelper', function(str) {
             //           var x;
             //    if ((String(str)).indexOf(",") != -1) {
             //        x = str.replace(/,/g, "")
             //    } else {
             //        x = str;
             //    }
             //   // return (parseFloat(x).toLocaleString(AppyTemplate.global.curSymFor));
             // //return new Intl.NumberFormat(AppyTemplate.global.curSymFor, { maximumFractionDigits: 2 }).format(x)
             //     if(AppyTemplate.global.curSymFor==="en-US"){
             //         var newNumber =  parseFloat(new Intl.NumberFormat(AppyTemplate.global.curSymFor, { maximumFractionDigits: 2 }).format(x))
             //         newNumber=(newNumber.toString()).indexOf(".") > -1 ? (newNumber).toFixed(2) : newNumber;
             //         return newNumber
             //    }else{
             //        return new Intl.NumberFormat(AppyTemplate.global.curSymFor, { maximumFractionDigits: 2 }).format(x)
             //    }
             //
             //    });

             AppyTemplate.registerHelper('currencyFormatHelper', function(str) {
                 var x;
                 if ((String(str)).indexOf(",") != -1) {
                     x = str.replace(/,/g, "")
                 } else {
                     x = str;
                 }

                 var currencySymbol = AppyTemplate.global.curSymFor || "en-US";
                 var currencyCode = AppyTemplate.global.curSymCode || "USD";

                 x = parseFloat(x).toLocaleString(currencySymbol, {
                     style: 'currency',
                     currency: currencyCode,
                     currencyDisplay: 'code'
                 });
                 return x.replace(/[a-z]{3}/i, "").trim() || str
             });


             //TODO: Ewallet Payment Section
             function updatedataforplaceorder_ewallet(loginStatus) {
                 if (loginStatus) {
                     Appyscript.showIndicator();

                     var appId = ewalletModel.getewalletAppId()
                     var localUserId = ewalletModel.getewalletpayId()

                     if (isOnline() && (appId != undefined && appId != "undefined") && (appId != undefined && appId != "undefined")) {
                         $$.ajax({
                             url: EWallet_BaseUrl,
                             data: Appyscript.validateJSONData('{"method":"getTransactionHistory","appId":"' + appId + '", "appUserId":"' + localUserId + '", "fromDate":"" ,"toDate":"" ,"paymentStatus":"" ,"offset":"0", "count":"0","deviceType":"android"}'),
                             type: 'post',
                             async: true,
                           //321  headers: { 'accessToken': deviceEncryptedToken },
                             success: function(successData) {
                                 Appyscript.hideIndicator();
                                 var resData = JSON.parse(successData);

                                 if (resData.status != "failure") {
                                     data.callback_method = undefined;
                                     if (resData.userData != undefined && resData.userData.balanceAmount != undefined) {
                                         ewalletModel.setbalanceAmount(parseFloat((resData.userData.balanceAmount == "" ? "0" : resData.userData.balanceAmount)).toFixed(2))
                                         ewalletModel.setcurrencySymbol(Appyscript.getcurrencySymbol(resData.userData.currency))
                                         ewalletModel.setcurrencySymbolName(resData.userData.currency)

                                         if ($("#ewallet_amountid").length > 0) {
                                             $("#ewallet_amountid").html((((data.languageSetting.msg_availableBalance != undefined && data.languageSetting.msg_availableBalance != null && data.languageSetting.msg_availableBalance.length > 0) ? data.languageSetting.msg_availableBalance : "Your available balance amount") + " " + ewalletModel.getcurrencySymbol() + (resData.userData.balanceAmount == "" ? "0" : resData.userData.balanceAmount)));
                                         }

                                     }

                                     update_paymentOption(data.paymentMethod_name);
                                     checkWalletPaymentMethodAvailable();

                                 } else {
                                     data.callback_method = undefined;
                                     Appyscript.allLogout()
                                     Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

                                 }

                             },
                             error: function() {
                                 Appyscript.allLogout()
                                 data.callback_method = undefined;
                                 Appyscript.hideIndicator();
                                 Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

                             }

                         })

                     } else {
                         Appyscript.allLogout()
                         data.callback_method = undefined;
                         Appyscript.hideIndicator();
                         Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);

                     }

                 }

             }

             Appyscript.clickEventOnPayment = function(methodName) {
                 ewalletModel.settouchidOrfaceidStatus(0);
                 if (ewalletModel.getewalletAvailableStatus() == true || ewalletModel.getewalletAvailableStatus() == "true") {
                     ewallet_availabilityforotherPayment(methodName)

                 }

                 if (methodName != "ewallet") {
                     return;
                 }

                 if (!Appyscript.checkLogin_ewallet()) {
                     Appyscript.loginPage(updatedataforplaceorder_ewallet);

                 }

             }

             function ewallet_availabilityforotherPayment(paymentMethod) {
                 if (paymentMethod != "ewallet") {
                     update_paymentOption(paymentMethod)

                 }

             }

             function isewallet_availableforotherPayment() {
                 var tmp = JSON.parse(localStorage.getItem("productList"));
                 if ((ewalletModel.getbalanceAmount() > 0 && parseFloat(tmp.maxGrandTotalStoreAmount) > parseFloat(ewalletModel.getbalanceAmount()))) {
                     return true;

                 }

                 return false;

             }


             function checkPaymentcredential_ewallet(page_data) {
                 if (page_data != undefined && page_data != "undefined" && page_data.payment_methodArr != undefined && page_data.payment_methodArr != "undefined" && page_data.payment_methodArr != null && page_data.payment_methodArr == true || page_data.payment_methodArr == "true") {
                     return true;
                 }

                 return false;

             }

             function wallet_openloginPageforGuest(paymentMethod, page) {
                 if (!Appyscript.checkLogin_ewallet()) {
                     data.paymentMethod_name = paymentMethod;
                     data.wallet_page = page;
                     Appyscript.loginPage(updatedataforplaceorder_ewallet);

                 }

             }

             function update_paymentOption(paymentMethod) {
                 if (Appyscript.checkLogin_ewallet() && paymentMethod != undefined && paymentMethod != "undefined" && paymentMethod.length > 0) {
                     if ($("#ewalletsignin" + paymentMethod).length > 0) {
                         $("#wallet_option" + paymentMethod).empty()
                         $("#wallet_option" + paymentMethod).html(wallet_optionCheckbox({
                             "paymentMethodKey": paymentMethod
                         }))

                         data.paymentMethod_name = undefined;
                         data.wallet_page = undefined;

                     }

                 }

             }


             function checkWalletPaymentMethodAvailable() {
                 if ($$("#walletewallet").length > 0) {
                     var tmp = JSON.parse(localStorage.getItem("productList"));
                     if (ewalletModel.getewalletAvailableStatus() && ewalletModel.getbalanceAmount() > 0 && parseFloat(tmp.maxGrandTotalStoreAmount) <= parseFloat(ewalletModel.getbalanceAmount())) {
                         $$('#walletewallet').css('display', 'block');
                         return;
                     }
                     $$('#walletewallet').css('display', 'none');
                 }
             }


             $$(window).resize(function() {
                 newResizeBackground();
             });

             function newResizeBackground() {
                 if (window.orientation === 0 || window.orientation === -90) {
                     $$("body").attr("view", "portrait")
                 } else {
                     $$("body").attr("view", "landscape")
                 }
             }


            Appyscript.reloadPagefrom = function(pageId) {
                var currentPageName = Appyscript.activePage.name;
                if(currentPageName == pageId) {
                    mainView.router.reloadContent(html);
                }
            }

             var login_loaderIsVisible = false;

             function login_showLoader() {
                 login_loaderIsVisible = true;
                 $$("body").append('<div class="ce-preloader-indicator-overlay" ontouchmove="return false;"></div><div class="ce-preloader-indicator-modal"><span class="preloader preloader-white">' + (Appyscript.params.material ? Appyscript.params.materialPreloaderHtml : "") + "</span></div>");
             }

             function login_hideLoader() {
                 login_loaderIsVisible = false;
                 $$('.ce-preloader-indicator-modal').remove();
                 setTimeout(function() {
                     $$('.ce-preloader-indicator-overlay, .ce-preloader-indicator-modal').remove();
                 }, 300);
             }
var bottomPageLoad = function(){





//Manoj 12/07/2017 start
if (data.appData.layout == 'bottom' && !folderPage && data.appData.autoLoadFirstPage != 'YES' && data.loginfield.loginSetting.groupEnable != 1) {
 isSinglePage = true;
} else if (!(pageData.list[0].value.indexOf("https://www.google.com/maps") != -1)) {
 openCommonPage("singlePage");
}


var hideHeader = false;

if (data.appData.layout == 'bottom' && AppyTemplate.global.style.autoLoadFirstPage == "YES") {
 hideHeader = true;
 if (data.home.length == 1) {
     $$(".swiper-wrapper").css("visibility", "hidden");
 }

}


//Manoj 12/07/2017 end
//openCommonPage("singlePage");
pageValue = pageData.list[0].value;
Appyscript.openWebSiteView(pageValue, pageData.list[0].inAppNavigation, pageData.list[0].websiteAuthCheck, pageData.list[0].nativeOsBrowser, pageData.list[0].name, localStorage.getItem("mergeAppsBackButton"), hideHeader);
if (data.appData.layout == 'slidemenu' && !folderPage) {
 setTimeout(function() {
     Appyscript.openSlide();
 }, 2000);
}
}
function calculatedate()
 {
       var query = 'https://play.google.com/store/apps/details?id=' + Appyscript.getPackageName();
                   var msg="";
                   msg = data.languageSetting.App_is_still_not_live_at_AppStore;
                   $$.ajax({
                       url: query,
                       data: '',
                       type: "get",
                       async: true,
                       success: function(data, textStatus, val) {
                           Appyscript.hideIndicator();
                           if (val.status = '200') {


                           }
                           else {
                              var dataAppid=data.appData.appId;
                                   if(localStorage.getItem(dataAppid+"appinstalldate")==null)
                                   {
                                       var currentdate= new Date();
                                   localStorage.setItem(dataAppid+"appinstalldate",currentdate);
                                       localStorage.setItem(dataAppid+"alertdone","0");
                                       localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                   }
                                 var appinstalldate1=localStorage.getItem(dataAppid+"appinstalldate");
                                               var appinstalldate=new Date(appinstalldate1);
                                 var lastalertshowndate1=localStorage.getItem(dataAppid+"lastalertshowndate");
                                               var lastalertshowndate=new Date(lastalertshowndate1);
                                  var alertdone=localStorage.getItem(dataAppid+"alertdone");
                                 var currentdate= new Date();
                                 var datediffrence=currentdate-lastalertshowndate;
                                 var datediffrenceappinstall=currentdate-appinstalldate;
                                 switch(alertdone)
                                     {
                                       case '2':
                                       if(datediffrence>86399913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "3");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '3':
                                       if(datediffrence>86399913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "4");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '4':
                                       if(datediffrence>86399913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "5");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '5':
                                       if(datediffrence>86399913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "6");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '6':
                                       if(datediffrence>86399913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "7");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '7':
                                       if(datediffrence>172799913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "9");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '9':
                                       if(datediffrence>172799913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "11");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '11':
                                       if(datediffrence>172799913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "13");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '13':
                                       if(datediffrence>172799913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "15");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '15':
                                       if(datediffrence>1295999913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "30");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                       case '30':

                                       break;
                                       default:
                                               if(datediffrenceappinstall>86399913)
                                               {
                                                localStorage.setItem(dataAppid+"alertdone", "2");
                                               localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                       createCustomAlert();
                                               }
                                       break;
                                 }
                           }
                       },
                       error: function(error) {
                           Appyscript.hideIndicator();



                           var dataAppid=data.appData.appId;
                                                              if(localStorage.getItem(dataAppid+"appinstalldate")==null)
                                                              {
                                                                  var currentdate= new Date();
                                                              localStorage.setItem(dataAppid+"appinstalldate",currentdate);
                                                                  localStorage.setItem(dataAppid+"alertdone","0");
                                                                  localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                              }
                                                            var appinstalldate1=localStorage.getItem(dataAppid+"appinstalldate");
                                                                          var appinstalldate=new Date(appinstalldate1);
                                                            var lastalertshowndate1=localStorage.getItem(dataAppid+"lastalertshowndate");
                                                                          var lastalertshowndate=new Date(lastalertshowndate1);
                                                             var alertdone=localStorage.getItem(dataAppid+"alertdone");
                                                            var currentdate= new Date();
                                                            var datediffrence=currentdate-lastalertshowndate;
                                                            var datediffrenceappinstall=currentdate-appinstalldate;
                                                            switch(alertdone)
                                                                {
                                                                  case '2':
                                                                  if(datediffrence>86399913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "3");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '3':
                                                                  if(datediffrence>86399913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "4");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '4':
                                                                  if(datediffrence>86399913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "5");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '5':
                                                                  if(datediffrence>86399913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "6");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '6':
                                                                  if(datediffrence>86399913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "7");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '7':
                                                                  if(datediffrence>172799913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "9");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '9':
                                                                  if(datediffrence>172799913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "11");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '11':
                                                                  if(datediffrence>172799913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "13");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '13':
                                                                  if(datediffrence>172799913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "15");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '15':
                                                                  if(datediffrence>1295999913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "30");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                                  case '30':

                                                                  break;
                                                                  default:
                                                                          if(datediffrenceappinstall>86399913)
                                                                          {
                                                                           localStorage.setItem(dataAppid+"alertdone", "2");
                                                                          localStorage.setItem(dataAppid+"lastalertshowndate",currentdate);
                                                                  createCustomAlert();
                                                                          }
                                                                  break;
                                                            }
                          // AppyPieNative.shareText(shareDataNew);
                       }
                   });


 }
var ALERT_TITLE = "Publish App";
var ALERT_BUTTON_TEXT = "Chat Now";
var txt_sub="You are using the test version of your app. To publish your app to Play Store, chat with us today!";


function createCustomAlert() {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));
                 btn2 = alertObj.appendChild(d.createElement("a"));
                 btn2.id = "closeBtn2";
                 btn2.appendChild(d.createTextNode("x"));
                 btn2.href = "#";
                 btn2.focus();
                 btn2.onclick = function() { removeCustomAlert2();return false; }

    msg = alertObj.appendChild(d.createElement("p"));
   // msg.innerHTML = txt_sub;
    msg.innerHTML = data.languageSetting.app_test_alret_notification_android;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { removeCustomAlert();return false; }

    alertObj.style.display = "block";

}
                 function removeCustomAlert2() {
                 document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
                 }
function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
                 link="https://snappy.appypie.com/media/rawat/chatbotLive/dist/index.html"
                 window.open(link, "_system");
}
function ful(){
alert('Alert this pages');
}