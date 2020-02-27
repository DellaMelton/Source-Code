
var baseurl;
var ecomSwiper, ecomCategories;
var arrayecomcatID;
var app_id = '';
var useremailid = '';
var cartPageEmty = ''
var productListData = { "list": [] };
var productList = { "list": [] };
var ecomData = [];
var loading = '';
var productSwiper;
var subProductList;
var detailsfrompage = '1';
var catActiveIndex = '0';
var DetailsProductID = '';
var wishstatus = '0';
var DetaislActiveIndex = '0';
var ecomorderId = '';
var lang = "en";
var configurationfood;
var configurationfood;
var listSwiper, categoriesSwiper;
var getCategoryTemplate;
var storeCategories;
var orderId;
var billshipsame = '0';
var isEcomInit = false;
var getSubCategoryTemplate;
var productdetails = '';
var productimage;
var productName = "";
var storeData = [];
var storeDetailsData;
var starValue = 0;
var starObj;
var reload = "0";
var reloadDataCart;
var billing = '';
var shipping = '';
var jssonvalue = ''
var flagupdate = '';
var customsendsoimages = [];
var reorderproductid = [];

var orderIdForGloble = "";
var billingDataForGloble = "";
var shippingDataForGloble = "";
var productListForGloble = "";
var creditCardDetailForGloble = "";
var paymentTypeObjectForGloble = "";
var _checkStripeEcomCall=true

var Quantityshould = 'Quantity should be mininmum 1 ';
var Quantityleshhequal = 'Quantity should be less than or equal to ';  // AppyTemplate.global.pageLanguageSetting.Please_enter_quantity_less_than
var orderzeroamount = 'Sorry! With zero amount this order can not be place.';
//var wshlistadd = pageData.languageSetting.product_successfully_added_in_your_wishlist;
//var wishlistremove = pageData.languageSetting.product_successfully_removed_from_your_wishlist;
var selcetcountry = 'Please Select Country';
var usernameblanck = 'User Name can not be left blank.'
var profileupdatesuccess = 'Profile updated successfully.';
var customeridGlobal = '';
var cvvCode;
var paymentwithmercado_andewallet = false;
AppyTemplate.global.emailFinder = "";

var billingDataGlobal;
var shippingDataGlobal;
var statusGlobal;
var sessionTokenGlobal;
var ewalletRemainingPrice;

/*
Template
    1. ecomsubCat - this template   use for couman style & view   for all category on home page for all 4 layout.
        ecomSubcatProductList() - is use for get sub-cat-product list.
    2. ecomcatProduct -  this template use to view product list on all listing page like Cat-product , Sub-cat-product, Offers-Produc , feature-product , wishlist-product.
         Appyscript.ecomAddToCartProduct(this) - is use to Add Product into cart.
        Appyscript.ecomProductDetail(this) - is use to view product details page.
        heare is also condition  for show  product is offers or not
        heare is also condtion for check product is out of stock or not.
        heare is condition for check  configure product . if yes then show details page
    3. ecomsubcatproductTemplate  - this template use to check cat and product in listing avilabele or not  , if Cat available  then show  ecomsubCat template and  if product available then show ecomcatProduct template.
    4. ecommErrorTemplate  - this template use for show Error meg.
*/
//AppyTemplate.registerPartial('ecomsubCat', '<li class="category"><img src="images/image-2x1.png" style="background-image:url({{categoryImage}})" /><div class="details" style="background:{{@global.styleAndNavigation.title[2]}};"><h3 class="{{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}}">{{categoryName}}<span class="icon-right-open"></span></h3></div><div class="overlay" onclick="Appyscript.ecomSubcatProductList(this);" subcat-id="{{categoryId}}" data-head="{{categoryName}}" dataimage="{{categoryImage}}"></div></li>');
////AppyTemplate.registerPartial('ecomcatProduct','<li class="product" productId="{{productId}}" catId="{{catId}}" dataHead="{{productName}}"><div class="product_box">{{#productImages}}{{#if mainImage}}<img style="background-image:url({{productImage}})" src="images/image-2x1.png" alt="" onclick="Appyscript.ecomProductDetail(this);" product-id="{{productId}}" catId="{{catId}}" data-head="{{productName}}">{{/if}}{{/productImages}}<div class="discription_box" style="background:{{@global.styleAndNavigation.title[2]}};"><div class="mComLeft"><h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}}">{{productName}}</h1><div class="product_price">{{#if offered}}{{#js_compare "this.offeredDiscount > \'0\'"}}<div ><strike>{{format_currency currency}}{{price}}</strike><b style="color:{{@global.styleAndNavigation.activeColor}}">  {{format_currency currency}}{{js " parseFloat(this.price - this.price * this.offeredDiscount / 100).toFixed(2)"}}</b><span>({{offeredDiscount}}%)</span></div>{{else}}<div class="price {{#js_compare "this.price == \'0.00\'"}} priceShowHide {{/js_compare}} {{#js_compare "this.price == \'0\'"}} priceShowHide {{/js_compare}}">{{format_currency currency}}{{price}}</div>{{/js_compare}}{{else}}<div class="price {{#js_compare "this.price == \'0.00\'"}} priceShowHide {{/js_compare}} {{#js_compare "this.price == \'0\'"}} priceShowHide {{/js_compare}}">{{format_currency currency}}{{price}}</div>{{/if}}</div></div><div class="mComRight"> {{#js_compare "this.customOption == \'0\'"}}{{#js_compare "this.quantity == \'0\'"}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomProductDetail(this)" data-head="{{productName}}" product-id="{{productId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" > {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.out_of_stock_mcom}}{{/if}}</a>{{else}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomAddToCartProduct(this)" data-head="{{productName}}" product-id="{{productId}}" cat-id="{{catId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" data-mainImage="{{productImage}}" >+ {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.add_to_cart_mcom}}{{/if}}</a> {{/js_compare}} {{else}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomProductDetail(this)" data-head="{{productName}}" product-id="{{productId}}" catId="{{catId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" data-mainImage="{{productImage}}" >+ {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.add_to_cart_mcom}}{{/if}}</a> {{/js_compare}}</div></div></div></li>');
//AppyTemplate.registerPartial('ecomcatProduct','<li index="{{@index}}" class="product hideImage-{{@global.styleAndNavigation.hideImage}}" productId="{{productId}}" catId="{{catId}}" dataHead="{{productName}}"><div class="product_box">{{#productImages}}{{#if mainImage}}<img style="background-image:url({{productImage}})" src="images/image-2x1.png" alt="" onclick="Appyscript.ecomProductDetail(this);" product-id="{{productId}}" catId="{{catId}}" data-head="{{productName}}">{{/if}}{{/productImages}}<div class="discription_box" style="background:{{@global.styleAndNavigation.title[2]}};">{{#if @global.styleAndNavigation.hideImage}}<div class="mComLeft" onclick="Appyscript.ecomProductDetail(this)">{{else}}<div class="mComLeft"> {{/if}}<h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}}">{{productName}}</h1><div class="product_price">{{#if offered}}{{#js_compare "this.offeredDiscount > \'0\'"}}<div ><strike>{{format_currency currency}}{{maxPriceStore}}</strike><b style="color:{{@global.styleAndNavigation.activeColor}}">  {{format_currency currency}}{{js " parseFloat(this.price - this.price * this.offeredDiscount / 100).toFixed(2)"}}</b><span>({{offeredDiscount}}%)</span></div>{{else}}<div class="price {{#js_compare "this.price == \'0.00\'"}} priceShowHide {{/js_compare}} {{#js_compare "this.price == \'0\'"}} priceShowHide {{/js_compare}}">{{format_currency currency}}{{maxPriceStore}}</div>{{/js_compare}}{{else}}<div class="price {{#js_compare "this.price == \'0.00\'"}} priceShowHide {{/js_compare}} {{#js_compare "this.price == \'0\'"}} priceShowHide {{/js_compare}}">{{#if @global.ecommCurrencySymbol}}<div>{{format_currency currency}}{{maxPriceStore}}</div>{{else}}<div>{{maxPriceStore}}{{format_currency currency}}</div>{{/if}}</div>{{/if}}</div></div><div class="mComRight"> {{#js_compare "this.customOption == \'0\'"}}{{#js_compare "this.quantity == \'0\'"}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomProductDetail(this)" data-head="{{productName}}" product-id="{{productId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" > {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.out_of_stock_mcom}}{{/if}}</a>{{else}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomAddToCartProduct(this)" data-head="{{productName}}" product-id="{{productId}}" cat-id="{{catId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" data-mainImage="{{productImage}}" >+ {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.add_to_cart_mcom}}{{/if}}</a> {{/js_compare}} {{else}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomProductDetail(this)" data-head="{{productName}}" product-id="{{productId}}" catId="{{catId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" data-mainImage="{{productImage}}" >+ {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.add_to_cart_mcom}}{{/if}}</a> {{/js_compare}}</div></div></div></li>');
//var ecomsubcatproductTemplate = '{{#if subCategories}} {{#subCategories}} {{> ecomsubCat}} {{/subCategories}} {{/if}} {{#if productList}} {{#productList}} {{> ecomcatProduct}} {{/productList}} {{/if}}';
//var ecommErrorTemplate = '<div class="msg-code">{{> errorpage errorIcon="appyicon-no-data"}}</div>';


AppyTemplate.registerPartial('ecomsubCat', '<li class="category"><img src="images/image-1x1.png" style="background-image:url({{categoryImage}})" /><div class="details" style="background:{{@global.styleAndNavigation.title[2]}};"><h3 class="{{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}}">{{categoryName}}<span class="icon-right-open"></span></h3></div><div class="overlay" onclick="Appyscript.ecomSubcatProductList(this);" subcat-id="{{categoryId}}" data-head="{{categoryName}}" dataimage="{{categoryImage}}"></div></li>');
//AppyTemplate.registerPartial('ecomcatProduct','<li class="product" productId="{{productId}}" catId="{{catId}}" dataHead="{{productName}}"><div class="product_box">{{#productImages}}{{#if mainImage}}<img style="background-image:url({{productImage}})" src="images/image-1x1.png" alt="" onclick="Appyscript.ecomProductDetail(this);" product-id="{{productId}}" catId="{{catId}}" data-head="{{productName}}">{{/if}}{{/productImages}}<div class="discription_box" style="background:{{@global.styleAndNavigation.title[2]}};"><div class="mComLeft"><h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}" style="color:{{@global.styleAndNavigation.title[3]}}">{{productName}}</h1><div class="product_price">{{#if offered}}{{#js_compare "this.offeredDiscount > \'0\'"}}<div ><strike>{{format_currency currency}}{{price}}</strike><b style="color:{{@global.styleAndNavigation.activeColor}}">  {{format_currency currency}}{{js " parseFloat(this.price - this.price * this.offeredDiscount / 100).toFixed(2)"}}</b><span>({{offeredDiscount}}%)</span></div>{{else}}<div class="price {{#js_compare "this.price == \'0.00\'"}} priceShowHide {{/js_compare}} {{#js_compare "this.price == \'0\'"}} priceShowHide {{/js_compare}}">{{format_currency currency}}{{price}}</div>{{/js_compare}}{{else}}<div class="price {{#js_compare "this.price == \'0.00\'"}} priceShowHide {{/js_compare}} {{#js_compare "this.price == \'0\'"}} priceShowHide {{/js_compare}}">{{format_currency currency}}{{price}}</div>{{/if}}</div></div><div class="mComRight"> {{#js_compare "this.customOption == \'0\'"}}{{#js_compare "this.quantity == \'0\'"}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomProductDetail(this)" data-head="{{productName}}" product-id="{{productId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" > {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.out_of_stock_mcom}}{{/if}}</a>{{else}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomAddToCartProduct(this)" data-head="{{productName}}" product-id="{{productId}}" cat-id="{{catId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" data-mainImage="{{productImage}}" >+ {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.add_to_cart_mcom}}{{/if}}</a> {{/js_compare}} {{else}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomProductDetail(this)" data-head="{{productName}}" product-id="{{productId}}" catId="{{catId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" data-mainImage="{{productImage}}" >+ {{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.add_to_cart_mcom}}{{/if}}</a> {{/js_compare}}</div></div></div></li>');
AppyTemplate.registerPartial('ecomcatProduct','<li index="{{@index}}" class="product hideImage-{{@global.styleAndNavigation.hideImage}} {{#if @global.styleAndNavigation.fourbytwoLayoutProduct}}gridView{{/if}}" productId="{{productId}}" catId="{{catId}}" dataHead="{{productName}}"><div class="product_box"  style="color:{{@global.styleAndNavigation.content[2]}};">{{#productImages}}{{#if mainImage}}<img style="background-image:url({{productImage}})" {{#if @global.styleAndNavigation.fourbytwoLayoutProduct}}src="images/image-1x1.png {{else}}src="images/image-2x1.png{{/if}} " alt="" onclick="Appyscript.ecomProductDetail(this);" product-id="{{productId}}" catId="{{catId}}" data-head="{{productName}}">{{/if}}{{/productImages}}<div class="discription_box" style="background:{{@global.styleAndNavigation.title[2]}};">{{#if @global.styleAndNavigation.hideImage}}<div class="mComLeft" onclick="Appyscript.ecomProductDetail(this)">{{else}}<div class="mComLeft"> {{/if}}<h1 class="title {{@global.styleAndNavigation.title[0]}} {{@global.styleAndNavigation.title[1]}}  {{#if @global.styleAndNavigation.truncateTextListing}} textWrap {{/if}}" style="color:{{@global.styleAndNavigation.title[3]}}  {{#if @global.styleAndNavigation.truncateTextListing}}; width:93% {{/if}}">{{productName}}</h1><div class="product_price">{{#if offered}}{{#js_compare "this.offeredDiscount > \'0\'"}}<div ><strike>{{format_currency currency}}{{maxPriceStore}}</strike><b style="color:{{@global.styleAndNavigation.activeColor}}">  {{format_currency currency}}{{offeredDiscountPriceEcom this.price this.offeredDiscount}}</b><span>({{offeredDiscount}}%)</span></div>{{else}}<div class="price {{#js_compare "this.price == \'0.00\'"}} priceShowHide {{/js_compare}} {{#js_compare "this.price == \'0\'"}} priceShowHide {{/js_compare}}">{{format_currency currency}}{{maxPriceStore}}</div>{{/js_compare}}{{else}}<div class="price {{#js_compare "this.price == \'0.00\'"}} priceShowHide {{/js_compare}} {{#js_compare "this.price == \'0\'"}} priceShowHide {{/js_compare}}">{{#if @global.ecommCurrencySymbol}}<div>{{format_currency currency}}{{maxPriceStore}}</div>{{else}}<div>{{maxPriceStore}}{{format_currency currency}}</div>{{/if}}</div>{{/if}}</div></div><div class="mComRight"> {{#js_compare "this.customOption == \'0\'"}}{{#js_compare "this.quantity == \'0\'"}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomProductDetail(this)" data-head="{{productName}}" product-id="{{productId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" >  {{#if @global.styleAndNavigation.fourbytwoLayoutProduct}}ø{{else}}{{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.out_of_stock_mcom}}{{/if}}{{/if}} </a>{{else}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomAddToCartProduct(this)" data-head="{{productName}}" product-id="{{productId}}" cat-id="{{catId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" data-mainImage="{{productImage}}" >+ {{#if @global.styleAndNavigation.fourbytwoLayoutProduct}}{{else}}{{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.add_to_cart_mcom}}{{/if}}{{/if}} </a> {{/js_compare}} {{else}} <a class="addtoCartbtn {{@global.styleAndNavigation.button[0]}} {{@global.styleAndNavigation.button[1]}}" style="color:{{@global.styleAndNavigation.button[3]}};background:{{@global.styleAndNavigation.button[2]}};" onclick="Appyscript.ecomProductDetail(this)" data-head="{{productName}}" product-id="{{productId}}" catId="{{catId}}" data-id="{{productId}}" data-currency="{{format_currency currency}}"data-price="{{price}}" data-quantity="{{quantity}}" data-mainImage="{{productImage}}" >+ {{#if @global.styleAndNavigation.fourbytwoLayoutProduct}}{{else}}{{#if @global.pageLanguageSetting}}{{@global.pageLanguageSetting.add_to_cart_mcom}}{{/if}}{{/if}}</a> {{/js_compare}}</div></div></div></li>');
var ecomsubcatproductTemplate = '{{#if subCategories}} {{#subCategories}} {{> ecomsubCat}} {{/subCategories}} {{/if}} {{#if productList}} {{#productList}} {{> ecomcatProduct}} {{/productList}} {{/if}}';
var ecommErrorTemplate = '<div class="msg-code">{{> errorpage errorIcon="appyicon-no-data"}}</div>';


AppyTemplate.registerHelper('offeredDiscountPriceEcom', function(price,discount){
    var offeredDiscount = parseFloat(price - price * discount / 100);
    var quantitPrice = currencyFomatter(offeredDiscount);
    console.log("helper----*****  "+quantitPrice);
    return quantitPrice;

});





/*
    Use page ( ecommerce.html )
    heare we bind all cat , sub-cat and product.
    this method also make dynamic style and theme
    from heare we call Appyscript.swiper() for sweep cat and product for view another cat and product listing
    from heare we call layoutScrolling() methode for load more data in listing and subcat.
    use resetStoreData() for store all product list in single array.
    hear is also  caondition for  show hide login / logout in menu page
    hear is also condition for show hide term and condition  and privacy and policy
*/
Appyscript.onPageInit('ecommerce-Page', function (page) {
     app_id = localStorage.getItem("appid");
    baseurl = webserviceUrl + 'Ecomm.php';
    baseURL = webserviceUrl + 'Ecomm.php';
    var lastUpdatedCart = localStorage.getItem("lastUpdatedCart");
    if (lastUpdatedCart == null || lastUpdatedCart == "") {
        //add condition later
    } else {
        var loc = lastUpdatedCart;
        var _ = new Date();
        //radical todo : change the 7 to web key from general settings as soon as possible - Done
        var webKey = parseInt(pageData.generalinformation.cart_expiry_day);
        if (parseInt((_.getTime() / 1000 - loc / 1000) / 60 / 60) >= webKey * 24) {
            localStorage.removeItem("lastUpdatedCart");
            localStorage.removeItem("productList");
            productList = { "list": [] };
            updatecartCount();
        }
    }

 Appyscript.onPageInit('paymentPage', function(page)
                       {
                        _checkStripeEcomCall=true;
                        });



    Quantityshould = pageData.languageSetting.Product_Quantity_should_be_greater_than_Zero;
     Quantityleshhequal = pageData.languageSetting.quantity_should_be_less_than;

    ecomData = [];
    detailsfrompage = '1';


    $$(".search-box a").click(function () {
        if ($$(".search-box input").is(".on")) {
            $$(".search-box input").removeClass("on");
        }
        else {
            $$(".search-box input").addClass("on");
        }
        return false;
    });
    if ($$(".categories").is(".theme-4")) {
        listSwiper = Appyscript.swiper($$(page.container).find('.list-swiper'));
        categoriesSwiper = Appyscript.swiper($$(page.container).find('.categories-swiper'), {
            slidesPerView: 3,
            centeredSlides: true,
            slideActiveClass: "active"
        });
        listSwiper.params.control = categoriesSwiper;
        categoriesSwiper.params.control = listSwiper;
        $$(".categories-swiper li").click(function () {
            listSwiper.slideTo($$(this).index());
        })
        listSwiper.on("SlideChangeEnd", function () {
            if (listSwiper.isBeginning) {
                listSwiper.lockSwipeToPrev();
                listSwiper.unlockSwipeToNext();
                categoriesSwiper.lockSwipeToPrev();
                categoriesSwiper.unlockSwipeToNext();
            }
            else if (listSwiper.isEnd) {

                listSwiper.lockSwipeToNext();
                listSwiper.unlockSwipeToPrev();
                categoriesSwiper.lockSwipeToNext();
                categoriesSwiper.unlockSwipeToPrev();
            }
            else {
                listSwiper.unlockSwipeToPrev();
                listSwiper.unlockSwipeToNext();
                categoriesSwiper.unlockSwipeToPrev();
                categoriesSwiper.unlockSwipeToNext();
            }

            swiperBind(listSwiper.activeIndex);
        })

        $$(window).resize(function () {
            $$(".list-swiper").css("height", ($$(window).height() - 94) + "px");
        })
        $$(".list-swiper").css("height", ($$(window).height() - 94) + "px");
        var swiperFirst = $$(".list-swiper").find(".swiper-slide").eq(0);
        swiperFirst.attr("data-load", "false");
        if ((swiperFirst.find("li.category").length == 0) && (swiperFirst.find("li.product").length == 0)) {

            var errorTemplate = '<div class="msg-code">{{> errorpage errorIcon="appyicon-no-data"}}</div>';
            var compiledTemplate = AppyTemplate.compile(errorTemplate);
            var html = compiledTemplate({});
            swiperFirst.html(html);
        }
        if ((swiperFirst.find("li.category").length >= 10) || (swiperFirst.find("li.product").length >= 10)) {
            layoutScrolling(0);
        }
        resetStoreData(pageData.categoryList[0].productList);
    }
    ecomData.push(pageData.categoryList[0]);
    updatecartCount();

    if (isEcomInit == false) {
        isEcomInit = true;
        getRuledataEcom();
        // Appyscript.getLocalCords();
    }
    setFoodCurrentCity();
    AppyTemplate.global.CurrentCity = localStorage.getItem("CurrentCity");

    AppyTemplate.global.loginCheck = 0;
    AppyTemplate.global.email = "";
    AppyTemplate.global.privacy_policy = false;
    AppyTemplate.global.terms_and_conditions = false;

    if (pageData.cmsPage.privacy_policy) {
        AppyTemplate.global.privacy_policy = true;
    }
    if (pageData.cmsPage.terms_and_conditions) {

        AppyTemplate.global.terms_and_conditions = true;
    }
    if (localStorage.getItem("email")) {
        AppyTemplate.global.loginCheck = 1;
        useremailid = localStorage.getItem("email");
        username = localStorage.getItem("username");
        userphone = localStorage.getItem("phone");
        AppyTemplate.global.email = useremailid;
        var image = localStorage.getItem("profileImage");
        AppyTemplate.global.Name = localStorage.getItem("username");
        if (image) {
            if (image.indexOf("http") != -1 && (image.indexOf(".jpg") != -1 || image.indexOf(".png") != -1)) {
                AppyTemplate.global.profileImage = localStorage.getItem("profileImage");
                AppyTemplate.global.profileImagecheck = true;
            }
            else {
                AppyTemplate.global.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-pic-news.png";
            }
        }
        else {
            AppyTemplate.global.profileImage = AppyTemplate.global.style.reseller + "/newui/images/user-pic-news.png";
        }
    }
    else {
        useremailid = "";
        username = "";
        userphone = "";
        //AppyTemplate.global.profileImage="";
    }


    setTimeout(function () {
        var pdlist = localStorage.getItem("productList");
        if (pdlist) {
            pdlist = JSON.parse(pdlist);
            if (pdlist.list.length) {
                productList = pdlist;
                updatecartCount();
            }
        }
    }, 100);
    AppyTemplate.global.imageOnOff = pageData.setting.imageOnOff;
    setEcomCurrentCity();
});

Appyscript.onPageBack('ecommerce-Page', function (page) {
    isEcomInit = false;
});
//get current country
var billcountry = "", billstate = "", billaddress = "", billcity = "", zip = "";
function setEcomCurrentCity() {
    var locationData = Appyscript.getCurrentPositionValue();
    if (locationData != null) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(locationData.split(",")[0], locationData.split(",")[1]);

        console.log("latlng" + latlng)

        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("add===" + results)
                console.log(results)
                if (results[0]) {
                    var add = results[0].formatted_address;

                    console.log("add===" + add)

                    var value = add.split(",");
                    count = value.length;

                    var addresssfull = value[1];
                    country = value[count - 1];
                    state = value[count - 2];
                    city = value[count - 3];
                    AppyTemplate.global.currentstateecom = state.replace(/[0-9]/g, '');
                    console.log(state.replace(/[0-9]/g, ''));
                    AppyTemplate.global.CurrentCity = city;
                    if (city == undefined || city == '') {
                        AppyTemplate.global.CurrentCity = state;
                        localStorage.setItem("CurrentCity", state);
                    }
                    else if (state == undefined || state == '') {
                        AppyTemplate.global.CurrentCity = country;
                        localStorage.setItem("CurrentCity", country);
                    }

                    billcountry = country;
                    var states = state.replace(/[0-9]/g, '');
                    billstate = states;
                    billaddress = addresssfull;
                    billcity = city;
                    var pincodev = state.split(" ");
                    zip = pincodev[pincodev.length - 1];
                    country = country.replace(/,/g, '').replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\s,]+/g, ',');
                    AppyTemplate.global.currentaddresssfull = addresssfull;
                    AppyTemplate.global.currentcity = city;
                    AppyTemplate.global.currentstate = states;
                    AppyTemplate.global.currentzip = zip;
                    AppyTemplate.global.currentcountry = country;
                    countrycodecheck();



                    var search = states;
                    var api = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + encodeURIComponent(search) + '&key=' + data.googlePlacesApiKey;

                    $$.ajax({
                        type: 'GET',
                        url: api,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                           if(data.status != "REQUEST_DENIED"){
                            if (data.predictions.length > 0) {
                                var iCounter;

                                if (data.predictions.length > 1) {

                                    var add = data.predictions[0].description;

                                    // console.log("add=okok=="+add)

                                    var value = add.split(",");
                                    count = value.length;
                                    var addresssfull = value[1];
                                    country = value[count - 1];

                                    // console.log(country)
                                    country = country.replace(/^[ ]+|[ ]+$/g, '')

                                    var arr = [];
                                    arr = $.grep(countryArrayList.countryList.country, function (v) {
                                        return v.longname.trim() == country.trim()
                                    });

                                    if (arr.length == 0) {
                                        country = "Select Country";
                                    }
                                    //country=country.replace(/,/g , '').replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\s,]+/g, ',');
                                    console.log(country)
                                  //  AppyTemplate.global.currentcountry = country;


                                }


                            }
                            }else {
                                 Appyscript.hideIndicator();
                                 apiname = "Google";
                                 serviceFailedNotify(data.status, apiname, 1);
                                 Appyscript.alert(data.error_message, appnameglobal_allpages);
                             }

                        },
                        error: function (data) {
                            Appyscript.hideIndicator();
                            apiname="Google";
                            var flag = 0;
                            serviceFailedNotify(data,apiname,flag);
                        }
                    });



                }
                else {
                    console.log("Location not set, status: " + status);
                    localStorage.setItem("CurrentCity", "");
                }
            }
            else {
                console.log("Geo-coder failed, status: " + status);
                localStorage.setItem("CurrentCity", "");
            }
        });
    }
    else {
        //Appyscript.confirmation("To use this feature please enable your location service first.","Location","Setting","Cancel",function(){AppyPieNative.openLocationSetting();},function(){});
    }
}
/*
    use page ecommerce-subcate-list.html
    Data page ecommerce-SubCategory
    calling from ecomsubCat template
*/
var subcatid = '';
var subcatname = '';
var subcatimage = '';
var mainCatID = '';
var sortbyvalue = '';
Appyscript.ecomSubcatProductList = function (a) {
    if (a != 'sorting') {
        subcatid = $$(a).attr("subcat-id");
        subcatname = $$(a).attr("data-head");
        subcatimage = $$(a).attr("dataimage");
        mainCatID = sessionStorage.getItem('mainCatID');
        sortbyvalue = '';
    }

    var count = '10';
    var pageNo = '1';
    var type = "subcat";

    if (isOnline()) {
        Appyscript.showIndicator();
        app_id = localStorage.getItem("appid");
        var postdata = '{"method":"ecommSubCategoryProduct","appId":"' + app_id + '","parentId":"' + subcatid + '","page":"' + pageNo + '","sortby":"' + sortbyvalue + '", "emailId":"' + useremailid + '"}';

        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus)
                    {
						ecomSubcatProductList=JSON.parse(jsonData);
                        var productListPriceArr = ecomSubcatProductList.productList;


                        if(productListPriceArr.length>0){
                                                  var newcurrencyFomatterSymbolProductList = productListPriceArr[0].currency;

                                                  AppyTemplate.global.curSymFor = currencyFomatterSymbol[newcurrencyFomatterSymbolProductList];
                                                  localStorage.setItem("curSymForSym",AppyTemplate.global.curSymFor);
                                                  AppyTemplate.global.curSymFor =  localStorage.getItem("curSymForSym");

                                                  AppyTemplate.global.curSymCode = newcurrencyFomatterSymbolProductList;
                                                  localStorage.setItem("curSymCode", newcurrencyFomatterSymbolProductList);
                                                  AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");

                                                }

                        for(var key in productListPriceArr){
                        //    productListPriceArr[key].maxPriceStore= decimalPlaces(productListPriceArr[key].price);
                        productListPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productListPriceArr[key].price));

                        }

						 categorydata=JSON.parse(jsonData);
//						 subProductList = ecomSubcatProductList;
                         ecomSubcatProductList.subcatid=subcatid;
                         ecomSubcatProductList.subcatname=subcatname;
                         ecomSubcatProductList.subcatimage=subcatimage;
						 ecomSubcatProductList.categoryPage="1";
						 resetStoreData(ecomSubcatProductList.productList);

                if (a == 'sorting') {
                    $$.get("pages/ecommerce-subcate-list.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(ecomSubcatProductList);
                        mainView.router.reloadContent(html)
                        Appyscript.hideIndicator();
                        $$("#searchpopup").val(sortbyvalue);
                        updatecartCount();
                    });
                }
                else {
                    $$.get("pages/ecommerce-subcate-list.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        getSubCategoryTemplate = template;
                        var html = compiledTemplate(ecomSubcatProductList);
                        mainView.router.load({ content: html, animatePages: true });
                        updatecartCount();
                    });
                }
                Appyscript.hideIndicator();
                updatecartCount();
            }, error: function (error) {
                // console.log("ecommSubCategoryProduct : Error " + error.code + " " + error.message);
                Appyscript.hideIndicator();
                updatecartCount();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}







/*
    This methode is use to bind data on sweep category and category page on behalf of catid and bind data in subcat and also product to next category .
    calling from storePage data page
    use template ecomsubCat  or ecomcatProduct or both.
*/
function swiperBind(index) {
    //var swiperObj = $$(".list-swiper .swiper-slide").eq(index);
    var swiperObj = $$(mainView.activePage.container).find(".list-swiper .swiper-slide").eq(index);
    if (swiperObj.attr("data-load") == "false") {
        return false;
    }
    app_id = localStorage.getItem("appid");
    var postData = '{"method":"listOfCategoryProduct","appId":"' + app_id + '","catId":"' + swiperObj.attr("data-id") + '","page":"' + swiperObj.attr("data-page") + '", "emailId":"' + useremailid + '"}';
    //console.log("listOfCategoryProduct   baseurl  "+baseurl +"  postdata  "+postData);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$(".infinite-scroll-preloader").show();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (data, textStatus) {
                categorydata = JSON.parse(data);
                data = JSON.parse(data);
                data.styleAndNavigation = pageData.styleAndNavigation;
                ecomData.push(data);

                  var productPriceArr = data.productList;
                                                         for(var key in productPriceArr){
                                                           productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
                                                           }


                   resetStoreData(productPriceArr);

                if ((data.subCategories.length == 0) && (data.productList.length == 0)) {
                    var compiledTemplate = AppyTemplate.compile(ecommErrorTemplate);
                    var html = compiledTemplate(data);
                    swiperObj.removeClass("infinite-scroll").html(html);
                    $$(".infinite-scroll-preloader").hide();
                }
                else {
                    if (data.subCategories.length < 10) {
                        if (data.productList.length < 10) {
                            $$(".infinite-scroll-preloader").hide();
                            swiperObj.removeClass("infinite-scroll");
                        }
                        else {
                            $$(".infinite-scroll-preloader").hide();
                            layoutScrolling(index);
                        }
                    }
                    else {
                        $$(".infinite-scroll-preloader").hide();
                        layoutScrolling(index);
                    }
                    var compiledTemplate = AppyTemplate.compile(ecomsubcatproductTemplate);
                    var html = compiledTemplate(data);
                    if (data.productList.length != 0) {
                        if (swiperObj.find(".sortingBar").length == 0) {
                            swiperObj.prepend($$(".sortingBar")[0].cloneNode(true));
                            swiperObj.find(".sortingBar").show();
                        }
                    }
                    swiperObj.find("ul").html(html);
                }
                swiperObj.attr("data-load", "false");
                Appyscript.hideIndicator();
            }, error: function (error) {

                Appyscript.hideIndicator();
                updatecartCount();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}




/*
    this methode is use for load more data on cat product and subcat product listing.
    use template ecomsubCat  or ecomcatProduct or both.
*/
function layoutScrolling(index) {
    app_id = localStorage.getItem("appid");
    var swiperObj = $$(".list-swiper .swiper-slide").eq(index);
    var dataID = swiperObj.attr("data-id");
    var dataPage = parseInt(swiperObj.attr("data-page")) + 1;
    var loading = true;
    Appyscript.attachInfiniteScroll(swiperObj);
    swiperObj.on('infinite', function () {
        if (!loading) {
            return false;
        }
        loading = false;
        $$(".infinite-scroll-preloader").show();

        var postdata = '{"method":"listOfCategoryProduct","appId":"' + app_id + '","catId":"' + dataID + '","page":"' + dataPage + '", "emailId":"' + useremailid + '"}';
        // console.log("listOfCategoryProduct   baseurl  "+baseurl +"  postdata  "+postdata);
        if (isOnline()) {
            Appyscript.showIndicator();
            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postdata),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (data, textStatus) {
                    data = JSON.parse(data);

                    var productPriceArr = data.productList;
                                    for(var key in productPriceArr){
                                    productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
                                    }


                    resetStoreData(productPriceArr);

                    if (data.productList.length > 0) {
                        ecomData[index].productList.push.apply(ecomData[index].productList, data.productList);
                    }
                    if (data.subCategories.length > 0) {
                        ecomData[index].subCategories.push.apply(ecomData[index].subCategories, data.subCategories);
                    }
                    data.styleAndNavigation = pageData.styleAndNavigation;
                    var compiledTemplate = AppyTemplate.compile(ecomsubcatproductTemplate);
                    var html = compiledTemplate(data);
                    dataPage++;
                    if (data.subCategories.length < 10) {
                        if (data.productList.length < 10) {
                            swiperObj.removeClass("infinite-scroll");
                            Appyscript.detachInfiniteScroll(swiperObj);
                            loading = false;
                        }
                        else {
                            loading = true;
                        }
                    }
                    else {
                        loading = true;
                    }
                    swiperObj.find("ul").append(html);
                    swiperObj.find("li.product").appendTo(swiperObj.find("ul"));
                    $$(".infinite-scroll-preloader").hide();
                    Appyscript.hideIndicator();
                }, error: function (error) {
                    // console.log("listOfCategoryProduct : Error " + error.code + " " + error.message);
                    Appyscript.hideIndicator();
                    updatecartCount();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });
        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    })
}








/*
    Product details page  ecommerce-product-detail.html
    Data page ecommerce-ProductDetail
*/
AppyTemplate.global.hideimagecheck = '', AppyTemplate.global.skuno = '';
var wishlistreload = '0';
Appyscript.ecomProductDetail = function (a, b) {
    Appyscript.showIndicator();
    var categoryindex = $$(a).parents("li").attr("index")
    if ($$("#wishlistadd").attr('data-wishlist') != undefined) {
        wishlistreload = '1';
    }
    else {
        wishlistreload = '0';
    }
    var parent = $$(a).parents("li.product");
    var catidd = parent.attr("catId");
    productid = parent.attr("productId");

    var statuswish = getwishlisstatus(catidd, productid);
    storeDetailsData = getStoreData(parent.attr("catId"), parent.attr("productId"));


    storeDetailsData.list.wishlist = statuswish;
    // console.log(storeDetailsData);
    //    AppyTemplate.global.skuno=categorydata.productList[categoryindex].sku;
    //    AppyTemplate.global.hideimagecheck=categorydata.productList[categoryindex].is_media_allowed
    if (categorydata[0]) {
        AppyTemplate.global.skuno = categorydata.productList[categoryindex].sku;
        AppyTemplate.global.hideimagecheck = categorydata.productList[categoryindex].is_media_allowed

    }
    else {
        AppyTemplate.global.skuno = storeDetailsData.list[0].sku;
        AppyTemplate.global.hideimagecheck = storeDetailsData.list[0].is_media_allowed;
    }



    console.log("AppyTemplate.global.hideimagecheck" + AppyTemplate.global.hideimagecheck);
    console.log("storeDetailsData########  "+JSON.stringify(storeDetailsData));
    $$.get("pages/ecommerce-product-detail.html", function (template) {
        Appyscript.hideIndicator();
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(storeDetailsData);
        mainView.router.load({ content: html, animatePages: true });
        updatecartCount();
    });
}


