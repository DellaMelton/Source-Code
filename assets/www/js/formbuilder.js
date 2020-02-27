var formBuilderData;
var subOptionAmount=0;
var requestId;
//Start nested from builder condition from here
var activeNestedIndex = 0;
var Indexx = 0;
var submissionButtonCustomForm;
var nextButtonCustomForm;
var formDataNested = [];
var formLabelNested = [];
var formFieldsNested = [];
var nestedFormBuilderData;
var listType='';
var selectedValue ;
var formTaxAmount;
//End nested from here

Appyscript.formBuilder = function(a) {

if(localStorage.getItem("email") != undefined && localStorage.getItem("email") !=null && localStorage.getItem("email") != "")
{
AppyTemplate.global.email=localStorage.getItem("email");

if(localStorage.getItem("username") != undefined && localStorage.getItem("username") !=null && localStorage.getItem("username") != "")
{
AppyTemplate.global.username= localStorage.getItem("username").trim();

var userName= localStorage.getItem("username").trim();

var firstName = userName.split(' ').slice(0, -1).join(' ');
var lastName = userName.split(' ').slice(-1).join(' ');

if(firstName == "")
{

AppyTemplate.global.firstName=userName;

}else
{
AppyTemplate.global.firstName=firstName;
AppyTemplate.global.lastName=lastName;
}
}

if(localStorage.getItem("phone") != undefined && localStorage.getItem("phone") !=null && localStorage.getItem("phone") != "")
{
if(localStorage.getItem("countryCodeVal"))
{
AppyTemplate.global.phone= localStorage.getItem("countryCodeVal")+localStorage.getItem("phone");
}
else
{
AppyTemplate.global.phone=localStorage.getItem("phone");
}


}

} else
{
AppyTemplate.global.email=undefined;
AppyTemplate.global.phone=undefined;
AppyTemplate.global.username=undefined;
AppyTemplate.global.firstName=undefined;
AppyTemplate.global.lastName=undefined;
}


//Start nested from builder condition from here

    if(pageData.list[a].identifire == "nested"){
       activeNestedIndex = 0;
       Indexx = 0;
       formDataNested = [];
       formLabelNested = [];
       formFieldsNested = [];
        submissionButtonCustomForm = pageData.list[a].submissionButton;
        nextButtonCustomForm = pageData.list[a].nextText;
        if(pageData.list[a].nestedData.length != 0){
            AppyTemplate.global.submissionButton = nextButtonCustomForm;
        }else{
            AppyTemplate.global.submissionButton = submissionButtonCustomForm;
        }
        nestedFormBuilderData = pageData.list[a];
        formBuilderData = pageData.list[a].nestedData[0];
        formBuilderData.identifire = "nested";
        formBuilderData.formStyle = pageData.styleAndNavigation;
        formBuilderData.innerLayout=1;
        formBuilderData.pageTitle = pageData.list[a].name;
        formBuilderData.formDescription = pageData.list[a].formDescription;
        formBuilderData.hitIcon = pageData.list[a].hitIcon;
        formBuilderData.headerImage = pageData.list[a].headerImage;
        console.log("nesteddddd   "+ JSON.stringify(formBuilderData));
        openPage("formbuilder", formBuilderData);
        //Indexx++;
    }else{
        formBuilderData = pageData.list[a];
        formBuilderData.formStyle = pageData.styleAndNavigation;
        formBuilderData.innerLayout=1;
        formBuilderData.pageTitle = pageData.pageTitle;
        if(pageData.list[a].identifire == "custom")
        {
        if(formBuilderData.paymentMethod == "payfast" || "velocity" || "stripePay" || "paypal_express")
        {
        //formBuilderData.submissionButton = AppyTemplate.global.commonLanguageSetting.common_place_order;
        }
        }
        openPage("formbuilder", formBuilderData);
    }
}


/********************************************************************/
//**************** START NESTED FORM BUILDER ***********************//
/********************************************************************/

var nextStep = ['next'];
var next;
var choice;
var joblistingownermail;
Appyscript.nestedCustomForm = function() {
    $$(".error").removeClass("error");
    var customData = Appyscript.getCustomFormData();
    if (!customData.flag) {
        $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
        return;
    }

    requestId = (new Date().getTime()).toString(36);

    var len = customData.type.length;
    for (var i = 0; i < len; i++) {
        if (customData.type[i] == "category") {
            delete customData.type[i];
            delete customData.label[i];
            delete customData.value[i];
        }
        if (customData.type[i] == "subCategory" || customData.type[i] == "subCategoryPrice") {
            customData.type[i] = "category";
        }
    }
    var d = new Date();
    var timeStamp = "app" + d.getTime();
    timeStamp = timeStamp.substring(5, timeStamp.length - 2);
    var j = 0;
    var type = [];
    var label = [];
    var value = [];
    var imagecount = 0;
    for (var i = 0; i < len; i++) {
        if (customData.type[i] != undefined) {
            type[j] = customData.type[i];
            label[j] = customData.label[i];
            value[j++] = customData.value[i];
        }
    }

    delete customData.type;
    delete customData.label;
    delete customData.value;

    customData.type = type;
    customData.label = label;
    customData.value = value;

    console.log("customDaata  " + customData);

    var userLatLong = localStorage.getItem("formbuilderlatlongval");

    if (nestedFormBuilderData.enableUserLocation) {
        formBuilderAddress = formBuilderAddress;
        customData.type.push("userAddress");
        customData.value.push(formBuilderAddress);
        customData.label.push(AppyTemplate.global.commonLanguageSetting.user_address);
    }

    var formLabel = Appyscript.convertStringToJson(customData.label);
    var formData = Appyscript.convertStringToJson(customData.value);
    var formFields = Appyscript.convertStringToJson(customData.type);

    formDataNested.push(formData);
    formLabelNested.push(formLabel);
    formFieldsNested.push(formFields);

    joblistingownermail = localStorage.getItem("JOBCUSTOMOWNERMAIL");
    console.log("=== joblistingownermail in formbuilder : " + joblistingownermail);

    if (AppyTemplate.global.submissionButton != submissionButtonCustomForm) {
        Appyscript.showIndicator();
        var checkCounter = nestedFormBuilderData;
        if (Indexx < (checkCounter.nestedData.length-1)) {
            next = checkCounter.nestedData[Indexx].nextStep;
            choice = checkCounter.nestedData[Indexx].choiceOnField;
            if (next == "submit") {
                AppyTemplate.global.submissionButton = submissionButtonCustomForm;
                $$(".form-btn a").html(AppyTemplate.global.submissionButton);
                Appyscript.sendCustomNestedForm();
            } else {
                if (choice == "false") {
                    if (next != "next" && next != "submit") {
                        activeNestedIndex = checkCounter.nestedData[Indexx].nextStep;
                    } else if (next == 'next') {
                        activeNestedIndex++;
                    }
                } else {
                    if (nextStep[Indexx] != undefined) {
                        activeNestedIndex = nextStep[Indexx] == 'next' ? (parseInt(Indexx) + 1) : nextStep[Indexx];
                    } else {
                        activeNestedIndex = parseInt(Indexx) + 1;
                    }
                }

                //alert("activeNestedIndex  "+activeNestedIndex)
                formBuilderData = nestedFormBuilderData.nestedData[activeNestedIndex];
                formBuilderData.identifire = "nested";
                formBuilderData.sumbitButton = submissionButtonCustomForm;
                formBuilderData.innerLayout = 1;
                formBuilderData.pageTitle = nestedFormBuilderData.name;
                formBuilderData.formDescription = nestedFormBuilderData.formDescription;
                formBuilderData.hitIcon = nestedFormBuilderData.hitIcon;
                formBuilderData.headerImage = nestedFormBuilderData.headerImage;
                formBuilderData.formStyle = pageData.styleAndNavigation;
                if (Indexx == nestedFormBuilderData.nestedData.length) {
                    AppyTemplate.global.submissionButton = submissionButtonCustomForm;
                }
                console.log("nesteddddd   " + JSON.stringify(formBuilderData))
                if(selectedValue == ""){
               if(checkCounter.nestedData[Indexx].nextStep=="next")
                                         {
                                             Indexx++;
                                         }
                                         else
                                         {
                                             Indexx=checkCounter.nestedData[Indexx].nextStep;
                                         }
                }else{
                    Indexx = selectedValue;
                }

                console.log("Indexx@@@@@@@  " + Indexx);
                $$.get("pages/formbuilder.html", function (template){
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(formBuilderData);
                    mainView.router.reloadContent(html);
                    Appyscript.hideIndicator();
                });
            }

        } else {
            if (selectedValue == "") {
                AppyTemplate.global.submissionButton = submissionButtonCustomForm;
                $$(".form-btn a").html(AppyTemplate.global.submissionButton);
                Appyscript.sendCustomNestedForm();
            } else {
                next = checkCounter.nestedData[Indexx].nextStep;
                choice = checkCounter.nestedData[Indexx].choiceOnField;
                if (choice == "false") {
                    if (next != "next" && next != "submit") {
                        activeNestedIndex = checkCounter.nestedData[Indexx].nextStep;
                    } else if (next == 'next') {
                        activeNestedIndex++;
                    }
                } else {
                    if (nextStep[Indexx] != undefined) {
                        activeNestedIndex = nextStep[Indexx] == 'next' ? (parseInt(Indexx) + 1) : nextStep[Indexx];
                    } else {
                        activeNestedIndex = parseInt(Indexx) + 1;
                    }
                }

                //alert("activeNestedIndex  " + activeNestedIndex)
                formBuilderData = nestedFormBuilderData.nestedData[activeNestedIndex];
                formBuilderData.identifire = "nested";
                formBuilderData.sumbitButton = submissionButtonCustomForm;
                formBuilderData.innerLayout = 1;
                formBuilderData.pageTitle = nestedFormBuilderData.name;
                formBuilderData.formStyle = pageData.styleAndNavigation;
                if (Indexx == nestedFormBuilderData.nestedData.length) {
                    AppyTemplate.global.submissionButton = submissionButtonCustomForm;
                }
                console.log("nesteddddd   " + JSON.stringify(formBuilderData))
                if (selectedValue == "") {
                    Indexx++;
                } else {
                    Indexx = selectedValue;
                }

                console.log("Indexx@@@@@@@  " + Indexx);
                $$.get("pages/formbuilder.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(formBuilderData);
                    mainView.router.reloadContent(html);
                    Appyscript.hideIndicator();
                });
            }
        }
    } else {
        Appyscript.sendCustomNestedForm();
        setTimeout(function(){
            Appyscript.showIndicator();
        },500);
    }
}
var selectedValue;
var selectBox;
/*function nestedFormChoice(){
    selectBox = document.getElementById("selectFormChoice");
    selectedValueOption = selectBox.options[selectBox.selectedIndex].value;
    //alert(selectedValue);

	if(selectedValueOption!=undefined){
		if(selectedValueOption == 'submit'){
			nextStep[Indexx] = 'submit';
			AppyTemplate.global.submissionButton = submissionButtonCustomForm;
			$$(".form-btn a").html(AppyTemplate.global.submissionButton);
		}else{
		    AppyTemplate.global.submissionButton = nextButtonCustomForm;
		    $$(".form-btn a").html(AppyTemplate.global.submissionButton);
			nextStep[Indexx] = selectedValueOption;
			if(selectedValueOption != 'next'){
				activeNestedIndex = selectedValueOption;
			}else{
			    selectedValueOption = "";
			}
		}
	}
}*/

function nestedFormChoice() {
    selectBox = document.getElementById("selectFormChoice");
    selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //alert(selectedValue);

    if (selectedValue != undefined) {
        if (selectedValue == 'submit') {
            nextStep[Indexx] = 'submit';
            AppyTemplate.global.submissionButton = submissionButtonCustomForm;
            $$(".form-btn a").html(AppyTemplate.global.submissionButton);
        } else {
            AppyTemplate.global.submissionButton = nextButtonCustomForm;
            $$(".form-btn a").html(AppyTemplate.global.submissionButton);
            nextStep[Indexx] = selectedValue;
            if (selectedValue != 'next') {
                //prevStep[selectedValue] = Indexx;
                activeNestedIndex = selectedValue;
            } else {
                selectedValue = "";
            }
        }
    }
};

Appyscript.sendCustomNestedForm = function() {
    var customFormURL =webserviceUrl+'Formbuilder.php';

    if (AppyTemplate.global.submissionButton == submissionButtonCustomForm || next=='submit' || AppyTemplate.global.submissionButton == AppyTemplate.global.commonLanguageSetting.submit_food) {
        console.log("submit#######    ");
        imageFD.append("appId", window.data.appData.appId);
        imageFD.append("formPageId", pageIdentifie);
        imageFD.append("emailId", nestedFormBuilderData.requestEmail);
        imageFD.append("requestId", requestId);
        imageFD.append("actionType", "sendNestedMailTemplate");
        imageFD.append("formData", JSON.stringify(formDataNested));
        imageFD.append("formLabel", JSON.stringify(formLabelNested));
        imageFD.append("userEmail", joblistingownermail);
        imageFD.append("formFields", JSON.stringify(formFieldsNested));
        imageFD.append("subject", nestedFormBuilderData.submissionEmailSub);
        imageFD.append("formName", nestedFormBuilderData.name);
        imageFD.append("ownerEmail", window.data.appData.owneremail);

        imageFD.append("lang", Appyscript.getDefaultLanguage());
        imageFD.append("appName", window.data.appData.appName);
        imageFD.append("mailHeadingText", nestedFormBuilderData.mailHeadingText);

        if (fileFormBuilderArray) {
            for (i = 0; i < fileFormBuilderArray.length; i++) {

                var fileName = fileFormBuilderArray[i].name.replace(/ /g, '_')
                imageFD.append("file" + i, fileFormBuilderArray[i],fileName);
            }
        }
        fileFormBuilderArray = [];
        if (nestedFormBuilderData.enableUserEmail) {
            imageFD.append("enableUserEmail", nestedFormBuilderData.enableUserEmail);
        }

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadNestedFormBuilder, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", webserviceUrl+"Formbuilder.php");
        xhr.setRequestHeader("contentType", "application/x-www-form-urlencoded;charset=utf-8");
     //321   xhr.setRequestHeader("accessToken", deviceEncryptedToken);
        xhr.send(imageFD);
        imageArrayName = {};
        imageFD = new FormData();
        imageFDFlag = false;
        imageIndex = 1;
    }
}

//function uploadNestedFormBuilder(evt) {
//    console.log("=====uploadNestedFormBuilder@@@@@  " + JSON.stringify(evt));
//    Appyscript.alert(nestedFormBuilderData.submissionSuccessMsg,window.data.appData.appName);
//    $$("form").each(function(){ this.reset();
//        Appyscript.hideIndicator();
//    });
//    $$("form .select-file").each(function() {
//        $$(this).find("font").text($$(this).find("font").attr("data-val"));
//    });
//    fileFormBuilderArray = [];
//    formDataNested = [];
//    formLabelNested = [];
//    formFieldsNested = [];
//}

function uploadNestedFormBuilder(evt) {
    console.log("=====uploadNestedFormBuilder@@@@@  " + JSON.stringify(evt));
    var evtFullData = JSON.parse(evt.srcElement.response);
        var requestIdcustom = evtFullData.requestId;
   Appyscript.alert((nestedFormBuilderData.submissionSuccessMsg.replace("__REQUEST_ID__",requestIdcustom)),window.data.appData.appName);

    $$("form").each(function(){ this.reset();
        Appyscript.hideIndicator();
    });
    $$("form .select-file").each(function() {
        $$(this).find("font").text($$(this).find("font").attr("data-val"));
    });
    fileFormBuilderArray = [];
    formDataNested = [];
    formLabelNested = [];
    formFieldsNested = [];
}





var formBuilderAddress = "";

