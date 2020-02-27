var firstTimeGlobal="true";
var site_url="";
var dataGlobalDownload;
var data;
var $$ = Dom7;
var globalImageUrls;
var hasEncryptedDeviceToken=false;
var deviceEncryptedToken = '';
var webserviceUrl = "";
var googleMapLoad="false";
var locationCheck="true";


var OriginalEwalletPayPalId="";
var OriginalEwalletAmount = "";



//TODO:E-WALLET Model
var ewalletModel = {
ewalletpayid:"",
ewalletAppid:"",
userTransdata:undefined,
balanceAmount:0,
currencySymbol:"$",
ewalletAvailable:undefined,
currencySymbolName:"usd",
ewalletPayPalId:"",
ewalletPayPalAmount:"",
touchidOrfaceidStatus:false,

settouchidOrfaceidStatus:function(status) {

if(AppyPieNative.isAllowFingerPrint() && status){
ewalletModel.touchidOrfaceidStatus = true;
}else{
ewalletModel.touchidOrfaceidStatus = false;
}

},

gettouchidOrfaceidStatus:function() {
    return ewalletModel.touchidOrfaceidStatus;

},

setcurrencySymbolName:function(currency_name) {
    if(currency_name == undefined || currency_name == "undefined" || currency_name == null || currency_name.length == 0) {
        ewalletModel.currencySymbolName = "USD"

    }

    ewalletModel.currencySymbolName = currency_name.toUpperCase();

},

getcurrencySymbolName:function() {
    return ewalletModel.currencySymbolName;

},

setewalletAvailableStatus:function(status) {
   ewalletModel.ewalletAvailable = status;

},

getewalletAvailableStatus:function() {
    if(ewalletModel.ewalletAvailable != undefined){
        return ewalletModel.ewalletAvailable;

    }else {
        ewalletModel.setewalletAvailableStatus(Appyscript.ewalletAvailable());
        return ewalletModel.ewalletAvailable;

    }

},

setcurrencySymbol:function(symbol){
   ewalletModel.currencySymbol = symbol;

},

getcurrencySymbol:function() {
   return ewalletModel.currencySymbol;

},

setbalanceAmount:function(amount) {
    ewalletModel.balanceAmount = amount;

},

getbalanceAmount:function() {
  return ewalletModel.balanceAmount;

},

getewalletpayId:function() {
    return ewalletModel.ewalletpayid;

},

getewalletAppId:function() {
    return ewalletModel.ewalletAppid;

},

getEwalletPayPalId:function() {
    return ewalletModel.ewalletPayPalId;

},

getEwalletPayPalAmount:function() {
    return ewalletModel.ewalletPayPalAmount;

},


setuserTransdata:function(data) {
    ewalletModel.userTransdata = data;

},

getuserTransdata:function() {
    return ewalletModel.userTransdata;

}

};

function setewalletAppId(id) {
    ewalletModel.ewalletAppid = id;
    var loginstatus = true;
    if(localStorage.getItem("userId") == "" || localStorage.getItem("userId") == undefined) {
      loginstatus = false;
    }
    if(data.callback_method != undefined)(data.callback_method(loginstatus))
}

function setewalletpayId(id) {
    ewalletModel.ewalletpayid = id;

}

function setPayPalAmount(amount) {
    ewalletModel.ewalletPayPalAmount = amount;

}

function setEwalletPayPalId(payId) {
    ewalletModel.ewalletPayPalId = payId;

}



function setOrginalEwalletData(payId,amount){


OriginalEwalletAmount= amount;

OriginalEwalletPayPalId=payId;

}

function prepareewallet() {
    setTimeout(function(){initialSetupforEwallet(); },100);

}


//-----
//--------- Mobile and Desktop--------------
if (document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1 && typeof require != 'function') {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "cordova.js";
    document.getElementsByTagName("head")[0].appendChild(s)
     document.addEventListener("deviceready", function() {
                                 localStorage.setItem("appstart","true");
                                 JsonDownloadAtStart();
   							     localStorage.setItem("timesheet","false");
                                 }, false);
}
else {

 if(hasEncryptedDeviceToken){
  JsonDownloadAtStart();
 }

}



