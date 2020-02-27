var audioData;
var audioType;
var soundCloudType = '';
var pageid;
var innerindex;
var pageIndetify;
var pageIId;
var enabledisableAlarmbtn;

function AudioPage(a, b, c) {

    Appyscript.showIndicator();
    pageIndetify = localStorage.getItem("pageIdentifie");
    console.log("====== pageData in audio page : " + pageIndetify);

    pageIId = localStorage.getItem("pageName");
    console.log("====== pageIId in audio page : " + pageIId);
    audioData = pageData.list[a];
    audioData.index = a;
    pageid = c;
    innerindex = audioData.index;
    audioType = b;
    enabledisableAlarmbtn = pageData.enableAlarm;
    console.log("===== enabledisableAlarmbtn : " + enabledisableAlarmbtn);
    if (b == "customradio") {

        var audiourlval = audioData.radiorssFeedurl;
        if (audiourlval.indexOf("embed") != "-1") {

            Appyscript.openWebView(audiourlval, "Radio Streaming", "");

        } else {
            jsonString = "@@@@" + audioData.name + "$$@@$$" + "" + "$$@@$$" + audioData.radiorssFeedurl + "$$@@$$" + audioData.playerSoundRadioRssInnerImage;
            openradio(jsonString, pageData.enableAutoPlay, audioType, pageid, innerindex, audioData.name, audioData, audioData.fitToScreenPls, pageIndetify, pageIId, enabledisableAlarmbtn);
            Appyscript.hideIndicator();
        }
    } else if (b == "customPlayList") {
        Appyscript.showIndicator();
        Appyscript.loadAudioMediaRssJsonOnHtml(JSON.stringify(audioData));
        Appyscript.hideIndicator();
    } else if (b == "spotify") {
        spotifyy(a);
        Appyscript.hideIndicator();
    } else if (b == "soundRss") {
        var url = encodeURIComponent(audioData.soundRssFeedurl);
        //Appyscript.makeHttpRequest("https://api.rss2json.com/v1/api.json?rss_url=" + url + "&count=200&api_key=lhnz3wm3nyk6vtjg8iblfcudvgiwlkpa3rrln77q", '', Appyscript.loadAudioMediaRssJsonOnHtml, 'get');
        //Appyscript.hideIndicator();
        // Appyscript.makeHttpRequest("https://api.rss2json.com/v1/api.json?rss_url="+audioData.soundRssFeedurl,'',Appyscript.loadAudioMediaRssJsonOnHtml,'get');
        Appyscript.makeHttpRequest(audioData.soundRssFeedurl,'',Appyscript.loadAudioMediaRssJsonOnHtml,'get');

        Appyscript.hideIndicator();
    }
    else if (b == "soundCloud") {
        if (isOnline()) {
            var soundCloudServerUrl = '';
            if (audioData.soundCloudPlayListId == '3') {
                soundCloudType = '';
                soundCloudServerUrl = 'https://api.soundcloud.com/users/' + audioData.soundCloudUserId + '/tracks?client_id=' + audioData.soundCloudClientId;
            } else if (audioData.soundCloudPlayListId == '2') {
                soundCloudType = '';
                soundCloudServerUrl = 'https://api.soundcloud.com/users/' + audioData.soundCloudUserId + '/favorites?client_id=' + audioData.soundCloudClientId;
            } else {
                soundCloudType = 'playlist';
                soundCloudServerUrl = 'https://api.soundcloud.com/playlists/' + audioData.soundCloudPlayListId + '?client_id=' + audioData.soundCloudClientId;
            }
            Appyscript.showIndicator();
            Appyscript.makeHttpRequest(soundCloudServerUrl, '', Appyscript.loadAudioMediaRssJsonOnHtml, 'get');

        } else {
            Appyscript.openWebView(audioData.url, pageData.pageTitle);
            Appyscript.hideIndicator();
        }

    }
/////

else if(b == "hearthis")
    {
        if(isOnline())
        {
            var apiUrl='';
            var playlistType = audioData.hearthisPlayListUrl.split("#")[1];
            var userName = audioData.hearthisPlayListUrl.split("this.at/")[1].split("/")[0];
            if(playlistType=='likes'){
                apiUrl = 'https://api-v2.hearthis.at/'+userName+'/?type='+playlistType+'&page=1&count=5';
            }else if(playlistType=='playlists'){
                apiUrl = 'https://api-v2.hearthis.at/'+userName+'/?type='+playlistType+'&page=1&count=5';
            }else if(playlistType=='tracks'){
                apiUrl = 'https://api-v2.hearthis.at/'+userName+'/?type='+playlistType+'&page=1&count=5';
            }else{

                apiUrl=audioData.hearthisPlayListUrl.replace("https://hearthis.at","https://api-v2.hearthis.at");

                //apiUrl = 'https://api-v2.hearthis.at/'+userName;
            }



            Appyscript.makeHttpRequest(apiUrl,'',Appyscript.loadAudioMediaRssJsonOnHtml,'get');
        }
        else
        {
            Appyscript.openWebView(audioData.url,pageData.pageTitle);
        }

    }


    else {
        Appyscript.alert(internetconnectionmessage, appnameglobal_allpages);
    }



}

