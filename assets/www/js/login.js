var loginServiceURL;
var callbackLogin;
var callbackLoginWithPar;
var loginLanguagSetting;
var loginFromDating = false;
var loginDataArray = [];
var formBuilderData;
var globalLoginAmount, globalLoignCurrency, globalLoginProductId, globalLoginEmailId, globalLoginPhone, globalPaymentType, globalsubsloginType;
var isPaymentProcess=false;
var paymentIdInLatest="";
var login_orderId=null;
var paymentStatus="";
var callBackStoreValue = null;
var countrynameval;
var loginButtonFlag = "false";


Appyscript.login = function(pageId){
    loginButtonFlag = "true"
    loginServiceURL=webserviceUrl+'Appuser.php';

     var username= $$("#loginid").val();
     var password= $$("#loginpass").val();

	 if($$("[id=loginpass]").length ==2){
         console.log(""+loginpass[1].value)
         username= loginid[1].value
         password= loginpass[1].value
    }

    $$(".error").removeClass("error");

    if(data.loginfield.loginSetting.phoneStatus==1 && username == ''){

        $$("#loginid").parent().addClass("error");
        Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
        return;
    }else if(data.loginfield.loginSetting.phoneStatus==0 && (username == '' || typeof username === "undefined" || !Appyscript.validateEmail(username))){

         $$("#loginid").parent().addClass("error");
         if(username=='' || typeof username === "undefined")
         {
             Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
         }else
         {
           Appyscript.alert(data.languageSetting.Sign_up_email,function(){localStorage.popup=true});
         }
        return;
    }

    else if(password=='' || typeof password === "undefined")
    {
        $$("#loginpass").parent().addClass("error");

        Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
        return;
    }

     Appyscript.requestLoginService(username,password);
     localStorage.setItem("settingProfile","profile_Setting");


}
var allowedPages;
var serviceDataval;

Appyscript.requestLoginService=function(username,password)
{

    var advanceLogin;
    paymentStatus="";
    if(window.data.loginfield.loginSetting.addvanceLogin==1){
        advanceLogin="advance";
    }else{
        advanceLogin="old";
    }

    var deviceId=Appyscript.getDeviceId();
    var tokenId=Appyscript.getDeviceToken();

    var serviceData='{"method":"login","appId":"'+appid+'","email":"'+username+'","password":"'+password+'","tokenId":"'+tokenId+'","deviceId":"'+deviceId+'","deviceType":"android","profileId":"","loginType":"'+advanceLogin+'"}';
    console.log(" loginServiceURL  "+loginServiceURL +" serviceData  "+serviceData);
    serviceData = EncryptOrDecrypt("encrypt", serviceData);
    serviceData = serviceData.replace(/\s/g, '');

    console.log("serviceData serviceDataserviceData::"+serviceData);

	if(isOnline())
    {
	Appyscript.showIndicator();

    $$.ajax({
     url: loginServiceURL,
     data: serviceData,
     type: "post",
     //321 headers: {'accessToken': deviceEncryptedToken},
     async: true,
     success: function(jsonData, textStatus)
     {
          // Appyscript.hideIndicator();
           jsonData=jsonData.trim();
           jsonData = ReturnHexDataWithSpace(jsonData);
           jsonData = EncryptOrDecrypt("decrypt", jsonData);
           //console.log(jsonData);
           var object=JSON.parse(jsonData);
           console.log("object object:login:"+JSON.stringify(object));

           localStorage.setItem("useridval",object.userId)
            //object.loginAllowedPages!=undefined &&  object.loginAllowedPages.length>0
            //data.languageSetting.groupEnable

           if(object["status"]=='failure'){
                    console.log("object object:faillll:   "+JSON.stringify(object));
                    var userStatus=object["userStatus"];
                    var paidStatus = object['paidStatus'];
                    paymentStatus=paidStatus;
                    var emailVerified = object['emailVerified'];
                    if(typeof userStatus !== "undefined" && userStatus !=null)
                    {

                        if ((userStatus == 2 || emailVerified == 0) && (data.loginfield.loginSetting.emailVarification == 1 || data.loginfield.loginSetting.authoStatus == 1 || data.loginfield.loginSetting.phoneVerification == 1)) {

                            ///New Code start
                            var getLoginKeysPair = localStorage.getItem("loginKeysPair");
                            if (!getLoginKeysPair || getLoginKeysPair == 'null')
                                getLoginKeysPair = [];
                            else
                                getLoginKeysPair = JSON.parse(getLoginKeysPair);
                            if (getLoginKeysPair.length > 0) {
                                var appIdExists = false;
                                $$.each(getLoginKeysPair, function(key, value) {
                                    if (value.appId == data.appData.appId) {
                                        value.userid = object["userId"];
                                        value.emailid = object["usermail"];
                                          value.email = object["usermail"];
                                        value.name = object["userName"];
                                        value.verifycode = object["verifyCode"];
                                        value.phone = object["phoneNo"];
                                        value.password = password;
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
                                        emailid: object["usermail"],
                                        email: object["usermail"],
                                        name: object["userName"],
                                        verifycode: object["verifyCode"],
                                        phone: object["phoneNo"],
                                        password: password
                                    };
                                    getLoginKeysPair.push(keyData);
                                }
                                localStorage.setItem("loginKeysPair", JSON.stringify(getLoginKeysPair))
                            } else {
                                 loginDataArray = [];
                                //value don't exists in local storage
                                var keyData = {
                                    appId: data.appData.appId,
                                    userid: object["userId"],
                                    emailid: object["usermail"],
                                    email: object["usermail"],
                                    name: object["userName"],
                                    verifycode: object["verifyCode"],
                                    phone: object["phoneNo"],
                                    password: password
                                };
                                loginDataArray.push(keyData);
                                localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray))
                            }

                            ///New Code Ends

                            localStorage.setItem("userid", object['userId']);
                            localStorage.setItem("emailid", object['usermail']);
                            localStorage.setItem("validateEmail", object["usermail"]);
                            localStorage.setItem("name", object['userName']);
                            localStorage.setItem("verifycode", object['verifyCode']);
                            localStorage.setItem("phone", object['phoneNo']);
                            localStorage.setItem("userId", object["userId"]);
                            localStorage.setItem("password", password)

                                Appyscript.sendVerificationMail(true);

                             return;


                        } else if (paidStatus == 2) {
                            if (data.loginfield.inp.paymentMethod == "inApp" || data.loginfield.inp.paymentMethod == "paypal_express" || data.loginfield.inp.paymentMethod == "payfast" || data.loginfield.inp.paymentMethod == "payu" || data.loginfield.inp.paymentMethod == "stripe" || data.loginfield.inp.paymentMethod =="velocity") {

                                ///New Code start
                                var getLoginKeysPair = localStorage.getItem("loginKeysPair");
                                if (!getLoginKeysPair || getLoginKeysPair == 'null')
                                    getLoginKeysPair = [];
                                else
                                    getLoginKeysPair = JSON.parse(getLoginKeysPair);
                                if (getLoginKeysPair.length > 0) {
                                    var appIdExists = false;
                                    $$.each(getLoginKeysPair, function(key, value) {
                                        if (value.appId == data.appData.appId) {
                                            value.userid = object["userId"];
                                            value.emailid = object["usermail"];
                                              value.email = object["usermail"];
                                            value.name = object["userName"];
                                            value.verifycode = object["verifyCode"];
                                            value.phone = object["phoneNo"];
                                            value.password = password;
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
                                            emailid: object["usermail"],
                                             email: object["usermail"],
                                            name: object["userName"],
                                            verifycode: object["verifyCode"],
                                            phone: object["phoneNo"],
                                            password: password
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
                                        emailid: object["usermail"],
                                         email: object["usermail"],
                                        name: object["userName"],
                                        verifycode: object["verifyCode"],
                                        phone: object["phoneNo"],
                                        password: password
                                    };
                                    loginDataArray.push(keyData);
                                    localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray))
                                }

                                ///New Code Ends

                                localStorage.setItem("userid", object['userId']);
                                localStorage.setItem("emailid", object['usermail']);
                                localStorage.setItem("validateEmail", object["usermail"]);
                                localStorage.setItem("name", object['userName']);
                                localStorage.setItem("verifycode", object['verifyCode']);
                                localStorage.setItem("phone", object['phoneNo']);
                                localStorage.setItem("userId", object["userId"]);
                                localStorage.setItem("password", password);
                                showPaymentAlert();
                                return
                            }
                      }
                      else if(userStatus==3){
                          Appyscript.alert(data.languageSetting.this_account_doesnot_exist,function(){localStorage.popup=true});

                      }else if(userStatus==4){
                           Appyscript.alert(data.languageSetting.this_account_is_inactive_block+" "+window.data.loginfield.loginSetting.userAdminEmail+".");
                      }else if(userStatus==7){
                            localStorage.setItem("userid", object['userId']);
                            var loginActiveData={}
                            $$.get("popups/login-activeStatus.html", function (template) {
                                var compiledTemplate = AppyTemplate.compile(template);
                                var html = compiledTemplate(loginActiveData);
                                Appyscript.popup(html);
                            });
                        }
                        else if(userStatus==5 && data.loginfield.loginSetting.addvanceLogin==1){
                           Appyscript.alert(data.languageSetting.you_have_exceeded_the_number_of_attemp);

                        } else if(userStatus==6){
                            Appyscript.alert(data.languageSetting.login_limit_exceeded);

                         }
                      else
                      {
                         Appyscript.alert(data.languageSetting.Invalid_user_name_or_password);
                      }
                    }
                    else
                    {
                        console.log("553535353::"+error);
                        Appyscript.alert(data.languageSetting.error);
                    }


                        Appyscript.hideIndicator();
                        return;

           }


           if(data.callback_method == undefined){
                              Appyscript.hideIndicator();

                           }

                           var payid = object.payId;
                           if(payid != undefined && payid != "undefined") {
                              localStorage.setItem("payid",payid);
                              localStorage.setItem("emailid",object['usermail']);
                              localStorage.setItem("name",object['userName']);
                              localStorage.setItem("phone",object['phoneNo']);

                              prepareewallet()

                           }



            Appyscript.hideIndicator();
	    ///New Code start
	        var rememberme= $("#rememberme");
            var remembermevalue="false";
            if (data.loginfield.loginSetting.enableRememberMe == 1 ) {

            if(rememberme)
            {
            if(rememberme.checked)
            {
                remembermevalue="true"
                localStorage.setItem("remembermevalue", remembermevalue)
            }
            }
            else
            {
                  remembermevalue="false"
                       localStorage.setItem("remembermevalue", remembermevalue)
            }
            }
                var getLoginKeysPair = localStorage.getItem("loginKeysPair");
                if (!getLoginKeysPair || getLoginKeysPair == 'null')
                    getLoginKeysPair = [];
                else
                    getLoginKeysPair = JSON.parse(getLoginKeysPair);
                if (getLoginKeysPair.length > 0) {
                    var appIdExists = false;
                    $$.each(getLoginKeysPair, function(key, value) {
                        if (value.appId == data.appData.appId) {
                            value.email = object["usermail"];
                            value.username = object["userName"];
                            value.validateEmail = object["usermail"];
                            value.emailid = object["usermail"];
                             value.email = object["usermail"];
                            value.phone = object["phoneNo"];
                            value.password = password;
                            value.userid = object["userId"];
                            value.userId = object["userId"];
                            value.profileImage = object["profileImage"];
                            value.remembermevalue = remembermevalue;
                            appIdExists = true;
                        } else {
                            if (!appIdExists)
                                appIdExists = false;
                        }
                    });
                    if (!appIdExists) {
                        var keyData = {
                            appId: data.appData.appId,
                            email: object["usermail"],
                            username: object["userName"],
                            validateEmail: object["usermail"],
                            emailid: object["usermail"],

                            phone: object["phoneNo"],
                            password: password,
                            userid: object["userId"],
                            userId: object["userId"],
                            profileImage: object["profileImage"],
                            remembermevalue: remembermevalue
                        };
                        getLoginKeysPair.push(keyData);
                    }
                    localStorage.setItem("loginKeysPair", JSON.stringify(getLoginKeysPair))
                } else {
                    var loginDataArray = [];
                    //value don't exists in local storage
                    var keyData = {
                        appId: data.appData.appId,
                        email: object["usermail"],
                        username: object["userName"],
                        validateEmail: object["usermail"],
                        emailid: object["usermail"],
                        phone: object["phoneNo"],
                        password: password,
                        userid: object["userId"],
                        userId: object["userId"],
                        profileImage: object["profileImage"],
                        remembermevalue: remembermevalue
                    };
                    loginDataArray.push(keyData);
                    localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray))
                }

                ///New Code Ends
            var iapFlag = localStorage.getItem(username);
            if(iapFlag == "true" && loginButtonFlag == "true"){
            var restoreAlert=[];
            restoreAlert.push({text: 'Restore', onClick:function(){
              //  localStorage.getItem("InAppPurchase", "false");
                loginSuccess(jsonData, password);
                //uploadTransectionDetailAfterPayment(transactionId,'hyper')
            }})
            restoreAlert.push({text: 'Cancel', onClick:function(){
               // localStorage.getItem("InAppPurchase", "false");
                loginSuccess(jsonData, password);
                //uploadTransectionDetailAfterPayment(transactionId,'hyper')
            }})
            Appyscript.modal({title:'Do you want to Restore your previous purchase.',verticalButtons: false, buttons:restoreAlert });

            }
            else{
                loginSuccess(jsonData, password);
            }

     },error: function(error) {
               Appyscript.hideIndicator();

         /*    Appyscript.alert(data.languageSetting.error);   */
			   Appyscript.alert(internetconnectionmessage,data.appData.appName);
             //console.log("Error: " + error.code + " " + error.message);
           }
     });
	  }
     else
     {
       Appyscript.alert(internetconnectionmessage,data.appData.appName);
     }

}

function loginSuccess(jsonData, password){
    //radical : hotfixed for urgent client, please remove this piece of code as it is not needed here
//    if(AppyTemplate.global.style.layout == "bottom"){
//    setTimeout(function(){
//        var size = parseInt($$(window).width() / 64);
//                                                         if (size >= newdata.home.length) {
//                                                             size = newdata.home.length;
//                                                         }
//                                                           bottomSwiper = "";
//                                                           bottomSwiper = new Swiper(".app_navigation_bottom", {
//                                                             slidesPerView: size
//                                                         });
//    })
//    }
    //radical : hotfixed Ends

  var object=JSON.parse(jsonData);
  localStorage.setItem("currentUser","false");
  localStorage.setItem("username", object["userName"]);
           localStorage.setItem("email", object["usermail"]);
           localStorage.setItem("emailid",object["usermail"]);
           localStorage.setItem("validateEmail",object["usermail"]);
           localStorage.setItem("phone", object["phoneNo"]);
           localStorage.setItem("password", password);
           localStorage.setItem("userid", object["userId"]);
           localStorage.setItem("userId", object["userId"]);
           localStorage.setItem("profileImage",object["profileImage"]);
           localStorage.setItem("emailidhyper",object["usermail"]);
           localStorage.setItem("userIdhyper",object["userId"]);
           localStorage.setItem("userFitness",object["userId"]);
           localStorage.setItem("namehyper",object["userName"]);
           localStorage.setItem("validateName",object["userName"]);
           localStorage.setItem("profileId","");

           AppyTemplate.global.loginCheck=true;
           AppyTemplate.global.email=object["usermail"];
           AppyTemplate.global.username=object["username"];
           AppyTemplate.global.Name=localStorage.getItem("username");
           useremailid=object["usermail"];
           username=object["userName"];


		   if(object["profileImage"]=="")
             {
               localStorage.setItem("profileImage",AppyTemplate.global.style.reseller+"/newui/images/user-pic-news.png");
               AppyTemplate.global.profileImage=AppyTemplate.global.style.reseller+"/newui/images/user-pic-news.png";
             }
            else
            {
               localStorage.setItem("profileImage", object["profileImage"]);
               var image=object["profileImage"];
               if(image.indexOf("http")!=-1 && (image.indexOf(".jpg")!=-1 || image.indexOf(".png")!=-1))
               {
                   AppyTemplate.global.profileImage=localStorage.getItem("profileImage");
               }
               else
               {
                AppyTemplate.global.profileImage=AppyTemplate.global.style.reseller+"/newui/images/user-pic-news.png";
               }
            }

             if(AppyTemplate.global.style.autoLoadFirstPage == "YES"){
                            if(data.login.autoLogin=='true')
                            {
                            if(data.appData.layout=='slidemenu')
                            {
                            setTimeout(function(){
                                       $$(".app_navigation_slidemenu a").eq(0).click();
                                       },500)
                            }
                            if(data.appData.layout=='slidemenu3d')
                            {
                            setTimeout(function(){
                                       $$(".app_navigation_slidemenu3d a").eq(0).click();
                                       },500)
                            }
                            if(data.appData.layout=='bottom')
                            {
                            setTimeout(function(){
                                       $$(".toolbar .app_navigation_bottom a").eq(0).click();
                                       },500)
                            }
                            }
                            }

    //  By satish for check group user
     localStorage.setItem("NwwgroupId",object.groupId);
           if(object.loginAllowedPages)
               {
                 localStorage.setItem("NewallowedPages",JSON.stringify(object.loginAllowedPages));
                 localStorage.setItem("groupIdval",object.groupId);
                 //AppyTemplate.global.groupIdval=object.groupId;
               }

       if(data.loginfield.loginSetting.groupEnable==1 && object["status"]=='success'){
                       var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|demanddelivery";
                       var nesjs=mainView.activePage.name.split("-")[0];
                       allowedPages = object.loginAllowedPages;
                       groupIdval= object.groupId;
                       function panelCondition() { if(AppyTemplate.global.style.lang!="sa"){ return $$("body").hasClass("with-panel-left-reveal"); }else{return $$("body").hasClass("with-panel-right-reveal");}}
                       if(strList.indexOf(nesjs)>=0 && !panelCondition() &&  mainView.history>2 ){data.loginfield.loginSetting.showRestricatedPage=1}else{
                       //Appyscript.popupClose();
                       createApplication("grouptest",allowedPages,groupIdval);
                       setTimeout(function(){
                        //radical commented satish code due to cart icon issue
                        //Appyscript.notificationMenu($$(".navbar"));
                            Appyscript.Enabletouch();
                       },500)


                       ////for whitescreen issue in skew layout #160871 URGENT.......URGENT #151978 URGENT MetaDropp
                       if(data.loginfield.loginSetting.groupEnable==1 && data.appData.layout=="skew")
                       {
                         mainView.router.back();
                       }
                        ////
                       setTimeout(function(){

                                           if(data.appData.layout == "bottom"){
                                               Appyscript.bottomLayout();
                                               loadNavsAnimation();
                                              $$("#app_navigation_bottom").css("display","none");
                                              $$("#app_navigation_bottom").removeClass("on");
                                              }
                                  },100)
                       return false;
                       }
        }

    // end of function group user
           pageId=localStorage.getItem("pageName");
           if(pageData==undefined || pageId == undefined || pageId=='' || pageId=="realestate" || pageId == "foodordering" || pageId == "ecommerce" || pageId == "newsstand" ||pageId == "services"||pageId == "hyperlocal"||pageId == "socialnetwork" || pageId == "demanddelivery" ){

				Appyscript.popupClose();
                if(typeof pageData !== "undefined" && typeof pageData !== "undefined" && pageData.autoLogin =='YES')
                {
                      if(pageId!="news")
                       {
                        Appyscript.changePage(pageData);
                       }

                        //localStorage.removeItem("pageName");
                }
                localStorage.removeItem("pageName");
                if(callbackLogin)
                {
                      if(callBackStoreValue!=null)
                      {
                         callbackLogin(callBackStoreValue);
                      }else
                      {
                         callbackLogin();
                      }

                }

           }else if(pageData['loginStatus']!=undefined && pageData['loginStatus']=="1"){
                submitVoteOnServer();
                Appyscript.popupClose();
                localStorage.removeItem("pageName");
           }else{
			   Appyscript.popupClose();
               //Appyscript.changePage(pageData);

			    if(callbackLogin)
               {
                   if(callBackStoreValue!=null)
                   {
                      callbackLogin(callBackStoreValue);
                   }else
                   {
                      callbackLogin();
                   }

               }
               else {
					if(pageId!="news")
						Appyscript.changePage(pageData);

               }
               localStorage.removeItem("pageName");


           }
		setTimeout(function(){
			Appyscript.notificationMenu($$(".navbar"),pageId);
			 Appyscript.Enabletouch();
		},500)

		if(pageId == "newsstand")
		{
		  setTimeout(function() {
                    oredrHistory();

                      //addToCollection("refresh");

                    }, 1000);
		}
}

