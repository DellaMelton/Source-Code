Appyscript.onPageInit('flashcard-page',function(page) {
                      index=0;
                      if (index > 0) {
                      bindFlashCard(index - 1);
                      }
                      bindFlashCard(index);
                      bindFlashCard(index + 1)
                      
                     
                      var swiperFlash = new Swiper('.flashswiper', {
                                                   loop:false,
                                                   lazyLoading:true,
                                                   onInit: function () {
                                                   slidechag();
                                                   },
                                                   });
                                swiperFlash.on('SlideChangeStart', function () {
                                               $$(".flashswiper .swiper-slide").eq(swiperFlash.activeIndex + 2).html("");
                                               $$(".flashswiper .swiper-slide").eq(swiperFlash.activeIndex - 2).html("");
                                               bindFlashCard(swiperFlash.activeIndex - 1)
                                               bindFlashCard(swiperFlash.activeIndex);
                                               bindFlashCard(swiperFlash.activeIndex + 1);
                                               slidechag();
                                  });
                      
                      function slidechag(){
                      if($$(".swiper-wrapper").hasClass("img-top")||$$(".swiper-wrapper").hasClass("img-middle")){
                      console.log('slide changed');
                      var contentDivHeight = $$(".swiper-slide-active .forImageAndText").height();
                      var containerHeight = $$(".swiper-container").height();
                      if(contentDivHeight > containerHeight){
                      console.log("if");
                      var imgSrc = $$(".swiper-slide-active .forImageAndText img").attr("src");
                      console.log(imgSrc);
                      var headingHeight = $$(".swiper-slide-active .forImageAndText h2").height();
                      var imageHeight=containerHeight-headingHeight;
                      $$(".swiper-slide-active .swiperImg").addClass("changedImage");
                      $$(".swiper-slide-active .swiperImg img").css({"background-image":"url("+imgSrc+")", "height": imageHeight+"px"});
                      // $(".changedImage img").css("height","calc(100% - "+headingHeight+")");
                      $$(".swiper-slide-active .forImageAndText img").attr("src","images/1X1.png");
                      //  $$(".swiper-slide-active .preloader").hide()
                      // $(".flashswiper .img-full.heading-top .swiper-slide-active img").css("display":"block","margin-top":headingHeight);
                      }
                      }
                      
                      }

                                                  
                      
      });
function bindFlashCard(index) {
    var template=`{{#list[` + index + `]}}
    <div class="swiperImg swiper-lazy" data-background="{{image}}" style="background-image:url({{image}})">
    
    <div class="forImageAndText">
    <h2 class="{{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}} headingWhenTop" style="text-align:{{@global.styleAndNavigation.subheading[4]}}; background-color:{{@global.styleAndNavigation.subheading[3]}}; color:{{@global.styleAndNavigation.subheading[2]}}">{{listingName}}</h2>
    <img src="{{image}}" class="swiper_mainImg" alt="img"/>
    <h2 class="{{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}} headingNormal" style="text-align:{{@global.styleAndNavigation.subheading[4]}}; background-color:{{@global.styleAndNavigation.subheading[3]}}; color:{{@global.styleAndNavigation.subheading[2]}}">{{listingName}}</h2>
    </div>
    <div class="preloader"></div>
    {{#if @root.hideFavourite}}{{else}}<div data-id="{{listingId}}" class="swipe_like" style="background-color:{{@global.styleAndNavigation.icon[0]}}"><a class="icon-heart-1" style="color:{{@global.styleAndNavigation.icon[1]}}"></a></div>
    {{/if}}
    </div>
    <!-- Description -->
    <div class="slideAction swiper-no-swiping" style="position:absolute;width:100%;">
    <div class="shareLikeIcons">
    {{#if @root.hideFavourite}}{{else}}<div data-id="{{listingId}}" class="swipe_like"  style="background-color:{{@global.styleAndNavigation.icon[0]}}"><a class="icon-heart-1" style="color:{{@global.styleAndNavigation.icon[1]}}"></a></div>{{/if}}
    {{#if @root.enableShare}}<div data-id="{{listingId}}" class="swipe_share" onClick="Appyscript.shareFlash('{{image}}','{{listingName}}')" style="background-color:{{@global.styleAndNavigation.icon[0]}}"><a style="color:{{@global.styleAndNavigation.icon[1]}}" class="icon-share-1"></a></div>
    {{/if}}
    </div>
    <div class="slidearrow" style="border-bottom-color:{{@global.styleAndNavigation.icon[0]}}">
    <div class="slideIcon" style="background-color:{{@global.styleAndNavigation.icon[0]}}; color:{{@global.styleAndNavigation.icon[1]}};">
    <i class="icon-down-open"></i>
    </div>
    </div>
    <!--  Arrow Ended -->
    <div style="background-color:{{@global.styleAndNavigation.contentBgColor}};color:{{@global.styleAndNavigation.content[2]}};text-align:{{@global.styleAndNavigation.content[3]}}" class="divtoopen {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}">
    {{decription}}
    </div>
    
    
    </div>
    {{/list[` + index + `]}}
    `;
    var compiledTemplate = AppyTemplate.compile(template);
    var html = compiledTemplate(pageData);
    $$(".flashswiper .swiper-slide").eq(index).html(html);
    if(localStorage.getItem("JSONID"+pageIdentifie)){
        $$(".flashswiper .swiper-slide").eq(index).find(".swipe_like").each( function(i){
                                                                        var dataId = $$(this).attr("data-id");
                                                                        if(localStorage.getItem("JSONID"+pageIdentifie).indexOf(dataId)>0){
                                                                        $$(this).addClass("on");
                                                                        }
                                                                        })
    }
  
}


