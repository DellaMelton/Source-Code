var pageIdGlobal;
var baseurl;
var orderIdPageGlobal;
var paymentMethodKeyGlobal;
var paymentMethodLableGlobal;
var paymentTypeObjectGlobal;
var userIdGlobal;
var commonPageJsonDataGlobal;
var commonAmount = "";
var commonCurrencyCode;
var commonItemQuantity;
var commonItemName;
var paypalApi_URL;
var paypal_Success_Url;
var stripe_Success_Url;
var stripe_Api_Url;
var foodPaymentData;
var globalPageIdentifie;

/********
        This function is used to call Payment Page
********/

function CommonPaymentgatwayFunction(OrderId, pageId, commonPageJsonData, pageIdentifie) {
    orderIdPageGlobal = OrderId;
    commonPageJsonDataGlobal = commonPageJsonData;
    globalPageIdentifie = pageIdentifie;
    pageIdGlobal = pageId;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getPaymentGatewayConfigNew","appId":"' + appId + '","pageName":"' + pageId + '","pageId":"' + globalPageIdentifie + '","userId":"'+ localStorage.getItem("userId") +'"}';
        var CE_baseURLPayment = webserviceUrl + "PaymentGateways.php";
        $$.ajax({
            url: CE_baseURLPayment,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            timeout: 10000,
            async: true,
            success: function(jsonData) {
                Appyscript.hideIndicator();
                var responseData = JSON.parse(jsonData);
                console.log("getPaymentGatewaySettings::>>>>>     " + JSON.stringify(responseData));
                if(responseData.error_code == 1){
                     Appyscript.alert(responseData.error_message, appnameglobal_allpages);
                }
                ewalletModel.setewalletAvailableStatus(((responseData.ewalletEnable == undefined || responseData.ewalletEnable == "undefined" ||responseData.ewalletEnable == "") ? false : responseData.ewalletEnable));
                if (responseData.paymentDetails.length) {
                    var paymentDetails = responseData.paymentDetails;
                    foodPaymentData = JSON.parse(jsonData);
                    var paymentMethods = {};
                    paymentMethods.list = [];
                    paymentMethods.ewalletbalance = "";
                    for (i = 0; i < paymentDetails.length; i++) {
                        var item = paymentDetails[i];
                        var label = typeof item.label !== "undefined" ? (item.label != null ? item.label : "") : "";
                        var key = typeof item.key !== "undefined" ? (item.key != null ? item.key : "") : "";
                        var payfast_Success_Url = "",
                            payfastApi_URL = "",
                            pesapal_SuccessUrl = "",
                            pesapal_ApiURL = "",
                            payU_SuccessUrl = "",
                            payU_ApiURL = "",
                            mercado_SuccessUrl = "",
                            mercado_ApiURL = "",
                            stripe_Cancel_url = "",
                            mercado_Cancel_Url = "",
                            payuMoney_Cancel_Url = "",
                            fast_Cancel_Url = "",
                            pesapal_Cancel_Url = "",
                            braintree_SuccessUrl = "",
                            braintree_CancelUrl = "",
                            braintree_ApiURL = "",
                            velocity_SuccessUrl = "",
                            velocity_ApiURL = "",
                            velocity_Cancel_Url = "",
                            bolato_SuccessUrl = "",
                            bolato_ApiURL = "",
                            bolato_Cancel_Url = "",
                            authorize_ApiURL = "",
                            authorize_SuccessUrl = "",
                            authorize_Cancel_Url = "",
                            hubtel_SuccessUrl = "",
                            hubtel_ApiURL = "",
                            hubtel_Cancel_Url = "",
                            cod_ApiURL = "",
                            ccPhone_ApiURL = "",
                            pu_ApiURL = "",
                            ccPhoneText = "",
                            ccPhone = "",
                            mercado_FailureUrl = "",
                            payfastFailure_url = "",
                            hubtel_FailureUrl = "",
                            boletoFailure_url = "",
                            ewallet_api_url = "",
                            ewallet_success_url = "",
                            ewallet_cancel_url = "",
                            ewallet_failure_url = "";

                        if (typeof item.credentials !== "undefined") {

                            var credentials = item.credentials;
                            //Sucess URL for all Payments
                            paypal_Success_Url = typeof credentials.paypal_success_url !== "undefined" ? (credentials.paypal_success_url != null ? credentials.paypal_success_url : "") : "";
                            stripe_Success_Url = typeof credentials.stripe_success_url !== "undefined" ? (credentials.stripe_success_url != null ? credentials.stripe_success_url : "") : "";
                            paypalApi_URL = typeof credentials.paypal_api_url !== "undefined" ? (credentials.paypal_api_url != null ? credentials.paypal_api_url : "") : "";
                            stripe_Api_Url = typeof credentials.stripe_api_url !== "undefined" ? (credentials.stripe_api_url != null ? credentials.stripe_api_url : "") : "";
                            payfast_Success_Url = typeof credentials.payfast_success_url !== "undefined" ? (credentials.payfast_success_url != null ? credentials.payfast_success_url : "") : "";
                            payfastApi_URL = typeof credentials.payfast_api_url !== "undefined" ? (credentials.payfast_api_url != null ? credentials.payfast_api_url : "") : "";
                            pesapal_SuccessUrl = typeof credentials.pesapal_success_url !== "undefined" ? (credentials.pesapal_success_url != null ? credentials.pesapal_success_url : "") : "";
                            pesapal_ApiURL = typeof credentials.pesapal_api_url !== "undefined" ? (credentials.pesapal_api_url != null ? credentials.pesapal_api_url : "") : "";
                            payU_SuccessUrl = typeof credentials.payu_money_success_url !== "undefined" ? (credentials.payu_money_success_url != null ? credentials.payu_money_success_url : "") : "";
                            payU_ApiURL = typeof credentials.payu_money_api_url !== "undefined" ? (credentials.payu_money_api_url != null ? credentials.payu_money_api_url : "") : "";
                            mercado_SuccessUrl = typeof credentials.mercado_success_url !== "undefined" ? (credentials.mercado_success_url != null ? credentials.mercado_success_url : "") : "";
                            mercado_ApiURL = typeof credentials.mercado_api_url !== "undefined" ? (credentials.mercado_api_url != null ? credentials.mercado_api_url : "") : "";

                            mercado_FailureUrl = typeof credentials.mercado_failure_url !== "undefined" ? (credentials.mercado_failure_url != null ? credentials.mercado_failure_url : "") : "";

                            paypal_Cancel_Url = typeof credentials.paypal_cancel_url !== "undefined" ? (credentials.paypal_cancel_url != null ? credentials.paypal_cancel_url : "") : "";
                            stripe_Cancel_Url = typeof credentials.stripe_cancel_url !== "undefined" ? (credentials.stripe_cancel_url != null ? credentials.stripe_cancel_url : "") : "";
                            mercado_Cancel_Url = typeof credentials.mercado_cancel_url !== "undefined" ? (credentials.mercado_cancel_url != null ? credentials.mercado_cancel_url : "") : "";
                            payuMoney_Cancel_Url = typeof credentials.payu_money_failure_url !== "undefined" ? (credentials.payu_money_failure_url != null ? credentials.payu_money_failure_url : "") : "";
                            fast_Cancel_Url = typeof credentials.payfast_cancel_url !== "undefined" ? (credentials.payfast_cancel_url != null ? credentials.payfast_cancel_url : "") : "";
                            pesapal_Cancel_Url = typeof credentials.pesapal_cancel_url !== "undefined" ? (credentials.pesapal_cancel_url != null ? credentials.pesapal_cancel_url : "") : "";

                            payfastFailure_url = typeof credentials.payfast_failure_url !== "undefined" ? (credentials.payfast_failure_url != null ? credentials.payfast_failure_url : "") : "";

                            braintree_SuccessUrl = typeof credentials.braintree_success_url !== "undefined" ? (credentials.braintree_success_url != null ? credentials.braintree_success_url : "") : "";
                            braintree_CancelUrl = typeof credentials.braintree_cancel_url !== "undefined" ? (credentials.braintree_cancel_url != null ? credentials.braintree_cancel_url : "") : "";
                            braintree_ApiURL = typeof credentials.braintree_api_url !== "undefined" ? (credentials.braintree_api_url != null ? credentials.braintree_api_url : "") : "";

                            velocity_SuccessUrl = typeof credentials.velocity_success_url !== "undefined" ? (credentials.velocity_success_url != null ? credentials.velocity_success_url : "") : "";
                            velocity_ApiURL = typeof credentials.velocity_api_url !== "undefined" ? (credentials.velocity_api_url != null ? credentials.velocity_api_url : "") : "";
                            velocity_Cancel_Url = typeof credentials.velocity_cancel_url !== "undefined" ? (credentials.velocity_cancel_url != null ? credentials.velocity_cancel_url : "") : "";

                            bolato_SuccessUrl = typeof credentials.boleto_success_url !== "undefined" ? (credentials.boleto_success_url != null ? credentials.boleto_success_url : "") : "";
                            bolato_ApiURL = typeof credentials.boleto_api_url !== "undefined" ? (credentials.boleto_api_url != null ? credentials.boleto_api_url : "") : "";
                            bolato_Cancel_Url = typeof credentials.boleto_cancel_url !== "undefined" ? (credentials.boleto_cancel_url != null ? credentials.boleto_cancel_url : "") : "";
                            boletoFailure_url = typeof credentials.boleto_failure_url !== "undefined" ? (credentials.boleto_failure_url != null ? credentials.boleto_failure_url : "") : "";

                            authorize_SuccessUrl = typeof credentials.authorize_success_url !== "undefined" ? (credentials.authorize_success_url != null ? credentials.authorize_success_url : "") : "";
                            authorize_ApiURL = typeof credentials.authorize_api_url !== "undefined" ? (credentials.authorize_api_url != null ? credentials.authorize_api_url : "") : "";
                            authorize_Cancel_Url = typeof credentials.authorize_cancel_url !== "undefined" ? (credentials.authorize_cancel_url != null ? credentials.authorize_cancel_url : "") : "";

                            hubtel_SuccessUrl = typeof credentials.hubtel_success_url !== "undefined" ? (credentials.hubtel_success_url != null ? credentials.hubtel_success_url : "") : "";
                            hubtel_ApiURL = typeof credentials.hubtel_api_url !== "undefined" ? (credentials.hubtel_api_url != null ? credentials.hubtel_api_url : "") : "";
                            hubtel_Cancel_Url = typeof credentials.hubtel_cancel_url !== "undefined" ? (credentials.hubtel_cancel_url != null ? credentials.hubtel_cancel_url : "") : "";
                            hubtel_FailureUrl = typeof credentials.hubtel_failure_url !== "undefined" ? (credentials.hubtel_failure_url != null ? credentials.hubtel_failure_url : "") : "";

                            cod_ApiURL = typeof credentials.cod_api_url !== "undefined" ? (credentials.cod_api_url != null ? credentials.cod_api_url : "") : "";
                            pu_ApiURL = typeof credentials.pu_api_url !== "undefined" ? (credentials.pu_api_url != null ? credentials.pu_api_url : "") : "";
                            ccPhone_ApiURL = typeof credentials.cc_phone_api_url !== "undefined" ? (credentials.cc_phone_api_url != null ? credentials.cc_phone_api_url : "") : "";
                            ccPhone_ApiURL = typeof credentials.cc_phone_api_url !== "undefined" ? (credentials.cc_phone_api_url != null ? credentials.cc_phone_api_url : "") : "";
                            ccPhone = typeof credentials.cc_phone !== "undefined" ? (credentials.cc_phone != null ? credentials.cc_phone : "") : "";
                            ccPhoneText = typeof credentials.cc_phone_pg_text !== "undefined" ? (credentials.cc_phone_pg_text != null ? credentials.cc_phone_pg_text : "") : "";

                            ewallet_api_url = typeof credentials.ewallet_api_url !== "undefined" ? (credentials.ewallet_api_url != null ? credentials.ewallet_api_url : "") : "";
                            ewallet_success_url = typeof credentials.ewallet_success_url !== "undefined" ? (credentials.ewallet_success_url != null ? credentials.ewallet_success_url : "") : "";
                            ewallet_cancel_url = typeof credentials.ewallet_cancel_url !== "undefined" ? (credentials.ewallet_cancel_url != null ? credentials.ewallet_cancel_url : "") : "";
                            ewallet_failure_url = typeof credentials.ewallet_failure_url !== "undefined" ? (credentials.ewallet_failure_url != null ? credentials.ewallet_failure_url : "") : "";

                            payU_Failure_URL = typeof credentials.payu_money_cancel_url !== "undefined" ? (credentials.payu_money_cancel_url != null ? credentials.payu_money_cancel_url : "") : "";
                        }
                        var tabActive = i == 0 ? " active" : "";

                        if (key == "payu_money")
                            paymentMethods.list.push({
                                "method": "payu",
                                "tabClassId": "payu",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "payUSuccessUrl": payU_SuccessUrl,
                                "payUApiURL": payU_ApiURL,
                                "payuMoneyCancelUrl":payuMoney_Cancel_Url,
                                "payUFailureURL":payU_Failure_URL,
                                "page": pageIdGlobal
                            });
                        else if (key == "paypal")
                            paymentMethods.list.push({
                                "method": "paypal",
                                "tabClassId": "paypal",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "paypalSuccessUrl": paypal_Success_Url,
                                "paypalApiURL":paypalApi_URL,
                                "paypalCancelUrl":paypal_Cancel_Url,
                                "page": pageIdGlobal
                            });
                        else if (key == "braintree")
                            paymentMethods.list.push({
                                "method": "braintree",
                                "tabClassId": "braintree",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "braintreeSuccessUrl": braintree_SuccessUrl,
                                "braintreeCancelUrl": braintree_CancelUrl,
                                "braintreeApiURL": braintree_ApiURL,
                                "page": pageIdGlobal
                            });
                        else if (key == "payfast")
                            paymentMethods.list.push({
                                "method": "payfast",
                                "tabClassId": "payfast",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "payfastSuccessUrl": payfast_Success_Url,
                                "payfastApiURL": payfastApi_URL,
                                "fastCancelUrl":fast_Cancel_Url,
                                "payfastFailure_url":payfastFailure_url,
                                "page": pageIdGlobal
                            });
                        else if (key == "cc_phone")
                            paymentMethods.list.push({
                                "method": "obp",
                                "tabClassId": "obp",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": "cc_phone",
                                "phoneNo": ccPhone,
                                "phoneText": ccPhoneText,
                                "ccPhoneApiURL": ccPhone_ApiURL,
                                "page": pageIdGlobal
                            });
                        else if (key == "cod")
                            paymentMethods.list.push({
                                "method": "cod",
                                "tabClassId": "cod",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "codApiURL": cod_ApiURL,
                                "page": pageIdGlobal
                            });
                        else if (key == "pu" || key == "payAtCounter")
                            paymentMethods.list.push({
                                "method": "pu",
                                "tabClassId": "pu",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "puApiURL": pu_ApiURL,
                                "page": pageIdGlobal
                            });
                        else if (key == "stripe")
                            paymentMethods.list.push({
                                "method": "stripe",
                                "tabClassId": "stripe",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "stripeSuccessUrl": stripe_Success_Url,
                                "stripeApiUrl": stripe_Api_Url,
                                "stripeCancelUrl":stripe_Cancel_Url,
                                "page": pageIdGlobal
                            });
                        else if (key == "mercado")
                            paymentMethods.list.push({
                                "method": "mercado",
                                "tabClassId": "mercado",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "mercadoSuccessUrl": mercado_SuccessUrl,
                                "mercadoApiURL": mercado_ApiURL,
                                "mercadoCancelUrl":mercado_Cancel_Url,
                                "mercadoFailureUrl":mercado_FailureUrl,
                                "page": pageIdGlobal
                            });
                        else if (key == "authorize")
                            paymentMethods.list.push({
                                "method": "authorize",
                                "tabClassId": "authorize",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "authorizeSuccessUrl": authorize_SuccessUrl,
                                "authorizeApiURL": authorize_ApiURL,
                                "authorizeCancelUrl":authorize_Cancel_Url,
                                "page": pageIdGlobal
                            });
                        else if (key == "pesapal")
                            paymentMethods.list.push({
                                "method": "pesapal",
                                "tabClassId": "pesapal",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "pesapalSuccessUrl": pesapal_SuccessUrl,
                                "pesapalApiURL": pesapal_ApiURL,
                                "pesapalCancelUrl":pesapal_Cancel_Url,
                                "page": pageIdGlobal
                            });
                        else if (key == "velocity")
                            paymentMethods.list.push({
                                "method": "velocity",
                                "tabClassId": "velocity",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "velocitySuccessUrl": velocity_SuccessUrl,
                                "velocityApiURL": velocity_ApiURL,
                                "velocityCancelUrl": velocity_Cancel_Url,
                                "page": pageIdGlobal
                            });
                        else if (key == "boleto")
                            paymentMethods.list.push({
                                "method": "boleto",
                                "tabClassId": "boleto",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "bolatoSuccessUrl": bolato_SuccessUrl,
                                "bolatoApiURL": bolato_ApiURL,
                                "bolatoCancelUrl": bolato_Cancel_Url,
                                "boletoFailureUrl": boletoFailure_url,
                                "page": pageIdGlobal
                            });
                        else if (key == "hubtel")
                            paymentMethods.list.push({
                                "method": "hubtel",
                                "tabClassId": "hubtel",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "hubtelSuccessUrl": hubtel_SuccessUrl,
                                "hubtelApiURL": hubtel_ApiURL,
                                "hubtelCancelUrl": hubtel_Cancel_Url,
                                "hubtelFailureUrl": hubtel_FailureUrl,
                                "page": pageIdGlobal
                            });
                        else if (key == "ewallet") {

                            if (item.balanceAmount != undefined) {
                                ewalletModel.setbalanceAmount(parseFloat((item.balanceAmount == "" ? "0" : item.balanceAmount)).toFixed(2))
                                ewalletModel.setcurrencySymbolName(item.currency)
                                ewalletModel.setcurrencySymbol(Appyscript.getcurrencySymbol(item.currency))

                                paymentMethods .list.push({
                                    "method": "ewallet",
                                    "tabClassId": "ewallet",
                                    "tabActive": tabActive,
                                    "label": label,
                                    "paymentMethodKey": key,
                                    "page": pageIdGlobal,
                                    "balanceAmount": item.balanceAmount,
                                    "ewalletApiurl": ewallet_api_url,
                                    "ewalletSuccessUrl": ewallet_success_url,
                                    "ewalletCancelUrl": ewallet_cancel_url,
                                    "ewalletFailureUrl": ewallet_failure_url,

                                });
                            }
                            if (item.authUsingPassword != undefined && item.authUsingPassword != null && (parseInt(item.authUsingPassword) == 1 || item.authUsingPassword == true)) {
                                ewalletModel.settouchidOrfaceidStatus(true);
                            } else {
                                ewalletModel.settouchidOrfaceidStatus(false);
                            }


                        }
                        if (ewalletModel.getewalletAvailableStatus()) {
                            paymentMethods.ewalletbalance = ewalletModel.getbalanceAmount();
                        }

                    }

                    if(pageIdGlobal == "ewallet"){
                        paymentMethods.innerlanguage = false;
                    } else if(pageIdGlobal == "event"){
                        paymentMethods.innerlanguage = false;
                    } else if(pageIdGlobal == "demanddelivery"){
                        paymentMethods.innerlanguage = false;
                    }
                    else{
                        paymentMethods.innerlanguage = false;
                    }
                    var innerlanguagedata = {};
                    innerlanguagedata.expiry_month = pageData.languageSetting.expiry_month_mcom;
                    innerlanguagedata.expiry_year = pageData.languageSetting.expiry_year_mcom;
                    innerlanguagedata.cvv_code = pageData.languageSetting.check_the_back_of_your_credit_card_for_cvv_mcom;
                    innerlanguagedata.place_order = pageData.languageSetting.place_order_mcom;
                    innerlanguagedata.card_holder_name = pageData.languageSetting.card_holder_name_mcom;
                    innerlanguagedata.call_now = pageData.languageSetting.call_now_mcom;
                    innerlanguagedata.confirm = pageData.languageSetting.confirm_ecom;
                    //innerlanguagedata.payment_method = pageData.languageSetting.confirm_ecompayment_method_mcom;
                    //innerlanguagedata.payment_method = pageData.languageSetting.payment_method_mcom;
                    innerlanguagedata.payment_method = pageData.languageSetting.payment_method_food;
                    innerlanguagedata.place_order = pageData.languageSetting.place_order_food;
                    innerlanguagedata.call_now = pageData.languageSetting.call_now_food;
                    innerlanguagedata.confirm = pageData.languageSetting.confirm_food;
                    paymentMethods.innerlanguagedata = innerlanguagedata;

                    console.log("payment   " + JSON.stringify(paymentMethods));
                    setTimeout(function() {
                        $$("#issavecardcheck").hide();
                    }, 2000);
                    $$.get("pages/payment.html", function(template) {
                        Appyscript.hideIndicator();
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(paymentMethods);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                    });
                } else {
                    Appyscript.alert(responseData.error_message, appnameglobal_allpages);
                }
            }, //success ends here
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

/*
 This method is used to register user who is purchansing product.
 */
 var ewalletPaymentTypeObject;
function commonPaymentRegistrationInfo(paymentTypeObject,page) {
    pageIdGlobal = page;
    ewalletPaymentTypeObject = paymentTypeObject;
    var paymentType;
    var a = $$(paymentTypeObject).parent();
    paymentMethodKeyGlobal = a.attr("data-key");
    paymentMethodLableGlobal = a.attr("data-label");

    console.log("paymentMethodKey:: " + paymentMethodKeyGlobal + "       " + paymentMethodLableGlobal);
    if(pageIdGlobal == "ecommerce"){
        if(paymentMethodKeyGlobal == "ewallet") {
            placeorderwith_ewalletMethod(statusGlobal, localStorage.getItem("userId"), billingDataGlobal, shippingDataGlobal ,paymentTypeObject, productList,"","",paymentMethodKeyGlobal, sessionTokenGlobal)
            return;
        }

        if($("#ewalletbalance" + paymentMethodKeyGlobal).length > 0 && $("#ewalletbalance" + paymentMethodKeyGlobal).children().children()[0].checked) {
            ewallet_functionCallAfterImageUpload(statusGlobal,localStorage.getItem("userId"),billingDataGlobal,shippingDataGlobal,paymentTypeObject,productList,"","",paymentMethodKeyGlobal,sessionTokenGlobal);
        }else{
            fileuploadwithcheckout(statusGlobal, localStorage.getItem("userId"), billingDataGlobal, shippingDataGlobal, paymentTypeObject, productList, "", paymentMethodKeyGlobal, "", sessionTokenGlobal);
        }
    }else{
        commonPaymentRegistrationInfo2(paymentTypeObject);
    }
};

var payment_Success_Url;
var paypalApi_URL;
var paymentCancel_Url;
var paymentFailureUrl;
function commonPaymentRegistrationInfo2(paymentTypeObject) {
   // orderIdPageGlobal = orderIdPageGlobal;
    if(pageIdGlobal == "demanddelivery"){
        commonAmount = commonPageJsonDataGlobal.priceDetail.finalAmountToPay;
        commonCurrencyCode = commonPageJsonDataGlobal.priceDetail.currencyCode;
        commonItemName = "demo";
        commonItemQuantity = "2";
    } else if(pageIdGlobal == "ecommerce"){

       commonCurrencyCode =commonPageJsonDataGlobal.currency;
       commonItemName = (commonPageJsonDataGlobal.list[0].productName).replace(/[^a-zA-Z0-9 ]/g, "");
       commonItemQuantity = commonPageJsonDataGlobal.list[0].orderQuantity;
       if($("#ewalletbalance" + paymentMethodKeyGlobal).length > 0 && $("#ewalletbalance" + paymentMethodKeyGlobal).children().children()[0].checked) {
            commonAmount = ewalletRemainingPrice;
       }else{
            commonAmount = commonPageJsonDataGlobal.grandtaotal;
       }
   } else if (pageIdGlobal == "ewallet") {
         commonAmount = commonPageJsonDataGlobal.amount;
         commonCurrencyCode =commonPageJsonDataGlobal.currency;
         commonItemName = commonPageJsonDataGlobal.name;
         commonItemQuantity = "1";
   } else if (pageIdGlobal == "event") {
        commonAmount = commonPageJsonDataGlobal.eTotalAmount;
        commonCurrencyCode = pageData.settings.currencyCode;
        commonItemName = commonPageJsonDataGlobal.eName;
        commonItemQuantity = commonPageJsonDataGlobal.eTicketCount;
   } else if (pageIdGlobal == "accommodation") {
        commonAmount = commonPageJsonDataGlobal.hoteldata[1].finalprice;
        commonCurrencyCode = pageData.setting.currencyCode;
        commonItemName = commonPageJsonDataGlobal.hoteldata[2].hotelguestfname;
        commonItemQuantity = commonPageJsonDataGlobal.hoteldata[1].totalroom;
   } else if (pageIdGlobal == "hyperlocal") {
        commonAmount = commonPageJsonDataGlobal.chargingCost;
        commonCurrencyCode = pageData.setting.currency;
        commonItemName = "Appoinment Booking";
        commonItemQuantity = 1;
   } else if (pageIdGlobal == "dinein") {
        commonAmount = commonPageJsonDataGlobal.grandTotal;
        commonCurrencyCode = commonPageJsonDataGlobal.currency;
        commonItemName = commonPageJsonDataGlobal.vendorNameDineIn;
        commonItemQuantity = commonPageJsonDataGlobal.totalproduct;
    }else if (pageIdGlobal == "foodcourt") {
        commonAmount = commonPageJsonDataGlobal.grandTotal;
        commonCurrencyCode = commonPageJsonDataGlobal.currency;
        commonItemName = commonPageJsonDataGlobal.vendorName;
        commonItemQuantity = commonPageJsonDataGlobal.totalproduct;
    }else if (pageIdGlobal == "formbuilder") {
        commonAmount = commonPageJsonDataGlobal.grandTotal;
        commonCurrencyCode = commonPageJsonDataGlobal.currency;
        commonItemName = commonPageJsonDataGlobal.vendorName;
        commonItemQuantity = commonPageJsonDataGlobal.totalproduct;
    }

//    if  (JSON.parse(localStorage.getItem("customimages"))) {
//        fileuploadwithcheckout(status, userId, billingData, shippingData, paymentTypeObject, productList, creditCardDetail, txnId, "", sessionToken);
//    } else {
//        processwith_ewalletAvailability(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,"", sessionToken);
//    }

    if (localStorage.getItem("userid") == null || localStorage.getItem("userid") == "")
        localStorage.setItem("userId", userId);

    if (paymentTypeObject) {
        if (paymentMethodKeyGlobal == "paypal") {
            var payTypeObj = $$(paymentTypeObject).parent();
            paypal_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paypalApi_URL = payTypeObj.attr("data-apiUrl");
            var commonPaymentMethod = "getPaypalExpressForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal,orderIdPageGlobal,commonAmount,commonCurrencyCode,commonItemName,commonItemQuantity,paypal_Success_Url,paypalApi_URL,paymentCancel_Url, commonPaymentMethod);

        } else if (paymentMethodKeyGlobal == "pesapal") {
             var payTypeObj = $$(paymentTypeObject).parent();
             payment_Success_Url = payTypeObj.attr("data-sucessUrl");
             paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
             paymentApi_URL = payTypeObj.attr("data-apiUrl");
             var commonPaymentMethod = "getPesapalForm";
             Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName , commonItemQuantity, payment_Success_Url, paymentApi_URL,paymentCancel_Url, commonPaymentMethod);

        } else if (paymentMethodKeyGlobal == "payfast") {
             var payTypeObj = $$(paymentTypeObject).parent();
             payment_Success_Url = payTypeObj.attr("data-sucessUrl");
             paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
             paymentApi_URL = payTypeObj.attr("data-apiUrl");
             paymentFailureUrl = payTypeObj.attr("data-failureUrl");
             var commonPaymentMethod = "getPayfastForm";
             Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity,payment_Success_Url,paymentApi_URL,paymentCancel_Url, commonPaymentMethod);

        } else if (paymentMethodKeyGlobal == "payu_money") {
             var payTypeObj = $$(paymentTypeObject).parent();
             payment_Success_Url = payTypeObj.attr("data-sucessUrl");
             paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
             paymentApi_URL = payTypeObj.attr("data-apiUrl");
             paymentFailureUrl = payTypeObj.attr("data-failureUrl");
             var commonPaymentMethod = "getPayuForm";
             Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL,paymentCancel_Url, commonPaymentMethod);

        } else if (paymentMethodKeyGlobal == "mercado") {
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            paymentFailureUrl = payTypeObj.attr("data-failureUrl");
            var commonPaymentMethod = "getMercadoForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL,paymentCancel_Url, commonPaymentMethod);

        }else if (paymentMethodKeyGlobal == "braintree") {
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            var commonPaymentMethod = "braintreeDirectForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL,paymentCancel_Url, commonPaymentMethod);

        }else if (paymentMethodKeyGlobal == "stripe") {
            var payTypeObj = $$(paymentTypeObject).parent();
            stripe_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            stripeApi_URL = payTypeObj.attr("data-apiUrl");
            var commonPaymentMethod = "getStripeForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal,orderIdPageGlobal,commonAmount,commonCurrencyCode,commonItemName,commonItemQuantity,stripe_Success_Url,stripeApi_URL, paymentCancel_Url, commonPaymentMethod);

        }else if (paymentMethodKeyGlobal == "velocity") {
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            var commonPaymentMethod = "velocityForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal,orderIdPageGlobal,commonAmount,commonCurrencyCode,commonItemName,commonItemQuantity,payment_Success_Url,paymentApi_URL, paymentCancel_Url, commonPaymentMethod);

        }else if (paymentMethodKeyGlobal == "boleto") {
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            paymentFailureUrl = payTypeObj.attr("data-failureUrl");
            var commonPaymentMethod = "getBoletoForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL, paymentCancel_Url, commonPaymentMethod);

        }else if (paymentMethodKeyGlobal == "cc_phone") {
            var payTypeObj = $$(paymentTypeObject).parent();
            var sellerPhoneNo = payTypeObj.attr("data-phoneNo");
            payment_Success_Url = "";
            paymentCancel_Url = "";
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            var commonPaymentMethod = "getCcPhoneForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL, paymentCancel_Url, commonPaymentMethod);
            Appyscript.call(sellerPhoneNo);

        } else if (paymentMethodKeyGlobal == "cod") {
            //commonNativeCallbackSuccess("success");
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            var commonPaymentMethod = "getCodForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL, paymentCancel_Url, commonPaymentMethod);

        }else if (paymentMethodKeyGlobal == "pu" || paymentMethodKeyGlobal == "payAtCounter") {
            //commonNativeCallbackSuccess("success");
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            var commonPaymentMethod = "getPuForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL, paymentCancel_Url, commonPaymentMethod);

        } else if (paymentMethodKeyGlobal == "authorize") {
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            var commonPaymentMethod = "getAuthorizeForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL, paymentCancel_Url, commonPaymentMethod);

        }else if (paymentMethodKeyGlobal == "hubtel") {
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            paymentFailureUrl = payTypeObj.attr("data-failureUrl");
            var commonPaymentMethod = "getHubtelForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL, paymentCancel_Url, commonPaymentMethod);

        }else if (paymentMethodKeyGlobal == "ewallet") {
            var payTypeObj = $$(paymentTypeObject).parent();
            payment_Success_Url = payTypeObj.attr("data-sucessUrl");
            paymentCancel_Url = payTypeObj.attr("data-cancelUrl");
            paymentApi_URL = payTypeObj.attr("data-apiUrl");
            paymentFailureUrl = payTypeObj.attr("data-failureUrl");
            var commonPaymentMethod = "getEwalletForm";
            Appyscript.commonPaymentGatwayMethod(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL, paymentCancel_Url, commonPaymentMethod);

        }
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
    }
};