/*
    call from oredr details
    get all product that order in single order
    and view all product in details page
*/
var reorderProductDetail;
Appyscript.ecomReorderProductDetail = function (a, b) {

    if (isOnline()) {
        Appyscript.showIndicator();
        var jsonPostecom = { "method": "ecommProductIdsDetails", "appId": app_id, "productIds": reorderproductid, "emailId": useremailid };
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(JSON.stringify(jsonPostecom)),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {

                reorderProductDetail = JSON.parse(jsonData);

                resetStoreData(reorderProductDetail.productList);

                if (reorderProductDetail.productList == "" || reorderProductDetail.productList == " " || reorderProductDetail.productList == "null" || reorderProductDetail.productList == null || reorderProductDetail.productList == undefined || reorderProductDetail.productList == "undefined") {

                    Appyscript.hideIndicator();
                    Appyscript.alert(pageData.languageSetting.sorry_this_product_is_no_longer_available, appnameglobal_allpages);

                }
                else {

                    resetStoreData(reorderProductDetail.productList);

                    var data =
                    {
                        "list": reorderProductDetail.productList,
                        "index": reorderproductid.indexOf(b)
                    }
                    $$.get("pages/ecommerce-product-detail.html", function (template) {
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate(data);
                        mainView.router.load({ content: html, animatePages: true });
                        updatecartCount();
                        //reorderproductid=[];
                        Appyscript.hideIndicator();
                    });


                }
            }, error: function (error) {
                //console.log("ApplyCoupanCode : Error " + error.code + " " + error.message);
                Appyscript.hideIndicator();
                updatecartCount();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }

}



/*
    Details page
    Product details page  ecommerce-product-detail.html
    Data page ecommerce-ProductDetail
    gating data from storeDetailsData array
*/
Appyscript.onPageInit('ecommerce-ProductDetail', function (page) {
    setTimeout(function () {
        $$("#quantity").val("1")
                ecommBanners = [];
        productSwiper = Appyscript.swiper('.product-swiper', {
            initialSlide: $$(".product-swiper").attr("index")
        });

//        $$(".product-swiper .product-swiper-slide").each(function (i) {
//            $$(this).find(".swiper-banner .preloader").remove();
//            if ($$(this).find(".swiper-banner .swiper-slide").length <= 1) {
//            }
//            else {
//                var a = Appyscript.swiper(".swiper-banner-" + i);
//            }
//        });
         $$(".product-swiper .product-swiper-slide").each(function(i)
                {
                    $$(this).find(".swiper-banner .preloader").remove();
                    if($$(this).find(".swiper-banner .swiper-slide").length <= 1)
                    {
        				$$(this).find(".swiper-banner").find(".swiper-button-next, .swiper-button-prev").remove();
                        ecommBanners.push(null);
                    }
                    else
                    {
        				var a = Appyscript.swiper(".swiper-banner-" + i,{
                             pagination: '.banner-pagination-' + i,
                             paginationClickable: true,
        					 nextButton: '.swiper-button-next-' + i,
        			         prevButton: '.swiper-button-prev-' + i
                         });
                        ecommBanners.push(a);
                    }
                });
        thisSlideChange();

        productSwiper.on("SlideChangeEnd", function () {
            thisSlideChange();
        })


        $$(".product-swiper .product-swiper-slide").css("height", ($$(window).height() - 88) + "px");
        $$(window).resize(function () {
            $$(".product-swiper .product-swiper-slide").css("height", ($$(window).height() - 88) + "px");
        })

        $$("#footer-nav").find("a.more").click(function () {
            var thisSlide = $$(".product-swiper-slide.swiper-slide-active");
            if (thisSlide.find(".description").is(".less")) {
                thisSlide.find(".description").removeClass("less");
                $$("#footer-nav").find("a.more").addClass("on");
            }
            else {
                thisSlide.find(".description").addClass("less");
                $$("#footer-nav").find("a.more").removeClass("on");
            }

        })
        updatecartCount();
        function thisSlideChange() {
            var thisSlide = $$(".product-swiper-slide").eq(productSwiper.activeIndex);
            var productID = thisSlide.attr("data-id");
            var activeIndex = productSwiper.activeIndex

            DetailsProductID = productID;
            DetaislActiveIndex = activeIndex;

            productdetails = storeDetailsData.list[activeIndex]
            if (productID != undefined) {
                productdetails.wishlist = getwishlisstatus(productdetails.catId, productdetails.productId);
            }
            if (productdetails.wishlist) {
                wishstatus = productdetails.wishlist;
            }
            productName = "";
            productName = productdetails.productName;
            productimage = new Array()
            $$.each(productdetails.productImages, function (ind, val) {
                if (val.type == 'image' || val.type == "") {
                    productimage.push(val.productImage);
                }

            })

            if (productdetails.wishlist == "0") {
                $$("#footer-nav").find("a.like").removeClass("on");
            }
            else {
                $$("#footer-nav").find("a.like").addClass("on");
            }

            if (thisSlide.find(".description").is(".less")) {
                $$("#footer-nav").find("a.more").removeClass("on");
            }
            else {
                $$("#footer-nav").find("a.more").addClass("on");
            }
            if (productdetails.description.length > 0) {
                $$("#footer-nav").find("a.more").show();
            }
            else {
                $$("#footer-nav").find("a.more").hide();
            }
        }
    }, 100);
})








/*
  Cart page details
  use page ecommerce-cart-productdetail.html
  calling from cart page product.
  view data from productList array.
  use data page ecommerce-CartProductDetail
*/
function CartPageDetailsView(a, indexVal) {
    indexVal = $$(a).parent().attr("index");
    if (listSwiper != null) {
        catActiveIndex = listSwiper.activeIndex;
    }
    var getPage = $$(mainView.activePage.container).attr("data-page")
    var data = {
        index: indexVal
    }
    DetailsProductID=productList.list[indexVal].productId;
    AppyTemplate.global.skuno = productList.list[indexVal].sku
    AppyTemplate.global.hideimagecheck = productList.list[indexVal].is_media_allowed
    $$.get("pages/ecommerce-cart-productdetail.html", function (template) {

        data.list = productList.list;
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(data);
        mainView.router.load({ content: html, animatePages: true });
        Appyscript.hideIndicator();
        updatecartCount();
    });
}

Appyscript.onPageBack('ecommerce-Cart', function (page) {

    if (localStorage.getItem("cardDetailsPageback") == "true") {
        localStorage.setItem("cardDetailsPageback", "false")
        reloadhomepage()
    }


});
Appyscript.onPageBack('ecommerce-Cart', function (page) {

 var productListPriceArr = pageData.categoryList[0].productList
                        for(var key in productListPriceArr){
                            productListPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productListPriceArr[key].price));
                        }
    $$.get("pages/ecommerce-product.html", function (template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(productList);
        mainView.router.reloadContent(html);
        Appyscript.hideIndicator();
    });

});


/*
 this page data is for cart-product details page.
    data view from productList array on behalf of index  , sweep and item click
*/
Appyscript.onPageInit('ecommerce-CartProductDetail', function (page) {
    setTimeout(function () {
        productSwiper = Appyscript.swiper('.product-swiper', {
            initialSlide: $$(".product-swiper").attr("index")
        });

        $$(".product-swiper .product-swiper-slide").each(function (i) {
            $$(this).find(".swiper-banner .preloader").remove();
            if ($$(this).find(".swiper-banner .swiper-slide").length <= 1) {
            }
            else {
                var a = Appyscript.swiper(".swiper-banner-" + i);
            }
        })

        productSwiper.on("SlideChangeEnd", function () {
            var thisSlide = $$(".product-swiper-slide").eq(productSwiper.activeIndex);
            var productID = thisSlide.attr("data-id");
            var activeIndex = productSwiper.activeIndex
            var productdetails = '';
            DetailsProductID = productID;
            DetaislActiveIndex = activeIndex;
            productdetails = productList.list[activeIndex];
            wishstatus = productList.list[activeIndex].wishlist;

            if (wishstatus == '1') {
                $$("#footer-nav").find("a.like").addClass("on");
            }
            else {
                $$("#footer-nav").find("a.like").removeClass("on");
            }

            if (thisSlide.find(".description").is(".less")) {
                $$("#footer-nav").find("a.more").removeClass("on");
            }
            else {
                $$("#footer-nav").find("a.more").addClass("on");
            }
        })

        $$(".product-swiper .product-swiper-slide").css("height", ($$(window).height() - 88) + "px");
        $$(window).resize(function () {
            $$(".product-swiper .product-swiper-slide").css("height", ($$(window).height() - 88) + "px");
        })

        $$("#footer-nav").find("a.more").click(function () {
            var thisSlide = $$(".product-swiper-slide.swiper-slide-active");
            if (thisSlide.find(".description").is(".less")) {
                thisSlide.find(".description").removeClass("less");
                $$("#footer-nav").find("a.more").addClass("on");
            }
            else {
                thisSlide.find(".description").addClass("less");
                $$("#footer-nav").find("a.more").removeClass("on");
            }
        })
    }, 100);
})

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

/*
    this method is use to Add product in cart.
    this method is work on behalf of data index and product data
    use page ecommerce-product.html
    use data paeg ecommerce-Cart
    use  getStoreData  methode to get data according to product id.
    this methode is calling from all listing page - cat-product list , offers product , feacture product , wishlist product , product details page , cart-product details page.
*/
Appyscript.ecomAddToCartProduct = function (a, add, isFrom) {
    Appyscript.closeModal();
    Appyscript.showIndicator();
    var doorder;
    var newdate = new Date().getTime();
    orderId = 'ap' + newdate;

    if (a == 'cartview') {
        if (localStorage.getItem("productList") != "" && localStorage.getItem("productList") != null) {
            getupdatedproductapilistecom(a);
        } else {
        //radical : sample data to compile blank page, doesn't affect any other
            var tempData = JSON.parse('{"list":[],"subtaotal":"0.00","maxSubTotalStore":"5,464.99","totalproduct":0,"currency":"AMD","coupandiscountType":"","coupandiscount":"0.00","couponDiscountee":"","miscTax":{"list":[{"taxrate":"0.11","id":"585","taxRate":"Percentage","taxAmount":"0.00","taxType":"Misc.Tax","currency":"AMD","tax":"0.00"}]},"maxGrandTotalStore":"0","coupanafterdiscount":0,"taxPrice":"0.00","taxRate":"","taxratee":"0.2","shippingPrice":"0.00","shippingRate":"","shippingratee":"3","discountPrice":"0.00","discountRate":"","discountRateee":"2","miscTaxDup":[{"taxrate":"0.11","id":"585","taxRate":"Percentage","taxAmount":"0.00","taxType":"Misc.Tax","currency":"AMD","tax":"0.00"}],"grandtaotal":"0.00","errorIcon":"appyicon-empty-cart"}');
                $$.get("pages/ecommerce-product.html", function (template) {
                     var compiledTemplate = AppyTemplate.compile(template);
                     var html = compiledTemplate(tempData);
                     mainView.router.load({ content: html, animatePages: true });
        });
            Appyscript.hideIndicator();
        }
    }

    if (a != 'cartview') {
        var thisObj = $$(a);
        var thisData = getStoreData("", thisObj.attr("product-id"));
        localStorage.setItem("customimages", JSON.stringify(customsendsoimages));
        var thisRow = thisData.list[0];
        if (thisRow.offered) {
            if (parseFloat(thisRow.offered)) {
                var priceoffers = ((parseFloat(thisRow.price) * parseFloat(thisRow.offeredDiscount)) / 100).toFixed(2);
                thisRow.oldprice = parseFloat(thisRow.price).toFixed(2);
                thisRow.price = parseFloat(thisRow.price - priceoffers).toFixed(2);
            }
        }

        if (isFrom == "MannualCount") {
            var pageObj = $$(".product-swiper .product-swiper-slide").eq(productSwiper.activeIndex);
            //if(pageObj.find(".customOptions[required='1']").length != 0)
            //{
            var flagError = false;
            pageObj.find(".customOptions[required='1']").removeClass("error").each(function (i) {
                if ($$(this).val() == "-1") {
                    flagError = true;
                    $$(this).addClass("error");
                }
            })
            if (flagError) {
                Appyscript.hideIndicator();
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.select_option_mcom + " " + pageObj.find("select.error").eq(0).parent().find("span").eq(0).text(), appnameglobal_allpages)
                return false;
            }

            var indexData = JSON.parse(pageObj.find("span[price]").attr("indexData"));
            var _config = []
            if (indexData != null && indexData.length > 0) {
                var abc = [];
                var options = [];
                $$.each(indexData, function (j, k) {
                    var option_title = thisRow.customoptions[k.index].option_title + " : " + thisRow.customoptions[k.index].option_row[k.value].row_title;
                    abc.push(option_title);
                    var _op = {};
                    _op.optionId = thisRow.customoptions[k.index].option_id;
                    //todo : replace this row title with row id as soon as web returns it - radical
                    _op.rowTitle = thisRow.customoptions[k.index].option_row[k.value].row_title;
                    options.push(_op);
                })
                thisRow.varient = options;
                thisRow.customoptionsdata = abc;
                thisRow.customoptionsString = abc.join("|");
            }
            var _d = new Date();
            localStorage.setItem("lastUpdatedCart", _d.getTime());
            //}

            var rowUpdateMode = true;
            var cartIndex = -1;
            $$.each(productList.list, function (i, v) {
                if (v.productId == thisRow.productId) {
                    if (thisRow.customoptions) {
                        if (thisRow.customoptionsString == v.customoptionsString) {
                            cartIndex = i;
                            rowUpdateMode = false;
                        }
                    }
                    else {
                        cartIndex = i;
                        rowUpdateMode = false;
                    }
                }
            })


            var quantityVal = pageObj.find(".qtyFle").val();
            //var price = pageObj.find("span[price]").text();
	          var price = $$(a).attr("data-price");
            console.log("priceprice   "+price)

            if (parseInt(quantityVal) <= 0 || quantityVal == "") {
                Appyscript.alert(Quantityshould, data.appData.appName);
                Appyscript.hideIndicator();
                return false;
            }

            if (rowUpdateMode) {
                doorder = checkqty(thisRow.quantity, quantityVal);
                if (doorder) {
                    thisRow.price = parseFloat(price).toFixed(2);
                    thisRow.orderQuantity = parseInt(quantityVal);
                    productList.list.unshift(thisRow);
                }
                else {
                    return;
                }
            }
            else {
                thisRow = productList.list[cartIndex];
                doorder = checkqty(thisRow.quantity, parseInt(thisRow.orderQuantity) + parseInt(quantityVal))
                if (doorder) {
                    thisRow.price = parseFloat(price).toFixed(2);
                    thisRow.orderQuantity = parseInt(thisRow.orderQuantity) + parseInt(quantityVal);
                    productList.list[cartIndex] = thisRow;
                }
                else {
                    return;
                }
            }
        }
        else {
            var cartIndex = checkCartProductExit(thisObj.attr("product-id"));
            if (cartIndex != -1) {
                thisRow = productList.list[cartIndex];
                doorder = checkqty(thisRow.quantity, thisRow.orderQuantity + 1)
                if (doorder) {
                    thisRow.orderQuantity = parseInt(thisRow.orderQuantity) + 1;
                    productList.list[cartIndex] = thisRow;
                }
                else {
                    return;
                }
            }
            else {
                thisRow.orderQuantity = 1;
                productList.list.unshift(thisRow);
            }
        }
showtoastmsgForEcommerce();

        ecomcal(a);
    }
    //if(doorder)
    //{


    //	var qtytotal='0';
    //	var subtaotal='0.00';
    //	var grandtaotal='0.00';
    //	var currency='';
    //	var totalproduct='0';
    //	var coupandiscount='0.00';
    //	var couponDiscountee='';
    //	var miscTax='0.00'
    //	if(productList.list.length > 0) {
    //		$$.each(productList.list, function(i,v){
    //			currency=v.currency;
    //			var subtaotaltemp=parseFloat(v.price.replace(",", "")).toFixed(2) * parseFloat(v.orderQuantity);
    //			qtytotal = parseInt(qtytotal) +parseInt(v.orderQuantity)
    //			subtaotal = parseFloat(subtaotal) +parseFloat(subtaotaltemp);
    //			subtaotal = parseFloat(subtaotal).toFixed(2);
    //			totalproduct = parseInt(totalproduct)+1;
    //		})
    //		productList.subtaotal=subtaotal;
    //		productList.totalproduct=totalproduct;
    //		productList.currency=currency;
    //		productList.coupandiscountType = "";
    //		productList.coupandiscount = '0.00';
    //		productList.couponDiscountee = '';
    //		productList.miscTax = miscTax
    //	    getconfigurationfoodConfigurationSettings();
    //		localStorage.setItem("productList",JSON.stringify(productList));
    //
    //
    //		setTimeout(function() {
    //		  if(a == 'cartview'){
    //			$$.get("pages/ecommerce-product.html", function (template) {
    //				var compiledTemplate = AppyTemplate.compile(template);
    //				var html = compiledTemplate(productList);
    //				mainView.router.load({content: html, animatePages: true});
    //				if(productList.list.length <=1) {
    //					$$(".cart-item").addClass("single");
    //				}
    //				else {
    //					$$(".cart-item").removeClass("single");
    //				}
    //			});
    //			}
    //			Appyscript.hideIndicator();
    //			updatecartCount();
    //			showhidepaymentsdetails();
    //		},1000);
    //	}
    //	else {
    //		productList.styleAndNavigation=pageData.styleAndNavigation;
    //		productList.totalproduct=totalproduct;
    //		Appyscript.hideIndicator();
    //		 if(a == 'cartview'){
    //		$$.get("pages/ecommerce-product.html", function (template) {
    //			var compiledTemplate = AppyTemplate.compile(template);
    //			var html = compiledTemplate(productList);
    //			mainView.router.load({content: html, animatePages: true});
    //		});
    //		}
    //	}
    //}
}
//radical todo : replace the row_title with row id as soon as possible, when web returns :P
function ecom_updateCartVariants() {
    var len = productList.list.length;
    for (var i = 0; i < len; i++) {
        var curSum = 0;
        if (productList.list[i].varient !== undefined) {
            for (var j = 0; j < productList.list[i].varient.length; j++) {
                for (var k = 0; k < productList.list[i].customoptions.length; k++) {
                    if (productList.list[i].varient[j].optionId == productList.list[i].customoptions[k].option_id) {
                        for (var l = 0; l < productList.list[i].customoptions[k].option_row.length; l++) {
                            if (productList.list[i].varient[j].rowTitle == productList.list[i].customoptions[k].option_row[l].row_title) {

                                if(productList.list[i].customoptions[k].option_row[l].row_pricetype == "m")
                                curSum -= parseFloat(productList.list[i].customoptions[k].option_row[l].row_price);
                                else
                                curSum += parseFloat(productList.list[i].customoptions[k].option_row[l].row_price);

                            }
                        }
                    }
                }
            }
        }
        var p = parseFloat(productList.list[i].price) + parseFloat(curSum);
        productList.list[i].price = p + "";
    }
}

function ecomcal(a) {

    var cartDetail = localStorage.getItem("productList");

    ecom_updateCartVariants();

    var qtytotal = '0';
    var subtaotal = '0.00';
	var grandtaotal='0.00';
    var currency = '';
    var totalproduct = '0';
    var coupandiscount = '0.00';
    var couponDiscountee = '';
    var miscTax = '0.00'
    if (productList.list.length > 0) {
        $$.each(productList.list, function (i, v) {
            currency = v.currency;
            var subtaotaltemp = parseFloat(v.price.replace(",", "")).toFixed(2) * parseFloat(v.orderQuantity);
            qtytotal = parseInt(qtytotal) + parseInt(v.orderQuantity)
            subtaotal = parseFloat(subtaotal) + parseFloat(subtaotaltemp);
            subtaotal = parseFloat(subtaotal).toFixed(2);
            totalproduct = parseInt(totalproduct) + 1;
        })
        productList.subtaotal = subtaotal;
		productList.maxSubTotalStore = '0.00';
		productList.maxSubTotalStore = currencyFomatter(parseFloat(subtaotal));
		productList.totalproduct = totalproduct;
		productList.currency=currency;
		productList.coupandiscountType = "";
		productList.coupandiscount = '0.00';
		productList.couponDiscountee = '';
		productList.miscTax = miscTax;
		productList.maxGrandTotalStore ='0.00';
        productList.maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
        productList.maxGrandTotalStoreAmount = currencyFomatter(parseFloat(productList.grandtaotal));
	    getconfigurationfoodConfigurationSettings();
		localStorage.setItem("productList",JSON.stringify(productList));

        console.log("ffghfhfghfghffghf  fhghfhg  "+JSON.stringify(productList))

		setTimeout(function() {
		console.log("DDDDDDDDDD "+ currencyFomatter(parseFloat(productList.grandtaotal)))
		  if(a == 'cartview'){
			$$.get("pages/ecommerce-product.html", function (template) {
				var compiledTemplate = AppyTemplate.compile(template);
				var html = compiledTemplate(productList);
				mainView.router.load({content: html, animatePages: true});
				if(productList.list.length <=1) {
					$$(".cart-item").addClass("single");
				}
				else {
					$$(".cart-item").removeClass("single");
				}
			});
			}
			Appyscript.hideIndicator();
			updatecartCount();
			showhidepaymentsdetails();
		},1000);
	}
	else {
		productList.styleAndNavigation=pageData.styleAndNavigation;
		productList.totalproduct=totalproduct;
		Appyscript.hideIndicator();
		 if(a == 'cartview'){
		$$.get("pages/ecommerce-product.html", function (template) {
			var compiledTemplate = AppyTemplate.compile(template);
			var html = compiledTemplate(productList);
			mainView.router.load({content: html, animatePages: true});
		});
		}
	}
}


AppyTemplate.registerHelper('pricecal', function(price,quantity) {
   var pricefinal;
   if(price.toString().indexOf(",")!=-1 || price.toString().indexOf(".")!=-1){
        console.log("helper     "+ parseFloat(price)+"  vvv   "+currencyFomatter(parseFloat(price) * parseFloat(quantity)))
        pricefinal=currencyFomatter(parseFloat(price) * parseFloat(quantity))
    }else{
        pricefinal=currencyFomatter(price * parseFloat(quantity))
    }
    return pricefinal;
});


/*
    this methode is use for check actual qty and order qty.
*/
function checkqty(qty, orderqty) {

    if (parseInt(qty) >= parseInt(orderqty)) {

        return true;
    }
    else {

        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.order_exceeds_the_stock_limit + parseInt(qty), appnameglobal_allpages);
        return false;
    }
}


/*
    this methode is use make less(-) or more(+) qty from cart page
    use data page ecommerce-Cart.
    page ecommerce-product.html
*/
Appyscript.onPageInit('ecommerce-Cart', function (page) {
    $$(".product_box").each(function () {
        var thisP = $$(this);
        var q = parseInt(thisP.find(".qty").val());

        var productid = thisP.attr("data-productid");
        var indexcart = thisP.attr("index");
        thisP.find(".less").click(function () {
            if (q > 1) {
                q--;
                thisP.find(".qty").val(q)
                reload = "1";
                updatecartDetails("less", productid, indexcart);
                updatecartCount();
            }
        })

        thisP.find(".add").click(function () {
            var price = thisP.find(".product_price").val();
            var status = checkforaddmore(productid);
            if (status) {
                q++;
                thisP.find(".qty").val(q)
                reload = "1";
                updatecartDetails("add", productid, indexcart);
                updatecartCount();
            }
            else {
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_enter_quantity_less_than, appnameglobal_allpages);
            }
        })

        thisP.find(".delete").click(function () {
            reload = "1";
            var index = thisP.attr("index");
            updatecartDetails("delete", productid, index);
            thisP.remove();
            updatecartCount();
            ecommerceupdateCartBoxIndex();
        })
    })

    setTimeout(function () {
        var highestBox = 0;
        $$('.foodEqhight').each(function () {
            if ($$(this).height() > highestBox) {
                highestBox = $$(this).height();
            }
        });
        $$('.foodEqhight').css('height', highestBox + 'px');
    }, 200);
});



/*
    this methode is use for check qty from cart-page
*/
var cart_Product_Index ;
function checkforaddmore(productid) {
    for (i = 0; i < productList.list.length; i++) {
        var productidcart = productList.list[i].productId;
        if(productList.list[i].productId==productid)
        {
         cart_Product_Index=i;
         console.log("cart_Product_Index===="+cart_Product_Index);
        }
        if (productidcart == productid) {
            var oldquantity = productList.list[i].orderQuantity;
            var quantity = productList.list[i].quantity;
            if (parseInt(oldquantity) < parseInt(quantity)) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}







/*
    this methode is use for get  Rule , discount and mistx tax from server.
*/
function getRuledataEcom() {
    if (isOnline()) {
        Appyscript.showIndicator();
        var postdata = '{"method":"ecommVariousCharges","appId":"' + app_id + '","gTotal":""}';
        //console.log("getRuledataEcom :baseurl    " + baseurl +"  postdata  "+postdata);
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                configurationfood = JSON.parse(jsonData);
                configurationfood.styleAndNavigation = pageData.styleAndNavigation;
                Appyscript.hideIndicator();
            }, error: function (error) {
                //console.log("getRuledataEcom : Error " + error.code + " " + error.message);
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

/*
    this methode is use for calculate Rule , discount and mistx tax on behalf of subtotal price.
*/
function getconfigurationfoodConfigurationSettings() {
    var grandtaotal = '0.00';
    var subtaotal = productList.subtaotal;
    var currency = productList.currency;
    grandtaotal = parseFloat(grandtaotal) + parseFloat(subtaotal);
    var discount = configurationfood.discount;
    var tax = configurationfood.tax;
    var shipping = configurationfood.shipping;
    var miscTax = configurationfood.miscTax;
    var shippingsubtotal = productList.subtaotal;
    //----------------------  discount.discountPrice ---------------------------------------------


    var discountPricetemp = '0.00';
    var discountRatetemp = '';
    var discountRateee = '';
    for (i = 0; i < discount.length; i++) {
        var discountPrice = discount[i].discountPrice;
        var discountRate = discount[i].discountType;
        discountRateee = discount[i].discountPrice;
        var discountRule = discount[i].discountRule;
        var totalAmount = discount[i].totalAmount;
        if (discountRule == '=') {
            if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                if (discountRate == 'Flat') {
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
                else {
                    discountPrice = ((parseFloat(subtaotal) * parseFloat(discountPrice)) / 100);
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
            }
        }
        else if (discountRule == '>=') {
            if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                if (discountRate == 'Flat') {
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
                else {
                    discountPrice = ((parseFloat(subtaotal) * parseFloat(discountPrice)) / 100);
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
            }
        }
    }


    subtaotal = grandtaotal;
    productList.coupanafterdiscount = subtaotal;



    //------------------------------------------------------   tax  charge  --------------------------------------------
    var taxratee = '';
    var taxPricetemp = '0.00';
    var taxRatetemp = '';
    console.log("taxecom=====" + JSON.stringify(tax))

    if (tax) {
        for (i = 0; i < tax.length; i++) {
        console.log("tax[i].country_code===="+tax[i].country_code)
            if (AppyTemplate.global.currentcountrycode == tax[i].country_code || tax[i].country_code ==null) {
                console.log(tax[i].country_name);
                var taxPrice = tax[i].taxPrice;
                taxratee = tax[i].taxPrice;
                var taxRate = tax[i].taxRate;
                var taxRule = tax[i].taxRule;
                var totalAmount = tax[i].totalAmount;
                // alert(1)
                var chektruefalse = true;
                if (chektruefalse) {
                    console.log(tax[i].state_code)
                    if (AppyTemplate.global.currentcountrycode == "US") {
                        if (AppyTemplate.global.currentstateecom.trim() == tax[i].state_code || AppyTemplate.global.currentstateecom.trim() == tax[i].state_name) {

                            chektruefalse = false;

                            if (taxRule == '=') {
                                if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                                    if (taxPrice == 'Tax Free') {
                                        taxPricetemp = '0.00';
                                        break;
                                    }
                                    else {
                                        if (taxRate == 'Flat') {
                                            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                            taxPricetemp = taxPrice;
                                            taxRatetemp = taxRate;
                                            break;
                                        }
                                        else {
                                            taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                            taxPricetemp = taxPrice;
                                            taxRatetemp = taxRate;
                                            break;
                                        }
                                    }
                                }
                            }
                            else if (taxRule == '>=') {
                                if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                                    if (taxPrice == 'Tax Free') {
                                        taxPricetemp = '0.00';
                                        break;
                                    }
                                    else {
                                        if (taxRate == 'Flat') {
                                            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                            taxPricetemp = taxPrice;
                                            taxRatetemp = taxRate;
                                            break;
                                        }
                                        else {
                                            taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                            taxPricetemp = taxPrice;
                                            taxRatetemp = taxRate;
                                            console.log(taxPricetemp);
                                            console.log(taxPrice);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (taxRule == '=') {
                            if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                                if (taxPrice == 'Tax Free') {
                                    taxPricetemp = '0.00';
                                    break;
                                }
                                else {
                                    if (taxRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice;
                                        taxRatetemp = taxRate;
                                        break;
                                    }
                                    else {
                                        taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice;
                                        taxRatetemp = taxRate;
                                        break;
                                    }
                                }
                            }
                        }
                        else if (taxRule == '>=') {
                            if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                                if (taxPrice == 'Tax Free') {
                                    taxPricetemp = '0.00';
                                    break;
                                }
                                else {
                                    if (taxRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice;
                                        taxRatetemp = taxRate;
                                        break;
                                    }
                                    else {
                                        taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice;
                                        taxRatetemp = taxRate;
                                        break;
                                    }
                                }
                            }

                        }

                    }


                }
            }
        }
    }



    //////////////////////////////////////shipping charges/////////////////////////////////////////////////

    var shippingPricetemp = '0.00';
    var shippingRatetemp = '';
    var shippingratee = ''
    var ecomshiploop = true;
    var shipping = configurationfood.shipping;

    for (i = 0; i < shipping.length; i++) {
        if (ecomshiploop) {
            var shippingPrice = shipping[i].shippingPrice;
            var shippingRate = shipping[i].shippingRate;
            shippingratee = shipping[i].shippingPrice;
            var shippingRule = shipping[i].shippingRule;
            var totalAmount = shipping[i].totalAmount;
            //console.log(shipping[i].countryCollection);
            if (shipping[i].countryCollection != null) {
                for (sc = 0; sc < shipping[i].countryCollection.length; sc++) {
                    if (AppyTemplate.global.currentcountrycode == shipping[i].countryCollection[sc].shortname) {
                        if (shippingRule == '=') {
                            if (parseFloat(shippingsubtotal) == parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice;
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice;
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                }


                            }
                        }
                        else if (shippingRule == '<=') {
                            if (parseFloat(shippingsubtotal) <= parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice;
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice;
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                }

                            }
                        }
                    } if (shipping[i].countryCollection[sc].shortname == "0" || shipping[i].countryCollection[sc].shortname == 0) {
                        if (shippingRule == '=') {
                            if (parseFloat(shippingsubtotal) == parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice;
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice;
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                }


                            }
                        }
                        else if (shippingRule == '<=') {
                            if (parseFloat(shippingsubtotal) <= parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice;
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice;
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                }

                            }
                        }

                    }
                }
            }
        }





    }



    //-------------------------------------miscx tax----------------------------------------------------------------------
    var miscTaxData = { "list": [] };
    var miscTaxDataDup = [];
    for (i = 0 ; i < miscTax.length; i++) {
        var taxRate = miscTax[i].taxRate;
        var taxAmount = miscTax[i].taxAmount;
        var taxrate = miscTax[i].taxAmount;
        var taxType = miscTax[i].taxType;
        var id = miscTax[i].id;
        if (taxRate == 'Flat') {
            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxAmount);
        }
        else {
            taxAmount = parseFloat(((parseFloat(subtaotal) * parseFloat(taxAmount)) / 100)).toFixed(2);
            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxAmount);
        }
        var mistaxx = {
            "taxrate": taxrate,
            "id": id,
            "taxRate": taxRate,
            "taxAmount": taxAmount,
            "taxType": taxType,
            "currency": productList.currency,
            "tax": taxAmount
        }
        miscTaxData.list.push(mistaxx);
        miscTaxDataDup.push(mistaxx);
    }

    productList.taxPrice = parseFloat(taxPricetemp).toFixed(2);
    productList.taxRate = taxRatetemp;
    productList.taxratee = taxratee;
    productList.shippingPrice = parseFloat(shippingPricetemp).toFixed(2);
    productList.shippingRate = shippingRatetemp;
    productList.shippingratee = shippingratee;
    productList.discountPrice = parseFloat(discountPricetemp).toFixed(2);
    productList.discountRate = discountRatetemp;
    productList.discountRateee = discountRateee;
    productList.miscTax = miscTaxData;
    productList.miscTaxDup = miscTaxDataDup;

     var MaxtaxPrice = currencyFomatter(parseFloat(productList.taxPrice));
     var MaxshippingPrice = currencyFomatter(parseFloat(productList.shippingPrice));
     var MaxdiscountPrice = currencyFomatter(parseFloat(productList.discountPrice));
    if (productList.miscTax != undefined) {
        var miscTaxArr = productList.miscTax.list;
        for (var key in miscTaxArr) {
            miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
        }
    }
      productList.MaxshippingPrice = MaxshippingPrice;
      productList.MaxtaxPrice = MaxtaxPrice;
      productList.MaxdiscountPrice = MaxdiscountPrice;

    if (parseFloat(grandtaotal) < 0.001) {
        grandtaotal = parseFloat('0.00') + parseFloat(shippingPricetemp);
    }
    productList.grandtaotal = parseFloat(grandtaotal).toFixed(2);
            productList.maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
            productList.maxGrandTotalStoreAmount = currencyFomatter(parseFloat(productList.grandtaotal));
    localStorage.setItem("productList", JSON.stringify(productList));
}






/*
    this method use for update cart product page on behalf of Add , + and - qty.
*/
function updatecartDetails(type, productid, indexcart) {
    /*if(type == 'delete'){
      productList.list.splice(indexcart,1);
      localStorage.setItem("productList",JSON.stringify(productList));
      updatecartCount();
     }*/

    for (i = 0; i < productList.list.length; i++) {

        var subtaotal = productList.subtaotal;
        var productidcart = productList.list[i].productId;
        var totalproduct = productList.totalproduct;
        if (productidcart == productid && reload == "1" && indexcart == i) {
            var oldquantity = productList.list[i].orderQuantity;
            var oldprice = productList.list[i].price;
            var quantity = '';
            if (type == 'add') {

                quantity = parseInt(oldquantity) + 1;
                productList.list[i].orderQuantity = quantity;
                productList.totalproduct = parseInt(totalproduct) + 1;
                productList.subtaotal = parseFloat(parseFloat(subtaotal) + parseFloat(oldprice)).toFixed(2);
                productList.maxSubTotalStore = currencyFomatter(parseFloat(productList.subtaotal));
                productList.maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
                productList.maxGrandTotalStoreAmount = currencyFomatter(parseFloat(productList.grandtaotal));
                localStorage.setItem("productList", JSON.stringify(productList));
                updatecartCount();
                getconfigurationfoodConfigurationSettings();
                reloadcratpage();
                showhidepaymentsdetails();
                reload = "0";
                return true;
            }
            else if (type == 'less') {

                quantity = parseInt(oldquantity) - 1;
                productList.list[i].orderQuantity = quantity;
                productList.totalproduct = parseInt(totalproduct) - 1;
                productList.subtaotal = parseFloat(parseFloat(subtaotal) - parseFloat(oldprice)).toFixed(2);
                productList.maxSubTotalStore = currencyFomatter(parseFloat(productList.subtaotal));
				productList.maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
				productList.maxGrandTotalStoreAmount = currencyFomatter(parseFloat(productList.grandtaotal));
		        localStorage.setItem("productList", JSON.stringify(productList));
                updatecartCount();
                getconfigurationfoodConfigurationSettings();
                setTimeout(function () {
                    reloadcratpage();
                }, 200);
                showhidepaymentsdetails();
                reload = "0";
                return true;
            }
            else if (type == 'delete') {

                if (productList.list.length >= 3) {
                    Appyscript.showIndicator();
                }

                setTimeout(function () { Appyscript.hideIndicator(); }, 4000);

                var lesspromtotal = parseInt(oldquantity) * parseFloat(oldprice).toFixed(2);
                var subtaotal = productList.subtaotal;
                productList.subtaotal = parseFloat(parseFloat(subtaotal) - parseFloat(lesspromtotal)).toFixed(2);
                productList.totalproduct = parseInt(totalproduct) - 1;
                //productList.list.splice(i,1);
                productList.list.splice(indexcart, 1);
                localStorage.setItem("productList", JSON.stringify(productList));
                updatecartCount();
                getconfigurationfoodConfigurationSettings();
                reloadcratpage();
                showhidepaymentsdetails();
                if (productList.list.length == 0) {
                    localStorage.setItem("cardDetailsPageback", "true");
                    localStorage.setItem("productList", "");
                }

                reload = "0";
                return true;
            }
            else {

                reload = "0";
                return true;
            }
        }
    }
}


function ecommerceupdateCartBoxIndex() {
    var index = 0;
    $$(".cart-page .foodEqhight").each(function () {
        var thisP = $$(this);
        thisP.attr("index", index);
        index++;
    });
}



/*
  this method use to update and reload cart product page , if user delete and update cart-product qty.
*/
function reloadcratpage() {
    if (productList.list.length < 1) {
        productList.totalproduct = 0;
        Appyscript.showIndicator();
        $$.get("pages/ecommerce-product.html", function (template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(productList);
            mainView.router.reloadContent(html);
            Appyscript.hideIndicator();
        });
        return;
    }
    if (reloadDataCart == null) {
        Appyscript.showIndicator();
        $$.get("pages/ecommerce-product.html", function (template) {
            var compiledTemplate = AppyTemplate.compile(template);
            reloadDataCart = template;
            var html = compiledTemplate(productList);
            var btn = document.createElement("html");
            btn.innerHTML = html;
            $$(mainView.activePage.container).find(".pay-mobile-cart").html($$(btn).find(".pay-mobile-cart").html());
            $$(btn).find(".user_tab .product_price").each(function (i) {
                $$(mainView.activePage.container).find(".user_tab .product_price").eq(i).html($$(this).html());
            })
            Appyscript.hideIndicator();
        });
    }
    else {
        var compiledTemplate = AppyTemplate.compile(reloadDataCart);

        if (productList.totalproduct == 0) {
            productList.totalproduct = 1;
        }
        var html = compiledTemplate(productList);
        var btn = document.createElement("html");
        btn.innerHTML = html;
        $$(mainView.activePage.container).find(".pay-mobile-cart").html($$(btn).find(".pay-mobile-cart").html())
        $$(btn).find(".user_tab .product_price").each(function (i) {
            $$(mainView.activePage.container).find(".user_tab .product_price").eq(i).html($$(this).html());
        })
    }

    if (productList.list.length <= 1) {
        $$(".cart-item").addClass("single");
    }
    else {
        $$(".cart-item").removeClass("single");
    }
}












/*
    this methode is use for update gTotal , subTotal , grandTotal on cart-page.
*/
function showhidepaymentsdetails() {
    var pdlist = localStorage.getItem("productList");
    if (pdlist) {
        pdlist = JSON.parse(pdlist);
        if (pdlist.list.length) {
            productList = pdlist;
        }
    }

	var grandtaotal=productList.grandtaotal;
	var subtaotal=productList.subtaotal;

	var maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
    var maxSubTotalStore = currencyFomatter(parseFloat(productList.subtaotal));
	var currency=productList.currency;
	var maxcoupandiscount = currencyFomatter(parseFloat(productList.coupandiscount));
    productList.maxcoupandiscount = maxcoupandiscount;

    var currencySymbol = localStorage.getItem("currencySymbol");
    currencySymbol = $$("<div>" + currencySymbol + "</div>").html().trim();
    //console.log("productList.subtaotal**   "+productList.maxSubTotalStore);
        /*$$("#orderQuantityprice").show().find("big").text( currencySymbol+""+productList.maxSubTotalStore);
        $$("#subtotalecom").show().find("span").text( currencySymbol+""+productList.subtaotal);
        $$("#gtotal").show().find("span").text( currencySymbol+""+productList.grandtaotal);
        $$("#grandTotal").find("span").text( currencySymbol+""+productList.grandtaotal);*///

        $$("#orderQuantityprice"+cart_Product_Index).show().find("big").text( currencySymbol+""+productList.maxSubTotalStore);
        $$("#subtotalecom").show().find("span").text( currencySymbol+""+maxSubTotalStore);
        $$("#gtotal").show().find("span").text( currencySymbol+""+maxGrandTotalStore);
        $$("#grandTotal").find("span").text( currencySymbol+""+maxGrandTotalStore);

    if (productList.coupandiscount != '' && productList.coupandiscount != '0.00') {
        var mantri = '<small style="color:' + AppyTemplate.global.styleAndNavigation.activeColor + '; font-size: 16px!important;">-</small> ' + currencySymbol + '' + maxcoupandiscount;

        if (localStorage.getItem("couponHideNext") == "true") {
            $$("#coupanPriceChange").hide();
            localStorage.setItem("couponHideNext", "false");
        }
        else {
            $$("#coupanPriceChange").show().find("span").html();
        }
    }
    else {
        $$("#coupanPriceChange").hide();
    }
}

/*
    this method is calling fron car-page.
    for apply coupan code.
*/
var coupancheck = true;
function ApplyCoupanCode(a) {
    coupancheck = true;
    var couponDiscount;
    var coupandiscount = '';
    var subtaotal;
    var discountType;
    var grandtaotal
    var currency
    var couponDiscountee = '';

    var couponCode = $$("#couponCode").val();
    if(couponCode != ""){
        if (isOnline()) {
            Appyscript.showIndicator();
            var postdata = '{"method":"ecommCoupon","appId":"' + app_id + '","couponCode":"' + couponCode + '"}';
            console.log("ecommCoupon :baseurl    " + baseurl + "  postdata  " + postdata);
            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postdata),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData, textStatus) {
                    console.log("ecommCoupon :jsonData    " + jsonData + "  jsonData==  " + JSON.parse(jsonData));
                    getconfigurationfoodConfigurationSettings();
                    var couponCodedata = JSON.parse(jsonData);
                    var status = couponCodedata.status;
                    if (status == 1) {
                        discountType = couponCodedata.coupon.discountType;
                        couponDiscount = couponCodedata.coupon.couponDiscount;

                        var rule_price = couponCodedata.coupon.rule_price;
                        var rule = couponCodedata.coupon.rule;

                        couponDiscountee = couponCodedata.coupon.couponDiscount;

                        subtaotal = productList.coupanafterdiscount;
                        grandtaotal = productList.grandtaotal;
                        var discountPricetemp = productList.discountPrice;
                        currency = productList.currency;
                        if (rule == ">=") {

                            if (parseFloat(subtaotal) >= parseFloat(rule_price)) {

                                if (discountType == 'percentage') {
                                    coupandiscount = ((parseFloat(subtaotal).toFixed(2) * parseFloat(couponDiscount).toFixed(2)) / 100);
                                    $$("#coupanPrice").show().find("small").text(" (" + couponDiscountee + "%)");

                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                                }
                                else {

                                    coupandiscount = eval(couponDiscount);
                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                                }
                            }
                            else {
                                console.log("else");
                                localStorage.setItem("couponHide", "true")
                                grandtaotal = parseFloat(grandtaotal).toFixed(2)
                            }

                        }
                        else if (rule == "==") {

                            if (parseFloat(subtaotal) == parseFloat(rule_price)) {

                                if (discountType == 'percentage') {
                                    coupandiscount = ((parseFloat(subtaotal).toFixed(2) * parseFloat(couponDiscount).toFixed(2)) / 100);
                                    $$("#coupanPrice").show().find("small").text(" (" + couponDiscountee + "%)");

                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                                }
                                else {

                                    coupandiscount = eval(couponDiscount);
                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                                }
                            }
                            else {
                                localStorage.setItem("couponHide", "true")
                                grandtaotal = parseFloat(grandtaotal).toFixed(2)
                            }

                        }
                        else if (rule == "<=") {
                            if (parseFloat(subtaotal) <= parseFloat(rule_price)) {

                                if (discountType == 'percentage') {
                                    coupandiscount = ((parseFloat(subtaotal).toFixed(2) * parseFloat(couponDiscount).toFixed(2)) / 100);
                                    $$("#coupanPrice").show().find("small").text(" (" + couponDiscountee + "%)");

                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                                }
                                else {

                                    coupandiscount = eval(couponDiscount);
                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                                }
                            }
                            else {
                                localStorage.setItem("couponHide", "true")
                                grandtaotal = parseFloat(grandtaotal).toFixed(2)
                            }


                        }
                        else if (rule == "<") {


                            if (parseFloat(subtaotal) < parseFloat(rule_price)) {

                                if (discountType == 'percentage') {
                                    coupandiscount = ((parseFloat(subtaotal).toFixed(2) * parseFloat(couponDiscount).toFixed(2)) / 100);
                                    $$("#coupanPrice").show().find("small").text(" (" + couponDiscountee + "%)");
                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);
                                }
                                else {
                                    coupandiscount = eval(couponDiscount);
                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                                }
                            }
                            else {
                                localStorage.setItem("couponHide", "true")
                                grandtaotal = parseFloat(grandtaotal).toFixed(2)
                            }
                        }

                        else if (rule == ">") {
                            if (parseFloat(subtaotal) > parseFloat(rule_price)) {
                                if (discountType == 'percentage') {
                                    coupandiscount = ((parseFloat(subtaotal).toFixed(2) * parseFloat(couponDiscount).toFixed(2)) / 100);
                                    $$("#coupanPrice").show().find("small").text(" (" + couponDiscountee + "%)");
                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);
                                }
                                else {
                                    coupandiscount = eval(couponDiscount);
                                    grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);
                                }
                            }
                            else {
                                localStorage.setItem("couponHide", "true")
                                grandtaotal = parseFloat(grandtaotal).toFixed(2)
                            }

                        }
                        else {

                            if (discountType == 'percentage') {

                                coupandiscount = ((parseFloat(subtaotal).toFixed(2) * parseFloat(couponDiscount).toFixed(2)) / 100);
                                $$("#coupanPrice").show().find("small").text(" (" + couponDiscountee + "%)");

                                grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                            }
                            else {
                                coupandiscount = eval(couponDiscount);
                                grandtaotal = parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);
                            }
                            //alert(couponDiscount)
                            //alert(grandtaotal)
                        }

                        //grandtaotal=parseFloat(grandtaotal).toFixed(2) - parseFloat(coupandiscount).toFixed(2);

                        if (grandtaotal) {
                            if (grandtaotal <= 0.01) {
                                grandtaotal = 0.00;
                            }
                        }
                        else {
                            grandtaotal = 0.00;
                        }

                        productList.grandtaotal = parseFloat(grandtaotal).toFixed(2);
                        productList.coupandiscountType = discountType;
                        productList.coupandiscount = coupandiscount;
                        productList.couponCode = couponCode;
                        productList.couponDiscountee = couponDiscountee;
                        AppyTemplate.global.curSymFor =  localStorage.getItem("curSymForSym");
                        AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");
                        var maxcoupandiscount = currencyFomatter(parseFloat(productList.coupandiscount));
                        productList.maxcoupandiscount = maxcoupandiscount;


                        //`                               `
                        var currencySymbol = localStorage.getItem("currencySymbol");
                        currencySymbol = $$("<div>" + currencySymbol + "</div>").html().trim();
                        /*   $$("#coupanPrice").show().find("span").find("small").text("- ");
                         $$("#coupanPrice").show().find("span").text(currencySymbol+""+parseFloat(coupandiscount).toFixed(2));*/
                        var mantri = '<small style="color:' + AppyTemplate.global.styleAndNavigation.activeColor + '; font-size: 16px!important;">-</small> ' + currencySymbol + '' + productList.maxcoupandiscount;
                        //$$("#coupanPrice").show().find("span").find("small").text("- ");

                        if (localStorage.getItem("couponHide") == "true") {
                            coupancheck = false;
                            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.not_a_valid_coupon_mcom, data.appData.appName);
                            localStorage.setItem("couponHide", "false")
                            localStorage.setItem("couponHideNext", "true")
                            $$("#coupanPrice").hide();
                        }
                        else {
                            Appyscript.alert(pageData.languageSetting.Coupon_Applied, appnameglobal_allpages);
                            localStorage.setItem("couponHideNext", "false")
                             localStorage.setItem("couponHide","true")
                            $$("#coupanPrice").show().find("span").html(mantri);
                        }

                        var maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
                        var maxSubTotalStore = currencyFomatter(parseFloat(productList.subtaotal));

                        productList.maxGrandTotalStore = maxGrandTotalStore;
                        $$("#gtotal").show().find("span").text(currencySymbol + "" + maxGrandTotalStore);
                        $$("#grandTotal").find("span").text(currencySymbol + "" + maxGrandTotalStore);
                        $$("#subtotalecom").show().find("span").text(currencySymbol + "" + maxSubTotalStore);
                        localStorage.setItem("productList", JSON.stringify(productList));
                        setTimeout(function () { CHANGEtAXCOUPAN(); }, 3000);
                    }
                    else {
                        coupancheck = false;
                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.not_a_valid_coupon_mcom, data.appData.appName);
                        Appyscript.hideIndicator();
                    }

                }, error: function (error) {
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }
            });
        }
        else {
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
            Appyscript.hideIndicator();
        }
    }

}