function setNestedFormBuilderAddress() {
    if (nestedFormBuilderData.enableUserLocation) {
        var locationData = Appyscript.getCurrentPosition();
        if (locationData != null) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(locationData.split(",")[0], locationData.split(",")[1]);
            localStorage.setItem("FORMBUILDELATLONG", latlng);
            localStorage.setItem("formbuilderlatlongval", latlng);
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        if (appId == "3b0067263134") {
                            formBuilderAddress = "" + latlng;
                        } else {
                            formBuilderAddress = results[0].formatted_address;
                        }
                    } else {
                        console.log("Location not set, status: " + status);
                    }
                } else {
                    console.log("Geo-coder failed, status: " + status);
                }
            });
        }
    }
}

/********************************************************************/
               //END NESTED FORM BUILDER
/********************************************************************/


function checkLanguage() {
    navigator.globalization.getPreferredLanguage(
        function (language) {
            //alert('language: ' + language.value + '\n');
            console.log('language: ' + language.value + '\n');
            localStorage.setItem("currentLanguage",language.value)
        },
        function () {
            console.log('Error getting language\n');
        }
    );
}

///////////////////////////////////////////
//TIMER FOR CUSTOM
var totalTimeTimer;
var seconds = 0, minutes = 0, hours = 0, t;
///////////////////////////////////////////

Appyscript.onPageInit('formbuilder-Page', function(page) {

   ///////////////////////////////////////////
   //****** NESTED FORM HERE ********//
     if(nestedFormBuilderData != undefined){
            selectedValue = "";
            formBuilderAddress="";
            if (Indexx < (nestedFormBuilderData.nestedData.length - 1)) {
                next = nestedFormBuilderData.nestedData[activeNestedIndex].nextStep;
                if (next == "submit") {
                    AppyTemplate.global.submissionButton = submissionButtonCustomForm;
                    $$(".form-btn a").html(AppyTemplate.global.submissionButton);
                } else {
                    AppyTemplate.global.submissionButton = nextButtonCustomForm;
                    $$(".form-btn a").html(AppyTemplate.global.submissionButton);
                }
            } else {
                AppyTemplate.global.submissionButton = submissionButtonCustomForm;
                $$(".form-btn a").html(AppyTemplate.global.submissionButton);
            }
        }
    ///////////////////////////////////////////

     var sec = 0;
           var min = 0;
           var hrs = 0;
           var tm;
    /***************************************************/
    var showtotalTimer = document.getElementById('setTimerCustom');
    function add() {

        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
            if (min >= 60) {
                min = 0;
                hors++;
            }
        }
        try{
        showtotalTimer.textContent = (hrs ? (hrs > 9 ? hrs : "0" + hrs) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);
        totalTimeTimer = (hrs ? (hrs > 9 ? hrs : "0" + hrs) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);
        timer();
    }catch(e){
    console.log(e);
    }


        }


    function timer() {

        tm = setTimeout(add, 1000);
    }
    timer();

    /***************************************************/

    if(formBuilderData.formFillTimerformbuilder){
        $$('#setTimerCustom').show();
    }else{
        $$('#setTimerCustom').hide();
    }
    checkLanguage();
    if (AppyTemplate.global.dirMode == "1") {
        setTimeout(function() {
            $$(".toolbar").addClass("toolbar-hidden");
            $$(mainView.activePage.container).addClass("no-toolbar").removeClass("toolbar-through");
            if ($$(mainView.pagesContainer).hasClass('bottom_height')) {
                $$(mainView.pagesContainer).removeClass("bottom_height");
            }
        }, 1000);
    }
    Appyscript.formSettings();
    setFormBuilderAddress();
    if(nestedFormBuilderData != undefined){
        setNestedFormBuilderAddress();
    }

    $$(".signature-tabs").each(function(i) {
        var thisObj = $$(this);
        thisObj.find("label").eq(0).click(function() {
            sessionStorage.setItem('signatureIndex', i);
            selectDigitalSignature(thisObj);
            //Appyscript.popupPage('signature-popup');
            //Appyscript.digitalSignature(thisObj[0])
            return false;
        });
        thisObj.find("input").change(function() {
            var file = this.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    thisObj.find("img").remove();
                    thisObj.append('<img src="' + e.target.result + '" />');
                }
                reader.readAsDataURL(file);
            }
            return false;
        });
    });

    if (formBuilderData.paymentMethod == "payu") {
        if (formBuilderData.defaultCurrency == "INR" && formBuilderData.payStatus == "1" && formBuilderData.payOption == "payAmtcust") {
            $$("#amount_currency").val(23).attr("disabled", "disabled");
        }
    }

    if (formBuilderData.identifire == "custom") {
        if (AppyTemplate.global.phone != undefined && AppyTemplate.global.phone != null && AppyTemplate.global.phone != "") {
            $$("input[name='phone']").eq(0).val(AppyTemplate.global.phone);
        }

        if (AppyTemplate.global.email != undefined && AppyTemplate.global.email != null && AppyTemplate.global.email != "") {
            $$("input[name='email']").eq(0).val(AppyTemplate.global.email);
        }


        if (AppyTemplate.global.username != undefined && AppyTemplate.global.username != null && AppyTemplate.global.username != "") {
            $$("input[name='name']").eq(0).val(AppyTemplate.global.username);
        }
    }
    /*
    $$('[placeholder="Other- Please Specify "]').parents(".customField").hide();
    $$('li[type="radio"]').eq(0).find("label").click(function(){
    	setTimeout(function(){
    		var a = $$('li[type="radio"]').eq(0).find("input:checked").attr("value");
    		if(a.indexOf("Other-") == -1) {
    			$$('[placeholder="Other- Please Specify "]').parents(".customField").hide();
    		}
    		else {
    			$$('[placeholder="Other- Please Specify "]').parents(".customField").show();
    		}
    	}, 50)
    })
    */
    $$('li[type="radio"]').each(function() {
        var thisRadio = $$(this);
        if (thisRadio.find("label.other").length != 0) {
            thisRadio.find("label").click(function() {
                if ($$(this).is(".other")) {
                    thisRadio.addClass("other");
                } else {
                    thisRadio.removeClass("other");
                }
            })
        }
    })



//$( ".formBuilderFileUpload" ).change(function() {
//
//         // $('#fileUpload_fb').val($(this)[0].files[0].name);
//          //$$(".formBuilderFileUpload").html($(this)[0].files[0].name);
//          $(this).parent("div").children("font").html($(this)[0].files[0].name)
//        //  $(this).attr("value",$(this)[0].files[0].name)
//          //$$("#fileUpload_fb").html($(this)[0].files[0].name);
//});

//     document.getElementsByClassName('formBuilderFileUpload').addEventListener('change',function(){
//
//
//     //$$("#fileLabel01").html( document.getElementByClass('formBuilderFileUpload').files[0].name);
//     }, false);
   // $$("#fileUpload_fb").on("change",function(s){$$("#fileLabel01").html($$("#fileUpload_fb").val())});

                        if(data.defaultDateFormat == "dd-MMM-yyyy"){
                            data.defaultDateFormat = "dd-M-yyyy"
                        }else{
                            data.defaultDateFormat;
                        }
//
//                      var languageSettingMonth=data.languageSetting;
//                         Appyscript.calendar({
//                                      input: '#txtDate',
//                                      value: [new Date()],
//                                      dateFormat: 'dd/mm/yyyy',
//                                      monthNames:data.monthLang,
//                                       closeOnSelect : true,
//                                      dayNamesShort: [languageSettingMonth.Sun,languageSettingMonth.Mon,languageSettingMonth.Tue,languageSettingMonth.Wed,languageSettingMonth.Thu,languageSettingMonth.Fri,languageSettingMonth.Sat],
//                            });

                            var today = new Date();
                            var advanceBookingDays = 90;
                            var weekLater = new Date().setDate(today.getDate() + parseInt(advanceBookingDays));
                            var _getDate = (new Date()).getDate();
                            var _advanceBookDate = new Date((new Date().setDate(_getDate + parseInt(advanceBookingDays)))).setHours(0, 0, 0, 0);

                            var _getDate = (new Date()).getDate();
                            var _advanceBookDate = new Date((new Date().setDate(_getDate + parseInt(advanceBookingDays)))).setHours(0, 0, 0, 0);
                            AppyTemplate.global.commonLanguageSetting.app_done ="";

                            if(pageData.list[0].languageSetting){

                            AppyTemplate.global.commonLanguageSetting.app_done = pageData.list[0].languageSetting.app_done;}
                            Appyscript.calendar({
                                input: '#txtDate',
                                value: [new Date()],
                                disabled: [{
                                        from: new Date(1950, 1, 1),
                                        to: new Date().setDate(_getDate - parseInt(1))
                                    },
                                    {
                                        from: _advanceBookDate,
                                        to: new Date(2200, 1, 1)
                                    },
                                ],
                                dateFormat: 'yyyy/mm/dd',
                                monthNames:data.monthLang,
                                dayNamesShort: [data.languageSetting.Sunday,data.languageSetting.Monday,data.languageSetting.Tuesday,data.languageSetting.Wednesday,data.languageSetting.Thursday,data.languageSetting.Friday,data.languageSetting.Saturday],
                                yearPickerTemplate:'<p id="datesheetrangeselect" style="display:none;font-size: 15px; color: red">Select range</p><div style="color: black; / margin-left: -100px; / position: relative; z-index: 1; padding: 15px; font-size: 18px;" class="" onclick="datePickerCloseForm()">'+ AppyTemplate.global.commonLanguageSetting.app_done +'</div>'
                            });



                            if(formBuilderData.identifire == "app" && formBuilderData.appIncludeTax != 1){
                                if (formBuilderData.appTaxType == "percent") {
                                    formTaxAmount = ((parseFloat(formBuilderData.preDefineCustomerAmount) * parseFloat(formBuilderData.appTax)) / 100);
                                } else {
                                    if (parseFloat(formBuilderData.appTax) >= parseFloat(formBuilderData.preDefineCustomerAmount)) {
                                        formTaxAmount = formBuilderData.preDefineCustomerAmount;
                                    } else {
                                        formTaxAmount = formBuilderData.appTax;
                                    }
                                }
                                console.log("formTaxAmount+++ " + formTaxAmount);
                                formBuilderData.formTaxAmount = formTaxAmount;
                                formBuilderData.preDefineCustomerAmountTotal = parseFloat(formBuilderData.preDefineCustomerAmount) + parseFloat(formTaxAmount);
                                formBuilderData.preDefineCustomerAmount = parseFloat(formBuilderData.preDefineCustomerAmount) + parseFloat(formTaxAmount);
                                var currencySymbol = localStorage.getItem("currencySymbol");
                                currencySymbol = $$("<div>" + currencySymbol + "</div>").html().trim();
                                $$("#preDefineCustomerAmount").val(currencySymbol + "" + formBuilderData.preDefineCustomerAmountTotal);
                                $$(".TotalAmt span").html(currencySymbol + "" + formBuilderData.preDefineCustomerAmountTotal);
                                $$(".formTaxAmount").html(currencySymbol + "" + formBuilderData.formTaxAmount);
                            };

                            if(formBuilderData.identifire == "quote" && formBuilderData.crmSetting != "zoho"){
                                $$("#quotePhoneSales").hide();
                            }else{
                                $$("#quotePhoneSales").show();
                            }
})

function datePickerCloseForm(){
    Appyscript.closeModal();
}


function cfb_validateFiles(){
var flag = true;
for(var i=0;i<$$(".formBuilderFileUpload").length;i++){
if($$($$(".formBuilderFileUpload")[i]).val() == ""){flag=false;break;}
}
return flag;
}





Appyscript.openPopupShedule = function() {
    if($$("#schedulePopup").is(".on")){
        $$("#formbuilder").parent().removeClass("scroll-none");
        $$("#schedulePopup").hide().removeClass("on");
    }
    else{
        $$("#formbuilder").parent().addClass("scroll-none");
        $$("#schedulePopup").show().addClass("on");
    }
}

Appyscript.openFormTotalPayAmount = function() {
    if ($$("#schedulePopupTax").is(".on")) {
        $$("#formbuilder").parent().removeClass("scroll-none");
        $$("#schedulePopupTax").hide().removeClass("on");
    } else {
        $$("#formbuilder").parent().addClass("scroll-none");
        $$("#schedulePopupTax").show().addClass("on");
    }
}


Appyscript.sendQuoteData = function(a){
var thisObj = $$(a);
var data = {
    postemail:thisObj.attr("email"),
    postsubject:thisObj.attr("subject"),
    fname:$$("#fname").val(),
    lname:$$("#lname").val(),
    email:$$("#email").val(),
    company:$$("#company").val(),
    telephone:$$("#telephone").val(),
    phone:$$("#phone").val(),
    website:$$("#website").val(),
    city:$$("#city").val(),
    country:$$("#country").val(),
    comment:encodeURI($$("#comment").val())
}

$$(".error").removeClass("error");
if(data.fname.trim() == "")
{
 Appyscript.alert(formBuilderData.quoteFirstNameBlank);
$$("#fname").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}
// as discuss with ash sir
// if(!Appyscript.checkNameState(data.fname))
// {
// Appyscript.alert("Invalid text.");
// $$("#fname").parent().addClass("error");
// $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
// return;
// }
if(data.lname.trim() == ""){
    Appyscript.alert(formBuilderData.quoteLastNameBlank);
    $$("#lname").parent().addClass("error");
    $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
    return;
}
//as discuss with ash sir
// if(!Appyscript.checkNameState(data.lname))
// {
// Appyscript.alert("Invalid text.");
// $$("#lname").parent().addClass("error");
// $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
// return;
// }

if(!Appyscript.validateEmail(data.email))
    {

        if(data.email.trim() == ""||data.email.trim() == "undefined"||data.email.trim() == null){
            Appyscript.alert(formBuilderData.quoteemail);
            $$("#email").parent().addClass("error");
            $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }

        else{
            Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Sign_up_email);
            $$("#email").parent().addClass("error");
            $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;

        }


    }
else if(data.company.trim() == "")
{
Appyscript.alert(formBuilderData.quoteCompNameBlank);
$$("#company").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}
else if(data.phone.trim() == "")
{
 Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_phone_number_mcom);
$$("#phone").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}
else if(data.city.trim() == "")
{
Appyscript.alert(formBuilderData.quoteCityNameBlank);
$$("#city").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}
else if(data.country == "0")
{
Appyscript.alert(formBuilderData.quoteCountryBlank);
$$("#country").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}
else if(data.comment.trim() == "")
{
Appyscript.alert(formBuilderData.quoteCommentBlank);
$$("#comment").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}

Appyscript.sendFormBuilderQuoteMail(data);
$$(".error").removeClass("error");
}

function getTimeZone(){
var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + "" + ("00" + (o % 60)).slice(-2);
}

var newFormatedDate;
Appyscript.sendAppointment = function(a,b){

var _newDate="";
if($$("#txtDate").val() !=""){
    //var _dateFormat = ($$("#txtDate").val()).split("/");
    _newDate = $$("#txtDate").val();
}

var data = {
date:_newDate,
time:$$("#txtTime").val(),
name:$$("#txtName").val(),
email:$$("#txtEmail").val(),
phone:$$("#txtPhone").val(),
owneremail:a,
appointmentSubject:b
}
var  timezon=getTimeZone();
var localtimezone="GMT"+timezon;
var timeRegex = /^([0]?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i;

$$(".error").removeClass("error");
if(localStorage.getItem("currentLanguage") == 'ar-EG'){
    console.log(data.date)
}else{
    if(!Appyscript.validateDate(data.date))
    {
        Appyscript.alert(formBuilderData.appValidDate);
        $$("#txtDate").parent().addClass("error");
        $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
        return;
    }
 }

if(data.name.trim() == "")
{
Appyscript.alert(formBuilderData.appNameBlank);
$$("#txtName").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}
// as discuss with ash sir
// if(!Appyscript.checkNameState(data.name))
// {
// Appyscript.alert("Invalid text.");
// $$("#txtName").parent().addClass("error");
// $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
// return;
// }

if(!Appyscript.validateEmail(data.email))
{
 Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Sign_up_email);
$$("#txtEmail").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}
if(data.phone.trim() == "")
{
 Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_number_dir);
$$("#txtPhone").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}

