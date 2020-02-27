//open hotel page
var checkavailroomid;
var checkavailroomidtype;
var checkavailroomidprice;
var hotelavaildata = [];
var checkindateavail;
var checkoutdateavail;
var hoteldetailsdata = {};
var accommodation_filter_range = '';
var accommodation_filter_star = '';
var accommodation_filter_roomtype = '';
var accommodation_filter_amenties = '';
var accommodation_sortby = '';
var accommodation_sortType = '';
var amenitiesarray = []
var roomtypesarray = [];
var roomcountchekout = [];
var checkooutfinalhoteldata;
var checkindate;
var checkoutdate;
var discountprice = 0;
var taxprice = 0;
var micstaxprice = 0
var offerhotelprice = 0;
var nighttotalcount = 1;
var couponDiscountAmounthotel = "";
var couponcodehotel = "";
var checktotalchild;
var checktotalrooms = 1;
var checktotalguest;
var checkgrandtotalprice;
var hotelcitylist;
var HotelBaseUrl = webserviceUrl + "Accommodation.php";
var selectedcityuhotel = '';
var countrynamehotel = "";
var favpagehotel;
var paymentorderidd;
var checkinsearchdate = '';
var seacroomdataarr = '';
var checksearchroom = '';
var maxchildcountroom = '';
var maxguestcountroom = '';
var totalhotelsearchguestguest = 0;
var countAddedRoom = 1;
var hotelloadmorecount = 1
var hotelloadmorestatus = true;
var globalroomdatahotel = {
    room: [],
    guest: [],
    child: []
};
var accomodationBaseUrl = '';
var showanytimeid = '';
var accomodationAddListingData = {};
var accommodationdetailone = {};
var accommodationdetailtwo = {};
var globalAddListingData = '';
var globalAddAnotherRoomData = '';
var globalSecondPageAddListingData = '';

var accomodationAddAnotherRommData = {};
var addAnotherRoomClickData = {};
localStorage.setItem("appName", data.appData.appName);
localStorage.setItem("adminEmail", data.appData.owneremail);
var sendaccomodationsoimages = [];
var globalRoomAmen = [];
var globalRoomImage = [];
var accomName, accomType, accomEmail, accomPhoneNo, accomFax, accomAddress, accomCity, accomState, accomCountry, accomZipCode;
var accomOwnerPro, accomCheckIn, accomCheckOut, accomApplyOffLine, accomAddReview, accomAmenitiesType, accomDetails, offerPercent;


var getAllDataForAddListing = {
    accomodationData: [],
    accomodationDataSecond: [],
    accommodationAmenities: [],
    accommodationImage: [],
    accommodationRoom: [],
    roomAmenities: [],
    accommodationdata: []
};

//var addAnotherRoomClickHtml = '<div class="accordion-item"><a class="item-link"> Room Deatils</a> <div class="accordion-item-content" ><form> <div class="select_new"> <select id="selectroomtype"> <option>Select Room Type *</option>{{#roomType}}<option value="{{name}}">{{name}}</option>{{/roomType}}</select></div> <div class="room_avai"> <input type="text" id="accomodationRoomAvail" placeholder="Room Avaliability *"><span> No. Of Rooms avaliable </span></div>   <div class="check_box" onclick="accommodation_detail_with_entire_property()"><input type="checkbox" id="accomodlistsingle"/><span>List Entire Property as a Single Accommodation</span></div><div class="room_avai"><input type="text" id="accomodpricepernight" placeholder="Price/night *"></div><div class="max_alults"><label>Maximum Adults Allowed (Per Room*) </label><textarea id="accomodmaxadults"></textarea></div> <div class="max_alults"><label>Maximum Children Allowed (Below 12 years*) </label><textarea id="accomodmaxchild"></textarea></div></form></div></div>'
var addAnotherRoomClickHtml = '';
var addImgA, addImgIndex, imgclick;
var accomodationLoadSoImages = [];
var addAnotherRoomIndex;
var accommovideosendurl = '';
var accommodationAmenities = [];
var accommodation_image_val;
var accommodation_room_val;
var accommodationRoomSelectedAmenities = [];
var accomodationAddUpdateEditListingData = '';
var globalAddUpdateEditDltListingData = {
    accommodationListEdit: []
};
var getAllDataForEditUpdateListing = {
    accomodationFirstEditData: [],
    accomodationDataSecondEdit: [],
    accommodationAmenitiesEdit: [],
    accommodationImageEdit: [],
    accommodationRoomEdit: [],
    accommodationdataEdit: []
};
var checkAddUpdatePage;
var accomrealvideosendurl = '';
var accomrealvideomode = '';
var accommvideomode = '';
var accomvideodelete = "";
var updateaccomlisting = '';
var updateaccomdationdataAll = '';
var deleteimage = [];
var accommEditListId = '';
var accomDataForAddWithUpdateClick = '';
var handlePushBackForEdit = "0";
var addstoredatafirstpage = '';
var addstoredatafirstpage2 = '';
var addstoredatafirstpage3 = '';
var addstoredataaddedroomdata = [];
var global_RoomID = "";
var backkanimitespage = ''

$$(document).on('pageInit', 'div[data-page="accommodation-details3"]', function(page) {

    if (addstoredataaddedroomdata.length > 0) {


        accommocounter = 0;
        accommoAddRoomlimit = 5;
        extraRoomCounter = 0;
        Appyscript.formFromJSON("#addRoomAnotherDynamic0", addstoredataaddedroomdata[0])
        for (i = 0; i < addstoredataaddedroomdata.length - 2; i++) {

            accommodation_add_another_room_type('addMoreRoom');

            Appyscript.formFromJSON("#addRoomAnotherDynamic" + 1, addstoredataaddedroomdata[i + 1]);

        }

    }



});

$$(document).on('pageInit', 'div[data-page="accommodation-detail-2"]', function(page) {
    var res = globalAddUpdateEditDltListingData.accommodationListEdit[0].accommcheckintime;
    var res1 = globalAddUpdateEditDltListingData.accommodationListEdit[0].accommcheckouttime;
    res = res.trim();
    res1 = res1.trim();
    console.log("==== res : " + res);
    //var res = hh.replace("PM", "");
    $$("#checkintimeedit").val(res)
    $$("#checkouttimeedit").val(res1)
});


AppyTemplate.registerHelper('selectedroomid', function(roomid) {

    if (roomid == globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList[0].roomTypeId) {
        return "selected";
    } else {
        return "";

    }

});

AppyTemplate.registerHelper('selectedaccomdationtypeid', function(accomTypeid) {

    if (accomTypeid == globalAddUpdateEditDltListingData.accommodationListEdit[0].accommType) {
        return "selected";
    } else {
        return "";

    }

});

AppyTemplate.registerHelper('selectedaccomdationtypecountrycode', function(accomTypecountrycode) {

    if (accomTypecountrycode == globalAddUpdateEditDltListingData.accommodationListEdit[0].accommCountry) {
        return "selected";
    } else {
        return "";

    }

});

AppyTemplate.registerHelper('checkuncehckroomanimites', function(idstring) {
    if ((accommodationdetailtwo.facilitiesList).length > 0) {
        var string = accommodationAmenities;

        var newArr = $.grep(string, function(v) {
            return v == idstring
        })

        if (newArr.length > 0) {
            return "checked";
        } else {

            return "";


        }
    } else {
        return ""
    }

});

AppyTemplate.registerHelper('checkuncehckroomlistanimites', function(idroomstring) {

    if ((accommodationdetailtwo.roomAmenities).length > 0) {
        var string = accommodationRoomSelectedAmenities;
        var newArr = $.grep(string, function(v) {
            return v == idroomstring
        })

        if (newArr.length > 0) {
            return "checked";
        } else {
            return "";
        }
    } else {
        return ""
    }

    //     if(globalAddUpdateEditDltListingData.accommodationListEdit[0]){
    //     var string = globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList[0].roomAmenities.toString()
    //
    //     if(string.includes(idroomstring)){
    //               return "checked";
    //
    //      }else{
    //
    //      return "";
    //
    //
    //      }}else{ return "" }
    //
    //
});




$$(document).on('pageInit', 'div[data-page="accommodation-detail-2"]', function(page) {

    if (updateaccomlisting == "true") {
        $('#tab1edit').show();
        // $('#tab2').hide();
        $('#tab3edit').hide();

        $$(".listing-tabs a").click(function() {
            console.log("fsdg");
            if ($(this).attr("value") == "image") {
                $('#tab1edit').show();
                // $('#tab2').hide();
                $('#tab3edit').hide();
            } else if ($(this).attr("value") == "youtube") {
                //  $$('#tab2').show();
                $('#tab1edit').hide();
                $('#tab3edit').hide();
            } else {
                $('#tab1edit').hide();
                // $('#tab2').hide();
                $('#tab3edit').show();
            }
            $(this).parent().find("a").removeClass("active");
            $(this).addClass("active");
        });

    } else {
        $('#tab1').show();
        // $('#tab2').hide();
        $('#tab3').hide();

        $$(".listing-tabs a").click(function() {
            console.log("fsdg");
            if ($(this).attr("value") == "image") {
                $('#tab1').show();
                // $('#tab2').hide();
                $('#tab3').hide();
            } else if ($(this).attr("value") == "youtube") {
                //  $$('#tab2').show();
                $('#tab1').hide();
                $('#tab3').hide();
            } else {
                $('#tab1').hide();
                // $('#tab2').hide();
                $('#tab3').show();
            }
            $(this).parent().find("a").removeClass("active");
            $(this).addClass("active");
        });

    }


});

Appyscript.customShowIndicator = function() {

    Appyscript.showIndicator();
    //    $$("body").append('<div class="preloader-indicator-overlay" ontouchmove="return false;"></div><div class="preloader-indicator-modal" style="position: absolute; left: 45% !important; top: 50%; padding: 8px; margin-right: -25px; margin-top: -25px; background: white !important; z-index: 11000; border-radius: 5px; width: 60px; height: 60px"><img src="images/hotel_loader.gif" style="width: 50px; height: 50px; margin-top: 6px; margin-left: 4px"></div>')

}
Appyscript.customHideIndicator = function() {
    Appyscript.hideIndicator();
    //    $$(".preloader-indicator-overlay").remove()
    //
    //    $$(".preloader-indicator-modal").remove()

}
var useridhotel = '';

Appyscript.hotelresetparamsearch = function() {

    clearfilterhotel();
}

Appyscript.openHotel = function() {


    //ce_showLoader();

    selectedcityuhotel = '';
    showanytimeid = ''
    globalroomdatahotel = {
        room: [],
        guest: [],
        child: []
    };
    checkinsearchdate = '';
    hotelloadmorecount = 1;
    hotelloadmorestatus = true;
    if (AppyTemplate.global.style.layout == "bottom") {
        Appyscript.hideWebViewFragment();
    }
    if (mainView.activePage.name == "accommodation-page") {
        Appyscript.closeModal();

    } else {

        AppyTemplate.global.hotelcurency = pageData.setting.currency;



        if (localStorage.getItem("userid") == "null" || localStorage.getItem("userid") == '') {

            useridhotel = localStorage.getItem("userid");
        }

        checksearchroom = '';
        checkinsearchdate = '';

        Appyscript.resetLayout(true);
        if (AppyTemplate.global.style.layout == "slidemenu") {
            Appyscript.closePanel();
        }
        AppyTemplate.global.accomtitle = pageData.pageTitle;
        if (isOnline()) {

            if (pageIdentifie.indexOf("--") != -1) {
                pageIdentifie = pageIdentifie.split("--")[0];
            }

            console.log('{"method":"getAccommodationList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","page":1,"country":"","priceRange":"","roomType":"","amenities":"","location":"' + selectedcityuhotel + '","sortby":"' + accommodation_sortby + '","sortType":"' + accommodation_sortType + '","dateRange":"' + checkinsearchdate + '","roomsReq":"' + checksearchroom + '"}')
            //        Appyscript.showIndicator();
           // ce_showLoader();

            $$.ajax({
                url: HotelBaseUrl,
                data: Appyscript.validateJSONData('{"method":"getAccommodationList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","page":1,"country":"","priceRange":"","roomType":"","amenities":"","location":"' + selectedcityuhotel + '","sortby":"' + accommodation_sortby + '","sortType":"' + accommodation_sortType + '","dateRange":"' + checkinsearchdate + '","roomsReq":"' + checksearchroom + '","count":"10","pageNo":"' + hotelloadmorecount + '"}'),



                type: 'post',
                //  contentType: "application/json; charset=utf-8",
                //321  headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(data) {
                    Appyscript.hotelgetallcity();
                    console.log("rwerwe" + data)
                    var hotelData = {};

                    hotelData = JSON.parse(data);

                    $$.get("pages/accommodation.html", function(template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(hotelData);
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });
                    });

                    //
                    //ce_hideLoader();
                    Appyscript.hideIndicator()

                },
                error: function() {

                    Appyscript.hideIndicator();

                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


                }
            })


        } else {
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
        $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');

    }
}

AppyTemplate.registerHelper('accomadationarraytostring', function(detailsdata) {
    var hotelarray = [];
    for (i = 0; i < detailsdata.length; i++) {
        hotelarray.push(detailsdata[i]);
    }
    return hotelarray.toString()
});


/*AppyTemplate.registerHelper('accomapplyofflinehtml', function(applyofflinecheck){
                            if(applyofflinecheck==0||applyofflinecheck==1){
                            var html='{{#js_compare "this.accommodationListEdit[0].accommApplyOffLine == 1" }}<select id="selectdApplyOfflineedit" readonly="readonly" style="pointer-events: none;">{{#js_compare "this.accommodationListEdit[0].accommApplyOffLine == 1"}}<option>Yes</option>{{else}}<option>No</option>{{/js_compare}}</select>'
                            }
                            return html;
                            });*/

Appyscript.openHotelsortedlist = function(accommodation_sortby, accommodation_sortType) {


    Appyscript.openfiltereddHotel(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby);



}

///sorting data

function GetHotelSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;

    }
}

