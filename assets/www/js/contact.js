//Start native code
function openWebViewContactNative(urlPath,pageTitle){
    if(isOnline()){
    Appyscript.openWebView(urlPath,pageTitle);
    }else{
            Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
        }
    
}

function openSendMailContactNative(urlPath,val1,val2){
       if(isOnline()){
    Appyscript.sendMail(urlPath,val1,val2);
       }else{
           Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
       }
}

function openSkypeContactNative(urlPath){
       if(isOnline()){
    Appyscript.callSkype(urlPath);
       }else{
           Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
       }
}

function openWhatsappContactNative(whatsappno)
{
    console.log("==== openWhatsappContactNative is called : " + whatsappno);
    AppyPieNative.openWhatsAppNative(whatsappno);
}

function openCallContactNative(urlPath){
 if(pageData.advanceSetting.contact_twilio_from_number.length>0 && pageData.advanceSetting.contact_twilio_account_sid.length>0 && pageData.advanceSetting.contact_twilio_auth_token.length>0)
    {
     Appyscript.prompt(pageData.languageSetting.twilio_not_charge_alert,pageData.languageSetting.twilio_provide_number,data.languageSetting.ok_mcom,data.languageSetting.common_cancel, function (value)
    {

    var arr = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    console.log("test"+arr);

     if(arr == undefined || arr == "" || arr == null){

        Appyscript.alert("Invalid mobile number");

     }else{
       Appyscript.alert(pageData.languageSetting.twilio_wait_alert,appnameglobal_allpages);
       Appyscript.callWithTwilio(urlPath,pageData.advanceSetting.contact_twilio_from_number,value,pageData.advanceSetting.contact_twilio_account_sid,pageData.advanceSetting.contact_twilio_auth_token);

     }

    }, function (value)
    {
       //Appyscript.alert("You clicked Cancel button");
    });

     var ccode =localStorage.messengercountry;

    $$(".modal-text-input").val(ccode);
    }
    else{
        Appyscript.call(urlPath);
    }
}

function openSingleMapContactNative(address,latitude,longitude,subtext,val1,openthirdparty){
       Appyscript.modal({
       verticalButtons: true,
       buttons: [
             {
             text: AppyTemplate.global.commonLanguageSetting.common_get_direction,
             onClick: function ()
             {
               Appyscript.openMapView(address,subtext);
             }
             },
             {
             text: AppyTemplate.global.commonLanguageSetting.common_share_location,
             onClick: function ()
             {
             ShareLocationFun(address);
             }
             },
             {
             text: AppyTemplate.global.commonLanguageSetting.common_show_map,
             onClick: function ()
             {
               if (pageData.pageId == "contact") {
                    latLongOpenMapContact(latitude,longitude,address) }
                else {
                    GetDirectionFun(address,latitude,longitude,openthirdparty);
                     }
             }
             },
             {
             text: AppyTemplate.global.commonLanguageSetting.common_cancel,
             onClick: function () {

             }
             }
             ]
       });
       $$(".modal .modal-inner").remove();
}
function showPosition2(position)
{
    sendLocationMapPage2(position.coords.latitude,position.coords.longitude);
}


function GetDirectionFun(address,latitude,longitude,openthirdparty)
{
    AppyTemplate.global.pageTitle=pageTitle;
    Appyscript.openMapViewGoogle(address,latitude,longitude,pageTitle);
}


function ShareLocationFun(address){
  Appyscript.shareText(address);
}

function openCallSmsContactNative(subtext,smstext){
    if(Appyscript.device.android)
    {
        Appyscript.openSMS(subtext,smstext);
    }
    else{
        Appyscript.callsms(subtext,smstext);
    }
}

AppyTemplate.registerHelper('escapestring',function (smstextWithoutTrim) {
    var smstextWithTrim= smstextWithoutTrim.replace(/\r?\n|\r/g, " ");;
    return smstextWithTrim;
});


Appyscript.onPageInit('contact-page_remove', function(page) {
    Appyscript.setCountryCodeByLocation();
     var countryCode =localStorage.messengercountry;
    if(countryCode && countryCode!=""){
    var localPhoneArray=[];
        var localOthersArray=[];
        $$.each(pageData.list,function(key,value){
         var row=value;
           if(value.image=='phone'){
           localPhoneArray.push(row);
           }else{
           localOthersArray.push(row);
           }
        })
        var counter=0;
        var localFoundPhoneArray=[];
        $$.each(localPhoneArray,function(key,value){
               if(value.subtext.indexOf(countryCode)>=0){
                counter++;
                value.found=counter;
               }
               else{
                value.found=0;
               }
               localFoundPhoneArray.push(value);
            });
            localFoundPhoneArray.sort(function(a, b) {
                return parseInt(b.found) - parseInt(a.found);
            });
             var sortedPhoneArrayByCountry=localFoundPhoneArray;
//          var sortedPhoneArrayByCountry=localFoundPhoneArray.keySort('found',true);
           console.log("sortedPhoneArrayByCountry"+sortedPhoneArrayByCountry);
           pageData.list=[];
           pageData.list=sortedPhoneArrayByCountry.concat(localOthersArray);
    }

    $$.get("pages/contact.html", function(template) {

        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(pageData);
        var htmlData = document.createElement("div");
         htmlData.innerHTML = html;
         $$(".contact-us").html($$(htmlData).find(".contact-us").html());
        //mainView.router.reloadContent(html)
    });

});

AppyTemplate.registerHelper('getInTouch',function (smstextWithoutTrim) {
      var names = [];
      pageData.list.forEach(function(v){
        if(v.image === "founder") {
          names.push(v.subtext);
        }

      })
      if(names.length) {
        return '<p class="text" style="font-size:0.9em">'+ AppyTemplate.global.pageLanguageSetting.get_in_touch_with +' <b>' + names.join(",") + '</b></p>'
      }
      else {
        return null;
      }
});



//Change by pramod
var mapcontact
var myMarker;
function latLongOpenMapContact(latitude,longitude,address) {
Appyscript.showIndicator();
$$.get("pages/contactUs-map.html", function(template) {
var compiledTemplate = AppyTemplate.compile(template);
var html = compiledTemplate(pageData);
mainView.router.load({
              content: html,
              animatePages: true
              });
});
setTimeout(function() {
var myLatlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
mapcontact = new google.maps.Map(document.getElementById('map'), {
zoom: 10,
center: myLatlng
});

myMarker = new google.maps.Marker({
position: myLatlng
});

 var contentString = '<div id="content"  style="padding:10px">'+
      address +
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });


  myMarker.addListener('click', function() {
    infowindow.open(map, myMarker);
  });
myMarker.setMap(mapcontact);
}, 200);
console.log("qwerty", "qwerty")
Appyscript.hideIndicator();
}