Appyscript.onPageInit('flashcard-likesPage ',function(page) {
                      if(localStorage.getItem("JSONID"+pageIdentifie)){
                      $$(document).find(".swipe_like").each( function(i){
                                                            $$(this).removeClass("on");
                                                            var dataId = $$(this).attr("data-id");
                                                            if(localStorage.getItem("JSONID"+pageIdentifie).indexOf(dataId)>0){
                                                            $$(this).addClass("on");
                                                            }
                                                            })
                      }
                      index=0;
                      if (index > 0) {
                      bindFlashCard1(index - 1);
                      }
                      bindFlashCard1(index);
                      bindFlashCard1(index + 1)
                      
                      var flashswiper1 = new Swiper('.flashswiper1', {
                                                    loop:false,
                                                    lazyLoading:true,
                                                    onInit: function () {
                                                    slidechag();
                                                    },
                                                    
                                                   });
                      flashswiper1.on('SlideChangeStart', function () {
                                      $$(".flashswiper1 .swiper-slide").eq(flashswiper1.activeIndex + 2).html("");
                                      $$(".flashswiper1 .swiper-slide").eq(flashswiper1.activeIndex - 2).html("");
                                      bindFlashCard1(flashswiper1.activeIndex - 1)
                                      bindFlashCard1(flashswiper1.activeIndex);
                                      bindFlashCard1(flashswiper1.activeIndex + 1);
                                      slidechag();
                                      });
                      function slidechag(){
                      if($$(".swiper-wrapper").hasClass("img-top")||$$(".swiper-wrapper").hasClass("img-middle")){
                      console.log('slide changed');
                      var contentDivHeight = $$(".flashswiper1 .swiper-slide-active .forImageAndText").height();
                      var containerHeight = $$(".flashswiper1").height();
                      if(contentDivHeight > containerHeight){
                      console.log("if");
                      var imgSrc = $$(".flashswiper1 .swiper-slide-active .forImageAndText img").attr("src");
                      console.log(imgSrc);
                      var headingHeight = $$(".flashswiper1 .swiper-slide-active .forImageAndText h2").height();
                      var imageHeight=containerHeight-headingHeight;
                      $$(".flashswiper1 .swiper-slide-active .swiperImg").addClass("changedImage");
                      $$(".flashswiper1 .swiper-slide-active .swiperImg img").css({"background-image":"url("+imgSrc+")", "height": imageHeight+"px"});
                      // $(".changedImage img").css("height","calc(100% - "+headingHeight+")");
                      $$(".flashswiper1 .swiper-slide-active .forImageAndText img").attr("src","images/1X1.png");
                    //  $$(".flashswiper1 .swiper-slide-active .preloader").hide()
                      //                                               $(".flashswiper .img-full.heading-top .swiper-slide-active img").css("display":"block","margin-top":headingHeight);
                      }
                      }
                      }
                      
                      
                      
                      });