if(!data.date)
{
 Appyscript.alert(formBuilderData.appValidDate);
$$("#txtDate").parent().addClass("error");
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}

if(formBuilderData.appSlotDuration == 0 && formBuilderData.scheduleStatus == 1){
    if(formBuilderData.appoinmentSchedule.length){
        if (!timeRegex.test(tConvert(data.time)) || !Appyscript.validateTime(data.date, data.time)) {
            Appyscript.alert(formBuilderData.appValidTime);
            $$("#txtTime").parent().addClass("error");
            $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }

        if (!timeRegex.test(tConvert(data.time)) || !Appyscript.validateTime(data.date, data.time)) {
            var current = new Date();
            var currenttime = current.toLocaleTimeString('en-US');
            var userdt = new Date(globaldatecorrectformat + ' ' + currenttime);
            // var dt = new Date(date);
            var indexval = userdt.getDay();
            var scheduleuserTimeDayJson = formBuilderData.appoinmentSchedule[indexval];
            console.log("scheduleuserTimeDayJson======" + scheduleuserTimeDayJson);
            if (scheduleuserTimeDayJson.open == "0") {
                Appyscript.alert(formBuilderData.appNotScheduled);
            } else {
                Appyscript.alert(formBuilderData.appValidTime);
            }
            $$("#txtTime").parent().addClass("error");
            $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }
    }else{
        if (!timeRegex.test(tConvert(data.time)) || !Appyscript.validateTimeNew(data.date, data.time)) {
            Appyscript.alert(formBuilderData.appValidTime);
            $$("#txtTime").parent().addClass("error");
            $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }
    }

}else if(formBuilderData.appSlotDuration != 0 ){
    if(formBuilderData.slotList.length == 0){
        Appyscript.alert(formBuilderData.languageSetting.app_timeslot_not_available);
        return;
    }
    else if ($$("#txtTime").val() == "") {
        Appyscript.alert(formBuilderData.appValidTime);
        return;
    };
}else if ($$("#txtTime").val() == "") {
     Appyscript.alert(formBuilderData.appValidTime);
     return;
};

if ($$("#customerAmount").val() == "") {
    Appyscript.alert(formBuilderData.languageSetting.all_field);
    return;
};



var d = new Date();
var timeStamp = "app"+d.getTime();
timeStamp = timeStamp.substring(5,timeStamp.length-2);

var amount = 0;
var currency = "";
requestId = (new Date().getTime()).toString(36);
var pageTypeForSave = ""

if (formBuilderData.payStatus == "1") {
    if (formBuilderData.payOption != "payAmtcust") {
        amountFix = formBuilderData.preDefineCustomerAmount;

    } else {
        amountFix = $$("#customerAmount").val();
    }

    console.log("Amount aa hi gya ", amountFix);

    if (amountFix > 0) {
        payment_flag = true;
    }

    currency = $$("#amount_currency").find("option[value='" + $$("#amount_currency").val() + "']").text();
    //currency=$$("#amount").attr("currency");
    if (currency == undefined || currency == "undefined") {
        currency = $$("#amountFix").attr("currency");
        console.log("===== currency : " + currency);
    }


    formBuilderData.amount = amountFix;
    formBuilderData.currency = currency;
}

var customData = Appyscript.getCustomFormData();

if(!customData.flag){
    $$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
    return;
}

var len=customData.type.length;
console.log("===== sdfsd " + customData);


if (formBuilderData.payStatus == "1") {
    /*if (formBuilderData.payOption != "payAmtcust") {
        amountFix = formBuilderData.preDefineCustomerAmount;

    } else {
        amountFix = $$("#customerAmount").val();
    }

    console.log("Amount aa hi gya ", amountFix);

    if (amountFix > 0) {
        payment_flag = true;
    }

    currency = $$("#amount_currency").find("option[value='" + $$("#amount_currency").val() + "']").text();
    //currency=$$("#amount").attr("currency");
    if (currency == undefined || currency == "undefined") {
        currency = $$("#amountFix").attr("currency");
        console.log("===== currency : " + currency);
    }


    formBuilderData.amount = amountFix;
    formBuilderData.currency = currency;*/

    if (formBuilderData.paymentMethod == "velocity") {
        velocityPaymentForm();
        localStorage.setItem("userEmailApp",data.email);
        pageTypeForSave = "";
        imageFD.append("payType", "");

    }else {
        pageTypeForSave = "save";
        imageFD.append("payType", "save");
    }

} else {
    pageTypeForSave = "";
    imageFD.append("payType", "");
}



var formLabel=Appyscript.convertStringToJson(customData.label);
var formData=Appyscript.convertStringToJson(customData.value);
var formFields=Appyscript.convertStringToJson(customData.type);
try{
    var newDateee = new Date(data.date);
     newFormatedDate = newDateee.toISOString().slice(0,10);
    console.log("newFormatedDate   "+ newFormatedDate);
}catch(err){
     newFormatedDate = data.date;
}

Appyscript.showIndicator();

imageFD.append("appId",window.data.appData.appId);
imageFD.append("formPageId",pageIdentifie);
imageFD.append("userName",data.name);
imageFD.append("ownerEmail",data.owneremail);
imageFD.append("formData",JSON.stringify(formData));
imageFD.append("formLabel",JSON.stringify(formLabel));
imageFD.append("userEmail",data.email);
imageFD.append("formFields",JSON.stringify(formFields));
imageFD.append("subject",data.appointmentSubject);
imageFD.append("formName",formBuilderData.name);
imageFD.append("appointmentDate",data.date);
imageFD.append("appointmentTime",data.time);
imageFD.append("timezone",localtimezone);
imageFD.append("userPhone",data.phone);

imageFD.append("newAppointmentKey","newAppoinment");
imageFD.append("userRemark","");
imageFD.append("status",1);
imageFD.append("userDeviceType","Android");
imageFD.append("userDeviceId",Appyscript.getDeviceId());
imageFD.append("userDeviceToken",Appyscript.getDeviceToken());
imageFD.append("appOwnerName",window.data.appData.ownerName);
imageFD.append("appOwnerEmail",window.data.appData.owneremail);
imageFD.append("lang",Appyscript.getDefaultLanguage());
imageFD.append("appName",window.data.appData.appName);

if(fileFormBuilderArray){

for(i=0;i<fileFormBuilderArray.length;i++){

var fileName = fileFormBuilderArray[i].name.replace(/ /g, '_')
imageFD.append("file"+i, fileFormBuilderArray[i],fileName);
}
}

fileFormBuilderArray = [];
listType="appointment";
var xhr = new XMLHttpRequest();
xhr.upload.addEventListener("progress", uploadProgress, false);
xhr.addEventListener("load", uploadCompleteFormBuilder, false);
xhr.addEventListener("error", uploadFailed, false);
xhr.addEventListener("abort", uploadCanceled, false);
xhr.open("POST", site_url+"/formbuilder/send-appointment-custom");
xhr.setRequestHeader("contentType", "application/x-www-form-urlencoded;charset=utf-8");
xhr.send(imageFD);
imageFD = new FormData();
imageArrayName = {};
imageFDFlag=false;
console.log("calling imageFD",imageFD);
 $$("form").each(function(){
    this.reset();
 });
 $$("form .select-file").each(function(){
 $$(this).find("font").text($$(this).find("font").attr("data-val"));
 $$(this).find("font").attr("file-exit","")
 $$(this).find("input").val("");

 });
}

//////////////gg//////////////////
window.addDashes = function addDashes(f) {
    var r = /[^0-9+]/g;
    f.value = f.value.replace(r, '');
    var key = "";
    var a= f.value;
    for(var i = 1;i<=a.length;i++){
        if(i%3 == 0 && i !=a.length){
            key=key+a[i-1]+"-";
        }else{
            key= key +a[i-1]
        }
    }
    f.value=key;
}
//////////////gg//////////////////

function uploadProgress(evt) {
//This can used to compute progress of uploading file(s).
/*if (evt.lengthComputable) {
var percentComplete = Math.round(evt.loaded * 100 / evt.total);
}*/
}

var requestIdForPayment;
function uploadCompleteFormBuilder(evt) {
console.log("===== evt uploadCompleteFormBuilder" + JSON.stringify(evt));
for (var ind = 0; ind < pageData.list.length; ind++) {
    if (pageData.list[ind].identifire == "custom" && listType == "customform") {
        var evtFullData = JSON.parse(evt.srcElement.response);
        requestIdForPayment = evtFullData.requestId;
        console.log("requestIdForPayment   " + requestIdForPayment);
    } else if (pageData.list[ind].identifire == "app" && listType == "appointment") {
         Appyscript.hideIndicator();
         var evtFullData = JSON.parse(evt.srcElement.response);
         requestIdForPayment = evtFullData.requestId;
         console.log("requestIdForPayment   " + requestIdForPayment);
         if(!payment_flag){
         if(requestIdForPayment){
         Appyscript.alert((formBuilderData.submissionSuccessMsg.replace("__REQUEST_ID__",requestIdForPayment)),window.data.appData.appName);
         }
         else{
         Appyscript.alert(formBuilderData.submissionSuccessMsg,window.data.appData.appName);
         }
         }
        //Appyscript.alert(formBuilderData.submissionSuccessMsg, window.data.appData.appName);
        return false;
    } else if (pageData.list[ind].identifire == "quote" && listType == "quoteform") {
        Appyscript.hideIndicator();
        Appyscript.alert(formBuilderData.submissionSuccessMsg, window.data.appData.appName);
        return false;
    }
}
Appyscript.hideIndicator();
AppyTemplate.global.dirPageIdFordirectory="";
AppyTemplate.global.dirPageIdForHyperlocal = "";
if(payment_flag){
if(formBuilderData.paymentMethod == "paypal_express")
{
if(pageData.pageTitle)

openPaypalNative(paypalHtmlData,"formbuilder");

else
Appyscript.openPaypal(paypalHtmlData,"formbuilder",data.appData.appName);
payment_flag=false;
fileFormBuilderArray=[];
}
else if (formBuilderData.paymentMethod == "payfast") {
          if (pageData.pageTitle)
              openPayFastNative(payfastHtmlData, "formbuilder");
          else
              Appyscript.openPayFast(payfastHtmlData, "formbuilder", data.appData.appName);
          payment_flag = false;
          fileFormBuilderArray=[];
 }

else if(formBuilderData.paymentMethod == "payu"){
var new_date=new Date().getTime();
var orderId='app_'+new_date;
Appyscript.openPayuView(formBuilderData.amount, requestId,
appid, "FirstName", "LastName" ,
"Email","Phone",formBuilderData.merchantId,formBuilderData.secretKey, site_url, "formbuilder");
payment_flag=false;
fileFormBuilderArray=[];

}


else if(formBuilderData.paymentMethod == "stripePay"){
Appyscript.alert((formBuilderData.submissionSuccessMsg.replace("__REQUEST_ID__",requestIdForPayment)),window.data.appData.appName);
payment_flag=false;
fileFormBuilderArray=[];
}
else if(formBuilderData.paymentMethod == "velocity"){

//Appyscript.alert(formBuilderData.submissionSuccessMsg,window.data.appData.appName);
var new_date=new Date().getTime();
var orderId='app_'+new_date;
payment_flag=false;
fileFormBuilderArray=[];
}

}else{
//Appyscript.alert(formBuilderData.submissionSuccessMsg,window.data.appData.appName);
if(formBuilderData.identifire != "custom" ){
Appyscript.alert(formBuilderData.submissionSuccessMsg,window.data.appData.appName);
}
else
{


            if(pageId == "services" || pageId == "hyperlocal" ){

                Appyscript.alert((formBuilderData.submissionSuccessMsg.replace("__REQUEST_ID__",requestIdForPayment)),window.data.appData.appName);

            }

            if(AppyTemplate.global.pagefrom == "event")
            {

             pageData = eventPageData;

                            //pageData = pageDataDir;
                            //AppyTemplate.global.dirPageIdFordirectory = pageIdentifie;
                            //pageIdentifie = localStorage.getItem("quizpageIdentifie")
                            AppyTemplate.global.styleAndNavigation=pageData.styleAndNavigation;

                           getVenuesByEvent(JSON.parse(localStorage.getItem("eventDummyData")));
            }


            else{
               Appyscript.alert((formBuilderData.submissionSuccessMsg.replace("__REQUEST_ID__",requestIdForPayment)),window.data.appData.appName);
            }
}
fileFormBuilderArray=[];
}

$$("form")[0].reset();
$$('#latLongCustom').val("");
$$("form .select-file").each(function(){
$$(this).find("font").text($$(this).find("font").attr("data-val"));
$$(this).find("font").attr("file-exit","")
$$(this).find("input").val("");

});
if($$(".signature-tabs").length == 1) {
$$(".signature-tabs").find("img").remove();
}

if(AppyTemplate.global.phone != undefined && AppyTemplate.global.phone !=null && AppyTemplate.global.phone != "")
  {
  $$("input[name='phone']").eq(0).val(AppyTemplate.global.phone);
  }

  if(AppyTemplate.global.email != undefined && AppyTemplate.global.email !=null && AppyTemplate.global.email != "")
  {
  $$("input[name='email']").eq(0).val(AppyTemplate.global.email);
  }

  if(AppyTemplate.global.username != undefined && AppyTemplate.global.username !=null && AppyTemplate.global.username != "")
  {
  $$("input[name='name']").eq(0).val(AppyTemplate.global.username);
  }

}

function uploadFailed(evt) {
Appyscript.hideIndicator();
// Appyscript.alert("File uploading failed.");
Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
}

function uploadCanceled(evt) {
Appyscript.hideIndicator();
Appyscript.alert("File uploading cancel.");
}


var _workingHoursEditable;
var _getTodaysDay;
var _dayWiseArray;
var _slotDate;

Appyscript.validateTime = function(date, time) {
    var n = time.indexOf("AM");
    var n2 = time.indexOf("PM");
    if (n == -1 || n2 == -1) {
        time = tConvert(time);
    }
    if (formBuilderData.scheduleStatus == "0")

        return true;

    if (date == undefined || date == '')
        return false;

    var current = new Date();
    var currenttime = current.toLocaleTimeString('en-US');

    //var formDate=date;//[dateSplit[1],dateSplit[0],dateSplit[2]].join('/');
    // var dt = new Date(date);
    var formDate = date.split("/"); //date;
    formDate = formDate[0] + "/" + formDate[1] + "/" + formDate[2];
    var dt = new Date(date + ' ' + currenttime);
    var formDate = date; //date;
    var index = dt.getDay();
        var scheduleTimeDayJson = formBuilderData.appoinmentSchedule[index];

        if (scheduleTimeDayJson.open == "0")
            return false;

        var starttemp = "";
        var endtemp = "";
        if (formBuilderData.appScheduleFormat) {
            starttemp = tConvert(scheduleTimeDayJson.startHour + ":" + scheduleTimeDayJson.startMin)
            endtemp = tConvert(scheduleTimeDayJson.endHour + ":" + scheduleTimeDayJson.endMin)

        } else {
            starttemp = scheduleTimeDayJson.startHour + ":" + scheduleTimeDayJson.startMin + " " + scheduleTimeDayJson.startAMPM;
            endtemp = tConvert(scheduleTimeDayJson.endHour + ":" + scheduleTimeDayJson.endMin + " " + scheduleTimeDayJson.endAMPM)
        }
        var startDate = new Date(formDate + " " + starttemp);
        var endDate = new Date(formDate + " " + endtemp);
        var checkDate = new Date(formDate + " " + time);

        if (Date.parse(checkDate) >= Date.parse(startDate) && Date.parse(checkDate) <= Date.parse(endDate))
            return true;

        return false;
};

