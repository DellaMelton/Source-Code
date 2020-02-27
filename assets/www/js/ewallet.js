//TODO: Utility
var ewalletUtility = {
    months:data.monthLang,
    fromDate:0,
    toDate:0,
    days:[(data.languageSetting.Sunday == undefined ? "Sunday" :data.languageSetting.Sunday),(data.languageSetting.Monday == undefined ? "Monday" :data.languageSetting.Monday),(data.languageSetting.Tuesday == undefined ? "Tuesday" :data.languageSetting.Tuesday),(data.languageSetting.Wednesday == undefined ? "Wednesday" :data.languageSetting.Wednesday),(data.languageSetting.Thursday == undefined ? "Thursday" :data.languageSetting.Thursday),(data.languageSetting.Friday == undefined ? "Friday" :data.languageSetting.Friday),(data.languageSetting.Saturday == undefined ? "Saturday" :data.languageSetting.Saturday)],

    getDayStr:function(daycount) {
        return ewalletUtility.days[daycount];

    },

    setfromDate:function(timeStamp) {
        if(timeStamp != undefined && timeStamp != ""){ewalletUtility.fromDate = timeStamp;  }

    },

    getfromDate:function() {
        return ewalletUtility.fromDate;

    },

    settoDate:function(timeStamp) {
        if(timeStamp != undefined && timeStamp != ""){ewalletUtility.toDate = timeStamp;  }

    },

    gettoDate:function() {
        return ewalletUtility.toDate;

    },

    checkElementExist:function(id, pagename){
        var element = document.getElementById(id + pagename)
        if(element == null || element == undefined) {return false; }

        return true;

    },

    getDaytimeStamp:function(fullTimeStamp) {
        var tmp = new Date(fullTimeStamp * 1000);
        var d = tmp.getDate();
        var m = tmp.getMonth();
        var y = tmp.getFullYear();

        var nd = new Date(y, m, d, 0, 0, 0, 0);
        return (nd.getTime() / 1000);

    },

    getDateWithFormat:function(format, addedon) {
        var tmpDate = new Date(addedon * 1000);
        if(format == "dd MMM yyyy") {
            var d = tmpDate.getDate();
            var m = ewalletUtility.months[tmpDate.getMonth()];
            var y = tmpDate.getFullYear();

            return "" + d + " " + m + " " + y ;

        }else if(format == "yyyy-mm-dd") {
            var d = tmpDate.getDate();
            var m = tmpDate.getMonth() + 1;
            var y = tmpDate.getFullYear();

            return "" + y + "-" + m + "-" + d ;

        }

    },

    timeInAMPM:function(addedon) {
        return (new Date(addedon * 1000)).toLocaleTimeString('en-es',{ hour: 'numeric', minute: 'numeric', hour12: true })
    },

    clearTransactiondata:function() {
       ewalletModel.setuserTransdata(undefined);

    },

    getamountwithcurrency:function(amount) {
        var amountStr = currencyFomatter(parseFloat(amount));
        amountStr = (amountStr != undefined && amountStr != "undefined" && amountStr != null && (amountStr + "").length > 0) ? amountStr : amount;

        return ewalletModel.getcurrencySymbol() + amountStr;

    },

    saveuserData:function(userdata) {
        if(Appyscript.checkLogin_ewallet()) {
            localStorage.setItem("prefilledCardDetails",JSON.stringify(userdata));
        }

    },

    getuserData:function(userdata) {
        if(Appyscript.checkLogin_ewallet()) {
            var card_details = localStorage.getItem("prefilledCardDetails")
            if(card_details != undefined && card_details != "undefined" && card_details != null && card_details != "null") {
                return JSON.parse(card_details);

            }

            return card_details;

        }

        return undefined;
    }

};

//TODO: E-WALLET VALIDATOR
var ewalletError = {
      handler:1,
      amount:2

};

var requestType = {
   transactionHistory:1,
   addMoney:2

}

var cardformError = {
    name:"ewalletStripe-name",
    email:"ewalletStripe-email",
    phone:"ewalletStripe-phone",
    address:"ewalletStripe-address",
    city:"ewalletStripe-city",
    state:"ewalletStripe-state",
    zip:"ewalletStripe-zip"

};

/*var cardformError = {
    nameEwallet:"ewalletAuth-name",
    emailEwallet:"ewalletAuth-email",
    phoneEwallet:"ewalletAuth-phone",
    addressEwallet:"ewalletAuth-address",
    cityEwallet:"ewalletAuth-city",
    stateEwallet:"ewalletAuth-state",
    zipEwallet:"ewalletAuth-zip"

};*/

var ewalletValidator = {
    validateToAddModey:function(){
     /*   if(stripe == undefined || stripe == "undefined") {
            return {status:false, type:ewalletError.handler, msg:something_went_wrong_please_try_again};

        }*/

        var amount = ($("#addamountId").val() == "") ? "0" : $("#addamountId").val();
        if(parseInt(amount) <= 0) {
            return {status:false, type:ewalletError.amount, msg:(pageData.languageSetting.error_validAmount != undefined && pageData.languageSetting.error_validAmount != null && pageData.languageSetting.error_validAmount.length > 0) ?pageData.languageSetting.error_validAmount :"Please enter valid amount" };

        }

        return {status:true, type:undefined, msg:""};

    },

    validateAddedon:function(addedon) {
        if(addedon == "" || addedon == undefined || addedon == "undefined" ) {return false; }

        return true;
    },

   validateFilter:function() {
       var frmdate = $("#fromdateId").val()
       var todate = $("#todateId").val()
       var transactiontype = $("#transactiontypeId").val()

       if(transactiontype == ""){return {status:false, msg:(pageData.languageSetting.error_transactionType != undefined && pageData.languageSetting.error_transactionType != null && pageData.languageSetting.error_transactionType.length > 0)? pageData.languageSetting.error_transactionType :"Please select transaction type"};}
       if(!ewalletValidator.validatefilterDates(frmdate, todate)) {return {status:false, msg:(pageData.languageSetting.error_date != undefined && pageData.languageSetting.error_date != null && pageData.languageSetting.error_date.length > 0)? pageData.languageSetting.error_date:"From date should be less or equal to to date"}; }

       return {status:true};
   },

validatefilterDates:function(frmdate, todate) {

    if(frmdate == "" || todate == "") {return false; }

    var f_tmpdate = new Date(frmdate)
    var t_tmpdate = new Date(todate)

    if(f_tmpdate > t_tmpdate){return false; }

    return true;

},

validate_request:function(type) {
    var appId = ewalletModel.getewalletAppId()
    var localUserId = ewalletModel.getewalletpayId()

    if(type == requestType.transactionHistory) {
        if((appId != undefined && appId != "undefined") && (localUserId != undefined && localUserId != "undefined")) {return true; }
        return false;

    }

    if(type == requestType.addMoney) {
        var token = ewalletModel.getuserTransdata().preparedToken;
        if((appId != undefined && appId != "undefined") && (localUserId != undefined && localUserId != "undefined") && (token != undefined && token != null)) {return true; }
        return false;

    }

},

validate_addMoneydata:function() {
    var userData = ewalletModel.getuserTransdata()
    if(userData == undefined && userData.transid == undefined){return false; }

    if(userData.email == undefined && userData.phone == undefined && userData.billing_address_line1 == undefined && serData.billing_address_city == undefined && userData.billing_address_country == undefined && userData.billing_address_zip == undefined && userData.currency == undefined) {return false; }

    return true;

},

validate_cardform:function(id, txt) {
    var tmpStr = $.trim(txt);
    if(tmpStr == "") {
       ewalletValidator.showError(id);
    }

},

showError:function(id) {
    switch(id) {

        case cardformError.name:
            Appyscript.alert("Please enter your name");
            break;

        case cardformError.email:
            Appyscript.alert((pageData.languageSetting !=undefined && pageData.languageSetting.please_enter_email_social_network != undefined) ? pageData.languageSetting.please_enter_email_social_network : "Please enter your email" );
            break;

        case cardformError.phone:
            Appyscript.alert((pageData.languageSetting !=undefined && pageData.languageSetting.error_enterphone != undefined) ? pageData.languageSetting.error_enterphone : "Please enter your phone");
            break;

        case cardformError.address:
            Appyscript.alert((pageData.languageSetting !=undefined && pageData.languageSetting.error_address != undefined) ? pageData.languageSetting.error_address :"Please enter your address");
            break;

        case cardformError.city:
            Appyscript.alert((pageData.languageSetting !=undefined && pageData.languageSetting.error_city != undefined) ? pageData.languageSetting.please_enter_city_mcom :"Please enter your city");
            break;

        case cardformError.state:
            Appyscript.alert((pageData.languageSetting !=undefined && pageData.languageSetting.error_enterstate != undefined) ? pageData.languageSetting.error_enterstate : "Please enter your state");
            break;

        case cardformError.zip:
            Appyscript.alert((pageData.languageSetting !=undefined && pageData.languageSetting.error_zip != undefined) ? pageData.languageSetting.error_zip :"Please enter your zip/postal code");
            break;

    }

},

validatePageData:function() {
    if(pageData != undefined && pageData.pageId == "ewallet") {return true; }

    return false;
},

phoneExist:function() {
    if(localStorage.getItem("phone") != undefined && localStorage.getItem("phone") != "undefined" && localStorage.getItem("phone") !=  null && localStorage.getItem("phone") != "null" && localStorage.getItem("phone").length > 0) {
        return true;

    }

    return false;
},

emailExist:function() {
    if(localStorage.getItem("emailid") != undefined && localStorage.getItem("emailid") != "undefined" && localStorage.getItem("emailid") !=  null && localStorage.getItem("emailid") != "null" && localStorage.getItem("emailid").length > 0) {
        return true;

    }

    return false;
},

validateAuthPassword:function() {
    if(pageData != undefined && pageData.setting != undefined && pageData.setting.auth_using_password != undefined && pageData.setting.auth_using_password != "undefined" && (pageData.setting.auth_using_password === 1 || pageData.setting.auth_using_password === "1")){return true; }

    return false;
},

};


