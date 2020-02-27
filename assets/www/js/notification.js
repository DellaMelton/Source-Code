Appyscript.notificationshare = function(a) {
    var shareData = {}
    $$.get("pages/notification-share.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(shareData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}

var globaljsondatanotification;
/*For Menu*/
/*For Menu*/
function toggle_menu(obj) {
    var a = $$(".dropdown-content");
    if (a.is(".on")) {
        $$(".dropdown-overlay").hide();
        a.hide().removeClass("on")
    } else {
        $$(".dropdown-overlay").show();
        a.show().addClass("on");
    }
}


/* by satish   for   user permission */
var groupDataval = {};
var jsondataObj;
var shareData = {};
var groupnameval;
var fieldType;
AppyTemplate.global.customFieldFlag=''
//var customFieldFlag="";
Appyscript.notificationprofile = function(a) {
        Appyscript.showIndicator();
        if (!localStorage.getItem("userid")) {
            Appyscript.loginPage('true');
            return;
        }
        //customFieldFlag="1";
        AppyTemplate.global.customFieldFlag="1";
        Appyscript.popupClose();


        groupDataval = '{"method":"userGroupList","appId":"' + localStorage.getItem("appid") + '","groupId":"' + localStorage.getItem("groupIdval") + '","pageId":"' + data.loginfield.signup.loginPageId + '"}';
        console.log("groupDataval===" + groupDataval)
        groupDataval = EncryptOrDecrypt("encrypt", groupDataval); 
        groupDataval = groupDataval.replace(/\s/g, '');
        var query = webserviceUrl + 'Appuser.php'; 
        if (isOnline())  {

            $$.ajax({ 
                url: query,
                data: groupDataval,
                 type: "post",
                //321  headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(jsonData, textStatus) {  

                    jsonData = jsonData.trim(); 
                    jsonData = ReturnHexDataWithSpace(jsonData); 
                    jsonData = EncryptOrDecrypt("decrypt", jsonData); 
                    console.log("jsondataObj 2342===" + JSON.stringify(jsonData));
                    jsondataObj = JSON.parse(jsonData);  
                    console.log("jsondataObj.msg  ===" + jsondataObj.msg)
                    if (data.loginfield.loginSetting.groupEnable == 1 && jsondataObj.msg != "no data") {

                        for (var i = 0; i < jsondataObj.list.length; i++) {
                            groupnameval = jsondataObj.list[i].groupName;
                            fieldType = jsondataObj.list[i].fieldType;

                        }
                        setTimeout(function() {

                            dataget(jsondataObj, a, groupnameval, fieldType);
                        }, 2500);

                    } else if (jsondataObj.msg == "no data") {
                        setTimeout(function() {

                            dataget(jsondataObj, a, groupnameval);
                        }, 2500);

                    } else {
                        setTimeout(function() {
                            dataget(jsondataObj, a, groupnameval, fieldType);
                        }, 2500);

                    }

                },
                 
                error: function(response, textStatus, errorThrown) { 
                    Appyscript.hideIndicator(); 
                } 
            }); 

        } else  { 
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages); 
        } 


    }
    /* end of function  */


/* by satish   for   user permission */
var imgArr=[];
function dataget(jsondataObjval, a, groupIdname, fieldType) {
    Appyscript.showIndicator();

    if (a == "messenger") {
        localStorage.messengerProfile = true;
    }
    if ($$(mainView.activePage.container).attr("data-page") == "NotificationProfilePage") {
        Appyscript.hideIndicator();
        return false;
    }

    if (a == "groupval") {
        localStorage.setItem("firsttimefromfacebook", "firsttimefromfacebook");
        Appyscript.hideIndicator();
        Appyscript.popupClose();
    }
    if (a == "fitness") {
        Appyscript.hideIndicator();
        Appyscript.popupClose();
    }


    //Custom Form Details Starts

    Appyscript.showIndicator();
    var loginServiceURL = webserviceUrl + "Appuser.php";
    console.log("data.loginfield===" + JSON.stringify(data));
    var appid = localStorage.getItem("appid");

    var loginPageId = data.loginfield.signup.loginPageId;

    var userID = localStorage.getItem("userid");
    var serviceData = '{"method":"getCustomLoginForm","appId":"' + appid + '","pageId":"' + loginPageId + '","prevVersion":"0","userId":"' + userID + '","deviceType":"android"}';
    console.log("calling signup data serviceData "+serviceData);
    serviceData = EncryptOrDecrypt("encrypt", serviceData);
    serviceData = serviceData.replace(/\s/g, '');

    $$.ajax({
            url: loginServiceURL,
            data: serviceData,
            type: "post",
            //321  headers: {'accessToken': deviceEncryptedToken},
            error: function(error) {
                            Appyscript.hideIndicator();
                            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
             },
            success: function(jsonData, textStatus) {
            if (jsonData != '') {
            jsonData = jsonData.trim();
            jsonData = ReturnHexDataWithSpace(jsonData);
            jsonData = EncryptOrDecrypt("decrypt", jsonData);
            shareData.signUpCustom = JSON.parse(jsonData);
            }
            console.log("calling signup data responce ", jsonData);

    shareData.pageTitle = window.data.updateSettings.profile;
    shareData.grouppagedetails = jsondataObjval;
    shareData.userName = localStorage.getItem('username');
    shareData.eMail = localStorage.getItem('email');
    shareData.firsttimefromfacebook = localStorage.getItem("firsttimefromfacebook");
//    console.log("calling signup data responce shareData ", shareData);
    console.log("42423fff    "+JSON.stringify(shareData));
    Appyscript.hideIndicator();
    $$.get("pages/notification-profile.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(shareData);
        mainView.router.load({
            content: html,
            animatePages: true
        });

    $$(" #mySelect").on("change",function(){
        groupIdFlagCheck=1;
    });

       $$("#txt_phone").val(localStorage.getItem("phone"));
       $$("#txt_deviceType").val(shareData.signUpCustom.deviceId);
//       $$("#txt_deviceType").val(localStorage.getItem("uniqueid"));
       Appyscript.formSettings();



    setTimeout(function(){
        $$("li[type='date']").each(function(){
            var thisR = $$(this);
            var value=$$(this).find('input').attr("value");
            $$(this).find('input').val(value);
            //$("input[type=date]").parent('.customField').find('input[type=text]').attr("value",value);
        })

        $$("li[type='time']").each(function(){
            var thisR = $$(this);
            var value=$$(this).find('input').attr("value");
            $$(this).find('input').val(value);
            //$("input[type=time]").parent('.customField').find('input[type=text]').attr("value",value);
        })
    },500);



        if (a == "messenger") {
            $$("#phonenoIdmessenger").val(JSON.parse(localStorage.userdata).data.phoneno);
            $$("#phonenoIdmessenger").css("display", "none");
        } else {
            $$("#phonenoIdmessenger").css("display", "none")
        }

        setTimeout(function() {
            if (data.loginfield.loginSetting.groupEnable == 1 || fieldType == "group")  {

                if(localStorage.getItem("firsttimefromfacebook")=="firsttimefromfacebook")  
                    {
                        AppyPieNative.disabledeviceback("1");
                    }

                if (localStorage.getItem("groupIdval") == "undefined" || localStorage.getItem("groupIdval") == null || localStorage.getItem("groupIdval") == "")
                {
                    $$('#testval').text(data.languageSetting.select_group+"*");
                    document.getElementById("mySelect").disabled = false;
                    groupIdFlagCheck="1";
                } else {
                    document.getElementById("mySelect").disabled = true;
                    $$('#testval').text(groupIdname);
                    $$("#testval").attr("disabled", "disabled");
                    groupIdFlagCheck="0";
                }
            } else {
                $$('#mySelect').hide();
            }
        }, 1500);

    });

    }

    });
}

