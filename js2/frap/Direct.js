Direct = {

    _url_site : 'http://www.lesonunique.com',

    _open_menu : false,

    _box_titre : $('#box_titre_direct'),

    _box_partage : $('#box_partage_direct'),
	
	_fluxSelect : 1,
	
	_artistSelect : '',
	
	_titreSelect : '',
	
	_url_direct : '',
	
	_url_direct2 : '',
	
	_meta : '',
	
	_intervalle : '',

    _current_direct : '',
	
	_current_nid : '',
	
	_shareFace : '',
	
	_shareTweet : '',
	
	_txtShareTweet : '',
	
	_play : true,
	
	_titlePodcast : '',
	
	_artistePodcast : '',
	
	_imgPodcast : 'http://www.lesonunique.com/appli/images/vinyl-disc-record-placemats.jpg',
	
	_lienPodcast : '',
	
	_entityID : '',
	
	_nameFluxLive : ' - SUN Nantes',
	
	init : function() {
		this._url_direct = Flux._frap_flux.ws_meta_direct;
		//this._url_direct2 = Flux._frap_flux.ws_meta_direct2;
        console.log('************************************ Direct.init()');
        //Direct.refreshData();
		Direct.fluxRefresh();
		if (Direct._intervalle) clearInterval(Direct._intervalle);
		//Direct._intervalle = setInterval(Direct.refreshData,3000);
		Direct._intervalle = setInterval(Direct.fluxRefresh,3000);
	},
	
	fluxRefresh : function() {
		if((localStorage.getItem("fluxperso") == 1))
		{
			var positionFLUX = JSON.parse(localStorage.getItem("JSONfluxposition"));
			var nbElemFLUX = positionFLUX.positionflux.length;
			
			switch (positionFLUX.positionflux[(g.get('current') - 1)].flux) 
			{
				case 'sun':
					//fm_nantes
					document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
					Direct._fluxSelect = 1;
					Direct._nameFluxLive = ' - SUN';
					Direct.refreshData1();
					break;
				/*case 'noel':
					//w2
					document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Noël";
					Direct._fluxSelect = 2;
					Direct._nameFluxLive = ' - NOEL';
					Direct.refreshData2('w2');
					break;*/
				case 'franco':
					//w5
					document.getElementById("fluxChoisiMysun").innerHTML="MySun sur Franco SUN";
					Direct._fluxSelect = 5;
					Direct._nameFluxLive = ' - Franco SUN';
					Direct.refreshData2('w5');
					break;
				case 'sports':
					//w3 --> fm_nantes
					document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
					Direct._fluxSelect = 1;
					Direct._nameFluxLive = ' - SPORTS';
					Direct.refreshData1();
					break;
				case 'events':
					//w3 --> fm_nantes
					document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
					Direct._fluxSelect = 6;
					Direct._nameFluxLive = ' - EVENT';
					Direct.refreshDataEVENT();
					break;
				case '10080':
					//w4
					document.getElementById("fluxChoisiMysun").innerHTML="MySun sur 100%80";
					Direct._fluxSelect = 4;
					Direct._nameFluxLive = ' - 100%80';
					Direct.refreshData2('w4');
					break;
				case 'sun2':
					//Dernier pod
					document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
					Direct._fluxSelect = g.get('current');
					Direct._nameFluxLive = '';
					Direct.refreshData0();
					break;
			}
			
		}
		else
		{
			if((g.get('current'))==1)
			{
				document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
				Direct._fluxSelect = 1;
				Direct._nameFluxLive = ' - SUN';
				Direct.refreshData1();
			}
			/*else if((g.get('current'))==2)
			{
				document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Noël";
				Direct._fluxSelect = 2;
				Direct._nameFluxLive = ' - NOEL';
				Direct.refreshData2('w2');
			}*/
			else if((g.get('current'))==2)
			{
				document.getElementById("fluxChoisiMysun").innerHTML="MySun sur Franco SUN";
				Direct._fluxSelect = 5;
				Direct._nameFluxLive = ' - Franco SUN';
				Direct.refreshData2('w5');
			}
			else if((g.get('current'))==3)
			{
				document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
				Direct._fluxSelect = 1;
				Direct._nameFluxLive = ' - SPORTS';
				Direct.refreshData1();
			}
			else if((g.get('current'))==4)
			{
				document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
				Direct._fluxSelect = 6;
				Direct._nameFluxLive = ' - EVENT';
				Direct.refreshDataEVENT();
			}
			else if((g.get('current'))==5)
			{
				document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
				Direct._fluxSelect = 4;
				Direct._nameFluxLive = '';
				Direct.refreshData();
			}
			else
			{
				document.getElementById("fluxChoisiMysun").innerHTML="MySun sur SUN Nantes";
				Direct._fluxSelect = 1;
				Direct._nameFluxLive = '';
				Direct.refreshData1();
			}
		}
	},
	
	refreshData1 : function() {
		$.ajax
		({
			url: Direct._url_direct, 		
			method: 'GET',
			dataType: 'json',
			success: function(data) 
			{
				Direct._meta = data;
				if(Direct._current_direct != Direct._meta.current.title) {
					Direct._current_direct = Direct._meta.current.title;
					Direct._current_nid = Direct._meta.nids;
					Direct._entityID = Direct._meta.nids.current;
					testVote(Direct._fluxSelect);
					testFlag(Direct._fluxSelect);
					Direct.showTitle();
				}
			},
			error: function() 
			{
				console.log('********************************************* Direct.callback_error=');
			}
		});
		
		Direct._artistSelect = '';
		Direct._titreSelect = '';
	},
	
	refreshData2 : function(flux) {
		$.ajax
		({
			url: 'http://www.lesonunique.com/fluxnow/'+flux, 		
			method: 'GET',
			dataType: 'json',
			success: function(data) 
			{
				Direct._meta = data;
				console.log(Direct._meta);
				if(Direct._current_direct != Direct._meta.nodes[0].node.title) {
					Direct._current_direct = Direct._meta.nodes[0].node.title;
					Direct._current_nid = Direct._meta.nodes[0].node.Nid;
					Direct._entityID = Direct._meta.nodes[0].node.Nid;
					testVote(Direct._fluxSelect);
					testFlag(Direct._fluxSelect);
					Direct.showTitleALL(Direct._meta.nodes[0].node.title,Direct._meta.nodes[0].node.field_artiste,Direct._meta.nodes[0].node.field_image_album.src,Direct._meta.nodes[0].node.Nid,Direct._meta.nodes[0].node.path);
				}
			},
			error: function() 
			{
				console.log('********************************************* Direct.callback_error=');
			}
		});
		
		Direct._artistSelect = '';
		Direct._titreSelect = '';
	},
	
	refreshData0 : function() {
		var directEnCours = g.get('entries');
		Direct._artistSelect = directEnCours[Direct._fluxSelect-1].author;
		Direct._titreSelect = directEnCours[Direct._fluxSelect-1].title;
				
		if(Direct._current_direct != Direct._titreSelect) 
		{
			Direct._current_direct = Direct._titreSelect;
			Direct._entityID = '';
			testVote(Direct._fluxSelect);
			testFlag(Direct._fluxSelect);
			Direct.showTitle2();
		}
	},

	refreshData : function() {
		Direct._artistSelect = Direct._artistePodcast;
		Direct._titreSelect = Direct._titlePodcast;
				
		if(Direct._current_direct != Direct._titreSelect) 
		{
			Direct._current_direct = Direct._titreSelect;
			Direct._entityID = '';
			testVote(Direct._fluxSelect);
			testFlag(Direct._fluxSelect);
			Direct.showTitle2();
		}
	},
	
	refreshDataEVENT : function(flux) {
		var countNbEvent = 0;
		$.ajax
		({
			url: 'http://www.lesonunique.com/appli/fluxEVENTS.json', 		
			method: 'GET',
			dataType: 'json',
			success: function(data) 
			{
				Direct._meta = data;
				console.log(Direct._meta);
				for (i = 0; i < Direct._meta.events.length; i++)
				{
					if((Direct._meta.events[i].debut != "") && (Direct._meta.events[i].fin != ""))
					{
						if(((moment(moment().format())) > (moment(Direct._meta.events[i].debut,"YYYY-MM-DD HH:mm"))) && ((moment(moment().format())) < (moment(Direct._meta.events[i].fin,"YYYY-MM-DD HH:mm")))) 
						{
							if(Direct._current_direct != Direct._meta.events[i].title) {
								Direct._current_direct = Direct._meta.events[i].title;
								Direct._current_nid = Direct._meta.events[i].nids;
								Direct._entityID = Direct._meta.events[i].nids;;
								testVote(Direct._fluxSelect);
								testFlag(Direct._fluxSelect);
								var nodeLienTemp = '/node/'+Direct._current_nid;
								Direct.showTitleALL(Direct._meta.events[i].title,Direct._meta.events[i].subtitle,Direct._meta.events[i].image,Direct._meta.events[i].nids,nodeLienTemp);
							}
							
							countNbEvent = 1;
						}
					}
				}
				if(countNbEvent == 0)
				{
					if(Direct._current_direct != Direct._meta.def[0].title) {
						Direct._current_direct = Direct._meta.def[0].title;
						Direct._current_nid = Direct._meta.def[0].nids;
						Direct._entityID = Direct._meta.def[0].nids;;
						testVote(Direct._fluxSelect);
						testFlag(Direct._fluxSelect);
						var nodeLienTemp = '/node/'+Direct._current_nid;
						Direct.showTitleALL(Direct._meta.def[0].title,Direct._meta.def[0].subtitle,Direct._meta.def[0].image,Direct._meta.def[0].nids,nodeLienTemp);
					}
				}
				
			},
			error: function() 
			{
				console.log('********************************************* Direct.callback_error=');
				
				if(Direct._current_direct != 'Flux déconnecté') {
					Direct._current_direct = 'Flux déconnecté';
					Direct._current_nid = '';
					Direct._entityID = '';
					testVote(Direct._fluxSelect);
					testFlag(Direct._fluxSelect);
					var nodeLienTemp = '/node/'+Direct._current_nid;
					Direct.showTitleALL('Flux déconnecté','Pas d\'évènement en cours','images/vinyl-disc-record-placemats.jpg','',nodeLienTemp);
				}
			}
		});
		
		Direct._artistSelect = '';
		Direct._titreSelect = '';
	},

	callback_direct : function(msg) {
        try {
            Direct._meta = '';
            eval('Direct._meta = '+msg);
            if(Direct._current_direct != Direct._meta.current.title) {
                Direct.showTitle();
                Direct._current_direct = Direct._meta.current.title;
            }
        } catch(e) {
            console.log('********************************************* erreur eval callback ='+e);
        }
	},

    callaback_error : function(msg) {
        console.log('********************************************* Direct.callback_error='+JSON.stringify(msg));
        $('#box_titre_direct').html('DATA Direct indisponible !'+msg);
        $('#player_picture').html('<img src="images/sun-radio-logo.png" border="0" height="158">');
    },

    menuToggle : function() {
        if(!this._open_menu) {
            this._box_titre.animate({'left':'100%'},400);
            this._box_partage.animate({'left':'0%'},400);
            this._box_partage.find('.btn').html('-');
            this._box_partage.parent().addClass('open');
        } else {
            //fermer
            this._box_titre.animate({'left':'10%'},400);
            this._box_partage.animate({'left':'-90%'},400);
            this._box_partage.find('.btn').html('+');
            this._box_partage.parent().removeClass('open');
        }
        this._open_menu = !this._open_menu;
    },

    showTitle : function() {
		
		if(Direct._meta.current.title.length>27)
		{
			var baseTitle = Direct._meta.current.title;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var titleOK = titletronc.concat(titletronc2);
		}
		else
		{
			var titleOK = Direct._meta.current.title;
		}
		if((typeof(Direct._meta.current.artiste) == 'undefined') || (typeof(Direct._meta.current.artiste) == '') || (typeof(Direct._meta.current.artiste) == null))
		{
			var artistOK = "";
		}
		else
		{
			if(Direct._meta.current.artiste.length>27)
			{
				var baseArtist = Direct._meta.current.artiste;
				var artisttronc = baseArtist.substr(0,24);
				var artisttronc2 = "[...]";
				var artistOK = artisttronc.concat(artisttronc2);
			}
			else
			{
				var artistOK = Direct._meta.current.artiste;
			}
		}
		
		
		var showArtiste = Direct._meta.current.artiste;
		if (typeof(showArtiste) != "undefined")
		{
			var showArtiste2 = showArtiste.replace(/\s/g,'%20');
		}
		
		var showTitle = Direct._meta.current.title;
		var showTitle2 = showTitle.replace(/\s/g,'%20');
		
		if (typeof(showArtiste) != "undefined")
		{
			Direct._txtShareTweet='J\'écoute '+showArtiste+' - '+showTitle+' http://mysun.mx via @lesonunique';
			//Direct._txtShareTweet=showArtiste2+'%20-%20'+showTitle2+'%20http://mysun.mx%20%23NowPlaying%20';
		}
		else
		{
			Direct._txtShareTweet='J\'écoute '+showTitle+' http://mysun.mx via @lesonunique';
			//Direct._txtShareTweet=showTitle2+'%20http://mysun.mx%20%23NowPlaying%20';	
		}
        Direct._shareFace='http://www.lesonunique.com'+Direct._meta.current.url;
		Direct._shareTweet='http://www.lesonunique.com'+Direct._meta.current.url;
		
		console.log(Direct._shareFace);
		console.log(Direct._shareTweet);
		
		
		if(Direct._meta.current.artiste == 'undefined' || Direct._meta.current.artiste == '' || Direct._meta.current.artiste == null)
		{
			document.getElementById("gAlbumGroup").innerHTML = '<span id="_gAlbumTitle" class="title" style="display: block; width: auto;"><a href="#">'+titleOK+'</a></span>';
			document.getElementById("gAlbumCover").innerHTML = '<img src="'+Direct._meta.current.cover_url+'">';
			
			if(isphonegap == true)
			{
				if(Direct._play == true)
				{
					MusicControls.create({
						track:Direct._meta.current.title,
						artist:Direct._nameFluxLive,
						cover:Direct._meta.current.cover_url,
						isPlaying:true,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
				else
				{
					MusicControls.create({
						track:Direct._meta.current.title,
						artist:Direct._nameFluxLive,
						cover:Direct._meta.current.cover_url,
						isPlaying:false,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
			}
		}
		else
		{
			document.getElementById("gAlbumGroup").innerHTML = '<span id="_gAlbumTitle" class="title" style="display: block; width: auto;"><a href="#">'+titleOK+'</a></span><span id="_gAlbumAuthor" class="author" style="display: block; width: auto;"><a href="#">'+artistOK+'</a></span>';
			document.getElementById("gAlbumCover").innerHTML = '<img src="'+Direct._meta.current.cover_url+'">';
			
			if(isphonegap == true)
			{
				if(Direct._play == true)
				{
					MusicControls.create({
						track:Direct._meta.current.title,
						artist:Direct._meta.current.artiste+Direct._nameFluxLive,
						cover:Direct._meta.current.cover_url,
						isPlaying:true,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
				else
				{
					MusicControls.create({
						track:Direct._meta.current.title,
						artist:Direct._meta.current.artiste+Direct._nameFluxLive,
						cover:Direct._meta.current.cover_url,
						isPlaying:false,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
			}
		}
		
        //return title;
    },
	
	showTitleALL : function(title,artiste,image,nid,path) {
		
		if(title.length>27)
		{
			var baseTitle = title;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var titleOK = titletronc.concat(titletronc2);
		}
		else
		{
			var titleOK = title;
		}
		if((typeof(artiste) == 'undefined') || (typeof(artiste) == '') || (typeof(artiste) == null))
		{
			var artistOK = "";
		}
		else
		{
			if(artiste.length>27)
			{
				var baseArtist = artiste;
				var artisttronc = baseArtist.substr(0,24);
				var artisttronc2 = "[...]";
				var artistOK = artisttronc.concat(artisttronc2);
			}
			else
			{
				var artistOK = artiste;
			}
		}
		
		
		var showArtiste = artiste;
		if (typeof(showArtiste) != "undefined")
		{
			var showArtiste2 = showArtiste.replace(/\s/g,'%20');
		}
		
		var showTitle = title;
		var showTitle2 = showTitle.replace(/\s/g,'%20');
		
		if (typeof(showArtiste) != "undefined")
		{
			Direct._txtShareTweet='J\'écoute '+showArtiste+' - '+showTitle+' http://mysun.mx via @lesonunique';
			//Direct._txtShareTweet=showArtiste2+'%20-%20'+showTitle2+'%20http://mysun.mx%20%23NowPlaying%20';
		}
		else
		{
			Direct._txtShareTweet='J\'écoute '+showTitle+' http://mysun.mx via @lesonunique';
			//Direct._txtShareTweet=showTitle2+'%20http://mysun.mx%20%23NowPlaying%20';	
		}
        Direct._shareFace='http://www.lesonunique.com'+path;
		Direct._shareTweet='http://www.lesonunique.com'+path;
		
		console.log(Direct._shareFace);
		console.log(Direct._shareTweet);
		
		
		if(artiste == 'undefined' || artiste == '' || artiste == null)
		{
			document.getElementById("gAlbumGroup").innerHTML = '<span id="_gAlbumTitle" class="title" style="display: block; width: auto;"><a href="#">'+titleOK+'</a></span>';
			document.getElementById("gAlbumCover").innerHTML = '<img src="'+image+'">';
			
			if(isphonegap == true)
			{
				if(Direct._play == true)
				{
					MusicControls.create({
						track:title,
						artist:Direct._nameFluxLive,
						cover:image,
						isPlaying:true,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
				else
				{
					MusicControls.create({
						track:title,
						artist:Direct._nameFluxLive,
						cover:image,
						isPlaying:false,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
			}
		}
		else
		{
			document.getElementById("gAlbumGroup").innerHTML = '<span id="_gAlbumTitle" class="title" style="display: block; width: auto;"><a href="#">'+titleOK+'</a></span><span id="_gAlbumAuthor" class="author" style="display: block; width: auto;"><a href="#">'+artistOK+'</a></span>';
			document.getElementById("gAlbumCover").innerHTML = '<img src="'+image+'">';
			
			if(isphonegap == true)
			{
				if(Direct._play == true)
				{
					MusicControls.create({
						track:title,
						artist:artiste+Direct._nameFluxLive,
						cover:image,
						isPlaying:true,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
				else
				{
					MusicControls.create({
						track:title,
						artist:artiste+Direct._nameFluxLive,
						cover:image,
						isPlaying:false,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
			}
		}
		
        //return title;
    },
	
	onSucessMusic : function() {
		console.log('ok controls');
	},
	
	onErrorMusic : function() {
		console.log('error controls');
	},

	showTitle2 : function() {
		
		if(Direct._titreSelect.length>27)
		{
			var baseTitle = Direct._titreSelect;
			var titletronc = baseTitle.substr(0,24);
			var titletronc2 = "[...]";
			var titleOK = titletronc.concat(titletronc2);
		}
		else
		{
			var titleOK = Direct._titreSelect;
		}
		if(Direct._artistSelect.length>27)
		{
			var baseArtist = Direct._artistSelect;
			var artisttronc = baseArtist.substr(0,24);
			var artisttronc2 = "[...]";
			var artistOK = artisttronc.concat(artisttronc2);
		}
		else
		{
			var artistOK = Direct._artistSelect;
		}
		
		var showArtiste = Direct._artistSelect;
		if (typeof(showArtiste) != "undefined")
		{
			var showArtiste2 = showArtiste.replace(/\s/g,'%20');
		}
		
		var showTitle = Direct._titreSelect;
		var showTitle2 = showTitle.replace(/\s/g,'%20');
		
		if (typeof(showArtiste) != "undefined")
		{
			Direct._txtShareTweet='J\'écoute '+showArtiste+' - '+showTitle+' http://mysun.mx via @lesonunique';
			//Direct._txtShareTweet=showArtiste2+'%20-%20'+showTitle2+'%20http://mysun.mx%20%23NowPlaying%20';
		}
		else
		{
			Direct._txtShareTweet='J\'écoute '+showTitle+' http://mysun.mx via @lesonunique';
			//Direct._txtShareTweet=showTitle2+'%20http://mysun.mx%20%23NowPlaying%20';	
		}
		
		Direct._shareFace='http://www.lesonunique.com'+Direct._lienPodcast;
		Direct._shareTweet='http://www.lesonunique.com'+Direct._lienPodcast;
        //Direct._shareFace='http://www.lesonunique.com'+Direct._meta.current.url;
		//Direct._shareTweet='http://www.lesonunique.com'+Direct._meta.current.url;
		
		console.log(Direct._shareFace);
		console.log(Direct._shareTweet);
		
		
		document.getElementById("gAlbumGroup").innerHTML = '<span id="_gAlbumTitle" class="title" style="display: block; width: auto;"><a href="#">'+titleOK+'</a></span><span id="_gAlbumAuthor" class="author" style="display: block; width: auto;"><a href="#">'+artistOK+'</a></span>';
		
		console.log('-------------------------------------------------------------------------------------------------------------------------');
		console.log(g.get('current'));
		console.log(g.get('total'));
		console.log(Direct._imgPodcast);
		console.log('-------------------------------------------------------------------------------------------------------------------------');
		
		if ((g.get('current')) == (g.get('total')))
		{
			document.getElementById("gAlbumCover").innerHTML = '<img src="'+Direct._imgPodcast+'">';
			
			console.log('part one');
			
			if(isphonegap == true)
			{
				if(Direct._play == true)
				{
					MusicControls.create({
						track:Direct._titreSelect,
						artist:Direct._artistSelect+Direct._nameFluxLive,
						cover:Direct._imgPodcast,
						isPlaying:true,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
				else
				{
					MusicControls.create({
						track:Direct._titreSelect,
						artist:Direct._artistSelect+Direct._nameFluxLive,
						cover:Direct._imgPodcast,
						isPlaying:false,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
			}
		}
		else
		{
			console.log('part two');
			
			document.getElementById("gAlbumCover").innerHTML = '<img src="images/vinyl-disc-record-placemats.jpg">';
			
			if(isphonegap == true)
			{
				if(Direct._play == true)
				{
					MusicControls.create({
						track:Direct._titreSelect,
						artist:Direct._artistSelect+Direct._nameFluxLive,
						cover:'http://www.lesonunique.com/appli/images/vinyl-disc-record-placemats.jpg',
						isPlaying:true,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
				else
				{
					MusicControls.create({
						track:Direct._titreSelect,
						artist:Direct._artistSelect+Direct._nameFluxLive,
						cover:'http://www.lesonunique.com/appli/images/vinyl-disc-record-placemats.jpg',
						isPlaying:false,
						hasPrev:true,
    					hasNext:true,
   						hasClose:true,
						ticker:'Now playing on SUN'
					},Direct.onSucessMusic,Direct.onErrorMusic);
				}
			}
		}
	},

    choixFacebookTwitter : function() {	
		if(isphonegap == true)
		{
			navigator.notification.confirm(
				'Sur quel réseau social voulez-vous partager ce contenu ?',  // message
				Direct.callBackChoixFacebookTwitter,   // fonction de callback appelée avec l'indice du bouton pressé
				'Partager le contenu',    // titre
				['Twitter','Facebook']  // libellés des boutons
			);	
		}
		else
		{
			window.open('choixTwitterFacebook.php?shareFace='+encodeURI(Direct._shareFace)+'&shareTweet='+encodeURI(Direct._shareTweet)+'&txtShareTweet='+encodeURI(Direct._txtShareTweet),'nom_de_ma_popup','menubar=no, scrollbars=no, top=100, left=100, width=300, height=400');
		}
	},
	
	callBackChoixFacebookTwitter : function(button) {	
		if (button==1) {
			console.log("Twitter");
			window.plugins.socialsharing.shareViaTwitter(Direct._txtShareTweet, null, encodeURI(Direct._shareTweet));
        } 
		else if(button==2) {
			console.log("Facebook");
			window.plugins.socialsharing.shareViaFacebook("", null, encodeURI(Direct._shareFace));
        }
	}

}