//TODO: ADD MONEY
Appyscript.onPageInit('ewallet-addmoney',function(page){
//      if(pageData.setting != undefined && pageData.setting.stripe_client_id != "undefined" && pageData.setting.stripe_client_id.length > 0 ) {
//         initalizeStripewith(pageData.setting.stripe_client_id)
//      }

     if(pageData.userData != undefined && pageData.userData.balanceAmount != undefined) {
          setTimeout(function(){
            $$("#addmoney_amountId").html(ewalletUtility.getamountwithcurrency(pageData.userData.balanceAmount));
          },2000);
     }
});

Appyscript.onPageBeforeAnimation('ewallet-addmoney', function(page){
 if(pageData.userData != undefined && pageData.userData.balanceAmount != undefined) {
      request_forupdatetransactions();
 }

});


function setMoneyOnClick(clickedObject, amountVal) {
    $("#addamountId").val(parseInt(amountVal))

}

function addmoneytowalletEvent() {
    var new_date=new Date().getTime();
    var orderId='app_'+new_date;
    if(!ewalletValidator.validatePageData()){
        Appyscript.clickHome()
        return;
    }

    if(shouldPaymentPage()){
        //getPaymentMethods_ewallet();
        ewalletGlobalUserData.amount = parseFloat($("#addamountId").val()).toFixed(2);
        CommonPaymentgatwayFunction(orderId,pageId,ewalletGlobalUserData,pageIdentifie);
    }


}

function shouldPaymentPage() {
    var validateObj = ewalletValidator.validateToAddModey()
    if(validateObj.status) {return true; }

    Appyscript.alert(validateObj.msg);

    return false;

}

function clearAmount() {
    $$("#addamountId").val("")

};

var hashTransactionId = "";
function requesttoAddMoney() {

    if(isOnline() && ewalletValidator.validate_request(requestType.transactionHistory)) {
        console.log("console.log(get_addmoneyParams()"+get_addmoneyParams())

        $$.ajax({
                url: EWallet_BaseUrl,
                data:get_addmoneyParams(),
                type: 'post',
                async: true,
                //321 headers: {'accessToken': deviceEncryptedToken},
                success: function(data) {
                  Appyscript.hidePreloader();
                  var resData = JSON.parse(data);
                  resData.pageTitle = pageData.pageTitle;
                  resData.page = "walletStatus";
                  console.log("requesttoAddMoney status"+ data);
                  console.log("requesttoAddMoney stripe status" + JSON.stringify(resData));

                  /*if(resData.userTransactionHistory.paymentTransactionData!=undefined){
                      if(resData.userTransactionHistory.paymentTransactionData.boleto_url != undefined){
                             hashTransactionId = resData.userTransactionHistory.paymentTransactionData.boleto_url;
                        }else{
                             hashTransactionId = "";
                        }
                  }else{
                     hashTransactionId = "";
                  }
                  console.log("hashTransactionId  "+hashTransactionId);*/
                  if(resData.status == "success") {
                       updatebalancefor_views(resData.userTransactionHistory.balanceAmount, ewalletModel.getcurrencySymbol());
                  }else {
                       resData.userTransactionHistory.error_msg = resData.msg;
                  }
                  ewalletUtility.clearTransactiondata()
                  clearAmount()
                  Appyscript.navigateToPaymentStatus(resData);
                  console.log(resData)

                },error: function(){
                  Appyscript.hidePreloader();
                  requesttoAddMoney()
                }
        })
    }else {
        Appyscript.hidePreloader();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

function updatebalancefor_views(balance, currency) {
    pageData.userData.balanceAmount = balance;

}

function get_addmoneyParams() {
//    if(globalPaymentMethodKey == "bolato"){
//        return Appyscript.validateJSONData('{"method":"addToEwallet","appId":"' + ewalletModel.getewalletAppId() + '","appUserId":"' + ewalletModel.getewalletpayId() + '","tokenId":"' + bolatoHashCode + '","name":"' + localStorage.getItem("username") + '","email":"' + localStorage.getItem("email") + '","phone":"' + localStorage.getItem("phone") + '","address":"'+bolatoAddress+'","city":"'+bolatoCity+'","state":"'+bolatoState+'","country":"'+localStorage.getItem("countryNameVal")+'","zip":"'+bolatoZip+'","currency":"' + pageData.setting.currency_code + '","amount":"' + amountStrBoleto + '","paymentMethod":"bolato","addedon":"' + Math.ceil(new Date().getTime() / 1000) + '","deviceType":"android"}');
//    }else{
//        var userData = ewalletModel.getuserTransdata()
//        return Appyscript.validateJSONData('{"method":"addToEwallet","appId":"'+ewalletModel.getewalletAppId()+'","appUserId":"'+ ewalletModel.getewalletpayId()+'","tokenId":"'+userData.preparedToken+'","name":"'+userData.billing_name+'","email":"'+userData.email+'","phone":"'+userData.phone+'","address":"'+userData.billing_address_line1+'","city":"'+userData.billing_address_city+'","state":"'+userData.state+'","country":"'+userData.billing_address_country+'","zip":"'+userData.billing_address_zip+'","currency":"'+userData.currency+'","amount":"'+userData.amt+'","paymentMethod":"Stripe","addedon":"'+ Math.ceil(new Date().getTime()/1000) +'","deviceType":"android"}');
//    }
       return Appyscript.validateJSONData('{"method":"addToEwallet","appId":"' + ewalletModel.getewalletAppId() + '","appUserId":"' + ewalletModel.getewalletpayId() + '","tokenId":"' + bolatoHashCode + '","name":"' + localStorage.getItem("username") + '","email":"' + localStorage.getItem("email") + '","phone":"' + localStorage.getItem("phone") + '","address":"","city":"","state":"","country":"","zip":"","currency":"' + pageData.setting.currency_code + '","amount":"' + amountStrBoleto + '","paymentMethod":"online","addedon":"' + Math.ceil(new Date().getTime() / 1000) + '","deviceType":"android"}');
}
var amountStrBoleto;
/*function set_transactionToken(id, data) {

    if(globalPaymentMethodKey != "bolato"){
        var userTransdata = ewalletModel.getuserTransdata();
        if(userTransdata != undefined) {
            userTransdata.preparedToken = id;
            userTransdata.amt = data;

            if(ewalletValidator.validate_addMoneydata()) {
                requesttoAddMoney()
            }else {
                 Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                 Appyscript.hidePreloader();
            }
        }else {
               Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
               Appyscript.hidePreloader();
        }
    }else{
        bolatoHashCode = id;
        amountStrBoleto = data;
        requesttoAddMoney();
    //}
};*/

/*function prepareTokenBolato(status) {
    if(status == "Success"){
        if (bolatoHashCode == undefined) {
            return;
        }

        if (Appyscript.device.android) {
            AppyPieNative.encodePreparedToken(bolatoHashCode, parseFloat($$("#addamountId").val()).toFixed(2));
        } else {
            window.location = "preparetoken:" + "&&" + bolatoHashCode + "&&" + parseFloat($$("#addamountId").val()).toFixed(2);
        }
    }
};*/

function prepareToken() {
    /*var userTransdata = ewalletModel.getuserTransdata();
    if (userTransdata == undefined) {
        return;
    }
    if (userTransdata.preparedToken != undefined) {
        return;
    }*/

    if (Appyscript.device.android) {
        AppyPieNative.encodePreparedToken(userTransdata.transid, parseFloat($$("#addamountId").val()).toFixed(2));
    } else {
        window.location = "preparetoken:" + "&&" + userTransdata.transid + "&&" + parseFloat($$("#addamountId").val()).toFixed(2);
    }
//    setTimeout(function() {
//        prepareToken();
//    }, 3000);

};

function openChallanForm(){
    Appyscript.openWebView(hashTransactionId,"Payment");
}

var currencyFomatterSymbolEwallet;
//TODO: E-WALLET PROFILE
Appyscript.onPageInit('ewallet-profile',function(page){

    currencyFomatterSymbolEwallet = pageData.userData.currency;

    AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolEwallet];
    localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
    AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

    AppyTemplate.global.curSymCode = currencyFomatterSymbolEwallet;
    localStorage.setItem("curSymCode", currencyFomatterSymbolEwallet);
    AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");
    showtransactionson_profile()
     if(pageData.userData != undefined && pageData.userData.balanceAmount != undefined) {
         setTimeout(function(){
            $$("#profile_amountId").html(ewalletUtility.getamountwithcurrency(pageData.userData.balanceAmount))
         },2000);
     }
});

Appyscript.onPageBeforeAnimation('ewallet-profile', function(page){
    currencyFomatterSymbolEwallet = pageData.userData.currency;

    AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolEwallet];
    localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
    AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

    AppyTemplate.global.curSymCode = currencyFomatterSymbolEwallet;
    localStorage.setItem("curSymCode", currencyFomatterSymbolEwallet);
    AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");
     if(pageData.userData != undefined && pageData.userData.balanceAmount != undefined) {
         request_forupdatetransactions();
     }
});

