function goDirect() //
{
	$('#page_direct').show();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	afficherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 0;
	window.scrollTo(0,0);
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
	
	if(isphonegap == true)
	{
		var localStorage_tuto1 = localStorage.getItem("tuto1");
		var localStorage_tuto2 = localStorage.getItem("tuto2");
		
		if(localStorage_tuto1)
		{
			if(localStorage_tuto2)
			{
			}
			else
			{
				tuto.tutoPart2();
			}
		}
	}
}

function goDirect2() //
{
	$('#page_direct').show();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 0;
	window.scrollTo(0,0);
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
	
	if(isphonegap == true)
	{
		var localStorage_tuto1 = localStorage.getItem("tuto1");
		var localStorage_tuto2 = localStorage.getItem("tuto2");
		
		if(localStorage_tuto1)
		{
			if(localStorage_tuto2)
			{
			}
			else
			{
				tuto.tutoPart2();
			}
		}
	}
}

function goDiffusion() //
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 16;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').show();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
	Diffusion.init();
}

function goPlaylist() //
{
	cacherPlayer();
	$('#page_direct').hide();
	$('#page_playlist').show();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 1;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goPlaylist2() //
{
	cacherPlayer();
	$('#page_direct').hide();
	$('#page_playlist').show();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 1;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$("#menu li").removeClass("mm-selected");
	$("#menu li#menuplaylist").addClass("mm-selected");
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goPodcasts() //
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').show();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 2;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goPodcasts1() //
{
	$('#page1_podcasts').show();
	$('#page2_podcasts').hide();
	$('#page3_podcasts').hide();
	
	$('.purple').addClass("selected");
	$('.yellow').removeClass("selected");
	$('.red').removeClass("selected");
}

function goPodcasts2() //
{
	$('#page1_podcasts').hide();
	$('#page2_podcasts').show();
	$('#page3_podcasts').hide();
	
	$('.purple').removeClass("selected");
	$('.yellow').addClass("selected");
	$('.red').removeClass("selected");
	
	Podcasts.loadPodcastsOFFLINE();
}

function goPodcasts3() //
{
	$('#page1_podcasts').hide();
	$('#page2_podcasts').hide();
	$('#page3_podcasts').show();
	
	$('.purple').removeClass("selected");
	$('.yellow').removeClass("selected");
	$('.red').addClass("selected");
}

function goVideos() //
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').show();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 3;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goEmbedVideos() //
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 15;
	$('#page_tweets').hide();
	$('#page_embed_video').show();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}


function goInformations() //
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').show();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 4;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goContact() //
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').show();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 5;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goContact2(artist,title) // Prérempli
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').show();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 5;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	document.getElementById('c_message').innerHTML = "Bonjour,\nEst-il possible de débloquer le titre \""+unescape(artist)+' - '+unescape(title)+"\" pour une diffusion sur MySun ?";
	document.getElementById('c_destinataire').getElementsByTagName('option')[2].selected = 'selected';
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goLoginForm() 
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').show();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 6;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
	
	if(isphonegap == true)
	{
		tuto.closeTuto1();
	}
}

function goRetrieveMDP() 
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 6;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').show();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goRegisterForm() 
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').show();
	pageEnCours = 7;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
	
	if(isphonegap == true)
	{
		tuto.closeTuto1();
	}
}

function goProfil() 
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').show();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 8;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goModificationProfil()
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 8;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').show();
	$('#page_profil3').hide();
}

function goReglagesnProfil()
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 8;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').show();
}

function goMessageInfo(type)
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').show();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 9;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goToDedicace() 
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').show();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 10;
	$('#page_tweets').hide();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

function goToTweets() 
{
	$('#page_direct').hide();
	$('#page_playlist').hide();
	$('#page_podcasts').hide();
	$('#page_videos').hide();
	$('#page_informations').hide();
	$('#page_contact').hide();
	$('#page_login').hide();
	$('#loginBox').hide();
	$('#page_profil').hide();
	$('#page_message_user').hide();
	$('#page_dedicace').hide();
	cacherPlayer();
	document.getElementById('messageFlottant').style.display = 'none';
	$('#page_register').hide();
	pageEnCours = 14;
	$('#page_tweets').show();
	$('#page_embed_video').hide();
	Videos.stop();
	$('#page_mdp_oublie').hide();
	$('#page_diffuses').hide();
	$('#page_profil2').hide();
	$('#page_profil3').hide();
}

var toDirect = document.getElementById("direct");
toDirect.addEventListener("click", goDirect, false);

var toDiffusion = document.getElementById("diffusion");
toDiffusion.addEventListener("click", goDiffusion, false);

var toPlaylist = document.getElementById("playlist");
toPlaylist.addEventListener("click", goPlaylist, false);

var toPodcasts = document.getElementById("podcasts");
toPodcasts.addEventListener("click", goPodcasts, false);

var toVideos = document.getElementById("videos");
toVideos.addEventListener("click", goVideos, false);

var toInformations = document.getElementById("informations");
toInformations.addEventListener("click", goInformations, false);

var toContact = document.getElementById("contact");
toContact.addEventListener("click", goContact, false);

function transitionProfil() 
{
	if(ConnectLogin.onlineUsr == true)
	{
		goProfil();
	}
}

document.getElementById("loginButton").addEventListener("click", transitionProfil, false);