function GetHotelSortOrderReverse(prop) {
    return function(a, b) {
        if (a[prop] < b[prop]) {
            return 1;
        } else if (a[prop] > b[prop]) {
            return -1;
        }
        return 0;

    }
}
///
Appyscript.hotelSubcategory = function(a) {
    var hotelData = {}
    $$.get("pages/accommodation-subcategory.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}


//subcategory


Appyscript.hoteltermcondition = function(a) {
    var hotelData = {}
    $$.get("pages/accommodation-term-and-condition.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}

var removeiddd;
Appyscript.hotelDetail = function(a) {
    console.log('{"method":"getAccommodationDetail","appId":"' + appId + '","id":"' + a.id + '","userId":"' + localStorage.getItem("userid") + '","dateRange":"' + checkinsearchdate + '"}')
    removeiddd = a;
    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getAccommodationDetail","appId":"' + appId + '","id":"' + a.id + '","userId":"' + localStorage.getItem("userid") + '","dateRange":"' + checkinsearchdate + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                console.log("rwerwe" + data)
                var hotelData = {};
                hoteldetailsdata = JSON.parse(data)
                hotelData = JSON.parse(data);

                $$.get("pages/accommodation-detail.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }




}



var accommodationCategories;


Appyscript.onPageBack('accommodation-detail-page', function(page) {

    hoteltoolbarshow();
    couponcodehotel = '';
    if ($$('.picker-modal.modal-in').length) {

        if ($$('.picker-modal.modal-in').length > 0) {
            Appyscript.closeModal('.picker-modal.modal-in');
        }

    }

});



var velocitylat;
var velocitylng;


Appyscript.onPageInit('accommodation-detail-page', function(page) {


    hoteltoolbarshow();
    hoteltoolbarshow();

    couponcodehotel = '';

    if ($$('.picker-modal.modal-in').length > 0) {
        Appyscript.closeModal('.picker-modal.modal-in');
    }

    couponDiscountAmounthotel = "";
    countAddedRoom = 1;
    countAddedRoom2 = 1;




    $$('.likeunlikes').click(function() {
        $$(this).toggleClass('onlikehotel');
        return $$(this).hasClass('onlikehotel') ? Appyscript.hoteladdtofav(this) : Appyscript.hotelremovetofav(this);
    });




    var itemsSize = 4;
    if ($$(window).width() > 480) {
        itemsSize = 6;
    }
    accommodationCategories = Appyscript.swiper('.facility-list', {
        slidesPerView: itemsSize,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        freeMode: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });

    $$(".facility-list .swiper-slide").on("click", function() {
        var index = $$(this).index();
        accommodationCategories.slideTo(index);

    })
    //
    //                      $$("a.type-button").click(function() {
    //                                                if ($$(this).text() == "Hide All") {
    //                                                $$(this).text("View All");
    //                                                } else {
    //                                                $$(this).text("Hide All");
    //                                                }
    //                                                $$(this).parent().find(".type-content").toggleClass("type-content-full");
    //                                                });

    //
    var hoteldetaillat;
    var hoteldetaillong;

    var address = hoteldetailsdata.data.address + "," + hoteldetailsdata.data.city;
    console.log(address)
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            hoteldetaillat = results[0].geometry.location.lat()
            hoteldetaillong = results[0].geometry.location.lng()
            velocitylat = hoteldetaillat;
            velocitylng = hoteldetaillong;

            setTimeout(function() {
                mapinit2();

            }, 200);
            setTimeout(function() {
                $$('#map2 .gm-style > div:not(:first-child)').remove();
                $$(".gm-style-iw").next("div").hide();
            }, 600);
        }
    });

    function mapinit2() {


        var
            latLngCenter = new google.maps.LatLng(hoteldetaillat, hoteldetaillong),
            latLngCMarker = new google.maps.LatLng(hoteldetaillat, hoteldetaillong),
            latLngA = new google.maps.LatLng(37.2, -94.1),
            latLngB = new google.maps.LatLng(38, -93),
            map = new google.maps.Map(document.getElementById('map2'), {
                zoom: 16,
                center: latLngCenter,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                draggable: true,
                zoomControl: true,

                scaleControl: false,
                streetViewControl: false,
                rotateControl: true,
                fullscreenControl: true
            }),
            markerCenter = new google.maps.Marker({
                position: latLngCMarker,
                title: address,
                map: map,
                draggable: false
            }),
            //                      infoCenter = new google.maps.InfoWindow({
            //                                                              content: "<span >USA</span>'"
            //                                                              })
            //                      infoCenter.open(map, markerCenter)

            //                      ,
            circle = new google.maps.Circle({
                map: map,
                clickable: false,

                radius: 10,
                fillColor: 'gray',
                fillOpacity: .6,
                strokeColor: '#25a8b7',
                strokeOpacity: 1,
                strokeWeight: 6
            });

               var marker = new google.maps.Marker({
                                                                         position: latLngCenter,
                                                                         map: map,
                                                                         title: address,
                                                                         label: {
                                                                             text: address,
                                                                             color: '#000000',
                                                                             fontSize: '14px',
                                                                             fontWeight: "bold",
                                                                         }
                                                                     });

        circle.bindTo('center', markerCenter, 'position');


    };



});

Appyscript.hotelForm = function(a) {
    var hotelData = {}
    $$.get("pages/accommodation-form.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}

Appyscript.hotelMenu = function(a) {
    var hotelData = {}
    $$.get("popups/accommodation-menu.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}

Appyscript.hotelShortBy = function(a) {
    var hotelData = {}
    $$.get("popups/accommodation-short-by.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        Appyscript.popup(html);

    });
}
var filterRangeData;
Appyscript.hotelFilter = function(a) {
    if (isOnline()) {


        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getRoomFilterList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '"}'),
            type: 'post',
            //                contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log(data)
                var hotelData = {};

                hotelData = JSON.parse(data);
                    filterRangeData = hotelData;
                if (hotelData.pageList.priceRange.minPrice < 0) {
                    hotelData.pageList.priceRange.minPrice = 0;
                }

                $$.get("popups/accommodation-filter.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    Appyscript.popup(html);
                    //                       mainView.router.load({
                    //                                            content: html,
                    //                                            animatePages: true
                    //                                            });
                });

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }


}
Appyscript.hotelLocation = function(a) {
    var hotelData = {}
    $$.get("popups/accommodation-location.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}

Appyscript.hotelcalender = function(a) {


    $$("#hotelanytime").html(AppyTemplate.global.pageLanguageSetting.Im_flexible_Any_Time_hyp);

    $$(".hotelSearchToggleDrop-overlay").hide();
    $$(".hotelSearchToggleDrop").hide().removeClass("on");

    var hotelData = {}
    $$.get("popups/accommodation-calender.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}
Appyscript.hotelCheckAvailability = function(a) {


    checkavailroomid = a.id;
    checkavailroomidprice = $$("#" + checkavailroomid).attr("price");
    checkavailroomidtype = $$("#" + checkavailroomid).attr("roomid");
    maxchildcountroom = parseInt($$("#" + checkavailroomid).attr("maxchildcountroom"));
    maxguestcountroom = parseInt($$("#" + checkavailroomid).attr("maxguestcountroom"));
    AppyTemplate.global.hotelroomtype = $$("#" + checkavailroomid).attr("roomtype");


    $$("#hotelSearch").html("Guest");
    $$(".hotelSearchToggleDrop-overlay").hide();
    $$(".hotelSearchToggleDrop").hide().removeClass("on");
    var hotelData = {}
    $$.get("popups/accommodation-check-availability.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}



Appyscript.onPageInit('accommodation-calender-by-page', function(page) {
    hoteltoolbarshow();
    $$("#filterhoteldata").click(function() {

    });
    var events = [{
        'Date': new Date(2016, 6, 7),
        'Title': 'Doctor appointment at 3:25pm.'
    }, {
        'Date': new Date(2016, 6, 18),
        'Title': 'New Garfield movie comes out!',
        'Link': 'https://garfield.com'
    }, {
        'Date': new Date(2016, 6, 27),
        'Title': '25 year anniversary',
        'Link': 'https://www.google.com.au/#q=anniversary+gifts'
    }, ];
    var settings = {};
    var element = document.getElementById('caleandar');
    caleandar(element, events, settings);
});


Appyscript.hotelPreview = function(aid, rid) {
    discountprice = 0;
    taxprice = 0;;
    micstaxprice = 0
    offerhotelprice = 0;
    console.log('{"method":"checkRules","appId":"' + appId + '","pageId":"' + pageIdentifie + '","accommodationId":"' + aid + '","roomId":"' + rid + '"}')
    if (isOnline()) {


        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"checkRules","appId":"' + appId + '","pageId":"' + pageIdentifie + '","accommodationId":"' + aid + '","roomId":"' + rid + '"}'),
            type: 'post',
            //                contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log("price" + data)
                hotelData = JSON.parse(data);
                var price = eval(parseInt(checkavailroomidprice) * nighttotalcount) * checktotalrooms;
                if (hotelData.status != "failed") {
                    console.log("price" + price)
                    //offer

                    var checkprice = price;
                    //tax
                    if (hotelData.rules.tax.length > 0) {

                        if (hotelData.rules.tax[0].discountRate == "percentage") {

                            taxprice = eval(price * hotelData.rules.tax[0].discountPrice / 100);
                            console.log("taxprice" + taxprice)

                        } else {
                            taxprice = hotelData.rules.tax[0].discountPrice
                            console.log("taxprice" + taxprice)
                        }
                        checkprice = checkprice + taxprice;
                    }



                    //mics tax

                    for (i = 0; i < hotelData.rules.misctax.length; i++) {

                        if (hotelData.rules.misctax[i].discountRate == "percentage") {

                            micstaxprice = eval(price * hotelData.rules.misctax[i].discountPrice / 100) + micstaxprice;
                            console.log("per" + micstaxprice)

                        } else {

                            micstaxprice = eval(hotelData.rules.misctax[i].discountPrice + micstaxprice) + micstaxprice;
                            console.log("flat" + micstaxprice)
                        }

                    }
                    checkprice = checkprice + micstaxprice;
                }


                //discount
                if (hotelData.rules.discount.length > 0) {
                    if (hotelData.rules.discount[0].discountRate == "percentage") {

                        discountprice = eval(price * hotelData.rules.discount[0].discountPrice / 100);
                        console.log("discountprice" + discountprice)
                    } else {
                        discountprice = hotelData.rules.discount[0].discountPrice;
                        console.log("discountprice" + discountprice)
                    }
                    var chcktotaldicount = eval(checkprice - discountprice);
                    if (chcktotaldicount == 0) {

                        checkprice = 0;

                    }


                }
                //offer
                if (hoteldetailsdata.data.offer) {

                    if (checkprice == 0) {

                        offerhotelprice = 0;

                    } else {

                        offerhotelprice = eval(price * parseFloat(hoteldetailsdata.data.offerPercent) / 100);

                        if (eval(offerhotelprice + discountprice) > price) {

                            offerhotelprice = eval(price - discountprice);
                        }

                    }


                    console.log("offerhotelprice" + offerhotelprice)


                }
                var totaloff = eval(offerhotelprice + discountprice);

                console.log("ramsingh" + taxprice)
                console.log(micstaxprice);
                console.log(price);
                console.log(totaloff);

                var totoalcalculation = eval(eval(taxprice + micstaxprice + parseInt(price)).toFixed(2) - totaloff).toFixed(2);

                if (totoalcalculation < 0) {

                    totoalcalculation = 0;
                }

                console.log(totoalcalculation + "hahaha" + price)

                var dfdsf = {
                    "hoteldata": [],
                    "hoteltax": hotelData
                }
                taxprice = taxprice.toFixed(2);
                micstaxprice = micstaxprice.toFixed(2);

                dfdsf.hoteldata.push(hoteldetailsdata)
                dfdsf.hoteldata.push({
                    finalprice: totoalcalculation,
                    subtotal: price,
                    totalnight: nighttotalcount,
                    totalroom: checktotalrooms,
                    checktotalguest: checktotalguest,
                    offerprice: offerhotelprice,
                    discountprice: discountprice,
                    taxprice: taxprice,
                    micstaxprice: micstaxprice
                })

                console.log("rulespush" + JSON.stringify(dfdsf))
                checkooutfinalhoteldata = dfdsf;
                checkooutfinalhoteldata.hoteldata[1].finalprice = totoalcalculation;
                console.log("rulespush" + hotelData)
                $$.get("pages/accommodation-preview.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(dfdsf);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });
                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }

}

Appyscript.hotelPreviewsss = function(a) {
    var hotelData = {}
    $$.get("popups/accommodation-readreview.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}


Appyscript.hotelConfirmation = function(id, phone) {
    console.log("phone" + phone)
    if (isOnline()) {
        Appyscript.showIndicator();
        console.log('{"method":"bookingDetail","userId":"' + localStorage.getItem("userid") + '","bookingId":"' + id + '"}')
        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"bookingDetail","userId":"' + localStorage.getItem("userid") + '","bookingId":"' + id + '"}'),
            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log("hotelconfirmation" + data)
                var hotelData = {};``
                global_RoomID="";
                hotelData = JSON.parse(data);
                Appyscript.hideIndicator();
                $$.get("pages/accommodation-confirmation.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });
                if (phone) {
                    PhoneCallhotel(phone);
                    Appyscript.hideIndicator();
                }
            },
            error: function() {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        Appyscript.hideIndicator();
    }
}
Appyscript.hotelGuestDetail = function(a) {
    var hotelData = {}
    $$.get("pages/accommodation-guest-detail.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}


Appyscript.onPageInit('accommodation-manage-booking-page', function(page) {
    hoteltoolbarshow();
    $$("#filterhoteldata").click(function() {

    });
    var itemsSize = 3;
    if ($$(window).width() > 480) {
        itemsSize = 5;
    }
    setTimeout(function() {
        $$(".hotel-category-view").css("height", ($$(window).height() - 94) + "px");;

    }, 100);


    //                      hotelHSwiper = Appyscript.swiper('.hotel-category-view');
    //                      $$(".hotel-categories-list li").on("click", function() {
    //                                                         var index = $$(this).index();
    //                                                         hotelHSwiper.slideTo(index);
    //                                                         })
    var hotelHSwiper;

    hotelHSwiper = Appyscript.swiper('.hotel-category-view');
    hotelHSwiper.on("SlideChangeEnd", function(a) {
        $$(".hotel-categories-list li").removeClass("active").eq(hotelHSwiper.activeIndex).addClass("active");
        Appyscript.autoHeighhotelPage(hotelHSwiper.activeIndex);


    });

    $$(".hotel-categories-list li").on("click", function() {
        var index = $$(this).index();
        $$(".tab_list_container li").removeClass("active").eq(index).addClass("active")
        hotelHSwiper.slideTo(index);


    })
    $$(".hotel-categories-list li").removeClass("active").eq(0).addClass("active");

});




//map create
Appyscript.onPageInit('accommodation-fullmap', function(page) {

    $$("#filterhoteldata").click(function() {

    });


    var hoteldetaillat;
    var hoteldetaillong;

    var address = hoteldetailsdata.data.address + "," + hoteldetailsdata.data.city;
    console.log(address)
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            hoteldetaillat = results[0].geometry.location.lat()
            hoteldetaillong = results[0].geometry.location.lng()

            setTimeout(function() {
                mapinit();

            }, 200);
            setTimeout(function() {
                /*$$('#map2 .gm-style > div:not(:first-child)').remove();
                  $$(".gm-style-iw").next("div").hide();*/
            }, 600);
        }
    });

    function mapinit() {


        var
            latLngCenter = new google.maps.LatLng(hoteldetaillat, hoteldetaillong),
            latLngCMarker = new google.maps.LatLng(hoteldetaillat, hoteldetaillong),
            latLngA = new google.maps.LatLng(37.2, -94.1),
            latLngB = new google.maps.LatLng(38, -93),
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 17,
                center: latLngCenter,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            }),
            markerCenter = new google.maps.Marker({
                position: latLngCMarker,
                title: 'Location',
                map: map,
                draggable: false
            }),
            infoCenter = new google.maps.InfoWindow({
                content: "<span >USA</span>'"
            }),

            circle = new google.maps.Circle({
                map: map,
                clickable: false,
                // metres
                radius: 10,
                fillColor: 'gray',
                fillOpacity: .6,
                strokeColor: '#25a8b7',
                strokeOpacity: 1,
                strokeWeight: 6
            });

           var infowindow = new google.maps.InfoWindow({
                                                                             content: "<span onclick='openDirections(this)'>"+address+"</span>"
                                                                             });

            var marker = new google.maps.Marker({
                                                                      position: latLngCenter,
                                                                      map: map,
                                                                      title: address
                                                                  });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
            });
            setTimeout(function(){
                infowindow.open(map,marker);
            },200);

        circle.bindTo('center', markerCenter, 'position');


    };

    mapinit();

    setTimeout(function() {
        /* $$('#map .gm-style > div:not(:first-child)').remove();*/
    }, 100);
});

function openDirections(a){
    let address = $(a).text();
    let urlPath = 'https://www.google.com/maps/search/?api=1&query='+address;
     Appyscript.openWebView(urlPath,data.appData.appName);
}



/* This function is used to show value */
function showValueHotelPriceRange() {

    $$("#hotelRangeValueMin").html("" + $$("#hotelrangMin").val());
    $$("#hotelRangeValueMax").html(" " + $$("#hotelrangMax").val());

}




Appyscript.onPageInit('accommodation-filter-page', function(page) {
    hoteltoolbarshow();

    $$("#filterhoteldata").click(function() {

    });

    $$("#filterhoteldata").click(function() {

    });



    $$(".htRating li").click(function() {
        $$(".htRating li").removeClass('active');
        //                                        $$(this).css("color","red")
        $$(this).addClass('active')
        accommodation_filter_star = $$(this).text();
    });


    $$("#allmenitiesfilter label").click(function() {
        if ($$(this).is(".on")) {
            $$(this).removeClass("on iconz-uncheckbox").addClass("iconz-checkbox");


            amenitiesarray.push(this.id)

        } else {

            $$(this).removeClass("iconz-checkbox").addClass("on iconz-uncheckbox");



            if (amenitiesarray.indexOf(this.id) > -1) {
                amenitiesarray.splice(amenitiesarray.indexOf(this.id), 1);
            }

        }
    });



    $$("#roomtypefilter label").click(function() {
        if ($$(this).is(".on")) {
            $$(this).removeClass("on iconz-uncheckbox").addClass("iconz-checkbox");


            roomtypesarray.push(this.id)

        } else {

            $$(this).removeClass("iconz-checkbox").addClass("on iconz-uncheckbox");



            if (roomtypesarray.indexOf(this.id) > -1) {
                roomtypesarray.splice(roomtypesarray.indexOf(this.id), 1);
            }

        }
    });



 if(filterRangeData.pageList.priceRange.minPrice != filterRangeData.pageList.priceRange.maxPrice){

    var slider = document.getElementById('accommodationrangGet');


    noUiSlider.create(slider, {
        start: [parseInt($$("#hotelRangeValueMin").text()), parseInt($$("#hotelRangeValueMax").text())],
        step: 1,
        connect: true,
        range: {
            'min': parseInt($$("#hotelRangeValueMin").text()),
            'max': parseInt($$("#hotelRangeValueMax").text())
        }

    });




    slider.noUiSlider.on('update', function(values, handle) {

        accommodation_filter_range = parseInt(values[0]) + "-" + parseInt(values[1]);

        $$("#hotelrangMin").val(parseInt(values[0]));

        $$("#hotelrangMax").val(parseInt(values[1]));
        showValueHotelPriceRange();
    });



    accommodation_filter_range = parseInt($$("#hotelRangeValueMin").text()) + "-" + parseInt($$("#hotelRangeValueMax").text());


}

});


//filter sorting
function openfilterhotel() {

    accommodation_filter_amenties = amenitiesarray.toString()
    accommodation_filter_roomtype = roomtypesarray.toString()
    Appyscript.openfiltereddHotel(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby)
}


Appyscript.onPageInit('accommodation-preview-page', function(page) {

    hoteltoolbarshow();

});

Appyscript.onPageBack('accommodation-preview-page', function(page) {




    var guest = 0;
    var child = 0;
    var rooms = 0;
    $$(".countroom").each(function(index, obj) {

        guest = eval(+$$("#guest" + obj.id).val() + guest);
        child = eval(+$$("#child" + obj.id).val() + child);
        rooms = eval(+rooms + 1);


    });
    countAddedRoom = rooms;

    console.log(countAddedRoom)




});


Appyscript.onPageInit('accommodation-check-availability-page', function(page) {
    hoteltoolbarshow();
    setTimeout(function() {
        if (globalroomdatahotel.room.length > 0) {
            $$.each(globalroomdatahotel.room, function(index, element) {
                console.log(globalroomdatahotel.guest[index])
                var guest = 0;
                var child = 0;
                var rooms = 0;
                $$(".countroom").each(function(index, obj) {
                    guest = eval(+$$("#guest" + obj.id).val() + guest);
                    child = eval(+$$("#child" + obj.id).val() + child);
                    rooms = eval(+rooms + 1);
                });
                countAddedRoom = rooms;
                countAddedRoom = countAddedRoom + 1;
                var HotelRoomuniquieId = Math.round((new Date()).getTime() / 1000) + countAddedRoom;
                var showcros = '';
                if (index != 0) {
                    showcros = '<span onclick="removeHotelRoom(' + HotelRoomuniquieId + ');"class="iconz-remove itemRemove" style="color:{{@global.styleAndNavigation.icon[1]}}"></span>';
                }
                compiledBGTemplate = AppyTemplate.compile('<div class="room-book-item countroom" id="' + HotelRoomuniquieId + '"> <a class="room-qty-title item-link {{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}; border-color:{{@global.styleAndNavigation.borderColor}}" id="itemcountroom' + HotelRoomuniquieId + '">' + AppyTemplate.global.pageLanguageSetting.room + ' ' + countAddedRoom + '</a> ' + showcros + ' <div class="room-book-item-content"> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.Adults + ' (' + AppyTemplate.global.pageLanguageSetting.plus_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusR' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="' + globalroomdatahotel.guest[index] + '" class="room-qty-nub qtyR' + HotelRoomuniquieId + '" readonly="readonly" id="guest' + HotelRoomuniquieId + '" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addR' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.children + ' (' + AppyTemplate.global.pageLanguageSetting.below_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusRchild' + HotelRoomuniquieId + '" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}" id=""></a> <input type="number" id="child' + HotelRoomuniquieId + '" value="' + globalroomdatahotel.child[index] + '" class="room-qty-nub qtyRchild' + HotelRoomuniquieId + '" readonly="readonly" id="" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addRchild' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> </div> </div>'),
                bghtml = compiledBGTemplate();
                $$("#HotelAddMoreRooms").append(bghtml);
                hotelroomaddmoreinit(HotelRoomuniquieId);
                roomcountchekout.push("room")
            })
        } else {
            var initroomid = Math.round((new Date()).getTime() / 1000);
            compiledBGTemplate = AppyTemplate.compile('<div class="room-book-item countroom" id="' + initroomid + '"> <a class="room-qty-title item-link {{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}; border-color:{{@global.styleAndNavigation.borderColor}}" id="itemcountroom' + Math.round((new Date()).getTime() / 1000) + '">' + AppyTemplate.global.pageLanguageSetting.room + ' 1</a> <div class="room-book-item-content"> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.Adults + ' (' + AppyTemplate.global.pageLanguageSetting.plus_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusR" id="' + initroomid + '" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="1" class="room-qty-nub qtyR" readonly="readonly"  id="guest' + initroomid + '" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addR" id="' + initroomid + '" style="color:{{@global.styleAndNavigation.icon[1]}};border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.children + ' (' + AppyTemplate.global.pageLanguageSetting.below_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusRchild" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="0" class="room-qty-nub qtyRchild" readonly="readonly" id="child' + initroomid + '" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addRchild" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> </div> </div>'),
                bghtml = compiledBGTemplate();

            $$(".room-book-item").append(bghtml);
            $$(".addR").click(function() {
                if (this.previousElementSibling.value < maxguestcountroom) {
                    var newQty = +(this.previousElementSibling.value) + 1;
                    this.previousElementSibling.value = newQty
                } else {
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
                }
            });

            $$(".minusR").click(function() {
                var newQty = +(this.nextElementSibling.value) - 1;
                if (newQty < 1) newQty = 1;
                this.nextElementSibling.value = newQty
            });

            $$(".addRchild").click(function() {
                if (this.previousElementSibling.value < maxchildcountroom) {
                    var newQty = +(this.previousElementSibling.value) + 1;
                    this.previousElementSibling.value = newQty;
                } else {
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
                }
            });

            $$(".minusRchild").click(function() {
                var newQty = +(this.nextElementSibling.value) - 1;
                if (newQty < 0) newQty = 0;
                this.nextElementSibling.value = newQty
            });
        }
    }, 200);

    if ($$('.picker-modal.modal-in').length) {

        if ($$('.picker-modal.modal-in').length > 0) {
            Appyscript.closeModal('.picker-modal.modal-in');
        }
    }

    console.log("backkkkk")
    countAddedRoom = 1;
    countAddedRoom2 = 1;
    nighttotalcount = 1;

    $$("#filterhoteldata").click(function() {

    });

    $$.each(hoteldetailsdata.data.room, function(index, value) {
        if (value.id == checkavailroomid) {
            hotelavaildata.push(value)
        }
    });
    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var ci = ''
    var cout = ''

    if (checkinsearchdate != '') {
        ci = new Date(checkinsearchdate.split("-")[0]).getDate() + "  " + monthShortNames[new Date(checkinsearchdate.split("-")[0]).getMonth()] + " " + new Date(checkinsearchdate.split("-")[0]).getFullYear();
        cout = new Date(checkinsearchdate.split("-")[1]).getDate() + "  " + monthShortNames[new Date(checkinsearchdate.split("-")[1]).getMonth()] + " " + new Date(checkinsearchdate.split("-")[1]).getFullYear();
        checkindate = new Date(checkinsearchdate.split("-")[0])
        checkindateavail = eval(checkindate.getMonth() + 1) + "/" + checkindate.getDate() + "/" + checkindate.getFullYear()
        checkoutdate = new Date(checkinsearchdate.split("-")[1])
        checkoutdateavail = eval(checkoutdate.getMonth() + 1) + "/" + checkoutdate.getDate() + "/" + checkoutdate.getFullYear()
        $$("#checkindate").text(ci);
        $$("#checkoutdate").text(cout)
        nighttotalcount = eval(findaywithdate(checkindate, checkoutdate))
    } else {
        ci = new Date().getDate() + "  " + monthShortNames[new Date().getMonth()] + " " + new Date().getFullYear();
        cout = new Date(+new Date() + 86400000).getDate() + "  " + monthShortNames[new Date(+new Date() + 86400000).getMonth()] + " " + new Date(+new Date() + 86400000).getFullYear();
        checkindate = new Date()
        checkindateavail = eval(checkindate.getMonth() + 1) + "/" + checkindate.getDate() + "/" + checkindate.getFullYear()
        checkoutdate = new Date(+new Date() + 86400000)
        checkoutdateavail = eval(checkoutdate.getMonth() + 1) + "/" + checkoutdate.getDate() + "/" + checkoutdate.getFullYear()
    }
    $$("#checkindate").text(ci);
    $$("#checkoutdate").text(cout)
});




function hotelroomaddmoreinit(id) {
    $$(".addR" + id).click(function() {
        if (this.previousElementSibling.value < maxguestcountroom) {
            var newQty = +(this.previousElementSibling.value) + 1;
            this.previousElementSibling.value = newQty
        } else {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
        }
    });

    $$(".minusR" + id).click(function() {
        var newQty = +(this.nextElementSibling.value) - 1;
        if (newQty < 1) newQty = 1;
        this.nextElementSibling.value = newQty
    });

    $$(".addRchild" + id).click(function() {
        if (this.previousElementSibling.value < maxchildcountroom) {
            var newQty = +(this.previousElementSibling.value) + 1;
            this.previousElementSibling.value = newQty;
        } else {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
        }
    });

    $$(".minusRchild" + id).click(function() {
        var newQty = +(this.nextElementSibling.value) - 1;
        if (newQty < 0) newQty = 0;
        this.nextElementSibling.value = newQty
    });
}

function hotelSearchToggle(obj) {
    var a = $$(".hotelSearchToggleDrop ");
    if (a.is(".on")) {
        $$("#hotelclearsearchshow").show();
        $$("#hotelclearsearch").hide();
        $$(".hotelSearchToggleDrop-overlay").hide();
        a.hide().removeClass("on")
    } else {
        $$("#hotelclearsearchshow").hide();
        $$("#hotelclearsearch").show();
        $$(".hotelSearchToggleDrop-overlay").show();
        a.show().addClass("on");
    }
}

//append room

function hotelappendRoom() {
    var guest = 0;
    var child = 0;
    var rooms = 0;
    $$(".countroom").each(function(index, obj) {
        guest = eval(+$$("#guest" + obj.id).val() + guest);
        child = eval(+$$("#child" + obj.id).val() + child);
        rooms = eval(+rooms + 1);
    });
    countAddedRoom = rooms;
    countAddedRoom = countAddedRoom + 1;
    var HotelRoomuniquieId = Math.round((new Date()).getTime() / 1000) + countAddedRoom;
    compiledBGTemplate = AppyTemplate.compile('<div class="room-book-item countroom" id="' + HotelRoomuniquieId + '"> <a class="room-qty-title item-link {{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}; border-color:{{@global.styleAndNavigation.borderColor}}" id="itemcountroom' + HotelRoomuniquieId + '">' + AppyTemplate.global.pageLanguageSetting.room + ' ' + countAddedRoom + '</a> <span onclick="removeHotelRoom(' + HotelRoomuniquieId + ');"class="iconz-remove itemRemove" style="color:{{@global.styleAndNavigation.icon[1]}}"></span> <div class="room-book-item-content"> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.Adults + ' (' + AppyTemplate.global.pageLanguageSetting.plus_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusR' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="1" class="room-qty-nub qtyR' + HotelRoomuniquieId + '" readonly="readonly" id="guest' + HotelRoomuniquieId + '" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addR' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.children + ' (' + AppyTemplate.global.pageLanguageSetting.below_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusRchild' + HotelRoomuniquieId + '" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}" id=""></a> <input type="number" id="child' + HotelRoomuniquieId + '" value="0" class="room-qty-nub qtyRchild' + HotelRoomuniquieId + '" readonly="readonly" id="" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addRchild' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> </div> </div>'),
    bghtml = compiledBGTemplate();
    $$("#HotelAddMoreRooms").append(bghtml);
    hotelroomaddmoreinit(HotelRoomuniquieId);
    roomcountchekout.push("room")
    var scrollContent = $$(mainView.activePage.container).find(".room-book-item")[0];
    scrollContent.scrollTop = scrollContent.scrollHeight;
}

//helper for hotel listing

AppyTemplate.registerHelper('accommodationSubcatgoryList', function(data) {
    console.log("ramsingh" + data)
    var HotelSubcatgoryListdetails = '';
    $$.each(data, function(index, element) {
        var HotelHalfRatingHtml = element.rating;
        var reviewCount = '';
        if (element.reviewCount > 0) {
            if (element.reviewCount == 1) {
                reviewCount = '<span>' + element.reviewCount + ' Review</span>';
            } else {
                reviewCount = '<span>' + element.reviewCount + ' Reviews</span>';
            }
        }
        var offershow = '';
        if (element.offer) {
            offershow = element.currency + '' + element.lowestPrice;
        }
        console.log("sdas" + element)
        var hotelhalfset = true;
        HotelHalfRatingHtml = HotelHalfRatingHtml.toString().split('.');
        var HotelRatingHtml = '<span class="ratingView"><fieldset class="ratingStar">';
        for (var i = 1; i <= 5; i++) {
            if (i <= parseInt(element.rating)) {
                HotelRatingHtml += '<label class="half on" for="starhalf" title="0.5 stars"></label><label class="full on" for="star1" title="1 star"></label>';
            } else {
                if (HotelHalfRatingHtml[1] && hotelhalfset) {
                    HotelRatingHtml += '<label class="half on" for="star1half" title="1.5 stars"></label><label class="full" for="star2" title="2 stars"></label>';
                    hotelhalfset = false;
                } else {
                    HotelRatingHtml += '<label class="half" for="star2half" title="2.5 stars"></label><label class="full" for="star3" title="3 stars"></label>';
                }
            }
        }
        HotelRatingHtml += ' </fieldset></span>' + reviewCount;
        var hotoffer = '';
        if (element.featured == 1) {
            hotoffer = '<i class="iconz-fire" style="color:{{@global.styleAndNavigation.title[3]}}"></i>';
        }
        var HotelImageUrl;
        HotelImageUrl = element.image[0].image;
        HotelSubcatgoryListdetails += '<li  data-name="' + element.name + '" onclick="Appyscript.hotelDetail(this);" id="' + element.id + '" class="lazy lazy-fadein"> <div class="squareContent"> <div class="innerTable"> <div class="innerTableCell"> <img src="images/image-2x1.png" alt="" style="background-image:url(' + HotelImageUrl + ')" class="dirImgMain"/> <div class="category-detail {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="background:{{@global.styleAndNavigation.title[2]}}; color:{{@global.styleAndNavigation.title[3]}};"> <h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}};"><div class="price" style="color:{{@global.styleAndNavigation.activeColor}}">' + element.currency + '' + parseInt(eval(element.lowestPrice - (element.lowestPrice / 100 * element.offerPercent))) + '</div>' + element.name + ' </h1><div class="row"> <div class="rating" >' + element.accomType + '</div><div class="rating pull-right old-price">' + offershow + '</div></div>  <div class="row"><div class="rating">' + HotelRatingHtml + '</div> <div class="feature-list">' + hotoffer + '</div> </div> </div> </div> </div> </div> </li>';
    });
    compiledBGTemplate = AppyTemplate.compile(HotelSubcatgoryListdetails),
    bghtml = compiledBGTemplate();
    return bghtml;
});


AppyTemplate.registerHelper('accommodationSubcatgoryListfav', function(data) {
    console.log("ramsingh" + data)
    var HotelSubcatgoryListdetails = '';
    $$.each(data, function(index, element) {
        var HotelHalfRatingHtml = element.rating;
        var reviewCount = '';
        if (element.reviewCount > 0) {
            if (element.reviewCount == 1) {
                reviewCount = '<span>' + element.reviewCount + ' Review</span>';
            } else {
                reviewCount = '<span>' + element.reviewCount + ' Reviews</span>';
            }
        }
        var offershow = '';
        if (element.offer) {
            offershow = element.offerPercent + " % off"
        }
        console.log("sdas" + element)
        var hotelhalfset = true;
        HotelHalfRatingHtml = HotelHalfRatingHtml.toString().split('.');
        var HotelRatingHtml = '<span class="ratingView"><fieldset class="ratingStar">';
        for (var i = 1; i <= 5; i++) {
            if (i <= parseInt(element.rating)) {
                HotelRatingHtml += '<label class="half on" for="starhalf" title="0.5 stars"></label><label class="full on" for="star1" title="1 star"></label>';
            } else {

                if (HotelHalfRatingHtml[1] && hotelhalfset) {
                    HotelRatingHtml += '<label class="half on" for="star1half" title="1.5 stars"></label><label class="full" for="star2" title="2 stars"></label>';
                    hotelhalfset = false;
                } else {
                    HotelRatingHtml += '<label class="half" for="star2half" title="2.5 stars"></label><label class="full" for="star3" title="3 stars"></label>';
                }
            }
        }
        HotelRatingHtml += ' </fieldset></span>' + reviewCount;
        var HotelImageUrl;
        //                     console.log("dummy"+element.images[0].substring(0,1));
        HotelImageUrl = element.image[0].image;
        var hotoffer = '';
        if (element.featured == 1) {
            hotoffer = '<i class="iconz-fire" style="color:{{@global.styleAndNavigation.title[3]}}"></i>';
        }
        HotelSubcatgoryListdetails += '<li data-name="' + element.name + '" onclick="Appyscript.hotelDetail(this);" id="' + element.id + '"   class="lazy lazy-fadein"> <div class="squareContent"> <div class="innerTable"> <div class="innerTableCell"> <img src="images/image-2x1.png" alt="" style="background-image:url(' + HotelImageUrl + ')" class="dirImgMain"/> <div class="category-detail {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="background:{{@global.styleAndNavigation.title[2]}}; color:{{@global.styleAndNavigation.title[3]}};"> <h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}};"><div class="price">' + element.currency + ' ' + element.lowestPrice + '</div>-  ' + element.name + '</h1><div class="row"> <div class="rating">' + element.accomType + '</div> <div class="rating pull-right">' + offershow + '</div></div><div class="row"><div class="rating">' + HotelRatingHtml + '</div> <div class="feature-list">' + hotoffer + '</div> </div> </div> </div> </div> </div> </li>';
    });
    compiledBGTemplate = AppyTemplate.compile(HotelSubcatgoryListdetails),
        bghtml = compiledBGTemplate();
    return bghtml;
});
//for get current location


function HotelLocationSeacrh(output) {
    console.log(output)
    var status;
    var results;
    var html = '';
    var msg = '';
    // Set document elements
    var search = document.getElementById('accommodationLocationId').value;
    var output = document.getElementById(output);
    if (!isOnline()) {
        Appyscript.alert(pageData.languageSetting.Internet_connection_is_not_available, pageData.languageSetting.alert_dir);
    } else {
        if (search) {
            console.log(search)
            output.innerHTML = '';
            setTimeout(function() {
                var api = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + encodeURIComponent(search) + '&key=' + data.googlePlacesApiKey;
                Appyscript.hideIndicator();
                $$.ajax({
                    type: 'GET',
                    url: api,
                    dataType: 'json',
                    success: function(data) {
                        console.log(data)
                        Appyscript.hideIndicator();
                        if (data.status != "REQUEST_DENIED") {
                            if (data.predictions.length > 0) {
                                var iCounter;
                                // List multiple returns
                                if (data.predictions.length > 1) {
                                    for (iCounter = 0; iCounter < data.predictions.length; iCounter++) {
                                        html += '<li class="close-popup"  href="#" rel="' + data.predictions[iCounter].description + '" title="Click for to see a weather report">' + data.predictions[iCounter].description + '</li>';
                                    }
                                } else {
                                    html += '<li class="close-popup"   href="#" rel="' + data.predictions[0].reference + '" title="Click for to see a weather report">' + data.predictions[0].description + '</li>';
                                }


                                html = html + '</ul>';

                                output.innerHTML = html;

                            } else {
                                output.innerHTML = "";
                            }
                        } else {
                            Appyscript.hideIndicator();
                            apiname = "Google";
                            serviceFailedNotify(data.status, apiname, 1);
                            Appyscript.alert(data.error_message, appnameglobal_allpages);
                        }
                    },
                    error: function(data) {
                        Appyscript.hideIndicator();
                        output.innerHTML = An_error_has_occurred;
                        apiname = "Google";
                        var flag = 0;
                        serviceFailedNotify(data.status, apiname, flag);
                    }
                });
            }, 500);

        } else {
            // No search given
            output.innerHTML = '';
        }
    }
}




// get current address

function HotelinitCurrentAddress() {
    navigator.geolocation.getCurrentPosition(HotelSuccessAddress, HotelErrorAddress);
}

function HotelSuccessAddress(position) {

    postions = position
    //    console.log("lat"+postions)
    Appyscript.hideIndicator();
    if (isOnline()) {
        $$.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + postions.coords.latitude + ',' + postions.coords.longitude + '&sensor=true',
            type: 'get',
            async: true,
            success: function(data) {

                data = JSON.parse(data);
                if (data.status != "REQUEST_DENIED") {
                    $$("#hotelSearch").html(data.results[0].address_components[3].short_name + "," + data.results[0].address_components[data.results[0].address_components.length - 5].long_name);
                    Appyscript.hideIndicator();
                } else {
                    Appyscript.hideIndicator();
                    apiname = "Google";
                    serviceFailedNotify(data.status, apiname, 1);
                    Appyscript.alert(data.error_message, appnameglobal_allpages);
                }
            },
            error: function(data) {
                Appyscript.hideIndicator();
                //Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                apiname = "Google";
                var flag = 0;
                serviceFailedNotify(data, apiname, flag);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function HotelErrorAddress(error) {

}


function removeHotelRoom(event) {
    countAddedRoom = countAddedRoom - 1;
    countAddedRoom2 = countAddedRoom2 - 1;
    $$('#' + event).remove();
    updateroomhtmllistoing()
    roomcountchekout.pop();
}




AppyTemplate.registerHelper('Ratinghelperaccomadation', function(starcount) {
    var HotelHalfRatingHtml = starcount;
    var hotelhalfset = true;
    HotelHalfRatingHtml = HotelHalfRatingHtml.toString().split('.');
    var HotelRatingHtml = '<span class="ratingList"><fieldset class="ratingStar">';
    for (var i = 1; i <= 5; i++) {
        if (i <= parseInt(starcount)) {
            HotelRatingHtml += '<label class="half on" for="starhalf" title="0.5 stars"></label><label class="full on" for="star1" title="1 star"></label>';
        } else {
            if (HotelHalfRatingHtml[1] && hotelhalfset) {
                HotelRatingHtml += '<label class="half on" for="star1half" title="1.5 stars"></label><label class="full" for="star2" title="2 stars"></label>';
                hotelhalfset = false;
            } else {
                HotelRatingHtml += '<label class="half" for="star2half" title="2.5 stars"></label><label class="full" for="star3" title="3 stars"></label>';
            }
        }
    }
    HotelRatingHtml += ' </fieldset></span>';
    return HotelRatingHtml;
});



//for filter hotel


Appyscript.openfiltereddHotel = function(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby) {
    hotelloadmorestatus = false;
    if (isOnline()) {
        console.log('{"method":"getAccommodationList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","page":1,"country":"","priceRange":"' + accommodation_filter_range + '","roomType":"' + roomtypesarray.toString() + '","amenities":"' + amenitiesarray.toString() + '","location":"' + selectedcityuhotel + '","rating":"' + accommodation_filter_star + '","sortby":"' + accommodation_sortby + '","sortType":"' + accommodation_sortType + '","dateRange":"' + checkinsearchdate + '","roomsReq":"' + checksearchroom + '"}')
        Appyscript.showIndicator();
        $$.ajax({
            url: HotelBaseUrl,
            data: '{"method":"getAccommodationList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","page":1,"country":"","priceRange":"' + accommodation_filter_range + '","roomType":"' + roomtypesarray.toString() + '","amenities":"' + amenitiesarray.toString() + '","location":"' + selectedcityuhotel + '","rating":"' + accommodation_filter_star + '","sortby":"' + accommodation_sortby + '","sortType":"' + accommodation_sortType + '","dateRange":"' + checkinsearchdate + '","roomsReq":"' + checksearchroom + '"}',
            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log("rasingh" + data)
                var hotelData = {};
                //             accommodation_filter_range='';
                //                 accommodation_filter_star='';
                //                 accommodation_filter_roomtype='';
                //                accommodation_filter_amenties='';
                //                 accommodation_sortby='';
                //                accommodation_sortType='';
                //                amenitiesarray=[]
                //                roomtypesarray=[];
                //                totalhotelsearchguestguest=0;
                //                checksearchroom='';
                data = JSON.parse(data);
                var HotelSubcatgoryListdetails = '';
                $$.each(data.pageList, function(index, element) {
                    var HotelHalfRatingHtml = element.rating;
                    var reviewCount = '';
                    if (element.reviewCount > 0) {
                        if (element.reviewCount == 1) {
                            reviewCount = '<span>' + element.reviewCount + ' Review</span>';
                        } else {
                            reviewCount = '<span>' + element.reviewCount + ' Reviews</span>';
                        }
                    }
                    var offershow = '';
                    if (element.offer) {
                        offershow = element.currency + '' + element.lowestPrice;
                    }
                    console.log("sdas" + element)
                    var hotelhalfset = true;
                    HotelHalfRatingHtml = HotelHalfRatingHtml.toString().split('.');
                    var HotelRatingHtml = '<span class="ratingView"><fieldset class="ratingStar">';
                    for (var i = 1; i <= 5; i++) {
                        if (i <= parseInt(element.rating)) {
                            HotelRatingHtml += '<label class="half on" for="starhalf" title="0.5 stars"></label><label class="full on" for="star1" title="1 star"></label>';
                        } else {
                            if (HotelHalfRatingHtml[1] && hotelhalfset) {
                                HotelRatingHtml += '<label class="half on" for="star1half" title="1.5 stars"></label><label class="full" for="star2" title="2 stars"></label>';
                                hotelhalfset = false;
                            } else {
                                HotelRatingHtml += '<label class="half" for="star2half" title="2.5 stars"></label><label class="full" for="star3" title="3 stars"></label>';
                            }
                        }
                    }
                    HotelRatingHtml += ' </fieldset></span>' + reviewCount;
                    var hotoffer = '';
                    if (element.featured == 1) {
                        hotoffer = '<i class="iconz-fire" style="color:{{@global.styleAndNavigation.title[3]}}"></i>';
                    }
                    var HotelImageUrl;
                    HotelImageUrl = element.image[0].image;
                    HotelSubcatgoryListdetails += '<li  data-name="' + element.name + '" onclick="Appyscript.hotelDetail(this);" id="' + element.id + '" class="lazy lazy-fadein"> <div class="squareContent"> <div class="innerTable"> <div class="innerTableCell"> <img src="images/image-2x1.png" alt="" style="background-image:url(' + HotelImageUrl + ')" class="dirImgMain"/> <div class="category-detail {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="background:{{@global.styleAndNavigation.title[2]}}; color:{{@global.styleAndNavigation.title[3]}};"> <h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}};"><div class="price" style="color:{{@global.styleAndNavigation.activeColor}}">' + element.currency + '' + parseInt(eval(element.lowestPrice - (element.lowestPrice / 100 * element.offerPercent))) + '</div>' + element.name + ' </h1><div class="row"> <div class="rating" >' + element.accomType + '</div><div class="rating pull-right old-price">' + offershow + '</div></div>  <div class="row"><div class="rating">' + HotelRatingHtml + '</div> <div class="feature-list">' + hotoffer + '</div> </div> </div> </div> </div> </div> </li>';
                });
                compiledBGTemplate = AppyTemplate.compile(HotelSubcatgoryListdetails),
                    bghtml = compiledBGTemplate();
                $$("#hotelisting").html('')

                if (bghtml == '') {
                    $$("#hotelisting").append('<div class="msg-code" style="margin-top: 200px;"> <div class="msg-container"><span class="icon appyicon-no-data" style="color: #5c5c5c;">  </span></div> </div>')
                } else {
                    $$("#hotelisting").append(bghtml)
                }
                console.log("mahipalsir" + bghtml)
                Appyscript.hideIndicator();
            },
            error: function() {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
    $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');
}
// photo browser for all


var coommonphotobrowsers;

function coommonphotobrowser(photoindex, imageTitle) {
    var image_arr = [];

    hoteldetailsdata.data.image.forEach(function(element, index) {
        if (element.type == "image") {
            image_arr.push(element.image)
        }
    })
    var shareicon = '';
    var imagearrayphotpage = image_arr;
    coommonphotobrowsers = Appyscript.photoBrowser({
        zoom: 400,
        photos: imagearrayphotpage,
        theme: 'dark',
        exposition: true,
        lazyLoading: true,
        toolbar: false,
        navbarTemplate: '<div class="navbar"> <div class="navbar-inner " style="background-color: {{@global.style.headerBarBackgroundColor}}; color: {{@global.style.headerBarTextColor}};"> <div class="left sliding"> <a onclick="closeAppypiegalaryhotel();"  style="color:{{@global.style.headerBarIconColor}};"> <i class="icon icon-left-open-2"></i> </a> </div> <div class="center sliding"> <div class="topHeader {{@global.style.headerBarSize}} {{@global.style.headerBarFont}}">' + imageTitle + '</div> </div> <div class="right" > <a  ' + shareicon + ' class="iconz-option-vertical" style="color:{{@global.style.headerBarIconColor}};" onclick="openactionphotopagehotel()" style="color:#ffffff;"></a></div> </div> </div>',

        onOpen: function(coommonphotobrowsers) {
            photodeviceorientation();
            var target = coommonphotobrowsers.params.loop ? coommonphotobrowsers.swiper.slides : coommonphotobrowsers.slides;
            target.each(function(index) {
                var hammertime = new Hammer(this);
                hammertime.get('pinch').set({
                    enable: true
                });
                hammertime.on('pinchstart', coommonphotobrowsers.onSlideGestureStart);
                hammertime.on('pinchmove', coommonphotobrowsers.onSlideGestureChange);
                hammertime.on('pinchend', coommonphotobrowsers.onSlideGestureEnd);
            });
        },
        onSlideChangeEnd: function(swiper) {
            photodeviceorientation();
        }
    });
    coommonphotobrowsers.open(photoindex);
}


function closeAppypiegalaryhotel() {
    coommonphotobrowsers.close();
}


//read all reviews


Appyscript.hotelreadallreviews = function(a) {
    if ($$('.picker-modal.modal-in').length) {
        if ($$('.picker-modal.modal-in').length > 0) {
            Appyscript.closeModal('.picker-modal.modal-in');
        }
    }

    console.log('{"method":"getAccommodationReview","appId":"' + appId + '","id":"' + a.id + '"}')
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getAccommodationReview","appId":"' + appId + '","id":"' + a.id + '"}'),
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log("ramsssss" + data)
                var hotelData = {};
                hotelData = JSON.parse(data);

                $$.get("popups/accommodation-readreview.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });
                Appyscript.hideIndicator();
            },
            error: function() {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

// for open policypage popup


var accommodation_title;
var accommodation_details;
Appyscript.hotelpolicypage = function(pagename, data) {

    accommodation_title = data.title;
    accommodation_details = data.attributes.description.nodeValue;
    Appyscript.popupPage('accommodation-policydetails')

    setTimeout(function() {


        $$("#accommodation_title").text(accommodation_title)


        $$("#accommodation_details").html(accommodation_details)

    }, 100);
}




Appyscript.hotelpayment = function() {


}

var sessionToken = "";

function HotelPaymentMethod(aa) {

    if ($$("#hotelguesttitle").val() == "Select title") {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.selecttitle, appnameglobal_allpages);

    } else if ($$("#hotelguestfname").val() == "") {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_first_name, appnameglobal_allpages);
    } else if ($$("#hotelguestlname").val() == '') {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_last_name, appnameglobal_allpages);

    } else if ($$("#hotelguestemail").val() == '') {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_emailid_mcom, appnameglobal_allpages);

    } else if (!Appyscript.validateEmail($$("#hotelguestemail").val())) {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_enter_valid_email_id, appnameglobal_allpages);

    } else if ($$("#hotelguestphone").val() == '') {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_emailid_mcom, appnameglobal_allpages);
    } else if (parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice) == 0) {
        checkooutfinalhoteldata.hoteldata.push({
            hotelguesttitle: $$("#hotelguesttitle").val(),
            hotelguestfname: $$("#hotelguestfname").val(),
            hotelguestlname: $$("#hotelguestlname").val(),
            hotelguestemail: $$("#hotelguestemail").val(),
            hotelguesttitle: $$("#hotelguesttitle").val(),
            hotelguestphone: $$("#hotelguestphone").val()
        })
        hotelonegopayment();

    }else{
        checkooutfinalhoteldata.hoteldata.push({
            hotelguesttitle: $$("#hotelguesttitle").val(),
            hotelguestfname: $$("#hotelguestfname").val(),
            hotelguestlname: $$("#hotelguestlname").val(),
            hotelguestemail: $$("#hotelguestemail").val(),
            hotelguesttitle: $$("#hotelguesttitle").val(),
            hotelguestphone: $$("#hotelguestphone").val()
        })
        hotelonegopayment();
    }
     /*else {
        if (isOnline()) {

            Appyscript.showIndicator();

            var postdata = '{"method":"getPaymentGatewaySettings","appId":"' + appId + '","pageName":"accommodation"}';
            var HotelBaseUrlPayment = webserviceUrl + "PaymentGateways.php";
            console.log(postdata)
            $$.ajax({
                url: HotelBaseUrlPayment,
                data: Appyscript.validateJSONData(postdata),
                type: "post",
                //321  headers: {'accessToken': deviceEncryptedToken},
                timeout: 10000,
                async: true,
                success: function(jsonData, textStatus) {

                    checkooutfinalhoteldata.hoteldata.push({
                        hotelguesttitle: $$("#hotelguesttitle").val(),
                        hotelguestfname: $$("#hotelguestfname").val(),
                        hotelguestlname: $$("#hotelguestlname").val(),
                        hotelguestemail: $$("#hotelguestemail").val(),
                        hotelguesttitle: $$("#hotelguesttitle").val(),
                        hotelguestphone: $$("#hotelguestphone").val()
                    })

                    console.log("checkooutfinalhoteldatacheckoou                  " + JSON.stringify(checkooutfinalhoteldata));
                    console.log("ram" + jsonData)
                    console.log("ecomPaymentMethod::::dfd::" + JSON.stringify(jsonData));
                    var data = JSON.parse(jsonData);
                    if (data.paymentDetails.length) {
                        if ((typeof data.paymentDetails !== "undefined") && ((data.paymentDetails) != null) && ((data.paymentDetails.length) > 0)) {
                            var paymentsmethode = {};
                            paymentsmethode.list = [];
                            for (i = 0; i < data.paymentDetails.length; i++) {
                                var item = data.paymentDetails[i];
                                //var sessionToken = data.paymentDetails[i].credentials.velocityAccessToken;
                                var label = typeof item.label !== "undefined" ? (item.label != null ? item.label : "") : "";
                                var key = typeof item.key !== "undefined" ? (item.key != null ? item.key : "") : "";
                                var phoneNo = "",
                                    merchantId = "",
                                    merchantKey = "",
                                    saltKey = "",
                                    clientId = "",
                                    secretKey = "",
                                    paypalId = "",
                                    phoneText = "",
                                    sessionToken = "",
                                    applicationLicense_ID = "",
                                    applicationProfile_ID = "",
                                    velocityToken_ID = "",
                                    velocityMerchantProfile_ID = "",
                                    velocityWorkflow_ID = "",
                                    consumer_Key = "",
                                    consumer_Secret = "";

                                if (typeof item.credentials !== "undefined") {
                                    var credentials = item.credentials;
                                    phoneNo = typeof credentials.phoneNo !== "undefined" ? (credentials.phoneNo != null ? credentials.phoneNo : "") : "";
                                    phoneText = typeof credentials.phoneText !== "undefined" ? (credentials.phoneText != null ? credentials.phoneText : "") : "";
                                    merchantId = typeof credentials.merchantId !== "undefined" ? (credentials.merchantId != null ? credentials.merchantId : "") : "";
                                    merchantKey = typeof credentials.merchantKey !== "undefined" ? (credentials.merchantKey != null ? credentials.merchantKey : "") : "";
                                    secretKey = typeof credentials.secretKey !== "undefined" ? (credentials.secretKey != null ? credentials.secretKey : "") : "";
                                    clientId = typeof credentials.clientId !== "undefined" ? (credentials.clientId != null ? credentials.clientId : "") : "";
                                    sessionToken = typeof credentials.sessionToken !== "undefined" ? (credentials.sessionToken != null ? credentials.sessionToken : "") : "";
                                    applicationLicense_ID = typeof credentials.applicationLicense_ID !== "undefined" ? (credentials.applicationLicense_ID != null ? credentials.applicationLicense_ID : "") : "";
                                    applicationProfile_ID = typeof credentials.applicationProfile_ID !== "undefined" ? (credentials.applicationProfile_ID != null ? credentials.applicationProfile_ID : "") : "";
                                    velocityToken_ID = typeof credentials.velocityToken_ID !== "undefined" ? (credentials.velocityToken_ID != null ? credentials.velocityToken_ID : "") : "";
                                    velocityMerchantProfile_ID = typeof credentials.velocityMerchantProfile_ID !== "undefined" ? (credentials.velocityMerchantProfile_ID != null ? credentials.velocityMerchantProfile_ID : "") : "";
                                    velocityWorkflow_ID = typeof credentials.velocityWorkflow_ID !== "undefined" ? (credentials.velocityWorkflow_ID != null ? credentials.velocityWorkflow_ID : "") : "";

                                    consumer_Key = typeof credentials.pesapal_consumer_key !== "undefined" ? (credentials.pesapal_consumer_key != null ? credentials.pesapal_consumer_key : "") : "";
                                    consumer_Secret = typeof credentials.pesapal_consumer_secret !== "undefined" ? (credentials.pesapal_consumer_secret != null ? credentials.pesapal_consumer_secret : "") : "";

                                    if (key == "payu_money") {
                                        saltKey = secretKey;
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
                                        "page": "accommodation"
                                    });
                                else if (key == "payu_money")
                                    paymentsmethode.list.push({
                                        "method": "payu",
                                        "tabClassId": "payu",
                                        "tabActive": tabActive,
                                        "label": label,
                                        "paymentMethodKey": key,
                                        "merchantId": merchantId,
                                        "saltKey": saltKey,
                                        "page": "accommodation"
                                    });
                                else if (key == "paypal")
                                    paymentsmethode.list.push({
                                        "method": "paypal",
                                        "tabClassId": "paypal",
                                        "tabActive": tabActive,
                                        "label": label,
                                        "paymentMethodKey": key,
                                        "paypalId": paypalId,
                                        "page": "accommodation"
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
                                        "page": "accommodation"
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
                                        "page": "accommodation"
                                    });

                                else if (key == "velocity") {
                                    var sessionToken = data.paymentDetails[i].credentials.velocityAccessToken;
                                    var applicationLicense_ID = data.paymentDetails[i].credentials.velocityApplicationLicence;
                                    var applicationProfile_ID = data.paymentDetails[i].credentials.velocityApplicationProfile;
                                    var velocityToken_ID = data.paymentDetails[i].credentials.velocityIdentityToken;
                                    var velocityMerchantProfile_ID = data.paymentDetails[i].credentials.velocityMerchantProfileId;
                                    var velocityWorkflow_ID = data.paymentDetails[i].credentials.velocityWorkflowId;
                                    paymentsmethode.list.push({
                                        "method": "velocity",
                                        "tabClassId": "velocity",
                                        "tabActive": tabActive,
                                        "label": label,
                                        "paymentMethodKey": key,
                                        "applicationProfileId": applicationProfile_ID,
                                        "workflowId": velocityWorkflow_ID,
                                        "merchantProfileId": velocityMerchantProfile_ID,
                                        "identityToken": velocityToken_ID,
                                        "sessionToken": sessionToken,
                                        "applicationLicenseID": applicationLicense_ID,
                                        "page": "accommodation"
                                    });
                                } else if (key == "stripe"){
                                    paymentsmethode.list.push({
                                        "method": "stripe",
                                        "tabClassId": "stripe",
                                        "tabActive": tabActive,
                                        "label": label,
                                        "paymentMethodKey": key,
                                        "clientId": clientId,
                                        "secretKey": secretKey,
                                        "page": "accommodation"
                                    });
                                    }
                                else if (key == "cod"){
                                    paymentsmethode.list.push({
                                        "method": "cod",
                                        "tabClassId": "cod",
                                        "tabActive": tabActive,
                                        "label": label,
                                        "paymentMethodKey": key,
                                        "page": "accommodation"
                                    });
                                }else if (key == "pesapal") {
                                    paymentsmethode.list.push({
                                    "method": "pesapal",
                                    "tabClassId": "pesapal",
                                    "tabActive": tabActive,
                                    "label": label,
                                    "paymentMethodKey": key,
                                    "consumer_Key": consumer_Key,
                                    "consumer_Secret": consumer_Secret,
                                    "page": "accommodation"
                                    });
                                }
                            }

                            paymentsmethode.innerlanguage = true;
                            var innerlanguagedata = {};

                            innerlanguagedata.expiry_month = pageData.languageSetting.expiry_month_food;
                            innerlanguagedata.expiry_year = pageData.languageSetting.expiry_year_food;
                            innerlanguagedata.cvv_code = pageData.languageSetting.check_the_back_of_your_credit_card_for_cvv_mcom;
                            innerlanguagedata.place_order = pageData.languageSetting.place_order_food;
                            innerlanguagedata.card_holder_name = pageData.languageSetting.card_holder_name_mcom;
                            innerlanguagedata.call_now = pageData.languageSetting.call_now_food;
                            innerlanguagedata.confirm = pageData.languageSetting.confirm_food;
                            innerlanguagedata.payment_method = pageData.languageSetting.payment_method_food;
                            paymentsmethode.innerlanguagedata = innerlanguagedata;

                            if (key == "velocity") {
                                $$.get("pages/accommodation-payment.html", function(template) {
                                    var compiledTemplate = AppyTemplate.compile(template);

                                    if ((key) == "velocity" && applicationLicense_ID != undefined) {
                                        Appyscript.callAzureApi(data.paymentDetails.length, "velocity", applicationLicense_ID);
                                    }

                                    var html = compiledTemplate(paymentsmethode);
                                    mainView.router.load({
                                        content: html,
                                        animatePages: true
                                    });
                                });
                            } else {
                                $$.get("pages/accommodation-payment.html", function(template) {
                                    var compiledTemplate = AppyTemplate.compile(template);

                                    var html = compiledTemplate(paymentsmethode);
                                    mainView.router.load({
                                        content: html,
                                        animatePages: true
                                    });
                                });
                            }
                        }

                    } else {
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
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
    }*/
};


function accommodationPaymentRegistrationInfo(paymentTypeObject) {
    var a = $$(paymentTypeObject).parent();
    var paymentMethodKey = a.attr("data-key");
    var paytype = paymentMethodKey;

    console.log('{ "method": "codBooking", "appId": "' + appId + '", "data":{"pageId": "' + pageIdentifie + '", "userId": "' + useridhotel + '", "accommodationId": "' + checkooutfinalhoteldata.hoteldata[0].data.id + '", "roomId": "' + checkavailroomidtype + '", "currencyCode": "' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '","roomDetails":' + JSON.stringify(globalroomdatahotelforconfirm) + ', "offer": "' + checkooutfinalhoteldata.hoteldata[0].data.offer + '", "offerPercent": "' + checkooutfinalhoteldata.hoteldata[0].data.offerPercent + '", "offerAmount": "' + offerhotelprice + '", "price": "' + checkavailroomidprice + '", "coupon": "' + couponcodehotel + '", "couponDiscountAmount": "' + couponDiscountAmounthotel + '", "ruleDiscountAmount": "' + discountprice + '", "taxAmount": "' + taxprice + '", "misTax": "' + micstaxprice + '", "totalRooms": "' + checktotalrooms + '", "grandTotal": "' + checkooutfinalhoteldata.hoteldata[1].finalprice + '", "bookStartDate": "' + eval(checkindate.getMonth() + 1) + "/" + checkindate.getDate() + "/" + checkindate.getFullYear() + '", "bookEndDate": "' + eval(checkoutdate.getMonth() + 1) + "/" + checkoutdate.getDate() + "/" + checkoutdate.getFullYear() + '", "adult": "' + checktotalguest + '","totalNights": "' + nighttotalcount + '",  "child": "' + checktotalchild + '","payment_type": "",' + JSON.stringify(checkooutfinalhoteldata.hoteldata[2]).substring(1, JSON.stringify(checkooutfinalhoteldata.hoteldata[2]).length - 1) + ',"appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","adminEmail": "' + localStorage.adminEmail + '"}}')
    console.log(localStorage.getItem("userid") + useridhotel)
    if (global_RoomID !== "") {
        var card = validateDetailsCardRoom("velocity");
        paymentType = "velocity";
        executePaywithVelocity(paymentTypeObject, global_RoomID, card);
        return false;
    }
    if (isOnline()) {
        $$.ajax({
            url: HotelBaseUrl,
            data: '{ "method": "codBooking", "appId": "' + appId + '", "data":{"pageId": "' + pageIdentifie + '", "userId": "' + useridhotel + '", "accommodationId": "' + checkooutfinalhoteldata.hoteldata[0].data.id + '", "roomId": "' + checkavailroomidtype + '", "currencyCode": "' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '", "offer": "' + checkooutfinalhoteldata.hoteldata[0].data.offer + '","roomDetails":' + JSON.stringify(globalroomdatahotelforconfirm) + ', "offerPercent": "' + checkooutfinalhoteldata.hoteldata[0].data.offerPercent + '", "offerAmount": "' + offerhotelprice + '", "price": "' + checkavailroomidprice + '", "coupon": "' + couponcodehotel + '", "couponDiscountAmount": "' + couponDiscountAmounthotel + '", "ruleDiscountAmount": "' + discountprice + '", "taxAmount": "' + taxprice + '", "misTax": "' + micstaxprice + '", "totalRooms": "' + checktotalrooms + '", "grandTotal": "' + checkooutfinalhoteldata.hoteldata[1].finalprice + '", "bookStartDate": "' + eval(checkindate.getMonth() + 1) + "/" + checkindate.getDate() + "/" + checkindate.getFullYear() + '", "bookEndDate": "' + eval(checkoutdate.getMonth() + 1) + "/" + checkoutdate.getDate() + "/" + checkoutdate.getFullYear() + '", "adult": "' + checktotalguest + '","totalNights": "' + nighttotalcount + '",  "child": "' + checktotalchild + '","payment_type": "' + paytype + '",' + JSON.stringify(checkooutfinalhoteldata.hoteldata[2]).substring(1, JSON.stringify(checkooutfinalhoteldata.hoteldata[2]).length - 1) + ',"appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","adminEmail": "' + localStorage.adminEmail + '"}}',
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log(data)
                //                Appyscript.hotelPreview();
                data = JSON.parse(data)
                console.log("orderid" + data.data.orderId)
                paymentorderidd = parseInt(data.data.orderId);
                if (useridhotel == "") {
                    localStorage.setItem("userid", data.data.userId)
                    localStorage.setItem("username", checkooutfinalhoteldata.hoteldata[2].hotelguestfname);
                    localStorage.setItem("email", checkooutfinalhoteldata.hoteldata[2].hotelguestemail);
                    localStorage.setItem("phone", checkooutfinalhoteldata.hoteldata[2].hotelguestphone);
                    localStorage.setItem("hlastname", checkooutfinalhoteldata.hoteldata[2].hotelguestlname);
                    localStorage.setItem("htitle", checkooutfinalhoteldata.hoteldata[2].hotelguesttitle);
                }

                var paymentType;
                var creditCardDetail = null;
                var a = $$(paymentTypeObject).parent();
                var paymentMethodKey = a.attr("data-key");

                if (paymentMethodKey == "cc") {
                    creditCardDetail = hotelCreditCardDetailOfUser("cc");
                    if (creditCardDetail == null)
                        return

                    paymentType = "cc";
                } else if (paymentMethodKey == "payu_money") {
                    paymentType = "payu_money";
                    var payTypeObj = $$(paymentTypeObject).parent();
                    var merchantId = payTypeObj.attr("data-merchantId");
                    var saltKey = payTypeObj.attr("data-saltKey");
                    //                parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice)
                    HotelopenPayuViewNative(parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice), paymentorderidd, appId, checkooutfinalhoteldata.hoteldata[2].hotelguestfname, checkooutfinalhoteldata.hoteldata[2].hotelguestlname, checkooutfinalhoteldata.hoteldata[2].hotelguestemail, checkooutfinalhoteldata.hoteldata[2].hotelguestphone, merchantId, saltKey, site_url, "accommodation")
                    console.log(saltKey + merchantId + payTypeObj)
                } else if (paymentMethodKey == "paypal") {
                    paymentType = "paypal_express";
                    var payTypeObj = $$(paymentTypeObject).parent();
                    var paypalId = payTypeObj.attr("data-paypalId");

                    var htmlForm = Appyscript.getPayPalHtml("", paypalId, parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice),
                        checkooutfinalhoteldata.hoteldata[0].data.currencyCode, paymentorderidd, site_url + "/paypalmobile/success",
                        site_url + "/paypalmobile/accommodation-notify/orderId/" + paymentorderidd + "/appId/" + appId + "/userId/" + localStorage.getItem("userid") + "/paymentType/paypal");
                    openPaypalNativeHotel(htmlForm, "", pageData.pageTitle)

                }else if (paymentMethodKey == "pesapal") {
                     paymentType = "pesapal";
                     global_RoomID = paymentorderidd;
                     openPesapalPayment(paymentType,global_RoomID);
                     //var payTypeObj = $$(paymentTypeObject).parent();
                     //var consumerKey = payTypeObj.attr("data-consumerKey");
                     //var consumerSecret = payTypeObj.attr("data-consumerSecret");

                 } else if (paymentMethodKey == "payfast") {
                    paymentType = "payfast";
                    var payTypeObj = $$(paymentTypeObject).parent();
                    var payfastmerId = payTypeObj.attr("data-payfastmerId");
                    var merchantKey = payTypeObj.attr("data-merchantKey");

                    var htmlForm = Appyscript.getPayFastHtml("", payfastmerId, merchantKey, parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice), checkooutfinalhoteldata.hoteldata[0].data.currencyCode, paymentorderidd, site_url + "/paypalmobile/payfast-success", site_url + "/paypalmobile/payfast-cancel", site_url + "/paypalmobile/accommodation-notify/orderId/" + paymentorderidd + "/appId/" + appId + "/userId/" + localStorage.getItem("userid") + "/paymentType/payfast", checkooutfinalhoteldata.hoteldata[0].data.name, checkooutfinalhoteldata.hoteldata[0].data.email, checkooutfinalhoteldata.hoteldata[0].data.name, "");
                    openPayFastNativeHotel(htmlForm, "", pageData.pageTitle)

                } else if (paymentMethodKey == "velocity") {
                    global_RoomID = paymentorderidd;
                    paymentType = "velocity";
                    var card = validateDetailsCardRoom("velocity");
                    executePaywithVelocity(paymentTypeObject, paymentorderidd, card);
                } else if (paymentMethodKey == "cc_phone") {
                    paymentType = "ccPhone";
                    var payTypeObj = $$(paymentTypeObject).parent();
                    var sellerPhoneNo = payTypeObj.attr("data-phoneNo");
                    Appyscript.hotelcodbookconfirmation(paymentorderidd, "ccPhone", sellerPhoneNo)
                } else if (paymentMethodKey == "stripe") {
                    creditCardDetail = hotelCreditCardDetailOfUser("stripe");
                    if (creditCardDetail == null)
                        return;
                    paymentType = "stripe";
                } else {
                    paymentType = 'cod';
                    Appyscript.hotelcodbookconfirmation(paymentorderidd, "COD")
                }
                if (paymentMethodKey == "stripe") {
                    hotelCreditCardPaymentThroughStripe(paymentTypeObject, creditCardDetail);
                }
                if (paymentMethodKey == "cc") {
                    Appyscript.hotelccpaymentmethod(creditCardDetail, paymentorderidd);
                }
                //     Appyscript.hotelConfirmation(data.data.orderId)
            },
            error: function() {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

/***************************/
        //PESAPAL PAYMENT//
/***************************/

function openPesapalPayment(paymentType,global_RoomID){
     var orderId = global_RoomID;
     Appyscript.hideIndicator();
     var pesaUrl = webserviceUrl+"CommonPaymentGateway/pesapal/pesapal.php";
     var postPesaData = '{"method":"getPesapalForm","appId":"' + appId + '","pagename" : "'+ pageData.pageId +'","amount" :"' + parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice) + '","orderDesc" :" testing demo ","orderId":"' + orderId + '","currency":"' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '","fName":"' + checkooutfinalhoteldata.hoteldata[0].data.name + '","mobile":"' + checkooutfinalhoteldata.hoteldata[0].data.phone + '","email":"' + checkooutfinalhoteldata.hoteldata[0].data.email + '"}';
     console.log("postData pesapal  " + postPesaData);
     Appyscript.showIndicator();
     $$.ajax({
         url: pesaUrl,
         data: postPesaData,
         type: 'post',
         async: true,
         //321 headers: {'accessToken': deviceEncryptedToken},
         success: function(getData) {
             getData = JSON.parse(getData);
             console.log("Pesapal   " + JSON.stringify(getData));
             //console.log("HTML   "+getData.html_form);
             if (getData.error_message == "Success") {
                 Appyscript.hideIndicator();
                 Appyscript.openPesapal(getData.html_form, "accommodation", data.appData.appName, global_RoomID);
             } else {
                 Appyscript.alert(getData.error_message, appnameglobal_allpages);
             }
         },
         function(err) {
             Appyscript.hideIndicator();
             Appyscript.alert(tempLang.SORRY_REQUEST_CANNOT_BE_PROCESSED, appnameglobal_allpages);

         }
     });
};

function hotelUpdateFromNativeSidePesapal(status, orderIdPar) {
    if (status.toLowerCase() == "success") {
        Appyscript.hotelcodbookconfirmation(paymentorderidd, "pesapal", "", orderIdPar)
    } else {
        Appyscript.hideIndicator();
    }
};


function openhotelcaledores(type, any) {

    var pickerange = false;
    if (any != '') {
        pickerange = true;
    }
    var datetype;
    if (type == "cin") {
        datetype = AppyTemplate.global.pageLanguageSetting.Check_In_Dir;
    } else {
        datetype = AppyTemplate.global.pageLanguageSetting.check_out;
    }

    var modal = Appyscript.modal({
        title: "<div class='pull-left'>" + datetype + "</div><p style='padding: 10px; position: absolute; top: 5px; right: 10px;' class='pull-right' onclick='Appyscript.closeModal();'>X</p>",
        afterText: '<div id="calendar-inline-container"></div>',

    })

    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var datyshort = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var calendarInline = Appyscript.calendar({
        container: '#calendar-inline-container',
        value: [],
        weekHeader: false,
        direction: "vertical",
        disabled: {
            from: new Date(1980, 12, 1),
            to: new Date(+new Date() - 86400000)
        },

        toolbarTemplate: '<div class="toolbar calendar-custom-toolbar rrrr">' +
            '<div class="toolbar-inner">' +
            '<div class="left">' +
            '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
            '</div>' +
            '<div class="center"></div>' +
            '<div class="right">' +
            '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
            '</div>' +
            '</div>' +
            '</div>',
        onOpen: function(p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function() {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function() {
                calendarInline.nextMonth();
            });
        },
        onDayClick: function(p, dayContainer, year, month, day) {

            Appyscript.closeModal();
            var d = year + "/" + eval(parseInt(month) + 1) + "/" + day;

            console.log("rewrwerewr" + d)
            var serverdate = eval(parseInt(month) + 1) + "/" + day + "/" + year;
            console.log("ramsingh" + d + serverdate);
            if (type == "cin") {
                $$("#checkindate").text(Appyscript.dateformatevcita(new Date(d)));
                checkindateavail = serverdate;
                checkindate = new Date(d)
                if (checkoutdate) {
                    nighttotalcount = eval(findaywithdate(checkindate, checkoutdate))
                    console.log("diffcheckindate" + nighttotalcount)
                }
            } else {
                $$("#checkoutdate").text(Appyscript.dateformatevcita(new Date(d)))

                checkoutdateavail = serverdate;
                checkoutdate = new Date(d)
                nighttotalcount = eval(findaywithdate(checkindate, checkoutdate))
                console.log("diffcheckoutdate" + nighttotalcount)
            }
            if (any != '') {
            } else {
                Appyscript.closeModal();
            }
        },
        onMonthYearChangeStart: function(p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
        }
    });
    $$(".rrrr").parents().eq(3).attr("style", "display: block;margin-top: -200px;")
}


///date

Appyscript.dateformatevcita = function(getTimeDate) {
    date = getTimeDate;
    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var datyshort = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "  " + monthShortNames[date.getMonth()] + " " + date.getFullYear();
}


function updateroomhtmllistoing() {
    $$(".countroom").each(function(index, obj) {
        $$("#itemcountroom" + obj.id).text(AppyTemplate.global.pageLanguageSetting.room + " " + eval(index + 1));
    });
}

function findaywithdate(date1, date2) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDifference;
}
///check booking avaibilty on room

var maxBookRoom ="";
Appyscript.hotelcheckroomavailbility = function() {
    console.log('{"method":"checkBookingDate","appId":"' + appId + '","pageId":"' + pageIdentifie + '","dateFrom":"' + checkindateavail + '","dateTo":"' + checkoutdateavail + '","accommodationId":"' + hoteldetailsdata.data.id + '","roomId":"' + checkavailroomidtype + '","rooms":' + countAddedRoom + '}')
    maxBookRoom = pageData.setting.maxBookingRooms;
    if (checkindate.setHours(00, 00, 00, 00) >= checkoutdate.setHours(00, 00, 00, 00)) {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_select_valid_date);
    } else {
        if (isOnline()) {
            Appyscript.showIndicator();
            if((countAddedRoom > maxBookRoom)&&(maxBookRoom!="")){
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.maxium_limit_allowed_for_booking +" "+ maxBookRoom);
                    Appyscript.hideIndicator();
                    return false;
                }
            $$.ajax({
                url: HotelBaseUrl,
                data: Appyscript.validateJSONData('{"method":"checkBookingDate","appId":"' + appId + '","pageId":"' + pageIdentifie + '","dateFrom":"' + checkindateavail + '","dateTo":"' + checkoutdateavail + '","accommodationId":"' + hoteldetailsdata.data.id + '","roomId":"' + checkavailroomidtype + '","rooms":' + countAddedRoom + '}'),
                type: 'post',
                //321  headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(data) {
                    console.log(data)
                    data = JSON.parse(data);
                    if (data.avalibility) {
                        AppyTemplate.global.hotelcheckindatelanguge = $$("#checkindate").text()
                        AppyTemplate.global.hotelcheckoutdatelanguge = $$("#checkoutdate").text()
                        Appyscript.hotelPreview(hoteldetailsdata.data.id, checkavailroomidtype);
                        calculatecheckoutrooms();
                    } else {
                        if (data.rooms > 0) {
                            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_only + " " + data.rooms + " " + AppyTemplate.global.pageLanguageSetting.rooms_are_available_for_your_applied_filter, appnameglobal_allpages);
                        } else {
                            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.no_room_available, appnameglobal_allpages);
                        }
                    }
                    Appyscript.hideIndicator();
                },
                error: function() {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            })
        } else {
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    }
}

//for apyemnt code

function hotelapplycoupon() {
    //    if(couponDiscountAmounthotel !='' ){
    //        Appyscript.alert("Coupon Already applied",appnameglobal_allpages);
    //        return ;
    //    }
    console.log('{"method":"appyCoupon","appId":"' + appId + '","pageId":"' + pageIdentifie + '","accommodationId": "' + checkooutfinalhoteldata.hoteldata[0].data.id + '", "roomId": "' + checkavailroomid + '","coupon":"' + $$("#couponcodeapply").val() + '"}');

    if (isOnline()) {
        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: '{"method":"appyCoupon","appId":"' + appId + '","pageId":"' + pageIdentifie + '","accommodationId": "' + checkooutfinalhoteldata.hoteldata[0].data.id + '", "roomId": "' + checkavailroomid + '","coupon":"' + $$("#couponcodeapply").val() + '"}',

            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                Appyscript.hideIndicator();
                console.log(data)
                data = JSON.parse(data);
                if (data.status == "success") {
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.coupon_applied_successfully, appnameglobal_allpages);
                    var coupontotal;
                    if (data.coupon.discountType == "percentage") {
                        coupontotal = eval(parseFloat(checkooutfinalhoteldata.hoteldata[1].finalprice) * parseFloat(data.coupon.discount) / 100);
                        console.log("percentage" + coupontotal)
                    } else {
                        coupontotal = parseFloat(data.coupon.discount);
                        console.log("flat" + coupontotal)
                    }

                    console.log(coupontotal)
                    console.log(parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice))
                    if (coupontotal >= parseFloat(checkooutfinalhoteldata.hoteldata[1].finalprice) || coupontotal < 0) {
                        $$("#couponapply").html('Coupon(' + data.coupon.coupon + ') <span class="f-right">-' + hoteldetailsdata.data.currency + ' ' + parseFloat(checkooutfinalhoteldata.hoteldata[1].finalprice) + '</span>');
                        $$("#couponapply").show();
                        $$("#grandtotalhotal").text(hoteldetailsdata.data.currency + "0")
                        $$("#couponcodeapply").val('');
                        couponDiscountAmounthotel = checkooutfinalhoteldata.hoteldata[1].finalprice;
                        couponcodehotel = data.coupon.coupon
                    } else {
                        console.log(coupontotal)
                        console.log(parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice));
                        couponDiscountAmounthotel = coupontotal;
                        $$("#couponapply").html('Coupon(' + data.coupon.coupon + ') <span class="f-right">-' + hoteldetailsdata.data.currency + ' ' + coupontotal.toFixed(2) + '</span>')
                        $$("#couponapply").show();
//                        $$("#grandtotalhotal").text(eval(checkooutfinalhoteldata.hoteldata[1].finalprice - couponDiscountAmounthotel).toFixed(2))
                                        $$("#grandtotalhotal").html(hoteldetailsdata.data.currency+''+eval(checkooutfinalhoteldata.hoteldata[1].finalprice-couponDiscountAmounthotel).toFixed(2))
                        $$("#couponcodeapply").val('');
                        couponcodehotel = data.coupon.coupon;
                    }
                } else {
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.coupon_code_doesnot_exist, appnameglobal_allpages);
                }
                Appyscript.hideIndicator();
            },
            error: function() {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}


//calculate rooms
var globalroomdatahotelforconfirm = {
    room: [],
    guest: [],
    child: [],
    extraBed: []
};

function calculatecheckoutrooms() {

    var guest = 0;
    var child = 0;
    var rooms = 0;
    globalroomdatahotelforconfirm = {
        room: [],
        guest: [],
        child: [],
        extraBed: []
    };
    $$(".countroom").each(function(index, obj) {
        globalroomdatahotelforconfirm.room.push(eval(index + 1))
        globalroomdatahotelforconfirm.guest.push($$("#guest" + obj.id).val())
        globalroomdatahotelforconfirm.child.push($$("#child" + obj.id).val())
        globalroomdatahotelforconfirm.extraBed.push("0")
        guest = eval(+$$("#guest" + obj.id).val() + guest);
        child = eval(+$$("#child" + obj.id).val() + child);
        rooms = eval(+rooms + 1);
    });

    checktotalchild = child;
    checktotalrooms = rooms;
    checktotalguest = guest
    console.log(checktotalchild + "room" + checktotalrooms + "child" + checktotalguest)
}


//helper [ercentage html


AppyTemplate.registerHelper('accommodationpercentage', function(type, amount) {
    if (type == "percentage") {
        return checkooutfinalhoteldata.hoteldata[1].subtotal * amount / 100;
    } else {
        return amount;
    }
})




//for booking history

Appyscript.hotelhistorypage = function(a) {
    console.log('{"method":"bookingHistory","appId":"' + appId + '","pageId":"' + pageIdentifie + '","userId":"' + localStorage.getItem("userid") + '"}')
    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"bookingHistory","appId":"' + appId + '","pageId":"' + pageIdentifie + '","userId":"' + localStorage.getItem("userid") + '"}'),
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                console.log("rwerwe" + data)
                var hotelData = {};

                hotelData = JSON.parse(data);

                if (hotelData.status == "failed") {

                    errorPageWithTitleIconError(AppyTemplate.global.accomtitle, "appyicon-no-data", "no data ");
                } else {
                    $$.get("pages/accommodation-manage-booking.html", function(template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(hotelData);
                        if (a) {
                            mainView.router.reloadContent(html);
                        } else {
                            mainView.router.load({
                                content: html,
                                animatePages: true
                            });

                        }
                    });

                }



                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }




}

///cancel


Appyscript.hotelcancelorder = function(a) {

    console.log('{"method":"cancelBooking","appId":"' + appId + '","userId":"' + localStorage.getItem("userid") + '","cancelId":"' + a.id + '","lang": "' + localStorage.lang + '","appName":"' + localStorage.getItem("appName") + '"}')

    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"cancelBooking","appId":"' + appId + '","userId":"' + localStorage.getItem("userid") + '","cancelId":"' + a.id + '","lang": "' + localStorage.lang + '","appName":"' + localStorage.getItem("appName") + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                console.log("cancel" + data)
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.bookingcanceledalert, appnameglobal_allpages);
                Appyscript.hotelhistorypage(a.id)

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }




}



//wrtie review

Appyscript.hotelpostReview = function(a) {
    var hotelData = {
        "accomid": a.id
    }
    console.log(hotelData)
    $$.get("popups/accommodation-review.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}



Appyscript.hotelsubmitReviewAndRating = function(accomid) {


    var rnrText = $$("#rnrTextArea").text();
    var review = document.getElementById("rnrTextArea").value;


    var rating = starValue;
    if (parseInt(starValue) < 1) {
        Appyscript.alert(pageData.languageSetting.SELECT_RATING, appnameglobal_allpages);
        return;

    }
    Appyscript.hideIndicator();



    $$.ajax({
        url: HotelBaseUrl,
        data: Appyscript.validateJSONData('{"method":"postReview","appId":"' + appId + '","userId":"' + localStorage.getItem("userid") + '","rating":"' + parseInt(starValue) + '","comments":"' + review + '","accommodationId":"' + accomid.id + '","pageId":"' + pageIdentifie + '"}'),



        type: 'post',
        //  contentType: "application/json; charset=utf-8",
        //321  headers: {'accessToken': deviceEncryptedToken},
        async: true,
        success: function(data) {

            console.log("review" + data)
            Appyscript.alert(pageData.languageSetting.review_added_successfully, appnameglobal_allpages);
            Appyscript.hideIndicator();
            mainView.router.back();
        },
        error: function() {

            Appyscript.hideIndicator();

            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


        }
    })

    if (isOnline()) {

    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}



//for notification page




Appyscript.hotelnotificationpage = function(a) {

    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"pushnotification","appId":"' + appId + '","pageId":"' + pageIdentifie + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                console.log("notifi" + data)
                var hotelData = {};

                hotelData = JSON.parse(data);

                $$.get("pages/accommodation-notification.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }




}

///set profile imageon menu


$$(document).on('pageInit', 'div[data-page="accommodation-Menu"]', function(page) {


    if (localStorage.getItem("userid")) {

        $$("#hotellogin").hide();
        $$("#Hotelbookingmenu").show();
        $$("#Hotelfavmenu").show();
        $$("#accomaddlisting").show();
        $$("#accomupdatelisting").show();

    } else {

        $$("#hotellogout").hide();
        $$("#Hotelbookingmenu").hide();
        $$("#Hotelfavmenu").hide();
        $$("#accomaddlisting").hide();
        $$("#accomupdatelisting").hide();
    }


    $$("#accomuser").text(localStorage.getItem("username"));


    if (localStorage.getItem("profileImage") == null || localStorage.getItem("profileImage") == '') {


    } else {
        $$('#accompic').attr('src', localStorage.getItem("profileImage"));
        $$("#accompic2").attr("style", "background:url(" + localStorage.getItem("profileImage") + ")");
    }




});

$$(document).on('pageInit', 'div[data-page="accommodation-cal"]', function(page) {

    openhotelcaledoresfull();


});




//set city helper
$$(document).on('pageInit', 'div[data-page="accommodation-citylist"]', function(page) {

    Appyscript.accommodationcityList();


})
$$(document).on('pageInit', 'div[data-page="accommodation-page"]', function(page) {

    favpagehotel = false;

    if (showanytimeid != '' || selectedcityuhotel != '' || checkinsearchdate != '') {

        Appyscript.openfiltereddHotel(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby);
    }

    var a = $$(".hotelSearchToggleDrop ");
    if (a.is(".on")) {

        $$("#hotelclearsearchshow").hide();

        $$("#hotelclearsearch").show();

    } else {
        $$("#hotelclearsearch").hide();
        $$("#hotelclearsearchshow").show();
    }



    if (selectedcityuhotel != '') {



        $$("[id=hotelanywhere]").html(selectedcityuhotel);
        $$("[id=hotelanywheredrop]").html('<i class="icon-globe-3" style="color:' + AppyTemplate.global.styleAndNavigation.icon[1] + '"></i>' + selectedcityuhotel);

    }
    $$("#hotelcalendar-range").val(checkinsearchdate)

    if (showanytimeid != '') {

        $$("#hotelanytime").html(showanytimeid)
    }

    if (globalroomdatahotel.guest.length > 0) {

        var numbers = globalroomdatahotel.guest;

        function getSum(total, num) {
            return parseInt(total) + parseInt(num);
        }




        $$("#hotelanyguest").html(numbers.reduce(getSum) + " Guest")

        $$("#hotelanyguestdrop").html('<i class="iconz-user" style="color:' + AppyTemplate.global.styleAndNavigation.icon[1] + '"></i>' + numbers.reduce(getSum) + ' ' + AppyTemplate.global.pageLanguageSetting.guest);



    }



    //for calendor

    var calendarRange = Appyscript.calendar({
        input: '#hotelcalendar-range',
        dateFormat: 'mm/dd/yyyy',
        //                                                        closeByOutsideClick:false,
        rangePicker: true,
        disabled: {
            from: new Date(1980, 12, 1),
            to: new Date(+new Date() - 86400000)
        },
        yearPickerTemplate: '<p id="hotelrangeselect" style="display:none;font-size: 15px; color: red">Select range</p><div style="color: green; /* margin-left: -100px; */ position: relative; z-index: 1; padding: 15px; font-size: 20px;" class="" onclick="searchcalhotel()">Done</div>'
    });



    //end cal




})


$$(document).on('pageInit', 'div[data-page="accommodation-favpage"]', function(page) {

    favpagehotel = true;


})


//filter city

function hotelcityFilter(a) {
    var thisVal = $$(a).val();

    //    alert(thisVal)

    $$(".searchListLoc li").hide().each(function() {
        if ($$(this).attr("city").indexOf(thisVal) != -1) {

            //                                        console.log("yes")
            $$(this).show()
            $$("#hotelcitylisting").hide()
        } else {
            //                                        console.log("no")
            $$("#hotelcitylisting").show()
        }



    });
}

Appyscript.hotelgetallcity = function(a) {
    if (isOnline()) {

        //        Appyscript.showIndicator();
        //ce_showLoader();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getCityList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log(data)
                hotelcitylist = JSON.parse(data);


                //                Appyscript.hideIndicator();
                //ce_hideLoader();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }


}

//citylist helper
Appyscript.accommodationcityList = function() {

    if (hotelcitylist.popularCityList.length < 0) {


        $$("#popularciy").hide();

    }

    //                            console.log("ramsingh"+data)

    var HotelRatingHtml = '';


    $$.each(hotelcitylist.pageList, function(index, element) {

        HotelRatingHtml += '<li city="' + element + '" id="' + element + '" onclick="Appyscript.hotelselectedcity(this)" class="close-popup" href="#" rel="Noida, Uttar Pradesh, India" title="Click for to see a weather report">' + element + '</li>'

    });

    compiledBGTemplate = AppyTemplate.compile(HotelRatingHtml),
        bghtml = compiledBGTemplate();



    var HotelRatingHtmlpopular = '';


    $$.each(hotelcitylist.popularCityList, function(index, element) {

        HotelRatingHtmlpopular += '<li city="' + element + '" id="' + element + '" onclick="Appyscript.hotelselectedcity(this)" class="close-popup" href="#" rel="Noida, Uttar Pradesh, India" title="Click for to see a weather report">' + element + '</li>'

    });

    compiledBGTemplate = AppyTemplate.compile(HotelRatingHtmlpopular),
        bghtml2 = compiledBGTemplate();

    $$(".searchListLoc").append(bghtml)
    $$(".searchListLocpop").append(bghtml2)


}


Appyscript.hotelselectedcity = function(data) {

    $$("[id=hotelanywhere]").html(data.id);
    $$("[id=hotelanywheredrop]").html('<i class="icon-globe-3" style="color:' + AppyTemplate.global.styleAndNavigation.icon[1] + '"></i>' + data.id);
    countrynamehotel = data.id;




    console.log(data.id)
    selectedcityuhotel = data.id;
    Appyscript.openfiltereddHotel(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby);
    $$("[id=cityhotelselected]").html(data.id);


    $$("#hotelclearsearchshow").hide();

    $$("#hotelclearsearch").show();
}



Appyscript.hotelcancelbookingconfirm = function(data) {

    console.log(data.id)
    var cancel = data;
    Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.bookingcancelconfirmalert, appnameglobal_allpages, AppyTemplate.global.commonLanguageSetting.No, AppyTemplate.global.commonLanguageSetting.Yes, cancelhotelbookingconfirm, notcancelhotelbookingconfirm);

    function cancelhotelbookingconfirm() {



    }

    function notcancelhotelbookingconfirm() {

        Appyscript.hotelcancelorder(cancel);


    }

}


//add to favorite

Appyscript.hoteladdtofav = function(a) {


    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"addToFav","appId":"' + appId + '","userId":"' + localStorage.getItem("userid") + '","accommodationId":"' + a.id + '","lang":"' + localStorage.lang + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                //                 console.log("favvvv"+data)
                data = JSON.parse(data);
                $$(a).attr("style", "color:red");
                Appyscript.hideIndicator();
                Appyscript.alert(data.msg, appnameglobal_allpages);



            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }




}

//remove fav

Appyscript.hotelremovetofav = function(a) {


    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"removeFavList","appId":"' + appId + '","userId":"' + localStorage.getItem("userid") + '","accommodationId":"' + a.id + '","lang":"' + localStorage.lang + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                Appyscript.hideIndicator();
                console.log("favvvv" + data)

                if (favpagehotel) {
                    mainView.router.back();

                    setTimeout(function() {
                        $$(removeiddd).remove();

                        if ($$("#hotelistingfav li").length === 0) {


                            $$("#nofavhotel").show();


                        }


                    }, 500);


                }

                $$(a).removeAttr("style");
                data = JSON.parse(data);
                Appyscript.alert(data.msg, appnameglobal_allpages);


            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }




}

//for get favlist



Appyscript.hotelfavpage = function(a) {

    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getFavList","appId":"' + appId + '","userId":"' + localStorage.getItem("userid") + '"}'),
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                console.log("rwerwe" + data)
                var hotelData = {};
                hotelData = JSON.parse(data);
                if(hotelData.pageList != null){
                    $$.get("pages/accommodation-favlist.html", function(template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(hotelData);
                        if (favpagehotel) {
                            mainView.router.reloadContent(html);
                        } else {
                            mainView.router.load({
                                content: html,
                                animatePages: true
                            });
                        }
                    });
                    Appyscript.hideIndicator();
                }else{
                    Appyscript.hideIndicator();
                }
            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }




}

//offer page

Appyscript.hotelofferpage = function(a) {

    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"offerList","appId":"' + appId + '"}'),
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                console.log("rwerwe" + data)
                var hotelData = {};

                hotelData = JSON.parse(data);

                $$.get("pages/accommodation-offlist.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    if (a) {
                        mainView.router.reloadContent(html);
                    } else {
                        mainView.router.load({
                            content: html,
                            animatePages: true
                        });

                    }
                });

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }




}


//for calfull popup


function openhotelcaledoresfull() {




    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var datyshort = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var calendarInline = Appyscript.calendar({
        container: '#calendar-inline-container2',
        value: [],
        weekHeader: true,
        rangePicker: true,
        direction: "vertical",
        disabled: {
            from: new Date(1980, 12, 1),
            to: new Date(+new Date() - 86400000)
        },

        toolbarTemplate: '<div class="toolbar calendar-custom-toolbar ">' +
            '<div class="toolbar-inner">' +
            '<div class="left">' +
            '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
            '</div>' +
            '<div class="center"></div>' +
            '<div class="right">' +
            '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
            '</div>' +
            '</div>' +
            '</div>',
        onOpen: function(p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function() {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function() {
                calendarInline.nextMonth();
            });
        },
        onDayClick: function(p, dayContainer, year, month, day) {



            console.log(year)




        },
        onMonthYearChangeStart: function(p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
        }
    });




}


//share detail


function sharegoteldetails(name, address, detais) {

    var shareimageurl = []
    hoteldetailsdata.data.image.forEach(function(element, index) {
        if (element.type == "image") {


            shareimageurl.push(" " + element.image)

        }

    })
    var offerrrrr = '';
    if (hoteldetailsdata.data.offer) {

        offerrrrr = ",Offer-" + hoteldetailsdata.data.offerPercent + "%";
    }


    var sharehotel = shareimageurl.toString() + " " + hoteldetailsdata.data.name + "," + hoteldetailsdata.data.address + "," + hoteldetailsdata.data.city + ", Price-" + hoteldetailsdata.data.lowestPrice + "" + hoteldetailsdata.data.currency + ",Rating-" + hoteldetailsdata.data.rating + "" + offerrrrr;



    if (Appyscript.device.android) {
        Appyscript.shareText(sharehotel);
    } else {
        var shatetext = hoteldetailsdata.data.address + "," + hoteldetailsdata.data.city + ",Price-" + hoteldetailsdata.data.lowestPrice + "" + hoteldetailsdata.data.currency + ",Rating-" + hoteldetailsdata.data.rating + "" + offerrrrr;

        window.location = "shareimgheaderdescription:" + shareimageurl.toString() + "$,$" + hoteldetailsdata.data.name + "," + shatetext;

    }
}


//add to calendor
//function addtocalhotelevent()
//{
//    if(Appyscript.device.android)
//    {
//        Appyscript.shareText("wfwe");
//    }
//    else
//    {
//
//
//        window.plugins.calendar.createEventInNamedCalendar("were","noida","mynotes",new Date("2017/05/17"),new Date("2017/05/20"),"werew",success,error);function success(df){console.log("rw"+df)}
//
//        function error(df){console.log("rw"+df)}
//
//    }
//}

function addtocalhotelevent(title, eventLocation, notes, startDate, endDate, gdec) {
    Appyscript.showIndicator();
    var calOptions = window.plugins.calendar.getCalendarOptions();
    calOptions.allday = "true";
    var startDate = new Date(startDate.split("/")[1] + "/" + startDate.split("/")[0] + "/" + startDate.split("/")[2]);
    var endDate = new Date(endDate.split("/")[1] + "/" + endDate.split("/")[0] + "/" + endDate.split("/")[2]);
    var title = title
    var eventLocation = eventLocation;
    var notes = "";

    window.plugins.calendar.createEventWithOptions(title, eventLocation, notes, startDate, endDate, calOptions, success, error);

    function success(df) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.added_to_calendar, appnameglobal_allpages);
    }

    function error(df) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.added_to_calendar, appnameglobal_allpages);
    }
}