function showtransactionson_profile() {
    clearOldtransactions_history()
    if(pageData.transactions == undefined){return; }

    if(pageData.transactions.length > 3) {
         pageData.transactions.splice(3,1)
    }

    if(pageData.transactions.length >= 3) {
        $("#viewall_transactionId").attr('style','float: right;')
    }

    transactionhistoryModel.prepareTransactionhistory(pageData.transactions, "ew_transactionsid_profile", "profile");
}

function clearOldtransactions_history() {
    if($("#ew_transactionsid_profile").length > 0) {
        $("#ew_transactionsid_profile").empty();
    }
};
var ewalletGlobalUserData;
function request_forupdatetransactions() {
    Appyscript.showIndicator();

    var appId = ewalletModel.getewalletAppId()
    var localUserId = ewalletModel.getewalletpayId()

    if(isOnline() && (localUserId != undefined && localUserId != "undefined") && (localUserId != null && localUserId != "null")) {
        $$.ajax({
                url: EWallet_BaseUrl,
                data: Appyscript.validateJSONData('{"method":"getTransactionHistory","appId":"'+appId+'", "appUserId":"'+localUserId+'", "fromDate":"" ,"toDate":"" ,"paymentStatus":"" ,"offset":"0", "count":"4","deviceType":"android"}'),
                type: 'post',
                async: true,
                //321 headers: {'accessToken': deviceEncryptedToken},
                success: function(data) {
                    Appyscript.hideIndicator();
                    var resData = JSON.parse(data);

                    if(resData.status != "failure") {
                        if(resData.userData != undefined && resData.userData.balanceAmount != undefined) {
                            ewalletModel.setbalanceAmount(parseFloat((resData.userData.balanceAmount == ""? "0":resData.userData.balanceAmount)).toFixed(2))

                            ewalletModel.setcurrencySymbolName(resData.userData.currency)
                            ewalletModel.setcurrencySymbol(Appyscript.getcurrencySymbol(resData.userData.currency))

                        }
                        var transactionsHistory = sortanArraybasedOnTime(resData.userTransactionHistory);
                        pageData.userData = resData.userData;
                        ewalletGlobalUserData = resData.userData;
                        pageData.transactions = transactionsHistory;
                        showtransactionson_profile()

                    }else {
                        Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);

                    }

                },error: function(){
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);

                }

                })

    }else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);

    }
}


function addMoneypageEvent() {
    if(!ewalletValidator.validatePageData()){
        Appyscript.clickHome();
        return;
    }

    $$.get("pages/ewallet-addmoney.html", function (template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(pageData);
           mainView.router.load({
                                content: html,
                                animatePages: true
                                });
           });

}

function eventonViewall() {
    if(!ewalletValidator.validatePageData()){
        Appyscript.clickHome();
        return;
    }

    setDates(false)
    transactionhistoryModel.setoffset(0)
    requestforTransactionhistory(false, false)

}

//TODO: E-WALLET TRANSACTION HISTORY MODEL & VIEW
var transactionhistoryView = {
    addnewSection:function(transaction, timeStamp, divId, pagename) {
        var section = transactionhistoryView.createnewSection(transaction,timeStamp, pagename);
        $("#" + divId + "").append(section);
    },

    createnewSection:function(transaction, timeStamp, pagename) {
        var dateStr = ewalletUtility.getDateWithFormat("dd MMM yyyy", transaction.addedon);
        var time = ewalletUtility.timeInAMPM(transaction.addedon);
        var transactiontype = "-"
        var currency_symbol = (transaction.currency != undefined) ? (Appyscript.getcurrencySymbol(transaction.currency) != undefined ?Appyscript.getcurrencySymbol(transaction.currency) :transaction.currencySymbole): ewalletModel.getcurrencySymbol();

        currencyFomatterSymbolEwallet = transaction.currency;

        AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolEwallet];
        localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
        AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

        AppyTemplate.global.curSymCode = currencyFomatterSymbolEwallet;
        localStorage.setItem("curSymCode", currencyFomatterSymbolEwallet);
        AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

        var amountStr = currencyFomatter(parseFloat(transaction.amount));
        amountStr = (amountStr != undefined && amountStr != "undefined" && amountStr != null && (amountStr + "").length > 0) ? amountStr : transaction.amount;
        amountStr = currency_symbol + amountStr;

        var transId = transaction._id;
        var transaction_msg = "";

        if(transaction.type == "Credited"){
            transactiontype = "+";
            transaction_msg = (pageData.languageSetting.msg_credited != undefined && pageData.languageSetting.msg_credited != null && pageData.languageSetting.msg_credited.length > 0) ?pageData.languageSetting.msg_credited :transaction.message;
        }else {
            transaction_msg = (pageData.languageSetting.msg_debited != undefined && pageData.languageSetting.msg_debited != null && pageData.languageSetting.msg_debited.length > 0) ?pageData.languageSetting.msg_debited :transaction.message;
            var tmp = (transaction.message != undefined && transaction.message.length > 0) ? (transaction.message).split(" ") : "";
            (tmp.length > 0) ? (transaction_msg + " " + tmp.pop()) :(transaction_msg = transaction.message)
        }
        var template = "<ul id =" + timeStamp + pagename + "> <li onClick = showInvoice('"+transId+"')> <span class='date'>"+dateStr+"</span> <div class='transaction-detail'> <div class='moneyIcon'><span class='pos-rel'>"+currency_symbol+"</span> <span class='badge'>"+transactiontype+"</span> </div> <div class='moneyDetail'> <div class='transactionsummary'> <h4>"+transaction_msg+"</h4> <span>"+time+"</span> </div> <div class='moneysummary'> "+ transactiontype +" "+amountStr+" </div> </div> </div> </li> </ul>";
        return template;
    },

    addliToSection:function(transaction, timeStamp, pagename) {
       var li = transactionhistoryView.createnewlifor(transaction);
         $("#" + timeStamp + pagename + "").append(li);
    },

    createnewlifor:function(transaction) {
        var time = ewalletUtility.timeInAMPM(transaction.addedon);
        var transactiontype = "-"
        var currency_symbol = (transaction.currency != undefined) ? (Appyscript.getcurrencySymbol(transaction.currency) != undefined ?Appyscript.getcurrencySymbol(transaction.currency) :transaction.currencySymbole): ewalletModel.getcurrencySymbol();

        currencyFomatterSymbolEwallet = transaction.currency;

        AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolEwallet];
        localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
        AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

        AppyTemplate.global.curSymCode = currencyFomatterSymbolEwallet;
        localStorage.setItem("curSymCode", currencyFomatterSymbolEwallet);
        AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

        var amountStr = currencyFomatter(parseFloat(transaction.amount));
        amountStr = (amountStr != undefined && amountStr != "undefined" && amountStr != null && (amountStr + "").length > 0) ? amountStr : transaction.amount;
        amountStr = currency_symbol + amountStr;

        var transId = transaction._id;
        var transaction_msg = "";

        if(transaction.type == "Credited"){
           transactiontype = "+";
           transaction_msg = (pageData.languageSetting.msg_credited != undefined && pageData.languageSetting.msg_credited != null && pageData.languageSetting.msg_credited.length > 0) ?pageData.languageSetting.msg_credited :transaction.message;
        }else {
            transaction_msg = (pageData.languageSetting.msg_debited != undefined && pageData.languageSetting.msg_debited != null && pageData.languageSetting.msg_debited.length > 0) ?pageData.languageSetting.msg_debited :transaction.message;
            var tmp = (transaction.message != undefined && transaction.message.length > 0) ? (transaction.message).split(" ") : "";
            (tmp.length > 0) ? (transaction_msg + " " + tmp.pop()) :(transaction_msg = transaction.message)
        }
        var template = "<li onClick = showInvoice('"+transId+"')><div class='transaction-detail'> <div class='moneyIcon'> <span class='pos-rel'>"+currency_symbol+"</span><span class='badge'>"+transactiontype+"</span> </div> <div class='moneyDetail'> <div class='transactionsummary'> <h4>"+transaction_msg+"</h4> <span>"+time+"</span> </div> <div class='moneysummary'> "+ transactiontype +" "+amountStr+" </div> </div> </div> </li>";
        return template;
    }

};

