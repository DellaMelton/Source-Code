Appyscript.clickEvent_paymentBtn = function(payment_element, pageStr, amount) {
    var a= $$(payment_element).parent();
    var paymentMethodKey=a.attr("data-key");
    Appyscript.setCountryCodeByLocation();
    
    if( paymentMethodKey == undefined || paymentMethodKey == null ){return; }

      if(ewalletValidator.validateAuthPassword() && !ewalletModel.gettouchidOrfaceidStatus()) {
                              setTimeout(function(){Appyscript.hideIndicator();  }, 2000);
                              Appyscript.loginWithTouchID();
                              return;
                              }else{
                              Appyscript.hideIndicator();
                              }
    
    openselected_paymentMethod(paymentMethodKey, payment_element, amount)
};

function openselected_paymentMethod(paymentMethodKey, payment_element, amount) {
    var a = $$(payment_element).parent();
    var paymentMethodKey = a.attr("data-key");
    var paymentMethodLable = a.attr("data-label");

    switch(paymentMethodKey) {
            
        case "paypal":
            var payId = localStorage.getItem("payid");
            AppyPieNative.encodeForeWallet(payId, amount, "ewallet");
            addViaPayPal(payment_element, amount);
        break;

        case "payfast":
            ewalletPayFast(payment_element,paymentMethodKey,paymentMethodLable,amount);
        break;

        case "authorizenet":
           ewalletSubmitOrderByAuthorize(payment_element,paymentMethodKey,paymentMethodLable,amount);
           setTimeout(function(){
               Appyscript.showIndicator();
           },300);
        break;

        case "mercadopago":
           ewalletMercadoDetail(payment_element,paymentMethodKey,paymentMethodLable,amount,localStorage.getItem("userid"));
        break;

        case "payu_money":
           ewalletPayUDetail(payment_element,paymentMethodKey,paymentMethodLable,amount,localStorage.getItem("userid"));
        break;

        case "bolato":
            ewalletBolatoDetail(payment_element,paymentMethodKey,paymentMethodLable,amount,localStorage.getItem("userid"));
        break;

        default:
            break;
            
    }
    
};

var payfastAddress;
var payfastCity;
var payfastState;
var payfastZip;
var amountStr;
var globalPaymentMethodLable = "";
var bolatoHashCode;
var globalPaymentMethodKey = "";
var bolatoAddress;
var bolatoCity;
var bolatoState;
var bolatoZip;
/***********
    BOLATO PAYMENT METHOD GATWAY
*************/

