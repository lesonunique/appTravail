var f = $(document).foundation(),
	g = $('.gearWrap').gearPlayer();
var numPlay = 0;
var ajoutEnCours = 0;

var fluxencoursMODIF = 999;

g.ready(function(){
	//g.play(0);
	if(isphonegap == true)
	{
		ConnectLogin.pregoLoad();
	}
	else
	{
		ConnectLogin.goLoad2();
	}
	
});

/*g.change(function(){
	Direct.refreshData();
});*/
			  
function demarrerPlayer(jsonNew)
{	  
	g.albumObj(jsonNew);  
	g.show();
}

function demarrerPlayer2(jsonActuelMerge2)
{	  	  
	g.albumObj(jsonActuelMerge2);
	
	document.getElementById("gearMiniTitle").innerHTML=jsonActuelMerge2.entries[ajoutEnCours].title;
	document.getElementById("gearMiniAuthor").innerHTML=jsonActuelMerge2.entries[ajoutEnCours].author;
			
	var t = $('#gearMiniTitle').width(),
		a = $('#gearMiniAuthor').width(),
		w = t>a?t:a;
	TweenMax.to($('#gearMiniLabel'), 0.5, {width:Math.floor(w+40)+'px'});
	//if ($('#gearMiniLabel>.gearTitle').html().trim()) { TweenMax.to($('#gearMiniLabel'), 0.5, {width:Math.floor(w+40)+'px'}) };
	
	console.log(ajoutEnCours);
}

function endReset()
{	 
	console.log('fluxencoursMODIF : '+fluxencoursMODIF);
	if(fluxencoursMODIF == 999)
	{
		console.log(ajoutEnCours); 	  
		if(ajoutEnCours!=0)
		{
			Direct._play = true;
			//Direct.showTitle();
			g.play(ajoutEnCours);
		}
		else
		{
			Direct._play = true;
			//Direct.showTitle();
			g.play();
		}
	}
	else
	{
		g.play(fluxencoursMODIF);
		fluxencoursMODIF = 999;
	}
	
	//newAlbumPodcast();
}
              
// offcanvas function
function toggle() {

	if ($('.stage').hasClass('side') || close == true) {
            
		TweenMax.to($('.stage>.wrap, .stage>.overlay>span'), 0.5, {x:0, ease:Cubic.easeInOut, clearProps:"transform"});
		TweenMax.to($('.stage>.overlay'), 0.5, {autoAlpha:0, onComplete: function() { $('body').css({'overflow-y':'inherit'}); $('.offcanvas-menu').css({'display':'none', 'visibility':'hidden'}) } });

		$('.stage').removeClass('side');

	} else {
            
		TweenMax.to($('.stage>.wrap, .stage>.overlay>span'), 0.5, {x:-$('.offcanvas-menu').width(), ease:Cubic.easeInOut});
		TweenMax.to($('.stage>.overlay'), 0.5, {autoAlpha:1, onComplete: function() { $('body').css({'overflow-y':'hidden'})} });

		window.scrollTo(0, 0);

		$('.stage').addClass('side');
		$('.offcanvas-menu').css({'display':'block', 'visibility':'visible'});
		
	}
	
}

// offcanvas event
$('.offcanvas-toggle, .stage>.overlay').click(function(){ toggle(); });

// rollover effects
$('.over i').each(function() { TweenMax.set($(this), {scaleX:0, scaleY:0}); });

$('.cover').hover(function(){
	TweenMax.to($(this).children('.over'), 0.5, {alpha:1});
	TweenMax.to($(this).children('.over').children('i'), 0.5, {scaleX:1, scaleY:1});
}, function(){
	TweenMax.to($(this).children('.over'), 0.5, {alpha:0});
	TweenMax.to($(this).children('.over').children('i'), 0.5, {scaleX:0, scaleY:0});
});


// put here your custom scripts, if you want to use this file for your stuff
	
	// INITIALISATION DES FLUX DU PLAYER //
	
if((localStorage.getItem("user_connected")) == 1)
{
	var fluxperso = localStorage.getItem("fluxperso");
	if(fluxperso == 1)
	{
		g.deeplink('app-gear/json/albumONE.json');
		/*if(isAndroid2 == true)
		{
			console.log('Android');
			g.deeplink('app-gear/json/albumANDROID.json');
		}
		else if(isIOS == true)
		{
			console.log('iOs');
			g.deeplink('app-gear/json/albumIOS.json');
		}
		else if(isWindowsPhone == true)
		{
			console.log('Windows Phone');
			g.deeplink('app-gear/json/albumWIN.json');
		}
		else
		{
			console.log('Autre');
			g.deeplink('app-gear/json/albumDEF.json');
		}*/
	}
	else
	{
		
		if(isAndroid2 == true)
		{
			console.log('Android');
			g.deeplink('app-gear/json/albumANDROID.json');
		}
		else if(isIOS == true)
		{
			console.log('iOs');
			g.deeplink('app-gear/json/albumIOS.json');
		}
		else if(isWindowsPhone == true)
		{
			console.log('Windows Phone');
			g.deeplink('app-gear/json/albumWIN.json');
		}
		else
		{
			console.log('Autre');
			g.deeplink('app-gear/json/albumDEF.json');
		}
	}
}
else
{
	if(isAndroid2 == true)
	{
		console.log('Android');
		g.deeplink('app-gear/json/albumANDROID.json');
	}
	else if(isIOS == true)
	{
		console.log('iOs');
		g.deeplink('app-gear/json/albumIOS.json');
	}
	else if(isWindowsPhone == true)
	{
		console.log('Windows Phone');
		g.deeplink('app-gear/json/albumWIN.json');
	}
	else
	{
		console.log('Autre');
		g.deeplink('app-gear/json/albumDEF.json');
	}
}
				