function proceedToPaydetails(a) {
    if (isOnline()) {
        Appyscript.showIndicator();
        var minPrice = configurationfood.minimumOrderAmount
        var actualPrice = parseFloat(productList.subtaotal);
        // var actualPrice2 =parseFloat(productList.grandtaotal);
        // alert(actualPrice)
        // alert(actualPrice2)
        var currencySymbol = localStorage.getItem("currencySymbol");
        currencySymbol = $$("<div>" + currencySymbol + "</div>").html().trim();

        if (minPrice != null) {
            if (minPrice > actualPrice) {

                Appyscript.alert(pageData.languageSetting.minimum_amount_should_be + " " + currencySymbol + "" + minPrice);
                Appyscript.hideIndicator();
                return;

            }
        }

        //        if(parseFloat(productList.grandtaotal) <= 0.01)
        //        {
        //                Appyscript.alert(orderzeroamount , appnameglobal_allpages);
        //                return;
        //        }
        // else
        //{

        $$.get("pages/ecommerce-form.html", function (template) {
            productList.addressType = parseInt(pageData.generalinformation.customer_address);
            productList.plusCodeType = parseInt(pageData.generalinformation.plus_code_address);
            AppyTemplate.global.emailFinder = localStorage.getItem("email");
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(productList);
            mainView.router.load({ content: html, animatePages: true });
            showhidepaymentsdetails();
            updatecartCount();
            Appyscript.hideIndicator();
            setTimeout(function () {
                $$("#bState").off("keyup").on("keyup", changetax);
                $$("#bCountry").off("change").on("change", changetax);
                opencalenderecomm();
                openTime();
            }, 1000);
        });
        // }
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }

}



Appyscript.onPageInit('ecommerce-ProductList', function (page) {
    Appyscript.hideIndicator();
    var orderDetailSwiper = Appyscript.swiper('.orderproduct-swiper');
    AppyTemplate.global.ecomCurrencyCode = productList.currency;
    $$(".orderproduct-swiper .detailsoredr-swiper-slide").each(function (i) {
        $$(this).find(".swiper-banner .preloader").remove();
        if ($$(this).find(".swiper-banner .swiper-slide").length <= 1) {
        }
        else {
            var a = Appyscript.swiper(".swiper-banner-" + i);
        }
    });
});








Appyscript.onPageInit('ecommerce-MyOrder', function (page) {
    $$(".accordion-item-content").each(function () {
        var thisRow = $$(this);
        var gTotal = 0;
        thisRow.find("li[amount]").each(function () {
            gTotal += parseFloat($$(this).attr("amount"));
        })
        thisRow.find(".gTotal").find("span").text(thisRow.find(".gTotal").attr("currency") + (gTotal).toFixed(2));
    })

    $$(".accordion-item").eq(0).find("a").eq(0).click();
    $$(".accordion-item").eq(0).find(".accordion-item").eq(0).find("a").eq(0).click();

});
Appyscript.ecomCancelOrder = function (a) {
    productidpostreview = $$(a).attr("product-id");
    var heading = $$(a).attr("data-head");
    var ecomorderIdd = ecomorderId;
    if (isOnline()) {
        Appyscript.showIndicator();
        var postdata = '{"method":"ecommCancelOrderDetail","appId":"' + app_id + '","orderId":"' + ecomorderIdd + '","lang":"' + lang + '"}';  //ecommCancelOrderDetail - appId,orderId,lang
        //console.log("ecommCancelOrderDetail :baseurl    " + baseurl +"  postdata  "+postdata);
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                var addRemoveWishlist = JSON.parse(jsonData);
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.your_order_cancel_successful_mcom, data.appData.appName, function () { Appyscript.hideIndicator(); mainView.router.back() });
                Appyscript.hideIndicator();
            }, error: function (error) {
                //console.log("ecomCancelOrder : Error " + error.code + " " + error.message);
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });

    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}









function ecomLoadCatProductOnSwipe(maincatid, sort, index) {
    var sort = sort;
    var pageNo = '1';
    var count = '10';
    var type = "cat";
    // console.log("index  "+index);
    if (isOnline()) {

        Appyscript.showIndicator();
        var postdata = '{"method":"listOfCategoryProduct","appId":"' + app_id + '","catId":"' + maincatid + '","page":"' + pageNo + '", "emailId":"' + useremailid + '"}';
        //console.log("ecomLoadCatProductOnSwipe :baseurl    " + baseurl +"  postdata  "+postdata);
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                var data = JSON.parse(jsonData);

                  var productPriceArr = data.productList;
                         for(var key in productPriceArr){
                           productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
                           }




                resetStoreData(productPriceArr);
                productListData.list = productPriceArr;
                data.categoryId = maincatid;
                data.categoryName = "Dummy Text";
                ecomData.push(data);
                data.styleAndNavigation = pageData.styleAndNavigation;
                var daynamicHtmlHome = ecomsubcatproductTemplate;
                if (data.productList.length < 1 && data.subCategories.length < 1) {
                    daynamicHtmlHome = ecommErrorTemplate;
                }
                var compiledTemplate = AppyTemplate.compile(daynamicHtmlHome);
                var html = compiledTemplate(data);
                $$("#cat-" + maincatid).find("ul").html(html);
                arrayecomcatID.push(maincatid);
                Appyscript.hideIndicator();
                updatecartCount();
            }, error: function (error) {
                // console.log("ecomLoadCatProductOnSwipe : Error " + error.code + " " + error.message);
                Appyscript.hideIndicator();
                updatecartCount();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}





/*
    this method is use for Add/remove product from widhlist.
*/
Appyscript.ecomAddRemoveProductWishlist = function (a) {
    var productid = DetailsProductID;
    var wishlistType = wishstatus;
    if ($$(a).is(".on")) {
        wishlistType = 'remove';
    }
    else {
        wishlistType = 'add';
    }
    if (isOnline()) {
        if (!localStorage.getItem("email")) {
            Appyscript.loginPage("true");
            // Appyscript.alert("Please login first to add product in wishlist." ,data.appData.appName);
            return true;
        }

        Appyscript.showIndicator();
        var postdata = '{"method":"addRemoveWishlist","appId":"' + localStorage.getItem("appid") + '","email":"' + useremailid + '","productId":"' + productid + '","wishlistType":"' + wishlistType + '"}';
        //console.log("addRemoveWishlist :baseurl    " + baseurl +"  postdata  "+postdata);
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                var addRemoveWishlist = JSON.parse(jsonData);
                var statusmsg = addRemoveWishlist.msg;
                if (statusmsg == 'added') {
                    $$("#footer-nav").find("a.like").addClass("on");
                    statusmsg = '1';
                    Appyscript.hideIndicator();
                    updatewishliststatus('add', productid);
                    Appyscript.alert(pageData.languageSetting.product_successfully_added_in_your_wishlist, data.appData.appName);
                }
                else {
                    $$("#footer-nav").find("a.like").removeClass("on");
                    statusmsg = '0';
                    Appyscript.hideIndicator();
                    updatewishliststatus('', productid);
                    Appyscript.alert(pageData.languageSetting.product_successfully_removed_from_your_wishlist, data.appData.appName);
                }
                if (detailsfrompage == '0') {
                    subProductList.productList[DetaislActiveIndex].wishlist = statusmsg;
                }
                else {
                    ecomData[catActiveIndex].productList[DetaislActiveIndex].wishlist = statusmsg;
                }
                if (wishlistreload == '1') {
                    mainView.router.back();
                    loadwishlistpage();
                }

                Appyscript.hideIndicator();
            }, error: function (error) {
                // console.log("addRemoveWishlist : Error " + error.code + " " + error.message);
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}



/*
    this method is use for reload withlist product.
*/
function loadwishlistpage() {
    if (isOnline()) {
        Appyscript.showIndicator();
        var jsonPostecom = '{"method":"wishList", "appId":"' + app_id + '", "email":"' + useremailid + '"}';  //{"method":"wishList","appId":"6e870b43edda","email":"Abhishekraics001@gmail.com"}
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(jsonPostecom),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                var ecommSearch = JSON.parse(jsonData);
                subProductList = ecommSearch;
                resetStoreData(subProductList.productList);
                if (ecommSearch.productList.length < 1) {
                    ecommSearch.styleAndNavigation = pageData.styleAndNavigation;
                }

                $$.get("pages/ecommerce-wishlist.html", function (template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(ecommSearch);
                    mainView.router.reloadContent(html);
                    Appyscript.hideIndicator();
                });
            }, error: function (error) {
                // console.log("ecommSearch : Error " + error.code + " " + error.message);
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}




/*
    this page for post review from order details page
    use page ecommerce-post-review.html.
*/
var productidpostreview = '';
Appyscript.ecomPostreview = function (a) {
    Appyscript.showIndicator();
    productidpostreview = $$(a).attr("product-id");
    var heading = $$(a).attr("data-head");
    var paymentsmethode = [];
    var jsonPostecom = { "method": "ecommProductIdsDetails", "appId": app_id, "productIds": reorderproductid, "emailId": useremailid };
    $$.ajax({
        url: baseurl,
        data: Appyscript.validateJSONData(JSON.stringify(jsonPostecom)),
        type: "post",
        //321 headers: {'accessToken': deviceEncryptedToken},
        async: true,
        success: function (jsonData, textStatus) {

            reorderProductDetail = JSON.parse(jsonData);

            resetStoreData(reorderProductDetail.productList);

            if (reorderProductDetail.productList == "" || reorderProductDetail.productList == " " || reorderProductDetail.productList == "null" || reorderProductDetail.productList == null || reorderProductDetail.productList == undefined || reorderProductDetail.productList == "undefined") {

                Appyscript.hideIndicator();
                Appyscript.alert(pageData.languageSetting.sorry_this_product_is_no_longer_available, appnameglobal_allpages);

            }

            else {
                $$.get("pages/ecommerce-post-review.html", function (template) {
                    Appyscript.hideIndicator();
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(paymentsmethode);
                    mainView.router.load({ content: html, animatePages: true });
                    updatecartCount();
                });
            }

        }, error: function (error) {
            //console.log("ApplyCoupanCode : Error " + error.code + " " + error.message);
            Appyscript.hideIndicator();
            updatecartCount();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
        }
    });
}



/*
    this methode is use for gat rating point of user that user have selcet fro post rating
*/
function getrating(obj) {
    starObj = obj;
    starValue = $$(obj).index() + 1;
    if (parseInt(starValue) > 1) {
        for (i = 1; i <= parseInt(starValue) ; i++) {
            $$("#rat" + i).attr('src', 'images/star-on-big.png');
        }
    }
    if (parseInt(starValue) < 5) {
        starValue = parseInt(starValue) + 1;
        for (i = parseInt(starValue) ; i <= 5; i++) {
            $$("#rat" + i).attr('src', 'images/star-off-big.png');
        }
    }
}

/*
    this method for post review on server.
*/
function postReviewOfProduct(a) {
    var title = $$("#InputTitle").val();
    var Review = $$("#comentInputTxt").val().trim();
    var review = Review.replace(/\s+/g, " ");
    var rating = starValue;
    var productid = productidpostreview;

    /* if(title== null || title == "")
    {
       Appyscript.alert(AppyTemplate.global.pageLanguageSetting.review_title_mcom ,data.appData.appName);
    }
    else if(review== null || review == "")
    {
         Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_review_ecom ,data.appData.appName);
    }*/
    if (rating == null || rating == "") {
        Appyscript.alert("please add your review rating", data.appData.appName);
    }
    else {
        if (isOnline()) {
            Appyscript.showIndicator();
            var postdata = '{"method":"addReview","appId":"' + app_id + '","email":"' + useremailid + '","productId":"' + productid + '","title":"' + title + '","review":"' + review + '","rating":"' + rating + '"}';
            //console.log("addReview :baseurl    " +postdata );
            // console.log("addReview :baseurl    " + baseurl +"  postdata  "+postdata);
            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postdata),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData, textStatus) {
                    // Appyscript.hideIndicator();
                    var addRemoveWishlist = JSON.parse(jsonData);
                    $$("#InputTitle").val("");
                    $$("#comentInputTxt").val("");


                    var starValue = "1";
                    for (i = parseInt(starValue) ; i <= 5; i++) {
                        $$("#rat" + i).attr('src', 'images/star-off-big.png');
                        starValue = parseInt(starValue) + 1;
                    }
                    Appyscript.alert("Your review successfully", data.appData.appName, function () { Appyscript.hideIndicator(); mainView.router.back() });
                }, error: function (error) {
                    // console.log("addRemoveWishlist : Error " + error.code + " " + error.message);
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });

        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    }
}









/*
    this methode is calling from ecommerce.html  page and ecommerce-menu.html for search product box zoom-in and zoom-out.
*/
Appyscript.ecomSearchClick = function (a) {
    var thisInput = $$(a).parent().find("input");
    if (thisInput.is(".on")) {
        thisInput.removeClass("on")
    }
    else {
        thisInput.addClass("on")
    }
}


/*
    this method is use for gat search product  key
    change on Iphone
*/
function ecomtxtSearchFunction(e, obj) {
    var thisObj = $$(obj);
    var type = e.type;
    if (type == "focus") {
        thisObj.removeClass("on");
    }
    if (Appyscript.device.android) {
        if (type == "keyup") {
            var mEvent = e || window.event;
            var mPressed = mEvent.keyCode || mEvent.which;
            if (mPressed == 13) {
                var searchtext = $$(obj).val();
                if (searchtext.length > 0) {
                    Appyscript.closeModal();
                    setTimeout(ecomopenSearchProduct(searchtext), 100);
                }
            }
        }
        if (type == "blur") {
            thisObj.addClass("on");
        }
    }
    else {
        if (type == "blur") {
            var searchtext = $$(obj).val();
            if (searchtext.length > 0) {
                Appyscript.closeModal();
                setTimeout(ecomopenSearchProduct(searchtext), 100);
            }
        }
        if (type == "keyup") {
            thisObj.addClass("on");
        }
    }
}



/*
    this method is use for gat search product  produc list behalf of search key.
    dispaly product on ecommerce-search.html.
*/
function ecomopenSearchProduct(searchtext) {
    if (isOnline()) {
        Appyscript.showIndicator();
        var page = '1';
        var postdata = '{"method":"ecommSearch","appId":"' + app_id + '","page":"' + page + '","search":"' + searchtext + '", "emailId":"' + useremailid + '"}';
        //console.log("ecommSearch  :baseurl    " + baseurl +"  postdata  "+postdata);

        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                var ecommSearch = JSON.parse(jsonData);
                subProductList = ecommSearch;

                var productPriceArr = subProductList.productList;
                for(var key in productPriceArr){
                productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
                }

                resetStoreData(subProductList.productList);
                if (ecommSearch.productList.length < 1) {
                    ecommSearch.styleAndNavigation = pageData.styleAndNavigation;
                }

                $$.get("pages/ecommerce-search.html", function (template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(ecommSearch);
                    mainView.router.load({ content: html, animatePages: true });
                    //Appyscript.hideIndicator();
                    updatecartCount();
                });
            }, error: function (error) {
                // console.log("ecommSearch : Error " + error.code + " " + error.message);
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }

}



function focusInput(a) {
    setTimeout(function () {
        $$(mainView.activePage.container).find(".product-swiper-slide.swiper-slide-active")[0].scrollTop = $$(a).parent()[0].offsetTop - 20;
    }, 600)
}

Appyscript.onPageInit('*', function (page) {
    if (mainView.activePage) {
        var cou = mainView.activePage.name.split("-")[0];
        if (cou == "ecommerce") {
            updatecartCount()
        }

        if(mainView.activePage.name==="ecommerce-Category"){
             var sortinSelect = $$(mainView.activePage.container).find(".top_toolBar");
                if (sortinSelect.length != 0 && sortbyvalue != "") {
                    sortinSelect.find("select").val(sortbyvalue);
                }
                var infiniteScroll = $$(mainView.activePage.container).find('.infinite-scroll');
                if (infiniteScroll.find(".categories-list li.category").length < 10) {
                    if (infiniteScroll.find(".categories-list li.product").length < 10) {
                        infiniteScroll.removeClass("infinite-scroll");
                        infiniteScroll.find(".infinite-scroll-preloader").remove();
                        return false;
                    }
                }

                var dataID = infiniteScroll.attr("data-id");
                var dataPage = parseInt(infiniteScroll.attr("data-page")) + 1;
                var loading = true;
                infiniteScroll.on('infinite', function () {
                    if (!loading) {
                        return false;
                    }
                    loading = false;
                    infiniteScroll.find(".infinite-scroll-preloader").show();
                    var postdata = '{"method":"listOfCategoryProduct","appId":"' + app_id + '","catId":"' + dataID + '","page":"' + dataPage + '", "emailId":"' + useremailid + '"}';
                    //console.log("listOfCategoryProduct postdata "+postdata);

                    if (isOnline()) {
                        $$.ajax({
                                    url: baseURL,
                                    data: postdata,
                                    type: 'post',
                                    async: true,
                                    //321 headers: {'accessToken': deviceEncryptedToken},
                                    success: function(data) {
                                    Appyscript.hideIndicator();
                                    data = JSON.parse(data);

                                        data.styleAndNavigation = pageData.styleAndNavigation;

                                         var productPriceArr = data.productList;
                                                                 for(var key in productPriceArr){
                                                                   productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
                                                                   }




                                        resetStoreData(productPriceArr);
                                        var compiledTemplate = AppyTemplate.compile(getCategoryTemplate);
                                        var html = compiledTemplate(data);
                                        var htmlData = document.createElement("html");
                                        htmlData.innerHTML = html;
                                        $$(htmlData).find(".categories-list li").appendTo($$(mainView.activePage.container).find(".categories-list"));
                                        dataPage++;
                                        if (data.subCategories.length < 10) {
                                            if (data.productList.length < 10) {
                                                infiniteScroll.removeClass("infinite-scroll");
                                                Appyscript.detachInfiniteScroll(infiniteScroll);
                                                infiniteScroll.find(".infinite-scroll-preloader").remove();
                                                loading = false;
                                            }
                                            else {
                                                loading = true;
                                            }
                                        }
                                        else {
                                            loading = true;
                                        }
                                        $$(mainView.activePage.container).find(".categories-list li.product")
                                        .appendTo($$(mainView.activePage.container).find(".categories-list"))
                                        infiniteScroll.find(".infinite-scroll-preloader").hide();
                                    }
                        })
                    }
                    else {
                        Appyscript.hideIndicator();
                        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
                    }
                })
        }
    }
});



/*
 this method for get count product and view on all page with cound
 if count is avialbe then show else hide.
*/
function updatecartCount() {
    var totalproduct = productList.list.length;
    if (parseInt(totalproduct) >= 1) {
        $$(".cartNotification").text(totalproduct);
        $$(".cartNotification").show();
    }
    else {
        $$(".cartNotification").text("");
        $$(".cartNotification").hide();
    }
}





/*
    use dat-page ecommerce-AccountDetails
    use page ecommerce-form.html and ecommerce-my-account.html
    use method for get user account details from server.
*/
Appyscript.onPageInit('ecommerce-AccountDetails', function (page) {
     if(pageData.generalinformation.allow_user_select_delivery_date == "1")
          {
          $$(".showDateTime").show();
          $$(".dateTimePicker").hide();
          }else {
          $$(".showDateTime").hide();
          $$(".dateTimePicker").hide();
          }
    if (localStorage.getItem("email")) {
        AppyTemplate.global.loginCheck = true;
        useremailid = localStorage.getItem("email");
        username = localStorage.getItem("username");
        userphone = localStorage.getItem("phone");

        if (isOnline()) {
            Appyscript.showIndicator();
            var jsonPostecom = '{"method":"ecommDefaultAddressBook", "appId":"' + app_id + '", "userName":"' + useremailid + '"}';
            // console.log("baseurl  "+baseurl+"  jsonPostecom  "+jsonPostecom);

            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(jsonPostecom),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData, textStatus) {
                    console.log(jsonData)


                    var ecommjsonData = JSON.parse(jsonData);
                    if(ecommjsonData.customerBillingShippingList)
                    {
                    if(ecommjsonData.customerBillingShippingList.length != 0){
                    AppyTemplate.global.currentcountry = ecommjsonData.customerBillingShippingList.billing.country;
                    }
                    }



                    billshipsame = "0";
                    setTimeout(function () { changetax(); }, 3000);


                    if (ecommjsonData.status == '1') {
                        if (ecommjsonData.contactInfo) {
                            var contactInfo = ecommjsonData.contactInfo;
                            Appyscript.formFromJSON('#contactInfo', contactInfo);
                        }
                        if (ecommjsonData.customerBillingShippingList == "") {
                           // $$("#bAddress").val(AppyTemplate.global.currentaddresssfull)
                            $$("#bCity").val(AppyTemplate.global.currentcity);
                            $$("#bState").val(AppyTemplate.global.currentstate);
                            $$("#bZip").val(AppyTemplate.global.currentzip);
                            if(data.appData.lang == "pt"){

                                $$("#bCountry").val("Belize");
                            }else{
                                $$("#bCountry").val(AppyTemplate.global.currentcountry);
                            }
                            //$$("#sAddress").val(AppyTemplate.global.currentaddresssfull);
                            $$("#sCity").val(AppyTemplate.global.currentcity);
                            $$("#sState").val(AppyTemplate.global.currentstate);
                            $$("#sZip").val(AppyTemplate.global.currentzip);
                            $$("#sCountry").val(AppyTemplate.global.currentcountry);
                        }
                        if (ecommjsonData.customerBillingShippingList.billing) {
                            ecommjsonData.customerBillingShippingList.billing.email = ecommjsonData.contactInfo.email;
                            var billing = ecommjsonData.customerBillingShippingList.billing;
                            Appyscript.formFromJSON('#billing', billing);
                        }
                        if (ecommjsonData.customerBillingShippingList.shipping) {
                            ecommjsonData.customerBillingShippingList.shipping.email = ecommjsonData.contactInfo.email;
                            var shipping = ecommjsonData.customerBillingShippingList.shipping;
                            Appyscript.formFromJSON('#shipping', shipping);
                        }
                        document.getElementById('show_date_time').checked = false;
                                                   if(pageData.generalinformation.allow_user_select_delivery_date == "1")
                                                    {
                                                   $$(".showDateTime").show();
                                                   if(document.getElementById('show_date_time').checked){
                                                      opencalenderecomm();
                                                      openTime();
                                                   }
                                                   else{
                                                     $$(".dateTimePicker").hide();
                                                   }
                                                   }
                                                  else {
                                                  $$(".showDateTime").hide();
                                                  $$(".dateTimePicker").hide();
                                                  }
                    }
                    Appyscript.hideIndicator();
                    updatecartCount();
                }, error: function (error) {
                    //console.log("ApplyCoupanCode : Error " + error.code + " " + error.message);
                    Appyscript.hideIndicator();
                    updatecartCount();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });
        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    }
    else {
        //$$("#bAddress").val(AppyTemplate.global.currentaddresssfull);
        $$("#bCity").val(AppyTemplate.global.currentcity);
        $$("#bState").val(AppyTemplate.global.currentstate);
        $$("#bZip").val(AppyTemplate.global.currentzip);
      //  $$("#bCountry").val(AppyTemplate.global.currentcountry);


         if(data.appData.lang == "pt"){

                                        $$("#bCountry").val("Belize");
                                    }else{
                                        $$("#bCountry").val(AppyTemplate.global.currentcountry);
                                    }

        //$$("#sAddress").val(AppyTemplate.global.currentaddresssfull);
        $$("#sCity").val(AppyTemplate.global.currentcity);
        $$("#sState").val(AppyTemplate.global.currentstate);
        $$("#sZip").val(AppyTemplate.global.currentzip);


        $$("#sCountry").val(AppyTemplate.global.currentcountry)
    }


});



/*
    this method is calling from product details page.
    use for custome option / configure product
    update product price and select custome data.
*/

AppyTemplate.registerHelper("format_currencytag", function(currency) {
    //localStorage.setItem("currencySymbol",currency);
   var currency = storeDetailsData.list[0].currency;

    var cur = data.currencySymbol;
    var key = currency;
    if (cur[key] == "" || cur[key] == undefined || cur[key] == "null") {
        localStorage.setItem("currencySymbol", key);
        return key;
    } else {
        localStorage.setItem("currencySymbol", cur[key]);
        return cur[key];
    }

});


function changeCustomData(obj) {
    var pageObj = $$(".product-swiper .product-swiper-slide").eq(productSwiper.activeIndex);
    var priceObj = pageObj.find("span[price]");
    //radical warning : parseFloat does not understand ",", please dont make this type of mistakes
    var price = parseFloat(priceObj.attr("price").replace(",", ""));
    var indexArr = [];
    pageObj.find(".customOptions").each(function (i) {
        var thisObj = $$(this);
        var thisVal = thisObj.val();
        if (thisVal != "-1") {
            var type = thisObj.find("option[value='" + thisVal + "']").attr("type");
            if (type == "p") {
                price += parseFloat(thisVal);
            }
            else {
                price -= parseFloat(thisVal);
            }
            var a = { index: i, value: (thisObj[0].selectedIndex - 1) }
            indexArr.push(a);
        }
    })
    if (price <= 0.00 || price == 0) {
        price = 0.00;

    }
    else {
        priceObj.parent().removeClass("priceShowHide");
    }

    price = parseFloat(price).toFixed(2);
    price = formatPriceGlobal(price);
    priceObj.text(price).attr("indexData", JSON.stringify(indexArr));
}



/*
    this method is use for validate user input.
    cahek input field blank or not
*/
function validate(field) {
    var value = field.value;
    if (value != '') {
        $$(field).removeClass("error");
        return true;
    }
    else {
        $$(field).addClass("error");
        return false;
    }
}


/*
    use for show hide user shaping details form
*/
function ecomProfileCheckbox(a) {
    if ($$(a).is(".icon-ok-4")) {
        billshipsame = '0';
        $$(".shippingView").hide();
        $$(a).removeClass("icon-ok-4").parent().find("input")[0].checked = false;

        $$("#bState").off("keyup").on("keyup", changetax);
        $$("#bCountry").off("change").on("change", changetax);

        $$("#sState").off("keyup");
        $$("#sCountry").off("change");
        changetax();

    }
    else {
        billshipsame = '1';
        $$(".shippingView").show();
        $$(a).addClass("icon-ok-4").parent().find("input")[0].checked = true;

        $$("#sState").off("keyup").on("keyup", changetax);
        $$("#sCountry").off("change").on("change", changetax);

        $$("#bState").off("keyup");
        $$("#bCountry").off("change");
        changetax();


    }
}

/*
    this methode is use for update user details like - contact information , Billing and shaping Address
*/
function updateaccountDeatils(frompage) {
    var pnameset = '';
    billing = '';
    shipping = '';
    jssonvalue = ''
    flagupdate = '';
    if (frompage == 'contactinformation') {
        var reqJson = Appyscript.formToJSON('#contactInfo');
        var name = reqJson.name;
        var phone = reqJson.phone;
        var email = reqJson.email;
        var lname = '';
        pnameset = name;
        if (name == null || name == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_name_mcom, data.appData.appName);
        }
        else if (phone == null || phone == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_telephone_mcom, data.appData.appName);
        }
        else {
            flagupdate = 'true';
            jssonvalue = '{"method":"ecommCustomerProfile", "appId":"' + app_id + '", "email":"' + useremailid + '", "fname":"' + name + '", "lname":"' + lname + '", "phone":"' + phone + '"}'; //// ecommCustomerProfile - appId,email,fname,lname,phone
        }
    }
    else if (frompage == 'billinginformation') {
        billing = Appyscript.formToJSON('#billing');
        console.log(billing)
        var bname = billing.name;
        var bphone = billing.phone;
        var baddress = billing.address;
        var bcity = billing.city;
        var bstate = billing.state;
        var bzip = billing.zip;
        var bcountry = $$("#bCountry").val();

        if (bname == null || bname == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_name_mcom, data.appData.appName);
        }
        else if (bphone == null || bphone == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_phone_mcom, data.appData.appName);
        }
        else if (baddress == null || baddress == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_address_mcom, data.appData.appName);

        }
        else if (bcity == null || bcity == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_city_mcom, data.appData.appName);
        }
        else if (bstate == null || bstate == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_state_mcom, data.appData.appName);
        }
        else if (bzip == null || bzip == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_zip_mcom, data.appData.appName);
        }
        else if (bcountry == "Select Country" || bcountry == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_select_country_socialapp, data.appData.appName);
        }
        else {
            flagupdate = 'true';
            billing = '{"name":"' + bname + '", "phone":"' + bphone + '", "address":"' + baddress + '", "city":"' + bcity + '", "state":"' + bstate + '", "zip":"' + bzip + '", "country":"' + bcountry + '", "billShip":"Billing"}';
        }
        jssonvalue = '{"method":"ecommMyAccount", "appId":"' + app_id + '", "userName":"' + useremailid + '", "billing":' + billing + ', "shipping":"" }';
    }

    else if (frompage == 'shippinginformation') {
        shipping = Appyscript.formToJSON('#shipping');
        var sname = shipping.name;
        var sphone = shipping.phone;
        var saddress = shipping.address;
        var scity = shipping.city;
        var sstate = shipping.state;
        var szip = shipping.zip;
        var scountry = $$("#sCountry").val();

        if (sname == null || sname == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_name_mcom, data.appData.appName);
        }
        else if (sphone == null || sphone == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_phone_mcom, data.appData.appName);
        }
        else if (saddress == null || saddress == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_address_mcom, data.appData.appName);
        }
        else if (scity == null || scity == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_city_mcom, data.appData.appName);
        }
        else if (sstate == null || sstate == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_state_mcom, data.appData.appName);
        }
        else if (szip == null || szip == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_zip_mcom, data.appData.appName);
        }
        else if (scountry == "Select Country" || scountry == "") {
            flagupdate = 'false';
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_select_country_socialapp, data.appData.appName);
        }
        else {
            flagupdate = 'true';
            shipping = '{"name":"' + sname + '", "phone":"' + sphone + '", "address":"' + saddress + '", "city":"' + scity + '", "state":"' + sstate + '", "zip":"' + szip + '", "country":"' + scountry + '", "billShip":"Shipping"}';
        }
        jssonvalue = '{"method":"ecommMyAccount", "appId":"' + app_id + '", "userName":"' + useremailid + '", "billing":"", "shipping":' + shipping + '}';  //commMyAccount - appId,userName,billing,shipping billShip: "Billing/Shipping"
    }
    else {
    }


    if (flagupdate == 'true') {
        if (isOnline()) {
            // console.log("ecommMyAccount baseurl   "+baseurl  +"  jssonvalue  "+jssonvalue);
            Appyscript.showIndicator();
            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(jssonvalue),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData, textStatus) {
                    var ecommjsonData = JSON.parse(jsonData);
                    //console.log(ecommjsonData);
                    if (ecommjsonData.status == '1') {
                        if (frompage == 'contactinformation') {
                            localStorage.setItem("username", pnameset);
                            AppyTemplate.global.Name = localStorage.getItem("username");
                            $$(".profileContentBx").find("#userName").text(pnameset);
                            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.update_contact_information_mcom, data.appData.appName);

                        }
                        else if (frompage == 'shippinginformation') {
                            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.shipping_information_update_successfully_mcom, data.appData.appName);
                        }
                        else {
                            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.billing_information_updated_successfully_mcom, data.appData.appName);
                        }
                    }
                    else {
                        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_try_again_mcom, data.appData.appName);
                    }
                    Appyscript.hideIndicator();
                },
                error: function (error) {
                    Appyscript.hideIndicator();
                    //console.log("ecommMyAccount : Error " + error.code + " " + error.message);
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });
        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    }
}