Appyscript.loadAudioMediaRssJsonOnHtml = function(jsonString, textStatus) {
    console.log("jsonString=="+jsonString);
    //console.log(JSON.parse(jsonString))
    try {
        JSON.parse(jsonString);
        //jsonString = Appyscript.convertXMLToJson(jsonString);
    } catch (e) {
        console.log("converting xml data to json");
        try {
            jsonString = Appyscript.convertXMLToJson(jsonString.replace(/[\r\n]+/g, ''));
        } catch (err) {
            Appyscript.hideIndicator();
            console.log("converting xml data to json");
        }
    }

    jsonString = jsonString.replace(/"media:thumbnail"/g, "\"mediathumbnail\"");
    var jsonObj = JSON.parse(jsonString);
    var audioTitle = "",
        audioDesc = "",
        audioUrl = "",
        audioImage = "";
    if (audioType == 'soundRss') {
        jsonString = '';
 if(jsonObj.rss.channel.item.length)
       {
        $$.each(jsonObj.rss.channel.item, function(key, value) {
            audioTitle = "", audioDesc = "", audioUrl = "", audioImage = "";

            try {
//                var a= value || "";
//                if(a!==""){
//                 value=value.replace(/[\r\n]+/g, '');
//                }


                if (value.enclosure) {
                    audioUrl = value.enclosure.url;
                }

                if (audioData.rssAudioDisable == "1") {
                    audioImage = audioData.playerSoundRadioRssInnerImage;

                }else{
                    audioImage = "";
                }

                if (audioData.rssAudioDisable == "0") {
                    if (audioData.palyerSoundrssInnerImage == "") {
                        if (value.thumbnail && value.thumbnail.length > 3) {
                            audioImage = value.thumbnail;
                        }
                    }
                }


                if(audioImage ==""){
                    audioImage = audioData.playerSoundRadioRssInnerImage;
                }

                audioTitle = value.title;
                var _description =  value.description || "";
                console.log("description checking" + _description)
                if(typeof _description ==="object"){
                audioDesc = value.description[0].content;
                }else{
                    audioDesc = value.description || "";
                }

                if (audioDesc != undefined && audioDesc.length > 0) {
                    // audioDesc=audioDesc.substring(0,50);
                    audioDesc = audioDesc.replace(/&(lt|gt);/g, function(strMatch, p1) {
                        return (p1 == "lt") ? "<" : ">";
                    });
                    audioDesc = audioDesc.replace(/<\/?[^>]+(>|$)/g, "").trim();

                }else{
//                                         audioDesc = value.title;
                 audioDesc = value["itunes:subtitle"];
                 }

                var summmary = "";
                if (value.content && value.content !="undefined" && value.content.length>0) {

                        summmary = value.content;
                        // audioDesc=audioDesc.substring(0,50);
                        summmary = summmary.replace(/&(lt|gt);/g, function(strMatch, p1) {
                            return (p1 == "lt") ? "<" : ">";
                        });
                        summmary = summmary.replace(/<\/?[^>]+(>|$)/g, "").trim();
                        audioDesc += "\n" + summmary;


                }

                if (audioTitle.length > 0) {
                    // audioTitle=audioTitle.substring(0,31);

                    audioTitle = audioTitle.replace(/&(lt|gt);/g, function(strMatch, p1) {
                        return (p1 == "lt") ? "<" : ">";
                    });
                    audioTitle = audioTitle.replace(/<\/?[^>]+(>|$)/g, "").trim();
                }

                jsonString = jsonString + "@@--@@" /*+ (key + 1) + ". "*/ + audioTitle + "\n" + audioDesc + "#####" + audioUrl + "#####" + audioImage;
            } catch (error) {
                console.log("error rss  >>>>" + error);
            }
        });
        }
        else
        {
        $$.each(jsonObj.rss.channel, function(key, value) {
        if(key=="item")
        {
                    audioTitle = "", audioDesc = "", audioUrl = "", audioImage = "";

                    try {
        //                var a= value || "";
        //                if(a!==""){
        //                 value=value.replace(/[\r\n]+/g, '');
        //                }


                        if (value.enclosure) {
                            audioUrl = value.enclosure.url;
                        }

                        if (audioData.rssAudioDisable == "1") {
                            audioImage = audioData.playerSoundRadioRssInnerImage;

                        }else{
                            audioImage = "";
                        }

                        if (audioData.rssAudioDisable == "0") {
                            if (audioData.palyerSoundrssInnerImage == "") {
                                if (value.thumbnail && value.thumbnail.length > 3) {
                                    audioImage = value.thumbnail;
                                }
                            }
                        }


                        audioTitle = value.title;
                        audioDesc = value.description;

                        if (audioDesc != undefined && audioDesc.length > 0) {
                            // audioDesc=audioDesc.substring(0,50);
                            audioDesc = audioDesc.replace(/&(lt|gt);/g, function(strMatch, p1) {
                                return (p1 == "lt") ? "<" : ">";
                            });
                            audioDesc = audioDesc.replace(/<\/?[^>]+(>|$)/g, "").trim();

                        }else{
                        audioDesc = value.title;
                        }
                        var summmary = "";
                        if (value.content) {
                                summmary = value.content;
                                // audioDesc=audioDesc.substring(0,50);
                                summmary = summmary.replace(/&(lt|gt);/g, function(strMatch, p1) {
                                    return (p1 == "lt") ? "<" : ">";
                                });
                                summmary = summmary.replace(/<\/?[^>]+(>|$)/g, "").trim();
                                audioDesc += "\n" + summmary;


                        }

                        if (audioTitle.length > 0) {
                            // audioTitle=audioTitle.substring(0,31);

                            audioTitle = audioTitle.replace(/&(lt|gt);/g, function(strMatch, p1) {
                                return (p1 == "lt") ? "<" : ">";
                            });
                            audioTitle = audioTitle.replace(/<\/?[^>]+(>|$)/g, "").trim();
                        }

                        jsonString = jsonString + "@@--@@" /*+ (key + 1) + ". "*/ + audioTitle + "\n" + audioDesc + "#####" + audioUrl + "#####" + audioImage;
                    } catch (error) {
                        console.log("error rss  >>>>" + error);
                    }
                    }
                });
        }
    }
    else if (audioType == 'soundCloud') {
        jsonString = '';
        if (soundCloudType == 'playlist') {
            jsonObj = jsonObj.tracks;
        }
        $$.each(jsonObj, function(key, value) {
            audioTitle = "", audioDesc = "", audioUrl = "", audioImage = "";
            try {
                audioTitle = value.title;

                audioImage = audioData.playerSoundCloudInnerImage;
                if (audioData.playerSoundCloudInnerImage == "") {
                    if (value.artwork_url)
                        audioImage = value.artwork_url;
                    if (!audioImage) {
                        if (value.user) {
                            if (value.user.avatar_url) audioImage = value.user.avatar_url;
                        }
                    }
                }

                if (audioImage != null && audioImage.indexOf("large.jpg") != -1) {
                    audioImage = audioImage.replace("large.jpg", "t500x500.jpg");
                }
                audioUrl = value.stream_url + '?client_id=' + audioData.soundCloudClientId;
                audioDesc = value.description;

                if (audioDesc) {
                    audioDesc = audioDesc.substring(0, 50);
                }
                if (audioTitle) {
                    audioTitle = audioTitle.substring(0, 31);
                }

                console.log("audioDesc" + audioDesc);


                if (audioDesc == "null" || audioDesc == null) {

                    audioDesc = "";

                }

                jsonString = jsonString + "@@--@@" + audioTitle + "\n" + audioDesc + "#####" + audioUrl + "#####" + audioImage;
            } catch (error) {
                console.log("error soundcloud  >>>>" + error);
            }
        });

    }
    else if(audioType=='hearthis')
        {
            jsonString='';
    //        if(playlistType=='likes')
    //        {
    //            jsonObj=jsonObj.likes;
    //        }
            if(typeof jsonObj == "object"){

                if(jsonObj.length >0){
                    $$.each(jsonObj, function( key, value ) {
                            audioTitle="",audioDesc="",audioUrl="",audioImage="";
                            try
                            {
                            audioTitle=value.title;

                            audioImage=value.artwork_url;
                            if(value.artwork_url== null)
                            {
                            audioImage=value.user.avatar_url;
                            }
                            if(audioImage != null && audioImage.indexOf("large.jpg")!=-1)
                            {
                            audioImage=audioImage.replace("large.jpg", "t500x500.jpg");
                            }

                            audioUrl=value.stream_url;
                            audioDesc=value.description;

                            if(audioDesc)
                            {
                            audioDesc = audioDesc.substring(0,50);
                            }
                            if(audioTitle)
                            {
                            audioTitle=audioTitle.substring(0,31);
                            }
                            if(audioDesc==null || audioDesc=='null')
                            {
                            audioDesc='';
                            }

                            if(Appyscript.device.android)
                            {
                            jsonString=jsonString+"@@--@@"+audioTitle+"\n"+audioDesc+"#####"+audioUrl+"#####"+audioImage;                }
                            else
                            {
                            jsonString=jsonString+"@@@@"+audioTitle+"$$@@$$"+audioDesc+"$$@@$$"+audioUrl+"$$@@$$"+audioImage;
                            }



                            }
                            catch(error)
                            {
                            Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                            }
                            });
                }
                else{



                    audioTitle="",audioDesc="",audioUrl="",audioImage="";
                    try
                    {
                        audioTitle=jsonObj.title;

                        audioImage=jsonObj.artwork_url;
                        if(jsonObj.artwork_url== null)
                        {
                            audioImage=jsonObj.avatar_url;
                        }
                        if(audioImage != null && audioImage.indexOf("large.jpg")!=-1)
                        {
                            audioImage=audioImage.replace("large.jpg", "t500x500.jpg");
                        }

                        audioUrl=jsonObj.stream_url;
                        audioDesc=jsonObj.description;

                        if(audioDesc)
                        {
                            audioDesc = audioDesc.substring(0,50);
                        }
                        if(audioTitle)
                        {
                            audioTitle=audioTitle.substring(0,31);
                        }
                        if(audioDesc==null || audioDesc=='null')
                        {
                            audioDesc='';
                        }

                        if(Appyscript.device.android)
                        {
                            jsonString=jsonString+"@@--@@"+audioTitle+"\n"+audioDesc+"#####"+audioUrl+"#####"+audioImage;                }
                        else
                        {
                            jsonString=jsonString+"@@@@"+audioTitle+"$$@@$$"+audioDesc+"$$@@$$"+audioUrl+"$$@@$$"+audioImage;
                        }



                    }
                    catch(error)
                    {
                        Appyscript.alert(something_went_wrong_please_try_again,appnameglobal_allpages);
                    }


                }}
        }
    else if (audioType == 'customPlayList') {

        jsonString = '';
        audioImage = jsonObj.audioCustomBgImage;
        $$.each(jsonObj.list, function(key, value) {
            audioTitle = "", audioDesc = "", audioUrl = "";
            try {
                audioTitle = value.name;
                audioDesc = value.audioTrackDescription;
                audioUrl = value.audioTrackUrl1;

                if (audioDesc) {
                    audioDesc = audioDesc.substring(0, 50);
                }
                if (audioTitle) {
                    audioTitle = audioTitle.substring(0, 31);
                }

                jsonString = jsonString + "@@--@@" + audioTitle + "\n" + audioDesc + "#####" + audioUrl + "#####" + audioImage;
            } catch (error) {
                console.log("error soundcloud  >>>>" + error);
            }
        });

    }

    if (jsonString != '') {
        Appyscript.playAudioUrls(jsonString, "rss", audioImage, "channalNameValue", pageData.enableAutoPlay, (audioData.name) ? audioData.name : pageData.pageTitle, pageData.languageSetting.song_list);
    } else {
        Appyscript.alert("No audio record found.", data.appData.appName);
        Appyscript.hideIndicator();
    }
}