//check validation
function hotelCreditCardDetailOfUser(creditCardType) {
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

    if (isNaN(cnumber) || cnumber.length < 15) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
        return null;
    } else if (expairyMonth == null || expairyMonth == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_month);
        return null;
    } else if (expairyYear == null || expairyYear == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year);
        return null;
    } else if (!isNaN(cHolder) || cHolder == null || cHolder == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.common_card_holder_name);
        return null;
    } else if (isNaN(cvvCode) || cvvCode.length < 3) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code);
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
}


function hotelCreditCardPaymentThroughStripe(paymentTypeObject, creditCardDetailPar) {
    var creditCardDetail = JSON.parse(creditCardDetailPar);
    var totalAmount = parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice)
    totalAmount = totalAmount.toFixed(2);
    var newdate = new Date().getTime();
    var orderId = paymentorderidd;
    var currency = checkooutfinalhoteldata.hoteldata[0].data.currencyCode;
    var payTypeObj = $$(paymentTypeObject).parent();
    var clientId = payTypeObj.attr("data-clientId");
    var secretKey = payTypeObj.attr("data-secretKey");


    hotelCreditCardPaymentNative(creditCardDetail.number, creditCardDetail.expireMonth,
        creditCardDetail.expireYear, creditCardDetail.cvv2, creditCardDetail.firstName + " " + creditCardDetail.lastName,
        totalAmount, orderId, clientId, secretKey, currency, localStorage.getItem("userid"), "accommodation")
}

