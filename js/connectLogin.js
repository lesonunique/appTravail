ConnectLogin = {
	
	usr : '',
	
	pwd : '',
	
	idUsr : '',
	
	onlineUsr : false,
	
	nameUsr : '',
	
	usrReg : '',
	
	pwdReg : '',
	
	emailReg : '',
	
	storageUsr : '',
	
	storageSESSid : '',
	
	storageSESSname : '',
	
	storageToken : '',
	
	compteFb : '',

    sendForm: function () {
		console.log('function sendForm');
        ConnectLogin.usr = $('#user_login').val();
        ConnectLogin.pwd = $('#password_login').val();

        if (ConnectLogin.usr != '' && ConnectLogin.pwd != '') {
			ConnectLogin.goLogin();
        } else {
			if(isphonegap == true)
			{
				navigator.notification.alert('Tout les champs sont obligatoires.')
			}
			else
			{
				alert('Tout les champs sont obligatoires.');
			}
        }
    },
	
	sendFormRegister: function () {
		console.log('function sendFormRegister');
        ConnectLogin.usrReg = $('#user_register').val();
        ConnectLogin.pwdReg = $('#password_register').val();
		ConnectLogin.emailReg = $('#email_register').val();

        if (ConnectLogin.usrReg != '' && ConnectLogin.pwdReg != '' && ConnectLogin.emailReg != '') {
			ConnectLogin.goRegister();
        } else {
			if(isphonegap == true)
			{
				navigator.notification.alert('Tout les champs sont obligatoires.')
			}
			else
			{
				alert('Tout les champs sont obligatoires.');
			}
        }
	},
	
	goRegister: function(){
		console.log('function goRegister');
		ConnectLogin.goMessageCharge();
		
		var account = {
			name:ConnectLogin.usrReg,
			mail:ConnectLogin.emailReg,
			pass:ConnectLogin.pwdReg,
			pass1:ConnectLogin.pwdReg,
			pass2:ConnectLogin.pwdReg
		};
		
		var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
 
		if(reg.test(account.mail))
		{
			Drupal.services.call({
				method: 'POST',
				path: 'user/register.json',
				service: 'user',
				resource:'register',
				data:JSON.stringify(account),
				success: function(result) {
					console.log(result);
					user_login(ConnectLogin.usrReg, ConnectLogin.pwdReg, {
						success:function(result){
							console.log(result);
							localStorage.setItem("sessid",result.sessid);
							localStorage.setItem("session_name",result.session_name);
							localStorage.setItem("storageUID",result.user.uid);
							ConnectLogin.onlineUsr = true;
							user_load(result.user.uid, {
								success:function(account) {
									console.log(account);
									console.log('Connecté');
									console.log('Hi, ' + account.name + '!');
									console.log('Token : ' + Drupal.sessid);
									localStorage.setItem("token",Drupal.sessid);
									localStorage.setItem("compteFB",0);
									localStorage.setItem("user_connected",1);
										
									if(account.picture != null)
									{
										if(account.picture == 0)
										{
											console.log('No picture');
											var codeImg = 'images/profile_img40x40.jpg';
										}
										else
										{
											console.log('Ok picture');
											//var codeImg = account.picture.url;
											var codeImg = 'http://www.lesonunique.com/sites/default/files/styles/portrait/public/pictures/'+account.picture.filename;
										}
									}
									else
									{
										console.log('No picture');
										var codeImg = 'images/profile_img40x40.jpg';
									}
									var membreProfil = (account.access - account.created)/86400;
									
									if(isphonegap == true)
									{
										PushbotsPlugin.setAlias(result.user.name);
									}
										
									document.getElementById("statutLoginUser").innerHTML="Salut,<span href='#' id='userLogin'> "+account.name+"</span>";
									document.getElementById("buttonLoginUser").innerHTML="<li class='profile active'><a href='#' onclick='goProfil();'>Profil </a></li><li class='logout'><a href='#' data-role='button' id='button_logout' onclick='ConnectLogin.goLogout();'> Logout</a></li><div class='clear'></div>";
									document.getElementById("loginButton").innerHTML="<img src='images/profile_img40x40.png' id='img_1' class='superpose' alt='' /><img src='"+codeImg+"' id='img_2' class='superpose' alt='' />";
									
									var profilHTML = 		'<div class="card-face face-1">'+
																'<button data-card-menu="data-card-menu" onclick="goReglagesnProfil()" class="card-face__menu-button"><img src="images/cog.svg" width="23" height="23" draggable="false"/></button>'+
																'<div class="card-face__avatar">'+
																	'<span class="card-face__bullet"><img src="images/facebook-icon-no.png" /></span>'+
																	'<img src="'+codeImg+'" width="110" height="110" draggable="false"/>'+
																'</div>'+
																'<!--<canvas class="canvasProg" id="canvasProgressSimple" width="160" height="160"></canvas>'+
																'<span class="card-face__title"><img src="images/etoile.png" width="15" style="vertical-align: sub; margin-right:5px; margin-top:5px;" />60 points</span>-->'+
																'<h2 class="card-face__name">'+account.name+'</h2>';
									if(account.field_ville != '')
									{
										profilHTML +=			'<span class="card-face__title"><img src="images/location2.png" width="15" style="vertical-align: sub; margin-right:5px;" />'+account.field_ville.und[0].value+'</span>';
									}
									profilHTML +=				'<div class="card-face-footer stats cf">'+
																	'<div class="testcard" style="display:inline-block;">'+
																	'<a class="stat" onclick="goPlaylist();"  href="#">'+
																		'Playlist'+
																		'<strong id="nbMorceauxProfil">0</strong>'+
																		'morceaux'+
																	'</a>'+
																	'<!--<a class="stat" href="#">'+
																		'Podcasts'+
																		'<strong>0</strong>'+
																		'abonnements'+
																	'</a>-->'+
																	'<span class="stat">'+
																		'Inscription'+
																		'<strong>'+Math.round(membreProfil)+'</strong>'+
																		'jours'+
																	'</span>'+
																	'</div>'+
																'</div>'+
																'<div class="card-modif">'+
																	'<!--<a class="lienModif" onclick="goModificationProfil();"  href="#">'+
																		'<img src="images/modif.png" width="60" style="border-radius:50%;position:relative;top:-10px;" />'+
																		'<span style="position: relative; top: -34px; left: 5px;"> Modifier mon Profil</span>'+
																	'</a>-->'+
																'</div>'+
																'<div class="card-elements">'+
																	'<div class="card-elements-title">MySun joués récemment</div>'+
																	'<div id="profilMySunRecent" class="card-elements-mysun"></div>'+
																	'<div class="card-elements-title">Ma Playlist</div>'+
																	'<div id="profilPlaylist" class="card-elements-playlist"></div>'+
																	'<!--<div class="card-elements-title">Mes Podcasts</div>'+
																	'<div id="profilPodcasts" class="card-elements-podcast"></div>-->'+
																'</div>'+
																'</div>'+
															'</div>';

									$('#page_profil').find('#profilcard').html(profilHTML);
										
									if(Direct._fluxSelect == 1)
									{
										document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislike.png' class='dislike' onclick='DOWNVote();' />";
										document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/like.png' class='like' onclick='UPVote();' />";
									}
									else
									{
										document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(1);' />";
										document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(1);' />";
									}
										
									localStorage.setItem("nameUser",account.name);
									localStorage.setItem("dateUser",membreProfil);
									localStorage.setItem("imgUser",codeImg);
									
									ConnectLogin._idUsr = account.uid;
									ConnectLogin.nameUsr = account.name;
									Playlist.init();
									//dessinCercleFLAT("canvasProgressSimple", 60, 100);
									ConnectLogin.lastMysun(account.uid);
									ConnectLogin.fillProfilElements(codeImg,account.name,account.mail,account.field_telephone,account.field_date_de_naissance,account.field_sexe,account.field_adresse,account.field_ville);
									ConnectLogin.goMessageConfirm(1,'Inscription réussie !');
									}
								});
							},
							error:function(){
								console.log(message);
								localStorage.setItem("user_connected",0);
								ConnectLogin.onlineUsr = false;
								ConnectLogin.goMessageConfirm(1,'Inscription réussie !');
							}
					});
				},
				error: function(result) {
					var repJSON = JSON.parse(result.response);
					console.log(repJSON);
					localStorage.setItem("user_connected",0);
					if(typeof(repJSON.form_errors.name) != 'undefined')
					{
						ConnectLogin.goMessageConfirm(7,repJSON.form_errors.name);
					}
					else if(typeof(repJSON.form_errors.mail) != 'undefined')
					{
						ConnectLogin.goMessageConfirm(7,repJSON.form_errors.mail);
					}
					else if(typeof(repJSON.form_errors.pass) != 'undefined')
					{
						ConnectLogin.goMessageConfirm(7,repJSON.form_errors.pass);
					}
					else
					{
						ConnectLogin.goMessageConfirm(7,"Erreur d'inscription");
					}
				}
			});
		}
		else
		{
			ConnectLogin.goMessageConfirm(7,"L'adresse mail n'est pas valide.");
		}
		
	},
	
	goLogin: function(){
		console.log('function goLogin');
		ConnectLogin.goMessageCharge();
		
		user_login(ConnectLogin.usr, ConnectLogin.pwd, {
			success:function(result){
				console.log(result);
				localStorage.setItem("sessid",result.sessid);
				localStorage.setItem("session_name",result.session_name);
				localStorage.setItem("storageUID",result.user.uid);
				localStorage.setItem("user_connected",1);
				ConnectLogin.onlineUsr = true;
				user_load(result.user.uid, {
						success:function(account) {
						  	console.log(account);
						  	console.log('Connecté');
							console.log('Hi, ' + account.name + '!');
							console.log('Token : ' + Drupal.sessid);
							localStorage.setItem("token",Drupal.sessid);
							localStorage.setItem("compteFB",0);
							
							if(account.picture != null)
							{
								if(account.picture == 0)
								{
									console.log('No picture');
									var codeImg = 'images/profile_img40x40.jpg';
								}
								else
								{
									console.log('Ok picture');
									//var codeImg = account.picture.url;
									var codeImg = 'http://www.lesonunique.com/sites/default/files/styles/portrait/public/pictures/'+account.picture.filename;
								}
							}
							else
							{
								console.log('No picture');
								var codeImg = 'images/profile_img40x40.jpg';
							}
							var membreProfil = (account.access - account.created)/86400;
							
							if(isphonegap == true)
							{
								PushbotsPlugin.setAlias(result.user.name);
							}
							
							document.getElementById("statutLoginUser").innerHTML="Salut,<span href='#' id='userLogin'> "+account.name+"</span>";
							document.getElementById("buttonLoginUser").innerHTML="<li class='profile active'><a href='#' onclick='goProfil();'>Profil </a></li><li class='logout'><a href='#' data-role='button' id='button_logout' onclick='ConnectLogin.goLogout();'> Logout</a></li><div class='clear'></div>";
							document.getElementById("loginButton").innerHTML="<img src='images/profile_img40x40.png' id='img_1' class='superpose' alt='' /><img src='"+codeImg+"' id='img_2' class='superpose' alt='' />";
							
							var profilHTML = 		'<div class="card-face face-1">'+
																'<button data-card-menu="data-card-menu" onclick="goReglagesnProfil()" class="card-face__menu-button"><img src="images/cog.svg" width="23" height="23" draggable="false"/></button>'+
																'<div class="card-face__avatar">'+
																	'<span class="card-face__bullet"><img src="images/facebook-icon-no.png" /></span>'+
																	'<img src="'+codeImg+'" width="110" height="110" draggable="false"/>'+
																'</div>'+
																'<!--<canvas class="canvasProg" id="canvasProgressSimple" width="160" height="160"></canvas>'+
																'<span class="card-face__title"><img src="images/etoile.png" width="15" style="vertical-align: sub; margin-right:5px; margin-top:5px;" />60 points</span>-->'+
																'<h2 class="card-face__name">'+account.name+'</h2>';
									if(account.field_ville != '')
									{
										profilHTML +=			'<span class="card-face__title"><img src="images/location2.png" width="15" style="vertical-align: sub; margin-right:5px;" />'+account.field_ville.und[0].value+'</span>';
									}
									profilHTML +=				'<div class="card-face-footer stats cf">'+
																	'<div class="testcard" style="display:inline-block;">'+
																	'<a class="stat" onclick="goPlaylist();"  href="#">'+
																		'Playlist'+
																		'<strong id="nbMorceauxProfil">0</strong>'+
																		'morceaux'+
																	'</a>'+
																	'<!--<a class="stat" href="#">'+
																		'Podcasts'+
																		'<strong>0</strong>'+
																		'abonnements'+
																	'</a>-->'+
																	'<span class="stat">'+
																		'Inscription'+
																		'<strong>'+Math.round(membreProfil)+'</strong>'+
																		'jours'+
																	'</span>'+
																	'</div>'+
																'</div>'+
																'<div class="card-modif">'+
																	'<!--<a class="lienModif" onclick="goModificationProfil();"  href="#">'+
																		'<img src="images/modif.png" width="60" style="border-radius:50%;position:relative;top:-10px;" />'+
																		'<span style="position: relative; top: -34px; left: 5px;"> Modifier mon Profil</span>'+
																	'</a>-->'+
																'</div>'+
																'<div class="card-elements">'+
																	'<div class="card-elements-title">MySun joués récemment</div>'+
																	'<div id="profilMySunRecent" class="card-elements-mysun"></div>'+
																	'<div class="card-elements-title">Ma Playlist</div>'+
																	'<div id="profilPlaylist" class="card-elements-playlist"></div>'+
																	'<!--<div class="card-elements-title">Mes Podcasts</div>'+
																	'<div id="profilPodcasts" class="card-elements-podcast"></div>-->'+
																'</div>'+
																'</div>'+
															'</div>';

									$('#page_profil').find('#profilcard').html(profilHTML);
							
							if(Direct._fluxSelect == 1)
							{
								document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislike.png' class='dislike' onclick='DOWNVote();' />";
								document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/like.png' class='like' onclick='UPVote();' />";
							}
							else
							{
								document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(1);' />";
								document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(1);' />";
							}
							
							localStorage.setItem("nameUser",account.name);
							localStorage.setItem("dateUser",membreProfil);
							localStorage.setItem("imgUser",codeImg);
							
							ConnectLogin._idUsr = account.uid;
							ConnectLogin.nameUsr = account.name;
							Playlist.init();
							//dessinCercleFLAT("canvasProgressSimple", 60, 100);
							ConnectLogin.lastMysun(account.uid);
							ConnectLogin.fillProfilElements(codeImg,account.name,account.mail,account.field_telephone,account.field_date_de_naissance,account.field_sexe,account.field_adresse,account.field_ville);
							ConnectLogin.goMessageConfirm(1,'Connexion réussie !');
						}
					});
				
			},
			error:function(xhr, status, message){
				console.log(message);
				localStorage.setItem("user_connected",0);
				ConnectLogin.onlineUsr = false;
				if (message == '["Wrong username or password."]')
			  	{
					ConnectLogin.goMessageConfirm(3,'Mauvais identifiant ou mot de passe');
				}
				else
				{
					ConnectLogin.goMessageConfirm(3,message);
				}
			}
		});
	},
	
	goLogout: function(){
			ConnectLogin.storageSESSname = localStorage.getItem("session_name");
			console.log(ConnectLogin.storageSESSname);
			
			$('#loginBox').hide();
			ConnectLogin.goMessageCharge();
			user_logout({
				success:function(result){
					//chargeMYflux2(1,1,0);
					chargeMYflux2(0,1,0,1);
					
					localStorage.setItem("sessid","");
					localStorage.setItem("session_name","");
					localStorage.setItem("storageUID",0);
					localStorage.setItem("token","");
					localStorage.setItem("compteFB","");
					localStorage.setItem("user_connected",0);
					GererFlux.viderFlux();
					
					localStorage.setItem("nameUser","");
					localStorage.setItem("dateUser","");
					localStorage.setItem("imgUser","");
					ConnectLogin.onlineUsr = false;
					if (result[0]) {
						console.log("Logged out!");
						document.getElementById("statutLoginUser").innerHTML="Compte SUN";
						document.getElementById("buttonLoginUser").innerHTML="<li class='profile0 active'><a href='#' data-role='button' id='button_signin' onclick='goRegisterForm();'>Sign In </a></li><li class='logout0'><a href='#' data-role='button' id='button_login' onclick='goLoginForm();'> Login</a></li><li class='facebook' onclick='ConnectLogin.connectFace();'><img src='images/facebook-icon.png' /></li><div class='clear'></div>";
						document.getElementById("loginButton").innerHTML="<img src='images/profile_img40x40.png' id='img_1' class='superpose' alt='' /><img src='images/userHL.png' id='img_2' class='superpose' alt='' />";
	
						document.getElementById("profilcard").innerHTML="";
						
						document.getElementById("playlist_content").innerHTML='<div class="title2"><div style="padding-bottom:15px;">LA PAGE PLAYLIST EST ACCESSIBLE UNIQUEMENT EN ÉTANT CONNECTÉ</div><div>Pour accéder à votre playlist, merci de vous connecter ou de vous inscrire</div></div><div><a id="button_signin" onclick="goRegisterForm();" data-role="button" href="#">Sign In </a><a id="button_login" onclick="goLoginForm();" data-role="button" href="#"> Login</a></div>';
						document.getElementById("nbMenuPlaylist").innerHTML="";
						
						document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistNO.png' class='add' onclick='addToMyPlaylistOFF();' />";
						document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(2);' />";
						document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(2);' />";
						
						ConnectLogin._idUsr = '';
						ConnectLogin.nameUsr = '';
					}
					ConnectLogin.goMessageConfirm(2,'Déconnexion réussie !');
				},
				error:function(xhr, status, message){
					ConnectLogin.goMessageConfirm(4,'Erreur Déconnexion');
				}
			});
	},
	
	goMDPperdu: function(){
		
		var mdpOub = $('#user_login_mdp_perdu').val();
		
		if(mdpOub == '' || typeof(mdpOub) == 'undefined' || mdpOub == undefined)
		{
			if(isphonegap == true)
			{
				navigator.notification.alert("Vous n'avez pas rentré de nom d'utilisateur ou d'email.")
			}
			else
			{
				alert("Vous n'avez pas rentré de nom d'utilisateur ou d'email.");
			}
		}
		else
		{
			$('#loginBox').hide();
			ConnectLogin.goMessageCharge();
		
			user_request_new_password(mdpOub,{
				success:function(result){
					console.log(result);
					ConnectLogin.goMessageConfirm(5,'Un email de récupération a été envoyé');
				},
				error:function(xhr, status, message){
					ConnectLogin.goMessageConfirm(6,'Mauvais utilisateur ou mot de passe');
				}
			});
		}
	},
	
	goMessageCharge: function(msg){
		document.getElementById("page_message_user").innerHTML="<img src='images/player/301.gif' width='64'/>";
		goMessageInfo();
	},
	
	goMessageConfirm: function(type,msg){
		if(type==1)
		{
			goDirect();
			if(isphonegap == true)
			{
				//window.plugins.toast.showShortBottom(msg);
				window.plugins.toast.showWithOptions(
				{
				  message: msg,
				  duration: "short",
				  position: "top",
				  addPixelsY: 50
				});
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#BFF1BC';
				document.getElementById("messageFlottant").style.color = '#324431';
				document.getElementById("messageFlottantText").innerHTML = msg;
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixVerte.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
		if(type==2)
		{
			goDirect();
			if(isphonegap == true)
			{
				//window.plugins.toast.showShortBottom(msg);
				window.plugins.toast.showWithOptions(
				{
				  message: msg,
				  duration: "short",
				  position: "top",
				  addPixelsY: 50
				});
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#FCF0B0';
				document.getElementById("messageFlottant").style.color = '#424239';
				document.getElementById("messageFlottantText").innerHTML = msg;
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
		if(type==3)
		{
			goLoginForm();
			if(isphonegap == true)
			{
				//window.plugins.toast.showShortBottom(msg);
				window.plugins.toast.showWithOptions(
				{
				  message: msg,
				  duration: "short",
				  position: "top",
				  addPixelsY: 50
				});
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#FBDBCF';
				document.getElementById("messageFlottant").style.color = '#6d2423';
				document.getElementById("messageFlottantText").innerHTML = msg;
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixRouge.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
		if(type==4)
		{
			goDirect();
			if(isphonegap == true)
			{
				//window.plugins.toast.showShortBottom(msg);
				window.plugins.toast.showWithOptions(
				{
				  message: msg,
				  duration: "short",
				  position: "top",
				  addPixelsY: 50
				});
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#FBDBCF';
				document.getElementById("messageFlottant").style.color = '#6d2423';
				document.getElementById("messageFlottantText").innerHTML = msg;
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixRouge.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
		if(type==5)
		{
			goLoginForm();
			if(isphonegap == true)
			{
				//window.plugins.toast.showShortBottom(msg);
				window.plugins.toast.showWithOptions(
				{
				  message: msg,
				  duration: "short",
				  position: "top",
				  addPixelsY: 50
				});
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#BFF1BC';
				document.getElementById("messageFlottant").style.color = '#324431';
				document.getElementById("messageFlottantText").innerHTML = msg;
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixVerte.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
		if(type==6)
		{
			goLoginForm();
			if(isphonegap == true)
			{
				//window.plugins.toast.showShortBottom(msg);
				window.plugins.toast.showWithOptions(
				{
				  message: msg,
				  duration: "short",
				  position: "top",
				  addPixelsY: 50
				});
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#FCF0B0';
				document.getElementById("messageFlottant").style.color = '#424239';
				document.getElementById("messageFlottantText").innerHTML = msg;
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixJaune.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
		if(type==7)
		{
			goRegisterForm();
			if(isphonegap == true)
			{
				//window.plugins.toast.showShortBottom(msg);
				window.plugins.toast.showWithOptions(
				{
				  message: msg,
				  duration: "short",
				  position: "top",
				  addPixelsY: 50
				});
			}
			else
			{
				document.getElementById("messageFlottant").style.background = '#FBDBCF';
				document.getElementById("messageFlottant").style.color = '#6d2423';
				document.getElementById("messageFlottantText").innerHTML = msg;
				document.getElementById("messageFlottantImg").innerHTML = '<img src="images/croixRouge.png"/>';
				document.getElementById("messageFlottant").style.display = 'block';
				
				window.setTimeout(function(){document.getElementById('messageFlottant').style.display = 'none';},3000);
			}
		}
	},
	
	goLoad2: function(){	
		console.log('test go load');
		system_connect({
			success:function(result){
				// Place custom code here...
				console.log("Test user connect");
              	console.log(result);
			  	console.log(result.user.roles);
			  	if (result.user.roles[1] == "anonymous user")
			  	{
				  	console.log('Anonyme');
				  	document.getElementById("statutLoginUser").innerHTML="Compte SUN";
					document.getElementById("buttonLoginUser").innerHTML="<li class='profile0 active'><a href='#' data-role='button' id='button_signin' onclick='goRegisterForm();'>Sign In </a></li><li class='logout0'><a href='#' data-role='button' id='button_login' onclick='goLoginForm();'> Login</a></li><li class='facebook' onclick='ConnectLogin.connectFace();'><img src='images/facebook-icon.png' /></li><div class='clear'></div>";
					document.getElementById("loginButton").innerHTML="<img src='images/profile_img40x40.png' id='img_1' class='superpose' alt='' /><img src='images/userHL.png' id='img_2' class='superpose' alt='' />";
					
					document.getElementById("profilcard").innerHTML="";
					document.getElementById("profilcard2").innerHTML="";
					document.getElementById("profilcard3").innerHTML="";
					
					document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistNO.png' class='add' onclick='addToMyPlaylistOFF();' />";
					document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(2);' />";
					document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(2);' />";
					
					localStorage.setItem("user_connected",0);
					GererFlux.viderFlux();
					
					ConnectLogin._idUsr = '';
					ConnectLogin.nameUsr = '';
					ConnectLogin.onlineUsr = false;
					Playlist.clearList();
				}
				else
				{
					user_load(result.user.uid, {
						success:function(account) {
						  	console.log(account);
						  	console.log('Connecté');
							console.log('Hi, ' + account.name + '!');
							localStorage.setItem("user_connected",1);
							localStorage.setItem("tuto1",true);
							
							ConnectLogin.onlineUsr = true;
							
							if(account.picture != null)
							{
								if(account.picture == 0)
								{
									console.log('No picture');
									var codeImg = 'images/profile_img40x40.jpg';
								}
								else
								{
									console.log('Ok picture');
									//var codeImg = account.picture.url;
									var codeImg = 'http://www.lesonunique.com/sites/default/files/styles/portrait/public/pictures/'+account.picture.filename;
								}
							}
							else
							{
								console.log('No picture');
								var codeImg = 'images/profile_img40x40.jpg';
							}
							var membreProfil = (account.access - account.created)/86400;
							
							if(isphonegap == true)
							{
								PushbotsPlugin.setAlias(result.user.name);
							}
							
							ConnectLogin.compteFB = localStorage.getItem("compteFB");
							if(ConnectLogin.compteFB == 1)
							{
								var fbTrueorFalse = 'images/facebook-icon.png';
							}
							else
							{
								var fbTrueorFalse = 'images/facebook-icon-no.png';
							}
							
							document.getElementById("statutLoginUser").innerHTML="Salut,<span href='#' id='userLogin'> "+result.user.name+"</span>";
							document.getElementById("buttonLoginUser").innerHTML="<li class='profile active'><a href='#' onclick='goProfil();'>Profil </a></li><li class='logout'><a href='#' data-role='button' id='button_logout' onclick='ConnectLogin.goLogout();'> Logout</a></li><div class='clear'></div>";
							document.getElementById("loginButton").innerHTML="<img src='images/profile_img40x40.png' id='img_1' class='superpose' alt='' /><img src='"+codeImg+"' id='img_2' class='superpose' alt='' />";
							
							var profilHTML = 		'<div class="card-face face-1">'+
																'<button data-card-menu="data-card-menu" onclick="goReglagesnProfil()" class="card-face__menu-button"><img src="images/cog.svg" width="23" height="23" draggable="false"/></button>'+
																'<div class="card-face__avatar">'+
																	'<span class="card-face__bullet"><img src="'+fbTrueorFalse+'" /></span>'+
																	'<img src="'+codeImg+'" width="110" height="110" draggable="false"/>'+
																'</div>'+
																'<!--<canvas class="canvasProg" id="canvasProgressSimple" width="160" height="160"></canvas>'+
																'<span class="card-face__title"><img src="images/etoile.png" width="15" style="vertical-align: sub; margin-right:5px; margin-top:5px;" />60 points</span>-->'+
																'<h2 class="card-face__name">'+account.name+'</h2>';
									if(account.field_ville != '')
									{
										profilHTML +=			'<span class="card-face__title"><img src="images/location2.png" width="15" style="vertical-align: sub; margin-right:5px;" />'+account.field_ville.und[0].value+'</span>';
									}
									profilHTML +=				'<div class="card-face-footer stats cf">'+
																	'<div class="testcard" style="display:inline-block;">'+
																	'<a class="stat" onclick="goPlaylist();"  href="#">'+
																		'Playlist'+
																		'<strong id="nbMorceauxProfil">0</strong>'+
																		'morceaux'+
																	'</a>'+
																	'<!--<a class="stat" href="#">'+
																		'Podcasts'+
																		'<strong>0</strong>'+
																		'abonnements'+
																	'</a>-->'+
																	'<span class="stat">'+
																		'Inscription'+
																		'<strong>'+Math.round(membreProfil)+'</strong>'+
																		'jours'+
																	'</span>'+
																	'</div>'+
																'</div>'+
																'<div class="card-modif">'+
																	'<!--<a class="lienModif" onclick="goModificationProfil();"  href="#">'+
																		'<img src="images/modif.png" width="60" style="border-radius:50%;position:relative;top:-10px;" />'+
																		'<span style="position: relative; top: -34px; left: 5px;"> Modifier mon Profil</span>'+
																	'</a>-->'+
																'</div>'+
																'<div class="card-elements">'+
																	'<div class="card-elements-title">MySun joués récemment</div>'+
																	'<div id="profilMySunRecent" class="card-elements-mysun"></div>'+
																	'<div class="card-elements-title">Ma Playlist</div>'+
																	'<div id="profilPlaylist" class="card-elements-playlist"></div>'+
																	'<!--<div class="card-elements-title">Mes Podcasts</div>'+
																	'<div id="profilPodcasts" class="card-elements-podcast"></div>-->'+
																'</div>'+
																'</div>'+
															'</div>';

									$('#page_profil').find('#profilcard').html(profilHTML);
							
							if(Direct._fluxSelect == 1)
							{
								document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislike.png' class='dislike' onclick='DOWNVote();' />";
								document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/like.png' class='like' onclick='UPVote();' />";
							}
							else
							{
								document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(1);' />";
								document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(1);' />";
							}
							
							ConnectLogin._idUsr = result.user.uid;
							ConnectLogin.nameUsr = result.user.name;
							Playlist.init();
							//dessinCercleFLAT("canvasProgressSimple", 60, 100);
							ConnectLogin.lastMysun(result.user.uid);
							ConnectLogin.fillProfilElements(codeImg,account.name,account.mail,account.field_telephone,account.field_date_de_naissance,account.field_sexe,account.field_adresse,account.field_ville);
						}
					});
				}
			},
			error:function(xhr, status, message) {
				console.log('Error system_connect');
			}
		});
	},
	
	goLoad: function(){	
		console.log('>-- load USER --<');
		
		system_connect({
			success:function(result){
				// Place custom code here...
				console.log("Test user connect");
              	console.log(result);
			  	console.log(result.user.roles);
			  	if (result.user.roles[1] == "anonymous user")
			  	{
				  	console.log('Anonyme');
					
					localStorage.setItem("user_connected",0);
					
					ConnectLogin.onlineUsr = false;
					
				  	document.getElementById("statutLoginUser").innerHTML="Compte SUN";
					document.getElementById("buttonLoginUser").innerHTML="<li class='profile0 active'><a href='#' data-role='button' id='button_signin' onclick='goRegisterForm();'>Sign In </a></li><li class='logout0'><a href='#' data-role='button' id='button_login' onclick='goLoginForm();'> Login</a></li><li class='facebook' onclick='ConnectLogin.connectFace();'><img src='images/facebook-icon.png' /></li><div class='clear'></div>";
					document.getElementById("loginButton").innerHTML="<img src='images/profile_img40x40.png' id='img_1' class='superpose' alt='' /><img src='images/userHL.png' id='img_2' class='superpose' alt='' />";
					
					document.getElementById("profilcard").innerHTML="";
					document.getElementById("profilcard2").innerHTML="";
					document.getElementById("profilcard3").innerHTML="";
					
					document.getElementById("btn_ajout_playlist").innerHTML="<img src='images/flatPlayer/playlistNO.png' class='add' onclick='addToMyPlaylistOFF();' />";
					document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(2);' />";
					document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(2);' />";
					
					ConnectLogin._idUsr = '';
					ConnectLogin.nameUsr = '';
					
					GererFlux.viderFlux();
					
					Playlist.clearList();
				}
				else
				{
					user_load(result.user.uid, {
						success:function(account) {
						  	console.log(account);
						  	console.log('Connecté');
							console.log('Hi, ' + account.name + '!');
							
							localStorage.setItem("user_connected",1);
							localStorage.setItem("tuto1",true);
							
							ConnectLogin.onlineUsr = true;
							
							if(account.picture != null)
							{
								if(account.picture == 0)
								{
									console.log('No picture');
									var codeImg = 'images/profile_img40x40.jpg';
								}
								else
								{
									console.log('Ok picture');
									//var codeImg = account.picture.url;
									var codeImg = 'http://www.lesonunique.com/sites/default/files/styles/portrait/public/pictures/'+account.picture.filename;
								}
							}
							else
							{
								console.log('No picture');
								var codeImg = 'images/profile_img40x40.jpg';
							}
							var membreProfil = (account.access - account.created)/86400;
							
							if(isphonegap == true)
							{
								PushbotsPlugin.setAlias(result.user.name);
							}
							
							ConnectLogin.compteFB = localStorage.getItem("compteFB");
							if(ConnectLogin.compteFB == 1)
							{
								var fbTrueorFalse = 'images/facebook-icon.png';
							}
							else
							{
								var fbTrueorFalse = 'images/facebook-icon-no.png';
							}
							
							document.getElementById("statutLoginUser").innerHTML="Salut,<span href='#' id='userLogin'> "+result.user.name+"</span>";
							document.getElementById("buttonLoginUser").innerHTML="<li class='profile active'><a href='#' onclick='goProfil();'>Profil </a></li><li class='logout'><a href='#' data-role='button' id='button_logout' onclick='ConnectLogin.goLogout();'> Logout</a></li><div class='clear'></div>";
							document.getElementById("loginButton").innerHTML="<img src='images/profile_img40x40.png' id='img_1' class='superpose' alt='' /><img src='"+codeImg+"' id='img_2' class='superpose' alt='' />";
							
							var profilHTML = 		'<div class="card-face face-1">'+
																'<button data-card-menu="data-card-menu" onclick="goReglagesnProfil()" class="card-face__menu-button"><img src="images/cog.svg" width="23" height="23" draggable="false"/></button>'+
																'<div class="card-face__avatar">'+
																	'<span class="card-face__bullet"><img src="'+fbTrueorFalse+'" /></span>'+
																	'<img src="'+codeImg+'" width="110" height="110" draggable="false"/>'+
																'</div>'+
																'<!--<canvas class="canvasProg" id="canvasProgressSimple" width="160" height="160"></canvas>'+
																'<span class="card-face__title"><img src="images/etoile.png" width="15" style="vertical-align: sub; margin-right:5px; margin-top:5px;" />60 points</span>-->'+
																'<h2 class="card-face__name">'+account.name+'</h2>';
									if(account.field_ville != '')
									{
										profilHTML +=			'<span class="card-face__title"><img src="images/location2.png" width="15" style="vertical-align: sub; margin-right:5px;" />'+account.field_ville.und[0].value+'</span>';
									}
									profilHTML +=				'<div class="card-face-footer stats cf">'+
																	'<div class="testcard" style="display:inline-block;">'+
																	'<a class="stat" onclick="goPlaylist();"  href="#">'+
																		'Playlist'+
																		'<strong id="nbMorceauxProfil">0</strong>'+
																		'morceaux'+
																	'</a>'+
																	'<!--<a class="stat" href="#">'+
																		'Podcasts'+
																		'<strong>0</strong>'+
																		'abonnements'+
																	'</a>-->'+
																	'<span class="stat">'+
																		'Inscription'+
																		'<strong>'+Math.round(membreProfil)+'</strong>'+
																		'jours'+
																	'</span>'+
																	'</div>'+
																'</div>'+
																'<div class="card-modif">'+
																	'<!--<a class="lienModif" onclick="goModificationProfil();"  href="#">'+
																		'<img src="images/modif.png" width="60" style="border-radius:50%;position:relative;top:-10px;" />'+
																		'<span style="position: relative; top: -34px; left: 5px;"> Modifier mon Profil</span>'+
																	'</a>-->'+
																'</div>'+
																'<div class="card-elements">'+
																	'<div class="card-elements-title">MySun joués récemment</div>'+
																	'<div id="profilMySunRecent" class="card-elements-mysun"></div>'+
																	'<div class="card-elements-title">Ma Playlist</div>'+
																	'<div id="profilPlaylist" class="card-elements-playlist"></div>'+
																	'<!--<div class="card-elements-title">Mes Podcasts</div>'+
																	'<div id="profilPodcasts" class="card-elements-podcast"></div>-->'+
																'</div>'+
																'</div>'+
															'</div>';

									$('#page_profil').find('#profilcard').html(profilHTML);
							
							if(Direct._fluxSelect == 1)
							{
								document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislike.png' class='dislike' onclick='DOWNVote();' />";
								document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/like.png' class='like' onclick='UPVote();' />";
							}
							else
							{
								document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(1);' />";
								document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(1);' />";
							}
							
							ConnectLogin._idUsr = result.user.uid;
							ConnectLogin.nameUsr = result.user.name;
							Playlist.init();
							//dessinCercleFLAT("canvasProgressSimple", 60, 100);
							ConnectLogin.lastMysun(result.user.uid);
							ConnectLogin.fillProfilElements(codeImg,account.name,account.mail,account.field_telephone,account.field_date_de_naissance,account.field_sexe,account.field_adresse,account.field_ville);
						}
					});
				}
			},
			error:function(xhr, status, message) {
				console.log('Error system_connect');
				console.log(xhr);
				console.log(status);
				console.log(message);
			}
		});
	},
	
	pregoLoad: function(){	
		console.log('test go load');
		ConnectLogin.storageUsr = localStorage.getItem("storageUID");
		ConnectLogin.storageSESSid = localStorage.getItem("sessid");
		ConnectLogin.storageSESSname = localStorage.getItem("session_name");
		ConnectLogin.storageToken = localStorage.getItem("token");
		
		$.ajax({
			type: "POST",
		  	url: "http://www.lesonunique.com/appli/cookie.php",
			data: { 
				SESSname: ConnectLogin.storageSESSname,
				SESSid: ConnectLogin.storageSESSid
			},
       		success : function(){
          		console.log('ok cookie');
			},
			error : function(){
				console.log('error cookie');
			},
			complete : function(){
				console.log('complete cookie');
				ConnectLogin.goLoad();
			}
		});
	},
	
	pregoLoad0: function(){	
		console.log('test go load');
		ConnectLogin.storageUsr = localStorage.getItem("storageUID");
		ConnectLogin.storageSESSid = localStorage.getItem("sessid");
		ConnectLogin.storageSESSname = localStorage.getItem("session_name");
		ConnectLogin.storageToken = localStorage.getItem("token");
		
		$.ajax({
			type: "POST",
		  	url: "http://www.lesonunique.com/appli/cookie.php",
			data: { 
				SESSname: ConnectLogin.storageSESSname,
				SESSid: ConnectLogin.storageSESSid
			},
       		success : function(){
          		console.log('ok cookie 0');
			},
			error : function(){
				console.log('error cookie 0');
			},
			complete : function(){
				console.log('complete cookie 0');
			}
		});
	},
	
	connectFace: function(){
		if(isphonegap == true)
		{
			ConnectLogin.goMessageCharge();
			var fbLoginSuccess = function (userData) {
			  console.log("UserInfo: ", userData);
			  localStorage.setItem("compteFB",1);
			  facebookConnectPlugin.getAccessToken(function(token) {
				console.log("Token: " + token);
				facebook_connected(token);
			  });
			}
			
			facebookConnectPlugin.login(["email"], fbLoginSuccess,
			  function (error) {
				console.error(error);
				ConnectLogin.goMessageConfirm(3,'Erreur d\'inscription Facebook');
			  }
			);
		}
		else
		{
			localStorage.setItem("compteFB",1);
			facebook_install();
			facebook_onclick();
		}
	},
	
	loadFace: function(resultUID,resultSESSID,resultSESSname){
		localStorage.setItem("storageUID",resultUID);
		localStorage.setItem("sessid",resultSESSID);
		localStorage.setItem("session_name",resultSESSname);
		localStorage.setItem("compteFB",1);
		localStorage.setItem("user_connected",1);
		
		ConnectLogin.onlineUsr = true;
		
		user_load(resultUID, {
			success:function(account) {
			  	console.log(account);
			  	console.log('Connecté');
				console.log('Hi, ' + account.name + '!');
				localStorage.setItem("token",Drupal.sessid);
				
				if(account.picture != null)
				{
					if(account.picture == 0)
					{
						console.log('No picture');
						var codeImg = 'images/profile_img40x40.jpg';
					}
					else
					{
						console.log('Ok picture');
						//var codeImg = account.picture.url;
						var codeImg = 'http://www.lesonunique.com/sites/default/files/styles/portrait/public/pictures/'+account.picture.filename;
					}
				}
				else
				{
					console.log('No picture');
					var codeImg = 'images/profile_img40x40.jpg';
				}
				var membreProfil = (account.access - account.created)/86400;
				
				if(isphonegap == true)
				{
					PushbotsPlugin.setAlias(account.name);
				}
						
				document.getElementById("statutLoginUser").innerHTML="Salut,<span href='#' id='userLogin'> "+account.name+"</span>";
				document.getElementById("buttonLoginUser").innerHTML="<li class='profile active'><a href='#' onclick='goProfil();'>Profil </a></li><li class='logout'><a href='#' data-role='button' id='button_logout' onclick='ConnectLogin.goLogout();'> Logout</a></li><div class='clear'></div>";
				document.getElementById("loginButton").innerHTML="<img src='images/profile_img40x40.png' id='img_1' class='superpose' alt='' /><img src='"+codeImg+"' id='img_2' class='superpose' alt='' />";

				var profilHTML = 		'<div class="card-face face-1">'+
																'<button data-card-menu="data-card-menu" onclick="goReglagesnProfil()" class="card-face__menu-button"><img src="images/cog.svg" width="23" height="23" draggable="false"/></button>'+
																'<div class="card-face__avatar">'+
																	'<span class="card-face__bullet"><img src="images/facebook-icon.png" /></span>'+
																	'<img src="'+codeImg+'" width="110" height="110" draggable="false"/>'+
																'</div>'+
																'<!--<canvas class="canvasProg" id="canvasProgressSimple" width="160" height="160"></canvas>'+
																'<span class="card-face__title"><img src="images/etoile.png" width="15" style="vertical-align: sub; margin-right:5px; margin-top:5px;" />60 points</span>-->'+
																'<h2 class="card-face__name">'+account.name+'</h2>';
									if(account.field_ville != '')
									{
										profilHTML +=			'<span class="card-face__title"><img src="images/location2.png" width="15" style="vertical-align: sub; margin-right:5px;" />'+account.field_ville.und[0].value+'</span>';
									}
									profilHTML +=				'<div class="card-face-footer stats cf">'+
																	'<div class="testcard" style="display:inline-block;">'+
																	'<a class="stat" onclick="goPlaylist();"  href="#">'+
																		'Playlist'+
																		'<strong id="nbMorceauxProfil">0</strong>'+
																		'morceaux'+
																	'</a>'+
																	'<!--<a class="stat" href="#">'+
																		'Podcasts'+
																		'<strong>0</strong>'+
																		'abonnements'+
																	'</a>-->'+
																	'<span class="stat">'+
																		'Inscription'+
																		'<strong>'+Math.round(membreProfil)+'</strong>'+
																		'jours'+
																	'</span>'+
																	'</div>'+
																'</div>'+
																'<div class="card-modif">'+
																	'<!--<a class="lienModif" onclick="goModificationProfil();"  href="#">'+
																		'<img src="images/modif.png" width="60" style="border-radius:50%;position:relative;top:-10px;" />'+
																		'<span style="position: relative; top: -34px; left: 5px;"> Modifier mon Profil</span>'+
																	'</a>-->'+
																'</div>'+
																'<div class="card-elements">'+
																	'<div class="card-elements-title">MySun joués récemment</div>'+
																	'<div id="profilMySunRecent" class="card-elements-mysun"></div>'+
																	'<div class="card-elements-title">Ma Playlist</div>'+
																	'<div id="profilPlaylist" class="card-elements-playlist"></div>'+
																	'<!--<div class="card-elements-title">Mes Podcasts</div>'+
																	'<div id="profilPodcasts" class="card-elements-podcast"></div>-->'+
																'</div>'+
																'</div>'+
															'</div>';

									$('#page_profil').find('#profilcard').html(profilHTML);
							
				if(Direct._fluxSelect == 1)
				{
					document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislike.png' class='dislike' onclick='DOWNVote();' />";
					document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/like.png' class='like' onclick='UPVote();' />";
				}
				else
				{
					document.getElementById("btn_dislike").innerHTML="<img src='images/flatPlayer/dislikeNO.png' class='dislike' onclick='VoteOFF(1);' />";
					document.getElementById("btn_like").innerHTML="<img src='images/flatPlayer/likeNO.png' class='like' onclick='VoteOFF(1);' />";
				}
				
				localStorage.setItem("nameUser",account.name);
				localStorage.setItem("dateUser",membreProfil);
				localStorage.setItem("imgUser",codeImg);
							
				ConnectLogin._idUsr = account.uid;
				ConnectLogin.nameUsr = account.name;
				Playlist.init();
				//dessinCercleFLAT("canvasProgressSimple", 60, 100);
				ConnectLogin.lastMysun(account.uid);
				ConnectLogin.fillProfilElements(codeImg,account.name,account.mail,account.field_telephone,account.field_date_de_naissance,account.field_sexe,account.field_adresse,account.field_ville);
				ConnectLogin.goMessageConfirm(1,'Connexion réussie !');
			}
		});
	},
	
	lastMysun: function(user){
	
		$.ajax({
			type: "GET",
			url: "http://www.lesonunique.com/requetesPHP/requetesBD/mysun_recent.php",
			data: { 
				user_id: user
			},
			dataType: "text",
			success : function(data){
				console.log('ok mysun recent');
				var myMysun = JSON.parse(data);
				console.log(myMysun);
				var profilHTMLmysun = '';
				if(myMysun.nbmysun == 0)
				{
					profilHTMLmysun +=	'<div class="card-elements-mysun-txt">Vous n\'avez pas encore fait de MySun</div>';
				}
				for (i = 0; i < myMysun.nbmysun; i++)
				{
					profilHTMLmysun +=	'<div class="card-elements-mysun-img" style="width:50px; height:50px; margin-bottom: 10px;">'+
											'<img src="http://www.lesonunique.com/datasun/pochettes/'+myMysun.lastmysun[i].id_album+'.jpg" />'+
										'</div>'+
										'<div class="card-elements-mysun-txt">'+
											'<span style="font-weight:bold;">'+myMysun.lastmysun[i].artiste+'</span>'+
											'<br/>'+myMysun.lastmysun[i].titre+
										'</div>';
				}
				$('#page_profil').find('#profilMySunRecent').html(profilHTMLmysun);
			},
			error : function(error){
				console.log('error mysun recent');
			}
		});
	},
	
	fillProfilElements: function(image,name,email,tel,date,sexe,adresse,ville){
		
		ConnectLogin.compteFB = localStorage.getItem("compteFB");
		if(ConnectLogin.compteFB == 1)
		{
			var fbTrueorFalse = 'images/facebook-icon.png';
			var fbTrueorFalse2 = '';
		}
		else
		{
			var fbTrueorFalse = 'images/facebook-icon-no.png';
			var fbTrueorFalse2 = '<div><a href="#"><img src="images/facebook-connect.png" alt="Facebook Connect"/></a></div>';
		}
		
		if(tel != '')
		{
			var telOK = tel.und[0].value;
		}
		else
		{
			var telOK = '';
		}
		
		if(date != '')
		{
			var dateOK = date.und[0].value;
		}
		else
		{
			var dateOK = '';
		}
		
		if(sexe != '')
		{
			if(sexe.und[0].value == 0)
			{
				var sexM = 'checked';
				var sexF = '';
			}
			else if(sexe.und[0].value == 1)
			{
				var sexM = '';
				var sexF = 'checked';
			}
			else
			{
				var sexM = '';
				var sexF = '';
			}
		}
		else
		{
			var sexM = '';
			var sexF = '';
		}
		
		if(adresse != '')
		{
			var adresseOK = adresse.und[0].value;
		}
		else
		{
			var adresseOK = '';
		}
		
		if(ville != '')
		{
			var villeOK = ville.und[0].value;
		}
		else
		{
			var villeOK = '';
		}
		
		var profil2HTML = 	'<div class="card-face face-1">'+
								'<button data-card-back="data-card-back" onclick="goProfil()" class="card-face__back-button"><img src="images/fleche.svg" width="19" height="19" draggable="false"/></button>'+
									'<button data-card-menu="data-card-menu" onclick="goReglagesnProfil()" class="card-face__menu-button"><img src="images/cog.svg" width="23" height="23" draggable="false"/></button>'+
									'<div class="card-face__avatar">'+
										'<span class="card-face__bullet"><img src="'+fbTrueorFalse+'" /></span>'+
										'<img src="'+image+'" width="110" height="110" draggable="false"/>'+
									'</div>'+
									'<h2 class="card-face__name">Modifier mon profil</h2>'+
									fbTrueorFalse2+
									'<div class="form-style-5" style="width: 100%;">'+
										'<table width="100%" cellpadding="5" cellspacing="0" border="0">'+
											'<tr>'+
												'<td align="center"><div class="icone" data-icon="&#xe070;"></div></td>'+
												'<td><input type="text" id="user_modiflogin" value="'+name+'" placeholder="Identifiant" class="c_input" /></td>'+
											'</tr>'+
											'<tr>'+
												'<td align="center"><div class="icone" data-icon="&#xe070;"></div></td>'+
												'<td><input type="text" id="email_modiflogin" value="'+email+'" placeholder="Mail" class="c_input" /></td>'+
											'</tr>'+
											'<tr>'+
												'<td align="center"><div class="icone" data-icon="&#xe070;"></div></td>'+
												'<td><input type="password" id="password_modiflogin" placeholder="Mot de passe actuel" class="c_input" /></td>'+
											'</tr>'+
											'<tr>'+
												'<td align="center"><div class="icone" data-icon="&#xe070;"></div></td>'+
												'<td><input type="tel" pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$" id="tel_modiflogin" value="'+telOK+'" placeholder="Telephone" class="c_input" /></td>'+
											'</tr>'+
											'<tr>'+
												'<td align="center"><div class="icone" data-icon="&#xe070;"></div></td>'+
												'<td><input type="text" id="date_modiflogin" value="'+dateOK+'" placeholder="Date de naissance" class="c_input" /></td>'+
											'</tr>'+
											'<tr>'+
												'<td align="center"><div class="icone" data-icon="&#xe070;"></div></td>'+
												'<td><input type="radio" id="radio_modlogin_1" name="sexe" value="femme" '+sexF+'><label style="display:inline;" for="radio_modlogin_1"> Femme &nbsp;&nbsp;&nbsp;</label> <input type="radio" id="radio_modlogin_2" name="sexe" value="homme" '+sexM+'><label style="display:inline;" for="radio_modlogin_2"> Homme</label></td>'+
											'</tr>'+
											'<tr><td><br/><br/></td></tr>'+
											'<tr>'+
												'<td align="center"><div class="icone" data-icon="&#xe070;"></div></td>'+
												'<td><input type="text" id="adresse_modiflogin" value="'+adresseOK+'" placeholder="Adresse" class="c_input" /></td>'+
											'</tr>'+
											'<tr>'+
												'<td align="center"><div class="icone" data-icon="&#xe070;"></div></td>'+
												'<td><input type="text" id="ville_modiflogin" value="'+villeOK+'" placeholder="Ville" class="c_input" /></td>'+
											'</tr>'+
											'<tr>'+
												'<td></td>'+
												'<td align="right"><button style="background: #e64c65; border-color: #b5283f; border-style: solid; border-width: 1px 1px 3px;" onclick="ConnectLogin.sendForm();" class="c_input_submit ripple" id="envoiFormulaire">Modifier</button></td>'+
											'</tr>'+
										'</table>'+
									'</div>'+	
									'<div class="card-face-footer stats cf">'+
										'<div class="testcard" style="display:inline-block;">'+
										'<a class="stat" href="#">'+
											'Playlist'+
											'<strong>18</strong>'+
											'morceaux'+
										'</a>'+
										'<a class="stat" href="#">'+
											'Podcasts'+
											'<strong>4</strong>'+
											'abonnements'+
										'</a>'+
										'<a class="stat" href="#">'+
											'Inscription'+
											'<strong>117</strong>'+
											'jours'+
										'</a>'+
										'</div>'+
									'</div>'+
								'</div>';
								
		$('#page_profil2').find('#profilcard2').html(profil2HTML);
		
		var profil3HTML = 	'<div class="card-face face-1">'+
								'<button data-card-back="data-card-back" onclick="goProfil()" class="card-face__back-button"><img src="images/fleche.svg" width="19" height="19" draggable="false"/></button>'+
								'<div class="card-face__avatar">'+
									'<span class="card-face__bullet"><img src="'+fbTrueorFalse+'" /></span>'+
									'<img src="'+image+'" width="110" height="110" draggable="false"/>'+
								'</div>'+
								'<h2 class="card-face__name">Choix de mes flux</h2>'+
								'<h4 style="padding-bottom:10px">Retrouvez les flux selectionnés sur le player principal</h4>';
		
		var fluxperso = localStorage.getItem("fluxperso");
		if(fluxperso == 1)
		{
			var JSONperso = JSON.parse(localStorage.getItem("fluxactifs"));
			console.log(JSONperso);
				
			/*if(JSONperso.fluxactifs.noel == 1)
			{
				var noelCHECK = 'checked';
			}
			else
			{
				var noelCHECK = '';
			}*/
			if(JSONperso.fluxactifs.franco == 1)
			{
				var francoCHECK = 'checked';
			}
			else
			{
				var francoCHECK = '';
			}
			if(JSONperso.fluxactifs.sports == 1)
			{
				var sportsCHECK = 'checked';
			}
			else
			{
				var sportsCHECK = '';
			}
			if(JSONperso.fluxactifs[10080] == 1)
			{
				var quatrevingtCHECK = 'checked';
			}
			else
			{
				var quatrevingtCHECK = '';
			}	
			
			// charger les flux dans connectlogin
			profil3HTML +=		'<form>'+
									'<p style="padding-top:20px;"><input type="checkbox" id="SELECTsports" '+sportsCHECK+' /><label for="SELECTsports"><span class="ui"></span>SUN Sports</label></p>'+
									//'<p><input type="checkbox" id="SELECTnoel" '+noelCHECK+' /><label for="SELECTnoel"><span class="ui"></span>SUN Noël</label></p>'+
									'<p><input type="checkbox" id="SELECTfranco" '+francoCHECK+' /><label for="SELECTfranco"><span class="ui"></span>Franco SUN</label></p>'+
									'<p style="padding-bottom:40px;"><input type="checkbox" id="SELECT10080" '+quatrevingtCHECK+' /><label for="SELECT10080"><span class="ui"></span>100%80</label></p>'+
								'</form>'+
								'<button style="background: #39d2b4; border-color: #32ab93; border-style: solid; border-width: 1px 1px 3px; display: block; width: 90%; height: 40px; margin-bottom: 40px;" onclick="GererFlux.checkBox()" class="c_input_submit ripple" id="envoiFormulaire">Valider</button>'+
								'<button style="background: #e64c65; border-color: #b5283f; border-style: solid; border-width: 1px 1px 3px; display: block; width: 90%; height: 40px; margin-bottom: 40px; margin-top: 40px;" onclick="ConnectLogin.goLogout()" class="c_input_submit ripple" id="envoiFormulaire">Se déconnecter</button>'+
							'</div>';
		}
		else
		{
			profil3HTML +=		'<form>'+
									'<p style="padding-top:20px;"><input type="checkbox" id="SELECTsports" checked /><label for="SELECTsports"><span class="ui"></span>SUN Sports</label></p>'+
									//'<p><input type="checkbox" id="SELECTnoel" checked /><label for="SELECTnoel"><span class="ui"></span>SUN Noël</label></p>'+
									'<p><input type="checkbox" id="SELECTfranco" checked /><label for="SELECTfranco"><span class="ui"></span>Franco SUN</label></p>'+
									'<p style="padding-bottom:40px;"><input type="checkbox" id="SELECT10080" /><label for="SELECT10080"><span class="ui"></span>100%80</label></p>'+
								'</form>'+
								'<button style="background: #39d2b4; border-color: #32ab93; border-style: solid; border-width: 1px 1px 3px; display: block; width: 90%; height: 40px; margin-bottom: 40px;" onclick="GererFlux.checkBox()" class="c_input_submit ripple" id="envoiFormulaire">Valider</button>'+
								'<button style="background: #e64c65; border-color: #b5283f; border-style: solid; border-width: 1px 1px 3px; display: block; width: 90%; height: 40px; margin-bottom: 40px; margin-top: 40px;" onclick="ConnectLogin.goLogout()" class="c_input_submit ripple" id="envoiFormulaire">Se déconnecter</button>'+
							'</div>';
		}
		
		$('#page_profil3').find('#profilcard3').html(profil3HTML);
	},
	
	updateUser: function(){
		/*user_load(ConnectLogin._idUsr, {
      		success: function(account) {
				user_update(account, {
					"mail":"modif@gmail.com"
				});
			}
		});*/
		
		/*user_load(ConnectLogin._idUsr, {
			data :
			{
				"current_pass":"testsun"
			},
      		success: function(account) {
				account.mail = "modif@gmail.com";
				user_update(account, {
					success: function(data) {
						
					}
				});
			}
		});*/
		
		/*var my_args = {
			uid: 2119,
			mail:"vince@live2.fr"
		};
		
		Drupal.services.call({
				method: 'PUT',
				path: 'user/update.json',
				service: 'user',
				resource:'update',
				data:JSON.stringify(my_args),
				success: function(result) {
					
				}
		});*/
		
		$.ajax({
			url: "http://www.lesonunique.com/?q=services/session/token",
			crossDomain: true,
			type: 'get',
			success: function (token) {
				console.log(token);
				console.log("test");
				
				var obj = {
					"uid":2119,
					"name": "vince42",
					"mail": "vince@live.fr",
					"current_pass":"testsun"
				};
				
				/*$.ajax({
					url: "http://www.lesonunique.com/?q=services/user/2119.json",
					crossDomain: true,
					type: 'put',
					dataType: 'json',
					data: obj,
					header: {
						"X-CSRF-Token": token
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log('user edit - failed to edit '+ textStatus+' '+errorThrown);
					},
					success: function (data) {
						console.log("Success :) ");
					}
				});*/
				Drupal.services.call({
						method: 'PUT',
						path: 'user/update.json',
						service: 'user',
						resource:'update',
						data:JSON.stringify(obj),
						success: function(result) {
							
						}
				});
			},
			error: function(error) {
				console.log("error : "+error);
			}
		});
	}
}