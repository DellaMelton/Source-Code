var pointDuration, pointDistanceKm;
var demandDeliverylat;
var demandDeliverylong;
var demandDeliveryPickupLat;
var demandDeliveryPickuplong;
var demandDeliveryDropLat;
var demandDeliveryDropLong;
var demandDeliveryData = {};
var totalBookingDate = 0;
var pagelengthBack = 0;
var dDCalenderopen = '';
var dDPickFromFrtails;
var dDShippingType;
var dDdropToDetail;
var applyTextCoupon = 0;
var app_id = '';
var baseurl;
var dDOrderIdPageGlobal;
var paymentTypeObjectGlobal;
var paymentMethodKeyGlobal;
var paymentMethodLableGlobal;
var userIdGlobal;

/***
    This function is used to Schedule edit profile
***/
function dDOpenPriceDetails() {
    $$.get("popups/demandDelivery-priceride.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(demandDeliveryData);
        Appyscript.popup(html);
    });
};

/***
    This function is used to call Home page
***/

Appyscript.openDemandDelivery = function() {

    /* if (localStorage.getItem("email") == null) {
         Appyscript.loginPage('true');
         return;
     }*/

    localStorage.setItem("bookLaterKey", "");
    localStorage.setItem("rescheduleKey", "");
    //demandDeliveryData.currentPickLoc = pageData.languageSetting.Enter_Pickup_Location;
    demandDeliveryData.pageTitle = pageData.pageTitle;
    demandDeliveryData.showSideMenu = pageData.generalSetting.showhidemenu;
    openPage(pageId, demandDeliveryData);
};


/***
    This function is used to call order history page
***/
var dDOrderStatusKey;

function dDOrderHistory() {
    var postdata = '{"method":"getOrdersDetail","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","appUserId":' + localStorage.getItem("userid") + ',"lang":"' + data.appData.lang + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                for (var i = 0; i < jsondata.data.length; i++) {
                    if (jsondata.data[i].orderStatus == 1) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Dd_Waiting_For_Driver;
                    } else if (jsondata.data[i].orderStatus == 2) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Accepted_By_Admin;
                    } else if (jsondata.data[i].orderStatus == 3) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Accepted_By_Delivery_Boy;
                    } else if (jsondata.data[i].orderStatus == 4 || jsondata.data[i].orderStatus == 5) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Picked_Up;
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Shipped;
                    } else if (jsondata.data[i].orderStatus == 6) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.delivered;
                    } else if (jsondata.data[i].orderStatus == 7) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Canceled_User;
                    } else if (jsondata.data[i].orderStatus == 8) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Canceled_By_Admin;
                    }
                    demandDeliveryData = jsondata.data[i];
                }

                //console.log("dataMY getOrdersDetail:- " + JSON.stringify(demandDeliveryData));
                Appyscript.hideIndicator();
                $$.get("pages/demanddelivery-Orderhistory.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(jsondata);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });
                Appyscript.popupClose();
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

function dDCancelOrder(orderId, a) {
    var index = $$(a).attr("index");
    var postdata = '{"method":"cancelOrder","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","orderId":"' + orderId + '","lang":"' + data.appData.lang + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                console.log("dataMY cancelOrder:- " + JSON.stringify(jsondata));
                Appyscript.hideIndicator();
                if (jsondata.status == 1) {
                    //$$("#inProgressDD"+index).remove();
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
                    dDOrderHistoryAllOrders();
                } else {
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
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
};

function dDCancelOrderAfterConfirmation(orderId) {
    var postdata = '{"method":"cancelOrder","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","orderId":"' + orderId + '","lang":"' + data.appData.lang + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                console.log("dataMY cancelOrder:- " + JSON.stringify(jsondata));
                Appyscript.hideIndicator();
                if (jsondata.status == 1) {
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
                } else {
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
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
};

Appyscript.onPageInit('demanddelivery-orderHistory', function(page) {
    $$(".inProgress").addClass("active");
    $$(".inProgressTab").show();
    $$(".allOrdersTab").hide();
    $$(".inProgress").click(function() {
        $$(".inProgress").addClass("active");
        $$(".allOrders").removeClass("active");
        $$(".inProgressTab").show();
        $$(".allOrdersTab").hide();
    });
    $$(".allOrders").click(function() {
        $$(".allOrders").addClass("active");
        $$(".inProgress").removeClass("active");
        $$(".inProgressTab").hide();
        $$(".allOrdersTab").show();
    });
});

function dDOrderHistoryAllOrders() {
    var postdata = '{"method":"getOrdersDetail","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","appUserId":' + localStorage.getItem("userid") + ',"lang":"' + data.appData.lang + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                for (var i = 0; i < jsondata.data.length; i++) {
                    if (jsondata.data[i].orderStatus == 1) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Dd_Waiting_For_Driver;
                    } else if (jsondata.data[i].orderStatus == 2) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Accepted_By_Admin;
                    } else if (jsondata.data[i].orderStatus == 3) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Accepted_By_Delivery_Boy;
                    } else if (jsondata.data[i].orderStatus == 4 || jsondata.data[i].orderStatus == 5) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Picked_Up;
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Shipped;
                    } else if (jsondata.data[i].orderStatus == 6) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.delivered;
                    } else if (jsondata.data[i].orderStatus == 7) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Canceled_User;
                    } else if (jsondata.data[i].orderStatus == 8) {
                        jsondata.data[i].dDOrderStatusKey = pageData.languageSetting.Order_Is_Canceled_By_Admin;
                    }
                    demandDeliveryData = jsondata.data[i];
                }

                //console.log("dataMY getOrdersDetail:- " + JSON.stringify(demandDeliveryData));
                Appyscript.hideIndicator();
                $$.get("pages/demanddelivery-Orderhistory.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(jsondata);
                    mainView.router.reloadContent(html);
                });
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

/***
    This function is used to call Order Status
***/
var backpage;
var vehicleInfoIcon;

function dDOrderStatus(orderId, dDOrderStatusKey, addedon, orderStatus) {

    //orderStatusData.orderId = orderId;
    var postdata = '{"method":"getOrderDeliveryInDetail","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","appUserId":' + localStorage.getItem("userid") + ',"orderId":"' + orderId + '","lang":"' + data.appData.lang + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                jsondata = jsondata.data[0];
                //vehicleInfoIcon = jsondata.data[0].vehicleInfo.icon;

                if (jsondata.orderStatus == 1) {
                    jsondata.showvalue = true;
                } else if (jsondata.orderStatus == 2) {
                    jsondata.dDOrderStatusKeyPro = true;
                    jsondata.dDOrderStatusKeyAd = true;
                } else if (jsondata.orderStatus == 3) {
                    jsondata.dDOrderStatusKeyPro = true;
                    jsondata.dDOrderStatusKeyAd = true;
                    jsondata.dDOrderStatusKeyDBoy = true;
                } else if (jsondata.orderStatus == 4 || jsondata.orderStatus == 5) {
                    jsondata.dDOrderStatusKeyPro = true;
                    jsondata.dDOrderStatusKeyAd = true;
                    jsondata.dDOrderStatusKeyDBoy = true;
                    jsondata.dDOrderStatusKeyPicked = true;
                    jsondata.dDOrderStatusKeyShiped = true;
                } else if (jsondata.orderStatus == 6) {
                    jsondata.dDOrderStatusKeyPro = true;
                    jsondata.dDOrderStatusKeyAd = true;
                    jsondata.dDOrderStatusKeyDBoy = true;
                    jsondata.dDOrderStatusKeyPicked = true;
                    jsondata.dDOrderStatusKeyShiped = true;
                    jsondata.dDOrderStatusKeyDelivered = true;
                }
                for (var i = 0; i < pageData.companyInfo.contactSupport.length; i++) {
                    if (pageData.companyInfo.contactSupport[i].contactType == "phone") {
                        jsondata.contactSupNumber = pageData.companyInfo.contactSupport[i].contactValue;
                    }
                };

                console.log("dataMY getOrderDeliveryInDetail:- " + JSON.stringify(jsondata));
                Appyscript.hideIndicator();
                $$.get("pages/demanddelivery-Orderstatus.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(jsondata);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                    if (jsondata.orderStatus == 1) {
                        $$(".book").addClass("active");
                    } else if (jsondata.orderStatus == 3) {
                        $$(".book").addClass("active");
                        $$(".picupWay").addClass("active");
                        setTimeout(function() {
                            var demandDeliverylat = jsondata.deliveryBoyInfo.latitude;
                            var demandDeliverylong = jsondata.deliveryBoyInfo.longitude;
                            var map = new google.maps.Map(document.getElementById('mapPickup'), {
                                center: new google.maps.LatLng(demandDeliverylat, demandDeliverylong),
                                zoom: 7,
                            });
                        }, 500);
                    } else if (jsondata.orderStatus == 4 || jsondata.orderStatus == 5) {
                        $$(".book").addClass("active");
                        $$(".picupWay").addClass("active");
                        $$(".picupDone").addClass("active");
                        $$(".deliverypWay").addClass("active");
                        $$("#mapPickup").hide();
                        setTimeout(function() {
                            var demandDeliverylat = jsondata.deliveryBoyInfo.latitude;
                            var demandDeliverylong = jsondata.deliveryBoyInfo.longitude;
                            var map = new google.maps.Map(document.getElementById('mapPickupDel'), {
                                center: new google.maps.LatLng(demandDeliverylat, demandDeliverylong),
                                zoom: 7,
                                draggable: false,
                                disableDefaultUI: true,
                            });
                        }, 500);
                    } else if (jsondata.orderStatus == 6) {
                        $$(".book").addClass("active");
                        $$(".picupWay").addClass("active");
                        $$(".picupDone").addClass("active");
                        $$(".deliverypWay").addClass("active");
                        $$(".deliveryDone").addClass("active");
                        $$("#mapPickup").hide();
                    }
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
};

function dDContactSupport(contactSupNumber) {
    Appyscript.call(contactSupNumber);
}

var contactSupNumber;
var emailCon;

function dDSupportContact() {
    for (var i = 0; i < pageData.companyInfo.contactSupport.length; i++) {
        if (pageData.companyInfo.contactSupport[i].contactType == "phone") {
            contactSupNumber = pageData.companyInfo.contactSupport[i].contactValue;
            //Appyscript.call(contactSupNumber);
        } else if (pageData.companyInfo.contactSupport[i].contactType == "email") {
            emailCon = pageData.companyInfo.contactSupport[i].contactValue;
            //Appyscript.sendMail(emailCon, "Help", "");
        }
    }

    Appyscript.modal({
        title: pageData.languageSetting.Contact_Support,
        verticalButtons: true,
        buttons: [{
                text: pageData.languageSetting.Dd_Phone_Number,
                onClick: function() {
                    Appyscript.call(contactSupNumber);
                }
            },
            {
                text: pageData.languageSetting.Dd_Email,
                onClick: function() {
                    Appyscript.sendMail(emailCon, "Help", "");
                }
            },
            {
                text: pageData.languageSetting.cancel_social_network,
                onClick: function() {
                    return;
                }
            }
        ]
    });
};

/*********
        This function is used to call report issue.
**********/
var orderIssueIdd;