Appyscript.getPayPalSignupHtml=function(paymentType, paypalId, amount, currency, requestId, successUrl, notifyUrl){

    console.log("notifyUrl===="+notifyUrl);

    var click, type;
    if(paymentType=="yearly"){
        type="Y";
        click="-subscriptions";
    }else if(paymentType=="monthly"){
        type="M";
        click="-subscriptions";
    }else{
        type="";
        click="";
    }

    var url_prefix="";
    if(paypalId=="amitjs_1300292032_biz@live.com" || paypalId=="himanshut@onsinteractive.com" || paypalId == "murli@appypie.com")
    {
        url_prefix="https://www.sandbox.";
    }else{
        url_prefix="https://www.";
    }

    console.log("paypalId===="+paypalId);
    console.log("url_prefix===="+url_prefix);
 localStorage.getItem("password");
    var paymentFor='Payment for '+window.data.appData.appName+'('+window.data.appData.appId+')';
    var paypalIdHtml= '<!DOCTYPE HTML><html><body onload="ClickButtonPaypal();"><form action="'+url_prefix+'paypal.com/cgi-bin/webscr" method="post"><!-- Identify your business so that you can collect the payments. --><input type="hidden" name="business" value="'+paypalId+'">';
    var paypalAddFormHtml='<!-- Specify a Buy Now button. -->'+
    '<input type="hidden" name="cmd" value="_xclick'+click+'">'+
    '<input type="hidden" name="lc" value="'+data.appData.paypalLang+'">' +
    '<!-- Specify details about the item that buyers will purchase. -->'+
    '<input type="hidden" name="item_name" value="'+paymentFor+'">'+
    '<input type="hidden" name="amount" value="'+amount+'">'+
    '<input type="hidden" name="a3" value="'+amount+'">'+
    '<input type="hidden" name="p3" value="1">'+
    '<input type="hidden" name="t3" value="'+type+'">'+
    '<input type="hidden" name="notify_url" value="'+notifyUrl+'">'+
    '<input type="hidden" name="src" value="1">'+
    '<input type="hidden" name="currency_code" value="'+currency+'">'+
    '<input type="hidden" name="quantity" value="1">'+
    '<input type="hidden" name="custom" value="'+ localStorage.getItem("password")+'">';
    //'<input type="hidden" name="custom" value="'+requestId+'">';+


    var PaypalUrlFormHtml='<!-- URL --><input type="hidden" name="return" value="'+successUrl+'" /><input type="hidden" name="cancel_return" value="https://gauravpaypal.com/" /><input type="hidden" name="notify_url" value="'+notifyUrl+'" /><!-- Display the payment button. --><input type="image" src="{URL}/images/subscribe_btn.png" name="submit" id="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="'+url_prefix+'paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>function ClickButtonPaypal(){$(\'#submit\').trigger(\'click\');}</script></body></html>';
    console.log("ssjsjsjsjs=======" + PaypalUrlFormHtml);
    Appyscript.hideIndicator();
    return (paypalIdHtml+paypalAddFormHtml+PaypalUrlFormHtml);
}

/***
*Payfast*
****/
Appyscript.getPayfastSignupHtml = function(paymentType, merchantId, merchantKey, amount, currency, requestId, successUrl, cancelUrl, notifyUrl, payFastUsername, payFastEmail, payFastproductName, payFastproductDescrip, frequencyData, cyclesData, type, signature) {
    console.log("notifyUrl====" + notifyUrl);
//    console.log("cancelllll======" + cancelUrl)
//    alert("dffffdff");
    var click, type;
    if (paymentType == "yearly") {
        type = "Y";
        click = "-subscriptions";
    } else if (paymentType == "monthly"){
        type = "M";
        click = "-subscriptions";
    } else {
        type = "onetime";
        click = "";
    }

    var url_prefix = "";
    if (merchantId == "10005646" || merchantId == "10007323") {
        url_prefix = "https://sandbox.payfast.co.za";
        //https://sandbox.payfast.co.za/eng/process
    } else {
        url_prefix = "https://www.payfast.co.za";
    }

    console.log("merchantId====" + merchantId);
    console.log("url_prefix====" + url_prefix);

    var paymentFor = 'Payment for ' + window.data.appData.appName + '(' + window.data.appData.appId + ')';
    var paypalIdHtml = '<!DOCTYPE HTML><html><body onload="ClickButtonPayFast();"><form action="' + url_prefix + '/eng/process" method="post"><!-- Identify your business so that you can collect the payments. --><input name="merchant_id" type="hidden" value="' + merchantId + '" /><input name="merchant_key" type="hidden" value="' + merchantKey + '" />';
    var paypalAddFormHtml = '<!-- Specify a Buy Now button. -->' +
            '<!-- Specify details about the item that buyers will purchase. -->' +
            '<input name="name_first" value="' + localStorage.getItem("payFastName") + '"  type="hidden"/>' +
            '<input name="name_last"  type="hidden" value="" />' +
            '<input name="email_address" value="' + localStorage.getItem("payFastEmail") + '" type="hidden"/>' +
            '<input name="amount" type="hidden" value="' + amount + '"/>' +
            '<input name="item_name" type="hidden"value="' + payFastproductName + '"/>' +
            '<input name="subscription_type" type="hidden" value="1" />'+
            '<input name="frequency" type="hidden" value="' +frequencyData+ '" />'+
            '<input name="cycles" type="hidden" value="'+ cyclesData +'" />'+
            '<input name="signature" type="hidden" value="'+signature+'" />';

    var PaypalUrlFormHtml = '<!-- URL --><input type="hidden" name="return_url" value="' + successUrl + '" /><input name="cancel_url" type="hidden" value="' + cancelUrl + '" /><input type="hidden" name="notify_url" value="' + notifyUrl + '" /><!-- Display the payment button. --><input type="image" src="{URL}/images/subscribe_btn.png" name="submit" id="submit" alt="PayFast - The safer, easier way to pay online!"></form><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>function ClickButtonPayFast(){$(\'#submit\').trigger(\'click\');}</script></body></html>';
    console.log("paypalAddFormHtml      " + paypalAddFormHtml +"  paypalIdHtml "+ paypalIdHtml +" PaypalUrlFormHtml "+ PaypalUrlFormHtml);

    return (paypalIdHtml + paypalAddFormHtml + PaypalUrlFormHtml);
}

/**********************
ONETIME PAYFAST
***********************/

Appyscript.getPayfastSignupHtmlOneTime = function(paymentType, merchantId, merchantKey, amount, currency, requestId, successUrl, cancelUrl, notifyUrl, payFastUsername, payFastEmail, payFastproductName, payFastproductDescrip, frequencyData, cyclesData, type, signature) {
    console.log("notifyUrl====" + notifyUrl);
    var click, type;
    if (paymentType == "yearly") {
        type = "Y";
        click = "-subscriptions";
    } else if (paymentType == "monthly") {
        type = "M";
        click = "-subscriptions";
    } else {
        type = "onetime";
        click = "";
    }

    var url_prefix = "";
    if (merchantId == "10005646" || merchantId == "10007323") {
        url_prefix = "https://sandbox.payfast.co.za";
        // https://sandbox.payfast.co.za/eng/process
    } else {
        url_prefix = "https://www.payfast.co.za";
    }

    console.log("merchantId====" + merchantId);
    console.log("url_prefix====" + url_prefix);

    var paymentFor = 'Payment for ' + window.data.appData.appName + '(' + window.data.appData.appId + ')';
    var paypalIdHtml = '<!DOCTYPE HTML><html><body onload="ClickButtonPayFast();"><form action="' + url_prefix + '/eng/process" method="post"><!-- Identify your business so that you can collect the payments. --><input name="merchant_id" type="hidden" value="' + merchantId + '" /><input name="merchant_key" type="hidden" value="' + merchantKey + '" />';

    var paypalAddFormHtml = '<!-- Specify a Buy Now button. -->' +
            '<!-- Specify details about the item that buyers will purchase. -->' +
            '<input name="name_first" value="Abcd"  type="hidden"/>' +
            '<input name="name_last"  type="hidden" placeholder="Last Name" />' +
            '<input name="email_address" value="amit.kr@onsinteractive.com" type="hidden"/>' +
            '<input name="m_payment_id" type="hidden" value="8542"/>' +
            '<input name="amount" type="hidden" value="' + amount + '"/>' +
            '<input name="item_name" type="hidden"value="' + payFastproductName + '"/>';

    var PaypalUrlFormHtml = '<!-- URL --><input type="hidden" name="return_url" value="' + successUrl + '" /><input name="cancel_url" type="hidden" value="' + cancelUrl + '" /><input type="hidden" name="notify_url" value="' + notifyUrl + '" /><!-- Display the payment button. --><input type="image" src="{URL}/images/subscribe_btn.png" name="submit" id="submit" alt="PayFast - The safer, easier way to pay online!"><img alt="" border="0" src="' + url_prefix + 'paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>function ClickButtonPayFast(){$(\'#submit\').trigger(\'click\');}</script></body></html>';
    console.log("paypalAddFormHtml      " + paypalAddFormHtml);
    return (paypalIdHtml + paypalAddFormHtml + PaypalUrlFormHtml);
}
function proceedforFacebookPayment(fb_id,name,email,gender,dob)
{
     var loginServiceURL= webserviceUrl+'Appypie.php';
     var serviceData='{"method":"getUserByFacebookId","appId":"'+appid+'","profileId":"'+fb_id+'"}';
      $$.ajax({
              url: loginServiceURL,
              data: serviceData,
              type: "post",
              //321 headers: {'accessToken': deviceEncryptedToken},
              success: function(jsonData, textStatus ){

                    if(JSON.parse(jsonData).status=="success")
                      {
                      isPaymentDone=true;
                      Appyscript.signupFacebook(fb_id, name, email,gender,dob);
                      }
                    else
                    {
                       showPaymentAlert();
                    }
              }
              });
}

var logintype="normal",fb_name,fb_iid,fb_email,fb_gender,fb_dob;
Appyscript.signupFacebook=function(fb_id, name, email,gender,dob,profile_pic){

 if(isOnline())  {

     logintype="faceboookLogin";
     fb_name=name;fb_iid=fb_id;fb_email=email;fb_gender=gender,fb_dob=dob;



  //  localStorage.setItem("profile_pic_facebook",profile_pic)

    downloadFacebookImage(fb_id);


    loginServiceURL=webserviceUrl+'Appuser.php';

     console.log("fb_id========="+fb_id)
    Appyscript.showIndicator();
    var advanceLogin;
    if(window.data.loginfield.loginSetting.addvanceLogin==1){
        advanceLogin="advance";
    }else{
        advanceLogin="old";
    }


            imageFD.append("name",name);
            imageFD.append("actionType","userRegistrationSave");
            imageFD.append("password","12345678");
            imageFD.append("email",email);
            imageFD.append("appId",appid);
            imageFD.append("appName",data.appData.appName);
            imageFD.append("appOnwerEmail",window.data.loginfield.loginSetting.userAdminEmail);
            imageFD.append("phone","");
            imageFD.append("formData","");
            imageFD.append("formFields","");
            imageFD.append("formLabel","");
            imageFD.append("profileId",fb_id);
            imageFD.append("loginType",advanceLogin);
            imageFD.append("lang",Appyscript.getDefaultLanguage());
             imageFD.append("autoApproved",data.loginfield.loginSetting.autoApproved);
			imageFD.append("deviceId",Appyscript.getDeviceId());
            imageFD.append("deviceToken",Appyscript.getDeviceToken());
            imageFD.append("deviceType","Android");

            if(data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast" || data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"){

                        imageFD.append("paymentStatus",2);

                    }else{
                        imageFD.append("paymentStatus",0);

                    }

            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", function(){

            }, false);
            xhr.addEventListener("load", function(evt){

            var object=JSON.parse(evt.currentTarget.response);

            console.log("object object  facebook kweherfiwergjworwui :::"+JSON.stringify(object));
            localStorage.setItem("useridval",object.userId)
            console.log("hsdhfgsdgfsdhgfdhsgfhsdfghsdgfhsdgfhdsgfdhs:::::::::::::::::::::   "+localStorage.getItem("useridval"))
             var paidStatus=object["paidStatus"];
               var userStatus=object["userStatus"];
               console.log("userStatus  value is ===="+userStatus)
                 if(object['status']=="failure" && paidStatus!=2){



                        if(typeof userStatus !== "undefined" && userStatus !=null)
                        {

                           if(userStatus== 5)
                          {
                              Appyscript.alert(data.languageSetting.this_account_is_inactive_block+" "+window.data.loginfield.loginSetting.userAdminEmail);

                          }
                          else
                          {

                               Appyscript.alert(data.languageSetting.error);
                          }

                        }
                        else
                        {
                           Appyscript.alert(data.languageSetting.Unable_to_register);
                        }

                         Appyscript.hideIndicator();
                         return;

                     }



                     localStorage.setItem("username", object["name"]);
                     localStorage.setItem("email", object["email"]);
                     localStorage.setItem("phone", object["phone"]);
                     localStorage.setItem("password", "12345678");
                     localStorage.setItem("userid", object["userId"]);
                     localStorage.setItem("userId", object["userId"]);
                     localStorage.setItem("name",object['name']);
                     localStorage.setItem("emailid", object["email"]);
                     localStorage.setItem("validateEmail",object["usermail"]);
                     localStorage.setItem("isform","member");
                     localStorage.setItem("FBusername", name);
                     localStorage.setItem("FBemail", email);
                     localStorage.setItem("fbgender", gender);
                     localStorage.setItem("fbdob", dob);
                     localStorage.setItem("profileId", fb_id);
                     AppyTemplate.global.loginCheck=true;
                     AppyTemplate.global.email= object["email"];
                     AppyTemplate.global.username= object["name"];

                             if(AppyTemplate.global.style.autoLoadFirstPage == "YES"){
                                if(data.login.autoLogin=='true')
                                {
                                if(data.appData.layout=='slidemenu')
                                {
                                setTimeout(function(){
                                           $$(".app_navigation_slidemenu a").eq(0).click();
                                           },500)
                                }
                                if(data.appData.layout=='slidemenu3d')
                                {
                                setTimeout(function(){
                                           $$(".app_navigation_slidemenu3d a").eq(0).click();
                                           },500)
                                }
                                if(data.appData.layout=='bottom')
                                {
                                setTimeout(function(){
                                           $$(".toolbar .app_navigation_bottom a").eq(0).click();
                                           },500)
                                }
                                }
                            }
                                                  var payid = object.payId;
                                                  if(payid != undefined && payid != "undefined") {
                                                  localStorage.setItem("payid",payid);
                                                  localStorage.setItem("emailid",object['email']);
                                                  localStorage.setItem("name",object['name']);
                                                  localStorage.setItem("phone",object['phone']);

                                                  prepareewallet()

                                                  }


                      ///New Code start
                                                 var getLoginKeysPair = localStorage.getItem("loginKeysPair");
                                                 if (!getLoginKeysPair || getLoginKeysPair == 'null')
                                                     getLoginKeysPair = [];
                                                 else
                                                     getLoginKeysPair = JSON.parse(getLoginKeysPair);
                                                 if (getLoginKeysPair.length > 0) {
                                                     var appIdExists = false;
                                                     $$.each(getLoginKeysPair, function(key, value) {
                                                         if (value.appId == data.appData.appId) {
                                                             value.userid = object["userId"];
                                                             value.emailid = object["email"];
                                                             value.name = object["phone"];
                                                              value.email= object["email"],
                                                             value.verifycode = object["verifyCode"];
                                                             value.phone = object["phone"];
                                                             value.password = '12345678';
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
                                                             emailid: object["email"],
                                                             email: object["email"],
                                                             name: object["phone"],
                                                             verifycode: object["verifyCode"],
                                                             phone: object["phone"],
                                                             password: password
                                                         };
                                                         getLoginKeysPair.push(keyData);
                                                     }
                                                     localStorage.setItem("loginKeysPair", JSON.stringify(getLoginKeysPair))
                                                 } else {
                                                      loginDataArray = [];
                                                     //value don't exists in local storage
                                                     var keyData = {
                                                         appId: data.appData.appId,
                                                         userid: object["userId"],
                                                         emailid: object["email"],
                                                         email: object["email"],
                                                         name: object["userName"],
                                                         verifycode: object["verifyCode"],
                                                         phone: object["phoneNo"],
                                                         password: '12345678'
                                                     };
                                                     loginDataArray.push(keyData);
                                                     localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray))
                                                 }

                                                 ///New Code Ends


                    if(userStatus==5)
                     {
                      Appyscript.alert(data.languageSetting.this_account_is_inactive_block+" "+window.data.loginfield.loginSetting.userAdminEmail);
                      Appyscript.hideIndicator();
                      return false;
                     }



                      ////   by satish   for user permission
                         localStorage.setItem("groupIdval",object.groupId);
                       // AppyTemplate.global.groupIdval=object.groupId;
                                     // console.log("object object  AppyTemplate.global.groupIdval :::"+AppyTemplate.global.groupIdval);

                                                   console.log("object userStatus ===="+userStatus);
                                          if(data.loginfield.loginSetting.groupEnable == 1)
                                               {
                                                   if(userStatus == 1)
                                                   {

                                                   Appyscript.notificationprofile("groupval");
                                                   return false;
                                                   }
//                                                    if(userStatus == 6)
//                                                          {
//
//                                                          Appyscript.popupClose();
//                                                          return false;
//                                                          }


                                              }

                                                   ////   by satish   for user permission



                        if(object["profileImage"]=="")
                          {

                                 localStorage.setItem("profileImage",AppyTemplate.global.style.reseller+"/newui/images/user-pic-news.png");
                                 AppyTemplate.global.profileImage=AppyTemplate.global.style.reseller+"/newui/images/user-pic-news.png";
                          }
                         else
                         {
                                 localStorage.setItem("profileImage", object["profileImage"]);
                                 AppyTemplate.global.profileImage=object["profileImage"];
                         }


                  if(paidStatus == 2 && (data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"))
                     {

                            showPaymentAlert();
                            return
                     }

                            closePopupOnFacebook();

//  By satish for check group user
     localStorage.setItem("NwwgroupId",object.groupId);
           if(object.loginAllowedPages)
               {
                 localStorage.setItem("NewallowedPages",JSON.stringify(object.loginAllowedPages));
                   localStorage.setItem("groupIdval",object.groupId);
                }


               if(data.loginfield.loginSetting.groupEnable==1 && object["status"]=='success')
               {
                 var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|demanddelivery";
                 var nesjs=mainView.activePage.name.split("-")[0];
               allowedPages = object.loginAllowedPages;
               groupIdval= object.groupId;
               function panelCondition() { if(AppyTemplate.global.style.lang!="sa"){ return $$("body").hasClass("with-panel-left-reveal"); }else{return $$("body").hasClass("with-panel-right-reveal");}}
               if(strList.indexOf(nesjs)>=0 && !panelCondition() && mainView.history>2){data.loginfield.loginSetting.showRestricatedPage=1}else{
               //Appyscript.popupClose();
              // strList.indexOf(nesjs)>=0 && !panelCondition() && mainView.history>2
               createApplication("grouptest",allowedPages,groupIdval);

               return false;
               }
               }



    // end of function group user




            }
            , false);
            xhr.addEventListener("error", function(){
                Appyscript.hideIndicator();
				Appyscript.alert(data.languageSetting.error);
            }, false);
            xhr.addEventListener("abort", function()
            {
                   // Appyscript.showIndicator();
            }, false);
            xhr.open("POST", webserviceUrl+"AppuserRegister.php");
          //321  xhr.setRequestHeader("accessToken", deviceEncryptedToken);

            xhr.send(imageFD);

           imageFD = new FormData();

      }
      else
      {
           Appyscript.alert(internetconnectionmessage,data.appData.appName);
      }
}

function closePopupOnFacebook()
{
             pageId=localStorage.getItem("pageName");
                        if(pageData==undefined || pageId == undefined || pageId=='')
                        {
                            Appyscript.popupClose();

                        }else if(pageData['loginStatus']!=undefined && pageData['loginStatus']=="1")
                        {
                             submitVoteOnServer();
                             Appyscript.popupClose();
                             localStorage.removeItem("pageName");

                        }else
                        {

                            Appyscript.popupClose();
                         //   Appyscript.changePage(pageData);
                            //localStorage.removeItem("pageName");
                        }
                        Appyscript.hideIndicator();
                       Appyscript.notificationMenu($$(".navbar"));

}

Appyscript.forgotPassword=function(){
 if(isOnline())
            {

		if(data.loginfield.loginSetting.addvanceLogin)
           {
                 Appyscript.ldapForgetPassword(false);
                  return;

           }
 loginServiceURL=webserviceUrl+'Appuser.php';
 var email=document.getElementById("forpasid").value;

    $$(".error").removeClass("error");
    if(email == '' || email==undefined || !Appyscript.validateEmail(email)){

         $$("#forpasid").parent().addClass("error");

           if(email=='' || typeof email === "undefined")
           {
                Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
           }else
           {
                Appyscript.alert(data.languageSetting.Sign_up_email,function(){localStorage.popup=true});
           }


        return;
    }

    var serviceData='{"method":"appUserForgotPassword","email":"'+email+'","appId":"'+appid+'","appName":"'+data.appData.appName+'","adminEmail":"'+window.data.loginfield.loginSetting.userAdminEmail+'","logoName":"","locale":"'+Appyscript.getDefaultLanguage()+'"}';
    serviceData = EncryptOrDecrypt("encrypt", serviceData);
    serviceData = serviceData.replace(/\s/g, '');
    Appyscript.showIndicator();
    $$.ajax({
         url: loginServiceURL,
         data: serviceData,
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},
         success: function(jsonData, textStatus ){
               Appyscript.hideIndicator();
               jsonData=jsonData.trim();
               jsonData = ReturnHexDataWithSpace(jsonData);
               jsonData = EncryptOrDecrypt("decrypt", jsonData);
               var object=JSON.parse(jsonData);



                if(object["status"]=="failure")
                {
                        if(object["userStatus"]== 0)
                        {
                            $$("#forpasid").parent().addClass("error");
                          Appyscript.alert(data.languageSetting.this_account_doesnot_exist,function(){localStorage.popup=true});

                        }
                       else if(object["userStatus"]== 2)
                        {
                               $$("#forpasid").parent().addClass("error");
                             Appyscript.alert(data.languageSetting.this_account_is_inactive_block+" "+window.data.loginfield.loginSetting.userAdminEmail);
                        } else
                        {

                           Appyscript.alert(data.languageSetting.error);
                         }

               }else
               {
                  if(object["status"]=="success" && object["userStatus"]== 1)
                   {
                        Appyscript.popupPage('login');
                     Appyscript.alert(data.languageSetting.system_generated_password_has_been_sent_to+" "+email,  window.data.appData.appName);
                   }else
                   {
                      Appyscript.alert(data.languageSetting.error, window.data.appData.appName);
                   }

               }



         },error: function(error) {
                 Appyscript.hideIndicator();
                 Appyscript.alert(data.languageSetting.error);
                 //console.log("Error: " + error.code + " " + error.message);
               }
         });
          }
          else
          {
             Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
          }
}