/*
    use page ecommerce-category.html
    data page  ecommerce-Category
    this method show cat productliast and sub-catlist
*/

var hidencurrency;
var categorydata = {};
Appyscript.ecomCategory = function (a) {
    sortbyvalue = '';
    Appyscript.showIndicator();

    var pageNo = 1;
    app_id = localStorage.getItem("appid");
    var catID = $$(a).attr("data-id");
    var catName = $$(a).attr("data-name");
    var index = $$(a).attr("index");
    var postdata = '{"method":"listOfCategoryProduct","appId":"' + app_id + '","catId":"' + catID + '","page":"' + pageNo + '", "emailId":"' + useremailid + '"}';
    // console.log("listOfCategoryProduct postdata "+postdata);
    if (isOnline()) {
       $$.ajax({
                   url: baseURL,
                   data: Appyscript.validateJSONData(postdata),
                   type: 'post',
                   //321 headers: {'accessToken': deviceEncryptedToken},
                   async: true,
                   success: function(data) {
                   Appyscript.hideIndicator();
                   categorydata = JSON.parse(data);
                   console.log(categorydata);
                   data = JSON.parse(data);
                   data.categoryId = catID;
                   data.categoryName = catName;
                   data.categoryPage = pageNo;
                   data.index = index;
                   data.styleAndNavigation = pageData.styleAndNavigation;
                   subProductList = data;
                   var productPriceArr = data.productList;
                   for(var key in productPriceArr){
                       productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
                   }
                   resetStoreData(data.productList);

                   var totalproduct = 0;
                   if (data.productList) {
                       totalproduct = data.productList.length;
                   }
                   if (data.subCategories) {
                       totalproduct = totalproduct + data.subCategories.length;
                   }
                   data.totalproduct = totalproduct;
                   $$.get("pages/ecommerce-category.html", function (template) {
                       getCategoryTemplate = template;
                       var compiledTemplate = AppyTemplate.compile(template);
                       var html = compiledTemplate(data);
                       mainView.router.load({ content: html, animatePages: true });
                       updatecartCount();
                       Appyscript.hideIndicator();
                   })

               }

       })
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

/*
    use page ecommerce-category.html
    data page  ecommerce-Category
    this method show cat productliast and sub-catlist
*/
//
//Appyscript.onPageInit('ecommerce-Category', function (page) {
//    var sortinSelect = $$(mainView.activePage.container).find(".top_toolBar");
//    if (sortinSelect.length != 0 && sortbyvalue != "") {
//        sortinSelect.find("select").val(sortbyvalue);
//    }
//    var infiniteScroll = $$(mainView.activePage.container).find('.infinite-scroll');
//    if (infiniteScroll.find(".categories-list li.category").length < 10) {
//        if (infiniteScroll.find(".categories-list li.product").length < 10) {
//            infiniteScroll.removeClass("infinite-scroll");
//            infiniteScroll.find(".infinite-scroll-preloader").remove();
//            return false;
//        }
//    }
//
//    var dataID = infiniteScroll.attr("data-id");
//    var dataPage = parseInt(infiniteScroll.attr("data-page")) + 1;
//    var loading = true;
//    infiniteScroll.on('infinite', function () {
//        if (!loading) {
//            return false;
//        }
//        loading = false;
//        infiniteScroll.find(".infinite-scroll-preloader").show();
//        var postdata = '{"method":"listOfCategoryProduct","appId":"' + app_id + '","catId":"' + dataID + '","page":"' + dataPage + '", "emailId":"' + useremailid + '"}';
//        //console.log("listOfCategoryProduct postdata "+postdata);
//
//        if (isOnline()) {
//            $$.ajax({
//                        url: baseURL,
//                        data: postdata,
//                        type: 'post',
//                        async: true,
//                        //321 headers: {'accessToken': deviceEncryptedToken},
//                        success: function(data) {
//                        Appyscript.hideIndicator();
//                        data = JSON.parse(data);
//
//                            data.styleAndNavigation = pageData.styleAndNavigation;
//
//                             var productPriceArr = data.productList;
//                                                     for(var key in productPriceArr){
//                                                       productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
//                                                       }
//
//
//
//
//                            resetStoreData(productPriceArr);
//                            var compiledTemplate = AppyTemplate.compile(getCategoryTemplate);
//                            var html = compiledTemplate(data);
//                            var htmlData = document.createElement("html");
//                            htmlData.innerHTML = html;
//                            $$(htmlData).find(".categories-list li").appendTo($$(mainView.activePage.container).find(".categories-list"));
//                            dataPage++;
//                            if (data.subCategories.length < 10) {
//                                if (data.productList.length < 10) {
//                                    infiniteScroll.removeClass("infinite-scroll");
//                                    Appyscript.detachInfiniteScroll(infiniteScroll);
//                                    infiniteScroll.find(".infinite-scroll-preloader").remove();
//                                    loading = false;
//                                }
//                                else {
//                                    loading = true;
//                                }
//                            }
//                            else {
//                                loading = true;
//                            }
//                            $$(mainView.activePage.container).find(".categories-list li.product")
//                            .appendTo($$(mainView.activePage.container).find(".categories-list"))
//                            infiniteScroll.find(".infinite-scroll-preloader").hide();
//                        }
//            })
//        }
//        else {
//            Appyscript.hideIndicator();
//            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
//        }
//    })
//})
//
//




/*
    use ecommerce-subcate-list
    dat-page ecommerce-SubCategory
    for show subcat product list
*/
Appyscript.onPageInit('ecommerce-SubCategory', function (page) {

    var infiniteScroll = $$(mainView.activePage.container).find('.infinite-scroll');
    if (infiniteScroll.find(".productList li.product").length < 10) {
        infiniteScroll.removeClass("infinite-scroll");
        infiniteScroll.find(".infinite-scroll-preloader").remove();
        return false;
    }

    var dataID = infiniteScroll.attr("data-id");
    var dataPage = parseInt(infiniteScroll.attr("data-page")) + 1;
    var loading = true;
    infiniteScroll.on('infinite', function () {
        if (!loading) {
            return false;
        }
        loading = false;
        infiniteScroll.find(".infinite-scroll-preloader").show();
        var postdata = '{"method":"ecommSubCategoryProduct","appId":"' + app_id + '","parentId":"' + dataID + '","page":"' + dataPage + '","sortby":"' + sortbyvalue + '", "emailId":"' + useremailid + '"}';
        //console.log("ecommSubCategoryProduct site_url  "+site_url  +"  postdata  "+postdata);
        if (isOnline()) {
           $$.ajax({
                       url: baseURL,
                       data: postdata,
                       type: 'post',
                        //321 headers: {'accessToken': deviceEncryptedToken},
                       async: true,
                       success: function(data) {
                       Appyscript.hideIndicator();
                       data = JSON.parse(data);
                        subProductList = data;


                           var productPriceArr = data.productList;

                           if(productPriceArr.length>0){
                                             var newcurrencyFomatterSymbolProductList = productPriceArr[0].currency;
                                             AppyTemplate.global.curSymFor = currencyFomatterSymbol[newcurrencyFomatterSymbolProductList];
                                             localStorage.setItem("curSymForSym",AppyTemplate.global.curSymFor);
                                             AppyTemplate.global.curSymFor =  localStorage.getItem("curSymForSym");

                                               AppyTemplate.global.curSymCode = newcurrencyFomatterSymbolProductList;
                                               localStorage.setItem("curSymCode", newcurrencyFomatterSymbolProductList);
                                               AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");
                                           }

                    for(var key in productPriceArr){
                      productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
                      }



//                           subProductList.productList = subProductList.productList.concat(data.productPriceArr);
                           resetStoreData(data.productList);
                           var compiledTemplate = AppyTemplate.compile(getSubCategoryTemplate);
                           var html = compiledTemplate(data);
                           var htmlData = document.createElement("html");
                           htmlData.innerHTML = html;
                           $$(htmlData).find(".sortTag").remove();
                           $$(htmlData).find(".productList li").appendTo($$(mainView.activePage.container).find(".productList"));
                           dataPage++;
                           if (data.productList.length < 10) {
                               infiniteScroll.removeClass("infinite-scroll");
                               Appyscript.detachInfiniteScroll(infiniteScroll);
                               infiniteScroll.find(".infinite-scroll-preloader").remove();
                               loading = false;
                           }
                           else {
                               loading = true;
                           }
                           infiniteScroll.find(".infinite-scroll-preloader").hide();
                       }
           })
        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    })
})








/*
    this method is use for shorting product on behalf of price , rating.
    page ecommerce-subcate-list.html
*/
function ProductshrotingByPrice() {
    var strUser = $$("#searchpopup").val();
    if (strUser == 'sortby') {
        return;
    }
    if (sortbyvalue == strUser) {
        return;
    }
    setTimeout(function () {
        sortbyvalue = strUser;
        Appyscript.ecomSubcatProductList('sorting');


        /*    Appyscript.showIndicator();
            // console.log(ecomSubcatProductList.productList);
             var data=ecomSubcatProductList;
             if(strUser == 'popularity')
             {
                 data.productList.sort(sortPopularity('totalReview', strUser, parseInt));
             }
             else
             {
                 data.productList.sort(sort_by('price', strUser, parseInt));
             }

              $$.get("pages/ecommerce-subcate-list.html", function (template)
             {
                 var compiledTemplate = AppyTemplate.compile(template);
                 var html = compiledTemplate(data);
                 mainView.router.reloadContent(html)
                 Appyscript.hideIndicator();
                 $$("#searchpopup").val(strUser);
                 updatecartCount();
             });*/
    }, 1000);
}

/*
    this method is user for shoring product on behalf of high and low price
*/
function sort_by(field, reverse, primer) {
    var reverseBool = false;
    if (reverse == "true") {
        reverseBool = true;
    }
    var key = primer ?
    function (x) { return primer(x[field]) } :
    function (x) { return x[field] };
    reverseBool = !reverseBool ? 1 : -1;
    return function (a, b) {
        return a = key(a), b = key(b), reverseBool * ((a > b) - (b > a));

    }
}

/*
    this method is use for short product on behlf on rating point
*/
function sortPopularity(field, reverse, primer) {
    var reverseBool = true;

    var key = primer ?
    function (x) { return primer(x[field]) } :
    function (x) { return x[field] };
    reverseBool = !reverseBool ? 1 : -1;
    return function (a, b) {
        return a = key(a), b = key(b), reverseBool * ((a > b) - (b > a));

    }
}





/*
    this method is use for gat timestamp
*/
function getTimeZoneEcomm() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + "" + ("00" + (o % 60)).slice(-2);
}







/*
 this method is use to store all product of store / ecomm page
*/
function resetStoreData(productList) {
    if (productList) {
        if (productList.length != 0) {
            if (storeData.length == 0) {
                $$.each(productList, function (ind, val) {
                    storeData.push(val);
                })
            }
            else {
                $$.each(productList, function (index, value) {
                    storeData.unshift(value);
                })
                var productID = [];
                var storeDataClone = [];
                $$.each(storeData, function (index, value) {
                    if (index == 0) {
                        productID.push(value.productId);
                        storeDataClone.push(value);
                    }
                    else {
                        if (productID.indexOf(value.productId) == -1) {
                            productID.push(value.productId);
                            storeDataClone.push(value);
                        }
                    }
                })
                storeData = storeDataClone;
            }
        }
    }
}


/*
    this method use for get product details by passing catid and productid
*/
function getStoreData(catId, productId) {
    var data = {
        index: 0,
        list: []
    }
    var list = [];
    $$.each(storeData, function (index, value) {
        if (catId == "") {
            if (value.productId == productId) {
                var m = {};
                $$.each(value, function (key, val) {
                    m[key] = val;
                })
                data.list.push(m);
            }
        }
        else {
           if(value.catId == catId && value.productId == productId){
                data.list.push(value);
            }
        }
    })
    if (productId != null) {
        $$.each(data.list, function (index, value) {
            if (value.productId == productId) {
                data.index = index;
            }
        })
    }
    return data;
}


function getwishlisstatus(catidd, productid) {
    for (j = 0; j < storeData.length; j++) {
        if (storeData[j].productId == productid) {
            return storeData[j].wishlist;
        }
    }
}
function updatewishliststatus(addremove, productid) {
    for (j = 0; j < storeData.length; j++) {
        if (storeData[j].productId == productid) {
            if (addremove == 'add') {
                storeData[j].wishlist = 1;
            }
            else {
                storeData[j].wishlist = 0;
            }
        }
    }
}


/*
    this method use for check product exits in cart or not
*/
function checkCartProductExit(productId) {
    var itemIndex = -1;
    var chek = 0;
    $$.each(productList.list, function (index, value) {
        if (value.productId == productId && chek != '1') {
            itemIndex = index;
            chek = "1";
        }
    })

    return itemIndex;
}


















// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
    This method is created to show payment tab button according to server
    use page payment.html
*/
AppyTemplate.global.billingdata = '', AppyTemplate.global.grndtotal = '';
var checkBillingPlusCodeValid, checkShippingPlusCodeValid = false;
function ecommercePayment(aa) {

    ewalletModel.settouchidOrfaceidStatus(0);
    checkBillingPlusCodeValid=false;
    checkShippingPlusCodeValid=false;
    var billingShippingSame = true;
    var selectedShippingValue, selectedBillingValue;
    var addressBillingValidation, plusCodeBillingValidation, addressShippingValidation, plusCodeShippingValidation = false;
    if (billshipsame == '1') {
        billingShippingSame = false;
    }
    if (pageData.generalinformation.customer_address == "1" && pageData.generalinformation.plus_code_address == "1") {
        if (billingShippingSame) {
            selectedBillingValue = $$('input[name=billingEcommerceAddressCheck]:checked').val();
            if (selectedBillingValue == "address") {
                addressBillingValidation = true;
            } else {
                plusCodeBillingValidation = true;
            }
        } else {
            selectedBillingValue = $$('input[name=billingEcommerceAddressCheck]:checked').val();
            if (selectedBillingValue == "address") {
                addressBillingValidation = true;
            } else {
                plusCodeBillingValidation = true;
            }
            selectedShippingValue = $$('input[name=shippingEcommerceAddressCheck]:checked').val();
            if (selectedShippingValue == "address") {
                addressShippingValidation = true;
            } else {
                plusCodeShippingValidation = true;
            }
        }
    } else if (pageData.generalinformation.customer_address == "0" && pageData.generalinformation.plus_code_address == "1") {
        if (billingShippingSame) {
            plusCodeBillingValidation = true;
        } else {
            plusCodeBillingValidation = true;
            plusCodeShippingValidation = true;
        }

    } else if (pageData.generalinformation.customer_address == "1" && pageData.generalinformation.plus_code_address == "0") {
        if (billingShippingSame) {
            addressBillingValidation = true;
        } else {
            addressBillingValidation = true;
            addressShippingValidation = true;
        }
    }

    Appyscript.showIndicator();
    //ecomPaymentMethodLabel()

    var billing = '';
    var shipping = '';
    billing = Appyscript.formToJSON('#billing');
    var bname = billing.name;
    var bphone = billing.phone;
    var baddress = billing.address;
    var bcity = billing.city;
    var bstate = billing.state;
    var bzip = billing.zip;
    var bEmail = billing.email;
    var bcountry = billing.country;
    var bPlusCode = billing.pluscode;
    localStorage.setItem("billingMail", bEmail)
    AppyTemplate.global.billingdata = billing;
    AppyTemplate.global.grndtotal = productList;
    if (bname == null || bname == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_name_mcom, data.appData.appName);
        return;
    }
    else if (bEmail = null || bEmail.trim() == "" || !Appyscript.validateEmail(bEmail)) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_email_mcom, data.appData.appName);
        return;
    }
    else if (bphone == null || bphone == "" || bphone.length > 13 || bphone.length < 8) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_phone_mcom, data.appData.appName);
        return;
    }
    else if (bcity == null || bcity == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_city_mcom, data.appData.appName);
        return;
    }
    else if (addressBillingValidation) {
        if (baddress == null || baddress == "") {
            Appyscript.hideIndicator();
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_address_mcom, data.appData.appName);
            return;
        }

        else if (bstate == null || bstate == "") {
            Appyscript.hideIndicator();
            Appyscript.hideIndicator();
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_state_mcom, data.appData.appName);
            return;
        }
        else if (bzip == null || bzip == "") {
            Appyscript.hideIndicator();
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_zip_mcom, data.appData.appName);
            return;
        }
        else if (bcountry == "Select Country" || bcountry == "") {
            Appyscript.hideIndicator();
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_select_country_socialapp, data.appData.appName);
            return;
        }
    } else if (plusCodeBillingValidation) {
        if (bPlusCode == null || bPlusCode == "") {
            Appyscript.hideIndicator();
            Appyscript.alert(pageData.languageSetting.PLEASE_ENTER_PLUS_CODE, data.appData.appName);
            return;
        } else {
            checkPlusCodeValueValidation("bPlusCode", false)
            if (!checkBillingPlusCodeValid) {
                Appyscript.hideIndicator();
                Appyscript.alert(pageData.languageSetting.PLEASE_PLUS_CODE_VALID, data.appData.appName);
                return;
            }
        }
    }
    if (billshipsame == '1') {
            shipping = Appyscript.formToJSON('#shipping');
            var sname = shipping.name;
            var sphone = shipping.phone;
            var saddress = shipping.address;
            var scity = shipping.city;
            var sstate = shipping.state;
            var szip = shipping.zip;
            var scountry = shipping.country;
            var sPlusCode = shipping.pluscode;
            if (sname == null || sname == "") {
                Appyscript.hideIndicator();
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_name_mcom, data.appData.appName);
                return;
            }
            else if (sphone == null || sphone == "" || sphone.length > 13 || sphone.length < 8) {
                Appyscript.hideIndicator();
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_phone_mcom, data.appData.appName);
                return;
            }
            else if (scity == null || scity == "") {
                Appyscript.hideIndicator();
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_city_mcom, data.appData.appName);
                return;
            }
            if (addressShippingValidation) {
                if (saddress == null || saddress == "") {
                    Appyscript.hideIndicator();
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_address_mcom, data.appData.appName);
                    return;
                }

                else if (sstate == null || sstate == "") {
                    Appyscript.hideIndicator();
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_state_mcom, data.appData.appName);
                    return;
                }
                else if (szip == null || szip == "") {
                    Appyscript.hideIndicator();
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_zip_mcom, data.appData.appName);
                    return;
                }
                else if (scountry == "Select Country" || scountry == "") {

                    Appyscript.hideIndicator();
                    return;
                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.Please_select_country_socialapp, data.appData.appName);
                }
            } else if (plusCodeShippingValidation) {
                if (sPlusCode == null || sPlusCode == "") {
                    Appyscript.hideIndicator();
                    Appyscript.alert(pageData.languageSetting.PLEASE_ENTER_PLUS_CODE, appnameglobal_allpages);
                    return;
                } else {
                    checkPlusCodeValueValidation("sPlusCode", true);
                    if (!checkShippingPlusCodeValid) {
                        Appyscript.hideIndicator();
                        Appyscript.alert(pageData.languageSetting.PLEASE_PLUS_CODE_VALID, data.appData.appName);
                        return;
                    }
                }
            }

        }



    /*if (isOnline()) {
        Appyscript.showIndicator();
         var postdata;
                if(localStorage.getItem("userId") != "" && localStorage.getItem("userId") != undefined) {
                    postdata = '{"method":"ecomPaymentMethod","appId":"' + app_id + '","lang":"' + lang + '","userId":"'+localStorage.getItem("userid")+'"}';

                }else {
                    postdata = '{"method":"ecomPaymentMethod","appId":"' + app_id + '","lang":"' + lang + '"}';

                }

        console.log("ecomPaymentMethod:::: baseurl  " + baseurl + "   postdata  " + postdata);
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postdata),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    var data = JSON.parse(jsonData);
                    ewalletModel.setewalletAvailableStatus(((data.ewalletEnable == undefined || data.ewalletEnable == "undefined" ||data.ewalletEnable == "") ? false : data.ewalletEnable));

                    if ((typeof data.paymentDetails !== "undefined") && data.paymentDetails != null && data.paymentDetails.length > 0) {
                        var paymentsmethode = {};
                        paymentsmethode.list = [];


                        var tmp = JSON.parse(localStorage.getItem("productList"));
                                       paymentsmethode.grandTotal = parseFloat(tmp.grandtaotal).toFixed(2);
                                       paymentsmethode.ewalletbalance = "";


                        for (i = 0; i < data.paymentDetails.length; i++) {
                            var item = data.paymentDetails[i];
                            var label = typeof item.label !== "undefined" ? (item.label != null ? item.label : "") : "";
                            var key = typeof item.key !== "undefined" ? (item.key != null ? item.key : "") : "";
                            var phoneNo = "", merchantId = "", merchantKey = "", saltKey = "", clientId = "", secretKey = "", paypalId = "", phoneText = "";
                            var applicationProfileId="",merchantProfileId="",workflowId="",identityToken="", applicationLicenseID="";
                            var authorizeApiLoginID="", authorizenetClientId="", authorizenetTransactionKey ="", isTestAccount="";
                            var brainTreeMerchantId="", brainTreePrivateKey="", brainTreePublicId ="", brainTreePaymentMode="";
                            if (typeof item.credentials !== "undefined") {
                                var credentials = item.credentials;
                                phoneNo = typeof credentials.phoneNo !== "undefined" ? (credentials.phoneNo != null ? credentials.phoneNo : "") : "";
                                phoneText = typeof credentials.phoneText !== "undefined" ? (credentials.phoneText != null ? credentials.phoneText : "") : "";
                                merchantId = typeof credentials.merchantId !== "undefined" ? (credentials.merchantId != null ? credentials.merchantId : "") : "";
                                merchantKey = typeof credentials.merchantKey !== "undefined" ? (credentials.merchantKey != null ? credentials.merchantKey : "") : "";
                                secretKey = typeof credentials.secretKey !== "undefined" ? (credentials.secretKey != null ? credentials.secretKey : "") : "";
                                clientId = typeof credentials.clientId !== "undefined" ? (credentials.clientId != null ? credentials.clientId : "") : "";

                                applicationProfileId = typeof credentials.volecity_applicationprofileid!== "undefined"?(credentials.volecity_applicationprofileid!=null?credentials.volecity_applicationprofileid:""):"";
                                merchantProfileId = typeof credentials.volecity_merchantprofileid!== "undefined"?(credentials.volecity_merchantprofileid!=null?credentials.volecity_merchantprofileid:""):"";
                                workflowId = typeof credentials.volecity_workflowid!== "undefined"?(credentials.volecity_workflowid!=null?credentials.volecity_workflowid:""):"";
                                identityToken = typeof credentials.volecity_identitytoken!== "undefined"?(credentials.volecity_identitytoken!=null?credentials.volecity_identitytoken:""):"";
                                applicationLicenseID = typeof credentials.volecity_application_licence!== "undefined"?(credentials.volecity_application_licence!=null?credentials.volecity_application_licence:""):"";

                                authorizeApiLoginID = typeof credentials.authorizenet_apiLoginID!== "undefined"?(credentials.authorizenet_apiLoginID!=null?credentials.authorizenet_apiLoginID:""):"";
                                authorizenetClientId = typeof credentials.authorizenet_client_id!== "undefined"?(credentials.authorizenet_client_id!=null?credentials.authorizenet_client_id:""):"";
                                authorizenetTransactionKey = typeof credentials.authorizenet_transaction_key!== "undefined"?(credentials.authorizenet_transaction_key!=null?credentials.authorizenet_transaction_key:""):"";
                                isTestAccount = typeof credentials.authorizenet_payment_mode!== "undefined"?(credentials.authorizenet_payment_mode!=null?credentials.authorizenet_payment_mode:""):"";
//                                applicationLicenseID = 'CC667D44-341D-4E27-96DA-94634938CAD9';

                                brainTreeMerchantId = typeof credentials.braintree_marchantid!== "undefined"?(credentials.braintree_marchantid!=null?credentials.braintree_marchantid:""):"";
                                brainTreePrivateKey = typeof credentials.braintree_private_key!== "undefined"?(credentials.braintree_private_key!=null?credentials.braintree_private_key:""):"";
                                brainTreePublicId = typeof credentials.braintree_public_id!== "undefined"?(credentials.braintree_public_id!=null?credentials.braintree_public_id:""):"";
                                brainTreePaymentMode = typeof credentials.braintree_payment_mode!== "undefined"?(credentials.braintree_payment_mode!=null?credentials.braintree_payment_mode:""):"";


                                if (key == "payu_money") {
                                    saltKey = secretKey;
                                    secretKey = "";
                                }
                                paypalId = typeof credentials.paypalId !== "undefined" ? (credentials.paypalId != null ? credentials.paypalId : "") : "";
                            }

                            var tabActive = i == 0 ? " active" : "";

                            if (key == "cc")
                                paymentsmethode.list.push({
                                    "method": "card", "tabClassId": "card", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key, "clientId": clientId, "secretKey": secretKey, "page": "ecom"
                                });
                            else if (key == "payu_money")
                                paymentsmethode.list.push({
                                    "method": "payu", "tabClassId": "payu", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key, "merchantId": merchantId, "saltKey": saltKey, "page": "ecom"
                                });
                            else if (key == "paypal")
                                paymentsmethode.list.push({
                                    "method": "paypal", "tabClassId": "paypal", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key, "paypalId": paypalId, "page": "ecom"
                                });
                            else if (key == "payfast")
                                paymentsmethode.list.push({
                                    "method": "payfast", "tabClassId": "payfast", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key, "merchantId": merchantId, "merchantKey": merchantKey, "page": "ecom"
                                });

                            else if (key == "cc_phone")
                                paymentsmethode.list.push({
                                    "method": "obp", "tabClassId": "obp", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key, "phoneNo": phoneNo, "phoneText": phoneText, "page": "ecom"
                                });
                            else if (key == "stripe")
                                paymentsmethode.list.push({
                                    "method": "stripe", "tabClassId": "stripe", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key, "clientId": clientId, "secretKey": secretKey, "page": "ecom"
                                });
                            else if (key == "hubtel")
                                paymentsmethode.list.push({
                                    "method": "hubtel", "tabClassId": "hubtel", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key, "clientId": clientId, "secretKey": secretKey, "page": "ecom"
                                });
                            else if(key == "mercadopago")
                                {
                                                console.log("==== MERCADOPAGO =====")
                                                console.log(AppyTemplate.global.billingdata)
                                                // navigate from here to sdk
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
                                    "method": "cod", "tabClassId": "cod", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key, "page": "ecom"
                                });
                                else if (key == "volecity")
                                paymentsmethode.list.push({
                                    "method": "volecity", "tabClassId": "volecity", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key,"applicationProfileId":applicationProfileId, "workflowId":workflowId, "merchantProfileId":merchantProfileId, "identityToken":identityToken, "applicationLicenseID": applicationLicenseID,  "page": "ecom"
                                });
                                else if (key == "authorizenet")
                                paymentsmethode.list.push({
                                    "method": "authorizenet", "tabClassId": "authorizenet", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key,"authorizenet_apiLoginID":authorizeApiLoginID, "authorizenet_transaction_key":authorizenetTransactionKey,  "authorizenet_payment_mode":isTestAccount, "authorizenet_client_id":authorizenetClientId, "page": "ecom"});
                                else if (key == "braintree")
                                paymentsmethode.list.push({
                                    "method": "braintree", "tabClassId": "braintree", "tabActive": tabActive, "label": label,
                                    "paymentMethodKey": key,"brainTreeMerchantId":brainTreeMerchantId, "brainTreePrivateKey":brainTreePrivateKey, "brainTreePublicId":brainTreePublicId, "brainTreePaymentMode":brainTreePaymentMode,"page": "ecom"
                                });
                                else if(key == "ewallet") {

                                 if(item.balanceAmount != undefined) {
                                     ewalletModel.setbalanceAmount(parseFloat((item.balanceAmount == ""?"0":item.balanceAmount)).toFixed(2))
                                     ewalletModel.setcurrencySymbolName(item.currency)
                                     ewalletModel.setcurrencySymbol(Appyscript.getcurrencySymbol(item.currency))

                                     paymentsmethode.list.push({
                                         "method": "ewallet",
                                         "tabClassId": "ewallet",
                                         "tabActive": tabActive,
                                         "label": label,
                                         "paymentMethodKey": key,
                                         "page": "ecom",
                                         "balanceAmount":item.balanceAmount

                                     });
                                 }
                                 if(item.authUsingPassword != undefined && item.authUsingPassword != null && (parseInt(item.authUsingPassword) == 1 || item.authUsingPassword == true )) {
                                     ewalletModel.settouchidOrfaceidStatus(true);
                                 }else {
                                     ewalletModel.settouchidOrfaceidStatus(false);
                                 }
                             }
                                      if (key == "cc" || key == "stripe") {
                                                            cardDetailsForecom()
                                                        }
                        }
                        if(ewalletModel.getewalletAvailableStatus()){
                                            paymentsmethode.ewalletbalance = ewalletModel.getbalanceAmount();

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
                        innerlanguagedata.payment_method = pageData.languageSetting.payment_method_mcom;
                        paymentsmethode.innerlanguagedata = innerlanguagedata;
                        AppyTemplate.global.cardLast4food = "";
                        if (parseFloat(productList.grandtaotal) == '0' || parseFloat(productList.grandtaotal) == '0.00') {

                            ecommPaymentRegistrationInfo("zero");
                        }

                        else {
                            setTimeout(function () {
                                $$.get("pages/payment.html", function (template) {
                                    var compiledTemplate = AppyTemplate.compile(template);
                                      if(paymentsmethode.list && paymentsmethode.list.length>0){
                                         for (var key in paymentsmethode.list) {
                                           if(paymentsmethode.list[key].method == 'volecity' && paymentsmethode.list[key].applicationLicenseID!=undefined){
                                           Appyscript.callAzureApi(paymentsmethode.list.length, paymentsmethode.list[key].method, paymentsmethode.list[key].applicationLicenseID);
                                           }
                                           }
                                        }
                                    var html = compiledTemplate(paymentsmethode);
                                    mainView.router.load({ content: html, animatePages: true });
                                });
                            }, 4000);

                        }
                    }
                }
                else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }

            }, error: function (error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }


    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }*/
     ecommPaymentRegistrationInfo2("payment");
}






/*
    This method is used to check validationn of credit card as well as create json of credit card details
*/

var objcard ={};

function sdkResponseHandler(status, response) {
    console.log("sdkResponseHandler called");
    if (status != 200 && status != 201) {
     Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_verify_data_entered,data.appData.appName);
//     alert("verify filled data");

        Appyscript.hideIndicator();
//        return;
    }
    else
    {
        console.log("response of sdkResponseHandler==="+response.id);
if(response.id != undefined && response.id != "")
{
  objcard.cardToken = response.id;
        if(paymentwithmercado_andewallet) {
                        ewallet_mercadoCardPayment()

                    }else {
                       mercadoCardPayment(objcard.cardToken)

                    }
        /*objcard.cardToken = "";*/
         return;
}

         //setTimeout(function(){mercadoCardPayment(billingData,shippingData,paymentTypeObject,productList,userId)},5000);
        return;
    }
};

function setPaymentMethodInfo(status, response) {
     console.log("setPaymentMethodInfo called");
    if (status == 200) {
        // do somethings ex: show logo of the payment method
        console.log("response of setPaymentMethodInfo==="+response[0].id);
        objcard.payMethodID =response[0].id;

        return;

    }
};


function creditCardDetailOfUser(creditCardType) {
    var creditCardJSON;
    if (creditCardType == "stripe") {
        creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripe');
    }
    else if(creditCardType == "payMercado")
         {
             //payMercado
             creditCardJSON = Appyscript.formToJSON('#payMercado');
             Mercadopago.clearSession();
             Mercadopago.setPublishableKey($('#payMercado').parent().attr("data-merchantId"));
//             Mercadopago.setPublishableKey("TEST-c9c75c94-396d-43dc-acb4-5db74f567e5c");
             console.log("====Mercado identification type====");
//             console.log(Mercadopago.getIdentificationTypes(identificationHandler));
             var ccNumber = creditCardJSON.cardNumber.replace(/[ .-]/g, '').slice(0, 6);
             Mercadopago.getPaymentMethod({
                                          "bin": ccNumber
                                          }, setPaymentMethodInfo);
//              Mercadopago.clearSession();
              Mercadopago.createToken($('#payMercado'), sdkResponseHandler);
//
//              setTimeout(function(){ return; },1000);


             return "";

    }
    else if(creditCardType == "authorizenet"){
    creditCardJSON = Appyscript.formToJSON('#authorizeCardDetails');
    }
    else if(creditCardType == "braintree"){
    creditCardJSON = Appyscript.formToJSON('#brainTreeCardDetails');
    }
    else {
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
    }
    else if (isNaN(cnumber) || cnumber.length < 15) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_card_number, appnameglobal_allpages);
        return null;
    }
    else if (expairyMonth == null || expairyMonth == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_expiry_month, appnameglobal_allpages);
        return null;
    }
    else if (isNaN(expairyMonth) || expairyMonth.length < 2) {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_expiry_month, appnameglobal_allpages);
        return null;
    }
    else if (expairyYear == null || expairyYear == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_expiry_year, appnameglobal_allpages);
        return null;
    }
    else if (isNaN(expairyYear) || expairyYear.length < 4) {
        if(creditCardType !== "authorizenet" && creditCardType !== "braintree"){
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_expiry_year, appnameglobal_allpages);
        return null;
        }
    }
    else if (!isNaN(cHolder) || cHolder == null || cHolder == '') {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_card_holdername, appnameglobal_allpages);
        return null;
    }
    else if (cvvCode == null || cvvCode == "") {
        Appyscript.hideIndicator();
        Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_cvv_code, appnameglobal_allpages);
        return null;
    }
    else if (isNaN(cvvCode) || cvvCode.length < 3) {
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
}







/*
 This method is used to register user who is purchansing product. User may be guest user
 */