function dDReportIssue(dDOrderId) {
    orderIssueIdd = dDOrderId;
    $$.get("pages/demanddelivery-Report.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(demandDeliveryData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
};

/*********
        This function is used to call Submit report issue.
**********/

function dDSubmitReview() {
    $$(".error").removeClass("error");
    var dDSubject = $$("#dDSubject").val();
    var dDComment = $$("#dDComment").val();

    if (!demandDeliveryValidate(dDSubject, "subject")) {
        $$("#dDSubject").addClass("error");
        return;
    };
    if (!demandDeliveryValidate(dDComment, "comment")) {
        $$("#dDComment").addClass("error");
        return;
    };
    var postdata = '{"method":"createIssue","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","appUserId":"' + localStorage.getItem("userid") + '","appUserEmail":"' + localStorage.getItem("email") + '","appUserName":"' + localStorage.getItem("username") + '","appUserPhone":"' + localStorage.getItem("phone") + '", "orderId":"' + orderIssueIdd + '","deliveryBoyName":"","deliveryBoyEmail":"","deliveryBoyPhone":"","reportSubject":"' + dDSubject + '","reportMsg":"' + dDComment + '","lang":"' + data.appData.lang + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: postdata,
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                console.log("dataMY createIssue:- " + JSON.stringify(jsondata));
                Appyscript.hideIndicator();
                if (jsondata.status == 1) {
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
                    mainView.router.back();
                } else {
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
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
};
/***
    This function is used to call  Order Status
***/
var orderStatusData;

function dDOrderDetails(orderId, dDOrderStatusKey, addedon, orderStatus, pickupFromDetailAddress, pickupFromDetailName, pickupFromDetailPhone, dropToDetailAddress, dropToDetailName, dropToDetailPhone, orderDeliveredDate, vehicleInfoName, finalAmountToPay, paymentDetail, orderPickedDate, shippingType, shippingTypeContent, shippingTypeValue, currencySymbolInfo, deliveryBoyInfoFname, deliveryBoyInfoLname) {
    console.log("fff  " + shippingType);
    orderStatusData = {};
    orderStatusData.orderId = orderId;
    orderStatusData.dDOrderStatusKey = dDOrderStatusKey;
    orderStatusData.addedon = addedon;
    //orderStatusData.orderStatus = orderStatus;
    orderStatusData.pickupFromDetailAddress = pickupFromDetailAddress.replace(/,/g, "");
    orderStatusData.pickupFromDetailName = pickupFromDetailName;
    orderStatusData.pickupFromDetailPhone = pickupFromDetailPhone;
    orderStatusData.dropToDetailAddress = dropToDetailAddress.replace(/,/g, "");
    orderStatusData.dropToDetailName = dropToDetailName;
    orderStatusData.dropToDetailPhone = dropToDetailPhone;
    orderStatusData.orderDeliveredDate = orderDeliveredDate;
    orderStatusData.vehicleInfoName = vehicleInfoName;
    orderStatusData.finalAmountToPay = finalAmountToPay;
    orderStatusData.paymentDetail = paymentDetail;
    orderStatusData.orderPickedDate = orderPickedDate;
    orderStatusData.shippingType = shippingType;
    orderStatusData.shippingTypeContent = shippingTypeContent;
    orderStatusData.shippingTypeValue = shippingTypeValue;
    orderStatusData.deliveryBoyInfoFname = deliveryBoyInfoFname;
    orderStatusData.deliveryBoyInfoLname = deliveryBoyInfoLname;
    orderStatusData.currencySymbolInfo = currencySymbolInfo;

    if (orderStatus == 1) {
        orderStatusData.dDOrderStatusKey = pageData.languageSetting.Dd_Waiting_For_Driver;
    } else if (orderStatus == 2) {
        orderStatusData.dDOrderStatusKey = pageData.languageSetting.Order_Is_Accepted_By_Admin;
    } else if (orderStatus == 3) {
        orderStatusData.dDOrderStatusKey = pageData.languageSetting.Order_Is_Accepted_By_Delivery_Boy;
    } else if (orderStatus == 4 || jsondata.data[i].orderStatus == 5) {
        orderStatusData.dDOrderStatusKey = pageData.languageSetting.Order_Is_Picked_Up;
        orderStatusData.dDOrderStatusKey = pageData.languageSetting.Order_Is_Shipped;
    } else if (orderStatus == 6) {
        orderStatusData.dDOrderStatusKey = pageData.languageSetting.delivered;
    } else if (orderStatus == 7) {
        orderStatusData.dDOrderStatusKey = pageData.languageSetting.Order_Canceled_User;
    } else if (orderStatus == 8) {
        orderStatusData.dDOrderStatusKey = pageData.languageSetting.Order_Is_Canceled_By_Admin;
    }

    console.log("orderStatusData " + JSON.stringify(orderStatusData));

    $$.get("pages/demanddelivery-Orderdetails.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(orderStatusData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
};



/***
    This function is used to call Fill Your Details page
***/
var dDScheduleTime;
var dDScheduleDate;
var sName;
var sPhone;
var sEmailId;

function dDBookNow() {
    if ($$("#dDSlotTime").val() != undefined || $$("#dDSlotTime").val() != null) {
        dDScheduleTime = $$("#dDSlotTime").val();
        dDScheduleDate = customDate.getTime();
    }
    if (localStorage.getItem("rescheduleKey") != "scheduleBooking") {
        demandDeliveryData.shippingType = pageData.options.objectType;
        demandDeliveryData.contentType = pageData.options.contentType;
        console.log("demandDeliveryData**  " + JSON.stringify(demandDeliveryData));
        $$.get("pages/demanddelivery-Filldetail.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(demandDeliveryData);
            mainView.router.load({
                content: html,
                animatePages: true
            });
            $$("#dDContentType").hide();
            $$("#dDContentDocument").hide();
            if (localStorage.getItem("username") != null || localStorage.getItem("username") != undefined) {
                $$("#sName").val(localStorage.getItem("username"));
                sName = localStorage.getItem("username");
            } else {
                sName = $$("#sName").val();
            }
            if (localStorage.getItem("phone") != null || localStorage.getItem("phone") != undefined) {
                $$("#sPhone").val(localStorage.getItem("phone"));
                sPhone = localStorage.getItem("phone");
            } else {
                sPhone = $$("#sPhone").val();
            }
            if (localStorage.getItem("email") != null || localStorage.getItem("email") != undefined) {
                $$("#sEmailId").val(localStorage.getItem("email"));
                sEmailId = localStorage.getItem("email");
                $$("#sEmailId").hide();
            } else {
                sEmailId = $$("#sEmailId").val();
                $$("#sEmailId").show();
            };
        });
    } else {
        dDOrderId = orderRescheduleIdd;
        var postdata = '{"method":"rescheduleOrder","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","bookLater":' + 1 + ',"bookLaterDate":"' + dDScheduleDate + '","bookLaterSlot":"' + dDScheduleTime + '", "orderId":"' + orderRescheduleIdd + '","lang":"' + data.appData.lang + '"}';
        console.log("rescheduleaOrder:::  " + postdata);
        if (isOnline()) {
            Appyscript.showIndicator();
            $$.ajax({
                url: baseurl,
                data: postdata,
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(data, textStatus) {
                    jsondata = JSON.parse(data);
                    console.log("dataMY rescheduleOrder:- " + JSON.stringify(jsondata));
                    Appyscript.hideIndicator();
                    if (jsondata.status == 1) {
                        CommonPaymentgatwayFunction(dDOrderId,pageId,demandDeliveryData,pageIdentifie);
                    } else {
                        Appyscript.alert(jsondata.msg, appnameglobal_allpages);
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
};

function dDShipmentTypeText() {
    var selectBox = document.getElementById("shipment-type");
    var dDshimentType = $$("#shipment-type").val();
    if (selectBox.selectedIndex == 2) {
        $$("#dDContentType").show();
        $$("#dDContentDocument").show();
    } else if (selectBox.selectedIndex == 1) {
        $$("#dDContentType").hide();
        $$("#dDContentDocument").show();
    }
};

/***
    This function is used to call Confirm Booking Payment
***/
function dDConfirmBookingPayment() {

    //     if(localStorage.getItem("emailid") == ""){
    //         sEmailId = $$("#sEmailId").val();
    //     }
    //     else if (localStorage.getItem("emailid") == null || localStorage.getItem("emailid") == undefined) {
    //         sEmailId = $$("#sEmailId").val();
    //     } else {
    //          $$("#sEmailId").val(localStorage.getItem("emailid"));
    //
    //     }
    $$(".error").removeClass("error");
    sEmailId = $$("#sEmailId").val();
    sName = $$("#sName").val();
    sPhone = $$("#sPhone").val();
    var rName = $$("#rName").val();
    var rPhone = $$("#rPhone").val();
    var rAddress = $$("#rAddress").val();
    var sAddress = $$("#sAddress").val();
    var dDshimentType = $$("#shipment-type").val();
    if (sPhone == "") {
        sName = $$("#sName").val();
        sPhone = $$("#sPhone").val();
    }

    var dDContentType = [];
    $("#content-type :selected").map(function(i, el) {
        dDContentType.push($(el).val());
    });
    console.log("dDContentType  -------   :" + dDContentType);
    var declaredValue = $$("#sdocument").val();
    // random number findvar newdate=new Date().getTime();
    var newdate = new Date().getTime();
    var dDOrderId = 'ap' + newdate;
    console.log("dDOrderId  " + dDOrderId);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dDdateTime = date + ' ' + time;

    if (!demandDeliveryValidate(rName, "name")) {
        $$("#rName").addClass("error");
        return;
    };
    if (!demandDeliveryValidate(rPhone, "phone")) {
        $$("#rPhone").addClass("error");
        return;
    };
    if (!demandDeliveryValidate(rAddress, "address")) {
        $$("#rAddress").addClass("error");
        return;
    };
    if (!demandDeliveryValidate(sName, "name")) {
        $$("#sName").addClass("error");
        return;
    };
    if (!demandDeliveryValidate(sPhone, "phone")) {
        $$("#sPhone").addClass("error");
        return;
    };
    if (!demandDeliveryValidate(sAddress, "address")) {
        $$("#sAddress").addClass("error");
        return;
    };
    if (!demandDeliveryValidate(sEmailId, "email")) {
        $$("#sEmailId").addClass("error");
        return;
    };
    if (!demandDeliveryValidate(dDshimentType, "shiptype")) {
        $$("#dDshimentType").addClass("error");
        return;
    };

    dDPickFromFrtails = {
        "address": dDAddressPickUp,
        "latitude": demandDeliveryPickupLat,
        "longitude": demandDeliveryPickuplong,
        "senderName": sName,
        "senderMobileNo": sPhone,
        "pickupAddress": sAddress,
        "senderEmail": sEmailId,
        "estimatedPickupTiming": ""
    };
    dDdropToDetail = {
        "address": dDAddressDrop,
        "latitude": demandDeliveryDropLat,
        "longitude": demandDeliveryDropLong,
        "recieverName": rName,
        "recieverMobileNo": rPhone,
        "dropAddress": rAddress,
        "estimatedDropTiming": ""
    };
    dDShippingType = {
        "type": dDshimentType,
        "content": dDContentType,
        "declaredValue": declaredValue
    };
    console.log("dDPickFromFrtails :::: " + JSON.stringify(dDPickFromFrtails));
    console.log("dDdropToDetail :::: " + JSON.stringify(dDdropToDetail));
    console.log("dDShippingType :::: " + JSON.stringify(dDShippingType));

    var dDappUserId, dDappUserEmail, dDappUserName;

    if (localStorage.getItem("userid") != null) {
        dDappUserId = localStorage.getItem("userid");
    } else {
        dDappUserId = "";
    };

    if (localStorage.getItem("email") != null) {
        dDappUserEmail = localStorage.getItem("email");
    } else {
        dDappUserEmail = "";
    };

    if (localStorage.getItem("username") != null) {
        dDappUserName = localStorage.getItem("username");
    } else {
        dDappUserName = "";
    };

    var postdata;
    if (localStorage.getItem("bookLaterKey") != "map_Show") {
        postdata = '{"method":"placeOrder","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","appUserId":"' + dDappUserId + '","appUserEmail":"' + dDappUserEmail + '","appUserName": "' + dDappUserName + '","appName": "' + localStorage.getItem("appName") + '", "orderId":"' + dDOrderId + '","pickFromDetail":' + JSON.stringify(dDPickFromFrtails) + ',"dropToDetail":' + JSON.stringify(dDdropToDetail) + ',"distanceTravelToDeliveryBoy":"' + pointDistanceKm + '","priceDetail":' + JSON.stringify(demandDeliveryData.priceDetail) + ',"shippingType":' + JSON.stringify(dDShippingType) + ',"vehicleInfo":' + JSON.stringify(demandDeliveryData.vehicleInfo) + ',"bookLater":' + 0 + ',"bookLaterDate":"' + dDdateTime + '","bookLaterSlot":"","paymentStatus":"pending","autoConfirmBooking":' + pageData.generalSetting.autoconfirmbooking + ',"lang":"' + data.appData.lang + '","deviceId":"' + Appyscript.getDeviceId() + '","deviceToken":"' + Appyscript.getDeviceToken() + '","deviceType":"android"}';
    } else {
        postdata = '{"method":"placeOrder","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","appUserId":"' + dDappUserId + '","appUserEmail":"' + dDappUserEmail + '","appUserName": "' + dDappUserName + '","appName": "' + localStorage.getItem("appName") + '", "orderId":"' + dDOrderId + '","pickFromDetail":' + JSON.stringify(dDPickFromFrtails) + ',"dropToDetail":' + JSON.stringify(dDdropToDetail) + ',"distanceTravelToDeliveryBoy":"' + pointDistanceKm + '","priceDetail":' + JSON.stringify(demandDeliveryData.priceDetail) + ',"shippingType":' + JSON.stringify(dDShippingType) + ',"vehicleInfo":' + JSON.stringify(demandDeliveryData.vehicleInfo) + ',"bookLater":' + 1 + ',"bookLaterDate":"' + dDScheduleDate + '","bookLaterSlot":"' + dDScheduleTime + '","paymentStatus":"pending","autoConfirmBooking":' + pageData.generalSetting.autoconfirmbooking + ',"lang":"' + data.appData.lang + '","deviceId":"' + Appyscript.getDeviceId() + '","deviceToken":"' + Appyscript.getDeviceToken() + '","deviceType":"android"}';
    }


    console.log("postDataOrder:::  " + postdata);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: postdata,
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                console.log("dataMY placeOrder:- " + JSON.stringify(jsondata));
                Appyscript.hideIndicator();
                if (jsondata.status == 1) {
                    AppyTemplate.global.loginCheck = 1;
                    if (localStorage.getItem("email") == null) {
                        localStorage.setItem("userid", jsondata.appUserId);
                        localStorage.setItem("email", jsondata.appUserEmail);
                        localStorage.setItem("emailid", jsondata.appUserEmail);
                        localStorage.setItem("username", jsondata.appUserName);
                        localStorage.setItem("username", sName);
                        localStorage.setItem("phone", sPhone);
                        $$("#sEmailId").hide();
                    }

                    CommonPaymentgatwayFunction(dDOrderId,pageId,demandDeliveryData,pageIdentifie);

                } else if (jsondata.userStatus = 2) {
                    Appyscript.confirmation(pageData.languageSetting.DD_EMAIL_ID_EXISTS_GUEST_LOGIN_MSG, "", pageData.languageSetting.ok_mcom, pageData.languageSetting.cancel_social_network,
                        function() {
                            Appyscript.loginPage('true');
                            return;
                        },
                        function() {
                            Appyscript.hideIndicator();
                        }
                    );
                } else {
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
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
};

/********
        This function is used to call Payment Page
********/
var dDOrderIdPage;
/*function dDConfirmBookingPaymentPage(dDOrderId) {
    dDOrderIdPage = dDOrderId;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postData = '{"method":"getPaymentGatewayConfigNew","appId":"' + appId + '","pageName":"' + pageId + '"}';
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
                console.log("getPaymentGatewayConfigNewSettings :: >>>>>     " + JSON.stringify(responseData));
                if (responseData.paymentDetails.length) {
                    var paymentDetails = responseData.paymentSetting;
                    var paymentsmethode = {};
                    paymentsmethode.list = [];
                    for (i = 0; i < paymentDetails.length; i++) {
                        var item = paymentDetails[i];
                        var label = typeof item.label !== "undefined" ? (item.label != null ? item.label : "") : "";
                        var key = typeof item.key !== "undefined" ? (item.key != null ? item.key : "") : "";
                        var phoneNo = "",
                            merchantId = "",
                            merchantKey = "",
                            saltKey = "",
                            clientId = "",
                            secretKey = "",
                            paypalId = "",
                            phoneText = "";
                        var applicationProfileId = "",
                            merchantProfileId = "",
                            workflowId = "",
                            identityToken = "",
                            applicationLicenseID = "";
                        var authorizeApiLoginID = "",
                            authorizenetClientId = "",
                            authorizenetTransactionKey = "",
                            isTestAccount = "";
                        var merchantId = "",
                            merchantKey = "",
                            saltKey = "",
                            clientId = "",
                            secretKey = "",
                            paypalId = "",
                            phoneText = "";

                        if (typeof item.credentials !== "undefined") {
                            var credentials = item.credentials;
                            phoneNo = typeof credentials.phone_number !== "undefined" ? (credentials.phone_number != null ? credentials.phone_number : "") : "";
                            phoneText = typeof credentials.text !== "undefined" ? (credentials.text != null ? credentials.text : "") : "";
                            secretKey = typeof credentials.secret_key !== "undefined" ? (credentials.secret_key != null ? credentials.secret_key : "") : "";
                            clientId = typeof credentials.client_id !== "undefined" ? (credentials.client_id != null ? credentials.client_id : "") : "";
                            paypalId = typeof credentials.paypal_business_id !== "undefined" ? (credentials.paypal_business_id != null ? credentials.paypal_business_id : "") : "";
                            merchantId = typeof credentials.merchantId !== "undefined" ? (credentials.merchantId != null ? credentials.merchantId : "") : "";
                            merchantKey = typeof credentials.merchantKey !== "undefined" ? (credentials.merchantKey != null ? credentials.merchantKey : "") : "";
                            authorizeApiLoginID = typeof credentials.apiloginid_key !== "undefined" ? (credentials.apiloginid_key != null ? credentials.apiloginid_key : "") : "";
                            authorizenetClientId = typeof credentials.client_id !== "undefined" ? (credentials.client_id != null ? credentials.client_id : "") : "";
                            authorizenetTransactionKey = typeof credentials.transaction_key !== "undefined" ? (credentials.transaction_key != null ? credentials.transaction_key : "") : "";
                            isTestAccount = typeof credentials.payment_mode !== "undefined" ? (credentials.payment_mode != null ? credentials.payment_mode : "") : "";
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
                                "page": "demanddelivery"
                            });
                        else if (key == "paypal")
                            paymentsmethode.list.push({
                                "method": "paypal",
                                "tabClassId": "paypal",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "paypalId": paypalId,
                                "page": "demanddelivery"
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
                                "page": "demanddelivery"
                            });
                        else if (key == "payWPhn")
                            paymentsmethode.list.push({
                                "method": "obp",
                                "tabClassId": "obp",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": "cc_phone",
                                "phoneNo": phoneNo,
                                "phoneText": phoneText,
                                "page": "demanddelivery"
                            });
                        else if (key == "payAtCounter")
                            paymentsmethode.list.push({
                                "method": "cod",
                                "tabClassId": "cod",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "page": "demanddelivery"
                            });
                        else if (key == "stripe")
                            paymentsmethode.list.push({
                                "method": "stripe",
                                "tabClassId": "stripe",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "clientId": clientId,
                                "secretKey": secretKey,
                                "page": "demanddelivery"
                            });
                        else if (key == "mercadopago")
                            paymentsmethode.list.push({
                                "method": "mercado",
                                "tabClassId": "mercadopago",
                                "tabActive": tabActive,
                                "label": label,
                                "paymentMethodKey": key,
                                "merchantId": credentials.public_key,
                                "clientId": credentials.client_id,
                                "secretKey": credentials.secret_key,
                                "page": "demanddelivery"
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
                                "page": "demanddelivery"
                            });
                    }

                    paymentsmethode.innerlanguage = true;
                    var innerlanguagedata = {};
                    innerlanguagedata.expiry_month = pageData.languageSetting.expiry_month_mcom; // pageData.pageLanguageSetting
                    innerlanguagedata.expiry_year = pageData.languageSetting.expiry_year_mcom;
                    innerlanguagedata.cvv_code = pageData.languageSetting.check_the_back_of_your_credit_card_for_cvv_mcom;
                    innerlanguagedata.place_order = pageData.languageSetting.place_order_mcom;
                    innerlanguagedata.card_holder_name = pageData.languageSetting.card_holder_name_mcom;
                    innerlanguagedata.call_now = pageData.languageSetting.call_now_mcom;
                    innerlanguagedata.confirm = pageData.languageSetting.confirm_ecom;
                    innerlanguagedata.payment_method = pageData.languageSetting.confirm_ecompayment_method_mcom;
                    paymentsmethode.innerlanguagedata = innerlanguagedata;

                    console.log("payment   " + JSON.stringify(paymentsmethode));
                    setTimeout(function() {
                        $$("#issavecardcheck").hide();
                    }, 2000)
                    $$.get("pages/payment.html", function(template) {
                        Appyscript.hideIndicator();
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(paymentsmethode);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                    });

                } else {
                    Appyscript.alert(responseData.sErrorMsg, appnameglobal_allpages);
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
};*/





/****************
//----------------For PAY at Counter and Via Call-------------------//
****************/
function dDExecutePaymentCashCounter(orderId, paymentMethodKey) {
    var postData = '{"method":"orderPaymentSuccess","orderId":"' + orderId + '","paymentStatus":"pending","paymentMethod":"' + paymentMethodKey + '","paymentLabel":"' + paymentMethodLableCon + '","appUserId":"' + localStorage.getItem("userid") + '","currencyCode":"' + demandDeliveryData.priceDetail.currencyCode + '","mode": "1","lang":"' + data.appData.lang + '"}';
    console.log("postCC  " + postData);
    Appyscript.showIndicator();
    $$.ajax({
        url: baseurl,
        data: postData,
        type: "post",
        //321 headers: {'accessToken': deviceEncryptedToken},
        async: true,
        success: function(result) {
            Appyscript.hideIndicator();
            var result = JSON.parse(result);
            if (result.status == "1") {
                dDUpdateStatusAfterPayment("success", "");
            } else {
                Appyscript.alert(pageData.languageSetting.Payment_Status_Failed, appnameglobal_allpages);
            }
        },
        error: function() {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            return false;
        }
    });
};
/****************
//-----------For Credit Card Paypal
****************/
function dDExecutePaymentForCreditCard(orderId, paymentTypeObject, paymentMethodKey, paymentMethodLableCon) {
    var payTypeObj = $$(paymentTypeObject).parent();
    var creditCardDetails = validateCardDetails_Hyperlocal("cc");
    var paymentPaypalCheck = payTypeObj.attr("data-key");
    if (creditCardDetails == "null") {
        return false;
    }
    creditCardDetails = EncryptOrDecrypt("encrypt", creditCardDetails).replace(/ /g, "");
    console.log("paymentMethodKey  " + paymentMethodKey + "    paymentMethodLableCon  " + paymentMethodLableCon)

    var postData = '{"method":"orderCreditCardPayment","appId":"' + localStorage.getItem("appid") + '","appUserId":"' + localStorage.getItem("userid") + '","orderId":"' + orderId + '","paymentMethod":"' + paymentMethodKey + '","paymentLabel":"' + paymentMethodLableCon + '","paymentDetail":"' + creditCardDetails + '","billingData":{"name":"' + localStorage.getItem("username") + '","email":"murli@appypie.com","phone":"' + localStorage.getItem("phone") + '", "grandTotal":' + demandDeliveryData.priceDetail.finalAmountToPay + ',"currency":"' + demandDeliveryData.priceDetail.currencyCode + '","price": "0", "offerAmount": "0", "tax": "0"},"transType":"authorize","appName":"' + localStorage.getItem("appName") + '","lang":"' + localStorage.lang + '","mode": "2"}';
    console.log("postCC  " + postData);
    Appyscript.showIndicator();
    $$.ajax({
        url: baseurl,
        data: postData,
        type: "post",
        //321 headers: {'accessToken': deviceEncryptedToken},
        async: true,
        success: function(result) {
            Appyscript.hideIndicator();
            var result = JSON.parse(result);
            if (result.status == "1") {
                dDUpdateStatusAfterPayment("success", "");
            } else {
                Appyscript.alert(pageData.languageSetting.Payment_Status_Failed, appnameglobal_allpages);
            }
        },
        error: function() {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            return false;
        }
    });
};


/***********
//---------------------For Stripe
***********/
var dDStripeSecret;

function dDExecutePaymentStripe(paymentTypeObject, paymentMethodKey, dDOrderIdPage) {
    var creditCardDetails = validateCardDetailsDD("stripe");
    if (creditCardDetails != null) {

        var ccd = JSON.parse(creditCardDetails);
        var dDPayment = $$(paymentTypeObject).parent();
        dDStripeSecret = dDPayment.attr("data-secretKey")
        var stripe = {
            "amount": demandDeliveryData.priceDetail.finalAmountToPay,
            "email": localStorage.getItem("email"),
            "uId": localStorage.getItem("userId"),
            "cK": dDPayment.attr("data-clientId"),
            "sK": dDPayment.attr("data-secretKey"),
            "cur": demandDeliveryData.priceDetail.currencyCode,
            "number": ccd.number,
            "expMonth": ccd.expireMonth,
            "expYear": ccd.expireYear,
            "cvv": ccd.cvv2,
            "cFn": ccd.firstName
        }

        Appyscript.showIndicator();
        if (Appyscript.device.android) {
            Appyscript.goForCreditCardPayment(stripe.number, stripe.expMonth, stripe.expYear, stripe.cvv, stripe.cFn, stripe.amount, dDOrderIdPage, stripe.cK, stripe.sK, stripe.cur, stripe.uId, "demanddelivery");
        } else {
            Appyscript.goForCreditCardPayment(stripe.number, stripe.expMonth, stripe.expYear, stripe.cvv, stripe.cFn, stripe.amount, dDOrderIdPage, stripe.cK, stripe.sK, stripe.cur, stripe.uId, "demanddelivery");
        }
    }
};

/************
//---------------- Strip Callback Function
************/
function stripeCallbackDemandDelivery(token) {
    if (token == " " || token == "cancel" || token == "invalidcard" || token == "") {
        Appyscript.alert(pageData.languageSetting.Payment_Status_Failed, appnameglobal_allpages);
        Appyscript.hideIndicator();
        return false;
    }

    var postData = '{"method":"ddPaymentStripe","appId":"' + localStorage.getItem("appid") + '","appUserId":"' + localStorage.getItem("userid") + '","orderId":"' + dDOrderIdPage + '","amount":' + demandDeliveryData.priceDetail.finalAmountToPay + ',"currency":"' + demandDeliveryData.priceDetail.currencyCode + '","tokenId":"' + token + '","appName":"' + localStorage.getItem("appName") + '","lang":"' + localStorage.lang + '","paymentMathod":"stripe","paymentLabel":"' + paymentMethodLableCon + '","secretKey":"' + dDStripeSecret + '","description":"","mode": "2"}';
    Appyscript.showIndicator();
    $$.ajax({
        url: baseurl,
        data: postData,
        type: "post",
        //321 headers: {'accessToken': deviceEncryptedToken},
        success: function(result) {
            Appyscript.hideIndicator();
            var result = JSON.parse(result);
            if (result.status == "1") {
                dDUpdateStatusAfterPayment("success", "");
            } else {
                Appyscript.alert(pageData.languageSetting.Payment_Status_Failed, appnameglobal_allpages);
            }
        },
        error: function() {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            return false;
        }
    });
};
/*****************
  //-----------For Paypal
*****************/
function openPaypalNativeDemandDelivery(htmlForm, pagetype, pageDatapageTitle) {
    Appyscript.openPaypal(htmlForm, "demanddelivery", pageDatapageTitle);
    Appyscript.hideIndicator();
};

/************
//------------------Payment Success Function
************/
function dDUpdateStatusAfterPayment(paymentStatus, txnID) {
    if (paymentStatus.toLowerCase() != "success") {
        Appyscript.hideIndicator();
        Appyscript.alert(pageData.languageSetting.Payment_Status_Failed, appnameglobal_allpages);
        return;
    }

    if (paymentStatus.toLowerCase() == "success") {
        var responseData = {};
        responseData.Icon = demandDeliveryData.vehicleInfo.icon;
        responseData.vName = demandDeliveryData.vehicleInfo.name;
        responseData.orderID = dDOrderIdPage;
        responseData.paymentMethodKeyCon = paymentMethodKeyGlobal;
        responseData.paymentMethodLableCon = paymentMethodLableGlobal;
        responseData.pointDuration = pointDuration;
        console.log("responseData$$  " + JSON.stringify(responseData));
        if (pageData.generalSetting.autoconfirmbooking == false) {
            $$.get("pages/demanddelivery-PaymentconfirmatAdmin.html", function(template) {
                responseData.BookLater = 0;
                var compiledTemplate = AppyTemplate.compile(template);
                var html = compiledTemplate(responseData);
                mainView.router.load({
                    content: html,
                    animatePages: true
                });
                Appyscript.hideIndicator();
            });
        } else if (pageData.generalSetting.autoconfirmbooking == true) {
            $$.get("pages/demanddelivery-Paymentconfirmation.html", function(template) {
                var compiledTemplate = AppyTemplate.compile(template);
                var html = compiledTemplate(responseData);
                mainView.router.load({
                    content: html,
                    animatePages: true
                });
                setTimeout(function() {
                    demandDeliverylat = parseFloat(localStorage.getItem("localLatitude"));
                    demandDeliverylong = parseFloat(localStorage.getItem("localLongitude"));
                    var map = new google.maps.Map(document.getElementById('mapCon'), {
                        center: new google.maps.LatLng(demandDeliverylat, demandDeliverylong),
                        zoom: 10,
                        draggable: false,
                        disableDefaultUI: true,
                    });
                }, 500);

            });
        }
    }
    localStorage.setItem("bookLaterKey", "");
    localStorage.setItem("rescheduleKey", "");
};




function validateCardDetailsDD(creditCardType) {
    var creditCardJSON;
    if (creditCardType == "stripe") {
        creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripe');
    } else {
        creditCardJSON = Appyscript.formToJSON('#creditCardThroughPaypal');
    }

    //  var card_type=creditCardJSON.card_type;
    var cnumber = creditCardJSON.cardNumber;
    var expairyMonth = creditCardJSON.expairyMonth;
    var expairyYear = creditCardJSON.expairyYear;
    var cHolder = creditCardJSON.cardHolder;
    var cvvCode = creditCardJSON.cvvCode;
    var card_type = Appyscript.validateCardType(cnumber);
    var languageSetting_Hyper = data.languageSetting;
    if (isNaN(cnumber) || cnumber.length < 15) {

        Appyscript.hideIndicator();
        Appyscript.alert(languageSetting_Hyper.Please_Enter_Valid_Number);
        return null;

    } else if (expairyMonth == null || expairyMonth == '' || parseInt(expairyMonth) > 12 || parseInt(expairyMonth) < 1) {
        Appyscript.hideIndicator();
        Appyscript.alert(languageSetting_Hyper.please_enter_valid_expairy_month);
        return null;
    } else if (expairyYear == null || expairyYear == '' || parseInt(expairyYear) < new Date().getFullYear()) {
        Appyscript.hideIndicator();
        Appyscript.alert(languageSetting_Hyper.please_enter_valid_expairy_year);
        return null;

    } else if (!isNaN(cHolder) || cHolder == null || cHolder == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(languageSetting_Hyper.please_enter_valid_card_holder_name);
        return null;

    } else if (isNaN(cvvCode) || cvvCode.length < 3 || cvvCode.sumUp() == 0) {
        Appyscript.hideIndicator();
        Appyscript.alert(languageSetting_Hyper.Please_Enter_Valid_Number);
        return null;

    } else {

        var cHolder1 = cHolder.split(" ");
        var lastName = cHolder1[1];
        var firstName = cHolder1[0];

        if (lastName == '' || lastName == null) {
            lastName = '';
        }

        var paymentDetail = '{"type":"' + card_type + '","number":"' + cnumber + '","expireMonth":"' + expairyMonth +
            '","expireYear":"' + expairyYear + '","cvv2":"' + cvvCode + '","firstName":"' + firstName + '","lastName":"' + lastName + '"}';

        return paymentDetail;
    }
};

/*
     This method is used to hit demandDelivery service to send product details on server in case Paypal
 */



/***
    This function is used to call Track Location page
***/
function dDTrackLocation(driverLat, driverLong, pickDropLat, pickDropLong) {
    console.log("dfghjhgfdghj   " + driverLat + "   ggg  " + pickDropLat)
    $$.get("pages/demanddelivery-Trackorder.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(pageData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
        Keyboard.hide();
        dDInitMapReschedule(driverLat, driverLong, pickDropLat, pickDropLong);
    });
};

/***
    This function is used to call Track Drop OFF Location page
***/
var dDTrackLocUpdated;

function dDTrackLocationDropOff(driverLat, driverLong, pickDropLat, pickDropLong, orderId) {
    $$.get("pages/demanddelivery-Trackorder.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(pageData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
        Keyboard.hide();
        dDInitMapReschedule(driverLat, driverLong, pickDropLat, pickDropLong);
        dDTrackLocUpdated = setInterval(function() {
            ddDropOffUpdatedLoc(pickDropLat, pickDropLong, orderId)
        }, 10000);
    });
};

function ddDropOffUpdatedLoc(pickDropLat, pickDropLong, orderId) {
    var postdata = '{"method":"getUpdatedDeliveryBoyLocation","appId":"' + localStorage.getItem("appid") + '","pageId":"' + pageIdentifie + '","orderId":"' + orderId + '","lang":"' + data.appData.lang + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                console.log("getUpdatedDeliveryBoyLocation  " + JSON.stringify(jsondata));
                Appyscript.hideIndicator();
                if (jsondata.status == 1) {
                    //Appyscript.alert(jsondata.msg, appnameglobal_allpages);
                    driverLat = jsondata.data.location[0];
                    driverLong = jsondata.data.location[1];
                    console.log("ff " + driverLat + "  hghhg " + driverLong + "  hghhg " + pickDropLat + "  hghhg " + pickDropLong)
                    dDInitMapReschedule(driverLat, driverLong, pickDropLat, pickDropLong);
                } else {
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
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

/***
    This function is used to call MY DEMAND page
    2.Estimate fare and shipping calculation
***/
var demandDeliveryFullData = {};

function dDMydemand() {
    if (dDAddressPickUp == undefined) {
        dDAddressPickUp = currentPickLoc;
    }
    if (demandDeliveryPickupLat == undefined) {
        demandDeliveryPickupLat = parseFloat(localStorage.getItem("localLatitude"));
        demandDeliveryPickuplong = parseFloat(localStorage.getItem("localLongitude"));
    }
    pagelengthBack = mainView.history.length;
    var postdata = '{"method":"validateAddress","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","pickupLocationString":"' + dDAddressPickUp + '","pickupLatitude":"' + demandDeliveryPickupLat + '", "pickupLongitude":"' + demandDeliveryPickuplong + '","dropupLocationString":"' + dDAddressDrop + '","dropupLatitude":"' + demandDeliveryDropLat + '", "dropupLongitude":"' + demandDeliveryDropLong + '","lang":"' + localStorage.lang + '","distance":"' + distanceDemand + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        setTimeout(function() {
            Appyscript.showIndicator();
        }, 1000);
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                if (jsondata.status != 0) {
                    $$('#dropLocationInput').val("");
                    demandDeliveryFullData = jsondata;
                    demandDeliveryData = demandDeliveryFullData.data[0];
                    localStorage.setItem("rescheduleKey", "");
                    console.log("dataMY demand:- " + JSON.stringify(demandDeliveryData));
                    $$.get("pages/demanddelivery-Mydemand.html", function(template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(demandDeliveryFullData);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                        Keyboard.hide();
                        dDInitMap();
                        $$("#0iconActive").addClass("active");
                    });
                } else {
                    setTimeout(function() {
                        Appyscript.hideIndicator();
                    }, 1500);
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
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
};

/***
    This function is used to call Book Later page
***/
function dDBookLater() {
    localStorage.setItem("bookLaterKey", "map_Show");
    Keyboard.hideFormAccessoryBar(false);
    var pageDetails = {};
    $$.get("pages/demanddelivery-Booklater.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(pageDetails);
        mainView.router.load({
            content: html,
            animatePages: true
        });
        dDInitMap();
    });
};

/***
    This function is used to call Book Later(RESCHEDULE) page
***/
var orderRescheduleIdd;

function dDRescheduleOrder(orderRescheduleId, pickupFromDetailLat, pickupFromDetailLong, dropToDetailLat, dropToDetailLong) {
    orderRescheduleIdd = orderRescheduleId;
    var pageDetails = {};
    localStorage.setItem("rescheduleKey", "scheduleBooking");
    $$.get("pages/demanddelivery-Booklater.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(pageDetails);
        mainView.router.load({
            content: html,
            animatePages: true
        });
        dDInitMapReschedule(pickupFromDetailLat, pickupFromDetailLong, dropToDetailLat, dropToDetailLong);
    });
};

//var date=$$("input[name='dDPickCurrentDate']").val();
Appyscript.onPageInit('demanddelivery-booklater', function(page) {
    var today = new Date();
    var advanceBookingDays = pageData.generalSetting.advancebookingdays;
    var weekLater = new Date().setDate(today.getDate() + parseInt(advanceBookingDays));
    var _getDate = (new Date()).getDate();
    var _advanceBookDate = new Date((new Date().setDate(_getDate + parseInt(advanceBookingDays)))).setHours(0, 0, 0, 0);

    var _getDate = (new Date()).getDate();
    var _advanceBookDate = new Date((new Date().setDate(_getDate + parseInt(advanceBookingDays)))).setHours(0, 0, 0, 0);
    Appyscript.calendar({
        input: '#dDPickupDate',
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
        dateFormat: 'DD, dd M yyyy'
    });
});

//Advance booking date slots Date Slots
var customDate;

function dDGetCurrentDate_Data(type) {
    var currentDate = new Date();
    var arrDayWish = [];
    var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var todaysDate = new Date();
    customDate = new Date($$("#dDPickupDate").val());
    console.log("customDate  " + customDate);
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

function dDAsync_CalculationsTimeSlots(isfrom) {
    var slotsArray = [];
    var availiability_ArrayCheck = [];
    return new Promise(function(resolve, reject) {

        // Basic Variables
        var _workingHoursEditable = pageData.defaultScheduleData;
        var _getTodaysDay = dDGetCurrentDate_Data("day_Custom");
        var _dayWiseArray = _workingHoursEditable[_getTodaysDay];
        var _slotDate = dDGetCurrentDate_Data("currentDate_Custom");
        var _dateIndex = dDGetCurrentDate_Data("dateIndex_Custom");
        console.log("_slotDate  " + _slotDate);
        //Check weather the person is available for particular day
        availiability_ArrayCheck = _workingHoursEditable.availabilitySchedule;

        if (availiability_ArrayCheck.length > 0) {
            availiability_ArrayCheck = $.grep(availiability_ArrayCheck, function(v) {
                return v.id == _dateIndex
            });

            console.log("availiability_ArrayCheck.length   " + availiability_ArrayCheck.length)

            if (availiability_ArrayCheck.length > 0) {

                if (availiability_ArrayCheck[0].closeToday == true) {
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
        var _slotStartTime = "";
        var _slotEndTime = "";
        var _validateTime = "";
        var currentHours;
        var currentMinutes;
        var currentDateTime = "";
        var validateTime = "";
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
    });
};

function closeSchedulePopup() {
    mainView.router.back();
};

//function change_SlotsDatewiseDD() {
//    dDAsync_CalculationsTimeSlots("Box").then(function(slotsArray) {
//        console.log("vcfccc   " + JSON.stringify(slotsArray))
//    });
//};


function change_SlotsDatewiseDD() {
    var inputBoxDate = $$("#dDPickupDate").val();
    Appyscript.popupClose();

    dDAsync_CalculationsTimeSlots("fromInputBox").then(function(slotsArray) {
        var pageDetails = {};
        pageDetails.defaultDate = dDGetCurrentDate_Data("isoFormat");
        pageDetails.slotList = slotsArray;
        console.log("vcfccc   " + JSON.stringify(pageDetails))
        if (slotsArray.length != 0) {
            $$("#dDSlotTime").html("");
            $$("#slotNotAvail").html("");
            for (var i = 0; i < slotsArray.length; i++) {
                $$("#dDSlotTime").append('<option value="' + slotsArray[i].timeSlot + ' - ' + slotsArray[i].timeSlotEnd + '">' + slotsArray[i].timeSlot + ' - ' + slotsArray[i].timeSlotEnd + '</option>');
                $$("#dDSlotTime").show();
                $$("#slotNotAvail").hide();
                $$(".confirmBtn").show();
            }
        } else {
            $$("#slotNotAvail").html("");
            $$("#slotNotAvail").html('<span>' + "Time slots are not available" + '</span>');
            $$("#dDSlotTime").hide();
            $$("#slotNotAvail").show();
            $$(".confirmBtn").hide();
        }
    });
};

function dDCalenderOpenFunctiom() {
    setTimeout(function() {
        Keyboard.hideFormAccessoryBar(false);
        dDCalenderopen.open();
    }, 1000);
};

function dDDatePickerClose() {
    $$("#datesheetrangeselect").hide();
    dDCalenderopen.close();
};

/***
    This function is used to call Apply Coupon Page
    //GET Coupon list
***/
var jsonDataCoupon = {};

function dDApplyCoupon() {

    var postdata = '{"method":"getCouponList","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","lang":"' + data.appData.lang + '"}';
    console.log("postdata " + postdata);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsonDataCoupon = JSON.parse(data);
                console.log("getCouponList:- " + JSON.stringify(jsonDataCoupon));
                $$.get("pages/demanddelivery-applycoupon.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(jsonDataCoupon);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });
                Appyscript.hideIndicator();
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
};


function couponActive(a, couponCode) {
    $$(".coupons").removeClass("active");
    var index = $$(a).parents(".coupons").attr("index");
    $$("#" + index + "abc").addClass("active");
    applyTextCoupon = couponCode;
    $$("#applyCoupon").val(applyTextCoupon);
};

function couponreadmore(a, couponCode) {
    var index = $$(a).parents(".coupons").attr("index");
    $$("div.textdetail").removeClass("moreActive");
    jsonData = jsonDataCoupon.data[index];
    console.log("dsata    " + JSON.stringify(jsonData));
    $$.get("popups/demandDelivery-shoemoreDetails.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(jsonData);
        Appyscript.popup(html);
    });
};
//function couponHidemore(a){
//   $$(a).parents("div.couponDetail").children().children("a.hideMore").css({"display":"none"});
//   $$(a).parents("div.couponDetail").children().children("a.more").css({"display":"inline-block"});
//   $$(a).parents("div.couponDetail").children("div.textdetail").removeClass("moreActive");
//};


function dDApplyCouponCode() {
    var couponCodeApply = $$("#applyCoupon").val();
    if (couponCodeApply.trim() == "") {
        Appyscript.alert(pageData.languageSetting.Please_Enter_Coupon_Code);
        return;
    }
    var postdata = '{"method":"applyCoupon","appId":"' + app_id + '","pageId":"' + pageIdentifie + '","couponCode":"' + couponCodeApply + '","lang":"' + data.appData.lang + '"}';
    console.log("postdata " + postdata);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                console.log("getapplyCoupon:- " + JSON.stringify(jsondata));

                if (jsondata.status == 1) {
                    Appyscript.alert(jsondata.msg);
                    demandDeliveryData.priceDetail.couponInformation = jsondata.data;
                    /*for(var i=0; i<demandDeliveryFullData.data.length; i++){
                        demandDeliveryFullData.data[i].priceDetail.couponInformation = jsondata.data;
                    }*/
                    mainView.router.back();
                    dDCalculateAmount();

                } else {
                    Appyscript.alert(jsondata.msg);
                }
                Appyscript.hideIndicator();
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
};
var discountCouponAmount;
var discountAmount = 0;
var taxAmount = 0;
var miscTaxAmount = [];
var finalActualAmount;
var otherServiceChanges = [];
var otherServiceChangesArrTotal = 0;

function dDCalculateAmount() {
    otherServiceChangesArrTotal = 0;
    otherServiceChanges = [];
    miscTaxAmount = [];
    /* if(demandDeliveryFullData.data.length > 0){
         if(demandDeliveryData.priceDetail.couponInformation.discountTypeText == "percentage"){
             for(var i=0; i<demandDeliveryFullData.data.length; i++){
                 var discountAmount=((parseFloat(demandDeliveryFullData.data[i].priceDetail.finalAmountToPay) * parseFloat(demandDeliveryData.priceDetail.couponInformation.discountAmount))/100);
                 console.log("discountAmount+++ " + discountAmount);
                 demandDeliveryFullData.data[i].priceDetail.discountAmount = parseFloat(discountAmount).toFixed(2);
                 var finalAmount = parseFloat(demandDeliveryFullData.data[i].priceDetail.finalAmountToPay) - parseFloat(discountAmount);
                 demandDeliveryFullData.data[i].priceDetail.finalAmountToPay = finalAmount.toFixed(2);
             }

         }else{
             for(var i=0; i<demandDeliveryFullData.data.length; i++){
                 if (parseFloat(demandDeliveryData.priceDetail.couponInformation.discountAmount) >= parseFloat(demandDeliveryFullData.data[i].priceDetail.finalAmountToPay)) {
                     discountAmount = demandDeliveryFullData.data[i].priceDetail.finalAmountToPay;
                 } else {
                     discountAmount = demandDeliveryData.priceDetail.couponInformation.discountAmount;
                 }
                 demandDeliveryFullData.data[i].priceDetail.discountAmount = parseFloat(discountAmount).toFixed(2);
                 var finalAmount = parseFloat(demandDeliveryFullData.data[i].priceDetail.finalAmountToPay) - parseFloat(discountAmount);
                 demandDeliveryFullData.data[i].priceDetail.finalAmountToPay = finalAmount.toFixed(2);
             }
         }
         //console.log("discountAmount+++ "+discountAmount);
         /*for(var i=0; i<demandDeliveryFullData.data.length; i++){
             demandDeliveryFullData.data[i].priceDetail.couponInformation.discountAmount = parseFloat(discountAmount).toFixed(2);
             var finalAmount = parseFloat(demandDeliveryFullData.data[i].priceDetail.finalAmountToPay) - parseFloat(discountAmount);
             demandDeliveryFullData.data[i].priceDetail.finalAmountToPay = finalAmount.toFixed(2);
             //var currencySymbol=localStorage.getItem("currencySymbol");
             //var currency = $$( "<div>" + currencySymbol + "</div>" ).html().trim();
             //$$(".v-price").html( currency+" "+demandDeliveryFullData.data[i].priceDetail.finalAmountToPay);
         }
     }else{*/
    if (demandDeliveryData.priceDetail.couponInformation.discountTypeText == "percentage") {
        var discountCouponAmount = ((parseFloat(demandDeliveryData.priceDetail.actualPrice) * parseFloat(demandDeliveryData.priceDetail.couponInformation.discountAmount)) / 100);
    } else {
        if (parseFloat(demandDeliveryData.priceDetail.couponInformation.discountAmount) >= parseFloat(demandDeliveryData.priceDetail.actualPrice)) {
            discountCouponAmount = demandDeliveryData.priceDetail.actualPrice;
        } else {
            discountCouponAmount = demandDeliveryData.priceDetail.couponInformation.discountAmount;
        }
    }
    console.log("discountCouponAmount+++ " + discountCouponAmount);
    if (demandDeliveryData.priceDetail.discountInformation != undefined) {
        if (demandDeliveryData.priceDetail.discountInformation.discountType == 1) {
            discountAmount = ((parseFloat(demandDeliveryData.priceDetail.actualPrice) * parseFloat(demandDeliveryData.priceDetail.discountInformation.discountAmount)) / 100);
        } else {
            if (parseFloat(demandDeliveryData.priceDetail.discountInformation.discountAmount) >= parseFloat(demandDeliveryData.priceDetail.actualPrice)) {
                discountAmount = demandDeliveryData.priceDetail.actualPrice;
            } else {
                discountAmount = demandDeliveryData.priceDetail.discountInformation.discountAmount;
            }
        }
    }
    console.log("discountAmount+++ " + discountAmount);

    demandDeliveryData.priceDetail.couponInformation.discountCouponAmount = parseFloat(discountCouponAmount).toFixed(2);
    finalActualAmount = parseFloat(demandDeliveryData.priceDetail.actualPrice).toFixed(2) - parseFloat(discountCouponAmount) - parseFloat(discountAmount);
    console.log("finalActualAmount+++ " + finalActualAmount);
    if (demandDeliveryData.priceDetail.taxInformation != undefined) {
        if (demandDeliveryData.priceDetail.taxInformation.taxType == 1) {
            taxAmount = ((parseFloat(finalActualAmount) * parseFloat(demandDeliveryData.priceDetail.taxInformation.taxAmount)) / 100);
        } else {
            if (parseFloat(demandDeliveryData.priceDetail.taxInformation.taxAmount) >= parseFloat(finalActualAmount)) {
                taxAmount = finalActualAmount;
            } else {
                taxAmount = demandDeliveryData.priceDetail.taxInformation.taxAmount;
            }
        }
    }
    console.log("taxAmount+++ " + taxAmount);

    if (demandDeliveryData.priceDetail.misctaxInformation != undefined) {
        var miscTaxinfo = demandDeliveryData.priceDetail.misctaxInformation;
        for (var i = 0; i < demandDeliveryData.priceDetail.misctaxInformation.length; i++) {
            if (demandDeliveryData.priceDetail.misctaxInformation[i].taxType == 1) {
                var miscTaxAmt = ((finalActualAmount * parseFloat(demandDeliveryData.priceDetail.misctaxInformation[i].taxAmount)) / 100);
                miscTaxAmount.push(miscTaxAmt);
            } else {
                if (parseFloat(miscTaxinfo[i].taxAmount) >= parseFloat(finalActualAmount)) {
                    miscTaxAmt = finalActualAmount;
                    miscTaxAmount.push(miscTaxAmt);
                } else {
                    miscTaxAmt = demandDeliveryData.priceDetail.misctaxInformation[i].taxAmount;
                    miscTaxAmount.push(miscTaxAmt);
                }
            }
        }
    }
    console.log("miscTaxAmount+++ " + miscTaxAmount);
    var miscTaxAmountTotal = 0;
    for (var i = 0; i < miscTaxAmount.length; i++) {
        miscTaxAmountTotal += miscTaxAmount[i];
    }

    console.log("miscTaxAmountTotal+++ " + miscTaxAmountTotal);
    var totalTax = taxAmount + miscTaxAmountTotal;
    console.log("totalTax+++ " + totalTax);
    if (demandDeliveryData.priceDetail.otherServiceChanges != undefined) {
        for (var i = 0; i < demandDeliveryData.priceDetail.otherServiceChanges.length; i++) {
            var otherServiceAmt = demandDeliveryData.priceDetail.otherServiceChanges[i].price;
            otherServiceChanges.push(parseFloat(otherServiceAmt));
        }
    }
    for (var i = 0; i < otherServiceChanges.length; i++) {
        otherServiceChangesArrTotal += otherServiceChanges[i];
    }
    console.log("otherServiceChanges+++ " + otherServiceChangesArrTotal);
    var finalAmount = finalActualAmount + parseFloat(otherServiceChangesArrTotal) + parseFloat(totalTax);
    console.log("finalAmount+++ " + finalAmount);
    demandDeliveryData.priceDetail.finalAmountToPay = parseFloat(finalAmount).toFixed(2);
    //}

};

function dDPriceDetails(a) {
    $$(".icon").removeClass("active");
    var index = $$(a).attr("index");
    $$("#" + index + "iconActive").addClass("active");
    demandDeliveryData = demandDeliveryFullData.data[index];
}

/***
    This function is used to call Payment page
***/
function dDSetupPayment() {
    $$.get("pages/demanddelivery-Payment.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(pageData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
};

/***
    This function is used to call Menu Pannel
***/
Appyscript.demanddeliverymenu = function() {
    var menuJsonData = {};
    menuJsonData.name = localStorage.getItem("username");
    menuJsonData.location = localStorage.getItem("CurrentCity");

    if (localStorage.getItem("profileImage") == null) {
        localStorage.setItem("profileImage", AppyTemplate.global.style.reseller + "/newui/images/user-pic-news.png");
        menuJsonData.image = localStorage.getItem("profileImage");
    } else {
        menuJsonData.image = localStorage.getItem("profileImage");
    }
    menuJsonData.setting = pageData.setting;
    pagelengthBack = mainView.history.length;

    if (localStorage.getItem("email") != null) {
        menuJsonData.setting.isLogin = "true";
        menuJsonData.name = localStorage.getItem("username");
        menuJsonData.location = localStorage.getItem("CurrentCity");
    } else {
        menuJsonData.name = "";
        menuJsonData.location = "";
        menuJsonData.setting.isLogin = "false";
    }

    $$("#imgSchedule").attr("src", localStorage.getItem("imageDataSchedule"));
    menuJsonData.languageSetting = pageData.languageSetting;
    $$.get("popups/demanddelivery-menu.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(menuJsonData);
        Appyscript.popup(html);
        if (localStorage.getItem("profile_pic_facebook")) {
            $$("[id='profileImageDir']").attr("image", localStorage.getItem("profile_pic_facebook")).css("background-image", "url(" + localStorage.getItem("profile_pic_facebook") + ")");
        }
    });
};

/***
    This function is used to call data on page init
***/
Appyscript.onPageInit('scheduleabout-page', function(page) {
    $$(".tabs a").click(function() {
        $$(".tabs a").removeClass("on");
        $$(this).addClass("on");
        return false;
    })
});




//********************************************
// This function is used for validation
function demandDeliveryValidate(value, field) {

    if (field == "name") {
        if (value.trim() == '') {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_name_mcom);
            return false;
        }
    }

    if (field == "phone") {
        if (value.length < 4) {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_Enter_Phone_Number);
            return false;
        }
        if (value.trim() == '') {
            Appyscript.alert("valid number");
            return false;
        }
    }

    if (field == "email") {
        if (value.trim() == '' || !Appyscript.validateEmail(value)) {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.DD_Please_Enter_Email_Id);
            return false;
        }
    }

    if (field == "address") {
        if (value.trim() == '' || value == "-1") {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_Enter_Address);
            return false;
        }
    }

    if (field == "subject") {
        if (value.trim() == '') {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_Enter_Subject);
            return false;
        }
    }

    if (field == "comment") {
        if (value.trim() == '') {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_Enter_Comment_dd);
            return false;
        }
    }

    if (field == "shiptype") {
        if (value.trim() == '-1' || value.trim == null || value.trim == '' || value.trim == "Select Type") {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_Select_Shipment_Type);
            return false;
        }
    }
    return true;
};

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

Appyscript.onPageInit('demanddelivery-page', function(page) {
    app_id = localStorage.getItem("appid");
    AppyTemplate.global.loginCheck = 0;
    baseurl = webserviceUrl + 'Demanddelivery.php';
    AppyTemplate.global.currencyData = pageData.generalSetting.currencycode;
    AppyTemplate.global.advancebooking = pageData.generalSetting.advancebooking;
    AppyTemplate.global.distanceUnit = pageData.generalSetting.distanceunit;
    console.log("baseurl  " + baseurl);
    if (localStorage.getItem("email")) {
        AppyTemplate.global.loginCheck = 1;
        userphone = localStorage.getItem("phone");
        var image = localStorage.getItem("profileImage");
        if (image) {
            if (image.indexOf("http") != -1 && (image.indexOf(".jpg") != -1 || image.indexOf(".png") != -1)) {
                AppyTemplate.global.profileImage = localStorage.getItem("profileImage");
                AppyTemplate.global.profileImagecheck = true;
            } else {
                AppyTemplate.global.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-pic-news.png";
            }
        } else {
            AppyTemplate.global.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-pic-news.png";
        }
    } else {
        AppyTemplate.global.loginCheck = 0;
    }
    Appyscript.showIndicator();

    if(data.appData.layout=="slidemenu")
    {
    setTimeout(function() {
            demandDeliverylat = parseFloat(localStorage.getItem("localLatitude"));
            demandDeliverylong = parseFloat(localStorage.getItem("localLongitude"));
            showCurrentPosition(demandDeliverylat, demandDeliverylong);
            if (isNaN(demandDeliverylat) || isNaN(demandDeliverylong)) {
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Current_Location_Is_Not_Available_Right_Now);
            }
            map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(demandDeliverylat, demandDeliverylong),
                zoom: 15,
                mapTypeControl: false,
                disableDefaultUI: true
            });

            google.maps.event.addListener(map, 'click', function(event) {
                demandDeliverylat = event.latLng.lat();
                demandDeliverylong = event.latLng.lng();
                $$('#plusCodeListId').hide();
            });


            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(plusCodeLat, plusCodeLng),
                map: map
            });
            Appyscript.hideIndicator();
        }, 3000)

    }

else
{
  setTimeout(function() {
        demandDeliverylat = parseFloat(localStorage.getItem("localLatitude"));
        demandDeliverylong = parseFloat(localStorage.getItem("localLongitude"));
        showCurrentPosition(demandDeliverylat, demandDeliverylong);
        if (isNaN(demandDeliverylat) || isNaN(demandDeliverylong)) {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Current_Location_Is_Not_Available_Right_Now);
        }
        map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(demandDeliverylat, demandDeliverylong),
            zoom: 15,
            mapTypeControl: false,
            disableDefaultUI: true
        });

        google.maps.event.addListener(map, 'click', function(event) {
            demandDeliverylat = event.latLng.lat();
            demandDeliverylong = event.latLng.lng();
            $$('#plusCodeListId').hide();
        });


        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(plusCodeLat, plusCodeLng),
            map: map
        });
        Appyscript.hideIndicator();
    }, 200)
}

});
var currentPickLoc;