var paypalHtmlData_login="";
var isPaymentDone=false;
var countryCode="";
var pNo="";
var email;
Appyscript.addUser=function(){
 if(isOnline())
     {

        loginServiceURL=webserviceUrl+'Appuser.php';
        paymentStatus="";

        var name=document.getElementById("fname").value;
        pNo=document.getElementById("pNo").value;
        email=document.getElementById("emailId").value;
        var password=document.getElementById("pass").value;
        var cpass=document.getElementById("cpass").value;
        var scountrycode="";
        if(document.getElementById("scountrycode") !=undefined && document.getElementById("scountrycode")==null)
        {
           scountrycode=document.getElementById("scountrycode").value;
        }

        console.log("scountrycode scountrycode:"+scountrycode);
		if(document.getElementById("scountrycode"))
        {
          countryCode=document.getElementById("scountrycode").value;
        }

        console.log("==== country code is : " + countryCode);
        $$(".error").removeClass("error");

        if(name==undefined || name==''){
            $$("#fname").parent().addClass("error");
            Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }
        if(email==undefined || email==''|| !Appyscript.validateEmail(email)){
            $$("#emailId").parent().addClass("error");
            if(email=='')
            {
               Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
            }else
            {
              Appyscript.alert(data.languageSetting.Sign_up_email,function(){localStorage.popup=true});
            }

            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }

		if (data.loginfield.loginSetting.phoneVerification==1 || data.loginfield.loginSetting.phoneStatus==1)
        {
                if(pNo=='')
                 {
                     $$("#pNo").parent().addClass("error");
                     Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
                      $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
                      return;
				}


        }
        else if(data.loginfield.loginSetting.phoneStatus==1)
        {
                    $$("#pNo").parent().addClass("error");
                    Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
                    $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
                    return;
        }

  if(AppyTemplate.global.loginData.loginSetting.phoneWithCountryCode  == '1')
        {
        countryCode=document.getElementById("scountrycode").value;

        if(countryCode==undefined || countryCode=='')
        {

           $$("#pNo").parent().addClass("error");
                            Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
                            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
                            return;
           // pNo=document.getElementById("pNo").value;

        }
        else
        {
             console.log("==== country code null nhi h");
              pNo = pNo;
             console.log("==== country code null nhi h pNo "  + pNo);

        }

         localStorage.setItem("countryCodeVal",countryCode);
        }

        else
        {
           pNo=document.getElementById("pNo").value;
         }


        if(password==undefined || password=='' || !Appyscript.checkPassword(password,"true")){
            $$("#pass").parent().addClass("error");
            if(password==undefined || password=='')
            {
              Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
            }else
            {
               Appyscript.alert(data.languageSetting.please_enter_password_mcom,function(){localStorage.popup=true});
            }
            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }
		if(password.length<8){
                       $$("#pass").parent().addClass("error");
                       Appyscript.alert(data.languageSetting.Sign_up_password_should_be_seven_char,function(){localStorage.popup=true});
                       $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
                       return;

         }

        if(cpass==undefined  || cpass=='' || cpass!=password){
            $$("#cpass").parent().addClass("error");
            if(password==undefined || password=='')
            {
              Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
            }else
            {
               Appyscript.alert(data.languageSetting.Sign_up_password_do_not_match,function(){localStorage.popup=true});
            }
            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }
         loginLanguagSetting=data;
       // var customData=Appyscript.getCustomFormData();
	    var customData=Appyscript.getCustomFormDataSignup();

        if(!customData.flag){
            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }

        if(data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"){

            imageFD.append("paymentStatus",2);
            savedImageFD.append("paymentStatus",2);
        }else{
            imageFD.append("paymentStatus",0);
            savedImageFD.append("paymentStatus",0);
        }

        if(data.loginfield.loginSetting.addvanceLogin==1){
            imageFD.append("addvanceLogin","advance");
            savedImageFD.append("addvanceLogin","advance");
        }else{
            imageFD.append("addvanceLogin","old");
            savedImageFD.append("addvanceLogin","old");
        }

        var formLabel=Appyscript.convertStringToJson(customData.label);
        var formData=Appyscript.convertStringToJson(customData.value);
        var formFields=Appyscript.convertStringToJson(customData.type);
        var jsonFormDetails=customData.jsonInputField;

        Appyscript.showIndicator();

        imageFD.append("actionType","userRegistrationSave");
        imageFD.append("appId",appid);
        imageFD.append("appName",data.appData.appName);
        imageFD.append("name",name);
        imageFD.append("email",email);
        imageFD.append("password",password);
        imageFD.append("phone",pNo);
        imageFD.append("countryCode",countryCode);

        savedImageFD.append("actionType","userRegistrationSave");
        savedImageFD.append("appId",appid);
        savedImageFD.append("appName",data.appData.appName);
        savedImageFD.append("name",name);
        savedImageFD.append("email",email);
        savedImageFD.append("password",password);
        savedImageFD.append("phone",pNo);
        savedImageFD.append("countryCode",countryCode);

        if(data.loginfield.loginSetting.authoStatus==0){
            imageFD.append("formLabel",JSON.stringify(formLabel));
            imageFD.append("formData",JSON.stringify(formData));
            imageFD.append("formFields",JSON.stringify(formFields));
                imageFD.append("addMoreFields",JSON.stringify(jsonFormDetails));
        }else{
            savedImageFD.append("formLabel",JSON.stringify(formLabel));
            savedImageFD.append("formData",JSON.stringify(formData));
            savedImageFD.append("formFields",JSON.stringify(formFields));
                savedImageFD.append("addMoreFields",JSON.stringify(jsonFormDetails));
        }

        imageFD.append("verifyStatus","1");
        imageFD.append("profileId","");
        imageFD.append("deviceId",Appyscript.getDeviceId());
        imageFD.append("deviceToken",Appyscript.getDeviceToken());
        imageFD.append("deviceType","Android");
        imageFD.append("saveStatus",0);
        imageFD.append("appOnwerEmail",window.data.loginfield.loginSetting.userAdminEmail);
        imageFD.append("lang",Appyscript.getDefaultLanguage());
        imageFD.append("authorizedEmail",data.loginfield.loginSetting.authoStatus);
        imageFD.append("phoneVarification",data.loginfield.loginSetting.phoneVerification);
        imageFD.append("accountSid",data.loginfield.loginSetting.accountSid);
        imageFD.append("authToken",data.loginfield.loginSetting.authToken);
        imageFD.append("fromNumber",data.loginfield.loginSetting.fromNumber);
        imageFD.append("smsTextMessage",data.loginfield.loginSetting.smsTextMessage);
        imageFD.append("userRegistrationStatus",data.loginfield.loginSetting.userRegistrationStatus);


        imageFD.append("uniquePhone",data.loginfield.loginSetting.phoneStatus);
        imageFD.append("emailVarification",data.loginfield.loginSetting.emailVarification);

        savedImageFD.append("verifyStatus","1");
        savedImageFD.append("profileId","");
        savedImageFD.append("deviceId",Appyscript.getDeviceId());
        savedImageFD.append("deviceToken",Appyscript.getDeviceToken());
        savedImageFD.append("deviceType","Android");
        savedImageFD.append("saveStatus",0);
        savedImageFD.append("appOnwerEmail",window.data.loginfield.loginSetting.userAdminEmail);
        savedImageFD.append("lang",Appyscript.getDefaultLanguage());
        savedImageFD.append("authorizedEmail",data.loginfield.loginSetting.authoStatus);

        savedImageFD.append("phoneVarification",data.loginfield.loginSetting.phoneVerification);
        savedImageFD.append("accountSid",data.loginfield.loginSetting.accountSid);
        savedImageFD.append("authToken",data.loginfield.loginSetting.authToken);
        savedImageFD.append("fromNumber",data.loginfield.loginSetting.fromNumber);
        savedImageFD.append("smsTextMessage",data.loginfield.loginSetting.smsTextMessage);
        savedImageFD.append("userRegistrationStatus",data.loginfield.loginSetting.userRegistrationStatus);

		if(data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity")
		{
               imageFD.append("autoApproved",0);
            savedImageFD.append("autoApproved",0);

		}else{

                imageFD.append("autoApproved",data.loginfield.loginSetting.autoApproved);
			 savedImageFD.append("autoApproved",data.loginfield.loginSetting.autoApproved);

		}

        savedImageFD.append("uniquePhone",data.loginfield.loginSetting.phoneStatus);
        savedImageFD.append("emailVarification",data.loginfield.loginSetting.emailVarification);
        paymentIdInLatest="";


        var xhr = new XMLHttpRequest();/**/
        xhr.upload.addEventListener("progress", uploadProgressLogin, false);
        xhr.addEventListener("load", uploadCompleteLogin, false);
        xhr.addEventListener("error", uploadFailedLogin, false);
        xhr.addEventListener("abort", uploadCanceledLogin, false);
        xhr.open("POST", webserviceUrl+"AppuserRegister.php");
      //321  xhr.setRequestHeader("accessToken", deviceEncryptedToken);

        if(data.loginfield.loginSetting.authoStatus==1)
        {
            savedImageFD.set("saveStatus",1);
        }else
        {
            savedImageFD=new FormData();
            $$("#frthlist").val("");
        }

        xhr.send(imageFD);

        imageFD = new FormData();
        imageFDFlag=false;
        imageIndex=1;
        }
         else
         {
              Appyscript.alert(internetconnectionmessage,data.appData.appName);
          }
          localStorage.setItem("settingProfile","profile_Setting");
}




    function uploadProgressLogin(evt) {

    }

    function uploadCompleteLoginAgain(evt) {

             Appyscript.hideIndicator();
             //console.log(evt);
             var jsonData=JSON.parse(evt.currentTarget.response);

             //console.log("jsonData jsonData:uploadCompleteLoginAgain::"+JSON.stringify(jsonData));
             var paymentStatus=jsonData['paidStatus'];

             if(jsonData['status']=="failure" && paymentStatus != "2"){
                Appyscript.alert(data.languageSetting.error);
                return;
             }

         if(jsonData['status']=="failure" && paymentStatus == "3" ||  jsonData['status']=="failure" && paymentStatus == "2" ){
                              Appyscript.alert(internetconnectionmessage, jsonData['msg']);
                             return;
           }







                      if(data.loginfield.loginSetting.autoApproved==1)
                      {
                        localStorage.setItem("emailidd",jsonData['email']);
                           if(paymentStatus == "2" && (data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"))
                            {

                                    //new code//
                                     var getLoginKeysPair = localStorage.getItem("loginKeysPair");
                                     if (!getLoginKeysPair || getLoginKeysPair == 'null')
                                         getLoginKeysPair = [];
                                     else
                                         getLoginKeysPair = JSON.parse(getLoginKeysPair);
                                     if (getLoginKeysPair.length > 0) {
                                         var appIdExists = false;
                                         $$.each(getLoginKeysPair, function(key, value) {
                                             if (value.appId == data.appData.appId) {
                                                 value.userid = jsonData["userId"];
                                                 value.userId = jsonData["userId"];
                                                 value.emailid = jsonData["email"];
                                                 value.email = jsonData["email"];
                                                 value.name = jsonData["name"];
                                                 value.verifycode = jsonData["verifycode"];
                                                 value.password = jsonData['password'];
                                                 value.phone = jsonData["phone"];
                                                 appIdExists = true;
                                             } else {
                                                 if (!appIdExists)
                                                     appIdExists = false;
                                             }
                                         });
                                         if (!appIdExists) {
                                             var keyData = {
                                                 appId: data.appData.appId,
                                                 userid: jsonData["userId"],
                                                 userId: jsonData["userId"],
                                                 emailid: jsonData["email"],
                                                  email: jsonData["email"],
                                                 name: jsonData["name"],
                                                 verifycode: jsonData["verifycode"],
                                                 password: jsonData['password'],
                                                 phone: jsonData["phone"]
                                             };
                                             getLoginKeysPair.push(keyData);
                                         }
                                         localStorage.setItem("loginKeysPair", JSON.stringify(getLoginKeysPair))
                                     } else {
                                         var loginDataArray = [];
                                         //value don't exists in local storage
                                         var keyData = {
                                             appId: data.appData.appId,
                                             userid: jsonData["userId"],
                                             userId: jsonData["userId"],
                                             emailid: jsonData["email"],
                                             email: jsonData["email"],
                                             name: jsonData["name"],
                                             verifycode: jsonData["verifycode"],
                                             password: jsonData['password'],
                                             phone: jsonData["phone"]
                                         };
                                         loginDataArray.push(keyData);
                                         localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray));
                                     }
                                    //end code//

                                  localStorage.setItem("userid",jsonData['userId']);
                                  localStorage.setItem("userId", jsonData["userId"]);
                                  localStorage.setItem("emailid",jsonData['email']);
                                  localStorage.setItem("validateEmail",jsonData["usermail"]);
                                  localStorage.setItem("name",jsonData['name']);
                                  localStorage.setItem("verifycode",jsonData['verifyCode']);
                                  localStorage.setItem("password",jsonData['password']);
                                  localStorage.setItem("phone",jsonData['phone']);
                                  Appyscript.popupPage('login');


                                 showPaymentAlert();
                            }else
                            {
                               Appyscript.requestLoginService(jsonData['email'],jsonData['password']);
                                return;
							}
                         // return;

                       }
                       else{
                                 if(paymentStatus == "2" && (data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"))
                                  {

                                        //new code//
                                        var getLoginKeysPair = localStorage.getItem("loginKeysPair");
                                        if (!getLoginKeysPair || getLoginKeysPair == 'null')
                                            getLoginKeysPair = [];
                                        else
                                            getLoginKeysPair = JSON.parse(getLoginKeysPair);
                                        if (getLoginKeysPair.length > 0) {
                                            var appIdExists = false;
                                            $$.each(getLoginKeysPair, function(key, value) {
                                                if (value.appId == data.appData.appId) {
                                                    value.userid = jsonData["userId"];
                                                    value.userId = jsonData["userId"];
                                                    value.emailid = jsonData["email"];
                                                     value.email = jsonData["email"];
                                                    value.name = jsonData["name"];
                                                    value.verifycode = jsonData["verifycode"];
                                                    value.password = jsonData['password'];
                                                    value.phone = jsonData["phone"];
                                                    appIdExists = true;
                                                } else {
                                                    if (!appIdExists)
                                                        appIdExists = false;
                                                }
                                            });
                                            if (!appIdExists) {
                                                var keyData = {
                                                    appId: data.appData.appId,
                                                    userid: jsonData["userId"],
                                                    userId: jsonData["userId"],
                                                    emailid: jsonData["email"],
                                                     email: jsonData["email"],
                                                    name: jsonData["name"],
                                                    verifycode: jsonData["verifycode"],
                                                    password: jsonData['password'],
                                                    phone: jsonData["phone"]
                                                };
                                                getLoginKeysPair.push(keyData);
                                            }
                                            localStorage.setItem("loginKeysPair", JSON.stringify(getLoginKeysPair))
                                        } else {
                                            var loginDataArray = [];
                                            //value don't exists in local storage
                                            var keyData = {
                                                appId: data.appData.appId,
                                                userid: jsonData["userId"],
                                                userId: jsonData["userId"],
                                                emailid: jsonData["email"],
                                                  email: jsonData["email"],
                                                name: jsonData["name"],
                                                verifycode: jsonData["verifycode"],
                                                password: jsonData['password'],
                                                phone: jsonData["phone"]
                                            };
                                            loginDataArray.push(keyData);
                                            localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray));
                                        }
                                        //end code//

                                        localStorage.setItem("userid",jsonData['userId']);
                                        localStorage.setItem("userId", jsonData["userId"]);
                                        localStorage.setItem("emailid",jsonData['email']);
                                         localStorage.setItem("validateEmail",jsonData["usermail"]);
                                        localStorage.setItem("name",jsonData['name']);
                                        localStorage.setItem("verifycode",jsonData['verifyCode']);
                                        localStorage.setItem("password",jsonData['password']);
                                        localStorage.setItem("phone",jsonData['phone']);
                                        Appyscript.popupPage('login');

                                       showPaymentAlert();

                                       //return;
                                 }else
                                 {
                                 Appyscript.alert(data.languageSetting.you_have_successfully_completed_the_verification_process ,data.appData.appName,function(){localStorage.popup=true});
                                 Appyscript.popupPage('login');
                                }
                         }



           $$("form")[0].reset();
                   $$("form .select-file").each(function(){
                      $$(this).find("font").text($$(this).find("font").attr("data-val"));
                   });
    }

    function uploadCompleteLogin(evt) {

         Appyscript.hideIndicator();
         //console.log(evt);
         var jsonData=JSON.parse(evt.currentTarget.response);
               localStorage.setItem("userid",jsonData['userId']);
               localStorage.setItem("userId", jsonData["userId"]);
                localStorage.setItem("emailid",jsonData['email']);
                localStorage.setItem("validateEmail",jsonData["usermail"]);
                  localStorage.setItem("name",jsonData['name']);
                  localStorage.setItem("verifycode",jsonData['verifyCode']);
                  localStorage.setItem("password",jsonData['password']);
                  localStorage.setItem("phone",jsonData['phone']);
          console.log("jsonData jsonData:uploadCompleteLogin::"+jsonData['email']);

                              localStorage.setItem("userIdstripe", jsonData["userId"]);
                              localStorage.setItem("emailidstripe",jsonData['email']);
                               localStorage.setItem("passwordstripe",jsonData['password']);

             var paidStatus = jsonData['paidStatus']
             var userStatus = jsonData['userStatus']
                      var paidStatus = jsonData['paidStatus']
                         if(jsonData['status']=="failure" && userStatus == "3"){

                                                     Appyscript.alert(jsonData['msg'], appnameglobal_allpages);
                                                  return;
                                               }

                       if(jsonData['status']=="failure" && userStatus == "2" ){
                                                             Appyscript.alert(jsonData['msg'], appnameglobal_allpages);
                                                               return;
                                                            }

                       if(jsonData['status']=="failure" && userStatus == "0" ){
                                                             Appyscript.alert(jsonData['msg'], appnameglobal_allpages);
                                                               return;
                                                            }
         if(jsonData['status']=="failure" && paidStatus!=2)
         {
           // Appyscript.alert(jsonData['msg']);
              var userStatus=jsonData["userStatus"];

                                if(typeof userStatus !== "undefined" && userStatus !=null)
                                {

                                  if(userStatus==2)
                                  {
                                    Appyscript.alert(data.languageSetting.Email_id_already_exists),function(){localStorage.popup=true};


                                  }else if(userStatus==3)
                                  {
                                      Appyscript.alert(data.languageSetting.phone_already_exists),function(){localStorage.popup=true};

                                  }else if(userStatus==4)
                                    {
                                       Appyscript.alert(data.languageSetting.User_already_registered+" with Facebook id");
                                    }
                                  else if(userStatus==0)
                                  {
                                     Appyscript.alert(data.languageSetting.User_already_registered);
                                  }

                                }
                                else
                                {

                                  Appyscript.alert(data.languageSetting.Unable_to_register);

                                }

                        return;
         }

         //NEW CODE//
          var getLoginKeysPair = localStorage.getItem("loginKeysPair");
          if (!getLoginKeysPair || getLoginKeysPair == 'null')
              getLoginKeysPair = [];
          else
              getLoginKeysPair = JSON.parse(getLoginKeysPair);
          if (getLoginKeysPair.length > 0) {
              var appIdExists = false;
              $$.each(getLoginKeysPair, function(key, value) {
                  if (value.appId == data.appData.appId) {
                      value.userid = jsonData["userId"];
                      value.userId = jsonData["userId"];
                      value.emailid = jsonData["email"];
                          value.email = jsonData["email"];
                      value.name = jsonData["name"];
                      value.verifycode = jsonData["verifycode"];
                      value.password = jsonData['password'];
                      value.phone = jsonData["phone"];
                      appIdExists = true;
                  } else {
                      if (!appIdExists)
                          appIdExists = false;
                  }
              });
              if (!appIdExists) {
                  var keyData = {
                      appId: data.appData.appId,
                      userid: jsonData["userId"],
                      userId: jsonData["userId"],
                      emailid: jsonData["email"],
                       email: jsonData["email"],
                      name: jsonData["name"],
                      verifycode: jsonData["verifycode"],
                      password: jsonData['password'],
                      phone: jsonData["phone"]
                  };
                  getLoginKeysPair.push(keyData);
              }
              localStorage.setItem("loginKeysPair", JSON.stringify(getLoginKeysPair))
          } else {
              var loginDataArray = [];
              //value don't exists in local storage
              var keyData = {
                  appId: data.appData.appId,
                  userid: jsonData["userId"],
                  userId: jsonData["userId"],
                  emailid: jsonData["email"],
                   email: jsonData["email"],
                  name: jsonData["name"],
                  verifycode: jsonData["verifycode"],
                  password: jsonData['password'],
                  phone: jsonData["phone"]
              };
              loginDataArray.push(keyData);
              localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray));
          }
         //END CODE//

         paymentStatus=paidStatus;
         var emailVerify=jsonData['emailVerify'];



            if(data.loginfield.loginSetting.emailVarification==1 || data.loginfield.loginSetting.authoStatus==1 || data.loginfield.loginSetting.phoneVerification == 1){

              if(paymentStatus == "2" && emailVerify==1 && (data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"))
                 {
                    Appyscript.popupPage('login');
                     showPaymentAlert();
                     return;

                 }else
                 {
                    popLoginnArraylist();
                   Appyscript.popupPage('email-verification');

                 }

            }
            else if(data.loginfield.loginSetting.autoApproved==1){

                if(paymentStatus == "2" && (data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"))
                 {
                    Appyscript.popupPage('login');
                    showPaymentAlert();
                 }else
                 {
                    Appyscript.requestLoginService(jsonData['email'],jsonData['password']);
                 }

               return;
            }
            else{

                   if(paymentStatus == "2" && (data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payfast"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"))
                   {
                        Appyscript.popupPage('login');
                        showPaymentAlert();
                        return;
                  }else
                  {
                     Appyscript.popupPage('login');
                  }
               }

                if((data.loginfield.loginSetting.emailVarification==1 || data.loginfield.loginSetting.authoStatus ==1 ) && data.loginfield.loginSetting.phoneVerification == 1)
                {
                     Appyscript.alert(data.languageSetting.verification_code_has_been_sent_to+" "+localStorage.getItem("phone")+ " & "+localStorage.getItem("emailid") , window.data.appData.appName,function(){localStorage.popup=true});
                }
                else if(data.loginfield.loginSetting.phoneVerification == 1)
                {
                  Appyscript.alert(data.languageSetting.verification_code_has_been_sent_to+" "+localStorage.getItem("phone") , window.data.appData.appName,function(){localStorage.popup=true});
                }
                else if(data.loginfield.loginSetting.emailVarification==1)
                {
                    Appyscript.alert(data.languageSetting.verification_code_has_been_sent_to+" "+localStorage.getItem("emailid") ,  window.data.appData.appName,function(){localStorage.popup=true});
                }
                 else if (jsonData['status'] == "success")
                 {
                   Appyscript.alert(data.languageSetting.Registered_successfully, window.data.appData.appName,function(){localStorage.popup=true});
                 }
                else {
                   Appyscript.alert(jsonData['msg'],window.data.appData.appName,function(){localStorage.popup=true});
                 }
        // }

         $$("form")[0].reset();
         $$("form .select-file").each(function(){
            $$(this).find("font").text($$(this).find("font").attr("data-val"));
         });
    }

    function uploadFailedLogin(evt) {
         Appyscript.hideIndicator();
         Appyscript.alert("Image uploading failed.");
    }

    function uploadCanceledLogin(evt) {
         Appyscript.hideIndicator();
         Appyscript.alert("Image uploading cancel.");
    }
var customAlert;
function showPaymentAlert(){
     var paymentStr='';

 if(loginFromDating)
    {
      paymentStr+=''+pageData.oneTimeSubscriptionPrice+'('+pageData.oneTimeSubscriptionCurrency+' '+pageData.editionPrice+'),';
    }

else
    {
    if(data.loginfield.inp.subsPriceYearly){
        paymentStr+=''+data.languageSetting.yearly+' ('+data.loginfield.inp.subsCurrencyYearly+' '+data.loginfield.inp.subsPriceYearly+'),'
    }
     if(data.loginfield.inp.subsPriceMonthly){
        paymentStr+=''+data.languageSetting.monthly+' ('+data.loginfield.inp.subsCurrencyMonthly+' '+data.loginfield.inp.subsPriceMonthly+'),'
     }
     if(data.loginfield.inp.editionPrice){
        paymentStr+=''+data.languageSetting.one_time+' ('+data.loginfield.inp.editionCurrency+' '+data.loginfield.inp.editionPrice+'),'
     }
}

            var paymentArr = paymentStr.split(",");
            var paymentList=[];

            $$.each(paymentArr, function(index, value){
                    if(value.trim() == "") {
                    return false;
                    }

                    var a;

                    if(value.indexOf(data.languageSetting.yearly)!=-1)
                    a ={text: ''+value+'', click:function(){
                     if(customAlert) {
                        customAlert.hide();
                     }
                     openPaymentPage("yearly")}}
//                    a ={text: ''+value+'', onClick:function(){openPaymentPage("yearly")}}
                    else if(value.indexOf(data.languageSetting.monthly)!=-1)
                    a ={text: ''+value+'', click:function(){
                        if(customAlert) {
                            customAlert.hide();
                        }
                        openPaymentPage("monthly")}
                       }
//                    a ={text: ''+value+'', onClick:function(){openPaymentPage("monthly")}}
                    else if(value.indexOf(data.languageSetting.one_time)!=-1)
                    a ={text: ''+value+'', click:function(){
                        if(customAlert) {
                            customAlert.hide();
                        }openPaymentPage("onetime")}}
//                    a ={text: ''+value+'', onClick:function(){openPaymentPage("onetime")}}

                    paymentList.push(a);
                });

//            paymentList.push({
//                           "text": data.languageSetting.common_cancel,
//                           "onClick": function(){
//                            Appyscript.hideIndicator();
//                            clearAllDataOfLoginUser();
//                           }
//                           });

           data.languageSetting.yearly = "Yearly";
           data.languageSetting.monthly = "Monthly";
           if(data.loginfield.inp.paymentMethod =="inApp"){
                var descTxt = data.loginfield.inp.termconditionSub;
                try{
                if(descTxt){
                    if(!descTxt.length > 0){
                        descTxt = data.loginfield.inp.termconditionOnetime;
                    }
                }else{
                    descTxt = data.loginfield.inp.termconditionOnetime;
                }
                }catch(err){
                    console.log("Terms and Condition Error : "+err);
                }
                if(!customAlert) {
                    customAlert = customPopup({
                        text: descTxt,
                        buttons: paymentList
                    });
                }

                customAlert.show();
//                Appyscript.modal({
//                             title: data.languageSetting.payment_type,
//                             text: descTxt,
//                             verticalButtons: true,
//                             buttons:paymentList
//                             });
            }else  if(data.loginfield.inp.paymentMethod =="payu")
                     {           paymentStr =''+data.languageSetting.one_time+' ('+data.loginfield.inp.editionCurrency+' '+data.loginfield.inp.editionPrice+'),'
                         var paymentArr = paymentStr.split(",");
                         var paymentListPayU=[];
                         var a;
                         $$.each(paymentArr, function(index, value){
                                 if(value.trim() == "") {
                                 return false;
                                 }
                                 if(value.indexOf(data.languageSetting.one_time)!=-1)
                                 a ={text: ''+value+'', click:function(){
                                 if(customAlert) {
                                 customAlert.hide();
                                 }openPaymentPage("onetime")}}
                                 paymentListPayU.push(a);
                                 });
                         if(!customAlert) {
                             customAlert = customPopup({
                                                       buttons: paymentListPayU
                                                       });
                         }
                         customAlert.show();

                                   }
            else  if(data.loginfield.inp.paymentMethod =="velocity")
             {           paymentStr =''+data.languageSetting.one_time+' ('+data.loginfield.inp.editionCurrency+' '+data.loginfield.inp.editionPrice+'),'
                         var paymentArr = paymentStr.split(",");
                         var paymentListVelocity=[];
                         var a;
                         $$.each(paymentArr, function(index, value){
                                             if(value.trim() == "") {
                                             return false;
                                             }
                         if(value.indexOf(data.languageSetting.one_time)!=-1)
                                                 a ={text: ''+value+'', click:function(){
                                                     if(customAlert) {
                                                         customAlert.hide();
                                                     }openPaymentPage("onetime")}}
                             paymentListVelocity.push(a);
                              });
                             if(!customAlert) {
                                                 customAlert = customPopup({
                                                 buttons: paymentListVelocity
                                                 });
                                              }
                             customAlert.show();

                 } else {
                 if(!customAlert) {
                    customAlert = customPopup({
                        buttons: paymentList
                    });
                 }

                 customAlert.show();
//                Appyscript.modal({
//                             title: data.languageSetting.payment_type,
//                             verticalButtons: true,
//                             buttons:paymentList
//                             });
            }

}

var googleType;
function openPaymentPage(paymentType){
    var amount, currency, productId, type, frequencyData, cyclesData;
    if(paymentType=="yearly"){
        amount=data.loginfield.inp.subsPriceYearly;
        currency=data.loginfield.inp.subsCurrencyYearly;
        type="Y";
        frequencyData=6;
        cyclesData=1;
        productId=data.loginfield.inp.inapYearlySub;
        globalPaymentType="Yearly";
    }else if(paymentType=="monthly"){
        amount=data.loginfield.inp.subsPriceMonthly;
        currency=data.loginfield.inp.subsCurrencyMonthly;
        type="M";
        productId=data.loginfield.inp.inapMonthlySub;
        globalPaymentType="monthly";
        frequencyData=3;
        cyclesData=1;
    }else{
        amount=data.loginfield.inp.editionPrice;
        currency=data.loginfield.inp.editionCurrency;
        type="onetime";
        globalPaymentType="One Time";
        productId=data.loginfield.inp.anppAddProductId
    }

     //var requestId=(new Date().getTime()).toString(36);
     var new_date=new Date().getTime();
       login_orderId='app_'+new_date;

    if(data.loginfield.inp.paymentMethod =="paypal_express"){

         globalLoginAmount=amount;
         globalLoignCurrency=currency;
         globalLoginProductId=productId;

      // var htmlData=Appyscript.getPayPalHtml(paymentType, data.loginfield.inp.businessId, amount, currency, login_orderId, site_url+"/paypalmobile/successsignup", site_url+"/paypalmobile/sign-up-notify/appId/"+window.data.appData.appId+"/subscriptionPeriod/"+type);
        var htmlData=Appyscript.getPayPalSignupHtml(paymentType, data.loginfield.inp.businessId, amount, currency, login_orderId, site_url+"/paypalmobile/successsignup", site_url+"/paypalmobile/sign-up-notify-pay-pal/appId/"+window.data.appData.appId+"/userId/"+localStorage.getItem("userid")+"/subscriptionPeriod/"+type+"/userStatus/"+data.loginfield.loginSetting.autoApproved );


       if(pageData){
        if(pageData.pageTitle)
            Appyscript.openPaypal(htmlData,"login",pageData.pageTitle);
         else
            Appyscript.openPaypal(htmlData,"login",data.appData.appName);
       }
       else
         Appyscript.openPaypal(htmlData,"login",data.appData.appName);

    }else if (data.loginfield.inp.paymentMethod == "payfast"){
         globalLoginAmount = amount;
         globalLoignCurrency = currency;
         globalLoginProductId = productId;
         if(paymentType == "onetime"){
          var htmlData = Appyscript.getPayfastSignupHtmlOneTime(paymentType, data.loginfield.inp.payfastMerchantId, data.loginfield.inp.payfastMerchantKey, amount, currency, login_orderId, site_url+"/paypalmobile/payfast-success", site_url+"/paypalmobile/payfast-cancel", site_url+"/paypalmobile/signup-notify-pay-fast/appId/" + window.data.appData.appId + "/userId/" + localStorage.getItem("userid") + "/subscriptionPeriod/" + type+"/userStatus/"+data.loginfield.loginSetting.autoApproved, localStorage.getItem("name"), localStorage.getItem("emailid"), "UserLogin", "",frequencyData ,cyclesData,type);
                  if (pageData) {
                      if (pageData.pageTitle)
                          Appyscript.openPayFast(htmlData, "login", pageData.pageTitle);
                      else
                          Appyscript.openPayFast(htmlData, "login", data.appData.appName);
                  } else
                      Appyscript.openPayFast(htmlData, "login", data.appData.appName);
         }else{
              createSignatureForPast(paymentType, data.loginfield.inp.passphrase, data.loginfield.inp.payfastMerchantId, data.loginfield.inp.payfastMerchantKey, amount, currency, login_orderId, site_url+"/paypalmobile/payfast-success", site_url+"/paypalmobile/payfast-cancel", site_url+"/paypalmobile/signup-notify-pay-fast/appId/" + window.data.appData.appId + "/userId/" + localStorage.getItem("userid") + "/subscriptionPeriod/" + type+"/userStatus/"+data.loginfield.loginSetting.autoApproved, localStorage.getItem("name"), localStorage.getItem("emailid"), "UserLogin", "",frequencyData ,cyclesData,type);
         }
     }
    else if(data.loginfield.inp.paymentMethod == "payu"){
        var new_date=new Date().getTime();
        login_orderId='app_'+new_date;
        globalLoginAmount=amount;
        globalLoignCurrency=currency;
        globalLoginProductId=productId;
        Appyscript.openPayuView(amount, login_orderId,window.data.appData.appId, "FirstName" ,"LastName" ,"Email" ,"Phone" ,data.loginfield.inp.merchantId,data.loginfield.inp.secretKey,site_url ,"Login");
    }else if(data.loginfield.inp.paymentMethod == "stripe"){
             var new_date=new Date().getTime();
             login_orderId='app_'+new_date;
             globalLoginAmount=amount;
             globalLoignCurrency=currency;
             globalLoginProductId=productId;
             globalsubsloginType=type;
             Appyscript.popupPage('paymentlogin');
         }
         else if(data.loginfield.inp.paymentMethod =="velocity")
             {

                 var new_date=new Date().getTime();
                 login_orderId='app_'+new_date;

                 globalLoginAmount=amount;
                 globalLoignCurrency=currency;
                 globalLoginProductId=productId;
                 globalsubsloginType=type;

                 var velocitytoken, applicationProfile_Id, merchantProfile_Id, workflow_Id, identity_token, applicationLicense_Id,key;
                 applicationLicense_Id = data.loginfield.inp.velocityApplicationLicence;
                     if (applicationLicense_Id != "") {

                                 if ((data.loginfield.inp.paymentMethod) == "velocity" && data.loginfield.inp.velocityApplicationLicence != undefined) {
                                     Appyscript.callAzureApi('1', data.loginfield.inp.paymentMethod, data.loginfield.inp.velocityApplicationLicence);
                                   }

                            Appyscript.popupPage('paymentloginvel');

                     } else {
                        Appyscript.popupPage('paymentloginvel');

                     }



             }
    else{

            if(type!="onetime")
            {
               type="subscription";
            }

              var new_date=new Date().getTime();
              login_orderId='app_'+new_date;

              globalLoginAmount=amount;
              globalLoignCurrency=currency;
              googleType=type;
              var userId = localStorage.getItem("userId");

              Appyscript.paymentViaGoogleIAP(productId, data.loginfield.inp.publicKey, type, "login","","","", userId, appid);

       }
}


//******************************* ON CLICK OF PAYNOW FROM STRIPE *******************************//
function stripePaymentOnNativeSideLogin(creditCardType) {
     // alert("321424");
       Appyscript.showIndicator();
    var creditCardJSON;
    creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripe');
    //  var card_type=creditCardJSON.card_type;
    var cnumber = creditCardJSON.cardNumber;
    var expairyMonth = creditCardJSON.expairyMonth;
    var expairyYear = creditCardJSON.expairyYear;
    var cHolder = creditCardJSON.cardHolder;
    var cvvCode = creditCardJSON.cvvCode;
    var card_type = Appyscript.validateCardType(cnumber);

    if (isNaN(cnumber) || cnumber.length < 15) {
        Appyscript.hideIndicator();
        //Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
        Appyscript.alert("Mandatory fields missing");
        return null;

    } else if (expairyMonth == null || expairyMonth == '') {
        Appyscript.hideIndicator();
        //Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_month);
        Appyscript.alert("Please enter valid Expiry Month");
        return null;
    } else if (expairyYear == null || expairyYear == '') {
        Appyscript.hideIndicator();
        //Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year);
        Appyscript.alert("Please enter valid Expiry Month");
        return null;

    } else if (!isNaN(cHolder) || cHolder == null || cHolder == '') {
        Appyscript.hideIndicator();
        //Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_card_holder_name);
        Appyscript.alert("Please enter valid card holder name");
        return null;

    } else if (isNaN(cvvCode) || cvvCode.length < 3 || cvvCode == '') {
        Appyscript.hideIndicator();
        //Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code);
        Appyscript.alert("Please enter valid cvv code");
        return null;

    }
    var cHolder1 = cHolder.split(" ");
    var lastName = cHolder1[1];
    var firstName = cHolder1[0];
    if (lastName == '' || lastName == null) {
        lastName = '';
    }
    var new_date = new Date().getTime();
    var orderId = 'app_' + new_date;
    Appyscript.showIndicator();
    Appyscript.goForCreditCardPayment(cnumber, expairyMonth, expairyYear, cvvCode, firstName + " " + lastName,
        globalLoginAmount, orderId, data.loginfield.inp.stripePublicKey, data.loginfield.inp.stripeSecretKey,
        globalLoignCurrency, data.appData.owneremail, "login");
}

/****************************** STRIPE CALLBACK FUNCTION ********************************/
function loginpaymentByStripeinjs(token, totalAmount, cunrcy, orderId, discriptionn, pageType) {
console.log("token "+token +" totalAmount "+ totalAmount +" cunrcy "+cunrcy +"  orderId "+orderId + " discriptionn "+discriptionn +" pageType "+ pageType)
    var totalAmount = (parseFloat(totalAmount))
    var email = localStorage.getItem("emailidstripe");
    if(localStorage.getItem("userId") != " " || localStorage.getItem("emailid") != " "){
    console.log("test              "+ localStorage.getItem("userId"));
        //appId , UserId, userStatus, passwrd, stripeClientId, stripeScretKey, subscriptionType, tokenId, email, description, currency, amount, orderId
        var SavecardLoginUrl = site_url + '/notify/loginstripepayment/appid/' + window.data.appData.appId + '/userId/' + localStorage.getItem("userIdstripe") + '/userStatus/' + data.loginfield.loginSetting.autoApproved + '/passwrd/' + localStorage.getItem("passwordstripe") + '/stripeClientId/' + data.loginfield.inp.stripeSecretKey + '/stripeScretKey/' + data.loginfield.inp.stripePublicKey + '/subscriptionType/' + globalsubsloginType + '/tokenId/' + token + '/email/' + email + '/description/583380/currency/' + cunrcy + '/amount/' + totalAmount + '/orderId/' + orderId;
        console.log("Savecard...........    "+ SavecardLoginUrl);
        $$.ajax({
            type: 'GET',
            url: SavecardLoginUrl,
            dataType: 'json',
            success: function(data) {
                console.log(SavecardLoginUrl);
                console.log("SavecardLogin   "+ JSON.stringify(data));
                //{transaction_id: "ch_1APQcoH0v6qh6ANIDj80OrWe", customer_id: "cus_AkdumJRvPtH5QY", status: "succeeded"}
                if (data.status == "succeeded" || data.status == "active") {
                    console.log("jffjfjjf  " +data.status)
                    customeridGlobalFoodcourt = data.customer_id;
                    callbackAfterPaymentOnSingup("success",data.transaction_id);
                     //Appyscript.popupClose();
                } else if (data.status == "fail" && data.exception) {
                    Appyscript.alert(data.exception, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }
            },
            error: function(data) {
            console.log("fail stripe ...........    ");
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }else{
        console.log("fail userId ...........    ");
        Appyscript.hideIndicator();
        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
    }
}

function createSignatureForPast(paymentType, passPhrase, merchantId, merchantKey, amount, currency, requestId, successUrl, cancelUrl, notifyUrl, payFastUsername, payFastEmail, payFastproductName, payFastproductDescrip, frequencyData, cyclesData,type) {
    if (isOnline()) {
        localStorage.setItem("payFastName",localStorage.getItem("name"));
        localStorage.setItem("payFastEmail",localStorage.getItem("emailid"));
        loginPyaFastURL = webserviceUrl + 'AppuserSetting.php';
         var fieldData = {
             "merchant_id": merchantId,
             "merchant_key": merchantKey,
             "return_url": successUrl,
             "cancel_url": cancelUrl,
             "notify_url": notifyUrl,
             "name_first": localStorage.getItem("name"),
             "name_last": "",
             "email_address": localStorage.getItem("emailid"),
             "amount": amount,
             "item_name": payFastproductName,
             "subscription_type": 1,
             "frequency": frequencyData,
             "cycles": cyclesData
         }

        var abc = JSON.stringify(fieldData);
        var serviceData = '{"method":"createSignature","fieldData":' + abc + ', "passphrase": "'+passPhrase+'"}';
        console.log("serviceDatahwghdgwgd wyhdfgqwgduwd::  " + serviceData +"  loginServiceURL  "+loginServiceURL);

        Appyscript.showIndicator();
        $$.ajax({
            url: loginPyaFastURL,
            data: serviceData,
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(jsonData, textStatus) {
                Appyscript.hideIndicator();
                var jsonDData = JSON.parse(jsonData);
                console.log("jsonDDataaaa:   "+JSON.stringify(jsonDData)+"  sig   "+jsonDData.signature);
                if (jsonDData.status == "success") {
                    var htmlData = Appyscript.getPayfastSignupHtml(paymentType, data.loginfield.inp.payfastMerchantId, data.loginfield.inp.payfastMerchantKey, amount, currency, login_orderId, site_url + "/paypalmobile/payfast-success", site_url + "/paypalmobile/payfast-cancel", site_url + "/paypalmobile/signup-notify-pay-fast/appId/" + window.data.appData.appId + "/userId/" + localStorage.getItem("userid") + "/subscriptionPeriod/" + type + "/userStatus/" + data.loginfield.loginSetting.autoApproved, localStorage.getItem("username"), localStorage.getItem("email"), "UserLogin", "", frequencyData, cyclesData, type, jsonDData.signature);

                    if (pageData) {
                        if (pageData.pageTitle)
                            Appyscript.openPayFast(htmlData, "login", pageData.pageTitle);
                        else
                            Appyscript.openPayFast(htmlData, "login", data.appData.appName);
                    } else
                        Appyscript.openPayFast(htmlData, "login", data.appData.appName);
                }
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(data.languageSetting.error);
            }
        });
    } else {
        Appyscript.alert(internetconnectionmessage, data.appData.appName);
    }
}


Appyscript.confirmVerifyUserEmail=function(){
if(isOnline()){
{localStorage.popup=true};
    loginServiceURL=webserviceUrl+'Appuser.php';

    var code=document.getElementById("code").value;
     $$(".error").removeClass("error");

    var validCode=localStorage.getItem("verifycode");
    if(code==undefined || code=='' || code != validCode){
        $$("#code").parent().addClass("error");

        if(code==undefined || code=='')
        {

           Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank),function(){localStorage.popup=true};

        }else
        {
            Appyscript.alert(data.languageSetting.oops_verification_code_doesnt_match),function(){localStorage.popup=true};

        }
       {localStorage.popup=true};
        return;
    }

    if(data.loginfield.loginSetting.authoStatus==1){
        Appyscript.showIndicator();
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgressLogin, false);
        xhr.addEventListener("load", uploadCompleteLoginAgain, false);
        xhr.addEventListener("error", uploadFailedLogin, false);
        xhr.addEventListener("abort", uploadCanceledLogin, false);
        xhr.open("POST", webserviceUrl+"AppuserRegister.php");

     //321   xhr.setRequestHeader("accessToken", deviceEncryptedToken);
        xhr.send(savedImageFD);
        savedImageFD=new FormData();
        return;
    }
    var verifyType="email";
    if(data.loginfield.loginSetting.phoneVerification == 1){
        verifyType="phone";
    }
    var autoStatus=0;
    if(data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity")
    		{
    		   authoStatus=0;
    		}else{
                 authoStatus=window.data.loginfield.loginSetting.autoApproved
    		}
    var emailId=localStorage.getItem("emailid");
    var serviceData='{"method":"confirmVerifyUserEmail","email":"'+emailId+'","appId":"'+appid+'","verifyType":"'+verifyType+'","status":"'+authoStatus+'"}';
    serviceData = EncryptOrDecrypt("encrypt", serviceData);
    serviceData = serviceData.replace(/\s/g, '');
    Appyscript.showIndicator();
    $$.ajax({
         url: loginServiceURL,
         data: serviceData,
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},
         async: true,
         success: function(jsonData, textStatus ){
            Appyscript.hideIndicator();
            jsonData=jsonData.trim();
            jsonData = ReturnHexDataWithSpace(jsonData);
            jsonData = EncryptOrDecrypt("decrypt", jsonData);
            var json_data=JSON.parse(jsonData);
            console.log("json_data emailVerification:::"+JSON.stringify(json_data));
            if(json_data['status']=="success"){
             //var paymentStatus="2";//json_data["paymentStatus"]
            if(data.loginfield.loginSetting.autoApproved==1){
                  if(paymentStatus == "2" && (data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"))
                  {
                       Appyscript.popupPage('login');
                       setTimeout(function()
                       {
                         showPaymentAlert();
                      }, 300)
                  }
                 else{
                       Appyscript.requestLoginService(localStorage.getItem("emailid"),localStorage.getItem("password"));
                  }
                   return;
            }
                  if(paymentStatus == "2" && (data.loginfield.inp.paymentMethod =="inApp"|| data.loginfield.inp.paymentMethod =="paypal_express"|| data.loginfield.inp.paymentMethod =="payu" || data.loginfield.inp.paymentMethod =="stripe" || data.loginfield.inp.paymentMethod =="velocity"))
                  {
                        Appyscript.popupPage('login');
                        setTimeout(function(){
                          showPaymentAlert();
                        }, 300)
                            return;
                 }else{
                    Appyscript.popupPage('login');
                 }
                 if(loginDataArray.length>0)
                                 {
                                 localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray));
                                 }
                Appyscript.alert(data.languageSetting.you_have_successfully_completed_the_verification_process ,window.data.appData.appName);
            }else{
                      popLoginnArraylist();
                      Appyscript.alert(data.languageSetting.oops_verification_code_doesnt_match);
            }
         },error: function(error) {
             Appyscript.hideIndicator();
             Appyscript.alert(data.languageSetting.error);
             //console.log("Error: " + error.code + " " + error.message);
         }
    });
    }
   else{
        Appyscript.alert(internetconnectionmessage,data.appData.appName);
     }
}


Appyscript.sendVerificationMail=function(isOpenPage){
if(isOnline()){
    loginServiceURL=webserviceUrl+'Appuser.php';

    var verifyCode=localStorage.getItem("verifycode");
    var emailId=localStorage.getItem("emailid");
    var name=localStorage.getItem("name");
    var password=localStorage.getItem("password");
    var phone=localStorage.getItem("phone");

    var serviceData='{"method":"sendVerificationMail","verifyCode":"'+verifyCode+'","email":"'+emailId+
                    '","password":"'+password+'","name":"'+name+'","appId":"'+appid+'","appName":"'+data.appData.appName+
                    '","phoneVarification":"'+data.loginfield.loginSetting.phoneVerification+
                    '","accountSid":"'+data.loginfield.loginSetting.accountSid+
                    '","authToken":"'+data.loginfield.loginSetting.authToken+
                    '","fromNumber":"'+data.loginfield.loginSetting.fromNumber+
                    '","smsTextMessage":"'+data.loginfield.loginSetting.smsTextMessage+
                    '","phone":"'+phone+
                    '","adminEmail":"'+window.data.loginfield.loginSetting.userAdminEmail+'","lang":"'+Appyscript.getDefaultLanguage()+'"}';

    serviceData = EncryptOrDecrypt("encrypt", serviceData);
    serviceData = serviceData.replace(/\s/g, '');
      console.log("serviceDatahwghdgwgd wyhdfgqwgduwd::"+serviceData);
    Appyscript.showIndicator();

    $$.ajax({
         url: loginServiceURL,
         data: serviceData,
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},
         async: true,
         success: function(jsonData, textStatus ){
            Appyscript.hideIndicator();
            jsonData=jsonData.trim();
            jsonData = ReturnHexDataWithSpace(jsonData);
            jsonData = EncryptOrDecrypt("decrypt", jsonData);
            var json_data=JSON.parse(jsonData);



                    if((data.loginfield.loginSetting.emailVarification==1 || data.loginfield.loginSetting.authoStatus ==1 ) && data.loginfield.loginSetting.phoneVerification == 1)
                    {
                       Appyscript.alert(data.languageSetting.verification_code_has_been_sent_to+" "+phone+ " & "+emailId , window.data.appData.appName,function(){localStorage.popup=true});
                    }
                    else if(data.loginfield.loginSetting.phoneVerification == 1)
                    {
                        Appyscript.alert(data.languageSetting.verification_code_has_been_sent_to+" "+phone , window.data.appData.appName,function(){localStorage.popup=true});
                    }
                    else if(data.loginfield.loginSetting.emailVarification==1)
                    {
                        Appyscript.alert(data.languageSetting.verification_code_has_been_sent_to+" "+emailId ,  window.data.appData.appName,function(){localStorage.popup=true});
                    } else
                    {
                          Appyscript.alert(data.languageSetting.Registered_successfully, window.data.appData.appName,function(){localStorage.popup=true});
                    }

                       if(isOpenPage)
                         {
                             popLoginnArraylist();
                             Appyscript.popupPage('email-verification');
                         }

         },error: function(error) {
             Appyscript.hideIndicator();
             // resLoginData();
             clearAllDataOfLoginUser();
                 Appyscript.alert(data.languageSetting.error);
         }
    });
    }
     else{
         Appyscript.alert(internetconnectionmessage,data.appData.appName);
     }
}

Appyscript.resetPassword=function(){
 if(isOnline()){
    loginServiceURL=webserviceUrl+'Appuser.php';

    var oldPassword=document.getElementById("password").value;
    var newPassword=document.getElementById("newpassword").value;
    var confirmpassword=document.getElementById("confirmpassword").value;

    $$(".error").removeClass("error");

   if(oldPassword==undefined || oldPassword==''){
           $$("#password").parent().addClass("error");
           Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
           return;
       }

       if(newPassword==undefined || newPassword=='' || !Appyscript.checkPassword(newPassword, "true")){
           $$("#newpassword").parent().addClass("error");
           if(newPassword==undefined || newPassword=='')
           {
               Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
           }else
           {
             Appyscript.alert(data.languageSetting.please_enter_password_mcom);
           }
           return;
       }

	   if (newPassword.length < 8)
	   {
			$$("#newpassword").parent().addClass("error");
		   Appyscript.alert(data.languageSetting.Sign_up_password_should_be_seven_char,function(){localStorage.popup=true});
			 return;

        }

       if(confirmpassword==undefined || confirmpassword=='' || confirmpassword != newPassword){
           $$("#confirmpassword").parent().addClass("error");
                   if(confirmpassword==undefined || confirmpassword=='')
                   {
                      Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
                   }else
                   {
                      Appyscript.alert(data.languageSetting.Sign_up_password_do_not_match,function(){localStorage.popup=true});
                   }
           return;
       }

        if(oldPassword != localStorage.getItem("password"))
                   {
                      $$("#password").parent().addClass("error");
                        Appyscript.alert(data.languageSetting.you_have_entered_wrong_current_password,function(){localStorage.popup=true});
                        return;
                   }

       if(oldPassword==newPassword){
       $$("#newpassword").parent().addClass("error");
           Appyscript.alert(data.languageSetting.new_password_cant_be_same_as_previous_password);
           return;
       }

    var userId=localStorage.getItem("userid");

    var advanceLogin;
    if(window.data.loginfield.loginSetting.addvanceLogin==1){
        advanceLogin="advance";
    }else{
        advanceLogin="old";
    }

    var serviceData='{"method":"changePassword","userId":"'+userId+'","cpassword":"'+oldPassword+'","password":"'+newPassword+'","'+advanceLogin+'":"advance","appId":"'+appid+'","appName":"'+data.appData.appName+'","adminEmail":"'+window.data.loginfield.loginSetting.userAdminEmail+'","lang":"'+Appyscript.getDefaultLanguage()+'"}';
    serviceData = EncryptOrDecrypt("encrypt", serviceData);
    serviceData = serviceData.replace(/\s/g, '');
    Appyscript.showIndicator();

    $$.ajax({
         url: loginServiceURL,
         data: serviceData,
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},
         async: true,
         success: function(jsonData, textStatus ){
            Appyscript.hideIndicator();
            jsonData=jsonData.trim();
            jsonData = ReturnHexDataWithSpace(jsonData);
            jsonData = EncryptOrDecrypt("decrypt", jsonData);
            var json_data=JSON.parse(jsonData);
            if(json_data['status']=="success"){
                Appyscript.popupPage('login');
                Appyscript.alert(data.languageSetting.your_password_has_been_successfully_changed ,window.data.appData.appName);
            }else{
              Appyscript.alert(data.languageSetting.oops_password_cant_be_change ,window.data.appData.appName);
            }
         },error: function(error) {
             Appyscript.hideIndicator();
             Appyscript.alert(data.languageSetting.error);
         }
    });
}
 else{
    Appyscript.alert(internetconnectionmessage,data.appData.appName);
 }
}


Appyscript.checkPassword=function(a,b){
    if(window.data.loginfield.loginSetting.addvanceLogin==0)
        return true;

    var val;
    if(b==undefined)
        val=a.value;
    else
        val=a;

    var lowercase = val.match(/[a-z]/g);
    var uppercase = val.match(/[A-Z]/g);
    var number = val.match(/[0-9]/g);
    var symbol = val.match(/^[\w&.\-]+$/g);

    var ulength = (uppercase && uppercase != null) ? 1 : 0;
    var llength = (lowercase && lowercase != null) ? 1 : 0;
    var nlength = (number && number != null) ? 1 : 0;
    var slength = (!symbol && symbol == null) ? 1 : 0;

    var result = parseInt(ulength) + parseInt(llength) + parseInt(nlength) + parseInt(slength);
    var checkCondition, checkPasswordCharLeft;

    if (val.length >= 8) {
        checkCondition = 1;

    } else {
        checkCondition = 0;
        if (checkCondition == 0) {
            checkPasswordCharLeft = data.languageSetting.Sign_up_password_should_be_seven_char;
        }
    }
    if (parseInt(ulength) == 1 && val.length >= 8) {
       // checkPasswordCharLeft = "";
    } else {
        if (parseInt(ulength) != 1) {
           // if (checkCondition == 1) {
                 if(checkPasswordCharLeft==null){
                    checkPasswordCharLeft = data.languageSetting.password_must_include_at_least_one_uppercase;
                 }else{
                    checkPasswordCharLeft += "<br>"+data.languageSetting.password_must_include_at_least_one_uppercase;
                 }
            //}
        }
    }
    if (parseInt(llength) == 1 && val.length >= 8) {

    } else {
        if (parseInt(llength) != 1) {

                 if(checkPasswordCharLeft==null)
                                  {
                                     checkPasswordCharLeft = data.languageSetting.password_must_include_at_least_one_lowercase;
                                  }else
                                  {
                                     checkPasswordCharLeft += "<br>"+data.languageSetting.password_must_include_at_least_one_lowercase;
                                 }

        }
    }
    if (parseInt(nlength) == 1 && val.length >= 8) {

    } else {
        if (parseInt(nlength) != 1) {

               if(checkPasswordCharLeft==null)
                 {
                    checkPasswordCharLeft = data.languageSetting.password_must_include_at_least_one_numeric; //"Must be include at least one numeric.";;
                 }else
                 {
                    checkPasswordCharLeft += "<br>"+data.languageSetting.password_must_include_at_least_one_numeric;
                }

        }
    }
    if (parseInt(slength) == 1 && val.length >= 8) {

    } else {
        if (parseInt(slength) != 1) {
           // if (checkCondition == 1) {

             if(checkPasswordCharLeft==null)
               {
                  checkPasswordCharLeft = data.languageSetting.password_must_include_at_least_one_special;//"Must be include at least one special character.";
               }else
               {
                  checkPasswordCharLeft += "<br>"+data.languageSetting.password_must_include_at_least_one_special;
              }

        }
    }

    var passwordFlag;
    if (result <= 1){
        passwordFlag = false;
        $$(".password-type").show().text(data.languageSetting.week).css("color", "red");
    }
    else if (checkPasswordCharLeft == null && result <= 2){
        passwordFlag = false;
        $$(".password-type").show().text(data.languageSetting.good).css("color", "darkseagreen");
    }
    else if (checkPasswordCharLeft == null && result >= 3){
        passwordFlag = true;
        $$(".password-type").show().text(data.languageSetting.strong).css("color", "forestgreen");
    }

    if (val.length <= 0) {
        $$(".password-view").hide();
        $$(".password-type").hide();
        passwordFlag=false;
    }
    else  if(checkPasswordCharLeft!=null) {
        $$(".password-view").show().html(checkPasswordCharLeft).css("color", "red");
    }

    if (checkPasswordCharLeft == null && val.length >= 8 && result >= 3) {
        passwordFlag = true;
        $$(".password-view").hide();
    }
    return passwordFlag;
}




var forgetPasswordEmail="";
var forgetUserId="";
var forgetPhoneNo="";
Appyscript.ldapForgetPassword=function(flag){
 if(isOnline()){
     loginServiceURL=webserviceUrl+'Appuser.php';
      var email=document.getElementById("forpasid").value;
      forgetPasswordEmail=email;

         $$(".error").removeClass("error");
         if(email == '' || email==undefined || !Appyscript.validateEmail(email)){
             if(email==""){
                Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});
             }else{
                Appyscript.alert(data.languageSetting.Sign_up_email,function(){localStorage.popup=true});
             }
             $$("#forpasid").parent().addClass("error");
             return;
         }



     var serviceData='{"method":"forgotPassword","email":"'+email+'","appId":"'+appid+'","appName":"'+data.appData.appName+'","adminEmail":"'+window.data.loginfield.loginSetting.userAdminEmail+'", "lang":"'+Appyscript.getDefaultLanguage()+'","smsAccountSid":"'+data.loginfield.loginSetting.accountSid+'","smsAuthToken":"'+data.loginfield.loginSetting.authToken+'","smsFromNumber":"'+data.loginfield.loginSetting.fromNumber+'","phoneVerification":"'+data.loginfield.loginSetting.phoneVerification+'","emailVarification":"'+data.loginfield.loginSetting.emailVarification+'", "smsTextMessage":"'+data.loginfield.loginSetting.smsResetPassMessage+'"}';
     serviceData = EncryptOrDecrypt("encrypt", serviceData);
     serviceData = serviceData.replace(/\s/g, '');
    Appyscript.showIndicator();
    $$.ajax({
         url: loginServiceURL,
         data: serviceData,
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},
         success: function(jsonData, textStatus ){
               Appyscript.hideIndicator();
               jsonData=jsonData.trim();
               jsonData = ReturnHexDataWithSpace(jsonData);
               jsonData = EncryptOrDecrypt("decrypt", jsonData);
               var object=JSON.parse(jsonData);

if(object["status"]=="failure"||object["status"]=="error" ){
        if(object["userStatus"]== 0){
          Appyscript.alert(data.languageSetting.this_account_doesnot_exist),function(){localStorage.popup=true};
        }
       else if(object["userStatus"]== 2){
             Appyscript.alert(data.languageSetting.this_account_is_inactive_block+" "+window.data.loginfield.loginSetting.userAdminEmail),function(){localStorage.popup=true};
        } else{
           Appyscript.alert(data.languageSetting.error),function(){localStorage.popup=true};
         }
         return;
}



                forgetUserId=object["userId"];
                forgetPhoneNo=object["phoneNo"];


                if(flag){
                   document.getElementById("otpCode").value="";
                }else{
                  Appyscript.popupPage('otp-verification'),function(){localStorage.popup=true};
                }


        if((data.loginfield.loginSetting.emailVarification==1 || data.loginfield.loginSetting.authoStatus ==1 ) && data.loginfield.loginSetting.phoneVerification == 1)
        {
          Appyscript.alert(data.languageSetting.otp_code_has_been_sent_to+" "+forgetPhoneNo+ " & "+email , window.data.appData.appName,function(){localStorage.popup=true});
        }
        else if(data.loginfield.loginSetting.phoneVerification == 1){
          Appyscript.alert(data.languageSetting.otp_code_has_been_sent_to+" "+forgetPhoneNo , window.data.appData.appName,function(){localStorage.popup=true});
        }
        else{
          Appyscript.alert(data.languageSetting.otp_code_has_been_sent_to+" "+email ,  window.data.appData.appName,function(){localStorage.popup=true});
        }



         },error: function(error) {
                 Appyscript.hideIndicator();
                 Appyscript.alert(error.message);
                 Appyscript.alert(data.languageSetting.error),function(){localStorage.popup=true};
               }
         });
          }
            else{
                    Appyscript.alert(internetconnectionmessage,data.appData.appName,function(){localStorage.popup=true});
            }
}


 Appyscript.otpVerification=function(){
 if(isOnline())
            {

     loginServiceURL=webserviceUrl+'Appuser.php';
      var otpCode=document.getElementById("otpCode").value;

         $$(".error").removeClass("error");
         if(otpCode == undefined || otpCode==''){
               $$("#otpCode").parent().addClass("error");
             Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank,function(){localStorage.popup=true});

             return;
         }




     var serviceData='{"method":"validateOTP","email":"'+forgetPasswordEmail+'","appId":"'+appid+'","otp":"'+otpCode+'"}';
     serviceData = EncryptOrDecrypt("encrypt", serviceData);
     serviceData = serviceData.replace(/\s/g, '');
    Appyscript.showIndicator();
    $$.ajax({
         url: loginServiceURL,
         data: serviceData,
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},
         success: function(jsonData, textStatus ){
               Appyscript.hideIndicator();
               jsonData=jsonData.trim();
               jsonData = ReturnHexDataWithSpace(jsonData);
               jsonData = EncryptOrDecrypt("decrypt", jsonData);
               var object=JSON.parse(jsonData);

               if(object["status"]=='failure' || object["status"]=='error')
                {
                      Appyscript.alert(data.languageSetting.oops_verification_code_doesnt_match),function(){localStorage.popup=true};

                         return;
                  }

               Appyscript.popupPage('change-password');
               forgetPasswordEmail="";
               forgetPhoneNo="";

         },error: function(error) {
                 Appyscript.hideIndicator();
                 Appyscript.alert(error.message);
                  Appyscript.alert(data.languageSetting.error),function(){localStorage.popup=true};
               }
         });
          }
            else
               {
                       Appyscript.alert(internetconnectionmessage,data.appData.appName),function(){localStorage.popup=true};
                  }
}

