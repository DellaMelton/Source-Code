var juserId, jcardnumber, jfulltimecard, jvalidTo, jpoints, jtype;
var  g_Latitude= 0;
var g_Longitude=0;
var g_LoyaltyIndex=0;
Appyscript.checkmemberloggedin = function(pageID, pageData) {
	Appyscript.showIndicator();
//
//
//   var getEmail= localStorage.getItem("validateEmail");
//       checkuserstatus();
//	if (localStorage.getItem("validateEmail")) {
//		pageData.memberRegister = 1;
//
//      ///  alert("34tn4u35hyu5huy"+localStorage.getItem("isReg"));
//		checkuserstatus();
//	}
//	else
//	{
//		pageData.memberRegister = 0;
//        Appyscript.loginPage('true');
//        $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');
//		Appyscript.hideIndicator();
//	}
//    //openPage(pageID, pageData);
    var userName = localStorage.getItem("username") ;
    var userEmail = localStorage.getItem("email");
    var loyalty_Email = localStorage.getItem("validateEmail") || "";

    if (loyalty_Email==="") {
            if(userName !=undefined && userName !='' && userEmail!= undefined && userEmail!= '' ){
                pageData.memberRegister = 1;
                Appyscript.memberregister();
                return;
            }else{
                pageData.memberRegister = 0;
                openPage("loyaltycard", pageData);
                Appyscript.hideIndicator();
                return;
            }
    }
    else if (loyalty_Email!=null) {
        pageData.memberRegister = 1;
        checkuserstatus();
        return;
    }
}

function checkuserstatus()
{
    var jsondata = '{"method":"loyalityCheck","appId":"'+localStorage.getItem("appid")+'","email":"'+localStorage.getItem("validateEmail")+'"}';

    console.log("hvdfgjhdfsgjfhgkjsjkgjkbndkgb"+jsondata);
    var baseurl = webserviceUrl + "MemberCard.php";
        console.log("hvdfgjhdfsgjfhgkjsjkgjkbndkgb"+baseurl);
     initCurrentAddressMemberCard();
   if(isOnline())
    {
    $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(jsondata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(jsonData, textStatus)
            {
            localStorage.setItem("MemRegJSON", jsonData);
            var Data = JSON.parse(jsonData);
            console.log("checkuserstatus  "+Data.status);

            if(Data.status =='succucess')
            {
            Appyscript.getmemberInfo();
            }
            else
            {
            pageData.memberRegister = 0;
            openPage("loyaltycard", pageData);
            Appyscript.hideIndicator();
            }

            },
            error: function(error)
            {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);

            }
            });
    }

    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);

    }
}

