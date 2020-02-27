Appyscript.parseDBData = function(loadmore){

    var url = pageData.databaseUrl;
    var urlname = pageData.databaseUrlTableName;
    if(url.charAt(url.length- 1)!="/")
    {
       url+="/";
    }
 Appyscript.requestDBPage(url+urlname+".json",loadmore);
  // Appyscript.makeHttpRequest("https://pelu-ram.firebaseio.com/Krishna_Mobile_Development.json?print=pretty",'',Appyscript.loadDBPage,'get');
}

Appyscript.openDblink=function(pagelink)
{
    Appyscript.openWebView(pagelink,pageData.pageTitle);
}


Appyscript.requestDBPage=function(requestPath,loadmore)
{
            if(isOnline())
            {

              if(pageData.databaseUrlSecretKey!="" && pageData.databaseUrlSecretKey != undefined){
                requestPath = requestPath +"?auth="+pageData.databaseUrlSecretKey
               }

            Appyscript.showIndicator();
            $$.ajax({
            url: requestPath,
            type: "get",
            async: true,
            data:'',
            async: true,
            contentType: "text/json",
            success: function(data,textStatus){
             Appyscript.loadDBPage(data,textStatus,loadmore);
            // localStorage.setItem("jsonD", data);
            },
            error: function(error) {
                Appyscript.hideIndicator();
                if (error.status == 401) {
                    Appyscript.alert(data.languageSetting.firebase_fail_msg, appnameglobal_allpages);
                    apiname = "Firebase";
                    serviceFailedNotify(error.statusText, apiname, 1);
                } else {
                    Appyscript.alert(data.languageSetting.firebase_fail_msg, appnameglobal_allpages);
                    apiname = "Firebase";
                    serviceFailedNotify(error.statusText, apiname, 1);
                }
            }
            });

            }
            else
            {
              Appyscript.alert(internetconnectionmessage,appnameglobal_allpages);
            }
 }


var appypieDB;
var dbcount=400;
var dblength2;
Appyscript.loadDBPage=function(jsonD, textStatus,loadmore)
{
if(jsonD!=null && jsonD)
{
    appypieDB = {
        "pageTitle":"Database",
		"list":[]
	};
	if(loadmore !="loadmore")
	{
	  dbcount=400;
	}
    var datasize = 0;
    appypieDB.pageTitle =	pageData.pageTitle;
    console.log("jsonD jsonD::"+jsonD)
    var jsonD = JSON.parse(jsonD);
    var dblength=Object.keys(jsonD).length;
    dblength2=dblength;
    console.log("jsonD jsonD::"+jsonD);

    $$.each(jsonD, function( key, value) {
        var jsonObj = {"list":[]};
        var imageArray="";
        var image=null;
        var detailImage=null;

        $$.each(value, function( key, valueIn) {
            if(valueIn.identifier == "file" && typeof(valueIn.value) != "undefined" ) {
                if(imageArray=="") {

                    imageArray=encodeURI(valueIn.value);
                    if( image == null && valueIn.showInListing == "1")
                    {
                        image = valueIn.value;

                     }

                     if(detailImage == null)
                       {
                             detailImage = valueIn.value
                       }


                }
                else {

                        imageArray=imageArray+","+encodeURI(valueIn.value);

                            if( image == null && valueIn.showInListing == "1")
                             {
                                image = valueIn.value;

                             }

                             if(detailImage == null)
                                  {
                                        detailImage = valueIn.value
                                  }
                }
            }

            jsonObj.list.push(valueIn);
        });


      //  console.log("image ::"+image);


        if(image!=null)
        {
          jsonObj.image=image;

        }
      datasize++;
   //console.log("detailImage::"+detailImage)
        if(detailImage!=null)
                {
                  jsonObj.detailImage=detailImage;

                }

       if(datasize>dbcount)
         {
          return false;
         }

        jsonObj.imageArray=imageArray;

        //console.log("jsonObj :::"+jsonObj)
        appypieDB.list.push(jsonObj);



    });
   // console.log(appypieDB);
   // localStorage.setItem("appypieDB", JSON.stringify(appypieDB));
    if(loadmore!="loadmore")
    {
    opendbPage(appypieDB,"appypiedb");
    }
   //
   else{

             var  compiledTemplate =AppyTemplate.compile(AppyDbtemplate)
             var html = compiledTemplate(appypieDB);
              mainView.router.reloadContent(html);
             $(mainView.activePage.container).find(".page-content").scrollTop($(mainView.activePage.container).find(".page-content")[0].scrollHeight);

          if(appypieDB.list.length>=dblength)
            {
               $$("#loadmore").hide();
            }

       }

	 setTimeout(function(){
    Appyscript.hideIndicator();
    },1000);
}

}
  var AppyDbtemplate = '';