/****************************************/
        // Common PAYMENT GATWAY //
/****************************************/
Appyscript.commonPaymentGatwayMethod = function(pageIdGlobal, orderIdPageGlobal, commonAmount, commonCurrencyCode, commonItemName, commonItemQuantity, payment_Success_Url, paymentApi_URL, paymentCancel_Url, commonPaymentMethod) {
    var orderId = orderIdPageGlobal;
    var pageId = pageIdGlobal;
    var amount = commonAmount;
    var currency = commonCurrencyCode;
    var itemName = commonItemName;
    var itemQuantity = commonItemQuantity;
    var orderDesc = "demo";
    var pInfo = "Abc";
    var paymentApiURL = paymentApi_URL;
    var paymentSuccessUrl = payment_Success_Url;
    var paymentCancelUrl = paymentCancel_Url;
    var commonPaymentMethod = commonPaymentMethod;
    var commonPaymentUrl = site_url + paymentApiURL;
    var postCommonData = '{"method":"' + commonPaymentMethod + '","appId":"' + appId + '","pagename" : "' + pageId + '","pageId":"' + globalPageIdentifie + '", "itemName" :"' + itemName + '","pname" :"' + itemName + '","quantity" :"' + itemQuantity + '","amount" :"' + amount + '","orderDesc" :"' + orderDesc + '","orderId":"' + orderId + '","currency":"' + currency + '","fname":"' + localStorage.getItem("username") + '","mobile":"' + localStorage.getItem("phone") + '","email":"' + localStorage.getItem("email") + '","pinfo":"'+ pInfo +'","userId":"'+ localStorage.getItem("userId") +'"}';
    console.log("postData commonPaymentMethod  " + postCommonData);
    Appyscript.showIndicator();
    $$.ajax({
        url: commonPaymentUrl,
        data: postCommonData,
        type: 'post',
        async: true,
        //321 headers: {'accessToken': deviceEncryptedToken},
        success: function(getData) {
            getData = JSON.parse(getData);
            console.log("commonPaymentMethod   " + JSON.stringify(getData));
            if (getData.error_message == "Success") {
                //Appyscript.hideIndicator();
                if (paymentMethodKeyGlobal == "cod" || paymentMethodKeyGlobal == "cc_phone" || paymentMethodKeyGlobal == "pu" || paymentMethodKeyGlobal == "payAtCounter" || paymentMethodKeyGlobal == "ewallet") {
                    setTimeout(function() {
                        commonNativeCallbackSuccess("success");
                    }, 2000);
                }
                else{
                    Appyscript.commonPaymentWebview(getData.html_form, pageId, data.appData.appName, orderId, paymentSuccessUrl, paymentCancelUrl, paymentFailureUrl);
                }

            } else {
                Appyscript.alert(getData.error_message, appnameglobal_allpages);
                Appyscript.hideIndicator();
            }
        },
        function(err) {
            Appyscript.hideIndicator();
            Appyscript.alert(tempLang.SORRY_REQUEST_CANNOT_BE_PROCESSED, appnameglobal_allpages);
        }
    });
};