function bindFlashCard1(index) {
    var template=`{{#list[` + index + `]}}
    <div class="swiperImg swiper-lazy" data-background="{{image}}" style="background-image:url({{image}})">
    
    <div class="forImageAndText">
    <h2 class="{{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}} headingWhenTop" style="text-align:{{@global.styleAndNavigation.subheading[4]}}; background-color:{{@global.styleAndNavigation.subheading[3]}}; color:{{@global.styleAndNavigation.subheading[2]}}">{{listingName}}</h2>
    <img src="{{image}}" class="swiper_mainImg" alt="img"/>
    <h2 class="{{@global.styleAndNavigation.subheading[0]}} {{@global.styleAndNavigation.subheading[1]}} headingNormal" style="text-align:{{@global.styleAndNavigation.subheading[4]}}; background-color:{{@global.styleAndNavigation.subheading[3]}}; color:{{@global.styleAndNavigation.subheading[2]}}">{{listingName}}</h2>
    </div>
    <div class="preloader"></div>
    {{#if @root.hideFavourite}}{{else}}<div data-id="{{listingId}}" class="swipe_like" style="background-color:{{@global.styleAndNavigation.icon[0]}}"><a class="icon-heart-1" style="color:{{@global.styleAndNavigation.icon[1]}}"></a></div>
    {{/if}}
    </div>
    <!-- Description -->
    <div class="slideAction swiper-no-swiping" style="position:absolute;width:100%;">
    <div class="shareLikeIcons">
    {{#if @root.hideFavourite}}{{else}}<div data-id="{{listingId}}" class="swipe_like"  style="background-color:{{@global.styleAndNavigation.icon[0]}}"><a class="icon-heart-1" style="color:{{@global.styleAndNavigation.icon[1]}}"></a></div>{{/if}}
    {{#if @root.enableShare}}<div data-id="{{listingId}}" class="swipe_share" onClick="Appyscript.shareFlash('{{image}}','{{listingName}}')" style="background-color:{{@global.styleAndNavigation.icon[0]}}"><a style="color:{{@global.styleAndNavigation.icon[1]}}" class="icon-share-1"></a></div>
    {{/if}}
    </div>
    <div class="slidearrow" style="border-bottom-color:{{@global.styleAndNavigation.icon[0]}}">
    <div class="slideIcon" style="background-color:{{@global.styleAndNavigation.icon[0]}}; color:{{@global.styleAndNavigation.icon[1]}};">
    <i class="icon-down-open"></i>
    </div>
    </div>
    <!--  Arrow Ended -->
    <div style="background-color:{{@global.styleAndNavigation.contentBgColor}};color:{{@global.styleAndNavigation.content[2]}};text-align:{{@global.styleAndNavigation.content[3]}}" class="divtoopen {{@global.styleAndNavigation.content[0]}} {{@global.styleAndNavigation.content[1]}}">
    {{decription}}
    </div>
    
    
    </div>
    {{/list[` + index + `]}}
    `;
    var compiledTemplate = AppyTemplate.compile(template);
    var html = compiledTemplate(flashlikesData);
    $$(".flashswiper1 .swiper-slide").eq(index).html(html);
    if(localStorage.getItem("JSONID"+pageIdentifie)){
        $$(".flashswiper1 .swiper-slide").eq(index).find(".swipe_like").each( function(i){
                                                                            var dataId = $$(this).attr("data-id");
                                                                            if(localStorage.getItem("JSONID"+pageIdentifie).indexOf(dataId)>0){
                                                                            $$(this).addClass("on");
                                                                            }
                                                                            })
    }
    
}

Appyscript.onPageBack('flashcard-likesPage ',function(page) {
                      if(localStorage.getItem("JSONID"+pageIdentifie)){
                      $$(document).find(".swipe_like").each( function(i){
                                                            $$(this).removeClass("on");
                                                            var dataId = $$(this).attr("data-id");
                                                            if(localStorage.getItem("JSONID"+pageIdentifie).indexOf(dataId)>0){
                                                            $$(this).addClass("on");
                                                            }
                                                            })
                      }});
