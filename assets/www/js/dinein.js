var app_id='';
var baseURL='';
var dineinlatitude=localStorage.getItem("locallatdinin"),dineinlongitude=localStorage.getItem("locallngdinin");
var cusineListDataDineIn='';
var foodcourtHotelListDineIn=''
var FOLSHotelListDineIn='';
var storeFoodVendetListDineInDataDineIn={"vendorList":{"list":[]}};
var cusinefilterDineIn;
var detailsdatadataDineIn=''
var useremailIDDineIn=''
var venderCatListingDineIn='';
var vandorIdDineIn=''
var vendorNameDineIn='';
var storeFoodCourtProductListDataDineIn={"productList":[]};
var venderSubCatProductDineIn='';
var venderCatProductDineIn='';
var foodCourtRulesDataDineIn='';
var foodCourtCartDataDineIn={"productList":[]};
var mainvenderlistDineIn='';
var FilterSortingDataDineIn={"vendorList":{"list":[]}};
var getCategoryTemplateFoodCourtDineIn='';
var viewtimevendorDineIn='';
var detailShowHideDineIn=0;
AppyTemplate.global.foodcourtcustomheaderforsearch='';
var pagelengthBackDineIn=0;
var tablenumberTemp ="" , tablenumber = '';
var waiterId = '';
var wnumber='';
var waiterName='';
var waiterPhone='';
var vendorId='';
var customeridGlobalFoodcourt='';
var cvvCode;
var foodPleaseEnterCardNumber="Please enter card number.";
var foodPleaseEnterExpairyMonth="Please enter expiry month.";
var foodPleaseEnterExpairyYear="Please enter expiry year.";
var foodPleaseEnterCvvCode="Please enter cvv code.";
var foodcourtselectoptiondataDinein={};
/* radical : hotfix - patch */
var fd_catSelectedData = {};
var fd_subCatSelectedData = {};

var orderIdpay = '';

Appyscript.GetLatLongAndress1 =function (dinein)
{

if(dinein=="dinein")
{
AppyTemplate.global.dineinlocationcheck=false;
}
console.log("2123132131");
locationDatafood=localStorage.getItem("Appypielocation");

 if(locationDatafood==undefined)
 {
    Appyscript.hideIndicator();
    locationDatafood=Appyscript.getCurrentPosition();

 }
     setTimeout(function(){
                  getLocationLatLong();
               },2000);



}




var foodcourtHotelListDineInTemplateDineIn='{{#if vendorList.list.length}}<section class="food-Order"> <ul class="foodOrder-cat-listing  {{#if @global.setting.vendorDetailsPage}}  {{else}} optionTwo {{/if}}"> {{#vendorList.list}} <li data-minprice="{{min_order}}"  data-mintime="{{#configList}}{{#js_compare "this.ConfigKey == \'delivery_min_duration\'"}}{{ConfigValue}}{{/js_compare}}{{/configList}}" class="dashboard-image" {{#imgList}}{{#if main_image}} style="background-image:url({{name}})" {{/if}} {{/imgList}} onclick="hotalinfoDetailsDineIn(this , \'{{@index}}\', \'{{id}}\',\'mainpage\');"> <span class="opnClose">{{opencloseDineIn storeOpentimeDate}}</span> <span class="disTance {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="background:{{@global.styleAndNavigation.title[2]}}; color:{{@global.styleAndNavigation.title[3]}}">{{distanceOneDecimalPoint distance}} {{distanceunit}}</span> <img src="images/transparent-bg.png" alt="">  <span class="cat-heading-text {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}; background-color:{{@global.styleAndNavigation.title[2]}}"> <small storeid="{{id}}"  class="oprTime" style="background-color:{{@global.styleAndNavigation.title[2]}}">{{openclosetimeDineIn storeOpentimeDate}}</small> <strong class="nameHead {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}}">{{name}}</strong> <small class="hotel-region"  style="color:{{@global.styleAndNavigation.title[3]}}">{{address}}</small> {{#if @global.setting.star_rating_on_off}} <div class="foodReview">{{RatinghelperDineIn rating}}</div> {{/if}}{{#if @global.setting.expected_delivery_time_on_off}} <small class="foodOrder-time {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}" style="color:{{@global.styleAndNavigation.content[2]}}"> {{#if @global.setting.showOnListing}}  {{#configList}}{{#js_compare "this.ConfigKey == \'delivery_min_duration\'"}} {{ConfigValue}} {{@global.pageLanguageSetting.var_minutes}}{{/js_compare}}{{/configList}}  {{else}} {{distance}} {{distanceunit}} {{/if}}</small> {{/if}} {{#js_compare "this.vendor_discount != \'\'"}}{{#js_compare "this.vendor_discount != \'0\'"}} <span class="foodOrder-discount" style="color:{{@global.styleAndNavigation.activeColor}}">{{vendor_discount}} % {{@global.pageLanguageSetting.off}}</span> </span> {{/js_compare}}{{/js_compare}} </li> {{/vendorList.list}} </ul> {{else}} <div class="msg-code">{{> errorpage errorIcon="appyicon-no-data"}} </div> {{/if}}</section>';

AppyTemplate.registerPartial('dineInSubCat','<li class="category hideImage-{{@global.styleAndNavigation.hideImage}}"><img src="images/image-2x1.png" style="background-image:url({{image}})" /><div class="details" style="background:{{@global.styleAndNavigation.title[2]}};"><h3 class="{{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}}"><b>{{name}}</b><span class="icon-right-open"></span></h3></div><div class="overlay" onclick="foodCourtSubcatProductListDineIn(this,\'{{@index}}\',\'{{id}}\');"  subcat-id="{{id}}" data-head="{{name}}" dataimage="{{image}}"></div></li>');

AppyTemplate.registerPartial('dineInCatProduct','<li class="product"><div class="product_box hideImage-{{@global.styleAndNavigation.hideImage}}">{{#productImage}}{{#if mainImage}}<img style="background-image:url({{url}})" src="images/image-2x1.png" alt=""    onclick="foodCourtProductDetailDineIn(this,\'{{id}}\');" {{/if}}{{/productImage}} product-id="{{id}}" data-head="{{name}}"><div class="discription_box {{#js_compare "this.price != \'0\'"}} withPrice {{/js_compare}}" style="background:{{@global.styleAndNavigation.title[2]}};"><div product-id="{{id}}" onclick="foodCourtProductDetailDineIn(this,\'{{id}}\');" class="mComLeft"><h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}}"><b>{{name}}</b></h1><div class="product_price">{{#if offered}}{{#if offeredDiscount}}<div class="price" style="color:{{@global.styleAndNavigation.activeColor}}">{{#if @global.ecommCurrencySymbol}}{{format_currency currency}}{{offeredDiscountPrice this.price this.offeredDiscount}}{{else}}{{offeredDiscountPrice this.price this.offeredDiscount}}{{format_currency currency}}{{/if}}</div><div class="oldPrice">{{#if @global.ecommCurrencySymbol}}{{format_currency currency}}{{maxPriceDinein}}{{else}}{{maxPriceDinein}}{{format_currency currency}}{{/if}}</div><div class="off">{{offeredDiscount}}% {{#if @global.pageLanguageSetting}} {{@global.pageLanguageSetting.off}} {{else}}OFF{{/if}}</div>{{else}}<div class="price">{{#if @global.ecommCurrencySymbol}}{{format_currency currency}}{{maxPriceDinein}}{{else}}{{maxPriceDinein}}{{format_currency currency}}{{/if}}</div>{{/if}}{{else}}      {{#js_compare "this.price == \'0\'"}} <div class=" price"></div>{{else}}<div class="price">{{#if @global.ecommCurrencySymbol}}{{format_currency currency}}{{maxPriceDinein}}{{else}}{{maxPriceDinein}}{{format_currency currency}}{{/if}}</div> {{/js_compare}} {{/if}}</div></div><div class="mComRight"><a  {{#js_compare "parseInt(this.quantity) >= \'1\'"}} onclick="CartPageDineIn(this,\'{{@index}}\',\'{{id}}\')" {{else}} onclick="foodCourtProductDetailDineIn(this,\'{{id}}\')" {{/js_compare}} data-head="{{name}}" product-id="{{id}}" data-id="{{catId}}" data-currency="{{format_currency currency}}" data-price="{{price}}" data-quantity="{{quantity}}"  class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};">   {{#if @global.pageLanguageSetting}} {{#js_compare "parseInt(this.quantity) >= \'1\'"}} +  {{else}} <i class="appyicon-blocked-cart"></i> {{/js_compare}}{{/if}}</a></div></div></div></li>');


/*
    use this template for handle Error page.
*/
var foodErrorTemplateDineIn = '<div class="msg-code">{{> errorpage errorIcon="appyicon-no-network"}}</div>';




/*
    page int of foodcourt.html
*/
Appyscript.onPageInit('dinein',function(page)
{
    if(! Appyscript.device.android)
    {
        Appyscript.getDefaultLanguage();
    }


    app_id=localStorage.getItem("appid");
    baseURL=webserviceUrl+'Dining.php';
     /* serviceAPICallDineInHotellistDineIn('main')
      var cusinpostata='{"method":"cusinListWithAdmin","appId":"'+app_id+'"}';
      serviceAPICallDineIn(cusinpostata,'cusin');*/

    //GetLatLongAndressDineIn();

    GetLatLongAndressDineIn();

    var  email=localStorage.getItem("email");
    AppyTemplate.global.loginCheck=false;
    if(email!=undefined && email !=''){
        useremailIDDineIn=email;
        AppyTemplate.global.loginCheck=true;
        AppyTemplate.global.email=email;
        AppyTemplate.global.Name=localStorage.getItem("username");
        var image=localStorage.getItem("profileImage");
        if(image){
            if((image.includes("http")) && (image.includes(".jpg") || image.includes(".png"))){
                AppyTemplate.global.profileImage=localStorage.getItem("profileImage");
                AppyTemplate.global.profileImagecheck=true;
            }
            else{
                AppyTemplate.global.profileImage=AppyTemplate.global.style.reseller+"/newui/images/user-pic-news.png";
            }
        }
        else
        {
            AppyTemplate.global.profileImage=AppyTemplate.global.style.reseller+"/newui/images/user-pic-news.png";
        }
    }
    AppyTemplate.global.privacy_policyfoodcourt=false;
    AppyTemplate.global.terms_and_conditionsfoodcourt=false;

    if(pageData.cmsPage.privacy_policy)
    {
        AppyTemplate.global.privacy_policyfoodcourt=true;
    }
    if(pageData.cmsPage.terms_and_conditions)
    {
        AppyTemplate.global.terms_and_conditionsfoodcourt=true;
    }


     var cartProd=localStorage.getItem("foodCourtdata");
     if(cartProd)
     {
        foodCourtCartDataDineIn=JSON.parse(cartProd);
        if(localStorage.getItem("ruledataconfig"))
        {
            foodCourtRulesDataDineIn=JSON.parse(localStorage.getItem("ruledataconfig"));
        }
        if(localStorage.getItem("storedetailsdata"))
        {
            detailsdatadataDineIn=JSON.parse(localStorage.getItem("storedetailsdata"));
        }
     }

         $$(".search-box a").click(function()
                {
                    if($$(".search-box input").is(".on"))
                    {
                        $$(".search-box input").removeClass("on");
                        $$(".search-box").removeClass("foodcout");
                        if(Appyscript.device.android)
                        {

                            $$(".searchbar-overlay").removeClass("searchbar-overlay-active");
                        }
                    }
                    else
                    {
            if($$(".search-box").is(".foodcout")){$$(".search-box").removeClass("foodcout");return false}

                         $$(".search-box input").addClass("on").focus();
                        $$(".search-box").addClass("foodcout");
                         if(Appyscript.device.android)
                         {

                            $$(".searchbar-overlay").addClass("searchbar-overlay-active");
                         }
                    }
                    return false;
                });
        updateDineInIcon();
        detailShowHideDineIn=AppyTemplate.global.setting.vendorDetailsPage;



});



/*
    this method is use for show / view time in popup page from vendor listing page .
*/
$$(document).on('pageInit', 'div[data-page="dinein"]', function(page)
{
    $$(".oprTime").click(function(e)
    {
        e.stopPropagation();
        e.preventDefault();
        var productid=$$(this).attr('storeid');
               for(i=0;i<storeFoodVendetListDineInDataDineIn.vendorList.list.length;i++)
               {
                   if(storeFoodVendetListDineInDataDineIn.vendorList.list[i].id == productid)
                   {
                       viewtimevendorDineIn=storeFoodVendetListDineInDataDineIn.vendorList.list[i];
                       viewtimevendorDineIn=getStoreTimeDineIn(viewtimevendorDineIn);
                       viewtimevendorDineIn.frompage='mainpage';
                       break ;
                   }
               }
           Appyscript.popupPage('dinein-timining');
    });

});

/*
    this method is use for show / view time in popup page from vendor search & februaries  page .
*/
$$(document).on('pageInit', 'div[data-page="dinein-FOLS"]', function(page)
{
    $$(".oprTime").click(function(e)
    {
        e.stopPropagation();
        e.preventDefault();
        var productid=$$(this).attr('storeid');
               for(i=0;i<storeFoodVendetListDineInDataDineIn.vendorList.list.length;i++)
               {
                   if(storeFoodVendetListDineInDataDineIn.vendorList.list[i].id == productid)
                   {
                       viewtimevendorDineIn=storeFoodVendetListDineInDataDineIn.vendorList.list[i];
                       viewtimevendorDineIn=getStoreTimeDineIn(viewtimevendorDineIn);
                       viewtimevendorDineIn.frompage='mainpage';
                       break ;
                   }
               }
           Appyscript.popupPage('dinein-timining');
    });

});










/*
    vendor details page init
*/
Appyscript.onPageInit('dinein-hotelinfo',function(page)
{
        var    cousinListlength='';
        if(detailsdatadataDineIn.cousinList)
        {
            for(p=0; p<detailsdatadataDineIn.cousinList.length ;p++)
            {
                    cousinListlength = cousinListlength + detailsdatadataDineIn.cousinList[p].cuisine_name;
            }

        }

        if(cousinListlength.length > 40)
        {
            $$("a.type-button").click(function()
            {
                                          console.log(this)
                if($$(this).text()=="Hide All")
            {
                $$(this).text("Show More");
            } else {
                $$(this).text("Hide All");
            }
                $$(this).parent().find(".type-content").toggleClass("type-content-full");
            });
        }
        else
        {
            $$("a.type-button").hide();
        }



      if(detailsdatadataDineIn.payment_method.COD =='' && detailsdatadataDineIn.payment_method.Online =='')
      {
        $$("#paymentmethodfoodcourt").attr("style","display:none");

      }


});


function gotoHomeDineinByErrorPage()
{
  setTimeout(function(){
       DineInHomePage(function ()
       {
            GetLatLongAndressDineIn();
            Appyscript.hideIndicator();
            });
      }, 3000);
}

/*
    restart home / vendor listing  page
*/
//var dataFlag;
function gotoHomeDinein()
{
   dataFlag=false;
CustomeDatafoodcout = {};
   Appyscript.showIndicator();
   tablenumber='';
   foodCourtRulesDataDineIn='';
   foodCourtCartDataDineIn={"productList":[]};
   foodCourtCartDataDineIn.totalproduct=0;
   localStorage.setItem("ruledataconfig","");
   localStorage.setItem("foodCourtdata","");
   localStorage.setItem("storedetailsdata","");

      setTimeout(function(){
       DineInHomePage(function (){
            GetLatLongAndressDineIn();
            Appyscript.hideIndicator();
       });
      }, 3000);
}

function DineInHomePage(callback)
{
    var backlength;
   if(pageIdentifie.indexOf("folder")!=-1)
    {
        backlength=mainView.history.length-4;
    }
    else
    {
        backlength=mainView.history.length-3;
    }

    if(mainView.history.length > 2)
    {
        if(data.appData.layout=='bottom')
        {
            for(var i=0;i<backlength+3;i++)
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



function rtryGetLatLongAndressDineInDineIn()
{
    Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.filed_to_get_your_location,AppyTemplate.global.pageLanguageSetting.location,AppyTemplate.global.pageLanguageSetting.fc_retry,AppyTemplate.global.pageLanguageSetting.No,
    function()
    {
        GetLatLongAndressDineIn();
    },
    function()
    {
        mainView.router.back();
    })
}



var billcountry ="" , billstate = "" , billaddress = "" , billcity ="" , pincode="",locationDatafood;
function getLocationLatLongsDineIn()
{
                var locationData=  locationDatafood;
                if(locationData != null  && locationData !=',')
                {
                     var geocoder = new google.maps.Geocoder();
                    //  latitude = locationData.split(",")[0];
                    // longitude = locationData.split(",")[1];

                     var latlng = new google.maps.LatLng(locationData.split(",")[0], locationData.split(",")[1]);
                     geocoder.geocode({'latLng': latlng}, function(results, status)
                     {
                          if (status == google.maps.GeocoderStatus.OK)
                          {
                                  if (results[0])
                                  {
                                      var add= results[0].formatted_address ;
                                      var  value=add.split(",");
                                      count=value.length;
                                      country=value[count-1];
                                      state=value[count-2];
                                      city=value[count-3];
                                     var addresssfull = value[1];
                                        if(results[0].address_components>1){
                                            var a1= results[0].address_components[2].long_name;
                                            var a2= results[0].address_components[3].long_name;
                                        }
                                       if(a1 !=undefined && a1!=null)
                                       {
                                            city =a1+", "+a2 +", "+city;
                                       }

                                        AppyTemplate.global.CurrentCity=city;


                                      if(city==undefined || city=='')
                                      {
                                         AppyTemplate.global=CurrentCitystate;
                                         localStorage.setItem("CurrentCity",state);
                                      }
                                      else if(state==undefined || state=='')
                                      {
                                         AppyTemplate.global.CurrentCity=country;
                                         localStorage.setItem("CurrentCity",country);
                                      }

                                      $$("#locationfooscourt").html(AppyTemplate.global.CurrentCity);


                                      localStorage.setItem("locationtru",city);
                                      serviceAPICallDineInHotellistDineIn('main')
                                      var cusinpostata='{"method":"cusinListWithAdmin","appId":"'+app_id+'"}';
                                      serviceAPICallDineIn(cusinpostata,'cusin');
                                      Appyscript.hideIndicator();

                                    billcountry =country.replace(/,/g, "").trim();



                                    billaddress = addresssfull.replace(/,/g, "").trim();
                                    billcity =city.replace(/,/g, "").trim() ;
                                    state=state.trim();
                                    var pincodev =state.split(" ");
                                    billstate ="";
                                    for(s=0 ; s<=pincodev.length-2 ; s++)
                                    {
                                         billstate = billstate +" "+pincodev[s].trim();
                                    }
                                    billstate =billstate.trim();
                                    pincode = pincodev[pincodev.length-1];
                                  }
                                  else
                                  {
                                      console.log("Location not set, status: "+status);
                                      localStorage.setItem("CurrentCity","");
                                      serviceAPICallDineInHotellistDineIn('main')
                                      var cusinpostata='{"method":"cusinListWithAdmin","appId":"'+app_id+'"}';
                                      serviceAPICallDineIn(cusinpostata,'cusin');
                                      Appyscript.hideIndicator();
                                      rtryGetLatLongAndressDineInDineIn();
                                  }
                          }
                          else
                          {
                             console.log("Geo-coder failed, status: "+status);
                             localStorage.setItem("CurrentCity","");
                             Appyscript.hideIndicator();
                             rtryGetLatLongAndressDineInDineIn();
                          }
                     });
                 }
                 else
                 {
                    Appyscript.hideIndicator();
                    rtryGetLatLongAndressDineInDineIn();
                 }
}


/*
    for get lat / long and address
*/
function GetLatLongAndressDineIn()
{
    Appyscript.locationPermission('showPositionDinneIn','Appyscript.datingmainmenu');
//        if (navigator.geolocation)
//       {
//           navigator.geolocation.getCurrentPosition(showPositionDinneIn);
//       }
//       else
//       {
//         // alert("not found");
//       }
      //  navigator.geolocation.getCurrentPosition(showPositionDinneIn, memberCard_Position_Error);
}


function showPositionDinneIn() {
        latitude = localStorage.getItem("localLatitude");
        longitude = localStorage.getItem("localLongitude");

        locationDatafood=latitude+","+longitude;
         getLocationLatLongsDineIn();
         localStorage.setItem("locallatdinin",latitude);
         localStorage.setItem("locallngdinin",longitude);
         dineinlatitude=localStorage.getItem("locallatdinin"),
         dineinlongitude=localStorage.getItem("locallngdinin");
}

//function GetLatLongAndressDineIn(){
//    if (navigator.geolocation){
//        navigator.geolocation.getCurrentPosition(showPositionDinneIn);
//    }
//     else{
//      // alert("not found");
//    }
//}








/*
    this method is use for view vendor / hotel details page.
*/

function hotalinfoDetailsDineIn(thisObj,indx,vendeid,frompage)
{
    for(i=0;i<storeFoodVendetListDineInDataDineIn.vendorList.list.length;i++)
    {
        if(storeFoodVendetListDineInDataDineIn.vendorList.list[i].id == vendeid)
        {
            detailsdatadataDineIn=storeFoodVendetListDineInDataDineIn.vendorList.list[i];
            detailsdatadataDineIn=getStoreTimeDineIn(detailsdatadataDineIn);
            detailsdatadataDineIn.frompage=frompage;
            detailsdatadataDineIn.cuilength=detailsdatadataDineIn.cousinList.length;


       /*     var a = "+965421365|||||+9017101212|||||+9137921682563|||||+927823623";
            a = a.split("|||||");*/

            break ;
        }
    }
  //  var namedaba=detailsdatadataDineIn.name
    console.log(detailsdatadataDineIn);

    openFoodDineInPage('dinein-hotelinfo',detailsdatadataDineIn,'load');

    updateDineInIcon();
}





/*
    for review listing
*/
function FoodcourtreviewlistDineIn ()
 {
       var jsonPostecom= '{"method":"reviewList","appId":"'+app_id+'","vendorId":"'+detailsdatadataDineIn.id+'"}';
       console.log(jsonPostecom);
       if(isOnline()){
              Appyscript.showIndicator();
               $$.ajax({
               url: baseURL,
               data: Appyscript.validateJSONData(jsonPostecom),
               type: "post",
               //321 headers: {'accessToken': deviceEncryptedToken},

               async: true,
               success: function(jsonData, textStatus)
               {
                  var responcedata=JSON.parse(jsonData);
                  console.log(responcedata);
                  if(responcedata){
                     openFoodDineInPage('dinein-review-list',responcedata)
                     updateDineInIcon();
                  }
                  Appyscript.hideIndicator();
               },
               error: function(error){
                     Appyscript.hideIndicator();
                     console.log("Error: " + error.code + " " + error.message);
               }
             });
         }
         else
         {
             Appyscript.hideIndicator();
             Appyscript.alert(internetconnectionmessage );
         }
  }
























/*
    this method is use for checkbox  on check change listener on cunsine page.
*/
function checkchangeDineIn(a)
{
    if($$(a).find("input")[0].checked)
    {
        $$(a).find("input")[0].checked = false;
        $$(a).find(".checkbox").removeClass("checked");
    }
    else
    {
        $$(a).find("input")[0].checked = true;
        $$(a).find(".checkbox").addClass("checked");
    }

        var personcus = [];
     $$("input[name='type']:checked").each(function()
    {
        var aa=$$(this).val();
        personcus.push(aa);
    })

    if(personcus.length >0)
    {
        $$(".toolbarcuine").show();
    }
    else
    {
        $$(".toolbarcuine").hide();
    }
}




/*
    this method is use for get filter hotel list.
*/
var person;
var timrval='',priceval='';
function getFilterHotalDineIn(checkboxName,type,data){
    person = [];
    if(type =='Cuisine'){
        $$("input[name='type']:checked").each(function(){
            var aa=$$(this).val();
            person.push(aa);
        })
        if(person.length >0){
             Appyscript.closeModal();
            serviceAPICallDineInHotellistDineIn('Cuisine',type,person);
        }
        else{
             Appyscript.alert("Please select your cosine first." );
             return;
        }
    }
    else if(type =='Filter'){
        if((timrval !=undefined  &&   timrval !=null &&   timrval !='') || (priceval !=undefined  &&   priceval !=null &&   priceval !='')){
           Appyscript.closeModal();
           fitterfoodlis_timeDineIn(timrval,priceval);
        }
        else{
            Appyscript.alert("Please select your filter data." );
            return;
        }
    }
    else if(type =='Sort'){
        Appyscript.closeModal();
        serviceAPICallDineInHotellistDineIn('Sort',type,data);
    }
    else{}
}

function getFilterTabDineIn(a,type,val){
    if(type == 'price'){
        $$(".filter-price li").removeClass("active");
        $$(a).addClass("active");
        priceval=val;
    }
    else if(type == 'time'){
        $$(".filter-time li").removeClass("active");
        $$(a).addClass("active");
        timrval=val;
    }
    $$(".toolbarfilter").show();
}



function DineInProductShortByPrice()
{
    if(venderSubCatProductDineIn.productList.length==0)
    {
        return;
    }
    var searchValue = $$("#searchpopup").val();
    if(searchValue =='select')
    {
        return;
    }
        Appyscript.showIndicator();
        setTimeout(function()
        {
             var data=venderSubCatProductDineIn;
             data.productList.sort(DineInPriceShorting('price', searchValue, parseFloat));

             $$.get("pages/dinein-subcate-list.html", function (template)
             {
                 var compiledTemplate = AppyTemplate.compile(template);
                 var html = compiledTemplate(data);
                $$(".productList").html($$('<div>'+html+'</div>').find(".productList").html());
                 Appyscript.hideIndicator();
                 $$("#searchpopup").val(searchValue);
             });
        }, 200);
}

function DineInPriceShorting(field, reverse, primer)
{
   var key = function(x) {return primer(x[field])};
   reverse = (reverse=="false") ? 1 : -1;
   return function (a, b){
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
   };
}

/*
    this method is use for shorting product on behalf of price , rating.
    page ecommerce-subcate-list.html
*/
 var sorttype='',valtypedtaa='';
 var storeFoodVendetListDineInDataDineInOpenCloseDineIn={"vendorList":{"list":[]}};
function ProductshrotingByPriceDineIn(type,valtype)
{
storeFoodVendetListDineInDataDineInOpenCloseDineIn={"vendorList":{"list":[]}};

    var openVendor='';
    sorttype=type;
    valtypedtaa=valtype;
    var datasort='';
    if(FilterSortingDataDineIn.vendorList.list.length>0)
    {
        datasort=FilterSortingDataDineIn;
    }
    else
    {
        datasort=foodcourtHotelListDineIn;
    }
    setTimeout(function()
    {
       Appyscript.showIndicator();
        if(type == 'Rating')
        {
            datasort.vendorList.list.sort(sort_byFoodcourtDineIn('rating', valtype, parseInt,valtype));
            compiledBGTemplate=AppyTemplate.compile(foodcourtHotelListDineInTemplateDineIn),
            bghtml=compiledBGTemplate(datasort);
            $$(".foodCourtHotelDineIn").html(bghtml);
            Appyscript.hideIndicator();
        }
        else if(type == 'Price')
        {
            datasort.vendorList.list.sort(sort_byFoodcourtDineIn('min_order', valtype, parseFloat,valtype));
            compiledBGTemplate=AppyTemplate.compile(foodcourtHotelListDineInTemplateDineIn),
            bghtml=compiledBGTemplate(datasort);
            $$(".foodCourtHotelDineIn").html(bghtml);
            Appyscript.hideIndicator();
        }
        else if(type == 'Sort')
        {
           datasort.vendorList.list.sort(sortOnNameDineIn('name'),valtype);
           compiledBGTemplate=AppyTemplate.compile(foodcourtHotelListDineInTemplateDineIn),
           bghtml=compiledBGTemplate(datasort);
           $$(".foodCourtHotelDineIn").html(bghtml);
           Appyscript.hideIndicator();
        }
        else if(type == 'Open')
        {
            openVendor = datasort;
             var list = [];
            for(d=0 ; d <openVendor.vendorList.list.length; d++)
            {
                var getopen = GetOpenCloseVendorDineIn(openVendor.vendorList.list[d].storeOpentimeDate);
                if(getopen == AppyTemplate.global.pageLanguageSetting.fc_open)
                {

                storeFoodVendetListDineInDataDineInOpenCloseDineIn.vendorList.list.push(openVendor.vendorList.list[d])
                   // openVendor.vendorList.list.splice(d,1);
                }
            }
           // openVendor.vendorList.list = list;
           compiledBGTemplate=AppyTemplate.compile(foodcourtHotelListDineInTemplateDineIn),
           bghtml=compiledBGTemplate(storeFoodVendetListDineInDataDineInOpenCloseDineIn);
           $$(".foodCourtHotelDineIn").html(bghtml);
           Appyscript.hideIndicator();
        }
        else if(type == 'Close'){
            openVendor = datasort;
            // var list = [];
            for(h=0 ; h<datasort.vendorList.list.length; h++)
            {
                var getopen = GetOpenCloseVendorDineIn(datasort.vendorList.list[h].storeOpentimeDate);
                if(getopen == AppyTemplate.global.pageLanguageSetting.closed)
                {
                    //openVendor.vendorList.list.splice(h,1);
                    storeFoodVendetListDineInDataDineInOpenCloseDineIn.vendorList.list.push(openVendor.vendorList.list[h])
                }
            }
             //openVendor.vendorList.list = list;
           compiledBGTemplate=AppyTemplate.compile(foodcourtHotelListDineInTemplateDineIn),
           bghtml=compiledBGTemplate(storeFoodVendetListDineInDataDineInOpenCloseDineIn);
           $$(".foodCourtHotelDineIn").html(bghtml);
           Appyscript.hideIndicator();
        }
        else
        {
          //  alert("no");
        }
        updateDineInIcon();
    }, 1000);
}

/*
    this method is user for shoring product on behalf of high and low price
*/
function sort_byFoodcourtDineIn(field, reverse, primer,ACDEC)
{
          var key = function(x) {return primer(x[field])};
          reverse = (reverse=="false") ? 1 : -1;
          if(ACDEC)
          {
               return function (a, b)
              {
                  return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
              };
          }
          else
          {
              return function (a, b)
              {
                  return a = key(a), b = key(b), reverse * ((a < b) - (b < a));
              };
          }
}

function sortOnNameDineIn(property)
{
    var sortOrder = 1;
    if(valtypedtaa == 'ZA')
    {
        if(property[0] === "-")
        {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b)
        {
            var result = (a[property].toLowerCase() > b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() < b[property].toLowerCase()) ? 1 : 0;
            return result * sortOrder;
        }
    }
    else
    {
        if(property[0] === "-")
        {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b)
        {
            var result = (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0;
            return result * sortOrder;
        }
    }
}






function fitterfoodlis_timeDineIn(time,amount)
{
    Appyscript.hideIndicator();
    function isBigEnough(value)
    {
        if(time !='' && amount !='' )
        {
           var min_order=value.min_order
           var min_time=0
           for(k=0;value.configList.length;k++)
           {
               if(value.configList[k].ConfigKey =='delivery_min_duration')
               {
                   min_time=value.configList[k].ConfigValue;
                   break;
               }
           }
           var amountcheck = parseFloat(min_order) <= parseFloat(amount);
           var timecheck  =  parseInt(min_time) <= parseInt(time);
            if(amountcheck  && timecheck)
           {
                return true;
           }
           else
           {
                return false;
           }

        }
        if(time !='')
        {
           var min_time=0
           for(k=0;value.configList.length;k++)
           {
               if(value.configList[k].ConfigKey =='delivery_min_duration')
               {
                   min_time=value.configList[k].ConfigValue;
                   break;
               }
           }

            return min_time <= parseInt(time);
        }
       /* if(amount !='' )
        {

             var amountcheck = parseFloat(value.min_order) <= parseFloat(amount);
            return amountcheck;
        }*/
    }



    FilterSortingDataDineIn={"vendorList":{"list":[]}};
    var filter=foodcourtHotelListDineIn.vendorList.list.filter(isBigEnough);
    for(k=0;k<filter.length;k++)
    {
        FilterSortingDataDineIn.vendorList.list.push(filter[k]);
    }
    console.log(FilterSortingDataDineIn);
    compiledBGTemplate=AppyTemplate.compile(foodcourtHotelListDineInTemplateDineIn),
    bghtml=compiledBGTemplate(FilterSortingDataDineIn);
    $$(".foodCourtHotelDineIn").html(bghtml);
    Appyscript.hideIndicator();
}














/*
    this method is use for service API call on behalf on page load n reload
*/
function serviceAPICallDineInHotellistDineIn(pagetype,frompage,data)
{
    var  email=localStorage.getItem("email");
    if(email!=undefined && email !='')
    {
        useremailIDDineIn=email;
    }
    var postdatafoodcourt='';
   if(pagetype=='main')
   {
        FilterSortingDataDineIn={"vendorList":{"list":[]}};
        postdatafoodcourt='{"method":"vendorList","appId":"'+app_id+'","latitude":"'+dineinlatitude+'","longitude":"'+dineinlongitude+'","emailId":"'+useremailIDDineIn+'"}';
   }
   else if(pagetype=='Filter')
   {
       postdatafoodcourt='{"method":"vendorFilter","appId":"'+app_id+'","cuisineIds":"","latitude":"'+dineinlatitude+'","longitude":"'+dineinlongitude+'","rate":"'+data+'","time":"'+frompage+'","emailId":"'+useremailIDDineIn+'"}';
   }
   else if( pagetype == 'Cuisine')
   {
       FilterSortingDataDineIn={"vendorList":{"list":[]}};
       var cusinefilterDineIn=JSON.stringify(data);
       postdatafoodcourt='{"method":"vendorFilter","appId":"'+app_id+'","cuisineIds":'+cusinefilterDineIn+',"latitude":"'+dineinlatitude+'","longitude":"'+dineinlongitude+'","emailId":"'+useremailIDDineIn+'"}';
   }
   else
   {
     // alert("it's seems to be developer mistake ");
      return ;
   }

        console.log("pagename : foodcourt    baseURL   "+baseURL +"   postdata  " + postdatafoodcourt);
         if(isOnline())
         {
            Appyscript.showIndicator();
             $$.ajax({
             url: baseURL,
             data: Appyscript.validateJSONData(postdatafoodcourt),
             type: "post",
             //321 headers: {'accessToken': deviceEncryptedToken},
             async: true,
             success: function(jsonData, textStatus )
             {
                    var responcedata=JSON.parse(jsonData);
                    console.log(responcedata);
                    if(responcedata.status !=' failure' &&  responcedata.status != 'fail')
                    {
                        if(pagetype=='main')
                        {
                            mainvenderlistDineIn=responcedata;
                        }
                        setTimeout(function(){
                            storeFoodVendetListDineIn(responcedata);
                            foodcourtHotelListDineIn = '';
                            foodcourtHotelListDineIn = responcedata;
                            compiledBGTemplate = AppyTemplate.compile(foodcourtHotelListDineInTemplateDineIn),
                            bghtml = compiledBGTemplate(responcedata);
                            $$(".foodCourtHotelDineIn").html(bghtml);
                        },1000);
                        updateDineInIcon();
                        Appyscript.hideIndicator();
                    }
                    else
                    {
                         Appyscript.hideIndicator();
                    }

             },
             error: function(error)
             {
                   Appyscript.hideIndicator();
                   console.log("Error: " + error.code + " " + error.message);
             }
           });
       }
       else
       {
           Appyscript.hideIndicator();
           Appyscript.alert(internetconnectionmessage );
       }


}







/*
    only for API call according to type and store data according to type for multiple condition
*/
var figurationSettingsDineIn='';
function serviceAPICallDineIn(postdatafoodcourt,APItype,frommain)
{
     console.log("pagetype : " + APItype  +"   baseURL  "+baseURL + "   postdata  " + postdatafoodcourt);
     if(isOnline())
     {
        Appyscript.showIndicator();
         $$.ajax({
         url: baseURL,
         data: Appyscript.validateJSONData(postdatafoodcourt),
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},
         async: true,
         success: function(jsonData, textStatus )
         {
            var responcedata=JSON.parse(jsonData);
            console.log(jsonData);
            if(jsonData)
            {
                   if(APItype =='cusin')
                    {
                        cusineListDataDineIn=jsonData;
                    }
                    else if(APItype == 'figurationSettingsDineIn')
                    {
                        figurationSettingsDineIn=responcedata;

                         if(frommain =='maincart' || frommain =='maincartold')
                         {
                           foodCourtRulesDataDineIn=figurationSettingsDineIn;
                           localStorage.setItem("ruledataconfig",JSON.stringify(foodCourtRulesDataDineIn));
                         }
                         if(foodCourtCartDataDineIn.productList.length <1)
                         {
                               foodCourtRulesDataDineIn=figurationSettingsDineIn;
                               localStorage.setItem("ruledataconfig",JSON.stringify(foodCourtRulesDataDineIn));
                         }
                         if(foodCourtCartDataDineIn.vendeid == detailsdatadataDineIn.id)
                         {
                           foodCourtRulesDataDineIn=figurationSettingsDineIn;
                           localStorage.setItem("ruledataconfig",JSON.stringify(foodCourtRulesDataDineIn));
                         }

                    }
                    else
                    {
                       // alert("not");
                    }
            }
            Appyscript.hideIndicator();
         },
         error: function(error)
         {
               Appyscript.hideIndicator();
               console.log("Error: " + error.code + " " + error.message);
         }
       });
   }
   else
   {
       Appyscript.hideIndicator();
       Appyscript.alert(internetconnectionmessage );
   }
}







function foodCourtSearchFunctionDineIn(frompage,e, obj)
{
    var thisObj = $$(obj);
        var type = e.type;
    if(type == "search")
    {
        foodcortSearchDetailsDineIn('search',searchtext);
        return;
    }
        if(type == "focus")
        {
            thisObj.removeClass("on");
            if(Appyscript.device.android)
            {
                if(Appyscript.device.android)
                {
                    $$(".searchbar-overlay").removeClass("searchbar-overlay-active");
                }
            }
        }
        if(Appyscript.device.android)
        {
            if(type == "keyup")
            {
                var mEvent = e || window.event;
                var mPressed = mEvent.keyCode || mEvent.which;
                if (mPressed == 13)
                {
                   var searchtext = $$(obj).val();
                   if(searchtext.length > 0)
                   {
                     if(frompage != 'Product')
                     {
                        Appyscript.closeModal();
                        setTimeout(FevoratieOffersSearchLocationDineIn('search',searchtext), 100);
                     }
                     else
                     {
                       foodcortSearchDetailsDineIn('search',searchtext);
                     }
                    }
                }
                if(type == "blur")
                {
                     thisObj.removeClass("on");
                     if(Appyscript.device.android)
                     {
                        $$(".searchbar-overlay").removeClass("searchbar-overlay-active");
                     }
                }
            }
            if(type == "blur")
            {
                 thisObj.removeClass("on");
                 if(Appyscript.device.android)
                 {
                    $$(".searchbar-overlay").removeClass("searchbar-overlay-active");
                 }
            }
        }
        else
        {
            if(type == "blur")
            {
                var searchtext = $$(obj).val();
                if(searchtext.length > 0)
                 {
                       if(frompage != 'Product')
                       {
                          Appyscript.closeModal();
                          setTimeout(FevoratieOffersSearchLocationDineIn('search',searchtext), 100);
                       }
                        else
                       {
                            foodcortSearchDetailsDineIn('search',searchtext);
                       }
                  }
            }
            if(type == "keyup")
            {
                thisObj.addClass("on");
            }
        }
}



/*
    this method is use for 4  type of on single page according to page type
    1.  Favorites vendor list
    2. Offers vendor list
    3. Search vendor list
    4. Location vendor list
*/
function FevoratieOffersSearchLocationDineIn(pagetype,srchlat,srchlong)
{
    if(pagetype=="location" || pagetype=="search")
    {
        AppyTemplate.global.foodcourtcustomheaderforsearch=AppyTemplate.global.pageLanguageSetting.search_food;
    }
    else if(pagetype=="favorite")
    {
        AppyTemplate.global.foodcourtcustomheaderforsearch=AppyTemplate.global.pageLanguageSetting.fc_favorite;
    }
    else
    {
        AppyTemplate.global.foodcourtcustomheaderforsearch=AppyTemplate.global.pageLanguageSetting.fc_offered;
    }
        var postdatafoodcourt='';
       var  email=localStorage.getItem("email");
       if(email!=undefined && email !='')
       {
           useremailIDDineIn=email;
       }
        if(pagetype == 'favorite')
        {
           postdatafoodcourt ='{"method":"vendorFavouritesList","appId":"'+app_id+'","email":"'+useremailIDDineIn+'","latitude":"'+dineinlatitude+'","longitude":"'+dineinlongitude+'"}';
        }
        else if(pagetype == 'offered')
        {
            postdatafoodcourt='{"method":"OfferedvendorList","appId":"'+app_id+'","latitude":"'+dineinlatitude+'","longitude":"'+dineinlongitude+'","emailId":"'+useremailIDDineIn+'"}';
        }
        else if(pagetype == 'location')
        {
            postdatafoodcourt='{"method":"vendorList","appId":"'+app_id+'","latitude":"'+srchlat+'","longitude":"'+srchlong+'","emailId":"'+useremailIDDineIn+'"}';
        }
        else if(pagetype == 'search')
        {
           postdatafoodcourt='{"method":"vendorFilter","appId":"'+app_id+'","cuisineIds":[],"latitude":"'+dineinlatitude+'","longitude":"'+dineinlongitude+'","rate":"","time":"","emailId":"'+useremailIDDineIn+'","searchKeyword":"'+srchlat+'"}';
        }
        else if(pagetype == 'Filter')
        {
            postdatafoodcourt=srchlat;
        }
        else if(pagetype == 'Cuisine')
        {
             postdatafoodcourt=srchlat;
        }
        else
        {
           // alert("it's seems to be developer mistake ");
            return ;
        }
         console.log("postdatafoodcourt "+postdatafoodcourt);
         if(isOnline())
         {
            Appyscript.showIndicator();
             $$.ajax({
             url: baseURL,
             data: Appyscript.validateJSONData(postdatafoodcourt),
             type: "post",
             //321 headers: {'accessToken': deviceEncryptedToken},

             async: true,
             success: function(jsonData, textStatus )
             {
             console.log(jsonData+"dsfs"+textStatus)
                var responcedata=JSON.parse(jsonData);

                storeFoodVendetListDineIn(responcedata);

                     console.log(responcedata);
                FOLSHotelListDineIn=responcedata;
                console.log(responcedata);
                Appyscript.hideIndicator();
                openFoodDineInPage('dinein-FavoriteOffers',responcedata);
                updateDineInIcon();

             },
             error: function(error)
             {
                   Appyscript.hideIndicator();
                   console.log("Error: " + error.code + " " + error.message);
             }
           });
       }
       else
        {
           Appyscript.hideIndicator();
           Appyscript.alert(internetconnectionmessage );
        }
}
/*
    this method is use for load and reload page
*/
function openFoodDineInPage(courtpagename,courtpagedata)
{

   console.log("courtpagedata____   "+JSON.stringify(courtpagedata));
   if (courtpagedata.productList != undefined && courtpagedata.productList.length) {
       var productListPriceArr = courtpagedata.productList;
       currencyFomatterSymbolProductList = courtpagedata.productList[0].currency;

       AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
       localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
       AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

        AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
        localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
        AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

       for (var key in productListPriceArr) {
           productListPriceArr[key].maxPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].price));
           productListPriceArr[key].maxolPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].productoldprice));
       }

       for(var i=0;i<productListPriceArr.length;i++){
            console.log("poiuytrew   "+productListPriceArr[i].customOption);
            if(productListPriceArr[i].customOption){
                if(productListPriceArr[i].customOption[0]){
                    var maxcustomOption = productListPriceArr[i].customOption[0].row;
                    for (var key in maxcustomOption) {
                        maxcustomOption[key].maxRow_price = currencyFomatter(parseFloat(maxcustomOption[key].row_price));
                    }
                }
            }
       }
       courtpagedata.maxTaxPrice = currencyFomatter(parseFloat(courtpagedata.taxPrice));
       courtpagedata.maxSubTotal = currencyFomatter(parseFloat(courtpagedata.subTotal));
       courtpagedata.maxCouponDiscount = currencyFomatter(parseFloat(courtpagedata.couponDiscount));
       courtpagedata.maxTipamount = currencyFomatter(parseFloat(courtpagedata.tipamount));
       courtpagedata.maxVendordiscount = currencyFomatter(parseFloat(courtpagedata.vendordiscount));
       courtpagedata.maxDiscountPrice = currencyFomatter(parseFloat(courtpagedata.discountPrice));
       courtpagedata.maxGrandTotal = currencyFomatter(parseFloat(courtpagedata.grandTotal));
       //courtpagedata.maxDeliveryPrice = currencyFomatter(parseFloat(courtpagedata.deliveryPrice));
       if (courtpagedata.miscTax != undefined) {
           var miscTaxArr = courtpagedata.miscTax.list;
           for (var key in miscTaxArr) {
               miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
           }
       }
   }
   console.log("courtpagedata____   "+JSON.stringify(courtpagedata));

   $$.get("pages/"+courtpagename+".html", function (template)
   {
        if(courtpagename =='dinein-category')
        {
             getCategoryTemplateFoodCourtDineIn = template;
        }

       var compiledTemplate = AppyTemplate.compile(template);
       var html = compiledTemplate(courtpagedata);
       mainView.router.load({content: html, animatePages: true});
       updateDineInIcon();
       Appyscript.hideIndicator();
        if(courtpagedata.list && courtpagedata.list.length>0){
               for (var key in courtpagedata.list) {
               if(courtpagedata.list[key].method == 'volecity' && courtpagedata.list[key].applicationLicenseID!=undefined){
               Appyscript.callAzureApi(courtpagedata.list.length, courtpagedata.list[key].method, courtpagedata.list[key].applicationLicenseID);
               }
               }
               }
   });
}