function showCurrentPosition(demandDeliverylat, demandDeliverylong) {
    var geocoder = new google.maps.Geocoder();

    if(demandDeliverylat == undefined ||demandDeliverylat == ''|| demandDeliverylat == null)
    {
     demandDeliverylat=localStorage.getItem("localLatitude");
    }
      if(demandDeliverylong == undefined || demandDeliverylong ==''|| demandDeliverylong==null)
        {
         demandDeliverylong = localStorage.getItem("localLongitude");
        }

    var latLng = new google.maps.LatLng(demandDeliverylat, demandDeliverylong);

    if (geocoder) {
        geocoder.geocode({
            'latLng': latLng
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("curremt add " + results[0].formatted_address);
               // currentPickLoc = results[0].formatted_address;

                           if(results[0].formatted_address.indexOf("Unnamed Road")!="-1")
                                {
                                 currentPickLoc = results[1].formatted_address;
                                }
                else
                {     currentPickLoc = results[0].formatted_address;
                }




                document.getElementById("pickLocationInput").value = currentPickLoc;
            } else {
                $('#pickLocationInput').html('Geocoding failed: ' + status);
                console.log("Geocoding failed: " + status);
            }
        });
    }
}

function dDSearchLocation() {
    getDemandDeliveryPickup('pickLocationInput', 'plusCodeListIdPick');
};