function JsonDownloadAtStart(){
//	document.addEventListener("backbutton", backDeviceManage, false);
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, successLoadDirectory, failLoadDirectory);
}


 /* function backDeviceManage(){
        var datap = $$(mainView.activePage.container).attr("data-page");
	   if( datap== "thankyou" ||datap== "ecommerce-thankyou" || datap== "foodordering-thankyou"){
	        return false;
	    }

		var backValue=mainView.history[mainView.history.length - 2];
		var backIndex= backValue.substring(backValue.lastIndexOf('/')+1);

        if(data.login.autoLogin =='true' && (localStorage.getItem("email") == undefined || localStorage.getItem("email") =="")){
        Appyscript.exitApp();
        			return;
        }
         //$(".popup .navbar-inner .back").length
		if(localStorage.getItem("popup")=='true') {
			Appyscript.popupClose();
		}
		else if(backIndex == "index.html") {
			Appyscript.exitApp();
		}
		else {
			Appyscript.hyperLocalHardwareBackButton();
			Appyscript.popupClose();

			if($$(".timeSelector")){$$(".timeSelector").hide()};

			mainView.router.back();
			AppyTemplate.global.innerLayout = 0;
		}
		Appyscript.hideIndicator();
  }*/

   function backDeviceManage(){

           var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messessnger|accommodation|education|fitness|demanddelivery";
            var datap = $$(mainView.activePage.container).attr("data-page");
            var guestLoginCheck  = $$(".loginpopup").attr("data-page");
            var exitFlag = !localStorage.popup;
           if(guestLoginCheck ==="settingguest" || guestLoginCheck==="error"){
           return false;
           }

            if( datap == "NotificationPage"){
                exitFlag = false;
            }


             if(datap=="bottom_website" && isSinglePage && !folderPage)
                    {
                    Appyscript.exitApp();
                      	         return;

                    }

                    if(datap=="bottom_website")
                    {
                    $$(".backWebsite")[0].click();
                                          return;
                    }

//                    if(datap == "blog-DetailsPage")
//                     {
//                     Appyscript.clickHome();
//                      return;
//                    }

          if(data.appData.termcondition.heading!="" || ((pageId=="socialnetwork" || pageId=="dating") && data.appData.userlicenceagreement.heading!="")){
          if(!localStorage.getItem("acceptedtermscheck") && exitFlag){
              Appyscript.exitApp();
              return;
          }

          }



  	   if( datap== "thankyou" ||datap== "ecommerce-thankyou" || datap== "foodordering-thankyou" || datap=="foodcourt-thankyou" || datap=="accommodation-confirmation-page" || datap=="dinein-thankyou" || datap=='ewallet-paymentstatus' || datap=='demanddelivery-paymentconfirm' || datap=='demanddelivery-paymentconfirmAdmin' || datap=='demanddelivery-paymentconfirmcallback'){
  	        return false;
  	    }

  	     if( datap== "foodcourt-FOLS"){
  	          mainView.router.back()
  	         Appyscript.cancelsearch();
          	        return false;
          	    }


  	    if(isHideBackButton && localStorage.getItem("popup")=='false')
  	    {
  	        Appyscript.exitApp();
  	         return;
  	    }else if(isOpenFragmentWithBottom && localStorage.getItem("popup")=='true')
  	    {
               Appyscript.showWebViewFragment();

  	    }else if($$(".loginView").length==1 && data.loginfield.loginSetting.enableTouchId==1){
  	                 Appyscript.exitApp();
          	         return;
  	    }else if(datap == "quote-FavouritePage"){
                  mainView.router.back();
                  setTimeout(function(){
                  Appyscript.params.swipePanelActiveArea=0.5;
                  },1000);
                  return;
  	    }



  		var backValue=mainView.history[mainView.history.length -2];
  		var backIndex= backValue.substring(backValue.lastIndexOf('/')+1);

          if(data.login.autoLogin =='true' && (localStorage.getItem("email") == undefined || localStorage.getItem("email") =="")){
                 Appyscript.exitApp();
          			return;
          }

              /*if(AppyTemplate.global.style.layout == "bottom" &&  backIndex == "#content-1" && pageData.pageId == "onetouch" && pageData.onetouch_option_1 == "external_link")
                 {
                    Appyscript.exitApp();
                      return;
                 }*/



           //$(".popup .navbar-inner .back").length

  		if(localStorage.getItem("popup")=='true') {
  			Appyscript.popupClose();
  		}

        else if(pageId=="services" && data.appData.layout =="bottom" && AppyTemplate.global.style.autoLoadFirstPage=="YES" && data.home.length=="1"){
          Appyscript.clickHome();
        }
          else if((strList.indexOf(pageId) != -1) && mainView.history.length=="2" && (data.appData.layout != "slidemenu" && data.appData.layout != "slidemenu3d" ) && (data.appData.layout =="bottom" || AppyTemplate.global.style.autoLoadFirstPage=="YES" ))
          {
             Appyscript.clickHome();
          }
  		else if(backIndex == "index.html" ) {
  			Appyscript.exitApp();
  		}
  		else {
  		    try{
  		        Appyscript.hyperLocalHardwareBackButton();
  		    }catch(err){
  		        console.log(err);
  		    }
  		    if(datap == "customevent-page" && data.appData.layout =="bottom")
            {
                  globalPage = false;
                   Appyscript.clickHome();
                   return;
            }

  			Appyscript.popupClose();

  			if($$(".timeSelector")){$$(".timeSelector").hide()};

  			mainView.router.back();
  			if(datap == "customevent-page" && data.appData.layout =="bottom")
  			{
  		          globalPage = false;
  			}
  			AppyTemplate.global.innerLayout = 0;
  		}

  		if(datap == "photo-Page" && localStorage.getItem("popup")){
  		    myPhotoBrowser.close();
            localStorage.setItem("popup", "false");
  		}

  		Appyscript.hideIndicator();
    }