Appyscript.validateTimeNew = function(date, time) {
    var n = time.indexOf("AM");
    var n2 = time.indexOf("PM");
    if (n == -1 || n2 == -1) {

        time = tConvert(time);
    }


    if (formBuilderData.scheduleStatus == "0")
        return true;

    if (date == undefined || date == '')
        return false;

    var current = new Date();
    var currenttime = current.toLocaleTimeString('en-US');
    //var dt=new Date(date+' '+currenttime);
    var dt = new Date(date + ' ' + currenttime);
    var formDate = date; //date;
    var index = dt.getDay();
    _workingHoursEditable = formBuilderData.defaultScheduleData;
    _getTodaysDay = formGetCurrentDate_Data("day_Custom");
    _dayWiseArray = _workingHoursEditable[_getTodaysDay];
    _slotDate = formGetCurrentDate_Data("currentDate_Custom");

    var scheduleTimeDayJson = _workingHoursEditable[_getTodaysDay + "Open"]

    if (scheduleTimeDayJson == "0")
        return false;


    var starttemp = "";
    var endtemp = "";

    var demoArr = [];
    demoArr = _dayWiseArray;

    var _slotStartTime = "";
    var _slotEndTime = "";
    var startFormDateTime = "";
    var endFormTime = "";
    var startFormDateTimeHours = "";
    var startFormDateTimeMinutes = "";
    var endFormTimeHours = "";
    var endFormTimeMinutes = "";

    for (var i = 0; i < demoArr.length; i++) {
        _dayWiseArray = demoArr[i];
        if (formBuilderData.appScheduleFormat){
             _slotStartTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HStart"] + ":" + _dayWiseArray[_getTodaysDay + "MStart"])).getTime();
                    _slotEndTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HEnd"] + ":" + _dayWiseArray[_getTodaysDay + "MEnd"])).getTime();
        }else{
             _slotStartTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HStart"] + ":" + _dayWiseArray[_getTodaysDay + "MStart"] + " " + _dayWiseArray[_getTodaysDay + "AMStart"])).getTime();
             _slotEndTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HEnd"] + ":" + _dayWiseArray[_getTodaysDay + "MEnd"] + " " + _dayWiseArray[_getTodaysDay + "AMEnd"])).getTime();
        }

        startFormDateTime = new Date(_slotStartTime);
        endFormTime = new Date(_slotEndTime);

        startFormDateTimeHours = parseInt(startFormDateTime.getHours());
        startFormDateTimeMinutes = parseInt(startFormDateTime.getMinutes());

        endFormTimeHours=parseInt(endFormTime.getHours());
        endFormTimeMinutes=parseInt(endFormTime.getMinutes());

        starttemp = tConvert(startFormDateTimeHours + ":" + startFormDateTimeMinutes)
        endtemp = tConvert(endFormTimeHours + ":" + endFormTimeMinutes)

        var startDate = new Date(formDate + " " + starttemp);
        var endDate = new Date(formDate + " " + endtemp);
        var checkDate = new Date(formDate + " " + time);
        if (Date.parse(checkDate) >= Date.parse(startDate) && Date.parse(checkDate) <= Date.parse(endDate) && Date.parse(checkDate) >= (new Date()).getTime()) {
            return true;
        }
    }
    /*if (formBuilderData.appScheduleFormat) {alert("ff")
        starttemp = tConvert(scheduleTimeDayJson.startHour + ":" + scheduleTimeDayJson.startMin)
        endtemp = tConvert(scheduleTimeDayJson.endHour + ":" + scheduleTimeDayJson.endMin)
    } else {
        starttemp = scheduleTimeDayJson.startHour + ":" + scheduleTimeDayJson.startMin + " " + scheduleTimeDayJson.startAMPM;
        endtemp = tConvert(scheduleTimeDayJson.endHour + ":" + scheduleTimeDayJson.endMin + " " + scheduleTimeDayJson.endAMPM)
    }/*

    var startDate = new Date(formDate + " " + starttemp);
    var endDate = new Date(formDate + " " + endtemp);
    var checkDate = new Date(formDate + " " + time);

    //var startDate=new Date(date+" "+scheduleTimeDayJson.startHour+":"+scheduleTimeDayJson.startMin+" "+scheduleTimeDayJson.startAMPM);
    //var endDate=new Date(date+" "+scheduleTimeDayJson.endHour+":"+scheduleTimeDayJson.endMin+" "+scheduleTimeDayJson.endAMPM);
    //var checkDate=new Date(date+" "+time);*/


}
function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}

var payment_flag=false;
var paypalHtmlData="";
var payfastHtmlData="";
var storePar;
var isForStripePayment=false;
var stripePaymentIdForGlobal=null;
var fileFormBuilderArray=[];

Appyscript.sendCustomForm = function(a,dirpageid,hyperpageid){
var digitalSignaturecheck;
var customFormURL=webserviceUrl+'Formbuilder.php';
$$(".error").removeClass("error");

var customData=Appyscript.getCustomFormData();

if(!customData.flag){
$$("#formbuilder").show().parent()[0].scrollTop = $$(".error")[0].offsetTop;
return;
}
if($$(".signature-tabs").length == 1) {

digitalSignaturecheck=$$(".signature-tabs img").attr("src")
if(digitalSignaturecheck==undefined||digitalSignaturecheck==null||digitalSignaturecheck=='')
{
 Appyscript.alert(formBuilderData.submissionErrorMsg);
return;
}
else{
digitalSignaturecheck=digitalSignaturecheck;

}

}
var amount=0;
var currency="";
requestId=(new Date().getTime()).toString(36);
var pageTypeForSave=""

if(formBuilderData.payStatus=="1"){



if(formBuilderData.payOption=="payAmt"){
var amountIn=$$("#amountFixed").attr("amounttotal");
amount=parseFloat( amountIn!="" ? (!isNaN(amountIn) ? amountIn:0.0):0.0 )+parseFloat( subOptionAmount!=""? (!isNaN(subOptionAmount)? subOptionAmount:0.0):0.0);

}
// else if(formBuilderData.payOption=="payAmtcust"){
// var amountIn=$$("#amount").val();
// amount=parseFloat( amountIn!="" ? (!isNaN(amountIn) ? amountIn:0.0):0.0 );
// }
else{
    var amountIn=$$("#amount").val();
    if(formBuilderData.payOption=="payAmtcust"){
        if(amountIn==""){
            $$("#amount").parent().addClass("error");
            Appyscript.alert(formBuilderData.submissionErrorMsg);
            return;
        }
        else if(isNaN(amountIn)){
            $$("#amount").parent().addClass("error");
            Appyscript.alert("Please enter Valid Amount");
            return;
        }
        else if(amountIn==0){
            $$("#amount").parent().addClass("error");
            Appyscript.alert(formBuilderData.priceZeroText);
            return;
        }
    }
    amount=parseFloat( amountIn!="" ? (!isNaN(amountIn) ? amountIn:0.0):0.0 )+parseFloat( subOptionAmount!=""? (!isNaN(subOptionAmount)? subOptionAmount:0.0):0.0);
}

//amount=amount+amountvalhide;
console.log("amount value="+amount);
if(amount>0){
    payment_flag=true;
}

formBuilderData.amount =amount;

currency=$$("#amount_currency").find("option[value='"+$$("#amount_currency").val()+"']").text();
//currency=$$("#amount").attr("currency");
if(currency==undefined || currency=="undefined")
{
currency=$$("#amountFixed").attr("currency");
console.log("===== currency : " + currency);
}
formBuilderData.currency=currency;
paypalHtmlData=Appyscript.getPayPalHtmlformbuilder("", formBuilderData.paypalId, amount, currency, requestId, site_url+"/paypalmobile/successformbuilder", site_url+"/paypalmobile/notify-form-builder/appId/"+window.data.appData.appId,formBuilderData.customData);
if(formBuilderData.paymentMethod == "payfast"){
payfastHtmlData=Appyscript.getPayFastHtmlformbuilder("", formBuilderData.payfastMerchantId, formBuilderData.payfastMerchantKey, amount, currency, requestId, site_url+"/paypalmobile/payfast-success", site_url+"/paypalmobile/payfast-cancel", site_url+"/paypalmobile/notify-form-builder-payfast/appId/"+window.data.appData.appId+"/orderId/"+requestId, formBuilderData.customData);
pageTypeForSave="save";
imageFD.append("payType","save");
}

else if(formBuilderData.paymentMethod == "velocity"){
//alert("yahan first time call hua");
velocityPaymentForm();
pageTypeForSave="";
imageFD.append("payType","");

}



else if(formBuilderData.paymentMethod == "stripePay" || amount<=0) {
pageTypeForSave="";
imageFD.append("payType","");
}
else {
pageTypeForSave="save";
imageFD.append("payType","save");
}

}else{
pageTypeForSave="";
imageFD.append("payType","");
}

var len=customData.type.length;
for(var i=0; i<len; i++){
if(customData.type[i]=="category"){
delete customData.type[i];
delete customData.label[i];
delete customData.value[i];
}
if(customData.type[i]=="subCategory" || customData.type[i]=="subCategoryPrice"){
customData.type[i]="category";
}
}
var d = new Date();
var timeStamp = "app"+d.getTime();
timeStamp = timeStamp.substring(5,timeStamp.length-2);
var j=0;
var type=[];
var label=[];
var value=[];
var imagecount=0;
for(var i=0; i<len; i++){
if(customData.type[i]!=undefined){
type[j]=customData.type[i];
label[j]=customData.label[i];
/*  if(type[j]=="uploadPicture"){
value[j++]="app_"+timeStamp+customData.value[i];
imagecount++;
}else{*/
value[j++]=customData.value[i];
//}
}
}

delete customData.type;
delete customData.label;
delete customData.value;

customData.type=type;
customData.label=label;
customData.value=value;

console.log(customData);

	var userLatLong = localStorage.getItem("formbuilderlatlongval");


if(formBuilderData.enableUserLocation)
{
formBuilderAddress = formBuilderAddress;
customData.type.push("userAddress");
customData.value.push(formBuilderAddress);
customData.label.push(AppyTemplate.global.commonLanguageSetting.user_address);
}

if(formBuilderData.payStatus=="1")
{
var paymentAmount=(stripePaymentIdForGlobal!=null || formBuilderData.paymentMethod!= "stripePay")? formBuilderData.amount:"0.0";
//console.log("paymentAmount paymentAmount::"+paymentAmount);
if(paymentAmount>0)
{
customData.type.push("paymentMethodType");
customData.value.push(formBuilderData.paymentMethod);
customData.label.push(AppyTemplate.global.commonLanguageSetting.payment_method_type);

/*customData.type.push("currencyType");
customData.value.push(formBuilderData.currency);
customData.label.push(AppyTemplate.global.commonLanguageSetting.currency);*/


/*  customData.type.push("paymentAmountType");
customData.value.push(paymentAmount);
customData.label.push(AppyTemplate.global.commonLanguageSetting.payment_amount);*/


//var totlaAmount=$$("#amount").attr("totalAmt");
customData.type.push("totalAmountType");
customData.value.push(paymentAmount+" "+formBuilderData.currency);
customData.label.push(AppyTemplate.global.commonLanguageSetting.total_amount);

}


}

console.log(customData);

var formLabel=Appyscript.convertStringToJson(customData.label);
var formData=Appyscript.convertStringToJson(customData.value);
var formFields=Appyscript.convertStringToJson(customData.type);

if(formBuilderData.amount>0 && stripePaymentIdForGlobal==null && formBuilderData.paymentMethod == "stripePay")
{
storePar=a;
stripePaymentUi();

return;

}

var joblistingownermail = localStorage.getItem("JOBCUSTOMOWNERMAIL");
console.log("=== joblistingownermail in formbuilder : "+ joblistingownermail);


var hyperpageid;
var hyperservicelistid;

if(AppyTemplate.global.hyperjobid)
{
 hyperpageid=AppyTemplate.global.hyperjobid;
 hyperservicelistid=AppyTemplate.global.hyperlocallistid;
}
else{
hyperpageid=hyperpageid;
hyperservicelistid=AppyTemplate.global.servicelistid;
}


Appyscript.showIndicator();

imageFD.append("appId",window.data.appData.appId);
imageFD.append("formPageId",pageIdentifie);
imageFD.append("emailId",formBuilderData.requestEmail);

imageFD.append("pageName", AppyTemplate.global.Pagename);
imageFD.append("listingId",hyperservicelistid);
imageFD.append("dirListid",dirpageid);
imageFD.append("hyperlocalListid",hyperpageid);

imageFD.append("requestId",requestId);
imageFD.append("actionType","sendCustomMailTemplate");
imageFD.append("formData",JSON.stringify(formData));
imageFD.append("formLabel",JSON.stringify(formLabel));
imageFD.append("userEmail",joblistingownermail);
imageFD.append("formFields",JSON.stringify(formFields));
imageFD.append("subject",formBuilderData.submissionEmailSub);
imageFD.append("formName",formBuilderData.name);
imageFD.append("ownerEmail",window.data.appData.owneremail);
imageFD.append("lang",Appyscript.getDefaultLanguage());
imageFD.append("appName",window.data.appData.appName);
imageFD.append("mailHeadingText",formBuilderData.mailHeadingText);
imageFD.append("digitalSignature",digitalSignaturecheck);

var reset = false;
var faxCredentials = JSON.parse(formBuilderData.FaxCredentialArr);
for(key in faxCredentials){
    console.log(faxCredentials[key])
    if(faxCredentials[key] == 0){
        reset = true;
        break;
    }
}
if(reset){
    imageFD.append("FaxCredentialArr","");
}else{
    imageFD.append("FaxCredentialArr",formBuilderData.FaxCredentialArr);
}

if(fileFormBuilderArray){

for(i=0;i<fileFormBuilderArray.length;i++){
var fileName = fileFormBuilderArray[i].name.replace(/ /g, '_')

imageFD.append("file"+i, fileFormBuilderArray[i],fileName);
}
}
// var digitalSignature=null;
// if($$(".signature-tabs").length == 1) {
// digitalSignature=$$(".signature-tabs img").attr("src");
// imageFD.append("digitalSignature",$$(".signature-tabs img").attr("src"));
// }
if(formBuilderData.enableUserEmail) {
    imageFD.append("enableUserEmail",formBuilderData.enableUserEmail);
}

if(formBuilderData.formFillTimerformbuilder) {
    console.log("totalTimeTimer  "+totalTimeTimer);
    imageFD.append("formFillTimerformbuilder",formBuilderData.timeText+" : "+totalTimeTimer);
}

//console.log($$(".signature-tabs img").attr("src").replace("data:image/jpeg;base64,", ""));

/*
var xhr = new XMLHttpRequest();
xhr.upload.addEventListener("progress", uploadProgress, false);
xhr.addEventListener("load", uploadComplete, false);
xhr.addEventListener("error", uploadFailed, false);
xhr.addEventListener("abort", uploadCanceled, false);
xhr.open("POST", site_url+"/webservices/Formbuilder.php");
xhr.send(imageFD);
*/
/*

var imgUpload="";
try{
while(imagecount > 0){
imagecount--;
imageIndex = imageIndex - 2;
imgUpload = imgUpload+","+imageFD.get("myfile"+imageIndex);

}
//		for(var i=1; i < imageIndex; i+=2){
//			if(i==1)
//				imgUpload = imageFD.get("myfile"+i);
//			else
//				imgUpload = imgUpload+","+imageFD.get("myfile"+i);
//		}
}catch(err){
console.log(err);
}

Appyscript.uploadFormbuilderData(customFormURL,dirpageid,hyperpageid, data.appData.appId, pageIdentifie, formBuilderData.requestEmail, requestId, JSON.stringify(formData), JSON.stringify(formLabel), JSON.stringify(formFields), formBuilderData.submissionEmailSub, formBuilderData.name, window.data.appData.owneremail, Appyscript.getDefaultLanguage(), window.data.appData.appName, formBuilderData.mailHeadingText, imgUpload, timeStamp,digitalSignature, pageTypeForSave, formBuilderData.enableUserEmail);
*/
listType="customform"

var xhr = new XMLHttpRequest();
xhr.upload.addEventListener("progress", uploadProgress, false);
xhr.addEventListener("load", uploadCompleteFormBuilder, false);
xhr.addEventListener("error", uploadFailed, false);
xhr.addEventListener("abort", uploadCanceled, false);
xhr.open("POST",webserviceUrl+"Formbuilder.php");
//321 xhr.setRequestHeader("accessToken", deviceEncryptedToken);
xhr.setRequestHeader("contentType", "application/x-www-form-urlencoded;charset=utf-8");
xhr.send(imageFD);
imageArrayName = {};
imageFD = new FormData();
imageFDFlag=false;
imageIndex=1;
stripePaymentIdForGlobal = null;
setTimeout(function(){
    Appyscript.showIndicator();
},500);
setTimeout(function(){
  var showtotalTimer = document.getElementById('setTimerCustom');
    showtotalTimer.textContent = "00:00:00";
    totalTimeTimer = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
},9000);
}