function dDSearchDropLocation() {
    getDemandDeliveryDrop('dropLocationInput', 'plusCodeListId');
};

function getDemandDeliveryPickup(searchId, output) {
    $$('#plusCodeListIdPick').show();
    var status;
    var results;
    var html = '';
    var msg = '';
    var search = document.getElementById(searchId).value;
    var output = document.getElementById(output);
    if (!isOnline()) {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmvbbessage, appnameglobal_allpages);
    } else {
        if (search) {
            output.innerHTML = '';
            setTimeout(function() {
                var api = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + encodeURIComponent(search) + '&key=' + data.googlePlacesApiKey;
                // Send request
                Appyscript.showIndicator();
                $$.ajax({
                    type: 'GET',
                    url: api,
                    dataType: 'json',
                    success: function(data) {
                        Appyscript.hideIndicator();
                        //console.log(data);
                        if(data.status != "REQUEST_DENIED"){
                            if (data.predictions.length > 0) {
                                var iCounter;
                                // List multiple returns
                                if (data.predictions.length > 0) {
                                    for (iCounter = 0; iCounter < data.predictions.length; iCounter++) {
                                        //console.log(data.predictions[iCounter].description);
                                        //console.log("dec   "+data.predictions[iCounter].description);
                                        html += '<li class="close-popup" onClick="getLatLngFromPickUp(\'' + data.predictions[iCounter].description + '\',\'' + data.predictions[iCounter].reference + '\');" href="#" rel="' + data.predictions[iCounter].description + '" title="Click for to see a weather report">' + data.predictions[iCounter].description + '</li>';
                                    }
                                }
                                html = html + '</ul>';
                                output.innerHTML = html;
                            } else {
                                output.innerHTML = "";
                            }
                        }else{
                             Appyscript.hideIndicator();
                             apiname = "Google";
                             serviceFailedNotify(data.status, apiname, 1);
                             Appyscript.alert(data.error_message,appnameglobal_allpages);
                        }
                    },
                    error: function(data) {
                        Appyscript.hideIndicator();
                        output.innerHTML = An_error_has_occurred;
                        apiname="Google";
                        var flag = 0;
                        serviceFailedNotify(data,apiname,flag);
                    }
                });
            }, 500);

        } else {
            output.innerHTML = '';
        }
    }
};