Appyscript.memberregister = function() {



    var memberurl = webserviceUrl + "MemberCard.php";
    var name = $$("#memberfname").val();
    var phone = $$("#memberpNo").val();
    var email = $$("#memberemailId").val();


    localStorage.setItem("validateEmail",$$("#memberemailId").val());
    localStorage.setItem("validateName",name);

    //var phone = $$("#pNo").val();
    var jsonmembercom = '{"method":"loyalityRegistration", "appId":"' + localStorage.getItem("appid") +
    '","name":"' + name + '","email":"' + localStorage.getItem("validateEmail") + '","mobile":"' + phone +
    '","deviceToken":"'+localStorage.getItem("DeviceToken")+'","pageId":"' + pageIdentifie +
    '","loyaltycardUniqueId":"' + pageData.loyaltyCard[g_LoyaltyIndex].loyaltycardUniqueId + '"}';

       console.log("check sign up--"+jsonmembercom);
    if (name == "")
    {
        Appyscript.alert(pageData.languageSetting.name);
    }
    else if (email=="")
    {

     Appyscript.alert(pageData.languageSetting.email);

    }
    else
        if (!Appyscript.validateEmail(localStorage.getItem("validateEmail"))) {
            Appyscript.alert("Invalid email id");
        }

    else {


             if(isOnline())
            {

            $$.ajax({
                    url: memberurl,
                    data: Appyscript.validateJSONData(jsonmembercom),
                    type: "post",
                    //321 headers: {'accessToken': deviceEncryptedToken},
                    async: true,
                    success: function(jsonData, textStatus) {
                    localStorage.setItem("MemRegJSON", jsonData);
                    var Data = JSON.parse(jsonData);

                    console.log("bhejbfcjhrechvferhfgvhfevbefvbefv"+Data);

                    if(Data.userStatus==0)
                    {
                     Appyscript.alert(pageData.languageSetting.accountHasBeenDisable);  }
         else{
            if (Data.status == "succucess" || Data.status == "success") {
                   localStorage.setItem("validateEmail",localStorage.getItem("validateEmail"));
                    juserId = Data.userId;
                    jcardnumber = Data.cardNumber;
                    jfulltimecard = Data.fulltimecard;
                    jvalidTo = Data.validTo;
                    localStorage.setItem("isform","member");

                    Appyscript.getmemberInfo();
                    }
          }

                    },
                    error: function(error) {

                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrongsaramji_please_try_again,appnameglobal_allpages);

                    }
                    });
            }

            else{
                Appyscript.hideIndicator();
                Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);

            }



        }
}
Appyscript.getmemberInfo = function() {
    var Data = JSON.parse(localStorage.getItem("MemRegJSON"));
   if (Data != null && Data.status == "succucess" || Data.status == "success")  {
        pageData.memberMe = Data;
        pageData.memberRegister = 1;
        pageData.memberMe.userName=localStorage.getItem("validateName");
        juserId = Data.userId;
        jcardnumber = Data.cardNumber;
        jfulltimecard = Data.fulltimecard;
        jvalidTo = Data.validTo;
        jvalidFrom = Data.validFrom;
        var memberurl = webserviceUrl + "MemberCard.php";
        var jsonmembercom = '{"method":"memberCardPointsDetail", "appId":"' + localStorage.getItem("appid") +'","userId":"' + juserId + '","cardnumber":"' + jcardnumber + '"}';


        var _getMemberGroup = pageData.memberMe.groupName;
         g_LoyaltyIndex= pageData.loyaltyCard.findIndex(function(v){
                                    return v.groupName==_getMemberGroup;
            })

        if(g_LoyaltyIndex=="-1" || g_LoyaltyIndex == ""){
                 g_LoyaltyIndex= pageData.loyaltyCard.findIndex(function(v){
                    return v.groupName=="default" || v.groupName == "" || v.groupName=="Default" ;
                })
         }

        if(isOnline())
        {
        $$.ajax({
                url: memberurl,
                data: Appyscript.validateJSONData(jsonmembercom),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(jsonData, textStatus) {
                var Data = JSON.parse(jsonData);
                console.log("ndcjknejrvjketyiu8tguoituujfkvk  "+Data.points);

                  $$.each(pageData.loyaltyCard, function(index, element) {
                                        pageData.loyaltyCard[index].pointbalance=Data.points;
                  });
					setTimeout(function() {
						if(localStorage.getItem("isform") == "member") {
							$$.get("pages/loyaltycard.html", function (template) {
								var compiledTemplate = AppyTemplate.compile(template);
								var html = compiledTemplate(pageData);
								localStorage.setItem("isform","no");
								mainView.router.reloadContent(html);
							})
						}
						else {
							openPage("loyaltycard", pageData);
						}
						Appyscript.hideIndicator();
					}, 1000);
                },
                error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                }
                });
        }
        else{
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
        }

    }
}
var membercodebyindex;
Appyscript.loyatyredeem = function(a,unverslid) {
    membercodebyindex=unverslid;
    $$.get("pages/loyaltycard-redeem.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(pageData);
        jtype = a;
        mainView.router.load({
            content: html,
            animatePages: true
        });

        if(a=="add"){
                var points =  pageData.loyaltyCard[g_LoyaltyIndex].checkInPoints  || "" ;

                if(pageData.loyaltyCard[g_LoyaltyIndex].checkInPoints== "" ){
                        $$("#point_text").show();
                         $$("#point_text").val("");
                   }else{
                        $$("#point_text").hide();
                         $$("#point_text").val(points);
                   }

                                   $$("#handoverdiscription").text(pageData.languageSetting.handOverPoints);

                                   if(pageData.settings.disable_addpoint_scan_qr=="1"){
                                                $$("#div_QRCode").hide();
                                          }else{
                                               $$("#div_QRCode").show();
                                          }

                                   var _lengthFlag=0;;
                                   if(pageData.loyaltyCard[g_LoyaltyIndex].enableAddPointsCheckIn==1){

                                       var _radiusArr=pageData.loyaltyCard[g_LoyaltyIndex].addrRadius;
                                       for(var i=0;i<_radiusArr.length;i++){
                                               if(_radiusArr[i].checkInAddress == "" || _radiusArr[i].checkInRadius == "" ){
                                                       _lengthFlag++;
                                               }
                                       }

                                       if(_lengthFlag == _radiusArr.length){
                                              $$("#div_CheckinManual").hide();
                                       }else{
                                              $$("#div_CheckinManual").show();
                                       }

                                   }else{
                                       $$("#div_CheckinManual").hide();
                                   }
                   }else if(a=="redeem") {

                      $$("#handoverdiscription").text(pageData.languageSetting.redeemPoints);
                      $$("#div_CheckinManual").hide();
                   }else{

                    $$("#handoverdiscription").text(pageData.languageSetting.handOverPoints);

                   }

    });
}