function spotifyy(index) {

    var idofalbum = new Array();
    var spotifyrssFeedArtistName = pageData.list[index].value;
    localStorage.setItem("pagetitle", pageData.list[index].name)
    var path = 'https://api.spotify.com/v1/search?q=' + spotifyrssFeedArtistName + '&type=artist';
    var spotifyTypee = pageData.list[index].spotifyType;
    $$.getJSON(path, function(valueartist) {
        spotifyTypee = pageData.list[index].spotifyType;
        path = 'https:/api.spotify.com/v1/artists/' + valueartist.artists.items[0].id + '/albums?album_type=' + spotifyTypee + '&limit=50';

        var data = {};
        data.pageTitle = pageData.list[index].name;
        data.spotifyType = pageData.list[index].spotifyType;
        data.artName = pageData.list[index].value;
        data.appData = [];

        $$.getJSON(path, function(valuemain) {
            data.size = valuemain.items.length;
            for (var ii = 0; ii < valuemain.items.length; ii++) {
                var list = {};
                var dataWithspotifyName = valuemain.items[ii].name;
                list.name = valuemain.items[ii].name;
                var dataWithspotifyNametemp = dataWithspotifyName.substring(0, 8);
                list.dataWithspotifyNametemp = dataWithspotifyNametemp;
                var dataWithspotify = valuemain.items[ii].images[0].url;
                list.dataWithspotify = dataWithspotify;
                list.file = valuemain.items[ii].id;
                var artistname = spotifyrssFeedArtistName;

                list.artistname = artistname;

                data.appData.push(list);
            }
            Appyscript.hideIndicator();
            $$.get("pages/spotify.html", function(template) {
                var compiledTemplate = AppyTemplate.compile(template);
                var html = compiledTemplate(data);
                mainView.router.load({
                    content: html,
                    animatePages: true
                });
            });

        }).fail(function() {
            Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);


        });
    });
}


