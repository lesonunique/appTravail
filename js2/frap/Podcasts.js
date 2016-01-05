Podcasts = {

    _url_podcasts : '',
	
	_url_podcasts2 : '',

    _list_podcasts : '',

    _current_podcast_play : '',

    _date_select : new Date(),

    _date_today : new Date(),

    _div_date : $('#date_podcasts #date_list'),
	
	_jsonPodOff : '',
	
	_jsonPodOffJSON : '',
	
	_targetOfflineTemp : '',

    init : function() {
        this._url_podcasts = Flux._frap_flux.ws_podcasts+'?field_date_de_diffusion_value[value][year]='+this._date_select.getFullYear()+'&field_date_de_diffusion_value[value][month]='+(this._date_select.getMonth()+1)+'&field_date_de_diffusion_value[value][day]='+this._date_select.getDate();
		console.log('init podcast DEBUT');
		console.log(this._url_podcasts);
		
		$.ajax
		({
			url: Podcasts._url_podcasts, 		
			method: 'GET',
			dataType: 'json',
			success: function(data) 
			{
				console.log("requereajax");
				Podcasts._list_podcasts=data;
				console.log(Podcasts._list_podcasts);
				Podcasts.loadPodcasts();
			},
				error: function() 
			{
				console.log("Pas d'éléments");
			}
		});
		
		Podcasts._jsonPodOff = localStorage.getItem('storageOffline');

		if(Podcasts._jsonPodOff)
		{
			console.log('storagePodLoad');
		}
		else
		{
			window.localStorage.setItem('storageOffline','{"podOFF": []}');
			Podcasts._jsonPodOff = '{"podOFF": []}';
			console.log('storagePodAdd');
		}
		
		
		console.log('init podcast FIN');
    },

    changeDate : function(p_num) {
        $('#page_podcasts').find('#scroller').html('<div align="center" style="margin-top:50px;"><img src="images/player/301.gif" width="64" /></div>');
        if(p_num=='plus') {
            this._date_select = new Date(this._date_select.getTime() + (24 * 60 * 60 * 1000));
        } else {
            this._date_select = new Date(this._date_select.getTime() - (24 * 60 * 60 * 1000));
        }
        //console.log('date = '+this._date_select);
        if(this._date_select<this._date_today) $('#dateSup').fadeIn();
        else $('#dateSup').fadeOut();
        Podcasts.init();
    },

    dateList : function() {
        var the_date='';
        the_date += jours[this._date_select.getDay()];
        the_date += ' '+this._date_select.getDate();
        the_date += ' '+mois[this._date_select.getMonth()];
        the_date += ' '+this._date_select.getFullYear();

        return the_date;
    },

    loadPodcasts : function() {
		console.log('podcasts load');
        Podcasts._div_date.html(Podcasts.dateList());
		
		if(Podcasts._list_podcasts.length==0)
		{
			document.getElementById("nbMenuPodcast").innerHTML="";
		}
		else
		{
			document.getElementById("nbMenuPodcast").innerHTML="<label class='digits'>"+Podcasts._list_podcasts.length+"</label>";
		}	
		
        if(Podcasts._list_podcasts.length>0) {
            var liste = '<div id="usquare_module_wrapper" class="usquare_module_wrapper"><div class="usquare_module_shade"></div>';
			var backgroundcolor = '#FFFFFF';
            for(var i=0;i<Podcasts._list_podcasts.length;i++) {
				var background_i = (i+1)%10;
				
				liste +=	'<div class="usquare_block">'+
							'<img src="'+Podcasts._list_podcasts[i].image+'" class="usquare_square" />'+
							'<div class="usquare_square usquare_square_bg'+background_i+'">'+
								'<div class="usquare_square_text_wrapper">'+
									'<img src="usquare/images/arrow.png" class="usquare_arrow" alt="arrow" />'+
									'<div class="clear"></div>'+
									'<h2>'+systemAccent(Podcasts._list_podcasts[i].node_title)+'</h2>'+
									'<!--<span>'+Podcasts._list_podcasts[i].nid+'</span>-->'+
								'</div>'+
							'</div>'+
							'<div id="listePodcasts" class="usquare_block_extended usquare_square_bg'+background_i+'">'+
                				'<a href="" class="close"><img src="usquare/images/close.png" alt="close"/></a>'+
								'<ul class="social_background">'+
									'<li class="play1"><a href="#" onclick="newSonTemp('+i+',\'pod\'); Direct._imgPodcast = \''+Podcasts._list_podcasts[i].image+'\';"><img src="usquare/images/play.png" alt="play" /></a></li>'+
									'<li class="play2" style="display:none;"><a href="#" onclick="pauseSonTemp('+i+',\'pod\')"><img src="usquare/images/pause.png" alt="play" /></a></li>'+
                    				'<li><a href="javascript:Podcasts.shareOnFacebookTwitter(1,'+i+')"><img src="usquare/images/social-fb.png" alt="partage facebook" /></a></li>'+
                    				'<li><a href="javascript:Podcasts.shareOnFacebookTwitter(2,'+i+')"><img src="usquare/images/social-tw.png" alt="partage twitter" /></a></li>'+
                    				'<!--<li><a href="javascript:Podcasts.aboPod('+Podcasts._list_podcasts[i].nid_programme+')"><img src="usquare/images/add-playlist.png" alt="ajout playlist" /></a></li>-->';
									
				/*Podcasts._jsonPodOffJSON = JSON.parse(localStorage.getItem('storageOffline'));
				
				if(Podcasts._jsonPodOffJSON.podOFF.length == 0)
				{
					liste +=	'<li><a href="javascript:Podcasts.downloadPod('+i+')"><img src="usquare/images/download.png" alt="telechargement" /></a></li>';
				}
				else
				{
					var listeTemp = '<li><a href="javascript:Podcasts.downloadPod('+i+')"><img src="usquare/images/download.png" alt="telechargement" /></a></li>';
					for(var i2=0;i2<Podcasts._jsonPodOffJSON.podOFF.length;i2++) {
						if(Podcasts._jsonPodOffJSON.podOFF[i2].nid == Podcasts._list_podcasts[i].nid_programme)
						{
							listeTemp =	'<li><a href="#" style="opacity:0.3;"><img src="usquare/images/download.png" alt="telechargement" /></a></li>';
						}
					}
					liste +=	listeTemp;
				}*/
                    				
                liste +=	'</ul>'+
							/*'<ul class="player_background" id="repereLecturePod_'+i+'">'+
                    			'<li class="play1"><a href="#" onclick="newSonTemp('+i+',\'pod\')"><img src="usquare/images/play.png" alt="play" /></a></li>'+
								'<li class="play2" style="display:none;"><a href="#" onclick="pauseSonTemp('+i+',\'pod\')"><img src="usquare/images/pause.png" alt="play" /></a></li>'+
								'<li><div id="barreTimePod_'+i+'" class="barreTimePod"></div></li>'+
                			'</ul>'+*/
							'<div class="clear"></div>'+
							'<span class="bold"></span>'+
							'<span class="usquare_about">'+Podcasts._list_podcasts[i].nid+'<br/>'+((Podcasts._list_podcasts[i].body!=null) ? Podcasts._list_podcasts[i].body : "")+'</span>'+
						'</div>'+
					'</div>';
            }
            liste += '</div>';
            $('#page_podcasts').find('#scroller').html(liste);
			
			/*document.getElementById("podPhonegap").style.display = 'block';
			$(".boutonsPodPhonegap").width('32.33%');*/
			
			$(".usquare_module_wrapper").uSquare({
				opening_speed:300,
				closing_speed:500,
				easing:'swing'
			});

        } else {
            $('#page_podcasts').find('#scroller').html('<div align="center" style="color:black;padding: 20px 10px;">Aucun Podcast disponible<br />pour cette date.</div>');
        }

    },
	
	loadPodcastsOFFLINE : function() {
		console.log('podcasts OFFLINE load');
		
		Podcasts._jsonPodOffJSON = JSON.parse(localStorage.getItem('storageOffline'));
		
        if(Podcasts._jsonPodOffJSON.podOFF.length>0) {
            var liste0 = '<div id="usquare_module_wrapper" class="usquare_module_wrapper"><div class="usquare_module_shade"></div>';
			var backgroundcolor = '#FFFFFF';
            for(var i=0;i<Podcasts._jsonPodOffJSON.podOFF.length;i++) {
				
			var background_i = (i+1)%10;
			
			liste0 +=	'<div class="usquare_block">'+
							'<img src="'+Podcasts._jsonPodOffJSON.podOFF[i].lienImg+'" class="usquare_square" />'+
							'<div class="usquare_square usquare_square_bg'+background_i+'">'+
								'<div class="usquare_square_text_wrapper">'+
									'<img src="usquare/images/arrow.png" class="usquare_arrow" alt="arrow" />'+
									'<div class="clear"></div>'+
									'<h2>'+systemAccent(Podcasts._jsonPodOffJSON.podOFF[i].name)+'</h2>'+
									'<span>'+Podcasts._jsonPodOffJSON.podOFF[i].date+'</span>'+
								'</div>'+
							'</div>'+
							'<div id="listePodcasts2" class="usquare_block_extended usquare_square_bg'+background_i+'">'+
                				'<a href="" class="close"><img src="usquare/images/close.png" alt="close"/></a>'+
								'<ul class="social_background">'+
									'<li class="play1"><a href="#" onclick="newSonTemp('+i+',\'podOff\')"><img src="usquare/images/play.png" alt="play" /></a></li>'+
									'<li class="play2" style="display:none;"><a href="#" onclick="pauseSonTemp('+i+',\'podOff\')"><img src="usquare/images/pause.png" alt="play" /></a></li>'+
                    				'<li><a href="javascript:Podcasts.shareOnFacebookTwitter(1,'+i+')"><img src="usquare/images/social-fb.png" alt="partage facebook" /></a></li>'+
                    				'<li><a href="javascript:Podcasts.shareOnFacebookTwitter(2,'+i+')"><img src="usquare/images/social-tw.png" alt="partage twitter" /></a></li>'+
                    				'<!--<li><a href="javascript:Podcasts.aboPod('+Podcasts._jsonPodOffJSON.podOFF[i].nid+')"><img src="usquare/images/add-playlist.png" alt="ajout playlist" /></a></li>-->'+
                    				'<!--<li><a href="javascript:Podcasts.removePod('+i+')"><img src="usquare/images/remove.png" alt="telechargement" /></a></li>-->'+
                				'</ul>'+
								'<!--<ul class="player_background" id="repereLecturePod2_'+i+'">'+
                    				'<li class="play1"><a href="#" onclick="newSonTemp('+i+',\'podOff\')"><img src="usquare/images/play.png" alt="play" /></a></li>'+
									'<li class="play2" style="display:none;"><a href="#" onclick="pauseSonTemp('+i+',\'podOff\')"><img src="usquare/images/pause.png" alt="play" /></a></li>'+
									'<li><div id="barreTimePodOff2_'+i+'" class="barreTimePod"></div></li>'+
                				'</ul>-->'+
								'<div class="clear"></div>'+
								'<span class="bold"></span>'+
								'<span class="usquare_about">'+Podcasts._jsonPodOffJSON.podOFF[i].date+'<br/>'+((Podcasts._jsonPodOffJSON.podOFF[i].infos!=null) ? Podcasts._jsonPodOffJSON.podOFF[i].infos : "")+'</span>'+
							'</div>'+
						'</div>';
            }
            liste0 += '</div>';
            $('#page_podcasts').find('#scroller2').html(liste0);
			
			$(".usquare_module_wrapper").uSquare({
				opening_speed:300,
				closing_speed:500,
				easing:'swing'
			});

        } else {
            $('#page_podcasts').find('#scroller2').html('<div align="center" style="color:black;padding: 20px 10px;">Vous n\'avez pas téléchargé<br />de podcast.</div>');
        }

    },
	
	shareOnFacebookTwitter : function(reseau,num) {	
		Podcasts._partage_podcast=Podcasts._list_podcasts[num].url;
		if(isphonegap == true)
		{
			if (reseau==1) {
				console.log("Facebook");
				console.log(Podcasts._partage_podcast);
				var shareselect2='http://www.lesonunique.com'+Podcasts._partage_podcast;
				window.plugins.socialsharing.shareViaFacebook('', null /* img */, shareselect2);
			} 
			else if(reseau==2) {
				console.log("Twitter");
				console.log(Podcasts._partage_podcast);
				var shareselect='http://www.lesonunique.com'+Podcasts._partage_podcast;
				window.plugins.socialsharing.shareViaTwitter('', null /* img */, shareselect);
			}
		}
		else
		{
			if (reseau==1) 
			{
				var lienFacebook = 'https://www.facebook.com/sharer/sharer.php?u=http://www.lesonunique.com'+encodeURI(Podcasts._partage_podcast);
				window.open(lienFacebook,"", "fullscreen=yes, scrollbars=auto");
			}
			else if(reseau==2)
			{
				var lienTweet = 'https://twitter.com/intent/tweet/?url=http://www.lesonunique.com'+encodeURI(Podcasts._partage_podcast)+'&text=';
				window.open(lienTweet,"", "fullscreen=yes, scrollbars=auto");
			}

		}
	},
	
	aboPod : function(prog) {
		var dataFlagPod = {
			flag_name: 'mes_podcasts',
			entity_id: prog,
			uid: ConnectLogin._idUsr,
			skip_permission_check: true ,
			action: 'flag'
		};
		
		Drupal.services.call({
			method: 'POST',
			path: 'flag/flag.json',
			service: 'flag',
			resource:'flag',
			data:JSON.stringify(dataFlagPod),
			success: function(result) {
				console.log(result);
				if(isphonegap == true)
				{
					window.plugins.toast.showShortBottom('Abonnement au podcast réussi');
				}
				else
				{
					document.getElementById("messageFlottant").style.background = '#F1F1F1';
					document.getElementById("messageFlottant").style.color = '#242424';
					document.getElementById("messageFlottantText").innerHTML = 'Abonnement au podcast réussi';
					document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
					document.getElementById("messageFlottant").style.display = 'block';
					
					window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
				}
				
			},
			error: function() {
				if(isphonegap == true)
				{
					window.plugins.toast.showShortBottom('Erreur d\'abonnement');
				}
				else
				{
					document.getElementById("messageFlottant").style.background = '#F1F1F1';
					document.getElementById("messageFlottant").style.color = '#242424';
					document.getElementById("messageFlottantText").innerHTML = 'Erreur d\'abonnement';
					document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
					document.getElementById("messageFlottant").style.display = 'block';
					
					window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
				}
			}
		});
    },
	
	downloadPod : function(p_node) {
		if(isphonegap == true)
		{
			var targetPath;
			
			if(isIOS==true)
			{
				var re = /(?:\.([^.]+))?$/;
				var ext = re.exec(Podcasts._list_podcasts[p_node].son)[1];
				targetPath = cordova.file.documentsDirectory + Podcasts._list_podcasts[p_node].url + "." + ext;
			}
			else if(isAndroid2==true)
			{
				var re = /(?:\.([^.]+))?$/;
				var ext = re.exec(Podcasts._list_podcasts[p_node].son)[1];
				targetPath = cordova.file.dataDirectory + Podcasts._list_podcasts[p_node].url + "." + ext;
			}
			else if(isWindowsPhone==true)
			{
				var re = /(?:\.([^.]+))?$/;
				var ext = re.exec(Podcasts._list_podcasts[p_node].son)[1];
				targetPath = cordova.file.dataDirectory + Podcasts._list_podcasts[p_node].url + "." + ext;
			}
			else{}

			var uri = encodeURI(Podcasts._list_podcasts[p_node].son);
			
			console.log('download');
			
			var fileTransfer = new FileTransfer();
			
			fileTransfer.download(
				uri,
				targetPath,
				function(entry) {
					console.log("download complete: " + entry.toURL());
					
					Podcasts._jsonPodOffJSON=JSON.parse(Podcasts._jsonPodOff);
					console.log(Podcasts._jsonPodOffJSON);
					console.log(Podcasts._jsonPodOffJSON.podOFF);
					Podcasts._jsonPodOffJSON.podOFF.push(
						{name: Podcasts._list_podcasts[p_node].node_title, infos: Podcasts._list_podcasts[p_node].body, nid: Podcasts._list_podcasts[p_node].nid_programme, date: Podcasts._list_podcasts[p_node].nid, lienImg: Podcasts._list_podcasts[p_node].image, urlProg: Podcasts._list_podcasts[p_node].url, lienOnline: Podcasts._list_podcasts[p_node].son, lienOffline: targetPath}
					);
					
					Podcasts._jsonPodOff = JSON.stringify(Podcasts._jsonPodOffJSON);
					window.localStorage.setItem('storageOffline',Podcasts._jsonPodOff);
				},
				function(error) {
					console.log("download error source " + error.source);
					console.log("download error target " + error.target);
					console.log("upload error code" + error.code);
				},
				true
				/*
				false,
				{
					headers: {
						"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
					}
				}*/
			);
		}
		else
		{
			window.open('http://www.lesonunique.com/appli/downloadPod.php?filename='+Podcasts._list_podcasts[p_node].son,'','toolbar=no, location=no, screenX='+screen.width+',screenY='+screen.height+',top='+screen.height+',left='+screen.width+', status=no, scrollbars=no, resizable=no, width=100, height=100, left=0, right=0');
		}
	}
}