Appyscript.loyatyTerms = function(a) {
    $$.get("pages/loyaltycard-terms.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(pageData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}



Appyscript.memberoperation = function() {
    if (!$$("#code_text").is(".on")) {
          $$("#code_text").show().addClass("on");
          return false;
      }
    Appyscript.showIndicator();
   var currentpoint = parseInt($$(".pointBalance").html());
    var point = $$("#point_text").val();
    var code = $$("#code_text").val();

    if (point == '')
    {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.redeemPointsNotBlank);

    }
	else
	    if(isDecimalNumber(point)){
         Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.enterValidPoints,data.appData.appName);
		return;
    }


    else if(code == ''){

        Appyscript.hideIndicator();
		  Appyscript.alert(pageData.languageSetting.enterSecurityPoints);
       // Appyscript.alert(AppyTemplate.global.commonLanguageSetting.member_card_security_code_can_not_left_blank);
    }
    else {
		if(jtype=='redeem')
        {
          if(currentpoint<point)
           {
            Appyscript.hideIndicator();
			 Appyscript.alert(pageData.languageSetting.memberCardEnterPointMustNotBeMore);
            // Appyscript.alert(AppyTemplate.global.commonLanguageSetting.member_card_enter_point_must_not_be_more_than_current_point);
            return;
           }
        }
        if (code ==pageData.loyaltyCard[membercodebyindex].loyaltycardUnlockCode) {
             Appyscript.getSurvicehit(point,"not_ManualCheckin");
        } else {
            Appyscript.hideIndicator();
            Appyscript.alert(pageData.languageSetting.redeemEnterValidCode);
        }
    }
}


Appyscript.getSurvicehit = function(point,fromFlag) {
var myDate=jvalidTo;
myDate=myDate.split("-");
var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];


 if(pageData.loyaltyCard[g_LoyaltyIndex].timeLimitStatus == 1 && jtype == 'add' && fromFlag=="manualCheckin"){
      if(validateTimeAddPoint()==false){
      Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.timeRangeValidation,data.appData.appName);
        return false;
      };
    }

   if(jtype=="add"){
        if(pageData.loyaltyCard[g_LoyaltyIndex].checkInPoints==""){
            point = $$("#point_text").val();
            if (point == '') {
                Appyscript.hideIndicator();
                Appyscript.alert(pageData.languageSetting.redeemPointsNotBlank);
                return false;
            }
        }else{
            point=pageData.loyaltyCard[membercodebyindex].checkInPoints;
        }
    }

var timestamp=new Date(newDate).getTime();

 var getDate = formatDateLoyalty();