function spotifyPlayList(key) {
    Appyscript.showIndicator();
    var jsonString = '';
    var path = 'https://api.spotify.com/v1/albums/' + key;
    $$.getJSON(path, function(valuemain) {
        for (var j = 0; j < valuemain.tracks.items.length; j++) {
            var imgurll = valuemain.images[0].url;


            if (Appyscript.device.android) {
                jsonString = jsonString + "@@--@@" /*+ (j + 1) + ". "*/ + valuemain.tracks.items[j].name + "\n #####" + valuemain.tracks.items[j].preview_url + "#####" + imgurll;
            } else {
                jsonString = jsonString + "@@@@" + valuemain.tracks.items[j].name + "$$@@$$" + '' + "$$@@$$" + valuemain.tracks.items[j].preview_url + "$$@@$$" + imgurll;
            }

        }

        openaudioplayer(jsonString, pageData.enableAutoPlay, 'Custom', pageid, "spotify", localStorage.getItem("pagetitle"), pageData.languageSetting.song_list);

    }).fail(function() {
        Appyscript.alert(something_went_wrong_please_try_again, appnameglobal_allpages);
    });

}

//native call methods

function openaudioplayer(json, autoplay, audiotype, pageid, innerindex, audioname, dynamicSongListName) {
    if (Appyscript.device.android) {
        Appyscript.playAudioUrls(json, "rss", "", "channalNameValue", autoplay, audioname, audioData.name, dynamicSongListName);
    } else {
        Appyscript.playAudioUrls(json, autoplay, audiotype, pageid, innerindex, audioname);
    }

}

function openradio(json, autoplay, audiotype, pageid, innerindex, audioname, audiodata, isFitScreen) {

    if (Appyscript.device.android) {
        Appyscript.playRadioStream(audiodata.radiorssFeedurl, audiodata.playerSoundRadioRssInnerImage, audiodata.disableAutoalbum, audiodata.plsType, audiodata.name, autoplay, audiodata.name, isFitScreen, innerindex, data.appData.appName, audiotype, pageIndetify, pageIId, enabledisableAlarmbtn, pageData.languageSetting.alarm, pageData.languageSetting.buffring, pageData.languageSetting.sunday, pageData.languageSetting.monday, pageData.languageSetting.tuesday, pageData.languageSetting.wednesday, pageData.languageSetting.thursday, pageData.languageSetting.friday, pageData.languageSetting.saturday, pageData.languageSetting.volume, pageData.languageSetting.song_list, pageData.languageSetting.set_time, pageData.languageSetting.select_all, pageData.languageSetting.repeat, pageData.languageSetting.on_air, pageData.languageSetting.off_air, pageData.enableShare);
    } else {
        Appyscript.playAudioUrls(json, autoplay, audiotype, pageid, innerindex, audiodata.name);
    }

}