Appyscript.changePasswordOTP=function(){
 if(isOnline())
    {

     loginServiceURL=webserviceUrl+'Appuser.php';
      var newPassword =document.getElementById("newpasswordChange").value;
      var confirmpassword =document.getElementById("confirmpasswordChange").value;

      $$(".error").removeClass("error");

    if(newPassword==undefined || newPassword=='' || !Appyscript.checkPassword(newPassword,"true"))
       {

              $$("#newpasswordChange").parent().addClass("error");
                  if(newPassword==undefined || newPassword=='')
                  {
                     Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank),function(){localStorage.popup=true};
                  }
                  else
                  {
                    Appyscript.alert(data.languageSetting.please_enter_password_mcom),function(){localStorage.popup=true};
                  }

                  return;

       }

      if(confirmpassword==undefined || confirmpassword=='' || confirmpassword != newPassword){

              $$("#confirmpasswordChange").parent().addClass("error");

       if(confirmpassword==undefined || confirmpassword=='')
       {
            Appyscript.alert(data.languageSetting.mandatory_fields_cant_be_left_blank),function(){localStorage.popup=true};
       }else
       {
                Appyscript.alert(data.languageSetting.Sign_up_password_do_not_match,function(){localStorage.popup=true}),function(){localStorage.popup=true};
       }


              return;
    }



      var serviceData='{"method":"changePasswordOTP","userId": "'+forgetUserId+'","appId":"'+appid+'", "password":"'+newPassword+'", "cpassword":"'+confirmpassword+'",  "appName":"'+data.appData.appName+'", "loginType":"advance", "adminEmail":"'+window.data.loginfield.loginSetting.userAdminEmail+'", "lang":"'+Appyscript.getDefaultLanguage()+'"}';

     serviceData = EncryptOrDecrypt("encrypt", serviceData);
     serviceData = serviceData.replace(/\s/g, '');
    Appyscript.showIndicator();
    $$.ajax({
         url: loginServiceURL,
         data: serviceData,
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},
         success: function(jsonData, textStatus ){
               Appyscript.hideIndicator();
               jsonData=jsonData.trim();
               jsonData = ReturnHexDataWithSpace(jsonData);
               jsonData = EncryptOrDecrypt("decrypt", jsonData);
               var object=JSON.parse(jsonData);

               if(object["status"]=='failure')
                {

                    Appyscript.alert(data.languageSetting.oops_password_cant_be_change,function(){localStorage.popup=true});
                          return;
                }

                Appyscript.alert(data.languageSetting.your_password_has_been_successfully_changed,function(){localStorage.popup=true});

               Appyscript.popupPage('login');
               forgetUserId="";



         },error: function(error) {
                 Appyscript.hideIndicator();
                 Appyscript.alert(error.message);
                   Appyscript.alert(data.languageSetting.error,function(){localStorage.popup=true});

               }
            });
          }
         else{

               Appyscript.alert(internetconnectionmessage,data.appData.appName);

              }
}