function foodcourtviewimageDineIn(frompage,ind,idd)
 {
    var productimage= new Array()
    if(frompage =='vdetails')
      {
        detailsdatadataDineIn
        for(i=0;i<detailsdatadataDineIn.imgList.length;i++)
        {
            productimage.push(detailsdatadataDineIn.imgList[i].name);
        }

    }
    else
    {
        var    pdata=GetsProductDetailsDataDineIn(idd);
        for(i=0;i<pdata.productImage.length;i++)
        {
            productimage.push(pdata.productImage[i].url);
        }

    }
       var productImage =productimage.toString();
       if(Appyscript.device.android)
       {
           Appyscript.openGallary(productImage,ind,'','','',"on",detailsdatadataDineIn.name);
       }
       else
       {
           Appyscript.openGallary(productImage,ind,'','','',"",detailsdatadataDineIn.name);
       }
 }
/*
    for play custome video details , order details , cart-product-details page
*/
function openVideoStreamFoodCourtDineIn(videourl,productName)
{
    if(Appyscript.device.android)
    {
        Appyscript.openVideoStream(videourl,'','0',productName,'','','','');
       // Appyscript.openVideoStream(videourl,'','0',productName,"0","yes","","","");
    }
    else
    {
           var jsonString = '{"catName": "  ", "catIcon": "", "catIconType": "","identifire": "","list":[{"name":"","value":"' + videourl + '","description":"","uploadedOn":"","iconName":"","iconType":""}],"pageTitle":"'+productName+'"}';
           window.location = "openvideoplayer:" + jsonString + "$,$" + "" + "$,$" + "";
    }
}


/*
    for play custome video details , order details , cart-product-details page
*/
function openYouTubeVedioFoodCourtDineIn(videourl , productName)
{
    if(Appyscript.device.android)
    {
        Appyscript.openYouTubeVedio(videourl,productName);
    }
    else
    {
        Appyscript.playYoutubeWatch(videourl,productName);
    }
}


/*function callforWaiter(actiontype , telnumber)
{
    Appyscript.call(telnumber);
}*/

/*function callforbill(actiontype , telnumber)
{
    Appyscript.call(telnumber);
}*/


  function PhoneCallFoodcourtDineIn(sellerPhoneNoa)
  {

        var mobileno='';
        for(j=0;j<detailsdatadataDineIn.configList.length;j++)
        {
            if(detailsdatadataDineIn.configList[j].ConfigKey == 'store_mobile')
            {
                mobileno=detailsdatadataDineIn.configList[j].ConfigValue;
            }
        }


     var tempMobNumber = mobileno.split("|||||");
    if(tempMobNumber.length >1)
    {
           var m = [];
        	$$.each(tempMobNumber, function(i, v)
        	{
        	    if(Appyscript.device.android)
        	    {
        		    m.push({text:v,       onClick: function(){Appyscript.call(v)}})
        		}
        		else
        		{
        		     m.push({text:v,       onClick: function(){Appyscript.call(v)}})
        		}
        	})


            m.push({text: AppyTemplate.global.commonLanguageSetting.common_cancel,       onClick: function(){}})



        	Appyscript.modal({
        				     title: AppyTemplate.global.commonLanguageSetting.common_call_now,
                             verticalButtons:true,
                             buttons:m
            })
    }
    else
    {
        if(Appyscript.device.android)
        {
            Appyscript.call(mobileno);
        }
        else
        {
            Appyscript.call(mobileno);
        }
    }
}




function getStoreTimeDineIn(detailsdata)
{
    var storeOpentimeDate=detailsdata.storeOpentimeDate
    if(storeOpentimeDate.preferred_deliverytime_required)
    {
        if(storeOpentimeDate.preferred_deliverytime_required =='1')
        {
            var storeOpenTime=JSON.parse(detailsdata.storeOpentimeDate.store_opening_time_schedule);
            console.log(storeOpenTime);
            var storeOperactionTime=JSON.parse(detailsdata.storeOpentimeDate.customer_servicing_time_schedule);
            var tim={"storetimeopen":storeOpenTime,"storeServiceingtime":storeOperactionTime};
            tim.preferredDeliveryTimeReq=storeOpentimeDate.preferred_deliverytime_required;

             var d = new Date();
             var n = d.getDay();
             if(storeOpenTime.day[n].isOpen)
             {
                  var todaystime



                  for(k=0;k<storeOpenTime.day[n].storeTime.length;k++)
                  {
                         var daysss=getdaysnowDineIn(n);
                         var AMPMStartTime='';
                         var AMPMEndTime='';
                         if(storeOpenTime.day[n].storeTime[k].AMStart == 'AM')
                          {
                              AMPMStartTime=AppyTemplate.global.pageLanguageSetting.AM;
                          }
                          else
                          {
                              AMPMStartTime=AppyTemplate.global.pageLanguageSetting.PM;
                          }
                          if(storeOpenTime.day[n].storeTime[k].AMEnd == 'AM')
                          {
                              AMPMEndTime=AppyTemplate.global.pageLanguageSetting.AM;
                          }
                          else
                          {
                              AMPMEndTime=AppyTemplate.global.pageLanguageSetting.PM;
                          }
                            todaystime=daysss +"  "+storeOpenTime.day[n].storeTime[k].HStart +":"+storeOpenTime.day[n].storeTime[k].MStart +" "+AMPMStartTime +" "+AppyTemplate.global.pageLanguageSetting.fc_to+" "+storeOpenTime.day[n].storeTime[k].HEnd +":"+storeOpenTime.day[n].storeTime[k].MEnd+" "+AMPMEndTime;
                            var t = new Date();
                            d = t.getDate();
                            m = t.getMonth() + 1;
                            y = t.getFullYear();
                            var chour = t.getHours();
                            var cminute = t.getMinutes();
                            var ampm='AM';
                            if(chour>=12)
                            {
                                ampm='PM'
                                chour=chour-12;
                            }
                            if(chour<10)
                            {
                                chour ="0"+chour;
                            }
                            var nowtime = chour +":"+cminute +" "+ampm;
                            var opentime=storeOpenTime.day[n].storeTime[k].HStart +":"+storeOpenTime.day[n].storeTime[k].MStart +" "+storeOpenTime.day[n].storeTime[k].AMStart;
                            var closetime=storeOpenTime.day[n].storeTime[k].HEnd +":"+storeOpenTime.day[n].storeTime[k].MEnd+" "+storeOpenTime.day[n].storeTime[k].AMEnd;
                            console.log("nowtime  "+nowtime  +"  opentime  "+opentime +"   closetime  "+closetime);

                                 var curtime = new Date(m + "/" + d + "/" + y + " " + nowtime);   // current time
                                 var sttime = new Date(m + "/" + d + "/" + y + " " + opentime);   // start time
                                 var entime = new Date(m + "/" + d + "/" + y + " " + closetime);  // end time
                                 var tnow = curtime.getTime();
                                 var tstart = sttime.getTime();
                                 var tend = entime.getTime();
                                 console.log("tstart "+tstart +" entime "+tend);
                                 if(tnow >= tstart  && tnow<=tend)
                                 {
                                    tim.todaystime=todaystime;
                                    detailsdata.storetime=tim;
                                    return detailsdata;
                                 }
                                 else
                                 {
                                     tim.todaystime=AppyTemplate.global.pageLanguageSetting.closed;
                                 }
                  }
             }
             else
             {
                  tim.todaystime=AppyTemplate.global.pageLanguageSetting.closed;
             }
            detailsdata.storetime=tim;
            return detailsdata;
        }
        else
        {
            return detailsdata;
        }
    }
    else
    {
        return detailsdata;
    }
}

function openPopupFoodCourtDineIn()
{
    if($$("#foodPopupfoodcourt").is(".on"))
    {
        $$("#foodPopupfoodcourt").hide().removeClass("on");
    }
    else
    {
        $$("#foodPopupfoodcourt").show().addClass("on");
    }
}


function addVenderFavouritesDineIn(thisObj,id,vendorlistType)
   {


     if(isOnline())
     {
         var adfavcondition;
         if($$(".share-btn i").attr("class") == "icon-heart-1"){

             adfavcondition="remove";

         }else{

             adfavcondition="add";
         }

         console.log("sdfds"+adfavcondition)

        if(!localStorage.getItem("email"))
        {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_login_first_to_add_product_in_favorite ,data.appData.appName);
            return true;
        }
       var  email=localStorage.getItem("email");
       if(email!=undefined && email !='')
       {
           useremailIDDineIn=email;
       }

        var postdatafoodcourt='{"method":"addVendorFavourite","appId":"'+app_id+'","vendorId":"'+id+'","email":"'+useremailIDDineIn+'" ,"vendorlistType":"'+adfavcondition+'"}';
        console.log("postdatafoodcourt  "+postdatafoodcourt);
        Appyscript.showIndicator();
         $$.ajax({
         url: baseURL,
         data: Appyscript.validateJSONData(postdatafoodcourt),
         type: "post",
         //321 headers: {'accessToken': deviceEncryptedToken},

         async: true,
         success: function(jsonData, textStatus )
         {

            var responcedata=JSON.parse(jsonData);

            if(responcedata.status == 'sucess')
            {

                updatevendelistFevoratiesDineIn(id,adfavcondition)

               if(adfavcondition == 'add')
               {
                 $$("."+thisObj.className).find("i").attr("class","");
                 $$("."+thisObj.className).find("i").attr("class","icon-heart-1")
               }
               else
               {
                 console.log("favclass2"+$$("."+thisObj.className).find("i").attr("class"))
                 $$("."+thisObj.className).find("i").attr("class","");
                 $$("."+thisObj.className).find("i").attr("class","appyicon-like")

               }


               if(responcedata.msg =='added')
               {
                    Appyscript.alert(detailsdatadataDineIn.name +" "+AppyTemplate.global.pageLanguageSetting.added_to_your_favorite_list );
               }
               else
               {
                    Appyscript.alert(detailsdatadataDineIn.name +" "+AppyTemplate.global.pageLanguageSetting.removed_from_your_favorite_list  );

                 if(AppyTemplate.global.foodcourtcustomheaderforsearch== AppyTemplate.global.pageLanguageSetting.fc_favorite)
                 {
                 mainView.router.back();
                 setTimeout(function(){
                            Appyscript.foodremovefavlist();
                            }, 300);
                 }
               }
            }
            else
            {
               if(responcedata.msg =='already added')
               {
                    Appyscript.alert(detailsdatadataDineIn.name +" "+AppyTemplate.global.pageLanguageSetting.already_added_to_your_favorite_list  );
               }
               else
               {
               }
            }
            Appyscript.hideIndicator();
         },
         error: function(error)
         {
               Appyscript.hideIndicator();
               console.log("Error: " + error.code + " " + error.message);
         }
       });
   }
   else
   {
       Appyscript.hideIndicator();
       Appyscript.alert(internetconnectionmessage );
   }
  }


function storeFoodVendetListDineIn(vendetdata)
 {
    if(vendetdata.vendorList)
    {
        for(i=0;i<vendetdata.vendorList.list.length;i++)
        {
            if(storeFoodVendetListDineInDataDineIn.length >0)
            {
                storeFoodVendetListDineInDataDineIn.vendorList.list.unshift(vendetdata.vendorList.list[i]);
            }
            else
            {
                storeFoodVendetListDineInDataDineIn.vendorList.list.push(vendetdata.vendorList.list[i]);
            }
        }
    }
  }


function updatevendelistFevoratiesDineIn(vendetid,Type)
{
    if(storeFoodVendetListDineInDataDineIn.vendorList)
    {
        for(i=0;i<storeFoodVendetListDineInDataDineIn.vendorList.list.length;i++)
        {
            console.log("list id "+storeFoodVendetListDineInDataDineIn.vendorList.list[i].id +"  id update "+vendetid   +"   Type   "+Type);
            if(storeFoodVendetListDineInDataDineIn.vendorList.list[i].id==vendetid)
            {
                if(Type=='add')
                {
                    storeFoodVendetListDineInDataDineIn.vendorList.list[i].favoriteList=1;
                }
                else
                {
                    storeFoodVendetListDineInDataDineIn.vendorList.list[i].favoriteList=0;
                }
                //mainView.router.back();
            }
        }
    }
}


function shareVenderDetailsDineIn(thisObj,id)
{
    var name=detailsdatadataDineIn.name;
    var price=detailsdatadataDineIn.min_order;
    var address=detailsdatadataDineIn.address;
     var rating=detailsdatadataDineIn.rating;
     var imageUrl='';
     var mobileno='';
     for(i=0;i<detailsdatadataDineIn.imgList.length;i++)
     {
        if(detailsdatadataDineIn.imgList[i].main_image=='1')
        {
            imageUrl=detailsdatadataDineIn.imgList[i].name;
        }
     }
     for(j=0;j<detailsdatadataDineIn.configList.length;j++)
     {
         if(detailsdatadataDineIn.configList[j].ConfigKey == 'store_mobile')
         {
             mobileno=detailsdatadataDineIn.configList[j].ConfigValue;
         }
     }

     if(Appyscript.device.android)
     {
          // Appyscript.shareText(AppyTemplate.global.pageLanguageSetting.fc_vendeor_name.replace(/\s/g, "&nbsp;")+" : "+name+"\r "+AppyTemplate.global.pageLanguageSetting.address_food.replace(/\s/g, "&nbsp;")+" : "+address+"\r "+AppyTemplate.global.pageLanguageSetting.fc_mobile.replace(/\s/g, "&nbsp;")+" : "+mobileno+"\r "AppyTemplate.global.pageLanguageSetting.rating_dir.replace(/\s/g, "&nbsp;")+" : "+rating+"\r "+AppyTemplate.global.pageLanguageSetting.home_restaurant_min_order.replace(/\s/g, "&nbsp;")+" : "+price+"\r "+AppyTemplate.global.pageLanguageSetting.fc_image_url+" : "+imageUrl+");
            Appyscript.shareText(AppyTemplate.global.pageLanguageSetting.fc_vendeor_name+" : "+name+"\r "+AppyTemplate.global.pageLanguageSetting.address_food+" : "+address+"\r "+AppyTemplate.global.pageLanguageSetting.fc_mobile+" : "+mobileno+"\r "+AppyTemplate.global.pageLanguageSetting.rating_dir+" : "+rating+"\r "+AppyTemplate.global.pageLanguageSetting.fc_image_url+" : "+imageUrl);
     }
     else
     {
        window.location = "sharefoodcourt:" + AppyTemplate.global.pageLanguageSetting.fc_vendeor_name+" : "+ name + "$$" + "\r "+AppyTemplate.global.pageLanguageSetting.address_food+" : "+ address + "$$"+ "\r "+AppyTemplate.global.pageLanguageSetting+" : "+ mobileno + "$$"+"\r "+AppyTemplate.global.pageLanguageSetting.rating_dir+" : "+rating + "$$" +"\r "+AppyTemplate.global.pageLanguageSetting.fc_image_url+" : " +imageUrl;
     }
  }







function HotelLocationSeacrhDineIn(output)
{
    console.log(output)
    var status;
    var results;
    var html = '';
    var msg = '';

    var search = document.getElementById('HotelLocationId').value;
    var output = document.getElementById(output);
    if(!isOnline())
    {
        Appyscript.alert(pageData.languageSetting.Internet_connection_is_not_available, pageData.languageSetting.alert_dir);
    }
    else
    {
        if (search)
        {
            console.log(search)
            output.innerHTML = '';
            setTimeout(function()
            {
                       var api = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+encodeURIComponent(search)+ "&key=" + data.googlePlacesApiKey;
                       Appyscript.showIndicator();
                       $$.ajax({
                               type: 'GET',
                               url: api,
                               dataType: 'json',
                               success: function(data)
                               {
                                   console.log(data);
                                   Appyscript.hideIndicator();
                                    if(data.status != "REQUEST_DENIED"){
                                       if (data.predictions.length > 0)
                                       {
                                           var iCounter ;
                                           // List multiple returns
                                           if (data.predictions.length > 1)
                                           {
                                               for ( iCounter = 0; iCounter < data.predictions.length; iCounter++)
                                               {
                                                    console.log(data.predictions[iCounter].description);
                                                    html +='<li class="close-popup" onClick="getLatLngFromAddressDineIn(\'' + data.predictions[iCounter].description + '\',\'' + data.predictions[iCounter].reference + '\');" href="#" rel="' + data.predictions[iCounter].description + '" title="Click for to see a weather report">' + data.predictions[iCounter].description + '</li>';
                                               }
                                           }
                                           else
                                           {
                                                console.log(data.predictions[0].reference);
                                                html += '<li class="close-popup"  onClick="getLatLngFromAddressDineIn(\'' + data.predictions[0].reference + '\',\'' + data.predictions[0].reference + '\');"  href="#" rel="' + data.predictions[0].reference + '" title="Click for to see a weather report">' + data.predictions[0].description + '</li>';
                                           }
                                           html = html + '</ul>';
                                           output.innerHTML = html;
                                       }
                                       else
                                       {
                                        output.innerHTML = "";
                                       }
                                    }else{
                                         Appyscript.hideIndicator();
                                         apiname = "Google";
                                         serviceFailedNotify(data.status, apiname, 1);
                                         Appyscript.alert(data.error_message,appnameglobal_allpages);
                                    }
                               },
                               error: function(data)
                               {
                                  Appyscript.hideIndicator();
                                  output.innerHTML = An_error_has_occurred;
                                  apiname="Google";
                                  var flag = 0;
                                  serviceFailedNotify(data,apiname,flag);
                               }
                               });
                       }, 500);
        }
        else
        {
            output.innerHTML = '';
        }
    }
}


function getLatLngFromAddressDineIn(addressdata,referencecodemap)
  {
       var api2 = " https://maps.googleapis.com/maps/api/place/details/json?reference="+encodeURIComponent(referencecodemap)+ "&key=" + data.googlePlacesApiKey;
       $$.ajax({
        type: 'GET',
        url: api2,
        dataType: 'json',
        async: true,
        success: function(data)
        {
            if (data.status != "REQUEST_DENIED") {
                var dineinlattitude = datingLat = data.result.geometry.location.lat;
                var dineinlongitude = datingLong = data.result.geometry.location.lng;
                setTimeout(function() {
                    FevoratieOffersSearchLocationDineIn("location", dineinlattitude, dineinlongitude);
                }, 500)
            } else {
                Appyscript.hideIndicator();
                apiname = "Google";
                serviceFailedNotify(data.status, apiname, 1);
                Appyscript.alert(data.error_message, appnameglobal_allpages);
            }
        },
        error: function()
        {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
            apiname = "Google";
            var flag = 0;
            serviceFailedNotify(data.status, apiname, flag);
        }
        })
  }








/*
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    Food menu Page
*/







function MyAccountDetailsDineIn()
{
    pagelengthBackDineIn=mainView.history.length;
    var  email=localStorage.getItem("email");
    if(email!=undefined && email !='')
    {
       useremailIDDineIn=email;
    }
    var jsonPostecom= '{"method":"foodDefaultAddressBook","appId":"'+app_id+'","userName":"'+useremailIDDineIn+'"}';
    console.log(jsonPostecom);
         if(isOnline())
         {
            Appyscript.showIndicator();
             $$.ajax({
             url: baseURL,
             data: Appyscript.validateJSONData(jsonPostecom),
             type: "post",
             //321 headers: {'accessToken': deviceEncryptedToken},

             async: true,
             success: function(jsonData, textStatus )
             {
                var responcedata=JSON.parse(jsonData);
                console.log(responcedata);
                if(responcedata)
                {

               if(responcedata.billing.length==0)
               {
                var billing={};
                                        billing.address =billaddress;
                                        billing.city= billcity;
                                        billing.country= billcountry;
                                        billing.state= billstate;
                                        billing.zip=pincode;
                                        responcedata.billing=billing;
               }
                 if(responcedata.shipping.length == 0)
                                 {
                                         var shipping={};
                                         shipping.address =billaddress;
                                         shipping.city= billcity;
                                         shipping.country= billcountry;
                                         shipping.state= billstate;
                                         shipping.zip=pincode;
                                         responcedata.shipping=shipping;
                                 }

                                 foodCourtCartDataDineIn.foodcourtBilling=responcedata.billing;
                                 foodCourtCartDataDineIn.foodcourtShipping=responcedata.shipping;



                 openFoodDineInPage("dinein-my-account",responcedata);
                 updateDineInIcon();
                }
                Appyscript.hideIndicator();
             },
             error: function(error)
             {
                   Appyscript.hideIndicator();
                   console.log("Error: " + error.code + " " + error.message);
             }
           });
       }
       else
       {
           Appyscript.hideIndicator();
           Appyscript.alert(internetconnectionmessage );
       }
}





 function foodcourtUpdateAccountDineIn(pageName)
 {
     if(isOnline())
     {
        if(pageName=="contactInformation")
        {
            $$(".error").removeClass("error");
            var name = $$("#cfname").val();
            var email = $$("#cemail").val();
            var phone = $$("#cpNo").val();

            if(!foodCourtValidateDineIn(name,"name")){
                $$("#cfname").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(email,"email")){
                $$("#cemail").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(phone,"phone")){
                $$("#cpNo").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            Appyscript.showIndicator();
            var postdata='{"method":"foodCustomerProfile","appId":"'+app_id+'","email":"'+email+'","phone":"'+phone+'","fname":"'+name+'","lname":""}';
            console.log(postdata);
            $$.ajax({
                 url: baseURL,
                 data: Appyscript.validateJSONData(postdata),
                 type: "post",
                 //321 headers: {'accessToken': deviceEncryptedToken},

                 timeout: 10000,
                 async: true,
                 success: function(jsonData, textStatus ){
                    Appyscript.hideIndicator();
                    new_data=JSON.parse(jsonData);
                    console.log(new_data);
                    if(new_data['status']==1  || new_data['status']=='success')
                    {
                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.contact_information_updated_successfully,data.appData.appName);
                    }
                    else
                    {
                        Appyscript.alert(something_went_wrong_please_try_again );
                    }
                 },error: function(error)
                 {
                         Appyscript.hideIndicator();
                         Appyscript.alert(something_went_wrong_please_try_again );
                         console.log("Error: " + error.code + " " + error.message);
                  }
                 });

        }
        else if(pageName=="billingInformation")
        {
            $$(".error").removeClass("error");
            var name = $$("#bfname").val();
            var phone = $$("#bpNo").val();
            var address = $$("#bAddress").val();
            var city = $$("#bCity").val();
            var state = $$("#bState").val();
            var zip = $$("#bZip").val();
            var country= $$("#bCountry").val();

            if(!foodCourtValidateDineIn(name,"name")){
                $$("#bfname").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(phone,"phone")){
                $$("#bpNo").parent().addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(address,"address")){
                $$("#bAddress").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(city,"city")){
                $$("#bCity").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(country,"country"))
            {
                $$("#bCountry").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            var billing='{"billShip":"Billing", "name":"'+name+'", "phone":"'+phone+'", "address":"'+address+'", "city":"'+city+'", "state":"'+state+'", "zip":"'+zip+'", "country":"'+country+'"}';

            Appyscript.showIndicator();
            var postdata='{"method":"foodMyAccount", "appId":"'+app_id+'", "userName":"'+localStorage.getItem("email")+'", "billing":'+billing+', "shipping":""}';
            console.log(postdata);
            $$.ajax({
                 url: baseURL,
                 data: Appyscript.validateJSONData(postdata),
                 type: "post",
                 //321 headers: {'accessToken': deviceEncryptedToken},

                 timeout: 10000,
                 async: true,
                 success: function(jsonData, textStatus )
                 {
                    Appyscript.hideIndicator();
                    new_data=JSON.parse(jsonData);
                    console.log(new_data);
                    if(new_data['status']==1 || new_data['status']=='success'){
                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.billing_information_updated_successfully,data.appData.appName);
                    }else
                    {
                        Appyscript.alert(something_went_wrong_please_try_again );
                    }
                 },error: function(error)
                 {
                         Appyscript.hideIndicator();
                         Appyscript.alert(something_went_wrong_please_try_again );
                         console.log("Error: " + error.code + " " + error.message);
                  }
                 });

        }
        else if(pageName=="shippingInformation")
        {
            $$(".error").removeClass("error");
            var name = $$("#sfname").val();
            var phone = $$("#spNo").val();
            var address = $$("#ssAddress").val();
            var city = $$("#sCity").val();
            var state = $$("#sState").val();
            var zip = $$("#sZip").val();
            var country= $$("#sCountry").val();

            if(!foodCourtValidateDineIn(name,"name")){
                $$("#sfname").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(phone,"phone")){
                $$("#spNo").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(address,"address")){
                $$("#sAddress").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(city,"city")){
                $$("#sCity").parent().addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(state,"state")){
                $$("#sState").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            if(!foodCourtValidateDineIn(zip,"zip"))
            {
                $$("#sZip").addClass("error");
                $$(".profile-image").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
                return;
            }

            var shipping='{"billShip":"Shipping", "name":"'+name+'", "phone":"'+phone+'", "address":"'+address+'", "city":"'+city+'", "state":"'+state+'", "zip":"'+zip+'", "country":"'+country+'"}';

            Appyscript.showIndicator();
            var postdata='{"method":"foodMyAccount", "appId":"'+app_id+'", "userName":"'+localStorage.getItem("email")+'", "shipping":'+shipping+', "billing":""}';
            console.log(postdata);
            $$.ajax({
                 url: baseURL,
                 data: Appyscript.validateJSONData(postdata),
                 type: "post",
                 //321 headers: {'accessToken': deviceEncryptedToken},

                 timeout: 10000,
                 async: true,
                 success: function(jsonData, textStatus ){
                    Appyscript.hideIndicator();
                    new_data=JSON.parse(jsonData);
                    console.log(new_data);

                    if(new_data['status']==1  || new_data['status']=='success'){
                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.shipping_information_updated_successfully,data.appData.appName);
                    }else{
                        Appyscript.alert(something_went_wrong_please_try_again );
                    }
                 },error: function(error) {
                         Appyscript.hideIndicator();
                         Appyscript.alert(something_went_wrong_please_try_again );
                         console.log("Error: " + error.code + " " + error.message);
                       }
                 });
        }
      }
      else
      {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage  );
      }
 }





 function foodCourtValidateDineIn(value,field){

    if(field == "name")
    {
       if(value.trim()== '')
        {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_name_food);
            return false;
        }
    }

    if(field == "phone"){
      if(value.length <4){
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_telephone_food);
                return false;
            }
        if(value.trim()==''){
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_telephone_food);
            return false;
        }
    }

    if(field == "email"){
        if(value.trim()=='' || !Appyscript.validateEmail(value)){
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_email_food);
            return false;
        }
    }

    if(field == "address"){
        if(value.trim()=='' || value == "-1"){
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_address_food);
            return false;
        }
    }

     if(field == "city"){
         if(value.trim()==''){
             Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_city_food);
             return false;
         }
     }

     if(field == "state")
     {
         if(value.trim()=='' || !Appyscript.checkNameState(value))
         {
             Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_state_food);
             return false;
         }
     }

     if(field == "zip")
     {
          if(value.trim()=='')
          {
              Appyscript.alert(AppyTemplate.global.pageLanguageSetting.zip_postal_code_food);
              return false;
          }
      }

	  if(field=="country")
      {
        if(value.trim()=='-1' || value.trim==null|| value.trim==''|| value.trim=="Select Country")
        {
          Appyscript.alert(AppyTemplate.global.pageLanguageSetting.country_food);
         return false;
         }
      }

    return true;
 }


/*
    this method is use for term and condition and privacy policy page.
*/
function termconditionPrivacyPolicyDineIn(type)
{
    Appyscript.closeModal();
    if(type=='terms_conditions')
    {
          var cmsdata=pageData.cmsPage.terms_and_conditions;
          cmsdata.type=type;
          openFoodDineInPage('dinein-privacy_policy',cmsdata,'load');
          updateDineInIcon();
    }
    else
    {
        var cmsdata=pageData.cmsPage.privacy_policy;
        cmsdata.type=type;
        openFoodDineInPage('dinein-privacy_policy',cmsdata,'load');
        updateDineInIcon();
    }
}


function foodcortSearchDetailsDineIn(frompage , searchtext)
{
    var al=searchtext;
    var jsonPostecom= '{"method":"foodSearch","appId":"'+app_id+'","search":"'+al+'","vendorId":"'+detailsdatadataDineIn.id+'","emailId":"'+useremailIDDineIn+'"}';
    console.log(jsonPostecom);
         if(isOnline())
         {
            Appyscript.showIndicator();
             $$.ajax({
             url: baseURL,
             data: Appyscript.validateJSONData(jsonPostecom),
             type: "post",
             //321 headers: {'accessToken': deviceEncryptedToken},

             async: true,
             success: function(jsonData, textStatus )
             {
               Appyscript.closeModal();
                var responcedata=JSON.parse(jsonData);
                console.log(responcedata);
                if(responcedata)
                {
                    if(responcedata.productList)
                    {
                        storeProductListDataDineIn(responcedata)
                        venderSubCatProductDineIn=responcedata;

                    }
					openFoodDineInPage('dinein-listing',responcedata,'load');
					updateDineInIcon();
                }
                Appyscript.hideIndicator();
             },
             error: function(error)
             {
                   Appyscript.hideIndicator();
                   console.log("Error: " + error.code + " " + error.message);
             }
           });
       }
       else
       {
           Appyscript.hideIndicator();
           Appyscript.alert(internetconnectionmessage );
       }
}


Appyscript.onPageInit('foodcort-hotalfilter',function(page){$$("#txtSearch").focusout(function(){ setTimeout(function(){if($$("#txtSearch").hasClass("on")){}else{Appyscript.searchClick('#txtSearch')}},100)})});



/*
    this method is use for get foodcourt product list with cat / subcat and product listing on behalf of hotel / vendor ID.
*/
function reloadFoodCourtHomeDineIn()
{
        var backlength;
       if(pageIdentifie.indexOf("folder")!=-1)
       {
          backlength=mainView.history.length-4;
       }
       else
       {
          backlength=mainView.history.length-3;
       }
       if(mainView.history.length > 2)
       {
           if(data.appData.layout=='bottom')
           {
             for(var i=0;i<backlength+3;i++)
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
}

function hotelMenuPageDineIn(thisObj,venderid)
{
pagelengthBackDineIn=mainView.history.length+1;
    var pageopenstatus='';

      Appyscript.showIndicator();
      var  email=localStorage.getItem("email");
      var pageopenstatus='0';
      if(detailsdatadataDineIn.id)
      {
          vandorIdDineIn=detailsdatadataDineIn.id;
          vendorNameDineIn=detailsdatadataDineIn.name;
          pageopenstatus='0';
      }
      else if(foodCourtCartDataDineIn.vendeid)
      {
           vandorIdDineIn=foodCourtCartDataDineIn.vendeid;
           vendorNameDineIn=foodCourtCartDataDineIn.vendorNameDineIn;
           pageopenstatus='0';
      }
      else
      {
         // reloadFoodCourtHomeDineIn();
          pageopenstatus='1';
          mainView.router.back();
      }

      if(email!=undefined && email !='')
      {
          useremailIDDineIn=email;
      }

    if(pageopenstatus =='0')
    {
        var postdatafoodcourt='{"method":"getRootCategoryProductVendor","appId":"'+app_id+'","vendorId":"'+vandorIdDineIn+'","emailId":"'+useremailIDDineIn+'"}';
        console.log("baseURL "+baseURL +"postdatafoodcourt  "+postdatafoodcourt);
        if(isOnline())
        {
                 $$.ajax({
                 url: baseURL,
                 data: Appyscript.validateJSONData(postdatafoodcourt),
                 type: "post",
                 //321 headers: {'accessToken': deviceEncryptedToken},

                 async: true,
                 success: function(jsonData, textStatus )
                 {
                        var responcedata=JSON.parse(jsonData);
                        responcedata.pageTitle=vendorNameDineIn;
                        venderCatListingDineIn=responcedata;
                        console.log(responcedata);
                        if(responcedata.status !='fail')
                        {
                            if (responcedata.categoryList[0].productList.length) {
                                var productListPriceArr = responcedata.categoryList[0].productList;
                                currencyFomatterSymbolProductList = responcedata.categoryList[0].productList[0].currency;

                                AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                                localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                                AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                                AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

                                for (var key in productListPriceArr) {
                                    productListPriceArr[key].maxPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].price));
                                }
                            }
                            console.log("responcedata****::::  "+JSON.stringify(responcedata));
                            foodcourtselectoptiondataDinein = responcedata.categoryList[0];
                            if(venderCatListingDineIn.categoryList.length >0 && venderCatListingDineIn.categoryList.length <=1)
                            {
                                var vcatidd=responcedata.categoryList[0].id;
                                var vcatname=responcedata.categoryList[0].name;
                                var vcatsort=responcedata.categoryList[0].sort;
                                Appyscript.foodCourtCategoryDineIn('',vcatidd,vcatname ,vcatsort);
                            }
                            else
                            {
                                openFoodDineInPage('dinein-hotelmenu',responcedata,'load');
                               // pagelengthBackDineIn=mainView.history.length;
                            }
                        }
                        else
                        {
                            openFoodDineInPage('dinein-hotelmenu',responcedata,'load');
                         //   pagelengthBackDineIn=mainView.history.length;
                        }
                        Appyscript.hideIndicator();
                        updateDineInIcon();
                 },
                 error: function(error)
                 {
                       Appyscript.hideIndicator();
                       console.log("Error: " + error.code + " " + error.message);
                 }
               });
       }
       else
       {
           Appyscript.hideIndicator();
           Appyscript.alert(internetconnectionmessage );
       }
   }
   else
   {
    Appyscript.hideIndicator();
   }
}



