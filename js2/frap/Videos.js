Videos = {

    _url_videos : '',

    _list_videos : '',
	
	_partage_videos : '',

    _limit_list : 30,
    
    _player: null,

    init : function() {
        this._url_videos = Flux._frap_flux.ws_video+'&limit='+this._limit_list;
       // jembe.http.get({url:Videos._url_videos, datatype_demande:'json', onSuccess:Videos.callback_videos, onError:Videos.callaback_error});
	   console.log('url video => '+Videos._url_videos);
		var e = document.createElement('script'); e.async = true;
        //e.src = document.location.protocol + '//api.dmcdn.net/all.js';
		e.src = 'http://api.dmcdn.net/all.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(e, s);
		window.dmAsyncInit = function()
    	{
	
	        console.log('window.dmAsyncInit');

		}
     	console.log('video avant requete ajax')
	    $.ajax
		({
			url: Videos._url_videos, 		
			method: 'GET',
			//dataType: 'json',
			success: function(data) 
			{
				
          			   //eval('Videos._list_videos = '+data);
					   Videos._list_videos = data;
						console.log(Videos._list_videos);
           				 Videos.loadVideos();
       				 
			},
			error: function() 
			{
				console.log('error de connexion au JSON Videos '+data)
			}
		});

	
	
    },

    callaback_error : function(msg) {
        console.log('error de connexion au JSON Videos '+msg)
    },

    callback_videos : function(msg) {
        console.log('video.js callback_videos début');
        try {
            eval('Videos._list_videos = '+msg);
			console.log(Videos._list_videos);
            Videos.loadVideos();
        } catch(e) {
            Videos._list_videos="";
        }
    },

    loadVideos : function() {
		
		DateJour = new Date();
		console.log(DateJour);
		
		var jourVid = DateJour.getDate();
		var moisVid = DateJour.getMonth();
		var annVid = DateJour.getFullYear();
		
		var dateUse = new Date(annVid, moisVid, jourVid, 04, 10, 10);
		var unixtime = parseInt(dateUse.getTime() / 1000);
		
		console.log(unixtime);
		
		$.ajax
		({
			url: 'https://api.dailymotion.com/user/lesonunique/videos?created_after='+unixtime+'&sort=recent', 		
			method: 'GET',
			//dataType: 'json',
			success: function(data) 
			{
				console.log(data);
				if(data.total==0)
				{
					document.getElementById("nbMenuVideo").innerHTML=""; 
				}
				else
				{
					document.getElementById("nbMenuVideo").innerHTML="<label class='digits'>"+data.total+"</label>"; 
				}
			},
			error: function() 
			{
				console.log('errreur count videos')
			}
		});
		
        var liste = '<div id="listeVideos">';
		var backgroundcolor = '#FFFFFF';
        for(var i=0;i<Videos._list_videos.list.length;i++) {
			if (i%2 != 0){backgroundcolor = '#FFFFFF';}
			else{backgroundcolor = '#F6F6F6';}
			
			if(Videos._list_videos.list[i].title.length>52)
			{
				var baseTitle = Videos._list_videos.list[i].title;
				var titletronc = baseTitle.substr(0,47);
				var titletronc2 = "[...]";
				var titleOK = titletronc.concat(titletronc2);
				console.log(titletronc);
			}
			else
			{
				var titleOK = Videos._list_videos.list[i].title;
			}
		
            liste += '<div class="line_videos" style="background-color:'+backgroundcolor+'">'+
                      	'<div class="img_videos">'+
                      		'<div class="illus"><img src="'+Videos._list_videos.list[i].thumbnail_medium_url+'" border="0" width="80" height="60" /></div>'+
                       		'<div class="play" onclick="Videos.playVideo('+i+')"><img src="images/player/play.png" /></div>'+
                       	'</div>'+
						'<div class="share_videos"><a href="#" onclick="Videos.choixFacebookTwitter('+i+')" id="video_like_'+i+'" class="like"><img src="images/share-2-icon.png" /></a></div>'+
                        '<div class="title_videos"><span class="title">'+titleOK+'<br/></span>'+Videos._list_videos.list[i].views_total+' vues</div>'+
                  	'</div>';
        }
        liste += '</div>';
        $('#page_videos').find('#scroller').html(liste);
        //Api._scrollPage_Videos.refresh();
    },
	
	
	choixFacebookTwitter : function(tmp) {	
		Videos._partage_videos=Videos._list_videos.list[tmp].url;
		console.log(Videos._list_videos.list[tmp]);	
		if(isphonegap == true)
		{
			navigator.notification.confirm(
				'Sur quel réseau social voulez-vous partager ce contenu ?',  // message
				Videos.callBackChoixFacebookTwitter,   // fonction de callback appelée avec l'indice du bouton pressé
				'Partager le contenu',    // titre
				['Twitter','Facebook']  // libellés des boutons
			);
		}
		else
		{
			window.open('choixTwitterFacebook.php?shareFace='+encodeURI(Videos._partage_videos)+'&shareTweet='+encodeURI(Videos._partage_videos)+'&txtShareTweet=','nom_de_ma_popup','menubar=no, scrollbars=no, top=100, left=100, width=300, height=400');
		}
	},
	
	callBackChoixFacebookTwitter : function(button) {	
		if (button==1) {
			console.log("Twitter");
			console.log(Videos._partage_videos);
			var shareselect=Videos._partage_videos;
			window.plugins.socialsharing.shareViaTwitter('', null /* img */, shareselect);
        } 
		else if(button==2) {
			console.log("Facebook");
			console.log(Videos._partage_videos);
			var shareselect2=Videos._partage_videos;
			window.plugins.socialsharing.shareViaFacebook('', null /* img */, shareselect2);
        }
	},

    likeVideo : function(p_node) {
        if($('#video_like_'+p_node).hasClass('active')) {
            console.log('deja like video');
        } else {
            console.log('like video');
            console.log('like url => http://www.facebook.com/sharer.php?u='+escape(Videos._list_videos.list[p_node].url));
            $('#video_like_'+p_node).addClass('active');
        }
    },

    playVideo : function(p_node) {
		
		document.getElementById("buttonBackVideo").innerHTML='<a href="javascript:" onclick="Videos.stop(); goVideos();"><span>Retour</span></a>';
		$('#charge_dm_player').html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
		
		goEmbedVideos();
		
		console.log(g.get('paused'));
		
		if(g.get('paused')==false)
		{
			pausegear();
		}
	
		Videos._player =  DM.player("dm_player", {video: Videos._list_videos.list[p_node].id, width:$("#page_embed_video").width(), height:($("#page_embed_video").width())*(9/16), params: { html:true, related:0, autoplay:1, fullscreen: true} });
		Videos._player.addEventListener("apiready", function(e)
        {
		$('#charge_dm_player').html('');
		console.log("apiReady: " + Videos._player.apiReady);
		setTimeout(function() {
		        Videos._player.play();
		}, 200);
	
			Videos._player.addEventListener("ended", function(e) {
				Videos.stop();
				goVideos();
			});
		});
	
    },
    stop: function() {
		if(Videos._player) {
			Videos._player.pause();
			Videos._player = null;
			$('#dm_player').html('');
		}
//	Videos._player.load("");
    }
    /*closeVideo : function() {
		Videos.stop();
        //goEmbedVideos();
        $('#page_embed_video').find('#scroller').html('');
    }*/
}