var manualLat;
var manualLong;
function latLongOpenMap() {
        Appyscript.showIndicator();
        $$.get("pages/formbuilder-map.html", function (template){
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(formBuilderData);
            mainView.router.load({
                content: html,
                animatePages: true
            });
        });
 setFormBuilderAddress();
    setTimeout(function(){
        var myLatlng = {
            lat: parseFloat(locationData.split(",")[0]),
            lng: parseFloat(locationData.split(",")[1])
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: myLatlng,

        });

        var myMarker = new google.maps.Marker({
            position: myLatlng,
            draggable: true
        });

        google.maps.event.addListener(myMarker, 'dragend', function(evt) {
            manualLat = evt.latLng.lat().toFixed(5);
            manualLong = evt.latLng.lng().toFixed(5);
            setFormBuilderAddress();
            document.getElementById('latLongCustom').value = manualLat+","+manualLong;
        });
        google.maps.event.addListener(myMarker, 'click', function (evt) {
            mainView.router.back();
        });

        map.setCenter(myMarker.position);
        myMarker.setMap(map);
    },1000);
    Appyscript.hideIndicator();
}

var formBuilderAddress = "";
var locationData;
function setFormBuilderAddress() {
    if (formBuilderData.enableUserLocation)  {
        if(manualLat != undefined){
            locationData = manualLat+","+manualLong;
        }else{
            locationData = Appyscript.getCurrentPosition();
            document.getElementById('latLongCustom').value = locationData;
        }
        if (locationData != null) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(locationData.split(",")[0], locationData.split(",")[1]);
            localStorage.setItem("FORMBUILDELATLONG", latlng);
            localStorage.setItem("formbuilderlatlongval", latlng);
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        if (appId == "3b0067263134") {
                            formBuilderAddress = "" + latlng;
                        } else {
                            formBuilderAddress = results[0].formatted_address;
                        }
                    } else {
                        console.log("Location not set, status: " + status);
                    }
                } else {
                    console.log("Geo-coder failed, status: " + status);
                }
            });
        }
    }
}

function uploadProgress(evt) {
//This can used to compute progress of uploading file(s).
/*if (evt.lengthComputable) {
var percentComplete = Math.round(evt.loaded * 100 / evt.total);
}*/
}

function uploadComplete(evt) {
    Appyscript.hideIndicator();
    AppyTemplate.global.dirPageIdFordirectory = "";
    AppyTemplate.global.dirPageIdForHyperlocal = "";
    if (payment_flag) {
        if (formBuilderData.paymentMethod == "paypal_express") {
            if (pageData.pageTitle)

                openPaypalNative(paypalHtmlData, "formbuilder");

            else
                Appyscript.openPaypal(paypalHtmlData, "formbuilder", data.appData.appName);
            payment_flag = false;
            fileFormBuilderArray = [];
        } else if (formBuilderData.paymentMethod == "payfast") {
            if (pageData.pageTitle)
                openPayFastNative(payfastHtmlData, "formbuilder");
            else
                Appyscript.openPayFast(payfastHtmlData, "formbuilder", data.appData.appName);
            payment_flag = false;
            fileFormBuilderArray = [];
        } else if (formBuilderData.paymentMethod == "velocity") {
            payment_flag = false;
            fileFormBuilderArray = [];
        } else if (formBuilderData.paymentMethod == "payu") {
            var new_date = new Date().getTime();
            var orderId = 'app_' + new_date;
            Appyscript.openPayuView(formBuilderData.amount, requestId,
                appid, "FirstName", "LastName",
                "Email", "Phone", formBuilderData.merchantId, formBuilderData.secretKey, site_url, "formbuilder");
            payment_flag = false;
        } else if (formBuilderData.paymentMethod == "stripePay") {
            Appyscript.alert(formBuilderData.submissionSuccessMsg, window.data.appData.appName);
            payment_flag = false;
            fileFormBuilderArray = [];
        }

    } else {
        Appyscript.alert(formBuilderData.submissionSuccessMsg, window.data.appData.appName);
        $$("form")[0].reset();
        $$("form .select-file").each(function() {
            //$$(this).find("font").text($$(this).find("font").attr("data-val"));
            $$(this).find("font").text($$(this).find("font").attr("data-val")).removeAttr("file-exit");
        });
        if ($$(".signature-tabs").length == 1) {
            $$(".signature-tabs").find("img").remove();
            fileFormBuilderArray = [];
        }
    }

    /* $$("form")[0].reset();
    $$("form .select-file").each(function(){
    $$(this).find("font").text($$(this).find("font").attr("data-val"));
    });
    if($$(".signature-tabs").length == 1) {
    $$(".signature-tabs").find("img").remove();
    }*/
}

function uploadFailed(evt) {
Appyscript.hideIndicator();
Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);

}

function uploadCanceled(evt) {
Appyscript.hideIndicator();
Appyscript.alert("File uploading cancel.");
}

