Playlist = 
{
	_playlist_usr : '',
	
	init: function() 
	{
		
		document.getElementById("playlist_content").style.background = '#1077A6';
		document.getElementById("playlist_content").style.padding = '0px 0px 55px 0px';
		$('#page_playlist').find('#playlist_content').html('<div id="chargementPlaylist" align="center" style="margin-top:50px; style="background:none;""><img src="images/player/301.gif" width="64" /></div>');
	
		var requete = $.ajax
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
			},
			success: function() 
			{
				document.getElementById("playlist_content").style.background = 'white none repeat scroll 0 0';
				document.getElementById("playlist_content").style.padding = '0px 0px 55px 0px';
				//$('#chargementPlaylist').hide();
				console.log(requete);
				var nbElem=requete.responseJSON.node.length;
				var listePlay=requete.responseJSON;
				Playlist._playlist_usr = listePlay;
				listerPlaylist(nbElem,listePlay);
			}
		});
    },

	clearList: function()
	{
		document.getElementById("playlist_content").style.background = 'white none repeat scroll 0 0';
		document.getElementById("playlist_content").style.padding = '25px 0px 55px 0px';
		document.getElementById("nbMenuPlaylist").innerHTML="";
		document.getElementById("nbMorceauxProfil").innerHTML="";
	}
}


var nbPlaylistActuel = 0;

function listerPlaylist(nbElem,listePlay)
{
	console.log(listePlay);
	
	var current_playlist_play = '';
	
	var artiste;
	var titre;
	var pochette;
	var extrait;
	var flag;
	
	var liste2 = '<div>'+
	'<div onclick="Playlist.init();" style="padding-top:5px;"><img style="cursor:pointer;" src="images/refreshplay-2-icon.png" /></div>'+
	'<div style="padding-bottom:10px;"><a id="lienSpotifyChange" href="javascript:window.open(\'http://www.lesonunique.com/datasun/playlists/spotify/index.php?user='+ConnectLogin._idUsr+'\',\'_system\',\'location=yes,presentationstyle=pagesheet,hardwareback=yes\');"><img src="images/spotify-2-icon.png" /></a>'+
	'<a id="lienDeezerChange" href="javascript:window.open(\'http://www.lesonunique.com/datasun/playlists/deezer/index.php?user='+ConnectLogin._idUsr+'\',\'_system\',\'location=yes,presentationstyle=pagesheet,hardwareback=yes\');"><img src="images/deezer-2-icon.png" /></a>'+
	'<a id="lienYoutubeChange" href="javascript:window.open(\'http://www.lesonunique.com/datasun/playlists/youtube/index.php?user='+ConnectLogin._idUsr+'\',\'_system\',\'location=yes,presentationstyle=pagesheet,hardwareback=yes\');"><img src="images/youtube-2-icon.png" /></a></div>';
	var backgroundcolor = '#FFFFFF';
	var listeProfilPlay = '';
	
	if (nbElem==0)
	{
		liste2 += '<div class="line_playlist" id="line_playlist" style="background-color:'+backgroundcolor+'">Vous n\'avez pas encore de morceaux dans votre Playlist SUN</div>';
	}
	
	for (i = 0; i < nbElem; i++)
	{
		artiste = listePlay.node[i].field_artiste;
		titre = listePlay.node[i].title;
		pochette = listePlay.node[i].field_image_album.src;
		extrait = listePlay.node[i].field_extrait_audio;
		flag = listePlay.node[i].ops;
		
		idDeflag = listePlay.node[i].Nid;
		
		//console.log(flag);
		flag2=flag.replace('      <a href="','http://www.lesonunique.com');
		flag3=flag2.replace('" title="Retirer de mes playlists" class="flag unflag-action flag-link-normal" rel="nofollow">Retirer de mes playlists</a>&nbsp;','');
		//console.log(flag3);
		
		if (i%2 != 0){backgroundcolor = '#FFFFFF';}
		else{backgroundcolor = '#F6F6F6';}
	
		liste2 += '<div class="line_playlist" id="playlist_line_'+i+'" style="background-color:'+backgroundcolor+'">'+
					'<div class="img_playlist" style="width:60px;" id="playlist_'+i+'">'+
						'<div class="illus"><img src="'+pochette+'" border="0" weight="60" height="60" /></div>'+
						'<div id="repereLecturePlay_'+i+'"><div class="play play1" onclick="newSonTemp('+i+',\'playl\')"><img src="images/player/play.png" /></div><div class="play play2" style="display:none;" onclick="pauseSonTemp('+i+',\'playl\')"><img src="images/player/stop.png" /></div></div>'+
					'</div>'+
					'<div class="share_playlist"><a href="javascript:retirerPlaylist(\''+idDeflag+'\',\''+i+'\')"><img src="images/supplaylist-2-icon2.png" /></a></div>'+
					'<div class="title_playlist"><span class="title" style="padding-bottom:10px;">'+titre+'<br/></span><!--<div class="trait"></div>-->'+artiste+'</div>'+
				'</div>';
		
		if(i<3)
		{
			listeProfilPlay +=	'<div class="card-elements-mysun-img" style="width:50px; height:50px; margin-bottom: 10px;">'+
									'<img src="'+pochette+'" />'+
								'</div>'+
								'<div class="card-elements-mysun-txt">'+
									'<span style="font-weight:bold;">'+artiste+'</span>'+
									'<br/>'+titre+
								'</div>';
		}
	}
	
	if (nbElem==0)
	{
		listeProfilPlay += '<div class="card-elements-mysun-txt">Vous n\'avez pas encore de morceaux dans votre playlist</div>';
	}
	else
	{
		listeProfilPlay += '<div class="card-elements-tout" onclick="goPlaylist();">Voir tout</div>';
	}
	liste2 += '</div>';
	$('#page_playlist').find('#playlist_content').html(liste2);
	$('#page_profil').find('#profilPlaylist').html(listeProfilPlay);
	
	testFlag(Direct._fluxSelect);
	
	if(isphonegap == false)
	{
		$('#lienSpotifyChange').attr('href','http://www.lesonunique.com/datasun/playlists/spotify/index.php?user='+ConnectLogin._idUsr);
		$('#lienDeezerChange').attr('href','http://www.lesonunique.com/datasun/playlists/deezer/index.php?user='+ConnectLogin._idUsr);
		$('#lienYoutubeChange').attr('href','http://www.lesonunique.com/datasun/playlists/youtube/index.php?user='+ConnectLogin._idUsr);
	}
	
	nbPlaylistActuel=nbElem;
	document.getElementById("nbMenuPlaylist").innerHTML="<label class='digits active'>"+nbPlaylistActuel+"</label>";
	document.getElementById("nbMorceauxProfil").innerHTML=nbPlaylistActuel;
	
}