function afficherPlayer()
{
	_gInterface.show();
	taillePlayer=1;
}

function cacherPlayer()
{
	_gInterface.hide();
	taillePlayer=0;
}

function newAlbumPodcast()
{
	$.ajax
	({
		url: 'http://www.lesonunique.com/services/lastpodcast', 		
		method: 'GET',
		dataType: 'json',
		success: function(pod) 
		{
			console.log('new album podcast');
			console.log(pod);
			var title0 = pod.nodes[0].node.title.replace(/&#039;/g, "'");
			_entries[(g.get('total')-1)].title = systemAccent(title0);
			_entries[(g.get('total')-1)].media = systemAccent(pod.nodes[0].node.son);
			numPlay=0;
			
			Direct._titlePodcast = pod.nodes[0].node.title;
			Direct._artistePodcast = '';
			Direct._imgPodcast = pod.nodes[0].node.image;
			Direct._lienPodcast = pod.nodes[0].node.URL;
			//g.show();
		},
		error: function() 
		{
			console.log("Pas d'éléments");
		}
	});
}
				

function pauseSonTemp(i,type)
{
	if(type=='pod')
	{
		$("#repereLecturePod_"+i+" .play1").show();
		$("#repereLecturePod_"+i+" .play2").hide();
		g.pause();
	}
	if(type=='podOff')
	{
		$("#repereLecturePod2_"+i+" .play1").show();
		$("#repereLecturePod2_"+i+" .play2").hide();
		g.pause();
	}
	if(type=='ded')
	{
		$("#repereLectureDed_"+i+" .play1").show();
		$("#repereLectureDed_"+i+" .play2").hide();
		g.pause();
	}
	if(type=='ded2')
	{
		$("#repereLectureDed2_"+i+" .play1").show();
		$("#repereLectureDed2_"+i+" .play2").hide();
		g.pause();
	}
	if(type=='playl')
	{
		$("#repereLecturePlay_"+i+" .play1").show();
		$("#repereLecturePlay_"+i+" .play2").hide();
		g.pause();
	}
	if(type=='titres')
	{
		$("#repereLectureTitres_"+i+" .play1").show();
		$("#repereLectureTitres_"+i+" .play2").hide();
		g.pause();
	}
}

function newSonTemp(i,type)
{
	var jsonActuel = g.get('entries');
	var numPlay = g.get('total');
	
	if(type=='pod')
	{
		var media=Podcasts._list_podcasts[i].son,
			author='Podcast',
			imageLien=Podcasts._list_podcasts[i].image,
			urlContenu=Podcasts._list_podcasts[i].url;
		
		console.log('pod');
		
		$("#listePodcasts .play1").not("#repereLecturePod_"+i+" .play1").show();
		$("#listePodcasts .play2").not("#repereLecturePod_"+i+" .play2").hide();
		$("#listePodcasts2 .play1").not("#repereLecturePod2_"+i+" .play1").show();
		$("#listePodcasts2 .play2").not("#repereLecturePod2_"+i+" .play2").hide();
		$("#table-dedicace-playlist .play1").not("#repereLectureDed_"+i+" .play1").show();
		$("#table-dedicace-playlist .play2").not("#repereLectureDed_"+i+" .play2").hide();
		$("#table-dedicace-playlist2 .play1").not("#repereLectureDed2_"+i+" .play1").show();
		$("#table-dedicace-playlist2 .play2").not("#repereLectureDed2_"+i+" .play2").hide();
		$("#playlist_content .play1").not("#repereLecturePlay_"+i+" .play1").show();
		$("#playlist_content .play2").not("#repereLecturePlay_"+i+" .play2").hide();
		
		$("#repereLecturePod_"+i+" .play1").hide();
		$("#repereLecturePod_"+i+" .play2").show();
		
		if(Podcasts._list_podcasts[i].node_title.length>27)
		{
			var baseTitle = Podcasts._list_podcasts[i].node_title;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var title = titletronc.concat(titletronc2);
		}
		else
		{
			var title = Podcasts._list_podcasts[i].node_title;
		}
		
		/*$(".barreTimePod").html('');
		document.getElementById("barreTimePod_"+i).innerHTML = '<div id="controlPlayer"><div id="input-wrapper"><input type="range" class="sliderPlayer" id="rangeslider" min="0" max="100" value="0" step="0.05" oninput="updateOutput(value, true)" onchange="deactivate()" onmouseup="deactivate()" /></div><div id="timePlayer"><span class="time1">12:08</span><span class="time2">/</span><span class="time3">24:18</span></div></div>';*/
		
	}
	/*if(type=='podOff')
	{
		var media=Podcasts._jsonPodOffJSON.podOFF[i].lienOffline,
			author='Podcast',
			imageLien='http://www.lesonunique.com/appli/images/vinyl-disc-record-placemats.jpg';
		
		console.log('podOff');
		
		$("#listePodcasts .play1").not("#repereLecturePod_"+i+" .play1").show();
		$("#listePodcasts .play2").not("#repereLecturePod_"+i+" .play2").hide();
		$("#listePodcasts2 .play1").not("#repereLecturePod2_"+i+" .play1").show();
		$("#listePodcasts2 .play2").not("#repereLecturePod2_"+i+" .play2").hide();
		$("#table-dedicace-playlist .play1").not("#repereLectureDed_"+i+" .play1").show();
		$("#table-dedicace-playlist .play2").not("#repereLectureDed_"+i+" .play2").hide();
		$("#table-dedicace-playlist2 .play1").not("#repereLectureDed2_"+i+" .play1").show();
		$("#table-dedicace-playlist2 .play2").not("#repereLectureDed2_"+i+" .play2").hide();
		$("#playlist_content .play1").not("#repereLecturePlay_"+i+" .play1").show();
		$("#playlist_content .play2").not("#repereLecturePlay_"+i+" .play2").hide();
		
		$("#repereLecturePod2_"+i+" .play1").hide();
		$("#repereLecturePod2_"+i+" .play2").show();
		
		if(Podcasts._jsonPodOffJSON.podOFF[i].name.length>27)
		{
			var baseTitle = Podcasts._jsonPodOffJSON.podOFF[i].name;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var title = titletronc.concat(titletronc2);
		}
		else
		{
			var title = Podcasts._jsonPodOffJSON.podOFF[i].name;
		}
		
		$(".barreTimePod").html('');
		document.getElementById("barreTimePod2_"+i).innerHTML = '<div id="controlPlayer"><div id="input-wrapper"><input type="range" class="sliderPlayer" id="rangeslider" min="0" max="100" value="0" step="0.05" oninput="updateOutput(value, true)" onchange="deactivate()" onmouseup="deactivate()" /></div><div id="timePlayer"><span class="time1">12:08</span><span class="time2">/</span><span class="time3">24:18</span></div></div>';
		
	}*/
	if(type=='ded')
	{
		var media=Dedicace._json_list[i].extrait_audio,
			author='Extrait MySun',
			imageLien='http://www.lesonunique.com/appli/images/vinyl-disc-record-placemats.jpg',
			urlContenu='';
			
		console.log('ded');
		
		$("#listePodcasts .play1").not("#repereLecturePod_"+i+" .play1").show();
		$("#listePodcasts .play2").not("#repereLecturePod_"+i+" .play2").hide();
		$("#listePodcasts2 .play1").not("#repereLecturePod2_"+i+" .play1").show();
		$("#listePodcasts2 .play2").not("#repereLecturePod2_"+i+" .play2").hide();
		$("#table-dedicace-playlist .play1").not("#repereLectureDed_"+i+" .play1").show();
		$("#table-dedicace-playlist .play2").not("#repereLectureDed_"+i+" .play2").hide();
		$("#table-dedicace-playlist2 .play1").not("#repereLectureDed2_"+i+" .play1").show();
		$("#table-dedicace-playlist2 .play2").not("#repereLectureDed2_"+i+" .play2").hide();
		$("#playlist_content .play1").not("#repereLecturePlay_"+i+" .play1").show();
		$("#playlist_content .play2").not("#repereLecturePlay_"+i+" .play2").hide();
		$("#titre_diffus .play1").not("#repereLectureTitres_"+i+" .play1").show();
		$("#titre_diffus .play2").not("#repereLectureTitres_"+i+" .play2").hide();
		
		$("#repereLectureDed_"+i+" .play1").hide();
		$("#repereLectureDed_"+i+" .play2").show();
			
		if(Dedicace._json_list[i].titre.length>27)
		{
			var baseTitle = Dedicace._json_list[i].titre;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var title = titletronc.concat(titletronc2);
		}
		else
		{
			var title = Dedicace._json_list[i].titre;
		}
		
		$(".barreTimePod").html('');
		
	}
	if(type=='ded2')
	{
		var media=Dedicace._json_list2[i].extrait_audio,
			author='Extrait MySun',
			imageLien='http://www.lesonunique.com/appli/images/vinyl-disc-record-placemats.jpg',
			urlContenu='';
			
		console.log('ded2');
		
		$("#listePodcasts .play1").not("#repereLecturePod_"+i+" .play1").show();
		$("#listePodcasts .play2").not("#repereLecturePod_"+i+" .play2").hide();
		$("#listePodcasts2 .play1").not("#repereLecturePod2_"+i+" .play1").show();
		$("#listePodcasts2 .play2").not("#repereLecturePod2_"+i+" .play2").hide();
		$("#table-dedicace-playlist .play1").not("#repereLectureDed_"+i+" .play1").show();
		$("#table-dedicace-playlist .play2").not("#repereLectureDed_"+i+" .play2").hide();
		$("#table-dedicace-playlist2 .play1").not("#repereLectureDed2_"+i+" .play1").show();
		$("#table-dedicace-playlist2 .play2").not("#repereLectureDed2_"+i+" .play2").hide();
		$("#playlist_content .play1").not("#repereLecturePlay_"+i+" .play1").show();
		$("#playlist_content .play2").not("#repereLecturePlay_"+i+" .play2").hide();
		$("#titre_diffus .play1").not("#repereLectureTitres_"+i+" .play1").show();
		$("#titre_diffus .play2").not("#repereLectureTitres_"+i+" .play2").hide();
		
		$("#repereLectureDed2_"+i+" .play1").hide();
		$("#repereLectureDed2_"+i+" .play2").show();
			
		if(Dedicace._json_list2[i].titre.length>27)
		{
			var baseTitle = Dedicace._json_list2[i].titre;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var title = titletronc.concat(titletronc2);
		}
		else
		{
			var title = Dedicace._json_list2[i].titre;
		}
		
		$(".barreTimePod").html('');
		
	}
	if(type=='playl')
	{
		var media=Playlist._playlist_usr.node[i].field_extrait_audio,
			author='Extrait MyPlaylist',
			imageLien=Playlist._playlist_usr.node[i].field_image_album.src,
			urlContenu='';
			
		console.log('playl');
		
		$("#listePodcasts .play1").not("#repereLecturePod_"+i+" .play1").show();
		$("#listePodcasts .play2").not("#repereLecturePod_"+i+" .play2").hide();
		$("#listePodcasts2 .play1").not("#repereLecturePod2_"+i+" .play1").show();
		$("#listePodcasts2 .play2").not("#repereLecturePod2_"+i+" .play2").hide();
		$("#table-dedicace-playlist .play1").not("#repereLectureDed_"+i+" .play1").show();
		$("#table-dedicace-playlist .play2").not("#repereLectureDed_"+i+" .play2").hide();
		$("#table-dedicace-playlist2 .play1").not("#repereLectureDed2_"+i+" .play1").show();
		$("#table-dedicace-playlist2 .play2").not("#repereLectureDed2_"+i+" .play2").hide();
		$("#playlist_content .play1").not("#repereLecturePlay_"+i+" .play1").show();
		$("#playlist_content .play2").not("#repereLecturePlay_"+i+" .play2").hide();
		$("#titre_diffus .play1").not("#repereLectureTitres_"+i+" .play1").show();
		$("#titre_diffus .play2").not("#repereLectureTitres_"+i+" .play2").hide();
		
		$("#repereLecturePlay_"+i+" .play1").hide();
		$("#repereLecturePlay_"+i+" .play2").show();
			
		if(Playlist._playlist_usr.node[i].title.length>27)
		{
			var baseTitle = Playlist._playlist_usr.node[i].title;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var title = titletronc.concat(titletronc2);
		}
		else
		{
			var title = Playlist._playlist_usr.node[i].title;
		}
		
		$(".barreTimePod").html('');
		
	}
	if(type=='titres')
	{
		var media=Diffusion._titres_usr.nodes[i].field_extrait_audio,
			author='Extrait Titre',
			imageLien=Diffusion._titres_usr.nodes[i].field_image_album.src,
			urlContenu='';
			
		console.log('titres');
		
		$("#listePodcasts .play1").not("#repereLecturePod_"+i+" .play1").show();
		$("#listePodcasts .play2").not("#repereLecturePod_"+i+" .play2").hide();
		$("#listePodcasts2 .play1").not("#repereLecturePod2_"+i+" .play1").show();
		$("#listePodcasts2 .play2").not("#repereLecturePod2_"+i+" .play2").hide();
		$("#table-dedicace-playlist .play1").not("#repereLectureDed_"+i+" .play1").show();
		$("#table-dedicace-playlist .play2").not("#repereLectureDed_"+i+" .play2").hide();
		$("#table-dedicace-playlist2 .play1").not("#repereLectureDed2_"+i+" .play1").show();
		$("#table-dedicace-playlist2 .play2").not("#repereLectureDed2_"+i+" .play2").hide();
		$("#playlist_content .play1").not("#repereLecturePlay_"+i+" .play1").show();
		$("#playlist_content .play2").not("#repereLecturePlay_"+i+" .play2").hide();
		$("#titre_diffus .play1").not("#repereLectureTitres_"+i+" .play1").show();
		$("#titre_diffus .play2").not("#repereLectureTitres_"+i+" .play2").hide();
		
		$("#repereLectureTitres_"+i+" .play1").hide();
		$("#repereLectureTitres_"+i+" .play2").show();
			
		if(Diffusion._titres_usr.nodes[i].title.length>27)
		{
			var baseTitle = Diffusion._titres_usr.nodes[i].title;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var title = titletronc.concat(titletronc2);
		}
		else
		{
			var title = Diffusion._titres_usr.nodes[i].title;
		}
		
		$(".barreTimePod").html('');
		
	}
	
	/*if(ajoutEnCours==0)
	{*/
		ajoutEnCours = numPlay - 1;
		console.log(jsonActuel);
		
		$.ajax
		({
			url: 'app-gear/json/albumVide.json', 		
			method: 'GET',
			dataType: 'json',
			success: function(jsonActuelMerge) 
			{
				var title2 = title.replace(/&#039;/g, "'");
				var nbJSON = jsonActuel.length - 1;
				console.log(jsonActuelMerge);
				for (i = 0; i < nbJSON; i++)
				{
					jsonActuelMerge.entries.push({"title":""+jsonActuel[i].title+"", "author":""+jsonActuel[i].author+"", "media":""+jsonActuel[i].media+"", "link":"", "color":""+jsonActuel[i].color+"" });
					console.log(jsonActuelMerge);
				}
				jsonActuelMerge.entries.push({"title":""+systemAccent(title2)+"", "author":""+systemAccent(author)+"", "media":""+media+"", "link":"", "color":"#56B0E8" });
				
				console.log(title);
				console.log(author);
				console.log(media);
				console.log(jsonActuelMerge);
				
				Direct._titlePodcast = title;
				Direct._artistePodcast = author;
				Direct._imgPodcast = imageLien;
				Direct._lienPodcast = urlContenu;
				
				demarrerPlayer2(jsonActuelMerge);
			}
		}).done(function() {
  g.refresh(); // this scans the whole document again for new albums and adds them to its routine
});
	/*}
	else
	{
		$.ajax
		({
			url: 'app-gear/json/albumVide.json', 		
			method: 'GET',
			dataType: 'json',
			success: function(jsonActuelMerge)
			{
				var nbJSON = jsonActuel.length;
				
				for (i = 0; i < ajoutEnCours; i++)
				{
					jsonActuelMerge.entries.push({"title":""+jsonActuel[i].title+"", "author":""+jsonActuel[i].author+"", "media":""+jsonActuel[i].media+"", "link":"", "color":""+jsonActuel[i].color+"" });
					console.log(i);
				}
				
				jsonActuelMerge.entries.push({"title":""+systemAccent(title)+"", "author":""+systemAccent(author)+"", "media":""+media+"", "link":"", "color":"#50597B" });
				
				for (i = (ajoutEnCours); i < (numPlay-2); i++)
				{
					jsonActuelMerge.entries.push({"title":""+jsonActuel[i].title+"", "author":""+jsonActuel[i].author+"", "media":""+jsonActuel[i].media+"", "link":"", "color":""+jsonActuel[i].color+"" });
					console.log(i);
				}
				
				demarrerPlayer2(jsonActuelMerge);			
			}
		}).done(function() {
  g.refresh(); // this scans the whole document again for new albums and adds them to its routine
});
	}*/
			
}

function chargeMYflux(fluxnoel,fluxsports,fluxevents,flux10080,fluxfranco)
{
	Direct._imgPodcast = "http://www.lesonunique.com/appli/images/vinyl-disc-record-placemats.jpg";

	$.ajax
		({
			url: 'app-gear/json/albumVide.json', 		
			method: 'GET',
			dataType: 'json',
			success: function(jsonBase) 
			{
				var activeNoel = 0;
				var activeSports = 0;
				var activeEvents = 0;
				var active10080 = 0;
				var activefranco = 0;
				
				var jsonFluxPosition = JSON.parse('{"positionflux": []}');
				
				if(isAndroid2 == true)
				{
					console.log('Android');
					jsonBase.entries.push({"title":"SUN Nantes", "author":"93FM/RNT","media":"http://80.82.229.202/sun.ogg", "link":"", "color":"#f39e19" });
					jsonFluxPosition.positionflux.push({"flux":"sun"});
				}
				else if(isIOS == true)
				{
					console.log('iOs');
					jsonBase.entries.push({"title":"SUN Nantes", "author":"93FM/RNT","media":"http://80.82.229.202/sun.aac", "link":"", "color":"#f39e19" });
					jsonFluxPosition.positionflux.push({"flux":"sun"});
				}
				else if(isWindowsPhone == true)
				{
					console.log('Windows Phone');
					jsonBase.entries.push({"title":"SUN Nantes", "author":"93FM/RNT","media":"http://80.82.229.202/sun.ogg", "link":"", "color":"#f39e19" });
					jsonFluxPosition.positionflux.push({"flux":"sun"});
				}
				else
				{
					console.log('Autre');
					jsonBase.entries.push({"title":"SUN Nantes", "author":"93FM/RNT","media":"http://80.82.229.202/sunhd.mp3", "link":"", "color":"#f39e19" });
					jsonFluxPosition.positionflux.push({"flux":"sun"});
				}
				
				if(fluxnoel == 1)
				{
					jsonBase.entries.push({"title":"SUN Noel", "author":"WebRadio/RNT", "media":"http://80.82.229.202/sunnoel.mp3", "link":"", "color":"#CB1303" });
					activeNoel = 1;
					jsonFluxPosition.positionflux.push({"flux":"noel"});
				}
				if(fluxfranco == 1)
				{
					jsonBase.entries.push({"title":"Franco SUN", "author":"WebRadio","media":"http://80.82.229.202/francosun.mp3", "link":"", "color":"#5700f2" });
					activefranco = 1;
					jsonFluxPosition.positionflux.push({"flux":"franco"});
				}
				if(fluxsports == 1)
				{
					jsonBase.entries.push({"title":"SUN Sports", "author":"WebRadio/RNT", "media":"http://80.82.229.202/sunsports.mp3", "link":"", "color":"#0B8A2F" });
					activeSports = 1;
					jsonFluxPosition.positionflux.push({"flux":"sports"});
				}
				if(fluxevents == 1)
				{
					jsonBase.entries.push({"title":"SUN Event", "author":"WebRadio", "media":"http://80.82.229.202/sunext2.mp3", "link":"", "color":"#911818" });
					activeEvents = 1;
					jsonFluxPosition.positionflux.push({"flux":"events"});
				}
				if(flux10080 == 1)
				{
					jsonBase.entries.push({"title":"100%80", "author":"WebRadio", "media":"http://80.82.229.202/sun100-80.mp3", "link":"", "color":"#E1007A" });
					active10080 = 1;
					jsonFluxPosition.positionflux.push({"flux":"10080"});
				}

				jsonBase.entries.push({"title":"Dernier Podcast", "author":"SUN", "media":"jingle.mp3", "link":"", "color":"#56B0E8" });
				jsonFluxPosition.positionflux.push({"flux":"sun2"});
				
				var jsonFluxActifs = JSON.parse('{"fluxactifs": {"noel":'+activeNoel+',"sports":'+activeSports+',"events":'+activeEvents+',"10080":'+active10080+',"franco":'+activefranco+'}}');
				
				console.log(jsonBase);
				console.log(jsonFluxActifs);
				console.log(jsonFluxPosition);
				
				localStorage.setItem("fluxperso",1);
				localStorage.setItem("fluxactifs",JSON.stringify(jsonFluxActifs));
				localStorage.setItem("JSONfluxperso",JSON.stringify(jsonBase));
				localStorage.setItem("JSONfluxposition",JSON.stringify(jsonFluxPosition));
				
				fluxencoursMODIF = 0;
				
				document.getElementById("btn_dedicace_sun").style.display="block";
				//document.getElementById("btn_dedicace_noel").style.display="none";
				document.getElementById("btn_dedicace_franco").style.display="none";
				document.getElementById("btn_dedicace_sports").style.display="none";
				document.getElementById("btn_dedicace_events").style.display="none";
				document.getElementById("btn_dedicace_10080").style.display="none";
				document.getElementById("btn_dedicace_sun2").style.display="none";
				
				g.albumObj(jsonBase);
				
				if(isphonegap == true)
				{
					//window.plugins.toast.showShortBottom(msg);
					window.plugins.toast.showWithOptions(
					{
					  message: "Vos choix de flux sont enregistrés",
					  duration: "short",
					  position: "top",
					  addPixelsY: 50
					});
				}
				else
				{
					document.getElementById("messageFlottant").style.background = '#BFF1BC';
					document.getElementById("messageFlottant").style.color = '#324431';
					document.getElementById("messageFlottantText").innerHTML = 'Vos choix de flux sont enregistrés';
					document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixVerte.png"/>';
					document.getElementById("messageFlottant").style.display = 'block';
					
					window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
				}
			}
		}).done(function() {
		  g.refresh(); // this scans the whole document again for new albums and adds them to its routine
		  g.pause();
		  g.play(0);
		  newAlbumPodcast();
	});
}

function chargeMYflux2(fluxnoel,fluxsports,fluxevents,flux10080,fluxfranco)
{
	Direct._imgPodcast = "http://www.lesonunique.com/appli/images/vinyl-disc-record-placemats.jpg";

	$.ajax
		({
			url: 'app-gear/json/albumVide.json', 		
			method: 'GET',
			dataType: 'json',
			success: function(jsonBase) 
			{
				var activeNoel = 0;
				var activeSports = 0;
				var activeEvents = 0;
				var active10080 = 0;
				var activefranco = 0;
				
				var jsonFluxPosition = JSON.parse('{"positionflux": []}');
				
				if(isAndroid2 == true)
				{
					console.log('Android');
					jsonBase.entries.push({"title":"SUN Nantes", "author":"93FM/RNT","media":"http://80.82.229.202/sun.ogg", "link":"", "color":"#f39e19" });
					jsonFluxPosition.positionflux.push({"flux":"sun"});
				}
				else if(isIOS == true)
				{
					console.log('iOs');
					jsonBase.entries.push({"title":"SUN Nantes", "author":"93FM/RNT","media":"http://80.82.229.202/sun.aac", "link":"", "color":"#f39e19" });
					jsonFluxPosition.positionflux.push({"flux":"sun"});
				}
				else if(isWindowsPhone == true)
				{
					console.log('Windows Phone');
					jsonBase.entries.push({"title":"SUN Nantes", "author":"93FM/RNT","media":"http://80.82.229.202/sun.ogg", "link":"", "color":"#f39e19" });
					jsonFluxPosition.positionflux.push({"flux":"sun"});
				}
				else
				{
					console.log('Autre');
					jsonBase.entries.push({"title":"SUN Nantes", "author":"93FM/RNT","media":"http://80.82.229.202/sunhd.mp3", "link":"", "color":"#f39e19" });
					jsonFluxPosition.positionflux.push({"flux":"sun"});
				}
				
				if(fluxnoel == 1)
				{
					jsonBase.entries.push({"title":"SUN Noel", "author":"WebRadio/RNT", "media":"http://80.82.229.202/sunnoel.mp3", "link":"", "color":"#CB1303" });
					activeNoel = 1;
					jsonFluxPosition.positionflux.push({"flux":"noel"});
				}
				if(fluxfranco == 1)
				{
					jsonBase.entries.push({"title":"Franco SUN", "author":"WebRadio","media":"http://80.82.229.202/francosun.mp3", "link":"", "color":"#5700f2" });
					activefranco = 1;
					jsonFluxPosition.positionflux.push({"flux":"franco"});
				}
				if(fluxsports == 1)
				{
					jsonBase.entries.push({"title":"SUN Sports", "author":"WebRadio/RNT", "media":"http://80.82.229.202/sunsports.mp3", "link":"", "color":"#0B8A2F" });
					activeSports = 1;
					jsonFluxPosition.positionflux.push({"flux":"sports"});
				}
				if(fluxevents == 1)
				{
					jsonBase.entries.push({"title":"SUN Event", "author":"WebRadio", "media":"http://80.82.229.202/sunext2.mp3", "link":"", "color":"#911818" });
					activeEvents = 1;
					jsonFluxPosition.positionflux.push({"flux":"events"});
				}
				if(flux10080 == 1)
				{
					jsonBase.entries.push({"title":"100%80", "author":"WebRadio", "media":"http://80.82.229.202/sun100-80.mp3", "link":"", "color":"#E1007A" });
					active10080 = 1;
					jsonFluxPosition.positionflux.push({"flux":"10080"});
				}

				jsonBase.entries.push({"title":"Dernier Podcast", "author":"SUN", "media":"jingle.mp3", "link":"", "color":"#56B0E8" });
				jsonFluxPosition.positionflux.push({"flux":"sun2"});
				
				var jsonFluxActifs = JSON.parse('{"fluxactifs": {"noel":'+activeNoel+',"sports":'+activeSports+',"events":'+activeEvents+',"10080":'+active10080+',"franco":'+activefranco+'}}');
				
				console.log(jsonBase);
				console.log(jsonFluxActifs);
				console.log(jsonFluxPosition);
				
				localStorage.setItem("fluxperso",1);
				localStorage.setItem("fluxactifs",JSON.stringify(jsonFluxActifs));
				localStorage.setItem("JSONfluxperso",JSON.stringify(jsonBase));
				localStorage.setItem("JSONfluxposition",JSON.stringify(jsonFluxPosition));
				
				fluxencoursMODIF = 0;
				
				g.albumObj(jsonBase);
				
			}
		}).done(function() {
		  g.refresh(); // this scans the whole document again for new albums and adds them to its routine
		  g.pause();
		  g.play(0);
		  g.show();
		  newAlbumPodcast();
	});
}

function stopSonTemp()
{
	Direct._play = false;
	Direct.showTitle();
	g.pause();
}


function pausegear()
{
	document.getElementById("btn_play_pause").innerHTML='<img src="images/flatPlayer/PlayerPLAY.png" class="play" onclick="playgear();" />';
	Direct._play = false;
	if(Direct._fluxSelect==1)
	{
		Direct.showTitle();
	}
	else
	{
		Direct.showTitle2();
	}
	g.pause();
}

function playgear()
{
	document.getElementById("btn_play_pause").innerHTML='<img src="images/flatPlayer/PlayerPAUSE.png" class="pause" onclick="pausegear();" />';
	Direct._play = true;
	if(Direct._fluxSelect==1)
	{
		Direct.showTitle();
	}
	else
	{
		Direct.showTitle2();
	}
	g.play();
}

function mutegear()
{
	document.getElementById("btn_volume_mute_up").innerHTML='<img src="images/flatPlayer/volumeDOWN.png" class="mute" onclick="upgear();" />';
	g.volume(0);
}

function upgear()
{
	document.getElementById("btn_volume_mute_up").innerHTML='<img src="images/flatPlayer/volumeUP.png" class="up" onclick="mutegear();" />';
	g.volume(100);
}

function nextgear()
{
	Direct._play = true;
	_gPlayer.clear();
	_gPlayer.next();
}

function prevgear()
{
	Direct._play = true;
	_gPlayer.clear();
	_gPlayer.prev();
}

function agrandirBarre()
{
	$("#page_direct").removeClass("bottom");
	document.getElementById("btn_player_gear2").innerHTML="<img src='images/flatPlayer/reduire.png' onclick='reduireBarre();' />";
}

function reduireBarre()
{
	$("#page_direct").addClass("bottom");
	document.getElementById("btn_player_gear2").innerHTML="<img src='images/flatPlayer/agrandir.png' onclick='agrandirBarre();' />";
}

g.change(function(event){
	console.log(event);
	console.log(g.get('current'));
	if((g.get('current'))==(g.get('total')+1) && event=='end')
	{
		console.log('change');
		
		$("#listePodcasts .play1").not("#repereLecturePod_"+i+" .play1").show();
		$("#listePodcasts .play2").not("#repereLecturePod_"+i+" .play2").hide();
		$("#listePodcasts2 .play1").not("#repereLecturePod2_"+i+" .play1").show();
		$("#listePodcasts2 .play2").not("#repereLecturePod2_"+i+" .play2").hide();
		$("#table-dedicace-playlist .play1").not("#repereLectureDed_"+i+" .play1").show();
		$("#table-dedicace-playlist .play2").not("#repereLectureDed_"+i+" .play2").hide();
		$("#table-dedicace-playlist2 .play1").not("#repereLectureDed2_"+i+" .play1").show();
		$("#table-dedicace-playlist2 .play2").not("#repereLectureDed2_"+i+" .play2").hide();
		$("#playlist_content .play1").not("#repereLecturePlay_"+i+" .play1").show();
		$("#playlist_content .play2").not("#repereLecturePlay_"+i+" .play2").hide();
		$("#titre_diffus .play1").not("#repereLectureTitres_"+i+" .play1").show();
		$("#titre_diffus .play2").not("#repereLectureTitres_"+i+" .play2").hide();
		
		$(".barreTimePod").html('');
	}
});

g.change(function(event){
	console.log(g.get('current'));
	console.log('change');
	console.log(localStorage.getItem("JSONfluxposition"));
	
	Direct.init();
	
	if((localStorage.getItem("fluxperso") == 1))
	{
		var positionFLUX = JSON.parse(localStorage.getItem("JSONfluxposition"));
		var nbElemFLUX = positionFLUX.positionflux.length;
		console.log('nbElementsFLUX : '+nbElemFLUX);
		console.log(positionFLUX);
		
		for (i = 0; i < nbElemFLUX; i++)
		{
			if((g.get('current')) == (i+1))
			{
				$("#btn_dedicace_"+positionFLUX.positionflux[i].flux).show();
				console.log('show : '+i);
			}
			else
			{
				$("#btn_dedicace_"+positionFLUX.positionflux[i].flux).hide();
				console.log('hide : '+i);
			}
		}
		
		if ((g.get('current')) == (g.get('total')))
		{
			$("#btn_dedicace_sun").show();
			//$("#btn_dedicace_noel").hide();
			$("#btn_dedicace_franco").hide();
			$("#btn_dedicace_sports").hide();
			$("#btn_dedicace_events").hide();
			$("#btn_dedicace_sun2").hide();
		}
		
	}
	else
	{
		if((g.get('current'))==1)
		{
			document.getElementById("btn_dedicace_sun").style.display="block";
			//document.getElementById("btn_dedicace_noel").style.display="none";
			document.getElementById("btn_dedicace_franco").style.display="none";
			document.getElementById("btn_dedicace_sports").style.display="none";
			document.getElementById("btn_dedicace_events").style.display="none";
			document.getElementById("btn_dedicace_sun2").style.display="none";
		}
		/*else if((g.get('current'))==2)
		{
			document.getElementById("btn_dedicace_sun").style.display="none";
			document.getElementById("btn_dedicace_noel").style.display="block";
			document.getElementById("btn_dedicace_sports").style.display="none";
			document.getElementById("btn_dedicace_events").style.display="none";
			document.getElementById("btn_dedicace_sun2").style.display="none";
		}*/
		else if((g.get('current'))==2)
		{
			document.getElementById("btn_dedicace_sun").style.display="none";
			document.getElementById("btn_dedicace_franco").style.display="block";
			document.getElementById("btn_dedicace_sports").style.display="none";
			document.getElementById("btn_dedicace_events").style.display="none";
			document.getElementById("btn_dedicace_sun2").style.display="none";
		}
		else if((g.get('current'))==3)
		{
			document.getElementById("btn_dedicace_sun").style.display="none";
			//document.getElementById("btn_dedicace_noel").style.display="none";
			document.getElementById("btn_dedicace_franco").style.display="none";
			document.getElementById("btn_dedicace_sports").style.display="block";
			document.getElementById("btn_dedicace_events").style.display="none";
			document.getElementById("btn_dedicace_sun2").style.display="none";
		}
		else if((g.get('current'))==4)
		{
			document.getElementById("btn_dedicace_sun").style.display="none";
			//document.getElementById("btn_dedicace_noel").style.display="none";
			document.getElementById("btn_dedicace_franco").style.display="none";
			document.getElementById("btn_dedicace_sports").style.display="none";
			document.getElementById("btn_dedicace_events").style.display="block";
			document.getElementById("btn_dedicace_sun2").style.display="none";
		}
		else
		{
			document.getElementById("btn_dedicace_sun").style.display="none";
			//document.getElementById("btn_dedicace_noel").style.display="none";
			document.getElementById("btn_dedicace_franco").style.display="none";
			document.getElementById("btn_dedicace_sports").style.display="none";
			document.getElementById("btn_dedicace_events").style.display="none";
			document.getElementById("btn_dedicace_sun2").style.display="block";
		}
	}
});