/*
 this method is use for place order via Credit card
 */
function hotelCreditCardPaymentNative(creditCardDetailnumber, Month, Year, cvv2, NamelastName, totalAmount, orderId, clientId, secretKey, currency, userId, pagetype) {
    if (Appyscript.device.android) {
        Appyscript.goForCreditCardPayment(creditCardDetailnumber, Month, Year, cvv2, NamelastName, totalAmount, orderId, clientId, secretKey, currency, userId, pagetype);
    } else {
        Appyscript.goForCreditCardPayment(creditCardDetailnumber, Month, Year, cvv2, NamelastName, totalAmount, orderId, clientId, secretKey, currency, userId, pagetype);
    }
}

function hotelSubmitOrderByStripe(paymentId) {
    //Appyscript.hideIndicator();
    if (paymentId != '') {
        Appyscript.hotelcodbookconfirmation(paymentorderidd, "Stripe", "", paymentId)
    } else {
    }
}

//open paypal
function openPaypalNativeHotel(htmlForm, pagetype, pageDatapageTitle) {
    Appyscript.openPaypal(htmlForm, "accommodation", pageDatapageTitle);
    Appyscript.hideIndicator();
}

/**
 *** OPEN PAYFAST
 **/
function openPayFastNativeHotel(htmlForm, pagetype, pageDatapageTitle) {
    Appyscript.openPayFast(htmlForm, "accommodation", pageDatapageTitle);
    Appyscript.hideIndicator();
}


//response
function hotelUpdateStatusFromNativeSide(status, orderIdPar) {
    if (status.toLowerCase() == "success") {
        Appyscript.hotelcodbookconfirmation(paymentorderidd, "Paypal", "", orderIdPar);
        Appyscript.hideIndicator();
    } else {
    }
}

function hotelUpdateStatusFromNativeSidepayu(status, orderIdPar) {
    if (status.toLowerCase() == "success") {
        Appyscript.hotelcodbookconfirmation(paymentorderidd, "PayUmoney", "", orderIdPar)
    } else {
        Appyscript.hideIndicator();
    }
}




//for date range

function searchcalhotel() {
    $$("#hotelclearsearchshow").hide();
    $$("#hotelclearsearch").show();
    console.log($$("#hotelcalendar-range").val().split("-"))

    if ($$("#hotelcalendar-range").val().split("-")[0] && $$("#hotelcalendar-range").val().split("-")[1]) {
        $$("p#hotelrangeselect").hide();
        var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        console.log($$("#hotelcalendar-range").val().split("-")[0].split("/")[0] + " " + $$("#hotelcalendar-range").val().split("-")[0].split("/")[1])

        var startdshow = $$("#hotelcalendar-range").val().split("-")[0].split("/")[1] + " " + monthShortNames[parseInt($$("#hotelcalendar-range").val().split("-")[0].split("/")[0]) - 1]
        var endDshow = $$("#hotelcalendar-range").val().split("-")[1].split("/")[1] + " " + monthShortNames[parseInt($$("#hotelcalendar-range").val().split("-")[1].split("/")[0]) - 1]

        Appyscript.closeModal()

        showanytimeid = startdshow + "-" + endDshow
        $$("#hotelanytime").html(startdshow + "-" + endDshow)
        checkinsearchdate = $$("#hotelcalendar-range").val()
        Appyscript.openfiltereddHotel(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby);
    } else {
        $$("p#hotelrangeselect").show();
    }
}


//payu money




function HotelopenPayuViewNative(postDataJsondiscounttotal, postDataJsonorderId, app_id, billDataname, lastName, billDataemail, billDataphone, merchantId, saltKey, site_url, pagetype) {

    Appyscript.openPayuView(postDataJsondiscounttotal, postDataJsonorderId, app_id, billDataname, lastName, billDataemail, billDataphone, merchantId, saltKey, site_url, pagetype);



}


//code success


Appyscript.hotelcodbookconfirmation = function(oid, type, phone, transacid) {
    if (isOnline()) {
        var transid = '';
        if (transacid) {
            transid = transacid;
        }
        Appyscript.showIndicator();
        var typesend = 1;
        console.log(type)

        if (type == "COD" || type == "ccPhone") {
            typesend = 0;
        }
        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"paymentSuccess","appId":"' + appId + '","pageId":"' + pageIdentifie + '","userId":"' + localStorage.getItem("userid") + '","orderId":"' + oid + '","transationId":"' + transid + '", "paymentStatus":"' + typesend + '","paymentMethod":"' + type + '","lang": "' + localStorage.lang + '","appName":"' + localStorage.getItem("appName") + '"}'),
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                Appyscript.hotelConfirmation(oid, phone);
            },
            error: function() {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}