function retirerPlaylist(idDeflag,i)
{
	if(isphonegap == true)
	{
		window.plugins.toast.showShortBottom('Retrait du morceau en cours...');
	}
	else
	{
		document.getElementById("messageFlottant").style.background = '#F1F1F1';
		document.getElementById("messageFlottant").style.color = '#242424';
		document.getElementById("messageFlottantText").innerHTML = 'Retrait du morceau en cours...';
		document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
		document.getElementById("messageFlottant").style.display = 'block';
		
		window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
	}
	
	var dataUnFlag = {
		  flag_name: 'bookmarks',
		  entity_id: idDeflag,
		  uid: ConnectLogin._idUsr,
		  skip_permission_check: true ,
		  action: 'unflag'
	};
	
	
	Drupal.services.call({
		method: 'POST',
		path: 'flag/flag.json',
		service: 'flag',
		resource:'flag',
		data:JSON.stringify(dataUnFlag),
		success: function(result) {
			console.log(result);
			var el = document.getElementById('playlist_line_'+i);
			el.parentNode.removeChild(el);
			nbPlaylistActuel=nbPlaylistActuel-1;
			document.getElementById("nbMenuPlaylist").innerHTML="<label class='digits active'>"+nbPlaylistActuel+"</label>";
			document.getElementById("nbMorceauxProfil").innerHTML=nbPlaylistActuel;
			if(isphonegap == true)
			{
				window.plugins.toast.showShortBottom('Morceau retiré de la playlist');
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#F1F1F1';
				document.getElementById("messageFlottant").style.color = '#242424';
				document.getElementById("messageFlottantText").innerHTML = 'Morceau retiré de la playlist';
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		},
		error: function() {
			if(isphonegap == true)
			{
				window.plugins.toast.showShortBottom('Erreur de retrait du morceau');
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#F1F1F1';
				document.getElementById("messageFlottant").style.color = '#242424';
				document.getElementById("messageFlottantText").innerHTML = 'Erreur de retrait du morceau';
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
	});

}

function retirerPlaylist2()
{
	if(isphonegap == true)
	{
		window.plugins.toast.showShortBottom('Retrait du morceau en cours...');
	}
	else
	{
		document.getElementById("messageFlottant").style.background = '#F1F1F1';
		document.getElementById("messageFlottant").style.color = '#242424';
		document.getElementById("messageFlottantText").innerHTML = 'Retrait du morceau en cours...';
		document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
		document.getElementById("messageFlottant").style.display = 'block';
		
		window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
	}
	
	var dataUnFlag2 = {
		  flag_name: 'bookmarks',
		  entity_id: Direct._entityID,
		  uid: ConnectLogin._idUsr,
		  skip_permission_check: true ,
		  action: 'unflag'
	};
	
	
	Drupal.services.call({
		method: 'POST',
		path: 'flag/flag.json',
		service: 'flag',
		resource:'flag',
		data:JSON.stringify(dataUnFlag2),
		success: function(result) {
			console.log(result);
			nbPlaylistActuel=nbPlaylistActuel-1;
			document.getElementById("nbMenuPlaylist").innerHTML="<label class='digits active'>"+nbPlaylistActuel+"</label>";
			document.getElementById("nbMorceauxProfil").innerHTML=nbPlaylistActuel;
			document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistADD.png' class='add' onclick='addToMyPlaylist();' />";
			Playlist.init();
			if(isphonegap == true)
			{
				window.plugins.toast.showShortBottom('Morceau retiré de la playlist');
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#F1F1F1';
				document.getElementById("messageFlottant").style.color = '#242424';
				document.getElementById("messageFlottantText").innerHTML = 'Morceau retiré de la playlist';
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		},
		error: function() {
			if(isphonegap == true)
			{
				window.plugins.toast.showShortBottom('Erreur de retrait du morceau');
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#F1F1F1';
				document.getElementById("messageFlottant").style.color = '#242424';
				document.getElementById("messageFlottantText").innerHTML = 'Erreur de retrait du morceau';
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
	});

}

function addToMyPlaylist()
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
	
	console.log(Direct._entityID);
	
	var dataFlag = {
		flag_name: 'bookmarks',
		entity_id: Direct._entityID,
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
			document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistSUP.png' class='supp' onclick='retirerPlaylist2();' />";
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

function addToMyPlaylistOFF()
{
	if(isphonegap == true)
	{
		window.plugins.toast.showShortBottom('Fonction disponible uniquement connecté');
	}
	else
	{
		document.getElementById("messageFlottant").style.background = '#F1F1F1';
		document.getElementById("messageFlottant").style.color = '#242424';
		document.getElementById("messageFlottantText").innerHTML = 'Fonction disponible uniquement connecté';
		document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
		document.getElementById("messageFlottant").style.display = 'block';
		
		window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
	}
}

function testFlag(flux_musique)
{
	
	if(ConnectLogin._idUsr != '')
	{
		if(Direct._entityID != '')
		{
			var dataTestFlag = {
				  flag_name: 'bookmarks',
				  entity_id: Direct._entityID,
				  uid: ConnectLogin._idUsr,
				  skip_permission_check: true
				};
			
			Drupal.services.call({
				method: 'POST',
				path: 'flag/is_flagged.json',
				service: 'flag',
				resource:'is_flagged',
				data:JSON.stringify(dataTestFlag),
				success: function(result) {
					console.log(result);
					if(result[0]==true)
					{
						document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistSUP.png' class='supp' onclick='retirerPlaylist2();' />";
					}
					else
					{
						document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistADD.png' class='add' onclick='addToMyPlaylist();' />";
					}
				}
			});	
		}
		else
		{
			document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistNO.png' class='no' />";
		}
	}
	else
	{
		document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistNO.png' class='add' onclick='addToMyPlaylistOFF();' />";
	}
	
}

function VoteOFF(type)
{
	if(type==1)
	{
		if(isphonegap == true)
		{
			window.plugins.toast.showShortBottom('Impossible de voter pour cet élément');
		}
		else
		{
			document.getElementById("messageFlottant").style.background = '#F1F1F1';
			document.getElementById("messageFlottant").style.color = '#242424';
			document.getElementById("messageFlottantText").innerHTML = 'Impossible de voter pour cet élément';
			document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
			document.getElementById("messageFlottant").style.display = 'block';
			
			window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
		}
	}
	else if(type==2)
	{
		if(isphonegap == true)
		{
			window.plugins.toast.showShortBottom('Connectez-vous pour voter');
		}
		else
		{
			document.getElementById("messageFlottant").style.background = '#F1F1F1';
			document.getElementById("messageFlottant").style.color = '#242424';
			document.getElementById("messageFlottantText").innerHTML = 'Connectez-vous pour voter';
			document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
			document.getElementById("messageFlottant").style.display = 'block';
			
			window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
		}
	}
	else
	{
		window.plugins.toast.showShortBottom('Impossible de voter pour cet élément');
		if(isphonegap == true)
		{
			window.plugins.toast.showShortBottom('Impossible de voter pour cet élément');
		}
		else
		{
			document.getElementById("messageFlottant").style.background = '#F1F1F1';
			document.getElementById("messageFlottant").style.color = '#242424';
			document.getElementById("messageFlottantText").innerHTML = 'Impossible de voter pour cet élément';
			document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
			document.getElementById("messageFlottant").style.display = 'block';
			
			window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
		}
	}
}

function testVote(flux_musique)
{	
	if(ConnectLogin._idUsr != '' && ConnectLogin._idUsr != 0)
	{
		if(Direct._entityID != '')
		{
			document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislike.png' class='dislike' onclick='DOWNVote();' />";
			document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/like.png' class='like' onclick='UPVote();' />";
		}
		else
		{
			document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(1);' />";
			document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(1);' />";
		}
	}
	else
	{
		document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(2);' />";
		document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(2);' />";
	}
}

function UPVote()
{
	if(isphonegap == true)
	{
		window.plugins.toast.showShortBottom('Vote en cours...');
	}
	else
	{
		document.getElementById("messageFlottant").style.background = '#F1F1F1';
		document.getElementById("messageFlottant").style.color = '#242424';
		document.getElementById("messageFlottantText").innerHTML = 'Vote en cours...';
		document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
		document.getElementById("messageFlottant").style.display = 'block';
		
		window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
	}
			
		var dataUP = {
			votes: [{
				entity_type: 'node',
				entity_id: Direct._entityID,
				value_type: 'points',
				value: 1,
				tag: 'vote',
				uid:ConnectLogin._idUsr
			}]
		}
			
		Drupal.services.call({
			method: 'POST',
			path: 'votingapi/set_votes.json',
			service: 'votingapi',
			resource:'set_votes',
			data:JSON.stringify(dataUP),
			success: function(result) {
				console.log(result);
				if(isphonegap == true)
				{
					window.plugins.toast.showShortBottom('Vote accepté');
				}
				else
				{
					document.getElementById("messageFlottant").style.background = '#F1F1F1';
					document.getElementById("messageFlottant").style.color = '#242424';
					document.getElementById("messageFlottantText").innerHTML = 'Vote accepté';
					document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
					document.getElementById("messageFlottant").style.display = 'block';
					
					window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
				}
				document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislike.png' class='dislike' onclick='DOWNVote();' />";
				document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeOK.png' class='like' />";
			},
			error: function() {
				if(isphonegap == true)
				{
					window.plugins.toast.showShortBottom('Erreur de vote');
				}
				else
				{
					document.getElementById("messageFlottant").style.background = '#F1F1F1';
					document.getElementById("messageFlottant").style.color = '#242424';
					document.getElementById("messageFlottantText").innerHTML = 'Erreur de vote';
					document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
					document.getElementById("messageFlottant").style.display = 'block';
					
					window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
				}
			}
		});
	
}

function DOWNVote()
{
	if(isphonegap == true)
	{
		window.plugins.toast.showShortBottom('Vote en cours...');
	}
	else
	{
		document.getElementById("messageFlottant").style.background = '#F1F1F1';
		document.getElementById("messageFlottant").style.color = '#242424';
		document.getElementById("messageFlottantText").innerHTML = 'Vote en cours...';
		document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
		document.getElementById("messageFlottant").style.display = 'block';
		
		window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
	}
		var dataUP = {
			votes: [{
				entity_type: 'node',
				entity_id: Direct._entityID,
				value_type: 'points',
				value: -1,
				tag: 'vote',
				uid:ConnectLogin._idUsr
			}]
		}
			
		Drupal.services.call({
			method: 'POST',
			path: 'votingapi/set_votes.json',
			service: 'votingapi',
			resource:'set_votes',
			data:JSON.stringify(dataUP),
			success: function(result) {
				console.log(result);
				if(isphonegap == true)
				{
					window.plugins.toast.showShortBottom('Vote accepté');
				}
				else
				{
					document.getElementById("messageFlottant").style.background = '#F1F1F1';
					document.getElementById("messageFlottant").style.color = '#242424';
					document.getElementById("messageFlottantText").innerHTML = 'Vote accepté';
					document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
					document.getElementById("messageFlottant").style.display = 'block';
					
					window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
				}
				document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeOK.png' class='dislike' />";
				document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/like.png' class='like' onclick='UPVote();' />";
			},
			error: function() {
				if(isphonegap == true)
				{
					window.plugins.toast.showShortBottom('Erreur de vote');
				}
				else
				{
					document.getElementById("messageFlottant").style.background = '#F1F1F1';
					document.getElementById("messageFlottant").style.color = '#242424';
					document.getElementById("messageFlottantText").innerHTML = 'Erreur de vote';
					document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
					document.getElementById("messageFlottant").style.display = 'block';
					
					window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
				}
			}
		});
}