var groupIdFlagCheck="0";
/* end of function */

function checkInputValue(){


    if($$(this).val()==""){

            alert("clear");
    }
}


Appyscript.notificationViewOpenImage = function(imagUrl, title) {
    AppyPieNative.openImageGallary(imagUrl + ",", "0", "", "", "On", "on", title,"","");
}


Appyscript.notificationPage = function() {

    if ($$(mainView.activePage.container).attr("data-page") == "NotificationPage") {
        return false;
    }
    openbadge();
    var query = webserviceUrl + 'Notification.php';



    var mobileType = '';
    if (Appyscript.device.android) {
        mobileType = "Android";
        AppyPieNative.updateNoti();
    } else {
        mobileType = "iphone";
    }



    if (localStorage.getItem("userid") != "" || localStorage.getItem("userid") != null || localStorage.getItem("userid") != "null" || localStorage.getItem("userid") != undefined) {
        var postData = '{"method":"notificationHistory","appId":"' + localStorage.getItem("appid") + '","mobileType":"' + mobileType + '", "lat":"' + localStorage.getItem("localLatitude") + '","long":"' + localStorage.getItem("localLongitude") + '","userId":"' + localStorage.getItem("userid") + '"}';
    } else {
        var postData = '{"method":"notificationHistory","appId":"' + localStorage.getItem("appid") + '","lat":"' + localStorage.getItem("localLatitude") + '","long":"' + localStorage.getItem("localLongitude") + '","mobileType":"' + mobileType + '"}';
    }


    Appyscript.showIndicator();
    if (isOnline()) {
        $$.ajax({
            url: query,
            data: Appyscript.validateJSONData(postData),
            type: "post",

            async: true,
            success: function(data, textStatus) {
                if (data) {

                    var jsondata = JSON.parse(data);
                    // console.log("ashutosh-----"+JSON.stringify(jsondata));
                    if (localStorage.getItem("email")) {
                        jsondata.login = 1;
                    }

                    jsondata.pageTitle = window.data.updateSettings.notification;
                    globaljsondatanotification = jsondata;
                    Appyscript.hideIndicator();
                    $$.get("pages/notification.html", function(template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(jsondata);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                        var notifReadIdArray = '';
                        if (localStorage.getItem("notifReadIdArray")) {
                            notifReadIdArray = localStorage.getItem("notifReadIdArray").split(",");

                            $$.each(notifReadIdArray, function(index, value) {
                                $$(".notification li[notiid='" + value + "']").css("background-color", "rgba(0,0,0,0.1) !important")

                            })

                        }
                    });


                }

            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);

    }
}


Appyscript.notificationView = function(a) {

   // a.parentElement.style.backgroundColor = '#rgba(0,0,0,0.1)';
   $$(a).parent().css({"background": "rgba(0,0,0,0.1)"});
    AppyPieNative.updateNoti();

    if (!localStorage.getItem("notifReadIdArray")) {
        localStorage.setItem("notifReadIdArray", a.getAttribute("notiid"));
    } else {
        if (localStorage.getItem("notifReadIdArray")) {
            var notifReadIdArray = localStorage.getItem("notifReadIdArray").split(",");

            if (notifReadIdArray.indexOf(a.getAttribute("notiid").trim()) == -1) {
                notifReadIdArray.push(a.getAttribute("notiid"));
                localStorage.setItem("notifReadIdArray", notifReadIdArray.toString());
            }
        }
    }

    if (a.getAttribute("index-externallink")) {
        // console.log("external link-----"+a.getAttribute("index-externallink"));

        Appyscript.confirmation(a.getAttribute("index-content"), data.appData.appName, data.languageSetting.fc_view, data.languageSetting.common_cancel, function() {
            externalLink(a.getAttribute("index-externallink"));
        }, function() {})

    } else if (a.getAttribute("index-internallink")) {
        console.log("internalLink link-----" + a.getAttribute("index-internallink"));
        Appyscript.confirmation(a.getAttribute("index-content"), data.appData.appName, data.languageSetting.fc_view, data.languageSetting.common_cancel, function() {
            internallink(a.getAttribute("index-internallink"))
        });
    } else {
        Appyscript.alert(a.getAttribute("index-content"), data.appData.appName);
    }
}


function externalLink(url) {
    var n = url.indexOf("http");

    if (n == -1) {
        url = "https://" + url;
    }
    localStorage.setItem('Notificationopen', "True");
    openexternallink(url);
}

function internallink(a) {
    var originalParam = a;
    var pageId = '';
    var pageIdent = '';
    var datapageid = a;
    var extraVal = a;
    var pageIdentifier = '';
      pageIden = a;
      var notificationval='';

      var _folderVal=false;
    var nesjs = mainView.activePage.name.split("-")[0];
    if (nesjs != "socialnetwork" || (a.includes("socialnetwork") == false && nesjs == "socialnetwork"))
    {

       if(extraVal.indexOf("folder") != -1)
         {
            _folderVal=true;
         }
        var a = pageIden.indexOf("invisible")
        if (a > -1) {
            pageIden = pageIden.split("_");
            pageId = pageIden[1];
            pageIdentifier = pageIden[1] + "_" + pageIden[2] + "_" + pageIden[3];
        } else {
            pageIden = pageIden.split("_");
            pageId = pageIden[0];
            pageIdentifier = datapageid;
            if(pageId==undefined || pageId=='' || pageId==null)
            {
             notificationval = originalParam.split("_");
              pageId = notificationval[0];
              pageIdentifier=originalParam;
              _folderVal=false;
            }

        }
        localStorage.setItem('Notificationopen', "True");
        //radical push Notifications
        if(originalParam == "messenger"){
        if(mainView.activePage.name.indexOf("messenger") == -1){
        var objTemp = Object.assign(data.home);
        messengerPageId = getMessengerIden(objTemp);
        Appyscript.pageData("messenger", messengerPageId);
        }
        }else{

       if(pageId == "noPageid#pushCoupon#noCoupon" || pageIdentifier == "noPageid#pushCoupon#noCoupon")
       {
       AppyTemplate.global.checkpageIdentifier = true;
       }

       if (extraVal.indexOf('#') > -1)
       {
         pageIdentifier = extraVal.split("#")[0];
         pageId = pageIdentifier.split("_")[0];
       }

       if(pageIdentifier.indexOf("#")!=-1){

            pageIdentifier = extraVal.split("#")[0];

       }

        Appyscript.pageData(pageId, pageIdentifier,_folderVal);
        }
    }
}

//radical : this functions gets the page identifiers and pageId for opening.
function getMessengerIden(obj,folderAddOn){
var retVal = "";
	for(var i = 0;i<obj.length;i++){
		if(obj[i].pageid == "messenger"){
			console.log(obj[i].pageid);
			if(folderAddOn)
			    retVal = obj[i].pageIdentifierBecon + "--" + folderAddOn;
			else
			    retVal = obj[i].pageIdentifierBecon;
			return retVal;
		}else if(obj[i].pageid != "folder"){
			console.log(obj[i].pageid);
			obj.splice(i,1);
		}
	}
	for(var j=0;j<obj.length;j++){
		if(obj[j].pageid== "folder"){
			console.log("rec");
			retVal = getMessengerIden(obj[j].folderPages, obj[j].pageIdentifierBecon);
        }
	}
return retVal;
}



function openalarmNotificatonPage(a, index) {
    var pageId = '';
    var pageIdent = '';
    var datapageid = a;
    pageIden = a;
    var a = pageIden.indexOf("invisible")
    if (a > -1) {
        pageIden = pageIden.split("_");
        pageId = pageIden[1];
        pageIdentifier = pageIden[1] + "_" + pageIden[2] + "_" + pageIden[3];
    } else {
        pageIden = pageIden.split("_");
        pageId = pageIden[0];
        pageIdentifier = datapageid;
    }
    localStorage.setItem('Notificationopen', "True");
    localStorage.setItem("ALARMPage", "true");
    localStorage.setItem("songIndex", index);
    Appyscript.pageData(pageId, pageIdentifier);

    setTimeout(function() {
        console.log("====== settimeout is calll :");
        AudioPage(index, "customradio", pageId);
    }, 5000);


}

// =========================== rate and share ===============start==========================//



//================================ change password=============================//

Appyscript.UpdatePassword = function(a) {
    var password = $$("#NPassword").val();
    var CPassword = $$("#CPassword").val();
    var Opassword = $$("#OPassword").val();

    if (Opassword == undefined || Opassword == '') {
        $$("#OPassword").parent().addClass("error");
        Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank);
        return;
    }
    if (password == undefined || password == '' || !Appyscript.checkPassword(password, "true")) {
        $$("#NPassword").parent().addClass("error");
        if (password == undefined || password == '') {
            Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank);
        } else {
            Appyscript.alert(data.languageSetting.please_enter_password_mcom);
        }
        return;
    }

    if (password.length < 8) {
        $$("#NPassword").parent().addClass("error");
        Appyscript.alert(data.languageSetting.Sign_up_password_should_be_seven_char);
        return;

    }

    if (CPassword == undefined || CPassword == '' || CPassword != password) {
        $$("#CPassword").parent().addClass("error");
        if (CPassword == undefined || CPassword == '') {
            Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank);
        } else {
            Appyscript.alert(data.languageSetting.Sign_up_password_do_not_match);
        }
        return;
    }


    if (Opassword != localStorage.getItem("password")) {
        $$("#OPassword").parent().addClass("error");
        Appyscript.alert(data.languageSetting.you_have_entered_wrong_current_password);
        return;
    }

    if (Opassword == password) {
        $$("#NPassword").parent().addClass("error");
        Appyscript.alert(data.languageSetting.new_password_cant_be_same_as_previous_password);
        return;
    }



    var appName = data.appData.appName;
    var lang = data.appData.lang;
    var oops_password_cant_be_change = data.languageSetting.oops_password_cant_be_change;
    var your_password_has_been_successfully_changed = data.languageSetting.your_password_has_been_successfully_changed;


    var query = webserviceUrl + 'Appuser.php';

    var postData = '{"method":"changePassword","userId":"' + localStorage.getItem("userid") + '","appId":"' + localStorage.getItem("appid") + '","cpassword":"' + Opassword + '","password":"' + password + '","appName":"' + appName + '","adminEmail":"' + localStorage.getItem("email") + '","lang":"' + lang + '","loginType":"false"}';
    postData = EncryptOrDecrypt("encrypt", postData);
    postData = postData.replace(/\s/g, '');
    Appyscript.showIndicator();
    if (isOnline()) {

        $$.ajax({
            url: query,
            data: postData,
            type: "post",
           //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                Appyscript.hideIndicator();
                data = data.trim();
                data = ReturnHexDataWithSpace(data);
                data = EncryptOrDecrypt("decrypt", data);
                var object = JSON.parse(data);

                if (object["status"] == 'success') {
                    // Appyscript.alert(data.languageSetting.your_password_has_been_successfully_changed,appnameglobal_allpages);
                    Appyscript.alert(your_password_has_been_successfully_changed);
                    localStorage.setItem("password", password);
                    $$("#NPassword").val("");
                    $$("#CPassword").val("");
                    $$("#OPassword").val("");
                } else if (object["status"] == 'failure' || object["status"] == 'error') {


                    // Appyscript.alert(data.languageSetting.oops_password_cant_be_change,appnameglobal_allpages);
                    Appyscript.alert(oops_password_cant_be_change);
                }



            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }


}




//====================logout function==============================//

Appyscript.allLogout = function(a) {

    Appyscript.popupClose();

     if(pageId != undefined && pageId == "ewallet") {
     if(data.appData.layout == 'slidemenu' || data.appData.layout == 'slidemenu3d' || data.appData.layout == 'bottom')
         Appyscript.openBlankPage();
        }
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("profile_pic_facebook");

    localStorage.removeItem("phone");
    localStorage.removeItem("allProductId");
    localStorage.removeItem("profileId")
    $$(".dropdown-content").hide();
    localStorage.setItem("loginTouchId", "false");
     localStorage.removeItem("quizsubmit");
     localStorage.setItem("quizsubmitswipe","");
     localStorage.removeItem("scorecount");


    /* by satish   for group user   */
    AppyTemplate.global.hidemorebutton = true;
    localStorage.removeItem("totalpagevalue");
    localStorage.setItem("allowedPages", '');
    localStorage.setItem("grouploginstatus", " ")
    localStorage.removeItem("totalpagevalue");
    localStorage.removeItem("NewallowedPages");
    Appyscript.notificationMenu($$(".navbar"));
    localStorage.removeItem("firsttimefromfacebook")
    localStorage.removeItem("appkillfacebookwtlogin");
    localStorage.removeItem("userIdstripe");
     localStorage.removeItem("emailidstripe");
      localStorage.removeItem("passwordstripe");
    toggle_menu();
    allpageback();
    if (data.loginfield.loginSetting.groupEnable == 1 && data.loginfield.loginSetting.showRestricatedPage == 1)
     {

          createApplication();
          Appyscript.AppLogout();
//        if(data.loginfield.loginSetting.enableTouchId != 1)
//        {
//          Appyscript.AppLogout();
//        }

        return false;
    }else if(data.loginfield.loginSetting.groupEnable == 1 && data.loginfield.loginSetting.showRestricatedPage == 0){
             createApplication();
     }
    /*   end of   group use    */
      Appyscript.AppLogout();
      localStorage.removeItem("email");
      localStorage.removeItem("emailid");


}

/***********************/
//DELETE

Appyscript.DeleteProfilenotification = function() {
    var appName = data.appData.appName;
    var lang = data.appData.lang;
    var query = webserviceUrl + 'Appuser.php';
    var postData = '{"method":"deleteAppUser","appId":"' + localStorage.getItem("appid") + '","appName":"' + appName + '","appUserId":"' + localStorage.getItem("userid") + '","lang":"' + lang + '","status":"deactivate"}';
    console.log(postData  + " query "+query)
    postData = EncryptOrDecrypt("encrypt", postData);
    postData = postData.replace(/\s/g, '');

    Appyscript.showIndicator();
    if (isOnline()) {
        $$.ajax({
            url: query,
            data: postData,
            type: "post",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                Appyscript.hideIndicator();
                data = data.trim();
                data = ReturnHexDataWithSpace(data);
                data = EncryptOrDecrypt("decrypt", data);
                var object = JSON.parse(data);
                console.log("updatte  "+JSON.stringify(object))
                if (object["status"] == '1') {
                     //Appyscript.alert(object.msg);
                     Appyscript.allLogout();
                }
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

/***********************/

/***********************/
//UPDATE

Appyscript.DeactivateProfilenotification = function() {
    var appName = data.appData.appName;
    var lang = data.appData.lang;
    var query = webserviceUrl + 'Appuser.php';
    var postData = '{"method":"changeAppUserStatus","appId":"' + localStorage.getItem("appid") + '","appName":"' + appName + '","appUserId":"' + localStorage.getItem("userid") + '","lang":"' + lang + '","status":"deactivate"}';
    console.log(postData  + " query "+query)
    postData = EncryptOrDecrypt("encrypt", postData);
    postData = postData.replace(/\s/g, '');

    Appyscript.showIndicator();
    if (isOnline()) {
        $$.ajax({
            url: query,
            data: postData,
            type: "post",
         //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                Appyscript.hideIndicator();
                data = data.trim();
                data = ReturnHexDataWithSpace(data);
                data = EncryptOrDecrypt("decrypt", data);
                var object = JSON.parse(data);
                console.log("updatte  "+JSON.stringify(object))
                if (object["status"] == '1') {
                     //Appyscript.alert(object.msg);
                     Appyscript.allLogout();
                }
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

/***********************/

/***********************/
//ACTIVE STATUS

Appyscript.activeLoginStatus = function() {
    loginButtonFlag = "true"
    loginServiceURL = webserviceUrl + 'Appuser.php';

    var username = $$("#loginid").val();
    var password = $$("#loginpass").val();

    var appName = data.appData.appName;
    var lang = data.appData.lang;
    var query = webserviceUrl + 'Appuser.php';
    var postData = '{"method":"changeAppUserStatus","appId":"' + localStorage.getItem("appid") + '","appName":"' + appName + '","appUserId":"' + localStorage.getItem("userid") + '","lang":"' + lang + '","status":"activate"}';
    console.log(postData  + " query "+query)
    postData = EncryptOrDecrypt("encrypt", postData);
    postData = postData.replace(/\s/g, '');

    Appyscript.showIndicator();
    if (isOnline()) {
        $$.ajax({
            url: query,
            data: postData,
            type: "post",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                Appyscript.hideIndicator();
                data = data.trim();
                data = ReturnHexDataWithSpace(data);
                data = EncryptOrDecrypt("decrypt", data);
                var object = JSON.parse(data);
                console.log("updatte  "+JSON.stringify(object))
                if (object["status"] == '1') {
                     //Appyscript.alert(object.msg);
                     Appyscript.requestLoginService(username,password);
                }
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

/***********************/

function openPushNotificationPage() {
    Appyscript.notificationPage();
}




/*   by satish for user permission  */

Appyscript.UpdateProfile = function() {
    var thisValue;
    var thisLabel;

    if (data.loginfield.loginSetting.groupEnable == 1)  {  
        //thisLabel = $('select option:selected').text(); 
      //  thisValue = $('select option:selected').val(); 


       thisLabel = $('#mySelect option:selected').text();
         thisValue = $('#mySelect').val();


        if (thisValue == "0")  { 
            if (localStorage.getItem("groupIdval") == "" || localStorage.getItem("groupIdval") == null || localStorage.getItem("groupIdval") == "undefined") {
                Appyscript.hideIndicator();
                Appyscript.alert("Please  Select one group ", "Alert!");
                return false;
            }
        } 
    }

    var name = $$("#name").val();

    if (name.trim() == "") {
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.signup_entername_alert, AppyTemplate.global.commonLanguageSetting.alert_food);
        $$("#name").focus();
        return;
    }


    var profilePic = $$("#profileImageDir").attr("src");

    profilePic = $$(".profile_wp img").attr("image");
    console.log("===== profilePic : " + profilePic);
    var appid = localStorage.getItem("appid");
    var emailid = localStorage.getItem("email");

    if(thisValue == "undefined" || thisValue == null || thisValue == "" || thisValue == undefined)
    {
      thisValue= ' ';
    }



    loginLanguagSetting=data;
    var customData=Appyscript.getCustomFormDataSignup();

    if(!customData.flag){
        $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
        return;
    }
    var jsonFormDetails=customData.jsonInputField;
  Appyscript.showIndicator();

console.log(jsonFormDetails);
    var imgArrString="";

    for( var key=0;key<imgArr.length;key++){
        imgArrString=imgArrString+","+imgArr[key].value;
    }

       Appyscript.showIndicator();
    setTimeout(function(){
               //   Appyscript.updateDirProfile(localStorage.getItem("appid"), name, emailid, profilePicurl, '', thisValue,jsonFormDetails,imgArrString.substring(1,imgArrString.length));

                 Appyscript.getPathForUploadProfilePic(profilePic, name, appid, emailid, '', thisValue,jsonFormDetails,imgArrString.substring(1,imgArrString.length));
               },300);
  //  Appyscript.getPathForUploadProfilePic(profilePic, name, appid, emailid, '', thisValue);

}


Appyscript.onPageInit("NotificationProfilePage", function(page) {
    //Appyscript.showIndicator();
    Appyscript.setprofilevalues();
});

Appyscript.setprofilevalues = function() {

    if(localStorage.getItem("profileId"))
    {

       $$(".profile_wp img").css("background-image", "url('" + localStorage.getItem("profileImage") + "')").attr("image", localStorage.getItem("profileImage"));


    }

    else {
        $$(".profile_wp img").css("background-image", "url(" + localStorage.getItem("profileImage") + ")").attr("image", localStorage.getItem("profileImage"));
    }


    if (localStorage.getItem("profileId")) {
        $$("#name").val(localStorage.getItem("FBusername"));
        $$("#emailId").val(localStorage.getItem("FBemail"));
    //    $$(".profile_wp img").css("background-image", "url(images/dummy.jpg)").attr("image", "images/dummy.jpg)");
    } else {
        $$("#name").val(localStorage.getItem("username"));
        $$("#emailId").val(localStorage.getItem("email"));
    }

}

Appyscript.browsepic = function() {

    Appyscript.modal({

        verticalButtons: true,
        buttons: [{
            text: data.languageSetting.Camera_social_network,
            onClick: function() {
                Appyscript.cameraPermission('cameratake', 'Appyscript.permissionDenied');

            }
        }, {
            text: data.languageSetting.gallery,
            onClick: function() {

                Appyscript.storagePermission('gallerytake', 'Appyscript.permissionDenied');

            }
        },{
            text: data.languageSetting.common_cancel,
            onClick: function() {

            }
        }]
    });
}


function cameratake() {
//    var options = {
//        quality: 50,
//        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//        destinationType: navigator.camera.DestinationType.FILE_URI,
//    };
//    navigator.device.capture.captureImage(captureSuccessDirectory1, libraryErrorDir1, options);
                navigator.camera.getPicture(captureSuccessDirectory1, libraryErrorDir1, {
                    quality: 70,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    correctOrientation: true
                });
}

function gallerytake() {
    var options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
    };
    navigator.camera.getPicture(captureSuccessDirectory1, libraryErrorDir1, options);
}



Appyscript.updateProfileInfo = function(response) {
    localStorage.setItem("appkillfacebookwtlogin", "appkillfacebookwtlogin");
    console.log("==== response in updateProfileInfo : " + response);

    var jsondataObj = JSON.parse(response);
    console.log("==== dsf " + jsondataObj.status);
    if (jsondataObj.status == "success") {
        Appyscript.hideIndicator();
        localStorage.setItem("username", jsondataObj.profileData.name);
        localStorage.setItem("profileImage", jsondataObj.profileData.image);
        //Appyscript.alert(data.languageSetting.profileupdatedsuccessfully,window.data.appData.appName);
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Profile_updated_successfully_hyp, window.data.appData.appName, function() {
            if (localStorage.getItem("firsttimefromfacebook") == "firsttimefromfacebook") {

            if(groupIdFlagCheck=="1"){
              Appyscript.allLogout();
            }else{
            }

            }
            if (data.loginfield.loginSetting.groupEnable == 1 && localStorage.getItem("firsttimefromfacebook") != "firsttimefromfacebook") {
              if(groupIdFlagCheck=="1"){
                            Appyscript.allLogout();
                          }else{
                          }
            }
        });


    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.Network_connection_error_please_try_again_later, pageData.languageSetting.alert_dir);
    }

}


function setDirImageImg(baseImg) {
    $$(".profile_wp img").css("background-image", "url(" + baseImg + ")").attr("image", baseImg);
    //  $$("#"+imageidd).attr("src",  baseImg);
}

function captureSuccessDirectory1(mediaFiles) {
    var imageData = mediaFiles;
    var arrValue="00000$$profile.jpg$$"+imageData;
    imgArr.push({"id":"00000","value":arrValue});
    $$(".profile_wp img").css("background-image", "url(" + imageData + ")").attr("image", imageData);
    Appyscript.hideIndicator();
}


//function captureSuccessDirectory2(mediaFiles) {
//    //	  $$("#"+imageidd).attr("src", "data:image/jpeg;base64," + mediaFiles);
//
//    var arrValue="00000$$profile.jpg$$"+mediaFiles;
//    imgArr.push({"id":"00000","value":arrValue});
//    $$(".profile_wp img").css("background-image", "url(" + mediaFiles + ")").attr("image", mediaFiles);
//
//}


function libraryErrorDir1() {
    //Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

}



function encodeImage(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function() {
        c.width = this.width;
        c.height = this.height;
        ctx.drawImage(img, 0, 0);
        var dataURL = c.toDataURL("image/jpeg");
        callback(dataURL)
    };
    img.src = imageUri;
}

$$(document).on('click', '.dropdown-content', function() {
    toggle_menu();
});

// native call method

function openexternallink(url) {
    if (Appyscript.device.android) {
        localStorage.setItem('Notificationopenx', "true");
        openWebPage(url);
    } else {
        window.location = "openwebview:" + url + "$,$Notification$,$$,$$,$";
    }

}

function openshareapp(urlstr, shareData) {
    if (Appyscript.device.android) {
        openWebPage(urlstr);
    } else {
        window.location = "newsshare:" + shareData;
    }
}

function openrateapp(urlstr, shareData) {
    if (Appyscript.device.android) {
        openWebPage(urlstr);
    } else {
        window.location = "openwebsiteoutside:" + shareData;
    }

}

function openbadge() {
    if (Appyscript.device.android) {

    } else {
        window.location = "badge:";
    }
}


Appyscript.notificationcount = function() {

    var query = webserviceUrl + 'Notification.php';

    var mobileType = '';
    if (Appyscript.device.android) {
        mobileType = "Android";
    } else {
        mobileType = "iphone";
    }

    if (localStorage.getItem("userid") != "" || localStorage.getItem("userid") != null || localStorage.getItem("userid") != "null" || localStorage.getItem("userid") != undefined) {
        var postData = '{"method":"notificationHistory","appId":"' + localStorage.getItem("appid") + '","lat":"' + localStorage.getItem("localLatitude") + '","long":"' + localStorage.getItem("localLongitude") + '","mobileType":"' + mobileType + '","userId":"' + localStorage.getItem("userid") + '"}';

    } else {
        var postData = '{"method":"notificationHistory","appId":"' + localStorage.getItem("appid") + '","lat":"' + localStorage.getItem("localLatitude") + '","long":"' + localStorage.getItem("localLongitude") + '","mobileType":"' + mobileType + '"}';
    }
    console.log("postData====" + postData);
    if (isOnline()) {
        $$.ajax({
            url: query,
            data: Appyscript.validateJSONData(postData),
            type: "post",

            async: true,
            success: function(jsondata, textStatus) {
                if (data) {
                    var jsondata = JSON.parse(jsondata);

                    console.log("jsondata====" + jsondata);

                    var tempcount = 0;
                    var notifReadIdArray = '';
                    if (localStorage.getItem("notifReadIdArray")) {
                        notifReadIdArray = localStorage.getItem("notifReadIdArray").split(",");
                        var templocal = 0;
                          notificationcountvalue = true;
                        $$.each(notifReadIdArray, function(index, value) {
                            for (i = 0; i < jsondata.list.length; i++) {
                                if (value == jsondata.list[i].id) {
                                    tempcount = tempcount + 1;
                                }
                            }
                            templocal = templocal + 1;
                            if (templocal == notifReadIdArray.length) {
                                tempcount = jsondata.list.length - tempcount;
                                if (tempcount > 0) {
                                    document.getElementById("unreadnotification").innerHTML = tempcount;
                                } else {
                                    $$("#unreadnotification").hide()
                                }
                                //document.getElementById("unreadnotification").innerHTML=tempcount;
                            }

                        })

                    } else {
                        if (jsondata.list.length > 0) {
                            document.getElementById("unreadnotification").innerHTML = jsondata.list.length;
                        } else {
                            $$("#unreadnotification").hide()
                        }
                        //document.getElementById("unreadnotification").innerHTML=jsondata.list.length;
                    }


                }

            },
            error: function(error) {
               // alert("3242")

            }
        });
    }
}

Appyscript.onPageBack('NotificationPage', function(page) {

    // var notifReadIdArray=localStorage.getItem("notifReadIdArray").split(",");
try{
    window.localStorage.removeItem("notifReadIdArray");
    if (globaljsondatanotification.list.length) {
        for (i = 0; i < globaljsondatanotification.list.length; i++) {
            if (!localStorage.getItem("notifReadIdArray")) {
                localStorage.setItem("notifReadIdArray", globaljsondatanotification.list[i].id);
            } else {
                if (localStorage.getItem("notifReadIdArray")) {
                    var notifReadIdArray = localStorage.getItem("notifReadIdArray").split(",");

                    notifReadIdArray.push(globaljsondatanotification.list[i].id);
                    localStorage.setItem("notifReadIdArray", notifReadIdArray.toString());

                }
            }

        }
    }
    }catch(e){
        console.log(e)
    }

});



var groupData = {
    "pageTitle": "",
    "list": []
}
Appyscript.notificationGroup = function() {
    var query = webserviceUrl + 'Notification.php';
    var postData = '{"method":"getNotificationGroupList","appId":"' + localStorage.getItem("appid") + '","deviceId":"' + localStorage.getItem("uniqueid") + '","userId":"' + localStorage.getItem("userid") + '"}';
    Appyscript.showIndicator();
    if (isOnline()) {
        $$.ajax({
            url: query,
            data: postData,
            type: "post",

            async: true,
            success: function(jsonData, textStatus) {
                Appyscript.hideIndicator();
                console.log("ashutosh-----" + JSON.stringify(jsonData));
                jsonData = JSON.parse(jsonData);
                groupData = {
                    "pageTitle": data.updateSettings.notificationSettings,
                    "list": jsonData
                }
                $$.get("pages/notification-group.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(groupData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                    setTimeout(function() {
                        $$(".notification-group li").click(function() {
                            if ($$(this).find("input")[0].checked) {
                                $$(this).find("input")[0].checked = false;
                                $$(this).removeClass("on")
                            } else {
                                $$(this).find("input")[0].checked = true;
                                $$(this).addClass("on")
                            }
                        })
                    }, 100)
                });
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function savenotificationgroup() {
    var values = [];
    $$(".notification-group li.on").each(function() {
        values.push($$(this).attr("id"));
    })
    var query = webserviceUrl + 'Notification.php';
    var myJsonString = JSON.stringify(values);
    var postData = '{"method":"saveNotificationGroup","appId":"' + localStorage.getItem("appid") + '","groupList":' + myJsonString + ',"deviceId":"' + localStorage.getItem("uniqueid") + '","userId":"' + localStorage.getItem("userid") + '"}';
    Appyscript.showIndicator();
    if (isOnline()) {
        $$.ajax({
            url: query,
            data: postData,
            type: "post",

            async: true,
            success: function(jsonData, textStatus) {
                Appyscript.hideIndicator();
                Appyscript.alert("Updated successfully", appnameglobal_allpages);
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}
Appyscript.onPageInit("notification-group", function(page) {
    $$.each(groupData.list, function(i, v) {
        if (v.sendNotfication == 1) {
            $$(".notification-group li[id='" + v.groupId + "']").addClass("on").find("input")[0].checked = true
        }
    })
});


AppyTemplate.registerHelper('isSelected', function(value1, value2, flag) {
                            //1 For Select Dropdowns
                            //2 For Checkbox
                            //3 For Radio

                            if (flag == "1") {

                            if (value1 == value2) return "selected=selected";
                            else return "";

                            } else if (flag == "2") {

                            var checkedArr = value2.split("####");
                            var valuePresent = $.grep(checkedArr, function(v) {
                                                      return v == value1
                                                      });

                            if (valuePresent.length > 0) {
                            return "checked=checked";
                            } else {
                            return ""
                            }
                            } else if (flag == "3") {
                            if (value1 == value2) return "checked=checked";
                            else return "";

                            }

                            })



//
//uploadPicture = function(fieldTypeID) {
//    Appyscript.modal({
//
//                     verticalButtons: true,
//                     buttons: [{
//                               text: 'Camera',
//                               onClick: function() {
//
//                               navigator.camera.getPicture(captureSuccessDirectory2, libraryErrorDir2, {
//                                                           quality: 75,
//                                                           destinationType: Camera.DestinationType.FILE_URL,
//                                                           sourceType: Camera.PictureSourceType.CAMERA,
//                                                           encodingType: Camera.EncodingType.JPEG,
//                                                           targetWidth: 400,
//                                                           targetHeight: 400
//                                                           });
//                               }
//                               },
//                               {
//                               text: 'Gallery',
//                               onClick: function() {
//
//                               navigator.camera.getPicture(captureSuccessDirectory2, libraryErrorDir2, {
//                                                           quality: 75,
//                                                           destinationType: Camera.DestinationType.FILE_URL,
//                                                           sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//                                                           encodingType: Camera.EncodingType.JPEG,
//                                                           targetWidth: 400,
//                                                           targetHeight: 400
//                                                           });
//
//                               }
//                               },
//                               {
//                               text: 'Cancel',
//                               onClick: function() {
//
//                               }
//                               }
//                               ]
//                     });


//    function captureSuccessDirectoryCustom(mediaFiles) {
//
//
//        var value=$$("#hdn_img_"+fieldTypeID).val();
//        var imgValue=value.split('/login/');
//        var imgName="";
//
//        if(imgValue.length>1){
//          //   imgName=imgValue[1];
//           imgName= "Image"+getRandomNumber();
//             $$("#imgName_"+fieldTypeID).val(imgName);
//        }else{
//            imgName="Image"+getRandomNumber();
//
//            $$("#imgName_"+fieldTypeID).val(imgName);
//        }
//
//
//        imgArr=$.grep(imgArr,function(v){
//                      return v.id !=fieldTypeID
//                      });
//
//        var arrValue=fieldTypeID+"$$"+imgName+"$$"+mediaFiles;
//
//        imgArr.push({"id":fieldTypeID,"value":arrValue});
//
//
//         $$("#img_"+fieldTypeID).attr("src",mediaFiles);
//
//    }
//
//    function libraryErrorDir2() {
//        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
//
//    }
//}

var globalFieldID="";
uploadPicture = function(fieldTypeID){
globalFieldID=fieldTypeID;
    Appyscript.modal({

        verticalButtons: true,
        buttons: [{
            text: data.languageSetting.Camera_social_network,
            onClick: function() {
                Appyscript.cameraPermission('cameraTakeCustom', 'Appyscript.permissionDenied');

            }
        }, {
            text: data.languageSetting.gallery,
            onClick: function() {

                Appyscript.storagePermission('galleryTakeCustom2', 'Appyscript.permissionDenied');

            }
        }, {
            text: data.languageSetting.common_cancel,
            onClick: function() {

            }
        }]
    });
}

var cameraTypeCheck="";
 function cameraTakeCustom() {
 cameraTypeCheck="1";
//        var options = {
//            quality: 50,
//            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//            destinationType: navigator.camera.DestinationType.FILE_URI,
//        };
//        navigator.device.capture.captureImage(captureSuccessDirectoryCustom, libraryErrorDirCustom, options);
        navigator.camera.getPicture(captureSuccessDirectoryCustom, libraryErrorDirCustom, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true
        });
    }

    function galleryTakeCustom2() {
    cameraTypeCheck="2";
        var options = {
            quality: 50,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.FILE_URI,
        };
        navigator.camera.getPicture(captureSuccessDirectoryCustom, libraryErrorDirCustom, options);
    }

     function captureSuccessDirectoryCustom(mediaFiles) {

            var fieldTypeID=globalFieldID;
            var value=$$("#hdn_img_"+fieldTypeID).val();
            var imgValue=value.split('/login/');
            var imgName="";

            if(imgValue.length>1){
              //   imgName=imgValue[1];
               imgName= "Image"+getRandomNumber();
                 $$("#imgName_"+fieldTypeID).val(imgName);
            }else{
                imgName="Image"+getRandomNumber();

                $$("#imgName_"+fieldTypeID).val(imgName);
            }


            imgArr=$.grep(imgArr,function(v){
                          return v.id !=fieldTypeID
                          });

        if(cameraTypeCheck=="1"){

              var arrValue=fieldTypeID+"$$"+imgName+"$$"+mediaFiles;

              imgArr.push({"id":fieldTypeID,"value":arrValue});

               $$("#img_"+fieldTypeID).attr("src",mediaFiles);

        }else{

               var arrValue=fieldTypeID+"$$"+imgName+"$$"+mediaFiles;

               imgArr.push({"id":fieldTypeID,"value":arrValue});

                $$("#img_"+fieldTypeID).attr("src",mediaFiles);
        }

 Appyscript.hideIndicator();

        }

        function libraryErrorDirCustom() {
         Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

        }


//        function captureSuccessDirectory1(mediaFiles) {
//            var imageData = mediaFiles[0].fullPath;
//            console.log("mediaFiles  " + imageData);
//            $$(".profile_wp img").css("background-image", "url(" + imageData + ")").attr("image", imageData);
//            //var baseImg = getFileContentAsBase64(imageData, setDirImageImg);
//            Appyscript.hideIndicator();
//        }


function BarCode_Notify(inputID)
{
    getInputFieldID_Profile= $$(inputID).parent().find("input").attr("id");

    if(Appyscript.device.android)
    {
        AppyPieNative.validateLoyaltyViaScanner("notification_profile",AppyTemplate.global.name);
    }
    else
    {
        var identity_Chk='notification_profile';
        window.location="scanner:"+identity_Chk;
    }
}

function qrSuccess_profile(return_code)
{
    $$("#"+getInputFieldID_Profile).val(return_code).focus();
}

/******************/
//Open Confirmation

function openProfileConfirmation(type){
      Appyscript.popupClose();
      Appyscript.modal({
        title:( type=="delete" ? data.languageSetting.are_you_sure_you_want_to_delete_your_account : data.languageSetting.are_you_sure_you_want_to_deactivate_your_account),
         verticalButtons: false,
         buttons: [{
                   text: data.languageSetting.ok_mcom,
                   onClick: function() {
                            if(type=="delete"){
                                    Appyscript.DeleteProfilenotification();
                            }else{
                                    Appyscript.DeactivateProfilenotification();
                            }
                        }
                   },
                   {
                   text: data.languageSetting.common_cancel,
                   onClick: function() {
                    Appyscript.popupClose();
                   }
                   }
                   ]
        });
}



AppyTemplate.registerHelper('checkMail', function(value) {
if (shareData.signUpCustom.fixedFields.isHideSignEmail) {
return ""
}
else return value;
})