// play video


function hotelplaycustomvideo(videourl, productName) {
    if (Appyscript.device.android) {
        Appyscript.openVideoStream(videourl, '', '0', productName, '', '', '', '');
    } else {
        var jsonString = '{"catName": "  ", "catIcon": "", "catIconType": "","identifire": "","list":[{"name":"","value":"' + videourl + '","description":"","uploadedOn":"","iconName":"","iconType":""}],"pageTitle":"' + productName + '"}';
        window.location = "openvideoplayer:" + jsonString + "$,$" + "" + "$,$" + "";
    }
}


function openactionphotopagehotel() {
    var photoactionsheet = [{
            text: 'Save',
            onClick: function() {
                Appyscript.photopageshareimageurldownload(coommonphotobrowsers.params.photos[coommonphotobrowsers.activeIndex])
            }
        },
        {
            text: 'Share',
            onClick: function() {
                Appyscript.photopageshareimageurl(coommonphotobrowsers.params.photos[coommonphotobrowsers.activeIndex], "", "")
            }
        },
        {
            text: 'Cancel',
            color: 'red',
            onClick: function() {

            }
        },
    ];
    Appyscript.actions(photoactionsheet);
}




Appyscript.guesthotelclick = function(a) {
    $$(".hotelSearchToggleDrop-overlay").hide();
    $$(".hotelSearchToggleDrop").hide().removeClass("on");
    var hotelData = {}
    $$.get("popups/accommodation-search-availability.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(hotelData);
        mainView.router.load({
            content: html,
            animatePages: true
        });
    });
}




Appyscript.onPageInit('accommodation-confirmation-page', function(page) {
    hoteltoolbarshow();
    hotelhomebacklength = mainView.history.length
    console.log(hotelhomebacklength)
    Appyscript.hideIndicator();

    //                      document.addEventListener("backbutton", onBackKeyDown, false);
    //                      function onBackKeyDown(e) {
    //                 Appyscript.openHotel();
    //                      }

});

Appyscript.onPageInit('accommodation-guest-detail-page', function(page) {
    hoteltoolbarshow();

    if (localStorage.userid) {
        $$("#hotelguestfname").val(localStorage.username)
        $$("#hotelguestlname").val(localStorage.hlastname)
        $$("#hotelguestemail").val(localStorage.email)
        $$("#hotelguestphone").val(localStorage.phone)
        $$("#hotelguesttitle").val(localStorage.htitle)
    }
    checkooutfinalhoteldata.hoteldata[1].finalprice = eval(checkooutfinalhoteldata.hoteldata[1].finalprice - couponDiscountAmounthotel).toFixed(2);
})