var mediaval;

function selectPhotoForLogin(a)
    {

       mediaval=a;
        Appyscript.modal({
                         title: data.languageSetting.social_choose_picture,
                         verticalButtons: true,
                         buttons: [
                                   {
                                       text: 'Camera',
                                       onClick: function ()
                                       {

                                           Appyscript.cameraPermission('cameraopt','Appyscript.permissionDenied')
                                            //navigator.device.capture.captureImage(onSuccess, onFail, optionsCamera);
                                       }
                                   },
                                   {
                                       text: 'Gallery',
                                       onClick: function ()
                                       {
                                          Appyscript.cameraPermission('gallaryopt','Appyscript.permissionDenied')
                                       }
                                   },
                                   {
                                       text: 'Cancel',
                                       onClick: function ()
                                       {
                                       }
                                   }
                                   ]
                         })


    }

      function cameraopt()
    {
     var optionsCamera = {
                quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
            }

       localStorage.popup=true;
        navigator.camera.getPicture(onSuccessmedia, onFailmedia, optionsCamera,function(){localStorage.popup=true});
    }

    function gallaryopt()
    {
      var optionsForGallery = {
                           quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            encodingType: Camera.EncodingType.JPEG,
                    }
    localStorage.popup=true;
    navigator.camera.getPicture(onSuccessmedia, onFailmedia, optionsForGallery,function(){localStorage.popup=true});
    }