var dDAddressPickUp;

function getLatLngFromPickUp(addressData, referenceCodeMap) {
    console.log("addressData origin  " + addressData);
    dDAddressPickUp = addressData;
    $$('#pickLocationInput').val(addressData);
    $$('#plusCodeListIdPick').hide();
    var apiUrl = " https://maps.googleapis.com/maps/api/place/details/json?reference=" + encodeURIComponent(referenceCodeMap) + "&key=" + data.googlePlacesApiKey;
    console.log("apiUrl  "+apiUrl);
      if (isOnline()) { $$.ajax({
        type: 'GET',
        url: apiUrl,
        dataType: 'json',
        async: true,
        success: function(data) {
            //console.log("latLng   " + JSON.stringify(data))
            var latitude = data.result.geometry.location.lat;
            var longitude = data.result.geometry.location.lng;
            demandDeliveryPickupLat = latitude;
            demandDeliveryPickuplong = longitude;
            var geoId = data.result.id;
        },
        error: function(data) {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            apiname = "Google";
            var flag = 0;
            serviceFailedNotify(data, apiname,flag);
        }
    })} else {
              Appyscript.hideIndicator();
              Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
          }
};

function getDemandDeliveryDrop(searchId, output) {
    $$('#plusCodeListId').show();
    var status;
    var results;
    var html = '';
    var msg = '';
    var search = document.getElementById(searchId).value;
    var output = document.getElementById(output);
    if (!isOnline()) {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    } else {
        if (search) {
            output.innerHTML = '';
            setTimeout(function() {
                var api = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + encodeURIComponent(search) + '&key=' + data.googlePlacesApiKey;
                //console.log("api  :: "+api)
                // Send request
                Appyscript.showIndicator();
                $$.ajax({
                    type: 'GET',
                    url: api,
                    dataType: 'json',
                    success: function(data) {
                        Appyscript.hideIndicator();
                        //console.log(data);
                        if(data.status != "REQUEST_DENIED"){
                            if (data.predictions.length > 0) {
                                var iCounter;
                                // List multiple returns
                                if (data.predictions.length > 0) {
                                    for (iCounter = 0; iCounter < data.predictions.length; iCounter++) {
                                        //console.log(data.predictions[iCounter].description);
					                    var addressDropStr =  data.predictions[iCounter].description.replace("'", "");
                                        html += '<li class="close-popup" onClick="getLatLngFromDrop(\'' + addressDropStr + '\',\'' + data.predictions[iCounter].reference + '\');" href="#" rel="' + addressDropStr + '" title="Click for to see a weather report">' + addressDropStr + '</li>';
                                    }
                                }
                                html = html + '</ul>';
                                output.innerHTML = html;
                            } else {
                                output.innerHTML = "";
                            }
                        }else{
                             Appyscript.hideIndicator();
                             apiname = "Google";
                             serviceFailedNotify(data.status, apiname, 1);
                             Appyscript.alert(data.error_message,appnameglobal_allpages);
                        }
                    },
                    error: function(data) {
                        Appyscript.hideIndicator();
                        output.innerHTML = An_error_has_occurred;
                        apiname="Google";
                        var flag = 0;
                        serviceFailedNotify(data,apiname,flag);
                    }
                });
            }, 500);

        } else {
            output.innerHTML = '';
        }
    }
};

