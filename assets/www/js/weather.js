Appyscript.openWeather = function(headerTitle){
    $$.get("pages/weather.html", function (template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate({"name":headerTitle});
           mainView.router.load({content: html, animatePages: true});
           setTimeout(function(){
                showPositionsetWeatherAddress();
           },0)
       })
}

function showPositionsetWeatherAddress()
{
    var lat1=localStorage.getItem("localLatitude") || "";
    var lon1=localStorage.getItem("localLongitude") || "" ;
    if(lat1 !== "" && lon1!==""){
        Appyscript.searchLocation("default",lat1,lon1,"");
    }else{
        Appyscript.buildWeatherHTML();
    }
}

Appyscript.buildWeatherHTML = function () {
    var template='{{#each this}}\
    <li data-woeid="{{index}}" class="swipeout">\
    <div class="swipeout-content"><a href="#" class="item-content item-link">\
    <div onclick="openWeatherDetailsPage(this,{{latitude}},{{longitude}})" data-city={{index}} data-info={{fullAddress}} class="item-inner">\
    <div class="item-title">\
    <div class="city">{{index}}</div>\
    <div class="country">{{fullAddress}}</div>\
    </div>\
    </div></a></div>\
    <div class="swipeout-actions-right"><a href="#" data-confirm="Are you want to sure remove this city?" data-confirmTitle="weather" class="swipeout-delete">Delete</a></div>\
    </li>{{/each}}';

    var weatherData = localStorage.getItem("weather_"+pageIdentifie);;
    if (!weatherData) return;
    $$('#stateList').html('');

    Appyscript.homeItemsTemplate=AppyTemplate.compile(template)
    weatherData = JSON.parse(weatherData);
    var html = Appyscript.homeItemsTemplate(weatherData);
    $$('#stateList').html(html);
};

Appyscript.searchLocation = function (flag ,latitude,longitude,addressLocation) {
        let weatherCountry="",weatherCity="",weatherState="";
        let findPincodeArr;
        let placesArray = localStorage.getItem("weather_"+pageIdentifie) || "";
        let parsed_PlaceData = [];
        var geocoder = geocoder = new google.maps.Geocoder();

        var searchString ="";
        if(flag=="default"){
            searchString= {'latLng': new google.maps.LatLng(latitude,longitude)};
        }else{
            searchString= { 'address': addressLocation}
        }

        geocoder.geocode(searchString, function(results, status) {
                         if (status == google.maps.GeocoderStatus.OK) {
                             if (results[0]) {
                             findPincodeArr = results[0].address_components;
                                for (var key = 0; key < findPincodeArr.length; key++) {

                                    if (findPincodeArr[key].types.indexOf("country") > -1 && findPincodeArr[key].types.indexOf("political") > -1) {
                                        weatherCountry = ", "+findPincodeArr[key].long_name;
                                    }

                                    if (findPincodeArr[key].types.indexOf("locality")  > -1 && findPincodeArr[key].types.indexOf("political")  > -1) {
                                        weatherCity = findPincodeArr[key].long_name;
                                    }

                                    if (findPincodeArr[key].types.indexOf("administrative_area_level_1") > -1 && findPincodeArr[key].types.indexOf("political") > -1) {
                                        weatherState = findPincodeArr[key].long_name;
                                    }
                                }

                                if (placesArray !== "")
                                {
                                    parsed_PlaceData = JSON.parse(placesArray)
                                }
                                else{
                                    parsed_PlaceData = [];
                                }

                                let tempArr= parsed_PlaceData.filter(function(v){
                                        return v.index==weatherCity
                                 })

                                 hoteldetaillat=results[0].geometry.location.lat()
                                       hoteldetaillong=results[0].geometry.location.lng()
                                if(tempArr.length===0){
                                    if(weatherCity.trim()!==""){
                                      parsed_PlaceData.push({
                                          index: weatherCity,
                                          fullAddress: weatherState+ weatherCountry,
                                          latitude: flag =="default"?latitude : results[0].geometry.location.lat(),
                                          longitude:flag =="default"?longitude:results[0].geometry.location.lng()
                                      });
                                      localStorage.setItem("weather_"+pageIdentifie,JSON.stringify(parsed_PlaceData))
                                      }
                                      Appyscript.buildWeatherHTML();
                                 }else{
                                      Appyscript.buildWeatherHTML();
                                 }
                             }
                          }else{
                              Appyscript.hideIndicator();
                              apiname = "Google";
                              serviceFailedNotify(status, apiname, 1);
                              Appyscript.alert("You must enable Billing on the Google Cloud Project", appnameglobal_allpages);
                          }
                     });
}