function flashcardtS(e){
     previousY= 0;
     currentY = 0;
     divH = $(window).height();
     fortyPt = (divH*40)/100;
     slideAction = $$(".swiper-slide-active .slideAction");
    
    var touchobj = e.changedTouches[0];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             var newstartY = touchobj.pageY;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           //console.log("start", newstartY);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              //console.log("clicked");
    localStorage.touchTIme=new Date().getTime();
    localStorage.touchStartPosition=newstartY;
    e.stopPropagation();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

function flashcardtM(e){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var touchobj = e.changedTouches[0];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          var newstartY = touchobj.pageY;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          var movedD = divH - currentY;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                previousY = currentY;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            //console.log("previousY: ",previousY);
    currentY = touchobj.pageY;
    //console.log("currentY: ",currentY);
    $$(".swiper-slide-active").addClass("removeAnimation");
    $$(".swiper-slide-active .slideAction").css("top",currentY-32+"px");
    e.stopPropagation();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
function flashcardtR(e){
    var touchobj = e.changedTouches[0];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           var newstartY = touchobj.pageY;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         previousY = currentY;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  currentY = touchobj.pageY;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              var movedD = divH - currentY;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             //console.log("movedDistance",movedD);
    var now=new Date().getTime();
    var perTime=     localStorage.touchTIme;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 console.log(now,perTime,now - perTime)   ;
    $$(".swiper-slide-active").removeClass("removeAnimation");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             if((now - perTime )<200){
        
        var divPos = $(".swiper-slide-active .slideAction").position().top;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           //console.log(divPos);
        if(divPos <= 0){
            //console.log("top 0");
            $$(".swiper-slide-prev .slideAction").css("top","100%");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         $$(".swiper-slide-active .slideAction").css("top","100%");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          setTimeout(function(){$$(".swiper-slide-active").removeClass("active");},600);
        }
        else{
            //console.log("top not 0");
            $$(".swiper-slide-active .slideAction").css("top","0");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    $$(".swiper-slide-active").addClass("active");
        }
    }
    
    else{
        if(localStorage.touchStartPosition>100){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  //console.log("else");
            if(movedD > fortyPt){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            //console.log("greater than forty percent");
                $$(".swiper-slide-active .slideAction").css("top","0 ");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             $$(".swiper-slide-active").addClass("active");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     console.log("less than forty percent");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             $$(".swiper-slide-active .slideAction").css("top","100% ");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     $$(".swiper-slide-active").removeClass("active");
                }
        }else{
            //console.log("comes from top",movedD , fortyPt);
            if(currentY > fortyPt){
                $$(".swiper-slide-active").removeClass("active");
                $$(".swiper-slide-active .slideAction").css("top","100% ");
            }else{
                $$(".swiper-slide-active .slideAction").css("top","0% ");
                $$(".swiper-slide-active").addClass("active");
            }
            
        }
    }
//    if($(".swiper-wrapper").hasClass("img-top","heading-top")){
//        console.log("yes");
//        var headingHeight=$(".forImageAndText h2").height();
//        $(".forImageAndText img").css("margin-top",headingHeight);
//    }
    e.stopPropagation();
}


function updateflashLike(){
    
    var dataId = $$(this).attr("data-id");
    var NewArray = [];
    var IDArray=[];
    var deleteID = $$(this).hasClass("on");
    console.log(deleteID);
    
    if(localStorage.getItem(pageIdentifie)){
        
        var localJSon= JSON.parse(localStorage.getItem(pageIdentifie));
        var localJSonID= JSON.parse(localStorage.getItem("JSONID"+pageIdentifie));
        
        if(localStorage.getItem("JSONID"+pageIdentifie).indexOf(dataId)<0){
          //  $$(this).addClass("on");
            $$(this).parents(".swiper-slide").find(".swipe_like").addClass("on");
            localJSonID.push(dataId);
            for(i=0; i<pageData.list.length; i++){
                if(pageData.list[i].listingId==dataId){
                    localJSon.push(pageData.list[i]);
                }
            }
        }else{
            if(deleteID){
                $$(this).parents(".swiper-slide").find(".swipe_like").removeClass("on");
                for(i=0; i<localJSon.length; i++){
                    if(localJSon[i].listingId==dataId){
                        localJSon.splice(i, 1);
                    }
                }
                
                for(i=0; i<localJSonID.length; i++){
                    if(localJSonID[i]==dataId){
                        localJSonID.splice(i, 1);
                    }
                }
            }
        }
        localStorage.setItem(pageIdentifie,JSON.stringify(localJSon));
        localStorage.setItem("JSONID"+pageIdentifie, JSON.stringify(localJSonID));
        
    }else{
        IDArray.push(dataId);
        $$(this).parents(".swiper-slide").find(".swipe_like").addClass("on");
        for(i=0; i<pageData.list.length; i++){
            if(pageData.list[i].listingId==dataId){
                NewArray.push(pageData.list[i]);
            }
        }
        if(NewArray.length>0){
        localStorage.setItem(pageIdentifie,JSON.stringify(NewArray));
        localStorage.setItem("JSONID"+pageIdentifie, JSON.stringify(IDArray));
        }
    }
    
}
  var flashlikesData={};
function flashlikes(){
     flashlikesData={};
    flashlikesData.list = JSON.parse(localStorage.getItem(pageIdentifie))?JSON.parse(localStorage.getItem(pageIdentifie)):[];
    flashlikesData.styleAndNavigation=pageData.styleAndNavigation;
    flashlikesData.enableShare=pageData.enableShare;
//    flashlikesdata.hideFavourite=pageData.hideFavourite;
    flashlikesData.pageTitle="Bookmark"
    
    $$.get('pages/flash-bookmark.html', function (template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(flashlikesData);
           mainView.router.load({content: html, animatePages: true});
           })
    
}


$$(document).on("touchstart mousedown",".swiper-slide-active .slidearrow", flashcardtS);
$$(document).on("touchmove mousemove",".swiper-slide-active .slidearrow",flashcardtM);
$$(document).on("touchend mouseup",".swiper-slide-active .slidearrow",flashcardtR);
$$(document).on("click",".swipe_like", updateflashLike);