/*function ecommPaymentRegistrationInfo(paymentTypeObject) {
    var paymentType;
    var creditCardDetail = null;
    var a = $$(paymentTypeObject).parent();
    var paymentMethodKey = a.attr("data-key");
    if (paymentMethodKey == "stripe") {
        var savecardcheck;
        if (document.getElementById('savecardcheck')) {
            savecardcheck = document.getElementById('savecardcheck').checked
        }

        if (savecardcheck) {
            creditCardDetail = "stripe";
            ecommPaymentRegistrationInfo2(paymentTypeObject)
        }
        else {
            creditCardDetail = creditCardDetailOfUser("stripe");
            if (creditCardDetail == null)
                return;


            var issavecardcheck;
            if (document.getElementById('issavecardcheck')) {
                issavecardcheck = document.getElementById('issavecardcheck').checked
            }
            if (AppyTemplate.global.cardLast4ecom == "undefined" || AppyTemplate.global.cardLast4ecom == undefined) {
                ecommPaymentRegistrationInfo2(paymentTypeObject)
            }
            else {

                if (!issavecardcheck && AppyTemplate.global.cardLast4ecom) {
                    Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.existing_card_automatically_deleted, appnameglobal_allpages, "No", "Yes", cancelvalue, goToPayment);

                    function goToPayment() {
                        ecommPaymentRegistrationInfo2(paymentTypeObject)

                    }
                    function cancelvalue() {

                        return;
                    }

                }
                else if (issavecardcheck && AppyTemplate.global.cardLast4ecom) {
                    Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.existing_card_automatically_deleted_on_save, appnameglobal_allpages, data.languageSetting.No, data.languageSetting.Yes, cancelvalue, goToPaymentmethod);

                    function goToPaymentmethod() {
                        ecommPaymentRegistrationInfo2(paymentTypeObject)

                    }
                    function cancelvalue() {

                        return;
                    }
                }
                else {
                    ecommPaymentRegistrationInfo2(paymentTypeObject)
                }
            }
        }
        paymentType = "stripe";
    }
    else {

        ecommPaymentRegistrationInfo2(paymentTypeObject)
    }
}*/
var dateDelivery = new Date();
var dateTime = new Date().toLocaleTimeString();
datePickup = formatDate_ecomm(dateDelivery) + " " + dateTime;
function ecommPaymentRegistrationInfo2(paymentTypeObject) {
    if (AppyTemplate.global.loginCheck) {
        AppyTemplate.global.loginCheck = true;
        useremailid = localStorage.getItem("email");
        username = localStorage.getItem("username");
        userphone = localStorage.getItem("phone");
    }
    else {
        AppyTemplate.global.loginCheck = false;
        useremailid = "";
        username = "";
        userphone = "";
        localStorage.setItem("email", "");
        localStorage.setItem("username", "");
        localStorage.setItem("phone", "");
    }
    Appyscript.showIndicator();
    var billing = Appyscript.formToJSON('#billing');
    var shipping = Appyscript.formToJSON('#shipping');
    var instructions = Appyscript.formToJSON('#instructions');
    var billPlusCode = '';
    var billName = billing.name;
    var billLine1 = billing.address;
    var billCity = billing.city;
    var billState = billing.state;
    var billCoutry = billing.country;
    var billPostalCode = billing.zip;
    var billPhone = billing.phone;
    var billEmail = billing.email;
    if (billing.pluscode && billing.pluscode != 'undefined') {
        billPlusCode = billing.pluscode;
    }
    var billCountryId = $$("#bCountry option").eq($$("#bCountry")[0].selectedIndex).attr("id");

    var shipName = '';
    var shipAdd = '';
    var shipCity = '';
    var shipState = '';
    var shipCoutry = '';
    var shipZip = '';
    var shipPhone = '';
    var shipCountryId = '';
    var shipPlusCode = '';
    if (billshipsame == '1') {
        shipName = shipping.name;
        shipAdd = shipping.address;
        shipCity = shipping.city;
        shipState = shipping.state;
        shipCoutry = shipping.country;
        shipZip = shipping.zip;
        shipPhone = shipping.phone;
        if (shipping.pluscode && shipping.pluscode != 'undefined') {
            shipPlusCode = shipping.pluscode;
        }

        shipCountryId = $$("#sCountry option").eq($$("#sCountry")[0].selectedIndex).attr("id");
    }
    else {
        shipName = billName;
        shipAdd = billLine1;
        shipCity = billCity;
        shipState = billState;
        shipCoutry = billCoutry;
        shipZip = billPostalCode;
        shipPhone = billPhone;
        shipCountryId = billCountryId;
        shipPlusCode = billPlusCode;
    }

    var paymentType;
    var creditCardDetail = null;
    if (localStorage.getItem("username") == null || localStorage.getItem("username") == "")
        localStorage.setItem("username", billName);
    if (localStorage.getItem("email") == null || localStorage.getItem("email") == "")
        localStorage.setItem("email", billEmail);
    if (localStorage.getItem("phone") == null || localStorage.getItem("phone") == "")
        localStorage.setItem("phone", billPhone);

    var totalAmount = parseFloat(productList.grandtaotal);
    totalAmount = totalAmount.toFixed(2);
    var currency = productList.currency;
    var discountAmount = parseFloat(productList.discountPrice != null ? productList.discountPrice : 0.00).toFixed(2);
    var coupandiscount = parseFloat(productList.coupandiscount != null ? productList.coupandiscount : 0.0).toFixed(2);
    //var totalAmount1=parseFloat(totalAmount)+parseFloat(discountAmount)+parseFloat(coupandiscount);
    var shippingData = '{"name":"' + shipName + '","address":"' + shipAdd + '","city":"' + shipCity + '","state":"' + shipState +
   '","country":"' + shipCoutry + '","localCountry":"' + shipCoutry + '","zip":"' + shipZip + '","phone":"' + shipPhone +
   '","pluscode":"' + shipPlusCode +
   '","billShip":"Shipping","shipping":"0.00","tax":"'+productList.taxPrice+'","totalAmount":"' + totalAmount + '","currency":"' + currency +
   '","shipping":"0.00","coupon":"0.00","discount":"' + discountAmount + '"}';
    if (localStorage.getItem("billingMail") != null || localStorage.getItem("billingMail") != "") {
        billEmail = localStorage.getItem("billingMail");
    }
    var billingData = '{"name":"' + billName +
    '","email":"' + billEmail +
    '","address":"' + billLine1 +
    '","line1":"' + billLine1 +
    '","city":"' + billCity +
    '","state":"' + billState +
    '","countryCode":"' + billCountryId +
    '","country":"' + billCoutry +
    '","postalCode":"' + billPostalCode +
    '","phone":"' + billPhone +
    '","pluscode":"' + billPlusCode +
    '"}';

    if (isOnline()) {
        var postData = '{"method":"ecommPaymentRegistrationInfo","appId":"' + app_id + '","paymentDetail":"online","billingData":' + billingData + ',"shippingData":' + shippingData + ',"transType":"authorize"}'

        console.log("ecommPaymentRegistrationInfo  postData " + postData);
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                useremailid = billEmail;
                AppyTemplate.global.loginCheck = true;
                if (textStatus == 200) {
                    Appyscript.showIndicator();
                    var data = JSON.parse(jsonData);
                    var status = typeof data.status !== "undefined" ? data.status : 0;
                    var userId = typeof data.userId !== "undefined" ? data.userId : "";
                    var txnId = typeof data.msg !== "undefined" ? data.msg : "";
                    var sessionToken = typeof data.sessionToken !== "undefined" ? data.sessionToken : "";
                     billingDataGlobal = billingData;
                     shippingDataGlobal = shippingData;
                     statusGlobal = status;
                     sessionTokenGlobal = sessionToken;
                     CommonPaymentgatwayFunction("",pageId,productList,pageIdentifie);
                    /*if (JSON.parse(localStorage.getItem("customimages"))) {
                        fileuploadwithcheckout(status, userId, billingData, shippingData, paymentTypeObject, productList, creditCardDetail, txnId, "", sessionToken);
                    } else {
                        processwith_ewalletAvailability(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,"", sessionToken);
                    }*/
                }
                else {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            }, error: function (error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}


var orderId = '';
/*
    This method is used to create json of product
 */
function createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, paymentMethodKey, paymentId, customer_id) {
    //var totalAmount = parseFloat(productList.maxGrandTotalStoreAmount);
    Appyscript.showIndicator();
    var totalAmount = parseFloat(productList.grandtaotal);
    productList.maxGrandTotalStore =  currencyFomatter(parseFloat(productList.subtaotal));
    totalAmount = totalAmount.toFixed(2);
    var deliveryAmount = parseFloat(productList.shippingPrice != null ? productList.shippingPrice : 0.0).toFixed(2);
    var discountAmount = parseFloat(productList.discountPrice != null ? productList.discountPrice : 0.0).toFixed(2);
    var taxAmount = parseFloat(productList.taxPrice != null ? productList.taxPrice : 0.0).toFixed(2);
    var currency = productList.currency;
    var coupandiscountType = productList.coupandiscountType;
    var coupandiscount = parseFloat(productList.coupandiscount != null ? productList.coupandiscount : 0.0).toFixed(2);  //coupandiscount
    var subtotal = parseFloat(productList.subtaotal != null ? productList.subtaotal : 0.0).toFixed(2)
    var miscTax = productList.miscTaxDup;
    var productDetails = [];
    var deliveryDate=$$("#date_deliveryDate").val();
    var deliveryTimePicker=$$("#date_deliverytime").val();
    var finalDeliveryPickupTime=deliveryDate + " " + deliveryTimePicker;

    if(pageData.generalinformation.allow_user_select_delivery_date=="0"){
        finalDeliveryPickupTime="";
    }
    else{
        //    if(deliveryDate=="" && deliveryTimePicker=="")
        //if(timeFlag == '0')
        if(document.getElementById('show_date_time').checked == false){
            finalDeliveryPickupTime="";
        }
    }
    var productDataFromList = productList.list
    if (productDataFromList.length > 0) {
        for (var i = 0; i < productDataFromList.length; i++) {
            var custom_option = ""
            var productData = productDataFromList[i];
            if (typeof productData.customoptionsdata !== "undefined") {
                custom_option = productData.customoptionsdata[0];
            }

            productDetails.push({
                "productId": productData.productId, "name": productData.productName, "price": productData.price,
                "qty": productData.orderQuantity, "description": productData.description, "currency": productData.currency, "custom_option": productData.customoptionsString
            });
        }
        //console.log("custom_option  productList:"+JSON.stringify(productDetails));
    }

    var newdate = new Date().getTime();

    var discountInfo = '{"discount":"' + discountAmount + '","delivery":"' + deliveryAmount + '","tax":"' +
    taxAmount + '","total":"' + totalAmount + '","coupon":"' + coupandiscount + '","tip":"0"}';

    var orderdate = Math.round(+new Date() / 1000);
    var timezon = getTimeZoneEcomm();
    var localtimezone = "GMT" + timezon;
    var paymentMethodLabel;

    payment = '{"paymentId":"","paymentMethod":"","paymentStatus":"processing", "orderDate":"' + orderdate + '","gmtTime":"' + localtimezone + '","paymentMethodLabel":"","deliveryPickupTime":"' + finalDeliveryPickupTime + '"}';

    var id = localStorage.getItem("userId");
    var name = localStorage.getItem("username");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");

    var userData = '{"id":"' + id + '","name":"' + name + '","email":"' + email + '","phone":"' + phone + '"}';

    var instJson = Appyscript.formToJSON('#instructions');
    var instructionsText = instJson.instructionsText;
    instructionsText = instructionsText != null ? instructionsText : "";
    var payTypeObj = $$(paymentTypeObject).parent();
    var sellerPhoneNo = payTypeObj.attr("data-phoneNo");
    if (orderIdForGloble != null && orderIdForGloble != "") {
        orderId = orderIdForGloble;
    }
    var postData = '{"method":"ecommOrder","appId":"' + app_id + '","lang":"' + data.appData.lang + '","appName":"' + data.appData.appName +
    '","appAdminName":"' + data.appData.ownerName + '","userData":' + userData + ',"orderId":"' + orderId +
    '","discount":' + discountInfo + ',"productDetails":' + JSON.stringify(productDetails) + ',"payment":' + payment +
    ',"currency":"' + currency + '","billingData":' + billingData + ',"shippingData":' + shippingData +
    ',"pickupComment":"' + instructionsText.replace(/\r/g, "").replace(/\n/g, "") + '","miscTax":' + JSON.stringify(miscTax) + '}';
    console.log(postData);
    return postData;

}









/*
    This method is used to hit ecommOrder service to send product details on server in case phone
 */

/*function submitOrderByPhone(billingData, shippingData, paymentTypeObject, productList) {
    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "ccPhone", "");
    //console.log("postData stripe::  baseurl  "+baseurl  +"   postData   "+postData);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    var jsonObj = JSON.parse(jsonData);
                    var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                    if (success.toLowerCase() == "success") {
                        var payTypeObj = $$(paymentTypeObject).parent();
                        var sellerPhoneNo = payTypeObj.attr("data-phoneNo");
                        if (!isNaN(sellerPhoneNo)) {
                            // Appyscript.call(sellerPhoneNo);
                            PhoneCall(sellerPhoneNo)

                            var parsePostData = JSON.parse(postData);
                            localStorage.setItem("productList", "");
                            localStorage.setItem("customimages", "");
                            customsendsoimages = '';
                            productList = { "list": [] };
                            setTimeout(function () {
                                $$.get("pages/ecommerce-thanks.html", function (template) {
                                    orderIdForGloble = '';
                                    orderId = '';
                                    var compiledTemplate = AppyTemplate.compile(template);
                                    var html = compiledTemplate(parsePostData.orderId);
                                    mainView.router.load({ content: html, animatePages: true });
                                });
                            }, 1000);
                        }
                        else if (success.toLowerCase() == "failure") {
                            $$.get("pages/error.html", function (template) {
                                orderIdForGloble = '';
                                orderId = '';
                                var compiledTemplate = AppyTemplate.compile(template);
                                var html = compiledTemplate(parsePostData.orderId);
                                mainView.router.load({ content: html, animatePages: true });
                            });
                        }
                        else {
                            Appyscript.alert("Oops," + sellerPhoneNo + " is not valid phone number.");
                        }
                    }
                    else {
                        orderIdForGloble = '';
                        orderId = '';
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    }
                }
                else {
                    orderIdForGloble='';
                    orderId='';
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
                Appyscript.hideIndicator();
            },
            error: function (error) {

                orderIdForGloble='';
                orderId='';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}







/*
    This method is used to hit ecommOrder service to send product details on server in case COD
 */
/*function submitOrderByCOD(billingData, shippingData, paymentTypeObject, productList) {
    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "cod", "");
    //console.log(postData);
    if (isOnline()) {
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    localStorage.setItem("productList", "");
                    localStorage.setItem("customimages", "");
                    customsendsoimages = '';
                    productList = { "list": [] };
                    $$.get("pages/ecommerce-thanks.html", function (template) {
                        orderIdForGloble = '';
                        orderId = '';
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate("");
                        mainView.router.load({ content: html, animatePages: true });
                    });
                }
                else {
                    orderIdForGloble = '';
                    orderId = '';
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
                Appyscript.hideIndicator();
            },
            error: function (error) {
                orderIdForGloble = '';
                orderId = '';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}*/





/*
    This method is used to hit ecommOrder service to send product details on server in case PayU

function submitOrderByPayU(billingData, shippingData, paymentTypeObject, productList) {
    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "payu_money", "");
    //console.log("postData stripe::  baseurl  "+baseurl  +"   postData   "+postData);

    if (isOnline()) {
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    var jsonObj = JSON.parse(jsonData);
                    var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                    if (success.toLowerCase() == "success") {
                        var billData = JSON.parse(billingData);
                        var payTypeObj = $$(paymentTypeObject).parent();
                        var merchantId = payTypeObj.attr("data-merchantId");
                        var saltKey = payTypeObj.attr("data-saltKey");
                        var postDataJson = JSON.parse(postData);

                        openPayuViewNative(postDataJson.shippingData.totalAmount, postDataJson.orderId, app_id, billData.name, "lastName", billData.email, billData.phone, merchantId, saltKey, site_url, "ecom", false)
                        //Appyscript.openPayuView(postDataJsondiscounttotal, postDataJsonorderId,app_id, billDataname, lastName ,billDataemail,billDataphone,merchantId,saltKey,site_url,pagetype);
                    }
                    else {
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                }
                else {
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    Appyscript.hideIndicator();

                }
                Appyscript.hideIndicator();
            },
            error: function (error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }

        });

    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}






/*
     This method is used to hit ecommOrder service to send product details on server in case Paypal

function submitOrderByPaypal(billingData, shippingData, paymentTypeObject, productList) {
    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "paypal_express", "");
    // console.log("postData stripe::  baseurl  "+baseurl  +"   postData   "+postData);
    if (isOnline()) {
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    var jsonObj = JSON.parse(jsonData);
                    var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                    if (success.toLowerCase() == "success") {
                        var payTypeObj = $$(paymentTypeObject).parent();
                        var merchantId = payTypeObj.attr("data-merchantId");
                        var paypalId = payTypeObj.attr("data-paypalId");
                        var postDataJson = JSON.parse(postData);
                        var totalProductDetail = '{"orderId":"' + postDataJson.orderId + '","currency":"' + postDataJson.currency + '","totalAmount":"' + postDataJson.discount.total +
                        '","paypalId":"' + paypalId + '","merchantId":"' + merchantId + '","userId":"' + localStorage.getItem("userId") + '"}';


                        openPaypalViewForPayment(billingData, totalProductDetail, false);


                    }
                    else if (success.toLowerCase() == "failure") {

                        orderIdForGloble='';
                         orderId='';
                        $$.get("pages/error.html", function (template) {
                            var compiledTemplate = AppyTemplate.compile(template);
                            var html = compiledTemplate("");
                            mainView.router.load({ content: html, animatePages: true });
                        });
                    }
                    else {
                        orderIdForGloble='';
                        orderId='';
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                }
                else {
                    orderIdForGloble='';
                    orderId='';
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }
            },
            error: function (error) {
                orderIdForGloble='';
                orderId='';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}*/

//var timeFlag = '0';

function ecommProfileCheckbox(a)
{
    if($$(a).find("span").is(".icon-ok-4"))
    {
//        document.getElementById('show_date_time').checked = false;
        $$(".dateTimePicker").hide();
        $$(a).find("span").removeClass("icon-ok-4").parent().find("input")[0].checked = false;

    }
    else
    {
//        document.getElementById('show_date_time').checked = true;
        $$(".dateTimePicker").show();
        $$(a).find("span").addClass("icon-ok-4").parent().find("input")[0].checked = true;

    }
 }
/*
    This method is used to open paypal webview to pay amount of product

function openPaypalViewForPayment(billingDataPar, payPalDataPar,ewalletAvailable) {
    var billingData = JSON.parse(billingDataPar);
    var payPalData = JSON.parse(payPalDataPar);
    orderIdForGloble = payPalData.orderId;

    var htmlForm= Appyscript.getPayPalHtml("", payPalData.paypalId, payPalData.totalAmount, payPalData.currency, payPalData.orderId,site_url+"/paypalmobile/success",site_url+"/paypalmobile/notify/orderId/"+payPalData.orderId+"/appId/"+app_id+"/lang/"+data.appData.lang);
    Appyscript.hideIndicator();
    openPaypalNative(htmlForm, "ecommerce", pageData.pageTitle, ((ewalletAvailable == true) ? payPalData.orderId : undefined))
    //Appyscript.openPaypal(htmlForm,pagetype,pageData.pageTitle);
}

/*
    This method is used to open PayFast webview to pay amount of product

function openPayFastViewForPayment(billingDataPar, payfastDataPar,ewalletAvailable) {
    var billingData = JSON.parse(billingDataPar);

    //radical comented
    //var payFastData = JSON.parse(payfastDataPar);
    //console.log("payFFFFFFFFFaaaaaastttt  " + JSON.stringify(payFastData));
    //radical added

//    var paydata=JSON.stringify(payfastDataPar);
//        var a=JSON.parse(paydata);
//        var payFastData = JSON.parse(a);

    var htmlForm= Appyscript.getPayFastHtml("", payfastDataPar.merchantId, payfastDataPar.merchantKey, payfastDataPar.totalAmount, payfastDataPar.currency, payfastDataPar.orderId,site_url+"/paypalmobile/payfast-success", site_url+"/paypalmobile/payfast-cancel",site_url+"/paypalmobile/payfast-notify/appId/"+app_id+"/orderId/"+payfastDataPar.orderId+"/lang/"+data.appData.lang, payfastDataPar.userName, payfastDataPar.userEmail, payfastDataPar.productDetailName, payfastDataPar.productDetailDescrip);

//        var htmlForm= Appyscript.getPayFastHtml("", payFastData.merchantId,payFastData.merchantKey, payFastData.totalAmount, payFastData.currency, payFastData.orderId,site_url+"/paypalmobile/payfast-success",site_url+"/paypalmobile/payfast-cancel",site_url+"/paypalmobile/payfast-notify/appId/"+app_id+"/orderId/"+payFastData.orderId+"/lang/"+data.appData.lang,payFastData.userName,payFastData.userEmail,payFastData.productDetailName,payFastData.productDetailDescrip);

        Appyscript.hideIndicator();
        openPayFastNative(htmlForm,"ecommerce",pageData.pageTitle,((ewalletAvailable == true) ? payFastData.orderId : undefined))
    //Appyscript.openPaypal(htmlForm,pagetype,pageData.pageTitle);
}






/*
    This method is used to hit ecommOrder service to send product details on server in case cc

function submitOrderByCC(billingData, shippingData, paymentTypeObject, productList, creditCardDetail, transactionId) {
    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "cc", transactionId);
    //console.log("postData stripe::  baseurl  "+baseurl  +"   postData   "+postData);

    if (isOnline()) {
        Appyscript.showIndicator();

        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    var jsonObj = JSON.parse(jsonData);
                    var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";

                    if (success.toLowerCase() == "success" && transactionId != "") {
                        localStorage.setItem("productList", "");
                        localStorage.setItem("customimages", "");
                        customsendsoimages = '';
                        productList = { "list": [] };
                        $$.get("pages/ecommerce-thanks.html", function (template) {
                            orderIdForGloble = '';
                            orderId = '';
                            var compiledTemplate = AppyTemplate.compile(template);
                            var html = compiledTemplate("");
                            mainView.router.load({ content: html, animatePages: true });
                        });
                    }
                    else if (success.toLowerCase() == "failure" || transactionId == "") {
                        $$.get("pages/error.html", function (template) {
                            orderIdForGloble = '';
                            orderId = '';
                            var compiledTemplate = AppyTemplate.compile(template);
                            var html = compiledTemplate("");
                            mainView.router.load({ content: html, animatePages: true });
                        });
                    }
                    else {
                        orderIdForGloble = '';
                        orderId = '';
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                }
                else {
                    orderIdForGloble = '';
                    orderId = '';
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }
                Appyscript.hideIndicator();
            },
            error: function (error) {
                orderIdForGloble = '';
                orderId = '';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}
//var billData_val,shipData_val,paymentTypeObject_val,productList_val,userId_val;
function mercadoDetail(billingData,shippingData,paymentTypeObject,productList,userId)
{

/*billData_val = billingData;
shipData_val = shippingData;
paymentTypeObject_val = paymentTypeObject;
productList_val = productList;
userId_val = userId;*/

     /*userIdGlobale = userId;
     productListForGloble=productList;
     billingDataForGloble = billingData;
     shippingDataForGloble=shippingData;;
     paymentTypeObjectval=paymentTypeObject;
     creditCardDetail= creditCardDetailOfUser("payMercado");

}

function mercadoCardPayment(mercadotoken)
{


    //var postData=createJsonFormEcomOrder(billingDataForGloble,shipData_val,paymentTypeObject_val,productList_val,"mercadopago",userId_val);
    var postData=createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"mercadopago",userIdGlobale);
    console.log("postData stripe::  baseurl  "+baseurl  +"   postData   "+postData);
    if(isOnline())
    {
//        Appyscript.showIndicator();
        $$.ajax({
                url: baseurl,
                data:Appyscript.validateJSONData(postData),
                type: "post",
                async: true,
              //321  headers:{'accessToken': deviceEncryptedToken},
                success: function(jsonData, textStatus )
                {
                if(textStatus==200)
                {
                var jsonObj=JSON.parse(jsonData);
                var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                if(success.toLowerCase()=="success")
                {
                var payTypeObj= $$(paymentTypeObjectval).parent();
                var sellerPhoneNo=payTypeObj.attr("data-phoneNo");
                if(!isNaN(sellerPhoneNo))
               {
                //submitOrderByMercado(billData_val,shipData_val,paymentTypeObject_val,productList_val,userId_val,mercadotoken);
                submitOrderByMercado(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,userIdGlobale,mercadotoken);
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
//                Appyscript.hideIndicator();
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

function submitOrderByMercado(billingData,shippingData,paymentTypeObject,productList,userid,cardTokenMercado)
{
   // console.log("credit card detILS "+billingData);
     console.log("token = "+objcard.cardToken+" method = "+objcard.payMethodID);

     app_id=localStorage.getItem("appid");
   // var cardTokenMercado = objcard.cardToken
  var paymentIdMercado = objcard.payMethodID               //formAfterSdkCallBack.children[childrenTotal-2].value;

    var mercadoLocale = localStorage.getItem("curSymForSym");//curSymForSym

//JSON.parse(shippingData).totalAmount
  //  {"method":"cardCharge","accessToken":"","amount":"","token":"","description":"","installments":"","cardType":"","userEmail":"","appId":"","userId":"","productId":""} //$$(paymentTypeObject).parent().attr("data-secretKey")
    var amount = JSON.parse(shippingData).totalAmount;
    var secretToken = $$(paymentTypeObject).parent().attr("data-secretKey");
    var userEmail = JSON.parse(billingData).email;
    var proId = productList.list[0].productId;
    var proDescription = productList.list[0].description;
    if(proDescription == ""){
        proDescription = "Some description";
    }
    var postdata = '{"accessToken":"'+$$(paymentTypeObject).parent().attr("data-secretKey")+'","amount":"'+amount+'","token":"'+ cardTokenMercado+'","description":"'+proDescription+'","installments":"1","cardType":"'+paymentIdMercado+'","lang":"'+data.appData.lang+'","userEmail":"'+Appyscript.formToJSON('#payMercado').email+'","appId":"' + app_id + '","userId":"'+userid+'","productId": "' + proId + '","currencyCode":"'+productList.currency+'","orderId":"'+orderId+'"}';

    console.log("post data on appy server for payment "+postdata);
/*changed for testing
   // var baseurl = "https://snappy.appypie.com/paypalmobile/mercadopago-payment";
      var baseurl = site_url + "/paypalmobile/mercadopago-payment";
//    var baseurl = "https://angularml.pbodev.info/paypalmobile/mercadopago-payment";
    if(isOnline())
    {
//        Appyscript.showIndicator();

        $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postdata),
                type: "post",
                async: true,
              //321  headers:{'accessToken': deviceEncryptedToken},
                success: function(jsonData, textStatus )
                {
//                Appyscript.hideIndicator();
                console.log("posted successfully"+jsonData);
                if(JSON.parse(jsonData).status == "failure")
                {
                Appyscript.alert(JSON.parse(jsonData).msg);
                Appyscript.hideIndicator();
                return false;
                }

                if(JSON.parse(jsonData).status == "success")
                {

                $$.get("pages/ecommerce-thanks.html", function (template)
                       {
                       orderIdForGloble='';
                       orderId='';
                       productList = {"list":[]};
                       var compiledTemplate = AppyTemplate.compile(template);
                       var html = compiledTemplate("");
                       mainView.router.load({content: html, animatePages: true});
                       });
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

Appyscript.hideIndicator();
}




/*
    This method is used to pay amount of product through stripe payment gateway

function creditCardPaymentThroughStripe(billingData, shippingData, paymentTypeObject, productList, creditCardDetailPar, total_amount) {

    Appyscript.showIndicator();

    var creditCardDetail = creditCardDetailPar;
    var totalAmount = parseFloat(total_amount); //parseFloat(productList.grandtaotal);
    totalAmount = totalAmount.toFixed(2);

    var currency = productList.currency;
    var payTypeObj = $$(paymentTypeObject).parent();
    var clientId = payTypeObj.attr("data-clientId");
    var secretKey = payTypeObj.attr("data-secretKey");

    billingDataForGloble = billingData;
    shippingDataForGloble = shippingData;
    productListForGloble = productList;
    creditCardDetailForGloble = creditCardDetailPar;
    orderIdForGloble=orderId;
    paymentTypeObjectForGloble = paymentTypeObject;

    var savecardcheck;

    if (document.getElementById('savecardcheck')) {
        savecardcheck = document.getElementById('savecardcheck').checked
    }
    var creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripeCvv');
    var cvv_code = creditCardJSON.cvvCode;


    if (savecardcheck && cvv_code != null) {

        if (cvv_code == null || cvv_code == "") {
            Appyscript.hideIndicator();
            Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_cvv_code, appnameglobal_allpages);
            return
        }
        else {


            PaymentWithSaveCard(totalAmount, orderId, clientId, secretKey, currency, cvv_code);
        }
    }
    else {

          // productListForGloble=JSON.parse(localStorage.getItem("foodpaydata"));
           if(_checkStripeEcomCall)
                      {
                     submitOrderByStripe('','');
                     _checkStripeEcomCall=false
                     }
        creditCardDetail = JSON.parse(creditCardDetailPar);
        CreditCardPaymentNative(creditCardDetail.number, creditCardDetail.expireMonth,
                                                                      creditCardDetail.expireYear, creditCardDetail.cvv2, creditCardDetail.firstName + " " + creditCardDetail.lastName,
                                                                      totalAmount, orderId, clientId, secretKey, currency, localStorage.getItem("userId"), "ecom", customeridGlobal);
    }
    //Appyscript.goForCreditCardPayment(creditCardDetailnumber,creditCardDetailexpireMonth,creditCardDetailexpireYear,creditCardDetailcvv2,creditCardDetailfirstNamelastName,totalAmount,orderId,clientId,secretKey,currency ,userId,pagetype);

}*/












/*
  save Guest user details
*/
function guestUserSignUpInBgEcom(evt) {
    Appyscript.hideIndicator();
    var jsonData = JSON.parse(evt.currentTarget.response);

    if (jsonData['status'] == "failure") {
        Appyscript.confirmation('This email id already used as a guest user, please use another email or login with existing', 'Alert!', 'Login', 'Cancel', function () {
            Appyscript.loginPage('true');
        }, function () { })
    }
    else {
        localStorage.setItem("userid", jsonData['userId']);
        localStorage.setItem("emailid", jsonData['email']);
        localStorage.setItem("name", jsonData['name']);
        localStorage.setItem("verifycode", jsonData['verifyCode']);
        localStorage.setItem("password", jsonData['password']);
    }
}










/*
 this method is calling from thanx page
 hear we celear all data  from cart product
*/
function ClearHistryHomePage() {
    $$('#pagesCSS').attr('href', 'css/' + "ecommerce" + '.css');
    Appyscript.showIndicator();
    localStorage.setItem("productList", "");
    productList = { "list": [] };
    setTimeout(function () {
        storeback(function () { reloadhomepage(); });
    }, 3000);


}


/*
    use to resload home page data.
*/
function reloadhomepage() {
    var url = webserviceUrl + 'Page.php';
    var postData = '{"method":"getPages","appId":"' + app_id + '","pageIdentifire":"' + pageIdentifie + '","emailId":"' + useremailid + '"}'
    if (isOnline()) {
        Appyscript.showIndicator();
    console.log("fffffgghgh");
        $$.ajax({
            url: url,
            data: postData,
            type: "post",
         //   //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                Appyscript.hideIndicator();
                //storeData = [];
                ecomData = [];
                ecomSubcatProductList = JSON.parse(jsonData);
                console.log(ecomSubcatProductList.categoryList[0].productList);
		 var productListPriceArr = ecomSubcatProductList.categoryList[0].productList;
                     for(var key in productListPriceArr){
                        productListPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productListPriceArr[key].price));
                     }
                if (ecomSubcatProductList.categoryList[0].productList) {

                    resetStoreData(ecomSubcatProductList.categoryList[0].productList);
                }
                if (ecomSubcatProductList.categoryList) {

                    ecomData.push(ecomSubcatProductList.categoryList[0]);
                }

                $$.get("pages/ecommerce.html", function (template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate(ecomSubcatProductList);
                    mainView.router.reloadContent(html);
                    updatecartCount();
                    Appyscript.hideIndicator();
                });
            }, error: function (error) {
                Appyscript.hideIndicator();
                updatecartCount();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}






/*
    this method is use manage back page after click on continue shoping from thanx page
    this methode remore all back page from stack and direct move to home page.
*/
function storeback(callback) {
    //alert("storeback");
    var backlength;
    if (pageIdentifie.indexOf("folder") != -1) {
        backlength = mainView.history.length - 4;
    }
    else {
        backlength = mainView.history.length - 3;
    }

    if (mainView.history.length > 2) {
        if (data.appData.layout == 'bottom') {
            for (var i = 0; i < backlength + 3; i++) {
                mainView.router.back({ ignoreCache: true, animatePages: false });
            }
        }
        else {
            for (var i = 0; i < backlength; i++) {
                mainView.router.back({ ignoreCache: true, animatePages: false });
            }
        }
    }
    if (callback) { callback(); }
}




function storeShareProduct(a) {
    var index = productSwiper.activeIndex;
  //  productdetails=productList.list[index];
    var name = productdetails.productName;
    var price = productdetails.currency + " " + productdetails.price;
    var imageArray = productdetails.productImages;
    var description = productdetails.description.replace(/<br\s*\/?>/gi,'');


       var html = description;
          var div = document.createElement("div");
          div.innerHTML = html;
          var description=div.innerText;



    if (productdetails.offered) {
        var pricediscounted = productdetails.currency + " " + parseFloat(productdetails.price - productdetails.price * productdetails.offeredDiscount / 100).toFixed(2);
    }
    console.log(pricediscounted);

    var len = imageArray.length;
    var imageUrl = "";
    for (var i = 0; i < len; i++) {
        if (imageArray[i].mainImage == 1) {
            imageUrl = imageArray[i].productImage;
            break;
        }
    }
    if (productdetails.offered) {
        Appyscript.shareText("Product Name: " + name + "\nProduct Price: " + price + "\nAfter discount price: " + pricediscounted + "\nImage URL: " + imageUrl + "\nDescription: " + description);
    } else {
        Appyscript.shareText("Product Name: " + name + "\nProduct Price: " + price + "\nImage URL: " + imageUrl + "\nDescription: " + description);
    }
}




















/*
    Native Method ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/



/*
  this method use for show multipe image  image in native page.
*/
function storeopenGallary(ind) {
    var productImage = productimage.toString();
    if (Appyscript.device.android) {
        var imageOnOff = pageData.setting.imageOnOff;


        if (productImage) {

            if (imageOnOff == 0) {
                Appyscript.openGallary(productImage, ind, '', '', '', "", productName);
            }
            else {
                Appyscript.openGallary(productImage, ind, '', '', '', "on", productName);
            }

        }
        else {
            return;
        }
    }
    else {
        Appyscript.openGallary(productImage, ind, '', '', '', "", productName);
    }

}





/*
    for play custome video details , order details , cart-product-details page
*/
function openVideoStream(videourl) {
    if (Appyscript.device.android) {
        Appyscript.openVideoStream(videourl, '', '0', productName, '', '', '', '');
    }
    else {
        var jsonString = '{"catName": "  ", "catIcon": "", "catIconType": "","identifire": "","list":[{"name":"","value":"' + videourl + '","description":"","uploadedOn":"","iconName":"","iconType":""}],"pageTitle":"' + productName + '"}';
        window.location = "openvideoplayer:" + jsonString + "$,$" + "" + "$,$" + "";
    }
}





/*
    for play custome video details , order details , cart-product-details page
*/
function openYouTubeVedio(videourl) {
    if (Appyscript.device.android) {
        Appyscript.openYouTubeVedio(videourl, productName);
    }
    else {
        Appyscript.openYouTubeVedio(videourl, productName);
    }

}








/*
    use page ecommerce-edit-profile.html
    this method use for update profile detail
*/
Appyscript.StoreEditProfile = function () {
    if (localStorage.getItem("email") == null) {
        Appyscript.loginPage('true');
        callbackLogin = Appyscript.serviceEditProfile;
        return;
    }

    callbackLogin = null;

    var jsondata = {};
    jsondata.name = localStorage.getItem("username");
    jsondata.location = localStorage.getItem("CurrentCity");
    jsondata.image = localStorage.getItem("profileImage");
    jsondata.saveBtnTxt = "Save";
    $$.get("popups/ecommerce-edit-profile.html", function (template) {
        var compiledTemplate = AppyTemplate.compile(template);
        var html = compiledTemplate(jsondata);
        Appyscript.popup(html);
    });
}

var profilePic = false;
var imgIndexSl = 0;
/* This function is used to select photo  gallery */
function selectPhotoDirStore(index, isFrom) {

    profilePic = false;
    if (isFrom == "profile") {
        profilePic = true;

    }

    var imgid = "imageSL" + index;
    imgIndexSl = index;
    sessionStorage.setItem("imgId", imgid);




    Appyscript.modal({
        title: pageData.languageSetting.click_to_upload_image_dir,
        verticalButtons: true,
        buttons: [
                  {
                      text: 'Camera',
                      onClick: function () {
                          Appyscript.cameraPermission('Ecommerece_camera', 'Appyscript.permissionDenied')
                      }
                  },
                  {
                      text: 'Gallery',
                      onClick: function () {
                          Appyscript.storagePermission('Ecommerece_gallery', 'Appyscript.permissionDenied')
                      }
                  },
                  {
                      text: 'Cancel',
                      onClick: function () {
                      }
                  }
        ]
    })
}
function Ecommerece_camera() {
//    var options = {
//        quality: 50,
//        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//        destinationType: navigator.camera.DestinationType.FILE_URI,
//    }
//    navigator.device.capture.captureImage(captureSuccessFood, captureErrorDirectory, options);
//    Appyscript.hideIndicator();
    navigator.camera.getPicture(captureSuccessFood, captureErrorDirectory, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true
    });
     Appyscript.hideIndicator();
}

function Ecommerece_gallery() {
    var options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
    }
    navigator.camera.getPicture(librarySuccessFood, libraryErrorDir, options);
    Appyscript.hideIndicator();
}


/*
    calling from ecommerce-edit-profile.html page
    use for update profile image and name.
*/
Appyscript.storesaveProfilePic = function () {
    var name = $$("#profileName").val();
    if (name.trim() == "") {
        Appyscript.alert(usernameblanck, appnameglobal_allpages);
        $$("#profileName").focus();
        return;
    }
    Appyscript.showIndicator();
    var profilePicPath = $$("[id='profileImageDir']").attr("image");
    //console.log("profilePic=="+profilePicPath);
    if (Appyscript.device.android) {
        Appyscript.updateDirProfile(localStorage.getItem("appid"), name, localStorage.getItem("email"), profilePicPath, "store", "", "");
    }
    else {
        Appyscript.updateDirProfile(localStorage.getItem("appid"), name, localStorage.getItem("email"), profilePicPath, "", "", "");
    }
}
function profileUpdateCallBackForstore(isProfileUpdate, name, imgurl) {
    Appyscript.hideIndicator();
    if (isProfileUpdate == "success") {
        localStorage.setItem("username", name);
        localStorage.setItem("profileImage", imgurl);
        // AppyTemplate.global.email=name;
        AppyTemplate.global.profileImage = imgurl;
        AppyTemplate.global.Name = localStorage.getItem("username");
        $$(".profileContentBx").find("#userName").text(name);
        Appyscript.alert(profileupdatesuccess, appnameglobal_allpages);
    }
    else {
        errorPageWithTitleIconError("Profile", "appyicon-no-network", pageData.languageSetting.Network_connection_error_please_try_again_later);
    }
    Appyscript.hideIndicator();
}







/*
    this method is use for place pay amount view Paypal in native

function openPaypalNative(htmlForm, pagetype, pageDatapageTitle, order_id) {
    if (Appyscript.device.android) {
        Appyscript.openPaypal(htmlForm, pagetype, pageDatapageTitle,order_id);
    }
    else {
        Appyscript.openPaypal(htmlForm, pagetype, pageDatapageTitle,order_id);
    }

}

/*
    this method is use for place pay amount view Payafast in native

function openPayFastNative(htmlForm, pagetype, pageDatapageTitle,order_id) {
    if (Appyscript.device.android) {
        Appyscript.openPayFast(htmlForm, pagetype, pageDatapageTitle,order_id);
    }
    else {
        Appyscript.openPayFast(htmlForm, pagetype, pageDatapageTitle,order_id);
    }

}





/*
    this method is use for payace order via Payumony

function openPayuViewNative(postDataJsondiscounttotal, postDataJsonorderId, app_id, billDataname, lastName, billDataemail, billDataphone, merchantId, saltKey, site_url, pagetype, ewalletAvailability) {
    if (Appyscript.device.android) {
        Appyscript.openPayuView(postDataJsondiscounttotal, postDataJsonorderId, app_id, billDataname, lastName, billDataemail, billDataphone, merchantId, saltKey, site_url, pagetype, ewalletAvailability);
    }
    else {
        Appyscript.openPayuView(postDataJsondiscounttotal, postDataJsonorderId, app_id, billDataname, lastName, billDataemail, billDataphone, merchantId, saltKey, site_url, pagetype, ewalletAvailability);
    }
}




/*
    this method is use for place order via Credit card

function CreditCardPaymentNative(creditCardDetailnumber, Month, Year, cvv2, NamelastName, totalAmount, orderId, clientId, secretKey, currency, userId, pagetype, customeridGlobal) {
    if (Appyscript.device.android) {
        Appyscript.goForCreditCardPayment(creditCardDetailnumber, Month, Year, cvv2, NamelastName, totalAmount, orderId, clientId, secretKey, currency, userId, pagetype, customeridGlobal);
    }
    else {
        Appyscript.goForCreditCardPayment(creditCardDetailnumber, Month, Year, cvv2, NamelastName, totalAmount, orderId, clientId, secretKey, currency, userId, pagetype, customeridGlobal);
    }
}




/*
 for make call intent
*/
function PhoneCall(sellerPhoneNo) {
    if (Appyscript.device.android) {
        Appyscript.call(sellerPhoneNo);
    }
    else {
        Appyscript.call(sellerPhoneNo);
    }
}





/*
    This method is used to opne thank you page or error page in paypal and payu case
    Native callback for paypal method and payumony
 */
var errorBackButton = false;
function updateStatusFromNativeSide(status, orderIdPar) {

    if (orderIdPar == null || orderIdForGloble == "")
        orderIdPar = orderIdForGloble;
    if (status.toLowerCase() == "success") {
        localStorage.setItem("productList", "");
        localStorage.setItem("customimages", "");
        customsendsoimages = '';
        productList = { "list": [] };
        $$.get("pages/ecommerce-thanks.html", function (template) {
            orderIdForGloble = '';
            orderId = '';
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(orderIdPar);
            mainView.router.load({ content: html, animatePages: true });
            Appyscript.hideIndicator();
        });
    }
    else {
        $$.get("pages/ecommerce-error.html", function (template) {
            orderIdForGloble = '';
            orderId = '';
            errorBackButton = true;
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(orderIdPar);
            mainView.router.load({ content: html, animatePages: true });
            Appyscript.hideIndicator();
        });
    }
}


/*
  Stipe Native callback method
*/
function successViewEcom(paymentResult, paymentType) {
    if (paymentResult == 'invalidcard') {
        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
        Appyscript.hideIndicator();
    }
    else if (paymentResult == 'Success') {
        updateStatusFromNativeSide("", "");
        Appyscript.hideIndicator();
    }
    else if (paymentResult == 'failure') {
        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
        Appyscript.hideIndicator();
    }
}




/*
    This method is used to hit ecommOrder service to send product details on server in case stripe
    Stipe native callback methode

function submitOrderByStripe(paymentId, customer_id) {


    var billingData = billingDataForGloble;
    var shippingData = shippingDataForGloble;
    var paymentTypeObject = paymentTypeObject;
    var productList = productListForGloble;
    var orderId = orderIdForGloble;

    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "stripe", paymentId, customer_id);
    console.log("postData stripe::  baseurl  " + baseurl + "   postData   " + postData);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    var jsonObj = JSON.parse(jsonData);
                    var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";

                    if (success.toLowerCase() == "success" && paymentId != null) {



                    }

                    else {
                        orderIdForGloble = '';
                        orderId = '';
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();

                    }
                }
                else {
                    orderIdForGloble = '';
                    orderId = '';
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }
                Appyscript.hideIndicator();
            },
            error: function (error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}*/