function failLoadDirectory()
{
    alert('FailLoadDirectry');
}

function successLoadDirectory(fileSystem){
try{
    AppyPieNative.getToken();
}catch(error){}

 if( localStorage.getItem("appstart")=="true"){
        //if(isOnline()){
            localStorage.removeItem("appid");
            localStorage.setItem("appstart","false");
       // }
    }

    if(localStorage.userid != "" && localStorage.userid != undefined && localStorage.userid != "undefined") {prepareewallet() }

    fileSystemGlobal=fileSystem;
    if(!localStorage.getItem("appid")){
        ReadDataFromDocumentDirectry('true');
    }
    else{
        menifestDownload();
    }
}



function ReadDataFromDocumentDirectry(firsttime){
    window.rootFS = fileSystemGlobal.root;
    var documentPath=fileSystemGlobal.root.toURL();
    var xmlPath=documentPath;
    console.log("ReadDataFromDocumentDirectry firsttime : "+firsttime);
    if(documentPath.indexOf('file://')!=-1)
    {
        documentPath=documentPath.replace('file://','');
        xmlPath=xmlPath.replace('file://','');
        if(documentPath.indexOf('//')!=-1)
        {
            documentPath=documentPath.replace('//','/');
            xmlPath=xmlPath.replace('//','/');
        }
    }
    xmlPath=xmlPath+localStorage.getItem("appid");
//    xmlPath = "/data/data/com.appypie.snappy/files/files/manifest.json";
    if(firsttime=='true')
    {
        xmlPath='manifest.json';
    }
  //  xmlPath='manifest.json';
   localStorage.setItem("dummysocial", xmlPath);
    $$.ajax({
            type: 'get',
            url: xmlPath,
            data: {},
            success: function(txtxml)
            {
            var object=JSON.parse(txtxml);
            data=object;
            localStorage.setItem("appid",data.appData.appId);
            localStorage.setItem("prevVersion",data.appData.version);
            localStorage.setItem("piwikId",data.appData.piwikId);
            localStorage.setItem("appName",data.appData.appName);
            localStorage.setItem("lang",data.appData.lang);
            site_url=data.appData.reseller;
            webserviceUrl=site_url + "/webservices/"
            localStorage.setItem("webserviceUrl",webserviceUrl)

			localStorage.setItem("site_url",site_url);

            appid=data.appData.appId;

            if(firsttime!='true')
                        {
                        AppyTemplate.global={};
                        //-- pass global variable and vlaues
                        AppyTemplate.global = {
                            name: data.appData.appName,
                            style:data.appData,
                            homeIconPath:data.login.iconPath,
                            iconpath:data.login.iconPath,
                            loginData:data.loginfield,
                            commonLanguageSetting:data.languageSetting
                        };
                        var previousLayout  = localStorage.getItem("appLayout");
                        if(previousLayout){
                        if(previousLayout==data.appData.layout){
                                checkIconImages();
                        }
                        else{
                        localStorage.setItem("appLayout",data.appData.layout);
                        AppyTemplate.global.homeIconPath = data.login.iconPath;
                        deleteImageIconDirectory();
                        }
                        }
                        else{
                        localStorage.setItem("appLayout",data.appData.layout);
                         checkIconImages();
                        }



                        //  ------------------------------------ nishant changes end---------------------------//

						 if(data.appData.fbAnalyticId)
                                      {
                                          if(data.appData.fbAnalyticId.length>0)
                                          {
                                              window.fbAsyncInit = function() {
                                              FB.init({
                                                      appId      : data.appData.fbAnalyticId,
                                                      xfbml      : true,
                                                      version    : 'v2.8'
                                                      });
                                                 //FB.AppEvents.logPageView("test");
                                                 FB.AppEvents.logPageView("Splash Screen");
                                                 //FB.AppEvents.logEvent("Home Screen");
                                              };

                                              (function(d, s, id){
                                               var js, fjs = d.getElementsByTagName(s)[0];
                                               if (d.getElementById(id)) {return;}
                                                js = d.createElement(s); js.id = id;
                                                js.src = "https://connect.facebook.net/en_US/sdk.js";
                                                fjs.parentNode.insertBefore(js, fjs);
                                                }(document, 'script', 'facebook-jssdk'));
                                          }
                                      }

                       AppendAllJs();

                        }
            else
            {
            dataGlobalDownload=localStorage.getItem("jsonDataval");
            firstTimeGlobal="true";
            fileSystemGlobal.root.getFile(localStorage.getItem("appid"), {create: true, exclusive: false}, gotFileEntry, fail);

            }
            },
            error:function(response, textStatus, errorThrown)
            {
                 ReadDataFromDocumentDirectry(firsttime);
            }
            });
}