console.log(new Date(newDate).getTime());
    var memberurl = webserviceUrl + "MemberCard.php";
    var jsonmembercom = '{"method":"memberCardPoints", "appId":"' + localStorage.getItem("appid") +
            '","userId":"' + juserId + '","cardnumber":"' + jcardnumber + '","fulltimecard":"' +
            jfulltimecard + '","validTo":"' + timestamp + '","points":"' + point + '","type":"' +
            jtype + '","timeFrom":"' + pageData.loyaltyCard[membercodebyindex].timeFrom + '","timeTo":"' + pageData.loyaltyCard[membercodebyindex].timeTo+ '","timeLimitStatus":"' + (pageData.loyaltyCard[membercodebyindex].timeLimitStatus ==1? "true" : "false") + '","dailyLimit":"' + (pageData.loyaltyCard[g_LoyaltyIndex].dailyLimitStatus =="1"? pageData.loyaltyCard[g_LoyaltyIndex].dailyLimit : "false") + '","pointsAddedDate":"' + getDate + '"}';
     if(isOnline())
    {
    $$.ajax({
        url: memberurl,
        data: Appyscript.validateJSONData(jsonmembercom),
        type: "post",
        //321 headers: {'accessToken': deviceEncryptedToken},
        async: true,
        success: function(jsonData, textStatus) {
            Appyscript.hideIndicator();
            jsonData=JSON.parse(jsonData);
            if(jsonData.status=="limit_exceeded"){
                 Appyscript.alert(pageData.languageSetting.dailyStampsAlreadyUsed.replace("__USERNAME__",localStorage.validateName || ""),data.appData.appName);

                mainView.router.back();
                return false;
            }
              if(jsonData.status=="time_limit_exceeded"){

                 if(pageData.languageSetting.sorry_request_cannot_be_processed)
                 {
                 Appyscript.alert(pageData.languageSetting.sorry_request_cannot_be_processed,data.appData.appName);
                 }
                 else
                 {
                  Appyscript.alert('Sorry! Your request cannot be processed at this time',data.appData.appName);
                 }

                mainView.router.back();
                return false;
            }

            if(jsonData.status=="point_limit_exceeded"){
                 Appyscript.alert(pageData.languageSetting.memberCardEnterPointMustNotBeMore,data.appData.appName);
                    points = parseInt(jsonData.totalPoints);
                    $$(".pointBalance").html(points +
                    '<span class="pointMark">' + pageData.languageSetting.points + '</span><span class="pointBalText">' + pageData.languageSetting.balance + '</span>'
                );
                document.getElementById("availablepoints").innerHTML = pageData.languageSetting.availablePoints + ": " + parseInt($$(".pointBalance").html());
                return false;
            }

            var points;
            if(jtype=='add')
            {

                 points = parseInt($$(".pointBalance").html()) + parseInt(parseFloat(point));
            }
            else{

             points = parseInt($$(".pointBalance").html()) - parseInt(parseFloat(point));
            }
            $$(".pointBalance").html(points +
                '<span class="pointMark">'+pageData.languageSetting.points+'</span><span class="pointBalText">'+pageData.languageSetting.balance+'</span>'
            );

             if(fromFlag=="manualCheckin"){
               Appyscript.alert(pageData.languageSetting.manualCheckingSuccess.replace("__USERNAME__",localStorage.validateName || "").replace("__POINTS__", pageData.loyaltyCard[g_LoyaltyIndex].checkInPoints ), data.appData.appName);
             }else{
                   if(jtype == 'add'){
                   Appyscript.alert(pageData.languageSetting.defaultPointAddSuccess.replace("__USERNAME__",localStorage.validateName || "").replace("__POINTS__", point ), data.appData.appName);
                   }
              }
            mainView.router.back();

        },
        error: function(error) {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
        }
    });
    }


    else{
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);

    }
}


function verifyqrcode(gotcode) {
    var point = $$("#point_text").val();
    if (point == null||point==""){
        Appyscript.alert(pageData.languageSetting.redeemPointsNotBlank);
    } else{
        var code = gotcode.split(":");
        var value = parseInt(code[1]);
        if(value == pageData.loyaltyCard[membercodebyindex].loyaltycardUnlockCode){
            Appyscript.getSurvicehit(point,"not_ManualCheckin");
        } else{
            Appyscript.alert(pageData.languageSetting.redeemEnterValidCode);
        }
    }

}

Appyscript.onPageInit("loyaltycard-RedeemPage", function(page) {
                      document.getElementById("availablepoints").innerHTML=pageData.languageSetting.availablePoints+": "+parseInt($$(".pointBalance").html());
                      });