function onSuccessmedia(imageURI) {
    var a=mediaval;

             var imageArrayName=[];
             var index=0
           if(imageArrayName[index]=="undefined" || imageArrayName[index] == null){
               imageArrayName[index] = "Image"+getRandomNumber();
           }




           a.value =  imageArrayName[index]+'.jpeg' ;
           var file =  b64toBlob(imageURI,'image/jpeg');
           $$(a).parent().find("font").text(imageArrayName[index]+'.jpeg').attr("file-exit", imageArrayName[index]+'.jpeg');
           //console.log(file);
           imageFDFlag=true;
           imageFD.append("blob"+imageArrayName[index],file, imageArrayName[index]+'.jpeg');
           savedImageFD.append("blob"+imageArrayName[index],file, imageArrayName[index]+'.jpeg');


       }

   function onFailmedia(message)
        {
          Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages,function(){localStorage.popup=true});

        }


  function checkUserRegistrationStatus()
  {

      var newFormData = new FormData();
      newFormData.append("actionType","userRegistrationStatus");
      newFormData.append("email",globalLoginEmailId);
      newFormData.append("phone",globalLoginPhone);
      newFormData.append("uniquePhone",data.loginfield.loginSetting.phoneStatus);
      newFormData.append("appId",data.appData.appId);
      Appyscript.showIndicator();

       var xhr = new XMLHttpRequest();
         xhr.upload.addEventListener("progress", uploadProgressLogin, false);
         xhr.addEventListener("load", uploadCheckCompleteRegister, false);
         xhr.addEventListener("error", uploadFailedLoginRegister, false);
         xhr.addEventListener("abort", uploadCanceledLoginRegister, false);
         xhr.open("POST", webserviceUrl+"AppuserRegister.php");
      //321   xhr.setRequestHeader("accessToken", deviceEncryptedToken);
         xhr.send(newFormData);

  }

  function uploadCheckCompleteRegister(evt)
  {
           //console.log(evt);
           var jsonData=JSON.parse(evt.currentTarget.response);

         // console.log("jsonData data jsonData"+JSON.stringify(jsonData))
           if( typeof jsonData !== "undefined" && jsonData.status=="failure")
           {
              showPaymentAlert();
               Appyscript.hideIndicator();
           }else if(typeof jsonData !== "undefined" && jsonData.status=="success")
           {
              globalLoginEmailId=null;
              isPaymentDone=false;
              Appyscript.hideIndicator();

               var userStatus=jsonData["userStatus"];

               if(typeof userStatus !== "undefined" && userStatus !=null)
               {

                 if(userStatus==1)
                 {
                   Appyscript.alert(data.languageSetting.Email_id_already_exists,function(){localStorage.popup=true});


                 }else if(userStatus==2)
                 {
                     Appyscript.alert(data.languageSetting.phone_already_exists,function(){localStorage.popup=true});

                 }else if(userStatus==3)
                   {
                        Appyscript.alert(data.languageSetting.User_already_registered,function(){localStorage.popup=true});
                   }

               }
               else
               {

                 Appyscript.alert(data.languageSetting.Unable_to_register);

               }
           }else
           {
            Appyscript.hideIndicator();
            Appyscript.alert(data.languageSetting.error  , window.data.appData.appName);
           }


           }

            function uploadFailedLoginRegister(evt) {

                    Appyscript.hideIndicator();
                    globalLoginEmailId=null;
                    isPaymentDone=false;
                    globalLoginPhone=null;
                    Appyscript.alert(data.languageSetting.error  , window.data.appData.appName);

               }

               function uploadCanceledLoginRegister(evt) {

                    Appyscript.hideIndicator();

                    globalLoginEmailId=null;
                    isPaymentDone=false;
                    globalLoginPhone=null;

                   Appyscript.alert(data.languageSetting.error  , window.data.appData.appName);

               }



	     Appyscript.setCountryCodeByLocation = function() {
             Appyscript.getLocalCords();
             setTimeout(function() {
                 $$.getJSON('res/areacode.json', function(areaCode) {
                     console.log(areaCode);
                     var lat = localStorage.localLatitude;
                     var lng = localStorage.localLongitude;
                     if (lat && lng) {
                         $$.ajax({
                             url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false" + '&key=' + data.googlePlacesApiKey
                                 // url: "http://cdncloudfront.com/webservices/ClientDetails.php"
                                 ,
                             type: "get",
                             async: true,
                             success: function(jsonData, textStatus) {
                                 //console.log("31214"+JSON.stringify(jsonData));
                                 jsonData = JSON.parse(jsonData);
                                 console.log(jsonData);
                                 console.log(jsonData.results);
                                 console.log(textStatus);

                                 if (jsonData.status != "REQUEST_DENIED") {
                                     for (var i = 0; i < jsonData.results[0].address_components.length; i++) {
                                         if (jsonData.results[0].address_components[i].types[0] == "country") {
                                             countrynameval = jsonData.results[0].address_components[i].long_name;
                                             localStorage.setItem("countryNameVal", countrynameval);
                                             console.log("countrynameval====" + countrynameval);
                                         }

                                     }


                                     var filterData = areaCode.value.filter(function(item) {
                                         return (item.name == countrynameval);
                                     });
                                     filterData = filterData[0];
                                     console.log(filterData);
                                     console.log(filterData.areacode + " " + filterData.name);
                                     localStorage.setItem("messengercountry", "+" + filterData.areacode);
                                     try {
                                         $$("#scountrycode").val(localStorage.getItem("messengercountry"));
                                         var rootLoginPhoneNo = $$("#lphonenumber").val();
                                     } catch (e) {}
                                 } else {
                                     Appyscript.hideIndicator();
                                     apiname = "Google";
                                     serviceFailedNotify(jsonData.status, apiname, 1);
                                     Appyscript.alert(jsonData.error_message, appnameglobal_allpages);
                                 }

                             },
                             error: function(e) {
                                 apiname = "Google";
                                 var flag = 0;
                                 serviceFailedNotify(e, apiname, flag)
                             }
                         });
                     }
                 });
             }, 2000);
         }


     function selectedCountrylogin(code, countryName) {
         var countryValue = "+" + code;
         $$("#scountrycode").val(countryValue);
         gettingStartedView.router.back();
     }


 AppyTemplate.global.inappsucess=false;
 AppyTemplate.global.inapphypersucess ==false;
    function callbackAfterPaymentOnSingup(status, transactionId, payType)
        {

        if(localStorage.getItem("paymentstatus")=="NO" && status=="success" )
            {
                localStorage.setItem("paymentstatus","YES");
                createApplication();
                return;
            }


        console.log("**********************callbackAfterPaymentOnSingup***********************************************************")
         if(status=="success")
              {
                 Appyscript.showIndicator();
                 if(AppyTemplate.global.inappservice==true){
                     console.log("sucess hai -----");
                     AppyTemplate.global.inappsucess=true;
                     Appyscript.addListingData(transactionId)

                 }
                 else if(AppyTemplate.global.inappServiceHyper==true){
                    console.log("inappServiceHyper sucess######");
                    AppyTemplate.global.inapphypersucess=true;
                    Appyscript.addListingDataPostJob(transactionId)

                  }else{
                      if(payType=="IAP")
                      {
                            localStorage.setItem(email, "true");
                      }
                     uploadTransectionDetailAfterPayment(transactionId,'hyper')
                  }
             }

            else
            {
                Appyscript.hideIndicator();
                if(status=="card"){
                    Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number , window.data.appData.appName);
                }
                if(status=="expdate"){
                    Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year , window.data.appData.appName);
                }
                if(status=="cvc"){
                    Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code , window.data.appData.appName);
                }
                if(status=="else"){
                    Appyscript.alert(AppyTemplate.global.commonLanguageSetting.common_payment_is_failure , window.data.appData.appName);
                }
                else{
                    Appyscript.alert(AppyTemplate.global.commonLanguageSetting.common_payment_is_failure , window.data.appData.appName);
                }
                clearAllDataOfLoginUser();
                //uploadTransectionDetailAfterPayment(transactionId, status);
            }
        }



/*function  callbackAfterPaymentOnSingupstripe(status, transactionId)
{

        if(status=="success")
          {
              Appyscript.showIndicator();
             if(AppyTemplate.global.inappservice==true){
                 console.log("sucess hai -----");
                 AppyTemplate.global.inappsucess=true;
                 Appyscript.addListingData(transactionId)

             }else{
               uploadTransectionDetailAfterPayment(transactionId,'service')
             }
             if(AppyTemplate.global.inappServiceHyper==true){
                console.log("inappServiceHyper sucess######");
                AppyTemplate.global.inapphypersucess=true;
                Appyscript.addListingDataPostJob(transactionId)

              }else{
                 uploadTransectionDetailAfterPayment(transactionId,'hyper')
              }
         }

        else
        {
              Appyscript.hideIndicator();
                if(status=="card"){
                Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number , window.data.appData.appName);
                }
                if(status=="expdate"){
                Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year , window.data.appData.appName);
                }


                if(status=="cvc"){
                Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code , window.data.appData.appName);
                }
                if(status=="else"){
                Appyscript.alert(AppyTemplate.global.commonLanguageSetting.common_payment_is_failure , window.data.appData.appName);
                }

               clearAllDataOfLoginUser();
            //uploadTransectionDetailAfterPayment(transactionId, status);
        }

}*/

   function uploadTransectionDetailAfterPayment(transactionId,hyper)
   {
   console.log("**********************+++++++++++uploadTransectionDetailAfterPayment++=============================***************************");

var totalAmount;
var paymantypeval;
   if(hyper=="hyper"){
      totalAmount=globaldirectoryAmount+" "+globaldirectoryCurrency;
       paymantypeval="iap";
       subscriptiontypeval=globaldirectoryPaymentType;
   }
    totalAmount=globalLoginAmount+" "+globalLoignCurrency;
    paymantypeval= data.loginfield.inp.paymentMethod;
    subscriptiontypeval=globalPaymentType;

       var serviceData='{"method":"registrationPaymentSuccess","userId":"'+localStorage.getItem("userid")+'","paidStatus":"1","appId":"'+data.appData.appId+'","name":"'+localStorage.getItem("name")+'"'+
       ',"email":"'+localStorage.getItem("emailid")+'", "password":"'+localStorage.getItem("password")+'","appName":"'+data.appData.appName+'","appOnwerEmail":"'+window.data.loginfield.loginSetting.userAdminEmail+'"'+
       ',"phone":"'+localStorage.getItem("phone")+'","paymentId":"'+transactionId+'","paymentMethodType":"'+paymantypeval+'","subscriptionType":"'+subscriptiontypeval+'"'+
       ',"totalAmount":"'+totalAmount+'","orderId":"'+login_orderId+'","status":"'+data.loginfield.loginSetting.autoApproved+'"'+
       ',"lang":"'+Appyscript.getDefaultLanguage()+'"}';
         console.log("js00-0--0-0--"+serviceData +"      loginServiceURL    "+loginServiceURL);
       serviceData = EncryptOrDecrypt("encrypt", serviceData);
       serviceData = serviceData.replace(/\s/g, '');
       if(isOnline())
       {
       Appyscript.showIndicator();
       $$.ajax({
               url: loginServiceURL,
               data: serviceData,
               type: "post",
               //321 headers: {'accessToken': deviceEncryptedToken},
               success: function(jsonData, textStatus)
               {

                    Appyscript.hideIndicator();
                    jsonData=jsonData.trim();
                    jsonData = ReturnHexDataWithSpace(jsonData);
                    jsonData = EncryptOrDecrypt("decrypt", jsonData);
                    var object=JSON.parse(jsonData);

                    console.log("object v::  "+JSON.stringify(object))

                      if(object['status']=="success")
                               {

                                  if(logintype == "faceboookLogin")
                                  {
                                      logintype="normal";
                                     closePopupOnFacebook();

                                  }else
                                  {
                                          if(data.loginfield.loginSetting.autoApproved==1)
                                           {

                                              Appyscript.requestLoginService(object['email'],object['password']);
                                                   return;

                                           }else
                                           {
                                                createApplication()
                                              //Appyscript.popupPage('login');

                                           }
                                  }

                                          if (object['status'] == "success")
                                            {

                                                Appyscript.alert(data.languageSetting.Registered_successfully, window.data.appData.appName);

                                            }
                                           else {

                                              Appyscript.alert(object['msg'],window.data.appData.appName);

                                            }


                                 }else
                                 {
                                    clearAllDataOfLoginUser();
                                     Appyscript.alert(data.languageSetting.error);
                                 }





               },error: function(error)
                {
                   console.log("errkffhks::"+error);
                   clearAllDataOfLoginUser();
                     Appyscript.hideIndicator();
                   Appyscript.alert(data.languageSetting.error);


               }
               });
       }
       else
       {
           Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
       }




   }



//   function loginp()
//      {
//
//        localStorage.popup=true,
//      }


   function clearAllDataOfLoginUser() {
     if (getLoginKeysPair) {
         var getLoginKeysPair = JSON.parse(localStorage.getItem("loginKeysPair"));
         if (getLoginKeysPair.length < 0) {
             getLoginKeysPair = [];
         } else {
             getLoginKeysPair = JSON.parse(localStorage.getItem("loginKeysPair"));
         }
         if (getLoginKeysPair.length > 0) {
             var appIdExists = false;
             var deleteIndex = null;
             $$.each(getLoginKeysPair, function(key, value) {
                 if (value.appId == data.appData.appId) {
                     deleteIndex = key;
                 }
             });
             getLoginKeysPair.splice(deleteIndex, 1);
             localStorage.setItem("loginKeysPair", localStorage.getItem("loginKeysPair"))

         }
     }

                localStorage.setItem("prefilledCardDetails",undefined);
                localStorage.setItem("username", "");
                localStorage.setItem("email", "");
                localStorage.setItem("phone", "");
                localStorage.setItem("password", "");
                localStorage.setItem("userid", "");
                localStorage.setItem("userId", "");
                localStorage.setItem("name","");
                localStorage.setItem("emailid", "");
                localStorage.setItem("profile_pic_facebook","");
                localStorage.setItem("profileImage","");
                localStorage.setItem("validateEmail","");
                localStorage.setItem("emailidhyper","");





                localStorage.setItem("FBusername", "");
                localStorage.setItem("FBemail", "");
                localStorage.setItem("fbgender","");
                localStorage.setItem("fbdob", "");
                localStorage.setItem("profileId", "");
                AppyTemplate.global.loginCheck=false;
                AppyTemplate.global.email= "";
                AppyTemplate.global.username= "";
                logintype="normal"
                localStorage.setItem("userProfileImage","");
                localStorage.setItem("datingcountdownchat","0");
//                Appyscript.notificationMenu($$(".navbar"));

                localStorage.setItem("payid","")
                setewalletpayId(undefined);

   }