Appyscript.onPageInit('dinein-hotelmenu',function(page)
{
    $$(".search-box a").click(function()
    {
        if($$(".search-box input").is(".on"))
        {
            $$(".search-box input").removeClass("on");
            if(Appyscript.device.android)
            {
                $$(".searchbar-overlay").removeClass("searchbar-overlay-active");
            }
        }
        else
        {
             $$(".search-box input").addClass("on").focus();
             if(Appyscript.device.android)
             {
                $$(".searchbar-overlay").addClass("searchbar-overlay-active");
             }
        }
        return false;
    });
        var postdataa= '{"method":"foodcourtConfigurationSettings","appId":"'+app_id+'", "vendorId":"'+vandorIdDineIn+'"}';
        serviceAPICallDineIn(postdataa,'figurationSettingsDineIn');
});




  var sorttt ='';
Appyscript.foodCourtCategoryDineIn = function(a,id,name , sort)
{
    var  email=localStorage.getItem("email");
    if(email!=undefined && email !='')
    {
        useremailIDDineIn=email;
    }

    var catID = '';
    var catName = '';
    var index = '';

    if(a =='')
    {
        	 catID = id;
        	 catName = name;
        	 index = 0;
        	 sorttt = sort;
    }
    else
    {
        	 catID = $$(a).attr("data-id");
        	 catName = $$(a).attr("data-name");
        	 index = $$(a).attr("index");
        	 sorttt = $$(a).attr("data-sort");
    }

	var postdata='{"method":"catListingWithSubCategory","appId":"'+app_id+'","vendorId":"'+vandorIdDineIn+'","catId":"'+catID+'","type":"cat","count":"10","pageNo":"1","sort":"'+sorttt+'","emailId":"'+localStorage.getItem("email")+'"}';
    console.log("catListingWithSubCategory  postdata "+postdata);
     if(isOnline())
     {
        Appyscript.showIndicator();
//        $$.post(baseURL, postdata,
//        function(data)
//        {
//            Appyscript.hideIndicator();
//            data = JSON.parse(data);
//            console.log(data);
//            data.categoryId = catID;
//            data.categoryName = catName;
//            data.categoryPage = 1;
//            data.index = index;
//
//            if(data.productList)
//            {
//                storeProductListDataDineIn(data)
//                venderCatProductDineIn=data;
//            }
//            openFoodDineInPage('dinein-category',data,'load');
//            updateDineInIcon();
//           // pagelengthBackDineIn=mainView.history.length;
//        },
//        function(error)
//        {
//          Appyscript.hideIndicator();
//          updateDineInIcon();
//          Appyscript.alert(something_went_wrong_please_try_again );
//        });


        $$.ajax({
            url: baseURL,
            data: postdata,
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
            Appyscript.hideIndicator();
                      var jsonData = JSON.parse(jsonData);
                         console.log(jsonData);
                         jsonData.categoryId = catID;
                         jsonData.categoryName = catName;
                         jsonData.categoryPage = 1;
                         jsonData.index = index;
                        if (jsonData.productList.length) {
                            var productListPriceArr = jsonData.productList;
                            currencyFomatterSymbolProductList = jsonData.productList[0].currency;
                            AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                            localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                            AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                            AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                            localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                            AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

                            for (var key in productListPriceArr) {
                                productListPriceArr[key].maxPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].price));
                            }
                        }
                        foodcourtselectoptiondataDinein = jsonData;
                        /* radical : hotfix - patch */
                        fd_catSelectedData = jsonData;
                        /* radical : hotfix - patch end*/
                        console.log("jsonData****::::  "+JSON.stringify(jsonData));
                        if(jsonData.productList)
                        {
                            storeProductListDataDineIn(jsonData)
                            venderCatProductDineIn=jsonData;
                        }
                        openFoodDineInPage('dinein-category',jsonData,'load');
                        updateDineInIcon();
            },
            error: function (error) {
            Appyscript.hideIndicator();
            updateDineInIcon();
            Appyscript.alert(something_went_wrong_please_try_again );
            }
            });

     }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage  );
    }
}






//  ---------------------------------------------------------------------------   Start   --------------------------------------------------------------------
Appyscript.onPageInit('dinein-Category',function(page)
{

	var infiniteScroll = $$(page.container).find('.infinite-scroll');
	if((infiniteScroll.find(".categories-list li.category").length + infiniteScroll.find(".categories-list li.product").length)< 10)
	{
		infiniteScroll.removeClass("infinite-scroll");
        infiniteScroll.find(".infinite-scroll-preloader").remove();
        return false;
	}
     if(isOnline())
     {
            var catID = infiniteScroll.attr("data-id");
            var dataPage = parseInt(infiniteScroll.attr("data-page")) + 1;
           // var sorttt = parseInt(infiniteScroll.attr("data-sort"));
            var loading = true;

            infiniteScroll.on('infinite', function()
            {
                if(!loading)
                {
                    return false;
                }

                loading = false;
                infiniteScroll.find(".infinite-scroll-preloader").show();

             /*   var postdata='{"method":"catListingWithSubCategory","appId":"'+appid+'","catId":"'+catID+'","type":"cat", "count":"10", "pageNo":"'+dataPage+'","sort":"0","emailId":"'+localStorage.getItem("email")+'","sortCatAlpha":"'+pageData.sortCatAlpha+'"}';
                console.log("catListingWithSubCategory  postdata "+postdata);
            */


            	var postdata='{"method":"catListingWithSubCategory","appId":"'+app_id+'","vendorId":"'+vandorIdDineIn+'","catId":"'+catID+'","type":"cat","count":"10","pageNo":"'+dataPage+'","sort":"'+sorttt+'","emailId":"'+localStorage.getItem("email")+'"}';
                console.log("catListingWithSubCategory  postdata "+postdata);

                Appyscript.showIndicator();
                 $$.ajax({
                   url: baseURL,
                   data: postdata,
                   type: 'post',
                   async: true,
                   //321 headers: {'accessToken': deviceEncryptedToken},
                   success: function(getData) {
                       Appyscript.hideIndicator();
                       var   data = JSON.parse(getData);

                       if (data.productList != undefined && data.productList.length) {
                           if (data.productList.length) {
                               var productListPriceArr = data.productList;
                               currencyFomatterSymbolProductList = data.productList[0].currency;

                               AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                               localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                               AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                               AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                               localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                               AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


                               for (var key in productListPriceArr) {
                                   productListPriceArr[key].maxPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].price));
                               }
                           }
                       }
                       console.log("oiuytrewertyuio    "+JSON.stringify(data));

                        if (data.productList.length != 0) {
                            foodcourtselectoptiondataDinein.productList.concat(data.productList);
                        }

                       var len=data.productList.length;
                       var addFlag=false;
                       var oldListLength=venderCatProductDineIn.productList.length;

                       for(var i=0; i<oldListLength; i++)
                       {
                           for(var j=0; j<len; j++)
                           {
                               if(venderCatProductDineIn.productList[i].id==data.productList[j].id)
                               {
                                   addFlag=true;
                                   break;
                               }
                           }
                           if(addFlag)
                           {
                               break;
                           }
                       }
                       if(!addFlag)
                       {
                           for(var i=0; i<len; i++)
                           {
                               venderCatProductDineIn.productList.push(data.productList[i]);
                           }
                       }
                       if(data.productList.length>0)
                       {
                           storeProductListDataDineIn(data);
                       }
                       var compiledTemplate = AppyTemplate.compile(getCategoryTemplateFoodCourtDineIn);
                       var html = compiledTemplate(data);
                       var htmlData = document.createElement("html");
                       htmlData.innerHTML = html;
                       $$(htmlData).find(".categories-list li").appendTo($$(mainView.activePage.container).find(".categories-list"));
                       dataPage++;

                       if((data.subCategories.length + data.productList.length) < 10)
                       {
                           infiniteScroll.removeClass("infinite-scroll");
                           Appyscript.detachInfiniteScroll(infiniteScroll);
                           infiniteScroll.find(".infinite-scroll-preloader").remove();
                           loading = false;
                       }
                       else
                       {
                           loading = true;
                       }

                       $$(mainView.activePage.container).find(".categories-list li.product")
                       .appendTo($$(mainView.activePage.container).find(".categories-list"))
                       infiniteScroll.find(".infinite-scroll-preloader").hide();
                   },
                       function(error)
                       {
                       Appyscript.hideIndicator();
                       updateDineInIcon();
                       Appyscript.alert(something_went_wrong_please_try_again );
                       }
                 });
            });
        }
        else
        {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage  );
        }
});

//---------------------------------------------------------------------------   END ------------------------------------------------------------------------------






function foodCourtSubcatProductListDineIn(thisObj ,inx,subcatid)
{
        var subcatid =$$(thisObj).attr("subcat-id");
    	var subcatname = $$(thisObj).attr("data-head");
    	var subcatimage = $$(thisObj).attr("dataimage");

        if(isOnline())
        {
            var postdatafoodcourt='{"method":"catListingWithSubCategory","appId":"'+app_id+'","catId":"'+subcatid+'","vendorId":"'+vandorIdDineIn+'","type":"cat", "count":"10", "pageNo":"1","sort":"0","emailId":"'+localStorage.getItem("email")+'"}';
            console.log("catListingWithSubCategory postdata "+postdatafoodcourt);

                Appyscript.showIndicator();
                $$.ajax({
                url: baseURL,
                data: Appyscript.validateJSONData(postdatafoodcourt),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                async: true,
                success: function(jsonData, textStatus )
                {
                     Appyscript.hideIndicator();
                     var json_data=JSON.parse(jsonData);
                     console.log(json_data);
                     foodcourtselectoptiondataDinein = json_data;
                     /* radical : hotfix - patch */
                     fd_subCatSelectedData = json_data;
                     /* radical : hotfix - patch end*/
                     json_data.subcatid=subcatid;
                     json_data.categoryPage="1";
                     json_data.subcatname=subcatname;
                     json_data.subcatimage=subcatimage;
                     json_data.totalproduct=json_data.productList.length;
                    if(json_data.productList)
                    {
                        storeProductListDataDineIn(json_data)
                        venderSubCatProductDineIn=json_data;
                    }
                      openFoodDineInPage('dinein-subcate-list',json_data,'load');
                      updateDineInIcon();

                },error: function(error)
                {
                    Appyscript.hideIndicator();
                    console.log("Error " + error.code + " " + error.message);
                    Appyscript.alert(something_went_wrong_please_try_again );
                }
            });
        }
        else
        {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage  );
            updateDineInIcon();
        }
}




function storeProductListDataDineIn(arrproduct)
{
     if(arrproduct.productList.length > 0) {
      $$.each(arrproduct.productList, function(i, v) {
       storeFoodCourtProductListDataDineIn.productList.push(v);
      })
     }
     var cloneArray = {productList:[]};
     $$.each(storeFoodCourtProductListDataDineIn.productList, function(i, v) {
      cloneArray.productList.push(v);
     })
     storeFoodCourtProductListDataDineIn = cloneArray;
}

function GetsProductDetailsDataDineIn(piddd) {
     var ppdata = "";
     var a = storeFoodCourtProductListDataDineIn.productList;
        $$.each(a, function(i, vv)
        {
            if(vv.id == piddd )
            {
       var m = {};
       $$.each(vv, function(k, v) {
       m[k] = v;
       })
                ppdata = m;
            }
        })
        return ppdata;
}







var DineInProductSwiperIndex=0;
var totallength='0';
function foodCourtProductDetailDineIn(thisObj,productis)
{
    var id=$$(thisObj).attr("product-id");
    var pageName = $$(mainView.activePage.container).attr("data-page");
    var productdetailsdata='';
    if(pageName == 'dinein-Category')
    {
        productdetailsdata=venderCatProductDineIn
    }
    else
    {
        productdetailsdata=venderSubCatProductDineIn
    }
   for(j=0;j<productdetailsdata.productList.length;j++)
   {
        if(id == productdetailsdata.productList[j].id)
        {
            DineInProductSwiperIndex=j;
        }
   }
    totallength=productdetailsdata.productList.length;
    console.log("productdetailsdata++++     "+JSON.stringify(productdetailsdata));
    openFoodDineInPage('dinein-product-detail',productdetailsdata,'load');
    updateDineInIcon();
}

//******************* NEW CODE FOR MULTI SeLCETION************************//

var foodcourtactiveselect, foodcourtselectdata;
var maxFoodPriceDineInText;
function foodcourtselectoptionDineIn(a, index, title, currency) {
    foodcourtactiveselect = $$(a).parent().find("input");
    foodcourtselectdata = foodcourtselectoptiondataDinein.productList[DineInProductSwiperIndex].customOption[index];
    var currencySymbolfoodcourt = localStorage.getItem("currencySymbol");
    foodcourtselectdata.title = title;
    foodcourtselectdata.currency = currency;
    if (foodcourtselectdata.row != undefined) {
        var productListPriceArr = foodcourtselectdata.row;
        currencyFomatterSymbolProductList = foodcourtselectdata.currency;
        AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
        localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
        AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

        AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
       localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
       AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


        for (var key in productListPriceArr) {
            productListPriceArr[key].maxRow_Price = currencyFomatter(parseFloat(productListPriceArr[key].row_price));
        }
    }
    console.log("foodcourtselectdataDINE**       " + JSON.stringify(foodcourtselectdata));
    $$.get("popups/dinein-select.html", function(template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(foodcourtselectdata);
        Appyscript.popup(html)
    })
}




function addtocartkeyup(e,a,index,id){
    if(e.keyCode == 13){
        CartPageDineIn(a,index,id);
    }
}

var CustomeDatafoodcout = {};
Appyscript.onPageInit('dinein-select', function(page) {

    var thisSelect = $$(page.container).find(".foodcourt-select");
    var maxSelect = parseInt(thisSelect.attr("max"));
    console.log(thisSelect);
    console.log(maxSelect);

    thisSelect.find("li").click(function() {
        if (thisSelect.is(".multiselect")) {
            if (thisSelect.is(".none") && !$$(this).is(".on")) {
                return false;
            }
            if ($$(this).is(".on")) {
                $$(this).removeClass("on");
            } else {
                $$(this).addClass("on");
            }
            changeDataSelectfoodcourt();
        } else {
            //43831
            thisSelect.find("li").removeClass("on");
            $$(this).addClass("on");
        }
        event.stopImmediatePropagation();
    })


    if (foodcourtactiveselect.attr("index") != "") {
        var selectItems = foodcourtactiveselect.attr("index").split(",");
        $$.each(selectItems, function(i, v) {
            thisSelect.find("li").eq(v).addClass("on");
            changeDataSelectfoodcourt();
        })
    }

    function changeDataSelectfoodcourt() {
        if (thisSelect.is(".multiselect")) {
            if (thisSelect.find("li.on").length == maxSelect) {
                thisSelect.addClass("none");
            } else {
                thisSelect.removeClass("none");
            }
        }
    }
    var optionss = [];

    $$(".foodcourt-done").click(function() {
        var textfoodcourt = [];
        var indexfoodcourt = [];
        thisSelect.find("li").each(function(i) {
            if ($$(this).is(".on")) {
                textfoodcourt.push($$(this).attr("value"));
                indexfoodcourt.push(i);

                var jdata = {
                    "id": foodcourtselectdata.id,
                    "title": foodcourtselectdata.title,
                    "option_box": foodcourtselectdata.option_box,
                    "type": foodcourtselectdata.row[i].row_pricetype,
                    "price": foodcourtselectdata.row[i].row_price,
                    "name": foodcourtselectdata.row[i].row_title
                }
                optionss.push(jdata);

            }
        })
        foodcourtactiveselect.val(textfoodcourt.join(",")).attr("index", indexfoodcourt.join(","));
        Appyscript.popupClose();
        if (optionss.length != 0) {
            CustomeDatafoodcout[foodcourtselectdata.id] = optionss;
            localStorage.setItem("multipleselect", JSON.stringify(CustomeDatafoodcout));
        }

        var pageObj = $$(".foodcourt-product-swiper .foodcourt-product-swiper-slide").eq(foodCourtProductSwiperDineIn.activeIndex);
        var priceObj = pageObj.find("span[price]");
       	var price = parseFloat(priceObj.attr("price"));
        console.log("price: "+price);
        var updateprice = 0.00;
        withoffers = 0.00;

        var flagsfoodcout = 0
        console.log(CustomeDatafoodcout);
        $$.each(CustomeDatafoodcout, function(v, i) {
            flagsfoodcout = v;
            var aa = i;
            for (k = 0; k < i.length; k++) {
                var lll = aa[k].id;
                var thisVal = aa[k].price;
                var type = aa[k].type;
                if (type == "p") {
                    price = parseFloat(price) + parseFloat(thisVal);
                    updateprice = parseFloat(updateprice) + parseFloat(thisVal);
                } else {
                    price = parseFloat(price) - parseFloat(thisVal);
                    updateprice = parseFloat(updateprice) - parseFloat(thisVal);
                }
            }
        });

        if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
            price = 0;
        }
        var currencySymbol = localStorage.getItem("currencySymbol");
        currencySymbol = $$("<div>" + currencySymbol + "</div>").html().trim();
        var maxFoodPriceDineIn = currencyFomatter(parseFloat(price));
        maxFoodPriceDineInText = parseFloat(price);
        if (AppyTemplate.global.ecommCurrencySymbol) {
            priceObj.text(currencySymbol + " " + maxFoodPriceDineIn);
            //priceObj.text(parseFloat(price)).attr("indexData", JSON.stringify(indexArr));
            var newPriceObj = pageObj.find("span[updatePrice]");
            newPriceObj.text(currencySymbol + " " + maxFoodPriceDineIn);
        } else {
            priceObj.text(maxFoodPriceDineIn + "" + currencySymbol);
            var newPriceObj = pageObj.find("span[updatePrice]");
            newPriceObj.text(maxFoodPriceDineIn + "" + currencySymbol);
        }
    });

});



/*
     this method is use for add custome data in AddToCart
*/

/*function DineInChangeCustomData(obj){
    var pageObj = $$(".foodcourt-product-swiper .foodcourt-product-swiper-slide").eq(foodCourtProductSwiperDineIn.activeIndex);
    var priceObj = pageObj.find("span[price]");
	var price = parseFloat(priceObj.attr("price"));
	console.log("price: "+price);
	var indexArr = [];
	pageObj.find(".customOptions").each(function(i){
		var thisObj = $$(this);
		var thisVal = thisObj.val();
		if(thisVal != "-1" && ! isNaN(parseFloat(thisVal))){
		    var type = thisObj.find("option[value='"+thisVal+"']").attr("type");
            if(type == "p"){
                price += parseFloat(thisVal);
            }
            else{
                price -= parseFloat(thisVal);
            }
		}
		indexArr.push(thisObj[0].selectedIndex - 1);
	});

    console.log("JSON.stringify(indexArr)  "+JSON.stringify(indexArr));
	if(isNaN(parseFloat(price)) || parseFloat(price) < 0 ){
	    price=0;
	}
	var currencySymbol=localStorage.getItem("currencySymbol");
    currencySymbol = $$( "<div>" + currencySymbol + "</div>" ).html().trim();
    var maxFoodPriceDineIn = currencyFomatter(parseFloat(price));
    maxFoodPriceDineInText = parseFloat(price);
    if(AppyTemplate.global.ecommCurrencySymbol){
        priceObj.text(currencySymbol+" "+maxFoodPriceDineIn).attr("indexData", JSON.stringify(indexArr));
        //priceObj.text(parseFloat(price)).attr("indexData", JSON.stringify(indexArr));
        var newPriceObj = pageObj.find("span[updatePrice]");
        newPriceObj.text(currencySymbol+" "+maxFoodPriceDineIn);
	}else{
        priceObj.text(maxFoodPriceDineIn+""+currencySymbol).attr("indexData", JSON.stringify(indexArr));
        var newPriceObj = pageObj.find("span[updatePrice]");
        newPriceObj.text(maxFoodPriceDineIn+""+currencySymbol);
	}
}*/

//**********************************************************************//
/*
    this method is use for init product details page and handle sweeper

*/

var foodCourtProductSwiperDineIn=''
Appyscript.onPageInit('dinein-ProductDetail',function(page)
{
    setTimeout(function()
    {
        foodBanners = [];
        foodCourtProductSwiperDineIn = Appyscript.swiper('.foodcourt-product-swiper', {
            initialSlide:$$(".product-swiper").attr("index")
        });



        $$(".foodcourt-product-swiper .foodcourt-product-swiper-slide").each(function(i)
        {
            $$(this).find(".swiper-banner .preloader").remove();
            if($$(this).find(".swiper-banner .swiper-slide").length <= 1)
            {
				$$(this).find(".swiper-banner").find(".swiper-button-next, .swiper-button-prev").remove();
                foodBanners.push(null);
            }
            else
            {
				var a = Appyscript.swiper(".swiper-banner-" + i,{
                     pagination: '.banner-pagination-' + i,
                     paginationClickable: true,
					 nextButton: '.swiper-button-next-' + i,
			         prevButton: '.swiper-button-prev-' + i
                 });
                foodBanners.push(a);
            }
        });

        foodCourtProductSwiperDineIn.slideTo(DineInProductSwiperIndex,0, false);
        foodLockSwiper(foodCourtProductSwiperDineIn, totallength);

        foodCourtProductSwiperDineIn.on("SlideChangeEnd",function()
        {
            var activeIndex=foodCourtProductSwiperDineIn.activeIndex;
            foodLockSwiper(foodCourtProductSwiperDineIn, totallength);

        });
        Appyscript.hideIndicator();
    }, 100);
});












/*
    this method is qty input box
*/
function DineInFocusInput(a,inddd)
{
   setTimeout(function(){
   $$(".foodcourt-product-swiper .swiper-slide-active").find("input[id='quantity']").val($$(this).val())
	$$(mainView.activePage.container).find(".foodcourt-product-swiper-slide .swiper-slide-active")[0].scrollTop =  $$(a).parent()[0].offsetTop - 20;
 }, 600);
}

function DineInFocusInput2(a)
{
   setTimeout(function()
   {
	$$(mainView.activePage.container).find(".page-content")[0].scrollTop =  $$(a).parent()[0].offsetTop-60;
	 $$(".foodcourt-product-swiper .swiper-slide-active").find("input[id='quantity']").val($$(this).val())
 }, 600);
}

function DineInNext(a, e)
{
//	if (event.keyCode  == 9) {
//      	event.preventDefault();
//		return false;
//	}
 $$(".foodcourt-product-swiper .swiper-slide-active").find("input[id='quantity']").val($$(this).val())
}



function checkProductQtyDineIn(pid,quantityt)
{
    var checkval=true;
    if(foodCourtCartDataDineIn.productList.length > 0)
    {
        for(i=0;i<foodCourtCartDataDineIn.productList.length;i++)
        {
            if(foodCourtCartDataDineIn.productList[i].id == pid)
            {
                if(parseInt(foodCourtCartDataDineIn.productList[i].quantity) <  parseInt(quantityt)+ parseInt(foodCourtCartDataDineIn.productList[i].orderQuantity))
                {
                    checkval =false;
                }
                else
                {
                    checkval =true;
                }
            }
        }
    }
    else
    {
        checkval =true;
    }
    return checkval;
}



function CartPageDineIn(isfrom,indx,pid)
{
    var cartdata='';
    var id=pid;
    if(isfrom != 'cart')
    {
        var pageObj = $$(".foodcourt-product-swiper .foodcourt-product-swiper-slide").eq(foodCourtProductSwiper.activeIndex);
        var dataFlag = false;
        cartdata=GetsProductDetailsDataDineIn(id);

        for (k = 0; k < cartdata.customOption.length; k++) {
                            var cid = cartdata.customOption[k].id;
                            var crequired = cartdata.customOption[k].req;
                            if (crequired == '1') {
                                if (CustomeDatafoodcout.hasOwnProperty(cid)) {

                                } else {
                                    pageObj.find(".select").eq(k).addClass("error");
                                    //thisObj.addClass("error");
                                    dataFlag = true;
                                }
                            }
                        }

                        if(dataFlag)
                        {
Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_select_required_option);
                       return;
                        }
                        else{

        if(foodCourtCartDataDineIn.productList.length > 0 && foodCourtCartDataDineIn.vendeid != vandorIdDineIn)
        {
             Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.your_cart_data_will_be_delete_due_to_different_vendor_product,data.appData.appName,AppyTemplate.global.pageLanguageSetting.Yes,AppyTemplate.global.pageLanguageSetting.No,
             function()
             {
               foodCourtRulesDataDineIn='';
               foodCourtCartDataDineIn={"productList":[]};
               foodCourtCartDataDineIn.totalproduct=0;
               localStorage.setItem("ruledataconfig","");
               localStorage.setItem("foodCourtdata","");
               localStorage.setItem("storedetailsdata","");

               var postdataa= '{"method":"foodcourtConfigurationSettings","appId":"'+app_id+'", "vendorId":"'+vandorIdDineIn+'"}';
               serviceAPICallDineIn(postdataa,'figurationSettingsDineIn','','maincartold');


               foodCourtRulesDataDineIn=figurationSettingsDineIn;

               localStorage.setItem("ruledataconfig",JSON.stringify(foodCourtRulesDataDineIn));
               CourtCartPageDineIn(isfrom,indx,pid);
             },
             function()
             {
                  CourtCartPageDineIn("cart");
             }
             )
         }

         else
         {
            if(foodCourtCartDataDineIn.productList.length ==0)
             {
               var postdataa= '{"method":"foodcourtConfigurationSettings","appId":"'+app_id+'", "vendorId":"'+detailsdatadataDineIn.id+'"}';
               serviceAPICallDineIn(postdataa,'figurationSettingsDineIn','','maincartold');
             }
            CourtCartPageDineIn(isfrom,indx,pid);
         }
         }
     }
     else
     {
        CourtCartPageDineIn("cart");
     }
}


Appyscript.onPageAfterAnimation("*",function()
{
    if (mainView.activePage.name == "dinein-CartList")
    {
           var len=foodCourtCartDataDineIn.productList.length;
            if(len>0 || foodCourtCartDataDineIn.totalproduct>0)
            {
               $$.get("pages/dinein-product-cart-list.html", function (template)
              {
                  var compiledTemplate = AppyTemplate.compile(template);
                  var html = compiledTemplate(foodCourtCartDataDineIn);
                  mainView.router.reloadContent(html);
                  updateDineInIcon();
              });
            }
    }
})
var backpage
function CourtCartPageDineIn(isfrom,indx,pid)
{
 backpage=mainView.activePage.name;
    var dataString = "";
    var abc=[];
    var cartdata='';
    var kk='';
    var productQuantity=1;
    var id=pid;
    var custopt=false;
    var pageName=$$(mainView.activePage.container).attr("data-page");
    if(isfrom != 'cart')
    {
        cartdata=GetsProductDetailsDataDineIn(id);

        var len=0;
        if(cartdata.customOption)
        {
            len=cartdata.customOption.length;
        }
        if(len>0 && pageName !="dinein-ProductDetail")
        {
            foodCourtProductDetailDineIn(isfrom,pid)
            return;
        }


        var price=cartdata.price
        var productoldprice=cartdata.price
        if(pageName=="dinein-ProductDetail")
        {
               var priceSymbol = maxFoodPriceDineInText;
               if (isNaN(parseInt(priceSymbol))) {
                   cartdata.price = $$("#updatePrice" + foodCourtProductSwiper.activeIndex).text();
               } else {
                   cartdata.price = priceSymbol;
                   price = cartdata.price;
               }

               index = indx;
               productQuantity = parseInt($$(".foodcourt-product-swiper .foodcourt-product-swiper-slide").eq(index).find("input[id='quantity']").val());

               var len = cartdata.customOption.length;
               if (len > 0) {
                   var pageObj = $$(".foodcourt-product-swiper .foodcourt-product-swiper-slide").eq(foodCourtProductSwiper.activeIndex);
                   var dataFlag = false;
                   var status = true;
                   var flags = '0';
                   $$(".error").removeClass("error");
                   $$.each(CustomeDatafoodcout, function(k, j) {
                       for (h = 0; h < j.length; h++) {
                           // console.log(j);
                           var customdataoptionsfood = j
                           if (k != -1) {
                               if (flags == '0') {
                                   dataString += customdataoptionsfood[h].title + " : " + customdataoptionsfood[h].name;
                                   var custdata = {
                                       "title": customdataoptionsfood[h].title,
                                       "value": customdataoptionsfood[h].name
                                   }
                                   flags = k;
                               } else {


                                   if (flags == k) {
                                       flags = k;
                                       dataString += ", " + customdataoptionsfood[h].name;
                                   }
                                   //dataString += "|" + customdataoptionsfood[h].title, +" "+ customdataoptionsfood[h].name;
                                   else {

                                       flags = k;
                                       dataString += " | " + customdataoptionsfood[h].title + " : " + customdataoptionsfood[h].name;
                                   }


                                   //console.log(custdata);
                               }
                               var custdata = {
                                   "title": customdataoptionsfood[h].title,
                                   "value": customdataoptionsfood[h].name
                               }
                               abc.push(custdata);
                           }
                       }

                       if (foodCourtCartData.productList[foodCourtCartData.productList.length]) {
                           foodCourtCartData.productList[foodCourtCartData.productList.length].custom_optioncart = abc;
                       }
                   });

                   if (dataFlag) {
                       Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_select_required_option);
                       return;
                   }

                   if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
                       console.log(price);
                       Appyscript.alert(AppyTemplate.global.pageLanguageSetting.price_should_be_greater_than_zero);
                       return;
                   }

               }
            }
            if(isNaN(parseFloat(price)) || parseFloat(price)<=0)
            {
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.price_should_be_greater_than_zero);
                return;
            }
            cartdata.price=price;
            cartdata.productoldprice=productoldprice;
            if(isNaN(productQuantity))
            {
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_add_product_quantity);
                return;
            }
            if(productQuantity > parseInt(cartdata.quantity))
            {
                 Appyscript.alert(AppyTemplate.global.pageLanguageSetting.you_have_already_added_maximum_quantity_of_this_product_in_your_cart+".");
                 return;
            }


         var chk=  checkProductQtyDineIn(id,productQuantity);
         if(!chk)
         {
             Appyscript.alert(AppyTemplate.global.pageLanguageSetting.you_have_already_added_maximum_quantity_of_this_product_in_your_cart+".");
         }
         else
         {
            if(foodCourtCartDataDineIn.productList.length > 0 )
            {
                var addupdateflag=true;
                for(i=0;i<foodCourtCartDataDineIn.productList.length;i++)
                {
                    if(foodCourtCartDataDineIn.productList[i].id == id)
                    {
                        if(custopt)
                        {
                            if(foodCourtCartDataDineIn.productList[i].custom_option == dataString)
                            {
                                 addupdateflag=false;
                                 foodCourtCartDataDineIn.productList[i].orderQuantity=parseInt(foodCourtCartDataDineIn.productList[i].orderQuantity) + parseInt(productQuantity);
                                 break;
                            }
                        }
                        else
                        {
                            addupdateflag=false
                            foodCourtCartDataDineIn.productList[i].orderQuantity=parseInt(foodCourtCartDataDineIn.productList[i].orderQuantity) + parseInt(productQuantity);
                            break;
                        }
                    }
                }
                if(addupdateflag)
                {
                     var aa = cartdata;
                     aa.custom_optioncart = abc;
                     aa.custom_option = dataString;
                     aa.orderQuantity = productQuantity;
                     foodCourtCartDataDineIn.productList.unshift(aa);
                }
            }
            else{
                console.log(detailsdatadataDineIn.id);
                cartdata.custom_optioncart = abc;
                cartdata.custom_option = dataString;
                foodCourtCartDataDineIn.productList.push(cartdata);
                foodCourtCartDataDineIn.productList[0].orderQuantity = productQuantity;
                foodCourtCartDataDineIn.currency = cartdata.currency;
                foodCourtCartDataDineIn.tipamount = 0.00;
                foodCourtCartDataDineIn.tipval = 0;
                foodCourtCartDataDineIn.vendeid = detailsdatadataDineIn.id;
                foodCourtCartDataDineIn.vendorNameDineIn = detailsdatadataDineIn.name;
                foodCourtCartDataDineIn.address = detailsdatadataDineIn.address;
                foodCourtCartDataDineIn.storetime = detailsdatadataDineIn.storetime;
                foodCourtRulesDataDineIn = figurationSettingsDineIn;
                localStorage.setItem("ruledataconfig",JSON.stringify(foodCourtRulesDataDineIn));
                localStorage.setItem("storedetailsdata",JSON.stringify(detailsdatadataDineIn));
                if(detailsdatadataDineIn.configList)
                {
                    for(i=0;i<detailsdatadataDineIn.configList.length;i++)
                    {
                       if(detailsdatadataDineIn.configList[i].ConfigKey == 'store_mobile')
                       {
                           var  store_mobile = detailsdatadataDineIn.configList[i].ConfigValue.split("|||||").join(",");
                           foodCourtCartDataDineIn.store_mobile = store_mobile;
                       }
                       if(detailsdatadataDineIn.configList[i].ConfigKey == 'store_email')
                       {
                             var  store_email = detailsdatadataDineIn.configList[i].ConfigValue;
                             foodCourtCartDataDineIn.store_email=store_email
                       }
                    }
                }
            }
            showtoatmsgDineIn();
         }
    }





              var cartlength=foodCourtCartDataDineIn.productList.length;
              var subtotal=0.00;
              if(cartlength>0){
                  for(k=0;k<cartlength;k++){
                     var qty= foodCourtCartDataDineIn.productList[k].orderQuantity;
                     var pprice= (foodCourtCartDataDineIn.productList[k].price);

                     if(foodCourtCartDataDineIn.productList[k].offered=='1' && parseFloat(foodCourtCartDataDineIn.productList[k].offeredDiscount) > 0 ){
                        if(foodCourtCartDataDineIn.productList[k].custom_option){
                            subtotal += parseInt(qty) * parseFloat(pprice);
                        }
                        else{
                           var offeprice =(parseFloat(pprice) - ((parseFloat(pprice) * parseFloat(foodCourtCartDataDineIn.productList[k].offeredDiscount))/100));
                           subtotal += parseInt(qty) * parseFloat(offeprice);
                        }
                     }
                     else{
                          subtotal += parseInt(qty) * parseFloat(pprice);
                     }
                  }
                  foodCourtCartDataDineIn.subTotal=parseFloat(subtotal);
                  foodCourtCartDataDineIn.totalproduct=cartlength;
                  DineInCalculateAmount();
              }
              else{
                  foodCourtCartDataDineIn.totalproduct=0;
              }

     if(isfrom == 'cart'){
          openFoodDineInPage('dinein-product-cart-list',foodCourtCartDataDineIn,'load');
          updateDineInIcon();
     }
     else{
           updateDineInIcon();
           return;
     }

}


function showtoatmsgDineIn(){
    var mssgg=AppyTemplate.global.pageLanguageSetting.Product_successfully_Added_into_your_Cart;
    if(Appyscript.device.android){
        AppyPieNative.AddTocartToastMsg(mssgg);
    }
    else{
       window.location = "windowalert1:"+mssgg;
    }
}



function showfoodrangevalueDineIn()
{
    var cartData=localStorage.getItem("foodCourtdata");
     if(cartData !=undefined && cartData != ''){
       $$("#foodrangeValue").html($$("#foodiscountvalue").val() + " " + $$("#distance-slider-tab2 a.active").text());
       var tipval= $$("#foodiscountvalue").val();
       foodCourtCartDataDineIn.tipval=parseInt(tipval);


           var tipamount=foodCourtCartDataDineIn.tipamount;
           var tipval=foodCourtCartDataDineIn.tipval;
           if(tipval !=0 && tipval >0)
           {
           }
           else
           {
                foodCourtCartDataDineIn.tipamount=0.00;
                foodCourtCartDataDineIn.tipval=0;
           }
         DineInCalculateAmount();



         var currencySymbol=localStorage.getItem("currencySymbol");
         currencySymbol = $$( "<div>" + currencySymbol + "</div>" ).html().trim();

         foodCourtCartData.maxTipamount = currencyFomatter(parseFloat(foodCourtCartDataDineIn.tipamount));
         foodCourtCartData.maxGrandTotal = currencyFomatter(parseFloat(foodCourtCartDataDineIn.grandTotal));

         $$("#tivalue").show();


        if(AppyTemplate.global.ecommCurrencySymbol){
            $$("#grandTotal").find("span").text( currencySymbol+" "+foodCourtCartDataDineIn.maxGrandTotal);
            $$("#gtotal").find("span").text( currencySymbol+" "+foodCourtCartDataDineIn.maxGrandTotal);
            $$("#tivalue").find("span").text( currencySymbol+" "+foodCourtCartDataDineIn.maxTipamount);
        }else{
            $$("#grandTotal").find("span").text( foodCourtCartDataDineIn.maxGrandTotal+" "+currencySymbol);
            $$("#gtotal").find("span").text( foodCourtCartDataDineIn.maxGrandTotal+" "+currencySymbol);
            $$("#tivalue").find("span").text( foodCourtCartDataDineIn.maxTipamount+" "+currencySymbol);
        }
    }
}




function tipdetailsDineIn()
{
         if(foodCourtCartDataDineIn !=undefined && foodCourtCartDataDineIn != ''  && foodCourtCartDataDineIn.productList.length>0)
         {
            var tipamount=  foodCourtCartDataDineIn.tipamount;
            var tipval=  parseInt(foodCourtCartDataDineIn.tipval);
            $$("#foodiscountvalue").val(tipval);

            var sliderfoodiscountvalue = document.getElementById('datingYearGet');
            noUiSlider.create(sliderfoodiscountvalue,
            {
              start: [$$("#foodiscountvalue").val()],
              step:1,
              range: {
              'min': 0,
              'max': 100
              }

            });
            sliderfoodiscountvalue.noUiSlider.on('update', function( values, handle )
            {
                 $$("#foodiscountvalue").val(parseInt(values[0]));
                 showfoodrangevalueDineIn();
            });


           if(foodCourtCartDataDineIn.tipval !=0 && tipval >0)
           {
                $$("#tivalue").show();
           }
          else
          {
               foodCourtCartDataDineIn.tipamount=0.00;
               foodCourtCartDataDineIn.tipval=0;
              // $$("#tivalue").hide();
          }
        }
}