var transactionhistoryModel =  {
    tmpHistory:[],
    offset:0,

    setoffset:function(offset) {
        transactionhistoryModel.offset = offset;
    },

    getoffset:function() {
        return transactionhistoryModel.offset;
    },

    prepareTransactionhistory:function(transactions, divId, pagename) {
        for(var i = 0; i < transactions.length; i++) {
            var transaction = transactions[i];
            if(!ewalletValidator.validateAddedon(transaction.addedon)) {continue; }

            var timeStamp = ewalletUtility.getDaytimeStamp(transaction.addedon);
            if(!ewalletUtility.checkElementExist(timeStamp, pagename)){
                transactionhistoryView.addnewSection(transaction, timeStamp, divId, pagename);
            }else {
                transactionhistoryView.addliToSection(transaction, timeStamp, pagename);
            }

        }

    },

    settmpHistory:function(transactions) {
        transactionhistoryModel.tmpHistory = transactions;
    },

    gettmpHistory:function() {
      return transactionhistoryModel.tmpHistory;
    }

};

//TODO: E-WALLET TRANSACTION HISTORY & FILTER
Appyscript.onPageInit('ewallet-transactionhistory',function(page){
     transactionhistoryModel.setoffset(0)
     transactionhistoryModel.prepareTransactionhistory(transactionhistoryModel.gettmpHistory(), "ew_transactionsid_history", "history")

      var a = new Date();

      $("#todateId").val(a.getFullYear() + "-" + ((a.getMonth() + 1).toString().length == 1 ?("0" + (a.getMonth() + 1)): a.getMonth() + 1) + "-" + ((a.getDate()).toString().length == 1 ?("0" + a.getDate()):a.getDate()));
      a.setDate(a.getDate() - 1);
      $("#fromdateId").val(a.getFullYear() + "-" + ((a.getMonth() + 1).toString().length == 1 ?("0" + (a.getMonth() + 1)):a.getMonth() + 1) + "-" + ((a.getDate()).toString().length == 1 ?("0" + a.getDate()):a.getDate()))
});

function requestforTransactionhistory(isfilterApply, isScroll) {
    Appyscript.showIndicator();

    if(isOnline() && ewalletValidator.validate_request(requestType.transactionHistory)) {
        $$.ajax({
                url: EWallet_BaseUrl,
                data:getParams(isfilterApply),
                type: 'post',
                async: true,
                //321 headers: {'accessToken': deviceEncryptedToken},
                success: function(data) {
                    Appyscript.hideIndicator();
                    var resData = JSON.parse(data);
                    resData.pageTitle = pageData.pageTitle;
                    resData.languageSetting = pageData.languageSetting;
                    var transactionsHistory = sortanArraybasedOnTime(resData.userTransactionHistory);
                    transactionhistoryModel.settmpHistory(transactionsHistory);
                    if(!isScroll){
                      transactionhistory_error(transactionsHistory.length);
                    }

                    if(isfilterApply && !isScroll) {
                      showfilteredTransactions()
                      return;
                    }

                    if(isScroll) {
                        prepageViewforScroll(true)
                         return;
                    }

                    navigatetoTransactionhistoryPage(resData);

                },error: function(){
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                }

        })
    }else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function transactionhistory_error(length) {
    if(length > 0){
        $("#transhistory_errorid").attr('style','display:none;')
        return;
    }
    $("#transhistory_errorid").attr('style','display:block;margin-top:50%')
}

function showfilteredTransactions() {
    showTransactionFilter();
    showDates();
    $("#ew_transactionsid_history").empty();
    transactionhistoryModel.prepareTransactionhistory(transactionhistoryModel.gettmpHistory(), "ew_transactionsid_history", "history");
}

function prepageViewforScroll() {
    transactionhistoryModel.prepareTransactionhistory(transactionhistoryModel.gettmpHistory(), "ew_transactionsid_history", "history");
}

function getParams(isfilterApply) {
    var appId = ewalletModel.getewalletAppId()
    var localUserId = ewalletModel.getewalletpayId()
    var frmdate = ewalletUtility.getDateWithFormat("yyyy-mm-dd",ewalletUtility.getfromDate());
    var todate = ewalletUtility.getDateWithFormat("yyyy-mm-dd",ewalletUtility.gettoDate());
    var data;

    if(isfilterApply) {
       data = Appyscript.validateJSONData('{"method":"getTransactionHistory","appId":"'+appId+'", "appUserId":"'+localUserId+'", "fromDate":"'+frmdate+'" ,"toDate":"'+todate+'" ,"paymentStatus":"'+$("#transactiontypeId").val()+'" ,"offset":"'+transactionhistoryModel.getoffset()+'", "count":"10","deviceType":"android"}')

    }else {
        data = Appyscript.validateJSONData('{"method":"getTransactionHistory","appId":"'+appId+'", "appUserId":"'+localUserId+'", "fromDate":"" ,"toDate":"" ,"paymentStatus":"" ,"offset":"'+transactionhistoryModel.getoffset()+'", "count":"10","deviceType":"android"}')

    }

    return data;
}

function navigatetoTransactionhistoryPage(data) {
//console.log("datatattataat   "+ JSON.stringify(data));
    $$.get("pages/ewallet-transactionhistory.html", function (template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(data);
           mainView.router.load({
                                content: html,
                                animatePages: true
                                });
           });
}

function showTransactionFilter() {
    $("#ewalletSlider").toggleClass("slidedown slideup");
    $("#ewalletSliderfilter").toggleClass("slidedownfilter slideupfilter");
}

function applyFilter() {
    if(!ewalletValidator.validatePageData()){
        Appyscript.clickHome();
        return;
    }

  var validatorStatus = ewalletValidator.validateFilter()
    if(!validatorStatus.status) {
        Appyscript.alert(validatorStatus.msg);
        return;
    }
    transactionhistoryModel.setoffset(0)
    setDates(true);
    requestforTransactionhistory(true, false);
}

function filterfromDateEvent(element) {
    var frmDate = $(element).val()
    if(new Date(frmDate) > new Date()) {
        $("#fromdateId").val((new Date()).toISOString().substring(0, 10))
    }
}

function filtertoDateEvent(element) {
    var todate = $(element).val()
    if(new Date(todate) > new Date()) {
        $("#todateId").val((new Date()).toISOString().substring(0, 10))
    }

    var frmdDate = $("#fromdateId").val()
    if($("#fromdateId").val()  == ""){return; }
    if(!ewalletValidator.validatefilterDates(frmdDate, todate)){Appyscript.alert("From date should be less or equal to to Data"); }

}

function showDates() {
    var dateStr = "From " + ewalletUtility.getDateWithFormat("dd MMM yyyy", ewalletUtility.getfromDate()) + " to " +  ewalletUtility.getDateWithFormat("dd MMM yyyy", ewalletUtility.gettoDate())
    $("#transactiondate_period").text(dateStr)

}

function setDates(isfilterApply) {
    if(isfilterApply){
        var f_tmpdate = new Date( $("#fromdateId").val() )
        var t_tmpdate = new Date( $("#todateId").val())
        ewalletUtility.settoDate(t_tmpdate.getTime() / 1000)
        ewalletUtility.setfromDate(f_tmpdate.getTime() / 1000)
        return;
    }

    var currentDate = new Date()
    ewalletUtility.settoDate(currentDate.getTime() / 1000)
    ewalletUtility.setfromDate(currentDate.setDate(currentDate.getDate() - 7) / 1000)

}

Appyscript.scrollEwalletransaction = function() {
    if(transactionhistoryModel.gettmpHistory().length != 10) {
        return;

    }
    var dateStr = $("#transactiondate_period").text()

    var scrollContentDiv = document.getElementById("ewalletPageScrollContent");
    if ((scrollContentDiv.scrollTop + scrollContentDiv.clientHeight) >= scrollContentDiv.scrollHeight) {
           transactionhistoryModel.setoffset(transactionhistoryModel.getoffset() + transactionhistoryModel.gettmpHistory().length)

          if(dateStr == "") {
                requestforTransactionhistory(false, true);
           }else {
                requestforTransactionhistory(true, true);
           }


    }else {
         Appyscript.hideIndicator()

    }

}

function showInvoice(transid) {
    Appyscript.showIndicator();
    var appId = ewalletModel.getewalletAppId()

    if(isOnline() && (appId != undefined && appId != "undefined") && (appId != undefined && appId != "undefined") && (transid != undefined && transid != "undefined" && transid.length > 0)) {
        $$.ajax({
                url: EWallet_BaseUrl,
                data: Appyscript.validateJSONData('{"method":"getOrderHistory","appId":"'+appId+'", "TrId":"'+transid+'","deviceType":"android"}'),
                type: 'post',
                async: true,
                //321 headers: {'accessToken': deviceEncryptedToken},
                success: function(data) {
                Appyscript.hideIndicator();
                var resData = JSON.parse(data);
                if(resData != undefined && resData != null && resData.status != "failure") {
                  resData.pageTitle = pageData.pageTitle;
                  resData.page = "history";
                  console.log("Invoice Data "+ JSON.stringify(resData));
//                  if (resData.userTransactionHistory.paymentTransactionData.boleto_url != undefined) {
//                      hashTransactionId = resData.userTransactionHistory.paymentTransactionData.boleto_url;
//                  } else {
//                      hashTransactionId = "";
//                  }
                  Appyscript.navigateToPaymentStatus(resData);

                }else {
                   Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);

                }

                },error: function(){
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);

                }

                })

    }else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);

    }

}