function menifestDownload()
{
console.log("deviceEncryptedToken : " + deviceEncryptedToken);
//if(deviceEncryptedToken)
//{


    console.log("deviceEncryptedToken from JS : " + deviceEncryptedToken);
    console.log("AppyPieNative.checkNetworkAvailability : " + AppyPieNative.checkNetworkAvailability());
    if(AppyPieNative.checkNetworkAvailability())
    {
           if(deviceEncryptedToken == ""){
                deviceEncryptedToken = "sfdgdsvdasfdafdg";
           }
        var loginServiceURL=site_url+'/webservices/Manifast.php';
        $$.ajax({
                url: loginServiceURL,
                data:'{"method":"getApp","appId":"'+localStorage.getItem("appid")+'","prevVersion":"'+localStorage.getItem("prevVersion")+'"}',
                type: "post",
                async: true,
                success: function(jsonData, textStatus ){
                console.log("Updated Manifast : "+jsonData);

                var dt = JSON.parse(jsonData);
                if(jsonData=='null')
                {
                    ReadDataFromDocumentDirectry();
                }
                else{
                    if(dt.msg!="Forbidden"){
                     localStorage.setItem("jsonDataval",jsonData)
                        dataGlobalDownload=jsonData;
                        firstTimeGlobal="false";
                        fileSystemGlobal.root.getFile(localStorage.getItem("appid"), {create: true, exclusive: false}, gotFileEntry, failmenifestDownload);
                    }else{
                        ReadDataFromDocumentDirectry();
                    }
                }
                },error: function(error) {
                        console.error(error);
                        //alert("Manifest Download ERROR Token : "+deviceEncryptedToken);
                }
                });

    }
    else
    {

        firstTimeGlobal="false";
        ReadDataFromDocumentDirectry();
    }

}
//else{
//AppyPieNative.getToken();
//
//}


//}