function sortingEcomList(a, catId) {
    sortbyvalue = $$(a).val();
    var pageNo = '1';
    Appyscript.showIndicator();
    var postdata = '{"method":"ecommSubCategoryProduct","appId":"' + app_id + '","parentId":"' + catId + '","page":"' + pageNo + '","sortby":"' + sortbyvalue + '", "emailId":"' + useremailid + '"}';
   $$.ajax({
               url: baseURL,
               data: postdata,
               type: 'post',
               //321 headers: {'accessToken': deviceEncryptedToken},
               async: true,
                success: function(jsonData) {
               Appyscript.hideIndicator();

           ecomSubcatProductList = JSON.parse(jsonData);

           ecomSubcatProductList.categoryId = subProductList.categoryId;
           ecomSubcatProductList.categoryName = subProductList.categoryName;
           ecomSubcatProductList.categoryPage = pageNo;
           ecomSubcatProductList.index = subProductList.index;
           //ecomSubcatProductList.subCategories = subProductList.subCategories;

           subProductList = ecomSubcatProductList;
           var productPriceArr = ecomSubcatProductList.productList;


           if(productPriceArr.length>0){
                             var newcurrencyFomatterSymbolProductList = productPriceArr[0].currency;
                             AppyTemplate.global.curSymFor = currencyFomatterSymbol[newcurrencyFomatterSymbolProductList];
                             localStorage.setItem("curSymForSym",AppyTemplate.global.curSymFor);
                             AppyTemplate.global.curSymFor =  localStorage.getItem("curSymForSym");

                             AppyTemplate.global.curSymCode = newcurrencyFomatterSymbolProductList;
                            localStorage.setItem("curSymCode", newcurrencyFomatterSymbolProductList);
                            AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");
                           }

                for(var key in productPriceArr){
                 productPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productPriceArr[key].price));
                 }
            resetStoreData(ecomSubcatProductList.productList);
           Appyscript.hideIndicator();

           var compiledTemplate = AppyTemplate.compile(getCategoryTemplate);
           var html = compiledTemplate(subProductList);
           mainView.router.reloadContent(html);
       }
   })
}

function sortingEcomMainList(a) {
    sortbyvalue = $$(a).val();
    var parent = $$(a).parents(".swiper-slide");
    var dataId = parent.attr("data-id");
    var dataPage = parent.attr("data-page");
    var dataIndex = parent.attr("index");
    Appyscript.showIndicator();
    var postdata = '{"method":"ecommSubCategoryProduct","appId":"' + app_id + '","parentId":"' + dataId + '","page":"' + dataPage + '","sortby":"' + sortbyvalue + '", "emailId":"' + useremailid + '"}';
  $$.ajax({
              url: baseURL,
              data: postdata,
              type: 'post',
              //321 headers: {'accessToken': deviceEncryptedToken},
              async: true,
              success: function(jsonData) {
              Appyscript.hideIndicator();
              jsonData = JSON.parse(jsonData);
          subProductList = jsonData;

          var productListPriceArr = subProductList.productList;

          if(productListPriceArr.length>0){
                            var newcurrencyFomatterSymbolProductList = productListPriceArr[0].currency;
                            AppyTemplate.global.curSymFor = currencyFomatterSymbol[newcurrencyFomatterSymbolProductList];
                            localStorage.setItem("curSymForSym",AppyTemplate.global.curSymFor);
                            AppyTemplate.global.curSymFor =  localStorage.getItem("curSymForSym");

                             AppyTemplate.global.curSymCode = newcurrencyFomatterSymbolProductList;
                                                        localStorage.setItem("curSymCode", newcurrencyFomatterSymbolProductList);
                                                        AppyTemplate.global.curSymCode = localStorage.getItem("curSymCode");
                          }

          for(var key in productListPriceArr){
              productListPriceArr[key].maxPriceStore= currencyFomatter(parseFloat(productListPriceArr[key].price));
          }

          resetStoreData(jsonData.productList);
          Appyscript.hideIndicator();

          var compiledTemplate = AppyTemplate.compile(ecomsubcatproductTemplate);
          var html = compiledTemplate(subProductList);
          parent.find("ul").html(html);

          if (subProductList.productList.length < 10 && subProductList.subCategories.length < 10) {

          }
          else {
              parent.attr("data-load", "true").attr("data-page", "1");
              parent.attr("data-sort", "true");
              layoutScrolling(dataIndex);
          }
      }
  })


}


/////
var paymentMethodLabel;

/*function ecomPaymentMethodLabel() {
    var postdata = '{"method":"ecomPaymentMethod","appId":"' + app_id + '","lang":"' + lang + '"}';

    Appyscript.showIndicator();
    $$.ajax({
        url: baseurl,
        data: Appyscript.validateJSONData(postdata),
        type: "post",
        //321 headers: {'accessToken': deviceEncryptedToken},
        async: true,
        success: function (jsonData, textStatus) {
            //console.log("shhhhhh===="+postdata+"shhhhhh===="+baseurl);
            // console.log("shhhhhh===="+jsonData);


            var data = JSON.parse(jsonData);
            console.log("sddadadaasd   " + JSON.stringify(jsonData))

            if ((typeof data.paymentDetails !== "undefined") && data.paymentDetails != null && data.paymentDetails.length > 0) {
                var paymentsmethode = {};
                paymentsmethode.list = [];
                for (i = 0; i < data.paymentDetails.length; i++) {
                    var item = data.paymentDetails[i];
                    var label = typeof item.label !== "undefined" ? (item.label != null ? item.label : "") : "";
                    var key = typeof item.key !== "undefined" ? (item.key != null ? item.key : "") : "";

                    // console.log("key======="+key)
                    //  console.log("label======="+label)

                    if (key == "cc") {
                        localStorage.setItem("ecomMethodLabelcc", label)
                    }
                    else if (key == "payu_money") {
                        localStorage.setItem("ecomMethodLabelpayu_money", label)
                    }
                    else if (key == "paypal") {
                        localStorage.setItem("ecomMethodLabelpaypal", label)
                    }
                    else if (key == "cc_phone") {
                        localStorage.setItem("ecomMethodLabelcc_phone", label)
                    }
                    else if (key == "stripe") {
                        localStorage.setItem("ecomMethodLabelstripe", label)
                    }
                    else if (key == "cod") {
                        localStorage.setItem("ecomMethodLabelcod", label)
                    }
                    else if (key == "payfast") {
                        localStorage.setItem("ecomMethodLabelpayfast", label)
                    }
                    else if (key == "hubtel") {
                        localStorage.setItem("ecomMethodLabelhubtel", label)
                    }
                     else if (key == "volecity") {
                      localStorage.setItem("ecomMethodLabelVelocity", label)
                    }else if(key == "ewallet") {
                      localStorage.setItem("ecomMethodLabelEwallet",label)

                    }
                    else if(key == "authorizenet") {
                      localStorage.setItem("ecomMethodLabelAuthorize",label)
                    }
                    else if(key=="mercadopago"){
                     localStorage.setItem("ecomMethodLabelmercado",label)

                    }
                    else if(key=="braintree"){
                    localStorage.setItem("ecomMethodLabelBrainTree",label)
                    }

                }
            }

        }, error: function (error) {
            //console.log("Error: " + error.code + " " + error.message);
            Appyscript.hideIndicator();
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
        }
    });
}*/

function cardDetailsForecom() {
    var email = localStorage.getItem("email");
    if (email == null || email == "") {
        if (localStorage.getItem("billingMail") != null) {
            email = localStorage.getItem("billingMail");
        }
    }



    var api = site_url + '/notify/customerinfo/appId/' + app_id + '/email/' + localStorage.getItem("email") + '/type/ecom';

    $$.ajax({
        type: 'GET',
        url: api,
        dataType: 'json',
        success: function (data) {
            console.log("api==" + api);
            console.log(data);
            //{"customerId":"cus_AkdumJRvPtH5QY","cardLast4":"1111"}
            console.log("data====" + data);

            if (data.customerId != null && data.customerId != "") {
                customeridGlobal = data.customerId

                AppyTemplate.global.cardLast4ecom = data.cardLast4
            }

        },
        error: function (data) {
            Appyscript.hideIndicator();

        }
    });
}
var PaymentWithSaveCardcheck = false;
function PaymentWithSaveCard(totalAmount, orderId, clientId, secretKey, currency, cvv_code) {
    var totalAmount = (parseFloat(totalAmount) * 100);
    var email = localStorage.getItem("email");
    totalAmount = parseFloat(totalAmount).toFixed();

    var SavecardUrl = site_url + '/notify/paymentbystripe/appId/' + app_id + '/cvv/' + cvv_code + '/customerId/' + customeridGlobal + '/orderId/' + orderId + '/email/' + email + '/description/583380/currency/' + currency + '/amount/' + totalAmount + '';


    $$.ajax({
        type: 'GET',
        url: SavecardUrl,
        dataType: 'json',
        success: function (data) {
            console.log(SavecardUrl);
            console.log(data);

            //{transaction_id: "ch_1APQcoH0v6qh6ANIDj80OrWe", customer_id: "cus_AkdumJRvPtH5QY", status: "succeeded"}

            if (data.status == "succeeded") {
                PaymentWithSaveCardcheck = true;
                customeridGlobal = data.customer_id;
               // submitOrderByStripe(data.transaction_id, data.customer_id)
            }
            else if (data.status == "fail" && data.exception) {
                Appyscript.alert(data.exception, appnameglobal_allpages);

                Appyscript.hideIndicator();
            }
            else if (data.status == "fail" && data.Error == "cvv does not match") {
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.cvv_does_not_match, appnameglobal_allpages);

                Appyscript.hideIndicator();
            }

        },
        error: function (data) {


        }
    });

}


var openCvvcheck = false;
function openCvv(a) {

    var checked = $$(a).find("input")[0].checked;
    if (checked) {
        $(a).find("input")[0].checked = false;
        $$('#creditCardThroughStripeCvv').hide();
        $$('#creditCardThroughStripe').show();
    }
    else {
        $(a).find("input")[0].checked = true;
        $$('#creditCardThroughStripeCvv').show();
        $$('#creditCardThroughStripe').hide();
    }


}

function openCvvCheckBox(a) {

    openCvv($$(".cardStorage")[0])


}

//===

function ecompaymentByStripeinjs(token, totalAmount, cunrcy, orderId, discriptionn, pageType) {

    var totalAmount = (parseFloat(totalAmount) * 100);
    totalAmount = parseFloat(totalAmount).toFixed();
    var email = localStorage.getItem("email");

    if (customeridGlobal != null) {

        //var SavecardUrl = site_url + '/notify/paymentbystripe/appId/' + app_id + '/customerId/' + customeridGlobal + '/tokenId/' + token + '/orderId/' + orderId + '/email/' + email + '/description/583380/currency/' + cunrcy + '/amount/' + totalAmount + '';

        var SavecardUrl = site_url + '/notify/paymentbystripe/appId/' + app_id + '/customerId/' + customeridGlobal + '/tokenId/' + token + '/orderId/' + orderId + '/email/' + email + '/description/'+ discriptionn + '/currency/' + cunrcy + '/amount/' + totalAmount + '';

    }
    else {

        var SavecardUrl = site_url + '/notify/paymentbystripe/appId/' + app_id + '/tokenId/' + token + '/orderId/' + orderId + '/email/' + email + '/description/'+ discriptionn + '/currency/' + cunrcy + '/amount/' + totalAmount + '';

    }


    $$.ajax({
        type: 'GET',
        url: SavecardUrl,
        dataType: 'json',
        success: function (data) {
            console.log(SavecardUrl);
            console.log(data);

            //{transaction_id: "ch_1APQcoH0v6qh6ANIDj80OrWe", customer_id: "cus_AkdumJRvPtH5QY", status: "succeeded"}

            if (data.status == "succeeded") {
                customeridGlobal = data.customer_id;

                localStorage.setItem("productList", "");
                                    localStorage.setItem("customimages", "");
                                    customsendsoimages = '';
                                    localStorage.setItem("orderIdval",'')
                                    productList = { "list": [] };
                                    $$.get("pages/ecommerce-thanks.html", function (template) {
                                        orderIdForGloble = '';
                                        orderId = '';
                                        var compiledTemplate = AppyTemplate.compile(template);
                                        var html = compiledTemplate("");
                                        mainView.router.load({ content: html, animatePages: true });
                                    });

               // submitOrderByStripe(data.transaction_id, data.customer_id)
            }
            else if (data.status == "fail" && data.exception) {

                $$.get("pages/error.html", function (template) {
                                            orderIdForGloble = '';
                                            orderId = '';
                                            var compiledTemplate = AppyTemplate.compile(template);
                                            var html = compiledTemplate(orderId);
                                            mainView.router.load({ content: html, animatePages: true });
                                            Appyscript.hideIndicator();
                                        });

                Appyscript.hideIndicator();
            }

        },
        error: function (data) {


        }
    });




}