/*
    for cart page increase (+) and decrease cart product Qty.
*/
Appyscript.onPageInit('dinein-CartList',function(page)
{
    if(AppyTemplate.global.setting.is_tip_allowed){
        tipdetailsDineIn();
    }
    //var cartTemplate='<big>{{#if offered}}{{#if offeredDiscount}}<div class="price">{{format_currency currency}}{{js "parseFloat((this.price - this.price *  this.offeredDiscount / 100) * this.orderQuantity).toFixed(2)"}}</div><div class="oldPrice">{{format_currency currency}}{{js "parseFloat(this.price * this.orderQuantity).toFixed(2)"}}</div><div class="off">{{offeredDiscount}}% OFF</div>{{else}}<div class="price">{{format_currency currency}}{{js "parseFloat(this.price * this.orderQuantity).toFixed(2)"}}</div>{{/if}}{{else}}<div class="price">{{format_currency currency}}{{js "parseFloat(this.price * this.orderQuantity).toFixed(2)"}}</div>	{{/if}}</big>';
var cartTemplate='<big> {{#if offered}} {{#if offeredDiscount}} {{#if custom_optioncart}} <div class="price" style="color:{{@global.styleAndNavigation.activeColor}}">{{#if @global.ecommCurrencySymbol}}{{format_currency currency}}{{orderQuantityyprice this.price this.orderQuantity}}{{else}}{{orderQuantityyprice this.price this.orderQuantity}}{{format_currency currency}}{{/if}}</div> <div class="oldPrice">{{format_currency currency}}{{js " parseFloat(this.productoldprice * this.orderQuantity).toFixed(2)"}}</div> <div class="off">{{offeredDiscount}}% OFF</div> {{else}} <div class="price" style="color:{{@global.styleAndNavigation.activeColor}}">{{#if @global.ecommCurrencySymbol}}{{format_currency currency}}{{js "parseFloat((this.price - this.price * this.offeredDiscount / 100) * this.orderQuantity)"}}{{else}}{{js "parseFloat((this.price - this.price * this.offeredDiscount / 100) * this.orderQuantity)"}}{{format_currency currency}}{{/if}}</div> <div class="oldPrice">{{format_currency currency}}{{orderQuantityyprice this.price this.offeredDiscount}}</div> <div class="off">{{offeredDiscount}}% OFF</div> {{/if}} {{else}} <div class="price">{{#if @global.ecommCurrencySymbol}}{{format_currency currency}}{{orderQuantityyprice this.price this.offeredDiscount}}{{else}}{{orderQuantityyprice this.price this.offeredDiscount}}{{format_currency currency}}{{/if}}</div> {{/if}} {{else}} <div class="price">{{#if @global.ecommCurrencySymbol}}{{format_currency currency}}{{orderQuantityyprice this.price this.offeredDiscount}}{{else}}{{orderQuantityyprice this.price this.offeredDiscount}}{{format_currency currency}}{{/if}}</div> {{/if}} </big>'
    $$(".product_box_dinein").each(function()
    {
        var thisP = $$(this);
        var quantity = parseInt(thisP.find(".qty").val());
        thisP.find(".less").on("click",function(){
            var index=thisP.attr("index");
            if(quantity != 1)
            {
                quantity--;
                thisP.find(".qty").val(quantity);
                console.log(index);
                foodCourtCartDataDineIn.productList[index].orderQuantity=quantity;
                var compiledTemplate = AppyTemplate.compile(cartTemplate);
                var html = compiledTemplate(foodCourtCartDataDineIn.productList[index]);
                thisP.find(".product_price").html(html);
                DineinUpdateCartData();
                DineInUpdateCartPage();
            }
        });
        thisP.find(".add").on("click",function(){
            var index=thisP.attr("index");
            quantity++;
            console.log(quantity+"     quan    "+index+"  quantity   "+foodCourtCartDataDineIn.productList[index].quantity);

            var totalQuantity=foodCourtCartDataDineIn.productList[index].quantity;
            if(quantity > totalQuantity && foodCourtCartDataDineIn.productList[index].orderOutofstock!= "0")
            {
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.you_have_already_added_maximum_quantity_of_this_product_in_your_cart);
                quantity--;
            }
            else
            {
                thisP.find(".qty").val(quantity);
                foodCourtCartDataDineIn.productList[index].orderQuantity=quantity;
                var compiledTemplate = AppyTemplate.compile(cartTemplate);
                var html = compiledTemplate(foodCourtCartDataDineIn.productList[index]);
                thisP.find(".product_price").html(html);
                DineinUpdateCartData();
                DineInUpdateCartPage();
            }
        });
        thisP.find(".delete").on("click",function()
        {

            var index=thisP.attr("index");
            thisP.remove();
            foodCourtCartDataDineIn.totalproduct--;
            foodCourtCartDataDineIn.productList.splice(index,1);
            DineinUpdateCartData();
            DineInUpdateCartPage();
            DineInupdateCartBoxIndex();
        });
    });
		setTimeout(function()
		{
            var highestBox = 0;
            $$('.foodEqhight').each(function()
            {
                if($$(this).height() > highestBox)
                {
                    highestBox = $$(this).height();
                }
            });
            $$('.foodEqhight').css('height', highestBox+'px');
		},200);


		if(foodCourtCartDataDineIn.couponDiscount)
        {
            //$$("#coupanPrice").show();
             //$$("#coupanPrice").find("span").text( foodCourtCartDataDineIn.currency+" "+parseFloat(foodCourtCartDataDineIn.couponDiscount).toFixed(2));
             var currencySymbol=localStorage.getItem("currencySymbol");
             var currency = $$( "<div>" + currencySymbol + "</div>" ).html().trim();
             var mantri='<small style="color:'+AppyTemplate.global.styleAndNavigation.activeColor+'; font-size: 16px!important;">- </small> '+ currencySymbol+''+parseFloat(foodCourtCartDataDineIn.couponDiscount);
             $$("#coupanPrice").show().find("span").html(mantri);
        }
        else
        {
             $$("#coupanPrice").hide();
        }
});


function DineInupdateCartBoxIndex()
{
    var index=0;
    $$(".cart-page .product_box_dinein").each(function()
    {
        var thisP = $$(this);
        thisP.attr("index", index);
        index++;
    });
}

function DineinUpdateCartData()
{
    var len=foodCourtCartDataDineIn.productList.length;
    if(len==0 || foodCourtCartDataDineIn.totalproduct==0)
    {
        foodCourtCartDataDineIn={"productList":[]};
        foodCourtCartDataDineIn.totalproduct=0;
        localStorage.setItem("ruledataconfig","");
        localStorage.setItem("foodCourtdata","");
        localStorage.removeItem("foodCourtdata");
        $$.get("pages/dinein-product-cart-list.html", function (template)
        {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(foodCourtCartDataDineIn);
            mainView.router.reloadContent(html);
            updateDineInIcon();
        });
        return;
    }

    var discount='0.00';
    var subTotal=0;
    for(var i=0; i<len; i++)
    {
        var productData=foodCourtCartDataDineIn.productList[i];
        var price=0.00;
        if(productData.offered==1)
        {
            if(productData.custom_option)
            {
                price= (productData.price);
            }
            else
            {
                discount=parseFloat(discount);
                price = productData.price - productData.price * productData.offeredDiscount/100;
                discount= discount+(productData.price-price) * productData.orderQuantity;
            }

        }
        else
        {
            price= (productData.price);
        }
        foodCourtCartDataDineIn.currency=productData.currency;
        subTotal =subTotal+productData.orderQuantity * price;
    }

    foodCourtCartDataDineIn.subTotal=parseFloat(subTotal);
    DineInCalculateAmount();
}

function DineInUpdateCartPage()
{
    if(foodCourtCartDataDineIn.totalproduct==0)
    {
        return;
    }

    if (foodCourtCartDataDineIn.productList != undefined && foodCourtCartDataDineIn.productList.length) {
        var productListPriceArr = foodCourtCartDataDineIn.productList;
        currencyFomatterSymbolProductList = foodCourtCartDataDineIn.productList[0].currency;

        AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
        localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
        AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

        AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
       localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
       AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

        for (var key in productListPriceArr) {
            productListPriceArr[key].maxPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].price));
            productListPriceArr[key].maxoldPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].productoldprice));
        }

        foodCourtCartDataDineIn.maxTaxPrice = currencyFomatter(parseFloat(foodCourtCartDataDineIn.taxPrice));
        foodCourtCartDataDineIn.maxSubTotal = currencyFomatter(parseFloat(foodCourtCartDataDineIn.subTotal));
        foodCourtCartDataDineIn.maxCouponDiscount = currencyFomatter(parseFloat(foodCourtCartDataDineIn.couponDiscount));
        foodCourtCartDataDineIn.maxTipamount = currencyFomatter(parseFloat(foodCourtCartDataDineIn.tipamount));
        foodCourtCartDataDineIn.maxVendordiscount = currencyFomatter(parseFloat(foodCourtCartDataDineIn.vendordiscount));
        foodCourtCartDataDineIn.maxDiscountPrice = currencyFomatter(parseFloat(foodCourtCartDataDineIn.discountPrice));
        foodCourtCartDataDineIn.maxGrandTotal = currencyFomatter(parseFloat(foodCourtCartDataDineIn.grandTotal));
        if (foodCourtCartDataDineIn.miscTax != undefined) {
            var miscTaxArr = foodCourtCartDataDineIn.miscTax.list;
            for (var key in miscTaxArr) {
                miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
            }
        }
    }

    console.log("foodCourtCartDataDineIn+++++   "+JSON.stringify(foodCourtCartDataDineIn))
    var currencySymbol=localStorage.getItem("currencySymbol");
    var currency = $$( "<div>" + currencySymbol + "</div>" ).html().trim();

    if(AppyTemplate.global.ecommCurrencySymbol){
        $$("#grandTotal").find("span").text( currency+""+foodCourtCartDataDineIn.maxGrandTotal);
        $$("#gtotal").find("span").text( currency+""+foodCourtCartDataDineIn.maxGrandTotal);
        $$("#subtotalecom").find("span").text( currency+""+foodCourtCartDataDineIn.maxSubTotal);
    }else{
        $$("#grandTotal").find("span").text( foodCourtCartDataDineIn.maxGrandTotal+" "+currency);
        $$("#gtotal").find("span").text( foodCourtCartDataDineIn.maxGrandTotal+" "+currency);
        $$("#subtotalecom").find("span").text( foodCourtCartDataDineIn.maxSubTotal+" "+currency);
    }

    if(foodCourtCartDataDineIn.couponDiscount)
    {
        var mantri='<small style="color:'+AppyTemplate.global.styleAndNavigation.activeColor+'; font-size: 16px!important;">- </small> '+ currency+''+parseFloat(foodCourtCartDataDineIn.couponDiscount);
        $$("#coupanPrice").show().find("span").html(mantri);
    }
    else
    {
         $$("#coupanPrice").hide();
    }
    $$.get("pages/dinein-product-cart-list.html", function (template){
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(foodCourtCartDataDineIn);
        var btn = document.createElement("html");
        btn.innerHTML=html;
        $$(mainView.activePage.container).find(".pay-mobile-cart").html($$(btn).find(".pay-mobile-cart").html())
        $$(btn).find(".user_tab .product_price").each(function(i){
            $$(mainView.activePage.container).find(".user_tab .product_price").eq(i).html($$(this).html());
        });

        updateDineInIcon();
        if(foodCourtCartDataDineIn.couponDiscount){
                var mantri='<small style="color:'+AppyTemplate.global.styleAndNavigation.activeColor+'; font-size: 16px!important;">-</small> '+ currency+''+parseFloat(foodCourtCartDataDineIn.couponDiscount);
                $$("#coupanPrice").show().find("span").html(mantri);
        }
        else{
             $$("#coupanPrice").hide();
        }
        tipdetailsDineIn();
    });
}





function arraysEqualDineIn(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

/*
     this method is use for add custome data in AddToCart
*/
function DineInChangeCustomData(obj)
{
    var pageObj = $$(".foodcourt-product-swiper .foodcourt-product-swiper-slide").eq(foodCourtProductSwiperDineIn.activeIndex);
    var priceObj = pageObj.find("span[price]");
	var price = parseFloat(priceObj.attr("price"));
	console.log("price: "+price);
	var indexArr = [];
	pageObj.find(".customOptions").each(function(i)
	{
		var thisObj = $$(this);
		var thisVal = thisObj.val();
		if(thisVal != "-1" && ! isNaN(parseFloat(thisVal)))
		{
		    var type = thisObj.find("option[value='"+thisVal+"']").attr("type");
            if(type == "p")
            {
                price += parseFloat(thisVal);
            }
            else
            {
                price -= parseFloat(thisVal);
            }
		}
		indexArr.push(thisObj[0].selectedIndex - 1);
	});

    console.log("JSON.stringify(indexArr)  "+JSON.stringify(indexArr));
	if(isNaN(parseFloat(price)) || parseFloat(price) < 0 )
	{
	    price=0;
	}




	priceObj.text(parseFloat(price).toFixed(2)).attr("indexData", JSON.stringify(indexArr));
	var newPriceObj = pageObj.find("span[updatePrice]");
	newPriceObj.text(parseFloat(price).toFixed(2));
}

/*
     this method is use for Appy coupon on cart page.
 */
 function ApplyDineInCourtCouponCode(thisObj){
     var couponCode = $$("#couponCode").val();
     if(couponCode.trim()==''){
         Appyscript.alert(AppyTemplate.global.pageLanguageSetting.enter_your_coupon_code_if_you_have_one_food);
         return;
     }
     if(isOnline()){
         Appyscript.showIndicator();
         var postdatacoupan='{"method":"foodCoupon","appId":"'+app_id+'","couponCode":"'+couponCode+'","vendorId":"'+foodCourtCartDataDineIn.vendeid+'"}';
         console.log("postdatacoupan  "+postdatacoupan  +"  baseURL  "+baseURL);
         $$.ajax({
              url: baseURL,
              data:Appyscript.validateJSONData(postdatacoupan),
              type: "post",
              //321 headers: {'accessToken': deviceEncryptedToken},

              timeout: 10000,
              async: true,
              success: function(jsonData, textStatus){
                 Appyscript.hideIndicator();
                 var new_data=JSON.parse(jsonData);
                 console.log(new_data);
                 if(new_data['status']=='success'){
                     Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Coupon_Applied);
                     foodCourtCartDataDineIn.couponType = new_data.coupon.discountType;
                     foodCourtCartDataDineIn.couponDiscount = new_data.coupon.couponDiscount;
                     foodCourtCartDataDineIn.couponActualDiscount = new_data.coupon.couponDiscount;
                     foodCourtCartDataDineIn.couponCodeForCheckout = new_data.coupon.couponcode;
                     DineinUpdateCartData();
                     DineInUpdateCartPage();
                 }
                 else{
                     Appyscript.alert(AppyTemplate.global.pageLanguageSetting.coupon_not_valid_food);
                 }
              },error: function(error){
                  Appyscript.hideIndicator();
                  Appyscript.alert(something_went_wrong_please_try_again );
                  console.log("Error: " + error.code + " " + error.message);
              }
         });
     }
     else{
     	Appyscript.hideIndicator();
     	Appyscript.alert(internetconnectionmessagez);
     }
 }
/*
    this method is use for calculate sub & Grand total amount for Cart and payments
*/
function DineInCalculateAmount()
{
    var subTotal= parseFloat(foodCourtCartDataDineIn.subTotal);
    console.log("DineInCalculate****   "+subTotal);
    var currency=foodCourtCartDataDineIn.currency;
    var grandTotal=parseFloat(subTotal);
    var discount=foodCourtRulesDataDineIn.discount;
    var tax=foodCourtRulesDataDineIn.tax;
    var shipping=foodCourtRulesDataDineIn.delivery;
    var miscTax=foodCourtRulesDataDineIn.miscTax;











    if(detailsdatadataDineIn)
    {
        if(detailsdatadataDineIn.vendor_discount)
        {
            var vv=parseFloat(detailsdatadataDineIn.vendor_discount);
            var vendordiscount=((subTotal * vv)/100);
            grandTotal=parseFloat(grandTotal) - parseFloat(vendordiscount);
            foodCourtCartDataDineIn.vendordiscount=parseFloat(vendordiscount);
        }
        else
        {
            foodCourtCartDataDineIn.vendordiscount=0.00;
        }
    }




    var discountPricetemp='0.00';
    var discountRatetemp='';
    if(discount)
    {
        for(var i=0; i<discount.length; i++)
        {
            var discountPrice=discount[i].discountPrice;
            var discountRate=discount[i].discountType;
            var discountRule=discount[i].discountRule;
            var totalAmount=discount[i].totalAmount;

            if(discountRule == '=' )
            {
                if(parseFloat(subTotal) ==  parseFloat(totalAmount))
                {
                    if(discountRate == 'Flat')
                    {
                        if(parseFloat(discountPrice) > parseFloat(subTotal))
                        {
                            discountPrice=subTotal;
                        }
                    }
                    else
                    {
                        discountPrice=((parseFloat(subTotal) * parseFloat(discountPrice))/100);
                    }

                  if(foodCourtCartDataDineIn.vendordiscount !=0.00)
                  {
                        var temmmm = parseFloat(discountPrice) +  parseFloat(foodCourtCartDataDineIn.vendordiscount);
                        if(temmmm > subTotal)
                        {
                            discountPrice =  parseFloat(subTotal) - parseFloat(foodCourtCartDataDineIn.vendordiscount);
                        }
                  }
                   grandTotal=parseFloat(grandTotal) - parseFloat(discountPrice);
                   discountPricetemp=discountPrice;
                   discountRatetemp=discountRate;
                   break;
                 }
             }
             else if(discountRule == '>=')
             {
                  if(parseFloat(subTotal) >=  parseFloat(totalAmount))
                  {
                     if(discountRate == 'Flat')
                     {
                        if(parseFloat(discountPrice) > parseFloat(subTotal))
                        {
                            discountPrice=subTotal;
                        }
                     }
                     else
                     {
                         discountPrice=((parseFloat(subTotal) * parseFloat(discountPrice))/100);
                     }
                  if(foodCourtCartDataDineIn.vendordiscount !=0.00)
                  {
                        var temmmm = parseFloat(discountPrice) +  parseFloat(foodCourtCartDataDineIn.vendordiscount);
                        if(temmmm > subTotal)
                        {
                              discountPrice =  parseFloat(subTotal) - parseFloat(foodCourtCartDataDineIn.vendordiscount);
                        }
                  }
                   grandTotal = parseFloat(grandTotal) - parseFloat(discountPrice);
                   discountPricetemp=discountPrice;
                   discountRatetemp=discountRate;
                   break;
                  }
             }
        }
    }




                if(foodCourtCartDataDineIn.couponActualDiscount)
               {
                   if(foodCourtCartDataDineIn.couponType == "percentage")
                   {
                        couponDiscount=((parseFloat(subTotal) * parseFloat(foodCourtCartDataDineIn.couponActualDiscount))/100);
                   }
                   else
                   {
                       if(parseFloat(foodCourtCartDataDineIn.couponActualDiscount) >= parseFloat(subTotal))
                       {
                           couponDiscount=subTotal;
                       }
                       else
                       {
                           couponDiscount=foodCourtCartDataDineIn.couponActualDiscount;
                       }
                   }


                  if(foodCourtCartDataDineIn.vendordiscount !=0.00)
                  {
                      var temm = parseFloat(couponDiscount) + parseFloat(foodCourtCartDataDineIn.vendordiscount);
                      if(temm > subTotal)
                      {
                            if(couponDiscount > foodCourtCartDataDineIn.vendordiscount)
                            {
                          couponDiscount=parseFloat(couponDiscount) - parseFloat(foodCourtCartDataDineIn.vendordiscount);
                            }
                            else
                            {
                                couponDiscount=parseFloat(foodCourtCartDataDineIn.vendordiscount) - parseFloat(couponDiscount);
                            }
                      }

                  }
                  if(discountPricetemp !=0.00)
                  {
                       var temm = parseFloat(couponDiscount) + parseFloat(foodCourtCartDataDineIn.vendordiscount) + parseFloat(discountPricetemp);
                       if(temm > subTotal)
                       {
                            var ttt=parseFloat(foodCourtCartDataDineIn.vendordiscount) + parseFloat(discountPricetemp);
                           if(subTotal > ttt)
                           {
                              var  couponDiscounttt = subTotal - ttt;  // t=20 -18 =2  ,  c=10  if(c>t) c=t
                              if( couponDiscount > couponDiscounttt)
                              {
                                couponDiscount=couponDiscounttt;
                              }
                           }
                           else if(couponDiscount > discountPricetemp)
                           {
                                couponDiscount=parseFloat(couponDiscount) - parseFloat(discountPricetemp);
                           }
                           else
                           {
                             couponDiscount=parseFloat(discountPricetemp) - parseFloat(couponDiscount);
                           }
                       }
                  }
                  var temm = parseFloat(discountPricetemp) + parseFloat(foodCourtCartDataDineIn.vendordiscount);
                  if(temm == subTotal)
                  {
                    couponDiscount=0.00;
                  }

                   grandTotal=parseFloat(grandTotal) - parseFloat(couponDiscount);
                   foodCourtCartDataDineIn.couponDiscount=parseFloat(couponDiscount);
               }
               else
               {
                   foodCourtCartDataDineIn.couponDiscount=0.00;
               }








    //var tipamount=foodCourtCartDataDineIn.tipamount;
    var tipval=foodCourtCartDataDineIn.tipval;
    if(tipval !=0 && tipval >0)
    {
        var tipamounttemp=((parseFloat(subTotal) * parseFloat(foodCourtCartDataDineIn.tipval))/100);
        grandTotal=parseFloat(grandTotal) + parseInt(tipamounttemp);
        foodCourtCartDataDineIn.tipamount=parseInt(tipamounttemp);
    }



    var taxPricetemp='0.00';
    var taxRatetemp='';
    if(tax)
    {
        for(i=0;i<tax.length;i++)
        {
              var taxPrice=tax[i].taxPrice;
              var taxRate=tax[i].taxRate;
              var taxRule=tax[i].taxRule;
              var totalAmount=tax[i].totalAmount;

               if(taxRule == '=' )
               {
                   if(parseFloat(subTotal) == parseFloat(totalAmount))
                   {
                        if(taxPrice == 'Tax Free')
                       {
                            taxPricetemp='0.00';
                            break;
                       }
                       else
                       {
                           if(taxRate == 'Flat')
                           {
                                grandTotal=parseFloat(grandTotal) + parseFloat(taxPrice);
                                taxPricetemp=taxPrice;
                                taxRatetemp=taxRate;
                                break;
                           }
                           else
                           {
                                 taxPrice=((parseFloat(subTotal) * parseFloat(taxPrice))/100);
                                 grandTotal=parseFloat(grandTotal) + parseFloat(taxPrice);
                                 taxPricetemp=taxPrice;
                                 taxRatetemp=taxRate;
                                 break;
                           }
                       }
                    }
                }
                else if(taxRule == '>=')
                {
                       if(parseFloat(subTotal) >= parseFloat(totalAmount))
                       {
                            if(taxPrice == 'Tax Free')
                           {
                                taxPricetemp='0.00';
                                break;
                           }
                           else
                           {
                               if(taxRate == 'Flat')
                               {
                                    grandTotal=parseFloat(grandTotal) + parseFloat(taxPrice);
                                    taxPricetemp=taxPrice;
                                    taxRatetemp=taxRate;
                                    break;
                               }
                               else
                               {
                                     taxPrice=((parseFloat(subTotal) * parseFloat(taxPrice))/100);
                                     grandTotal=parseFloat(grandTotal) + parseFloat(taxPrice);
                                     taxPricetemp=taxPrice;
                                     taxRatetemp=taxRate;
                                     break;
                               }
                           }
                        }
                }
        }
    }

  //Delivery  e
  var shippingPricetemp='0.00';
  var shippingRatetemp='';

    var miscTaxData = {"list":[]};
    if(miscTax)
    {
        for(i=0 ;i<miscTax.length; i++)
        {
          var taxRate=miscTax[i].taxRate;
          var taxAmount=miscTax[i].taxAmount;
          var taxType=miscTax[i].taxType;
          var id=miscTax[i].id;
          if(taxRate == 'Flat')
          {
            grandTotal=parseFloat(grandTotal) + parseFloat(taxAmount);
          }
          else
          {
            taxAmount=((parseFloat(subTotal) * parseFloat(taxAmount))/100);
            grandTotal=parseFloat(grandTotal) + parseFloat(taxAmount);
          }

          var mistaxx =	{
              "id": id,
              "taxRate": taxRate,
              "taxAmount": parseFloat(taxAmount),
              "taxType": taxType,
              "currency": currency,
              "tax": parseFloat(taxAmount)
          }
          miscTaxData.list.push(mistaxx);
        }
    }
    foodCourtCartDataDineIn.taxPrice=parseFloat(taxPricetemp);
    foodCourtCartDataDineIn.taxRate= taxRatetemp;
    if(discountPricetemp=="0.00")
    {
        foodCourtCartDataDineIn.discountPrice= 0.00;
    }
    else
    {
        foodCourtCartDataDineIn.discountPrice= parseFloat(discountPricetemp);
    }
    foodCourtCartDataDineIn.discountRate=discountRatetemp;
    foodCourtCartDataDineIn.miscTax=miscTaxData;

    if(grandTotal <= 0){
        grandTotal = 0.0;
    }
    foodCourtCartDataDineIn.grandTotal=parseFloat(grandTotal);

    if (foodCourtCartDataDineIn.productList != undefined && foodCourtCartDataDineIn.productList.length) {
        var productListPriceArr = foodCourtCartDataDineIn.productList;
        currencyFomatterSymbolProductList = foodCourtCartDataDineIn.productList[0].currency;

        AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
        localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
        AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

        AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
       localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
       AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

        for (var key in productListPriceArr) {
            productListPriceArr[key].maxPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].price));
            productListPriceArr[key].maxoldPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].productoldprice));
        }
        foodCourtCartDataDineIn.maxTaxPrice = currencyFomatter(parseFloat(foodCourtCartDataDineIn.taxPrice));
        foodCourtCartDataDineIn.maxSubTotal = currencyFomatter(parseFloat(foodCourtCartDataDineIn.subTotal));
        foodCourtCartDataDineIn.maxCouponDiscount = currencyFomatter(parseFloat(foodCourtCartDataDineIn.couponDiscount));
        foodCourtCartDataDineIn.maxTipamount = currencyFomatter(parseFloat(foodCourtCartDataDineIn.tipamount));
        foodCourtCartDataDineIn.maxVendordiscount = currencyFomatter(parseFloat(foodCourtCartDataDineIn.vendordiscount));
        foodCourtCartDataDineIn.maxDiscountPrice = currencyFomatter(parseFloat(foodCourtCartDataDineIn.discountPrice));
        foodCourtCartDataDineIn.maxGrandTotal = currencyFomatter(parseFloat(foodCourtCartDataDineIn.grandTotal));
        if (foodCourtCartDataDineIn.miscTax != undefined) {
            var miscTaxArr = foodCourtCartDataDineIn.miscTax.list;
            for (var key in miscTaxArr) {
                miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
            }
        }
    }
    console.log("foodCourtCartData  ++ " + JSON.stringify(foodCourtCartData));

    localStorage.setItem("foodCourtdata",JSON.stringify(foodCourtCartDataDineIn));
    updateDineInIcon();
}



Appyscript.onPageInit('*', function (page)
{

if(mainView.activePage){
  var cou=mainView.activePage.name.split("-")[0];
  if(cou=="dinein")
  {
    updateDineInIcon();
    $$("#locationfooscourt").html(AppyTemplate.global.CurrentCity);
  }
  }
});


function updateDineInIcon()
{
    var cartData=localStorage.getItem("foodCourtdata");
    if(cartData !=undefined && cartData != '')
    {
        var cartData=localStorage.getItem("foodCourtdata");
        cartData=JSON.parse(cartData);
        AppyTemplate.global.foodCartCount=cartData.productList.length;
        $$(".localHeaderIconRight .subValue").show();
        $$(".localHeaderIconRight .subValue").text(cartData.productList.length);
    }
    else
    {
        $$(".localHeaderIconRight .subValue").hide();
        AppyTemplate.global.foodCartCount='';
    }
}











/*
            ---------------------------------------------------------------------------   Checkout page ---------------------------------------------------------------------------------
*/

function DineInContinueCheckout() {



    if (foodCourtCartDataDineIn.couponCodeForCheckout) {

        var couponCode = foodCourtCartDataDineIn.couponCodeForCheckout;
        if (couponCode.trim() == '') {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.enter_your_coupon_code_if_you_have_one_food);
            return;
        }
        if (isOnline()) {
            Appyscript.showIndicator();
            var postdatacoupan = '{"method":"foodCoupon","appId":"' + app_id + '","couponCode":"' + couponCode + '","vendorId":"' + foodCourtCartDataDineIn.vendeid + '"}';
            console.log("postdatacoupan  " + postdatacoupan + "  baseURL  " + baseURL);
            $$.ajax({
                url: baseURL,
                data: Appyscript.validateJSONData(postdatacoupan),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                timeout: 10000,
                async: true,
                success: function(jsonData, textStatus) {
                    Appyscript.hideIndicator();
                    var new_data = JSON.parse(jsonData);
                    console.log(new_data);
                    if (new_data['status'] == 'success') {
                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Coupon_Applied);
                        foodCourtCartDataDineIn.couponType = new_data.coupon.discountType;
                        foodCourtCartDataDineIn.couponDiscount = new_data.coupon.couponDiscount;
                        foodCourtCartDataDineIn.couponActualDiscount = new_data.coupon.couponDiscount;
                        foodCourtCartDataDineIn.couponCodeForCheckout = new_data.coupon.couponcode;
                        DineinUpdateCartData();
                        DineInUpdateCartPage();
                        Appyscript.showIndicator();
                        var email = localStorage.getItem("email");
                        if (email == undefined || email == "") {
                            Appyscript.showIndicator();
                            Appyscript.loginPage("true");
                            return;
                        }
                        Appyscript.showIndicator();
                        DineInvenddetails(foodCourtCartDataDineIn.vendeid, 'maincartold', 'chekout')

                    } else {
                        foodCourtCartDataDineIn.couponDiscount = 0.00;
                        foodCourtCartDataDineIn.couponActualDiscount = 0.00;
                        foodCourtCartDataDineIn.couponCodeForCheckout = "";
                        foodCourtCartDataDineIn.couponType = "";
                        DineinUpdateCartData();
                        DineInUpdateCartPage();
                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.coupon_not_valid_food);
                    }
                },
                error: function(error) {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again);
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        } else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage);
        }

    } else {
        var email = localStorage.getItem("email");
        if (email == undefined || email == "") {
            Appyscript.showIndicator();
            Appyscript.loginPage("true");
            return;
        }
        Appyscript.showIndicator();
        DineInvenddetails(foodCourtCartDataDineIn.vendeid, 'maincartold', 'chekout')
    }
}




var totalPickupETA = 0;
var totalDeliveryETA = 0;

function ContinueCheckoutnewDineIn()
{
  var timedetails=getStoreTimeDineIn(detailsdatadataDineIn);
  console.log(JSON.stringify(timedetails))
    if(timedetails.storetime)
    {
        if((timedetails.storetime.preferredDeliveryTimeReq =='0' || timedetails.storetime.preferredDeliveryTimeReq =='1' || timedetails.storetime.preferredDeliveryTimeReq =='2') &&  (timedetails.storetime.todaystime ==AppyTemplate.global.pageLanguageSetting.closed))
        {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.this_time_order_will_not_be_accepted );
            Appyscript.hideIndicator();
            return ;
        }
    }

    var t = new Date();
    var chour = t.getHours();
    var cminute = t.getMinutes();
    cminute = cminute +1;



      var Hours = chour +  Math.trunc(cminute /60);
      var Minutes =  cminute  % 60;

    totalDeliveryETA = Hours +":" + Minutes;
    totalPickupETA= Hours +Minutes;


      if(foodCourtRulesDataDineIn.otherRules.preferredDeliveryTimeReq =='0')
        {
            var pickupDuration= cminute + parseInt(foodCourtRulesDataDineIn.otherRules.pickupMinDuration);
            var pickupHours = chour +  Math.trunc(pickupDuration/60);
            var pickupMinutes =  pickupDuration % 60;



      totalPickupETA = pickupHours +":"+pickupMinutes;
    //  foodCourtCartDataDineIn.totalPickupETA=totalPickupETA;
      console.log("preferredDeliveryTimeReq "+pickupHours +":"+ pickupMinutes);
 }
 else if(foodCourtRulesDataDineIn.otherRules.preferredDeliveryTimeReq =='1')
 {
      var deliveryMinDuration =  cminute +  parseInt(foodCourtRulesDataDineIn.otherRules.deliveryMinDuration) ;
      var deliveryHours = chour + Math.trunc(deliveryMinDuration/60);
      var deliveryMinutes = deliveryMinDuration % 60;


    totalDeliveryETA = deliveryHours +":" + deliveryMinutes;
   // foodCourtCartDataDineIn.totalDeliveryETA=totalDeliveryETA;
    console.log("preferredDeliveryTimeReq "+deliveryHours +":"+ deliveryMinutes);
 }
 else(foodCourtRulesDataDineIn.otherRules.preferredDeliveryTimeReq =='2')
 {
      var pickupDuration= cminute + parseInt(foodCourtRulesDataDineIn.otherRules.pickupMinDuration)  ;
      var pickupHours = chour +  Math.trunc(pickupDuration/60);
      var pickupMinutes =  pickupDuration % 60;


     totalPickupETA = pickupHours +":"+pickupMinutes;
  //   foodCourtCartDataDineIn.totalPickupETA=totalPickupETA;
     console.log("preferredDeliveryTimeReq "+pickupHours +":"+ pickupMinutes);



      var deliveryMinDuration =  cminute +  parseInt(foodCourtRulesDataDineIn.otherRules.deliveryMinDuration)  ;
      var deliveryHours = chour + Math.trunc(deliveryMinDuration/60);
      var deliveryMinutes = deliveryMinDuration % 60;


    totalDeliveryETA = deliveryHours +":" + deliveryMinutes;
    //foodCourtCartDataDineIn.totalDeliveryETA=totalDeliveryETA;
    console.log("preferredDeliveryTimeReq "+deliveryHours +":"+ deliveryMinutes);
 }







    var  email=localStorage.getItem("email");
    if(email!=undefined && email !='')
    {
       useremailIDDineIn=email;
        var jsonPostecom= '{"method":"foodDefaultAddressBook","appId":"'+app_id+'","userName":"'+useremailIDDineIn+'"}';
        console.log(jsonPostecom);
        Appyscript.closeModal();
         if(isOnline())
         {
            Appyscript.showIndicator();
             $$.ajax({
             url: baseURL,
             data: Appyscript.validateJSONData(jsonPostecom),
             type: "post",
             //321 headers: {'accessToken': deviceEncryptedToken},

             async: true,
             success: function(jsonData, textStatus )
             {
                 var responcedata=JSON.parse(jsonData);
                // console.log("shambhoo"+responcedata);
                 if(responcedata.billing.length == 0)
                 {
                         var billing={};
                         billing.address =billaddress;
                         billing.city= billcity;
                         billing.country= billcountry;
                         billing.state= billstate;
                         billing.zip=pincode;
                         responcedata.billing=billing;
                 }
                 if(responcedata.shipping.length == 0)
                 {
                         var shipping={};
                         shipping.address =billaddress;
                         shipping.city= billcity;
                         shipping.country= billcountry;
                         shipping.state= billstate;
                         shipping.zip=pincode;
                         responcedata.shipping=shipping;
                 }

                 foodCourtCartDataDineIn.foodcourtBilling=responcedata.billing;
                 foodCourtCartDataDineIn.foodcourtShipping=responcedata.shipping;
                 foodCourtCartDataDineIn.contactInfo=responcedata.contactInfo
                 if(foodCourtCartDataDineIn.storetime)
                 {
                    responcedata.storetime=foodCourtCartDataDineIn.storetime;
                 }

                 if(foodCourtRulesDataDineIn.otherRules.storeAddress)
                 {
                    var aa=[];aa=foodCourtRulesDataDineIn.otherRules.storeAddress;;
                   responcedata.rules={};
                   responcedata.rules.storeAddress=aa
                 }


                  responcedata.totalPickupETA=totalPickupETA;
                  responcedata.totalDeliveryETA=totalDeliveryETA;

                if(responcedata)
                {

                    responcedata.waiterLising = detailsdatadataDineIn.waiterLising;
                    openFoodDineInPage("dinein-continue-checkout",responcedata);
                }
                Appyscript.hideIndicator();
             },
             error: function(error)
             {
                   Appyscript.hideIndicator();
                   console.log("Error: " + error.code + " " + error.message);
             }
           });
       }
       else
       {
           Appyscript.hideIndicator();
           Appyscript.alert(internetconnectionmessage );
       }
     }
     else
     {
         var responcedata={};
         var billing={};
        billing.address =billaddress;
        billing.city= billcity;
        billing.country= billcountry;
        billing.state= billstate;
        billing.zip=pincode;
        responcedata.billing=billing;

         var shipping={};
                shipping.address =billaddress;
                shipping.city= billcity;
                shipping.country= billcountry;
                shipping.state= billstate;
                shipping.zip=pincode;
                responcedata.shipping=shipping;




        foodCourtCartDataDineIn.foodcourtBilling=responcedata.billing;
        foodCourtCartDataDineIn.foodcourtShipping=responcedata.shipping;

         if(foodCourtCartDataDineIn.storetime)
         {
            responcedata.storetime=foodCourtCartDataDineIn.storetime;
         }

         if(foodCourtRulesDataDineIn.otherRules.storeAddress)
         {
            var aa=[];aa=foodCourtRulesDataDineIn.otherRules.storeAddress;;
           responcedata.rules={};
           responcedata.rules.storeAddress=aa
         }

        responcedata.totalPickupETA=totalPickupETA;
        responcedata.totalDeliveryETA=totalDeliveryETA;
        responcedata.waiterLising = detailsdatadataDineIn.waiterLising;
        openFoodDineInPage("dinein-continue-checkout",responcedata);
        updateDineInIcon();
        Appyscript.hideIndicator();

     }


}