Appyscript.onPageInit('accommodation-search-availability-page', function(page) {

    hoteltoolbarshow();

    //                      $$("#filterhoteldata").click(function(){
    //
    //                                                   });
    //
    //
    //
    //
    //                      countAddedRoom2=1;
    //
    //                      var initroomid=Math.round((new Date()).getTime() / 1000);
    //                      compiledBGTemplate=AppyTemplate.compile('<div class="room-book-item countroom" id="'+initroomid+'"> <a class="room-qty-title item-link {{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}; border-color:{{@global.styleAndNavigation.borderColor}}" id="itemcountroom'+Math.round((new Date()).getTime() / 1000)+'">'+AppyTemplate.global.pageLanguageSetting.room+' 1</a> <div class="room-book-item-content"> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> '+AppyTemplate.global.pageLanguageSetting.Adults+' (12+) </div> <div class="room-qty"> <a class="less iconz-minus minusR" id="'+initroomid+'" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="1" class="room-qty-nub qtyR" readonly="readonly"  id="guest'+initroomid+'" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addR" id="'+initroomid+'" style="color:{{@global.styleAndNavigation.icon[1]}};border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> '+AppyTemplate.global.pageLanguageSetting.children+' (0-11) </div> <div class="room-qty"> <a class="less iconz-minus minusRchild" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="0" class="room-qty-nub qtyRchild" readonly="readonly" id="child'+initroomid+'" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addRchild" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> </div> </div>'),
    //                      bghtml=compiledBGTemplate();
    //
    //                      $$(".room-book-item").append(bghtml);
    //
    //
    //
    //
    //
    //
    //
    //
    //                      $$(".addR").click(function() {
    //
    //                                        if(this.previousElementSibling.value <pageData.setting.maxGuest ){
    //                                        var newQty = +(this.previousElementSibling.value) + 1;
    //                                        this.previousElementSibling.value=newQty
    //                                        }else{
    //
    //                                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
    //
    //                                        }
    //                                        });
    //
    //                      $$(".minusR").click(function() {
    //                                          var newQty = +(this.nextElementSibling.value) - 1;
    //                                          if (newQty < 1) newQty = 1;
    //                                          this.nextElementSibling.value=newQty
    //                                          });
    //
    //                      $$(".addRchild").click(function() {
    //
    //                                             if(this.previousElementSibling.value <  pageData.setting.maxGuest ){
    //
    //                                             var newQty = +(this.previousElementSibling.value) + 1;
    //
    //                                             this.previousElementSibling.value=newQty;
    //
    //                                             }else{
    //
    //                                             Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
    //                                             }
    //
    //
    //                                             });
    //
    //                      $$(".minusRchild").click(function() {
    //                                               var newQty = +(this.nextElementSibling.value) - 1;
    //                                               if (newQty < 0) newQty = 0;
    //                                               this.nextElementSibling.value=newQty
    //                                               });




    setTimeout(function() {
        if (globalroomdatahotel.room.length > 0) {
            $$.each(globalroomdatahotel.room, function(index, element) {
                console.log(globalroomdatahotel.guest[index])
                var guest = 0;
                var child = 0;
                var rooms = 0;
                $$(".countroom").each(function(index, obj) {
                    guest = eval(+$$("#guest" + obj.id).val() + guest);
                    child = eval(+$$("#child" + obj.id).val() + child);
                    rooms = eval(+rooms + 1);
                });
                countAddedRoom2 = rooms;
                countAddedRoom2 = countAddedRoom2 + 1;

                var HotelRoomuniquieId = Math.round((new Date()).getTime() / 1000) + countAddedRoom2;
                var showcros = '';
                if (index != 0) {
                    showcros = '<span onclick="removeHotelRoom(' + HotelRoomuniquieId + ');"class="iconz-remove itemRemove" style="color:{{@global.styleAndNavigation.icon[1]}}"></span>';
                }
                compiledBGTemplate = AppyTemplate.compile('<div class="room-book-item countroom" id="' + HotelRoomuniquieId + '"> <a class="room-qty-title item-link {{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}; border-color:{{@global.styleAndNavigation.borderColor}}" id="itemcountroom' + HotelRoomuniquieId + '">' + AppyTemplate.global.pageLanguageSetting.room + ' ' + countAddedRoom2 + '</a> ' + showcros + ' <div class="room-book-item-content"> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.Adults + ' (' + AppyTemplate.global.pageLanguageSetting.plus_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusR' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="' + globalroomdatahotel.guest[index] + '" class="room-qty-nub qtyR' + HotelRoomuniquieId + '" readonly="readonly" id="guest' + HotelRoomuniquieId + '" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addR' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.children + ' (' + AppyTemplate.global.pageLanguageSetting.below_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusRchild' + HotelRoomuniquieId + '" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}" id=""></a> <input type="number" id="child' + HotelRoomuniquieId + '" value="' + globalroomdatahotel.child[index] + '" class="room-qty-nub qtyRchild' + HotelRoomuniquieId + '" readonly="readonly" id="" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addRchild' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> </div> </div>'),
                    bghtml = compiledBGTemplate();
                $$("#HotelAddMoreRooms").append(bghtml);

                hotelroomaddmoreinitseacrh(HotelRoomuniquieId);
            })
        } else {
            countAddedRoom2 = 1;

            var initroomid = Math.round((new Date()).getTime() / 1000);
            compiledBGTemplate = AppyTemplate.compile('<div class="room-book-item countroom" id="' + initroomid + '"> <a class="room-qty-title item-link {{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}; border-color:{{@global.styleAndNavigation.borderColor}}" id="itemcountroom' + Math.round((new Date()).getTime() / 1000) + '">' + AppyTemplate.global.pageLanguageSetting.room + ' 1</a> <div class="room-book-item-content"> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.Adults + ' (' + AppyTemplate.global.pageLanguageSetting.plus_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusR" id="' + initroomid + '" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="1" class="room-qty-nub qtyR" readonly="readonly"  id="guest' + initroomid + '" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addR" id="' + initroomid + '" style="color:{{@global.styleAndNavigation.icon[1]}};border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.children + ' (' + AppyTemplate.global.pageLanguageSetting.below_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusRchild" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="0" class="room-qty-nub qtyRchild" readonly="readonly" id="child' + initroomid + '" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addRchild" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> </div> </div>'),
                bghtml = compiledBGTemplate();

            $$(".room-book-item").append(bghtml);
            $$(".addR").click(function() {
                if (this.previousElementSibling.value < pageData.setting.maxGuest) {
                    var newQty = +(this.previousElementSibling.value) + 1;
                    this.previousElementSibling.value = newQty
                } else {
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
                }
            });

            $$(".minusR").click(function() {
                var newQty = +(this.nextElementSibling.value) - 1;
                if (newQty < 1) newQty = 1;
                this.nextElementSibling.value = newQty
            });

            $$(".addRchild").click(function() {
                if (this.previousElementSibling.value < pageData.setting.maxGuest) {
                    var newQty = +(this.previousElementSibling.value) + 1;
                    this.previousElementSibling.value = newQty;
                } else {
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
                }
            });

            $$(".minusRchild").click(function() {
                var newQty = +(this.nextElementSibling.value) - 1;
                if (newQty < 0) newQty = 0;
                this.nextElementSibling.value = newQty
            });
        }
    }, 200);
});



function calculatecheckoutroomssearch() {

    var guest = 0;
    var child = 0;
    var rooms = 0;
    globalroomdatahotel = {
        room: [],
        guest: [],
        child: []
    }
    var guestarray = []
    $$(".countroom").each(function(index, obj) {
        guestarray.push(parseInt($$("#guest" + obj.id).val()))
        globalroomdatahotel.room.push(rooms)
        globalroomdatahotel.guest.push($$("#guest" + obj.id).val())
        globalroomdatahotel.child.push($$("#child" + obj.id).val())
        totalhotelsearchguestguest = eval(+$$("#guest" + obj.id).val() + totalhotelsearchguestguest);

    });

    checksearchroom = guestarray.toString().replace(/,/g, "-");
    console.log(guestarray)
    $$("#hotelanyguest").html(totalhotelsearchguestguest + " Guest")

    $$("#hotelanyguestdrop").html('<i class="iconz-user" style="color:' + AppyTemplate.global.styleAndNavigation.icon[1] + '"></i>' + totalhotelsearchguestguest + ' ' + AppyTemplate.global.pageLanguageSetting.guest);

    mainView.router.back();
    Appyscript.openfiltereddHotel(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby);
}


var countAddedRoom2 = 1;

function hotelappendRoomseacrh() {
    countAddedRoom2 = countAddedRoom2 + 1;
    if (countAddedRoom2 <= pageData.setting.maxRoom) {
        var HotelRoomuniquieId = Math.round((new Date()).getTime() / 1000) + countAddedRoom2;
        compiledBGTemplate = AppyTemplate.compile('<div class="room-book-item countroom" id="' + HotelRoomuniquieId + '"> <a class="room-qty-title item-link {{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}}" style="color:{{@global.styleAndNavigation.subheading[2]}}; border-color:{{@global.styleAndNavigation.borderColor}}" id="itemcountroom' + HotelRoomuniquieId + '">' + AppyTemplate.global.pageLanguageSetting.room + ' ' + countAddedRoom2 + '</a> <span onclick="removeHotelRoom(' + HotelRoomuniquieId + ');"class="iconz-remove itemRemove" style="color:{{@global.styleAndNavigation.icon[1]}}"></span> <div class="room-book-item-content"> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.Adults + ' (' + AppyTemplate.global.pageLanguageSetting.plus_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusR' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> <input type="number" value="1" class="room-qty-nub qtyR' + HotelRoomuniquieId + '" readonly="readonly" id="guest' + HotelRoomuniquieId + '" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addR' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> <div class="room-qty-container" style="border-color:{{@global.styleAndNavigation.borderColor}}"> <div class="room-qty-name"> ' + AppyTemplate.global.pageLanguageSetting.children + ' (' + AppyTemplate.global.pageLanguageSetting.below_12 + ') </div> <div class="room-qty"> <a class="less iconz-minus minusRchild' + HotelRoomuniquieId + '" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}" id=""></a> <input type="number" id="child' + HotelRoomuniquieId + '" value="0" class="room-qty-nub qtyRchild' + HotelRoomuniquieId + '" readonly="readonly" id="" style="color:{{@global.styleAndNavigation.content[2]}}"> <a class="add iconz-plus addRchild' + HotelRoomuniquieId + '" id="" style="color:{{@global.styleAndNavigation.icon[1]}}; border-color:{{@global.styleAndNavigation.icon[1]}}"></a> </div> </div> </div> </div>'),
            bghtml = compiledBGTemplate();

        $$("#HotelAddMoreRooms").append(bghtml);
        hotelroomaddmoreinitseacrh(HotelRoomuniquieId);
    } else {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum)
    }

    var scrollContent = $$(mainView.activePage.container).find(".room-book-item")[0];
    scrollContent.scrollTop = scrollContent.scrollHeight;
}

function hotelroomaddmoreinitseacrh(id) {


    $$(".addR" + id).click(function() {
        if (this.previousElementSibling.value < pageData.setting.maxGuest) {
            var newQty = +(this.previousElementSibling.value) + 1;
            this.previousElementSibling.value = newQty

        } else {

            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
        }
    });

    $$(".minusR" + id).click(function() {
        var newQty = +(this.nextElementSibling.value) - 1;
        if (newQty < 1) newQty = 1;
        this.nextElementSibling.value = newQty
    });

    $$(".addRchild" + id).click(function() {
        if (this.previousElementSibling.value < pageData.setting.maxGuest) {

            var newQty = +(this.previousElementSibling.value) + 1;

            this.previousElementSibling.value = newQty;

        } else {

            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.sorry_you_have_exceeded_the_maximum_guest)
        }
    });

    $$(".minusRchild" + id).click(function() {
        var newQty = +(this.nextElementSibling.value) - 1;
        if (newQty < 0) newQty = 0;
        this.nextElementSibling.value = newQty
    });
}



Appyscript.openHotel2 = function() {
    Appyscript.resetLayout(true);
    if (AppyTemplate.global.style.layout == "slidemenu") {
        Appyscript.closePanel();
    }
    if (isOnline()) {
        console.log('{"method":"getAccommodationList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","page":1,"country":"","priceRange":"","roomType":"","amenities":"","location":"' + selectedcityuhotel + '","sortby":"' + accommodation_sortby + '","sortType":"' + accommodation_sortType + '","dateRange":"' + checkinsearchdate + '","roomsReq":"' + checksearchroom + '"}')
        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getAccommodationList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","page":1,"country":"","priceRange":"","roomType":"","amenities":"","location":"' + selectedcityuhotel + '","sortby":"' + accommodation_sortby + '","sortType":"' + accommodation_sortType + '","dateRange":"' + checkinsearchdate + '","roomsReq":"' + checksearchroom + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                Appyscript.hotelgetallcity();
                console.log("rwerwe" + data)
                var hotelData = {};

                hotelData = JSON.parse(data);

                $$.get("pages/accommodation.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.reloadContent(html);
                });


                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
    $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');

}

Appyscript.autoHeighhotelPage = function(pollingIndex) {
    $$(".hotel-category-view").css("height", ($$(window).height() - 94) + "px");
}


function PhoneCallhotel(sellerPhoneNo) {


    Appyscript.call(sellerPhoneNo);

}

Appyscript.viewallaminitieshotel = function(val) {

    if ($$('.picker-modal.modal-in').length) {

        if ($$('.picker-modal.modal-in').length > 0) {
            Appyscript.closeModal('.picker-modal.modal-in');
        }

    }
    $$("#hoteldetailoverflow").addClass("stopescrolinghotel")
    var htmlamin = '';
    var allaminities = val.split(",");
    for (i = 0; i < allaminities.length; i++) {
        htmlamin += '<p>' + allaminities[i] + '</p>';

    }


    Appyscript.modal({
        title: AppyTemplate.global.pageLanguageSetting.amenities,
        text: '<div class="allamini">' + htmlamin + '</div>',
        buttons: [{
            text: 'Ok',
            bold: true
        }, ],
        onClick: function() {
            $$("#hoteldetailoverflow").removeClass("stopescrolinghotel")

        }
    })


    $$(".allamini").parents()[1].firstChild.className = "modal-title custompopupalign";
    $$(".modal-overlay-visible").click(function() {
        console.log("wer")

        if ($$('.modal.modal-in').length > 0) {
            $$("#hoteldetailoverflow").removeClass("stopescrolinghotel");
            Appyscript.closeModal();

        }


    });
}

Appyscript.openhotelownerdetail = function() {

    var styleuppopup = AppyTemplate.global.styleAndNavigation.content[0] + " " + AppyTemplate.global.styleAndNavigation.content[1];
    if ($$('.picker-modal.modal-in').length > 0) {

        return;
    }

    // Check first, if we already have opened picker
    if ($$('.picker-modal.modal-in').length > 0) {
        Appyscript.closeModal('.picker-modal.modal-in');
    }

    Appyscript.pickerModal(
        '<div class="picker-modal accommodation-detail-model">' +
        '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
        '<div class="left"></div>' +
        '<div class="right"><a href="#" class="close-picker iconz-remove" onclick="closehotelpicker()" ></a></div>' +
        '</div>' +
        '</div>' +
        '<div class="picker-modal-inner">' +
        '<div class="content-block">' +
        '<p class="' + styleuppopup + '" style="color:white !important;font-size:20px">' + $$(".hotelowner").text() + '</p>' +
        '<p class="' + styleuppopup + '" style="color:white !important">' + $$("#ownerdiscription").text() + '</p>' +
        '</div>' +
        '</div>' +
        '</div>'
    )




}




Appyscript.hoteltermanc = function(a) {
    if (isOnline()) {


        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getTermsconditons","appId":"' + appId + '"}'),
            type: 'post',
            //                contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log(data)
                var hotelData = {};



                hotelData = JSON.parse(data);

                $$.get("pages/accommodation-term-and-condition.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }


}


//privacy policy

Appyscript.hoteltermprivacypolicy = function(a) {
    if (isOnline()) {


        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getTermsconditons","appId":"' + appId + '"}'),
            type: 'post',
            //                contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log(data)
                var hotelData = {};



                hotelData = JSON.parse(data);

                $$.get("pages/accommodation-privacy_policy.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }


}




Appyscript.hotelbookingdetail = function(id) {

    if (isOnline()) {

        console.log('{"method":"bookingDetail","userId":"' + localStorage.getItem("userid") + '","bookingId":"' + id.id + '"}')
        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"bookingDetail","userId":"' + localStorage.getItem("userid") + '","bookingId":"' + id.id + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                var hotelData = {};

                hotelData = JSON.parse(data);

                $$.get("pages/accommodation-bookingdetails.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });


                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}



function clearfilterhotel() {

    selectedcityuhotel = '';
    accommodation_filter_range = '';
    accommodation_filter_star = '';
    accommodation_filter_roomtype = '';
    accommodation_filter_amenties = '';
    accommodation_sortby = '';
    accommodation_sortType = '';
    checksearchroom = '';
    checkinsearchdate = '';
    showanytimeid = '';
    amenitiesarray = []
    roomtypesarray = [];
    totalhotelsearchguestguest = '';
    var a = $$(".hotelSearchToggleDrop ");
    $$(".hotelSearchToggleDrop-overlay").hide();
    a.hide().removeClass("on")


    $$("#hotelclearsearch").hide();
    $$("#hotelclearsearchshow").show();
    $$("#hotelcalendar-range").val('')

    $$("[id=hotelanywhere]").html(AppyTemplate.global.pageLanguageSetting.anywhere);
    $$("[id=hotelanywheredrop]").html('<i class="icon-globe-3" style="color:' + AppyTemplate.global.styleAndNavigation.icon[1] + '"></i>' + AppyTemplate.global.pageLanguageSetting.anywhere);
    $$("#hotelanytime").html(AppyTemplate.global.pageLanguageSetting.Im_flexible_Any_Time_hyp);
    $$("#hotelanytimedrop").html(AppyTemplate.global.pageLanguageSetting.Im_flexible_Any_Time_hyp);
    $$("#hotelanyguest").html("1 " + AppyTemplate.global.pageLanguageSetting.guest);
    $$("#hotelanyguestdrop").html('<i class="iconz-user" style="color:' + AppyTemplate.global.styleAndNavigation.icon[1] + '"></i>1 ' + AppyTemplate.global.pageLanguageSetting.guest);
    $$("#cityhotelselected").html(AppyTemplate.global.pageLanguageSetting.select_city);

    globalroomdatahotel = {
        room: [],
        guest: [],
        child: []
    };



    Appyscript.openfiltereddHotel(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby);
}




//one go payment if ptice zero


function hotelonegopayment() {
    console.log('{ "method": "codBooking", "appId": "' + appId + '", "data":{"pageId": "' + pageIdentifie + '", "userId": "' + useridhotel + '", "accommodationId": "' + checkooutfinalhoteldata.hoteldata[0].data.id + '", "roomId": "' + checkavailroomidtype + '", "currencyCode": "' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '","roomDetails":' + JSON.stringify(globalroomdatahotelforconfirm) + ', "offer": "' + checkooutfinalhoteldata.hoteldata[0].data.offer + '", "offerPercent": "' + checkooutfinalhoteldata.hoteldata[0].data.offerPercent + '", "offerAmount": "' + offerhotelprice + '", "price": "' + checkavailroomidprice + '", "coupon": "' + couponcodehotel + '", "couponDiscountAmount": "' + couponDiscountAmounthotel + '", "ruleDiscountAmount": "' + discountprice + '", "taxAmount": "' + taxprice + '", "misTax": "' + micstaxprice + '", "totalRooms": "' + checktotalrooms + '", "grandTotal": "' + checkooutfinalhoteldata.hoteldata[1].finalprice + '", "bookStartDate": "' + eval(checkindate.getMonth() + 1) + "/" + checkindate.getDate() + "/" + checkindate.getFullYear() + '", "bookEndDate": "' + eval(checkoutdate.getMonth() + 1) + "/" + checkoutdate.getDate() + "/" + checkoutdate.getFullYear() + '", "adult": "' + checktotalguest + '","totalNights": "' + nighttotalcount + '",  "child": "' + checktotalchild + '","payment_type": "",' + JSON.stringify(checkooutfinalhoteldata.hoteldata[2]).substring(1, JSON.stringify(checkooutfinalhoteldata.hoteldata[2]).length - 1) + ',"appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","adminEmail": "' + localStorage.adminEmail + '"}}');
    console.log(localStorage.getItem("userid") + useridhotel);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: HotelBaseUrl,
            data: '{ "method": "codBooking", "appId": "' + appId + '", "data":{"pageId": "' + pageIdentifie + '", "userId": "' + useridhotel + '", "accommodationId": "' + checkooutfinalhoteldata.hoteldata[0].data.id + '", "roomId": "' + checkavailroomidtype + '", "currencyCode": "' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '", "offer": "' + checkooutfinalhoteldata.hoteldata[0].data.offer + '","roomDetails":' + JSON.stringify(globalroomdatahotelforconfirm) + ', "offerPercent": "' + checkooutfinalhoteldata.hoteldata[0].data.offerPercent + '", "offerAmount": "' + offerhotelprice + '", "price": "' + checkavailroomidprice + '", "coupon": "' + couponcodehotel + '", "couponDiscountAmount": "' + couponDiscountAmounthotel + '", "ruleDiscountAmount": "' + discountprice + '", "taxAmount": "' + taxprice + '", "misTax": "' + micstaxprice + '", "totalRooms": "' + checktotalrooms + '", "grandTotal": "' + checkooutfinalhoteldata.hoteldata[1].finalprice + '", "bookStartDate": "' + eval(checkindate.getMonth() + 1) + "/" + checkindate.getDate() + "/" + checkindate.getFullYear() + '", "bookEndDate": "' + eval(checkoutdate.getMonth() + 1) + "/" + checkoutdate.getDate() + "/" + checkoutdate.getFullYear() + '", "adult": "' + checktotalguest + '","totalNights": "' + nighttotalcount + '",  "child": "' + checktotalchild + '","payment_type": "",' + JSON.stringify(checkooutfinalhoteldata.hoteldata[2]).substring(1, JSON.stringify(checkooutfinalhoteldata.hoteldata[2]).length - 1) + ',"appName": "' + localStorage.appName + '","lang": "' + localStorage.lang + '","adminEmail": "' + localStorage.adminEmail + '"}}',
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log(data)
                data = JSON.parse(data)
                console.log("orderid" + data.data.orderId)
                paymentorderidd = data.data.orderId;
                if (useridhotel == "") {
                    localStorage.setItem("userid", data.data.userId)
                    localStorage.setItem("username", checkooutfinalhoteldata.hoteldata[2].hotelguestfname);
                    localStorage.setItem("email", checkooutfinalhoteldata.hoteldata[2].hotelguestemail);
                    localStorage.setItem("phone", checkooutfinalhoteldata.hoteldata[2].hotelguestphone);
                    localStorage.setItem("hlastname", checkooutfinalhoteldata.hoteldata[2].hotelguestlname);
                    localStorage.setItem("htitle", checkooutfinalhoteldata.hoteldata[2].hotelguesttitle);
                }
                //Appyscript.hotelcodbookconfirmation(paymentorderidd, "COD")
                CommonPaymentgatwayFunction(paymentorderidd,pageId,checkooutfinalhoteldata,pageIdentifie);
            },
            error: function() {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        })
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
};

function cancelhotelbackpau() {
    Appyscript.hideIndicator();
}

var hotelhomebacklength;
Appyscript.hotelhomescreen = function() {
    if (hotelhomebacklength > 2) {
        for (var i = 0; i < (hotelhomebacklength - 1); i++) {
            mainView.router.back({
                ignoreCache: true,
                animatePages: false
            })
            if (timeSpan != null) {
                clearTimeout(timeSpan);
                timeSpan = null;
            }
        }
    }
    setTimeout(function() {
        Appyscript.clickHome();
    }, 10);
};

//helper accomadationroomavailbility

AppyTemplate.registerHelper('accomadationroomavailbility', function(value, id) {
    var booknowhotel = '';
    console.log(value)
    if (value == '0') {
        booknowhotel = '<span class="hotel-button {{@global.styleAndNavigation.secondaryButton[0]}} {{@global.styleAndNavigation.secondaryButton[1]}}" style="background:{{@global.styleAndNavigation.secondaryButton[2]}}; color:{{@global.styleAndNavigation.secondaryButton[3]}};opacity: 0.5"  id="' + id + '" > {{@global.pageLanguageSetting.select}}</span><div class="room_info" style="color:{{@global.styleAndNavigation.activeColor}}">No Room Available</div>';
    } else if (value > 0) {
        booknowhotel = '<span class="hotel-button {{@global.styleAndNavigation.secondaryButton[0]}} {{@global.styleAndNavigation.secondaryButton[1]}}" style="background:{{@global.styleAndNavigation.secondaryButton[2]}}; color:{{@global.styleAndNavigation.secondaryButton[3]}};" onclick="Appyscript.hotelCheckAvailability(this);" id="' + id + '" > {{@global.pageLanguageSetting.select}}</span><div class="room_info" style="color:{{@global.styleAndNavigation.activeColor}}">' + value + ' Room lefts</div>';
    } else {
        booknowhotel = '<span class="hotel-button {{@global.styleAndNavigation.secondaryButton[0]}} {{@global.styleAndNavigation.secondaryButton[1]}}" style="background:{{@global.styleAndNavigation.secondaryButton[2]}}; color:{{@global.styleAndNavigation.secondaryButton[3]}};" onclick="Appyscript.hotelCheckAvailability(this);" id="' + id + '" > {{@global.pageLanguageSetting.select}}</span>';
    }
    compiledBGTemplate = AppyTemplate.compile(booknowhotel),
    bghtml = compiledBGTemplate();
    return bghtml;
});




function closehotelpicker() {
    console.log("closehotelpicker")
}




AppyTemplate.registerHelper('accomadationdateformtoshow', function(startDate) {
    date = new Date(startDate.split("/")[1] + "/" + startDate.split("/")[0] + "/" + startDate.split("/")[2]);;
    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var datyshort = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "  " + monthShortNames[date.getMonth()] + " " + date.getFullYear();
})




//for load more

Appyscript.hotepageloadmoredivfun = function(a) {

    var objDiv = document.getElementById("hotepageloadmorediv");
    var ddd = objDiv.scrollHeight;

    if (objDiv.scrollTop + objDiv.clientHeight >= objDiv.scrollHeight) {
        setTimeout(function() {
            if (hotelloadmorestatus) {
                hotelloadmorecount = hotelloadmorecount + 1;
                Appyscript.openhotelloadmore(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby, hotelloadmorecount);
            }
        }, 200);
    }
}




Appyscript.openhotelloadmore = function(accommodation_filter_range, accommodation_filter_star, accommodation_filter_roomtype, accommodation_filter_amenties, accommodation_sortType, accommodation_sortby, pagecount) {
    if (isOnline()) {
        console.log('{"method":"getAccommodationList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","page":1,"country":"","priceRange":"","roomType":"","amenities":"","location":"' + selectedcityuhotel + '","sortby":"' + accommodation_sortby + '","sortType":"' + accommodation_sortType + '","dateRange":"' + checkinsearchdate + '","roomsReq":"' + checksearchroom + '","count":"10","pageNo":"' + pagecount + '"}')
        Appyscript.showIndicator();
        $$.ajax({
            url: HotelBaseUrl,
            data: '{"method":"getAccommodationList","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","page":1,"country":"","priceRange":"","roomType":"","amenities":"","location":"' + selectedcityuhotel + '","sortby":"' + accommodation_sortby + '","sortType":"' + accommodation_sortType + '","dateRange":"' + checkinsearchdate + '","roomsReq":"' + checksearchroom + '","count":"10","pageNo":"' + pagecount + '"}',
            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {
                console.log("rasingh" + data)
                var hotelData = {};
                data = JSON.parse(data);
                var HotelSubcatgoryListdetails = '';
                $$.each(data.pageList, function(index, element) {
                    var HotelHalfRatingHtml = element.rating;
                    var reviewCount = '';
                    if (element.reviewCount > 0) {
                        if (element.reviewCount == 1) {
                            reviewCount = '<span>' + element.reviewCount + ' Review</span>';
                        } else {
                            reviewCount = '<span>' + element.reviewCount + ' Reviews</span>';
                        }
                    }
                    var offershow = '';
                    if (element.offer) {
                        offershow = element.offerPercent + " % off"
                    }



                    console.log("sdas" + element)
                    var hotelhalfset = true;
                    HotelHalfRatingHtml = HotelHalfRatingHtml.toString().split('.');
                    var HotelRatingHtml = '<span class="ratingView"><fieldset class="ratingStar">';
                    for (var i = 1; i <= 5; i++) {
                        if (i <= parseInt(element.rating)) {
                            HotelRatingHtml += '<label class="half on" for="starhalf" title="0.5 stars"></label><label class="full on" for="star1" title="1 star"></label>';
                        } else {

                            if (HotelHalfRatingHtml[1] && hotelhalfset) {
                                HotelRatingHtml += '<label class="half on" for="star1half" title="1.5 stars"></label><label class="full" for="star2" title="2 stars"></label>';
                                hotelhalfset = false;
                            } else {
                                HotelRatingHtml += '<label class="half" for="star2half" title="2.5 stars"></label><label class="full" for="star3" title="3 stars"></label>';
                            }

                        }
                    }




                    HotelRatingHtml += ' </fieldset></span>' + reviewCount;


                    var hotoffer = '';
                    if (element.featured == 1) {
                        hotoffer = '<i class="iconz-fire" style="color:{{@global.styleAndNavigation.title[3]}}"></i>';
                    }




                    var HotelImageUrl;

                    HotelImageUrl = element.image[0].image;

                    HotelSubcatgoryListdetails += '<li  data-name="' + element.name + '" onclick="Appyscript.hotelDetail(this);" id="' + element.id + '" class="lazy lazy-fadein"> <div class="squareContent"> <div class="innerTable"> <div class="innerTableCell"> <img src="images/image-2x1.png" alt="" style="background-image:url(' + HotelImageUrl + ')" class="dirImgMain"/> <div class="category-detail {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="background:{{@global.styleAndNavigation.title[2]}}; color:{{@global.styleAndNavigation.title[3]}};"> <h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}};"><div class="price">' + element.currency + ' ' + element.lowestPrice + '</div>- ' + element.name + '</h1><div class="row"> <div class="rating" >' + element.accomType + '</div><div class="rating pull-right">' + offershow + '</div></div>  <div class="row"><div class="rating">' + HotelRatingHtml + '</div> <div class="feature-list">' + hotoffer + '</div> </div> </div> </div> </div> </div> </li>';



                });



                compiledBGTemplate = AppyTemplate.compile(HotelSubcatgoryListdetails),
                    bghtml = compiledBGTemplate();




                if (bghtml == '') {
                    hotelloadmorestatus = false;
                } else {
                    $$("#hotelisting").append(bghtml)

                }



                console.log("mahipalsir" + bghtml)

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }


}


//credit car pal payment


Appyscript.hotelccpaymentmethod = function(carddetails, oid) {



    if (isOnline()) {
        Appyscript.showIndicator();
        console.log('{"method":"paypalCreditCard","appId":"' + appId + '","userId":"' + localStorage.getItem("userid") + '","orderId":"' + oid + '","paymentDetail":' + carddetails + ',"billingData":{"name":"' + checkooutfinalhoteldata.hoteldata[2].hotelguestfname + '","email":"' + checkooutfinalhoteldata.hoteldata[2].hotelguestemail + '","phone":"' + checkooutfinalhoteldata.hoteldata[2].hotelguestphone + '", "grandTotal":"' + checkooutfinalhoteldata.hoteldata[1].finalprice + '","currency":"' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '","price": "' + checkooutfinalhoteldata.hoteldata[1].finalprice + '", "offerAmount": "0", "tax": ' + eval(parseFloat(taxprice) + parseFloat(micstaxprice)) + '},"transType":"authorize","appName":"' + localStorage.getItem("appName") + '","lang":"' + localStorage.lang + '"}')



        $$.ajax({
            url: HotelBaseUrl,
            data: '{"method":"paypalCreditCard","appId":"' + appId + '","userId":"' + localStorage.getItem("userid") + '","orderId":"' + oid + '","paymentDetail":' + carddetails + ',"billingData":{"name":"' + checkooutfinalhoteldata.hoteldata[2].hotelguestfname + '","email":"' + checkooutfinalhoteldata.hoteldata[2].hotelguestemail + '","phone":"' + checkooutfinalhoteldata.hoteldata[2].hotelguestphone + '", "grandTotal":"' + checkooutfinalhoteldata.hoteldata[1].finalprice + '","currency":"' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '","price": "' + checkooutfinalhoteldata.hoteldata[1].finalprice + '", "offerAmount": "0", "tax": ' + eval(parseFloat(taxprice) + parseFloat(micstaxprice)) + '},"transType":"authorize","appName":"' + localStorage.getItem("appName") + '","lang":"' + localStorage.lang + '"}',



            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                Appyscript.hotelcodbookconfirmation(oid, "cc");



            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }



}




//return toom count


AppyTemplate.registerHelper('accomadationroocounthelper', function(detailsdata) {
    var returnroom = '';


    $$.each(detailsdata.room, function(index, value) {

        returnroom += '<span style="display: inline-block; width: 100%">' + AppyTemplate.global.pageLanguageSetting.room + ' ' + eval(index + 1) + '-' + detailsdata.guest[index] + ' ' + AppyTemplate.global.pageLanguageSetting.Adults + '</span>';


        console.log(returnroom)

    });

    console.log(returnroom)
    return returnroom;
});



Appyscript.hotellogout = function() {
    //Appyscript.hotelhomescreen();
    Appyscript.AppLogout()
}


function hoteltoolbarshow() {
    if (AppyTemplate.global.style.layout == "bottom") {
        setTimeout(function() {
            $$(".toolbar").addClass("toolbar-hidden");
            $$(mainView.activePage.container).find(".toolbar").removeClass("toolbar-hidden");
            $$(mainView.activePage.container).removeClass("no-toolbar").addClass("toolbar-through");
        }, 300);
    }
}

function hotelcallonphone(mobileno) {
    Appyscript.call(mobileno);
}



AppyTemplate.registerHelper('cheofferpriceonactual', function(v2, options) {

    if (v2 > 0) {

        return options.fn(this);
    }
    return options.inverse(this);
});

AppyTemplate.registerHelper('percentagecaluclationofferhotel', function(val, p) {


    return parseInt(eval(val - (val / 100 * p)));

});



//----------------------------------------------------------------------------------------------------//




var serviceinapptrnsactionid;

function add_Listing(inapptrnsactionid, statusval) {

    serviceinapptrnsactionid = inapptrnsactionid;

    if (pageData.setting.addListingPaymentMethod == "inApp") {
        Appyscript.hideIndicator();
        //AppyTemplate.global.inappservice = true;
        // AppyTemplate.global.inappServiceHyper = false;
        pageData.oneTimeSubscriptionPrice = pageData.setting.oneTimeSubscription
        pageData.oneTimeSubscriptionCurrency = pageData.setting.currency
        pageData.inAppAndroidBundleId = pageData.setting.androidProductId

        pageData.monthlySubscriptionPrice = pageData.setting.iapMonthlySubscription
        pageData.monthlySubscriptionCurrency = pageData.setting.currency
        pageData.androidMonthlyBundleId = pageData.setting.iapAndroidMonthlyProductId

        pageData.yearlySubscriptionPrice = pageData.setting.iapYearlySubscription
        pageData.yearlySubscriptionCurrency = pageData.setting.currency
        pageData.androidYearlyBundleId = pageData.setting.iapAndroidYearlyProductId
        pageData.paymentMethod = pageData.setting.addListingPaymentMethod
        pageData.inAppPublicKey = pageData.setting.adnroidProductKey
        // showPaymentAlertservice(pageData.oneTimeSubscriptionPrice, pageData.oneTimeSubscriptionCurrency, pageData.iphoneBundleId);
        // callbackAfterPaymentOnDirectory(status, transactionId, payType, iosProductId)
        checkAccomIAPPayment();
        return;

    } else {
        add_Listing_Accom();
    }
}

function add_Listing_Accom() {



    console.log("=== HotelBaseUrl " + localStorage.getItem('email') + "phone : " + localStorage.getItem("phone") + "name : " + localStorage.getItem("name"))
    updateaccomlisting = "false";
    globalAddUpdateEditDltListingData = {
        accommodationListEdit: []
    };
    addOwner();

    setTimeout(function() {

        try {
            console.log("==== pageIdentifie : " + pageIdentifie);
            var postData = '{"method":"getAccommodationProperties","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '"}';
            console.log("===== getAccommodationProperties post data " + postData);
            if (isOnline()) {
                Appyscript.showIndicator();
                $$.ajax({
                    url: HotelBaseUrl,
                    data: Appyscript.validateJSONData(postData),
                    type: "post",
                    //321  headers: {'accessToken': deviceEncryptedToken},
                    async: true,
                    success: function(jsonData, textStatus) {
                        updateaccomdationdataAll = '';
                        var accomodationListingData = JSON.parse(jsonData);
                        var checkAddorUpdate;
                        console.log("===== getAccommodationProperties " + accomodationListingData);
                        console.log("===== getAccommodationProperties  ggg " + JSON.stringify(accomodationListingData));
                        if (accomodationListingData != '') {
                            accomodationAddListingData = accomodationListingData;

                            AppyTemplate.global.globalAddListingData = accomodationAddListingData;
                            AppyTemplate.global.checkAddUpdatePage = 1
                            $$.get("pages/add-accommodation-detail.html", function(template) {
                                var compiledTemplate = AppyTemplate.compile(template);
                                var html = compiledTemplate(accomodationAddListingData);

                                mainView.router.load({
                                    content: html,
                                    animatePages: true
                                });



                                Appyscript.closeModal();
                            });
                        } else {
                            Appyscript.hideIndicator();
                            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
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
        } catch (err) {
            console.log("Exception in add_Listing method :" + err);
        }
    }, 500);
}


function addOwner() {
    try {
        console.log("==== pageIdentifie : " + pageIdentifie);
        var postData = '{"method":"addOwner","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '", "userEmail":"' + localStorage.getItem('email') + '","name":"' + localStorage.getItem("name") + '","phone":"' + localStorage.getItem("phone") + '"}';
        console.log("===== addOwner post data " + postData);
        if (isOnline()) {
            Appyscript.showIndicator();
            $$.ajax({
                url: HotelBaseUrl,
                data: Appyscript.validateJSONData(postData),
                type: "post",
                //321  headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(jsonData, textStatus) {
                    var accomodationListingData = JSON.parse(jsonData);
                    console.log("===== addOwner " + accomodationListingData);
                    console.log("===== addOwner  ggg " + JSON.stringify(accomodationListingData));
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
    } catch (err) {
        console.log("Exception in addOwner method :" + err);
    }
}

function accommodation_detail(data) {
    if (data == "firstNextClick") {
        var accomodationName = document.getElementById('accomodationName').value;
        console.log("==== accomodationName : " + accomodationName)
        var accomodationType = document.getElementById('slectedaddlisting').value
        console.log("==== accomodationType : " + accomodationType)
        var accomodationEmail = document.getElementById('accomodationEmail').value
        console.log("==== accomodationEmail : " + accomodationEmail)
        var accomodationPhone = document.getElementById('accomodationPhone').value
        console.log("==== accomodationPhone : " + accomodationPhone)
        var accomodationFax = document.getElementById('accomodationFax').value
        console.log("==== accomodationFax : " + accomodationFax)
        var accomodationAddress = document.getElementById('accomodationAddress').value
        console.log("==== accomodationAddress : " + accomodationAddress)
        var accomodationCity = document.getElementById('accomodationCity').value
        console.log("==== accomodationCity : " + accomodationCity)
        var accomodationState = document.getElementById('accomodationState').value
        console.log("==== accomodationState : " + accomodationState)
        var accomodationCountry = document.getElementById('selectedCountry').value
        console.log("==== accomodationCountry : " + accomodationCountry)
        var accomodationZipCode = document.getElementById('accomodationZipCode').value
        console.log("==== accomodationZipCode : " + accomodationZipCode)
        if (accomodationName == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_accommodation_name, appnameglobal_allpages);
            return;
        } else if (accomodationType == "" || accomodationType == "Select Accommodation Type *") {
            Appyscript.alert("Please select accomodation Type ", appnameglobal_allpages);
            return;
        }

        if (accomodationEmail == undefined || accomodationEmail == '' || !Appyscript.validateEmail(accomodationEmail)) {
            $$("#accomodationEmail").parent().addClass("error");
            if (accomodationEmail == '') {
                Appyscript.alert(pageData.languageSetting.please_fill_the_accommodation_email, function() {
                    localStorage.popup = true
                });
            } else {
                Appyscript.alert("Please enter a valid email ", function() {
                    localStorage.popup = true
                });
            }

            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        } else if (accomodationPhone == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_accommodation_phone, appnameglobal_allpages);
            return;
        } else if (accomodationPhone.indexOf('+') == -1) {

            Appyscript.alert(pageData.languageSetting.please_enter_valid_number_dir, appnameglobal_allpages);
            return;

        } else if (accomodationPhone.length < 10) {
            Appyscript.alert("Phone number should not less than 10 ", appnameglobal_allpages);
            return;
        } else if (accomodationPhone.length > 14) {
            Appyscript.alert(pageData.languageSetting.minimum_length_of_phone_number, appnameglobal_allpages);
            return;
        }

        if (accomodationFax != "") {
            if (accomodationFax.indexOf('+') == -1) {
                Appyscript.alert("Fax number should be entered with country code", appnameglobal_allpages);
                return;
            } else if (accomodationFax.length < 10) {
                Appyscript.alert("Fax number should not less than 10 ", appnameglobal_allpages);
                return;
            } else if (accomodationFax.length > 14) {
                Appyscript.alert("Fax number should not greater than 14 ", appnameglobal_allpages);
                return;
            }
        }


        if (accomodationAddress == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_address, appnameglobal_allpages);
            return;
        } else if (accomodationCity == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_city, appnameglobal_allpages);
            return;
        } else if (accomodationState == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_state

                , appnameglobal_allpages);
            return;
        } else if (accomodationCountry == "" || accomodationCountry == "Select Country *") {
            Appyscript.alert("Please select accomodation Country ", appnameglobal_allpages);
            return;
        } else if (accomodationZipCode == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_zip_code, appnameglobal_allpages);
            return;
        } else if (accomodationZipCode.length > 9) {
            $$("#pass").parent().addClass("error");
            Appyscript.alert("length should be 4 to 9", function() {
                localStorage.popup = true
            });
            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }


        getAllDataForAddListing.accomodationData.push({
            accomodationName: accomodationName,
            accomodationType: accomodationType,
            accomodationEmail: accomodationEmail,
            accomodationPhone: accomodationPhone,
            accomodationFax: accomodationFax,
            accomodationAddress: accomodationAddress,
            accomodationCity: accomodationCity,
            accomodationState: accomodationState,
            accomodationCountry: accomodationCountry,
            accomodationZipCode: accomodationZipCode
        });
        addstoredatafirstpage = Appyscript.formToJSON('#accommodation1display');


        console.log("===== getAllDataForAddListing : " + JSON.stringify(getAllDataForAddListing));
        accommodationdetailone = AppyTemplate.global.globalAddListingData;
        AppyTemplate.global.globalSecondPageAddListingData = accommodationdetailone;
        $$.get("pages/accommodation-detail-2.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(accommodationdetailone);
            mainView.router.load({
                content: html,
                animatePages: true
            });
            Appyscript.closeModal();

        });
    }

}



function accommodation_detail_2nd(data) {
    if (data == "secondNextClick") {

        var accomodationProfile = document.getElementById('selectedOwnerProfile').value;
        console.log("==== accomodationProfile : " + accomodationProfile)
        var accomodationCheckInTime = document.getElementById('checkintime').value
        console.log("==== accomodationCheckInTime : " + accomodationCheckInTime)
        var accomodationCheckOutTime = document.getElementById('checkouttime').value
        console.log("==== accomodationCheckOutTime : " + accomodationCheckOutTime)
        var accomodationApplyOffline = document.getElementById('selectdApplyOffline').value
        console.log("==== accomodationApplyOffline : " + accomodationApplyOffline)
        var accomodationAddReview = document.getElementById('selectedaddReview').value
        console.log("==== accomodationAddReview : " + accomodationAddReview)
        /*var accomodationAmenitiesType = document.getElementById('slectedAmenitieslisting').value
        console.log("==== accomodationAmenitiesType : " + accomodationAmenitiesType)*/
        var accomodationDetails = document.getElementById('accomodationDesc').value
        console.log("==== accomodationDetails : " + accomodationDetails)
        var offerPercent = document.getElementById("applyofferPer").value
        console.log("==== offerPercent : " + offerPercent)

        if (accomodationProfile == "") {
            Appyscript.alert("Please fill the accomodation Profile ", appnameglobal_allpages);
            return;
        }
        if (accomodationCheckInTime == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_checkin_time, appnameglobal_allpages);
            return;
        }

        if (accomodationCheckOutTime == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_checkout_time, appnameglobal_allpages);
            return;
        }

        if (accomodationApplyOffline == "" || accomodationApplyOffline == "Select Apply Offline*") {
            Appyscript.alert("Please select accomodation Apply Offer ", appnameglobal_allpages);
            return;
        } else if (accomodationAddReview == "" || accomodationAddReview == "Select Add Review*") {
            Appyscript.alert(pageData.languageSetting.accommodation_add_review, appnameglobal_allpages);
            return;
        }



        getAllDataForAddListing.accomodationDataSecond.push({
            accomodationProfile: accomodationProfile,
            accomodationCheckInTime: accomodationCheckInTime,
            accomodationCheckOutTime: accomodationCheckOutTime,
            accomodationApplyOffline: accomodationApplyOffline,
            accomodationAddReview: accomodationAddReview,
            /* accomodationAmenitiesType : accomodationAmenitiesType,*/
            accomodationDetails: accomodationDetails,
            offerPercent: offerPercent
        });



        console.log("===== getAllDataForAddListing 2 : " + JSON.stringify(getAllDataForAddListing));
        accommodationdetailtwo = AppyTemplate.global.globalSecondPageAddListingData;

        addstoredatafirstpage2 = Appyscript.formToJSON('#accommodation2display')
        $$.get("pages/add-accommodation-detail-3.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(accommodationdetailtwo);
            mainView.router.load({
                content: html,
                animatePages: true
            });


            Appyscript.closeModal();
        });
    }

}


function changeOffer() {
    if (updateaccomlisting != "true") {
        var accomodationApplyOffline = document.getElementById('selectdApplyOffline').value
        var applyofferPer = document.getElementById("applyofferPer");
        console.log("==== accomodationApplyOffline in listerner change : " + accomodationApplyOffline)
        if (accomodationApplyOffline == "Yes") {
            // document.getElementById('selectedOwnerProfile').value;

            if (applyofferPer.style.display == "none") {
                applyofferPer.style.display = "block";
            }

        } else if (applyofferPer.style.display == "block") {
            applyofferPer.style.display = "none";
        }
    } else {
        var accomodationApplyOffline = document.getElementById('selectdApplyOfflineedit').value
        var applyoffereditPer = document.getElementById("applyofferPeredit");
        console.log("==== accomodationApplyOffline in listerner change : " + accomodationApplyOffline)
        if (accomodationApplyOffline == "Yes") {
            // document.getElementById('selectedOwnerProfile').value;

            if (applyoffereditPer.style.display == "none") {
                applyoffereditPer.style.display = "block";
            }

        } else if (applyoffereditPer.style.display == "block") {
            applyoffereditPer.style.display = "none";
        }
    }

}



var accommocounter = 0;
var accommoAddRoomlimit = 5;
var extraRoomCounter = 0;

function accommodation_add_another_room_type(a) {
    if (a == "addMoreRoom") {
        console.log("=== HotelBaseUrl " + HotelBaseUrl)
        console.log("==== user id : " + localStorage.getItem("userid"));
        if (accommocounter == accommoAddRoomlimit) {
            alert("You have reached the limit of adding " + accommocounter + " inputs");
        } else {
            try {
                var container = $$('.page-content'),
                    scrollTo = $$('#accomheight');
                container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop(), $$("#accomheight").height());
                addAnotherRoomClickData = AppyTemplate.global.globalSecondPageAddListingData;
                openAddAnotherRoomPage(addAnotherRoomClickData);
                extraRoomCounter++;
            } catch (err) {
                console.log("Exception in accommodation_add_another_room_type method :" + err);
            }

        }

    }
}


function accommodation_room_amenties(a, index) {

    backkanimitespage = index;

    if (a == "roomAmenties") {


        accommodationdetailtwo = AppyTemplate.global.globalSecondPageAddListingData;
        if (updateaccomlisting == "true") {
            accommodationdetailtwo = accomDataForAddWithUpdateClick;
            if (globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList[index].roomAmenities) {
                accommodationRoomSelectedAmenities = globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList[index].roomAmenities;
            }
        }

        $$.get("pages/accommodation- amenities.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(accommodationdetailtwo);
            mainView.router.load({
                content: html,
                animatePages: true
            });
            Appyscript.closeModal();
        });
    }
}


function accommodation_room_myFunction(elem) {
    if (elem.checked) {

        console.log("=== Im Checked");
        var accomoAmeniroomId = elem.getAttribute("id");
        console.log("=== Checked accomoAmeniroomId " + accomoAmeniroomId);
        accommodation_room_val = document.getElementById(accomoAmeniroomId).value;
        console.log("=== Checked accommodation_room_val " + accommodation_room_val);
        accommodationRoomSelectedAmenities.push(accommodation_room_val);
        console.log("==== accommodationRoomSelectedAmenities push : " + accommodationAmenities);

    } else {
        console.log("=== Im not Checked");
        accommodationRoomSelectedAmenities.pop(accommodation_image_val);
        console.log("==== remove accommodationRoomSelectedAmenities push 1: " + accommodationAmenities);
    }
}

function backRoomAmenities() {

    if (updateaccomlisting == "true") {
        $$("#roomAmenitieseditid" + backkanimitespage).val(accommodationRoomSelectedAmenities.toString())
        accommodationRoomSelectedAmenities = [];
    } else {
        $$("#roomAmenitiesid" + backkanimitespage).val(accommodationRoomSelectedAmenities.toString())
        // accommodationRoomSelectedAmenities = [];

    }

}

function accommodation_image_amenties(a) {
    if (a == "imageAmenties") {
        accommodationdetailtwo = AppyTemplate.global.globalSecondPageAddListingData;
        if (updateaccomlisting == "true") {
            accommodationdetailtwo = accomDataForAddWithUpdateClick;
            if (globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationAmenitiesList) {
                accommodationAmenities = globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationAmenitiesList;
            }
        }

        $$.get("pages/accommodation-image-amenities.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(accommodationdetailtwo);
            mainView.router.load({
                content: html,
                animatePages: true
            });
            Appyscript.closeModal();
        });
    }


}




function accommodation_image_myFunction(elem) {

    if (elem.checked) {
        console.log("=== Im Checked");
        var accomoAmeniId = elem.getAttribute("id");
        console.log("=== Checked accomoAmeniId " + accomoAmeniId);
        accommodation_image_val = document.getElementById(accomoAmeniId).value;
        console.log("=== Checked accomoAmeniId " + accommodation_image_val);
        accommodationAmenities.push(accommodation_image_val);
        console.log("==== accommodationAmenities push : " + accommodationAmenities);

    } else {
        console.log("=== Im not Checked");
        accommodationAmenities.pop(accommodation_image_val);
        console.log("==== remove accommodationAmenities push 1: " + accommodationAmenities);
    }

}

var globalListSingleChecked = "0";
var globalListEditSingleChecked = "0";

function accommodation_detail_with_entire_property(index) {
    if (updateaccomlisting != "true") {
        var listSingleChecked = document.getElementById("accomodlistsingle" + index).checked;
        console.log("==== listSingleChecked : " + listSingleChecked)
        if (listSingleChecked) {
            globalListSingleChecked = "1";
            document.getElementById("accomodationRoomAvail").value = "1";
        } else {
            globalListSingleChecked = "0";
            document.getElementById("accomodationRoomAvail").value = " ";
        }

        var checkId = document.getElementById("check_list_or_not" + index);
        if (checkId.style.display == "none") {
            checkId.style.display = "block";
        } else if (checkId.style.display == "block") {
            checkId.style.display = "none";
        }

        //}
    } else {
        var listEditSingleChecked = document.getElementById("accomodlistsingleedit" + index).checked;
        console.log("==== listEditSingleChecked : " + listEditSingleChecked)

        if (listEditSingleChecked) {
            globalListEditSingleChecked = "1";
        } else {
            globalListEditSingleChecked = "0";
        }

        var checkEditId = document.getElementById("check_list_or_notedit" + index);
        if (checkEditId.style.display === "none") {
            checkEditId.style.display = "block";
        } else {
            checkEditId.style.display = "none";
        }


    }

}


function accommodation_submit_data() {

    var roomAmenities, roomImage, id, rooms, singleAccom, accommodationRoomTypeId, guests, guestChild, extraBed, extraBedPrice, propertyRooms, propertyBathrooms;

    /////// Statrt CODE FOR EXTRA ROOMS//////////////////

    console.log("==== extraRoomcounter : " + extraRoomCounter)

    /*   if(getAllDataForAddListing.accommodationRoom.length <= 0)
        {
        Appyscript.alert("please fill all mandatory fields" , appnameglobal_allpages);
return;
        }
        else
        {*/
    for (var i = 0; i < extraRoomCounter + 1; i++) {

        var fgdf = Appyscript.formToJSON('#addRoomAnotherDynamic' + i)

        var singleAccomVal = fgdf.singleAccom;

        if (fgdf.singleAccom == "on") {
            fgdf.singleAccom = "1";
            console.log("singleAccomVal" + singleAccomVal)
        } else {
            fgdf.singleAccom = "0";
        }

        if (fgdf.roomTypeId == "Select Room Type *" || fgdf.roomTypeId == "") {
            Appyscript.alert("Please fill the Room Type ", appnameglobal_allpages);
            return;
        }

        if (fgdf.rooms == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_room, appnameglobal_allpages);
            return;
        }
        /*if(fgdf.propertyRooms == "")
        {
        Appyscript.alert("Please fill the property Rooms ", appnameglobal_allpages);
         return;
        }
         if(fgdf.propertyBathrooms == "")
        {
        Appyscript.alert("Please fill the property Bathrooms ", appnameglobal_allpages);
         return;
        }*/
        if (fgdf.price == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_price, appnameglobal_allpages);
            return;
        }

        if (fgdf.guests == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_adults, appnameglobal_allpages);
            return;
        }
        if (fgdf.guestChild == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_children, appnameglobal_allpages);
            return;
        }


        getAllDataForAddListing.accommodationRoom.push(fgdf);

        getAllDataForAddListing.roomAmenities.push(accommodationRoomSelectedAmenities);

    }

    //  }

    /////// END CODE FOR EXTRA ROOMS//////////////////


    Appyscript.showIndicator();

    console.log("===== accommovideosendurl " + accommovideosendurl);
    if (accomrealvideosendurl === undefined || accomrealvideosendurl === '') {

        accommofilekey = "file";
        accommomimeType = "text/plain";
        accommopath = localStorage.getItem("dummysocial");
    } else {
        accommofilekey = "video";
        accommomimeType = "video/quicktime";
        accommopath = accomrealvideosendurl;
    }
    var accommodationimagebase64 = [];

    $$.each(accomodationLoadSoImages, function(index, element) {
        accommodationimagebase64.push(element.image)
    });

    //var sendimagebase64 = array = accommodationimagebase64 + ",";
    var sendimagebase64 = array = accommodationimagebase64;
    // console.log(sendimagebase64);
    var options = new FileUploadOptions();
    options.fileKey = accommofilekey;
    options.fileName = accommopath.substr(accommopath.lastIndexOf('/') + 1);
    options.mimeType = accommomimeType;
    options.headers = {
        'accessToken': deviceEncryptedToken
    };

    /*  var roomAmenities,roomImage, id, rooms, singleAccom, accommodationRoomTypeId,guests, guestChild, extraBed, extraBedPrice, propertyRooms, propertyBathrooms;

      getAllDataForAddListing.accommodationRoom.push({
      id : "",
      accommodationRoomTypeId : accomodationRoomType,
      rooms : accomodationRoomAvaliability,
      singleAccom : "yes",
      guests : accomodationMaxAdults,
      guestChild : accomodationMaxChild,
      price : accomodationPricePerNight,
      extraBed : "",
      extraBedPrice : "",
      propertyRooms : accomodationNoOfRoomInList,
      propertyBathrooms : accomodationNoOfBathInList,
      roomAmenities : accommodationRoomSelectedAmenities,
       roomImage : globalRoomImage
      });*/

    for (var i = 0; i < getAllDataForAddListing.accomodationData.length; i++) {
        accomName = getAllDataForAddListing.accomodationData[i].accomodationName;
        accomType = getAllDataForAddListing.accomodationData[i].accomodationType;
        accomEmail = getAllDataForAddListing.accomodationData[i].accomodationEmail;
        accomPhoneNo = getAllDataForAddListing.accomodationData[i].accomodationPhone;
        accomFax = getAllDataForAddListing.accomodationData[i].accomodationFax;
        accomAddress = getAllDataForAddListing.accomodationData[i].accomodationAddress;
        accomCity = getAllDataForAddListing.accomodationData[i].accomodationCity;
        accomState = getAllDataForAddListing.accomodationData[i].accomodationState;
        accomCountry = getAllDataForAddListing.accomodationData[i].accomodationCountry;
        accomZipCode = getAllDataForAddListing.accomodationData[i].accomodationZipCode;

    }
    for (var i = 0; i < getAllDataForAddListing.accomodationDataSecond.length; i++) {
        accomOwnerPro = getAllDataForAddListing.accomodationDataSecond[i].accomodationProfile;
        accomCheckIn = getAllDataForAddListing.accomodationDataSecond[i].accomodationCheckInTime;
        accomCheckOut = getAllDataForAddListing.accomodationDataSecond[i].accomodationCheckOutTime;
        accomApplyOffLine = getAllDataForAddListing.accomodationDataSecond[i].accomodationApplyOffline;
        accomAddReview = getAllDataForAddListing.accomodationDataSecond[i].accomodationAddReview;
        /*accomAmenitiesType = getAllDataForAddListing.accomodationDataSecond[i].accomodationAmenitiesType;*/
        accomDetails = getAllDataForAddListing.accomodationDataSecond[i].accomodationDetails;
        offerPercent = getAllDataForAddListing.accomodationDataSecond[i].offerPercent;

    }

    console.log("===== data accomName : " + accomName + " Type : " + accomType + " Email : " + accomEmail + " Phone : " + accomPhoneNo + " Fax : " + accomFax);
    console.log("===== data 1 accomAddress : " + accomAddress + " accomCity : " + accomCity + " accomState : " + accomState + " accomCountry : " + accomCountry + " accomZipCode : " + accomZipCode);
    console.log("===== data 2 accomOwnerPro : " + accomOwnerPro + " accomCheckIn : " + accomCheckIn + " accomCheckOut : " + accomCheckOut + " accomApplyOffLine : " + accomApplyOffLine + " accomAddReview : " + accomAddReview);

    var params = new Object();
    options.params = params;
    //var accomvideodelete = "";
    if (updateaccomlisting == "true") {
        var owner_accom_id = accommEditListId;
        if (accomvideodelete == "true") {
            params.oldVideoImage = "";
            params.oldVideo = "";
        } else {
            params.oldVideoImage = dataglobalupdateList.videoImage;
            params.oldVideo = dataglobalupdateList.video;
        }
        var deletesendingimage = array = deleteimage + ",";
        params.rimages = deletesendingimage;
    } else {
        var owner_accom_id = ""
    }
    console.log("==== owner_accom_id " + owner_accom_id);

    getAllDataForAddListing.accommodationdata.push({
        id: owner_accom_id,
        appId: appId,
        pageId: pageIdentifie,
        owner: localStorage.getItem('email'),
        name: accomName,
        accommodationType: accomType,
        email: accomEmail,
        phone: accomPhoneNo,
        fax: accomFax,
        address: accomAddress,
        city: accomCity,
        state: accomState,
        country: accomCountry,
        zip: accomZipCode,
        ownerShow: accomOwnerPro,
        checkintime: accomCheckIn,
        checkouttime: accomCheckOut,
        ApplyOffLine: accomApplyOffLine,
        allowAddReview: accomAddReview,
        offer: "1",
        latitude: "",
        longitude: "",
        offerPercent: offerPercent,
        video: "",
        videoImage: "",
        youtube: ""

    });
    params.accommodationdata = JSON.stringify(getAllDataForAddListing.accommodationdata);
    params.accommodationAmenities = JSON.stringify(accommodationAmenities);
    params.description = accomDetails;
    params.accommodationImage = JSON.stringify(sendimagebase64);
    params.accommodationRoom = JSON.stringify(getAllDataForAddListing.accommodationRoom);
    options.params = params;

    console.log("===== getAllDataForAddListing final : " + JSON.stringify(getAllDataForAddListing));
    console.log("=== HotelBaseUrl " + HotelBaseUrl)
    console.log("==== params  : " + params);
    console.log("==== params  : " + JSON.stringify(options));
    var ft = new FileTransfer();
    ft.upload(accommopath, webserviceUrl + 'accomodation_media_upload.php', accommoSuccess, fail, options);


}

function accommoSuccess(r) {

    accomodationLoadSoImages = [];
    deleteimage = [];
    //  amenitiesaddprprty = []
    getAllDataForAddListing = {
        accomodationData: [],
        accomodationDataSecond: [],
        accommodationAmenities: [],
        accommodationImage: [],
        accommodationRoom: [],
        roomAmenities: [],
        accommodationdata: []
    };

    addstoredatafirstpage = '';
    addstoredatafirstpage2 = '';
    addstoredatafirstpage3 = '';
    addstoredataaddedroomdata = [];
    Appyscript.hideIndicator();
    console.log(r.response);
    accommodationAmenities = [];
    Appyscript.alert(pageData.languageSetting.alert_listing_submit_success, appnameglobal_allpages, function() {
        Appyscript.hideIndicator();
        AccommodationUpdateBack();
        //Appyscript.openHotel();
    });

}




////////////////////// addListingAccomodationTypeChange ////////////////////////////////////////

function openAddAnotherRoomPage(dataa) {

    addAnotherRoomClickHtml = '<div class="accordion-item  accordion-closed" id = "divId' + (accommocounter + 1) + '"><a class="icon-trash remove-acc" onclick="deleteAnotherRoomType(this)"></a><a class="item-link"> {{@global.pageLanguageSetting.roomdetail}} <i class="icon-right-open"></i><i class="icon-down-open"></i></a> <div class="accordion-item-content" ><form id="addRoomAnotherDynamic' + (accommocounter + 1) + '">  <input type="hidden" name="id" id="roomupdateid" class="" value="{{id}}"> <div class="select_new"> <select id="selectroomtype' + (accommocounter + 1) + '" name="roomTypeId"> <option>{{@global.pageLanguageSetting.room_type}} *</option>{{#roomType}}<option value="{{id}}">{{name}}</option>{{/roomType}}</select></div> <div class="room_avai"> <input type="text"  name="rooms" id="accomodationRoomAvail' + (accommocounter + 1) + '" placeholder="{{@global.pageLanguageSetting.rooms_availability}} *"><span> {{@global.pageLanguageSetting.rooms_available}} </span></div>   <div class="check_box" ><input type="checkbox" onclick="accommodation_detail_with_entire_property(' + (accommocounter + 1) + ')" id="accomodlistsingle' + (accommocounter + 1) + '"/><span onclick="accommodation_detail_with_entire_property(' + (accommocounter + 1) + ')">{{@global.pageLanguageSetting.list_entire_property_as_single_accommodation}}</span><div class="check_list" id="check_list_or_not' + (accommocounter + 1) + '" style="display:none"><div class="no_room"><label>{{@global.pageLanguageSetting.no_of_rooms}} (in the Accommodation) *  </label><input id="noOfRoom' + (accommocounter + 1) + '" name="propertyRooms" type="text" placeholder="0"></div><div class="no_room"><label>{{@global.pageLanguageSetting.no_of_bathrooms}} *  </label><input id="noOfBath" name="propertyBathrooms"  type="text" placeholder="0"></div></div></div><div class="room_avai"><input type="text" name="price" id="accomodpricepernight' + (accommocounter + 1) + '" placeholder="{{@global.pageLanguageSetting.price_per_night}} *"></div><div class="max_alults"><label>{{@global.pageLanguageSetting.maximum_adult_allowed}} (Per Room*) </label><input type="number" name="guests" id="accomodmaxadults' + (accommocounter + 1) + '"/></div> <div class="max_alults"><label>{{@global.pageLanguageSetting.maximum_children_allowed}} (Below 12 years*) </label><input type="number" id="accomodmaxchild' + (accommocounter + 1) + '" name="guestChild" /><input type="hidden" name="roomAmenities" id="roomAmenitiesid' + (accommocounter + 1) + '" class="" ></div><div class="accomm_head" onclick="accommodation_room_amenties(\'roomAmenties\',' + (accommocounter + 1) + ')"><a href="#.">{{@global.pageLanguageSetting.room_amenities}}  <span class="appyslim-arrows-right-arrow"></span></a></div></form></div></div>';
    var compiledBGTemplate = AppyTemplate.compile(addAnotherRoomClickHtml),
        bghtml = compiledBGTemplate(dataa);

    $$(".tabAddClickAnotherRoom").append(bghtml);
    accommocounter++;
    Appyscript.hideIndicator();

}



function deleteAnotherRoomType(e) {

    Appyscript.modal({
        title: pageData.languageSetting.are_you_sure_you_want_to_delete_the_room,
        verticalButtons: true,
        buttons: [{
                text: data.languageSetting.ok_mcom,
                onClick: function() {
                    $$(e).parents(".accordion-item").remove();
                    accommocounter--;

                }
            },
            {
                text: data.languageSetting.common_cancel,
                onClick: function() {


                }
            }
        ]
    });




}




function accomodationGalleryCamera(index) {

    var imgid = "imageSL" + index;
    imgIndexSl = index;
    sessionStorage.setItem("imgId", imgid);

    Appyscript.modal({
        title: pageData.languageSetting.click_to_upload_image_dir,
        verticalButtons: true,
        buttons: [{
                text: AppyTemplate.global.commonLanguageSetting.Camera_social_network,
                onClick: function() {
                    if (Appyscript.device.android) {
                        Appyscript.cameraPermission('addmore_camerarealaccom', 'Appyscript.permissionDenied')
                    } else {
                        addmore_camerarealaccom()
                    }
                    //navigator.device.capture.captureImage(captureSuccessDirectoryy, captureErrorDirectory, options);
                }
            },
            {
                text: AppyTemplate.global.commonLanguageSetting.common_upload_from_gallery,
                onClick: function() {


                    if (Appyscript.device.android) {
                        Appyscript.storagePermission('accomdationmultiup1', 'Appyscript.permissionDenied')
                    } else {
                        accomdationmultiup1()
                    }


                    //navigator.camera.getPicture(librarySuccessDirr, libraryErrorDir, options);

                }
            },
            {
                text: AppyTemplate.global.commonLanguageSetting.common_cancel,
                onClick: function() {

                }
            }
        ]
    })
}




function addmore_camerarealaccom() {

    //    var options = {
    //        quality: 50,
    //        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //        destinationType: navigator.camera.DestinationType.FILE_URI,
    //    }
    //    navigator.device.capture.captureImage(captureSuccessrealestateaccommo, captureErrorrealestateaccommo, options);
    navigator.camera.getPicture(captureSuccessrealestateaccommo, captureErrorrealestateaccommo, {
        quality: 70,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true
    });
}

function captureSuccessrealestateaccommo(mediaFiles) {
    var imageData = mediaFiles;
    var imgId = sessionStorage.getItem("imgId");

    indexval = parseInt(addImgIndex) + 1;
    //    $$(addImgA).parent().append('<span class="uploadImg"><img src="' + imageData + '" id="imageSL' + addImgIndex + '" onclick="selectPhotoDir(' + addImgIndex + ');"><a onclick="removeThisreal(this,' + addImgIndex + ')">X</a></span><span class="add-more" onclick="addMoreClick3(this,' + indexval + ')" addimg="plus">+</span>');
    //    $$(addImgA).remove();
    $$(addImgA).prev().children().append('<span  class="uploadAccomoImg"><img src="' + imageData + '" id="imageSL' + addImgIndex + '" ><a onclick="removeThisrealaccom(this,' + addImgIndex + ')">X</a></span>');

    $$(".add-more").attr("index", indexval);

    accomobase64(imageData);


    Appyscript.hideIndicator();
}

function captureErrorrealestateaccommo() {
    console.log("error");
}

function accomdationmultiup1() {

    var options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
    }
    navigator.camera.getPicture(accomolibrarySuccessDirr, libraryErrorDir, options);
}


/*  This function is used to add more click  */
function accomodationAddMoreClick(a) {
    imgclick = a.getAttribute("addimg");
    index = a.getAttribute("index");
    console.log("a" + a);
    console.log("a" + index);
    console.log("addImgA" + addImgA);
    addImgA = a;
    addImgIndex = index;
    accomodationGalleryCamera(index);
    console.log("addImgA" + addImgA);

}

function accomobase64(imageURI) {
    console.log(imageURI);
    getFileContentAsBase64(imageURI, function(base64Image) {
        accomodationLoadSoImages.push({
            'image': btoa(base64Image)
        });


    });
    console.log(accomodationLoadSoImages);
}

function accomolibrarySuccessDirr(imageURI) {
    accomobase64(imageURI);

    console.log($$(addImgA).parent());

    var imageData = imageURI;
    // sessionStorage.setItem('imageData', imageData);

    indexval = parseInt(addImgIndex) + 1;

    $$(addImgA).prev().children().append('<span  class="uploadAccomoImg"><img src="' + imageData + '" id="imageSL' + addImgIndex + '" ><a onclick="removeThisrealaccom(this,' + addImgIndex + ')">X</a></span>');

    $$(".add-more").attr("index", indexval);

}


function removeThisrealaccom(a, index) {
    $$(a).parent().remove();
    if (updatepropertydataAll != "") {
        $$(a).prev().attr('src');
        deleteimage.push($$(a).prev().attr('src'));
    }


    //realsendsoimages[parseInt(index)]="";
    accomodationLoadSoImages.splice(parseInt(index), 1);
}


//////////////////////// CODE FOR UPLOAD VIDEO ///////////////////////////////////////////////



function uploadvideoaccom() {

    Appyscript.modal({
        title: "Upload video",
        verticalButtons: true,
        buttons: [{
                text: "Camera",
                onClick: function() {
                    //Appyscript.accomcapturevideocamera();
                    accomcapturevideocamera();
                    Appyscript.cameraPermission('addmore_camerarealaccomVideo', 'Appyscript.permissionDenied')
                }
            },
            {
                text: "Gallery",
                onClick: function() {
                    //  Appyscript.accomcapturevideogallery();
                    accomcapturevideogallery();
                }
            },
            {
                text: "Cancel",
                onClick: function() {

                }
            }
        ]
    });
}

//Appyscript.accomcapturevideocamera = function() {
function accomcapturevideocamera() {

    var ramv;
    var options = {
        limit: 1,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        duration: 100000000

    };

    navigator.device.capture.captureVideo(onSuccess, onError, options);



    function onSuccess(mediaFiles) {

        VideoEditor.getVideoInfo(
            getVideoInfoSuccessaccom,
            getVideoInfoErroraccom, {
                fileUri: mediaFiles[0].fullPath
            }
        );

        VideoEditor.createThumbnail(
            trimSuccessaccom, // success cb
            trimFailaccom, // error cb
            {
                fileUri: mediaFiles[0].fullPath, // the path to the video on the device
                outputFileName: 'output-name', // the file name for the JPEG image
                atTime: 2, // optional, location in the video to create the thumbnail (in seconds)
                width: 320, // optional, width of the thumbnail
                height: 480, // optional, height of the thumbnail
                quality: 100 // optional, quality of the thumbnail (between 1 and 100)
            }
        );


        ramv = mediaFiles[0].fullPath;
        var cvid = Math.floor((Math.random() * 1000000) + 1);
        accomrealvideosendurl = mediaFiles[0].fullPath;


    }

    function onError(error) {


    }

}

function trimSuccessaccom(result) {
    console.log(result);
    if (updateaccomlisting == "true") {
        var cvid = Math.floor((Math.random() * 1000000) + 1);
        $("#accommstatevideoedit").html('');

        $("#accommstatevideoedit").html('<li><span class="uploadAccomoImg"><img src="' + result + '" id="imageSL' + addImgIndex + '" uploadpicurl=' + result + '><a onclick="removeThisaccomvideo(this,' + cvid + ')">X</a></span></li>')
        $$("#addvideoaccommedit").hide();


    } else {
        var cvid = Math.floor((Math.random() * 1000000) + 1);
        $("#accommstatevideo").html('');

        $("#accommstatevideo").html('<li><span class="uploadAccomoImg"><img src="' + result + '" id="imageSL' + addImgIndex + '" uploadpicurl=' + result + '><a onclick="removeThisaccomvideo(this,' + cvid + ')">X</a></span></li>')
        $$("#addvideoaccomm").hide();


    }

}

function trimFailaccom() {
    console.log("error");
}


//Appyscript.accomcapturevideogallery = function() {
function accomcapturevideogallery() {


    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: Camera.MediaType.VIDEO,
        correctOrientation: true
    });

    function onSuccess(imageURI1) {

        VideoEditor.getVideoInfo(
            getVideoInfoSuccessaccom,
            getVideoInfoErroraccom, {
                fileUri: imageURI1
            }
        );
        if (Appyscript.device.android) {
            imageURI1 = Appyscript.getRealPathFromURI(imageURI1);
        }
        setTimeout(function() {
            VideoEditor.createThumbnail(
                trimSuccessgalleryvideo, // success cb
                trimFailgalleryvideo, // error cb
                {
                    fileUri: imageURI1, // the path to the video on the device
                    outputFileName: 'output-name', // the file name for the JPEG image
                    atTime: 2, // optional, location in the video to create the thumbnail (in seconds)
                    width: 320, // optional, width of the thumbnail
                    height: 480, // optional, height of the thumbnail
                    quality: 100 // optional, quality of the thumbnail (between 1 and 100)
                }
            );


            accomrealvideosendurl = imageURI1;
        }, 1000);
    }

    function onFail(message) {

    }
}

function getVideoInfoSuccessaccom(info) {
    console.log(JSON.parse(JSON.stringify(info, null, 2)).orientation);
    accomrealvideomode = JSON.parse(JSON.stringify(info, null, 2)).orientation;
}

function getVideoInfoErroraccom() {
    console.log("dsgs")
}

function trimSuccessgalleryvideo(result) {
    if (updateaccomlisting == "true") {
        var cvid = Math.floor((Math.random() * 1000000) + 1);
        $$("#accommstatevideoedit").html('');

        $$("#accommstatevideoedit").html('<li><span class="uploadAccomoImg"><img src="' + result + '" id="imageSL' + addImgIndex + '" uploadpicurl=' + result + '><a onclick="removeThisaccomvideo(this,' + cvid + ')">X</a></span></li>')
        $$("#addvideoaccommedit").hide();
    } else {
        var cvid = Math.floor((Math.random() * 1000000) + 1);
        $$("#accommstatevideo").html('');

        $$("#accommstatevideo").html('<li><span class="uploadAccomoImg"><img src="' + result + '" id="imageSL' + addImgIndex + '" uploadpicurl=' + result + '><a onclick="removeThisaccomvideo(this,' + cvid + ')">X</a></span></li>')
        $$("#addvideoaccomm").hide();
    }
}




function removeThisaccomvideo() {
    $$("#accommstatevideo").html('');
    $$("#accommstatevideo").html('<li id="addvideoaccomm"><span class="add-more" onclick="uploadvideoaccom()" addimg="plus" >+</span></li>');
    /* if (updatepropertydataAll != "") {
         accomvideodelete = "true";
     }*/
    accomvideodelete = "true";
}

function trimFailgalleryvideo() {
    console.log("trimFailgallery")
}

//////////////////////// END CODE FOR UPLOAD VIDEO ///////////////////////////////////////////////


///// FOR EDITING AND UPDATE //////////////////
var accommaccommodationImageUpdate;
var accomUpdateImageArray = "";
var imgAppendIndex = 0;
var imageupdate = '';
var accommaccommodationVideoUpdate = '';

function update_Listing() {
    updateaccomlisting = "true"
    deleteimage = [];
    try {
        console.log("==== update_Listing pageIdentifie : " + pageIdentifie);

        setTimeout(function() {
            update_add_Listing();
        }, 500)

        var postData = '{"method":"getAccommodation","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '","userEmail":"' + localStorage.getItem('email') + '" }';
        console.log("===== update_Listing post data " + postData);
        if (isOnline()) {
            Appyscript.showIndicator();
            $$.ajax({
                url: HotelBaseUrl,
                data: Appyscript.validateJSONData(postData),
                type: "post",
                //321  headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(jsonData, textStatus) {
                    var accomodationUpdateEditListingData = JSON.parse(jsonData);
                    console.log("===== accomodationUpdateEditListingData " + accomodationUpdateEditListingData);
                    console.log("===== update_Listing  ggg " + JSON.stringify(accomodationUpdateEditListingData));
                    if (accomodationUpdateEditListingData != '') {

                        accomodationAddUpdateEditListingData = accomodationUpdateEditListingData;
                        AppyTemplate.global.checkAddUpdatePage = 0

                        $$.get("pages/accommodation-update-listing.html", function(template) {
                            var compiledTemplate = AppyTemplate.compile(template);
                            var html = compiledTemplate(accomodationAddUpdateEditListingData);

                            mainView.router.load({
                                content: html,
                                animatePages: true
                            });
                            Appyscript.closeModal();
                        });
                    } else {
                        Appyscript.hideIndicator();
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
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
    } catch (err) {
        console.log("Exception in update_Listing method :" + err);
    }



}

var handlePushBackForEdit = 0;

function update_add_Listing() {

    try {
        console.log("==== pageIdentifie : " + pageIdentifie);
        var postData = '{"method":"getAccommodationProperties","appId":"' + appId + '","pageIdentifire":"' + pageIdentifie + '"}';
        console.log("===== update_add_Listing getAccommodationProperties post data " + postData);
        if (isOnline()) {
            Appyscript.showIndicator();
            $$.ajax({
                url: HotelBaseUrl,
                data: Appyscript.validateJSONData(postData),
                type: "post",
                //321  headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(jsonData, textStatus) {

                    var accomodationUpdateClickListingData = JSON.parse(jsonData);
                    var checkAddorUpdate;
                    console.log("===== update_add_Listing getAccommodationProperties " + accomodationUpdateClickListingData);
                    console.log("===== update_add_Listing getAccommodationProperties  ggg " + JSON.stringify(accomodationUpdateClickListingData));
                    if (accomodationUpdateClickListingData != '') {
                        accomDataForAddWithUpdateClick = accomodationUpdateClickListingData;

                        //AppyTemplate.global.globalAddListingData = accomodationAddListingData;

                    } else {
                        Appyscript.hideIndicator();
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
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
    } catch (err) {
        console.log("Exception in update_add_Listing method :" + err);
    }

}

function Listing_Edit(EdListId) {
    console.log("===== EdListId : " + EdListId);
    console.log("===== Listing_Edit accomodationAddUpdateEditListingData : " + accomodationAddUpdateEditListingData);
    Appyscript.showIndicator();
    for (var i = 0; i < accomodationAddUpdateEditListingData.accommodationList.length; i++) {
        var listId = accomodationAddUpdateEditListingData.accommodationList[i].id;
        if (listId == EdListId) {
            console.log("==== id matched : ")
            accommEditListId = accomodationAddUpdateEditListingData.accommodationList[i].id;
            var accommName = accomodationAddUpdateEditListingData.accommodationList[i].name;
            var accommType = accomodationAddUpdateEditListingData.accommodationList[i].propertyType;
            var accommEmail = accomodationAddUpdateEditListingData.accommodationList[i].email;
            var accommPhone = accomodationAddUpdateEditListingData.accommodationList[i].phone;
            var accommFax = accomodationAddUpdateEditListingData.accommodationList[i].fax;
            var accommAddress = accomodationAddUpdateEditListingData.accommodationList[i].address;
            var accommCity = accomodationAddUpdateEditListingData.accommodationList[i].city;
            var accommState = accomodationAddUpdateEditListingData.accommodationList[i].state;
            var accommCountry = accomodationAddUpdateEditListingData.accommodationList[i].country;
            var accommZip = accomodationAddUpdateEditListingData.accommodationList[i].zip;
            var nextButtonClick = "EditNext";
            accommaccommodationVideoUpdate = accomodationAddUpdateEditListingData.accommodationList[i].video;
            var accommownerShow = accomodationAddUpdateEditListingData.accommodationList[i].ownerShow;
            var accommcheckintime = accomodationAddUpdateEditListingData.accommodationList[i].checkInTime;
            var accommcheckouttime = accomodationAddUpdateEditListingData.accommodationList[i].checkOutTime;
            var accommApplyOffLine = accomodationAddUpdateEditListingData.accommodationList[i].offer;
            var accommApplyOffLinePercentage = accomodationAddUpdateEditListingData.accommodationList[i].offerPercent
            var accommallowAddReview = accomodationAddUpdateEditListingData.accommodationList[i].allowAddReview;
            var accommdescription = accomodationAddUpdateEditListingData.accommodationList[i].description;
            var accommodationAmenitiesList = accomodationAddUpdateEditListingData.accommodationList[i].amenitiesList;
            accommaccommodationImageUpdate = accomodationAddUpdateEditListingData.accommodationList[i].imageList;

            var accommodationRoomList = accomodationAddUpdateEditListingData.accommodationList[i].accommodationRoomList;


            console.log("===== var accommaccommodationImageUpdate : " + accommaccommodationImageUpdate)

            globalAddUpdateEditDltListingData.accommodationListEdit.push({
                accommEditListId: accommEditListId,
                accommName: accommName,
                accommType: accommType,
                accommEmail: accommEmail,
                accommPhone: accommPhone,
                accommFax: accommFax,
                accommAddress: accommAddress,
                accommCity: accommCity,
                accommState: accommState,
                accommCountry: accommCountry,
                accommZip: accommZip,
                nextButtonClick: nextButtonClick,
                accommownerShow: accommownerShow,
                accommcheckintime: accommcheckintime,
                accommcheckouttime: accommcheckouttime,
                accommApplyOffLine: accommApplyOffLine,
                accommallowAddReview: accommallowAddReview,
                accommApplyOffLinePercentage: accommApplyOffLinePercentage,
                accommdescription: accommdescription,
                accommodationAmenitiesList: accommodationAmenitiesList,
                accommaccommodationImageUpdate: accommaccommodationImageUpdate,
                accommaccommodationVideoUpdate: accommaccommodationVideoUpdate,
                accommaccommodationVideoUpdateImage: accomodationAddUpdateEditListingData.accommodationList[i].videoImage,
                accommodationRoomList: accommodationRoomList


            });


            globalAddUpdateEditDltListingData.accommodationListEdit.push(accomDataForAddWithUpdateClick.accommodationType);
            globalAddUpdateEditDltListingData.accommodationListEdit.push(accomDataForAddWithUpdateClick.countryList);
            globalAddUpdateEditDltListingData.accommodationListEdit.push(accomDataForAddWithUpdateClick.roomType);

            $$.get("pages/add-accommodation-detail.html", function(template) {
                var compiledTemplate = AppyTemplate.compile(template);
                var html = compiledTemplate(globalAddUpdateEditDltListingData);
                mainView.router.load({
                    content: html,
                    animatePages: true
                });
                Appyscript.closeModal();

                Appyscript.hideIndicator();
            });
        } else {
            console.log("==== id not matched : ")
        }
    }


}

function handlePushBack() {
    globalAddUpdateEditDltListingData = {
        accommodationListEdit: []
    };
}

function accommodation_detail_Edit(data) {
    if (data == "editFirstNextClick") {
        console.log("==== editFirstNextClick ")
        var accomodationNameEdit = document.getElementById('accomodationNameedit').value;
        console.log("==== accomodationNameEdit : " + accomodationNameEdit)
        var accomodationTypeEdit = document.getElementById('slectedaddlistingedit').value
        console.log("==== accomodationTypeEdit : " + accomodationTypeEdit)
        var accomodationEmailEdit = document.getElementById('accomodationEmailedit').value
        console.log("==== accomodationEmailEdit : " + accomodationEmailEdit)
        var accomodationPhoneEdit = document.getElementById('accomodationPhoneedit').value
        console.log("==== accomodationPhoneEdit : " + accomodationPhoneEdit)
        var accomodationFaxEdit = document.getElementById('accomodationFaxedit').value
        console.log("==== accomodationFaxEdit : " + accomodationFaxEdit)
        var accomodationAddressEdit = document.getElementById('accomodationAddressedit').value
        console.log("==== accomodationAddressEdit : " + accomodationAddressEdit)
        var accomodationCityEdit = document.getElementById('accomodationCityedit').value
        console.log("==== accomodationCityEdit : " + accomodationCityEdit)
        var accomodationStateEdit = document.getElementById('accomodationStateedit').value
        console.log("==== accomodationStateEdit : " + accomodationStateEdit)
        var accomodationCountryEdit = document.getElementById('selectedCountryedit').value
        console.log("==== accomodationCountryEdit : " + accomodationCountryEdit)
        var accomodationZipCodeEdit = document.getElementById('accomodationZipCodeedit').value
        console.log("==== accomodationZipCodeEdit : " + accomodationZipCodeEdit)
        if (accomodationNameEdit == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_accommodation_name, appnameglobal_allpages);
            return;
        } else if (accomodationTypeEdit == "") {
            Appyscript.alert("Please select accomodation Type ", appnameglobal_allpages);
            return;
        } else if (accomodationEmailEdit == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_accommodation_email, appnameglobal_allpages);
            return;
        } else if (accomodationPhoneEdit == "") {
            Appyscript.alert(pageData.languageSetting.please_fill_the_accommodation_phone, appnameglobal_allpages);
            return;
        } else if (accomodationAddressEdit == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_address


                , appnameglobal_allpages);
            return;
        } else if (accomodationCityEdit == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_city, appnameglobal_allpages);
            return;
        } else if (accomodationStateEdit == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_state, appnameglobal_allpages);
            return;
        } else if (accomodationCountryEdit == "") {
            Appyscript.alert("Please select accomodation Country ", appnameglobal_allpages);
            return;
        } else if (accomodationZipCodeEdit == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_zip_code, appnameglobal_allpages);
            return;
        } else if (accomodationZipCodeEdit.length > 9) {
            $$("#pass").parent().addClass("error");
            Appyscript.alert("length should be 4 to 9", function() {
                localStorage.popup = true
            });
            $$("form").eq(0).parent()[0].scrollTop = $$(".error")[0].offsetTop;
            return;
        }


        getAllDataForEditUpdateListing.accomodationFirstEditData.push({
            accomodationNameEdit: accomodationNameEdit,
            accomodationTypeEdit: accomodationTypeEdit,
            accomodationEmailEdit: accomodationEmailEdit,
            accomodationPhoneEdit: accomodationPhoneEdit,
            accomodationFaxEdit: accomodationFaxEdit,
            accomodationAddressEdit: accomodationAddressEdit,
            accomodationCityEdit: accomodationCityEdit,
            accomodationStateEdit: accomodationStateEdit,
            accomodationCountryEdit: accomodationCountryEdit,
            accomodationZipCodeEdit: accomodationZipCodeEdit
        });

        /* console.log("===== getAllDataForAddListing : " + JSON.stringify(getAllDataForAddListing));
         accommodationdetailone = AppyTemplate.global.globalAddListingData;
          AppyTemplate.global.globalSecondPageAddListingData = accommodationdetailone;*/
        console.log("===== var accommaccommodationImageUpdate : " + accommaccommodationImageUpdate)

        $$.get("pages/accommodation-detail-2.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(globalAddUpdateEditDltListingData);
            mainView.router.load({
                content: html,
                animatePages: true
            });
            Appyscript.closeModal();
        });
    }

}


function accommodation_detail_Edit_2nd(data) {
    if (data == "secondEditNextClick") {

        var accomodationProfileEdit = document.getElementById('selectedOwnerProfileedit').value;
        console.log("==== accomodationProfileEdit : " + accomodationProfileEdit)
        var accomodationCheckInTimeEdit = document.getElementById('checkintimeedit').value
        console.log("==== accomodationCheckInTimeEdit : " + accomodationCheckInTimeEdit)
        var accomodationCheckOutTimeEdit = document.getElementById('checkouttimeedit').value
        console.log("==== accomodationCheckOutTimeEdit : " + accomodationCheckOutTimeEdit)
        var accomodationApplyOfflineEdit = document.getElementById('selectdApplyOfflineedit').value
        console.log("==== accomodationApplyOfflineEdit : " + accomodationApplyOfflineEdit)
        var accomodationAddReviewEdit = document.getElementById('selectedaddReviewedit').value
        console.log("==== accomodationAddReviewEdit : " + accomodationAddReviewEdit)
        /*var accomodationAmenitiesType = document.getElementById('slectedAmenitieslisting').value
        console.log("==== accomodationAmenitiesType : " + accomodationAmenitiesType)*/
        var accomodationDetailsEdit = document.getElementById('accomodationDescedit').value
        console.log("==== accomodationDetailsEdit : " + accomodationDetailsEdit)
        var offerpercentageedit = document.getElementById('applyofferPeredit').value
        console.log("==== offerpercentageedit : " + offerpercentageedit)

        if (accomodationProfileEdit == "") {
            Appyscript.alert("Please fill the accomodation Profile ", appnameglobal_allpages);
            return;
        } else if (accomodationCheckInTimeEdit == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_checkin_time, appnameglobal_allpages);
            return;
        } else if (accomodationCheckOutTimeEdit == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_checkout_time, appnameglobal_allpages);
            return;
        } else if (accomodationApplyOfflineEdit == "") {
            Appyscript.alert("Please select accomodation Apply Offer ", appnameglobal_allpages);
            return;
        } else if (accomodationAddReviewEdit == "") {
            Appyscript.alert(pageData.languageSetting.accommodation_add_review, appnameglobal_allpages);
            return;
        }

        /* else if(accomodationAmenitiesType == ""  || accomodationAmenitiesType == "Select Accommodation Amenities Type *")
          {
           Appyscript.alert("Please fill the mandatory ", appnameglobal_allpages);
           return;
          }*/
        getAllDataForEditUpdateListing.accomodationDataSecondEdit.push({
            accomodationProfileEdit: accomodationProfileEdit,
            accomodationCheckInTimeEdit: accomodationCheckInTimeEdit,
            accomodationCheckOutTimeEdit: accomodationCheckOutTimeEdit,
            accomodationApplyOfflineEdit: accomodationApplyOfflineEdit,
            accomodationAddReviewEdit: accomodationAddReviewEdit,
            /* accomodationAmenitiesType : accomodationAmenitiesType,*/
            accomodationDetailsEdit: accomodationDetailsEdit,
            offerpercentageedit: offerpercentageedit
        });
        /*if(globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList.roomType.length == 0)
        {*/
        globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList.push(accomDataForAddWithUpdateClick.roomType)
        // }
        /* console.log("===== getAllDataForAddListing 2 : " + JSON.stringify(getAllDataForAddListing));
         accommodationdetailtwo = AppyTemplate.global.globalSecondPageAddListingData;*/
        $$.get("pages/add-accommodation-detail-3.html", function(template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(globalAddUpdateEditDltListingData);
            mainView.router.load({
                content: html,
                animatePages: true
            });
            Appyscript.closeModal();
        });
    }

}