function gotFileEntry(fileEntry)
{
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    try{
        AppyPieNative.getToken();
    }catch(error){}
    writer.onwriteend = function(e) {

        if(firstTimeGlobal=='true')
        {
            menifestDownload();
        }
        else
        {
            ReadDataFromDocumentDirectry();
        }
    };

    writer.onerror = function(e) {
        console.error("File Write ERROR : "+e);
    };
    writer.write(dataGlobalDownload);

}
function failmenifestDownload()
{
    alert('FailmenifestDownload');
}
function fail()
{
    alert('Fail');
}
var flagtempscript=0;
var globalflag=0;
function AppendAllJs()
{
if(data.appData.layout == "slidemenu3d") {
	 var sm = document.createElement("script");
     sm.type = "text/javascript";
     sm.src = "js/slidemenu3d.js";
     document.body.appendChild(sm);
}
        //if(flagtempscript==0){
        if(globalflag==0)
                          {


        var s = document.createElement("script");
           s.type = "text/javascript";
           s.src = "js/AppyPie.js";
           document.body.appendChild(s);
           }


         //}

//
//             var mapkey= data.googlePlacesApiKey;
////             var mapkey= "AIzaSyA7KFb_YPxkehANZAlddsfcNH_E16fjs_M";
//             var googleApi  =  "https://maps.googleapis.com/maps/api/js?v=3.exp&key="+mapkey+"&sensor=true&libraries=places";
            AppyTemplate.global.eulaheaderbartitle =  data.appData.userlicenceagreement.heading;
            AppyTemplate.global.eulaheading = data.appData.userlicenceagreement.heading;
            AppyTemplate.global.eulaAcceptButton = data.appData.userlicenceagreement.acceptButton;
            AppyTemplate.global.eulacontent=data.appData.userlicenceagreement.content;
var jsArray= ["js/login.js","js/ereader.js","js/feednami.js","js/sinch.js","js/AndroidNative.js","js/hammer.min.js","plugins/calendar-plugin/www/Calendar.js","js/languagesetting.js","https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js","js/ssutilities.js", "js/helper.js","js/notification.js","js/firebase.js","js/redirect.js", "js/foodcourt.js","js/photo-sphere-viewer.min.js", "js/three.min.js","js/ewallet.js","js/news.js", "js/paymentgateways.js"];


   setTimeout(function(){

 if(globalflag==0)
                  {
               globalflag=1;
               var s = document.createElement("script");
               s.type = "text/javascript";
               s.src = "js/service.js";
               document.getElementsByTagName("head")[0].appendChild(s)

               }

    for(var i=0;i<jsArray.length;i++)
    {

    //if(flagtempscript == 0){
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = jsArray[i];
        document.body.appendChild(s);
        Appyscript.hideIndicator();
     //}
        if(i==jsArray.length-1)
        {
        flagtempscript=1;
            setTimeout(function(){
                       var appLock = '';
                       if(data.appData.blockDeviceType)
                       {
                       appLock=data.appData.blockDeviceType;
                       }
                       var array_androidString=appLock.split(",");
                       if(appLock=="Android" && data.appData.resellerId>0 || array_androidString[1] == "Android" && data.appData.resellerId>0)
                       {
                       Appyscript.stopSplash();
                       $$.get("popups/app-lock.html", function (template) {
                              var compiledTemplate = AppyTemplate.compile(template);
                              var JSONvalue={};
                              var html = compiledTemplate();
                              Appyscript.popup(html);
                              });
                       Appyscript.hideIndicator();
                       }
                       else if(data.appData.appBandwidthExceeded=="true")
                       {
                       Appyscript.stopSplash();
                       $$.get("popups/app-lock.html", function (template) {
                              var compiledTemplate = AppyTemplate.compile(template);
                              var JSONvalue={};
                              var html = compiledTemplate();
                              Appyscript.popup(html);
                              });
                       Appyscript.hideIndicator();
                       }
                       else
                       {
                       var termsheading ='';
                       if(data.login.autoLogin=="true"){
                       if(data.appData.termcondition.content!="")
                       {
                       termsheading=data.appData.termcondition;
                       if(localStorage.getItem("termscondition"+data.appData.appId))
                       {
                       createApplication();
                       }
                       else if(data.appData.termcondition.content){
                       Appyscript.stopSplash();
                       $$.get("popups/terms.html", function (template) {
                              var compiledTemplate = AppyTemplate.compile(template);
                              var html = compiledTemplate(termsheading);
                              Appyscript.popup(html);
                              });
                       Appyscript.hideIndicator();
                       }
                       else
                       {
                        createApplication();
                       }
                       }else if(data.appData.userlicenceagreement.content!=""){
                          Appyscript.stopSplash();
                          if(localStorage.getItem("acceptedtermscheck")!="true"){
                                $$.get("popups/eula.html", function (template) {
                                        var compiledTemplate = AppyTemplate.compile(template);
                                        var html = compiledTemplate(termsheading);
                                        Appyscript.popup(html);
                                        });
                             Appyscript.hideIndicator();
			                }else{
                          createApplication();
                          }
                       }
                       else{
                       createApplication();
                       }
                       }else{
                       if(data.appData.termcondition.content!="")
                       {
                              termsheading=data.appData.termcondition;
                              if(localStorage.getItem("termscondition"+data.appData.appId))
                              {
                              createApplication();
                              }
                              else if(data.appData.termcondition.content){
                              Appyscript.stopSplash();
                              if(localStorage.getItem("acceptedtermscheck")!="true"){
                              $$.get("popups/terms.html", function (template) {
                                     var compiledTemplate = AppyTemplate.compile(template);
                                     var html = compiledTemplate(termsheading);
                                     Appyscript.popup(html);
                                     });
                              Appyscript.hideIndicator();
			      }else{
                                 createApplication();
                                 }
                              }
                              else
                              {
                               createApplication();
                              }
                       } else{
                           createApplication();
                           }

                       }
                       }
                      if(data.geoFencing)
					  {
					        var geoFenceUrl=webserviceUrl+'Manifast.php';
					         if (isOnline())  {
                            $$.ajax({
                                   url: geoFenceUrl,
                                   data:'{"method":"getGeoFence","appId":"'+data.appData.appId+'","page":"1"}',
                                   type: "post",

                                   async: true,
                                   success: function(jsonData, textStatus ){
                                   console.log("getGeoFence : "+jsonData);

                                    var dt = JSON.parse(jsonData);
                                    Appyscript.startJeoFance(JSON.stringify(dt));
                                   },error: function(error) {
                                           console.error(error);
                                           //alert("Manifest Download ERROR Token : "+deviceEncryptedToken);
                                   }
                            });
 }
					  }
					   //Appyscript.startJeoFance(JSON.stringify(data.geoFencing));
					     Appyscript.hideIndicator();
                       },1000);
        }
    }
    // piwikAnalystics();
     Appyscript.hideIndicator();
    },1000);
   // globalImageUrls=AppyPieNative.getHeaderBGImg();
}

