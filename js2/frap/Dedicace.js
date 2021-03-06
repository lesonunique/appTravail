Dedicace = {

    _url_get_hour : '',

    _url_get_min : '',

    _url_get_list : '',

    _url_get_info : '',

    _url_send_dedicace : '',

    _list_days : new Array('Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'),

    _list_month : new Array('Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc'),

    _today : new Date(),

    _json_hour : new Array(),

    _json_min : '',

    _json_list : '',

    _json_info : '',

    _json_adressbook : '',

    _json_callback_send_dedicace : '',

    _select_hour : '',

    _select_min : '',

    _select_day : '',

    _line_open : '',
	
	_line_open2 : '',

    _num_of_tel : 0,

    _num_of_tel_max : 5,

    _num_line_adressbook : 1,

    _current_dedicace_play : -1,

    _search_open : true,

    _search_words : '',

    _id_music : 0,

    _adressBook_name : '',

    _adressBook_lastname : '',

    _adressBook_phone : '',

    _list_telephone_number : '',

    _canChange : false,
	
	_hClock : '',
	
	_mClock : '',
	
	_choixMysun : 1,
	
	_txtSMSMySUN : '',
	
	_rechercheMYSUNPlaylist : false,
	
	_rechercheStep : 0,
	
	_tableauPlaylist : new Array(),
	
	_fingerid : '',
	
	_titreValidDiffus : '',
	
	_artisteValidDiffus : '',
	
	_fluxMySUN : 1,
	
	_fluxMySUNdynamique : 0,
	
	_tokenPUSH : '',
	
    init : function() {
		console.log('Dedicace init : '+Flux._frap_flux.racine_services);
		
		document.getElementById("imagePochette").innerHTML="";
		document.getElementById("titreSelectDedi").innerHTML="";
			
        if(Dedicace._select_hour) {
            Dedicace._select_hour.destroy();
            Dedicace._canChange=false;
        }

		if(Dedicace._select_min) {
			Dedicace._select_min.destroy();
            Dedicace._canChange=false;
        }
        Dedicace._num_of_tel = 0;
		
		console.log(Dedicace._json_hour);
		console.log(Dedicace._json_min);
		
		console.log(Dedicace._choixMysun);
		
		pageEnCours = 11;
		
		clockMySUN(); // Selection Heures Minutes Graphique

    },

    launch : function(nbFLUX) { // ETAPE 1 : LANCEMENT MYSUN PAGE AUJOURD'HUI/DEMAIN + INITIALISATION URLS --> choix jour puis direction selectDay()
        
		if(isphonegap == true)
		{
			tuto.closeTuto2();
		}
		
		if(g.get('current') == g.get('total'))
		{
			Dedicace._fluxMySUNdynamique = 0;
		}
		else
		{
			Dedicace._fluxMySUNdynamique = g.get('current') - 1;
		}
		console.log(Dedicace._fluxMySUNdynamique);
		
		document.getElementById("imagePochette").innerHTML="";
		document.getElementById("titreSelectDedi").innerHTML="";
		
		Dedicace._fluxMySUN = nbFLUX;
		
		Dedicace._rechercheStep = 0;
		goToDedicace();

        //this.displayHourAvailable();
        $('#step1').css('display','block');
        $('#step1bis').css('display','none');
        $('#step2, #step3').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
        //Api._scrollPage_Dedicace.refresh();
    },

    displayMinuteAvailable : function() { // ETAPE 4 : REQUETE POUR RECUPERER LES MINUTES DISPONIBLES DE L'HEURE SELECT --> callback_minute/callback_error
        jembe.http.post({
            url: Dedicace._url_get_min,
            //data: 'jour='+Dedicace.returnTimeStamp()+'&heures='+Dedicace._today.getHours(),
            data: 'jour='+Dedicace.returnTimeStamp()+'&heures='+Dedicace._json_hour[0].heures+'&flux='+Dedicace._fluxMySUN,
            onSuccess: Dedicace.callback_minute,
            onError: Dedicace.callback_error
        });
    },

    callback_minute : function(msg) { // ETAPE 4 success : AFFICHAGE MINUTES  --> init()
		console.log('callback_minute '+msg)
        eval('Dedicace._json_min = '+msg);
        //console.log('Dedicace._json_min = '+print_r(Dedicace._json_min[0],true));
        if(Dedicace._json_min.length < 3) {
            Dedicace._json_min.push({"status":"1","minutes":"--"});
            Dedicace._json_min.push({"status":"1","minutes":"--"});
        }
        Dedicace.init();
    },

    displayHourAvailable : function() { // ETAPE 3 : REQUETE POUR RECUPERER LES HEURES DISPONIBLES DE LA JOURNEE ainsi que LA DATE --> callback_hour/callback_error
		console.log('displayHourAvailable()');
		console.log(Dedicace._url_get_hour+'?'+'valeur='+Dedicace.returnTimeStamp()+'&idtel='+uuidActive);
		$('#roueSelectMySUN').html('<div align="center"><img src="images/player/302.gif" border="0" width="50" /></div>');
        jembe.http.post({
            url: Dedicace._url_get_hour,
            data: 'valeur='+Dedicace.returnTimeStamp()+'&platform='+plateformeActive+'&idtel='+uuidActive+'&flux='+Dedicace._fluxMySUN,
            onSuccess: Dedicace.callback_hour,
            onError: Dedicace.callback_error
        });
    },

    callback_error : function(msg) { // ETAPE 3 error
        console.log('Error hour or min function = '+JSON.stringify(msg));
    },

    callback_hour : function(msg) { // ETAPE 3 success : AFFICHAGE HEURES  --> displayMinuteAvailable()
		$('#roueSelectMySUN').html('');
		console.log('callback_hour '+msg);
        eval('Dedicace._json_hour = '+msg);
        //console.log('callback_hour ('+Dedicace._json_hour.length+') '+Dedicace._json_hour);

        if(Dedicace._json_hour[0].code==3) {
            console.log('******************************************* code 3'); // Erreur maintenance
            Dedicace.backStep1(); /*------------------------------------------------------------------------------------------------------------------------------------------> COMMENTER POUR MYSUN ILLIMITE*/
			if(isphonegap == true)
			{
				navigator.notification.alert(Dedicace._json_hour[0].message)
			}
			else
			{
				alert(Dedicace._json_hour[0].message);
			}
        } else if(Dedicace._json_hour[0].code==2) {
            console.log('******************************************* code 2'); // Erreur heure non dispo
			if(isphonegap == true)
			{
				navigator.notification.alert(Dedicace._json_hour[0].message)
			}
			else
			{
				alert(Dedicace._json_hour[0].message);
			}
        } else if(Dedicace._json_hour[0].code==1) {
            console.log('******************************************* code 1'); // Ok
            //alert(Dedicace._json_hour[0].message);
        }
        Dedicace._json_hour.shift();
        if(Dedicace._json_hour.length < 3) {
            Dedicace._json_hour.push({"heures":"--","rowheures":"--"});
            Dedicace._json_hour.push({"heures":"--","rowheures":"--"});
        }
        //console.log('callback_hour ('+Dedicace._json_hour.length+') '+Dedicace._json_hour);
        Dedicace.displayMinuteAvailable();
    },

    selectDay : function(p_param) { // ETAPE 2 : RECUPERER DATE HEURE ACTUELLE / RECUPERER DATE DEMAIN --> displayHourAvailable() // INIT URL
		
		Dedicace._url_get_hour = Flux._frap_flux.racine_services+Flux._frap_flux.repertoire_dedicace+'/selection_auditeur/selecteur_heures.php';
		Dedicace._url_get_min = Flux._frap_flux.racine_services+Flux._frap_flux.repertoire_dedicace+'/selection_auditeur/selecteur_minutes.php';
		Dedicace._url_get_list = Flux._frap_flux.racine_services+Flux._frap_flux.repertoire_dedicace+'/selection_auditeur/recherche_creation_tableau.php';
		Dedicace._url_get_info = Flux._frap_flux.racine_services+Flux._frap_flux.repertoire_dedicace+'/selection_auditeur/traitement_musiqueEnAvant.php';
		Dedicace._url_send_dedicace = Flux._frap_flux.racine_services+Flux._frap_flux.repertoire_dedicace+'/selection_auditeur/validation.php';
		
        this._select_day=p_param;
        if(this._select_day=='tomorrow'){
            Dedicace._today = null;
            Dedicace._today = new Date();
            Dedicace._today.setTime(Dedicace._today.getTime()+86400000);
	        Dedicace._today.setMinutes(00);
	        Dedicace._today.setHours(00);
			console.log(Dedicace._today);
        } else {
            Dedicace._today = null;
            Dedicace._today = new Date();
			console.log(Dedicace._today);
        }

        Dedicace._today.setSeconds(00);
        //Dedicace._today.setMilliseconds(000);

        $('#step1').css('display','none');
        $('#step1bis').fadeIn(function() {
            $('#datetime').html(Dedicace.returnDayString());
        });
        this.displayHourAvailable();
    },

    returnDayString : function() {
        var content ='';
        content += Dedicace._list_days[Dedicace._today.getDay()]+' ';
        content += Dedicace._today.getDate()+' ';
        content += Dedicace._list_month[Dedicace._today.getMonth()];

        return content;
    },

    returnTimeString : function() {
        var content ='';
        content += ((Dedicace._today.getHours()<10)? '0':'')+Dedicace._today.getHours();
        content += ':';
        content += ((Dedicace._today.getMinutes()<10)? '0':'')+Dedicace._today.getMinutes();

        return content;
    },

    returnTimeStamp : function() {
        Dedicace._today.setSeconds(00);
        return Math.ceil(Dedicace._today.getTime()/1000);
    },

    valideDedicace : function() {	
		console.log(Dedicace._url_get_list);		
		if(nbPlaylistActuel>0 && Dedicace._search_words=='' && Dedicace._choixMysun == 1) // --------------> Enlever "&& Dedicace._choixMysun == 1" pour remettre playlists jacky
		{
			var h = Dedicace._hClock;
			var m = Dedicace._mClock;
			var test_m='';
			
			Dedicace._tableauPlaylist = [];
			
			$.ajax
			({
				url: 'http://www.lesonunique.com/user/'+ConnectLogin._idUsr+'/myplaylist2/nodes.json', 		    
				type: 'GET',
				dataType: 'json',
				headers: 
				{
					'Content-Type': 'application/json'
				},
				error: function() 
				{
					console.log("BUG récupération de pistes SUN");
					Dedicace._rechercheMYSUNPlaylist = false;
					
					jembe.http.post({
						url: Dedicace._url_get_list,
						data: 	'artiste='
								+'&chaine_recherche='+escape(Dedicace._search_words)
								+'&dateheure='+(Dedicace._today.getTime()/1000)
								+'&platform='+plateformeActive
								+'&idtel='+uuidActive
								+'&mode='
								+'&flux='+Dedicace._fluxMySUN,
						onSuccess: Dedicace.callback_selectDay,
						onError: Dedicace.callback_error_search
					});
				},
		
				success: function(data) 
				{
					console.log('objet json');
					console.log(data);
					
					Dedicace._rechercheMYSUNPlaylist = true;
					
					var nbPlayLength = data.node.length;
					
					$.ajax
					({
						url: 'playlistVide.json', 		
						method: 'GET',
						dataType: 'json',
						success: function(jsonActuelMerge) 
						{
							for (i = 0; i < nbPlayLength; i++)
							{
								jsonActuelMerge.musique.push({"id":""+data.node[i].id+""});
							}
							
							Dedicace._tableauPlaylist=jsonActuelMerge;
							console.log(Dedicace._tableauPlaylist);
							console.log('>> Playlist pour dedicace <<');
							
							$.ajax({
								type: 'POST',
								url: Dedicace._url_get_list,
								data: {
									artiste:'',
									chaine_recherche:escape(Dedicace._search_words),
									dateheure:(Dedicace._today.getTime()/1000),
									platform:plateformeActive,
									idtel:uuidActive,
									mode:'',
									musique: JSON.stringify(Dedicace._tableauPlaylist),
									flux: Dedicace._fluxMySUN
								},
								/*dataType: 'json',*/
								success: function(data) 
								{
									Dedicace.callback_selectDay(data);
								},
								error: function(data) 
								{
									Dedicace.callback_error_search(data);
								}
							});
						}
					});
					
				}
			});
	
			Dedicace._today.setHours(h,m,0);
			
			pageEnCours = 12;
	
			$('#step1bis').css('display','none');
			$('#step2').fadeIn();
			$('.seach-dedicace .champs').fadeOut();
			$('#step2').html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
		
			console.log('jembe.http.post url: '+Dedicace._url_get_list+',artiste=&chaine_recherche='+escape(Dedicace._search_words)+'&dateheure='+(Dedicace._today.getTime()/1000)+'&mode');		   

		}
		else
		{
			var h = Dedicace._hClock;
			var m = Dedicace._mClock;
			var test_m='';
	
			Dedicace._today.setHours(h,m,0);
	
			$('#step1bis').css('display','none');
			$('#step2').fadeIn();
			$('.seach-dedicace .champs').fadeOut();
			$('#step2').html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
	
			console.log('jembe.http.post url: '+Dedicace._url_get_list+',artiste=&chaine_recherche='+escape(Dedicace._search_words)+'&dateheure='+(Dedicace._today.getTime()/1000)+'&mode');
			
			Dedicace._rechercheMYSUNPlaylist = false;
			   
			jembe.http.post({
				url: Dedicace._url_get_list,
				data: 	'artiste='
						+'&chaine_recherche='+escape(Dedicace._search_words)
						+'&dateheure='+(Dedicace._today.getTime()/1000)
						+'&platform='+plateformeActive
						+'&idtel='+uuidActive
						+'&mode='
						+'&flux='+Dedicace._fluxMySUN,
				onSuccess: Dedicace.callback_selectDay,
				onError: Dedicace.callback_error_search
			});
		}
    },

    callback_selectDay : function(msg) {
        //console.log('callback_search : msg='+msg);
		try {
			
			eval('Dedicace._json_list = '+msg);
			//console.log('Dedicace._json_list.length'+Dedicace._json_list.length);
			
			if (Dedicace._json_list.code!=10)
				{
					console.log('affichage des résultats');
				}
				else
				{
					console.log('Pas de résultat affichage pop up code 10');
					if (plateformeActive=="server") 
						{
						    console.log('serveur');
							//jembe.alert.show({
							//		message : 'Aucun résultat.'
								
									//onSuccess : Dedicace.callback_select_options
							//});
			
						}
						else
						{
						    console.log('mobile');
							jembe.alert.show({
									message : 'Aucun résultat.',
									buttons : 'Envoyer un email|Annuler',
									onSuccess : Dedicace.callback_select_options
							});
						}
				}
			Dedicace.displayTitles();				
				
		} catch(e) {
		    console.log('Pas de résultat affichage pop up');
	        jembe.alert.show({
				message : 'Aucun résultat.',
	            buttons : 'Envoyer un email|Annuler',
	            onSuccess : Dedicace.callback_select_options
	        });
		}
    },

	callback_error_search:function(err) {
		console.log('search error :'+JSON.stringify(err));
	},

	callback_select_options : function(button) {
	    if (button==0) {
			Api.switchMenu('contact');
			$('#c_message').val('La recherche "'+Dedicace._search_words+'" ne renvoie aucun résultat.');
		} else {
			console.log('retour à la liste');
			Dedicace._search_words='';
			Dedicace.valideDedicace();
		}
	},

    displayTitles : function() {
		this._line_open = '';
		this._line_open2 = '';
		if(Dedicace._rechercheMYSUNPlaylist == true)
		{
			var contentTemp ='';
			contentTemp += '<tr>' +
								'<td id="maPlayDeroul" class="maPlay" onclick="enroulePlay();">' +
									'<span style="display:inline-block;position:relative;bottom:10px">Ma Playlist</span>' +
									'<img id="flecheMaPlayMySun" src="images/arrow-bas.png" />' +
								'</td>' +
							'</tr>';
		}
		else
		{
			var contentTemp ='';
		}
		console.log(Dedicace._json_list);
		var content ='';
		content += '<table cellpadding="0" cellspacing="0" border="0" class="table-dedicace">' +
					'<tr>' +
						'<td class="title">' +
							'<img src="images/arrow-left.png" alt="Retour" class="fs1" aria-hidden="true" onclick="Dedicace.backStep1bis('+Dedicace._rechercheStep+');"/>' +
							'<!--<img src="images/player/music.png" class="imgDedicace" border="0" width="40" />-->'+
							'<span id="datetime2"></span>' +
							'<div class="seach-dedicace">' +
								'<div class="champs"><input type="text" value="" placeholder="Recherche #disco, #pop..." id="input_recherche" value="'+Dedicace._search_words+'" /></div>' +
								'<div class="button" aria-hidden="true" width="30px" onclick="Dedicace.launch_search();"><img src="images/searchMySun.png" alt="Search" width="30px" style="top:3px;" /></div>' +
							'</div>' +
						'</td>' +
					'</tr>'+contentTemp;
		if(Dedicace._json_list.length == '' || Dedicace._json_list.length === undefined || typeof(Dedicace._json_list.length) == 'undefined' || Dedicace._json_list.length == 0)
		{
			content +=  '<tr id="table-dedicace-playlist"><td><table width="100%" cellspacing="0" cellpadding="5" border="0" style="background-color: #FFFFFF;" id="jp_container"><tbody><tr><td valign="top" style="padding-top:15px;height: 70px;"><strong><span>Désolé, aucun résultat n\'a été trouvé pour cette recherche</span></strong></td></tr><tr></tbody></table></td></tr>';
		}
		for(var i=0;i<Dedicace._json_list.length;i++) {
			if(Dedicace._json_list[i].enabled == 2)
			{
				var txtDiffusionOK = "<img src='http://www.lesonunique.com/datasun/selection_auditeur/images/red-cross.png' width=16px height=16px/>Pour diffuser ce titre, <span style='font-weight:bold; color:#35aadc;' onclick='goContact2(\""+escape(Dedicace._json_list[i].artiste)+"\",\""+escape(Dedicace._json_list[i].titre)+"\");'>cliquez ici</span>";
			}
			else
			{
				var txtDiffusionOK = Dedicace._json_list[i].fld_next_available;
			}
			content +=  '<tr id="table-dedicace-playlist">'+
							'<td class="line-artiste" onclick="Dedicace.openLineArtiste('+i+');">' +
								'<table id="jp_container" width="100%" cellpadding="5" cellspacing="0" border="0" style="background-color: '+Dedicace._json_list[i].background_color+';">' +
									'<tr>' +
										'<td valign="top" width="60">' +
											'<div style="position:relative;" id="btn_play_pause_dedicace_'+i+'">' +
												'<div>'+Dedicace._json_list[i].element_image+'</div>';
			if (Dedicace._json_list[i].extrait_audio!='')
			content +=                          '<div id="repereLectureDed_'+i+'"><div class="play play1" onclick="newSonTemp('+i+',\'ded\')"><img src="images/player/play.png" /></div><div class="play play2" style="display:none;" onclick="pauseSonTemp('+i+',\'ded\')"><img src="images/player/stop.png" /></div></div>';
			content +=                      '</div>' +
											'<div class="line_play_dedicace" id="line_'+i+'_play_dedicace"><div class="timer_dedicace"></div></div>' +
										'</td>' +
										'<td valign="top" style="padding-top:15px;height: 70px;">' +
											'<strong style="text-transform:uppercase;"><span id="lienRechercheSPAN-'+i+'" style="font-weight:bold;" onclick="Dedicace.rechercheClic('+i+');">'+Dedicace._json_list[i].artiste+' - '+Dedicace._json_list[i].titre+'</span></strong><br /><small class="diffusionOk">'+txtDiffusionOK+'</small>' +
										'</td>' +
									'</tr>' +
									'<tr>' +
										'<td colspan="2">' +
											'<div id="line-artiste-'+i+'" style="display:none;">' +
												'<div>Album : '+Dedicace._json_list[i].album+'</div>' +
												'<div><em>'+Dedicace._json_list[i].annee+' - '+Dedicace._json_list[i].duree+' - <span id="lienRechercheSPANs-'+i+'" style="font-weight:bold;" onclick="Dedicace.rechercheClic2('+i+');">#'+Dedicace._json_list[i].style+'</span></em></div>' +
												'<!--<div class="popularite">'+Dedicace._json_list[i].popularite+'</div>-->' +
												'<div>' +
													((Dedicace._json_list[i].fld_next_available.indexOf('red-cross')<0) ? '<a href="javascript:" onclick="Dedicace.dedicacer('+Dedicace._json_list[i].id_musique+');"><span class="fs1" aria-hidden="true" data-icon="&#xe008;"></span> Dédicacer</a>' : '') +
													//((Dedicace._json_list[i].extrait_audio!='') ? '<a href="javascript:" onclick="Dedicace.playPause('+i+');" class="playPause" id="btn_playpause_'+i+'"><span class="fs1" aria-hidden="true" data-icon="&#xe105;"></span></a><a href="javascript:" class="playPause"  onclick="Dedicace.stop('+i+');Player.playDirect()"><img src="images/player/refresh.png" border="0" height="30"></a>' : '')+
												'</div>' +
											'</div>' +
										'</td>' +
									'</tr>' +
								'</table>' +
							'</td>'+
						'</tr>';
			}
	
		content += '</table>' +
					'<div id="step2part2"></div>';
		'<audio id="audioPlayer" src="#"></audio>';
	
		$('#step2').html(content);
		$('#datetime2').html(Dedicace.returnDayString()+' à '+Dedicace.returnTimeString());
			
		$('.seach-dedicace .champs').show();
		
		/* TEST */
		
		
		/*$("#input_recherche").autocomplete({
			source: 'search_autocomplete.php',
			minLength: 2
		});*/
		
		
		/* TEST */
			
		var player = document.querySelector('#audioPlayer');
			
		if(Dedicace._rechercheMYSUNPlaylist == true)
		{
			var h = Dedicace._hClock;
			var m = Dedicace._mClock;
			var test_m='';
	
			Dedicace._today.setHours(h,m,0);
	
			$('#step2part2').html('<div align="center"><br/><img src="images/player/301.gif" border="0" width="50" /></div>');
			   
			jembe.http.post({
				url: Dedicace._url_get_list,
				data: 	'artiste='
						+'&chaine_recherche='+escape('')
						+'&dateheure='+(Dedicace._today.getTime()/1000)
						+'&platform='+plateformeActive
						+'&idtel='+uuidActive
						+'&mode='
						+'&flux='+Dedicace._fluxMySUN,
				onSuccess: Dedicace.displayTitles2
			});
		}
		
    },
	
	displayTitles2 : function(msg) {
		eval('Dedicace._json_list2 = '+msg);
		this._line_open2 = '';
		
		var content ='';
		content += '<div style="background-color:#35aadc;"><br/><br/></div>' +
					'<table cellpadding="0" cellspacing="0" border="0" class="table-dedicace">' +
					'<tr>' +
						'<td id="maPlayDeroul2" class="maPlay" onclick="enroulePlay2();">' +
							'<span style="display:inline-block;position:relative;bottom:10px">Découverte SUN</span>' +
							'<img id="flecheMaPlayMySun2" src="images/arrow-bas.png" />' +
						'</td>' +
					'</tr>';
		for(var i=0;i<Dedicace._json_list2.length;i++) {
			if(Dedicace._json_list2[i].enabled == 2)
			{
				var txtDiffusionOK = "<img src='http://www.lesonunique.com/datasun/selection_auditeur/images/red-cross.png' width=16px height=16px/>Pour diffuser ce titre, <span style='font-weight:bold; color:#35aadc;' onclick='goContact2(\""+escape(Dedicace._json_list2[i].artiste)+"\",\""+escape(Dedicace._json_list2[i].titre)+"\");'>cliquez ici</span>";
			}
			else
			{
				var txtDiffusionOK = Dedicace._json_list2[i].fld_next_available;
			}
			content +=  '<tr id="table-dedicace-playlist2">'+
							'<td class="line-artiste" onclick="Dedicace.openLineArtiste2('+i+');">' +
								'<table id="jp_container" width="100%" cellpadding="5" cellspacing="0" border="0" style="background-color: '+Dedicace._json_list2[i].background_color+';">' +
									'<tr>' +
										'<td valign="top" width="60">' +
											'<div style="position:relative;" id="btn_play_pause_dedicace_'+i+'">' +
												'<div>'+Dedicace._json_list2[i].element_image+'</div>';
			if (Dedicace._json_list2[i].extrait_audio!='')
			content +=                          '<div id="repereLectureDed2_'+i+'"><div class="play play1" onclick="newSonTemp('+i+',\'ded2\')"><img src="images/player/play.png" /></div><div class="play play2" style="display:none;" onclick="pauseSonTemp('+i+',\'ded2\')"><img src="images/player/stop.png" /></div></div>';
			content +=                      '</div>' +
											'<div class="line_play_dedicace" id="line_'+i+'_play_dedicace"><div class="timer_dedicace"></div></div>' +
										'</td>' +
										'<td valign="top" style="padding-top:15px;height: 70px;">' +
											'<strong style="text-transform:uppercase;"><span id="lienRechercheSPAN2-'+i+'" style="font-weight:bold;" onclick="Dedicace.rechercheClicB('+i+');">'+Dedicace._json_list2[i].artiste+' - '+Dedicace._json_list2[i].titre+'</span></strong><br /><small class="diffusionOk">'+txtDiffusionOK+'</small>' +
										'</td>' +
									'</tr>' +
									'<tr>' +
										'<td colspan="2">' +
											'<div id="line-artiste2-'+i+'" style="display:none;">' +
												'<div>Album : '+Dedicace._json_list2[i].album+'</div>' +
												'<div><em>'+Dedicace._json_list2[i].annee+' - '+Dedicace._json_list2[i].duree+' - <span id="lienRechercheSPANs2-'+i+'" style="font-weight:bold;" onclick="Dedicace.rechercheClicB2('+i+');">#'+Dedicace._json_list2[i].style+'</span></em></div>' +
												'<!--<div class="popularite">'+Dedicace._json_list2[i].popularite+'</div>-->' +
												'<div>' +
													((Dedicace._json_list2[i].fld_next_available.indexOf('red-cross')<0) ? '<a href="javascript:" onclick="Dedicace.dedicacer('+Dedicace._json_list2[i].id_musique+');"><span class="fs1" aria-hidden="true" data-icon="&#xe008;"></span> Dédicacer</a>' : '') +
													//((Dedicace._json_list[i].extrait_audio!='') ? '<a href="javascript:" onclick="Dedicace.playPause('+i+');" class="playPause" id="btn_playpause_'+i+'"><span class="fs1" aria-hidden="true" data-icon="&#xe105;"></span></a><a href="javascript:" class="playPause"  onclick="Dedicace.stop('+i+');Player.playDirect()"><img src="images/player/refresh.png" border="0" height="30"></a>' : '')+
												'</div>' +
											'</div>' +
										'</td>' +
									'</tr>' +
								'</table>' +
							'</td>'+
						'</tr>';
			}
	
		content += '</table>';
	
		$('#step2part2').html(content);
		
    },
	
	stop : function(p_id) {
        console.log('****************************************** stop ='+p_id);
        $('#line_'+p_id+'_play_dedicace').fadeOut();
        $('#btn_play_pause_dedicace_'+p_id).find('.pause').css('display','none');
        $('#btn_play_pause_dedicace_'+p_id).find('.play').css('display','block');
        Dedicace._current_dedicace_play=-1;
	},

    play : function(p_id) {
        console.log('-------------------------------------------------------------------***********'+Dedicace._current_dedicace_play+'!='+p_id);
        if(Dedicace._current_dedicace_play!=p_id) {
            Dedicace.stop(Dedicace._current_dedicace_play);
        }
        $('#line_'+p_id+'_play_dedicace').fadeIn().find('.timer_dedicace').css('width','0%').stop().animate({'width':'100%'},31000);
        $('#btn_play_pause_dedicace_'+p_id).find('.pause').css('display','block').delay(31000).fadeOut();
        $('#btn_play_pause_dedicace_'+p_id).find('.play').css('display','none').delay(31000).fadeIn(function() {
            //$(this).css('display','block');
            //Dedicace._current_dedicace_play='-1';
            //$('#line_'+p_id+'_play_dedicace').fadeOut();
            if(Dedicace._current_dedicace_play==p_id) {
                Dedicace.stop(p_id);
                Player.player.pause();
            }
        });
        Player.refresh_status('dedicace');
        Player.player.aod({
            'track_url': Dedicace._json_list[p_id].extrait_audio,
            'time_end': getTimeStamp()+10000,
            'time_start': getTimeStamp()
        });
        Dedicace._current_dedicace_play=p_id;
    },

    pause : function(p_id) {
        Player.refresh_status('dedicace');
        Player.player.pause();
        Dedicace.stop(p_id);
    },

    playPause : function(p_id) {
        console.log('playPause function');
		Player.refresh_status('dedicace');
        if(Dedicace._current_dedicace_play==p_id) {
            //pause
            console.log('pause dedicace');
            Dedicace.stop(p_id);
        } else {
            //play
            $('#line_'+p_id+'_play_dedicace').fadeIn().find('.timer_dedicace').css('width','0%').stop().animate({'width':'100%'},31000);
            $('#btn_playpause_'+p_id).html('<span class="fs1" aria-hidden="true" data-icon="&#xe107;"></span>').delay(31000).fadeIn(function() {
                $(this).html('<span class="fs1" aria-hidden="true" data-icon="&#xe105;"></span>');
                Dedicace._current_dedicace_play='-1';
                $('#line_'+p_id+'_play_dedicace').fadeOut();
            });


            Player.player.aod({
                'track_url': Dedicace._json_list[p_id].extrait_audio,
                'time_end': getTimeStamp()+10000,
                'time_start': getTimeStamp()
            });
            Player.refresh_status('dedicace');

            Dedicace._current_dedicace_play=p_id;
        }
    },
	
	rechercheClic : function(clic_num) {
		console.log(clic_num);
		console.log(this._line_open);
		if(this._line_open!=='' && this._line_open==clic_num) 
		{
        	console.log(Dedicace._json_list[clic_num].artiste);
			Dedicace.launch_search_clic(Dedicace._json_list[clic_num].artiste);
		}
    },
	
	rechercheClic2 : function(clic_num) {
		console.log(clic_num);
		console.log(this._line_open);
		if(this._line_open!=='' && this._line_open==clic_num) 
		{
        	console.log(Dedicace._json_list[clic_num].style);
			Dedicace.launch_search_clic('#'+Dedicace._json_list[clic_num].style);
		}
    },
	
	rechercheClicB : function(clic_num) {
		/*console.log(clic_num);
		console.log(this._line_open2);*/
		if(this._line_open2!=='' && this._line_open2==clic_num) 
		{
        	console.log(Dedicace._json_list2[clic_num].artiste);
			Dedicace.launch_search_clic(Dedicace._json_list2[clic_num].artiste);
		}
    },
	
	rechercheClicB2 : function(clic_num) {
		/*console.log(clic_num);
		console.log(this._line_open2);*/
		if(this._line_open2!=='' && this._line_open2==clic_num) 
		{
        	console.log(Dedicace._json_list2[clic_num].style);
			Dedicace.launch_search_clic('#'+Dedicace._json_list2[clic_num].style);
		}
    },

    openLineArtiste : function(p_num) {
        if(this._line_open!=='' && this._line_open!==p_num) 
		{
			$('#line-artiste-'+this._line_open).slideUp();
			document.getElementById("lienRechercheSPAN-"+this._line_open).style.color = 'black';
			document.getElementById("lienRechercheSPANs-"+this._line_open).style.color = 'black';
		}
        this._line_open=p_num;
		document.getElementById("lienRechercheSPAN-"+this._line_open).style.color = '#35aadc';
		document.getElementById("lienRechercheSPANs-"+this._line_open).style.color = '#35aadc';
        $('#line-artiste-'+this._line_open).slideDown(function() {
            //Api._scrollPage_Dedicace.refresh();
        });
    },
	
	openLineArtiste2 : function(p_num) {
		console.log('out');
		console.log(p_num);
		console.log(Dedicace._line_open2);
        if(this._line_open2!=='' && this._line_open2!==p_num) 
		{
			$('#line-artiste2-'+this._line_open2).slideUp();
			console.log('in');
			document.getElementById("lienRechercheSPAN2-"+this._line_open2).style.color = 'black';
			document.getElementById("lienRechercheSPANs2-"+this._line_open2).style.color = 'black';
		}
        this._line_open2=p_num;
		document.getElementById("lienRechercheSPAN2-"+this._line_open2).style.color = '#35aadc';
		document.getElementById("lienRechercheSPANs2-"+this._line_open2).style.color = '#35aadc';
        $('#line-artiste2-'+this._line_open2).slideDown(function() {
            //Api._scrollPage_Dedicace.refresh();
        });
    },

    launch_search : function() {
        //if(this._search_open) {
		    console.log('launch_search OPEN');
			Dedicace._rechercheStep = 1;
		
            // lance la recherche
            Dedicace._search_words=$('#input_recherche').val();
            this.valideDedicace();
           // this._search_open=false;
		   
		   
			Dedicace.refreshMenu();
			//setTimeout(Dedicace.refreshMenu,1000);

       // } else {
		 //   console.log('launch_search CLOSED');
           // $('.seach-dedicace .champs').toggle();
            this._search_open=true;
       // }

    },
	
	launch_search_clic : function(txt) {
        //if(this._search_open) {
		    console.log('launch_search OPEN');
			Dedicace._rechercheStep = 1;
		
            // lance la recherche
            Dedicace._search_words=txt;
            this.valideDedicace();
           // this._search_open=false;
		   
		   
			Dedicace.refreshMenu();
			//setTimeout(Dedicace.refreshMenu,1000);

       // } else {
		 //   console.log('launch_search CLOSED');
           // $('.seach-dedicace .champs').toggle();
            this._search_open=true;
       // }

    },

	refreshMenu : function() {
		console.log('refreshMenu >'+_pos_menu)
		//document.getElementById('menu').style.bottom:
		$('#menu').css('top',(_pos_menu)+'px');
	},

    backStep1 : function() {
        $('#step3').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
        $('#step2').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
        $('#step1bis').fadeOut();
        $('#step1').fadeIn(function() {
            //Api._scrollPage_Dedicace.refresh();
        });
    },

    backStep1bis : function(rechercheStep) {
		if(rechercheStep == 0)
			{
			$('.clockpicker').clockpicker().clockpicker('show');
			$('#step3').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
			$('#step2').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
			$('#step1bis').fadeIn();
			$('#step1').fadeOut(function() {
				//Api._scrollPage_Dedicace.refresh();
			});
		}
		else
		{
			Dedicace._rechercheStep = 0;
			Dedicace._search_words = '';
			Dedicace.valideDedicace();
		}
    },

    backStep2 : function() {
        $('#step3').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
        $('#step2').fadeIn(function() {
            //Api._scrollPage_Dedicace.refresh();
        });
    },

    dedicacer :function(p_id) {
        $('#step2').css('display','none');
        $('#step3').fadeIn();

        Dedicace._id_music = p_id;

        jembe.http.post({
            url: Dedicace._url_get_info,
            data: 'id='+p_id,
            onSuccess: Dedicace.callback_dedicacer,
            onError: Dedicace.callback_error
        });
    },

    callback_dedicacer : function(msg) {
        console.log('callback_dedicacer');
        eval('Dedicace._json_info = '+msg);
        console.log(Dedicace._json_info);
		if(Dedicace._fluxMySUN == 1)
		{
			Dedicace._txtSMSMySUN = "sur SUN 93FM/RNT";
		}
		else if(Dedicace._fluxMySUN == 2)
		{
			Dedicace._txtSMSMySUN = "sur le flux SUN Noël de l'application et sur la RNT";
		}
		else if(Dedicace._fluxMySUN == 3)
		{
			Dedicace._txtSMSMySUN = "sur SUN 93FM/RNT";
		}
		else if(Dedicace._fluxMySUN == 4)
		{
			Dedicace._txtSMSMySUN = "sur le flux 100%80 de l'application";
		}
		else if(Dedicace._fluxMySUN == 5)
		{
			Dedicace._txtSMSMySUN = "sur le flux Franco SUN de l'application";
		}
		else
		{
			Dedicace._txtSMSMySUN = 'sur SUN 93FM/RNT';
		}
		
		console.log(Dedicace._json_info[0].artiste);
		console.log(Dedicace._json_info[0].titre);
		
		var artist_temp = (Dedicace._json_info[0].artiste).replace(/\\/g,"\\\\");
		artist_temp = artist_temp.replace(/\'/g,"\\'");
		artist_temp = artist_temp.replace(/\"/g,"\\\"");
		
		var title_temp = (Dedicace._json_info[0].titre).replace(/\\/g,"\\\\");
		title_temp = title_temp.replace(/\'/g,"\\'");
		title_temp = title_temp.replace(/\"/g,"\\\"");
		
		console.log(artist_temp);
		console.log(title_temp);
		
        Dedicace._list_telephone_number = '';
        var content = ' <table cellpadding="0" cellspacing="0" border="0" class="table-dedicace">' +
                    '<tr>' +
                        '<td class="title">' +
							'<img src="images/arrow-left.png" alt="Retour" class="fs1" aria-hidden="true" onclick="Dedicace.backStep2();"/>'+
							'<img src="images/player/music.png" class="imgDedicace" border="0" width="40" />'+
							'<span class="titreDedicace">Dédicacer</span>'+
							'<p id="datetime3"></p>'+
                        '</td>' +
                    '</tr>';

        content +=  '<tr>' +
                        '<td class="line-artiste">' +
                            '<table width="100%" cellpadding="5" cellspacing="0" border="0">' +
                                '<tr>' +
                                    '<td valign="top" width="100" id="imgOkCSS"><img src="'+Dedicace._json_info[0].chemin_image+'" border="0" width="95" height="95" /></td>' +
                                    '<td valign="top" style="padding-left:10px;padding-top:10px;">' +
                                        ''+Dedicace._json_info[0].artiste+' - '+Dedicace._json_info[0].titre+'<br /><small>'+Dedicace._json_info[0].duree+'</small>' +
                                        '<div>Album : '+Dedicace._json_info[0].album+'</div>' +
                                        '<div>'+Dedicace._json_info[0].annee+'</div>' +
                                        '<!--<div><a href="'+Dedicace._json_info[0].lien_achat+'" target="_blank">Acheter le morceau</a></div>-->' +
                                    '</td>' +
                                '</tr>' +
                            '</table>' +
                        '</td>' +
                    '</tr>' +


					'<tr>' +
                        '<td class="line-artiste">' +
                            '<div id="retour_phone_number"></div>' +
                            '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
                                '<tr>' +
                                    '<td valign="top">' +
                                        '<div><a href="javascript:" onclick="Dedicace.choseInAdressBook();" class="add_phone">Informer des amis par SMS</a></div>' +
                            
                                    '</td>' +
                                '</tr>' +
                            '</table>' +
                        '</td>' +
                    '</tr>'+
					

					'<tr>' +
                        '<td>' +
							'<input type="text" placeholder="Votre prénom" class="prenom" value="'+ConnectLogin.nameUsr+'" id="mon_identifiant_pour_dedicacer">'+ 
//                            '<textarea placeholder="Taper votre message" id="message_textarea" class="line-artiste" onkeydown="Dedicace.countCaract();" maxlength="255">Hello, je souhaite partager avec toi "'+Dedicace._json_info[0].titre+'" de '+Dedicace._json_info[0].artiste+'. Branche toi sur SUN à '+Dedicace.returnTimeString()+' le '+Dedicace.returnDayString()+' 93FM/RNT. Tu peux répondre à ce message musical en installant la nouvelle appli de SUN. http://www.lesonunique.com/appli</textarea>' +
                            '<textarea placeholder="Taper votre message" id="message_textarea" class="line-artiste" onkeydown="Dedicace.countCaract();" maxlength="255" style="height: 120px;">Salut, je souhaite partager avec toi "'+Dedicace._json_info[0].titre+'" de '+Dedicace._json_info[0].artiste+'. Branche toi à '+Dedicace.returnTimeString()+' '+Dedicace._txtSMSMySUN+'. Pour installer la nouvelle application MySun clique ici http://mysun.mx et à toi de jouer \;\)</textarea>' +
                            '<div id="caract_message" style="text-align:right;font-size:11px;color:#333;padding-right:50px;"></div>' +
                        '</td>' +
                    
					'</tr>'+



					


	
                    

					
					
					'<tr>' +
                        '<td class="line-artiste">' +
//                            '<div id="retour_phone_number"></div>' +
                            '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
                                '<tr>' +
                                    '<td valign="top">' +
  //                                      '<div><a href="javascript:" onclick="Dedicace.choseInAdressBook();" class="add_phone">Informer des amis par SMS</a></div>' +
                                        '<div style="margin-top:15px;">' +
                                            '<table width="100%">' +
                                                '<tr>' +
                                                    '<td width="50%"><div><a href="javascript:" onclick="Dedicace.sendDedicace(\''+artist_temp+'\',\''+title_temp+'\');" class="send2">Envoyer ma dédicace</a></div></td>' +
													
                                                '</tr>' +
                                            '</table>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>' +
                            '</table>' +
                        '</td>' +
                    '</tr>';

        content += '</table>';
		
		pageEnCours = 13;

        $('#step3').html(content).fadeIn(function() {
            $('#datetime3').html(Dedicace.returnDayString()+' à '+Dedicace.returnTimeString());
            var num_caract=$('#message_textarea').val();
            $('#caract_message').text(num_caract.length+'/256');
            //Api._scrollPage_Dedicace.refresh();
        });
    },

    countCaract : function() {
        var num_caract=$('#message_textarea').val();
        $('#caract_message').text(num_caract.length+'/256');
    },

    choseInAdressBook : function() {
		if(isphonegap == true)
		{
			navigator.notification.confirm(
				'Entrer un numéro',  // message
				Dedicace.choseInAdressBookDevice,            // fonction de callback appelée avec l'indice du bouton pressé
				'Informer par SMS',            // titre
				['Nouveau','Repertoire']  // libellés des boutons
			);
			console.log('platforme : '+plateformeActive);
		}
		else
		{
			Dedicace._num_of_tel++;
            Dedicace._num_line_adressbook++;
            var content =   '<div id="line_addressbook_'+Dedicace._num_line_adressbook+'" style="padding:5px;background:#fff;margin-bottom:2px;">' +
                                '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
                                    '<tr>' +
                                        '<td>' +
                                            '<div><input type="tel" value="" placeholder="Nouveau numéro" onblur="Dedicace.sms_params();" id="phone_number_'+Dedicace._num_of_tel+'" /></div>' +
                                        '</td>' +
                                        '<td align="center" width="25" onclick="Dedicace.delete_adressbook('+Dedicace._num_line_adressbook+');"><a id="croixNewNum" href="javascript:"><img src="images/croixJaune.png" /></a></td>' +
                                    '</tr>' +
                                '</table>' +
                            '</div>';

            if(Dedicace._num_of_tel<=Dedicace._num_of_tel_max) $('#retour_phone_number').append(content);
            if(Dedicace._num_of_tel==Dedicace._num_of_tel_max) {
                $('a.add_phone').css('display','none');
				if(isphonegap == true)
				{
					navigator.notification.alert('Vous avez atteint le nombre maximal de numéro téléphone!')
				}
				else
				{
					alert('Vous avez atteint le nombre maximal de numéro téléphone!');
				}
            }
		}
    },

    choseInAdressBookDevice : function(button) {
        if (button==2) {
            /*jembe.addressbook.search({
                onSelected : Dedicace.callback_addressbook_selected,
                onCancel : Dedicace.callback_error_addressbook
            });*/
			window.plugins.contactNumberPicker.pick(Dedicace.callback_addressbook_selected,Dedicace.callback_error_addressbook);
			
        } else if(button==1) {
            Dedicace._num_of_tel++;
            Dedicace._num_line_adressbook++;
            var content =   '<div id="line_addressbook_'+Dedicace._num_line_adressbook+'" style="padding:5px;background:#fff;margin-bottom:2px;">' +
                                '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
                                    '<tr>' +
                                        '<td>' +
                                            '<div><input type="tel" value="" placeholder="Nouveau numéro" onblur="Dedicace.sms_params();" id="phone_number_'+Dedicace._num_of_tel+'" /></div>' +
                                        '</td>' +
                                        '<td align="center" width="25" onclick="Dedicace.delete_adressbook('+Dedicace._num_line_adressbook+');"><a id="croixNewNum" href="javascript:"><img src="images/croixJaune.png" /></a></td>' +
                                    '</tr>' +
                                '</table>' +
                            '</div>';

            if(Dedicace._num_of_tel<=Dedicace._num_of_tel_max) $('#retour_phone_number').append(content);
            if(Dedicace._num_of_tel==Dedicace._num_of_tel_max) {
                $('a.add_phone').css('display','none');
                if(isphonegap == true)
				{
					navigator.notification.alert('Vous avez atteint le nombre maximal de numéro téléphone!')
				}
				else
				{
					alert('Vous avez atteint le nombre maximal de numéro téléphone!');
				}
            }
        }

    },

    callback_addressbook_selected : function(result) {
		setTimeout(function(){
			Dedicace._adressBook_name = result.name;
			Dedicace._adressBook_phone = result.phoneNumber;
			console.log(Dedicace._adressBook_name);
			console.log(Dedicace._adressBook_phone);
			Dedicace.callback_addressbook();
		},0);
    },

    callback_addressbook : function() {
		
		Dedicace._num_of_tel++;
        var content =   '<div id="line_addressbook_'+Dedicace._num_line_adressbook+'" style="padding:5px;background:#fff;margin-bottom:2px;">' +
                            '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
                                '<tr>' +
                                    '<td>' +
										'<div style="padding-left:20px;">'+Dedicace._adressBook_name+'</div>' +
                                        '<div><input type="text" value="'+Dedicace._adressBook_phone+'" id="phone_number_'+Dedicace._num_of_tel+'" readonly="readonly"  /></div>' +
                                    '</td>' +
                                    '<td align="center" width="25" onclick="Dedicace.delete_adressbook('+Dedicace._num_line_adressbook+');"><a id="croixNewNum" href="javascript:"><img style="top:37px;" src="images/croixJaune.png" /></a></td>' +
                                '</tr>' +
                            '</table>' +
                        '</div>';

        if(Dedicace._num_of_tel<=Dedicace._num_of_tel_max) $('#retour_phone_number').append(content);
        if(Dedicace._num_of_tel==Dedicace._num_of_tel_max) {
            $('a.add_phone').css('display','none');
            if(isphonegap == true)
			{
				navigator.notification.alert('Vous avez atteint le nombre maximal de numéro téléphone!')
			}
			else
			{
				alert('Vous avez atteint le nombre maximal de numéro téléphone!');
			}
        }
        Dedicace.sms_params();
        //Api._scrollPage_Dedicace.refresh();
    },

    callback_error_addressbook : function(msg) {
        console.log('cancel adressbook ='+msg);
    },

    delete_adressbook : function(p_id) {
        Dedicace._num_of_tel--;
        $('a.add_phone').css('display','block');
        $('#line_addressbook_'+p_id).remove();
        Dedicace.sms_params();
    },

    sms_params : function() {
        Dedicace._list_telephone_number = '';
        var compteur_num=0;
        $('#retour_phone_number input').each(function() {
            Dedicace._list_telephone_number += ((Dedicace._list_telephone_number!='') ? ',' : '')+$(this).val();
            compteur_num++;
        });
        /*if(compteur_num>0) {
            $('#smsid').fadeIn();
        } else $('#smsid').fadeOut();
        if(isIOS){
			console.log('iOS sms:'+Dedicace._list_telephone_number);
			$('#smsid').attr('href','sms:'+Dedicace._list_telephone_number);
        } else {
			console.log('Android sms://'+Dedicace._list_telephone_number+'?body='+$('#message_textarea').val());
			$('#smsid').attr('href','sms://'+Dedicace._list_telephone_number+'?body='+$('#message_textarea').val());
		}*/
    },

    sendDedicace : function(artisteDiffus,titreDiffus) {
        //console.log('nb de tel : '+Dedicace._num_of_tel);
        var phoneNumber = Dedicace._list_telephone_number.split(',');
		Dedicace._fingerid = fingerprint;
		
		Dedicace._titreValidDiffus = titreDiffus.replace(/\\/g,"\\\\");
		Dedicace._titreValidDiffus = Dedicace._titreValidDiffus.replace(/\'/g,"\\'");
		Dedicace._titreValidDiffus = Dedicace._titreValidDiffus.replace(/\"/g,"\\\"");
		
		Dedicace._artisteValidDiffus = artisteDiffus.replace(/\\/g,"\\\\");
		Dedicace._artisteValidDiffus = Dedicace._artisteValidDiffus.replace(/\'/g,"\\'");
		Dedicace._artisteValidDiffus = Dedicace._artisteValidDiffus.replace(/\"/g,"\\\"");
		
		console.log(Dedicace._fingerid);
		if(isphonegap == true)
		{
			PushbotsPlugin.getToken(function(token)
			{
				Dedicace._tokenPUSH = token;
			});
		}
		jembe.http.post({
            url: Dedicace._url_send_dedicace,
			
  			 data: 'date_recherche='+Dedicace.returnTimeStamp()
					+'&dedicaceOuiNom=oui'
					+'&id='+Dedicace._id_music
					+'&nomtelephone='
					+'&telephone1='+phoneNumber[0]
					+'&telephone2='+phoneNumber[1]
					+'&telephone3='+phoneNumber[2]
					+'&telephone4='+phoneNumber[3]
					+'&telephone5='+phoneNumber[4]
					+'&message='+escape($('#message_textarea').val())
					+'&platform='+plateformeActive
					+'&prenom='+escape($('#mon_identifiant_pour_dedicacer').val())
					+'&idtel='+uuidActive
					+'&user_id='+ConnectLogin._idUsr
					+'&finger_id='+Dedicace._fingerid
					+'&tokenPUSH='+Dedicace._tokenPUSH
					+'&flux='+Dedicace._fluxMySUN,
			
            onSuccess: Dedicace.callback_sendDedicace,
            onError: Dedicace.callback_error
        });
    },

    callback_sendDedicace : function(msg) {
          console.log('callback_sendDedicace test = '+msg);
        eval('Dedicace._json_callback_send_dedicace = '+msg);
        //alert(Dedicace._json_callback_send_dedicace.code);
        if(Dedicace._json_callback_send_dedicace.code==100 || Dedicace._json_callback_send_dedicace.code==101)
			{
			    console.log('100 101 renvoi dédicace');
				if(isphonegap == true)
				{
					var testTEXT = "Votre titre "+Dedicace._artisteValidDiffus+" - "+Dedicace._titreValidDiffus+" va être diffusé sur SUN";
					cordova.plugins.notification.local.schedule({
						id         : Dedicace._json_callback_send_dedicace.id_selection_auditeur,
						title      : 'MySun',
						text       : testTEXT,
						sound      : null,
						autoClear  : true,
						at         : new Date(moment(Dedicace._today).subtract(2, 'minutes'))
					});
					
					navigator.notification.alert(Dedicace._json_callback_send_dedicace.message);
				}
				else
				{
					alert(Dedicace._json_callback_send_dedicace.message);
				}
				
				g.play(Dedicace._fluxMySUNdynamique);
				
				goDirect();
				
				ConnectLogin.lastMysun(ConnectLogin._idUsr);
			} 
			else
			if(Dedicace._json_callback_send_dedicace.code==102) 
				{
				    console.log('102 renvoi dédicace');
					if(isphonegap == true)
					{
						navigator.notification.alert(Dedicace._json_callback_send_dedicace.message)
					}
					else
					{
						alert(Dedicace._json_callback_send_dedicace.message);
					}
					Dedicace.backStep1();
				} 
				else
				if(Dedicace._json_callback_send_dedicace.code==103) 
					{
					    console.log('103 renvoi dédicace');
						if(isphonegap == true)
						{
							navigator.notification.alert(Dedicace._json_callback_send_dedicace.message)
						}
						else
						{
							alert(Dedicace._json_callback_send_dedicace.message);
						}
						Dedicace.backStep1();
					} 
					else
					if(Dedicace._json_callback_send_dedicace.code==301) 
					{
					    console.log('301 renvoi dédicace');
						if(isphonegap == true)
						{
							navigator.notification.alert(Dedicace._json_callback_send_dedicace.message)
						}
						else
						{
							alert(Dedicace._json_callback_send_dedicace.message);
						}
						
						Dedicace.callback_renvoyer_dedicace();
						Dedicace.backStep1();						
					} 
	    
    },
	
	callback_renvoyer_dedicace : function() {
					var phoneNumber = Dedicace._list_telephone_number.split(',');
					Dedicace._fingerid = fingerprint;
					console.log(Dedicace._fingerid);	
					console.log('renvoyer dedicace');
					console.log('id_musique'+Dedicace._json_callback_send_dedicace.id_musique);
					console.log('verrou'+Dedicace._json_callback_send_dedicace.verrou);
					console.log('date_recherche='+Dedicace._json_callback_send_dedicace.timestamps);
					if(isphonegap == true)
					{
						PushbotsPlugin.getToken(function(token)
						{
							Dedicace._tokenPUSH = token;
						});
					}
			
					jembe.http.post({
					    url: Dedicace._url_send_dedicace,
						data: 'date_recherche='+Dedicace._json_callback_send_dedicace.timestamp
								+'&dedicaceOuiNom=oui'
								+'&id='+Dedicace._json_callback_send_dedicace.id_musique
								+'&verrou='+Dedicace._json_callback_send_dedicace.verrou
								+'&nomtelephone=&telephone1='+phoneNumber[0]
								+'&telephone2='+phoneNumber[1]
								+'&telephone3='+phoneNumber[2]
								+'&telephone4='+phoneNumber[3]
								+'&telephone5='+phoneNumber[4]
								+'&message='+escape($('#message_textarea').val())
								+'&platform='+plateformeActive
								+'&prenom='+escape($('#mon_identifiant_pour_dedicacer').val())
								+'&idtel='+uuidActive
								+'&user_id='+ConnectLogin._idUsr
								+'&finger_id='+Dedicace._fingerid
								+'&tokenPUSH='+Dedicace._tokenPUSH
								+'&flux='+Dedicace._fluxMySUN,
					    onSuccess: Dedicace.callback_sendDedicace,
					    onError: Dedicace.callback_error
					});						
				},		
	
}
		
function play(idPlayer, control ,urlMp3) {
			
	$('#audioPlayer').attr('src' , urlMp3);
	
	$(".play").show();
	$(".pause").hide();
	
	$("#btn_play_pause_dedicace_"+idPlayer+" .play").hide();
	$("#btn_play_pause_dedicace_"+idPlayer+" .pause").show();

	var player = document.querySelector('#audioPlayer');
		
	player.play();
		
}

function pause(idPlayer) {
	
	$('#audioPlayer').attr('src' , '');
	
	$("#btn_play_pause_dedicace_"+idPlayer+" .play").show();
	$("#btn_play_pause_dedicace_"+idPlayer+" .pause").hide();

	var player = document.querySelector('#audioPlayer');
		
	player.pause();
		
}

/*function switchG() {
	document.getElementById('imageSwitch').innerHTML='<img src="images/switchG.png" />';
	Dedicace._choixMysun = 1;
}
	
function switchD() {
	document.getElementById('imageSwitch').innerHTML='<img src="images/switchD.png" />';
	Dedicace._choixMysun = 2;
}*/	

function enroulePlay()
{
	document.getElementById("maPlayDeroul").onclick = function () { deroulePlay(); };
	
	$('.table-dedicace #table-dedicace-playlist').fadeOut(600,"linear");
	
	$("#flecheMaPlayMySun").addClass("flecheRotate");
}
	
function deroulePlay()
{
	document.getElementById("maPlayDeroul").onclick = function () { enroulePlay(); };
	
	$('.table-dedicace #table-dedicace-playlist').fadeIn(600,"linear");

	$("#flecheMaPlayMySun").removeClass("flecheRotate");
} 

function enroulePlay2()
{
	document.getElementById("maPlayDeroul2").onclick = function () { deroulePlay2(); };
	
	$('.table-dedicace #table-dedicace-playlist2').fadeOut(600,"linear");
	
	$("#flecheMaPlayMySun2").addClass("flecheRotate");
}
	
function deroulePlay2()
{
	document.getElementById("maPlayDeroul2").onclick = function () { enroulePlay2(); };
	
	$('.table-dedicace #table-dedicace-playlist2').fadeIn(600,"linear");

	$("#flecheMaPlayMySun2").removeClass("flecheRotate");
} 