///by satish
var globaldirectoryAmount;
var  globaldirectoryCurrency;
var   globaldirectoryPaymentType;
function showPaymentAlertservice(oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency,productid, publicKey, typeofPayment){
       console.log("productid***********  "+ productid);
       console.log("oneTimeSubscriptionPrice==="+oneTimeSubscriptionPrice);
      console.log("oneTimeSubscriptionCurrency==="+oneTimeSubscriptionCurrency)


var toP;
    if(typeofPayment == "monthly"){
        toP = "Monthly"
    }
    else if(typeofPayment == "yearly")
    {
        toP = "Yearly"
    }
    else
    {
       toP = "OneTime"
    }

    var onetime= ''+toP+' ('+oneTimeSubscriptionCurrency+' '+oneTimeSubscriptionPrice+')';
    var editionPrice=oneTimeSubscriptionPrice;
    globaldirectoryAmount=oneTimeSubscriptionPrice;
    globaldirectoryCurrency=oneTimeSubscriptionCurrency;
    globaldirectoryPaymentType="onetime";
    var paymentView=[];
    if(editionPrice>0)
    {
        paymentView.push({text: ''+onetime+'', onClick:function(){openPaymentPagefordirectory(toP,oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency,productid,publicKey)}})
    }
    paymentView.push({text: data.languageSetting.common_cancel, onClick:function(){
                    // clearAllDataOfLoginUser();
                     }})
    Appyscript.modal({title:data.languageSetting.payment_type,verticalButtons: true, buttons:paymentView });
    //    Appyscript.modal({title:"Select Payment Type",verticalButtons: true, buttons: [
    //                                                                                   {text: ''+yearly+'', onClick:function(){openPaymentPage("yearly")}},
    //                                                                                   {text: ''+monthly+'', onClick:function(){openPaymentPage("monthly")}},
    //                                                                                   {text: ''+onetime+'', onClick:function(){openPaymentPage("onetime")}}
    //                                                                                   ]});
}
function openPaymentPagefordirectory(paymentType,oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency,androidproductid, publicKey){
    Appyscript.hideIndicator();
    amount=oneTimeSubscriptionPrice;
    currency=oneTimeSubscriptionCurrency;
             var userId = localStorage.getItem("userId");

            //window.location = "inappnewsstand:"+iosproductid+"$$"+"false"+"$$one$$b770d92f5c6b4e15a3afb69958d42f54$$Registration";

             if(pageId == "dating")
               {
                    Appyscript.paymentViaGoogleIAP(androidproductid, publicKey, '', "dating",paymentType,oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency, userId, appid);
               }
             else if(pageId == "socialnetwork")
               {
                    Appyscript.paymentViaGoogleIAP(androidproductid, publicKey, '', "socialNetwork",paymentType,oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency, userId, appid);
               }
                         else if(pageId == "hyperlocal")
                                     {
                                          Appyscript.paymentViaGoogleIAP(androidproductid, publicKey, '', "hyperlocal",paymentType,oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency, userId, appid);
                                     }
                         else if(pageId == "realestate")
                                     {
                                          Appyscript.paymentViaGoogleIAP(androidproductid, publicKey, '', "realestate",paymentType,oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency, userId, appid);
                                     }
                         else if(pageId == "services")
                                     {
                                          Appyscript.paymentViaGoogleIAP(androidproductid, publicKey, '', "services",paymentType,oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency, userId, appid);
                                     }
                         else if(pageId == "accommodation")
                                     {
                                          Appyscript.paymentViaGoogleIAP(androidproductid, publicKey, '', "accommodation",paymentType,oneTimeSubscriptionPrice,oneTimeSubscriptionCurrency, userId, appid);
                                     }
                         else
                         {

                            Appyscript.paymentViaGoogleIAP(androidproductid, publicKey, '', "login",'','','', userId, appid);

                         }
}



/////by satish
Appyscript.uploadTransectionDetailAfterPaymentforservice=function(transactionId,dirpageIdentifie,pageType,servicesummary,pid,adminenable,alertval,sucessmsgupdate,adminApprovemsg)
{
var transactionId;
    //var totalAmountservice=globalLoginAmount+" "+globalLoignCurrency;
    if(transactionId==undefined||transactionId==null)
    {
     transactionId="312424242";
    }

    console.log("2353425364364646457457"+'{"method":"createOrderSubscription","appId":"' + localStorage.getItem("appid") + '","pageId":"' + dirpageIdentifie + '","userId":"'+localStorage.getItem("userIdhyper")+'","userEmail":"'+localStorage.getItem("emailidhyper")+'","paymentMethod":"'+pageData.paymentMethod+'","price":"'+globaldirectoryAmount+'","currency":"'+globaldirectoryCurrency+'","subscriptionType":"'+globaldirectoryPaymentType+'","deviceType":"android","pageType":"'+pageType+'","transactionId":"'+transactionId+'","productId":"'+pid+'","summary":"'+servicesummary+'","receiptId":"","buyerCountry":"","message":"'+globaldirectoryPaymentType+'"}');
    Appyscript.showIndicator();
    if(isOnline())
           {
            $$.ajax({
                    url: webserviceUrl+"OrderHistory.php",
                    data: Appyscript.validateJSONData('{"method":"createOrderSubscription","appId":"' + localStorage.getItem("appid") + '","pageId":"' + dirpageIdentifie + '","userId":"'+localStorage.getItem("userIdhyper")+'","userEmail":"'+localStorage.getItem("emailidhyper")+'","paymentMethod":"'+pageData.paymentMethod+'","price":"'+globaldirectoryAmount+'","currency":"'+globaldirectoryCurrency+'","subscriptionType":"'+globaldirectoryPaymentType+'","deviceType":"android","pageType":"'+pageType+'","transactionId":"'+transactionId+'","productId":"'+pid+'","summary":"'+servicesummary+'","receiptId":"","buyerCountry":"","message":"'+globaldirectoryPaymentType+'"}'),
                    type: "post",
                    //321 headers: {'accessToken': deviceEncryptedToken},
                    async: true,
                     success: function(txtxml) {
                    Appyscript.hideIndicator();
                    var json = JSON.parse(txtxml);
                    if(json.status == "failure"){
                       //Appyscript.alert(json.msg);
                    }else{
                        if(adminenable=="1")
                        {
                             if(AppyTemplate.global.postjob == true){
                                Appyscript.alert(alertval,appnameglobal_allpages);
                             }else if(AppyTemplate.global.updateJob == true){
                                $$("#"+globallistidforupdate+"addList").find("strong").text(globaljobTitleforupdate);
                                $$("#"+globallistidforupdate+"addList").find("p").find("span").text(globalsummaryforupdate);
                                Appyscript.alert(sucessmsgupdate,appnameglobal_allpages);
                             }
                        }
                        else
                          {
                            Appyscript.alert(adminApprovemsg,appnameglobal_allpages);
                                                }
                    }
                    console.log("txtxml======"+txtxml);
                    },
                    error: function(response, textStatus, errorThrown) {
                    Appyscript.hideIndicator();
                    errorPageWithTitleIconError("Add Listing","appyicon-no-network",pageData.languageSetting.Network_connection_error_please_try_again_later);
                    }
                    });
        }else
        {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
}

/*gg*/
 function allpageback(callback)
 {
    var backlength;
    pageIdentifie=pageIdentifie || "";
   if(pageIdentifie.indexOf("folder")!=-1)
    {
      backlength=mainView.history.length-4;
    }
    else
    {
   backlength=mainView.history.length-2; // 3
     }
  if(mainView.history.length > 2)
     {
         if(data.appData.layout=='bottom')
         {
             for(var i=0;i<backlength+2;i++)
           {
             mainView.router.back({ ignoreCache: true, animatePages: false});
           }
         }
         else
         {
           for(var i=0;i<backlength;i++)
           {
             mainView.router.back({ ignoreCache: true, animatePages: false});
           }
          }
     }
     if (callback) {callback();}
  }


function checkDeviceLevel()
{

 var checkDeviceApiLevel = AppyPieNative.getDeviceApiLevel();
 console.log("==== check : " + checkDeviceApiLevel)

 if(checkDeviceApiLevel >= "23")
 {
    AppyPieNative.checkFringerPrintLogin(checkDeviceApiLevel);
 }
 else
 {
    alert("This Api level will not support fingerprint Login.");
 }

}


Appyscript.loginWithTouchID = function()
{
//    window.location="touchidlogin:";
        checkDeviceLevel();
}


Appyscript.Enabletouch = function()
{
    if(data.loginfield.loginSetting.enableTouchId==1)
    {
        if(data.login.autoLogin =='true' && localStorage.getItem("loginTouchId")!='true')
        {
            localStorage.setItem("loginTouchId","false");

 Appyscript.confirmation(data.languageSetting.do_configure_touch_id,window.data.appData.appName,data.languageSetting.ok_mcom,data.languageSetting.common_cancel, function () {
//                                    window.location="touchidverify:";
                                        AppyPieNative.getAvailabilityInfoForTouch();
                                    });
        }
    }
}
function touchidverified()
{

    localStorage.setItem("loginTouchId","true");
    //Appyscript.notificationMenu($$(".navbar"));
    if(AppyTemplate.global.style.autoLoadFirstPage == "YES"){
                                    if(data.login.autoLogin=='true')
                                    {
                                    if(data.appData.layout=='slidemenu')
                                    {
                                    setTimeout(function(){
                                               $$(".app_navigation_slidemenu a").eq(0).click();
                                               },500)
                                    }
                                    if(data.appData.layout=='slidemenu3d')
                                    {
                                    setTimeout(function(){
                                               $$(".app_navigation_slidemenu3d a").eq(0).click();
                                               },500)
                                    }
                                    if(data.appData.layout=='bottom')
                                    {
                                    setTimeout(function(){
                                               $$(".toolbar .app_navigation_bottom a").eq(0).click();
                                               },500)
                                    }
                                    }
                                    }
        Appyscript.Enabletouch();
}
function touchidlogindone()
{
    Appyscript.popupClose();
    //Appyscript.notificationMenu($$(".navbar"));

   if(pageId == "ewallet"){
     ewalletModel.settouchidOrfaceidStatus(true)
     return;
   }

     if(AppyTemplate.global.style.autoLoadFirstPage == "YES"){
                                if(data.login.autoLogin=='true')
                                {
                                if(data.appData.layout=='slidemenu')
                                {
                                setTimeout(function(){
                                           $$(".app_navigation_slidemenu a").eq(0).click();
                                           },500)
                                }
                                if(data.appData.layout=='slidemenu3d')
                                {
                                setTimeout(function(){
                                           $$(".app_navigation_slidemenu3d a").eq(0).click();
                                           },500)
                                }
                                if(data.appData.layout=='bottom')
                                {
                                setTimeout(function(){
                                           $$(".toolbar .app_navigation_bottom a").eq(0).click();
                                           },500)
                                }
                                }
                                }
    Appyscript.Enabletouch();

}
$$(document).on('pageInit', 'div[data-page="login-page"]', function(page) {

    setTimeout(function () {

       if(localStorage.getItem("loginTouchId")=="true")
       {
       if(data.login.autoLogin =='true')
       {
       //$$("#touchid").show()
        $$("[id=touchid]").show()
       }
       }
       else
       {

        $$("[id=touchid]").hide()

       }

       if( localStorage.getItem("emailid")=="" || localStorage.getItem("emailid")==null){

                                   if(data.loginfield.inp.paymentMethod=="inApp" || (pageData.pageId = "socialnetwork" && pageData.paymentMethod =="iap") || (pageData.pageId = "dating" && pageData.paymentMethod =="iap") ){
                                      $$("#guestlogin").show();
                                      }
                                  else{$$("#guestlogin").hide();}

                                  }


       }, 200);
    })



////by satish for user permission
var userFilesData={}
Appyscript.getadminfile=function()
{
   var  useridvalue= localStorage.getItem("useridval")
serviceDataval='{"method":"userFilesList","appId":"' + localStorage.getItem("appid") + '","userId":"' + useridvalue+ '"}';
console.log("fdgjdfgjdfgjhdfjghdfjgj   "+ serviceDataval);
serviceDataval = EncryptOrDecrypt("encrypt", serviceDataval);
serviceDataval = serviceDataval.replace(/\s/g, '');
 var loginServiceURL = webserviceUrl + 'Appuser.php';
if(isOnline())
    {
   //   useridvalue, localStorage.getItem("appid")
      $$.ajax({
              url: loginServiceURL,
              data:serviceDataval,
              type: "post",
              //321 headers: {'accessToken': deviceEncryptedToken},
              async: true,
              success: function(jsonData, textStatus)
             {
             jsonData=jsonData.trim();
              jsonData = ReturnHexDataWithSpace(jsonData);
              jsonData = EncryptOrDecrypt("decrypt", jsonData);
              console.log("json======"+jsonData);
               var jsondataObj=JSON.parse(jsonData);
               userFilesData.list=jsondataObj;
               $$.get("pages/user-files.html", function (template) {
               		var compiledTemplate = AppyTemplate.compile(template);
               		var html = compiledTemplate(userFilesData);
               		mainView.router.load({content: html, animatePages: true});
            	})
                },
              error: function(response, textStatus, errorThrown) {
              Appyscript.hideIndicator();
               }
               });

               }else
                 { Appyscript.hideIndicator();
                  Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
               }
}


Appyscript.onPageInit('user-Files',function(page){
	$$.each(userFilesData.list, function(index, value){
		var fileType = value.name.substr(value.name.lastIndexOf(".") + 1);
		var fileRow = $$(".user-files li").eq(index);
		if(fileType == "pdf") {
			fileRow.find("i").attr("class", "appyicon-pdf")
		}
		if(fileType == "csv") {
			fileRow.find("i").attr("class", "icon-table")
		}
		if(('jpeg,jpg,png').indexOf(fileType) != - 1) {
			fileRow.find("i").attr("class", "appyicon-img")
		}
		if(('doc,docx').indexOf(fileType) != - 1) {
			fileRow.find("i").attr("class", "appyicon-doc")
		}


	})
})
 AppyTemplate.global.userpermissiontitle="";
Appyscript.openuserfile=function(index)
{

var row = userFilesData.list[index];
var rowval = userFilesData.list[index].name;
var title = userFilesData.list[index].id;
 AppyTemplate.global.userpermissiontitle=title;
console.log("row===="+rowval);
var rowType = row.name.substr(row.name.lastIndexOf(".") + 1);
if(rowType=="pdf")
{
// AppyPieNative.openPdfFile(rowval, "");
Appyscript.openPdfReaderFileLoader(rowval,"",title,0)
 //Appyscript.openPdfFile(rowval,"No","");
}
else if(('jpeg,jpg,png').indexOf(rowType) != - 1)
{
console.log("424242424===="+rowval);
AppyPieNative.openImageGallary(rowval, 0, "", "", "", "", title,"" ,"");

}
else if(('doc,docx,csv').indexOf(rowType) != - 1)
{
window.open(rowval,'_blank');

  Appyscript.openWebView(rowval,title)

}
else if(('csv').indexOf(rowType) != - 1)
{
window.open(rowval,'_blank');

}

}


//----------For Bar Code and QR Code --------------//

var getInputFieldIDsignup="";


function BarCode_signUP(inputID)
{

   getInputFieldIDsignup= $$(inputID).parent().find("input").attr("id");

    if(Appyscript.device.android)
    {
        AppyPieNative.validateLoyaltyViaScanner("sigupbarcode",AppyTemplate.global.name);
    }
    else
    {
        var identity_Chk='formbuilder';
        window.location="scanner:"+identity_Chk;
    }

}


function qrSuccess_signup(return_code)
{
    $$("#"+getInputFieldIDsignup).val(return_code).focus();

}




var customPopup = function(data) {
 var thisPopup = this;
 $$("body").append('<div class="custom-popup"><div class="main-box"><div class="close">&times;</div></div></div>')
 var thisDiv = $$(".custom-popup");
 thisPopup.show = function(){
  thisDiv.show();
  thisPopup.resize();
 }
 thisPopup.hide = function(){
//   localStorage.removeItem("FBemail")
//          localStorage.removeItem("email");
//          localStorage.removeItem("emailid");
  thisDiv.hide();
 }
 thisDiv.find(".close").on("click", thisPopup.hide);
 thisDiv.find(".close").on("click", Appyscript.hideIndicator);
 thisPopup.resize = function(){
  thisDiv.find("span").removeAttr("style");
  if(thisDiv.find(".main-box").height() > $$(window).height()) {
   thisDiv.find(".main-box span")
   .css("height",  $$(window).height() - 118 - (42 * thisDiv.find(".main-box li").length) + "px")
  }
 }
 thisPopup.init = function(){
  $$.each(data, function(key, value){
   if(key === "text") {
    thisDiv.find(".main-box").append('<span>'+value+'</span>');
   }
   if(key === "buttons") {
    thisDiv.find(".main-box").append('<ul></ul>');
    $$.each(value, function(i, v){
     thisDiv.find(".main-box ul").append('<li>'+v.text+'</li>');
     thisDiv.find(".main-box ul li").eq(i).on("click", v.click)
    })
   }
  })
 }
 thisPopup.init();
 thisPopup.resize();
 thisPopup.hide();
 $$(window).resize(thisPopup.resize)
 return thisPopup;
}


AppyTemplate.registerHelper('replaceTermsAndPrivacy',function (privacyTermsText) {

  var _getData=data.loginfield;
  var _originalString=privacyTermsText;
  var  _returnString="";

  if(_getData.signup.enableTerms=="YES" ){
    var _termsString='<a style="color:'+_getData.loginStyleAndNavigation.loginContent[2]+';" onclick="openTermsandCondition(1)">'+_getData.signup.appTermcondLabel+'</a>';
  }

  if(_getData.signup.enablePrivacyPolicy=="YES" ){
    var _privacyString='<a style="color:'+_getData.loginStyleAndNavigation.loginContent[2]+';" onclick="openTermsandCondition(2)">'+_getData.signup.appPvPolicyLabel+'</a>';
  }

   _returnString= _originalString.replace("__TERM__",_termsString).replace("__POLICY__",_privacyString);

//  if(_getData.signup.enableTerms=="YES" && _getData.signup.enablePrivacyPolicy=="YES"){
//    _returnString= _originalString.replace("__TERM___",_termsString).replace("__POLICY__",_privacyString);
//  }
//
//  else if(_getData.signup.enableTerms=="YES"  && _getData.signup.enablePrivacyPolicy=="NO"){
//    _returnString= _newArray[0] + " "+_termsString;
//  }
//
//  else if(_getData.signup.enableTerms=="NO"  && _getData.signup.enablePrivacyPolicy=="YES"){
//    _returnString= _newArray[0] + " "+_privacyString;
//  }
//
//  else if(_getData.signup.enableTerms=="NO"  && _getData.signup.enablePrivacyPolicy=="NO"){
//    _returnString= "";
//  }
    return  _returnString
});

function openTermsandCondition(flag){
    //flag 1 terms
    //flag 2 policy

    if (!isOnline()) {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        return false;
    }

     var reqData='{"method":"termsAndconditions","appId":"' + localStorage.getItem("appid") +'","pageId":"'+data.loginfield.signup.loginPageId+'","appName":"'+data.appData.appName+'"}';

     reqData = EncryptOrDecrypt("encrypt", reqData);
        reqData = reqData.replace(/\s/g, '');
        console.log(reqData);
        Appyscript.showIndicator();
        $$.ajax({
                url: webserviceUrl+'Appuser.php',
                data: reqData,
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData) {
                    Appyscript.hideIndicator();
                    jsonData=jsonData.trim();

                    jsonData = ReturnHexDataWithSpace(jsonData);
                    jsonData = EncryptOrDecrypt("decrypt", jsonData);
                    var object=JSON.parse(jsonData);

                    console.log(jsonData);
                    //{T_C_LABEL: "Terms and Conditions", T_C_CONTENT: "", PRIVACY_LABEL: "Privacy Policy", PRIVACY_CONTENT: "", TC_LINK: ""} = $1
                    var pageJsonData={};
                    pageJsonData.acceptButton=data.languageSetting.signup_agree;
                    if(flag=="1"){
                        pageJsonData.heading=object.list.T_C_LABEL;
                        pageJsonData.content=object.list.T_C_CONTENT;
                    }else if(flag=="2"){
                        pageJsonData.heading=object.list.PRIVACY_LABEL;
                        pageJsonData.content=object.list.PRIVACY_CONTENT;
                    }

                  $$.get("popups/terms-signup-policyterms.html", function(template) {
                   var compiledTemplate = AppyTemplate.compile(template);
                   var html = compiledTemplate(pageJsonData);
                   gettingStartedView.router.load({content: html, animatePages: true});
                   });
                },
                error: function () {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    return false;
                }
        });



}



 function popLoginnArraylist()
        {
         var loginArraydata =  JSON.parse(localStorage.getItem("loginKeysPair"));

           loginArraydata= loginArraydata.filter(function(v)
                  {
                    return v.appId !== data.appData.appId
                });
            localStorage.setItem("loginKeysPair", JSON.stringify(loginArraydata));

        }