var foodPaymentData='';
Appyscript.onPageInit('dinein-ContinueCheckout',function(page)
{
    var thisPage = $$(page.container);
    thisPage.find(".timeInput").each(function()
    {
        var thisTime = $$(this);
        thisTime.find("input").attr("type", "text");
        thisTime.append('<input type="time" class="time" />');
        thisTime.find(".time").change(function()
        {
            thisTime.find("input").eq(0).val($$(this).val());
        });
    });

       $$(".tabs .tab").hide().eq(0).show();
       var checkpikup=false;
//       for(var i=0; i<foodPaymentData.paymentDetails.length; i++)
//       {
//           if(foodPaymentData.paymentDetails[i].key == "pu")
//           {
//               checkpikup=true;
//           }
//       }
       if(!checkpikup)
       {
           $$(".tabmyCollection").hide();
            $$(".tabViewall").addClass("rnzfull100");
            $$(".tabs .tab").hide().eq(0).show();
       }
//       if(foodPaymentData.paymentDetails.length =='1' && foodPaymentData.paymentDetails[0].key  == "pu")
//       {
//           $$(".tabViewall").hide();
//           $$(".tabmyCollection").addClass("rnzfull100").find("a").click();
//            $$(".tabs .tab").hide().eq(1).show();
//       }


    if(foodCourtCartDataDineIn.foodcourtBilling)
    {
        Appyscript.formFromJSON('#foodcourtBilling', foodCourtCartDataDineIn.foodcourtBilling);
        Appyscript.formFromJSON('#foodcourtBillingpickup', foodCourtCartDataDineIn.foodcourtBilling);
    }
    if(foodCourtCartDataDineIn.foodcourtBilling)
    {
        Appyscript.formFromJSON('#foodcourtShipping', foodCourtCartDataDineIn.foodcourtBilling);
    }
});


function DineInTabs(a)
{
    if($$(a).attr("href") == "#picup")
    {
        var flag=false;
            for(var i=0; i<foodPaymentData.paymentDetails.length; i++)
            {
                if(foodPaymentData.paymentDetails[i].key == "pu")
                {
                    flag=true;
                    break;
                }
            }
            if(!flag)
            {
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.pickup_is_not_available,data.appData.appName);
                return false;
            }
    }
     $$(".newsTand-MobileTab a").removeClass("active");
     $$(a).addClass("active");
     $$(".tabs .tab").hide();
     $$($$(a).attr("href")).show();
}



var billshipViewFlag=false;
function DineInProfileCheckbox(a)
{
    if($$(a).find("span").is(".icon-ok-4"))
    {
        $$(".shippingView").hide();
        $$(a).find("span").removeClass("icon-ok-4").parent().find("input")[0].checked = false;
        billshipViewFlag=false;
    }
    else
    {
        $$(".shippingView").show();
        $$(a).find("span").addClass("icon-ok-4").parent().find("input")[0].checked = true;
        billshipViewFlag=true;
    }
 }



var checkBillAddress=false;
function DineInProfileCheckboxPickup(a)
{
    if($$(a).find("span").is(".icon-ok-4"))
    {
        $$(".shippingViewpickup").hide();
        $$(a).find("span").removeClass("icon-ok-4").parent().find("input")[0].checked = false;
        checkBillAddress=false;
    }
    else
    {
        $$(".shippingViewpickup").show();
        $$(a).find("span").addClass("icon-ok-4").parent().find("input")[0].checked = true;
        checkBillAddress=true;
    }
 }

/*
     ---------------------------------------------------   for payments page ----------------------------------------------------
*/
var checkforCOD=false;
var foocCourtpaymentsmethode={};
foocCourtpaymentsmethode.list=[];
function DineInPaymentMethod(aaa)
{
    var responcedataaa=aaa;
    foocCourtpaymentsmethode={};
    foocCourtpaymentsmethode.list=[];

    if(isOnline())
    {
        Appyscript.showIndicator();
        var postdata='{"method":"foodcourtPaymentMethod","appId":"'+app_id+'"}';
        console.log("ecomPaymentMethod:::: baseurl  postdata  "+postdata);
        $$.ajax({
                url:baseURL,
                data:Appyscript.validateJSONData(postdata),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                timeout: 10000,
                async: true,
                success: function(jsonData, textStatus )
                {
                  console.log("ecomPaymentMethod::::dfd::"+JSON.stringify(jsonData));
                if(textStatus==200)
                {
                    var data = JSON.parse(jsonData);
                    foodPaymentData=data;
                    if((typeof data.paymentDetails!== "undefined")&&data.paymentDetails!=null&&data.paymentDetails.length>0)
                    {

                        for (i = 0; i < data.paymentDetails.length; i++)
                        {
                            var item=data.paymentDetails[i];
                            var label = typeof item.label!== "undefined"?(item.label!=null?item.label:""):"";
                            var key = typeof item.key!== "undefined"?(item.key!=null?item.key:""):"";
                            var phoneNo="",merchantId="",saltKey="",clientId="",secretKey="",paypalId="",phoneText="";
                            var applicationProfileId="",merchantProfileId="",workflowId="",identityToken="", applicationLicenseID="";
                            if(typeof item.credentials!== "undefined")
                            {
                                var credentials=item.credentials;
                                phoneNo = typeof credentials.phoneNo!== "undefined"?(credentials.phoneNo!=null?credentials.phoneNo:""):"";
                                phoneText = typeof credentials.phoneText!== "undefined"?(credentials.phoneText!=null?credentials.phoneText:""):"";
                                merchantId = typeof credentials.merchantId!== "undefined"?(credentials.merchantId!=null?credentials.merchantId:""):"";
                                secretKey = typeof credentials.secretKey!== "undefined"?(credentials.secretKey!=null?credentials.secretKey:""):"";
                                clientId = typeof credentials.clientId!== "undefined"?(credentials.clientId!=null?credentials.clientId:""):"";

                                applicationProfileId = typeof credentials.volecity_applicationprofileid!== "undefined"?(credentials.volecity_applicationprofileid!=null?credentials.volecity_applicationprofileid:""):"";
                                merchantProfileId = typeof credentials.volecity_merchantprofileid!== "undefined"?(credentials.volecity_merchantprofileid!=null?credentials.volecity_merchantprofileid:""):"";
                                workflowId = typeof credentials.volecity_workflowid!== "undefined"?(credentials.volecity_workflowid!=null?credentials.volecity_workflowid:""):"";
                                identityToken = typeof credentials.volecity_identitytoken!== "undefined"?(credentials.volecity_identitytoken!=null?credentials.volecity_identitytoken:""):"";
                                applicationLicenseID = typeof credentials.volecity_application_licence!== "undefined"?(credentials.volecity_application_licence!=null?credentials.volecity_application_licence:""):"";
//                                                                  applicationLicenseID = 'CC667D44-341D-4E27-96DA-94634938CAD9';
                                if(key=="payu_money")
                                {
                                  saltKey=secretKey;
                                  secretKey="";
                                }
                                paypalId = typeof credentials.paypalId!== "undefined"?(credentials.paypalId!=null?credentials.paypalId:""):"";
                            }

                            var tabActive=i==0?" active":"";
                            if(key=="cc")
                            foocCourtpaymentsmethode.list.push({"method" : "card","tabClassId":"card","tabActive":tabActive,"label":label,
                                                      "paymentMethodKey":key,"clientId":clientId,"secretKey":secretKey,"page":"dinein"});
                            else if(key=="payu_money")
                            foocCourtpaymentsmethode.list.push({"method" : "payu","tabClassId":"payu","tabActive":tabActive,"label":label,
                                                      "paymentMethodKey":key,"merchantId":merchantId,"saltKey":saltKey,"page":"dinein"});
                            else if(key=="paypal")
                            foocCourtpaymentsmethode.list.push({"method" : "paypal","tabClassId":"paypal","tabActive":tabActive,"label":label,
                                                      "paymentMethodKey":key,"paypalId":paypalId,"page":"dinein"});
                            else if (key == "payfast")
                            foocCourtpaymentsmethode.list.push({"method": "payfast","tabClassId": "payfast","tabActive": tabActive,"label": label,
                                                       "paymentMethodKey": key,"merchantId": merchantId,"merchantKey": credentials.merchantKey,"page": "dinein"});
                            else if(key=="cc_phone")
                            foocCourtpaymentsmethode.list.push({"method" : "obp","tabClassId":"obp","tabActive":tabActive,"label":label,
                                                      "paymentMethodKey":key,"phoneNo":phoneNo,"phoneText":phoneText,"page":"dinein"});
                            else if(key=="stripe")
                            foocCourtpaymentsmethode.list.push({"method" : "stripe","tabClassId":"stripe","tabActive":tabActive,"label":label,
                                                      "paymentMethodKey":key,"clientId":clientId,"secretKey":secretKey,"page":"dinein"});
                             else if(key=="mercadopago")
                            foocCourtpaymentsmethode.list.push({"method": "mercado","tabClassId":"mercadopago","tabActive":tabActive,"label": label,
                                                       "paymentMethodKey": key,"merchantId": credentials.mercadopago_public_key,"clientId": credentials.mercadopago_client_id,"secretKey": credentials.mercadopago_secret_key,"page": "dinein"});
                            else if(key=="cod")
                            foocCourtpaymentsmethode.list.push({"method" : "cod","tabClassId":"cod","tabActive":tabActive,"label":label,
                                                      "paymentMethodKey":key,"page":"dinein"});
                            else if(key=="volecity")
                            foocCourtpaymentsmethode.list.push({"method" : "volecity","tabClassId":"volecity","tabActive":tabActive,"label":label,
                                "paymentMethodKey":key,"applicationProfileId":applicationProfileId, "workflowId":workflowId, "merchantProfileId":merchantProfileId, "identityToken":identityToken, "applicationLicenseID": applicationLicenseID, "page":"dinein"});


                                                      if(key=="cod")
                                                      {
                                                        checkforCOD=key;

                                                      }

                                                      if(key=="cc" || key=="stripe")
                                                         {
                                                         cardDetailsForDinein()
                                                         }
                         }

                        foocCourtpaymentsmethode.innerlanguage=true;
                        var innerlanguagedata={};
                        innerlanguagedata.expiry_month=pageData.languageSetting.expiry_month_food;
                        innerlanguagedata.expiry_year=pageData.languageSetting.expiry_year_food;
                        innerlanguagedata.cvv_code=pageData.languageSetting.check_the_back_of_your_credit_card_for_cvv_mcom;
                        innerlanguagedata.place_order=pageData.languageSetting.place_order_food;
                        innerlanguagedata.card_holder_name=pageData.languageSetting.card_holder_name_mcom;
                        innerlanguagedata.call_now=pageData.languageSetting.call_now_food;
                        innerlanguagedata.confirm=pageData.languageSetting.confirm_food;
                        innerlanguagedata.payment_method=pageData.languageSetting.payment_method_food;
                        foocCourtpaymentsmethode.innerlanguagedata=innerlanguagedata;
                        responcedataaa.waiterLising = detailsdatadataDineIn.waiterLising;
                        openFoodDineInPage("dinein-continue-checkout",responcedataaa);
                         AppyTemplate.global.cardLast4ecom="";
                                        AppyTemplate.global.cardLast4food="";
                    }
                }
                else
                {
                  Appyscript.alert(something_went_wrong_please_try_again );
                }
                Appyscript.hideIndicator();
                },error: function(error)
                {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again );
                }
                });
    }
    else
    {
       Appyscript.hideIndicator();
       	Appyscript.alert(internetconnectionmessage  );
    }
}







function DineInRetryPayment()
{
    //openFoodDineInPage("payment",foocCourtpaymentsmethode);
}


function DineInPayment(thisObj,fromtab)
{
       if(parseFloat(gtotalcheck) <=0)
        {
            if(checkforCOD =='cod'  && checkforCOD !='pickup')
            {
                DineInPaymentRegistrationInfo(checkforCOD);
            }
            else
            {
                 Appyscript.alert(AppyTemplate.global.pageLanguageSetting.your_order_does_not_reach_the_minimum_amount+"  "+detailsdatadataDineIn.min_order +", "+AppyTemplate.global.pageLanguageSetting.pleae_add_more_item);
                 Appyscript.hideIndicator();
                 return ;
            }
        }
        else
        {

            openFoodDineInPage("payment",foocCourtpaymentsmethode);
        }
}


function DineIncheckCommentsRegex(vall)
{
    var regex = /^'"&$/i;
   return regex.test(vall);
}


function DineInConfirmPayment(a) {
    tablenumberTemp = $$("#pickAddress2").text();
    if (tablenumberTemp == "" || tablenumberTemp == "null" || tablenumberTemp == null || tablenumberTemp == undefined){
        Appyscript.alert(pageData.languageSetting.dining_select_table);
        Appyscript.hideIndicator();
        return;
    } else {
        tablenumber = tablenumberTemp;
        tablenumberTemp = "";
    }

    var foodData = JSON.parse(localStorage.getItem("foodCourtdata"));
    $$(".error").removeClass("error");

    var aaaa = parseFloat(foodCourtCartDataDineIn.subTotal);
    var bbbb = parseFloat(detailsdatadataDineIn.min_order);
    if (bbbb > aaaa) {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.your_order_does_not_reach_the_minimum_amount + "  " + detailsdatadataDineIn.min_order + ", " + AppyTemplate.global.pageLanguageSetting.pleae_add_more_item);
        Appyscript.hideIndicator();
        return;
    }

    instruction = $$("#pickInstruction").val().trim();
    var checkReg = DineIncheckCommentsRegex(instruction)
    if (checkReg) {
        var regex = /^'"&$/i;
        alert(" Please enter valid comments and avoid to use spatial keyword.")
        Appyscript.hideIndicator();
        return;
    }
    foodData.Instruction = instruction.replace(/['"]+/g, '');

    var timedetails = getStoreTimeDineIn(detailsdatadataDineIn);
    if (timedetails.storetime) {
        if ((timedetails.storetime.preferredDeliveryTimeReq == '1' || timedetails.storetime.preferredDeliveryTimeReq == '2') && (timedetails.storetime.todaystime == AppyTemplate.global.pageLanguageSetting.closed)) {
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.this_time_order_will_not_be_accepted);
            return;
        } else {
            var time = $$("input[name='deliveryTime']").val();
            if (time == "") {
                Appyscript.alert(pageData.languageSetting.preferred_delivery_time_food);
                return;
            }
            foodData.deliveryTime = time;

            var date = new Date();
            var currentTime = date.getHours() + ":" + date.getMinutes();
            var currentDate = date.toLocaleDateString();
            var a = currentDate.split("/");
            if (Appyscript.device.android) {
                currentDate = a[2] + "-" + a[0] + "-" + a[1];
            }
            var todayDate = new Date(currentDate + " " + currentTime);
            if (todayDate == "Invalid Date") {
                currentDate = a[2] + "-" + a[1] + "-" + a[0];
                todayDate = new Date(currentDate + " " + currentTime);
            }
            var selectedDate = new Date(currentDate + " " + time);
            if ((Date.parse(selectedDate) - Date.parse(todayDate)) < 0) {
                Appyscript.alert(pageData.languageSetting.preferred_delivery_time_food);
                return;
            }

            var deliveryMinDuration = parseInt(foodCourtRulesDataDineIn.otherRules.deliveryMinDuration) * 1000 * 60;
            if ((Date.parse(selectedDate) - Date.parse(todayDate)) < deliveryMinDuration) {
                Appyscript.alert(pageData.languageSetting.customer_time_food + " " + foodCourtRulesDataDineIn.otherRules.deliveryMinDuration + " " + pageData.languageSetting.your_delivery_store_food);
                return;
            }
        }
    }

    billing = Appyscript.formToJSON('#foodcourtBilling');
    shipping = Appyscript.formToJSON('#foodcourtShipping');
    instructions = Appyscript.formToJSON('#foodOrderInstructionsText');
    if (instructions.length > 1) {
        instructions = instructions.replace(/['"]+/g, '');
    }

    foodData.rules = foodCourtRulesDataDineIn.otherRules;
    foodData.billing = {};
    foodData.contactInfo = {};
    foodData.shipping = {};

    if (checkBillAddress) {
        var name = $$("#bfname").val();
        var phone = $$("#bpNo").val();
        var email = $$("#bemail").val();
        var address = $$("#bAddress").val();
        var city = $$("#bCity").val();
        var state = $$("#bState").val();
        var zip = $$("#bZip").val();
        var country = $$("#bCountry").val();

        if (!foodCourtValidateDineIn(name, "name")) {
            $$("#bfname").addClass("error");
            $$(".dashboard").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
            return;
        }

        if (!foodCourtValidateDineIn(email, "email")) {
            $$("#bemail").parent().addClass("error");
            $$(".dashboard").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
            return;
        }

        if (!foodCourtValidateDineIn(phone, "phone")) {
            $$("#bpNo").addClass("error");
            $$(".dashboard").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
            return;
        }

        if (!foodCourtValidateDineIn(address, "address")) {
            $$("#bAddress").addClass("error");
            $$(".dashboard").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
            return;
        }

        if (!foodCourtValidateDineIn(city, "city")) {
            $$("#bCity").addClass("error");
            $$(".dashboard").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
            return;
        }
        if (!foodCourtValidateDineIn(country, "country")) {
            $$("#bCountry").addClass("error");
            $$(".dashboard").parent()[0].scrollTop = $$(".error")[0].offsetTop - 50;
            return;
        }
        localStorage.setItem("billingMailFoodcourt", email)
        foodData.billing.BillingShipping = "Billing";
        foodData.billing.name = name;
        foodData.billing.phone = phone;
        foodData.billing.email = email;
        foodData.billing.address = address;
        foodData.billing.city = city;
        foodData.billing.zip = zip;
        foodData.billing.state = state;
        foodData.billing.country = country;
        foodData.billing.checkbill = 1;
        var addressg = address + " " + city + " " + state;
    } else {
        foodData.billing.BillingShipping = "Billing";
        foodData.billing.name = "";
        foodData.billing.phone = "";
        foodData.billing.email = "";
        foodData.billing.address = "";
        foodData.billing.city = "";
        foodData.billing.zip = "";
        foodData.billing.state = "";
        foodData.billing.country = "";
        foodData.billing.checkbill = 0;
        var addressg = address + " " + city + " " + state;
    }

    foodData.payType = "delivery";
    var instruction = $$("#pickInstruction").val().trim();
    foodData.Instruction = instruction.replace(/['"]+/g, '');

    var addressindex = $$("#deliveryAddress").val();
    var storeindex = parseInt(addressindex);

    localStorage.setItem("foodCourtpaydata", JSON.stringify(foodData));
    //openFoodDineInPage("payment",foocCourtpaymentsmethode);
    DineInPaymentRegistrationInfo2();
    //CommonPaymentgatwayFunction(foodOrderIdForGloble, pageId, JSON.parse(localStorage.getItem("foodCourtpaydata")),pageIdentifie);
};




/*
    This method is used to check validationn of credit card as well as create json of credit card details
 */
function DineInCreditCardDetailOfUser(creditCardType)
{
    var creditCardJSON;
      if(creditCardType=="stripe"){
          creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripe');
      } else if(creditCardType == "payMercado"){
        //payMercado
        creditCardJSON = Appyscript.formToJSON('#payMercado');
        Mercadopago.clearSession();
        Mercadopago.setPublishableKey($('#payMercado').parent().attr("data-merchantId"));
        console.log("====Mercado identification type====");
        var ccNumber = creditCardJSON.cardNumber.replace(/[ .-]/g, '').slice(0, 6);
        Mercadopago.getPaymentMethod({
            "bin": ccNumber
        }, DineInsetPaymentMethodInfo);
        Mercadopago.createToken($('#payMercado'), DineInsdkResponseHandler);
        //
        //              setTimeout(function(){ return; },1000);
        return "";

      }
      else{
          creditCardJSON = Appyscript.formToJSON('#creditCardThroughPaypal');
      }

      //  var card_type=creditCardJSON.card_type;
      var cnumber=creditCardJSON.cardNumber;
      var expairyMonth=creditCardJSON.expairyMonth;
      var expairyYear=creditCardJSON.expairyYear;
      var cHolder=creditCardJSON.cardHolder;
       cvvCode=creditCardJSON.cvvCode;
      var card_type= Appyscript.validateCardType(cnumber);
                                                       if(cnumber==null ||cnumber=="")
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(foodPleaseEnterCardNumber);
                                                       return null;
                                                       }
                                                       else if(isNaN(cnumber) || cnumber.length < 15)
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
                                                       return null;
                                                       }
                                                       else if(expairyMonth == null || expairyMonth == '')
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(foodPleaseEnterExpairyMonth);
                                                       return null;
                                                       }
                                                       else if(isNaN(expairyMonth) || expairyMonth.length < 2)
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_month);
                                                       return null;
                                                       }
                                                       else if(expairyYear == null || expairyYear == '')
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(foodPleaseEnterExpairyYear);
                                                       return null;
                                                       }
                                                       else if(isNaN(expairyYear) || expairyYear.length < 4)
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year);
                                                       return null;
                                                       }
                                                       else if(cvvCode==null ||cvvCode=="")
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(foodPleaseEnterCvvCode);
                                                       return null;
                                                       }
                                                       else if(isNaN(cvvCode) || cvvCode.length < 3)
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code);
                                                       return null;
                                                       }
                                                       else if(!isNaN(cHolder) || cHolder == null || cHolder == '')
                                                       {
                                                       Appyscript.hideIndicator();
                                                       Appyscript.alert(AppyTemplate.global.commonLanguageSetting.common_card_holder_name);
                                                       return null;
                                                       }


      var cHolder1=cHolder.split(" ");
      var lastName=  cHolder1[1];
      var firstName=cHolder1[0];

      if(lastName == '' || lastName == null){
          lastName='';
      }
      var paymentDetail='{"type":"'+card_type+'","number":"'+cnumber+'","expireMonth":"'+expairyMonth+
      '","expireYear":"'+expairyYear+'","cvv2":"'+cvvCode+'","firstName":"'+firstName+'","lastName":"'+lastName+'"}';

      return paymentDetail;
}




var pickupbilling ='';
var billing ='';
var shipping = '';
var instructions='';
var billCountryId = '';

 /*function DineInPaymentRegistrationInfo(paymentTypeObject)
                                                     {
                                                     var paymentType;
                                                     var creditCardDetail=null;
                                                     var a= $$(paymentTypeObject).parent();
                                                     var paymentMethodKey=a.attr("data-key");

                                                     if(paymentMethodKey=="stripe")
                                                     {
                                                     var savecardcheck;
                                                     if(document.getElementById('savecardcheck'))
                                                     {
                                                     savecardcheck = document.getElementById('savecardcheck').checked
                                                     }

                                                     if(savecardcheck)
                                                     {
                                                     creditCardDetail="stripe";
                                                     DineInPaymentRegistrationInfo2(paymentTypeObject)
                                                     }
                                                     else
                                                     {
                                                     creditCardDetail= creditCardDetailOfUser("stripe");
                                                     if(creditCardDetail==null)
                                                     return;


                                                     var issavecardcheck;
                                                     if(document.getElementById('issavecardcheck'))
                                                     {
                                                     issavecardcheck = document.getElementById('issavecardcheck').checked
                                                     }
                                                     if(AppyTemplate.global.cardLast4foodCourt=="undefined" || AppyTemplate.global.cardLast4foodCourt==undefined)
                                                     {
                                                     DineInPaymentRegistrationInfo2(paymentTypeObject)
                                                     }
                                                     else
                                                     {
                                                     if(!issavecardcheck && AppyTemplate.global.cardLast4foodCourt)
                                                     {
                                                     Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.existing_card_automatically_deleted,appnameglobal_allpages,"No","Yes",cancelvalue,goToPaymentfoodcourt);

                                                     function goToPaymentfoodcourt()
                                                     {
                                                    DineInPaymentRegistrationInfo2(paymentTypeObject)

                                                     }
                                                     function cancelvalue(){

                                                     return;
                                                     }

                                                     }
													else if(issavecardcheck && AppyTemplate.global.cardLast4foodCourt)
													{
													Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.existing_card_automatically_deleted_on_save,appnameglobal_allpages,data.languageSetting.No,data.languageSetting.Yes,cancelvalue,goToPaymentfoodcourtok);

													function goToPaymentfoodcourtok()
													{
													DineInPaymentRegistrationInfo2(paymentTypeObject)

													}
													function cancelvalue(){

													return;
													}

													}

                                                     else
                                                     {
                                                     DineInPaymentRegistrationInfo2(paymentTypeObject)
                                                     }
                                                     }
                                                     }
                                                     paymentType="stripe";
                                                     }
                                                     else
                                                     {

                                                     DineInPaymentRegistrationInfo2(paymentTypeObject)
                                                     }


                                                     }*/


function DineInPaymentRegistrationInfo2() {
    //var responcedataaa=aaa;
    if (AppyTemplate.global.loginCheck) {
        AppyTemplate.global.loginCheck = true;
        useremailid = localStorage.getItem("email");
        username = localStorage.getItem("username");
        userphone = localStorage.getItem("phone");
        billName = username;
        billPhone = userphone;
        billEmail = useremailid;

    } else {
        AppyTemplate.global.loginCheck = false;
        useremailid = "";
        username = "";
        userphone = "";
        localStorage.setItem("email", "");
        localStorage.setItem("username", "");
        localStorage.setItem("phone", "");
        Appyscript.loginPage("true");
        return;
    }

    Appyscript.showIndicator();
    var billName = '';
    var billLine1 = '';
    var billCity = '';
    var billState = '';
    var billCoutry = '';
    var billPostalCode = '';
    var billPhone = '';
    var billEmail = '';

    var shipName = '';
    var shipAdd = '';
    var shipCity = '';
    var shipState = '';
    var shipCoutry = '';
    var shipZip = '';
    var shipPhone = '';
    var shipEmail = '';

    var pridataall = JSON.parse(localStorage.getItem("foodCourtpaydata"));
    if (checkBillAddress) {
        pickupbilling = Appyscript.formToJSON('#foodcourtBillingpickup');
        billName = pickupbilling.name;
        billLine1 = pickupbilling.address;
        billCity = pickupbilling.city;
        billState = pickupbilling.state;
        billCoutry = pickupbilling.country;
        billPostalCode = pickupbilling.zip;
        billPhone = pickupbilling.phone;
        billEmail = pickupbilling.email;

        shipName = pickupbilling.name;
        shipAdd = pickupbilling.address;
        shipCity = pickupbilling.city;
        shipState = pickupbilling.state;
        shipCoutry = pickupbilling.country;
        shipZip = pickupbilling.zip;
        shipPhone = pickupbilling.phone;
        shipEmail = pickupbilling.email;

        var filterDataCourt = countryArrayList.countryList.country.filter(function(item) {
            return (item.longname == billCoutry);
        });
        //  billCountryId = filterDataCourt[0].shortname;
    } else {
        billName = username;
        billPhone = userphone;
        billEmail = useremailid;
    }

    var paymentType;
    var creditCardDetail = null;

    var paymentMethodKey = '';
//    if (paymentTypeObject == 'cod') {
//        paymentMethodKey = paymentTypeObject;
//    } else {
//        var a = $$(paymentTypeObject).parent();
//        paymentMethodKey = a.attr("data-key");
//    }

//    if (paymentMethodKey == "cc") {
//        creditCardDetail = DineInCreditCardDetailOfUser("cc");
//        if (creditCardDetail == null)
//            return
//        paymentType = "cc";
//    } else if (paymentMethodKey == "payu_money") {
//        paymentType = "payu_money";
//    } else if (paymentMethodKey == "paypal") {
//        paymentType = "paypal_express";
//    } else if (paymentMethodKey == "payfast") {
//        paymentType = "payfast";
//    } else if (paymentMethodKey == "mercadopago") {
//        paymentType = "mercadopago";
//    } else if (paymentMethodKey == "cc_phone") {} else if (paymentMethodKey == "volecity") {
//        paymentType = "volecity";
//    } else if (paymentMethodKey == "stripe") {
//        var savecardcheck;
//        var creditCardDetail;
//
//        if (document.getElementById('savecardcheck')) {
//            savecardcheck = document.getElementById('savecardcheck').checked
//        }
//
//        if (savecardcheck) {
//            // alert(1)
//            creditCardDetail = "stripe";
//        } else {
//            creditCardDetail = DineInCreditCardDetailOfUser("stripe");
//            if (creditCardDetail == null)
//                return;
//        }
//        paymentType = "stripe";
//
//    } else if (paymentMethodKey == "pickup") {
//        paymentType = "pickup";
//        DineInPaymentRegistrationInfoForPickUp(paymentTypeObject);
//        return;
//    } else {
//        paymentType = 'cod';
//    }

    var foodCourtpaydata = JSON.parse(localStorage.getItem("foodCourtpaydata"));
    var totalAmount = parseFloat(foodCourtpaydata.grandTotal);
//    if (paymentMethodKey == "cc") {
//        if (foodCourtpaydata.payType == 'pickup') {
//            totalAmount = parseFloat(foodCourtpaydata.subTotal);
//        } else {
//            totalAmount = parseFloat(foodCourtpaydata.subTotal);
//        }
//    }
//    if (foodCourtpaydata.payType == 'pickup') {
//        if (paymentMethodKey == "stripe" || paymentMethodKey == "cc") {
//            if (billName == '' || billLine1 == '') {
//                Appyscript.hideIndicator();
//                Appyscript.alert("Billing Address is mandatory for  this payments method. Please fill Billing Address");
//                Appyscript.hideIndicator();
//                return;
//            }
//        }
//    }

    totalAmount = totalAmount;
    var currency = foodCourtpaydata.currency;
    var taxPrice = typeof foodCourtpaydata.taxPrice !== "undefined" ? (foodCourtpaydata.taxPrice != null ? foodCourtpaydata.taxPrice : "0.00") : "0.00";
    taxPrice = parseFloat(taxPrice);
    var deliveryPrise = typeof foodCourtpaydata.deliveryPrice !== "undefined" ? (foodCourtpaydata.deliveryPrice != null ? foodCourtpaydata.deliveryPrice : "0.00") : "0.00";
    deliveryPrise = parseFloat(deliveryPrise);

    var dileveryFrom = typeof foodCourtpaydata.storeAddress !== "undefined" ? (foodCourtpaydata.storeAddress != null ? foodCourtpaydata.storeAddress : "") : "";

    var vendorMobileAddress = foodCourtpaydata.store_mobile;
    dileveryFrom = dileveryFrom + " " + AppyTemplate.global.pageLanguageSetting.fc_mobile + ":  " + vendorMobileAddress.replace('|||||', ',');

    var coupandiscount = parseFloat(typeof foodCourtpaydata.couponDiscount !== "undefined" ? (foodCourtpaydata.couponDiscount != null ? foodCourtpaydata.couponDiscount : 0.0) : 0.0);
    var discountAmount = parseFloat(typeof foodCourtpaydata.discountPrice !== "undefined" ? (foodCourtpaydata.discountPrice != null ? foodCourtpaydata.discountPrice : 0.0) : 0.0);
    var vendordiscount = parseFloat(typeof foodCourtpaydata.vendordiscount !== "undefined" ? (foodCourtpaydata.vendordiscount != null ? foodCourtpaydata.vendordiscount : 0.0) : 0.0);
    var discounrAndVendorDiscount = parseFloat(parseFloat(discountAmount) + parseFloat(vendordiscount));

    var miscTax = foodCourtpaydata.miscTax.list;
    for (t = 0; t < miscTax.length; t++) {
        var miscTaxamt = parseFloat(miscTax[t].taxAmount);
        taxPrice = parseFloat(miscTaxamt) + parseFloat(taxPrice);
    }
    taxPrice = parseFloat(taxPrice);

    var shippingData = '{"name":"' + shipName + '","address":"' + shipAdd + '","city":"' + shipCity + '","state":"' + shipState +
        '","country":"' + shipCoutry + '","localCountry":"' + shipCoutry + '","zip":"' + shipZip + '","phone":"' + shipPhone +
        '","billShip":"Shipping","tax":"' + taxPrice + '","totalAmount":"' + totalAmount + '","currency":"' + currency +
        '","shipping":"' + deliveryPrise + '","coupon":"' + coupandiscount + '","discount":"' + discounrAndVendorDiscount + '","tableNo":"' + tablenumber + '","waiterId":"' + waiterId + '","waiterName":"' + waiterName + '","waiterPhone":"' + waiterPhone + '"}';

    var lang = '';
    if (Appyscript.device.android) {
        lang = Appyscript.getDefaultLanguage();
    } else {
        lang = localStorage.getItem("locallng");
    }
    var storeName = foodCourtpaydata.vendorNameDineIn;

    var deliveryTime = '';
    /*if (foodCourtpaydata.payType == 'pickup') {
        deliveryTime = typeof foodCourtpaydata.pickupTime !== "undefined" ? (foodCourtpaydata.pickupTime != null ? foodCourtpaydata.pickupTime : "") : "";
        instructions = typeof foodCourtpaydata.Instruction !== "undefined" ? (foodCourtpaydata.Instruction != null ? foodCourtpaydata.Instruction : "") : "";
    } else {
        deliveryTime = typeof foodCourtpaydata.deliveryTime !== "undefined" ? (foodCourtpaydata.deliveryTime != null ? foodCourtpaydata.deliveryTime : "") : "";
    }*/
    deliveryTime=typeof foodCourtpaydata.deliveryTime!== "undefined"?(foodCourtpaydata.deliveryTime!=null?foodCourtpaydata.deliveryTime:""):"";
    var pickupComment = '';
    if (deliveryTime) {
        pickupComment = instructions + "#$#$" + AppyTemplate.global.pageLanguageSetting.time_to_deliver + ":-" + deliveryTime + " " + AppyTemplate.global.pageLanguageSetting.fc_hours;
    }

    var orderType = foodCourtpaydata.payType;
    var instructionsComments = instructions;
    var pickupDeliveryTime = deliveryTime;
    console.log("orderType  " + orderType + "  instructionsComments  " + instructionsComments + "  pickupDeliveryTime  " + pickupDeliveryTime);

    var billingData = '{"name":"' + billName + '","email":"' + billEmail + '","address":"' + billLine1 + '","line1":"' + billLine1 + '","city":"' + billCity + '","state":"' + billState + '","countryCode":"' + billCountryId + '","country":"' + billCoutry + '","postalCode":"' + billPostalCode + '","phone":"' + billPhone + '","deliveryFrom":"' + dileveryFrom + '"}';

    if (isOnline()) {
        var postData = '{"method":"foodPaymentRegistrationInfo","appId":"' + app_id + '","paymentDetail":"online","billingData":' + billingData + ',"shippingData":' + shippingData + ',"transType":"authorize","lang":"' + lang + '","storeName":"' + storeName + '","pickupComment":"' + pickupComment + '"}'
        console.log(" Sale chal gya , bhut presan kr diya hai----------------------------------------------------------------------");
        console.log("foodPaymentRegistrationInfo " + postData);
        $$.ajax({
            url: baseURL,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            //  timeout: 90000,
            async: true,
            success: function(jsonData, textStatus) {
                console.log("foodPaymentRegistrationInfo jsonData jsonData::" + JSON.stringify(jsonData));
                if (textStatus == 200 || textStatus == 'success') {
                    useremailid = billEmail;
                    AppyTemplate.global.loginCheck = true;
                    if (localStorage.getItem("username") == null || localStorage.getItem("username") == "")
                        localStorage.setItem("username", billName);
                    if (localStorage.getItem("email") == null || localStorage.getItem("email") == "")
                        localStorage.setItem("email", billEmail);
                    if (localStorage.getItem("phone") == null || localStorage.getItem("phone") == "")
                        localStorage.setItem("phone", billPhone);

                    var data = JSON.parse(jsonData);
                    var status = typeof data.status !== "undefined" ? data.status : 0;
                    var userId = typeof data.userId !== "undefined" ? data.userId : "";
                    var sessionToken = data.sessionToken;

                    if (localStorage.getItem("userid") == null || localStorage.getItem("userid") == "")
                        localStorage.setItem("userid", userId);

                    if (status == 'success' && localStorage.getItem("userid") != "") {
                        dineInSubmitOrderPlace(billingData, shippingData, JSON.parse(localStorage.getItem("foodCourtpaydata")));
                        AppyTemplate.global.cardLast4ecom="";
                        AppyTemplate.global.cardLast4food="";

                    } else {
                        Appyscript.hideIndicator();
                        Appyscript.alert(something_went_wrong_please_try_again);
                    }
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again);
                }
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again);
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage);
    }
}

/*
        ---------------------------------------------------------   Payments method for place orer   -----------------------------------------------------------
*/
function dineInSubmitOrderPlace(billingData, shippingData, productList) {
    var postData = DineInCreateJsonFormOrder(billingData, shippingData, productList, "online", "");
    console.log("-----------------------------------------------------------------------------------------------------------------------------------------------")
    console.log("DineInSubmitOrderByCOD  productList:    " + postData);
    if (isOnline()) {
        $$.ajax({
            url: baseURL,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},

            timeout: 90000,
            async: true,
            success: function(jsonData, textStatus) {
                console.log("postData:submitOrderByPhone jsonData:::" + JSON.stringify(jsonData) + "::textStatus::" + textStatus);
                if (textStatus == 200 || textStatus == 'success') {
                    var jsonObj = JSON.parse(jsonData);
                    //CommonPaymentgatwayFunction(foodOrderIdForGloble,pageId,productList);
                    CommonPaymentgatwayFunction(foodOrderIdForGloble, pageId, JSON.parse(localStorage.getItem("foodCourtpaydata")),pageIdentifie);
                } else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again);
                }
            },
            error: function(error) {
                foodOrderIdForGloble = '';
                orderId = '';
                Appyscript.hideIndicator();
                Appyscript.alert("Oops, Order has been failed.");
            }
        });
    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage);
    }
};