/*
code for downloading image icon for offline use..
@krishna
*/
function downloadIconImage(fileName){
    var url = data.login.iconPath+fileName;
    var fileURL = cordova.file.applicationStorageDirectory +"pageIconImages/"+fileName;
                     var fileTransfer = new FileTransfer();
                     fileTransfer.download(
                                           url,
                                           fileURL,
                                           function(entry) {
                                         //  console.log("download complete: " + entry.toURL());
                                           },
                                           function(error) {
                                          // console.log("download error source " + error.source);
                                           }
                                           );
                            }


function checkIconImages(){
    var path = cordova.file.applicationStorageDirectory +"pageIconImages/";
    var appPages = data.home;
    var appPagesWithImg = [];
    var uniqueAppPagesWithImg = [];
    appPages.forEach(function(item,index){
                     if(item.pageiconType == "img"){
                     appPagesWithImg.push(item.iconName);
                     }
                     })
    for ( i = 0; i < appPagesWithImg.length; i++ ) {
        var current = appPagesWithImg[i];
       // console.log(uniqueAppPagesWithImg.indexOf(current));
        if (uniqueAppPagesWithImg.indexOf(current) < 0) uniqueAppPagesWithImg.push(current);
    }

    var appPagesWithImgCount = uniqueAppPagesWithImg.length;
    var counter = 0;
    var index = 0;
    AppyTemplate.global.homeIconPath = data.login.iconPath;

    for(var i=0;i<uniqueAppPagesWithImg.length;i++){
       window.resolveLocalFileSystemURL(path+uniqueAppPagesWithImg[i], function (dir) {
                                    index++;
                                    counter++;
                                    if(counter==uniqueAppPagesWithImg.length){
                                    AppyTemplate.global.homeIconPath = path;
                                    }
                                    else{

                                    }
                                     },function (fail){
                                    downloadIconImage(uniqueAppPagesWithImg[index]);
                                        index++;
                                     });
    }

}


function deleteImageIconDirectory(){

      AppyTemplate.global.homeIconPath = data.login.iconPath;
        var path = cordova.file.applicationStorageDirectory +"pageIconImages";
    window.resolveLocalFileSystemURL(path,
                                     function (fileSystem) {
                                     fileSystem.removeRecursively(function success(){
                                                                   checkIconImages();
                                                                  }, function fail(){

                                                                  });
                                     }
, function (err) {
    checkIconImages();
}
);

}

/*
end code for downloading image icon for offline use..
@krishna
*/