var dDAddressDrop;

function getLatLngFromDrop(addressData, referenceCodeMap) {

      var addressval = $$('#pickLocationInput').val();
      var geocoder = new google.maps.Geocoder();
      console.log("addressData 567890- " + addressval);
      dDAddressDrop = addressData;
    $$('#dropLocationInput').val(addressData);
    $$('#plusCodeListId').hide();
    var apiUrl = "https://maps.googleapis.com/maps/api/place/details/json?reference=" + encodeURIComponent(referenceCodeMap) + "&key=" + data.googlePlacesApiKey;
    if (isOnline()) { $$.ajax({
        type: 'GET',
        url: apiUrl,
        dataType: 'json',
        async: true,
        success: function(data) {
            //console.log("latLng   " + JSON.stringify(data))
            if(data.status != "REQUEST_DENIED"){
                var latitude = data.result.geometry.location.lat;
                var longitude = data.result.geometry.location.lng;
                demandDeliveryDropLat = latitude;
                demandDeliveryDropLong = longitude;

                 geocoder.geocode( { 'address': addressval}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                           originlatitude = results[0].geometry.location.lat();
                           originlongitude = results[0].geometry.location.lng();
                            console.log("latitude======"+originlatitude);
                             calculateDistanceDD();
                            }
                        });






                console.log("demandDeliveryDropLong "+demandDeliveryDropLong);
                var geoId = data.result.id;
            }else {
                 Appyscript.hideIndicator();
                 apiname = "Google";
                 serviceFailedNotify(data.status, apiname, 1);
                 Appyscript.alert(data.error_message, appnameglobal_allpages);
             }
        },
        error: function(data) {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            apiname = "Google";
            var flag = 0;
            serviceFailedNotify(data, apiname, flag);
        }
    }) } else {
               Appyscript.hideIndicator();
               Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
           }
};
var map;

