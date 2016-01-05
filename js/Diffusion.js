Diffusion = 
{
	_titres_usr : '',
	
	_dateActuelle : '',
	
	_dateActuelle2 : '',
	
	_dateDiff_min : '',
	
	_dateDiff_max : '',
	
	_heureDiff_min : '',
	
	_heureDiff_max : '',
	
	_heureChoisie : '',
	
	_urlTitres : 1,
	
	init: function() 
	{
		
		if((localStorage.getItem("fluxperso") == 1))
		{
			var positionFLUX = JSON.parse(localStorage.getItem("JSONfluxposition"));
			var nbElemFLUX = positionFLUX.positionflux.length;
			
			switch (positionFLUX.positionflux[(g.get('current') - 1)].flux) 
			{
				case 'sun':
					//fm_nantes
					Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres';
					document.getElementById("choixfluxtitres").innerHTML="SUN Nantes";
					break;
				/*case 'noel':
					//w2
					Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres2/w2';
					document.getElementById("choixfluxtitres").innerHTML="SUN Noël";
					break;*/
				case 'franco':
					//w5
					Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres2/w5';
					document.getElementById("choixfluxtitres").innerHTML="Franco SUN";
					break;
				case 'sports':
					//w3 --> fm_nantes
					Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres';
					document.getElementById("choixfluxtitres").innerHTML="SUN Nantes";
					break;
				case '10080':
					//w4
					Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres2/w4';
					document.getElementById("choixfluxtitres").innerHTML="100%80";
					break;
				case 'sun2':
					//Dernier pod
					Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres';
					document.getElementById("choixfluxtitres").innerHTML="SUN Nantes";
					break;
			}
			
		}
		else
		{
			if((g.get('current'))==1)
			{
				Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres';
				document.getElementById("choixfluxtitres").innerHTML="SUN Nantes";
			}
			/*else if((g.get('current'))==2)
			{
				Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres2/w2';
				document.getElementById("choixfluxtitres").innerHTML="SUN Noël";
			}*/
			else if((g.get('current'))==2)
			{
				Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres2/w5';
				document.getElementById("choixfluxtitres").innerHTML="Franco SUN";
			}
			else if((g.get('current'))==3)
			{
				Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres';
				document.getElementById("choixfluxtitres").innerHTML="SUN Nantes";
			}
			else if((g.get('current'))==4)
			{
				Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres';
				document.getElementById("choixfluxtitres").innerHTML="SUN Nantes";
			}
			else
			{
				Diffusion._urlTitres = 'http://www.lesonunique.com/content/titres-diffuses/jsontitres';
				document.getElementById("choixfluxtitres").innerHTML="SUN Nantes";
			}
		}
		
		document.getElementById("titre_diffus").style.background = '#1077A6';
		document.getElementById("titre_diffus").style.padding = '0px 0px 55px 0px';
		$('#page_diffuses').find('#titre_diffus').html('<div id="chargementDiffusion" align="center" style="margin-top:50px; style="background:none;""><img src="images/player/301.gif" width="64" /></div>');
		
		if(Diffusion._heureChoisie == '' || Diffusion._heureChoisie === undefined || typeof(Diffusion._heureChoisie) == 'undefined')
		{
			Diffusion._dateActuelle = moment().subtract(1, 'hour');
			Diffusion._dateDiff_min = Diffusion._dateActuelle.format('DD')+"/"+Diffusion._dateActuelle.format('MM')+"/"+Diffusion._dateActuelle.format('YYYY');
			Diffusion._heureDiff_min = Diffusion._dateActuelle.format('HH')+":"+Diffusion._dateActuelle.format('mm');
			
			Diffusion._dateActuelle2 = moment().add(5, 'minutes');
			Diffusion._dateDiff_max = Diffusion._dateActuelle2.format('DD')+"/"+Diffusion._dateActuelle2.format('MM')+"/"+Diffusion._dateActuelle2.format('YYYY');
			Diffusion._heureDiff_max = Diffusion._dateActuelle2.format('HH')+":"+Diffusion._dateActuelle2.format('mm');
			
			Diffusion._heureChoisie = '';
		}
		else
		{
			var a = Diffusion._heureChoisie;
			var a1 = a.substr(0, 2);
			var a2 = a.substr(3, 2);
			var a3 = a.substr(6);
			Diffusion._heureChoisie = a2+"/"+a1+"/"+a3;
			console.log(moment(Diffusion._heureChoisie));
			
			Diffusion._dateActuelle = moment(Diffusion._heureChoisie).subtract(1, 'hour');
			Diffusion._dateDiff_min = Diffusion._dateActuelle.format('DD')+"/"+Diffusion._dateActuelle.format('MM')+"/"+Diffusion._dateActuelle.format('YYYY');
			Diffusion._heureDiff_min = Diffusion._dateActuelle.format('HH')+":"+Diffusion._dateActuelle.format('mm');
			
			Diffusion._dateActuelle2 = moment(Diffusion._heureChoisie).add(5, 'minutes');
			Diffusion._dateDiff_max = Diffusion._dateActuelle2.format('DD')+"/"+Diffusion._dateActuelle2.format('MM')+"/"+Diffusion._dateActuelle2.format('YYYY');
			Diffusion._heureDiff_max = Diffusion._dateActuelle2.format('HH')+":"+Diffusion._dateActuelle2.format('mm');
			
			Diffusion._heureChoisie = '';
		}
		
		var requete = $.ajax
		({
			url: Diffusion._urlTitres, 		    
			type: 'GET',
			dataType: 'json',
			headers: 
			{
				'Content-Type': 'application/json'
			},
			data:
			{
				'field_date_de_diffusion_value[min][date]':Diffusion._dateDiff_min,
				'field_date_de_diffusion_value[min][time]':Diffusion._heureDiff_min,
				'field_date_de_diffusion_value[max][date]':Diffusion._dateDiff_max,
				'field_date_de_diffusion_value[max][time]':Diffusion._heureDiff_max
			},
			error: function() 
			{
				console.log("BUG récupération titres");
			},
			success: function() 
			{
				document.getElementById("titre_diffus").style.background = 'white none repeat scroll 0 0';
				document.getElementById("titre_diffus").style.padding = '0px 0px 55px 0px';
				var nbElem=requete.responseJSON.nodes.length;
				var listeTitres=requete.responseJSON;
				Diffusion._titres_usr = listeTitres;
				listerTitres(nbElem,listeTitres);
			}
		});
    },
}