//////// iphone native//////////////

Appyscript.QrCodeLoyaltyCard = function(gotcode) {

  $$("#code_text").hide().removeClass("on");

    if(Appyscript.device.android)
    {
    var currentpoint = parseInt($$(".pointBalance").html());
    var point = $$("#point_text").val();
	if (point == null||point=="")
      {
            Appyscript.alert(pageData.languageSetting.redeemPointsNotBlank);
             Appyscript.hideIndicator();
            return;
      }
	    else  if(isDecimalNumber(point)){
         Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.enterValidPoints,data.appData.appName);
    }else if(jtype=='redeem')
     {
        if(currentpoint<point)
        {
                  Appyscript.alert(pageData.languageSetting.memberCardEnterPointMustNotBeMore);
                  Appyscript.hideIndicator();
               return;
        }
     }
    //var fromloyality='membercard';
    //window.location="scanner:"+fromloyality;
    AppyPieNative.validateLoyaltyViaScanner(gotcode, pageData.pageTitle);

    }

    else{
        var currentpoint = parseInt($$(".pointBalance").html());
        var point = $$("#point_text").val();
        if(jtype=='redeem')
        {
            if(currentpoint<point)
            {
                       Appyscript.alert(pageData.languageSetting.redeemPointsNotBlank);
                return;
            }
        }
        var fromloyality='membercard';
        window.location="scanner:"+fromloyality;
    }
}

function isDecimalNumber(n){
     return n % 1 != 0
}
//
//Appyscript.loyalityCardView = function(data) {
//    openPage(pageId, pageData);
//}
//
//Appyscript.getloyaltyId = function() {
//    $$.get("jsonData/loyaltycard.json", function(data) {
//           data = JSON.parse(data).list[0].loyaltycardUniqueId;
//           return data;
//           });
//}
//Appyscript.getCode = function() {
//    $$.get("jsonData/loyaltycard.json", function(data) {
//           data = JSON.parse(data).home.loyaltycardUnlockCode;
//           return data;
//           });
//}
//
//
//Appyscript.getpageId = function() {
//    $$.get("jsonData/manifest.json", function(data) {
//           data = JSON.parse(data).home.loyaltycardUniqueId;
//           return data;
//           });
//}



AppyTemplate.registerHelper('ifCondloyaljs', function(v2, options) {
                            if(pageData.memberMe.groupName === v2) {

                            return options.fn(this);
                            }
                            return options.inverse(this);
                            });



AppyTemplate.registerHelper('ifCondloyaljsnofond', function(v2, options) {

                            var testloyalarray=[];

                            $$.each(pageData.loyaltyCard, function(index, element) {

                                                            var pointcount=pageData.loyaltyCard[index].pointbalance;
                                                                        pointcount=pointcount.toString().length;
                                                                        var pointcounttemp;
                                                                        if (pointcount>4)
                                                                        {
                                                                        pointcounttemp="2";
                                                                        }
                                                                        else{
                                                                        pointcounttemp="";
                                                                        }
                                                                        element.pointcount= pointcounttemp;

                                                           console.log(element.groupName+index)

                                                           testloyalarray.push(element.groupName)


                                                           });


                            if(testloyalarray.indexOf(pageData.memberMe.groupName) != "-1"){

                             return options.inverse(this);

                            }else{

                       return options.fn(this);
                            }


                            });


                            Appyscript.onPageInit("loyaltycard-page", function(page) {

                                if (localStorage.userid != '' && localStorage.userid != null) {
                                    $$("#memberemailId").val(localStorage.email);
                                    $$("#memberfname").val(localStorage.username);
                                    $$("#memberpNo").val(localStorage.phone);
                                }

                            });

AppyTemplate.registerHelper('showhideaddbutton', function(dataval,keyIndex) {

                            if(dataval =="1"){
                            compiledBGTemplate=AppyTemplate.compile('<a class="btnStyle btnMargin {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" onclick=Appyscript.loyatyredeem("add","'+keyIndex+'") style="background:{{@global.styleAndNavigation.button[2]}}; color:{{@global.styleAndNavigation.button[3]}}">{{@global.pageLanguageSetting.add}} </a>');
                            bghtml=compiledBGTemplate();
                             return bghtml;

                            }else{
                            return "";
                            }



                            });