function dDInitMap() {
    var pointA = new google.maps.LatLng(demandDeliveryPickupLat, demandDeliveryPickuplong);
    var pointB = new google.maps.LatLng(demandDeliveryDropLat, demandDeliveryDropLong);
    console.log(pointA + "  pointB " + pointB);
    var myOptions = {
        zoom: 7,
        center: pointA
    };
    if (localStorage.getItem("bookLaterKey") != "map_Show") {
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    } else {
        map = new google.maps.Map(document.getElementById('map-canvas123'), myOptions);
    }
    // Instantiate a directions service.
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });
    directionsDisplay.setOptions({
        suppressMarkers: true
    });
    map.setOptions({
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        disableDefaultUI: true
    });
    var infowindow = new google.maps.InfoWindow();
    var markerA = new google.maps.Marker({
        position: pointA,
        map: map,
        icon: {
            url: 'images/pickup.png',
            scaledSize: new google.maps.Size(25, 25)
        }
    });
    var markerB = new google.maps.Marker({
        position: pointB,
        map: map,
        icon: {
            url: 'images/destination.png',
            scaledSize: new google.maps.Size(30, 30)
        }
    });
    google.maps.event.addListener(markerA, 'click', (function(markerA) {
        return function() {
            infowindow.setContent('<div class="time-dur"><p><span>' + pointDuration + '</span>' + " My Duration" + '</p></div>');
            //infowindow.setContent(decodeURIComponent(globaladdress));
            infowindow.open(map, markerA);
        }
    })(markerA, 0));
    setTimeout(function() {
        infowindow.setContent('<div class="time-dur"><p><span>' + pointDuration + '</span>' + " My Duration" + '</p></div>');
        infowindow.open(map, markerA);
    }, 2000);



    // get route from A to B
    setTimeout(function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
    }, 500);
};

function dDInitMapReschedule(pickupFromDetailLat, pickupFromDetailLong, dropToDetailLat, dropToDetailLong) {
    var pointA = new google.maps.LatLng(pickupFromDetailLat, pickupFromDetailLong);
    var pointB = new google.maps.LatLng(dropToDetailLat, dropToDetailLong);
    console.log(pointA + "  pointB " + pointB);
    var myOptions = {
        zoom: 7,
        center: pointA,
        mapTypeControl: true,
        streetViewControl: true,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas123'), myOptions);
    // Instantiate a directions service.
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setOptions({
        suppressMarkers: true
    });
    var markerA = new google.maps.Marker({
        position: pointA,
        map: map,
        icon: {
            url: 'images/pickup.png',
            scaledSize: new google.maps.Size(25, 25)
        }
    });
    var markerB = new google.maps.Marker({
        position: pointB,
        map: map,
        icon: {
            url: 'images/destination.png',
            scaledSize: new google.maps.Size(30, 30)
        }
    });

    google.maps.event.addListener(markerA, 'click', (function(markerA) {
        return function() {
            infowindow.setContent('<div style="float: left; background: url(images/carmap.png) no-repeat center ; height: 40px; background-size: contain; margin: 0 5px 0 0; width: 50px; border:none; border-right: 1px solid #000;"></div>');
            //infowindow.setContent(decodeURIComponent(globaladdress));
            infowindow.open(map, markerA);
        }
    })(markerA, 0));

    // get route from A to B
    setTimeout(function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
    }, 500);
};

function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: pageData.generalSetting.distanceunit == "Miles" ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC
    }, function(response, status) {
        directionsDisplay.setMap(map);
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var point = response.routes[0].legs[0];
            pointDuration = point.duration.text;
            // pointDistanceKm = point.distance.text;
            pointDistanceKm = point.distance.value;
            if(pointDistanceKm==0){
                pointDistanceKm=1;
            }

            if (pageData.generalSetting.distanceunit == "km" || pageData.generalSetting.distanceunit == "Km") {
                pointDistanceKm = pointDistanceKm/1000;
            } else {
                pointDistanceKm = pointDistanceKm/1609.34;
                pointDistanceKm = parseFloat(pointDistanceKm).toFixed(4);
            }

            $$(".kilometer").html(distanceDemand + " " + pageData.generalSetting.distanceunit);
            $$(".dur-hours").html(pageData.languageSetting.Min_Time + " " + pointDuration);
            console.log("duration " + point.duration.text + "   Km  " + point.distance.text);
        } else {
            window.alert(pageData.languageSetting.Directions_Request_Failed_Due_To);
        }
    });
};


/***
    This function is used to call data on page init
***/
Appyscript.onPageInit('demanddelivery-mydemand', function(page) {
    //$$("#map-canvas").css("height", "calc(100% - " + $$(".package-section").height() + "px)");
    $$("#map-canvas").css("height",$$(window).height() - $$(".package-section").height()
                          +"px");
    setTimeout(function() {
        dDInitMap();
    }, 2000);
    setTimeout(function() {
        Appyscript.hideIndicator();
    }, 3500);
});

Appyscript.dDBackFunction = function() {
    var totalback = mainView.history.length - pagelengthBack;
    for (var i = 0; i < totalback; i++) {
        mainView.router.back({
            ignoreCache: true,
            animatePages: false
        });
    }
    return false;
};

/**********
            Call back From Notification
***********/
function dDCallBackFromNative(orderId, status) {
    var postdata = '{"method":"getOrderStatus","orderId":"' + orderId + '","lang":"' + data.appData.lang + '"}';
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data, textStatus) {
                jsondata = JSON.parse(data);
                Appyscript.hideIndicator();
                if (jsondata.status == 1) {
                    //Appyscript.alert(jsondata.msg, appnameglobal_allpages);
                    jsondata.data.Icon = demandDeliveryData.vehicleInfo.icon;
                    jsondata.data.vName = demandDeliveryData.vehicleInfo.name;
                    jsondata.data.paymentMethodKeyCon = paymentMethodKeyGlobal;
                    jsondata.data.paymentMethodLableCon = paymentMethodLableGlobal;
                    jsondata.data.pickupLat = demandDeliveryPickupLat;
                    jsondata.data.pickupLong = demandDeliveryPickuplong;
                    jsondata.data.pointDuration = pointDuration;
                    if (paymentMethodKeyGlobal == "cod") {
                        jsondata.data.paymentIcon = "appyicon-wallet";
                    } else if (paymentMethodKeyGlobal == "paypal") {
                        jsondata.data.paymentIcon = "icon-paypal-1";
                    } else if (paymentMethodKeyGlobal == "cc") {
                        jsondata.data.paymentIcon = "icon-credit-card-2";
                    } else if (paymentMethodKeyGlobal == "cc_phone") {
                        jsondata.data.paymentIcon = "iconz-phone1";
                    } else if (paymentMethodKeyGlobal == "stripe") {
                        jsondata.data.paymentIcon = "appyicon-stripe";
                    } else if (paymentMethodKeyGlobal == "mercadopago") {
                        jsondata.data.paymentIcon = "appyicon-mercadopago";
                    } else if (paymentMethodKeyGlobal == "authorizenet") {
                        jsondata.data.paymentIcon = "appyicon-authorize";
                    }

                    console.log("dataMY getOrderStatus:- " + JSON.stringify(jsondata.data));
                    $$.get("pages/demanddelivery-Orderpreview.html", function(template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(jsondata.data);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                    });
                } else {
                    Appyscript.alert(jsondata.msg, appnameglobal_allpages);
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
};

function dDCallBackFromNativeReschedule(orderId, status, BookLater, timeOut) {
    var jsondata = {};
    jsondata.orderID = orderId;
    if (BookLater == 1) {
        jsondata.BookLater = BookLater;
        $$.get("pages/demanddelivery-PaymentconfirmatAdmin.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(jsondata);
            mainView.router.load({
                content: html,
                animatePages: true
            });
        });
    } else if (timeOut == 1) {
        jsondata.BookLater = BookLater;
        $$.get("pages/demanddelivery-SearchingTimeout.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(jsondata);
            mainView.router.load({
                content: html,
                animatePages: true
            });
        });
    }
};

/*function errorFunction(){
 var jsondata = {};
        $$.get("pages/demanddelivery-SearchingTimeout.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(jsondata);
            mainView.router.load({
                content: html,
                animatePages: true
            });
        });
}*/

Appyscript.onPageInit('demanddelivery-paymentconfirm', function(page) {
    $$("#dDBookConDiv, #mapCon").css("height", "calc(100% - " + parseInt($$(".btnSucces").outerHeight() + $$(".centerContent").outerHeight() + 20) + "px)");
});

Appyscript.onPageBack('demanddelivery-trackorder', function(page) {
    clearInterval(dDTrackLocUpdated);
});