var nbPlaylistActuel = 0;

function listerTitres(nbElem,listeTitres)
{
	console.log(listeTitres);
	
	var current_playlist_play = '';
	
	var artiste;
	var titre;
	var pochette;
	var extrait;
	var dataTime;
	var flag;
	var typebouton;
	var typebouton2;
	
	var liste2 = '<div>';
	var backgroundcolor = '#FFFFFF';
	
	if (nbElem==0)
	{
		liste2 += '<div class="line_playlist" id="line_playlist" style="padding-top: 20px; color:black; background-color:'+backgroundcolor+'">Désolé nous n\'avons pas de titres enregistrés sur ce créneau</div>';
	}
	
	console.log(ConnectLogin._idUsr);
	
	if(ConnectLogin._idUsr == '' || ConnectLogin._idUsr === undefined || typeof(ConnectLogin._idUsr) == 'undefined')
	{
		typebouton = 'addToMyPlaylistOFF';
		typebouton2 = 'addplaylist-2-iconOFF.png';
	}
	else
	{
		typebouton = 'addToMyPlaylistTitres';
		typebouton2 = 'addplaylist-2-icon.png';
	}
	
	for (i = 0; i < nbElem; i++)
	{
		artiste = listeTitres.nodes[i].field_artiste;
		titre = listeTitres.nodes[i].title;
		pochette = listeTitres.nodes[i].field_image_album.src;
		extrait = listeTitres.nodes[i].field_extrait_audio;
		flag = listeTitres.nodes[i].ops;
		idDeflag = listeTitres.nodes[i].nid;
		dataTime = listeTitres.nodes[i].field_date_de_diffusion;
		
		if (i%2 != 0){backgroundcolor = '#FFFFFF';}
		else{backgroundcolor = '#F6F6F6';}
	
		liste2 += '<div class="line_titres" id="titres_line_'+i+'" style="background-color:'+backgroundcolor+'">'+
					'<div class="img_titres" style="width:60px;" id="titres_'+i+'">'+
						'<div class="illus"><img src="'+pochette+'" border="0" weight="60" height="60" /></div>'+
						'<div id="repereLectureTitres_'+i+'"><div class="play play1" onclick="newSonTemp('+i+',\'titres\')"><img src="images/player/play.png" /></div><div class="play play2" style="display:none;" onclick="pauseSonTemp('+i+',\'titres\')"><img src="images/player/stop.png" /></div></div>'+
					'</div>'+
					'<div id="share_titres_'+i+'" class="share_titres"><a href="javascript:'+typebouton+'(\''+idDeflag+'\',\''+i+'\')"><img src="images/'+typebouton2+'" /></a></div>'+
					'<div class="title_titres"><span style="font-weight:bold;color:#F29400;" >'+dataTime+'<br/></span><span class="title" style="padding-bottom:10px;">'+titre+'<br/></span><span style="font-weight:bold;">'+artiste+'</span></div>'+
				'</div>';
	}
	
	liste2 += '</div>';
	$('#page_diffuses').find('#titre_diffus').html(liste2);
	
	testFlag(Direct._fluxSelect);
	
}