/*
    To open Paypal html data in web view
    Created by:
*/
Appyscript.commonPaymentWebview = function(htmlData, pageType, pageTitle, order_id, paypalSuccessUrl, paymentCancelUrl, paymentFailureUrl) {
    if (isOnline()) {
        if (pagetitle == undefined || pagetitle == null || pagetitle == '') {
            pagetitle = "Payment";
        }
        var tmp_orderId = (order_id == undefined || order_id == "undefined") ? "" : order_id;
        AppyPieNative.commonPaymentWebview(htmlData, pageType, pagetitle, tmp_orderId, paypalSuccessUrl, paymentCancelUrl, paymentFailureUrl);
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};


/************
//----------------     Common Native Callback Function
************/
function commonNativeCallbackSuccess(success) {
    var paymentStatus = success;
    Appyscript.showIndicator();
    if (paymentStatus.toLowerCase() == "success") {
        if (pageIdGlobal == "demanddelivery") {
            dDUpdateStatusAfterPayment("success", "");
        }else if (pageIdGlobal == "ecommerce") {
            updateStatusFromNativeSide("Success", "");
        }else if (pageIdGlobal == "ewallet") {
            openinvoicePage("success",commonAmount);
        }else if(pageIdGlobal == "event"){
            loadTicket(orderIdPageGlobal);
        }else if(pageIdGlobal == "accommodation"){
            Appyscript.hotelConfirmation(orderIdPageGlobal, "");
        }else if(pageIdGlobal == "hyperlocal"){
            hyperlocal_UpdateStatusAfterPayment("success","");
        }else if(pageIdGlobal == "dinein"){
            DineInUpdateStatusFromNativeSide("success",orderIdPageGlobal);
            thanksjson.paymentMethodlabel = paymentMethodLableGlobal;
        }else if(pageIdGlobal == "foodcourt"){
            foodCourtUpdateStatusFromNativeSide("success",orderIdPageGlobal);
            thanksjson.paymentMethodlabel = paymentMethodLableGlobal;
        }

    }else{
        Appyscript.hideIndicator();
        Appyscript.alert("Payment Failed", appnameglobal_allpages);
        return false;
    }

    //var commonApiUrl = site_url+"/webservices/CommonPaymentGateway/UpdateWebservice.php"
    /*if (paymentStatus.toLowerCase() == "success") {
        var postData = '{"method":"updateOldTables","appId":"' + localStorage.getItem("appid") + '","pagename":"' + pageIdGlobal + '","orderId":"' + orderIdPageGlobal + '","paymentGatewayType":"' + paymentMethodKeyGlobal + '"}';
        Appyscript.showIndicator();
        $$.ajax({
            url: commonApiUrl,
            data: postData,
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            success: function(result) {
                Appyscript.hideIndicator();
                var result = JSON.parse(result);
                if (result.error_message == "Success") {
                     if (pageIdGlobal == "demanddelivery") {
                        dDUpdateStatusAfterPayment("success", "");
                     }else if (pageIdGlobal == "ecommerce") {
                        updateStatusFromNativeSide("Success", "");
                     }else if (pageIdGlobal == "ewallet") {
                         prepareToken();
                     }else if(pageIdGlobal == "event"){
                        ce_paymentCallBack();
                     }else if(pageIdGlobal == "accommodation"){
                        Appyscript.hotelConfirmation(orderIdPageGlobal, "");
                     }

                } else {
                    Appyscript.alert(pageData.languageSetting.Payment_Status_Failed, appnameglobal_allpages);
                    //prepareToken();
                }
            },
            error: function() {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                return false;
            }
        });
    }else{
        if (pageIdGlobal == "demanddelivery") {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            return false;
        }
    }*/
};