function DineInSubmitOrderByPhone(billingData,shippingData,paymentTypeObject,productList)
{
    var postData=DineInCreateJsonFormOrder(billingData,shippingData,paymentTypeObject,productList,"ccPhone","");
    console.log("-----------------------------------");
    console.log(postData);
    if(isOnline())
    {
                $$.ajax({
                url: baseURL,
                data:Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                timeout: 90000,
                async: true,
                success: function(jsonData, textStatus )
                {
                    console.log("-----------------------------------");
                    console.log("var jsonObj=JSON.parse(jsonData);::"+JSON.stringify(jsonData));
                    if(textStatus==200 || textStatus=='success')
                    {
                        var jsonObj=JSON.parse(jsonData);
                        var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";

                        if(success.toLowerCase()=="success")
                        {
                            var payTypeObj= $$(paymentTypeObject).parent();
                            var sellerPhoneNo=payTypeObj.attr("data-phoneNo");
                            if(!isNaN(sellerPhoneNo))
                            {
                                PhoneCallFood(sellerPhoneNo)
                                var parsePostData=JSON.parse(postData);
                                setTimeout(function()
                                {
                                   $$.get("pages/dinein-thanks.html", function (template)
                                  {

						              foodOrderIdForGloble='';
                                      orderId='';
                                       var compiledTemplate = AppyTemplate.compile(template);
                                       var aakk=JSON.parse(localStorage.getItem("foodCourtpaydata"));
                                       aakk.thanksjson=thanksjson;

                                        currencyFomatterSymbolProductList = aakk.currency;
                                        AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                                        localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                                        AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");


                                        AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                         localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                         AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

                                        aakk.maxTaxPrice = currencyFomatter(parseFloat(aakk.taxPrice));
                                        aakk.maxSubTotal = currencyFomatter(parseFloat(aakk.subTotal));
                                        aakk.maxCouponDiscount = currencyFomatter(parseFloat(aakk.couponDiscount));
                                        aakk.maxTipamount = currencyFomatter(parseFloat(aakk.tipamount));
                                        aakk.maxVendordiscount = currencyFomatter(parseFloat(aakk.vendordiscount));
                                        aakk.maxDiscountPrice = currencyFomatter(parseFloat(aakk.discountPrice));
                                        aakk.maxGrandTotal = currencyFomatter(parseFloat(aakk.grandTotal));
                                        aakk.maxDeliveryPrice = currencyFomatter(parseFloat(aakk.deliveryPrice));

                                        if (aakk.miscTax != undefined) {
                                            var miscTaxArr = aakk.miscTax.list;
                                            for (var key in miscTaxArr) {
                                                miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                                            }
                                        }

                                        console.log("aakk    " + JSON.stringify(aakk));

                                       var html = compiledTemplate(aakk);
                                       mainView.router.load({content: html, animatePages: true});
                                       localStorage.setItem("foodpaydata","");
                                       localStorage.setItem("foodCourtpaydata","");
                                  });
                                },1000);
                            }
                            else if(success.toLowerCase()=="failure")
                            {
                                    $$.get("pages/dinein-error.html", function (template)
                                   {

						              foodOrderIdForGloble='';
                                      orderId='';
                                       var compiledTemplate = AppyTemplate.compile(template);
                                       var html = compiledTemplate(parsePostData.orderId);
                                       mainView.router.load({content: html, animatePages: true});
                                   });
                            }
                            else
                            {
                                Appyscript.alert("Oops,"+sellerPhoneNo+" is not valid phone number.");
                            }
                        }
                       else if(success.toLowerCase()=="outofstock")
                       {
                            Appyscript.alert(jsonObj.productName +"  "+AppyTemplate.global.pageLanguageSetting.your_cart_data_will_be_delete_due_to_different_vendor_product+" "+jsonObj.qty );
                       }
                        else
                        {
                            Appyscript.alert(something_went_wrong_please_try_again );
                        }
                    }
                    else
                    {
                        Appyscript.alert(something_went_wrong_please_try_again );
                    }
                    Appyscript.hideIndicator();
                },
                error: function(error)
                {

						      foodOrderIdForGloble='';
                                 orderId='';
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again );
                }
          });
    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage  );
    }
}





function DineInPaymentRegistrationInfoForPickUp(paymentTypeObject)
{
	if(!AppyTemplate.global.loginCheck)
	{
	        localStorage.setItem("email","");
    		 localStorage.setItem("username","");
    		 localStorage.setItem("phone","");
	}
    var foodPayData  =JSON.parse(localStorage.getItem("foodCourtpaydata"));
    var totalAmount=parseFloat(foodPayData.grandTotal);
    totalAmount=totalAmount;
    var currency=foodPayData.currency;
     var taxPrice=typeof foodPayData.taxPrice!== "undefined"?(foodPayData.taxPrice!=null?foodPayData.taxPrice:"0.00"):"0.00";
     taxPrice=parseFloat(taxPrice);
     var deliveryPrise=typeof foodPayData.deliveryPrice!== "undefined"?(foodPayData.deliveryPrice!=null?foodPayData.deliveryPrice:"0.00"):"0.00";
     deliveryPrise=parseFloat(deliveryPrise);

     var dileveryFrom=typeof foodPayData.storeAddress!== "undefined"?(foodPayData.storeAddress!=null?foodPayData.storeAddress:""):"";
          var vendorMobileAddress=foodPayData.store_mobile;
          dileveryFrom = dileveryFrom + " "+  AppyTemplate.global.pageLanguageSetting.fc_mobile +":  "+  vendorMobileAddress.replace('|||||',', ');

     var coupandiscount=parseFloat(typeof foodPayData.couponDiscount!== "undefined"?(foodPayData.couponDiscount!=null?foodPayData.couponDiscount:0.0):0.0);//add coupan discount

     var shippingData='';
      var billingData='';
     if(checkBillAddress)
          {
                        pickupbilling = Appyscript.formToJSON('#foodcourtBillingpickup');
                        billName=pickupbilling.name;
                        billLine1=pickupbilling.address;
                        billCity=pickupbilling.city;
                        billState=pickupbilling.state;
                        billCoutry=pickupbilling.country;
                        billPostalCode=pickupbilling.zip;
                        billPhone=pickupbilling.phone;
                        billEmail=pickupbilling.email;

                      shipName=pickupbilling.name;
                      shipAdd=pickupbilling.address;
                      shipCity=pickupbilling.city;
                      shipState=pickupbilling.state;
                      shipCoutry=pickupbilling.country;
                      shipZip=pickupbilling.zip;
                      shipPhone=pickupbilling.phone;
                      shipEmail=pickupbilling.email;



                        var filterDataCourt = countryArrayList.countryList.country.filter(function (item) {
                            return (item.longname == billCoutry);
                        });
                        billCountryId = filterDataCourt[0].shortname;

          shippingData='{"name":"'+billName+'","address":"'+billLine1+'","city":"'+billCity+'","state":"'+billState+'","country":"'+billCoutry+'","localCountry":"'+billCountryId+'","zip":"'+billPostalCode+'","phone":"'+billPhone+'","billShip":"Shipping","tax":"'+taxPrice+'","totalAmount":"'+totalAmount+'","currency":"'+currency+'","shipping":"'+deliveryPrise+'","coupon":"'+coupandiscount+'"}';

          billingData='{"name":"'+billName+'","email":"'+billEmail+'","address":"'+billLine1+'","line1":"'+billLine1+'","city":"'+billCity+'","state":"'+billState+'","countryCode":"'+billCountryId+'","country":"'+billCoutry+'","postalCode":"'+billPostalCode+'","phone":"'+billPhone+'","deliveryFrom":"'+dileveryFrom+'"}';

     }
     else
     {
          shippingData='{"name":"'+localStorage.getItem("username")+'","address":"","city":"","state":"","country":"","localCountry":"","zip":"","phone":"'+localStorage.getItem("phone")+'","billShip":"Shipping","tax":"'+taxPrice+'","totalAmount":"'+totalAmount+'","currency":"'+currency+
        '","shipping":"'+deliveryPrise+'","coupon":"'+coupandiscount+'"}';

           billingData='{"name":"'+localStorage.getItem("username")+'","email":"'+localStorage.getItem("email")+'","address":"","line1":"","city":"","state":"","countryCode":"","country":"","postalCode":"","phone":"'+localStorage.getItem("phone")+'","deliveryFrom":"'+dileveryFrom+'"}';

     }



     var lang='';
     if(Appyscript.device.android)
     {
        lang=Appyscript.getDefaultLanguage();
     }
     else
     {
        lang=localStorage.getItem("locallng");
     }

    var storeName=foodPayData.vendorNameDineIn
    var instructions=typeof foodPayData.Instruction!== "undefined"?(foodPayData.Instruction!=null?foodPayData.Instruction:""):"";
    var pickupTime=typeof foodPayData.pickupTime!== "undefined"?(foodPayData.pickupTime!=null?foodPayData.pickupTime:""):"";
    var pickupComment='';
    if(pickupTime)
    {
        pickupComment=instructions+" "+AppyTemplate.global.pageLanguageSetting.Pickup_time_food+" :-"+pickupTime+" "+AppyTemplate.global.pageLanguageSetting.fc_hours;
    }

    var foodCourtpaydata  =JSON.parse(localStorage.getItem("foodCourtpaydata"));
    var orderType=foodPayData.payType;
    var instructionsComments=instructions;
    var pickupDeliveryTime=pickupTime;
    console.log("orderType  "+orderType +"  instructionsComments  "+instructionsComments  +"  pickupDeliveryTime  "+pickupDeliveryTime);


    if(isOnline())
    {
       Appyscript.showIndicator();
       var postData= '{"method":"foodPaymentRegistrationInfo","appId":"'+app_id+'","paymentDetail":"pickup","billingData":'+billingData+',"shippingData":'+shippingData+',"transType":"authorize","lang":"'+lang+'","storeName":"'+storeName+'","pickupComment":"'+pickupComment+'" ,"orderType":"'+orderType+'","deliveryPickupTime":"'+pickupDeliveryTime+'"}'
       console.log("postData postData::request::"+postData);

                $$.ajax({
                url: baseURL,
                data:Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                async: true,
                timeout: 90000,
                success: function(jsonData, textStatus )
                {
                    console.log("jsonData jsonData::"+JSON.stringify(jsonData));
                    if(textStatus==200 || textStatus=='success')
                    {
                        AppyTemplate.global.loginCheck=true;

                        if(localStorage.getItem("username")==null||localStorage.getItem("username")=="")
                            localStorage.setItem("username",billName);
                        if(localStorage.getItem("email")==null||localStorage.getItem("email")=="")
                            localStorage.setItem("email",billEmail);
                        if(localStorage.getItem("phone")==null||localStorage.getItem("phone")=="")
                            localStorage.setItem("phone",billPhone);

                        var data= JSON.parse(jsonData);
                        var status = typeof data.status!== "undefined"?data.status:0;
                        var userId=typeof data.userId!== "undefined"?data.userId:"";

                        if(localStorage.getItem("userid")==null||localStorage.getItem("userid")=="")
                         localStorage.setItem("userId",userId);

                        if(status=='success'  && localStorage.getItem("userid")!="")
                        {
                           DineInSubmitOrderByPickUp(billingData,shippingData,paymentTypeObject,JSON.parse(localStorage.getItem("foodCourtpaydata")));
                        }
                        else
                        {
                           Appyscript.hideIndicator();
                           Appyscript.alert(something_went_wrong_please_try_again );
                        }
                    }
                    else
                    {
                       Appyscript.hideIndicator();
                       Appyscript.alert(something_went_wrong_please_try_again );
                    }
                },error: function(error)
                {

                     Appyscript.hideIndicator();
                     Appyscript.alert(something_went_wrong_please_try_again );
                }
                });
    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage  );
    }
}




/*
 This method is used to hit foodOrder service to send product details on server in case of pick up
 */
function DineInSubmitOrderByPickUp(billingData,shippingData,paymentTypeObject,productList)
{
    var postData=DineInCreateJsonFormOrder(billingData,shippingData,paymentTypeObject, productList,"pickup","");
    console.log("-----------------------------------");
    console.log(postData);
    if(isOnline())
    {
                $$.ajax({
                url: baseURL,
                data:Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                async: true,
                timeout: 90000,
                success: function(jsonData, textStatus )
                {
                    var jsonObj=JSON.parse(jsonData);
                    var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                    if(textStatus==200 || textStatus=='success')
                    {
                        var jsonObj=JSON.parse(jsonData);
                        console.log("----------------------------------");
                        console.log(jsonObj);
                            setTimeout(function()
                            {
                               $$.get("pages/dinein-thanks.html", function (template)
                              {

						      foodOrderIdForGloble='';
                                 orderId='';
                                   var compiledTemplate = AppyTemplate.compile(template);
                                   var aakk=JSON.parse(localStorage.getItem("foodCourtpaydata"));
                                   aakk.thanksjson=thanksjson;

                                    currencyFomatterSymbolProductList = aakk.currency;
                                    AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                                    localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                                    AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");


                                        AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                         localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                         AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


                                    aakk.maxTaxPrice = currencyFomatter(parseFloat(aakk.taxPrice));
                                    aakk.maxSubTotal = currencyFomatter(parseFloat(aakk.subTotal));
                                    aakk.maxCouponDiscount = currencyFomatter(parseFloat(aakk.couponDiscount));
                                    aakk.maxTipamount = currencyFomatter(parseFloat(aakk.tipamount));
                                    aakk.maxVendordiscount = currencyFomatter(parseFloat(aakk.vendordiscount));
                                    aakk.maxDiscountPrice = currencyFomatter(parseFloat(aakk.discountPrice));
                                    aakk.maxGrandTotal = currencyFomatter(parseFloat(aakk.grandTotal));
                                    aakk.maxDeliveryPrice = currencyFomatter(parseFloat(aakk.deliveryPrice));

                                    if (aakk.miscTax != undefined) {
                                        var miscTaxArr = aakk.miscTax.list;
                                        for (var key in miscTaxArr) {
                                            miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                                        }
                                    }

                                    console.log("aakk    " + JSON.stringify(aakk));

                                   var html = compiledTemplate(aakk);
                                   mainView.router.load({content: html, animatePages: true});
                                   localStorage.setItem("foodpaydata","");
                                   localStorage.setItem("foodCourtpaydata","");
                              });
                            },1000);
                    }
                   else if(success.toLowerCase()=="outofstock")
                   {
                        Appyscript.alert(jsonObj.productName +"  "+AppyTemplate.global.pageLanguageSetting.your_cart_data_will_be_delete_due_to_different_vendor_product+" "+jsonObj.qty );
                   }
                    else
                    {
                       Appyscript.alert(something_went_wrong_please_try_again );
                    }
                    Appyscript.hideIndicator();
                },
                error: function(error)
                {

						      foodOrderIdForGloble='';
                                 orderId='';
                    Appyscript.hideIndicator();
                    Appyscript.alert("Oops, Order has been failed.");
                }
                });

    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage  );
    }

}



/*This method is used to hit ecommOrder service to send product details on server in case Payfast*/
var postDataJson;

function DineInSubmitOrderByPayfast(billingData, shippingData, paymentTypeObject, productList) {
    var postData = DineInCreateJsonFormOrder(billingData, shippingData, paymentTypeObject, productList, "payfast", "");
    console.log("payfast postData");
    console.log(postData);
    if (isOnline()) {
        $$.ajax({
            url: baseURL,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            async: true,
            timeout: 90000,
            //321 headers: {'accessToken': deviceEncryptedToken},
            success: function(jsonData, textStatus) {
                if (textStatus == 200 || textStatus == 'success') {
                    var jsonObj = JSON.parse(jsonData);
                    var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                    if (success.toLowerCase() == "success") {
                        var payTypeObj = $$(paymentTypeObject).parent();
                        var merchantId = payTypeObj.attr("data-payfastmerId");
                        var merchantKey = payTypeObj.attr("data-merchantKey");
                        postDataJson = JSON.parse(postData);
                        orderIdpay = postDataJson.orderId;
                        console.log("postDataJsonpostData:          " + JSON.stringify(postDataJson));
                        var totalProductDetail = '{"orderId":"' + postDataJson.orderId + '","currency":"' + postDataJson.currency + '","totalAmount":"' + postDataJson.discount.total +
                            '","merchantId":"' + merchantId + '","merchantKey":"' + merchantKey + '","userId":"' + localStorage.getItem("userid") + '"}';
                        DineInOpenPayfastViewForPayment(billingData, totalProductDetail);
                    } else if (success.toLowerCase() == "failure") {
                        $$.get("pages/dinein-error.html", function(template) {
                            var compiledTemplate = AppyTemplate.compile(template);
                            var html = compiledTemplate("");
                            mainView.router.load({
                                content: html,
                                animatePages: true
                            });
                        });
                    } else {
                        Appyscript.alert(something_went_wrong_please_try_again);
                        Appyscript.hideIndicator();
                    }
                } else {
                    Appyscript.alert(something_went_wrong_please_try_again);
                    Appyscript.hideIndicator();
                }
            },
            error: function(error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again);
            }
        });

    } else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage);
    }
}

/*This method is used to open payfast webview to pay amount of product*/
function DineInOpenPayfastViewForPayment(billingDataPar, payFastDataPar) {
    var billingData = JSON.parse(billingDataPar);
    var payFastData = JSON.parse(payFastDataPar);
    foodOrderIdForGloble = payFastData.orderId;
    var htmlForm = Appyscript.getPayFastHtml("", payFastData.merchantId, payFastData.merchantKey, payFastData.totalAmount,
        payFastData.currency, payFastData.orderId, site_url + "/paypalmobile/payfast-success", site_url + "/paypalmobile/payfast-cancel",
        site_url + "/paypalmobile/payfast-notify/orderId/" + payFastData.orderId + "/appId/" + app_id + "/lang/" + data.appData.lang, postDataJson.userData.name, postDataJson.userData.email, postDataJson.productDetails[0].name, "");
    Appyscript.hideIndicator();
    openPayfastNativeDinein(htmlForm, "dinein", pageData.pageTitle);
}

function openPayfastNativeDinein(htmlForm, pagetype, pageDatapageTitle) {
    if (Appyscript.device.android) {
        Appyscript.openPayFast(htmlForm, pagetype, pageDatapageTitle);
    } else {
        Appyscript.openPayFast(htmlForm, "dinein");
    }
}






/*
    This method is used to hit ecommOrder service to send product details on server in case Paypal
*/

function DineInSubmitOrderByPaypal(billingData,shippingData,paymentTypeObject,productList)
{
    var postData=DineInCreateJsonFormOrder(billingData,shippingData,paymentTypeObject,productList,"paypal_express","");
        console.log("-----------------------------------");
        console.log(postData);
    if(isOnline())
    {
                $$.ajax({
                url: baseURL,
                data:Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                async: true,
                //timeout: 90000,
                success: function(jsonData, textStatus )
                {
                    if(textStatus==200 ||  textStatus=='success')
                    {
                        var jsonObj=JSON.parse(jsonData);
                        var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                        if(success.toLowerCase()=="success")
                        {
                              var payTypeObj= $$(paymentTypeObject).parent();
                              var merchantId=payTypeObj.attr("data-merchantId");
                              var paypalId=payTypeObj.attr("data-paypalId");
                              var postDataJson=JSON.parse(postData);
                              orderIdpay = postDataJson.orderId;
                              var totalProductDetail='{"orderId":"'+postDataJson.orderId+'","currency":"'+postDataJson.currency+'","totalAmount":"'+postDataJson.discount.total+
                              '","paypalId":"'+paypalId+'","merchantId":"'+merchantId+'","userId":"'+localStorage.getItem("userid")+'"}';

                              DineInOpenPaypalViewForPayment(billingData,totalProductDetail);
                        }
                        else if(success.toLowerCase()=="failure")
                        {
                               $$.get("pages/dinein-error.html", function (template)
                               {
                                   var compiledTemplate = AppyTemplate.compile(template);
                                   var html = compiledTemplate("");
                                   mainView.router.load({content: html, animatePages: true});
                               });
                        }
                        else
                        {
                            Appyscript.alert(something_went_wrong_please_try_again );
                            Appyscript.hideIndicator();
                        }
                    }
                    else
                    {
                        Appyscript.alert(something_went_wrong_please_try_again );
                        Appyscript.hideIndicator();
                    }
                },
                error: function(error)
                {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again );
                }
                });

    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage  );
    }



}




/*
    This method is used to open paypal webview to pay amount of product
 */
function DineInOpenPaypalViewForPayment(billingDataPar,payPalDataPar)
{
    var billingData=JSON.parse(billingDataPar);
    var payPalData=JSON.parse(payPalDataPar);
    foodOrderIdForGloble=payPalData.orderId;

    var htmlForm= Appyscript.getPayPalHtml("", payPalData.paypalId, payPalData.totalAmount,
                                           payPalData.currency, payPalData.orderId,site_url+"/paypalmobile/success",
                                           site_url+"/paypalmobile/notify/orderId/"+payPalData.orderId+"/appId/"+app_id);

    Appyscript.hideIndicator();
    openPaypalNativeFoodCourt(htmlForm,"dinein",pageData.pageTitle);
}
function openPaypalNativeFoodCourt(htmlForm,pagetype,pageDatapageTitle)
{
    if(Appyscript.device.android)
    {
        Appyscript.openPaypal(htmlForm,pagetype,pageDatapageTitle);
    }
    else
    {
        Appyscript.openPaypal(htmlForm,"dinein");
    }
}
function DineInUpdateStatusFromNativeSide(status, orderIdPar)
{
    if(orderIdPar==null||foodOrderIdForGloble=="")
        orderIdPar=foodOrderIdForGloble;
    if(status.toLowerCase()=="success")
    {
          $$.get("pages/dinein-thanks.html", function (template)
          {

              var compiledTemplate = AppyTemplate.compile(template);
              var aakk=JSON.parse(localStorage.getItem("foodCourtpaydata"));
              thanksjson.orderId = orderIdPar;
              aakk.thanksjson=thanksjson;

                 currencyFomatterSymbolProductList = aakk.currency;
                 AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                 localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                 AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                  localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                  AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


                 console.log("DDddAS  " + localStorage.getItem("curSymForSym") + "    " + typeof localStorage.getItem("curSymForSym"));
                 aakk.maxTaxPrice = currencyFomatter(parseFloat(aakk.taxPrice));
                 aakk.maxSubTotal = currencyFomatter(parseFloat(aakk.subTotal));
                 aakk.maxCouponDiscount = currencyFomatter(parseFloat(aakk.couponDiscount));
                 aakk.maxTipamount = currencyFomatter(parseFloat(aakk.tipamount));
                 aakk.maxVendordiscount = currencyFomatter(parseFloat(aakk.vendordiscount));
                 aakk.maxDiscountPrice = currencyFomatter(parseFloat(aakk.discountPrice));
                 aakk.maxGrandTotal = currencyFomatter(parseFloat(aakk.grandTotal));
                 aakk.maxDeliveryPrice = currencyFomatter(parseFloat(aakk.deliveryPrice));

                 if (aakk.miscTax != undefined) {
                 var miscTaxArr = aakk.miscTax.list;
                 for (var key in miscTaxArr) {
                 miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                 }
                 }

                 console.log("aakk    " + JSON.stringify(aakk));

              var html = compiledTemplate(aakk);
              mainView.router.load({content: html, animatePages: true});
              localStorage.setItem("foodpaydata","");
              localStorage.setItem("foodCourtpaydata","");
           });
           foodOrderIdForGloble='';
           orderId='';
    }
    else if(status.toLowerCase()=="outofstock")
    {
        Appyscript.alert(jsonObj.productName +"  "+AppyTemplate.global.pageLanguageSetting.your_cart_data_will_be_delete_due_to_different_vendor_product+" "+jsonObj.qty );
    }
    else
    {
        $$.get("pages/dinein-error.html", function (template)
       {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(orderIdPar);
           mainView.router.load({content: html, animatePages: true});
       });

    }

  }





/*
    This method is used to hit  service to send product details on server in case PayU
 */
function DineInSubmitOrderByPayU(billingData,shippingData,paymentTypeObject,productList)
{
    var postData=DineInCreateJsonFormOrder(billingData,shippingData,paymentTypeObject,productList,"payu_money","");
        console.log("-----------------------------------");
        console.log(postData);
    if(isOnline())
    {
        $$.ajax({
                url: baseURL,
                data:Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                async: true,
                timeout: 90000,
                success: function(jsonData, textStatus ){
                    if(textStatus==200 || textStatus=='success')
                    {
                        var jsonObj=JSON.parse(jsonData);
                        var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                        if(success.toLowerCase()=="success")
                        {
                            var billData=JSON.parse(billingData);
                            var payTypeObj= $$(paymentTypeObject).parent();
                            var merchantId=payTypeObj.attr("data-merchantId");
                            var saltKey=payTypeObj.attr("data-saltKey");
                            var postDataJson=JSON.parse(postData);
                             orderIdpay = postDataJson.orderId;
                           openPayuViewNativeDineIn(postDataJson.discount.total, postDataJson.orderId,appid, billData.name, "lastName" ,billData.email,billData.phone,merchantId,saltKey,site_url,"dinein")
                        }
                        else if(success.toLowerCase()=="failure")
                        {
                            $$.get("pages/dinein-error.html", function (template)
                            {
                                  var compiledTemplate = AppyTemplate.compile(template);
                                  var html = compiledTemplate("");
                                  mainView.router.load({content: html, animatePages: true});
                             });
                        }
                        else
                        {
                            Appyscript.alert(something_went_wrong_please_try_again );
                        }
                    }
                    else
                    {
                        Appyscript.alert(something_went_wrong_please_try_again );
                    }
                    Appyscript.hideIndicator();
                },
                error: function(error)
                {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again );
                }
         });
    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage  );
    }
}


function openPayuViewNativeDineIn(postDataJsondiscounttotal, postDataJsonorderId,app_id, billDataname, lastName ,billDataemail,billDataphone,merchantId,saltKey,site_url,pagetype){
     if(Appyscript.device.android){
        Appyscript.openPayuView(postDataJsondiscounttotal, postDataJsonorderId,app_id, billDataname, lastName ,billDataemail,billDataphone,merchantId,saltKey,site_url,pagetype);
     }
     else{
        Appyscript.openPayuView(postDataJsondiscounttotal, postDataJsonorderId,app_id, billDataname, lastName ,billDataemail,billDataphone,merchantId,saltKey,site_url,pagetype);
     }
}







/*
 This method is used to hit ecommOrder service to send product details on server in case cc
 */
function DineInSubmitOrderByCC(billingData,shippingData,paymentTypeObject,productList,creditCardDetail, transactionId)
{
    var postData=DineInCreateJsonFormOrder(billingData,shippingData,paymentTypeObject,productList,"cc",transactionId);
        console.log("-----------------------------------");
        console.log(postData);
    if(isOnline())
    {
                $$.ajax({
                url: baseURL,
                data:Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                async: true,
                timeout: 90000,
                success: function(jsonData, textStatus )
                {
                    if(textStatus==200 || jsonData.status=='status')
                    {
                        var jsonObj=JSON.parse(jsonData);
                        console.log("----------------------------------");
                        console.log(jsonObj);

                        var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                        if(success.toLowerCase()=="success"&&transactionId!="")
                        {
                              $$.get("pages/dinein-thanks.html", function (template)
                              {

						          foodOrderIdForGloble='';
                                  orderId='';
                                  var compiledTemplate = AppyTemplate.compile(template);
                                  var aakk=JSON.parse(localStorage.getItem("foodCourtpaydata"));
                                  aakk.thanksjson=thanksjson;

                                    currencyFomatterSymbolProductList = aakk.currency;
                                    AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                                    localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                                    AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                                    AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                      localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                      AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


                                    aakk.maxTaxPrice = currencyFomatter(parseFloat(aakk.taxPrice));
                                    aakk.maxSubTotal = currencyFomatter(parseFloat(aakk.subTotal));
                                    aakk.maxCouponDiscount = currencyFomatter(parseFloat(aakk.couponDiscount));
                                    aakk.maxTipamount = currencyFomatter(parseFloat(aakk.tipamount));
                                    aakk.maxVendordiscount = currencyFomatter(parseFloat(aakk.vendordiscount));
                                    aakk.maxDiscountPrice = currencyFomatter(parseFloat(aakk.discountPrice));
                                    aakk.maxGrandTotal = currencyFomatter(parseFloat(aakk.grandTotal));
                                    aakk.maxDeliveryPrice = currencyFomatter(parseFloat(aakk.deliveryPrice));

                                    if (aakk.miscTax != undefined) {
                                        var miscTaxArr = aakk.miscTax.list;
                                        for (var key in miscTaxArr) {
                                            miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                                        }
                                    }

                                    console.log("aakk    " + JSON.stringify(aakk));

                                  var html = compiledTemplate(aakk);
                                  mainView.router.load({content: html, animatePages: true});
                                  localStorage.setItem("foodpaydata","");
                                  localStorage.setItem("foodCourtpaydata","");
                               });
                        }
                        else if(success.toLowerCase()=="outofstock")
                        {
                            Appyscript.alert(jsonObj.productName +"  "+AppyTemplate.global.pageLanguageSetting.your_cart_data_will_be_delete_due_to_different_vendor_product+" "+jsonObj.qty );
                        }
                        else if(success.toLowerCase()=="failure"||transactionId=="")
                        {
                                $$.get("pages/dinein-error.html", function (template)
                               {

						         foodOrderIdForGloble='';
                                 orderId='';
                                   var compiledTemplate = AppyTemplate.compile(template);
                                   var html = compiledTemplate("");
                                   mainView.router.load({content: html, animatePages: true});
                               });
                        }
                        else
                        {
                            Appyscript.alert(something_went_wrong_please_try_again );
                        }
                    }
                    else
                    {
                         Appyscript.alert(something_went_wrong_please_try_again );
                    }
                    Appyscript.hideIndicator();
                },
                error: function(error)
                {

						      foodOrderIdForGloble='';
                                 orderId='';
                   Appyscript.hideIndicator();
                   Appyscript.alert(something_went_wrong_please_try_again );
                }
             });
    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage  );
    }
}

/*
    This method is used to pay amount of product through stripe payment gateway
 */


 function DineInCreateOrderByStripe(billingData, shippingData, paymentTypeObject, productList, creditCardDetailPar) {

     var postData = DineInCreateJsonFormOrder(billingData, shippingData, paymentTypeObject, productList, "stripe", " ", " ");
     console.log("-----------------------------------");
     console.log(postData);
     if (isOnline()) {
         $$.ajax({
             url: baseURL,
             data: Appyscript.validateJSONData(postData),
             type: "post",
             async: true,
             timeout: 90000,
             //321 headers: {'accessToken': deviceEncryptedToken},
             success: function(jsonData, textStatus) {
                 if (textStatus == 200 || textStatus == 'success') {
                     var jsonObj = JSON.parse(jsonData);
                     var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                     if (success.toLowerCase() == "success") {
                         var billData = JSON.parse(billingData);
                         var payTypeObj = $$(paymentTypeObject).parent();
                         var merchantId = payTypeObj.attr("data-merchantId");
                         var saltKey = payTypeObj.attr("data-saltKey");
                         var postDataJson = JSON.parse(postData);
                          orderId = postDataJson.orderId;
                         DineInCreditCardPaymentThroughStripe(billingData,shippingData,paymentTypeObject,productList,creditCardDetailPar);
                     } else if (success.toLowerCase() == "failure") {
                         $$.get("pages/dinein-error.html", function(template) {
                             var compiledTemplate = AppyTemplate.compile(template);
                             var html = compiledTemplate("");
                             mainView.router.load({
                                 content: html,
                                 animatePages: true
                             });
                         });
                     } else {
                         Appyscript.alert(something_went_wrong_please_try_again);
                     }
                 } else {
                     Appyscript.alert(something_went_wrong_please_try_again);
                 }
//                 Appyscript.hideIndicator();
             },
             error: function(error) {
                 Appyscript.hideIndicator();
                 Appyscript.alert(something_went_wrong_please_try_again);
             }
         });
     } else {
         Appyscript.hideIndicator();
         Appyscript.alert(internetconnectionmessage);
     }
 }





function  DineInCreditCardPaymentThroughStripe(billingData,shippingData,paymentTypeObject,productList,creditCardDetailPar)
{
   var savecardcheck;
       var creditCardDetail;
       if(document.getElementById('savecardcheck'))
       {
       savecardcheck = document.getElementById('savecardcheck').checked
       }
       if(savecardcheck)
       {
       creditCardDetail=creditCardDetailPar;
       }
       else
       {
       creditCardDetail = JSON.parse(creditCardDetailPar);
       }

    var totalAmount= parseFloat(productList.grandTotal);
    totalAmount=totalAmount;
    /*var newdate=new Date().getTime();
    var orderId='ap'+newdate;*/
    // random number find
//     var randomFixedInteger = function (length)
//      {
//        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
//      }
//      var newdate=randomFixedInteger(5);
//      var orderId= 'ap'+vendorId +newdate;
       // orderId=orderId;

    var currency=productList.currency;
    var payTypeObj= $$(paymentTypeObject).parent();
    var clientId=payTypeObj.attr("data-clientId");
    var secretKey=payTypeObj.attr("data-secretKey");
    foodBillingDataForGloble=billingData;
    foodShippingDataForGloble=shippingData;
    foodProductListForGloble=productList;
    foodCreditCardDetailForGloble=creditCardDetailPar;
    foodOrderIdForGloble=orderId;
    foodPaymentTypeObjectForGloble=paymentTypeObject;


  /*  CreditCardPaymentNativeDineIn(creditCardDetail.number,creditCardDetail.expireMonth,
                                                                          creditCardDetail.expireYear,creditCardDetail.cvv2,creditCardDetail.firstName+" "+creditCardDetail.lastName,
                                                                          totalAmount,orderId,clientId,secretKey,currency ,localStorage.getItem("userid"), "dinein")*/
    var creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripeCvv');
        var cvv_code = creditCardJSON.cvvCode;
        if(savecardcheck && cvv_code!= null){
        if(cvv_code==null ||cvv_code==""){
            Appyscript.hideIndicator();
            Appyscript.alert(foodPleaseEnterCvvCode,appnameglobal_allpages);
            return
        }
        else{
            PaymentWithSaveCardFoodCourt1(totalAmount,orderId,clientId,secretKey,currency ,cvv_code);
        }
        }
        else{
        CreditCardPaymentNativeDineIn(creditCardDetail.number,creditCardDetail.expireMonth,
                                         creditCardDetail.expireYear,creditCardDetail.cvv2,creditCardDetail.firstName+" "+creditCardDetail.lastName,
                                         totalAmount,orderId,clientId,secretKey,currency ,localStorage.getItem("userid"), "dinein",customeridGlobalFoodcourt)
        }





}

/*
    this method is use for place order via Credit card
*/
function CreditCardPaymentNativeDineIn(creditCardDetailnumber,Month,Year,cvv2,NamelastName, totalAmount,orderId,clientId,secretKey,currency ,userId,pagetype,customeridGlobalFoodcourt)
{
    if(Appyscript.device.android)
    {
        Appyscript.goForCreditCardPayment(creditCardDetailnumber,Month,Year,cvv2,NamelastName, totalAmount,orderId,clientId,secretKey,currency ,userId,pagetype,customeridGlobalFoodcourt);
    }
    else
    {
        Appyscript.goForCreditCardPayment(creditCardDetailnumber,Month,Year,cvv2,NamelastName, totalAmount,orderId,clientId,secretKey,currency ,userId,pagetype,customeridGlobalFoodcourt);
    }
}

/*
    This method is used to hit ecommOrder service to send product details on server in case stripe
    Stipe native callback methode
 */
function DineInSubmitOrderByStripe(paymentId,customer_id)
{
    var billingData=foodBillingDataForGloble;
    var shippingData=foodShippingDataForGloble;
    var paymentTypeObject=paymentTypeObject;
    var productList= foodProductListForGloble;
    var orderId= foodOrderIdForGloble;


                      if(paymentId!=null)
                        {
                               AppyTemplate.global.cardLast4foodCourt ="";
                              $$.get("pages/dinein-thanks.html", function (template)
                              {

						      foodOrderIdForGloble='';
                                 orderId='';
                                  var compiledTemplate = AppyTemplate.compile(template);
                                  var aakk=JSON.parse(localStorage.getItem("foodCourtpaydata"));
                                  aakk.thanksjson=thanksjson;

                                    currencyFomatterSymbolProductList = aakk.currency;
                                    AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                                    localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                                    AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                                     AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                      localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                      AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


                                    aakk.maxTaxPrice = currencyFomatter(parseFloat(aakk.taxPrice));
                                    aakk.maxSubTotal = currencyFomatter(parseFloat(aakk.subTotal));
                                    aakk.maxCouponDiscount = currencyFomatter(parseFloat(aakk.couponDiscount));
                                    aakk.maxTipamount = currencyFomatter(parseFloat(aakk.tipamount));
                                    aakk.maxVendordiscount = currencyFomatter(parseFloat(aakk.vendordiscount));
                                    aakk.maxDiscountPrice = currencyFomatter(parseFloat(aakk.discountPrice));
                                    aakk.maxGrandTotal = currencyFomatter(parseFloat(aakk.grandTotal));
                                    aakk.maxDeliveryPrice = currencyFomatter(parseFloat(aakk.deliveryPrice));

                                    if (aakk.miscTax != undefined) {
                                        var miscTaxArr = aakk.miscTax.list;
                                        for (var key in miscTaxArr) {
                                            miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                                        }
                                    }

                                  console.log("aakk    " + JSON.stringify(aakk));
                                  var html = compiledTemplate(aakk);
                                  mainView.router.load({content: html, animatePages: true});
                                  localStorage.setItem("foodpaydata","");
                                  localStorage.setItem("foodCourtpaydata","");
                               });
                        }
//                        else if(success.toLowerCase()=="outofstock"){
//                            Appyscript.alert(jsonObj.productName +"  "+AppyTemplate.global.pageLanguageSetting.your_cart_data_will_be_delete_due_to_different_vendor_product+" "+jsonObj.qty );
//                        }
                        else {
                               $$.get("pages/dinein-error.html", function (template){
                                   var compiledTemplate = AppyTemplate.compile(template);
                                   var html = compiledTemplate(orderId);
                                   mainView.router.load({content: html, animatePages: true});
                               });
                        }


 }



//change by pramod
var objcard ={};
function DineInsdkResponseHandler(status, response) {
    console.log("sdkResponseHandler called");
    if (status != 200 && status != 201)
    {
     Appyscript.alert(response.cause[0].description,data.appData.appName);
     objcard.cardToken = "";
     DineInmercadoCardPayment();
     Appyscript.hideIndicator();
     return;
    }
    else
    {
    console.log("response of sdkResponseHandler==="+response.id);
        if(objcard.cardToken != undefined || objcard.cardToken != "")
       {
         objcard.cardToken = response.id;
         DineInmercadoCardPayment()
         return;
      }
   return;
   }
};

function DineInsetPaymentMethodInfo(status, response) {
     console.log("setPaymentMethodInfo called");
    if (status == 200) {
        // do somethings ex: show logo of the payment method
        console.log("response of setPaymentMethodInfo==="+response[0].id);
        objcard.payMethodID =response[0].id;
        return;
    }
};


/*
    This method is used to pay amount of product through mercado payment gateway
*/

var billData_val,shipData_val,paymentTypeObject_val,productList_val,userId_val;

function DineInmercadoDetail(billingData,shippingData,paymentTypeObject,productList,userId)
{

billData_val = billingData;
shipData_val = shippingData;
paymentTypeObject_val = paymentTypeObject;
productList_val = productList;
userId_val = userId;
creditCardDetail= DineInCreditCardDetailOfUser("payMercado");
};

function DineInmercadoCardPayment()
{
//      var baseurl = webserviceUrl+'FoodCourt.php';

    var postData=DineInCreateJsonFormOrder(billData_val,shipData_val,paymentTypeObject_val,productList_val,"mercadopago",userId_val);
    console.log("postData stripe::  baseurl  "+baseurl  +"   postData   "+postData);
    if(isOnline())
    {
        Appyscript.showIndicator();
        $$.ajax({
                url: baseURL,
                data:Appyscript.validateJSONData(postData),
                type: "post",
                async: true,
                //321 headers: {'accessToken': deviceEncryptedToken},
                success: function(jsonData, textStatus )
                {
                if(textStatus==200)
                {
                console.log("for check jsondata");

                var jsonObj=JSON.parse(jsonData);
                var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                if(success.toLowerCase()=="success")
                {
                var payTypeObj= $$(paymentTypeObject_val).parent();
                var sellerPhoneNo=payTypeObj.attr("data-phoneNo");
                if(!isNaN(sellerPhoneNo))
               {

                var parsePostData=JSON.parse(postData);
                DineInsubmitOrderByMercado(billData_val,shipData_val,paymentTypeObject_val,productList_val,userId_val,parsePostData.orderId);

//                 setTimeout(function()
//                            {
//                            submitOrderByMercado(billingData,shippingData,paymentTypeObject,productList,userid);

//                            },5000);
                }

                }
                else
                {
                orderIdForGloble='';
                orderId='';
                Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                }
                }
                else
                {
                orderIdForGloble='';
                orderId='';
                Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                }
                Appyscript.hideIndicator();
                },
                error: function(error)
                {
                orderIdForGloble='';
                orderId='';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);

                }
                });
    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage , appnameglobal_allpages);
    }
}