//TODO: PAYMENT STATUS PAGE
Appyscript.navigateToPaymentStatus = function(data) {
    $$.get("pages/ewallet-paymentstatus.html", function (template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(data);
           mainView.router.load({
                content: html,
                animatePages: true
            });
            $$("#challanFormSpan").hide();

//            if(hashTransactionId != ""){
//                $$("#challanFormSpan").show();
//            }else{
//                $$("#challanFormSpan").hide();
//            }

    });
}

//TODO: PAYMENT STRIPE
Appyscript.onPageInit('paymentPage-ewallet',function(page){
    ewalletModel.settouchidOrfaceidStatus(0);
    setupStripeElement(pageData.lang)
    Appyscript.setCountryCodeByLocation();
});


Appyscript.onPageAfterAnimation('paymentPage-ewallet',function(page){
    if($$("#ewalletStripe-phone").length > 0) {
        prefilledElements();
    };

    if($$("#ewalletAuth-phone").length > 0) {
        prefilledAuthElements();
    };

    if($$("#ewalletEmail").length > 0) {
        prefilledMercadoElements();
    };
    if($$("#payfast-email").length > 0) {
        prefilledpayFastElements();
    };
    if($$("#payUmoney-email").length > 0) {
        prefilledpayuMoneyElements();
    };
    if($$("#bolato-email").length > 0) {
        prefilledBolatoElements();
    };
});

function prefilledBolatoElements() {
    if (userTransdata.email != undefined && userTransdata.email != "undefined") {

        if (userTransdata.address_line1 != undefined) {
            $$("#bolato-address").val(userTransdata.address_line1)
            $$("#bolato-address").removeClass("empty")

        }

        if (userTransdata.address_city != undefined) {
            $$("#bolato-city").val(userTransdata.address_city)
            $$("#bolato-city").removeClass("empty")

        }

        if (userTransdata.state != undefined) {
            $$("#bolato-state").val(userTransdata.state)
            $$("#bolato-state").removeClass("empty")

        }

        if (userTransdata.address_zip != undefined) {
            $$("#bolato-zip").val(userTransdata.address_zip)
            $$("#bolato-zip").removeClass("empty")

        }

        if (userTransdata.phone != undefined && userTransdata.phone != "undefined") {
            $$("#bolato-phone").val(userTransdata.phone)
            $$("#bolato-phone").removeClass("empty")

        }

        if (userTransdata.email != undefined && userTransdata.email != "undefined") {
            $$("#bolato-email").val(userTransdata.email)
            $$("#bolato-email").removeClass("empty")

        }

    } else {
        if (ewalletValidator.phoneExist()) {
            $$("#bolato-phone").val(localStorage.getItem("phone"))
            $$("#bolato-phone").removeClass("empty")

        }

        if (ewalletValidator.emailExist()) {
            $$("#bolato-email").val(localStorage.getItem("emailid"))
            $$("#bolato-email").removeClass("empty")

        }

    }

};

function prefilledpayuMoneyElements() {
    if (userTransdata.email != undefined && userTransdata.email != "undefined") {

        if (userTransdata.address_line1 != undefined) {
            $$("#payUmoney-address").val(userTransdata.address_line1)
            $$("#payUmoney-address").removeClass("empty")

        }

        if (userTransdata.address_city != undefined) {
            $$("#payUmoney-city").val(userTransdata.address_city)
            $$("#payUmoney-city").removeClass("empty")

        }

        if (userTransdata.state != undefined) {
            $$("#payUmoney-state").val(userTransdata.state)
            $$("#payUmoney-state").removeClass("empty")

        }

        if (userTransdata.address_zip != undefined) {
            $$("#payUmoney-zip").val(userTransdata.address_zip)
            $$("#payUmoney-zip").removeClass("empty")

        }

        if (userTransdata.phone != undefined && userTransdata.phone != "undefined") {
            $$("#payUmoney-phone").val(userTransdata.phone)
            $$("#payUmoney-phone").removeClass("empty")

        }

        if (userTransdata.email != undefined && userTransdata.email != "undefined") {
            $$("#payUmoney-email").val(userTransdata.email)
            $$("#payUmoney-email").removeClass("empty")

        }

    } else {
        if (ewalletValidator.phoneExist()) {
            $$("#payUmoney-phone").val(localStorage.getItem("phone"))
            $$("#payUmoney-phone").removeClass("empty")

        }

        if (ewalletValidator.emailExist()) {
            $$("#payUmoney-email").val(localStorage.getItem("emailid"))
            $$("#payUmoney-email").removeClass("empty")

        }

    }

};

function prefilledpayFastElements() {
    //var userTransdata =  ewalletUtility.getuserData();
    if (userTransdata.email != undefined && userTransdata.email != "undefined") {

        if (userTransdata.address_line1 != undefined) {
            $$("#payfast-address").val(userTransdata.address_line1)
            $$("#payfast-address").removeClass("empty")

        }

        if (userTransdata.address_city != undefined) {
            $$("#payfast-city").val(userTransdata.address_city)
            $$("#payfast-city").removeClass("empty")

        }

        if (userTransdata.state != undefined) {
            $$("#payfast-state").val(userTransdata.state)
            $$("#payfast-state").removeClass("empty")

        }

        if (userTransdata.address_zip != undefined) {
            $$("#payfast-zip").val(userTransdata.address_zip)
            $$("#payfast-zip").removeClass("empty")

        }

        if (userTransdata.phone != undefined && userTransdata.phone != "undefined") {
            $$("#payfast-phone").val(userTransdata.phone)
            $$("#payfast-phone").removeClass("empty")

        }

        if (userTransdata.email != undefined && userTransdata.email != "undefined") {
            $$("#payfast-email").val(userTransdata.email)
            $$("#payfast-email").removeClass("empty")

        }

    } else {
        if (ewalletValidator.phoneExist()) {
            $$("#payfast-phone").val(localStorage.getItem("phone"))
            $$("#payfast-phone").removeClass("empty")

        }

        if (ewalletValidator.emailExist()) {
            $$("#payfast-email").val(localStorage.getItem("emailid"))
            $$("#payfast-email").removeClass("empty")

        }

    }

};

function prefilledAuthElements() {
    //var userTransdata =  ewalletUtility.getuserData();
    if (userTransdata.email != undefined && userTransdata.email != "undefined") {

        if (userTransdata.address_line1 != undefined) {
            $$("#ewalletAuth-address").val(userTransdata.address_line1)
            $$("#ewalletAuth-address").removeClass("empty")

        }

        if (userTransdata.address_city != undefined) {
            $$("#ewalletAuth-city").val(userTransdata.address_city)
            $$("#ewalletAuth-city").removeClass("empty")

        }

        if (userTransdata.state != undefined) {
            $$("#ewalletAuth-state").val(userTransdata.state)
            $$("#ewalletAuth-state").removeClass("empty")

        }

        if (userTransdata.address_zip != undefined) {
            $$("#ewalletAuth-zip").val(userTransdata.address_zip)
            $$("#ewalletAuth-zip").removeClass("empty")

        }

        if (userTransdata.phone != undefined && userTransdata.phone != "undefined") {
            $$("#ewalletAuth-phone").val(userTransdata.phone)
            $$("#ewalletAuth-phone").removeClass("empty")

        }

        if (userTransdata.email != undefined && userTransdata.email != "undefined") {
            $$("#ewalletAuth-email").val(userTransdata.email)
            $$("#ewalletAuth-email").removeClass("empty")

        }

    } else {
        if (ewalletValidator.phoneExist()) {
            $$("#ewalletAuth-phone").val(localStorage.getItem("phone"))
            $$("#ewalletAuth-phone").removeClass("empty")

        }

        if (ewalletValidator.emailExist()) {
            $$("#ewalletAuth-email").val(localStorage.getItem("emailid"))
            $$("#ewalletAuth-email").removeClass("empty")

        }

    }

};