var serviceSaleForceData;
Appyscript.sendFormBuilderQuoteMail = function(data){
    var sendQuoteURL=webserviceUrl+'Formbuilder.php';
    var serviceData='{"method":"sendSubQuoteMailTemplate","appId":"'+window.data.appData.appId+'","quoteFname":"'+data.fname+'","quoteLname":"'+data.lname+'","emailId":"'+data.email+'","phone":"'+data.phone+'","subject":"'+data.postsubject+'","comments":"'+data.comment.replace("/'/g","")+'","ownerEmail":"'+data.postemail+'","lang":"'+Appyscript.getDefaultLanguage()+'","quoteLabel":"","appName":"'+window.data.appData.appName+'","company":"'+data.company+'","mobile":"'+data.telephone+'","website":"'+data.website+'","city":"'+data.city+'","country":"'+data.country+'"}'
    console.log(serviceData);

    serviceSaleForceData='{"FirstName":"'+data.fname+'","LastName":"'+data.lname+'","Email":"'+data.email+'","Phone":"'+data.phone+'","Description":"'+data.comment.replace(/[^a-zA-Z ]/g, " ")+'","Company":"'+data.company+'","Website":"'+data.website+'","City":"'+data.city+'","Country":"'+data.country+'"}'

    Appyscript.showIndicator();
    if(isOnline()){
        $$.ajax({
            url: sendQuoteURL,
            data: Appyscript.validateJSONData(serviceData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},

            async: true,
            success: function(data, textStatus ){

                var new_data=JSON.parse(data);
                if(new_data['status']=='success'){

                    if(formBuilderData.crmSetting == "saleforce"){
                        sendQuoteDataToSalesForce(formBuilderData, serviceSaleForceData);
                    }else if(formBuilderData.authKey != ""){
                        Appyscript.alert(formBuilderData.submissionSuccessMsg, window.data.appData.appName);
                        sendQuoteDataToCRM(formBuilderData.authKey, formBuilderData.crmSetting, serviceData);
                        $$("form")[0].reset();
                        $$("form .select-file").each(function() {
                            $$(this).find("font").text($$(this).find("font").attr("data-val")).removeAttr("file-exit");
                        });
                    }else{
                        Appyscript.hideIndicator();
                        Appyscript.alert(formBuilderData.submissionSuccessMsg, window.data.appData.appName);
                        $$("form")[0].reset();
                        $$("form .select-file").each(function() {
                            $$(this).find("font").text($$(this).find("font").attr("data-val")).removeAttr("file-exit");
                        });
                    }

                }else{
                     Appyscript.hideIndicator();
                     Appyscript.alert(new_data['status']);
                }
            },error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }
    else{
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
    }
}

/***********************************************
        //****SalesForce API Integration****
************************************************/

function sendQuoteDataToSalesForce(formBuilderData, serviceData){
    var jsonData = JSON.parse(serviceData);
    console.log("jsonData**** "+ serviceData);

    var salesURL = formBuilderData.salesForceInstanceUrl+"/services/data/v20.0/sobjects/Lead";
    var auth = "Bearer " + formBuilderData.salesForceAccessToken;
    console.log("salesURL**** "+ salesURL);

    console.log(salesURL);
    Appyscript.showIndicator();
    if (isOnline()) {
        window.$.ajax({
            url: salesURL,
            data: Appyscript.validateJSONData(serviceData),
            type: "POST",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', auth),
                xhr.setRequestHeader('Content-Type', 'application/json')
            },
            success: function(data) {
                Appyscript.hideIndicator();
                if(data.success == true){
                    Appyscript.alert(formBuilderData.submissionSuccessMsg, window.data.appData.appName);
                    $$("form")[0].reset();
                    $$("form .select-file").each(function() {
                        $$(this).find("font").text($$(this).find("font").attr("data-val")).removeAttr("file-exit");
                    });
                }else{
                    Appyscript.alert(data.errors, window.data.appData.appName);
                    $$("form")[0].reset();
                    $$("form .select-file").each(function() {
                        $$(this).find("font").text($$(this).find("font").attr("data-val")).removeAttr("file-exit");
                    });
                }
                console.log(data);
            },
            error: function(error) {
                //Appyscript.hideIndicator();
                console.log("Error: " + error.statusText);
                if(error.statusText == "Unauthorized"){
                    createValildAuthSalesforce(formBuilderData);
                }else{
                    Appyscript.hideIndicator();
                    Appyscript.alert(formBuilderData.quotePostSameData, appnameglobal_allpages);
                };
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

/********************************* Authenticate Access Token ********************************/
function createValildAuthSalesforce(formBuilderData){
    console.log("ffff  "+ formBuilderData.salesForceClientId)
   // var baseSales = https://login.salesforce.com/services;
    Appyscript.showIndicator();
    var salesURL = "https://login.salesforce.com/services/oauth2/token?grant_type=refresh_token&client_id="+formBuilderData.salesForceClientId+"&client_secret="+formBuilderData.salesForceSecretKey+"&refresh_token="+formBuilderData.salesForceRefreshToken;
    console.log("checkURL    "+salesURL);
    if (isOnline()) {
        window.$.ajax({
            url: salesURL,
            type: "GET",
            success: function(data) {
                console.log(data);
                formBuilderData.salesForceAccessToken = data.access_token;
                sendQuoteDataToSalesForce(formBuilderData, serviceSaleForceData);
            },
            error: function(error) {
                Appyscript.hideIndicator();
                console.log("Error: " + error);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

/***********************************************
        //****SalesForce API Integration****
************************************************/

function sendQuoteDataToCRM(key, crmType, quoteData){
    if(crmType == "zoho"){
        var jsonData=JSON.parse(quoteData);
        var xml = '<?xml version="1.0" encoding="UTF-8"?>'+
        '<Leads>'+
        '<row no="1">'+
        '<FL val="Company">'+jsonData.company+'</FL>'+
        '<FL val="First Name">'+jsonData.quoteFname+'</FL>'+
        '<FL val="Last Name">'+jsonData.quoteLname+'</FL>'+
        '<FL val="Email">'+jsonData.emailId+'</FL>'+
        '<FL val="Phone">'+jsonData.phone+'</FL>'+
        '<FL val="Mobile">'+jsonData.mobile+'</FL>'+
        '<FL val="City">'+jsonData.city+'</FL>'+
        '<FL val="Country">'+jsonData.country+'</FL>'+
        '<FL val="Description">'+jsonData.comments+'</FL>'+
        '<FL val="Website">'+jsonData.website+'</FL>'+
        '<FL val="Assistant">none</FL>'+
        '</row>'+
        '</Leads>';

        var zohoUrl="https://crm.zoho.com/crm/private/xml/Leads/insertRecords?authtoken="+key+"&scope=crmapi&newFormat=1&xmlData="+xml;
        if(isOnline()){
            $$.ajax({
                url: zohoUrl,
                data: "",
                type: "get",
                async: true,
                success: function(data, textStatus ){
                    Appyscript.hideIndicator();
                    console.log("Success");
                },error: function(error) {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        }
        else{
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
        }
    }else{
        //Appyscript.openCRMWebView(key,crmType,quoteData,formBuilderData.name);
        var jsonData=JSON.parse(quoteData);
        var salesURL="https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&oid="+key+"&retURL=http://&first_name="+jsonData.quoteFname+
        "&last_name="+jsonData.quoteLname+"&email="+jsonData.emailId+"&company="+jsonData.company+"&phone="+jsonData.phone+
        "&mobile="+jsonData.mobile+"&country="+jsonData.country+"&description="+jsonData.comments+"&URL="+jsonData.website;

        console.log(salesURL);
        if(isOnline()){
            $$.ajax({
                url: salesURL,
                data: '',
                type: "post",

                async: true,
                success: function(data, textStatus ){
                    Appyscript.hideIndicator();
                    console.log(data);
                },error: function(error) {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        }
        else{
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
        }
    }
};

//Start native code
function openPaypalNative(paypalHtmlData,Id){
    if(Appyscript.device.android){
         Appyscript.openPaypal(paypalHtmlData,Id,pageData.pageTitle);
    }else{
         window.location = "newsstandpaypal:"+encodeURI(paypalHtmlData)+"&&"+Id+"&&"+pageData.pageTitle+"&&"+"formbuilder","";
    }
};

//Start native code
function openPayFastNative(payfastHtmlData, Id) {
    if (Appyscript.device.android) {
        Appyscript.openPayFast(payfastHtmlData, Id, data.appData.appName);
    } else {
        window.location = "newsstandpaypal:" + encodeURI(payfastHtmlData) + "&&" + Id + "&&" + pageData.pageTitle + "&&" + "formbuilder", "";
    }

}

Appyscript.onPageInit('signature',function(page){
setTimeout(function(){
Appyscript.digitalSignature();
}, 100);
})

Appyscript.digitalSignature = function(a) {

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
return window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimaitonFrame ||
function (callback) {
window.setTimeout(callback, 1000/60);
};
})();

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
// Set up the canvas
var canvas = document.getElementById("signature");
var width = $$(window).width() - 30;
var height = parseInt(width/3);
if(height > ($$(canvas).parent().height() - 30))
{
height =parseInt($$(canvas).parent().height() - 30);
}
//$$(".signature-pop div").css("width", width + "px").css("height", height + "px")
//.css({"margin-left": "-" + parseInt(width/2) + "px","margin-top": "-" + parseInt(height/2) + "px"})

//($$(canvas).parent().height() -
//$$(canvas).attr("width", width).attr("height", height).css({"margin-left": "15px","margin-top": parseInt(height/2) + "px"});
$$(canvas).attr("width", width).attr("height", height);//.css({"margin-top": "15px"});
var ctx = canvas.getContext("2d");
//ctx.strokeStyle = "#222222";
if(AppyTemplate.global.styleAndNavigation.field) {
ctx.strokeStyle = AppyTemplate.global.styleAndNavigation.field[1];
}
else {
if(pageData.styleAndNavigation.field) {
ctx.strokeStyle = pageData.styleAndNavigation.field[1];
}
else {
ctx.strokeStyle = "#222222";
}
}

ctx.lineWith = 2;

$$(".signature-toolbar a").click(function(){
if($$(this).is(".none")) {
return false;
}

if($$(this).is(".clear"))
{
$$(".signature-toolbar a").addClass("none");
ctx.save();
ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.restore()
}
else
{
var getSignature = $$(".signature-tabs").eq(sessionStorage.getItem('signatureIndex'));
getSignature.find("img").remove();
getSignature.append('<img src="'+canvas.toDataURL()+'" />');
Appyscript.popupClose();
cancelAnimationFrame(drawLoop);
}
})
// Set up the UI





// Set up mouse events for drawing
var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
drawing = true;
lastPos = getMousePos(canvas, e);
}, false);
canvas.addEventListener("mouseup", function (e) {
drawing = false;
}, false);
canvas.addEventListener("mousemove", function (e) {
mousePos = getMousePos(canvas, e);
}, false);

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
mousePos = getTouchPos(canvas, e);
var touch = e.touches[0];
var mouseEvent = new MouseEvent("mousedown", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
var mouseEvent = new MouseEvent("mouseup", {});
canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
var touch = e.touches[0];
var mouseEvent = new MouseEvent("mousemove", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);



// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
var rect = canvasDom.getBoundingClientRect();
return {
x: mouseEvent.clientX - rect.left,
y: mouseEvent.clientY - rect.top
};
}

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
var rect = canvasDom.getBoundingClientRect();
return {
x: touchEvent.touches[0].clientX - rect.left,
y: touchEvent.touches[0].clientY - rect.top
};
}

// Draw to the canvas
function renderCanvas() {
if (drawing) {
ctx.beginPath();
ctx.moveTo(lastPos.x, lastPos.y);
ctx.lineTo(mousePos.x, mousePos.y);
ctx.stroke();
lastPos = mousePos;
$$(".signature-toolbar a").removeClass("none");
}
}



function clearCanvas() {
canvas.width = canvas.width;
}

// Allow for animation
function drawLoop() {
requestAnimFrame(drawLoop);
renderCanvas();
}
drawLoop();

}

function stripePaymentOnNativeSide(creditCardType)
{

var creditCardJSON;
creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripe');
//  var card_type=creditCardJSON.card_type;
var cnumber=creditCardJSON.cardNumber;
var expairyMonth=creditCardJSON.expairyMonth;
var expairyYear=creditCardJSON.expairyYear;
var cHolder=creditCardJSON.cardHolder;
var cvvCode=creditCardJSON.cvvCode;
var card_type= Appyscript.validateCardType(cnumber);

if(isNaN(cnumber) || cnumber.length < 15)
{

Appyscript.hideIndicator();
Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
return null;

}
else if(expairyMonth == null || expairyMonth == '')
{
Appyscript.hideIndicator();
Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_month);
return null;
}
else if(expairyYear == null || expairyYear == '')
{
Appyscript.hideIndicator();
Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year);

return null;

}
else if(!isNaN(cHolder) || cHolder == null || cHolder == '')
{
Appyscript.hideIndicator();
Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_card_holder_name);

return null;

}
else if(isNaN(cvvCode) || cvvCode.length < 3||cvvCode=='')
{
Appyscript.hideIndicator();
Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code);

return null;

}

var cHolder1=cHolder.split(" ");
var lastName=  cHolder1[1];
var firstName=cHolder1[0];


if(lastName == '' || lastName == null)
{
lastName='';
}
var new_date=new Date().getTime();
var orderId='app_'+new_date;



Appyscript.showIndicator();

Appyscript.goForCreditCardPayment(cnumber,expairyMonth,expairyYear,cvvCode,firstName+" "+lastName,
formBuilderData.amount,orderId,formBuilderData.publishKey,formBuilderData.stripSecretKey,
formBuilderData.currency ,data.appData.owneremail, "formbuilder");



}



function stripePaymentCallbackInFormbuilder(stripePaymentId)
{
if(stripePaymentId!=null)
{
console.log("stripePaymentId :"+stripePaymentId)
stripePaymentIdForGlobal=stripePaymentId;
$$("input[name='paymentId']").val(stripePaymentId);
Appyscript.hideIndicator();
mainView.router.back();
setTimeout(function(){
Appyscript.sendCustomForm(storePar)
}, 300);



}
else
{
Appyscript.hideIndicator();
stripePaymentIdForGlobal=null;
Appyscript.alert(AppyTemplate.global.commonLanguageSetting.your_payment_is_not_successfull, appnameglobal_allpages);
}

}



function stripePaymentUi()
{
/* if(localStorage.getItem("email")==null)
{
Appyscript.loginPage('true');
callbackLogin=stripePaymentUi;
return;
}

callbackLogin=null;*/

Appyscript.showIndicator();
var new_date=new Date().getTime();
var orderId='app_'+new_date;

var paymentsmethode={};
paymentsmethode.list=[];

AppyTemplate.global.styleAndNavigation.tab = ["rgba(232,60,69,1)", "#ffffff", "rgba(232,60,69,1)"];

paymentsmethode.list.push({"method" : "stripe", "tabClassId":"stripe", "tabActive":" active", "label": AppyTemplate.global.commonLanguageSetting.form_builder_Credit_Card_via_Stripe,
"paymentMethodKey":"", "clientId":formBuilderData.publishKey, "secretKey":formBuilderData.stripSecretKey, "page":"formbuilder"});

$$.get("pages/paymentform.html", function (template)
{

var compiledTemplate = AppyTemplate.compile(template);
var html = compiledTemplate(paymentsmethode);
mainView.router.load({content: html,animatePages:true});


});
}


function callbackForPayUInFormbuilderFromNative(status)
{
if(status == "success")
{

Appyscript.alert(formBuilderData.submissionSuccessMsg,window.data.appData.appName);
$$("form")[0].reset();
$$("form .select-file").each(function(){
//$$(this).find("font").text($$(this).find("font").attr("data-val"));
$$(this).find("font").text($$(this).find("font").attr("data-val")).removeAttr("file-exit");
});
if($$(".signature-tabs").length == 1) {
$$(".signature-tabs").find("img").remove();
}

}else
{
Appyscript.alert(AppyTemplate.global.commonLanguageSetting.common_payment_is_failure , window.data.appData.appName);

}

}


var profilePic=false;
var imgIndexSl = 0;
var upload_image_dir=AppyTemplate.global.commonLanguageSetting.select_file;
/* This function is used to select photo  gallery */

var abbb;
var isRecalled='normal', isSigRecalled='signormal';
function returnCamFormBuild(){
    isRecalled='camera';
    selectPhotoDirForm(abbb);
}

function returnGalFormBuild(){
    isRecalled='gallery';
    selectPhotoDirForm(abbb);
}

function returnSigCamFormBuild(){
    isSigRecalled='sigcamera';
    selectDigitalSignature(a1);
}

//function returnSigGalFormBuild(){
//  var options = {
//  sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//  destinationType: navigator.camera.DestinationType.DATA_URL,
//  encodingType: Camera.EncodingType.JPEG,
//  targetWidth: 768,
//  targetHeight: 1024
//  }
//  navigator.camera.getPicture(librarySuccessForm, libraryErrorDir, options);
//    isSigRecalled='siggallery';
//    selectDigitalSignature(a1);
//}

function radical_initFile(a){

$( ".formBuilderFileUpload" ).change(function() {
    $(this).clone().insertAfter(a);

    var tempStr = $(a).parent("div").find(".formBuilderFileUpload").val();

  $(a).parent("div").children("font").html(tempStr.split("\\")[(tempStr.split("\\").length)-1]);

  $(a).parent("div").find(".formBuilderFileUpload").on("click",function(e){
  e.preventDefault();
  $( ".formBuilderFileUpload").unbind( "click" );
  $(e.currentTarget).attr("id","filechosse");
  $(e.currentTarget).attr("type","button");
  $(e.currentTarget).attr("onclick","selectPhotoDirForm(this);");
  $(e.currentTarget).attr("accept","*/*");
  $(e.currentTarget).attr("class","");
  selectPhotoDirForm(e.currentTarget);
  });

  $(a).remove();

});

}

function selectPhotoDirForm(a,b)
{
console.log(abbb)
abbb=a;
if(isRecalled=='normal')
Appyscript.modal({
title: upload_image_dir,
verticalButtons: true,
buttons: [
{
text: AppyTemplate.global.commonLanguageSetting.Camera_social_network,
onClick: function ()
{
 Appyscript.cameraPermission('returnCamFormBuild','Appyscript.permissionDenied')
//navigator.device.capture.captureImage(onSuccess, onFail, optionsCamera);
}
},
{
text: AppyTemplate.global.commonLanguageSetting.common_upload_from_gallery,
onClick: function ()
{
 Appyscript.storagePermission('returnGalFormBuild','Appyscript.permissionDenied')
}
},
{
text: '<div class="file_up" style="position:relative;"><input type="file" class="formBuilderFileUpload"  id="fileUpload_fb" style="opacity:0;position: absolute;top: 0;width: 100%;height: 100%; z-index:1"><label id="labelForFile" style="position:relative; z-index:0;">'+data.languageSetting.select_file+'</label></div>',
onClick: function ()
{

 //Appyscript.cameraPermission('returnCamFormBuild','Appyscript.permissionDenied')
//navigator.device.capture.captureImage(onSuccess, onFail, optionsCamera);
}
},
{
text: AppyTemplate.global.commonLanguageSetting.common_cancel,
onClick: function ()
{
}
}
]
})

radical_initFile(a);

if(isRecalled=='camera'){
formbuilderCamera()
isRecalled='normal'
}
if(isRecalled=='gallery'){
formbuilderGallery()
isRecalled='normal'
}

function formbuilderCamera()
{
var optionsCamera = {
quality: 50,
destinationType: Camera.DestinationType.DATA_URL,
sourceType: Camera.PictureSourceType.CAMERA,
encodingType: Camera.EncodingType.JPEG,
}
    navigator.camera.getPicture(onSuccess, onFail, optionsCamera);
}

function formbuilderGallery()
{
var optionsForGallery = {
quality: 50,
destinationType: Camera.DestinationType.DATA_URL,
sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
encodingType: Camera.EncodingType.JPEG,
}
    navigator.camera.getPicture(onSuccess, onFail, optionsForGallery);
}
function onSuccess(imageURI) {

if($(a).hasClass("formBuilderFileUpload")){
    $(a).attr("id","");
}else{
    //first Time
}

var imageArrayName=[];
var index=0
if(imageArrayName[index]=="undefined" || imageArrayName[index] == null){
imageArrayName[index] = "Image"+getRandomNumber();
}



/*if(typeof imageURI[0]!== "undefined" && typeof imageURI[0].fullPath !== "undefined")
{
var fullPath = imageURI[0].fullPath;
imageURI=Appyscript.callBase64(fullPath);
}*/

// console.log("imageURI :::"+JSON.stringify(imageURI));

a.value =  imageArrayName[index]+'.jpeg' ;
var file =  b64toBlob(imageURI,'image/jpeg');
$$(a).parent().find("font").text(imageArrayName[index]+'.jpeg').attr("file-exit", imageArrayName[index]+'.jpeg');
//console.log(file);
imageFDFlag=true;
imageFD.append("blob"+imageArrayName[index],file, imageArrayName[index]+'.jpeg');
savedImageFD.append("blob"+imageArrayName[index],file, imageArrayName[index]+'.jpeg');


}

function onFail(message)
{
//Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);

}
}

Appyscript.showFormbuilderAlert=function(){

//Appyscript.alert(formBuilderData.submissionSuccessMsg,window.data.appData.appName);
if(requestIdForPayment){
Appyscript.alert((formBuilderData.submissionSuccessMsg.replace("__REQUEST_ID__",requestIdForPayment)),window.data.appData.appName);
}
else{
Appyscript.alert(formBuilderData.submissionSuccessMsg,window.data.appData.appName);
}
$$("form")[0].reset();
$$("form .select-file").each(function(){
// $$(this).find("font").text($$(this).find("font").attr("data-val"));
$$(this).find("font").text($$(this).find("font").attr("data-val")).removeAttr("file-exit");
});
if($$(".signature-tabs").length == 1) {
$$(".signature-tabs").find("img").remove();
}
}

function selectDigitalSignature(a)
{
a1=a;
if(isSigRecalled=='sigcamera'){
isSigRecalled='signormal'
//selectDigitalSignature(a1);
}
else if(isSigRecalled=='siggallery'){
isSigRecalled='signormal';
//selectDigitalSignature(a1)
}
else{
Appyscript.modal({
title: AppyTemplate.global.commonLanguageSetting.common_choose_option,
verticalButtons: true,
buttons: [
{
text: formBuilderData.signHereText,
onClick: function ()
{
for(var i=0;i<pageData.list.length;i++)
       {
        if(pageData.list[i].identifire=="custom")
        {

            AppyTemplate.global.signHereText= pageData.list[i].signHereText;
            AppyTemplate.global.clearText= pageData.list[i].clearText;
            AppyTemplate.global.saveText= pageData.list[i].saveText;


        }
    }
Appyscript.popupClose();
Appyscript.popupPage('signature-popup');
}
},
{
text: AppyTemplate.global.commonLanguageSetting.common_upload_from_gallery,
onClick: function ()
{
Appyscript.storagePermission('selectDigitalCamSignature','Appyscript.permissionDenied')
//navigator.camera.getPicture(librarySuccessForm, libraryErrorDir, options);
}
},
{
text: AppyTemplate.global.commonLanguageSetting.common_cancel,
onClick: function ()
{
}
}
]



})

}

}

function selectDigitalCamSignature()
{
    var options = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: navigator.camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 768,
    targetHeight: 1024
    }
    navigator.camera.getPicture(librarySuccessForm, libraryErrorDir, options);
}

function librarySuccessForm(imageURI)
{
var imageData = "data:image/jpeg;base64," + imageURI;
console.log("===== imageData in librarySuccessForm method for signature : " + imageData);
a1.find("img").remove()
a1.append('<img src="'+imageData+'" />');

}









Appyscript.getPayPalHtmlformbuilder=function(paymentType, paypalId, amount, currency, requestId, successUrl, notifyUrl,listlenghthidden){
    var hiddenval='';
    for(var i=0; i<listlenghthidden.length; i++)
    {
        if(formBuilderData.customData[i].fieldType=="hidden")
        {
            var test=formBuilderData.customData[i];
            for(var j=0; j<test.list.length; j++)
            {

                var calamountval=test.list[j].subFieldValue;
                var subFieldValue=test.list[j].subFieldLebal;
                  var amountvalhide=parseInt(calamountval);

                   hiddenval += '<input type="hidden" name="'+subFieldValue+'" value="'+calamountval+'">'
                 console.log("hiddenval 425====="+hiddenval);
                console.log("hiddenval 425=qq424===="+amountvalhide);
                console.log("hiddenval 425==eqe==="+calamountval);
            }



        }

    }
     console.log("hiddenval ====="+hiddenval);
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

    var paymentFor='Payment for '+window.data.appData.appName+'('+window.data.appData.appId+')';
    var paypalIdHtml= '<!DOCTYPE HTML><html><body onload="ClickButtonPaypal();"><form action="'+url_prefix+'paypal.com/cgi-bin/webscr" method="post"><!-- Identify your business so that you can collect the payments. --><input type="hidden" name="business" value="'+paypalId+'">';
    var paypalAddFormHtml='<!-- Specify a Buy Now button. -->'+
    '<input type="hidden" name="cmd" value="_xclick'+click+'">'+
    '<input type="hidden" name="lc" value="'+data.appData.paypalLang+'">' +
    '<!-- Specify details about the item that buyers will purchase. -->'+
    '<input type="hidden" name="item_name" value="'+paymentFor+'">'+
    '<input type="hidden" name="amount" value="'+amount+'">'+
    '<input type="hidden" name="a3" value="'+amount+'">'+hiddenval+
    '<input type="hidden" name="p3" value="1">'+
    '<input type="hidden" name="t3" value="'+type+'">'+
    '<input type="hidden" name="src" value="1">'+
    '<input type="hidden" name="currency_code" value="'+currency+'">'+
    '<input type="hidden" name="quantity" value="1">'+
    '<input type="hidden" name="custom" value="'+requestId+'">';

    var PaypalUrlFormHtml='<!-- URL --><input type="hidden" name="return" value="'+successUrl+'" /><input type="hidden" name="cancel_return" value="https://gauravpaypal.com/" /><input type="hidden" name="notify_url" value="'+notifyUrl+'" /><!-- Display the payment button. --><input type="image" src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" name="submit" id="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="'+url_prefix+'paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>function ClickButtonPaypal(){$(\'#submit\').trigger(\'click\');}</script></body></html>';
     console.log("4335645575686876==="+paypalAddFormHtml);
      console.log("paypalIdHtml===  "+paypalIdHtml);
       console.log("PaypalUrlFormHtml===  "+PaypalUrlFormHtml);
    return (paypalIdHtml+paypalAddFormHtml+PaypalUrlFormHtml);
}

/**PayFast**/
 Appyscript.getPayFastHtmlformbuilder=function(paymentType, merchantId, merchantKey, amount, currency, requestId, successUrl, cancelUrl, notifyUrl, listlenghthidden){
    var hiddenval='';
    for(var i=0; i<listlenghthidden.length; i++)
    {
        if(formBuilderData.customData[i].fieldType=="hidden")
        {
            var test=formBuilderData.customData[i];
            for(var j=0; j<test.list.length; j++)
            {

                var calamountval=test.list[j].subFieldValue;
                var subFieldValue=test.list[j].subFieldLebal;
                  var amountvalhide=parseInt(calamountval);

                   hiddenval += '<input type="hidden" name="'+subFieldValue+'" value="'+calamountval+'">'
                 console.log("hiddenval 425====="+hiddenval);
                console.log("hiddenval 425=qq424===="+amountvalhide);
                console.log("hiddenval 425==eqe==="+calamountval);
            }



        }

    }
     console.log("hiddenval ====="+hiddenval);
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
        if(merchantId=="10005646" || merchantId=="10005532"){
            url_prefix="https://sandbox.payfast.co.za";
           // https://sandbox.payfast.co.za/eng/process
        }else{
            url_prefix="https://www.payfast.co.za";
        }

    console.log("merchantId===="+merchantId);
    console.log("url_prefix===="+url_prefix);

     var paymentFor='Payment for '+window.data.appData.appName+'('+window.data.appData.appId+')';
        var paypalIdHtml= '<!DOCTYPE HTML><html><body onload="ClickButtonPayFast();"><form action="'+url_prefix+'/eng/process" method="post"><!-- Identify your business so that you can collect the payments. --><input name="merchant_id" type="hidden" value="'+merchantId+'" /><input name="merchant_key" type="hidden" value="'+merchantKey+'" />';

        var paypalAddFormHtml='<!-- Specify a Buy Now button. -->'+
            '<!-- Specify details about the item that buyers will purchase. -->'+
            '<input name="name_first" value="'+data.name+'"  type="hidden"/>'+
            '<input name="name_last"  type="hidden" placeholder="Last Name" />'+
            '<input name="email_address" value="'+data.appData.owneremail+'" type="hidden"/>'+
            '<input name="m_payment_id" type="hidden" value="8542"/>'+
            '<input name="amount" type="hidden" value="'+amount+'"/>'+
            '<input name="item_name" type="hidden"value="'+formBuilderData.name+'"/>'+
            '<input name="item_description" type="hidden" value="'+""+'"/>'+
            '<input type="hidden" name="custom" value="'+requestId+'">';

         var PaypalUrlFormHtml='<!-- URL --><input type="hidden" name="return_url" value="'+successUrl+'" /><input name="cancel_url" type="hidden" value="'+cancelUrl+'" /><input type="hidden" name="notify_url" value="'+notifyUrl+'" /><!-- Display the payment button. --><input type="image" src="{URL}/images/subscribe_btn.png" name="submit" id="submit" alt="PayFast - The safer, easier way to pay online!"><img alt="" border="0" src="'+url_prefix+'paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>function ClickButtonPayFast(){$(\'#submit\').trigger(\'click\');}</script></body></html>';
            console.log("paypalAddFormHtml      "+paypalAddFormHtml);
        return (paypalIdHtml+paypalAddFormHtml+PaypalUrlFormHtml);
}

function formbuilderInfo(a) {
	/*
	var infoHTML = '<div class="info-window"><div class="info-details"><h5>Info Details <a class="iconz-remove" onclick="formbuilderRemoveInfo(this)"></a></h5><div class="info-content"></div></div></div>';
	$$("body").append(infoHTML);
	$$(".info-window .info-content").html("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.")
	*/
	//var htmlData = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries";
	var row = formBuilderData.customData[$$(a).attr("index")];
	Appyscript.alert(row.fieldIntro, AppyTemplate.global.style.appName);
}

function formbuilderRemoveInfo(a) {
	$$(".info-window").remove();
}

//----------For Bar Code and QR Code --------------//

var getInputFieldID="";

function BarCode_FormBuilder(inputID)
{

   getInputFieldID= $$(inputID).parent().find("input").attr("id");

    if(Appyscript.device.android)
    {
        AppyPieNative.validateLoyaltyViaScanner("formbuilder",pageData.pageTitle);
    }
    else
    {
        var identity_Chk='formbuilder';
        window.location="scanner:"+identity_Chk;
    }

}


function qrSuccess_FormBuilder(return_code)
{
    $$("#"+getInputFieldID).val(return_code).focus();

}

var form_requestId ="";
function velocityPaymentForm() {
    //Appyscript.alert(requestID);
    Appyscript.showIndicator();
    var new_date = new Date().getTime();
    var orderId = 'app_' + new_date;

    var paymentsmethode = {};
    paymentsmethode.list = [];
    //
    AppyTemplate.global.styleAndNavigation.tab = ["rgba(232,60,69,1)", "#ffffff", "rgba(232,60,69,1)"];
    var i;
    var k = pageData.list.length;
    var i = "";
    var velocitytoken, applicationProfile_Id, merchantProfile_Id, workflow_Id, identity_token, applicationLicense_Id;
    for (i = 0; i < k; i++) {
        if ((pageData.list[i].paymentMethod) == "velocity") {

            velocitytoken = pageData.list[i].velocityAccessToken;
            applicationProfile_Id = pageData.list[i].velocityProfileId;
            merchantProfile_Id = pageData.list[i].velocityMerchantId;
            workflow_Id = pageData.list[i].velocityWorkflowId;
            identity_token = pageData.list[i].velocityTokenId;
            applicationLicense_Id = pageData.list[i].velocityApplicationLicence;
        }
    }

    paymentsmethode.list.push({
        "method": "velocity",
        "tabClassId": "velocity",
        "tabActive": "active",
        "label": "Velocity",
        "paymentMethodKey": "velocity",
        "applicationProfileId": applicationProfile_Id,
        "workflowId": workflow_Id,
        "merchantProfileId": merchantProfile_Id,
        "identityToken": identity_token,
        "applicationLicenseID": applicationLicense_Id,
        "page": "formbuilder"
    });

    if (applicationLicense_Id != "") {
        $$.get("pages/paymentform.html", function(template) {

            var compiledTemplate = AppyTemplate.compile(template);
            var a = pageData.list.length;
            var i;
            for (i = 0; i < a; i++) {

                if ((pageData.list[i].paymentMethod) == "velocity" && pageData.list[i].velocityApplicationLicence != undefined) {
                    Appyscript.callAzureApi(pageData.list.length, pageData.list[i].paymentMethod, pageData.list[i].velocityApplicationLicence);
                }
            }

            var html = compiledTemplate(paymentsmethode);
            mainView.router.load({
                content: html,
                animatePages: true
            });


        });
    } else {
        $$.get("pages/paymentform.html", function(template) {

            var compiledTemplate = AppyTemplate.compile(template);

            var html = compiledTemplate(paymentsmethode);
            mainView.router.load({
                content: html,
                animatePages: true
            });


        });
    }

}

var form_requestId = "";

function executePaybyVelocity(paymentTypeObject) {

    if (formBuilderData.paymentMethod == "stripePay") {
        stripePaymentOnNativeSide(paymentTypeObject)
        return;
    }

    form_requestId = requestId;

    console.log("HI PAYMENT OBJECT DEKHLO", paymentTypeObject);


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
        Amount: formBuilderData.amount,
        CurrencyCode: formBuilderData.currency,
        EmployeeId: '13',
        IndustryType: 'Ecommerce',
        order_id: form_requestId

    }




    console.log("Transaction Data Dekhlo", transctionData)

    var velocitytoken;

    var i;
    var k = pageData.list.length;
    var i = "";
    var velocitytoken, applicationProfile_Id, merchantProfile_Id, workflow_Id;

    velocitytoken = formBuilderData.velocityAccessToken;
    applicationProfile_Id = formBuilderData.velocityProfileId;
    merchantProfile_Id = formBuilderData.velocityMerchantId;
    workflow_Id = formBuilderData.velocityWorkflowId;

    var sessionToken = velocitytoken;
    var applicationProfileId = applicationProfile_Id;
    var merchantProfileId = merchantProfile_Id;
    var workflowId = workflow_Id;

    //for address calculation


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
        lat: parseFloat(localStorage.localLatitude),
        lng: parseFloat(localStorage.localLongitude)
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

                add.Phone = "234567890";
                Velocity.tokenizeForm(transctionData, sessionToken, card, add, applicationProfileId, merchantProfileId, workflowId, velocityResponseHandlerform);
            } else {
                alert('No results found');
                Appyscript.hideIndicator();
            }
        } else {
            Appyscript.hideIndicator();
            alert('Geocoder failed due to: ' + status);
        }
    });

};


function velocityResponseHandlerform(result) {
if(result.text !== "Successful"){
    Appyscript.hideIndicator();
    Appyscript.alert(something_went_wrong_please_try_again,data.appData.appName);
    return false;
}
form_requestId = requestId;
var velocity_token="";
var form_id="";
var a = pageData.list.length;
var i;
velocity_tokenId = formBuilderData.velocityTokenId;
var trancationData='{"Amount":"'+formBuilderData.amount+'","CurrencyCode":"'+formBuilderData.currency+'","identitytoken":"'+velocity_tokenId+'","workflowid":"'+result.workflowid+
              '","merchantprofileid":"'+result.merchantprofileid+'","applicationprofileid":"'+result.applicationprofileid+
             '","paymentAccountDataToken":"'+result.row[0].PaymentAccountDataToken+'", "OrderId":"'+result.row[0].OrderId+'"}';
form_requestId = requestId;
//var postdata='{"method":"velocityPayWithToken","orderId": "'+CE_currentOrderId+'", "trancationData":'+trancationData+'}';
//var CE_baseurl = "http://angularml.pbodev.info/webservices/OrderHistory.php"
    if(isOnline())
     {
        Appyscript.showIndicator();
        $$.ajax({
                    url: webserviceUrl+"OrderHistory.php",
//                    data: postdata,
                    data: Appyscript.validateJSONData('{"method":"velocityPayWithToken","orderId": "'+form_requestId+'", "trancationData":'+trancationData+'}'),
                    type: 'post',
                    async: true,
                    //321 headers: {'accessToken': deviceEncryptedToken},
                    success: function(data) {

                     data = JSON.parse(data);
                     if(data.StatusCode == "00"){
                     updateVelocityTransactionform(data,form_requestId)
                     }
                },
                function(error)
                {
                  Appyscript.hideIndicator();
//                  updateCourtCartIcon();
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

function updateVelocityTransactionform(resultData,form_requestId){

    var PageTypeForm;
    if(formBuilderData.identifire == "app"){
        PageTypeForm = "Appointment";
    }else{
        PageTypeForm  = "formbuilder";
    }
form_requestId = requestId;
var localUserId = localStorage.getItem("userId");
//var pId = pageData.pageId;
var email_id;

if(localStorage.getItem("email") != null ||  localStorage.getItem("email") != undefined){
    email_id = localStorage.getItem("email");
}else{
    email_id = localStorage.getItem("userEmailApp");
}

var currency_Code = formBuilderData.currency;
console.log("ResultSTatus Final",+resultData);
    if(isOnline())
     {
        Appyscript.showIndicator();
        $$.ajax({
                    url: webserviceUrl+"OrderHistory.php",
//                    data: Appyscript.validateJSONData('{"method":"createOrderSubscription","appId":"' + appId + '","pageId":"' +  pId  + '","userId":"'+ localUserId +'","userEmail":"'+email+'","paymentMethod":"'+pageData.paymentMethod+'","price":"'+subscriptionPrice'","currency":"'+subscriptionCurrency+'","subscriptionType":"'+paymentTypeIap+'","deviceType":"android","pageType":"'+pageType+'","transactionId":"'+resultData.TransactionId+'","productId":"'+pid+'","summary":"","receiptId":"","buyerCountry":"","message":""}'),
                    data: Appyscript.validateJSONData('{"method":"createOrderSubscription","appId":"' + appId + '", "pageId":"' +pageIdentifie+ '", "userId":"' + localUserId + '", "userEmail":"'+email_id+'", "paymentMethod":"velocity", "price":"'+formBuilderData.amount+'", "currency":"'+currency_Code+'", "subscriptionType":"", "deviceType":"android", "pageType":"'+PageTypeForm+'", "transactionId":"'+resultData.TransactionId+'", "productId":"'+requestIdForPayment+'", "summary":"'+resultData.Status+'", "receiptId":"'+requestIdForPayment+'", "buyerCountry":"", "message":""}'),
                    type: 'post',
                    async: true,
                    //321 headers: {'accessToken': deviceEncryptedToken},
                    success: function(data) {
                     data = JSON.parse(data);
                     console.log("transactionUpdation", data);

                     if(AppyTemplate.global.pagefrom == "event"){
                         getVenuesByEvent(JSON.parse(localStorage.getItem("eventDummyData")));
                         return
                     }
                    $$.get("pages/formbuilder.html", function (template){
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(formBuilderData);
//                    mainView.router.reloadContent(html);
                        mainView.router.back({
                                        animatePages: false
                                    })
                        Appyscript.hideIndicator();

                      });
                      if($$("#txtDate").val() != undefined){
                          var today = new Date();
                          var advanceBookingDays = 90;
                          var weekLater = new Date().setDate(today.getDate() + parseInt(advanceBookingDays));
                          var _getDate = (new Date()).getDate();
                          var _advanceBookDate = new Date((new Date().setDate(_getDate + parseInt(advanceBookingDays)))).setHours(0, 0, 0, 0);

                          var _getDate = (new Date()).getDate();
                          var _advanceBookDate = new Date((new Date().setDate(_getDate + parseInt(advanceBookingDays)))).setHours(0, 0, 0, 0);
                          Appyscript.calendar({
                              input: '#txtDate',
                              value: [new Date()],
                              disabled: [{
                                      from: new Date(1950, 1, 1),
                                      to: new Date().setDate(_getDate - parseInt(1))
                                  },
                                  {
                                      from: _advanceBookDate,
                                      to: new Date(2200, 1, 1)
                                  }
                              ],
                              dateFormat: 'yyyy/mm/dd',
                          });
                      }
                      if (formBuilderData.identifire == "app" && formBuilderData.appIncludeTax != 1) {
                          console.log("formTaxAmount+++ " + formTaxAmount);
                          var currencySymbol = localStorage.getItem("currencySymbol");
                          currencySymbol = $$("<div>" + currencySymbol + "</div>").html().trim();
                          $$("#preDefineCustomerAmount").val(currencySymbol + "" + formBuilderData.preDefineCustomerAmountTotal);
                          $$(".TotalAmt span").html(currencySymbol + "" + formBuilderData.preDefineCustomerAmountTotal);
                          $$(".formTaxAmount").html(currencySymbol + "" + formBuilderData.formTaxAmount);
                      }

                      Appyscript.alert((formBuilderData.submissionSuccessMsg.replace("__REQUEST_ID__",requestIdForPayment)),window.data.appData.appName);
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

/****************
**** BOOKING SLOTS
*****************/

function change_SlotsDatewiseForm() {
    var inputBoxDate = $$("#txtDate").val();
    Appyscript.popupClose();

    formAsync_CalculationsTimeSlots("fromInputBox").then(function(slotsArray) {
        var pageDetails = {};
        formBuilderData.defaultDate = formGetCurrentDate_Data("isoFormat");
        formBuilderData.slotList = slotsArray;
        //console.log("vcfccc   " + JSON.stringify(formBuilderData))

        formAppend_CheckSlots(formBuilderData);

        /*if (slotsArray.length != 0) {
            $$("#txtTime").html("");
            $$("#slotNotAvail").html("");
            for (var i = 0; i < slotsArray.length; i++) {
                $$("#txtTime").append('<option value="' + slotsArray[i].timeSlot + ' - ' + slotsArray[i].timeSlotEnd + '">' + slotsArray[i].timeSlot + ' - ' + slotsArray[i].timeSlotEnd + '</option>');
                $$("#slotNotAvail").hide();
                $$("#timeSlot").show();
            }
        } else {
            $$("#slotNotAvail").html("");
            $$("#slotNotAvail").html('<p>'+"Time slots are not available"+ '</p>');
            $$("#slotNotAvail").show();
            $$("#timeSlot").hide();
        }*/
    });
};

//To check slots
var disbaleSlotArr = [];
function formAppend_CheckSlots(formBuilderData) {

    if (!isOnline()) {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        return false;
    }

    let inputBoxDate = $$("#txtDate").val();
    let reqData = '{"method":"getAppointmentTimeSlot","appId":"' + localStorage.getItem("appid") + '","pageId":"' + pageIdentifie + '","appoinDate":"' + inputBoxDate + '"}';
    let slotsArray = formBuilderData.slotList;
    Appyscript.showIndicator();
    $$.ajax({
        url: webserviceUrl+"OrderHistory.php",
        data: Appyscript.validateJSONData(reqData),
        type: "post",
        async: true,
      //321  headers: {'accessToken': deviceEncryptedToken},
        success: function(result) {
            Appyscript.hideIndicator();

            var json = JSON.parse(result);
            console.log("json  "+JSON.stringify(json));
            let arr_bookedSlot = json.timeSlot;

            if (slotsArray.length == 0 || slotsArray.length == arr_bookedSlot.length ) {
                $$("#slotNotAvail").html("");
                $$("#slotNotAvail").html('<p>'+formBuilderData.languageSetting.app_timeslot_not_available+ '</p>');
                $$("#slotNotAvail").show();
                $$("#timeSlot").hide();
            }else {
                let arr_bookedSlotArr = [];
                for(var i = 0; i < arr_bookedSlot.length; i++){
                    arr_bookedSlotArr.push(arr_bookedSlot[i].split(" -")[0]);
                }
                console.log("arr_bookedSlotArr  "+arr_bookedSlotArr);
                let current_Slot = "";
                let flag = 0;
                disbaleSlotArr = [];
                $$("#txtTime").html("");
                console.log("djhdhjhdjhdj    "+JSON.stringify(slotsArray))
                for (var i = 0; i < slotsArray.length; i++) {
                    current_Slot = slotsArray[i].timeSlot;
                    flag = arr_bookedSlotArr.indexOf(current_Slot) !== -1 ? "disabled" : "";

                    if(flag == "disabled"){
                        disbaleSlotArr.push(flag);
                        console.log("flag::::  "+flag +" disbaleSlotArr  "+disbaleSlotArr);
                    }

                    if (slotsArray.length == disbaleSlotArr.length ) {
                        $$("#slotNotAvail").html("");
                        $$("#slotNotAvail").html('<p>'+formBuilderData.languageSetting.app_timeslot_not_available+ '</p>');
                        $$("#slotNotAvail").show();
                        $$("#timeSlot").hide();
                    }else {
                        $$("#txtTime").append('<option value="' + slotsArray[i].timeSlot + ' - ' + slotsArray[i].timeSlotEnd + '" '+flag+'>' + slotsArray[i].timeSlot + ' - ' + slotsArray[i].timeSlotEnd + '</option>');
                        $$("#slotNotAvail").hide();
                        $$("#timeSlot").show();
                    }
                }
            }
        },
        error: function() {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            return false;
        }
    });

}

//Advance booking date slots Date Slots
var customDate;

function formGetCurrentDate_Data(type) {
    var currentDate = new Date();
    var arrDayWish = [];
    var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var todaysDate = new Date();
    customDate = new Date($$("#txtDate").val());
    //console.log("customDate  " + customDate);
    switch (type) {
        case 'dateIndex':
            var d = todaysDate.getDate();
            var m = todaysDate.getMonth() + 1;
            var y = todaysDate.getFullYear();
            return (d.toString().length == 1 ? "0" + d : d) + "/" + (m.toString().length == 1 ? "0" + m : m) + "/" + y;
            //27/04/2018
            break;
        case 'day':
            var getDayName = todaysDate.getDay();
            return days[getDayName]
            break;
        case 'currentDate':
            return todaysDate.toLocaleDateString('en-US');
            break;
        case 'isoFormat':
            return todaysDate.toISOString().substring(0, 10);
        default:
        case 'dateIndex_Custom':
            var d = customDate.getDate();
            var m = customDate.getMonth() + 1;
            var y = customDate.getFullYear();
            return (d.toString().length == 1 ? "0" + d : d) + "/" + (m.toString().length == 1 ? "0" + m : m) + "/" + y;
            //27/04/2018
            break;
        case 'day_Custom':
            var getDayName = customDate.getDay();
            return days[getDayName]
            break;
        case 'currentDate_Custom':
            return customDate.toLocaleDateString('en-US');
            break;
            break;
    }
};

function formAsync_CalculationsTimeSlots(isfrom) {
    var slotsArray = [];
    var availiability_ArrayCheck = [];
    return new Promise(function(resolve, reject) {

        // Basic Variables
        var _workingHoursEditable = formBuilderData.defaultScheduleData;
        var _getTodaysDay = formGetCurrentDate_Data("day_Custom");
        var _dayWiseArray = _workingHoursEditable[_getTodaysDay];
        var _slotDate = formGetCurrentDate_Data("currentDate_Custom");
        var _dateIndex = formGetCurrentDate_Data("dateIndex_Custom");
        console.log("_slotDate  " + _slotDate);

        // Configurations
        var _configHours= formBuilderData.appDefaultScheduleHrs || 0 ;
        var _configMinutes= formBuilderData.appDefaultScheduleMin ||0 ;
        var _configPreparation= isNaN(formBuilderData.appDefaultScheduleBktime) ? 0 :formBuilderData.appDefaultScheduleBktime ;

        console.log("_configHours "+_configHours);
        console.log("_configMinutes "+_configMinutes);
        console.log("_configPreparation "+_configPreparation);

        //Check weather the person is available for particular day
        availiability_ArrayCheck = _workingHoursEditable.availabilitySchedule;

        if (availiability_ArrayCheck.length > 0) {
            availiability_ArrayCheck = $.grep(availiability_ArrayCheck, function(v) {
                return v.id == _dateIndex
            });

            console.log("availiability_ArrayCheck.length   " + availiability_ArrayCheck.length)

            if (availiability_ArrayCheck.length > 0) {

                if (availiability_ArrayCheck[0].closeToday == 0) {
                    slotsArray = [];
                    resolve(slotsArray);
                    return;
                }

                _getTodaysDay = "avail";
                _dayWiseArray = availiability_ArrayCheck;
                _slotDate = (availiability_ArrayCheck[0].date).split("/");
                _slotDate = _slotDate[2] + "/" + _slotDate[1] + "/" + _slotDate[0];
            }
        }

        var demoArr = [];
        if (_getTodaysDay == "avail") {
            demoArr = availiability_ArrayCheck;
        } else {
            demoArr = _workingHoursEditable[_getTodaysDay];
        }

        console.log("_workingHoursEditab***  " + JSON.stringify(_workingHoursEditable[_getTodaysDay]));

        if(formBuilderData.appScheduleFormat == 0) {
            if(_configHours==0 && _configMinutes==0 && _configPreparation==0){
                 var _slotStartTime = "";
                 var _slotEndTime = "";
                 var _validateTime = "";
                for (var i = 0; i < demoArr.length; i++) {
                    _dayWiseArray = demoArr[i];
                    if (_workingHoursEditable[_getTodaysDay + "Open"] != "1" && _getTodaysDay != "avail") {
                        slotsArray = [];
                        resolve(slotsArray);
                        return;
                    } else {

                        _slotStartTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HStart"] + ":" + _dayWiseArray[_getTodaysDay + "MStart"] + " " + _dayWiseArray[_getTodaysDay + "AMStart"])).getTime();
                        _slotEndTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HEnd"] + ":" + _dayWiseArray[_getTodaysDay + "MEnd"] + " " + _dayWiseArray[_getTodaysDay + "AMEnd"])).getTime();

                        _validateTime = new Date(_slotEndTime).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        });
                        if ((new Date(_slotEndTime)).getTime() >= (new Date()).getTime()) {
                            slotsArray.push({
                                "timeSlot": new Date(_slotStartTime).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                }),
                                "timeSlotEnd": _validateTime,
                                "validateTime": _validateTime
                            });
                        }
                    }
                }
                console.log("*************Slot    " + JSON.stringify(slotsArray));
                resolve(slotsArray);
                return;
            }

            for (var i = 0; i < demoArr.length; i++) {
                _dayWiseArray = demoArr[i];

                //Check Wheather Booking is available on that particular day after checking availiability on specific days
                if (_workingHoursEditable[_getTodaysDay + "Open"] != "1" && _getTodaysDay != "avail") {
                    slotsArray = [];
                    resolve(slotsArray);
                    return;
                }

                var _slotStartTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HStart"] + ":" + _dayWiseArray[_getTodaysDay + "MStart"] + " " + _dayWiseArray[_getTodaysDay + "AMStart"])).getTime();
                var _slotEndTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HEnd"] + ":" + _dayWiseArray[_getTodaysDay + "MEnd"] + " " + _dayWiseArray[_getTodaysDay + "AMEnd"])).getTime();
                var _tempSlotStartTime = _slotStartTime;

                var currentHours;
                var currentMinutes;
                var currentDateTime = "";
                var startDate = "";
                var validateTime = "";
                while ((new Date(_tempSlotStartTime)).getTime() < (new Date(_slotEndTime)).getTime()) {
                    currentDateTime = new Date(_tempSlotStartTime);
                    startDate = new Date(_tempSlotStartTime);

                    currentHours = parseInt(currentDateTime.getHours());
                    currentMinutes = parseInt(currentDateTime.getMinutes());

                    _tempSlotStartTime = currentDateTime.setHours(currentHours + parseInt(_configHours));
                    _tempSlotStartTime = currentDateTime.setMinutes(currentMinutes + parseInt(_configMinutes));
                    validateTime = startDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    });

                    //first add the config minutes to calculate the end time and then added preparation time

                    if (((new Date(_tempSlotStartTime)).getTime() <= (new Date(_slotEndTime)).getTime()) && ((new Date(_tempSlotStartTime)).getTime() >= (new Date()).getTime())) {
                        slotsArray.push({
                            "timeSlot": validateTime,
                            "timeSlotEnd": currentDateTime.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            }),
                            "validateTime": validateTime
                        });
                    }
                    _tempSlotStartTime = currentDateTime.setMinutes(currentDateTime.getMinutes() + parseInt(_configPreparation));
                    //console.log("tempTime" + (new Date(_tempSlotStartTime)));
                    //console.log("validTime" + (new Date(_slotEndTime)))
                }
            }
             //console.log("*************slotsArray    " + JSON.stringify(slotsArray));
            resolve(slotsArray);
            Appyscript.closeModal();
        }else{
            if (_configHours == 0 && _configMinutes == 0 && _configPreparation == 0) {
                var _slotStartTime = "";
                var _slotEndTime = "";
                var _validateTime = "";
                for (var i = 0; i < demoArr.length; i++) {
                    _dayWiseArray = demoArr[i];
                    if (_workingHoursEditable[_getTodaysDay + "Open"] != "1" && _getTodaysDay != "avail") {
                        slotsArray = [];
                        resolve(slotsArray);
                        return;
                    } else {

                        _slotStartTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HStart"] + ":" + _dayWiseArray[_getTodaysDay + "MStart"])).getTime();
                        _slotEndTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HEnd"] + ":" + _dayWiseArray[_getTodaysDay + "MEnd"])).getTime();

                        _validateTime = new Date(_slotEndTime).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false
                        });
                        if ((new Date(_slotEndTime)).getTime() >= (new Date()).getTime()) {
                            slotsArray.push({
                                "timeSlot": new Date(_slotStartTime).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false
                                }),
                                "timeSlotEnd": _validateTime,
                                "validateTime": _validateTime
                            });
                        }
                    }
                }
                console.log("*************Slot    " + JSON.stringify(slotsArray));
                resolve(slotsArray);
                return;
            }

            for (var i = 0; i < demoArr.length; i++) {
                _dayWiseArray = demoArr[i];

                //Check Wheather Booking is available on that particular day after checking availiability on specific days
                if (_workingHoursEditable[_getTodaysDay + "Open"] != "1" && _getTodaysDay != "avail") {
                    slotsArray = [];
                    resolve(slotsArray);
                    return;
                }

                var _slotStartTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HStart"] + ":" + _dayWiseArray[_getTodaysDay + "MStart"])).getTime();
                var _slotEndTime = (new Date(_slotDate + " " + _dayWiseArray[_getTodaysDay + "HEnd"] + ":" + _dayWiseArray[_getTodaysDay + "MEnd"])).getTime();
                var _tempSlotStartTime = _slotStartTime;

                var currentHours;
                var currentMinutes;
                var currentDateTime = "";
                var startDate = "";
                var validateTime = "";
                while ((new Date(_tempSlotStartTime)).getTime() < (new Date(_slotEndTime)).getTime()) {
                    currentDateTime = new Date(_tempSlotStartTime);
                    startDate = new Date(_tempSlotStartTime);

                    currentHours = parseInt(currentDateTime.getHours());
                    currentMinutes = parseInt(currentDateTime.getMinutes());

                    _tempSlotStartTime = currentDateTime.setHours(currentHours + parseInt(_configHours));
                    _tempSlotStartTime = currentDateTime.setMinutes(currentMinutes + parseInt(_configMinutes));
                    validateTime = startDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    });

                    //first add the config minutes to calculate the end time and then added preparation time

                    if (((new Date(_tempSlotStartTime)).getTime() <= (new Date(_slotEndTime)).getTime()) && ((new Date(_tempSlotStartTime)).getTime() >= (new Date()).getTime())) {
                        slotsArray.push({
                            "timeSlot": validateTime,
                            "timeSlotEnd": currentDateTime.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false
                            }),
                            "validateTime": validateTime
                        });
                    }
                    _tempSlotStartTime = currentDateTime.setMinutes(currentDateTime.getMinutes() + parseInt(_configPreparation));
                    //console.log("tempTime" + (new Date(_tempSlotStartTime)));
                    //console.log("validTime" + (new Date(_slotEndTime)))
                }
            }
            console.log("*************slotsArray    " + JSON.stringify(slotsArray));
            resolve(slotsArray);
        }

    });
};