/*
    This method is used to hit ecommOrder service to send product details on server in case mercado
    Stipe native callback methode
 */


function DineInsubmitOrderByMercado(billingData,shippingData,paymentTypeObject,productList,userid,orderId)
{
   // console.log("credit card detILS "+billingData);
     console.log("token = "+objcard.cardToken+" method = "+objcard.payMethodID);

     app_id=localStorage.getItem("appid");
    var cardTokenMercado = objcard.cardToken
    var paymentIdMercado = objcard.payMethodID
    var mercadoLocale = localStorage.getItem("curSymForSym");
    var amount = JSON.parse(shippingData).totalAmount;
    var secretToken = $$(paymentTypeObject).parent().attr("data-secretKey");
    var userEmail = JSON.parse(billingData).email;
    var proId = productList.productList[0].id;
    var proDescription = productList.productList[0].description;
//    if(proDescription == ""){
        proDescription = "Some description";
//    }
    var postdata = '{"accessToken": "'+$$(paymentTypeObject).parent().attr("data-secretKey")+'","lang":"'+data.appData.lang+'","amount":"'+amount+'","token":"'+ cardTokenMercado+'","description":"'+proDescription+'","installments":"1","cardType":"'+paymentIdMercado+'","userEmail":"'+Appyscript.formToJSON('#payMercado').email+'","appId":"' + app_id + '","userId":"'+userid+'","productId": "' + proId + '","currencyCode":"'+productList.currency+'","orderId":"'+orderId+'"}';
     Appyscript.showIndicator();
    //var baseurl = "https://snappy.appypie.com/paypalmobile/mercadopago-payment";
      var baseurl = site_url + "/paypalmobile/mercadopago-payment";
   // var baseurl = "https://angularml.pbodev.info/paypalmobile/mercadopago-payment";
    if(isOnline())
    {

        $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postdata),
                type: "post",
                async: true,
                //321 headers: {'accessToken': deviceEncryptedToken},
                success: function(jsonData, textStatus )
                {    Appyscript.hideIndicator();
                    console.log("postData:submitOrderByPhone jsonData:::"+JSON.stringify(jsonData)+"::textStatus::"+textStatus);
                    if(textStatus==200 || textStatus=='success')
                    {
                        var jsonObj=JSON.parse(jsonData);
                        console.log("-------------");
                        console.log(jsonObj);
                        var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                       if(success.toLowerCase()=="success")
                       {
                          $$.get("pages/dinein-thanks.html", function (template)
                          {


                              orderId='';
                              var compiledTemplate = AppyTemplate.compile(template);
                              var aakk=JSON.parse(localStorage.getItem("foodCourtpaydata"));
                              aakk.thanksjson=thanksjson;

                                 aakk.thanksjson=thanksjson;
                                 currencyFomatterSymbolProductList = aakk.currency;
                                 AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                                 localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                                 AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                                 AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                  localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                  AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

                                 aakk.maxTaxPrice = currencyFomatter(parseFloat(aakk.taxPrice));
                                 aakk.maxSubTotal = currencyFomatter(parseFloat(aakk.subTotal));
                                 aakk.maxCouponDiscount = currencyFomatter(parseFloat(aakk.couponDiscount));
                                 aakk.maxTipamount = currencyFomatter(parseFloat(aakk.tipamount));
                                 aakk.maxVendordiscount = currencyFomatter(parseFloat(aakk.vendordiscount));
                                 aakk.maxDiscountPrice = currencyFomatter(parseFloat(aakk.discountPrice));
                                 aakk.maxGrandTotal = currencyFomatter(parseFloat(aakk.grandTotal));
                                 aakk.maxDeliveryPrice = currencyFomatter(parseFloat(aakk.deliveryPrice));

                                 if (aakk.miscTax != undefined) {
                                 var miscTaxArr = aakk.miscTax.list;
                                 for (var key in miscTaxArr) {
                                 miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                                 }
                                 }

                                 console.log("aakk    " + JSON.stringify(aakk));

                              var html = compiledTemplate(aakk);
                              mainView.router.load({content: html, animatePages: true});
                              localStorage.setItem("foodpaydata","");
                              localStorage.setItem("foodCourtpaydata","");
                              foodOrderIdForGloble='';
                           });
                       }
                       else if(success.toLowerCase()=="outofstock")
                       {
                            Appyscript.alert(jsonObj.productName +"  "+AppyTemplate.global.pageLanguageSetting.your_cart_data_will_be_delete_due_to_different_vendor_product+" "+jsonObj.qty );
                       }
                       else if(success.toLowerCase()=="failure")
                       {
                           $$.get("pages/dinein-error.html", function (template)
                           {

                              foodOrderIdForGloble='';
                                 orderId='';
                               var compiledTemplate = AppyTemplate.compile(template);
                                var html = compiledTemplate("");
                                 mainView.router.load({content: html, animatePages: true});
                            });
                        }
                       else
                       {
                           Appyscript.alert(something_went_wrong_please_try_again );
                       }
                    }
                    else
                    {
                        Appyscript.alert(something_went_wrong_please_try_again );
                    }
                    Appyscript.hideIndicator();
                },
                error: function(error)
                {
                console.log("some error occured");
                orderIdForGloble='';
                orderId='';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                }
                });
    }


}








var paymentMethodKe;
var deliveryOrPickUpTime;
var orderId=''
var thanksjson={};
var PaymantMethodType;

function DineInCreateJsonFormOrder(billingData, shippingData,productList, paymentMethodKey, paymentId, customer_id) {
    paymentMethodKe = '';
    deliveryOrPickUpTime = '';
    orderId = '';
    thanksjson = {};

    var totalAmount = parseFloat(productList.grandTotal);
    totalAmount = totalAmount;
    var deliveryAmount = parseFloat(typeof productList.deliveryPrice !== "undefined" ? (productList.deliveryPrice != null ? productList.deliveryPrice : 0.0) : 0.0);
    var discountAmount = parseFloat(typeof productList.discountPrice !== "undefined" ? (productList.discountPrice != null ? productList.discountPrice : 0.0) : 0.0);
    var vendordiscount = parseFloat(typeof productList.vendordiscount !== "undefined" ? (productList.vendordiscount != null ? productList.vendordiscount : 0.0) : 0.0);
    var taxAmount = parseFloat(productList.taxPrice != null ? productList.taxPrice : 0.0);
    var currency = typeof productList.currency !== "undefined" ? productList.currency : "";
    var coupandiscountType = typeof productList.couponType !== "undefined" ? productList.couponType : "";
    var coupandiscount = parseFloat(typeof productList.couponDiscount !== "undefined" ? (productList.couponDiscount != null ? productList.couponDiscount : 0.0) : 0.0);
    var subtotal = parseFloat(typeof productList.subTotal !== "undefined" ? (productList.subTotal != null ? productList.subTotal : 0.0) : 0.0)

    var tipamount = productList.tipamount;
    console.log("tipamount::: " + tipamount);

    var miscTax = productList.miscTax.list;
    var productDetails = [];
    var productDataFromList = productList.productList

    if (productDataFromList.length > 0) {
        for (var i = 0; i < productDataFromList.length; i++) {
            var custom_option = ""
            var productData = productDataFromList[i];
            if (typeof productData.custom_option !== "undefined") {
                custom_option = productData.custom_option;
            }
            var price;
            if (productData.offered == 1) {
                if (productData.custom_option) {
                    price = productData.price;
                } else {
                    price = productData.price - productData.price * productData.offeredDiscount / 100;
                }
            } else {
                price = productData.price;
            }
            productDetails.push({
                "productId": productData.id,
                "name": productData.name,
                "price": price,
                "qty": productData.orderQuantity,
                "description": productData.description,
                "currency": productData.currency,
                "custom_option": custom_option
            });
        }
    }



    var randomFixedInteger = function(length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }
    var newdate = randomFixedInteger(5);
    var orderId = 'ap' + vendorId + newdate;
    orderId = orderId;
    foodOrderIdForGloble = orderId;



    var discountInfo = '{"vendordiscount":"' + vendordiscount + '","discount":"' + discountAmount + '","delivery":"' + deliveryAmount + '","tax":"' +
        taxAmount + '","total":"' + totalAmount + '","subtotal":"' + subtotal + '","coupon":"' + coupandiscount + '","tip":"' + tipamount + '"}';
    console.log("tipamount::: " + discountInfo);

    var orderdate = Math.round(+new Date() / 1000);
    var timezon = getTimeZone();
    var localtimezone = "GMT" + timezon;


    var id = localStorage.getItem("userid");
    var name = localStorage.getItem("username");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");
    var userData = '{"id":"' + id + '","name":"' + name + '","email":"' + email + '","phone":"' + phone + '"}';
    var deliveryOrPickUpTime = "";

//    if (productList.payType == "pickup") {
//        deliveryOrPickUpTime = typeof productList.pickupTime !== "undefined" ? (productList.pickupTime != null ? productList.pickupTime : "") : "";
//        paymentMethodKe = paymentMethodKey;
//        deliveryOrPickUpTime = deliveryOrPickUpTime;
//    } else {
//        deliveryOrPickUpTime = typeof productList.deliveryTime !== "undefined" ? (productList.deliveryTime != null ? productList.deliveryTime : "") : "";
//        paymentMethodKe = paymentMethodKey;
//        deliveryOrPickUpTime = deliveryOrPickUpTime;
//    }

    deliveryOrPickUpTime = typeof productList.deliveryTime !== "undefined" ? (productList.deliveryTime != null ? productList.deliveryTime : "") : "";
    paymentMethodKe = paymentMethodKey;
    deliveryOrPickUpTime = deliveryOrPickUpTime;
    var instructionsText = typeof productList.Instruction !== "undefined" ? (productList.Instruction != null ? productList.Instruction : "") : "";
    instructionsText = instructionsText.replace(/['"]+/g, '');
    var pickupComment = '';
    if (instructionsText) {
        // pickupComment=instructionsText+"#$#$"+AppyTemplate.global.pageLanguageSetting.fc_delivery_pickup_time+":-"+deliveryOrPickUpTime+" "+AppyTemplate.global.pageLanguageSetting.fc_hours;
        pickupComment = instructionsText;
    } else {
        var aa = '';
        /*  if(deliveryOrPickUpTime)
          {
              aa=AppyTemplate.global.pageLanguageSetting.fc_delivery_pickup_time+" :-"+deliveryOrPickUpTime+" "+AppyTemplate.global.pageLanguageSetting.fc_hours;
          }*/
        // pickupComment=instructionsText+aa;
        pickupComment = instructionsText;
    }

    var foodCourtpaydata = JSON.parse(localStorage.getItem("foodCourtpaydata"));
    var orderType = foodCourtpaydata.payType;
    var instructionsComments = instructionsText;
    var pickupDeliveryTime = deliveryOrPickUpTime;

    var dining = "dining";
    localStorage.setItem("tablenumber1", tablenumber);
    console.log("orderType  foodOrder " + orderType + "  instructionsComments  " + instructionsComments + "  pickupDeliveryTime  " + pickupDeliveryTime);




    var deviceType = "",
        deviceId = "",
        deviceToken = "";
    if (Appyscript.device.android) {
        deviceType = 'android';
        deviceId = Appyscript.getDeviceId();
        deviceToken = Appyscript.getDeviceToken();
    } else {

    }

    /*if (paymentMethodKey == "stripe" || paymentMethodKey == "cc") {
        var savecardcheck;

        if (document.getElementById('savecardcheck')) {
            savecardcheck = document.getElementById('savecardcheck').checked
        }

        var creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripeCvv');
        var cvv_code = creditCardJSON.cvvCode;

        if (savecardcheck) {
            if (isNaN(cvv_code) || cvv_code.length < 3) {
                Appyscript.hideIndicator();
                Appyscript.alert(ecomPleaseEnterValidCvvCode, appnameglobal_allpages);
                return;
            } else {
                cvvCode = cvv_code;
            }
        }


        if (paymentMethodKey == "stripe") {

            var is_card_save = 0;
            var issavecardcheck;
            if (document.getElementById('issavecardcheck')) {
                issavecardcheck = document.getElementById('issavecardcheck').checked
            }
            if (issavecardcheck) {
                is_card_save = 1;
            }
            if (PaymentWithSaveCardcheckfoodcourt) {
                is_card_save = 1;
            }
            payment = '{"paymentId":"","paymentMethodLabel":"' + PaymantMethodType + '","paymentMethod":"' + paymentMethodKey + '","paymentStatus":"processing", "orderDate":"' + orderdate + '","gmtTime":"' + localtimezone + '" ,"orderType":"' + orderType + '","deliveryPickupTime":"' + pickupDeliveryTime + '","paymentCustomerId":"' + customer_id + '" ,"cvv":"' + cvvCode + '","is_card_save":"' + is_card_save + '","tableNo":"' + tablenumber + '","waiterId":"' + waiterId + '","waiterName":"' + waiterName + '","waiterPhone":"' + waiterPhone + '","vendorId":"' + vendorId + '","deviceType":"' + deviceType + '" ,"deviceId":"' + deviceId + '" ,"deviceToken":"' + deviceToken + '","pagetype":"' + dining + '"}';
        } else {
            payment = '{"paymentId":"' + paymentId + '","paymentMethodLabel":"' + PaymantMethodType + '","paymentMethod":"' + paymentMethodKey + '","paymentStatus":"Success", "orderDate":"' + orderdate + '","gmtTime":"' + localtimezone + '" ,"orderType":"' + orderType + '","deliveryPickupTime":"' + pickupDeliveryTime + '","tableNo":"' + tablenumber + '","waiterId":"' + waiterId + '","waiterName":"' + waiterName + '","waiterPhone":"' + waiterPhone + '","vendorId":"' + vendorId + '","deviceType":"' + deviceType + '" ,"deviceId":"' + deviceId + '" ,"deviceToken":"' + deviceToken + '","pagetype":"' + dining + '"}';
        }
    } else {
        payment = '{"paymentId":"' + paymentId + '","paymentMethodLabel":"' + PaymantMethodType + '","paymentMethod":"' + paymentMethodKey + '","paymentStatus":"processing", "orderDate":"' + orderdate + '","gmtTime":"' + localtimezone + '" ,"orderType":"' + orderType + '","deliveryPickupTime":"' + pickupDeliveryTime + '","tableNo":"' + tablenumber + '","waiterId":"' + waiterId + '","waiterName":"' + waiterName + '","waiterPhone":"' + waiterPhone + '","vendorId":"' + vendorId + '","deviceType":"' + deviceType + '" ,"deviceId":"' + deviceId + '" ,"deviceToken":"' + deviceToken + '","pagetype":"' + dining + '"}';
        //var payment='{"paymentId":"","paymentMethod":"'+paymentMethodKey+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'" ,"orderType":"'+orderType+'","deliveryPickupTime":"'+pickupDeliveryTime+'"}';
    }*/
    payment = '{"paymentId":"' + paymentId + '","paymentMethodLabel":"online","paymentMethod":"online","paymentStatus":"processing", "orderDate":"' + orderdate + '","gmtTime":"' + localtimezone + '" ,"orderType":"online","deliveryPickupTime":"' + pickupDeliveryTime + '","tableNo":"' + tablenumber + '","waiterId":"' + waiterId + '","waiterName":"' + waiterName + '","waiterPhone":"' + waiterPhone + '","vendorId":"' + vendorId + '","deviceType":"' + deviceType + '" ,"deviceId":"' + deviceId + '" ,"deviceToken":"' + deviceToken + '","pagetype":"' + dining + '"}';
    if (foodOrderIdForGloble != null && foodOrderIdForGloble != "") {
        orderId = foodOrderIdForGloble;
    }

    var postData = '{"method":"foodOrder","vendorId":"' + productList.vendeid + '","vendorName":"' + productList.vendorNameDineIn + '","store_email":"' + productList.store_email + '","store_mobile":"' + productList.store_mobile + '","address":"' + productList.address + '","appId":"' + app_id + '","appName":"' + data.appData.appName +
        '","appAdminName":"' + data.appData.ownerName + '","userData":' + userData + ',"orderId":"' + orderId +
        '","discount":' + discountInfo + ',"productDetails":' + JSON.stringify(productDetails) + ',"payment":' + payment +
        ',"currency":"' + currency + '","billingData":' + billingData + ',"shippingData":' + shippingData +
        ',"pickupComment":"' + pickupComment + '","miscTax":' + JSON.stringify(miscTax) + '}';

    foodOrderIdForGloble = orderId;

    console.log("postData::: " + postData);

    /*if (paymentMethodKe == "paypal_express") {
        for (var i = 0; i < foodPaymentData.paymentDetails.length; i++) {
            if (foodPaymentData.paymentDetails[i].key == "paypal") {
                PaymantMethodType = foodPaymentData.paymentDetails[i].label;
            }

        }
        thanksjson.paymentMethodlabel = PaymantMethodType;
    } else if (paymentMethodKe == "payfast") {
        for (var i = 0; i < foodPaymentData.paymentDetails.length; i++) {
            if (foodPaymentData.paymentDetails[i].key == "payfast") {
                PaymantMethodType = foodPaymentData.paymentDetails[i].label;
            }
        }
        thanksjson.paymentMethodlabel = PaymantMethodType;
    } else if (paymentMethodKe == "payu_money") {
        for (var i = 0; i < foodPaymentData.paymentDetails.length; i++) {
            if (foodPaymentData.paymentDetails[i].key == "payu_money") {
                PaymantMethodType = foodPaymentData.paymentDetails[i].label;
            }
        }
        thanksjson.paymentMethodlabel = PaymantMethodType;
    } else if (paymentMethodKe == "stripe") {
        for (var i = 0; i < foodPaymentData.paymentDetails.length; i++) {
            if (foodPaymentData.paymentDetails[i].key == "stripe") {
                PaymantMethodType = foodPaymentData.paymentDetails[i].label;
            }

        }
        thanksjson.paymentMethodlabel = PaymantMethodType;
    } else if (paymentMethodKe == "volecity") {
        for (var i = 0; i < foodPaymentData.paymentDetails.length; i++) {
            if (foodPaymentData.paymentDetails[i].key == "volecity") {
                PaymantMethodType = foodPaymentData.paymentDetails[i].label;
            }
        }
        thanksjson.paymentMethodlabel = PaymantMethodType;
    } else if (paymentMethodKe == "mercadopago") {
        for (vari = 0; i < foodPaymentData.paymentDetails.length; i++) {
            if (foodPaymentData.paymentDetails[i].key == "mercadopago") {
                PaymantMethodType = foodPaymentData.paymentDetails[i].label;
            }
        }
        thanksjson.paymentMethodlabel = PaymantMethodType;
    } else {
        thanksjson.paymentMethodlabel = foodPaymentData.paymentDetails[0].label;
    }

    thanksjson.paymentMethodKe = paymentMethodKe;
    thanksjson.deliveryOrPickUpTime = deliveryOrPickUpTime;
    thanksjson.orderId = orderId;*/

    return postData;
};




//call order page call invoice

function callforwaiterorder(index)
 {
     var indexx=parseInt(index);
   detailsdatadataDineIn=  oredrlist.orderList[indexx];
     Appyscript.popupPage('dinein-call-bill');
 }

// thanks page invoce call

function callforwaiterthank(waiter_id,waiter_name,vendor_id,waiter_phone)
    {
                                     Appyscript.showIndicator();
                                    var newtablenumber = localStorage.getItem("tablenumber1");

                                    var postdata='{"method":"callForBill","appId":"'+app_id+'","tableNo":"'+newtablenumber+'","waiterId":"'+waiter_id+'","waiterName":"'+waiter_name+'","waiterPhone":"'+waiter_phone+'","vendorId":"'+vendor_id+'"}';

                                    console.log("postdata"+postdata);
                                  //   var baseurl=  baseURL;

                                     $$.ajax({
                                     url: baseURL,
                                     data:Appyscript.validateJSONData(postdata),
                                     type: "post",
                                     //321 headers: {'accessToken': deviceEncryptedToken},

                                     timeout: 20000,
                                     async: true,
                                     success: function(jsonData, textStatus )
                                     {
                                       if(textStatus==200  || textStatus=='success')
                                       {
                                          callforBillThanks();
                                          Appyscript.hideIndicator();
                                         }
                                        else
                                         {

                                             Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                                             Appyscript.hideIndicator();
                                         }


                                     },error: function(error)
                                     {

                                         Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                                           Appyscript.hideIndicator();
                                     }
                                    });







       /*   waiterName
                                 waiterPhone
                                 vendorId
                                 tablenumber*/


        /*  var callbill =detailsdatadataDineIn.waiterLising ;
          for(v=0 ; callbill.length;v++)
          {
   		     if(callbill[v].tableNo == tablenumber)
           {
   			detailsdatadataDineIn.waiterLising= detailsdatadataDineIn.waiterLising[v];
           }
          }
           Appyscript.popupPage('dinein-call-bill');*/

     }



/*
        my order   page  on behalf of userid , appid and language
*/
 var oredrlist;
 function DineInMyoder()
   {
    pagelengthBackDineIn=mainView.history.length;
    var jsonPostecom= '{"method":"foodOrderInfo","appId":"'+app_id+'","userId":"'+localStorage.getItem("userid")+'","lang":"en"}';
    console.log(jsonPostecom);
         if(isOnline())
         {
            Appyscript.showIndicator();
             $$.ajax({
             url: baseURL,
             data: Appyscript.validateJSONData(jsonPostecom),
             type: "post",
             //321 headers: {'accessToken': deviceEncryptedToken},

             async: true,
             success: function(jsonData, textStatus )
             {
                var responcedata=JSON.parse(jsonData);
                oredrlist =responcedata;

                if(responcedata){
                 if (responcedata.orderList != undefined) {
                     var productListPriceArr = responcedata.orderList;
                     currencyFomatterSymbolProductList = responcedata.orderList[0].currency;
                     AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                     localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                     AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                     AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                     localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                     AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


                     for (var key in productListPriceArr) {
                         productListPriceArr[key].maxSubtotal = currencyFomatter(parseFloat(productListPriceArr[key].subtotal));
                         productListPriceArr[key].maxGtotal = currencyFomatter(parseFloat(productListPriceArr[key].gtotal));
                         productListPriceArr[key].maxDelivery = currencyFomatter(parseFloat(productListPriceArr[key].delivery));
                         productListPriceArr[key].maxTax = currencyFomatter(parseFloat(productListPriceArr[key].tax));
                         productListPriceArr[key].maxTip = currencyFomatter(parseFloat(productListPriceArr[key].tip));
                         productListPriceArr[key].maxVendorDiscount = currencyFomatter(parseFloat(productListPriceArr[key].vendorDiscount));
                         productListPriceArr[key].maxCoupon = currencyFomatter(parseFloat(productListPriceArr[key].coupon));
                         productListPriceArr[key].maxDiscount = currencyFomatter(parseFloat(productListPriceArr[key].discount));

                     }

                     for (var i = 0; i < productListPriceArr.length; i++) {
                         if (productListPriceArr[i].misctax.length) {
                             var maxcustomOption = productListPriceArr[i].misctax;
                             for (var key in maxcustomOption) {
                                 maxcustomOption[key].maxTaxAmount = currencyFomatter(parseFloat(maxcustomOption[key].taxAmount));
                             }
                         }
                     }

                 }
                 console.log("responcedata2@@@@  "+JSON.stringify(responcedata));
                 openFoodDineInPage("dinein-my-order",responcedata)
                 updateDineInIcon();
                }
                Appyscript.hideIndicator();

             },
             error: function(error)
             {
                   Appyscript.hideIndicator();
                   console.log("Error: " + error.code + " " + error.message);
             }
           });
       }
       else
       {
           Appyscript.hideIndicator();
           Appyscript.alert(internetconnectionmessage );
       }

    }
Appyscript.onPageInit('dinein-MyOrderPage',function(page)
{
    $$(".accordion-item-content").each(function(){
        var thisRow = $$(this);
        var gTotal = 0;
        thisRow.find("li[amount]").each(function(){
            gTotal += parseFloat($$(this).attr("amount"));
        })
        thisRow.find(".gTotal").find("span").text(thisRow.find(".gTotal").attr("currency") + (gTotal));
    })

    $$(".accordion-item").eq(0).find("a").eq(0).click();
    $$(".accordion-item").eq(0).find(".accordion-item").eq(0).find("a").eq(0).click();

});
/*
    for view order items  details page
*/
var CourtvendorIdd='';
var orderid='';
var vendr_id='';
function DineInViewOrderedItems(ttt,orderId,vendorId){

     vendr_id=vendorId;
     CourtvendorIdd=vendorId;
     orderid=orderId;
     var jsonPostecom= '{"method":"foodOrderProductDetail","orderId":"'+orderId+'","appId":"'+app_id+'","vendorId":"'+vendorId+'","emailId":"'+useremailIDDineIn+'"}';
     console.log(jsonPostecom);
        if(isOnline()){
            Appyscript.showIndicator();
             $$.ajax({
             url: baseURL,
             data: Appyscript.validateJSONData(jsonPostecom),
             type: "post",
             //321 headers: {'accessToken': deviceEncryptedToken},

             async: true,
             success: function(jsonData, textStatus ){
                var responcedata=JSON.parse(jsonData);
                if(responcedata.productList != undefined && responcedata.productList.length){
                    var productListPriceArr = responcedata.productList;
                    currencyFomatterSymbolProductList = responcedata.productList[0].currency;
                    AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                    localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                    AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                      AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                         localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                         AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


                    for (var key in productListPriceArr) {
                        productListPriceArr[key].maxPrice = currencyFomatter(parseFloat(productListPriceArr[key].price));
                        productListPriceArr[key].maxQuantity = currencyFomatter(parseFloat(productListPriceArr[key].quantity));
                    }
                }

                console.log("responcedata&&&&&&Detailsss    "+JSON.stringify(responcedata));
                if(responcedata){
                    openFoodDineInPage("dinein-view-ordered-items",responcedata)
                    updateDineInIcon();
                }
                Appyscript.hideIndicator();
             },
             error: function(error){
                   Appyscript.hideIndicator();
                   console.log("Error: " + error.code + " " + error.message);
             }
           });
       }
       else{
           Appyscript.hideIndicator();
           Appyscript.alert(internetconnectionmessage );
       }
    }
/*
    for post review
*/
 function DineInPostReview(a, id)
 {   var dininpostrevw ='{"method":"reviewDetail","appId":"'+app_id+'","vendorId":"'+vendr_id+'","emailId":"'+localStorage.getItem("email")+'"}'
    Appyscript.showIndicator();
     $$.ajax({
           url: baseURL,
           data: dininpostrevw,
           type: "post",
           //321 headers: {'accessToken': deviceEncryptedToken},

           async: true,
           success: function(jsonData, textStatus)
           {
              var responcedata=JSON.parse(jsonData);
              console.log(responcedata);
              if(responcedata.status=="addNew"){
               $$.get("pages/dinein-post-review.html", function (template)
                  {
                      getCategoryTemplate = template;
                      var compiledTemplate = AppyTemplate.compile(template);
                      var json= {"id":id};
                      var html = compiledTemplate(json);
                      mainView.router.load({content: html, animatePages: true});
                      updateDineInIcon();
                  });

              }else{
                $$.get("pages/dinein-post-review.html", function (template)
                 {
                     getCategoryTemplate = template;
                     var compiledTemplate = AppyTemplate.compile(template);
                     var json= responcedata;
                     var html = compiledTemplate(json);
                     mainView.router.load({content: html, animatePages: true});
                     updateDineInIcon();
                 });
              }
              Appyscript.hideIndicator();
           },
           error: function(error)
           {
                 Appyscript.hideIndicator();
                 console.log("Error: " + error.code + " " + error.message);
           }
         });


 }

 var foodStarValue = 0;
 var foodStarObj;
 function DineInGetRating(obj)
 {
     foodStarObj = obj;
     foodStarValue = $$(obj).index() + 1;
     if(parseInt(foodStarValue) > 1)
     {
         for(i=1; i<=parseInt(foodStarValue); i++)
         {
              $$("#rat"+i).attr('src', 'images/star-on-big.png');
         }
     }
     if(parseInt(foodStarValue) < 6)
     {
         foodStarValue=parseInt(foodStarValue)+1;
         for(i=parseInt(foodStarValue); i<=5; i++)
         {
              $$("#rat"+i).attr('src', 'images/star-off-big.png');
         }
     }
 }

 function DineInProductReOrder(a, id, catId, Courtvendo)
 {
     if(isOnline())
     {
         Appyscript.closeModal();
         var jsonPostecom= '{"method":"foodOrderProductDetailLatest","orderId":"'+orderid+'","appId":"'+app_id+'","vendorId":"'+CourtvendorIdd+'","emailId":"'+useremailIDDineIn+'"}';
         Appyscript.showIndicator();
//         $$.post(baseURL, jsonPostecom, function(data)
//         {
//             Appyscript.hideIndicator();
//             var responcedata = JSON.parse(data);
//             console.log(" jsonPostecom   foodOrderProductDetailLatest  "+responcedata);
//              if(responcedata.status !=' failure' &&  responcedata.status != 'fail' && responcedata.productList.length >0)
//              {
//                 storeProductListDataDineIn(responcedata);
//                 venderSubCatProductDineIn=responcedata;
//                 DineInvenddetails(CourtvendorIdd,venderSubCatProductDineIn);
//              }
//             else
//             {
//                 Appyscript.hideIndicator();
//                 Appyscript.alert(something_went_wrong_please_try_again );
//             }
//         },
//         function(error)
//         {
//             Appyscript.hideIndicator();
//             Appyscript.alert(something_went_wrong_please_try_again );
//         });

         $$.ajax({
             url: baseURL,
             data: jsonPostecom,
             type: "post",
             //321 headers: {'accessToken': deviceEncryptedToken},
             async: true,
             success: function (jsonData, textStatus) {
                Appyscript.hideIndicator();
                             var responcedata = JSON.parse(jsonData);
                             console.log(" jsonPostecom   foodOrderProductDetailLatest  "+responcedata);
                              if(responcedata.status !=' failure' &&  responcedata.status != 'fail' && responcedata.productList.length >0){

                                 var productListPriceArr = responcedata.productList;
                                 currencyFomatterSymbolProductList = responcedata.productList[0].currency;
                                 AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                                 localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                                 AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                                   AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                                      localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                                      AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

                                 for (var key in productListPriceArr) {
                                     productListPriceArr[key].maxPriceDinein = currencyFomatter(parseFloat(productListPriceArr[key].price));
                                 }

                                 for (var i = 0; i < productListPriceArr.length; i++) {
                                     if (productListPriceArr[i].customOption) {
                                         if(productListPriceArr[i].customOption[0]){
                                             var maxcustomOption = productListPriceArr[i].customOption[0].row;
                                             for (var key in maxcustomOption) {
                                                 maxcustomOption[key].maxRow_price = currencyFomatter(parseFloat(maxcustomOption[key].row_price));
                                             }
                                         }
                                     }
                                 }
                                 console.log("reorder**++  "+JSON.stringify(responcedata));
                                 storeProductListDataDineIn(responcedata);
                                 venderSubCatProductDineIn=responcedata;
                                 DineInvenddetails(CourtvendorIdd,venderSubCatProductDineIn);

                              }
                             else{
                                 Appyscript.hideIndicator();
                                 Appyscript.alert(something_went_wrong_please_try_again);
                             }
             },
             error: function (error) {
             Appyscript.hideIndicator();
             }
             });






     }
     else
     {
         Appyscript.hideIndicator();
         Appyscript.alert(internetconnectionmessage  );
     }
  }



var venddataastatus='';
function DineInvenddetails(vid ,fromp,chkouttt)
{
         var postdata='{"method":"vendorDesc","appId":"'+app_id+'","vendorId":"'+vid+'"}';
         console.log(postdata);
         Appyscript.showIndicator();
//         $$.post(baseURL, postdata, function(datad)
//         {
//             Appyscript.hideIndicator();
//
//             var  venddataa = JSON.parse(datad);
//             venddataastatus=venddataa.status;
//             console.log("venddataa   "+JSON.stringify(venddataa))
//             ;
//             if(venddataa.status != 'fail')
//             {
//                 checkvendorstatus=true;
//                 detailsdatadataDineIn=venddataa.vendorList.list;
//                 detailsdatadataDineIn=getStoreTimeDineIn(detailsdatadataDineIn);
//                 detailsdatadataDineIn.frompage='mainpage';
//
//                var postdataa= '{"method":"foodcourtConfigurationSettings","appId":"'+app_id+'", "vendorId":"'+vid+'"}';
//                if(fromp=='maincartold')
//                {
//                    serviceAPICallDineIn(postdataa,'figurationSettingsDineIn','','maincartold');
//                    if(chkouttt =='chekout')
//                    {
//                        ContinueCheckoutnewDineIn();
//                    }
//                }
//                else
//                {
//                    serviceAPICallDineIn(postdataa,'figurationSettingsDineIn');
//                    $$.get("pages/dinein-product-detail.html", function (template)
//                    {
//                         getCategoryTemplate = template;
//                         var compiledTemplate = AppyTemplate.compile(template);
//                         var html = compiledTemplate(venderSubCatProductDineIn);
//                         mainView.router.load({content: html, animatePages: true});
//                         updateDineInIcon();
//                    });
//                }
//             }
//             else
//             {
//                  Appyscript.hideIndicator();
//                  Appyscript.alert(something_went_wrong_please_try_again );
//             }
//         },
//        function(error)
//        {
//          Appyscript.hideIndicator();
//          Appyscript.alert(something_went_wrong_please_try_again );
//        });

        $$.ajax({
            url: baseURL,
            data: postdata,
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {

             Appyscript.hideIndicator();

                         jsonData = JSON.parse(jsonData);
                         venddataastatus=jsonData.status;
                         console.log("venddataa   "+JSON.stringify(jsonData))
                         ;
                         if(jsonData.status != 'fail')
                         {
                             checkvendorstatus=true;
                             detailsdatadataDineIn=jsonData.vendorList.list;
                             detailsdatadataDineIn=getStoreTimeDineIn(detailsdatadataDineIn);
                             detailsdatadataDineIn.frompage='mainpage';

                            var postdataa= '{"method":"foodcourtConfigurationSettings","appId":"'+app_id+'", "vendorId":"'+vid+'"}';
                            if(fromp=='maincartold')
                            {
                                serviceAPICallDineIn(postdataa,'figurationSettingsDineIn','','maincartold');
                                if(chkouttt =='chekout')
                                {
                                    ContinueCheckoutnewDineIn();
                                }
                            }
                            else
                            {
                                serviceAPICallDineIn(postdataa,'figurationSettingsDineIn');
                                $$.get("pages/dinein-product-detail.html", function (template)
                                {
                                     getCategoryTemplate = template;
                                     var compiledTemplate = AppyTemplate.compile(template);
                                     var html = compiledTemplate(venderSubCatProductDineIn);
                                     mainView.router.load({content: html, animatePages: true});
                                     updateDineInIcon();
                                });
                            }
                         }
                         else
                         {
                              Appyscript.hideIndicator();
                              Appyscript.alert(something_went_wrong_please_try_again );
                         }





            },
            error: function (error) {
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again );
            }
            });

}


Appyscript.onPageInit('dinein-trackmyorder',function(page)
{
                var nowp='nsez noida up';
                 var source='new ashok nagar , new delhi';
                 var destion ='noida sec-15, up';

                 var directionsService = new google.maps.DirectionsService;
                 var directionsDisplay = new google.maps.DirectionsRenderer;
                 var map = new google.maps.Map(document.getElementById('map'),
                 {
                  zoom: 10,
                  center: {lat: 41.85, lng: -87.65}
                });
                directionsDisplay.setMap(map);


                     var waypts = [];
                     waypts.push({location: nowp,stopover: true});
                      directionsService.route({
                      origin: source, destination: destion,waypoints: waypts,
                      optimizeWaypoints: true,
                      travelMode: 'DRIVING' }, function(response, status)
                      {
                          if (status === 'OK')
                          {
                              directionsDisplay.setDirections(response);
                              var route = response.routes[0];
                              var summaryPanel = document.getElementById('directions-panel');
                              summaryPanel.innerHTML = '';
                              // For each route, display summary information.
                              for (var i = 0; i < route.legs.length; i++)
                              {
                                  var routeSegment = i + 1;
                                  summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +'</b><br>';
                                  summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                                  summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                                  summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                              }
                          }
                          else
                          {
                            window.alert('Directions request failed due to ' + status);
                          }
                    });
});
  function trackMyOrder()
  {
            openFoodDineInPage("dinein-google map",'');
  }


/*
    for post product review
*/
 function DineInPostReviewOfProduct(a, id)
 {
     var title = $$("#InputTitle").val();
     var Review=$$("#comentInputTxt").val().trim();
     review=Review.replace(/\s+/g, " ");
     $$(".error").removeClass("error");
     if(foodStarValue == 0)
     {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_add_your_review_rating);
        return;
     }
 	 if(title.trim() == "")
     {
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_review_food);
        $$("#InputTitle").addClass("error");
        return;
     }
     if(review.trim() == "")
     {
          Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_review_food);
          $$("#comentInputTxt").addClass("error");
          return;
     }
    if(isOnline())
    {
        var FoodStarValue = foodStarValue -1;
        var postdata= '{"method":"addReview","appId":"'+app_id+'","email":"'+localStorage.getItem("email")+'","title":"'+title+'","review":"'+review+'","rating":"'+FoodStarValue+'","vendorId":"'+CourtvendorIdd+'","reviewId":"'+id+'"}';
        console.log(postdata);
        Appyscript.showIndicator();
        $$.ajax({
        url: baseURL,
        data: Appyscript.validateJSONData(postdata),
        type: "post",
        //321 headers: {'accessToken': deviceEncryptedToken},

        timeout: 10000,
        async: true,
        success: function(jsonData, textStatus )
        {
             Appyscript.hideIndicator();
             jsonData=JSON.parse(jsonData);
             if(jsonData.status != 'fail')
             {
               if(jsonData.status=="already_posted"){
             Appyscript.alert(AppyTemplate.global.pageLanguageSetting.already_posted_review);
               }

            else{
                 $$("#InputTitle").val("");
                 $$("#comentInputTxt").val("");

                 var  starValue="1";
                 for(i=parseInt(starValue); i<=5; i++)
                 {
                      $$("#rat"+i).attr('src', 'images/star-off-big.png');
                      starValue=parseInt(starValue)+1;
                 }
                 foodStarValue=0;
                 Appyscript.alert(AppyTemplate.global.pageLanguageSetting.your_review_successfuly_food , data.appData.appName,function(){ Appyscript.hideIndicator(); mainView.router.back()});
            }
            }
            else
            {
                 Appyscript.hideIndicator();
                 Appyscript.alert(something_went_wrong_please_try_again );
            }
        },error: function(error)
        {
             Appyscript.hideIndicator();
             Appyscript.alert(something_went_wrong_please_try_again );
             console.log("Error " + error.code + " " + error.message);
        }
        });
    }
    else
    {
    	Appyscript.hideIndicator();
    	Appyscript.alert(internetconnectionmessage  );
    }
 }