function opendbPage(pageData ,pageId){
 $$('#pagesCSS').attr('href', 'css/' + pageId + '.css');
    $$.get("pages/appypiedb.html", function (template)
           {
         AppyDbtemplate=template
         var  compiledTemplate =AppyTemplate.compile(AppyDbtemplate)
            var html = compiledTemplate(pageData);
            setTimeout(function(){
            if(dblength2<399)
            {
            $$("#loadmore").hide();
            }
            },500)
           mainView.router.load({content: html, animatePages: true});

           });
}


function loadmoredb(a,dbsize)
{
Appyscript.showIndicator();
 dbcount=dbcount+400;
//Appyscript.loadDBPage(localStorage.getItem("jsonD"),'',"loadmore")

   Appyscript.parseDBData("loadmore")
//   var appypieDBVal =localStorage.getItem("jsonD");
//   appypieDBVal = JSON.parse(appypieDBVal);
//   appypieDBVal=Object.keys(appypieDBVal).map(function(_) { return appypieDBVal[_]; })
//               for(var i=0; i< 5; i++)
//                       {
//                         appypieDBVal.pop(i);
//                       }
//
//  localStorage.setItem("jsonD", JSON.stringify(Object.assign({}, appypieDBVal)));
// setTimeout(function(){
// Appyscript.loadDBPage(localStorage.getItem("jsonD"),'',"loadmore")
// },1000);
}





function checkDBJsonKeyExist(object,value)
{
 if (typeof(object) != "undefined")
 {
   if(value=="DisplayLabel")
   return object.DisplayLabel;
   else
   return object.value;
 }
 else
 {
   return "";
 }
}

Appyscript.onPageAfterAnimation("*",function(){
Appyscript.hideIndicator();

});


var dbSwiper;
Appyscript.onPageInit('appypiedb-DetailsPage',function(page){
	dbSwiper = Appyscript.swiper('.swiper-db', {
		initialSlide:$$(".swiper-db").attr("index")
	});
})
Appyscript.dbSearch=function(e, o){
	if(e.keyCode == 13) {
		if($$(o).val().trim() != "")
		{
			dbSwiper.slideTo($$(o).val());
		}
		//swiper-slide
	}
}



//Appyscript.appypiedbDetail = function(a){
//	appypieDB.activeIndex = a;
//	$$.get("pages/appypiedbDetail.html", function (template) {
//		var compiledTemplate = AppyTemplate.compile(template);
//		var html = compiledTemplate(appypieDB);
//		mainView.router.load({content: html, animatePages: true});
//	});
//}

Appyscript.appypiedbDetail = function(a){
Appyscript.showIndicator();
	appypieDB.activeIndex = a;

    if(appypieDB.list.length > 300){
        var tempObj = Object.assign({}, appypieDB);
        var tempList = []
        tempList.push(tempObj.list[a])
        tempObj.list = tempList

        $$.get("pages/appypiedbDetail.html", function (template) {
            var compiledTemplate = AppyTemplate.compile(template);
            var html = compiledTemplate(tempObj);
            mainView.router.load({content: html, animatePages: true});
        });
        return
    }

	$$.get("pages/appypiedbDetail.html", function (template) {
		var compiledTemplate = AppyTemplate.compile(template);
		var html = compiledTemplate(appypieDB);
		mainView.router.load({content: html, animatePages: true});
		Appyscript.hideIndicator();
	});
}


Appyscript.openDBImage = function(a)
{
    //console.log("image  darra::"+$$(a).attr("data-images"));
        if(isOnline())
        {

            //Appyscript.openGallary($$(a).attr("index"),0,'','','','On',pageData.pageTitle,'no');
            Appyscript.openGallary($$(a).attr("data-images") ,0,'','','','On',pageData.pageTitle,'no');
        }
        else
        {
            Appyscript.hideIndicator();
            Appyscript.alert(internetconnectionmessage , appnameglobal_allpages);
        }
}


//Appyscript.onPageInit('appypiedb-page',function(appypieDB){$$("#txtSearch").focusout(function(){
//
//setTimeout(function(){if($$("#txtSearch").hasClass("on")){}else{Appyscript.searchClick('#txtSearch')}},100)})});
//


function callSearchFunction(){
    $$("#loadmore").hide()
    Appyscript.searchClick('#txtSearch')


}

//Appyscript.onPageInit('appypiedb-page',function(page){$$("#txtSearch").focusout(function(){Appyscript.searchClick('#txtSearch')})});