function prefilledElements() {
   var userdata =  ewalletUtility.getuserData();
    if(userdata != undefined && userdata != "undefined" && userdata != null && userdata != "null") {

        if(userdata.address_line1 != undefined) {
            $$("#ewalletStripe-address").val(userdata.address_line1)
            $$("#ewalletStripe-address").removeClass("empty")

        }

        if(userdata.address_city != undefined) {
            $$("#ewalletStripe-city").val(userdata.address_city)
            $$("#ewalletStripe-city").removeClass("empty")

        }

        if(userdata.address_state != undefined) {
            $$("#ewalletStripe-state").val(userdata.address_state)
            $$("#ewalletStripe-state").removeClass("empty")

        }

        if(userdata.address_zip != undefined) {
            $$("#ewalletStripe-zip").val(userdata.address_zip);
            $$("#ewalletStripe-zip").removeClass("empty");

        }

        if(userdata.address_phone != undefined && userdata.address_phone != "undefined") {
            $$("#ewalletStripe-phone").val(userdata.address_phone);
            $$("#ewalletStripe-phone").removeClass("empty");

        }

        if(userdata.address_email != undefined && userdata.address_email != "undefined") {
            $$("#ewalletStripe-email").val(userdata.address_email);
            $$("#ewalletStripe-email").removeClass("empty");

        }

    }else {
        if(ewalletValidator.phoneExist()) {
            $$("#ewalletStripe-phone").val(localStorage.getItem("phone"));
            $$("#ewalletStripe-phone").removeClass("empty");

        }

        if(ewalletValidator.emailExist()) {
            $$("#ewalletStripe-email").val(localStorage.getItem("emailid"));
            $$("#ewalletStripe-email").removeClass("empty");

        }

    }

};

function prefilledMercadoElements() {

    if (userTransdata.address_email != undefined && userTransdataaddress_email != "undefined") {

        if (userTransdata.address_line1 != undefined) {
            $$("#ewalletAddress").val(userTransdata.address_line1)
            $$("#ewalletAddress").removeClass("empty")

        }

        if (userTransdata.address_city != undefined) {
            $$("#ewalletCity").val(userTransdata.address_city)
            $$("#ewalletCity").removeClass("empty")

        }

        if (userTransdata.state != undefined) {
            $$("#ewalletState").val(userTransdata.state)
            $$("#ewalletState").removeClass("empty")

        }

        if (userTransdata.address_zip != undefined) {
            $$("#ewalletZip").val(userTransdata.address_zip)
            $$("#ewalletZip").removeClass("empty")

        }

        if (userTransdata.address_phone != undefined && userTransdata.address_phone != "undefined") {
            $$("#ewalletStripe-phone").val(userTransdata.address_phone)
            $$("#ewalletStripe-phone").removeClass("empty")

        }

        if (userTransdata.address_email != undefined && userTransdata.address_email != "undefined") {
            $$("#ewalletEmail").val(userTransdata.address_email)
            $$("#ewalletEmail").removeClass("empty")

        }

    } else {
        if (ewalletValidator.phoneExist()) {
            $$("#ewalletPhone").val(localStorage.getItem("phone"))
            $$("#ewalletPhone").removeClass("empty")

        }

        if (ewalletValidator.emailExist()) {
            $$("#ewalletEmail").val(localStorage.getItem("emailid"))
            $$("#ewalletEmail").removeClass("empty")

        }

    }

};


function navigateToStripe(data) {

    $$.get("pages/ewallet-stripe.html", function (template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(data);
           mainView.router.load({
                                content: html,
                                animatePages: true
                                });
           });
}

Appyscript.back = function(length) {
    var pageNo = parseInt(length);

    while(pageNo > 0) {
        mainView.router.back({ ignoreCache: true, animatePages: false});
        pageNo = pageNo - 1;
    }

}


Appyscript.openBlankPage = function() {
    $$.get("pages/commanPage.html", function (template) {
       var compiledTemplate = AppyTemplate.compile(template);
       var html = compiledTemplate({
               pageTitle: (pageData != undefined && pageData.pageTitle != undefined) ? pageData.pageTitle : "",
               list:[]
           });

           Appyscript.hideIndicator();
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
   });
}

//TODO: Wallet Helpers
AppyTemplate.registerHelper('currencySymbol_wallet', function(str) {
    return ewalletModel.getcurrencySymbol();

});

AppyTemplate.registerHelper('ewalletAmountHelper', function(str, pageStr) {
    if(str === "" || str === null ) {return "0"; }
    var amountStr = currencyFomatter(parseFloat(str));
    amountStr = (amountStr != undefined && amountStr != "undefined" && amountStr != null && (amountStr + "").length > 0) ? amountStr : str;

    if(pageStr == "ecom") {

      return  ((data.languageSetting.msg_availableBalance != undefined && data.languageSetting.msg_availableBalance != null && data.languageSetting.msg_availableBalance.length > 0) ? data.languageSetting.msg_availableBalance :"Your available balance amount") + " " + ewalletModel.getcurrencySymbol() + amountStr;

    }

    return ewalletModel.getcurrencySymbol() + amountStr;

});

AppyTemplate.registerHelper('getNavigationEwalletProfile',function (mode) {
    var iconColor = AppyTemplate.global.style.headerBarIconColor;
    var backClass = "";
    if(mode == "common") {
        if(!AppyTemplate.global.innerLayout) {
            backClass = "bottomBack";
        }
    }
    else {
        if (!folderPage) {
            backClass = "bottomBack";
        }
    }

    if(pageId == "services" || pageId == "realestate" || pageId == "hyperlocal" || pageId == "coupon" || pageId == "folder") {
        if(AppyTemplate.global.dirMode) {
            backClass +=" dirBack";
        }
    }
    var htmlString = '<a href="index" class="link back '+backClass+'" style="color:'+iconColor+';"><i class="icon icon-left-open-2"></i></a>';
    if(AppyTemplate.global.style.layout == 'slidemenu' || AppyTemplate.global.style.layout == 'slidemenu3d') {
        htmlString = '<a onclick="Appyscript.openSlide()" style="color:' + iconColor + ';"><i class="icon icon-menu"></i></a>';

    // htmlString = '<a href="index" class="link back '+backClass+'" style="color:'+iconColor+';"><i class="icon icon-left-open-2"></i></a>';
    }
    if ((AppyTemplate.global.style.layout == 'slidemenu' || AppyTemplate.global.style.layout == 'slidemenu3d') && isGlobalPlusCodeRequest  ) {
       htmlString = '<a href="index"  onclick="goBackfromcouponP  age()" class="link back ' + backClass + '" style="color:' + iconColor + ';"><i class="icon icon-left-open-2"></i></a>';
    }

    if(AppyTemplate.global.style.layout == "bottom") {
        htmlString = '<a class="link back" style="color:'+iconColor+';" onclick="Appyscript.clickHome()"><i class="icon icon-left-open-2"></i></a>';

    }

    return htmlString;
});

AppyTemplate.registerHelper('getInvoicepagebackbtn', function(pageStr){
        if(pageStr == 'ecom'){
          return '';

        }else if(pageStr == 'history'){
          return '<div class="left sliding"> <a href="index" class="link back" style="color:'+data.appData.headerBarIconColor+'"> <i class="icon icon-left-open-2"></i> </a> </div>';

        }

        return '<div class="left sliding"> <a href="index" style="color:'+data.appData.headerBarIconColor+'" onClick="Appyscript.back(2)"> <i class="icon icon-left-open-2"></i> </a> </div>';

});


AppyTemplate.registerHelper('ewalletInvoicepageHelper', function(resData) {
    var tmp = "";
    var transactiontype = "-"
    if(resData.type != undefined && resData.type == "Credited"){ transactiontype = "+";}

    if(resData.status == "success" || resData.status == "Completed") {
         var statuspageData = getStatuspagedata(resData);

         console.log("jhghjhkjhfg  "+JSON.stringify(statuspageData))

         tmp = '<div class="ewallet_container"> <div class="paid-success '+pageData.styleAndNavigation.bannerContentSize+' '+pageData.styleAndNavigation.bannerFont+' "> <div class="paid-inner"> <div class="paid-text"><h4>'+statuspageData.maintT+'</h4> <p>'+statuspageData.amount+'</p> </div> <div class="paid-icon"> <i class="icon-check-1"></i> </div> </div> <p class="fs12">'+statuspageData.date+'</p> </div> <div class="colorBlack paid-satement '+pageData.styleAndNavigation.listFont+' '+pageData.styleAndNavigation.listSize+' "> <ul> <li> <div class="pull-left flip cstm-width"> <p>'+statuspageData.row1t1D+'</p> <div> <h5>'+statuspageData.row1t2D+'</h4> </div> <p class="word-break">'+statuspageData.row1t3D+'</p> </div> <div class="pull-right flip cstm-width"> <div class="moneyIcon">'+statuspageData.currencySym+'<span class="badge">'+transactiontype+'</span> </div> </div> </li> <li> <div class="pull-left flip"> <p>'+statuspageData.row2t1D+'</p> <h5>'+statuspageData.row2t2D+'</h5> <p class="word-break" id= "payment_typeid_ewallet">'+statuspageData.row2t3D +'</p> </div> <a class="word-break pull-right thm-color" id="challanFormSpan" onclick="openChallanForm()">Download challan Form </a></li> </ul> </div> </div>'

    }if(resData.status == "failure") {
      var statuspageData = getStatuspagedata_failure(resData);

      tmp = '<div class="ewallet_container"> <div class="paid-success '+pageData.styleAndNavigation.bannerContentSize+' '+pageData.styleAndNavigation.bannerFont+' "> <div class="paid-inner"> <div class="paid-text"><h4>'+statuspageData.maintT+'</h4> <p class="word-break">'+statuspageData.amount+'</p> </div> <div class="paid-icon"> <i class="icon-cancel-circled"></i> </div> </div> <p class="fs12">'+statuspageData.date+'</p> </div> <div class="colorBlack paid-satement '+pageData.styleAndNavigation.listFont+' '+pageData.styleAndNavigation.listSize+' "> <ul> <li> <div class="pull-left flip"> <p>'+statuspageData.row1t1D+'</p> <div> <h5>'+statuspageData.row1t2D+'</h4> </div> <p>'+statuspageData.row1t3D+'</p> </div> <div class="pull-right flip"> <div class="moneyIcon">'+statuspageData.currencySym+'<span class="badge">'+transactiontype+'</span> </div> </div> </li> <li> <div class="pull-left flip"> <p>'+statuspageData.row2t1D+'</p> <h5>'+statuspageData.row2t2D+'</h5> <p id= "payment_typeid_ewallet">'+statuspageData.row2t3D +'</p> </div> </li> </ul> </div> </div>'

    }

  return tmp;

});