function piwikAnalystics()
{
      var s = document.createElement("script");
                           s.type = "text/javascript";

       var t = document.createTextNode('var _paq = _paq || [];_paq.push(["trackPageView"]);_paq.push(["enableLinkTracking"]);var u=(("https:" == document.location.protocol) ? "https" : "https") + "://analytics.appypie.com/";_paq.push(["setTrackerUrl", u+"piwik.php"]);_paq.push(["setSiteId", data.piwikId]);var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";g.defer=true; g.async=true; g.src="js/piwik.js"; s.parentNode.insertBefore(g,s);');
       s.appendChild(t);
       document.getElementsByTagName("head")[0].appendChild(s);
}

function acceptTermsAndCondition()
{
// Appyscript.showIndicator();
if((data.appData.layout)=="slidemenu")
{
 if(AppyTemplate.global.style.autoLoadFirstPage == "YES") {
 $$(".app_navigation_slidemenu a").eq(0).click();
 }
}
if((data.appData.layout)=="bottom")
{
 if(AppyTemplate.global.style.autoLoadFirstPage == "YES") {
 $$(".toolbar .app_navigation_bottom a").eq(0).click();
 }
}

setTimeout(function(){
AppyTemplate.global.termandconditionfix=true;
createApplication();
},100);
localStorage.setItem("acceptedtermscheck","true")
}



    function backFromMergeAppFun(){
        Appyscript.showIndicator();
        localStorage.setItem("appstart","true");
        localStorage.setItem("mergeAppsBackButton",false);
        JsonDownloadAtStart();
        Appyscript.closePanel();
        $$(".toolbar").addClass("toolbar-hidden");
        $$(mainView.pagesContainer).addClass("no-toolbar").removeClass("toolbar-through");
        if ($$(mainView.pagesContainer).hasClass('bottom_height')){
            $$(mainView.pagesContainer).removeClass("bottom_height");
        }
        $$(".toolbar-inner").remove();
        Appyscript.hideWebViewFragment();
    }



     function  pageJsupload()
      {

           var jsArrayVal= ["js/video.js","js/cropper.js","js/foodordering.js","js/appypieDB.js", "js/formbuilder.js", "js/twitter.js", "js/ereader.js", "js/review.js", "js/googleplus.js", "js/education.js", "js/event.js", "js/chatroom.js", "js/blog.js", "js/photo.js", "js/hyperlocal.js",  "js/loyaltycard.js", "js/loyalty.js", "js/blog.js", "js/photo.js", "js/audio.js", "js/quiz.js","js/facebook.js", "js/map.js", "js/Newsstand.js", "js/polling.js", "js/mortgage.js","js/notes.js","js/dirDatabase.js","js/ecommerce.js","js/dating.js","js/loyalty.js","js/coupon.js","js/socialnetwork.js","js/weather.js","js/tools.js","js/property.js","js/contact.js","js/about.js","js/document.js","js/messenger.js","js/apiAi.js","js/chatbot.js","js/appsheets.js","js/quote.js","js/accommodation.js","js/realestate.js","js/timesheet.js","js/fitness.js","js/messengerGroupChat.js","js/todolist.js","js/coupondirectory.js","js/flashcard.js","js/forum.js","js/dinein.js","js/mercadopago.js","https://js.stripe.com/v3/","js/demanddelivery.js","js/commonPaymentgatway.js"];

                for(var i=0;i<jsArrayVal.length;i++)
                      {
                           var s = document.createElement("script");
                               s.type = "text/javascript";
                               s.src = jsArrayVal[i];
                               document.body.appendChild(s);

                      }
                      piwikAnalystics();

     }

     function initialSetupforEwallet() {
            AppyPieNative.encodeForeWallet(localStorage.getItem("payid"), localStorage.getItem("appid"), "")

     }

     function EncryptedDeviceToken(token){
             hasEncryptedDeviceToken = token;
         }


         function getTokenFromService(token)
         {
             deviceEncryptedToken = token;
             console.log("===== deviceEncryptedToken  : " + deviceEncryptedToken);
             EncryptedDeviceToken(true);

         }

         function addHeaderForNextCall(time){
         var delay = time || 5;
         $$.ajaxSetup({

             headers: { 'accessToken': deviceEncryptedToken }
         });
         window.setTimeout(function(){
         closeHeader();
         },delay);

         function closeHeader(){
         $$.ajaxSetup({
             headers: { 'accessToken': "invalid" }
         });
         }
         }