function addToMyPlaylistTitres(idDeflag,i)
{
	if(isphonegap == true)
	{
		window.plugins.toast.showShortBottom('Ajout du morceau en cours...');
	}
	else
	{
		document.getElementById("messageFlottant").style.background = '#F1F1F1';
		document.getElementById("messageFlottant").style.color = '#242424';
		document.getElementById("messageFlottantText").innerHTML = 'Ajout du morceau en cours...';
		document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
		document.getElementById("messageFlottant").style.display = 'block';
		
		window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
	}
	
	var dataFlag = {
		flag_name: 'bookmarks',
		entity_id: idDeflag,
		uid: ConnectLogin._idUsr,
		skip_permission_check: true ,
		action: 'flag'
	};
	
	Drupal.services.call({
		method: 'POST',
		path: 'flag/flag.json',
		service: 'flag',
		resource:'flag',
		data:JSON.stringify(dataFlag),
		success: function(result) {
			console.log(result);
			nbPlaylistActuel=nbPlaylistActuel+1;
			document.getElementById("nbMenuPlaylist").innerHTML="<label class='digits active'>"+nbPlaylistActuel+"</label>";
			document.getElementById("nbMorceauxProfil").innerHTML=nbPlaylistActuel;
			document.getElementById("share_titres_"+i).innerHTML='<a href="javascript:supToMyPlaylistTitres(\''+idDeflag+'\',\''+i+'\')"><img src="images/supplaylist-2-icon2.png" /></a>';
			Playlist.init();
			if(isphonegap == true)
			{
				window.plugins.toast.showShortBottom('Morceau ajouté à la playlist');
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#F1F1F1';
				document.getElementById("messageFlottant").style.color = '#242424';
				document.getElementById("messageFlottantText").innerHTML = 'Morceau ajouté à la playlist';
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
			
		},
		error: function() {
			if(isphonegap == true)
			{
				window.plugins.toast.showShortBottom('Erreur d\'ajout du morceau');
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#F1F1F1';
				document.getElementById("messageFlottant").style.color = '#242424';
				document.getElementById("messageFlottantText").innerHTML = 'Erreur d\'ajout du morceau';
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
	});
	
}

function testFlagTitres(flux_musique)
{
	
	if(ConnectLogin._idUsr != '')
	{
		document.getElementById("share_titres").innerHTML='<a href="javascript:supToMyPlaylistTitres(\''+idDeflag+'\',\''+i+'\')"><img src="images/supplaylist-2-icon.png" /></a>';
	}
	else
	{
		document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistNO.png' class='add' onclick='addToMyPlaylistOFF();' />";
	}
	
}

function rechercheTitresParDate()
{
	var dateSelectionne = $('#dateRechercheTitres').val();
	
	Diffusion._heureChoisie = dateSelectionne;
	
	Diffusion.init();
}