function getStatuspagedata_failure(resData) {
    var mainTitle = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.payment_declined != undefined) ? pageData.languageSetting.payment_declined :"Payment Declined";

    var row1t1 = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.added_to != undefined) ?(pageData.languageSetting.added_to + " :") :"Added to :";
    var row1t2 =  (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.wallet != undefined) ?pageData.languageSetting.wallet:"Wallet";
    var row1t3 = "";

    var row2t1 = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.payment_method_food != undefined) ?(pageData.languageSetting.payment_method_food + " :") :"Payment Type :";
    var row2t2 = resData.paymentMethod;
    var row2t3 = "";

    var amountTmp = currencyFomatter(parseFloat(resData.amount));
    amountTmp = (amountTmp != undefined && amountTmp != "undefined" && amountTmp != null && (amountTmp + "").length > 0) ? amountTmp : str;

    var symboleStr = (resData.currency != undefined) ? (Appyscript.getcurrencySymbol(resData.currency) != undefined ?Appyscript.getcurrencySymbol(resData.currency) :resData.currencySymbole): ewalletModel.getcurrencySymbol();

    var amountStr = symboleStr + amountTmp;

    if(resData.error_msg != undefined && resData.error_msg != "undefined" && resData.error_msg != null && resData.error_msg.length > 0) {
        var tmpStr = (pageData.languageSetting[resData.error_msg] != undefined && pageData.languageSetting[resData.error_msg] != "undefined" && pageData.languageSetting[resData.error_msg] != null && pageData.languageSetting[resData.error_msg].length > 0) ? pageData.languageSetting[resData.error_msg] :amountStr;

        amountStr = tmpStr;

    }

      var tmpD = new Date(parseInt(resData.addedon));
        var tmpDay = new Date(parseInt(resData.addedon * 1000));

    var dateStr = ewalletUtility.getDateWithFormat("dd MMM yyyy", (tmpD.getTime())) + ", " + ewalletUtility.getDayStr(tmpDay.getDay());


    if(resData.type != undefined && resData.type == "Debited") {
        row1t1 = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.paid_to != undefined) ?(pageData.languageSetting.paid_to + " :") :"Paid to :";
        row1t2 = resData.Paid_to;
        if(resData.paymentMethod != "PayFast"){
            row1t3 = ((pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.order_id_mcom != undefined) ?(pageData.languageSetting.order_id_mcom + " : #") :"Order ID : #") + resData.orderId;
        }

        var row2t1 = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.paid_from != undefined) ?(pageData.languageSetting.paid_from + " :") :"Paid from :";

        if(resData.otherPaymentPrice != undefined && resData.otherPaymentPrice != null && parseFloat(resData.otherPaymentPrice) > 0) {
            if(resData.paymentMethod != "payFast"){
                row2t2 = (row2t2 + "&" + resData.Paid_from);
            }
        }
    }

    var statuspageData = {
        maintT:mainTitle,
        row1t1D:row1t1,
        row1t2D:row1t2,
        row1t3D:row1t3,
        row2t1D:row2t1,
        row2t2D:row2t2,
        row2t3D:row2t3,
        amount:amountStr,
        date:dateStr,
        currencySym:symboleStr

    };

    return statuspageData;

}

function getStatuspagedata(resData) {
    var mainTitle = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.added_successfully != undefined) ? pageData.languageSetting.added_successfully :"Added Successfully";

    var row1t1 = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.added_to != undefined) ?(pageData.languageSetting.added_to + " :") :"Added to :";
    var row1t2 =  (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.wallet != undefined) ?pageData.languageSetting.wallet:"Wallet";
    var row1t3 = "";

    var row2t1 = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.payment_method_food != undefined) ?(pageData.languageSetting.payment_method_food + " :") :"Payment Type :";
    var row2t2 = resData.paymentMethod;
    var row2t3 = "";

    var amountTmp = currencyFomatter(parseFloat(resData.amount));
    amountTmp = (amountTmp != undefined && amountTmp != "undefined" && amountTmp != null && (amountTmp + "").length > 0) ? amountTmp : str;

    var symboleStr = (resData.currency != undefined) ? (Appyscript.getcurrencySymbol(resData.currency) != undefined ?Appyscript.getcurrencySymbol(resData.currency) :resData.currencySymbole): ewalletModel.getcurrencySymbol();
    var amountStr = symboleStr + amountTmp;

    var tmpD = new Date(parseInt(resData.addedon));

    var tmpDay = new Date(parseInt(resData.addedon * 1000));

    var dateStr = ewalletUtility.getDateWithFormat("dd MMM yyyy", (tmpD.getTime())) + ", " + ewalletUtility.getDayStr(tmpDay.getDay());

    if(resData.type != undefined && resData.type == "Debited") {
        mainTitle = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.transaction_paid != undefined) ? pageData.languageSetting.transaction_paid :"Paid Successfully";
        row1t1 = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.paid_to != undefined) ?(pageData.languageSetting.paid_to + " :") :"Paid to :";
        row1t2 = resData.Paid_to;
        if(resData.paymentMethod != "PayFast" || resData.paymentMethod != "payfast"){
            row1t3 = ((pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.order_id_mcom != undefined) ?(pageData.languageSetting.order_id_mcom + " : #") :"Order ID : #") + resData.orderId;
        }

        var row2t1 = (pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.paid_from != undefined) ?(pageData.languageSetting.paid_from + " :") :"Paid from :";

        if(resData.otherPaymentPrice != undefined && resData.otherPaymentPrice != null && parseFloat(resData.otherPaymentPrice) > 0) {
          row2t2 = (row2t2 + "&" + resData.Paid_from);
        }

        row2t3 = ((pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.transaction_id_food != undefined) ?(pageData.languageSetting.transaction_id_food + " : #"): "Transaction ID : #") + resData.transactionId;

    }else {
        if(resData.paymentMethod == "PayFast" || resData.paymentMethod == "payfast"){
            row1t3 = "";
        }else{
            row1t3 = ((pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.transaction_id_food != undefined) ?(pageData.languageSetting.transaction_id_food + " : #"): "Transaction ID : #") + resData.transactionId;
        }
    }

    var statuspageData = {
        maintT:mainTitle,
        row1t1D:row1t1,
        row1t2D:row1t2,
        row1t3D:row1t3,
        row2t1D:row2t1,
        row2t2D:row2t2,
        row2t3D:row2t3,
        amount:amountStr,
        date:dateStr,
        currencySym:symboleStr
    };
    return statuspageData;
}


Appyscript.accepttermandconditionevent_wallet = function() {
    Appyscript.popupClose();
    localStorage.setItem("acceptedtermscheck_wallet","true");
}