function showMoredocument() {
    $$.get("popups/demandDelivery-showDocument.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(orderStatusData);
        Appyscript.popup(html);
    })
};

AppyTemplate.registerHelper('finalFriceHelper', function(price) {
    if (price.toString().indexOf("-") != -1) {
        return "0.00";
    } else {
        return price;
    }

});

/***********
    MERCADO PAYMENT METHOD GATWAY
*************/

function dDMercadoDetail(dDOrderIdPage, paymentTypeObject, paymentMethodKey, paymentMethodLable, userId) {
    dDOrderIdPageGlobal = dDOrderIdPage;
    paymentTypeObjectGlobal = paymentTypeObject;
    paymentMethodKeyGlobal = paymentMethodKey;
    paymentMethodLableGlobal = paymentMethodLable;
    userIdGlobal = userId;
    creditCardDetail = dDCreditCardDetailOfUser("payMercado");
};

function dDSetPaymentMethodInfo(status, response) {
    console.log("setPaymentMethodInfo calledDD");
    if (status == 200) {
        // do somethings ex: show logo of the payment method
        console.log("response of setPaymentMethodInfo===DDD  " + response[0].id);
        objcard.payMethodID = response[0].id;
        return;
    }
};


var objcard = {};

function dDMercadosdkResponseHandler(status, response) {
    console.log("sdkResponseHandler calledDDD ");
    if (status != 200 && status != 201) {
        Appyscript.alert("please_verify_data_entered", data.appData.appName);
    } else {
        console.log("response of sdkResponseHandler===DDD  " + response.id);
        if (response.id != undefined && response.id != "") {
            objcard.cardToken = response.id;
            if (paymentwithmercado_andewallet) {
                ewallet_mercadoCardPayment();
            } else {
                dDMercadoCardPayment(objcard.cardToken);
            }
            return;
        }
        return;
    }
};

function dDMercadoCardPayment(cardTokenMercado) {
    console.log("tokenDDD = " + objcard.cardToken + " methodDD = " + objcard.payMethodID);
    var paymentIdMercado = objcard.payMethodID //formAfterSdkCallBack.children[childrenTotal-2].value;
    var amount = demandDeliveryData.priceDetail.finalAmountToPay;
    var secretToken = $$(paymentTypeObjectGlobal).parent().attr("data-secretKey");
    var proDescription = "";
    if (proDescription == "") {
        proDescription = "Some description";
    }
    var postdata = '{"method": "ddMercadoPagoPayment","appId": "' + localStorage.getItem("appid") + '","pageId": "' + pageIdentifie + '","orderId": "' + dDOrderIdPageGlobal + '","accessToken":"' + secretToken + '","amount":"' + amount + '","token":"' + cardTokenMercado + '","description":"' + proDescription + '","installments":"1","cardType":"' + paymentIdMercado + '","userEmail":"' + Appyscript.formToJSON('#payMercado').email + '","appUserId":' + localStorage.getItem("userid") + ',"currencyCode":"' + demandDeliveryData.priceDetail.currencyCode + '","countryCode":"","lang":"' + localStorage.lang + '","paymentLabel":"' + paymentMethodLableGlobal + '","mode": 2,"pageType":"' + pageId + '","paymentMethod":"' + paymentMethodKeyGlobal + '"}';

    console.log("post data on appy server for paymentDDDD " + postdata);
    /*changed for testing*/
    if (isOnline()) {
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            async: true,
            //321 headers: {'accessToken': deviceEncryptedToken},
            success: function(jsonData, textStatus) {
                console.log("posted successfully  " + jsonData);
                var result = JSON.parse(jsonData);
                if (result.status == "1") {
                    dDUpdateStatusAfterPayment("success", "");
                } else {
                    Appyscript.alert(pageData.languageSetting.Payment_Status_Failed, appnameglobal_allpages);
                }

            },
            error: function(error) {
                console.log("some error occured");
                orderIdForGloble = '';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
};

/*
    This method is used to check validationn of credit card as well as create json of credit card details
*/
function dDCreditCardDetailOfUser(creditCardType) {
    var creditCardJSON;
    if (creditCardType == "stripe") {
        creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripe');
    } else if (creditCardType == "payMercado") {
        creditCardJSON = Appyscript.formToJSON('#payMercado');
        Mercadopago.clearSession();
        Mercadopago.setPublishableKey($('#payMercado').parent().attr("data-merchantId"));
        console.log("====Mercado identification type====DD");
        var ccNumber = creditCardJSON.cardNumber.replace(/[ .-]/g, '').slice(0, 6);
        Mercadopago.getPaymentMethod({
            "bin": ccNumber
        }, dDSetPaymentMethodInfo);
        Mercadopago.createToken($('#payMercado'), dDMercadosdkResponseHandler);
        return "";
    } else if (creditCardType == "authorizenet") {
        creditCardJSON = Appyscript.formToJSON('#authorizeCardDetails');
    } else {
        creditCardJSON = Appyscript.formToJSON('#creditCardThroughPaypal');
    }
    var cnumber = creditCardJSON.cardNumber;
    var expairyMonth = creditCardJSON.expairyMonth;
    var expairyYear = creditCardJSON.expairyYear;
    var cHolder = creditCardJSON.cardHolder;
    cvvCode = creditCardJSON.cvvCode;
    var card_type = Appyscript.validateCardType(cnumber);

    if (cnumber == null || cnumber == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_card_number, appnameglobal_allpages);
        return null;
    } else if (isNaN(cnumber) || cnumber.length < 15) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_card_number, appnameglobal_allpages);
        return null;
    } else if (expairyMonth == null || expairyMonth == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_expiry_month, appnameglobal_allpages);
        return null;
    } else if (isNaN(expairyMonth) || expairyMonth.length < 2) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_expiry_month, appnameglobal_allpages);
        return null;
    } else if (expairyYear == null || expairyYear == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_expiry_year, appnameglobal_allpages);
        return null;
    } else if (isNaN(expairyYear) || expairyYear.length < 4) {
        if (creditCardType !== "authorizenet") {
            Appyscript.hideIndicator();
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_expiry_year, appnameglobal_allpages);
            return null;
        }
    } else if (!isNaN(cHolder) || cHolder == null || cHolder == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_card_holdername, appnameglobal_allpages);
        return null;
    } else if (cvvCode == null || cvvCode == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_cvv_code, appnameglobal_allpages);
        return null;
    } else if (isNaN(cvvCode) || cvvCode.length < 3) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_cvv_code, appnameglobal_allpages);
        return null;
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

/*****************************************************
            //Authorize.net Payment Gatway
******************************************************/

function dDSubmitOrderByAuthorize(dDOrderIdPage, paymentTypeObject, paymentMethodKey, paymentMethodLable) {
    console.log("dDSubmitOrderByAuthorize CAlling.... ");
    var credentials = "",
        apiLoginKey = "",
        clientKey = "",
        transactionKey = "",
        isTestAccount = "";
    var creditCardDetail = null;
    credentials = $$(paymentTypeObject).parent();
    apiLoginKey = credentials.attr("data-apiLogin-Key");
    clientKey = credentials.attr("data-client-key");
    transactionKey = credentials.attr("data-transaction-key");
    isTestAccount = credentials.attr("data-test-account");
    creditCardDetail = dDCreditCardDetailOfUser("authorizenet");
    var cardDetails = JSON.parse(creditCardDetail);
    console.log("dDSubmitOrderByAuthorize*  " + JSON.stringify(cardDetails));

    if (cardDetails != undefined || cardDetails != null) {
        console.log(typeof demandDeliveryData.priceDetail.finalAmountToPay);
        AppyPieNative.payViaAuthorize(clientKey, apiLoginKey, cardDetails.number, cardDetails.expireMonth, cardDetails.expireYear, cardDetails.cvv2, cardDetails.type, transactionKey, demandDeliveryData.priceDetail.finalAmountToPay, isTestAccount, "demandelivery");
    }
};

function dDsendDataValueFromNative(descriptor, dataValue, transactionKey, apiLoginID, cardType, amount, isTestAccount) {
    console.log("FromNative::--- " + descriptor + "   dataValue  " + dataValue + " transactionKey " + transactionKey + "  apiLoginID  " + apiLoginID + "  cardType  " + cardType + "  amount  " + amount + "  isTestAccount  " + isTestAccount);
    var postData = '{"method": "ddAuthorizenetPayment","appId":"' + app_id + '","pageId": "' + pageIdentifie + '","orderId": "' + dDOrderIdPageGlobal + '","dataValue":"' + dataValue + '","amount":"' + amount + '","description":"Demo","dataDescriptor":"' + descriptor + '","cardType":"' + cardType + '","userEmail":"' + localStorage.getItem("email") + '","appUserId":' + localStorage.getItem("userid") + ',"countryCode":"","currencyCode":"' + demandDeliveryData.priceDetail.currencyCode + '","lang":"' + data.appData.lang + '","paymentLabel":"' + paymentMethodLableCon + '","mode": 2,"pageType":"' + pageId + '","paymentMethod":"' + paymentMethodKeyCon + '","paymentMode":"' + isTestAccount + '","transactionKey":"' + transactionKey + '","appLoginId":"' + apiLoginID + '"}';
    //var authorizeUrl = "https://snappy.appypie.com/paypalmobile/authorizenet-payment";
    //var authorizeUrl ="https://angularml.pbodev.info/webservices/Demanddelivery.php";/* for test */
    if (isOnline()) {
        $$.ajax({
            url: baseurl,
            data: postData,
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(jsonData, textStatus) {
                console.log("posted successfully  " + jsonData);
                var result = JSON.parse(jsonData);
                if (result.status == "1") {
                    dDUpdateStatusAfterPayment("success", "");
                } else {
                    Appyscript.alert(pageData.languageSetting.Payment_Status_Failed, appnameglobal_allpages);
                }
            },
            error: function(error) {
                console.log("some error occured");
                orderIdForGloble = '';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};


var distanceDemand = 0;
  var originlatitude='',originlongitude='';
function calculateDistanceDD() {
    var units = 'KM';

    var addForLatLong = $$("#pickLocationInput").val();
    currentPickLoc = addForLatLong;
    addForLatLong = encodeURI(addForLatLong);
    console.log("fhgfhgh 7654  " + addForLatLong)
    var lat = demandDeliveryDropLat;
    var long = demandDeliveryDropLong;
    Appyscript.showIndicator();
    var posturl = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + originlatitude + "," + originlongitude + '&destinations=' + lat + "," + long + '&units=' + units + '&mode=DRIVING&key=' + data.googlePlacesApiKey + '&language=en';
    console.log(" post url for distnace 123 " + posturl);
     if (isOnline()) { $$.ajax({
        url: posturl,
        type: "post",
        async: true,
        success: function(jsonData, textStatus) {
            Appyscript.hideIndicator();
            var response = JSON.parse(jsonData);
            if (response.status === "OVER_QUERY_LIMIT") {
                Appyscript.alert(pageData.languageSetting.google_api_requests_exceeded, appnameglobal_allpages);
                return false;
            } else if (response.status === "REQUEST_DENIED") {
                Appyscript.alert(pageData.languageSetting.maps_javascript_api_is_inactive, appnameglobal_allpages);
                return false;
            }
            /*if (response.status != "OK") {
                Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                return false;
             }*/
            var results = response.rows[0].elements;
            var element = results[0];
            console.log(element);
            if (element.status == "OK") {
                var distanceja = element.distance.value;
                //var distancejad = distanceja.split(" ");

//               // console.log("@@@@  " + distancejad[0].indexOf(","));
//                if (distancejad[0].indexOf(",") == -1) {
//                    var distanceDemandKm = distancejad[0];
//                } else {
//                    var distanceDemandKm = distancejad[0].replace(',', '');
//                }
                //console.log("distanceDemand------------" + distanceDemandKm);
                  if(distanceja==0)
                  {
                  distanceja=1;
                  }
                  else
                  {
                  distanceja=distanceja;
                  }

                if (pageData.generalSetting.distanceunit == "km" || pageData.generalSetting.distanceunit == "Km") {
                    distanceDemand = distanceja/1000;
                    console.log("distanceDemand------------KM " + distanceDemand);
                    dDMydemand();
                } else {
                    distanceDemand = distanceja/1609.34;
                    distanceDemand = parseFloat(distanceDemand).toFixed(4);
                    console.log("distanceDemand------------miles  " + distanceDemand);
                    dDMydemand();
                }


            } else {
                Appyscript.alert('Please try for other location');

            }
        },
        error: function(error) {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again);
        }
    });

    } else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }



};