function deletePlace(){
     Appyscript.con('Are you want to sure remove this city?','Remove weather city','Sure',canclebtn,callbackOk,callbackCancel)
          var woeid = $$(this).attr('data-woeid');
          // Update Places
          if (!localStorage.getItem("weather_"+pageIdentifie)) return;
            var places = JSON.parse(localStorage.getItem("weather_"+pageIdentifie));
            places = places.filter(function(v){
                v.index !== woeid
            })
          localStorage.setItem("weather_"+pageIdentifie,JSON.stringify(places));
}

function searchWeatherLocation() {
    var search = $("#search_Location").val();
    var api = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + encodeURIComponent(search) + '&key=' + data.googlePlacesApiKey;
    Appyscript.showIndicator();
    $$.ajax({
        type: 'GET',
        url: api,
        dataType: 'json',
        success: function(data) {
            Appyscript.hideIndicator();
            if (data.status != "REQUEST_DENIED") {
                if (data.predictions.length > 0) {
                    var iCounter;
                    var predictionData = data.predictions;
                    // List multiple returns
                    var htmlData = "";
                    if (data.predictions.length > 1) {
                        for (iCounter = 0; iCounter < predictionData.length; iCounter++) {
                            htmlData += '<li onClick="getLatLngFromAddressWeather(this);"  class="close-popup cityName">' + predictionData[iCounter].description + '</span></li>';
                        }
                        $("#div_Location").html(htmlData);
                    } else {
                        $("#div_Location").html("");
                    }
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
            apiname = "Google";
            var flag = 0;
            serviceFailedNotify(data.status, apiname, flag);
        }
    });
}

function getLatLngFromAddressWeather(objectRef)
  {
        objectRef= ($(objectRef).html()).trim();
        Appyscript.searchLocation("search","","",objectRef);
  }


 function openWeatherDetailsPage(objectReference,latitude,longitude){
 //https://api.darksky.net/forecast/"+get_apiKey+"/"+latitude+","+longitude+"?lang="+data.appData.lang+"&exclude=currently,flags
   let get_apiKey= getRandomIntWeatherKey();
    var weatherUrl;
        if(pageData.list[barcodeResultPageIndex].weatherType == "f"){
            weatherUrl = "https://api.darksky.net/forecast/"+get_apiKey+"/"+latitude+","+longitude+"?lang="+data.appData.lang+"&exclude=currently,flags"
        }
        else{
           weatherUrl = "https://api.darksky.net/forecast/"+get_apiKey+"/"+latitude+","+longitude+"?lang="+data.appData.lang+"&units=si&exclude=currently,flags"
        }
    Appyscript.showIndicator();
        $$.ajax({
            type: 'GET',
            url: weatherUrl,
            dataType: 'json',
            success: function(responseData) {
                Appyscript.hideIndicator();

                if(responseData.hourly){

                var dataTemplate ={
                    currentTemp :responseData.hourly.data[0].apparentTemperature,
                    currentSummary: responseData.hourly.data[0].summary,
                    forecastDaily: responseData.daily.data,
                    address: $(objectReference).attr("data-city")
                };
                $$.get('pages/weather-details.html', function (template) {
                     var compiledTemplate = AppyTemplate.compile(template);
                     var html = compiledTemplate(dataTemplate);
                      mainView.router.load({
                                content: html,
                                animatePages: true
                                });
                 });
              }else{
                    Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
                }
            },
            error: function(data) {
                Appyscript.hideIndicator();
                Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
            }
        });

 }

 AppyTemplate.registerHelper('dayOfWeek', function (date) {
      date = new Date(date*1000);
      var days = [data.languageSetting.Sunday ,data.languageSetting.Monday ,data.languageSetting.Tuesday ,data.languageSetting.Wednesday, data.languageSetting.Thursday ,data.languageSetting.Friday, data.languageSetting.Saturday];
      return days[date.getDay()];
  });


function getRandomIntWeatherKey() {
    let min=0;
    let max=4;
    let array_API = ["ff664c37ad9455bc7fc1032398afedb7","de7973450a0d676ff74d79a470dd8023","a2c183a593e2934091bf22a20aa3d5fe","f30cb689df1f69a74fa68d6eee5ab256"]
    return array_API[Math.floor(Math.random() * (max - min)) + min] //The maximum is exclusive and the minimum is inclusive
}

//
//Appyscript.updateWeatherData = function (callback) {
//    // alert("ok");
//    var woeids = [];
//    var weatherPlaces=localStorage.getItem("weather"+pageIdentifie) || "" ;
//    if (weatherPlaces ===0){
//        return;
//    }
//
//    weatherPlaces = JSON.parse(weatherPlaces);
//    if (places.length === 0) {
//        localStorage.setItem("weatherData"+pageIdentifie, JSON.stringify([]));
//    }
//    if(!isOnline()){
//        Appyscript.hideIndicator();
//        Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
//    }
//    for (var i = 0; i < places.length; i++) {
//        woeids.push(places[i].woeid);
//    }
//    var query = encodeURIComponent('select * from weather.forecast where woeid in (' + JSON.stringify(woeids).replace('[', '').replace(']', '') + ') and u="'+localStorage.weatherType+'"');
//    var q = 'https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json';
//    $$.get(q, function (data) {
//           var weatherData = [];
//           data = JSON.parse(data);
//           if (!data.query || !data.query.results) return;
//           var places = data.query.results.channel;
//           var place;
//           if ($$.isArray(places)) {
//           for (var i = 0; i < places.length; i++) {
//           place = places[i];
//           weatherData.push({
//                            city: place.location.city,
//                            country: place.location.country,
//                            region: place.location.region,
//                            humidity: place.atmosphere.humidity,
//                            pressure: place.atmosphere.pressure,
//                            sunrise: place.astronomy.sunrise,
//                            sunset: place.astronomy.sunset,
//                            wind: place.wind,
//                            condition: place.item.condition,
//                            forecast: place.item.forecast,
//                            lat: place.item.lat,
//                            long: place.item.long,
//                            woeid: woeids[i]
//                            });
//           }
//           }
//           else {
//           place = places;
//           weatherData.push({
//                            city: place.location.city,
//                            country: place.location.country,
//                            region: place.location.region,
//                            humidity: place.atmosphere.humidity,
//                            pressure: place.atmosphere.pressure,
//                            sunrise: place.astronomy.sunrise,
//                            sunset: place.astronomy.sunset,
//                            wind: place.wind,
//                            condition: place.item.condition,
//                            forecast: place.item.forecast,
//                            lat: place.item.lat,
//                            long: place.item.long,
//                            woeid: woeids[0]
//                            });
//           }
//           localStorage.setItem("weatherData"+pageIdentifie,JSON.stringify(weatherData));
//           //localStorage.weatherData = JSON.stringify(weatherData);
//           if (callback) callback();
//           });
//
//};



                      // open weather details page
//                  $$(document).on('click', 'a.item-link', function (e) {
//                          var woeid = $$(this).attr('data-woeid');
//                          var item;
//                          var weatherData = JSON.parse(localStorage.getItem("weatherData"+pageIdentifie));
//                          for (var i = 0; i < weatherData.length; i++) {
//                          if (weatherData[i].woeid === woeid) item = weatherData[i];
//                          }
//                          console.log(item);
//                          $$.get('pages/weather-details.html', function (template) {
//                                 item.weatherType=localStorage.weatherType.toUpperCase();
//                                 var compiledTemplate = AppyTemplate.compile(template);
//                                 var html = compiledTemplate(item);
//                                 mainView.loadContent(html);
//                                 });
//                      });
//

//
//
//                      // Delete place