function downloadFacebookImage(fbID) {
    //step to request a file system
 var URL =  `https://graph.facebook.com/${fbID}/picture?type=large`;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

    function fileSystemSuccess(fileSystem) {
        var download_link = encodeURI(URL);
       var fileName = "fbProfilePicture"; //Get filename of URL
        var  folderName = "fb"
        var directoryEntry = fileSystem.root; // to get root path of directory
        directoryEntry.getDirectory(folderName, {
            create: true,
            exclusive: false
        }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
        var rootdir = fileSystem.root;
        var fp = fileSystem.root.toNativeURL(); // Returns Fullpath of local directory

        fp = fp + "/"+folderName+"/" + fileName; // fullpath and name of the file which we want to give
        // download function call
        console.log("file path ---" + fp);
        fileTransferFacebook(download_link, fp);
    }

    function onDirectorySuccess(parent) {
        // Directory created successfuly
    }

    function onDirectoryFail(error) {
        //Error while creating directory
        //        alert("Unable to create new directory: " + error.code);
        Appyscript.hideIndicator();
    }

    function fileSystemFail(evt) {
        //Unable to access file system
        //        alert(evt.target.error.code);
        Appyscript.hideIndicator();
    }
}

function fileTransferFacebook(download_link, fp) {
    var fileTransfer = new FileTransfer();
    // File download function with URL and local path
    fileTransfer.download(download_link, fp,
        function(entry) {
              localStorage.setItem("profile_pic_facebook",fp)
              localStorage.setItem("profileImage",fp);
              AppyTemplate.global.profileImage=fp;
        },
        function(error) {
            //Download abort errors or download failed errors
            //                          alert("download error source " + error.source);
            alert("downloadFailed");
        }
    );
}

        function showPaymentAlertserviceAll(pageDataPayment){

            var mnth =data.languageSetting.monthly
            var yer = data.languageSetting.yearly
            var pageTypePayment = pageDataPayment.pageId
            var selectptype=data.languageSetting.select+" "+data.languageSetting.payment_type
            var onetimeval=data.languageSetting.one_time

            var onetime= ''+data.languageSetting.one_time+' ('+pageDataPayment.oneTimeSubscriptionCurrency+' '+pageDataPayment.oneTimeSubscriptionPrice+')';
            var yearly= ''+yer+' ('+pageDataPayment.yearlySubscriptionCurrency+' '+pageDataPayment.yearlySubscriptionPrice+')';
            var monthly= ''+mnth+' ('+pageDataPayment.monthlySubscriptionCurrency+' '+pageDataPayment.monthlySubscriptionPrice+')';

           //-------------*********--------------
           var proprice ="productPrice";
           //var Subprice ="chk";
            var paymentView=[];
            if(pageDataPayment.inAppAndroidBundleId)
            {
             proprice ="noPrice";
            if(pageDataPayment.oneTimeSubscriptionPrice)
                {
                paymentView.push({text: ''+onetime+'', onClick:function(){

                                 openPaymentPagefordirectory(onetimeval,pageDataPayment.oneTimeSubscriptionPrice,pageDataPayment.oneTimeSubscriptionCurrency,pageDataPayment.inAppAndroidBundleId,pageDataPayment.inAppPublicKey);

                                 }

                                 })
            }
            }
           if(pageDataPayment.androidYearlyBundleId)
            {
             proprice ="noPrice";
            if(pageDataPayment.yearlySubscriptionPrice)
            {
                paymentView.push({text: ''+yearly+'', onClick:function(){

                                 openPaymentPagefordirectory(yer,pageDataPayment.yearlySubscriptionPrice,pageDataPayment.yearlySubscriptionCurrency,pageDataPayment.androidYearlyBundleId,pageDataPayment.inAppPublicKey);

                                 }

                                 })
            }
            }
           if(pageDataPayment.androidMonthlyBundleId)
           {
            proprice ="noPrice";
            if(pageDataPayment.monthlySubscriptionPrice)
            {
               paymentView.push({text: ''+monthly+'', onClick:function(){

                                openPaymentPagefordirectory(mnth,pageDataPayment.monthlySubscriptionPrice,pageDataPayment.monthlySubscriptionCurrency,pageDataPayment.androidMonthlyBundleId,pageDataPayment.inAppPublicKey);

                                }

                                })
           }
           }
            if(pageDataPayment.monthlySubscriptionPrice == ""||pageDataPayment.yearlySubscriptionPrice == ""|| pageDataPayment.oneTimeSubscriptionPrice == "")
               {
                 var  Subprice ="BlankPrice";
               }

               if(paymentView.length == 0)

               {

                   if(proprice == "productPrice" && Subprice =="BlankPrice"){

                        Appyscript.popupClose();
                       //Appyscript.alert("ProductId and Price can't blank",appnameglobal_allpages);
                        show404page(pageData.pageTitle,"appyicon-no-data","Data Not Found");

                                    return false;


                   }

                   else if(proprice == "noPrice" && Subprice =="BlankPrice"){
                        Appyscript.popupClose();
                       //Appyscript.alert("Product Price can't blank",appnameglobal_allpages);
                        show404page(pageData.pageTitle,"appyicon-no-data","Data Not Found");

                                    return false;


                   }

                   else{

                      // Appyscript.alert("ProductId  can't blank",appnameglobal_allpages);
                        Appyscript.popupClose();
                       show404page(pageData.pageTitle,"appyicon-no-data","Data Not Found");

                                   return false;

                   }

               }

            paymentView.push({text: data.languageSetting.common_cancel, onClick:function(){

                             //clearAllDataOfLoginUser();
                             }})

            Appyscript.modal({title:selectptype,verticalButtons: true, buttons:paymentView });

        }


//change by pramod

Appyscript.loginWithGuest = function()
{
    Appyscript.showIndicator();
    var GuestloginServiceURL=webserviceUrl+'Appuser.php';

    var gusetservicecall='{"method":"guestIapUserRegistration","appId":"'+localStorage.getItem("appid")+'","deviceToken":"'+localStorage.getItem("DeviceToken")+'","deviceId":"'+localStorage.getItem("uniqueid")+'","deviceType":"ios"}';
    gusetservicecall = EncryptOrDecrypt("encrypt", gusetservicecall);
    gusetservicecall = gusetservicecall.replace(/\s/g, '');
    $$.ajax({
            url: GuestloginServiceURL,
            data:gusetservicecall,
            type: "post",
            async: true,
           //321 headers:{'accessToken': deviceEncryptedToken},
            success: function(jsonData, textStatus ){
            jsonData=jsonData.trim();
            jsonData = ReturnHexDataWithSpace(jsonData);
            jsonData = EncryptOrDecrypt("decrypt", jsonData);
                        console.log(jsonData);
                        jsonData = JSON.parse(jsonData);
                        //console.log(jsonData);
                        console.log(textStatus);
            var ee=jsonData.data.email;
            localStorage.setItem("paymentstatus","NO");

            var passwordguest="12345678";
            ///New Code start
            var getLoginKeysPair = localStorage.getItem("loginKeysPair");
            if (!getLoginKeysPair || getLoginKeysPair == 'null')
            getLoginKeysPair = [];
            else
            getLoginKeysPair = JSON.parse(getLoginKeysPair);
            if (getLoginKeysPair.length > 0) {
            var appIdExists = false;
            $$.each(getLoginKeysPair, function(key, value) {
                    if (value.appId == data.appData.appId) {
                    value.userid = jsonData.data.appUserId;
                    value.emailid = ee;
                    value.email = ee;
                    value.password = passwordguest;
                    appIdExists = true;
                    } else {
                    if (!appIdExists)
                    appIdExists = false;
                    }
                    });
            if (!appIdExists) {
            var keyData = {
            appId: data.appData.appId,
            userid: jsonData.data.appUserId,
            emailid: ee,
            email: ee,
            password: passwordguest
            };
            getLoginKeysPair.push(keyData);
            }
            localStorage.setItem("loginKeysPair", JSON.stringify(getLoginKeysPair))
            } else {
            var loginDataArray = [];
            //value don't exists in local storage
            var keyData = {
            appId: data.appData.appId,
            userid: jsonData.data.appUserId,
            email: ee,
            emailid: ee,
            password: passwordguest
            };
            loginDataArray.push(keyData);
            localStorage.setItem("loginKeysPair", JSON.stringify(loginDataArray))
            }

            ///New Code Ends
            localStorage.setItem("userid",jsonData.data.appUserId);
            localStorage.setItem("userId",jsonData.data.appUserId);
            localStorage.setItem("password","12345678");
            localStorage.setItem("emailid",ee);
            localStorage.setItem("email",ee);
            var paymentData = {};
            if(data.loginfield.inp.subsPriceYearly){
            //     paymentStr+=''+data.languageSetting.yearly+' ('+data.loginfield.inp.subsCurrencyYearly+' '+data.loginfield.inp.subsPriceYearly+'),'
            paymentData.langYearly = data.languageSetting.yearly;
            paymentData.currencyYearly = data.loginfield.inp.subsCurrencyYearly;
            paymentData.priceYearly = data.loginfield.inp.subsPriceYearly;
            }
            if(data.loginfield.inp.subsPriceMonthly){
            //        paymentStr+=''+data.languageSetting.monthly+' ('+data.loginfield.inp.subsCurrencyMonthly+' '+data.loginfield.inp.subsPriceMonthly+'),'
            paymentData.langMonthly = data.languageSetting.monthly;
            paymentData.currencyMonthly = data.loginfield.inp.subsCurrencyMonthly;
            paymentData.priceMonthly = data.loginfield.inp.subsPriceMonthly;
            }
            if(data.loginfield.inp.editionPrice){
            //        paymentStr+=''+data.languageSetting.one_time+' ('+data.loginfield.inp.editionCurrency+' '+data.loginfield.inp.editionPrice+'),'
            paymentData.langOneTime = data.languageSetting.one_time;
            paymentData.currencyOneTime = data.loginfield.inp.editionCurrency;
            paymentData.priceOneTime = data.loginfield.inp.editionPrice;
            }
            var descTxt = data.loginfield.inp.termconditionSub;
            try{
            if(descTxt){
            if(!descTxt.length > 0){
            descTxt = data.loginfield.inp.termconditionOnetime;
            }
            }else{
            descTxt = data.loginfield.inp.termconditionOnetime;
            }
            }catch(err){
            console.log("Terms and Condition Error : "+err);
            }
             paymentData.termcondition = descTxt;
            $$.get("popups/payment-confirmation.html", function(template) {
                   var compiledTemplate = AppyTemplate.compile(template);
                   var html = compiledTemplate(paymentData);
                   Appyscript.popup(html);
                   Appyscript.hideIndicator();
                   });
            },error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
            }
            });
}

Appyscript.dismisspayment = function()
{
     //Appyscript.popupClose();
    if(data.login.autoLogin=='false' && !localStorage.getItem("paymentstatus"))
    {
        Appyscript.popupClose();
    }
    else
    {
    var paymentData={};
    $$.get("popups/settingsguest.html", function(template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(paymentData);
           Appyscript.popup(html);
           Appyscript.hideIndicator();
           });
    }
}
Appyscript.openAccountpageGuest = function()
{
    var paymentData={};
    $$.get("popups/accountguest.html", function(template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(paymentData);
           Appyscript.popup(html);
           Appyscript.hideIndicator();
           });
}
Appyscript.openhelppageGuest= function()
{
    var paymentData={};
    var descTxt = data.loginfield.inp.termconditionSub;
    try{
        if(descTxt){
            if(!descTxt.length > 0){
                descTxt = data.loginfield.inp.termconditionOnetime;
            }
        }else{
            descTxt = data.loginfield.inp.termconditionOnetime;
        }
    }catch(err){
        console.log("Terms and Condition Error : "+err);
    }
    paymentData.termcondition = descTxt;
    $$.get("popups/helpguest.html", function(template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(paymentData);
           Appyscript.popup(html);
           Appyscript.hideIndicator();
           });
}

Appyscript.openpaymentpageGuest= function()
{
var paymentData = {};
if(data.loginfield.inp.subsPriceYearly){
    //     paymentStr+=''+data.languageSetting.yearly+' ('+data.loginfield.inp.subsCurrencyYearly+' '+data.loginfield.inp.subsPriceYearly+'),'
    paymentData.langYearly = data.languageSetting.yearly;
    paymentData.currencyYearly = data.loginfield.inp.subsCurrencyYearly;
    paymentData.priceYearly = data.loginfield.inp.subsPriceYearly;
}
if(data.loginfield.inp.subsPriceMonthly){
    //        paymentStr+=''+data.languageSetting.monthly+' ('+data.loginfield.inp.subsCurrencyMonthly+' '+data.loginfield.inp.subsPriceMonthly+'),'
    paymentData.langMonthly = data.languageSetting.monthly;
    paymentData.currencyMonthly = data.loginfield.inp.subsCurrencyMonthly;
    paymentData.priceMonthly = data.loginfield.inp.subsPriceMonthly;
}
if(data.loginfield.inp.editionPrice){
    //        paymentStr+=''+data.languageSetting.one_time+' ('+data.loginfield.inp.editionCurrency+' '+data.loginfield.inp.editionPrice+'),'
    paymentData.langOneTime = data.languageSetting.one_time;
    paymentData.currencyOneTime = data.loginfield.inp.editionCurrency;
    paymentData.priceOneTime = data.loginfield.inp.editionPrice;
}
var descTxt = data.loginfield.inp.termconditionSub;
try{
    if(descTxt){
        if(!descTxt.length > 0){
            descTxt = data.loginfield.inp.termconditionOnetime;
        }
    }else{
        descTxt = data.loginfield.inp.termconditionOnetime;
    }
}catch(err){
    console.log("Terms and Condition Error : "+err);
}
paymentData.termcondition = descTxt;
$$.get("popups/payment-confirmation.html", function(template) {
       var compiledTemplate = AppyTemplate.compile(template);
       var html = compiledTemplate(paymentData);
       Appyscript.popup(html);
       Appyscript.hideIndicator();
       });
}

Appyscript.logoutguestApp= function()
{
    localStorage.removeItem("paymentstatus");
    localStorage.removeItem("userid");
    localStorage.removeItem("userId");
    localStorage.removeItem("password");
    localStorage.removeItem("emailid");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.setItem("loginKeysPair2", localStorage.getItem("loginKeysPair"));
    localStorage.setItem("loginKeysPair", "");
    createApplication();
}



Appyscript.restore = function()
{
//    localStorage.setItem("signupmain","YES");
//    window.location = "inappnewsstandrestore:signup";
}
Appyscript.restoreGuestopen = function()
{
    var paymentData={};

    $$.get("popups/restorepage.html", function(template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(paymentData);
           Appyscript.popup(html);
           Appyscript.hideIndicator();
           });
}


function signupUsingVelocity(paymentTypeObject)
{

if (isOnline()) {
 Appyscript.showIndicator();
    var cardNo = document.getElementById("cnumberVel").value;
    var expMonth = document.getElementById("ExpairyMonthVel").value;
    var expYear = document.getElementById("ExpairyYearVel").value;
    var cvvVel = document.getElementById("cvvCodeVel").value;
    var cardHolderVel = document.getElementById("cHolderVel").value;
    var element = document.getElementById("velocityCardType");
    var cardTypeValue = element.value;

    if (cardNo == null || cardNo == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
        return null;
    } else if (isNaN(cardNo) || cardNo.length > 16 || cardNo.length < 15) {

        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
        return null;

    } else if (cardTypeValue == "Select") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
        return null;
    } else if (expMonth == null || expMonth == '' || expMonth > 12) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_month);
        return null;
    } else if (isNaN(expMonth) || expMonth.length < 2) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_month);
        return null;
    } else if (expYear == null || expYear == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year);
        return null;

    } else if (isNaN(expYear) || expYear.length < 2) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year);
        return null;
    } else if (cvvVel == null || cvvVel == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code);
        return null;
    } else if (isNaN(cvvVel) || cvvVel.length < 3) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code);
        return null;
    } else if (!isNaN(cardHolderVel) || cardHolderVel == null || cardHolderVel == '') {
        Appyscript.hideIndicator();
        Appyscript.alert("please enter valid details");
        return null;
    }

    var card = {
        CardholderName: cardHolderVel,
        cardtype: cardTypeValue,
        number: cardNo,
        cvc: cvvVel,
        expMonth: expMonth,
        expYear: expYear
    };


    var transctionData = {
        Amount: globalLoginAmount,
        CurrencyCode: globalLoignCurrency,
        EmployeeId: '13',
        IndustryType: 'Ecommerce',
        order_id: login_orderId

    }

   console.log("Transaction Data Dekhlo", transctionData);
   var velocitytoken, applicationProfile_Id, merchantProfile_Id, workflow_Id, identity_token, applicationLicense_Id,globalLoginPhone;

    velocitytoken = data.loginfield.inp.velocityAccessToken;
    applicationProfile_Id = data.loginfield.inp.velocityProfileId;
    merchantProfile_Id = data.loginfield.inp.velocityMerchantId;
    workflow_Id = data.loginfield.inp.velocityWorkflowId;
    identity_token = data.loginfield.inp.velocityTokenId;
    applicationLicense_Id = data.loginfield.inp.velocityApplicationLicence;

    var sessionToken = velocitytoken;

    var add = {
            City: "",
            StateProvince: "",
            Country: "",
            PostalCode: "",
            Street: "",
            Phone: ""

        }


        var geocoder = new google.maps.Geocoder();
            var latlng = {
                lat: 28.52844,
                lng: 77.38407
            };
            geocoder.geocode({
                'location': latlng
            }, function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        //add.Street = eve_address;
                        add.Street = results[0].formatted_address;
                        console.log("add.Street  "+add.Street);
                        var findPincodeArr = results[0].address_components;
                        //add.Country= results[0].address_components[2].short_name;
                        //
                        //add.City = results[0].address_components[0].short_name;
                        for (var key in findPincodeArr) {
                            if (findPincodeArr[key].types.indexOf("postal_code") > -1) {
                                add.PostalCode = findPincodeArr[key].short_name;
                            }
                            if (findPincodeArr[key].types.indexOf("administrative_area_level_1") > -1 && findPincodeArr[key].types.indexOf("political") > -1) {
                                add.StateProvince = findPincodeArr[key].short_name;
                            }
                            if (findPincodeArr[key].types.indexOf("country") > -1 && findPincodeArr[key].types.indexOf("political") > -1) {
                                add.Country = findPincodeArr[key].short_name;
                                //country = country.replace("Brasil","Brazil").trim();
                            }
                            if (findPincodeArr[key].types.indexOf("locality") > -1 && findPincodeArr[key].types.indexOf("political") > -1) {
                                add.City = findPincodeArr[key].short_name;
                            }
                        }
                        globalLoginPhone = localStorage.getItem("phone");
                        add.Phone = globalLoginPhone;
                        console.log("Address dekh lo bhaya",add);
                        if(isOnline())
                        {
                        Velocity.tokenizeForm(transctionData, sessionToken, card, add, applicationProfile_Id, merchantProfile_Id, workflow_Id, velocityResponseHandlersignup);
                        }else
                        {
                        Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
                        }
                    } else {
                        alert('No results found');
                        Appyscript.hideIndicator();
                    }
                }
            });
            }else
            {

            Appyscript.hideIndicator();
             Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
            }

  }

function velocityResponseHandlersignup(result)
{
if(!isOnline())
            {
             Appyscript.hideIndicator();
             Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
             return false;
            }
Appyscript.showIndicator();
console.log("Result from callback", result);
if(result.text !== "Successful"){
    Appyscript.hideIndicator();
    Appyscript.alert(something_went_wrong_please_try_again,data.appData.appName);
    return false;
}

var velocity_tokenId="";
velocity_tokenId = data.loginfield.inp.velocityTokenId;
var trancationData='{"Amount":"'+globalLoginAmount+'","CurrencyCode":"'+globalLoignCurrency+'","identitytoken":"'+velocity_tokenId+'","workflowid":"'+result.workflowid+
              '","merchantprofileid":"'+result.merchantprofileid+'","applicationprofileid":"'+result.applicationprofileid+
             '","paymentAccountDataToken":"'+result.row[0].PaymentAccountDataToken+'", "OrderId":"'+result.row[0].OrderId+'"}';
             console.log("TrancationData for response handler",trancationData);

if(isOnline())
{
        Appyscript.showIndicator();
        $$.ajax({
                    url: webserviceUrl+"OrderHistory.php",
                    data: Appyscript.validateJSONData('{"method":"velocityPayWithToken","orderId": "'+login_orderId+'", "trancationData":'+trancationData+'}'),
                    type: 'post',
                    async: true,
                    headers: {'accessToken': deviceEncryptedToken},
                    success: function(data) {

                     data = JSON.parse(data);
                     if(data.StatusCode == "00"){
                     updateVelocityTransactionsignup(data,login_orderId)
                     }
                },
                function(error)
                {
                  Appyscript.hideIndicator();
                  Appyscript.alert(something_went_wrong_please_try_again);
                }
        });
     }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage);
    }
}


function updateVelocityTransactionsignup(resultData,login_orderId){
console.log("Result Data",resultData);
Appyscript.showIndicator();
var transID = resultData.TransactionId;
var localUserId = localStorage.getItem("userId");
var email_id = localStorage.getItem("emailid");
    if(isOnline())
     {
        Appyscript.showIndicator();
        $$.ajax({
                    url: webserviceUrl+"OrderHistory.php",
                    data: '{"method":"systemLoginPaymentHistory","appId":"' + data.appData.appId + '", "pageId":"' +data.loginfield.signup.loginPageId+ '", "userId":"' + localUserId + '", "userEmail":"'+email_id+'", "paymentMethod":"velocity", "price":"'+globalLoginAmount+'", "currency":"'+globalLoignCurrency+'", "subscriptionType":"", "deviceType":"android", "pageType":"login", "transactionId":"'+resultData.TransactionId+'", "productId":"", "summary":"'+resultData.Status+'", "receiptId":"", "buyerCountry":"", "message":""}',
                    type: 'post',
                    async: true,
                    headers: {'accessToken': deviceEncryptedToken},
                    success: function(jsonData, textStatus) {
                    jsonData=jsonData.trim();
                    jsonData = ReturnHexDataWithSpace(jsonData);
                    jsonData = EncryptOrDecrypt("decrypt", jsonData);
                    console.log("transactionUpdation", jsonData);
                    var object=JSON.parse(jsonData);
                    console.log("OBject is as follows",object);
                    callbackAfterPaymentOnSingup("success",transID);

                },
                function(error)
                {
                  Appyscript.hideIndicator();
                  Appyscript.alert(something_went_wrong_please_try_again);
                }
        });
     }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage);
    }
}