AppyTemplate.registerHelper('showhideaddbutton2', function(dataval,keyIndex) {

                            if(dataval =="1"){
                            compiledBGTemplate=AppyTemplate.compile('<a class="btnStyle btnMargin {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" onclick=Appyscript.loyatyredeem("add","'+keyIndex+'") style="background:{{@global.styleAndNavigation.button[2]}}; color:{{@global.styleAndNavigation.button[3]}}">{{@global.pageLanguageSetting.add}}</a>');
                            bghtml=compiledBGTemplate();
                            return bghtml;

                            }else{
                            return "";
                            }



                            });


//============ Member Card --> Loyalty Card Changes ------------------------//

function initCurrentAddressMemberCard() {
    navigator.geolocation.getCurrentPosition(memberCard_Position_Success, memberCard_Position_Error);
}

function memberCard_Position_Success(position) {
   g_Latitude= position.coords.latitude;
   g_Longitude= position.coords.longitude;
}

function memberCard_Position_Error(error) {
    Appyscript.alert("Permission Error", data.appData.appName);
}

//----------Function to check checkin time and all------------//

function validate_MemberCard(){
       $$("#code_text").hide().removeClass("on");
    check_MemberCardValidations_Promise().then(function(flag){
        console.log(flag);
       if(flag==true){
            Appyscript.getSurvicehit(pageData.loyaltyCard[g_LoyaltyIndex].checkInPoints,"manualCheckin");
       }else{
            Appyscript.alert(pageData.languageSetting.notRangeLocation.replace("__USERNAME__",localStorage.validateName || ""),data.appData.appName);
       }
    });
}

function check_MemberCardValidations_Promise(){
    var _getLocationArray = pageData.loyaltyCard[g_LoyaltyIndex].addrRadius;
    var _getLatitude = 0;
    var _getLongitude = 0;
    var _splitLatLong=[];
    var _distanceCheckIn;
    var _locationFlag=false;
    return new Promise(function(resolve,reject){
        for(var i=0;i<_getLocationArray.length;i++){
            _splitLatLong=(_getLocationArray[i].latlong).split(",")
            _distanceCheckIn=  calcCrow(parseFloat(_splitLatLong[0]),parseFloat(_splitLatLong[1]));
            if(_distanceCheckIn<=_getLocationArray[i].checkInRadius){
              _locationFlag= true;  //In location, can checkin
            }
        }
        resolve(_locationFlag);
    });
}

function calcCrow(lat2, lon2)
{
  var R = 6371; // km
  var dLat = toRad(lat2 - g_Latitude);
  var dLon = toRad(lon2 - g_Longitude);
  var lat1 = toRad(g_Latitude);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000;
}

// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}

function validateTimeAddPoint(){
    var _getLoyaltyDetailArray=pageData.loyaltyCard[g_LoyaltyIndex];

    var getCurrentDate = new Date();
    var getAlwaysFrom;
    var getAlwaysTo;
    var alwaysToTime;
    var alwaysFromTime;

    getAlwaysFrom=(_getLoyaltyDetailArray.timeFrom).split(":");
    getAlwaysTo=(_getLoyaltyDetailArray.timeTo).split(":");

    alwaysToTime = (new Date()).setHours(parseInt(getAlwaysTo[0]));
    alwaysToTime=(new Date(alwaysToTime)).setMinutes(parseInt(getAlwaysTo[1]));

    alwaysFromTime = (new Date()).setHours(parseInt(getAlwaysFrom[0]));
    alwaysFromTime=(new Date(alwaysFromTime)).setMinutes(parseInt(getAlwaysFrom[1]));
    getCurrentDate=(new Date(getCurrentDate)).getTime();

    if(getCurrentDate > (new Date(alwaysFromTime)).getTime() && getCurrentDate <= (new Date(alwaysToTime)).getTime()){
          return true;
    }else{
          return false;
    }
}

function formatDateLoyalty(){
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    return y+"-"+(m.toString().lengsxzth==1?"0"+m:m)+"-"+(d.toString().length==1?"0"+d:d);
}