function ewalletBolatoDetail(payment_element, paymentMethodKey, paymentMethodLable, amount) {
    globalPaymentMethodLable = paymentMethodLable;
    globalPaymentMethodKey = paymentMethodKey;
    var payTypeObj = $$(payment_element).parent();
    console.log("ffffffffffffffffffffff          " + JSON.stringify(payTypeObj))
    var boletoPublicKey = payTypeObj.attr("data-boletoPublicKey");
    console.log("boletoPublicKey   "+boletoPublicKey);
    amountStr = amount;
    var currencyStr = (pageData.setting.currency_code).toUpperCase() + "";
    var bolentoCountry = localStorage.getItem("countryNameVal");

    var new_date=new Date().getTime();
    var orderId='app_'+new_date;

    var bolatoEmail = $$("#bolato-email").val();
    var bolatoPhone = $$("#bolato-phone").val();
    bolatoAddress = $$("#bolato-address").val();
    bolatoCity = $$("#bolato-city").val();
    bolatoState = $$("#bolato-state").val();
    bolatoZip = $$("#bolato-zip").val();

    if (!ewalletInputValidate(bolatoEmail, "email")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(bolatoPhone, "phone")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(bolatoAddress, "address")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(bolatoCity, "city")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(bolatoState, "state")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(bolatoZip, "zip")) {
        Appyscript.hideIndicator();
        return;
    };

    if(localStorage.getItem("countryNameVal") == "Brazil"){
        bolentoCountry = "br";
    }

    var serviceData = '{"integration_key":"'+boletoPublicKey+'","name":"'+localStorage.getItem("username")+'","email":"'+localStorage.getItem("email")+'","country":"'+bolentoCountry+'","phone_number":"'+localStorage.getItem("phone")+'","payment_type_code":"_all","merchant_payment_code":"'+orderId+'","currency_code":"'+currencyStr+'","amount":"'+amountStr+'","redirect_url":"https://angularml.pbodev.info/paypalmobile/success"}'
    console.log("serviceData**   "+serviceData);
    Appyscript.showIndicator();
    var boletoURL = "https://sandbox.ebanxpay.com/ws/request";
    console.log("checkURL    " + boletoURL);
    if (isOnline()) {
        $$.ajax({
            url: boletoURL,
            data: serviceData,
            type: "POST",
            success: function(data) {
                var jsonData=JSON.parse(data);
                console.log("BolenTo   "+JSON.stringify(jsonData));
                Appyscript.hideIndicator();
                if(jsonData.status != "ERROR"){
                    bolatoHashCode = jsonData.payment.hash;
                    console.log("RedirectURL  "+jsonData.redirect_url);
                    Appyscript.loadWebDataBolato(jsonData.redirect_url,"Payment");
                    prepareToken();
                }else{
                    Appyscript.alert(jsonData.status_message, appnameglobal_allpages);
                }
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

/*
@param url: webpage load data
*/
Appyscript.loadWebDataBolato = function(webData, headerTitle) {
    AppyPieNative.loadWebDataBolato(webData, headerTitle, Appyscript.isBottom(headerTitle));
}

/***********
    PayUMoney PAYMENT METHOD GATWAY
*************/
function ewalletPayUDetail(payment_element,paymentMethodKey,paymentMethodLable,amount,userId){
    var payTypeObj = $$(payment_element).parent();
    var merchantId = payTypeObj.attr("data-merchantId");
    var saltKey = payTypeObj.attr("data-saltKey");
    globalPaymentMethodLable = paymentMethodLable;
    amountStr = amount;
    console.log("globalPaymentMethodLable    "+globalPaymentMethodLable);

    var currencyStr = (pageData.setting.currency_code).toUpperCase() + "";

    var payUmoneyEmail = $$("#payUmoney-email").val();
    var payUmoneyPhone = $$("#payUmoney-phone").val();
    payfastAddress = $$("#payUmoney-address").val();
    payfastCity = $$("#payUmoney-city").val();
    payfastState = $$("#payUmoney-state").val();
    payfastZip = $$("#payUmoney-zip").val();

    if (!ewalletInputValidate(payUmoneyEmail, "email")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(payUmoneyPhone, "phone")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(payfastAddress, "address")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(payfastCity, "city")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(payfastState, "state")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(payfastZip, "zip")) {
        Appyscript.hideIndicator();
        return;
    };

    openPayuViewNativeEwallet(amountStr, localStorage.getItem("userid"), localStorage.getItem("appid"), localStorage.getItem("username"), localStorage.getItem("email"), localStorage.getItem("phone"), merchantId, saltKey, site_url, payfastAddress, payfastCity, payfastState, payfastZip, localStorage.getItem("countryNameVal"),currencyStr, "ewallet","Payment");
};

/*
 this method is use for payace order via Payumony
 */
function openPayuViewNativeEwallet(amount, user_Id, app_Id, userName, email_Id, phone_Number, merchantId, saltKey, site_url, payfastAddress, payfastCity, payfastState, payfastZip, countryNameVal,currencyStr, pagetype, pageTitle) {
    if (Appyscript.device.android) {
        Appyscript.openPayuViewEwallet(amount, user_Id, app_Id, userName, email_Id, phone_Number, merchantId, saltKey, site_url, payfastAddress, payfastCity, payfastState, payfastZip, countryNameVal,currencyStr, pagetype, pageTitle);
    } else {
        Appyscript.openPayuViewEwallet(amount, user_Id, app_Id, userName, email_Id, phone_Number, merchantId, saltKey, site_url,  payfastAddress, payfastCity, payfastState, payfastZip, countryNameVal,currencyStr, pagetype, pageTitle);
    }
}

/***********
    PAYDFAST PAYMENT METHOD GATWAY
*************/

function ewalletPayFast(payment_element,paymentMethodKey,paymentMethodLable,amount) {
    globalPaymentMethodLable = paymentMethodLable;
    var payTypeObj = $$(payment_element).parent();
    console.log("ffffffffffffffffffffff          " + JSON.stringify(payTypeObj))
    var merchantId = payTypeObj.attr("data-payfastmerId");
    var merchantKey = payTypeObj.attr("data-merchantKey");
    var payId = ewalletModel.getEwalletPayPalId();
    amountStr = amount;
    var currencyStr = (pageData.setting.currency_code).toUpperCase() + "";
    var Payfastcountry = localStorage.getItem("countryNameVal");

    var payfastEmail = $$("#payfast-email").val();
    var payfastPhone = $$("#payfast-phone").val();
    payfastAddress = $$("#payfast-address").val();
    payfastCity = $$("#payfast-city").val();
    payfastState = $$("#payfast-state").val();
    payfastZip = $$("#payfast-zip").val();

    if (!ewalletInputValidate(payfastEmail, "email")) {
       Appyscript.hideIndicator();
       return;
    };
    if (!ewalletInputValidate(payfastPhone, "phone")) {
       Appyscript.hideIndicator();
       return;
    };
    if (!ewalletInputValidate(payfastAddress, "address")) {
       Appyscript.hideIndicator();
       return;
    };
    if (!ewalletInputValidate(payfastCity, "city")) {
       Appyscript.hideIndicator();
       return;
    };
    if (!ewalletInputValidate(payfastState, "state")) {
       Appyscript.hideIndicator();
       return;
    };
    if (!ewalletInputValidate(payfastZip, "zip")) {
       Appyscript.hideIndicator();
       return;
    };

    var htmlForm = Appyscript.getPayFastHtmlEwallet("", merchantId, merchantKey, amountStr, currencyStr, "", site_url + "/paypalmobile/payfast-success", site_url + "/paypalmobile/payfast-cancel", site_url + "/paypalmobile/payfast-ewallet-notify/appId/" + localStorage.getItem("appid") + "/lang/" + data.appData.lang, localStorage.getItem("username"), payfastEmail, "eWallet", "Demotest", payfastPhone, payfastAddress, payfastCity, payfastState, payfastZip, Payfastcountry);

    openPayFastNativeEwallet(htmlForm, "ewallet", pageData.pageTitle);

};

/*PayFast*/
Appyscript.getPayFastHtmlEwallet = function(paymentType, merchantId, merchantKey, amount, currency, requestId, successUrl, cancelUrl, notifyUrl, payFastUsername, payFastEmail, payFastproductName, payFastproductDescrip, payfastPhone, payfastAddress, payfastCity, payfastState, payfastZip, Payfastcountry) {
    var click, type;
    if (paymentType == "yearly") {
        type = "Y";
        click = "-subscriptions";
    } else if (paymentType == "monthly") {
        type = "M";
        click = "-subscriptions";
    } else {
        type = "";
        click = "";
    }

    var url_prefix = "";
    if (merchantId == "10005646" || merchantId == "10007323") {
        url_prefix = "https://sandbox.payfast.co.za";
        // https://sandbox.payfast.co.za/eng/process
    } else {
        url_prefix = "https://www.payfast.co.za";
    }

    var paymentFor = 'Payment for ' + window.data.appData.appName + '(' + window.data.appData.appId + ')';
    var paypalIdHtml = '<!DOCTYPE HTML><html><body onload="ClickButtonPayFast();"><form action="' + url_prefix + '/eng/process" method="post"><!-- Identify your business so that you can collect the payments. --><input name="merchant_id" type="hidden" value="' + merchantId + '" /><input name="merchant_key" type="hidden" value="' + merchantKey + '" />';

    var paypalAddFormHtml = '<!-- Specify a Buy Now button. -->' +
        '<!-- Specify details about the item that buyers will purchase. -->' +
        '<input name="name_first" value="' + payFastUsername + '"  type="hidden"/>' +
        '<input name="name_last"  type="hidden" placeholder="Last Name" />' +
        '<input name="email_address" value="' + payFastEmail + '" type="hidden"/>' +
        '<input name="m_payment_id" type="hidden" value="8542"/>' +
        '<input name="amount" type="hidden" value="' + amount + '"/>' +
        '<input name="item_name" type="hidden"value="' + payFastproductName + '"/>' +
        '<input name="item_description" type="hidden" value="' + payFastproductDescrip + '"/>' +
        '<input name="custom_str1" type="hidden" value="' + payfastAddress + '"/>' +
        '<input name="custom_str2" type="hidden" value="' + payfastCity + '"/>' +
        '<input name="custom_str3" type="hidden" value="' + payfastState + '"/>' +
        '<input name="custom_str4" type="hidden" value="' + pageData.userData.currency + '"/>' +
        '<input name="custom_int1" type="hidden" value="' + payfastPhone + '"/>' +
        '<input name="custom_int2" type="hidden" value="' + localStorage.getItem("userId") + '"/>' +
        '<input name="custom_int3" type="hidden" value="' + payfastZip + '"/>' +
        '<input name="custom_str5" type="hidden" value="' + Payfastcountry + '"/>' +
        '<input type="hidden" name="custom" value="' + requestId + '">';

    var PaypalUrlFormHtml = '<!-- URL --><input type="hidden" name="return_url" value="' + successUrl + '" /><input name="cancel_url" type="hidden" value="' + cancelUrl + '" /><input type="hidden" name="notify_url" value="' + notifyUrl + '" /><!-- Display the payment button. --><input type="image" src="{URL}/images/subscribe_btn.png" name="submit" id="submit" alt="PayFast - The safer, easier way to pay online!"><img alt="" border="0" src="' + url_prefix + 'paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>function ClickButtonPayFast(){$(\'#submit\').trigger(\'click\');}</script></body></html>';
    console.log("payfastAddFormHtml      " + PaypalUrlFormHtml);
    console.log("paypalAddFormHtml   "+paypalAddFormHtml);
    return (paypalIdHtml + paypalAddFormHtml + PaypalUrlFormHtml);
};

/*
 this method is use for place pay amount view Payafast in native
 */
function openPayFastNativeEwallet(htmlForm, pagetype, pageDatapageTitle) {
    if (Appyscript.device.android) {
        Appyscript.openPayFast(htmlForm, pagetype, pageDatapageTitle);
    } else {
        Appyscript.openPayFast(htmlForm, pagetype, pageDatapageTitle);
    }
};

function ewalletUpdateStatusFromNativeSide(status, orderIdPar) {
    Appyscript.showIndicator();
    var appId = ewalletModel.getewalletAppId();
    var localUserId = ewalletModel.getewalletpayId();

    if (isOnline() && (localUserId != undefined && localUserId != "undefined") && (localUserId != null && localUserId != "null")) {
        if(status == "Success"){
            $$.ajax({
                url: EWallet_BaseUrl,
                data: Appyscript.validateJSONData('{"method":"getTransactionHistory","appId":"' + appId + '", "appUserId":"' + localUserId + '", "fromDate":"" ,"toDate":"" ,"paymentStatus":"" ,"offset":"0", "count":"1","deviceType":"android"}'),
                type: 'post',
                async: true,
                //321  headers: {'accessToken': deviceEncryptedToken},
                success: function(data) {

                    var resData = JSON.parse(data);
                    console.log("resDatainvo:----  "+JSON.stringify(resData));
                    var invoicedata = {
                        "status": "success",
                        "userTransactionHistory": {
                            "_id": "5c44ce4a8b03beba656ceaae",
                            "appId": "333582cd4c84",
                            "appUserId": 479857,
                            "billingName": "Rohit",
                            "billingEmail": "rohit@yopmail.com",
                            "billingPhone": "55685965563",
                            "billingAddress": "Plot no 165",
                            "billingCity": "Noida",
                            "billingState": "UP",
                            "billingCountry": "US",
                            "billingZip": "201308",
                            "customerId": "rohit@yopmail.com",
                            "currency": "usd",
                            "currencySymbole": "$",
                            "amount": 50,
                            "balanceAmount": 100,
                            "transactionId": "ch_1DuxJxH0v6qh6ANICyUzKQ6s",
                            "paymentMethod": "Stripe",
                            "message": "Added to E-wallet",
                            "status": "success",
                            "type": "Credited",
                            "addedon": 1548013128
                        }
                    }

                    if (resData.status != "failure") {
                        if (resData.userData != undefined && resData.userData.balanceAmount != undefined) {
                            updatebalancefor_views(resData.userData.balanceAmount, ewalletModel.getcurrencySymbol());
                            clearAmount();
                            invoicedata.userTransactionHistory.transactionId = resData.userTransactionHistory[0].transactionId;
                            invoicedata.userTransactionHistory.appId = localStorage.getItem("appid");
                            invoicedata.userTransactionHistory.currency = ewalletModel.getcurrencySymbolName();
                            invoicedata.userTransactionHistory.paymentMethod = paymentMethodLableGlobal;
                            invoicedata.userTransactionHistory.amount = amountStr;
                            invoicedata.userTransactionHistory.balanceAmount = resData.userData.balanceAmount;
                            invoicedata.userTransactionHistory.addedon = ((new Date).getTime() / 1000);

                            console.log("invo:----  "+JSON.stringify(invoicedata));

                            userTransdata.email = localStorage.getItem("email");
                            userTransdata.phone = localStorage.getItem("phone");
                            userTransdata.address_line1 = payfastAddress;
                            userTransdata.address_city = payfastCity;
                            userTransdata.state = payfastState;
                            userTransdata.address_country = localStorage.getItem("countryNameVal");
                            userTransdata.address_zip = payfastZip;

                            Appyscript.navigateToPaymentStatus(invoicedata);

                        }

                    } else {
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }

                },
                error: function() {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);

                }

            })
        }else{
             Appyscript.hideIndicator();
        }

    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);

    }

};


var userTransdata = {};
/***********
    MERCADO PAYMENT METHOD GATWAY
*************/
function ewalletMercadoDetail(payment_element, paymentMethodKey, paymentMethodLable, amount, userId) {
    paymentTypeObjectGlobal = payment_element;
    paymentMethodKeyGlobal = paymentMethodKey;
    paymentMethodLableGlobal = paymentMethodLable;
    userIdGlobal = userId;
    amountGlobal = amount;
    setTimeout(function(){
        Appyscript.showIndicator();
    },300);
    creditCardDetail = ewalletCreditCardDetailOfUser("payMercado");
};

function ewalletSetPaymentMethodInfo(status, response) {
    console.log("setPaymentMethodInfo calledDD");
    if (status == 200) {
        // do somethings ex: show logo of the payment method
        console.log("response of setPaymentMethodInfo===DDD  " + response[0].id);
        objcard.payMethodID = response[0].id;
        return;
    }
};


var objcard = {};

function ewalletMercadosdkResponseHandler(status, response) {
    console.log("sdkResponseHandler calledDDD ");
    if (status != 200 && status != 201) {
        Appyscript.hideIndicator();
        Appyscript.alert(response.cause[0].description, data.appData.appName);
    } else {
        console.log("response of sdkResponseHandler===DDD  " + response.id);
        if (response.id != undefined && response.id != "") {
            objcard.cardToken = response.id;
            if (paymentwithmercado_andewallet) {
                ewallet_mercadoCardPayment();
            } else {
                ewalletMercadoCardPayment(objcard.cardToken);
            }
            return;
        }
        return;
    }
};

function onlyNumbers(num){
   if ( /[^0-9]+/.test(num.value) ){
      num.value = num.value.replace(/[^0-9]*/g,"")
   }
};

//function noDecimal(val){alert(val)
//     $$("#addamountId").val="";
//    $$("#addamountId").val(val);
//}

function ewalletMercadoCardPayment(cardTokenMercado) {
    console.log("tokenDDD = " + objcard.cardToken + " methodDD = " + objcard.payMethodID);
    var paymentIdMercado = objcard.payMethodID //formAfterSdkCallBack.children[childrenTotal-2].value;
    var secretToken = $$(paymentTypeObjectGlobal).parent().attr("data-secretKey");
    var proDescription = "";
    if (proDescription == "") {
        proDescription = "Some description";
    }
    var postdata = '{"accessToken": "'+ secretToken +'","amount":"' + amountGlobal + '","lang":"'+data.appData.lang+'","token":"' + cardTokenMercado + '","description":"' + proDescription + '","installments":"1","cardType":"' + paymentIdMercado + '","userEmail":"' + localStorage.getItem("email") + '","appId": "' + localStorage.getItem("appid") + '","userId":' + localStorage.getItem("userid") + ',"currencyCode":"' + pageData.userData.currency + '","buyerName":"'+ localStorage.getItem("username") +'","buyerEmail":"'+ Appyscript.formToJSON('#payMercado').email +'","billingPhone": "'+ localStorage.getItem("phone") +'","address_street": "'+ewalletAuthAddress+'","address_city": "'+ewalletAuthCity+'","address_state": "'+ewalletAuthState+'","address_country": "'+localStorage.getItem("countryNameVal")+'","address_zip": "'+ewalletAuthZip+'"}';
    console.log("post data on appy server for paymentDDDD " + postdata);
    /*changed for testing*/
  //  var baseUrlAuthorizeUrl = "https://snappy.appypie.com/paypalmobile/mercadopago-payment-ewallet";
      var baseUrlAuthorizeUrl = site_url + "/paypalmobile/mercadopago-payment-ewallet";
    //var baseUrlAuthorizeUrl = "https://angularml.pbodev.info/paypalmobile/mercadopago-payment-ewallet";/* for test */
    if (isOnline()) {
        $$.ajax({
            url: baseUrlAuthorizeUrl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            async: true,
            //321  headers: {'accessToken': deviceEncryptedToken},
            success: function(jsonData, textStatus) {
                console.log("posted successfully  " + jsonData);
                Appyscript.hideIndicator();
                var resData = JSON.parse(jsonData);
                resData.pageTitle = pageData.pageTitle;
                resData.page = "walletStatus";
                if (resData.status == "success") {
                    console.log("requesttoAddMoney mercado status" + JSON.stringify(resData));
                    userTransdata.email = localStorage.getItem("email");
                    userTransdata.phone = localStorage.getItem("phone");
                    userTransdata.address_line1 = ewalletAuthAddress;
                    userTransdata.address_city = ewalletAuthCity;
                    userTransdata.state = ewalletAuthState;
                    userTransdata.address_country = localStorage.getItem("countryNameVal");
                    userTransdata.address_zip = ewalletAuthZip;
                    ewalletModel.setuserTransdata(userTransdata);
                    updatebalancefor_views(resData.userTransactionHistory.balanceAmount, ewalletModel.getcurrencySymbol());

                    ewalletUtility.clearTransactiondata();
                    clearAmount();
                    Appyscript.navigateToPaymentStatus(resData);
                    console.log(resData);
                    Appyscript.hideIndicator();
                } else {
                    //resData.userTransactionHistory.error_msg = resData.msg;
                    Appyscript.alert(resData.msg, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }

            },
            error: function(error) {
                Appyscript.hideIndicator();
                requesttoAddMoney();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
};

/*****************************************************
            //Authorize.net Payment Gatway
******************************************************/
function ewalletSubmitOrderByAuthorize(payment_element, paymentMethodKey, paymentMethodLable,amount) {
    Appyscript.showIndicator();
    console.log("dDSubmitOrderByAuthorize CAlling.... ");
    var credentials = "",
        apiLoginKey = "",
        clientKey = "",
        transactionKey = "",
        isTestAccount = "";
    var creditCardDetail = null;
    credentials = $$(payment_element).parent();
    apiLoginKey = credentials.attr("data-apiLogin-Key");
    clientKey = credentials.attr("data-client-key");
    transactionKey = credentials.attr("data-transaction-key");
    isTestAccount = credentials.attr("data-test-account");
    //Appyscript.setCountryCodeByLocation();
    creditCardDetail = ewalletCreditCardDetailOfUser("authorizenet");
    var cardDetails = JSON.parse(creditCardDetail);
    console.log("dDSubmitOrderByAuthorize*  " + JSON.stringify(cardDetails));
    if (cardDetails != undefined || cardDetails != null) {
        console.log(typeof amount);
        Appyscript.showIndicator();
        AppyPieNative.payViaAuthorize(clientKey, apiLoginKey, cardDetails.number, cardDetails.expireMonth, cardDetails.expireYear, cardDetails.cvv2, cardDetails.type, transactionKey, amount, isTestAccount, "eWallet");
    }
};

function ewalletsendDataValueFromNative(descriptor, dataValue, transactionKey, apiLoginID, cardType, amount, isTestAccount) {
    Appyscript.showIndicator();
    console.log("FromNative::--- " + descriptor + "   dataValue  " + dataValue + " transactionKey " + transactionKey + "  apiLoginID  " + apiLoginID + "  cardType  " + cardType + "  amount  " + amount + "  isTestAccount  " + isTestAccount);
    var postData = '{"pageType": "ewallet","appId":"' + appid + '","userEmail": "' + localStorage.getItem("email") + '","countryCode":"","currencyCode":"' +pageData.userData.currency+ '","userId":"' + localStorage.getItem("userid") + '","cardType":"' + cardType + '","description":"Demo","dataDescriptor":"' + descriptor + '","dataValue":"' + dataValue + '","transactionKey":"' + transactionKey + '","amount":"' + amount + '","appLoginID":"'+apiLoginID+'","buyerName":"'+ localStorage.getItem("username") +'","address_street": "'+ewalletAuthAddress+'","address_city": "'+ewalletAuthCity+'","address_country": "'+localStorage.getItem("countryNameVal")+'","address_zip": "'+ewalletAuthZip+'","address_state": "'+ewalletAuthState+'","billingPhone": "'+ localStorage.getItem("phone") +'"}';
    console.log("auth:--- "+postData);

    var baseUrlAuthorizeUrl = "https://snappy.appypie.com/paypalmobile/authorizenet-payment-ewallet";
    //var baseUrlAuthorizeUrl = "https://angularml.pbodev.info/paypalmobile/authorizenet-payment-ewallet";/* for test */
    if (isOnline()) {
        $$.ajax({
            url: baseUrlAuthorizeUrl,
            data: postData,
            type: "post",
            //321  headers: {'accessToken': deviceEncryptedToken},
            success: function(jsonData, textStatus) {
                console.log("posted successfully  " + jsonData);

                 var resData = JSON.parse(jsonData);
                 resData.pageTitle = pageData.pageTitle;
                 resData.page = "walletStatus";

                console.log("requesttoAddMoney auth status" + JSON.stringify(resData));
                if (resData.status == "success") {
                    userTransdata.email = localStorage.getItem("email");
                    userTransdata.phone = localStorage.getItem("phone");
                    userTransdata.address_line1 = ewalletAuthAddress;
                    userTransdata.address_city = ewalletAuthCity;
                    userTransdata.state = ewalletAuthState;
                    userTransdata.address_country = localStorage.getItem("countryNameVal");
                    userTransdata.address_zip = ewalletAuthZip;
                    ewalletModel.setuserTransdata(userTransdata);
                    updatebalancefor_views(resData.userTransactionHistory.balanceAmount, ewalletModel.getcurrencySymbol());
                    ewalletUtility.clearTransactiondata()
                    clearAmount()
                    Appyscript.navigateToPaymentStatus(resData);
                    Appyscript.hideIndicator();
                    console.log(resData)
                } else {
                    //resData.userTransactionHistory.error_msg = resData.msg;
                    Appyscript.alert(resData.msg, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }

            },
            error: function(error) {
                Appyscript.hideIndicator();
                requesttoAddMoney();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

/*
    This method is used to check validationn of credit card as well as create json of credit card details
*/
var ewalletAuthPhone;
var ewalletAuthEmail;
var ewalletAuthAddress;
var ewalletAuthCity;
var ewalletAuthState;
var ewalletAuthZip;

function ewalletCreditCardDetailOfUser(creditCardType) {
    var creditCardJSON;
    Appyscript.showIndicator();
    if (creditCardType == "stripe") {
        Appyscript.showIndicator();
        creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripe');
    } else if (creditCardType == "payMercado") {
        creditCardJSON = Appyscript.formToJSON('#payMercado');
        Mercadopago.clearSession();

        ewalletAuthEmail = $$("#ewalletEmail").val();
        ewalletAuthPhone = $$("#ewalletPhone").val();
        ewalletAuthAddress = $$("#ewalletAddress").val();
        ewalletAuthCity = $$("#ewalletCity").val();
        ewalletAuthState = $$("#ewalletState").val();
        ewalletAuthZip = $$("#ewalletZip").val();

        if (!ewalletInputValidate(ewalletAuthEmail, "email")) {
            Appyscript.hideIndicator();
            return;
        };
        if (!ewalletInputValidate(ewalletAuthPhone, "phone")) {
            Appyscript.hideIndicator();
            return;
        };
        if (!ewalletInputValidate(ewalletAuthAddress, "address")) {
            Appyscript.hideIndicator();
            return;
        };
        if (!ewalletInputValidate(ewalletAuthCity, "city")) {
            Appyscript.hideIndicator();
            return;
        };
        if (!ewalletInputValidate(ewalletAuthState, "state")) {
            Appyscript.hideIndicator();
            return;
        };
        if (!ewalletInputValidate(ewalletAuthZip, "zip")) {
            Appyscript.hideIndicator();
            return;
        };

        Mercadopago.setPublishableKey($('#payMercado').parent().attr("data-merchantId"));
        console.log("====Mercado identification type====DD");
        var ccNumber = creditCardJSON.cardNumber.replace(/[ .-]/g, '').slice(0, 6);
        Mercadopago.getPaymentMethod({
            "bin": ccNumber
        }, ewalletSetPaymentMethodInfo);
        Mercadopago.createToken($('#payMercado'), ewalletMercadosdkResponseHandler);
        return "";
    } else if (creditCardType == "authorizenet") {
        Appyscript.showIndicator();
        creditCardJSON = Appyscript.formToJSON('#authorizeCardDetails');
    } else {
        creditCardJSON = Appyscript.formToJSON('#creditCardThroughPaypal');
    }
    var cnumber = creditCardJSON.cardNumber;
    var expairyMonth = creditCardJSON.expairyMonth;
    var expairyYear = creditCardJSON.expairyYear;
    var cHolder = creditCardJSON.cardHolder;
    var cvvCode = creditCardJSON.cvvCode;
    var card_type = Appyscript.validateCardType(cnumber);


    ewalletAuthPhone = $$("#ewalletAuth-phone").val();
    ewalletAuthEmail = $$("#ewalletAuth-email").val();
    ewalletAuthAddress = $$("#ewalletAuth-address").val();
    ewalletAuthCity = $$("#ewalletAuth-city").val();
    ewalletAuthState = $$("#ewalletAuth-state").val();
    ewalletAuthZip = $$("#ewalletAuth-zip").val();

    if (!ewalletInputValidate(ewalletAuthPhone, "phone")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(ewalletAuthEmail, "email")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(ewalletAuthAddress, "address")) {
        return;
    };
    if (!ewalletInputValidate(ewalletAuthCity, "city")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(ewalletAuthState, "state")) {
        Appyscript.hideIndicator();
        return;
    };
    if (!ewalletInputValidate(ewalletAuthZip, "zip")) {
        Appyscript.hideIndicator();
        return;
    };

    if (cnumber == null || cnumber == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.please_enter_card_number, appnameglobal_allpages);
        return;
    } else if (isNaN(cnumber) || cnumber.length < 15) {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.please_enter_valid_card_number, appnameglobal_allpages);
        return;
    } else if (expairyMonth == null || expairyMonth == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.please_enter_expiry_month, appnameglobal_allpages);
        return;
    } else if (isNaN(expairyMonth) || expairyMonth.length < 2) {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.please_enter_valid_expiry_month, appnameglobal_allpages);
        return;
    } else if (expairyYear == null || expairyYear == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.please_enter_expiry_year, appnameglobal_allpages);
        return;
    }else if (cvvCode == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.please_enter_cvv_code, appnameglobal_allpages);
        return;
    } else if (isNaN(cvvCode) || cvvCode.length < 3) {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.please_enter_valid_cvv_code, appnameglobal_allpages);
        return;
    }

    var cHolder1 = cHolder.split(" ");
    var lastName = cHolder1[1];
    var firstName = cHolder1[0];
    if (lastName == '' || lastName == null) {
        lastName = '';
    }

    var paymentDetail = '{"type":"' + card_type + '","number":"' + cnumber + '","expireMonth":"' + expairyMonth +
        '","expireYear":"' + expairyYear + '","cvv2":"' + cvvCode + '","firstName":"' + firstName + '","lastName":"' + lastName + '"}';

    return paymentDetail;
};

//********************************************
// This function is used for validation
function ewalletInputValidate(value, field) {

    if (field == "name") {
        if (value.trim() == '') {
            Appyscript.alert(pageData.languageSetting.please_enter_name_mcom,appnameglobal_allpages);
            return false;
        }
    }

    if (field == "phone") {
        if (value.length < 4) {
            Appyscript.alert(pageData.languageSetting.error_enterphone,appnameglobal_allpages);
            return false;
        }
        if (value.trim() == '') {
            Appyscript.alert(pageData.languageSetting.error_enterphone,appnameglobal_allpages);
            return false;
        }
    }

    if (field == "email") {
        if (value.trim() == '' || !Appyscript.validateEmail(value)) {
            Appyscript.alert(pageData.languageSetting.please_enter_email_social_network,appnameglobal_allpages);
            return false;
        }
    }

    if (field == "address") {
        if (value.trim() == '' || value == "-1") {
            Appyscript.alert(pageData.languageSetting.error_address,appnameglobal_allpages);
            return false;
        }
    }

    if (field == "city") {
        if (value.trim() == '') {
            Appyscript.alert(pageData.languageSetting.please_enter_city_mcom,appnameglobal_allpages);
            return false;
        }
    }

    if (field == "state") {
        if (value.trim() == '' || !Appyscript.checkNameState(value)) {
            Appyscript.alert(pageData.languageSetting.error_enterstate,appnameglobal_allpages);
            return false;
        }
    }

    if (field == "zip") {
        if (value.trim() == '') {
            Appyscript.alert(pageData.languageSetting.error_zip,appnameglobal_allpages);
            return false;
        }
    }

    return true;
};

function addViaPayPal(payment_element, amount){
var paymentEle = $$(payment_element).parent();
var merchantId=paymentEle.attr("data-merchantId") + "";
var paypalId=paymentEle.attr("data-paypalId") + "";
var payId = ewalletModel.getEwalletPayPalId();
var amountStr = ewalletModel.getEwalletPayPalAmount();
var currencyStr = (pageData.setting.currency_code).toUpperCase() + "";

 AppyPieNative.OrginalEwalletData();
var phoneNo = (localStorage.getItem("phone") != undefined && localStorage.getItem("phone") != "undefined" && localStorage.getItem("phone") != null && localStorage.getItem("phone") != "null" && (localStorage.getItem("phone") + "").length > 0 ) ?localStorage.getItem("phone") :"1234567890";
if(validatePaypalConfigution(amountStr, payId, paypalId)){
            var htmlForm= Appyscript.getPayPalHtml("", paypalId, amount + "", currencyStr, phoneNo+"|"+OriginalEwalletPayPalId+"|"+OriginalEwalletAmount+"|android", site_url+"/paypalmobile/successpaypal"+"/appId/"+appId,site_url+"/paypalmobile/notify-ewallet"+"/appId/"+appId);
            Appyscript.openPaypal(htmlForm, "ewallet", pageData.pageTitle , merchantId);
}

}


//TODO:PAYPAL
function preparePaypalHtml(payment_element, amount) {
    var paymentEle = $$(payment_element).parent();
    var merchantId=paymentEle.attr("data-merchantId") + "";
    var paypalId=paymentEle.attr("data-paypalId") + "";
    var currencyStr = (pageData.setting.currency_code).toUpperCasse() + ""
    var payid = ewalletModel.getewalletpayId()
    var amountStr = amount + "";
    var phoneNo = (localStorage.getItem("phone") != undefined && localStorage.getItem("phone") != "undefined" && localStorage.getItem("phone") != null && localStorage.getItem("phone") != "null" && (localStorage.getItem("phone") + "").length > 0 ) ?localStorage.getItem("phone") :"1234567890";

    var paymentData = {"paypalId":paypalId,"currencyStr":currencyStr, "payid":payid, "amountStr":amountStr,"phone":phoneNo}

    if(validatePaypalConfigution(amountStr, payid, paypalId)){Appyscript.openPaypal_wallet(paymentData, pageData.pageTitle, "ewallet") }

}

function validatePaypalConfigution(amount, payid, paypalId) {
    if(amount != undefined && amount != null && amount.length > 0 && payid != undefined && payid != null && payid.length > 0 && paypalId != undefined && paypalId != null && paypalId.length > 0) {return true; }

    return false;
}

function openinvoicePage(status, amount, transid) {
    Appyscript.showIndicator();

    var appId = ewalletModel.getewalletAppId()
    var localUserId = ewalletModel.getewalletpayId()

    //console.log("openinvoicePage status" + status + "amount " + amount +"transid " + transid + "appId " + appId + "localUserId " + localUserId)

    if(isOnline() && (localUserId != undefined && localUserId != "undefined") && (localUserId != null && localUserId != "null")) {
        $$.ajax({
                url: EWallet_BaseUrl,
                data: Appyscript.validateJSONData('{"method":"getTransactionHistory","appId":"'+appId+'", "appUserId":"'+localUserId+'", "fromDate":"" ,"toDate":"" ,"paymentStatus":"" ,"offset":"0", "count":"1","deviceType":"android"}'),
                type: 'post',
                async: true,
                //321  headers: {'accessToken': deviceEncryptedToken},
                success: function(data) {
               
                var resData = JSON.parse(data);
                var invoicedata = {"status":"success","userTransactionHistory":{"_id":"5c44ce4a8b03beba656ceaae","appId":"333582cd4c84","appUserId":479857,"billingName":"Rohit","billingEmail":"rohit@yopmail.com","billingPhone":"55685965563","billingAddress":"Plot no 165","billingCity":"Noida","billingState":"UP","billingCountry":"US","billingZip":"201308","customerId":"rohit@yopmail.com","currency":"usd","currencySymbole":"$","amount":50,"balanceAmount":100,"transactionId":"ch_1DuxJxH0v6qh6ANICyUzKQ6s","paymentMethod":"Stripe","message":"Added to E-wallet","status":"success","type":"Credited","addedon":1548013128}}
                
                if(resData.status != "failure") {
                    if(resData.userData != undefined && resData.userData.balanceAmount != undefined) {
                        updatebalancefor_views(resData.userData.balanceAmount, ewalletModel.getcurrencySymbol());
                        clearAmount();
                        //invoicedata.userTransactionHistory.transactionId = transid;
                        invoicedata.userTransactionHistory.appId = localStorage.getItem("appid");
                        invoicedata.userTransactionHistory.currency = ewalletModel.getcurrencySymbolName();
                        invoicedata.userTransactionHistory.paymentMethod = paymentMethodLableGlobal;
                        invoicedata.userTransactionHistory.amount = amount;
                        invoicedata.userTransactionHistory.balanceAmount = resData.userData.balanceAmount;
                        invoicedata.userTransactionHistory.addedon = ((new Date).getTime() / 1000);
                        invoicedata.pageTitle = pageData.pageTitle;
                
                        Appyscript.navigateToPaymentStatus(invoicedata);
                        console.log(invoicedata);
                    }
                
                }else {
                    Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                   Appyscript.hideIndicator();
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

//TODO: STRIPE
var stripe;

/*Call this function before payment page*/
function initalizeStripewith(clientId) {
    if(clientId == undefined || clientId == null ||clientId == "undefined" || clientId == "null" ||  clientId.length == 0) {
        Appyscript.alert(((pageData != undefined && pageData.languageSetting != undefined && pageData.languageSetting.error_paymentMethod != undefined && pageData.languageSetting.error_paymentMethod != "undefined" && pageData.languageSetting.error_paymentMethod.length > 0) ?pageData.languageSetting.error_paymentMethod :"Payment method not integrated. Please contact App Admin." ),appnameglobal_allpages)
        return;
    }
    
    
    if(stripe == undefined || stripe == null) {
        stripe = Stripe(clientId);
    }
   
}

/*Call this function on onPageInit*/
function setupStripeElement(language) {
    if(stripe == undefined || stripe == null || language.length == 0) {return; }
    var elements = stripe.elements({ locale: language });
    
// Floating labels
var inputs = document.querySelectorAll('.cell.example.ewalletStripe .input');
Array.prototype.forEach.call(inputs, function(input) {
    input.addEventListener('focus', function() {
        input.classList.add('focused');
        
    });

    input.addEventListener('blur', function() {
        input.classList.remove('focused');
        
    });

    input.addEventListener('keyup', function() {
        if (input.value.length === 0) {
        input.classList.add('empty');
        
        } else {
        input.classList.remove('empty');
        
        }
    });
});
    
    
    var elementStyles = {
    base: {
    color: '#32325D',
    fontWeight: 500,
    fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
        '::placeholder': {
            color: '#CFD7DF',
        },
        ':-webkit-autofill': {
            color: '#e39f48',
        },
    },
    invalid: {
    color: '#E25950',
        
        '::placeholder': {
            color: '#FFCCA5',
        },
    },
    };
    
    var elementClasses = {
        focus: 'focused',
        empty: 'empty',
        invalid: 'invalid',
    };
    
    var cardNumber = elements.create('cardNumber', {
                                     style: elementStyles,
                                     classes: elementClasses,
                                     
                                     });
    
    cardNumber.mount('#ewalletStripe-card-number');
    
    var myPostalCodeField = document.querySelector('input[name="my-postal-code"]');
    myPostalCodeField.addEventListener('change', function(event) {
                                       cardNumber.update({value: {postalCode: event.target.value}});
                                       });
    
    var cardExpiry = elements.create('cardExpiry', {
                                     style: elementStyles,
                                     classes: elementClasses,
                                     
                                     });
    
    
    cardExpiry.mount('#ewalletStripe-card-expiry');
    
    var cardCvc = elements.create('cardCvc', {
                                  style: elementStyles,
                                  classes: elementClasses,
                                  
                                  });
    
    
    cardCvc.mount('#ewalletStripe-card-cvc');
    
    registerElements([cardNumber, cardExpiry, cardCvc], 'ewalletStripe');
    
}


function registerElements(elements, exampleName) {
    var formClass = '.' + exampleName;
    var example = document.querySelector(formClass);
    
    var form = example.querySelector('form');
    
    function enableInputs() {
        Array.prototype.forEach.call(
                                     form.querySelectorAll(
                                                           "input[type='text'], input[type='email'], input[type='tel']"
                                                           ),
                                     function(input) {
                                     input.removeAttribute('disabled');
                                     }
                                     );
    }
    
    function disableInputs() {
        Array.prototype.forEach.call(
                                     form.querySelectorAll(
                                                           "input[type='text'], input[type='email'], input[type='tel']"
                                                           ),
                                     function(input) {
                                     input.setAttribute('disabled', 'true');
                                     }
                                     );
    }
    
    function triggerBrowserValidation() {
        // The only way to trigger HTML5 form validation UI is to fake a user submit
        // event.
        var submit = document.createElement('input');
        submit.type = 'submit';
        submit.style.display = 'none';
        form.appendChild(submit);
        submit.click();
        submit.remove();
    }
    
    // Listen for errors from each Element, and show error messages in the UI.
    var savedErrors = {};
    elements.forEach(function(element, idx) {
                     element.on('change', function(event) {
                                if (event.error) {
                                //                                error.classList.add('visible');
                                savedErrors[idx] = event.error.message;
                                //                                errorMessage.innerText = event.error.message;
                                } else {
                                savedErrors[idx] = null;
                                
                                // Loop over the saved errors and find the first one, if any.
                                var nextError = Object.keys(savedErrors)
                                .sort()
                                .reduce(function(maybeFoundError, key) {
                                        return maybeFoundError || savedErrors[key];
                                        }, null);
                                
                                if (nextError) {
                                // Now that they've fixed the current error, show another one.
                                //                                errorMessage.innerText = nextError;
                                } else {
                                // The user fixed the last error; no more errors.
                                //                                error.classList.remove('visible');
                                }
                                }
                                });
                     });
    
    // Listen on the form's 'submit' handler...
    form.addEventListener('submit', function(e) {
                          e.preventDefault();
                          
                          // Trigger HTML5 validation UI on the form if any of the inputs fail
                          // validation.
                          var plainInputsValid = true;
                          Array.prototype.forEach.call(form.querySelectorAll('input'), function(
                                                                                                input
                                                                                                ) {
                                                       
                                                       if (input.checkValidity && !input.checkValidity()) {
                                                       if(plainInputsValid){ ewalletValidator.validate_cardform(input.id, $(input).val())}
                                                       plainInputsValid = false;
                                                       return;
                                                       }
                                                       });
                          
                          
                          if (!plainInputsValid) {
                          triggerBrowserValidation();
                          return;
                          }
                          
                          if(ewalletValidator.validateAuthPassword() && !ewalletModel.gettouchidOrfaceidStatus()) {
                            setTimeout(function(){Appyscript.hideIndicator();  }, 2000);
                            Appyscript.loginWithTouchID();
                            return;
                            }else{
                            Appyscript.hideIndicator();
                            }

                          
                          // Show a loading screen...
                          example.classList.add('submitting');
                          
                          // Disable all inputs.
                          disableInputs();
                          
                          // Gather additional customer data we may have collected in our form.
                          var address1 = form.querySelector('#' + exampleName + '-address');
                          var city = form.querySelector('#' + exampleName + '-city');
                          var state = form.querySelector('#' + exampleName + '-state');
                          var zip = form.querySelector('#' + exampleName + '-zip');
                          var phone = form.querySelector('#' + exampleName + '-phone');
                          var email = form.querySelector('#' + exampleName + '-email');
                          var additionalData = {
                              address_line1: address1 ? address1.value : undefined,
                              address_city: city ? city.value : undefined,
                              address_state: state ? state.value : undefined,
                              address_zip: zip ? zip.value : undefined,
                              address_phone: phone ? phone.value : undefined,
                              address_email: email ? email.value : undefined,
                          
                          };
                          
                          ewalletUtility.saveuserData(additionalData);
                          Appyscript.showPreloader((data.languageSetting.msg_requestProcessing != undefined) ? data.languageSetting.msg_requestProcessing:"Wait we are processing your request, Please do not close your app or disconnect Internet connection")
                          // Use Stripe.js to create a token. We only need to pass in one Element
                          // from the Element group in order to create a token. We can also pass
                          // in the additional customer data we collected in our form.
                          stripe.createToken(elements[0], additionalData).then(function(result) {
                                                                               // Stop loading!
                                                                               example.classList.remove('submitting');
                                                                               
                                                                               if (result.token) {
                                                                               var token = result.token;
                                                                               userTransdata.billing_name = (localStorage.getItem("name") != undefined && localStorage.getItem("name") != "undefined" && localStorage.getItem("name") !=  null && localStorage.getItem("name").length > 0) ? localStorage.getItem("name"): "User";
                                                                               userTransdata.email = (additionalData.address_email != undefined) ? additionalData.address_email : "";
                                                                               userTransdata.phone = (additionalData.address_phone != undefined) ? additionalData.address_phone : "";
                                                                               userTransdata.billing_address_line1 = token.card.address_line1;
                                                                               userTransdata.billing_address_city = token.card.address_city;
                                                                               userTransdata.state = token.card.address_state;
                                                                               userTransdata.billing_address_country = token.card.country;
                                                                               userTransdata.billing_address_zip = token.card.address_zip;
                                                                               userTransdata.transid = token.id;
                                                                               userTransdata.currency = (pageData.setting.currency_code).toLowerCase();
                                                                               userTransdata.preparedToken = undefined;
                                                                               ewalletModel.setuserTransdata(userTransdata);
                                                                               clearCardInfo()
                                                                               prepareToken();
                                                                               
                                                                               } else {
                                                                               // Otherwise, un-disable inputs.
                                                                               enableInputs();
                                                                               Appyscript.hidePreloader()
                                                                               if(result.error != undefined && result.error.message.length > 0) {
                                                                               Appyscript.alert(result.error.message);
                                                                               
                                                                               }else {
                                                                               Appyscript.alert(something_went_wrong_please_try_again);
                                                                               
                                                                               }
                                                                               
                                                                               
                                                                               }
                                                                               });
                          });
    
    
    function clearCardInfo() {
        // Resetting the form (instead of setting the value to `''` for each input)
        // helps us clear webkit autofill styles.
        form.reset();
        
        // Clear each Element.
        elements.forEach(function(element) {
                         element.clear();
                         });
        
        // Reset error state as well.
        //        error.classList.remove('visible');
        
        // Resetting the form does not un-disable inputs, so we need to do it separately:
        enableInputs();
        
    }
    
}

Appyscript.clickEventOnPaymenttab = function(payment_method) {
    ewalletModel.settouchidOrfaceidStatus(0);

}