AppyTemplate.registerHelper('formTimingValues', function(type) {
    var timeValue = type;
    if (type == "Close") {
        timeValue = formBuilderData.languageSetting.app_closed;
    } else {
        timeValue = timeValue.replace(/AM/g, "AM").replace(/PM/g, "PM");
    }
    return "" + timeValue;
})
AppyTemplate.registerHelper('formTimingValues123', function(type) {
    var timeValue = type;
    if (type == "Close") {
        timeValue = "closed";
    } else {
        timeValue = '';
    }
    return timeValue;
})

AppyTemplate.registerHelper('formdaysKey', function(type) {
//    alert(type)
    if(data.appData.lang == "sa")
    {
        return "" +type;
    }
    else
    {
    var iconArray = {
        Sunday: formBuilderData.languageSetting.app_sunday,
        Monday: formBuilderData.languageSetting.app_monday,
        Tuesday: formBuilderData.languageSetting.app_tuesday,
        Wednesday: formBuilderData.languageSetting.app_wednesday,
        Thursday: formBuilderData.languageSetting.app_thursday,
        Friday: formBuilderData.languageSetting.app_friday,
        Saturday: formBuilderData.languageSetting.app_saturday,
    }
    return "" + iconArray[type];
    }
})


AppyTemplate.registerHelper('checkDoubleQuote', function(a) {
        var digitCheck = a.replace(/\"/g, "");
        return digitCheck;
});