//Payment Method
function getPaymentMethods_ewallet() {

    if (isOnline()) {
        Appyscript.showIndicator();
        var postdata;
        if(localStorage.getItem("userId") != "" && localStorage.getItem("userId") != undefined) {
            postdata = '{"method":"ewalletPaymentMethod","appId":"' + localStorage.getItem("appid") + '","lang":"' + pageData.lang + '","userId":"'+localStorage.getItem("userid")+'"}';

        }else {
            postdata = '{"method":"ewalletPaymentMethod","appId":"' + localStorage.getItem("appid") + '","lang":"' + pageData.lang + '"}';

        }


        $$.ajax({
                url: EWallet_BaseUrl,
                data: Appyscript.validateJSONData(postdata),
                type: "post",
                async: true,
                //321 headers: {'accessToken': deviceEncryptedToken},
                success: function(jsonData, textStatus) {
                    if (textStatus == 200) {
                        var data = JSON.parse(jsonData);

                        if ((typeof data.paymentDetails !== "undefined") && data.paymentDetails != null && data.paymentDetails.length > 0) {
                        var paymentsmethode = {};
                        paymentsmethode.list = [];

                        for (i = 0; i < data.paymentDetails.length; i++) {
                            var item = data.paymentDetails[i];
                            var label = typeof item.label !== "undefined" ? (item.label != null ? item.label : "") : "";
                            var key = typeof item.key !== "undefined" ? (item.key != null ? item.key : "") : "";
                            var phoneNo = "",merchantId = "",merchantKey = "",saltKey = "",clientId = "",secretKey = "",paypalId = "",phoneText = "",merchantPayId = "";
                            var authorizeApiLoginID="", authorizenetClientId="", authorizenetTransactionKey ="", isTestAccount="";
                            var boletoPublicKey="";
                            if (typeof item.credentials !== "undefined") {
                                var credentials = item.credentials;
                                phoneNo = typeof credentials.phoneNo !== "undefined" ? (credentials.phoneNo != null ? credentials.phoneNo : "") : "";
                                phoneText = typeof credentials.phoneText !== "undefined" ? (credentials.phoneText != null ? credentials.phoneText : "") : "";
                                merchantId = typeof credentials.payfast_merchant_id !== "undefined" ? (credentials.payfast_merchant_id != null ? credentials.payfast_merchant_id : "") : "";
                                merchantPayId = typeof credentials.payu_money_merchant_id !== "undefined" ? (credentials.payu_money_merchant_id != null ? credentials.payu_money_merchant_id : "") : "";
                                merchantKey = typeof credentials.payfast_merchant_key !== "undefined" ? (credentials.payfast_merchant_key != null ? credentials.payfast_merchant_key : "") : "";
                                secretKey = typeof credentials.secretKey !== "undefined" ? (credentials.secretKey != null ? credentials.secretKey : "") : "";
                                saltKey = typeof credentials.payu_money_secret_key !== "undefined" ? (credentials.payu_money_secret_key != null ? credentials.payu_money_secret_key : "") : "";

                                clientId = typeof credentials.clientId !== "undefined" ? (credentials.clientId != null ? credentials.clientId : "") : "";

                                authorizeApiLoginID = typeof credentials.authorizenet_apiLoginID!== "undefined"?(credentials.authorizenet_apiLoginID!=null?credentials.authorizenet_apiLoginID:""):"";
                                authorizenetClientId = typeof credentials.authorizenet_client_id!== "undefined"?(credentials.authorizenet_client_id!=null?credentials.authorizenet_client_id:""):"";
                                authorizenetTransactionKey = typeof credentials.authorizenet_transaction_key!== "undefined"?(credentials.authorizenet_transaction_key!=null?credentials.authorizenet_transaction_key:""):"";
                                isTestAccount = typeof credentials.authorizenet_payment_mode!== "undefined"?(credentials.authorizenet_payment_mode!=null?credentials.authorizenet_payment_mode:""):"";

                                boletoPublicKey = typeof credentials.boleto_publickey!== "undefined"?(credentials.boleto_publickey!=null?credentials.boleto_publickey:""):"";

                                applicationprofileid = typeof credentials.volecity_applicationprofileid!== "undefined"?(credentials.volecity_applicationprofileid!=null?credentials.volecity_applicationprofileid:""):"";
                                merchantprofileid = typeof credentials.volecity_merchantprofileid!== "undefined"?(credentials.volecity_merchantprofileid!=null?credentials.volecity_merchantprofileid:""):"";
                                workflowid = typeof credentials.volecity_workflowid!== "undefined"?(credentials.volecity_workflowid!=null?credentials.volecity_workflowid:""):"";
                                identitytoken = typeof credentials.volecity_identitytoken!== "undefined"?(credentials.volecity_identitytoken!=null?credentials.volecity_identitytoken:""):"";
                                applicationLicenseIDEcom = typeof credentials.volecity_application_licence!== "undefined"?(credentials.volecity_application_licence!=null?credentials.volecity_application_licence:""):"";
                                //                applicationLicenseIDEcom = 'CC667D44-341D-4E27-96DA-94634938CAD9';
                                if (key == "payu_money") {
                                    saltKey = saltKey;
                                    secretKey = "";
                                }
                                paypalId = typeof credentials.paypalId !== "undefined" ? (credentials.paypalId != null ? credentials.paypalId : "") : "";
                            }

                            var tabActive = i == 0 ? " active" : "";

                            if (key == "cc")
                            paymentsmethode.list.push({
                                                      "method": "card",
                                                      "tabClassId": "card",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "clientId": clientId,
                                                      "secretKey": secretKey,
                                                      "page": "ecom"
                                                      });
                            else if (key == "payu_money")
                            paymentsmethode.list.push({
                                                      "method": "payu",
                                                      "tabClassId": "payu",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "merchantId": merchantPayId,
                                                      "saltKey": saltKey,
                                                      "page": "ecom"
                                                      });
                            else if (key == "paypal")
                            paymentsmethode.list.push({
                                                      "method": "paypal",
                                                      "tabClassId": "paypal",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "paypalId": paypalId,
                                                      "page": "ecom"
                                                      });
                            else if (key == "payfast")
                            paymentsmethode.list.push({
                                                      "method": "payfast",
                                                      "tabClassId": "payfast",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "merchantId": merchantId,
                                                      "merchantKey": merchantKey,
                                                      "page": "ecom"
                                                      });
                            else if (key == "cc_phone")
                            paymentsmethode.list.push({
                                                      "method": "obp",
                                                      "tabClassId": "obp",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "phoneNo": phoneNo,
                                                      "phoneText": phoneText,
                                                      "page": "ecom"
                                                      });
                            else if (key == "stripe") {
                            paymentsmethode.list.push({
                                                      "method": "stripe",
                                                      "tabClassId": "stripe",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "clientId": clientId,
                                                      "secretKey": secretKey,
                                                      "page": "ecom"
                                                      });
                             initalizeStripewith(clientId)

                            } else if (key == "hubtel")
                            paymentsmethode.list.push({
                                                      "method": "hubtel",
                                                      "tabClassId": "hubtel",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "clientId": clientId,
                                                      "secretKey": secretKey,
                                                      "page": "ecom"
                                                      });
                            else if (key == "mercadopago") {
                                paymentsmethode.list.push({
                                    "method": "mercado",
                                    "tabClassId": "mercadopago",
                                    "tabActive": tabActive,
                                    "label": label,
                                    "paymentMethodKey": key,
                                    "merchantId": credentials.mercadopago_public_key,
                                    "clientId": credentials.mercadopago_client_id,
                                    "secretKey": credentials.mercadopago_secret_key,
                                    "page": "ecom"
                                });

                            }
                            else if (key == "cod")
                            paymentsmethode.list.push({
                                                      "method": "cod",
                                                      "tabClassId": "cod",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "page": "ecom"
                                                      });
                            else if (key == "volecity")
                            paymentsmethode.list.push({
                                                      "method": "volecity",
                                                      "tabClassId": "volecity",
                                                      "tabActive": tabActive,
                                                      "label": label,
                                                      "paymentMethodKey": key,
                                                      "page": "ecom"
                                                      });
                            else if (key == "authorizenet")
                                paymentsmethode.list.push({
                                    "method": "authorizenet",
                                    "tabClassId": "authorizenet",
                                    "tabActive": tabActive,
                                    "label": label,
                                    "paymentMethodKey": key,
                                    "authorizenet_apiLoginID": authorizeApiLoginID,
                                    "authorizenet_transaction_key": authorizenetTransactionKey,
                                    "authorizenet_payment_mode": isTestAccount,
                                    "authorizenet_client_id": authorizenetClientId,
                                    "page": "ecom"
                                });

                            else if (key == "bolato")
                                paymentsmethode.list.push({
                                    "method": "bolato",
                                    "tabClassId": "bolato",
                                    "tabActive": tabActive,
                                    "label": label,
                                    "paymentMethodKey": key,
                                    "boletoPublicKey": boletoPublicKey,
                                    "page": "ecom"
                                });


                        }

                        AppyTemplate.global.cardLast4food = "";
                        AppyTemplate.global.cardLast4foodCourt = "";

                        paymentsmethode.amount = parseFloat($("#addamountId").val()).toFixed(2);
                        paymentsmethode.pageTitle = pageData.pageTitle;
                        paymentsmethode.languageSetting = pageData.languageSetting;

                        paymentsmethode.innerlanguagedata = false;

                        setTimeout(function() {
                                   $$.get("pages/payment-ewallet.html", function(template) {
                                          Appyscript.hideIndicator();
                                          var compiledTemplate = AppyTemplate.compile(template);
                                          if(paymentsmethode.list && paymentsmethode.list.length>0){
                                          for (var key in paymentsmethode.list) {
                                          if(paymentsmethode.list[key].method == 'volecity'){
                                          //callLicensingApiEcom(paymentsmethode.list.length, paymentsmethode.list[key].method);
                                          }
                                          }
                                          }
                                          var html = compiledTemplate(paymentsmethode);
                                          mainView.router.load({
                                                               content: html,
                                                               animatePages: true
                                                               });
                                          });
                        }, 1000);

                        }
                    } else {
                        Appyscript.hideIndicator();
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    }

                },
                error: function(error) {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
                });


    }

}