/* This Function is used for PayFast Payment integration  */
var productDetailName = [];
var productDetailDescrip = [];
function payFastPaymentGateway(billingData, shippingData, paymentTypeObject, productList) {

    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "payfast", "");
    console.log("postData payFast::  baseurl  " + baseurl + "   postData   " + postData);
    if (isOnline()) {
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    var jsonObj = JSON.parse(jsonData);
                    console.log("jsonObjjsonObjjsonObjjsonObj  " + JSON.stringify(jsonObj))
                    var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                    if (success.toLowerCase() == "success") {
                        var payTypeObj = $$(paymentTypeObject).parent();
                        console.log("ffffffffffffffffffffff          " + JSON.stringify(payTypeObj))
                        var merchantId = payTypeObj.attr("data-payfastmerId");
                        var merchantKey = $$(paymentTypeObject).parent().attr("data-merchantkey");
                        var postDataJson = JSON.parse(postData);
                        for (var i = 0; i < postDataJson.productDetails.length; i++) {
                            productDetailName = postDataJson.productDetails[i].name;
                            productDetailDescrip = postDataJson.productDetails[i].description;
                        }
                        console.log("fgbfngdfngfndgbndf  " + JSON.stringify(postDataJson))
                        //radical commented
//                        var totalProductDetail = '{"orderId":"' + postDataJson.orderId + '","currency":"' + postDataJson.currency + '","totalAmount":"' + postDataJson.discount.total +
//                        '","merchantId":"' + merchantId + '","merchantKey":"' + merchantKey + '","userId":"' + localStorage.getItem("userId") + '","userName":"' + postDataJson.userData.name + '","userEmail":"' + postDataJson.userData.email + '","productDetailName":"' + productDetailName + '","productDetailDescrip":"' + productDetailDescrip + '"}';
//
                        //radical added
                        var totalProductDetail = {"orderId":postDataJson.orderId,
                                                "currency":postDataJson.currency,
                                                "totalAmount":postDataJson.discount.total,
                                                "merchantId":merchantId,
                                                "merchantKey":merchantKey,
                                                "userId":localStorage.getItem("userId"),
                                                "userName":postDataJson.userData.name,
                                                "userEmail":postDataJson.userData.email,
                                                "productDetailName":productDetailName,
                                                "productDetailDescrip":productDetailDescrip
                                                };

                        // openPayFastPayment(billingData,totalProductDetail);
                        openPayFastViewForPayment(billingData, totalProductDetail,false);



                    }
                    else if (success.toLowerCase() == "failure") {
                        $$.get("pages/error.html", function (template) {
                            var compiledTemplate = AppyTemplate.compile(template);
                            var html = compiledTemplate("");
                            mainView.router.load({ content: html, animatePages: true });
                        });
                    }
                    else {
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                }
                else {
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }
            },
            error: function (error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

/*function openPayFastPayment(billingData, totalProductDetail) {
var postData = {
    "merchant_id":"10005532",
    "merchant_key":"5u1zaqheq0wzn",
    "return_url":"http://angularml.pbodev.info/paypalmobile/payfast-success",
    "cancel_url":"http://angularml.pbodev.info/paypalmobile/payfast-cancel",
    "notify_url":"http://angularml.pbodev.info/paypalmobile/payfast-notify",
    "name_first":"abc",
    "name_last":"xyz",
    "email_address":"abc@abc.com",
    "m_payment_id":"8542",
    "amount":"80",
    "item_name":"ggggg",
    "item_description":"gggggggggg",
    "custom_int1":"9586",
    "custom_str1":"custom string to be"
}
    $$.ajax({
        url: "https://sandbox.payfast.co.za/eng/process",
        data: postData,
        type: "post",
        async: true,
        success: function(jsonData, textStatus) {alert("sucssssssssssss")
            if (textStatus == 200) {
                //var data = JSON.parse(jsonData);
                console.log("ecommPaymentRegistrationInfotttt " + textStatus);

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
}*/

function deleteCardEcomm(a) {

    Appyscript.confirmation(AppyTemplate.global.pageLanguageSetting.are_you_sure_want_to_delete_the_card, appnameglobal_allpages, data.languageSetting.No, data.languageSetting.Yes, cancelCardEcomm, deletesaveCardEcomm);

    function cancelCardEcomm() {


    }
    function deletesaveCardEcomm() {
        Appyscript.showIndicator();
        var email = localStorage.getItem("email");
        if (email == null || email == "") {
            if (localStorage.getItem("billingMail") != null) {
                email = localStorage.getItem("billingMail");
            }
        }

        var api = site_url + '/notify/deletecard/appId/' + app_id + '/email/' + email + '/type/ecom'

        $$.ajax({
            type: 'GET',
            url: api,
            dataType: 'json',
            success: function (data) {
                console.log("apidatadelete==" + api);
                console.log(data);
                //{success: "Card deleted successfully"}
                console.log("datadelete====" + data);

                if (data.success == "Card deleted successfully") {

                    $$('.cardStorage').hide();
                    $$('#creditCardThroughStripeCvv').hide();
                    $$('#creditCardThroughStripe').show();

                    Appyscript.alert(AppyTemplate.global.pageLanguageSetting.card_deleted_successfully, appnameglobal_allpages);
                    customeridGlobal = '';
                    AppyTemplate.global.cardLast4ecom = "";
                    Appyscript.hideIndicator();
                }


            },
            error: function (data) {
                Appyscript.hideIndicator();

            }
        });
    }



}


function eccomGoToHomePage() {
    setTimeout(function () { ecomBack(); }, 100);
    storeback(function () { reloadhomepageecomm(); });
}
/*
    use to resload home page data.
*/
function reloadhomepageecomm() {
    if (localStorage.getItem("successPayment") == "true") {
        $$(".localHeaderIconRight .subValue").hide();
        localStorage.setItem("foodpaydata", "");
        localStorage.setItem("fooddata", "");
        localStorage.setItem("successPayment", "false");
    }
    updateCartIcon();
    var url = webserviceUrl + 'Page.php';
    var postData = '{"method":"getPages","appId":"' + app_id + '","pageIdentifire":"' + pageIdentifie + '","emailId":"' + useremailid + '"}'
    if (isOnline()) {
        Appyscript.showIndicator();
        console.log("ecommSubCategoryProduct :baseurl    " + url + "  postdata  " + postData);
        $$.ajax({
            url: url,
            data: postData,
            type: "post",
           // //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {

                var jsondata = JSON.parse(jsonData);
                if ($$(".categories").is(".theme-4")) {
                    foodTheme4 = true;
                    foodTheme4Index = 0;
                    foodTheme4Data = {};
                    foodTheme4Data.productList = [];

                    if (jsondata.categoryList) {
                        if (jsondata.categoryList.length > 0) {
                            foodTheme4Data.productList["0"] = jsondata.categoryList[0].productList;
                        }
                    }
                }

                /* $$.get("pages/foodordering.html", function (template)
                 {
                     var compiledTemplate = AppyTemplate.compile(template);
                     var html = compiledTemplate(jsondata);
                     mainView.router.reloadContent(html);
                     updateCartIcon();
                     Appyscript.hideIndicator();
                 });*/
            }, error: function (error) {
                Appyscript.hideIndicator();
                updateCartIcon();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

/*
    for handle back after successfully place oredr from food-oredr
*/
function ecomBack(callback) {
    var backlength;

    if (pageIdentifie.indexOf("folder") != -1) {
        backlength = mainView.history.length - 4;
    }
    else {
        if (singleFoodCategoryPage && data.appData.layout == 'slidemenu') {

            backlength = mainView.history.length - 2;

        }
        else {
            backlength = mainView.history.length - 3; // 3
        }

    }



    if (mainView.history.length > 2) {
        if (data.appData.layout == 'bottom') {
            for (var i = 0; i < backlength + 2; i++) {
                mainView.router.back({ ignoreCache: true, animatePages: false });
            }
        }
        else {
            setTimeout(function () {
                storeback(function () { reloadhomepage(); });
            }, 1000);
        }
    }
    if (callback) { callback(); }
}
function changetax() {
    //0 for billing address
    //1 for shipping address

    var flag = billshipsame;
    console.log(flag);

    var countryValue = "";
    var stateValue = "";
    if (flag == 0) {
        countryValue = $$("#bCountry")[0].selectedOptions[0].id;
        stateValue = $$("#bState").val().trim();
    } else if (flag == 1) {
        countryValue = $$("#sCountry")[0].selectedOptions[0].id;
        stateValue = $$("#sState").val().trim();
    }

    console.log(countryValue);
    console.log(stateValue);
    var subtaotal = parseFloat(productList.subtaotal);
    var shippingsubtaotal = parseFloat(productList.subtaotal);
    var grandtaotal = '0.00';
    grandtaotal = parseFloat(grandtaotal) + parseFloat(subtaotal);
    taxratee = '';
    taxPricetemp = '0.00';

    taxPricetemp = parseFloat(productList.MaxtaxPrice);;
    taxRatetemp = '';

    console.log("subtaotalfirst" + subtaotal);
    var discount = configurationfood.discount;

    //----------------------  discount.discountPrice ---------------------------------------------


    var discountPricetemp = '0.00';
    var discountRatetemp = '';
    var discountRateee = '';
    for (i = 0; i < discount.length; i++) {
        var discountPrice = discount[i].discountPrice;
        var discountRate = discount[i].discountType;
        discountRateee = discount[i].discountPrice;
        var discountRule = discount[i].discountRule;
        var totalAmount = discount[i].totalAmount;
        if (discountRule == '=') {
            if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                if (discountRate == 'Flat') {
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
                else {
                    discountPrice = ((parseFloat(subtaotal) * parseFloat(discountPrice)) / 100);
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
            }
        }
        else if (discountRule == '>=') {
            if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                if (discountRate == 'Flat') {
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
                else {
                    discountPrice = ((parseFloat(subtaotal) * parseFloat(discountPrice)) / 100);
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
            }
        }


    }


    subtaotal = grandtaotal;
    // productList.subtaotal=grandtaotal;
    if (productList.couponDiscountee == "") {
        subtaotal = parseFloat(subtaotal);
    } else {
        subtaotal = parseFloat(subtaotal) - parseFloat(productList.coupandiscount);
    }
    grandtaotal = parseFloat(productList.grandtaotal);
    grandtaotal = subtaotal;
    productList.grandtaotal=grandtaotal;
    var tax = configurationfood.tax;

    if (tax) {
        for (i = 0; i < tax.length; i++) {
            if (countryValue == tax[i].country_code) {
                var taxPrice = parseFloat(tax[i].taxPrice);
                taxratee = parseFloat(tax[i].taxPrice);
                var taxRate = tax[i].taxRate;
                var taxRule = tax[i].taxRule;
                var totalAmount = tax[i].totalAmount;
                if (countryValue == "US") {
                    if (stateValue.trim() == tax[i].state_code || stateValue.trim() == tax[i].state_name) {

                        if (taxRule == '=') {
                            if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                                if (taxPrice == 'Tax Free') {
                                    taxPricetemp = '0.00';
                                    $$('[id=taxecomecom]').hide();
                                    break;
                                }
                                else {
                                    if (taxRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice.toFixed(2);
                                        taxRatetemp = taxRate;

                                        break;
                                    }
                                    else {
                                        taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice.toFixed(2);
                                        taxRatetemp = taxRate;

                                        break;
                                    }
                                }
                            }
                        }
                        else if (taxRule == '>=') {
                            if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                                if (taxPrice == 'Tax Free') {
                                    taxPricetemp = '0.00';
                                    break;
                                }
                                else {
                                    if (taxRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice.toFixed(2);
                                        taxRatetemp = taxRate;

                                        break;
                                    }
                                    else {

                                        taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                        console.log("taxPrice" + taxPrice);
                                        console.log("taxPrice" + subtaotal);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        console.log(grandtaotal);
                                        taxPricetemp = taxPrice.toFixed(2);
                                        taxRatetemp = taxRate;

                                        break;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (taxRule == '=') {
                        if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                            if (taxPrice == 'Tax Free') {
                                taxPricetemp = '0.00';
                                $$('[id=taxecomecom]').hide();
                                break;
                            }
                            else {
                                if (taxRate == 'Flat') {
                                    grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                    taxPricetemp = taxPrice.toFixed(2);
                                    taxRatetemp = taxRate;

                                    break;
                                }
                                else {
                                    taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                    grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                    taxPricetemp = taxPrice.toFixed(2);
                                    taxRatetemp = taxRate;

                                    break;
                                }
                            }
                        } else {
                            productList.taxPrice = '0.00';
                            productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                            var maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
                            productList.maxGrandTotalStore =  currencyFomatter(parseFloat(productList.subtaotal));;
                            $$('[id=grndtotal]').text(maxGrandTotalStore);
                        }
                    }
                    else if (taxRule == '>=') {
                        if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                            if (taxPrice == 'Tax Free') {
                                taxPricetemp = '0.00';
                                //$$('[id=taxecomecom]').hide();
                                break;
                            }
                            else {
                                if (taxRate == 'Flat') {
                                    grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                    taxPricetemp = taxPrice.toFixed(2);
                                    taxRatetemp = taxRate;

                                    break;
                                }
                                else {
                                    taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                    grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                    taxPricetemp = taxPrice.toFixed(2);
                                    taxRatetemp = taxRate;

                                    break;
                                }
                            }
                        } else {
                            productList.taxPrice = '0.00';
                            productList.grandtaotal = parseFloat(grandtaotal.toFixed(2))

                        }
                    }
                }

            } else {

                productList.taxPrice = '0.00';
                productList.grandtaotal = parseFloat(grandtaotal.toFixed(2))


            }
        }
    }



    //////////////////////////////////////shipping charges/////////////////////////////////////////////////

    var shippingPricetemp = '0.00';
    var shippingRatetemp = '';
    var shippingratee = ''
    var ecomshiploop = true;
    var shipping = configurationfood.shipping;
    for (i = 0; i < shipping.length; i++) {
        if (ecomshiploop) {
            var shippingPrice = parseFloat(shipping[i].shippingPrice);
            var shippingRate = shipping[i].shippingRate;
            shippingratee = parseFloat(shipping[i].shippingPrice);
            var shippingRule = shipping[i].shippingRule;
            var totalAmount = shipping[i].totalAmount;
            //console.log(shipping[i].countryCollection);
            if (shipping[i].countryCollection != null) {
                for (sc = 0; sc < shipping[i].countryCollection.length; sc++) {
                    console.log(shipping[i].countryCollection[sc].longname);
                    if (countryValue == shipping[i].countryCollection[sc].shortname) {
                        if (shippingRule == '=') {
                            if (parseFloat(shippingsubtaotal) == parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    $$('[id=deliverychargeecom]').hide();
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;

                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtaotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;

                                        ecomshiploop = false;
                                        break;
                                    }
                                }


                            } else {
                                $$('[id=deliverychargeecom]').hide();
                            }
                        }
                        else if (shippingRule == '<=') {
                            if (parseFloat(shippingsubtaotal) <= parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;

                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {


                                        shippingPrice = ((parseFloat(shippingsubtaotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;
                                        var MaxshippingPrice = currencyFomatter(parseFloat(productList.shippingPrice));
                                        $$('[id=shippingecomtax]').text(MaxshippingPrice);

                                        ecomshiploop = false;
                                        break;
                                    }
                                }

                            } else {
                                $$('[id=deliverychargeecom]').hide();
                            }
                        }
                    }

                    else if (shipping[i].countryCollection[sc].shortname == "0" || shipping[i].countryCollection[sc].shortname == 0)
                     {
                        if (shippingRule == '=') {
                            if (parseFloat(shippingsubtaotal) == parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    $$('[id=deliverychargeecom]').hide();
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;

                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtaotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;

                                        ecomshiploop = false;
                                        break;
                                    }
                                }


                            } else {
                                $$('[id=deliverychargeecom]').hide();
                            }
                        }
                        else if (shippingRule == '<=') {
                            if (parseFloat(shippingsubtaotal) <= parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                            grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = parseFloat(shippingPrice).toFixed(2);
                                        shippingRatetemp = shippingRate;

                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtaotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        console.log(shippingPrice);
                                        shippingRatetemp = shippingRate;

                                        ecomshiploop = false;
                                        break;
                                    }
                                }

                            } else {
                                $$('[id=deliverychargeecom]').hide();
                            }
                        }
                    }
                    else{
                   grandtaotal = "";
                   productList.maxGrandTotalStore = "";
                   productList.maxGrandTotalStore=parseFloat(productList.maxGrandTotalStoreAmount);
                   grandtaotal = parseFloat(productList.grandtaotal);


                    }
                }
            }
        }

    }

    //-------------------------------------miscx tax----------------------------------------------------------------------

    var miscTaxData = { "list": [] };
    var miscTax = configurationfood.miscTax;
    var miscTaxDataDup = [];
    for (i = 0 ; i < miscTax.length; i++) {
        var taxRate = miscTax[i].taxRate;
        var taxAmount = miscTax[i].taxAmount;
        var taxrate = miscTax[i].taxAmount;
        var taxType = miscTax[i].taxType;
        var id = miscTax[i].id;
        if (taxRate == 'Flat') {
            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxAmount);
        }
        else {
            taxAmount = parseFloat(((parseFloat(subtaotal) * parseFloat(taxAmount)) / 100)).toFixed(2);
            //grandtaotal = parseFloat(grandtaotal) + parseFloat(taxAmount);
            grandtaotal = parseFloat(productList.grandtaotal);
        }
        var mistaxx = {
            "taxrate": taxrate,
            "id": id,
            "taxRate": taxRate,
            "taxAmount": taxAmount,
            "taxType": taxType,
            "currency": productList.currency,
            "tax": taxAmount
        }
        miscTaxData.list.push(mistaxx);
        miscTaxDataDup.push(mistaxx);
    }


    productList.taxPrice = parseFloat(taxPricetemp).toFixed(2);
    productList.taxRate = taxRatetemp;
    productList.taxratee = taxratee;
    productList.shippingPrice = parseFloat(shippingPricetemp).toFixed(2);
    productList.shippingRate = shippingRatetemp;
    productList.shippingratee = shippingratee;
    productList.discountPrice = parseFloat(discountPricetemp).toFixed(2);
    productList.discountRate = discountRatetemp;
    productList.discountRateee = discountRateee;
    productList.miscTax = miscTaxData;
       productList.miscTax = miscTaxData;
     var MaxshippingPrice = currencyFomatter(parseFloat(productList.shippingPrice));
    productList.MaxshippingPrice =  MaxshippingPrice;
    if (productList.miscTax != undefined) {
                var miscTaxArr = productList.miscTax.list;
                for (var key in miscTaxArr) {
                    miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                    productList.maxTaxAmount =  miscTaxArr[key].maxTaxAmount;
                }
            }
    if (parseFloat(grandtaotal) < 0.001) {
        grandtaotal = parseFloat('0.00') + parseFloat(shippingPricetemp);
    }

    productList.grandtaotal = parseFloat(grandtaotal).toFixed(2);
    localStorage.setItem("productList", JSON.stringify(productList));
    productList.maxGrandTotalStore =  currencyFomatter(parseFloat(productList.grandtaotal));

    Appyscript.showIndicator();
    $$.get("pages/ecommerce-form.html", function (template) {
        var compiledTemplate = AppyTemplate.compile(template);
        reloadDataCart = template;
        var html = compiledTemplate(productList);
        var btn = document.createElement("html");
        btn.innerHTML = html;
        $$(mainView.activePage.container).find("#ecomchergestotal").html($$(btn).find("#ecomchergestotal").html());
//        opencalenderecomm();
//        openTime();

        Appyscript.hideIndicator();
    });

}




function CHANGEtAXCOUPAN() {
    Appyscript.showIndicator();
    var subtaotal = parseFloat(productList.subtaotal);
    var shippingsubtaotal = parseFloat(productList.subtaotal);
    var grandtaotal = '0.00';
    grandtaotal = parseFloat(grandtaotal) + parseFloat(subtaotal);
    taxratee = '';
    taxPricetemp = '0.00';
    taxRatetemp = '';

    var tax = configurationfood.tax;

var currencySymbol = localStorage.getItem("currencySymbol");
        currencySymbol = $$("<div>" + currencySymbol + "</div>").html().trim();

    var discount = configurationfood.discount;

    //----------------------  discount.discountPrice ---------------------------------------------


    var discountPricetemp = '0.00';
    var discountRatetemp = '';
    var discountRateee = '';
    for (i = 0; i < discount.length; i++) {
        var discountPrice = discount[i].discountPrice;
        var discountRate = discount[i].discountType;
        discountRateee = discount[i].discountPrice;
        var discountRule = discount[i].discountRule;
        var totalAmount = discount[i].totalAmount;
        if (discountRule == '=') {
            if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                if (discountRate == 'Flat') {
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
                else {
                    discountPrice = ((parseFloat(subtaotal) * parseFloat(discountPrice)) / 100);
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
            }
        }
        else if (discountRule == '>=') {
            if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                if (discountRate == 'Flat') {
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
                else {
                    discountPrice = ((parseFloat(subtaotal) * parseFloat(discountPrice)) / 100);
                    grandtaotal = parseFloat(grandtaotal) - parseFloat(discountPrice);
                    discountPricetemp = discountPrice;
                    discountRatetemp = discountRate;
                    break;
                }
            }
        }
    }

    subtaotal = grandtaotal;
    if (coupancheck) {
        subtaotal = parseFloat(subtaotal) - parseFloat(productList.coupandiscount);
    }
    grandtaotal = subtaotal;

    if (tax) {
        for (i = 0; i < tax.length; i++) {
            if (AppyTemplate.global.currentcountrycode == tax[i].country_code ||  tax[i].country_code ==null) {
                var taxPrice = parseFloat(tax[i].taxPrice);
                taxratee = tax[i].taxPrice;
                var taxRate = tax[i].taxRate;
                var taxRule = tax[i].taxRule;
                var totalAmount = tax[i].totalAmount;
                if (AppyTemplate.global.currentcountrycode == "US") {
                    if (AppyTemplate.global.currentstateecom.trim() == tax[i].state_code || AppyTemplate.global.currentstateecom.trim() == tax[i].state_name) {

                        if (taxRule == '=') {
                            if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                                if (taxPrice == 'Tax Free') {
                                    taxPricetemp = '0.00';
                                    productList.taxPrice = '0.00';
                                    productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                    $$('[id=taxecomecom]').hide();
                                    break;
                                }
                                else {
                                    if (taxRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice.toFixed(2);
                                        taxRatetemp = taxRate;
                                        productList.taxPrice = taxPrice.toFixed(2);
                                        productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                        break;
                                    }
                                    else {
                                        taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice.toFixed(2);
                                        taxRatetemp = taxRate;
                                        productList.taxPrice = taxPrice.toFixed(2);
                                        productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                        break;
                                    }
                                }
                            } else {
                                productList.taxPrice = '0.00';
                                productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                var maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
                                productList.maxGrandTotalStore = maxGrandTotalStore;
                                $$("#gtotal").show().find("span").text(maxGrandTotalStore);
                            }
                        }
                        else if (taxRule == '>=') {
                            if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                                if (taxPrice == 'Tax Free') {
                                    taxPricetemp = '0.00';
                                    productList.taxPrice = '0.00';
                                    productList.grandtaotal = parseFloat(grandtaotal.toFixed(2))
                                    break;
                                }
                                else {
                                    if (taxRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        taxPricetemp = taxPrice.toFixed(2);
                                        taxRatetemp = taxRate;
                                        productList.taxPrice = taxPrice.toFixed(2);
                                        productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                        break;
                                    }
                                    else {

                                        taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                        console.log(grandtaotal);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                        console.log(grandtaotal);
                                        taxPricetemp = taxPrice.toFixed(2);
                                        taxRatetemp = taxRate;
                                        productList.taxPrice = taxPrice.toFixed(2);
                                        productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                        break;
                                    }
                                }
                            } else {
                                productList.taxPrice = '0.00';
                                productList.grandtaotal = parseFloat(grandtaotal.toFixed(2)) + parseFloat(productList.shippingPrice)
                                var maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
                                productList.maxGrandTotalStore = maxGrandTotalStore;
                                $$("#gtotal").show().find("span").text(maxGrandTotalStore);
                            }
                        }
                    }
                } else {
                    if (taxRule == '=') {
                        if (parseFloat(subtaotal) == parseFloat(totalAmount)) {
                            if (taxPrice == 'Tax Free') {
                                taxPricetemp = '0.00';
                                $$('[id=taxecomecom]').hide();
                                productList.taxPrice = '0.00';
                                productList.grandtaotal = parseFloat(grandtaotal.toFixed(2))
                                break;
                            }
                            else {
                                if (taxRate == 'Flat') {
                                    grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                    taxPricetemp = taxPrice.toFixed(2);
                                    taxRatetemp = taxRate;
                                    productList.taxPrice = taxPrice.toFixed(2);
                                    productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                    break;
                                }
                                else {
                                    console.log(subtaotal);
                                    taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                    grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                    taxPricetemp = taxPrice.toFixed(2);
                                    taxRatetemp = taxRate;
                                    productList.taxPrice = taxPrice.toFixed(2);
                                    productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                    break;
                                }
                            }
                        } else {
                            productList.taxPrice = '0.00';
                            productList.grandtaotal = parseFloat(grandtaotal.toFixed(2))
                            var maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
                            productList.maxGrandTotalStore = maxGrandTotalStore;
                            $$("#gtotal").show().find("span").text(maxGrandTotalStore);
                        }
                    }
                    else if (taxRule == '>=') {
                        if (parseFloat(subtaotal) >= parseFloat(totalAmount)) {
                            if (taxPrice == 'Tax Free') {
                                taxPricetemp = '0.00';
                                $$('[id=taxecomecom]').hide();
                                productList.taxPrice = '0.00';
                                productList.grandtaotal = parseFloat(grandtaotal.toFixed(2))
                                break;
                            }
                            else {
                                if (taxRate == 'Flat') {
                                    grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                    taxPricetemp = taxPrice.toFixed(2);
                                    taxRatetemp = taxRate;
                                    productList.taxPrice = taxPrice.toFixed(2);
                                    productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                    break;
                                }
                                else {
                                    taxPrice = ((parseFloat(subtaotal) * parseFloat(taxPrice)) / 100);
                                    grandtaotal = parseFloat(grandtaotal) + parseFloat(taxPrice);
                                    taxPricetemp = taxPrice.toFixed(2);
                                    taxRatetemp = taxRate;
                                    productList.taxPrice = taxPrice.toFixed(2);
                                    productList.grandtaotal = parseFloat(grandtaotal.toFixed(2));
                                    break;
                                }
                            }
                        }
                        else {
                            productList.taxPrice = '0.00';
                            productList.grandtaotal = parseFloat(grandtaotal.toFixed(2))
                            var maxGrandTotalStore = currencyFomatter(parseFloat(productList.grandtaotal));
                            productList.maxGrandTotalStore = maxGrandTotalStore;
                            $$("#gtotal").show().find("span").text(maxGrandTotalStore);
                        }
                    }
                }

            } else {
                productList.taxPrice = '0.00';
                productList.grandtaotal = parseFloat(grandtaotal.toFixed(2))

            }
        }

//    subtaotal = grandtaotal;
//     if (coupancheck == true) {
//            subtaotal = parseFloat(subtaotal) - parseFloat(productList.coupandiscount) + parseFloat(taxPrice);
//            grandtaotal = subtaotal;
//        }
//        else {
//        grandtaotal = parseFloat(grandtaotal);
//        /*grandtaotal = subtaotal;*/
//        }
//
}

    //////////////////////////////////////shipping charges/////////////////////////////////////////////////

    var shippingPricetemp = '0.00';
    var shippingRatetemp = '';
    var shippingratee = ''
    var ecomshiploop = true;
    var shipping = configurationfood.shipping;
    for (i = 0; i < shipping.length; i++) {
        if (ecomshiploop) {
            var shippingPrice = parseFloat(shipping[i].shippingPrice);
            var shippingRate = shipping[i].shippingRate;
            shippingratee = parseFloat(shipping[i].shippingPrice);
            var shippingRule = shipping[i].shippingRule;
            var totalAmount = shipping[i].totalAmount;
            //console.log(shipping[i].countryCollection);
            if (shipping[i].countryCollection != null) {
                for (sc = 0; sc < shipping[i].countryCollection.length; sc++) {
                    console.log(shipping[i].countryCollection[sc].longname);
                    if (AppyTemplate.global.currentcountrycode == shipping[i].countryCollection[sc].shortname) {
                        if (shippingRule == '=') {
                            if (parseFloat(shippingsubtaotal) == parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    $$('[id=deliverychargeecom]').hide();
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtaotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                }


                            } else {
                                $$('[id=deliverychargeecom]').hide();
                            }
                        }
                        else if (shippingRule == '<=') {
                            if (parseFloat(shippingsubtaotal) <= parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {

                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {


                                        shippingPrice = ((parseFloat(shippingsubtaotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                }

                            } else {
                                $$('[id=deliverychargeecom]').hide();
                            }
                        }
                    } else if (shipping[i].countryCollection[sc].shortname == "0" || shipping[i].countryCollection[sc].shortname == 0) {
                        if (shippingRule == '=') {
                            if (parseFloat(shippingsubtaotal) == parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    $$('[id=deliverychargeecom]').hide();
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtaotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                }


                            }
                        }
                        else if (shippingRule == '<=') {
                            if (parseFloat(shippingsubtaotal) <= parseFloat(totalAmount)) {
                                if (shippingPrice == 'Free Shipping') {
                                    shippingPricetemp = '0.00';
                                    ecomshiploop = false;
                                    break;
                                }
                                else {
                                    if (shippingRate == 'Flat') {
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = parseFloat(shippingPrice).toFixed(2);
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                    else {
                                        shippingPrice = ((parseFloat(shippingsubtaotal) * parseFloat(shippingPrice)) / 100);
                                        grandtaotal = parseFloat(grandtaotal) + parseFloat(shippingPrice);
                                        shippingPricetemp = shippingPrice.toFixed(2);
                                        console.log(shippingPrice);
                                        shippingRatetemp = shippingRate;
                                        ecomshiploop = false;
                                        break;
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }

    }




    //-------------------------------------miscx tax----------------------------------------------------------------------
    var miscTaxData = { "list": [] };
    var miscTax = configurationfood.miscTax;
    var miscTaxDataDup = [];
    console.log(grandtaotal);
    for (i = 0 ; i < miscTax.length; i++) {
        var taxRate = miscTax[i].taxRate;
        var taxAmount = miscTax[i].taxAmount;
        var taxrate = miscTax[i].taxAmount;
        var taxType = miscTax[i].taxType;
        var id = miscTax[i].id;
        if (taxRate == 'Flat') {
            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxAmount);
        }
        else {
            taxAmount = parseFloat(((parseFloat(subtaotal) * parseFloat(taxAmount)) / 100)).toFixed(2);
            grandtaotal = parseFloat(grandtaotal) + parseFloat(taxAmount);
        }
        var mistaxx = {
            "taxrate": taxrate,
            "id": id,
            "taxRate": taxRate,
            "taxAmount": taxAmount,
            "taxType": taxType,
            "currency": productList.currency,
            "tax": taxAmount
        }

        miscTaxData.list.push(mistaxx);
        miscTaxDataDup.push(mistaxx);

    }

    var gtotal = parseFloat(productList.grandtaotal).toFixed(2);

    var maxGrandTotalStore = currencyFomatter(parseFloat(gtotal));
    var maxGrandTotalStoreAmount = currencyFomatter(parseFloat(gtotal));
//    $$('[id=grandTotal]').text(maxGrandTotalStore);

        if (AppyTemplate.global.ecommCurrencySymbol) {
            $$('[id=grandTotal]').text(currencySymbol + "" + maxGrandTotalStore);
        } else {
            $$('[id=grandTotal]').text(maxGrandTotalStore + "" + currencySymbol);
        }

    productList.maxGrandTotalStore=maxGrandTotalStore
    productList.maxGrandTotalStoreAmount =maxGrandTotalStoreAmount;
    productList.taxPrice = parseFloat(taxPricetemp).toFixed(2);
    productList.taxRate = taxRatetemp;
    productList.taxratee = taxratee;
    productList.shippingPrice = parseFloat(shippingPricetemp).toFixed(2);
    productList.shippingRate = shippingRatetemp;
    productList.shippingratee = shippingratee;
    productList.discountPrice = parseFloat(discountPricetemp).toFixed(2);
    productList.discountRate = discountRatetemp;
    productList.discountRateee = discountRateee;
    productList.miscTax = miscTaxData;
    productList.miscTaxDup = miscTaxDataDup;
    if (productList.miscTax != undefined) {
            var miscTaxArr = productList.miscTax.list;
            for (var key in miscTaxArr) {
                miscTaxArr[key].maxTaxAmount = currencyFomatter(parseFloat(miscTaxArr[key].taxAmount));
                productList.maxTaxAmount =  miscTaxArr[key].maxTaxAmount;
            }
        }

    if (parseFloat(grandtaotal) < 0.001) {
        grandtaotal = parseFloat('0.00') + parseFloat(shippingPricetemp);
    }
    if (productList.coupandiscount < 0) {
        productList.coupandiscount = Math.abs(productList.coupandiscount);
    }
    productList.grandtaotal = parseFloat(grandtaotal).toFixed(2);
    localStorage.setItem("productList", JSON.stringify(productList));


    Appyscript.showIndicator();
    $$.get("pages/ecommerce-product.html", function (template) {
        var compiledTemplate = AppyTemplate.compile(template);
        reloadDataCart = template;
        var html = compiledTemplate(productList);
        var btn = document.createElement("html");
        btn.innerHTML = html;
        $$(mainView.activePage.container).find(".pay-mobile-cart").html($$(btn).find(".pay-mobile-cart").html());
        $$(btn).find(".user_tab .product_price").each(function (i) {
            $$(mainView.activePage.container).find(".user_tab .product_price").eq(i).html($$(this).html());
        })
        Appyscript.hideIndicator();
        setTimeout(function(){
              if(localStorage.getItem("couponHide")=="true"){
                  localStorage.setItem("couponHide","false")
                  $$("#coupanPrice").show();
              }
              else{
                $$("#coupanPrice").hide()
              }
        }, 2000);
    });


}



function countrycodecheck() {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(function (position) {
//
//            initialize(position.coords.latitude, position.coords.longitude);
//        });
//    }

    //radical
    var latLong = Appyscript.getCurrentPositionValue();
    initialize(latLong.split(",")[0],latLong.split(",")[1]);




    function initialize(lat, lng) {
        //directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        //directionsService = new google.maps.DirectionsService();
        var latlng = new google.maps.LatLng(lat, lng);

        //alert(latlng);
        getLocation(latlng);
    }

    function getLocation(latlng) {

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var loc = getCountry(results);
                    //alert("location is::"+loc);
                    AppyTemplate.global.currentcountrycode = loc;
                }
            }
        });

    }

    function getCountry(results) {
        for (var i = 0; i < results[0].address_components.length; i++) {
            var shortname = results[0].address_components[i].short_name;
            var longname = results[0].address_components[i].long_name;
            var type = results[0].address_components[i].types;
            if (type.indexOf("country") != -1) {
                if (!isNullOrWhitespace(shortname)) {
                    return shortname;
                }
                else {
                    return longname;
                }
            }
        }

    }

    function isNullOrWhitespace(text) {
        if (text == null) {
            return true;
        }
        return text.replace(/\s/gi, '').length < 1;
    }

}



var productids = [], temproduct = '', imgindex = 0;
var ecomActiveIcon;
function uploadimagestore(productid, a) {
    ecomActiveIcon = a;
    temproduct = productid;
    Appyscript.modal({
        title: pageData.languageSetting.click_to_upload_image_dir,
        verticalButtons: true,
        buttons: [{
            text: AppyTemplate.global.commonLanguageSetting.Camera_social_network,
            onClick: function () {
                if (Appyscript.device.android) {
                    Appyscript.cameraPermission('addmore_camerastore', 'Appyscript.permissionDenied')
                } else {
                    addmore_camerastore()
                }
            }
        },

            {
                text: AppyTemplate.global.commonLanguageSetting.common_upload_from_gallery,
                onClick: function () {
                    if (Appyscript.device.android) {
                        Appyscript.storagePermission('addmore_gallerystore', 'Appyscript.permissionDenied')
                    } else {
                        addmore_gallerystore()
                    }
                }
            },

            {
                text: 'Dropbox',
                onClick: function () {
                    Appyscript.getDropboxChooser();
                    //Appyscript.cameraPermission('returnCamFormBuild','Appyscript.permissionDenied')
                    //navigator.device.capture.captureImage(onSuccess, onFail, optionsCamera);
                }
            },
            {
                text: AppyTemplate.global.commonLanguageSetting.common_cancel,
                onClick: function () {

                }
            }
        ]
    })

}


function addmore_camerastore() {
    Appyscript.showIndicator();
//    var options = {
//        quality: 50,
//        sourceType: Camera.PictureSourceType.Camera,
//        destinationType: navigator.camera.DestinationType.FILE_URI,
//    }
//    navigator.device.capture.captureImage(captureSuccessstore, captureErrorstore, options);
    navigator.camera.getPicture(captureSuccessstore, captureErrorstore, {
            quality: 70,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true
        });
}

var customimagepath = ''
function captureSuccessstore(mediadata) {

    var imgageurl = mediadata;
    customimagepath = mediadata;
    localStorage.setItem("imagescustom", customimagepath);
    productids.push({
        'product_id': temproduct,
        'imagesname': customimagepath.substr(customimagepath.lastIndexOf('/') + 1)
    });
    base64customimage(imgageurl);
    Appyscript.hideIndicator();
}

function captureErrorstore() {
    Appyscript.hideIndicator();
}


function addmore_gallerystore() {
    Appyscript.showIndicator();
    var options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
    }
    navigator.camera.getPicture(librarySuccessstore, libraryErrorstore, options);
}

function librarySuccessstore(imageuri) {
    localStorage.setItem("imagescustom", imageuri);
    customimagepath = imageuri;
    productids.push({
        'product_id': temproduct,
        'imagesname': customimagepath.substr(customimagepath.lastIndexOf('/') + 1)
    });
    base64customimage(imageuri);
    Appyscript.hideIndicator();
}


function libraryErrorstore() {
    Appyscript.hideIndicator();
}

function base64customimage(imageURI) {
    $$(ecomActiveIcon).find("[id='checkimge']").css("display", "inline-block");
    getFileContentAsBase64(imageURI, function (base64Image) {
        customsendsoimages = $.grep(customsendsoimages, function (value) {
            return value.product_id != temproduct
        });

        customsendsoimages.push({
            'image': btoa(base64Image),
            'product_id': temproduct
        });

    });

}


function fileuploadwithcheckout(status, userId, billingData, shippingData, paymentTypeObject, productList, creditCardDetail, txnId, paymentMethodKey, sessionToken) {
    var options = new FileUploadOptions();
    options.fileKey = "FILES";
    options.fileName = localStorage.getItem("dummysocial").substr(localStorage.getItem("dummysocial").lastIndexOf('/') + 1);
    options.mimeType = "text/plain";
    // options.headers = {'accessToken': deviceEncryptedToken};
    var params = new Object();
    params.orderId = orderId;
    params.appId = localStorage.getItem("appid");
    params.productIds = JSON.parse(localStorage.getItem("customimages"));
    //params.productIds = customsendsoimages;
    options.params = params;
    console.log(options.params);
    options.chunkedMode = false;
    var ft = new FileTransfer();
    console.log(options.fileName);
    ft.upload(localStorage.getItem("dummysocial"), webserviceUrl + 'upload_custom_media.php', winstorecustom, failstorecustom, options);

    function winstorecustom(r) {
         processwith_ewalletAvailability(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken);
    }


    function failstorecustom(r) {
        console.log("error" + JSON.stringify(r));
    }

}



Appyscript.getDropboxChooser = function () {
    AppyPieNative.getDropboxChooser();
}



function functionCallAfterImageUpload(status, userId, billingData, shippingData, paymentTypeObject, productList, creditCardDetail, txnId, paymentMethodKey, sessionToken) {
    Appyscript.showIndicator();

    if (localStorage.getItem("userId") == null || localStorage.getItem("userId") == "")
        localStorage.setItem("userId", userId);

    console.log(billingData);
    if (status == 1 && localStorage.getItem("userId") != "") {
        /*if (paymentMethodKey == "paypal") {
            //submitOrderByPaypal(billingData, shippingData, paymentTypeObject, productList);
        }
        else if (paymentMethodKey == "payfast") {
            //payFastPaymentGateway(billingData, shippingData, paymentTypeObject, productList);
        }
        else if (paymentMethodKey == "hubtel") {
            console.log("hubtelpaymentgateway");
            //hubtelPaymentGateway(billingData, shippingData, paymentTypeObject, productList);
        }
        else if (paymentMethodKey == "payu_money") {
            //submitOrderByPayU(billingData, shippingData, paymentTypeObject, productList);
        }
        else if (paymentMethodKey == "cc") {
            //submitOrderByCC(billingData, shippingData, paymentTypeObject, productList, creditCardDetail, txnId);
        }
        else if (paymentMethodKey == "stripe") {
            //creditCardPaymentThroughStripe(billingData, shippingData, paymentTypeObject, productList, creditCardDetail, productList.grandtaotal);
        }
        else if (paymentMethodKey == "cc_phone") {
            //submitOrderByPhone(billingData, shippingData, paymentTypeObject, productList);
        }
        else if (paymentMethodKey == "volecity") {
             //payByVelocityEcom(billingData,shippingData,paymentTypeObject,productList, sessionToken);
        }
        else if (paymentMethodKey == "authorizenet") {
              //submitOrderByAuthorize(billingData,shippingData,paymentTypeObject,productList, creditCardDetail);
        }
        else if (paymentMethodKey == "braintree") {
              //submitOrderByBrainTree(billingData,shippingData,paymentTypeObject,productList, creditCardDetail);
        }
        else if(paymentMethodKey=="mercadopago"){
                    console.log("submit order by mercado");
                    Appyscript.showIndicator();
                    paymentwithmercado_andewallet = false;
                    //mercadoDetail(billingData,shippingData,paymentTypeObject,productList,userId);
        }
        else {
           // submitOrderByCOD(billingData, shippingData, paymentTypeObject, productList);
        }*/


        if (isOnline()) {
            Appyscript.showIndicator();
            var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "", "");
            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function(jsonData, textStatus) {
                    if (textStatus == 200) {
                        var jsonObj = JSON.parse(jsonData);
                        var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                        if (success.toLowerCase() == "success") {
                            var payTypeObj = $$(paymentTypeObject).parent();
                            var merchantId = payTypeObj.attr("data-merchantId");
                            var paypalId = payTypeObj.attr("data-paypalId");
                            var postDataJson = JSON.parse(postData);
                            var totalProductDetail = '{"orderId":"' + postDataJson.orderId + '","currency":"' + postDataJson.currency + '","totalAmount":"' + postDataJson.discount.total +
                                '","paypalId":"' + paypalId + '","merchantId":"' + merchantId + '","userId":"' + localStorage.getItem("userId") + '"}';
                            //openPaypalViewForPayment(billingData, totalProductDetail, false);
                            //CommonPaymentgatwayFunction(postDataJson.orderId,pageId,productList,pageIdentifie);
                            orderIdPageGlobal = postDataJson.orderId;
                            commonPaymentRegistrationInfo2(ewalletPaymentTypeObject);

                        } else if (success.toLowerCase() == "failure") {
                            orderIdForGloble = '';
                            orderId = '';
                            $$.get("pages/error.html", function(template) {
                                var compiledTemplate = AppyTemplate.compile(template);
                                var html = compiledTemplate("");
                                mainView.router.load({
                                    content: html,
                                    animatePages: true
                                });
                            });
                        } else {
                            orderIdForGloble = '';
                            orderId = '';
                            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                            Appyscript.hideIndicator();
                        }
                    } else {
                        orderIdForGloble = '';
                        orderId = '';
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                },
                error: function(error) {
                    orderIdForGloble = '';
                    orderId = '';
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });
        } else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
    }
}



function hubtelPaymentGateway(billingData, shippingData, paymentTypeObject, productList) {
    var name = $$("#paymentcustomer_name").val();
    var email = $$("#paymentemail").val();
    var price = $$("#paymentprice").val();
    var mobile_no = $$("#paymentmobileno").val();
    var code_voucher = $$("#vouchercode").val();
    var mobile_network = $$("#paymentmobile").val();
    var description = $$("#paymentdescription").val();
    if (name == "") {
        Appyscript.alert(pageData.languageSetting.hubtel_custmore_check, appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    } else if (price == "") {
        Appyscript.alert(pageData.languageSetting.hubtel_price_check, appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    } else if (mobile_no == "") {
        Appyscript.alert(pageData.languageSetting.hubtel_mobile_check, appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    } else if (code_voucher == "" && mobile_network == "vodafone-gh") {
        Appyscript.alert(pageData.languageSetting.hubtel_voucher_check, appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    } else if (mobile_network == "") {
        Appyscript.alert(pageData.languageSetting.hubtel_mobile_network_check, appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    } else {
        var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "hubtel", "");
        //console.log(postData);
        if (isOnline()) {
            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData, textStatus) {
                    if (textStatus == 200) {
                        gethubtelpaymentdata();
                    }
                    else {
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    }
                    Appyscript.hideIndicator();
                },
                error: function (error) {
                    orderIdForGloble = '';
                    orderId = '';
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });
        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
    }
}

function showhidevocher() {
    if ($$("#paymentmobile").val() == "vodafone-gh") {
        $$("#vouchercodefld").show();
    } else {
        $$("#vouchercodefld").hide();
    }
}


function gethubtelpaymentdata() {
    var arrdesc = [];
    var name = $$("#paymentcustomer_name").val();
    var email = AppyTemplate.global.billingdata.email;
    var price = productList.grandtaotal;
    var mobile_no = $$("#paymentmobileno").val();
    var code_voucher = $$("#vouchercode").val();
    var mobile_network = $$("#paymentmobile").val();
    for (key = 0; key < productList.list.length; key++) {
        arrdesc.push(productList.list[key].productName);
    }
    var descproduct = array = arrdesc + ",";
    var postData = '{"appId":"' + app_id + '","orderId":"' + orderId + '","postValue":[{"CustomerName":"' + name + '","CustomerMsisdn":"' + mobile_no + '","CustomerEmail":"' + email + '","Channel":"' + mobile_network + '","Amount":"' + price + '","Description":"' + descproduct.replace(/,\s*$/, "") + '"}],"method":"hubtelPayment"}'
    if (isOnline()) {
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                var json_parsedata = JSON.parse(jsonData);
                if (json_parsedata.ResponseCode == 0000) {
                    localStorage.setItem("productList", "");
                    localStorage.setItem("customimages", "");
                    customsendsoimages = '';
                    productList = { "list": [] };
                    $$.get("pages/ecommerce-thanks.html", function (template) {
                        orderIdForGloble = '';
                        orderId = '';
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate("");
                        mainView.router.load({ content: html, animatePages: true });
                    });
                } else if (json_parsedata.ResponseCode == 0001) {
                    localStorage.setItem("productList", "");
                    localStorage.setItem("customimages", "");
                    customsendsoimages = '';
                    productList = { "list": [] };
                    Appyscript.alert(pageData.languageSetting.hubtelresponce, appnameglobal_allpages, function () {
                        $$.get("pages/ecommerce-thanks.html", function (template) {
                            orderIdForGloble = '';
                            orderId = '';
                            var compiledTemplate = AppyTemplate.compile(template);
                            var html = compiledTemplate("");
                            mainView.router.load({ content: html, animatePages: true });
                        });
                    });
                }
                else {
                    orderIdForGloble = '';
                    orderId = '';
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
                Appyscript.hideIndicator();
            },
            error: function (error) {
                orderIdForGloble = '';
                orderId = '';
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}



function dropBoxResultCallback(dropboxResult) {
    $$(ecomActiveIcon).find("[id='checkimge']").css("display", "inline-block");
    var data = JSON.parse(dropboxResult);
    localStorage.setItem("imagescustom", data.link);
    customsendsoimages = $.grep(customsendsoimages, function (value) {
        return value.product_id != temproduct
    });

    customsendsoimages.push({
        'url': data.link,
        'product_id': temproduct
    });
}




function getupdatedproductapilistecom(a) {
    var cartdataaa = JSON.parse(localStorage.getItem("productList"));
    var productkeycart = []
    for (key = 0; key < cartdataaa.list.length; key++) {
        productkeycart.push(cartdataaa.list[key].productId);
    }

    console.log(productkeycart);

    var cartproduct = array = productkeycart + ",";
    var cartproductremovecomma = cartproduct.replace(/,\s*$/, "");
    app_id = localStorage.getItem("appid");
    var jsonPostecom = '{"method":"getProListArray","appId":"' + app_id + '","productList":"' + cartproductremovecomma + '"}';
    console.log(jsonPostecom);
    if (isOnline()) {
        Appyscript.showIndicator();
        $$.ajax({
            url: webserviceUrl + 'Ecomm.php',
            data: Appyscript.validateJSONData(jsonPostecom),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            success: function (jsonData, textStatus) {
                var responcedata = JSON.parse(jsonData);
                for (key = 0; key < responcedata.productList.length; key++) {
                    for (i = 0; i < productList.list.length; i++) {


                        if (productList.list[i].productId == responcedata.productList[key].productId) {
                            productList.list[i].price = responcedata.productList[key].price


                            //radical - hotfix phatega ek din
                            if(responcedata.productList[key].offered){
                                    productList.list[i].price -= (productList.list[i].price/100)*responcedata.productList[key].offeredDiscount;
                            }
                      if(responcedata.productList[key].quantity==0)
                        {
                            productList.list.pop(productList.list[key])
                        }

                         }

                    }
                }
                localStorage.setItem("productList", JSON.stringify(productList));
                ecomcal(a);

            },
            error: function (error) {
                Appyscript.hideIndicator();
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage);
    }
}


var isShippingPlusCode = false;
var plusCodeLatLng = "";
function goToPlusCodePage(isShipping) {
    isShippingPlusCode = isShipping;
    openPlusCodePageGlobal('storePage');
}
function goToStorePageCallBack(plusCode, latLng) {
    plusCodeLatLng = latLng;
    if (!isShippingPlusCode) {
        $$("#bPlusCode").val(plusCode);
        mainView.router.back();
        validatePlusCode('bPlusCode', false);
    } else {
        $$("#sPlusCode").val(plusCode);
        mainView.router.back();
        validatePlusCode('sPlusCode', true);
    }

}

function changeBillingAddressType() {
    if ($('input[name="billingEcommerceAddressCheck"]').is(':checked')) {
        var selectedValue = $$('input[name=billingEcommerceAddressCheck]:checked').val();
        if (selectedValue == "address") {
            $$("#billingAddressSection").show();
            $$("#billingPlusCodeSection").hide();
        } else {
            $$("#billingPlusCodeSection").show();
            $$("#billingAddressSection").hide();
        }
    }
}
function changeShippingAddressType() {
    if ($('input[name="shippingEcommerceAddressCheck"]').is(':checked')) {
        var selectedValue = $$('input[name=shippingEcommerceAddressCheck]:checked').val();
        if (selectedValue == "address") {
            $$("#shippingAddressSection").show();
            $$("#shippingPlusCodeSection").hide();
        } else {
            $$("#shippingPlusCodeSection").show();
            $$("#shippingAddressSection").hide();
        }
    }
}
function validatePlusCode(inputId, isShipping) {
    var plusCodeValue = '';
    plusCodeValue = $$('#' + inputId).val();
    Appyscript.showIndicator();
    if (plusCodeValue && plusCodeValue != "" && plusCodeValue != null) {
        if (!isOnline()) {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        } else {
            plusCodeValue = plusCodeValue.replace('+', '%2B')
            var plusCodeApiUrl = "";
            plusCodeApiUrl = "https://plus.codes/api?address=" + plusCodeValue + "&ekey=" + data.googlePlacesApiKey;
            console.log("plusCodeApiUrl :" + plusCodeApiUrl);
            $$.ajax({
                type: 'GET',
                url: plusCodeApiUrl,
                dataType: 'json',
                async: true,
                success: function (result) {
                    Appyscript.hideIndicator();
                    console.log("plusCodeData   " + JSON.stringify(result))
                    if (result.status == "OK") {
                        if (result.plus_code.geometry.location) {
                            findAddressFromLatLong(result.plus_code.geometry.location.lat, result.plus_code.geometry.location.lng, isShipping);
                        } else {
                            Appyscript.alert(pageData.languageSetting.LOCATION_NOT_VALID, appnameglobal_allpages);
                        }
                    }
                    //                     else {
                    //                        if (result.status == "REQUEST_DENIED") {
                    //                            Appyscript.alert(pageData.languageSetting.PLEASE_PLUS_CODE_VALID,appnameglobal_allpages);
                    //                        }
                    //                        else if (result.status == "INVALID_REQUEST") {
                    //                            Appyscript.alert(pageData.languageSetting.PLEASE_PLUS_CODE_VALID, appnameglobal_allpages);
                    //                        } else {
                    //                            Appyscript.alert(pageData.languageSetting.PLEASE_PLUS_CODE_VALID, appnameglobal_allpages);
                    //                        }
                    //                    }

                },
                error: function () {
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });

        }
    } else {
      //  Appyscript.alert(pageData.languageSetting.PLEASE_ENTER_PLUS_CODE, appnameglobal_allpages);
        Appyscript.hideIndicator();
    }
}

function findAddressFromLatLong(lat, lng, isShipping) {
    Appyscript.showIndicator();
    if (!isOnline()) {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    } else {
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                Appyscript.hideIndicator();
                if (results[0]) {
                    var pincode, address;
                    var add = results[0].formatted_address;
                    var value = add.split(",");
                    var count = value.length;
                    var country = value[count - 1];
                    var state = value[count - 2];
                    var city = value[count - 3];
                    var addresssfull = value[1];
                    var a1 = results[0].address_components[2].long_name;
                    var a2 = results[0].address_components[3].long_name;
                    if (a1 != undefined && a1 != null) {
                        city = a1 + ", " + a2 + ", " + city;
                    }
                    country = country.replace(/,/g, "").trim();
                    var findPincodeArr = results[0].address_components;
                    for (var key in findPincodeArr) {
                        if (findPincodeArr[key].types == "postal_code") {
                            pincode = findPincodeArr[key].long_name;
                        }
                    }
                    address = addresssfull.replace(/,/g, "").replace("Brasil", "Brazil").trim();
                    city = city.replace(/,/g, "").trim();
                    state = state.trim();
                    var pincodev = state.split(" ");
                    var billstate = ""
                    for (s = 0 ; s <= pincodev.length - 2 ; s++) {
                        billstate += pincodev[s].trim() + " ";

                    }
                    state = billstate.trim();
                    if (pincode == "" || pincode == undefined || pincode == null) {
                        pincode = pincodev[pincodev.length - 1];
                    }

                    console.log('Address : ' + address + ' City: ' + city + " State :" + state + " Country : " + country + " PinCode :" + pincode);
                    if ((!address || address == "") && (!city || city == "") && (!state || state == "") && (pincode || pincode == "") && (country || country == "")) {
                        Appyscript.alert(pageData.languageSetting.ADDRESS_NOT_FOUND, appnameglobal_allpages);
                        if (isShipping) {
                            $$('#sPlusCode').val("");
                        } else {
                            $$('#bPlusCode').val("");
                        }
                    } else {
                        if (isShipping) {
                           $$('#ssAddress').val(address);
                            $$('#sState').val(state);
                            $$('#sZip').val(pincode);
                            $$('#sCity').val(city);
                            $$("#sCountry").val(country);
                        } else {
                            $$('#bAddress').val(address);
                            $$('#bState').val(state);
                            $$('#bZip').val(pincode);
                            $$('#bCity').val(city);
                            $$("#bCountry").val(country);
                        }
                    }
                }
                else {
                    console.log("Location not set, status: " + status);
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    if (isShipping) {
                        $$('#sPlusCode').val("");
                    } else {
                        $$('#bPlusCode').val("");
                    }
                }
            }
            else {
                console.log("Geo-coder failed, status: " + status);
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                Appyscript.hideIndicator();
                if (isShipping) {
                    $$('#sPlusCode').val("");
                } else {
                    $$('#bPlusCode').val("");
                }
            }
        });
    }
}

function checkPlusCodeValueValidation(inputId, isShippingData) {
    var plusCodeValue = '';
    plusCodeValue = $$('#' + inputId).val();
    Appyscript.showIndicator();
    if (!isOnline()) {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        return false;
    } else {
        plusCodeValue = plusCodeValue.replace('+', '%2B')
        var plusCodeApiUrl = "";
        plusCodeApiUrl = "https://plus.codes/api?address=" + plusCodeValue + "&ekey=" + data.googlePlacesApiKey;
        console.log("plusCodeApiUrl :" + plusCodeApiUrl);
        $$.ajax({
            type: 'GET',
            url: plusCodeApiUrl,
            dataType: 'json',
            async: false,
            success: function (result) {
                Appyscript.hideIndicator();
                console.log("plusCodeData   " + JSON.stringify(result))
                if (result.status == "OK") {
                    if (result.plus_code.geometry.location) {
                        if (isShippingData) {
                            checkShippingPlusCodeValid = true;
                        } else {
                            checkBillingPlusCodeValid = true;
                        }
                    }
                } else {
                    if (isShippingData) {
                        checkShippingPlusCodeValid = false;
                    } else {
                        checkBillingPlusCodeValid = false;
                    }
                }
            },
            error: function () {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                return false;
            }
        });

    }
}


AppyTemplate.registerHelper('replaceTermsAndPrivacy_ecommerce',function (getString) {

  var _originalString=getString;
  var _cmsArray= pageData.cmsPage;

    if(_cmsArray == "" || _cmsArray.length ==0 || _cmsArray ==undefined)
    {
       return "";
    }

      var policyID= pageData.cmsPage.privacy_policy || "" ;
    var termsID=pageData.cmsPage.terms_and_conditions || "";
    var _termsString;
    var _privacyString;

    if(termsID!=""){
     _termsString='<a class="popupToPage" data-animate="true" data-page="ecommerce-term-n-condition" data-back="back" data-jsonID="method":"ecommCms" style="color:'+pageData.styleAndNavigation.activeColor+';text-decoration:underline;">'+pageData.languageSetting.tc_mcom+'</a>';
    }

    if(policyID!=""){
     _privacyString='<a class="popupToPage" data-animate="true" data-page="ecommerce-privacy-policy" data-back="back" data-jsonID="method":"ecommCms" style="color:'+pageData.styleAndNavigation.activeColor+';text-decoration:underline;">'+pageData.languageSetting.privacy_policy_mcom+'</a>';
    }

   _returnString= _originalString.replace("__TERM__",_termsString).replace("__POLICY__",_privacyString);
    return  _returnString
});

function storeShareMyorder(orderDate,paymentMethod,noOfProducts,maxSubTotalStore,maxGrandTotalStore) {
    Appyscript.shareText("Product order date: " + orderDate + "\nProduct payment method: " + paymentMethod + "\nItems: " + noOfProducts + "\nSubtotal: " + maxSubTotalStore + "\nGrand total: " + maxGrandTotalStore);
}


var checkTotalAmount;
var token;

function payByVelocityEcom(billingData, shippingData, paymentTypeObject, productList,sessionToken) {

    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "volecity", "");
    console.log("postData velocity::  baseurl  " + baseurl + "   postData   " + postData);

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
              Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_cvv_code);
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


    if (isOnline()) {
        $$.ajax({
            url: baseurl,
            data: Appyscript.validateJSONData(postData),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
                if (textStatus == 200) {
                    var jsonObj = JSON.parse(jsonData);
                    console.log("jsonObjjsonObjjsonObjjsonObj  " + JSON.stringify(jsonObj))
                    var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                    var postDataJson = JSON.parse(postData);
                    if (success.toLowerCase() == "success") {

                        var card = {
                        CardholderName: cardHolderVel,
                        cardtype: cardTypeValue,
                        number: cardNo,
                        cvc: cvvVel,
                        expMonth: expMonth,
                        expYear: expYear
                        };

                        var address = {}

                          address["Street"] = postDataJson.billingData.address;
                          address["PostalCode"] = postDataJson.billingData.postalCode;
                          address["City"] = postDataJson.billingData.city;
                          address["StateProvince"] =postDataJson.billingData.countryCode;
                          address["Country"] =  postDataJson.billingData.country;
                          address["Phone"] =  postDataJson.billingData.phone;

                           var transctionData =
                            {
                            Amount: parseFloat(postDataJson.shippingData.totalAmount),
                            CurrencyCode:postDataJson.currency,
                            EmployeeId : '13',
                            IndustryType:'Ecommerce',
                            order_id : postDataJson.orderId

                            }
                            orderIdForGloble = transctionData.order_id;
                            checkTotalAmount = transctionData.Amount;


                    Velocity.tokenizeForm(transctionData,sessionToken, card, address, applicationProfileId, merchantProfileId, workflowId, velocityResponseHandlerEcom);
                    Appyscript.hideIndicator();
                    }
                    else if (success.toLowerCase() == "failure") {
                        $$.get("pages/error.html", function (template) {
                            var compiledTemplate = AppyTemplate.compile(template);
                            var html = compiledTemplate("");
                            mainView.router.load({ content: html, animatePages: true });
                        });
                    }
                    else {
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                }
                else {
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    Appyscript.hideIndicator();
                }
            },
            error: function (error) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}

function velocityResponseHandlerEcom(result) {
if(result.text !== "Successful"){
    Appyscript.hideIndicator();
    Appyscript.alert(result.message,data.appData.appName);
    return false;
}
var p = JSON.parse(localStorage.getItem("productList"));

 var trancationData='{"Amount":"'+result.amount+'","CurrencyCode":"'+p.currency+'","identitytoken":"'+token+'","workflowid":"'+result.workflowid+
              '","merchantprofileid":"'+result.merchantprofileid+'","applicationprofileid":"'+result.applicationprofileid+
             '","paymentAccountDataToken":"'+result.row[0].PaymentAccountDataToken+'", "OrderId":"'+result.row[0].OrderId+'"}';
var postdata='{"method":"velocityPayWithToken","orderId": "'+orderIdForGloble+'", "trancationData":'+trancationData+'}';

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
                    token ="";
                     data = JSON.parse(data);
                     if(data.StatusCode == "00"){
                     updateTid(data)
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

function updateTid(resultData){
var postdata='{"method":"updateTransaction","appId":"'+app_id+'","orderId":"'+orderIdForGloble+'","trnId":"'+resultData.TransactionId+'", "lang":"'+data.appData.lang+'", "paymentLog":'+JSON.stringify(resultData)+'}';

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

                         $$.get("pages/ecommerce-thanks.html", function (template) {
                                   orderIdForGloble = '';
                                   orderId = '';
                                   var compiledTemplate = AppyTemplate.compile(template);
                                   var html = compiledTemplate(orderIdForGloble);
                                   mainView.router.load({ content: html, animatePages: true });
                                   Appyscript.hideIndicator();
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

function showtoastmsgForEcommerce()
{
    var mssgg=AppyTemplate.global.pageLanguageSetting.product_successfully_added_to_cart;
    if(Appyscript.device.android)
    {
        AppyPieNative.AddTocartToastMsg(mssgg);
    }
    else
    {
       window.location = "windowalert1:"+mssgg;
    }
}








//TODO: Payment with E-Wallet Option
function processwith_ewalletAvailability(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken) {
//    if(ewalletModel.getewalletAvailableStatus() == true || ewalletModel.getewalletAvailableStatus() == "true"){
//        paymentwithEwallet(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken)
//        return;
//    }
    functionCallAfterImageUpload(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken);

}

function paymentwithEwallet(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken) {
    var a= $$(paymentTypeObject).parent();
    var paymentMethodKey=a.attr("data-key");

    if(paymentMethodKey == "ewallet") {
        placeorderwith_ewalletMethod(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken)
        return;
    }

    if($("#ewalletbalance" + paymentMethodKey).length > 0 && $("#ewalletbalance" + paymentMethodKey).children().children()[0].checked) {
        ewallet_functionCallAfterImageUpload(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey,sessionToken);
    }
    else {
        functionCallAfterImageUpload(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken);

    }


}

function placeorderwith_ewalletMethod(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken) {
    if(!validateplaceOrderfor_ewallet()){
        Appyscript.hideIndicator()
        Appyscript.alert( (data.languageSetting.error_useotherPayjentMethod != undefined && data.languageSetting.error_useotherPayjentMethod != null && data.languageSetting.error_useotherPayjentMethod.length > 0) ? data.languageSetting.error_useotherPayjentMethod: "Please place order with other payment methods or add money to wallet", appnameglobal_allpages);

        return;

    }else {
        ewallet_functionCallAfterImageUpload(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken);

    }

}

function validateplaceOrderfor_ewallet() {
    var tmp = JSON.parse(localStorage.getItem("productList"));

    if(parseFloat(tmp.grandtaotal) <= parseFloat(ewalletModel.getbalanceAmount())) {return true;}

    return false;

}

function ewallet_functionCallAfterImageUpload(status,userId,billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId,paymentMethodKey, sessionToken){

    if(localStorage.getItem("userId")==null||localStorage.getItem("userId")=="")
        localStorage.setItem("userId",userId);

    console.log(billingData);
    if(status==1&&localStorage.getItem("userId")!="")
    {
        /*if(paymentMethodKey=="paypal")
        {
            ewallet_submitOrderByPaypal(billingData,shippingData,paymentTypeObject,productList);
        }
        else if(paymentMethodKey=="payfast")
        {
            ewallet_payFastPaymentGateway(billingData,shippingData,paymentTypeObject,productList);
        }
        else if(paymentMethodKey=="hubtel")
        {    console.log("hubtelpaymentgateway");
            ewallet_hubtelPaymentGateway(billingData,shippingData,paymentTypeObject,productList);
        }
        else if(paymentMethodKey=="payu_money")
        {
            ewallet_submitOrderByPayU(billingData,shippingData,paymentTypeObject,productList);
        }
        else if(paymentMethodKey=="cc")
        {
            //   var txnId=typeof data.msg!== "undefined"?data.msg:"";
            ewallet_submitOrderByCC(billingData,shippingData,paymentTypeObject,productList,creditCardDetail,txnId);
        }
        else if(paymentMethodKey=="stripe")
        {   productListForGloble=productList;
            billingDataForGloble = billingData;
            shippingDataForGloble=shippingData;
            paymentTypeObject=paymentTypeObject;
            productList= productListForGloble;
            creditCardDetailval=creditCardDetail;
            paymentTypeObjectval=paymentTypeObject;

            if(_checkStripeEcomCall)
            {
                submitOrderByStripe_ewallet('','');
                _checkStripeEcomCall=false
            }
            //creditCardPaymentThroughStripe(billingData,shippingData,paymentTypeObject,productList,creditCardDetail);
/*
            var postDataJson = JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"stripe",""));
            creditCardPaymentThroughStripe(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,creditCardDetailval,postDataJson.payment.otherPaymentPrice);*/
       /* }
        else if(paymentMethodKey=="cc_phone")
        {
            ewallet_submitOrderByPhone(billingData,shippingData,paymentTypeObject,productList);
        }else if(paymentMethodKey=="ewallet"){
            submitOrderByEwallet(billingData,shippingData,paymentTypeObject,productList);

        }else if(paymentMethodKey=="mercadopago"){
            console.log("submit order by mercado");
            Appyscript.showIndicator();
            paymentwithmercado_andewallet = true;
            mercadoDetail(billingData,shippingData,paymentTypeObject,productList,userId);

        }else if (paymentMethodKey == "volecity") {
            ewallet_payByVelocityEcom(billingData,shippingData,paymentTypeObject,productList, sessionToken);

        }else if (paymentMethodKey == "authorizenet") {
            if(creditCardDetail !== null){
                ewallet_payByAuthorizenetEcom(billingData,shippingData,paymentTypeObject,productList,creditCardDetail);
            }
        }else{
            ewallet_submitOrderByCOD(billingData,shippingData,paymentTypeObject,productList);

        }*/

        ewallet_submitOrderByCommon(billingData,shippingData,paymentTypeObject,productList);
    }
    else
    {
        Appyscript.hideIndicator();
        Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
    }
}

function ewallet_payByAuthorizenetEcom(billingData, shippingData, paymentTypeObject, productList, creditCardDetail) {
    var postData = ewallet_createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "authorizenet", "");
    productListForGloble=productList;
    billingDataForGloble = billingData;
    shippingDataForGloble=shippingData;;
    paymentTypeObjectval=paymentTypeObject;
    creditCardDetailval=creditCardDetail;
    setTimeout(function() {
        if (Appyscript.device.android) {
            AppyPieNative.prepareDataToPlaceOrder("authorizenet", postData);
        } else {
            window.location = "preparedatatoplaceorder:" + "&&" + "authorizenet" + "&&" + postData;
        }
    }, 50);

};

function ewallet_hubtelPaymentGateway(billingData,shippingData,paymentTypeObject,productList) {
    productListForGloble=productList;
    billingDataForGloble = billingData;
    shippingDataForGloble=shippingData;;
    paymentTypeObjectval=paymentTypeObject;

    var name=$$("#paymentcustomer_name").val();
    var email=$$("#paymentemail").val();
    var price=$$("#paymentprice").val();
    var mobile_no=$$("#paymentmobileno").val();
    var code_voucher=$$("#vouchercode").val();
    var mobile_network=$$("#paymentmobile").val();
    var description=$$("#paymentdescription").val();
    if(name==""){
        Appyscript.alert(pageData.languageSetting.hubtel_custmore_check, appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    }else if(price==""){
        Appyscript.alert(pageData.languageSetting.hubtel_price_check , appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    }else if(mobile_no==""){
        Appyscript.alert(pageData.languageSetting.hubtel_mobile_check, appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    }else if(code_voucher=="" && mobile_network=="vodafone-gh"){
        Appyscript.alert(pageData.languageSetting.hubtel_voucher_check , appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    }else if(mobile_network==""){
        Appyscript.alert(pageData.languageSetting.hubtel_mobile_network_check , appnameglobal_allpages);
        Appyscript.hideIndicator();
        return;
    }

    var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,"hubtel","");

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("hubtel", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "hubtel" + "&&" + postData;
            }
           },50);

}


function ewallet_payFastPaymentGateway(billingData,shippingData,paymentTypeObject,productList){
    productListForGloble=productList;
    billingDataForGloble = billingData;
    shippingDataForGloble=shippingData;;
    paymentTypeObjectval=paymentTypeObject;

     var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,"payfast","");

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("payfast", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "payfast" + "&&" + postData;
            }
           },50);

}

function ewallet_submitOrderByPayU(billingData,shippingData,paymentTypeObject,productList) {
    productListForGloble=productList;
    billingDataForGloble = billingData;
    shippingDataForGloble=shippingData;;
    paymentTypeObjectval=paymentTypeObject;

    var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,"payu_money","");
    console.log("postData stripe::  baseurl  "+baseurl  +"   postData   "+postData);

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("payu_money", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "payu_money" + "&&" + postData;
            }
           },50);


}

function ewallet_submitOrderByPaypal(billingData,shippingData,paymentTypeObject,productList) {
    productListForGloble=productList;
    billingDataForGloble = billingData;
    shippingDataForGloble=shippingData;;
    paymentTypeObjectval=paymentTypeObject;

    var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,"paypal_express","");
    console.log("ewallet_submitOrderByPaypal  baseurl  " + baseurl + "   postData   " + postData);

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("paypal_express", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "paypal_express" + "&&" + postData;
            }
           },50);


}

function ewallet_payByVelocityEcom(billingData, shippingData, paymentTypeObject, productList, sessionToken){
    productListForGloble=productList;
    billingDataForGloble = billingData;
    shippingDataForGloble=shippingData;;
    paymentTypeObjectval=paymentTypeObject;

    var postData = ewallet_createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "volecity", "", "", sessionToken);
    sessionTokenVelocity = sessionToken;
    console.log("postData velocity::  baseurl  " + baseurl + "   postData   " + postData);

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
        Appyscript.alert(ecomPleaseEnterCvvCode);
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

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("volecity", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "volecity" + "&&" + postData;
            }
           },50);

}

function ewallet_mercadoCardPayment()
{
    //var postData=ewallet_createJsonFormEcomOrder(billData_val,shipData_val,paymentTypeObject_val,productList_val,"mercadopago",userId_val);
    var postData=ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"mercadopago",userIdGlobale);
    console.log("postData mercadoCardPayment::  baseurl  "+baseurl  +"   postData   "+postData);

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("mercadopago", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "mercadopago" + "&&" + postData;
            }
           },50);

}

function ewallet_submitOrderByCommon(billingData,shippingData,paymentTypeObject,productList) {
    var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,paymentMethodKeyGlobal,"");

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("cod", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + paymentMethodKeyGlobal + "&&" + postData;
            }
           },50);

}