function accommodation_submit_data_for_update() {


    var roomAmenities, roomImage, id, rooms, singleAccom, accommodationRoomTypeId, guests, guestChild, extraBed, extraBedPrice, propertyRooms, propertyBathrooms;

    /////// Statrt CODE FOR EXTRA ROOMS//////////////////

    console.log("==== extraRoomcounter : " + extraRoomCounter)
    for (var i = 0; i < globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList.length; i++) {

        var fgdf = Appyscript.formToJSON('#addRoomAnotherDynamicedit' + i)
        if (fgdf.roomTypeId) {
            if (fgdf.rooms == "") {
                Appyscript.alert(pageData.languageSetting.please_fill_the_room, appnameglobal_allpages);
                return;
            }
            /* if(fgdf.propertyRooms == "")
             {
             Appyscript.alert("Please fill the property Rooms ", appnameglobal_allpages);
              return;
             }
              if(fgdf.propertyBathrooms == "")
             {
             Appyscript.alert("Please fill the property Bathrooms ", appnameglobal_allpages);
              return;
             }*/
            if (fgdf.price == "") {
                Appyscript.alert(pageData.languageSetting.please_fill_the_price, appnameglobal_allpages);
                return;
            }

            if (fgdf.guests == "") {
                Appyscript.alert(pageData.languageSetting.please_fill_the_adults, appnameglobal_allpages);
                return;
            }
            if (fgdf.guestChild == "") {
                Appyscript.alert(pageData.languageSetting.please_fill_the_children, appnameglobal_allpages);
                return;
            }

            getAllDataForEditUpdateListing.accommodationRoomEdit.push(fgdf);
        }

    }

    /////// END CODE FOR EXTRA ROOMS//////////////////



    Appyscript.showIndicator();
    console.log("===== accommovideosendurl " + accommovideosendurl);
    if (accomrealvideosendurl === undefined || accomrealvideosendurl === '') {

        accommofilekey = "file";
        accommomimeType = "text/plain";
        accommopath = localStorage.getItem("dummysocial");
    } else {
        accommofilekey = "video";
        accommomimeType = "video/quicktime";
        accommopath = accomrealvideosendurl;
    }
    var accommodationimagebase64 = [];

    $$.each(accomodationLoadSoImages, function(index, element) {
        accommodationimagebase64.push(element.image)
    });

    //var sendimagebase64 = array = accommodationimagebase64 + ",";
    var sendimagebase64 = array = accommodationimagebase64;
    // console.log(sendimagebase64);
    var options = new FileUploadOptions();
    options.fileKey = accommofilekey;
    options.fileName = accommopath.substr(accommopath.lastIndexOf('/') + 1);
    options.mimeType = accommomimeType;

//321    options.headers = {
//321       'accessToken': deviceEncryptedToken
//321    };


    for (var i = 0; i < getAllDataForEditUpdateListing.accomodationFirstEditData.length; i++) {
        accomName = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationNameEdit;
        accomType = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationTypeEdit;
        accomEmail = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationEmailEdit;
        accomPhoneNo = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationPhoneEdit;
        accomFax = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationFaxEdit;
        accomAddress = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationAddressEdit;
        accomCity = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationCityEdit;
        accomState = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationStateEdit;
        accomCountry = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationCountryEdit;
        accomZipCode = getAllDataForEditUpdateListing.accomodationFirstEditData[i].accomodationZipCodeEdit;

    }
    for (var i = 0; i < getAllDataForEditUpdateListing.accomodationDataSecondEdit.length; i++) {
        accomOwnerPro = getAllDataForEditUpdateListing.accomodationDataSecondEdit[i].accomodationProfileEdit;
        accomCheckIn = getAllDataForEditUpdateListing.accomodationDataSecondEdit[i].accomodationCheckInTimeEdit;
        accomCheckOut = getAllDataForEditUpdateListing.accomodationDataSecondEdit[i].accomodationCheckOutTimeEdit;
        accomApplyOffLine = getAllDataForEditUpdateListing.accomodationDataSecondEdit[i].accomodationApplyOfflineEdit;
        accomAddReview = getAllDataForEditUpdateListing.accomodationDataSecondEdit[i].accomodationAddReviewEdit;
        /*accomAmenitiesType = getAllDataForAddListing.accomodationDataSecond[i].accomodationAmenitiesType;*/
        accomDetails = getAllDataForEditUpdateListing.accomodationDataSecondEdit[i].accomodationDetailsEdit;
        offerPercent = getAllDataForEditUpdateListing.accomodationDataSecondEdit[i].offerpercentageedit

    }

    var params = new Object();
    options.params = params;
    //var accomvideodelete = "";
    if (updateaccomlisting == "true") {
        var owner_accom_id = accommEditListId;
        if (accomvideodelete == "true") {
            params.oldVideoImage = "";
            params.oldVideo = "";
        } else {
            params.oldVideoImage = dataglobalupdateList.videoImage;
            params.oldVideo = dataglobalupdateList.video;
        }
        var deletesendingimage = array = deleteimage + ",";
        params.rimages = deletesendingimage;
    } else {
        var owner_accom_id = ""
    }
    console.log("==== owner_accom_id " + owner_accom_id);

    getAllDataForEditUpdateListing.accommodationdataEdit.push({
        id: owner_accom_id,
        appId: appId,
        pageId: pageIdentifie,
        owner: localStorage.getItem('email'),
        name: accomName,
        accommodationType: accomType,
        email: accomEmail,
        phone: accomPhoneNo,
        fax: accomFax,
        address: accomAddress,
        city: accomCity,
        state: accomState,
        country: accomCountry,
        zip: accomZipCode,
        ownerShow: accomOwnerPro,
        checkintime: accomCheckIn,
        checkouttime: accomCheckOut,
        ApplyOffLine: accomApplyOffLine,
        allowAddReview: accomAddReview,
        offer: "1",
        latitude: "",
        longitude: "",
        offerPercent: offerPercent,
        video: "",
        videoImage: "",
        youtube: ""

    });
    params.accommodationdata = JSON.stringify(getAllDataForEditUpdateListing.accommodationdataEdit);
    params.accommodationAmenities = JSON.stringify(accommodationAmenities);
    params.description = accomDetails;
    params.accommodationImage = JSON.stringify(sendimagebase64);
    params.accommodationRoom = JSON.stringify(getAllDataForEditUpdateListing.accommodationRoomEdit);
    options.params = params;

    console.log("===== getAllDataForAddListing final : " + JSON.stringify(getAllDataForEditUpdateListing));
    console.log("=== HotelBaseUrl " + HotelBaseUrl)
    console.log("==== params  : " + params);
    console.log("==== params  : " + JSON.stringify(options));
    var ft = new FileTransfer();
    ft.upload(accommopath, webserviceUrl + 'accomodation_media_upload.php', accommoUpdateSuccess, fail, options);


}