Appyscript.foodremovefavlist=function(){
    if(isOnline())
    {
          var postdatadinein ='{"method":"vendorFavouritesList","appId":"'+app_id+'","email":"'+useremailIDDineIn+'","latitude":"'+dineinlatitude+'","longitude":"'+dineinlongitude+'"}';
        Appyscript.showIndicator();
        $$.ajax({
                url: baseURL,
                data: Appyscript.validateJSONData(postdatafoodcourt),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},

                async: true,
                success: function(jsonData, textStatus )
                {

                var responcedata=JSON.parse(jsonData);


                Appyscript.hideIndicator();
               $$.get("pages/dinein-FavoriteOffers.html", function (template)
                       {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(responcedata);

                    mainView.router.reloadContent(html);
                   updateDineInIcon();
                       });


                },
                error: function(error)
                {
                Appyscript.hideIndicator();
                console.log("Error: " + error.code + " " + error.message);
                }
                });
    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage );
    }
}




Appyscript.onPageBack('dinein-FOLS',function(page)
{
     AppyTemplate.global.foodcourtcustomheaderforsearch="";
});


Appyscript.foodcourtBackFunctionDineIn = function(){
switch(backpage){
        case 'dinein':
        case 'dinein-hotelinfo':
        case 'dinein-FOLS':
        case 'dinein-category':
            mainView.router.back();
            return false;
            break;
        default:
                  var totalback= mainView.history.length - pagelengthBackDineIn;
                  for(var i=0;i< totalback ;i++)
                  {
                     mainView.router.back({ ignoreCache: true, animatePages: false});
                  }
                 return false;
                break;
}
}







// Helper for Rating
AppyTemplate.registerHelper('RatinghelperDineIn', function(starcount)
{
    var HotelHalfRatingHtml =starcount;
    var hotelhalfset=true;
    HotelHalfRatingHtml = HotelHalfRatingHtml.toString().split('.');
    var HotelRatingHtml = '<span class="ratingList"><fieldset class="ratingStar">';
    for(var i=1; i<=5; i++)
    {
    if(i <= parseInt(starcount))
    {
        HotelRatingHtml+='<label class="half on" for="starhalf" title="0.5 stars"></label><label class="full on" for="star1" title="1 star"></label>';
    }
    else
    {
    if(HotelHalfRatingHtml[1] && hotelhalfset){
    HotelRatingHtml+='<label class="half on" for="star1half" title="1.5 stars"></label><label class="full" for="star2" title="2 stars"></label>';
    hotelhalfset=false;
    }else{
    HotelRatingHtml+='<label class="half" for="star2half" title="2.5 stars"></label><label class="full" for="star3" title="3 stars"></label>';
    }
    }
    }
    HotelRatingHtml+=' </fieldset></span>';
    return HotelRatingHtml;
});



function getdaysnowDineIn(pos)
{
    var daynow='';
    if(pos == '0')
    {
       daynow =AppyTemplate.global.pageLanguageSetting.Sunday;
    }
    else if(pos == '1')
    {
        daynow =AppyTemplate.global.pageLanguageSetting.Monday;
    }
    else if(pos == '2')
    {
        daynow =AppyTemplate.global.pageLanguageSetting.Tuesday;
    }
    else if(pos == '3')
    {
        daynow =AppyTemplate.global.pageLanguageSetting.Wednesday;
    }
    else if(pos == '4')
    {
        daynow =AppyTemplate.global.pageLanguageSetting.Thursday;
    }
    else if(pos == '5')
    {
        daynow =AppyTemplate.global.pageLanguageSetting.Friday;
    }
    else if(pos == '6')
    {
        daynow =AppyTemplate.global.pageLanguageSetting.Saturday;
    }
    else
    {
        daynow='';
    }
    return daynow;
}









// Helper for Restaurant Open  Closed
function GetOpenCloseVendorDineIn(detailsdata)
{
	if(detailsdata.preferred_deliverytime_required =='1')
	{
		var storeOpenTime=JSON.parse(detailsdata.store_opening_time_schedule);
		var storeOperactionTime=JSON.parse(detailsdata.customer_servicing_time_schedule);
		var tim={"storetimeopen":storeOpenTime,"storeServiceingtime":storeOperactionTime};
		tim.preferredDeliveryTimeReq=detailsdata.preferred_deliverytime_required;
		var d = new Date();
		var n = d.getDay();



		if(storeOpenTime.day[n].isOpen)
		{
			for(k=0;k<storeOpenTime.day[n].storeTime.length;k++)
			{
			    var twofromlang=AppyTemplate.global.pageLanguageSetting.fc_to;
			    var daysss=getdaysnowDineIn(n);
                 var AMPMStartTime='';
                 var AMPMEndTime='';
                 if(storeOpenTime.day[n].storeTime[k].AMStart == 'AM')
                  {
                      AMPMStartTime=AppyTemplate.global.pageLanguageSetting.AM;
                  }
                  else
                  {
                      AMPMStartTime=AppyTemplate.global.pageLanguageSetting.PM;
                  }
                  if(storeOpenTime.day[n].storeTime[k].AMEnd == 'AM')
                  {
                      AMPMEndTime=AppyTemplate.global.pageLanguageSetting.AM;
                  }
                  else
                  {
                      AMPMEndTime=AppyTemplate.global.pageLanguageSetting.PM;
                  }

				var todaystime=daysss +"  "+storeOpenTime.day[n].storeTime[k].HStart +":"+storeOpenTime.day[n].storeTime[k].MStart +" "+AMPMStartTime+" "+twofromlang +" "+storeOpenTime.day[n].storeTime[k].HEnd +":"+storeOpenTime.day[n].storeTime[k].MEnd+" "+AMPMEndTime;
				var t = new Date();
				d = t.getDate();
				m = t.getMonth() + 1;
				y = t.getFullYear();
				var chour = t.getHours();
				var cminute = t.getMinutes();
				var ampm='AM';
				if(chour>=12)
				{
					ampm='PM'
					chour=chour-12;
				}
				if(chour<10)
				{
					chour ="0"+chour;
				}
				var nowtime = chour +":"+cminute +" "+ampm;
				var opentime=storeOpenTime.day[n].storeTime[k].HStart +":"+storeOpenTime.day[n].storeTime[k].MStart +" "+storeOpenTime.day[n].storeTime[k].AMStart;
				var closetime=storeOpenTime.day[n].storeTime[k].HEnd +":"+storeOpenTime.day[n].storeTime[k].MEnd+" "+storeOpenTime.day[n].storeTime[k].AMEnd;

				var curtime = new Date(m + "/" + d + "/" + y + " " + nowtime);   // current time
				var sttime = new Date(m + "/" + d + "/" + y + " " + opentime);   // start time
				var entime = new Date(m + "/" + d + "/" + y + " " + closetime);  // end time
				var tnow = curtime.getTime();
				var tstart = sttime.getTime();
				var tend = entime.getTime();
				console.log("tstart "+tstart +" entime "+entime);
				if(tnow >= tstart  && tnow<=entime)
				{
					tim.todaystime=todaystime;
					detailsdata.storetime=tim;
					return AppyTemplate.global.pageLanguageSetting.fc_open;
				}
				else
				{
					if(k != storeOpenTime.day[n].storeTime.length-1)
					{
                        if(k < storeOpenTime.day[n].storeTime.length)
                        {
                        }
                        else
                        {
                            return AppyTemplate.global.pageLanguageSetting.closed;
                        }
					}
					else{
						return AppyTemplate.global.pageLanguageSetting.closed;
					}
				}
			}
		}
		else
		{
			return AppyTemplate.global.pageLanguageSetting.closed;
		}
	}
	else
	{
		return AppyTemplate.global.pageLanguageSetting.fc_open;
	}
}







// Helper for Restaurant Open / Closed
AppyTemplate.registerHelper('opencloseDineIn', function(detailsdata)
{
    //console.log(detailsdata);
	if(detailsdata.preferred_deliverytime_required =='1')
	{
        //console.log("storetimemmemeqweqw"+detailsdata.store_opening_time_schedule);
		var storeOpenTime=JSON.parse(detailsdata.store_opening_time_schedule);
		//console.log("storetimemmeme"+storeOpenTime);
		var storeOperactionTime=JSON.parse(detailsdata.customer_servicing_time_schedule);
		var tim={"storetimeopen":storeOpenTime,"storeServiceingtime":storeOperactionTime};
		tim.preferredDeliveryTimeReq=detailsdata.preferred_deliverytime_required;
		var d = new Date();
		var n = d.getDay();



		if(storeOpenTime.day[n].isOpen)
		{
			for(k=0;k<storeOpenTime.day[n].storeTime.length;k++)
			{
			    var twofromlang=AppyTemplate.global.pageLanguageSetting.fc_to;
			    var daysss=getdaysnowDineIn(n);


                 var AMPMStartTime='';
                 var AMPMEndTime='';
                 if(storeOpenTime.day[n].storeTime[k].AMStart == 'AM')
                  {
                      AMPMStartTime=AppyTemplate.global.pageLanguageSetting.AM;
                  }
                  else
                  {
                      AMPMStartTime=AppyTemplate.global.pageLanguageSetting.PM;
                  }
                  if(storeOpenTime.day[n].storeTime[k].AMEnd == 'AM')
                  {
                      AMPMEndTime=AppyTemplate.global.pageLanguageSetting.AM;
                  }
                  else
                  {
                      AMPMEndTime=AppyTemplate.global.pageLanguageSetting.PM;
                  }

				var todaystime=daysss +"  "+storeOpenTime.day[n].storeTime[k].HStart +":"+storeOpenTime.day[n].storeTime[k].MStart +" "+AMPMStartTime+" "+twofromlang +" "+storeOpenTime.day[n].storeTime[k].HEnd +":"+storeOpenTime.day[n].storeTime[k].MEnd+" "+AMPMEndTime;
				var t = new Date();
				d = t.getDate();
				m = t.getMonth() + 1;
				y = t.getFullYear();
				var chour = t.getHours();
				var cminute = t.getMinutes();
				var ampm='AM';
				if(chour>=12)
				{
					ampm='PM'
					chour=chour-12;
				}
				if(chour<10)
				{
					chour ="0"+chour;
				}
				var nowtime = chour +":"+cminute +" "+ampm;
				var opentime=storeOpenTime.day[n].storeTime[k].HStart +":"+storeOpenTime.day[n].storeTime[k].MStart +" "+storeOpenTime.day[n].storeTime[k].AMStart;
				var closetime=storeOpenTime.day[n].storeTime[k].HEnd +":"+storeOpenTime.day[n].storeTime[k].MEnd+" "+storeOpenTime.day[n].storeTime[k].AMEnd;

				var curtime = new Date(m + "/" + d + "/" + y + " " + nowtime);   // current time
				var sttime = new Date(m + "/" + d + "/" + y + " " + opentime);   // start time
				var entime = new Date(m + "/" + d + "/" + y + " " + closetime);  // end time
				var tnow = curtime.getTime();
				var tstart = sttime.getTime();
				var tend = entime.getTime();
				console.log("tstart "+tstart +" entime "+entime);
				if(tnow >= tstart  && tnow<=entime)
				{
					tim.todaystime=todaystime;
					detailsdata.storetime=tim;
					return AppyTemplate.global.pageLanguageSetting.fc_open;
				}
				else
				{
					if(k != storeOpenTime.day[n].storeTime.length-1)
					{
                        if(k < storeOpenTime.day[n].storeTime.length)
                        {
                        }
                        else
                        {
                            return AppyTemplate.global.pageLanguageSetting.closed;
                        }
					}
					else{
						return AppyTemplate.global.pageLanguageSetting.closed;
					}
				}
			}
		}
		else
		{
			return AppyTemplate.global.pageLanguageSetting.closed;
		}
	}
	else
	{
		return AppyTemplate.global.pageLanguageSetting.fc_open;
	}
});








AppyTemplate.registerHelper('cusinelisthelperDineIn', function(detailsdata)
{
    var cusinelistarray=[];
    for(i=0;i<detailsdata.length;i++)
    {
        cusinelistarray.push(detailsdata[i].cuisine_name);
    }
    return cusinelistarray.toString()
});


AppyTemplate.registerHelper('andsymbolhelperDineIn', function(code,online)
{

    if(code !='' && online!='' )
    {
        return  AppyTemplate.global.pageLanguageSetting.COD + " & "+ AppyTemplate.global.pageLanguageSetting.Online;
    }
    else if(code !='')
    {
        return AppyTemplate.global.pageLanguageSetting.COD;
    }
    else if(online!='')
    {
        return AppyTemplate.global.pageLanguageSetting.Online;
    }
    else
    {
        return "";
    }

})



// Helper for  show time
AppyTemplate.registerHelper('openclosetimeDineIn', function(detailsdata)
{
//        console.log(detailsdata);
		if(detailsdata.preferred_deliverytime_required =='1')
		{
			var storeOpenTime=JSON.parse(detailsdata.store_opening_time_schedule);
			var storeOperactionTime=JSON.parse(detailsdata.customer_servicing_time_schedule);
			var tim={"storetimeopen":storeOpenTime,"storeServiceingtime":storeOperactionTime};
			tim.preferredDeliveryTimeReq=detailsdata.preferred_deliverytime_required;
			var d = new Date();
			var n = d.getDay();

			console.log("checkdfsdf"+n);
		//	console.log("checktime"+storeOpenTime.day[n].isOpen);
			if(storeOpenTime.day[n].isOpen)
			{
				for(k=0;k<storeOpenTime.day[n].storeTime.length;k++)
				{
                    var twofromlang=AppyTemplate.global.pageLanguageSetting.fc_to;
                    var daysss=getdaysnowDineIn(n);
                    var AMPMStartTime='';
                    var AMPMEndTime='';
                    if(storeOpenTime.day[n].storeTime[k].AMStart == 'AM')
                    {
                        AMPMStartTime=AppyTemplate.global.pageLanguageSetting.AM;
                    }
                    else
                    {
                        AMPMStartTime=AppyTemplate.global.pageLanguageSetting.PM;
                    }
                    if(storeOpenTime.day[n].storeTime[k].AMEnd == 'AM')
                    {
                        AMPMEndTime=AppyTemplate.global.pageLanguageSetting.AM;
                    }
                    else
                    {
                        AMPMEndTime=AppyTemplate.global.pageLanguageSetting.PM;
                    }

					var todaystime=daysss  +"  "+storeOpenTime.day[n].storeTime[k].HStart +":"+storeOpenTime.day[n].storeTime[k].MStart +" "+storeOpenTime.day[n].storeTime[k].AMStart +" "+twofromlang +" "+storeOpenTime.day[n].storeTime[k].HEnd +":"+storeOpenTime.day[n].storeTime[k].MEnd+" "+storeOpenTime.day[n].storeTime[k].AMEnd;
					var t = new Date();
					d = t.getDate();
					m = t.getMonth() + 1;
					y = t.getFullYear();
					var chour = t.getHours();
					var cminute = t.getMinutes();
					var ampm='AM';
					if(chour>=12)
					{
						ampm='PM'
						chour=chour-12;
					}
					if(chour<10)
					{
						chour ="0"+chour;
					}
					var nowtime = chour +":"+cminute +" "+ampm;
					var opentime=storeOpenTime.day[n].storeTime[k].HStart +":"+storeOpenTime.day[n].storeTime[k].MStart +" "+storeOpenTime.day[n].storeTime[k].AMStart;
					var closetime=storeOpenTime.day[n].storeTime[k].HEnd +":"+storeOpenTime.day[n].storeTime[k].MEnd+" "+storeOpenTime.day[n].storeTime[k].AMEnd;

					var curtime = new Date(m + "/" + d + "/" + y + " " + nowtime);   // current time
					var sttime = new Date(m + "/" + d + "/" + y + " " + opentime);   // start time
					var entime = new Date(m + "/" + d + "/" + y + " " + closetime);  // end time
					var tnow = curtime.getTime();
					var tstart = sttime.getTime();
					var tend = entime.getTime();
				//	console.log("tstart "+tstart +" entime "+entime);
					if(tnow >= tstart  && tnow<=entime)
					{
						tim.todaystime=todaystime;
						detailsdata.storetime=tim;
						return todaystime;
					}
					else
					{
						return AppyTemplate.global.pageLanguageSetting.fc_view;
					}
				}
			}
			else
			{
				return AppyTemplate.global.pageLanguageSetting.fc_view;
			}
		}
		else
		{
			return "00:01 "+AppyTemplate.global.pageLanguageSetting.fc_to  +" 11:59 PM";
		}
});

AppyTemplate.global.waitor_data={};
Appyscript.diniingtablenumber = function(a , wid , wname , wnumber, wvendor,tablno)
{
     waitor_data={};
     waiterId = wid;
     waiterName= wname;
     waiterPhone =wnumber;
     vendorId  = wvendor;
     tablenumberTemp = $$(a).attr("value");
	  $$("#pickAddress1").hide();
	  $$("#pickAddress").find("span").html(tablenumberTemp);
	  AppyTemplate.global.waitor_data.waitor_id=wid;
	  AppyTemplate.global.waitor_data.waitor_name=wname;
	  AppyTemplate.global.waitor_data.waitor_number=wnumber;
	  AppyTemplate.global.waitor_data.table_number=tablno;
	}
//for call bill function
 function callforbill(a , wid , wname , wnumber,wtable,wvendor)
                               	{

                                              Appyscript.showIndicator();
                                               var waiterIdc = wid;
                                               var waiterNamec= wname;
                                               var waiterPhonec =wnumber;
                                               var tablenumberc =wtable;
                                               var  vendorIdc=wvendor;
                               	               app_id=localStorage.getItem("appid");
                                               var postdata='{"method":"callForBill","appId":"'+app_id+'","tableNo":"'+tablenumberc+'","waiterId":"'+waiterIdc+'","waiterName":"'+waiterNamec+'","waiterPhone":"'+waiterPhonec+'","vendorId":"'+vendorIdc+'"}';

                                                  console.log("postdata"+postdata);
                                                  // var baseurl=  site_url+'/webservices/Dining.php';

                                                   $$.ajax({
                                                   url: baseURL,
                                                   data:Appyscript.validateJSONData(postdata),
                                                   type: "post",
                                                   //321 headers: {'accessToken': deviceEncryptedToken},

                                                   timeout: 20000,
                                                   async: true,
                                                   success: function(jsonData, textStatus )
                                                   {
                                                     if(textStatus==200  || textStatus=='success')
                                                     {
                                                        callforBillThanks();
                                                        Appyscript.hideIndicator();
                                   			         }
                                   				    else
                                                       {

                                                           Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                                                           Appyscript.hideIndicator();
                                                       }


                                                   },error: function(error)
                                                   {

                                                       Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                                                         Appyscript.hideIndicator();
                                                   }
                                               });


                               	}

     // call waiter function
  function callforWaiter(a , wid , wname , wnumber,wtable,wvendor)
	{
                Appyscript.showIndicator();
                var waiterIdw = wid;
                var waiterNamew= wname;
                var  waiterPhonew =wnumber;
                var tablenumberw =wtable;
                var  vendorIdw=wvendor;
	               app_id=localStorage.getItem("appid");
                    var postdata='{"method":"callForWiater","appId":"'+app_id+'","tableNo":"'+tablenumberw+'","waiterId":"'+waiterIdw+'","waiterName":"'+waiterNamew+'","waiterPhone":"'+waiterPhonew+'","vendorId":"'+vendorIdw+'"}';
                    console.log("postdata"+postdata);
                   // var baseurl=  site_url+'/webservices/Dining.php';

                    $$.ajax({
                    url: baseURL,
                    data:Appyscript.validateJSONData(postdata),
                    type: "post",
                    //321 headers: {'accessToken': deviceEncryptedToken},

                    timeout: 20000,
                    async: true,
                    success: function(jsonData, textStatus )
                    {
                      if(textStatus==200  || textStatus=='success')
                      {
                           callforWaiterthanks();
                           Appyscript.hideIndicator();
    			      }
    				    else
                        {

                            Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                            Appyscript.hideIndicator();
                        }


                    },error: function(error)
                    {

                        Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                });


	}


	//stripe through payment web end

	  function dineinpaymentByStripeinjs(token, totalAmount,cunrcy,orderId,discriptionn,pageType)
                                     {

                                                    var totalAmount= (parseFloat(totalAmount) * 100)
                                                    var email =localStorage.getItem("email")
                                                    if(customeridGlobalFoodcourt!=null)
                                                    {

                                                    var SavecardUrl = site_url+'/notify/paymentfoodcourtbystripe/appId/'+app_id+'/customerId/'+customeridGlobalFoodcourt+'/tokenId/'+token+'/orderId/'+orderId+'/email/'+email+'/description/583380/currency/'+cunrcy+'/amount/'+totalAmount+'';

                                                    }
                                                    else
                                                    {
                                                    var SavecardUrl = site_url+'/notify/paymentfoodcourtbystripe/appId/'+app_id+'/tokenId/'+token+'/orderId/'+orderId+'/email/'+email+'/description/583380/currency/'+cunrcy+'/amount/'+totalAmount+'';
                                                    }


                                                    $$.ajax({
                                                            type: 'GET',
                                                            url: SavecardUrl,
                                                            dataType: 'json',
                                                            success: function(data)
                                                            {
                                                            console.log(SavecardUrl);
                                                            console.log(data);

                                                            //{transaction_id: "ch_1APQcoH0v6qh6ANIDj80OrWe", customer_id: "cus_AkdumJRvPtH5QY", status: "succeeded"}

                                                            if(data.status == "succeeded")
                                                            {
                                                            customeridGlobalFoodcourt = data.customer_id;
                                                            DineInSubmitOrderByStripe(data.transaction_id,data.customer_id)
                                                            }
                                                            else if(data.status == "fail" && data.exception)
                                                            {

                                                            Appyscript.alert(data.exception,appnameglobal_allpages);

                                                            Appyscript.hideIndicator();
                                                            }

                                                            },
                                                            error: function(data)
                                                            {


                                                            }
                                                            });




                                     }

//save card

                                              function cardDetailsForDinein()
                                              {
                                                var email =localStorage.getItem("email");
                                                if(email==null || email=="")
                                                {
                                                if(localStorage.getItem("pickupbillingFoodcourtEmail")!=null)
                                                {
                                                email = localStorage.getItem("pickupbillingFoodcourtEmail");
                                                }
                                                else if(localStorage.getItem("billingMailFoodcourt")!=null)
                                                {
                                                email = localStorage.getItem("billingMailFoodcourt");
                                                }

                                                }

                                                var api = site_url+'/notify/customerinfo/appId/'+app_id+'/email/'+email+'/type/foodcourt';


                                                $$.ajax({
                                                        type: 'GET',
                                                        url: api,
                                                        dataType: 'json',
                                                        success: function(data)
                                                        {
                                                        console.log("api=="+api);
                                                        console.log(data);
                                                        //{"customerId":"cus_AkdumJRvPtH5QY","cardLast4":"1111"}
                                                        console.log("data===="+data);

                                                        if(data.customerId !=null && data.customerId !="")
                                                        {
                                                        customeridGlobalFoodcourt = data.customerId

                                                        AppyTemplate.global.cardLast4foodCourt = data.cardLast4
                                                        }

                                                        },
                                                        error: function(data)
                                                        {
                                                        Appyscript.hideIndicator();

                                                        }
                                                        });
                                                }

//========
                                                var PaymentWithSaveCardcheckfoodcourt = false;
                                                function PaymentWithSaveCardFoodCourt1(totalAmount,orderId,clientId,secretKey,currency ,cvv_code)
                                                {
                                                var totalAmount= (parseFloat(totalAmount) * 100)
                                                var email =localStorage.getItem("email");
                                                totalAmount=parseFloat(totalAmount).toFixed();


                                                var SavecardUrl = site_url+'/notify/paymentfoodcourtbystripe/appId/'+app_id+'/cvv/'+cvv_code+'/customerId/'+customeridGlobalFoodcourt+'/orderId/'+orderId+'/email/'+email+'/description/583380/currency/'+currency+'/amount/'+totalAmount+'/vendorId/'+foodProductListForGloble.vendeid;


                                                $$.ajax({
                                                        type: 'GET',
                                                        url: SavecardUrl,
                                                        dataType: 'json',
                                                        success: function(data)
                                                        {
                                                        console.log(SavecardUrl);
                                                        console.log(data);

                                                        //{transaction_id: "ch_1APQcoH0v6qh6ANIDj80OrWe", customer_id: "cus_AkdumJRvPtH5QY", status: "succeeded"}

                                                        if(data.status == "succeeded")
                                                        {
                                                        PaymentWithSaveCardcheckfoodcourt = true;
                                                        customeridGlobalFoodcourt = data.customer_id;
                                                        DineInSubmitOrderByStripe(data.transaction_id,data.customer_id)
                                                        }
                                                        else if(data.status == "fail" && data.exception)
                                                        {
                                                        Appyscript.alert(data.exception,appnameglobal_allpages);

                                                        Appyscript.hideIndicator();
                                                        }
                                                        else if(data.status == "fail" && data.Error=="cvv does not match")
                                                        {
                                                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.cvv_does_not_match,appnameglobal_allpages);

                                                        Appyscript.hideIndicator();
                                                        }

                                                        },
                                                        error: function(data)
                                                        {
                                                          Appyscript.hideIndicator();

                                                        }
                                                        });

                                                }
                                                //=======
                                                function deleteCardFoodCourt(a)
                                                {

                                                Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.are_you_sure_want_to_delete_the_card,appnameglobal_allpages,data.languageSetting.No,data.languageSetting.Yes,cancelCardfoodcourt,deletesaveCardFoodcourt);

                                                function cancelCardfoodcourt(){


                                                }
                                                function deletesaveCardFoodcourt()
                                                {
                                                Appyscript.showIndicator();
                                                var email =localStorage.getItem("email");
                                                if(email==null || email=="")
                                                {
                                                if(localStorage.getItem("pickupbillingFoodcourtEmail")!=null)
                                                {
                                                email = localStorage.getItem("pickupbillingFoodcourtEmail");
                                                }
                                                else if(localStorage.getItem("billingMailFoodcourt")!=null)
                                                {
                                                email = localStorage.getItem("billingMailFoodcourt");
                                                }

                                                }

                                                var api = site_url+'/notify/deletecard/appId/'+app_id+'/email/'+email+'/type/foodcourt'

                                                $$.ajax({
                                                        type: 'GET',
                                                        url: api,
                                                        dataType: 'json',
                                                        success: function(data)
                                                        {
                                                        console.log("apidatadelete=="+api);
                                                        console.log(data);
                                                        //{success: "Card deleted successfully"}

                                                        console.log("datadelete===="+data);

                                                        if(data.success =="Card deleted successfully")
                                                        {

                                                        $$('.cardStorage').hide();
                                                        $$('#creditCardThroughStripeCvv').hide();
                                                        $$('#creditCardThroughStripe').show();

                                                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.card_deleted_successfully , appnameglobal_allpages);
                                                        customeridGlobalFoodcourt='';
                                                        AppyTemplate.global.cardLast4foodCourt ="";
                                                        Appyscript.hideIndicator();
                                                        }


                                                        },
                                                        error: function(data)
                                                        {
                                                        Appyscript.hideIndicator();

                                                        }
                                                        });
                                                }



                                                }

// Toast message call waiter
                            function callforWaiterthanks(){
                                var mssgg= AppyTemplate.global.pageLanguageSetting.dining_keep_patience;
                                if(Appyscript.device.android){
                                    AppyPieNative.AddTocartToastMsg(mssgg);
                                }

                                else{
                                    window.location = "windowalert1:"+mssgg;
                                }
                            }

                            function callforBillThanks(){
                                var mssgg=AppyTemplate.global.pageLanguageSetting.dining_thanks_venue;
                                if(Appyscript.device.android){
                                    AppyPieNative.AddTocartToastMsg(mssgg);
                                }
                                else{
                                    window.location = "windowalert1:"+mssgg;
                                }
                            }


Appyscript.onPageInit('dinein-PostReview',function(page){
var rating=$$("#ratingcount").attr("rating");
foodStarValue=$$("#ratingcount").attr("rating");
$$("#ratingdinin").html('');
 for (var i = 1; i <= 5; i++) {
    if (i <= rating) {
        $$("#ratingdinin").append('<img src="images/star-on-big.png" id="rat'+i+'" alt="'+i+'" title="bad" onclick="DineInGetRating(this);">&nbsp;')
    } else {
         $$("#ratingdinin").append('<img src="images/star-off-big.png" id="rat'+i+'" alt="'+i+'" title="bad" onclick="DineInGetRating(this);">&nbsp;')
    }
}
});

    AppyTemplate.registerHelper('distanceOneDecimalPoint', function(distance){
        var distance=distance.toString();
        if(distance.indexOf(".")>-1){
            return parseFloat(distance).toFixed(1)
        }else{
            return distance
        }
    });

Appyscript.GetLatLongAndress1 =function (dinein)
{

if(dinein=="dinein")
{
AppyTemplate.global.dineinlocationcheck=false;
}
console.log("2123132131");
locationDatafood=localStorage.getItem("Appypielocation");

 if(locationDatafood==undefined)
 {
    Appyscript.hideIndicator();
    locationDatafood=Appyscript.getCurrentPosition();

 }
     setTimeout(function(){
                  getLocationLatLong();
               },2000);



}

AppyTemplate.registerHelper('offeredDiscountPrice', function(price,discount){
    var offeredDiscount = parseFloat(price - price * discount / 100);
    var quantitPrice = currencyFomatter(offeredDiscount);
    console.log("helper----*****  "+quantitPrice);
    return quantitPrice;

});
AppyTemplate.registerHelper('orderQuantityyprice', function(price,val){
    //var price = price.replace(/[, ]+/g, "").trim();
    var quantitPrice = currencyFomatter(parseFloat(price*val));
    console.log("helper----  "+quantitPrice);
    return quantitPrice;
});

var token;
function dineInSubmitOrderByVelocity(billingData,shippingData,paymentTypeObject ,productList, sessionToken)
{
         var postData=DineInCreateJsonFormOrder(billingData,shippingData,paymentTypeObject,productList,"volecity","", "");

             var payTypeObj= $$(paymentTypeObject).parent();
             var applicationProfileId=payTypeObj.attr("data-applicationProfileId");
             var workflowId=payTypeObj.attr("data-workflowId");
             var merchantProfileId=payTypeObj.attr("data-merchantProfileId");
             var identityToken=payTypeObj.attr("data-identityToken");
             token = identityToken;


         var cardNo = document.getElementById("cnumberVel").value;
         var expMonth = document.getElementById("ExpairyMonthVel").value;
         var expYear = document.getElementById("ExpairyYearVel").value;
         var cvvVel = document.getElementById("cvvCodeVel").value;
         var cardHolderVel = document.getElementById("cHolderVel").value;
         var element = document.getElementById("velocityCardType");

         var cardTypeValue = element.value;

           if(cardNo==null ||cardNo=="")
          {
          Appyscript.hideIndicator();
          Appyscript.alert(foodPleaseEnterCardNumber);
          return null;
          }
          else if(isNaN(cardNo) || cardNo.length < 15)
          {

          Appyscript.hideIndicator();
          Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
          return null;

          }
          else  if (cardTypeValue == "Select")
            {
            Appyscript.hideIndicator();
            Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Please_Enter_Valid_Number);
            return null;
            }
          else if(expMonth == null || expMonth == '')
          {
          Appyscript.hideIndicator();
          Appyscript.alert(foodPleaseEnterExpairyMonth);
          return null;
          }
          else if(isNaN(expMonth) || expMonth.length < 2)
          {
          Appyscript.hideIndicator();
          Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_month);
          return null;
          }
          else if(expYear == null || expYear == '')
          {
          Appyscript.hideIndicator();
          Appyscript.alert(foodPleaseEnterExpairyYear);
          return null;

          }
          else if(isNaN(expYear) || expYear.length < 2)
          {
          Appyscript.hideIndicator();
          Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_expairy_year);
          return null;
          }
          else if(cvvVel==null ||cvvVel=="")
          {
          Appyscript.hideIndicator();
          Appyscript.alert(foodPleaseEnterCvvCode);
          return null;
          }
          else if(isNaN(cvvVel) || cvvVel.length < 3)
          {
          Appyscript.hideIndicator();
          Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_cvv_code);
          return null;
          }
          else if(!isNaN(cardHolderVel) || cardHolderVel == null || cardHolderVel == '')
          {
          Appyscript.hideIndicator();
          Appyscript.alert(foodPleaseEnterCardName);
          return null;
          }

        if(isOnline())
          {
                      $$.ajax({
                      url: baseURL,
                      data:Appyscript.validateJSONData(postData),
                      type: "post",
                      //321 headers: {'accessToken': deviceEncryptedToken},
                      async: true,
                      timeout: 30000,
                      success: function(jsonData, textStatus ){
                      if(textStatus==200 || textStatus=='success')
                      {
                          var jsonObj=JSON.parse(jsonData);
                          var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                          if(success.toLowerCase()=="success")
                          {
                            var card = {
                                        CardholderName: cardHolderVel,
                                        cardtype: cardTypeValue,
                                        number: cardNo,
                                        cvc: cvvVel,
                                        expMonth: expMonth,
                                        expYear: expYear
                                        };

                                        var address = {}
                                       address["Street"] = productList.address;
                                       address["PostalCode"] = productList.billing.zip;
                                       address["State"] = productList.billing.state;
                                       address["StateProvince"] ='';
                                       address["Country"] =  productList.billing.country;



                                       var transctionData =
                                            {
                                            Amount: parseFloat(productList.grandTotal),
                                            CurrencyCode:productList.currency,
                                            EmployeeId : '13',
                                            IndustryType:'Ecommerce',
                                            order_id : foodOrderIdForGloble

                                            }

                        Velocity.tokenizeForm(transctionData,sessionToken, card, address, applicationProfileId, merchantProfileId, workflowId, velocityResponseHandlerDineIn);
                        Appyscript.hideIndicator();
                          }
                          else if(success.toLowerCase()=="failure")
                          {
                              $$.get("pages/dinein-error.html", function (template)
                              {
                                    var compiledTemplate = AppyTemplate.compile(template);
                                    var html = compiledTemplate("");
                                    mainView.router.load({content: html, animatePages: true});
                               });
                          }
                          else
                          {
                              Appyscript.alert(something_went_wrong_please_try_again );
                          }
                      }
                      else
                      {
                          Appyscript.alert(something_went_wrong_please_try_again );
                      }
                      Appyscript.hideIndicator();
                  },
                  error: function(error)
                  {
                      Appyscript.hideIndicator();
                      Appyscript.alert(something_went_wrong_please_try_again );
                  }
                 });
          }
          else
          {
              Appyscript.hideIndicator();
              Appyscript.alert(internetconnectionmessage  );
          }
}

function velocityResponseHandlerDineIn(result) {
if(result.text !== "Successful"){
    Appyscript.hideIndicator();
    Appyscript.alert(result.message,data.appData.appName);
    return false;
}
var p = JSON.parse(localStorage.getItem("foodCourtpaydata"));
        var trancationData='{"Amount":"'+p.grandTotal+'","CurrencyCode":"'+p.currency+'","identitytoken":"'+token+'","workflowid":"'+result.workflowid+
              '","merchantprofileid":"'+result.merchantprofileid+'","applicationprofileid":"'+result.applicationprofileid+
             '","paymentAccountDataToken":"'+result.row[0].PaymentAccountDataToken+'", "OrderId":"'+result.row[0].OrderId+'"}';
var postdata='{"method":"velocityPayWithToken","orderId": "'+foodOrderIdForGloble+'", "trancationData":'+trancationData+'}';
    if(isOnline())
     {
        Appyscript.showIndicator();
        $$.ajax({
                    url: baseURL,
                    data: postdata,
                    type: 'post',
                    async: true,
                    //321 headers: {'accessToken': deviceEncryptedToken},
                    success: function(data) {

                    token = "";
                     data = JSON.parse(data);
                     if(data.StatusCode == "00"){
                     updateTransactionDineIn(data)
                     }
                },
                function(error)
                {
                  Appyscript.hideIndicator();
                  updateCourtCartIcon();
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

function updateTransactionDineIn(resultData){
var postdata='{"method":"updateTransaction","appId":"'+app_id+'","orderId":"'+foodOrderIdForGloble+'","trnId":"'+resultData.TransactionId+'", "lang":"'+data.appData.lang+'", "paymentLog":'+JSON.stringify(resultData)+'}';
    if(isOnline())
     {
        Appyscript.showIndicator();
        $$.ajax({
                    url: baseURL,
                    data: postdata,
                    type: 'post',
                    async: true,
                    //321 headers: {'accessToken': deviceEncryptedToken},
                    success: function(data) {
                     data = JSON.parse(data);
                     console.log("transactionUpdation", data);

                        $$.get("pages/dinein-thanks.html", function (template)
                             {

                                orderId='';
                                 var compiledTemplate = AppyTemplate.compile(template);
                                 var aakk=JSON.parse(localStorage.getItem("foodCourtpaydata"));
                                 aakk.thanksjson=thanksjson;

                                   currencyFomatterSymbolProductList = aakk.currency;
                                   AppyTemplate.global.curSymFor = currencyFomatterSymbol[currencyFomatterSymbolProductList];
                                   localStorage.setItem("curSymForSym", AppyTemplate.global.curSymFor);
                                   AppyTemplate.global.curSymFor = localStorage.getItem("curSymForSym");

                                     AppyTemplate.global.curSymCode = currencyFomatterSymbolProductList;
                                                        localStorage.setItem("curSymCode", currencyFomatterSymbolProductList);
                                                        AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");


                                   console.log("DDddAS****  " + localStorage.getItem("curSymForSym") + "    " + typeof localStorage.getItem("curSymForSym"));
                                   aakk.maxTaxPrice = currencyFomatter(parseFloat(aakk.taxPrice));
                                   aakk.maxSubTotal = currencyFomatter(parseFloat(aakk.subTotal));
                                   aakk.maxCouponDiscount = currencyFomatter(parseFloat(aakk.couponDiscount));
                                   aakk.maxTipamount = currencyFomatter(parseFloat(aakk.tipamount));
                                   aakk.maxVendordiscount = currencyFomatter(parseFloat(aakk.vendordiscount));
                                   aakk.maxDiscountPrice = currencyFomatter(parseFloat(aakk.discountPrice));
                                   aakk.maxGrandTotal = currencyFomatter(parseFloat(aakk.grandTotal));
                                   aakk.maxDeliveryPrice = currencyFomatter(parseFloat(aakk.deliveryPrice));

                                   if (aakk.miscTax != undefined) {
                                       var miscTaxArr = aakk.miscTax.list;
                                       for (var key in miscTaxArr) {
                                           miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                                       }
                                   }

                                 console.log("aakk    " + JSON.stringify(aakk));
                                 var html = compiledTemplate(aakk);
                                 mainView.router.load({content: html, animatePages: true});
                                 localStorage.setItem("foodpaydata","");
                                 localStorage.setItem("foodCourtpaydata","");
                                 foodOrderIdForGloble='';
                              });

                },
                function(error)
                {
                  Appyscript.hideIndicator();
                  updateCourtCartIcon();
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