function submitOrderByEwallet(billingData,shippingData,paymentTypeObject,productList)
{
    var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,"ewallet","");

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("ewallet", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "ewallet" + "&&" + postData;
            }
           },50);


}

function ewallet_submitOrderByPhone(billingData,shippingData,paymentTypeObject,productList)
{
    var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,"ccPhone","");

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("ccPhone", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "ccPhone" + "&&" + postData;
            }
           },50);
}

function ewallet_submitOrderByCC(billingData,shippingData,paymentTypeObject,productList,creditCardDetail, transactionId)
{
    var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,"cc",transactionId);

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("cc", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "cc" + "&&" + postData;
            }
           },50);


}

function submitOrderByStripe_ewallet(paymentId,customer_id) {
    var billingData=billingDataForGloble;
    var shippingData=shippingDataForGloble;
    var paymentTypeObject=paymentTypeObject;
    var productList= productListForGloble;

    var orderId;
    if(!localStorage.getItem("orderIdval"))
    {
        var newdate=new Date().getTime();
        orderId='ap'+newdate;
        localStorage.setItem("orderIdval",orderId);
    }
    else{
        orderId=localStorage.getItem("orderIdval");
    }
    orderIdForGloble=orderId;
    Appyscript.showIndicator();
    var postData=ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList,"stripe", paymentId,customer_id);

        setTimeout(function(){
            if (Appyscript.device.android){
            AppyPieNative.prepareDataToPlaceOrder("stripe", postData);
            }else{
            window.location = "preparedatatoplaceorder:" + "&&" + "stripe" + "&&" + postData;
            }
        },50);
}

function placeOrderwith(dataParam,paymentMethod) {
    var placeOrder_url = webserviceUrl + "EcommPayment.php";
    console.log("placeOrderwith url " + placeOrder_url)

    console.log("data Params " + dataParam+":android")
    Appyscript.showIndicator()

    if(isOnline())
    {
        $$.ajax({
                url: placeOrder_url,
                data:dataParam+":android",
                type: "post",
                async: true,//321 headers: {'accessToken': deviceEncryptedToken},
                success: function(jsonData, textStatus )
                {
                if(textStatus==200)
                {
                var jsonObj=JSON.parse(jsonData);
                console.log("placeOrderwith Response" + jsonData);

                var success = typeof jsonObj.status!== "undefined"?(jsonObj.status!=null?jsonObj.status:""):"";
                if(success.toLowerCase()=="success")
                {

                    //processonResponsedata(jsonObj, paymentMethod)
                    orderIdPageGlobal = orderId;
                    commonPaymentRegistrationInfo2(ewalletPaymentTypeObject);
                   // var postDataJson = JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"stripe",""));
                   productListForGloble = productListForGloble;
                    //Appyscript.hideIndicator()
//                var payTypeObj= $$(paymentTypeObject).parent();
//                var merchantId=payTypeObj.attr("data-merchantId");
//                var paypalId=payTypeObj.attr("data-paypalId");
//                var postDataJson=JSON.parse(postData);
//                var totalProductDetail='{"orderId":"'+postDataJson.orderId+'","currency":"'+postDataJson.currency+'","totalAmount":"'+postDataJson.discount.total+
//                '","paypalId":"'+paypalId+'","merchantId":"'+merchantId+'","userId":"'+localStorage.getItem("userId")+'"}';

//                openPaypalViewForPayment(billingData,totalProductDetail);


                }
                else if(success.toLowerCase()=="failure")
                {
                orderIdForGloble='';
                orderId='';
                $$.get("pages/error.html", function (template)
                       {
                       var compiledTemplate = AppyTemplate.compile(template);
                       var html = compiledTemplate("");
                       mainView.router.load({content: html, animatePages: true});
                       });
                }
                else
                {
                orderIdForGloble='';
                orderId='';
                Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                Appyscript.hideIndicator();
                }
                }
                else
                {
                orderIdForGloble='';
                orderId='';
                Appyscript.alert(something_went_wrong_please_try_again , appnameglobal_allpages);
                Appyscript.hideIndicator();
                }
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

function processonResponsedata(jsonObj, paymentMethod) {
    if(paymentMethod == "ewallet") {
        ewallet_trasactionStatusPage(jsonObj);
        return;

    }else if(paymentMethod == "stripe") {
    //creditCardPaymentThroughStripe(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,creditCardDetailval);

    var postDataJson = JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"stripe",""));
    creditCardPaymentThroughStripe(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,creditCardDetailval,postDataJson.payment.otherPaymentPrice);

    }else if(paymentMethod == "mercadopago") {
        var payTypeObj= $$(paymentTypeObjectval).parent();
        var sellerPhoneNo=payTypeObj.attr("data-phoneNo");
        if(!isNaN(sellerPhoneNo)){

            submitOrderByMercado(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,userIdGlobale, objcard.cardToken);

        }

    }else if(paymentMethod == "authorizenet") {

        var postDataJson = JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"authorizenet",""));
        if(creditCardDetailval != null){
            submitOrderByAuthorize(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble, creditCardDetailval);
        }

    }else if(paymentMethod == "volecity"){
        ewallet_tokenizeVelocityform();

    }else if(paymentMethod == "cc" || paymentMethod == "ccPhone" || paymentMethod == "cod"){
        localStorage.setItem("productList","");
        localStorage.setItem("customimages","");
        customsendsoimages='';
        productList = {"list":[]};
        $$.get("pages/ecommerce-thanks.html", function (template)
               {
               orderIdForGloble='';
               orderId='';
               var compiledTemplate = AppyTemplate.compile(template);
               var html = compiledTemplate("");
               mainView.router.load({content: html, animatePages: true});
               });

    }else if(paymentMethod == "paypal_express") {

        var payTypeObj = $$(paymentTypeObjectval).parent();
        var merchantId = payTypeObj.attr("data-merchantId");
        var paypalId = payTypeObj.attr("data-paypalId");
        var postDataJson = JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"paypal_express",""));
        var totalProductDetail='{"orderId":"'+postDataJson.orderId+'","currency":"'+postDataJson.currency+'","totalAmount":"'+postDataJson.payment.otherPaymentPrice+
        '","paypalId":"'+paypalId+'","merchantId":"'+merchantId+'","userId":"'+localStorage.getItem("userId")+'"}';
        console.log("totalProductDetail" + totalProductDetail)

        openPaypalViewForPayment(billingDataForGloble,totalProductDetail,true);

    }else if(paymentMethod == "payu_money") {
        var billData=JSON.parse(billingDataForGloble);
        var payTypeObj= $$(paymentTypeObjectval).parent();
        var merchantId=payTypeObj.attr("data-merchantId");
        var saltKey=payTypeObj.attr("data-saltKey");
        var postDataJson=JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"payu_money",""));

        openPayuViewNative(postDataJson.payment.otherPaymentPrice, postDataJson.orderId,app_id, billData.name, "lastName" ,billData.email,billData.phone,merchantId,saltKey,site_url,"ecom",true)

    }else if(paymentMethod == "payfast") {
        var payTypeObj= $$(paymentTypeObjectval).parent();
        console.log("ffffffffffffffffffffff          "+JSON.stringify(payTypeObj))
        var merchantId=payTypeObj.attr("data-payfastmerId");
        var merchantKey=payTypeObj.attr("data-merchantKey");
        var postDataJson=JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"payfast",""));
        for(var i=0; i<postDataJson.productDetails.length; i++){
            productDetailName = postDataJson.productDetails[i].name;
            productDetailDescrip = postDataJson.productDetails[i].description;
        }
        console.log("fgbfngdfngfndgbndf  "+ JSON.stringify(postDataJson))

        var totalProductDetail={"orderId": postDataJson.orderId,"currency":postDataJson.currency,"totalAmount":postDataJson.payment.otherPaymentPrice,"merchantId":merchantId,"merchantKey":merchantKey,"userId":localStorage.getItem("userId"),"userName":postDataJson.userData.name,"userEmail":postDataJson.userData.email,"productDetailName":productDetailName,"productDetailDescrip":productDetailDescrip};

        // openPayFastPayment(billingData,totalProductDetail);
        openPayFastViewForPayment(billingDataForGloble,totalProductDetail,true);

    }else if(paymentMethod == "hubtel") {
        var postDataJson=JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"hubtel",""));
        gethubtelpaymentdata(postDataJson.payment.otherPaymentPrice);

    }

}

var sessionTokenVelocity;
function ewallet_tokenizeVelocityform() {

    var postDataJson = JSON.parse(ewallet_createJsonFormEcomOrder(billingDataForGloble,shippingDataForGloble,paymentTypeObjectval,productListForGloble,"volecity",""));
    var cardNo = document.getElementById("cnumberVel").value;
    var expMonth = document.getElementById("ExpairyMonthVel").value;
    var expYear = document.getElementById("ExpairyYearVel").value;
    var cvvVel = document.getElementById("cvvCodeVel").value;
    var cardHolderVel = document.getElementById("cHolderVel").value;
    var element = document.getElementById("velocityCardType");
     token = postDataJson.shippingData.identitytoken;



    var cardTypeValue = element.value;

    var card = {
    CardholderName: cardHolderVel,
    cardtype: cardTypeValue,
    number: cardNo,
    cvc: cvvVel,
    expMonth: expMonth,
    expYear: expYear
    };

    var address = {}

    address["Street"] = postDataJson.shippingData.address;
    address["PostalCode"] = postDataJson.shippingData.zip;
    address["State"] = postDataJson.shippingData.state;
    address["StateProvince"] ='';
    address["Country"] =  postDataJson.shippingData.country;

    var transctionData =
    {
    Amount: parseFloat(postDataJson.payment.otherPaymentPrice),
    CurrencyCode:postDataJson.currency,
        EmployeeId : '13',
    IndustryType:'Ecommerce',
        order_id : postDataJson.orderId

    }
    orderIdForGloble = transctionData.order_id;
    console.log("Transaction Data "+ transctionData);

    Velocity.tokenizeForm(transctionData,sessionTokenVelocity, card, address, postDataJson.shippingData.applicationprofileid
, postDataJson.shippingData.merchantprofileid
, postDataJson.shippingData.workflowid
, velocityResponseHandlerEcom);
    Appyscript.hideIndicator();

}

function ewallet_trasactionStatusPage(data) {
    var stausresponse = data;
    orderIdForGloble = "";
    orderId='';
    localStorage.setItem("productList","");
    productList = {"list":[]};
    stausresponse.page = "ecom";
    stausresponse.pageTitle = pageData.pageTitle;

    Appyscript.navigateToPaymentStatus(stausresponse)

}


function ewallet_createJsonFormEcomOrder(billingData,shippingData,paymentTypeObject,productList, paymentMethodKey,paymentId,customer_id, sessionToken)
{
    var totalAmount= parseFloat(productList.grandtaotal);
    totalAmount=totalAmount.toFixed(2);
    var deliveryAmount=parseFloat(productList.shippingPrice!=null?productList.shippingPrice:0.0).toFixed(2);
    var discountAmount=parseFloat(productList.discountPrice!=null?productList.discountPrice:0.0).toFixed(2);
    var taxAmount=parseFloat(productList.taxPrice!=null?productList.taxPrice:0.0).toFixed(2);
    var currency=productList.currency;
    var coupandiscountType=productList.coupandiscountType;
    var coupandiscount=parseFloat(productList.coupandiscount!=null?productList.coupandiscount:0.0).toFixed(2);  //coupandiscount
    var subtotal=parseFloat(productList.subtaotal!=null?productList.subtaotal:0.0).toFixed(2)
    var miscTax= productList.miscTaxDup;
    var productDetails=[];
    var deliveryDatePicker = $$("#date_deliveryDate").val();
    var timePicker = $$("#date_deliverytime").val();
    var finaltimePicker = deliveryDatePicker + " " + timePicker;
    var productDataFromList=productList.list
    if(productDataFromList.length>0)
    {
        for(var i=0;i<productDataFromList.length;i++)
        {
            var custom_option=""
            var productData=productDataFromList[i];
            if(typeof productData.customoptionsdata!== "undefined")
            {
                custom_option=productData.customoptionsdata[0];
            }

            productDetails.push({"productId":productData.productId,"name":productData.productName,"price":productData.price,
                                "qty":productData.orderQuantity,"description":productData.description,"currency":productData.currency,"custom_option":productData.customoptionsString});
        }
        //console.log("custom_option  productList:"+JSON.stringify(productDetails));
    }


    if(pageData.generalinformation.allow_user_select_delivery_date=="0")
        {
        finaltimePicker="";
        }
        else
        {
//        if(deliveryDatePicker=="" && timePicker=="")
//if(timeFlag == '0')
            if(document.getElementById('show_date_time').checked == false)
            {
            finaltimePicker="";
            }
        }

    var newdate=new Date().getTime();
    //var orderId='ap'+newdate;
    var discountInfo = '{"discount":"'+discountAmount+'","delivery":"'+deliveryAmount+'","tax":"'+
    taxAmount+'","total":"'+totalAmount+'","coupon":"'+coupandiscount+'","tip":"0"}';

    var orderdate = Math.round(+new Date()/1000);
    var timezon=getTimeZoneEcomm();
    var    localtimezone="GMT"+timezon;

    var paymentMethodLabel;
    /*if(paymentMethodKey=='cod')
    {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelcod");
    }
    else if(paymentMethodKey=='ccPhone')
    {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelcc_phone");
    }
    else if(paymentMethodKey=='paypal_express')
    {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelpaypal");
    }
    else if(paymentMethodKey=='cc')
    {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelcc");
    }
    else if(paymentMethodKey=='stripe')
    {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelstripe");
    }
    else if(paymentMethodKey=='payu_money')
    {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelpayu_money");
    }
    else if(paymentMethodKey=='payfast')
    {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelpayfast");
    }
    else if(paymentMethodKey=='hubtel')
    {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelhubtel");

    }else if(paymentMethodKey == 'ewallet') {
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelEwallet");

    }else if(paymentMethodKey=='mercadopago'){
        paymentMethodLabel= localStorage.getItem("ecomMethodLabelmercado");  //ecomMethodLabelmercado

    }else if (paymentMethodKey == 'volecity') {
        paymentMethodLabel = localStorage.getItem("ecomMethodLabelVelocity");

    }else if (paymentMethodKey == 'authorizenet') {
        paymentMethodLabel = localStorage.getItem("ecomMethodLabelAuthorize");
    }else if (paymentMethodKey == 'braintree') {
        paymentMethodLabel = localStorage.getItem("ecomMethodLabelBrainTree");
    }

    if(paymentMethodKey=="stripe"||paymentMethodKey=="cc")
    {

        var savecardcheck;

        if(document.getElementById('savecardcheck'))
        {
            savecardcheck = document.getElementById('savecardcheck').checked
        }
        var creditCardJSON = Appyscript.formToJSON('#creditCardThroughStripeCvv');
        var cvv_code = creditCardJSON.cvvCode;



        if(savecardcheck)
        {

            if(isNaN(cvv_code) || cvv_code.length < 3)
            {
                Appyscript.hideIndicator();
                Appyscript.alert(AppyTemplate.global.pageLanguageSetting.please_enter_valid_cvv_code,appnameglobal_allpages);
                return ;
            }
            else
            {
                cvvCode= cvv_code;
            }


        }

        var is_card_save = 0;
        var issavecardcheck;
        if(document.getElementById('issavecardcheck'))
        {
            issavecardcheck = document.getElementById('issavecardcheck').checked
        }
        if(issavecardcheck)
        {
            is_card_save = 1;
        }
        if(PaymentWithSaveCardcheck)
        {
            is_card_save = 1;
        }


        if(paymentId.trim() !="")
        {
            var ewalletStatus = (ewalletModel.getewalletAvailableStatus() == true ||ewalletModel.getewalletAvailableStatus() == "true") ? 1 : 0;
            var remainingPrice = (parseFloat(totalAmount) - parseFloat(ewalletModel.getbalanceAmount())).toFixed(2)

            payment='{"paymentId":"'+paymentId+'","paymentMethod":"'+paymentMethodKey+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'","paymentMethodLabel":"'+paymentMethodLabel+'","paymentCustomerId":"'+customer_id+'" ,"cvv":"'+cvvCode+'","is_card_save":"'+is_card_save+'","ewalletPayment":"'+ewalletStatus+'","ewalletPaymentPrice":"'+ewalletModel.getbalanceAmount()+'","otherPaymentPrice":"'+remainingPrice+'","deliveryPickupTime":"' + finaltimePicker + '"}';
        }
        else
        {
            if(paymentMethodKey=='stripe')
            {
                    var ewalletStatus = (ewalletModel.getewalletAvailableStatus() == true ||ewalletModel.getewalletAvailableStatus() == "true") ? 1 : 0;
                    var remainingPrice = (parseFloat(totalAmount) - parseFloat(ewalletModel.getbalanceAmount())).toFixed(2)

                    payment='{"paymentId":"","paymentMethod":"'+paymentMethodKey+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'","paymentMethodLabel":"'+paymentMethodLabel+'","ewalletPayment":"'+ewalletStatus+'","ewalletPaymentPrice":"'+ewalletModel.getbalanceAmount()+'","otherPaymentPrice":"'+remainingPrice+'","deliveryPickupTime":"' + finaltimePicker + '"}';


            }else{
                payment='{"paymentId":"","paymentMethod":"'+paymentMethodKey+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'","paymentMethodLabel":"'+paymentMethodLabel+'","deliveryPickupTime":"' + finaltimePicker + '"}';
            }
        }
    }
    else
    {

        if(paymentMethodKey=='mercadopago' || paymentMethodKey=='hubtel' || paymentMethodKey == 'volecity' || paymentMethodKey=='cod' || paymentMethodKey=='ccPhone' || paymentMethodKey=='paypal_express' || paymentMethodKey=='payu_money' ||paymentMethodKey=='payfast' || paymentMethodKey=='authorizenet')
        {
            var usingewalletMoney = true;
            if(usingewalletMoney) {
                var ewalletStatus = (ewalletModel.getewalletAvailableStatus() == true ||ewalletModel.getewalletAvailableStatus() == "true") ? 1 : 0;
                var remainingPrice = (parseFloat(totalAmount) - parseFloat(ewalletModel.getbalanceAmount())).toFixed(2)

                payment='{"paymentId":"","paymentMethod":"'+paymentMethodKey+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'","paymentMethodLabel":"'+paymentMethodLabel+'","ewalletPayment":"'+ewalletStatus+'","ewalletPaymentPrice":"'+ewalletModel.getbalanceAmount()+'","otherPaymentPrice":"'+remainingPrice+'","deliveryPickupTime":"' + finaltimePicker + '"}';

            }else {
            payment='{"paymentId":"","paymentMethod":"'+paymentMethodKey+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'","paymentMethodLabel":"'+paymentMethodLabel+'","deliveryPickupTime":"' + finaltimePicker + '"}';

            }


        }else {
           payment='{"paymentId":"","paymentMethod":"'+paymentMethodKey+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'","paymentMethodLabel":"'+paymentMethodLabel+'","deliveryPickupTime":"' + finaltimePicker + '"}';

        }

    }*/
    var usingewalletMoney = true;
    if(usingewalletMoney) {
        var ewalletStatus = (ewalletModel.getewalletAvailableStatus() == true ||ewalletModel.getewalletAvailableStatus() == "true") ? 1 : 0;
        var remainingPrice = (parseFloat(totalAmount) - parseFloat(ewalletModel.getbalanceAmount())).toFixed(2);
        ewalletRemainingPrice = remainingPrice;

        payment='{"paymentId":"","paymentMethod":"'+paymentMethodKeyGlobal+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'","paymentMethodLabel":"'+paymentMethodLableGlobal+'","ewalletPayment":"'+ewalletStatus+'","ewalletPaymentPrice":"'+ewalletModel.getbalanceAmount()+'","otherPaymentPrice":"'+remainingPrice+'","deliveryPickupTime":"' + finaltimePicker + '"}';

    }else {
        payment='{"paymentId":"","paymentMethod":"'+paymentMethodKeyGlobal+'","paymentStatus":"processing", "orderDate":"'+orderdate+'","gmtTime":"'+localtimezone+'","paymentMethodLabel":"'+paymentMethodLableGlobal+'","deliveryPickupTime":"' + finaltimePicker + '"}';

    }


    var id=localStorage.getItem("userId");
    var name=localStorage.getItem("username");
    var email=localStorage.getItem("email");
    var phone=localStorage.getItem("phone");

    var userData='{"id":"'+id+'","name":"'+name+'","email":"'+email+'","phone":"'+phone+'"}';

    var instJson = Appyscript.formToJSON('#instructions');
    var instructionsText=instJson.instructionsText;
    instructionsText=instructionsText!=null?instructionsText:"";
    var payTypeObj= $$(paymentTypeObject).parent();
    var sellerPhoneNo=payTypeObj.attr("data-phoneNo");

    if(orderIdForGloble!=null && orderIdForGloble!="")
    {
        orderId=orderIdForGloble;
    }

    var postData= '{"method":"ecommOrder","appId":"'+app_id+'","lang":"'+data.appData.lang+'","appName":"'+data.appData.appName+
        '","appAdminName":"'+((pageData.ecommerceName != undefined && pageData.ecommerceName != null && pageData.ecommerceName.length > 0) ? pageData.ecommerceName :"Store")+'","userData":'+userData+',"orderId":"'+orderId+
        '","discount":'+discountInfo+',"productDetails":'+JSON.stringify(productDetails)+',"payment":'+payment+
        ',"currency":"'+currency+'","billingData":'+billingData+',"shippingData":'+shippingData+
        ',"pickupComment":"'+instructionsText.replace(/\r/g, "").replace(/\n/g, "")+'","miscTax":'+JSON.stringify(miscTax)+'}';
    return postData;
}


function submitOrderByAuthorize(billingData,shippingData,paymentTypeObject,productList, creditCardDetail){
    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "authorizenet");
    var shipData = JSON.parse(shippingData);
    var credentials ="", apiLoginKey="", clientKey ="", transactionKey="", isTestAccount="";
          credentials = $$(paymentTypeObject).parent();
          apiLoginKey = credentials.attr("data-apiLogin-Key");
          clientKey = credentials.attr("data-client-key");
          transactionKey = credentials.attr("data-transaction-key");
          isTestAccount = credentials.attr("data-test-account");

         var cardDetails = JSON.parse(creditCardDetail);

     if (isOnline()) {
            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData, textStatus) {
                    if (textStatus == 200) {
                        var jsonObj = JSON.parse(jsonData);
                        var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                        if (success.toLowerCase() == "success") {

                             AppyPieNative.payViaAuthorize(clientKey, apiLoginKey, cardDetails.number, cardDetails.expireMonth, cardDetails.expireYear, cardDetails.cvv2, cardDetails.type, transactionKey, shipData.totalAmount, isTestAccount,"ecomm");

                        }
                        else if (success.toLowerCase() == "failure") {

                            orderIdForGloble='';
                             orderId='';
                            $$.get("pages/error.html", function (template) {
                                var compiledTemplate = AppyTemplate.compile(template);
                                var html = compiledTemplate("");
                                mainView.router.load({ content: html, animatePages: true });
                            });
                        }
                        else {
                            orderIdForGloble='';
                            orderId='';
                            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                            Appyscript.hideIndicator();
                        }
                    }
                    else {
                        orderIdForGloble='';
                        orderId='';
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                },
                error: function (error) {
                    orderIdForGloble='';
                    orderId='';
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });
        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
}


function sendDataValue(descriptor, dataValue, transactionKey, apiLoginID, cardType, amount, isTestAccount){
var user_id=localStorage.getItem("userId");
var postData = '{"pageType":"ecom","appId":"'+app_id+'","userEmail":"'+useremailid+'","orderId":"'+orderId+'","countryCode":"'+AppyTemplate.global.currentcountry+'","currencyCode":"'+productList.currency+'","productId":"'+productList.list[0].productId+'","userId":"'+user_id+'","cardType":"'+cardType+'","description":"'+productList.list[0].productName+'","dataDescriptor":"'+descriptor+'","dataValue":"'+dataValue+'","transactionKey":"'+transactionKey+'","amount":"'+amount+'","appLoginID":"'+apiLoginID+'", "payment_mode":"'+isTestAccount+'"}';
var authorizeUrl ="https://snappy.appypie.com/paypalmobile/authorizenet-payment";
//var authorizeUrl ="https://angularml.pbodev.info/paypalmobile/authorizenet-payment";/* for test */
if (isOnline()) {
            $$.ajax({
                url: authorizeUrl ,
                data: postData,
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData, textStatus) {
                console.log("AuthorizePayment", ""+jsonData)
                var a = JSON.parse(jsonData)
                if(a.status==="success"){
                   $$.get("pages/ecommerce-thanks.html", function (template) {
                        orderIdForGloble = '';
                        orderId = '';
                        var compiledTemplate = AppyTemplate.compile(template);
                        var html = compiledTemplate("");
                        mainView.router.load({ content: html, animatePages: true });
                    });
                    }else{
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                    }

                },
                error: function (error) {
                   $$.get("pages/error.html", function (template) {
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate("");
                    mainView.router.load({ content: html, animatePages: true });
                });
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });
        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
}

function onErrorAuthorize(errorCode, errorMessage){
Appyscript.hideIndicator();
Appyscript.alert(errorMessage, data.appData.appName)
}

function opencalenderecomm(){
  var _getDate=(new Date()).getDate();
    Appyscript.calendar({
                  input: '#date_deliveryDate',
                  value: [new Date().setDate(_getDate + 1)],
                  openIn: 'customModal',
                  header: false,
                  footer: true,
                  disabled: [{
                      from: new Date(1950,1,1),
                      to: new Date().setDate(_getDate)
                  }],
                  monthNames:data.monthLang,
                  dayNamesShort: [data.languageSetting.Sun,data.languageSetting.Mon,data.languageSetting.Tue,data.languageSetting.Wed,data.languageSetting.Thu,data.languageSetting.Fri,data.languageSetting.Sat],
                  dateFormat: 'MM dd yyyy'
        });
}


// Appyscript.onPageInit('ecommerce-AccountDetails', function(page)
//   {
////        opencalenderecomm();
////        openTime();
////timeFlag = '0';
////           if(pageData.generalinformation.allow_user_select_delivery_date == "1")
////                           {
////                           if(timeFlag == '1'){
////////                           $$(".showDateTime").show();
////////                           $$(".dateTimePicker").show();
////                           opencalenderecomm();
////                           openTime();
////                           }
////                           else{
////                           $$(".dateTimePicker").hide();
////                           }
////                           }
////                           else {
////                           $$(".showDateTime").hide();
////                           $$(".dateTimePicker").hide();
////                           }
//document.getElementById('show_date_time').checked = false;
//                           if(pageData.generalinformation.allow_user_select_delivery_date == "1")
//                            {
//
//                           if(document.getElementById('show_date_time').checked){
//                              opencalenderecomm();
//                              openTime();
//                           }
//                           else{
//                             $$(".dateTimePicker").hide();
//                           }
//                           }
//                          else {
//                          $$(".showDateTime").hide();
//                          $$(".dateTimePicker").hide();
//                          }
//   });


function formatDate_ecomm(date){
      var today = new Date(date);
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      if(dd<10){
      dd='0'+dd
      }
      if(mm<10){
      mm='0'+mm
      }
      return mm+'/'+dd+'/'+yyyy;
}


//function opencalenderecomm(){
//  var _getDate=(new Date()).getDate();
//  var _getTime=(new Date()).getTime()
//  var _getDeliveryDate = _getDate + _getTime
//    Appyscript.calendar({
//                  input: '#date_deliveryDate',
//                  value: [new Date()],
//                  disabled: [{
//                      from: new Date(1950,1,1),
//                      to: new Date().setDate(_getDeliveryDate-parseInt(1))
//                  }],
//                  dateFormat: 'M dd yyyy'
//        });
//}


function openTime() {
 var deliveryTimeVal=$$("#date_deliverytime").val();
 intializeTimePicker("date_deliverytime","24_hour",deliveryTimeVal);
}

function submitOrderByBrainTree(billingData,shippingData,paymentTypeObject,productList, creditCardDetail){
    var postData = createJsonFormEcomOrder(billingData, shippingData, paymentTypeObject, productList, "braintree");
    var shipData = JSON.parse(shippingData);
    var cardDetails = JSON.parse(creditCardDetail);
     if (isOnline()) {
            $$.ajax({
                url: baseurl,
                data: Appyscript.validateJSONData(postData),
                type: "post",
                //321 headers: {'accessToken': deviceEncryptedToken},
                async: true,
                success: function (jsonData, textStatus) {
                    if (textStatus == 200) {
                        var jsonObj = JSON.parse(jsonData);
                        var success = typeof jsonObj.status !== "undefined" ? (jsonObj.status != null ? jsonObj.status : "") : "";
                        if (success.toLowerCase() == "success") {
                             Appyscript.getClientToken(creditCardDetail, billingData);
                        }
                        else if (success.toLowerCase() == "failure") {
                            orderIdForGloble='';
                             orderId='';
                            $$.get("pages/error.html", function (template) {
                                var compiledTemplate = AppyTemplate.compile(template);
                                var html = compiledTemplate("");
                                mainView.router.load({ content: html, animatePages: true });
                            });
                        }
                        else {
                            orderIdForGloble='';
                            orderId='';
                            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                            Appyscript.hideIndicator();
                        }
                    }
                    else {
                        orderIdForGloble='';
                        orderId='';
                        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                        Appyscript.hideIndicator();
                    }
                },
                error: function (error) {
                    orderIdForGloble='';
                    orderId='';
                    Appyscript.hideIndicator();
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            });
        }
        else {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
        }
}


Appyscript.getClientToken = function(cardDetails, billingData){
var postData = '{"method":"accessTokenBraintree","appId":"' + app_id + '"}';
Appyscript.showIndicator();
$$.ajax({
    type: "post",
    url: baseurl,
    data: Appyscript.validateJSONData(postData),
    //321 headers: {'accessToken': deviceEncryptedToken},
    success: function (data) {
    var token = (JSON.parse(data)).token;
    console.log("BrainTree Client Token : " + token);
   if(cardDetails!==null)
    AppyPieNative.initializeBraintree(token, cardDetails, billingData);
    else
    Appyscript.hideIndicator();
    },
    error: function (data) {
        Appyscript.hideIndicator();
    }
});
}

Appyscript.initiatePayment = function(payment_nonce){
//var url = "https://angularml.pbodev.info/paypalmobile/brain-tree-payment/"; /*forTest*/
var url = "https://snappy.appypie.com/paypalmobile/brain-tree-payment/";
    if (isOnline()) {
        Appyscript.showIndicator();
        var jsonPostecom = {"pageType":"ecom","appId": app_id,"orderId":orderId,"payment_method_nonce":payment_nonce};
        $$.ajax({
            url: url,
            data: Appyscript.validateJSONData(JSON.stringify(jsonPostecom)),
            type: "post",
            //321 headers: {'accessToken': deviceEncryptedToken},
            async: true,
            success: function (jsonData, textStatus) {
               console.log("Payment Nonce Response : " + jsonData)
               if((JSON.parse(jsonData)).status==="success"){
               $$.get("pages/ecommerce-thanks.html", function (template) {
                    orderIdForGloble = '';
                    orderId = '';
                    var compiledTemplate = AppyTemplate.compile(template);
                    var html = compiledTemplate("");
                    mainView.router.load({ content: html, animatePages: true });
               });
               }else{
               Appyscript.hideIndicator();
               Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
               }
            }, error: function (error) {
                $$.get("pages/error.html", function (template) {
                  var compiledTemplate = AppyTemplate.compile(template);
                  var html = compiledTemplate("");
                  mainView.router.load({ content: html, animatePages: true });
                });
            }
        });
    }
    else {
        Appyscript.hideIndicator();
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }
}