function accommoUpdateSuccess(r) {

    accomodationLoadSoImages = [];
    deleteimage = [];
    getAllDataForEditUpdateListing = {
        accomodationFirstEditData: [],
        accomodationDataSecondEdit: [],
        accommodationAmenitiesEdit: [],
        accommodationImageEdit: [],
        accommodationRoomEdit: [],
        accommodationdataEdit: []
    };
    Appyscript.alert("Listing Update successfully", appnameglobal_allpages, function() {
        Appyscript.hideIndicator();
        /*mainView.router.back();*/

        //setTimeout(function(){
        //Appyscript.openHotel();
        // Appyscript.hotelhomescreen();
        //},900)

        AccommodationUpdateBack();
    });


}

function AccommodationUpdateBack() {
    var lastHistory = 3;
    if (updateaccomlisting == "true") {
        lastHistory = 4;
    }

    var layout = AppyTemplate.global.style.layout;
    var layoutList = 'slidemenu|bottom|slidemenu3d';
    if (layoutList.indexOf(layout) != -1) {
        lastHistory = lastHistory - 1;
    }

    var backlength = mainView.history.length - lastHistory;
    //console.log("backlength===" + backlength)
    for (var i = 0; i < backlength; i++) {
        mainView.router.back({
            ignoreCache: true,
            animatePages: false
        });
    }
    setTimeout(function() {
        Appyscript.clickHome();
    }, 1000);
}

function updatedListingDelete(listId) {
    try {

        if (isOnline()) {
            Appyscript.confirmation('Are you share that you want to delete this property?. Once deleted, you will not be able to undo this section.', pageData.pageTitle, data.languageSetting.common_confirm, data.languageSetting.common_cancel,
                function() {
                    deleteUpdatedListItem(listId)

                },
                function() {}
            );


        } else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    } catch (err) {
        console.log("Exception in updatedListingDelete method :" + err);
    }
}

function deleteUpdatedListItem(listId) {
    var postData = '{"method":"deleteAccommodation","appId":"' + appId + '", "pageIdentifire":"' + pageIdentifie + '", "accommodationId":"' + listId + '"}';
    console.log("===== deleteAccommodation post data " + postData);

    Appyscript.showIndicator();
    $$.ajax({
        url: HotelBaseUrl,
        data: Appyscript.validateJSONData(postData),
        type: "post",
        async: true,
        //321  headers: {'accessToken': deviceEncryptedToken},
        success: function(jsonData, textStatus) {
            var accommodationUpdatedListDlt = JSON.parse(jsonData);
            console.log("===== accommodationUpdatedListDlt " + accommodationUpdatedListDlt);
            console.log("===== accommodationUpdatedListDlt  ggg " + JSON.stringify(accommodationUpdatedListDlt));
            if (accommodationUpdatedListDlt != '') {

                // globalAccommodationUpdatedListDlt = accommodationUpdatedListDlt;
                mainView.router.back();
                setTimeout(function() {
                    update_Listing();
                }, 500)

                /* $$.get("pages/accommodation-update-listing.html", function(template)
                 {
                 var compiledTemplate = AppyTemplate.compile(template);
                 var html = compiledTemplate(globalAccommodationUpdatedListDlt);

                 mainView.router.load({
                 content: html,
                 animatePages: true
                 });
                 Appyscript.closeModal();
                 });*/
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

function updatepreviewDetail(a) {
    console.log('{"method":"getAccommodationDetail","appId":"' + appId + '","id":"' + a.id + '","userId":"' + localStorage.getItem("userid") + '","dateRange":"' + checkinsearchdate + '"}')
    removeiddd = a;
    if (isOnline()) {

        Appyscript.showIndicator();

        $$.ajax({
            url: HotelBaseUrl,
            data: Appyscript.validateJSONData('{"method":"getAccommodationDetail","appId":"' + appId + '","id":"' + a.id + '","userId":"' + localStorage.getItem("userid") + '","dateRange":"' + checkinsearchdate + '"}'),



            type: 'post',
            //  contentType: "application/json; charset=utf-8",
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(data) {

                console.log("rwerwe" + data)
                var hotelData = {};
                hoteldetailsdata = JSON.parse(data)
                hotelData = JSON.parse(data);

                $$.get("pages/accommodation-listing-preview.html", function(template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(hotelData);
                    mainView.router.load({
                        content: html,
                        animatePages: true
                    });
                });

                Appyscript.hideIndicator();

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })


    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }


}

Appyscript.onPageBack('accommodation-listing-preview', function(page) {

    hoteltoolbarshow();
    couponcodehotel = '';
    if ($$('.picker-modal.modal-in').length) {

        if ($$('.picker-modal.modal-in').length > 0) {
            Appyscript.closeModal('.picker-modal.modal-in');
        }

    }

});

function firstpageback() {


    if (updateaccomlisting != "true") {
        getAllDataForAddListing.accomodationData = [];
    } else {
        getAllDataForEditUpdateListing.accomodationFirstEditData = [];
    }



    Appyscript.formFromJSON("#accommodation1display", addstoredatafirstpage)
}

function secondpageback() {

    if (updateaccomlisting != "true") {
        getAllDataForAddListing.accomodationDataSecond = [];
    } else {
        getAllDataForEditUpdateListing.accomodationDataSecondEdit = [];
        accommodationAmenities = [];
        accommodationRoomSelectedAmenities = [];
        // globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList = []
    }

    Appyscript.formFromJSON("#accommodation2display", addstoredatafirstpage2)


    for (var i = 0; i < extraRoomCounter + 1; i++) {

        var fgdf = Appyscript.formToJSON('#addRoomAnotherDynamic' + i)

        addstoredataaddedroomdata.push(fgdf);

    }


}


AppyTemplate.registerHelper('updateoptionhelper', function(accomTypeid) {

    var optiondata = globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList[globalAddUpdateEditDltListingData.accommodationListEdit[0].accommodationRoomList.length - 1]


    //    s += '<option value="" disabled selected>Select Country</option>';
    $$.each(optiondata, function(i, v) {
        if (v.id == accomTypeid) {
            s += '<option selected="selected" value="' + v.id + '" >' + v.name + '</option>';
        } else {
            s += '<option value="' + v.id + '"  >' + v.name + '</option>';
        }

    })
    return s;


});

//check condition for Payment IAP

function checkAccomIAPPayment() {
    var PaymentUrl = webserviceUrl + 'OrderHistory.php';
    var serviceData = '{"method":"userPaymentStatus","appId":"' + appId + '", "pageId":"' + pageIdentifie + '", "userEmail":"' + localStorage.getItem("email") + '", "deviceType":"android"}';

    if (isOnline()) {
        Appyscript.showIndicator();

        $$.ajax({
            url: PaymentUrl,
            data: serviceData,
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: false,
            success: function(dataService) {
                console.log(dataService);
                console.log("Valid JSON " + dataService);
                var userPaymentResponce = JSON.parse(dataService);
                var msgstatus = userPaymentResponce.msg;
                //alert(msgstatus);
                console.log("userPaymentResponce" + userPaymentResponce);
                if (msgstatus == "success") {
                    // alert("success Status");
                    Appyscript.popupClose();
                    add_Listing_Accom();
                } else {
                    //alert("failure Status");
                    showPaymentAlertserviceAll(pageData);

                }

            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })
    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }

}

var accomNetworkPaymentStatus;

function uploadAccomTransectionDetailAfterPayment(transactionId, pageTypeid, productId, paymentTypeIap, subscriptionPrice, subscriptionCurrency) {

    if (isOnline()) {
        Appyscript.showIndicator();
        var AccomData = {};
        console.log("=== dataj : " + '{"method":"createOrderSubscription","appId":"' + appId + '", "pageId":"' + pageIdentifie + '", "userId":"' + localStorage.getItem("userid") + '", "userEmail":"' + localStorage.getItem("email") + '", "paymentMethod":"' + pageData.paymentMethod + '", "price":"' + pageData.oneTimeSubscriptionPrice + '", "currency":"' + pageData.oneTimeSubscriptionCurrency + '", "subscriptionType":"", "deviceType":"android", "pageType":"' + pageTypeid + '", "transactionId":"' + transactionId + '", "productId":"' + productId + '", "summary":"", "receiptId":"", "buyerCountry":"", "message":""}');
        $$.ajax({
            url: webserviceUrl + "OrderHistory.php",
            data: Appyscript.validateJSONData('{"method":"createOrderSubscription","appId":"' + appId + '", "pageId":"' + pageIdentifie + '", "userId":"' + localStorage.getItem("userid") + '", "userEmail":"' + localStorage.getItem("email") + '", "paymentMethod":"' + pageData.paymentMethod + '", "price":"' + subscriptionPrice + '", "currency":"' + subscriptionCurrency + '", "subscriptionType":"' + paymentTypeIap + '", "deviceType":"android", "pageType":"' + pageTypeid + '", "transactionId":"' + transactionId + '", "productId":"' + productId + '", "summary":"Accommodation Listing Page after Payment.", "receiptId":"", "buyerCountry":"", "message":""}'),
            type: 'post',
            //321  headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function(fulldata) {

                console.log(fulldata);

                AccomData = JSON.parse(fulldata);
                console.log("==== jkhkd : " + AccomData);
                var status = AccomData.status;
                AppyTemplate.global.accomNetworkPaymentStatus = AccomData.status;
                if (status == "1") {
                    Appyscript.alert(AccomData.msg, appnameglobal_allpages, function() {

                        Appyscript.popupClose();

                        add_Listing_Accom();
                    });

                } else {}



                Appyscript.hideIndicator();
            },
            error: function() {

                Appyscript.hideIndicator();

                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


            }
        })

    } else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }

}

function callbackAfterPaymentOnAccom(status, transactionId, productId, payType, pageTypeid, paymentTypeIap, subscriptionPrice, subscriptionCurrency) {
    console.log("**********************callbackAfterPaymentOnSocial***********************************************************")
    if (status == "success") {


        Appyscript.showIndicator();

        if (productId == "") {
            Appyscript.alert("You have already purchased.", appnameglobal_allpages, function() {
                Appyscript.popupClose();

                add_Listing_Accom();
            });
            Appyscript.hideIndicator();
        } else {
            if (payType == "IAP") {
                localStorage.setItem(email, "true");
            }
            uploadAccomTransectionDetailAfterPayment(transactionId, pageTypeid, productId, paymentTypeIap, subscriptionPrice, subscriptionCurrency);
        }
    }

}

var acco_ID;
var token, applicationProfileId, workflowId, merchantProfileId, identityToken, sessionToken, applicationLicenseID;

function executePaywithVelocity(paymentTypeObject, paymentorderidd, card) {
    //Appyscript.alert("hi main aa gaya",paymentorderidd);
    acco_ID = paymentorderidd;

    console.log("HI PAYMENT OBJECT DEKHLO", acco_ID);


    var totalAmount = parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice)
    totalAmount = totalAmount.toFixed(2)

    var transctionData = {
        Amount: totalAmount,
        CurrencyCode: checkooutfinalhoteldata.hoteldata[0].data.currencyCode,
        EmployeeId: '13',
        IndustryType: 'Ecommerce',
        order_id: acco_ID

    }

    console.log("Transaction Data Dekhlo", transctionData)

    var payTypeObj = $$(paymentTypeObject).parent();
    applicationProfileId = payTypeObj.attr("data-applicationProfileId");
    workflowId = payTypeObj.attr("data-workflowId");
    merchantProfileId = payTypeObj.attr("data-merchantProfileId");
    identityToken = payTypeObj.attr("data-identityToken");
    applicationLicenseID = payTypeObj.attr("data-applicationLicenseId");
    sessionToken = payTypeObj.attr("data-sessionToken");
    label_val = payTypeObj.attr("data-label");
    token = identityToken;


    //for address calculation


    var add = {
        Street: "",
        City: "",
        StateProvince: "",
        Country: "",
        PostalCode: "",
        Phone: ""
    }
    var geocoder = new google.maps.Geocoder();
    var latlng = {
        lat: parseFloat(velocitylat),
        lng: parseFloat(velocitylng)
    };
    geocoder.geocode({
        'location': latlng
    }, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                add.Street = results[0].formatted_address;

                var findPincodeArr = results[0].address_components;
                //add.Country= results[0].address_components[2].short_name;

                //add.City = results[0].address_components[0].short_name;
                for (var key in findPincodeArr) {
                    if (findPincodeArr[key].types == "postal_code") {
                        add.PostalCode = findPincodeArr[key].short_name;
                    }
                    if (findPincodeArr[key].types.indexOf("country") > -1 && findPincodeArr[key].types.indexOf("political") > -1) {
                        add.Country = findPincodeArr[key].short_name || "";
                        add.Country = add.Country.replace("Brasil", "Brazil").trim();
                    }
                    if (findPincodeArr[key].types.indexOf("locality") > -1 && findPincodeArr[key].types.indexOf("political") > -1) {
                        add.City = findPincodeArr[key].short_name || "";
                    }
                    if (findPincodeArr[key].types.indexOf("administrative_area_level_1") > -1 && findPincodeArr[key].types.indexOf("political") > -1) {
                        add.StateProvince = findPincodeArr[key].short_name;
                    }
                }
                add.Phone = localStorage.getItem("phone");
                Velocity.tokenizeForm(transctionData, sessionToken, card, add, applicationProfileId, merchantProfileId, workflowId, velocityResponseHandlerRoom);
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });

}

var totalAmount;

function velocityResponseHandlerRoom(result) {
    console.log("Results", result);
    if (result.text !== "Successful") {
        Appyscript.hideIndicator();
        Appyscript.alert(something_went_wrong_please_try_again, data.appData.appName);
        return false;
    }


    var totalAmount = parseInt(checkooutfinalhoteldata.hoteldata[1].finalprice)
    totalAmount = totalAmount.toFixed(2)
    var trancationData = '{"Amount":"' + totalAmount + '","CurrencyCode":"' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '","identitytoken":"' + identityToken + '","workflowid":"' + result.workflowid +
        '","merchantprofileid":"' + result.merchantprofileid + '","applicationprofileid":"' + result.applicationprofileid +
        '","paymentAccountDataToken":"' + result.row[0].PaymentAccountDataToken + '", "OrderId":"' + result.row[0].OrderId + '"}';

    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: webserviceUrl + "OrderHistory.php",
            data: Appyscript.validateJSONData('{"method":"velocityPayWithToken","orderId": "' + acco_ID + '", "trancationData":' + trancationData + '}'),
            type: 'post',
            async: true,
            //321  headers: {'accessToken': deviceEncryptedToken},
            success: function(data) {

                data = JSON.parse(data);
                if (data.StatusCode == "00") {
                    updateVelocityTransactionRoom(data, acco_ID, totalAmount)
                }
            },
            function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage);
    }
}


var transdata;

function updateVelocityTransactionRoom(data, acco_ID, totalAmount) {

    console.log("ResultSTatus Final", +data);
    transdata = data.TransactionId;
    console.log("OrderId", +acco_ID);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: webserviceUrl + "OrderHistory.php",
            data: Appyscript.validateJSONData('{"method":"createOrderSubscription","appId":"' + appId + '", "pageId":"' + pageIdentifie + '", "userId":"' + localStorage.getItem("userid") + '", "userEmail":"' + localStorage.getItem('email') + '", "paymentMethod":"velocity", "price":"' + totalAmount + '", "currency":"' + checkooutfinalhoteldata.hoteldata[0].data.currencyCode + '", "subscriptionType":"", "deviceType":"android", "pageType":"accommodation", "transactionId":"' + data.TransactionId + '", "productId":"' + acco_ID + '", "summary":"' + data.Status + '", "receiptId":"", "buyerCountry":"", "message":""}'),
            type: 'post',
            async: true,
            //321  headers: {'accessToken': deviceEncryptedToken},
            success: function(data) {
                data = JSON.parse(data);
                console.log("transactionUpdation", data);
                Appyscript.hotelcodbookconfirmation(acco_ID, "velocity", "", transdata);

            },
            function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage);
    }


}

function validateDetailsCardRoom(creditCardType) {
    var cardNo = document.getElementById("cnumberVel").value;
    var expMonth = document.getElementById("ExpairyMonthVel").value;
    var expYear = document.getElementById("ExpairyYearVel").value;
    var cvvVel = document.getElementById("cvvCodeVel").value;
    var cardHolderVel = document.getElementById("cHolderVel").value;
    var element = document.getElementById("velocityCardType");
    var cardTypeValue = element.value;

    if (cardNo == null || cardNo == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_fill_all_the_fields);
        return null;
    } else if (isNaN(cardNo) || cardNo.length < 15 || cardNo.length > 16) {

        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
        return null;

    } else if (cardTypeValue == "Select") {
        Appyscript.hideIndicator();
        Appyscript.alert("Please Select a Card");
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

    console.log("Transaction Data Dekhlo", card);


    return card;
}