var isphonegap=true;
var onRing=false;
var ismobile;
var istablet;
var menu_open_android=false;
var _is_firstTimeOOL = true;
var is_waiting=false;
var _is_alert=false;
var is_started=false;
var isIOS=false;
var isAndroid2=false;
var isWindowsPhone=false;
var plateformeActive='server';
var uuidActive=1234;
var open_nav=false;
var moveContainer=false;
var espaceTouch=0;
var _header_nav_height= 0;
var _menu_height = 0;
var height_page=0;
var _pos_menu=0;
var _my_date_to_quit = new Date();
var jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
var mois = new Array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
var getClickEvent = function() {return ('ontouchstart' in window) ? 'touchstart' : 'mousedown';};
var getOnClickEvent = function() {return ('ontouchstart' in window) ? 'ontouchstart' : 'onmousedown';};
var getOnMoveEvent = function() {return ('ontouchmove' in window) ? 'touchmove' : 'mousemove';};
var getOnMoveEndEvent = function() {return ('ontouchend' in window) ? 'touchend' : 'mouseup';};
var pageEnCours = 0;

if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) isIOS = true;
if(navigator.userAgent.match(/Android/i)) isAndroid2 = true;
if(navigator.userAgent.match(/Windows Phone/i)) isWindowsPhone = true;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	if(isphonegap == true)
	{
		if(PushbotsPlugin.isiOS()){
			PushbotsPlugin.initializeiOS("55f98c63177959ad7d8b4569");
		}
		if(PushbotsPlugin.isAndroid()){
			PushbotsPlugin.initializeAndroid("55f98c63177959ad7d8b4569", "293554235565");
		}
		
		/*if(PushbotsPlugin.isiOS()){
			PushbotsPlugin.initializeiOS("55f03f06177959237a8b4569");
		}
		if(PushbotsPlugin.isAndroid()){
			PushbotsPlugin.initializeAndroid("55f03f06177959237a8b4569", "293554235565");
		}*/
		
		console.log("------------------ file ------------------");
		console.log(cordova.file);
		console.log(FileTransfer);
	}

	ConnectLogin.pregoLoad0();
	
	if(isphonegap == true)
	{
		function events(action) {
			switch(action) {
				case 'music-controls-next':
					nextgear();
					break;
				case 'music-controls-previous':
					prevgear();
					break;
				case 'music-controls-pause':
					pausegear();
					break;
				case 'music-controls-play':
					playgear();
					break;
				case 'music-controls-destroy':
					navigator.app.exitApp();
					break;
		 
				// Headset events (Android only) 
				case 'music-controls-media-button' :
					console.log('music-controls-media-button');
					break;
				case 'music-controls-headset-unplugged':
					console.log('music-controls-headset-unplugged');
					break;
				case 'music-controls-headset-plugged':
					console.log('music-controls-headset-plugged');
					break;
				default:
					break;
			}
		}
		MusicControls.subscribe(events);
		MusicControls.listen();
	}
	
	function successUUID(uuid)
	{
		uuidActive = uuid;
	}
	
	function failUUID()
	{
		uuidActive = 1234;
	}
	
	window.plugins.uniqueDeviceID.get(successUUID, failUUID);
	
	if(isIOS==true)
	{
		plateformeActive = 'iPhone OS';
	}
	else if(isAndroid2==true)
	{
		plateformeActive = 'android';
	}
	else if(isWindowsPhone==true)
	{
		plateformeActive = 'windows';
	}
	else
	{
		plateformeActive = 'server';
	}
	
	/*PhoneCallTrap.onCall(function(state) {
		console.log("CHANGE STATE: " + state);
	
		switch (state) {
			case "RINGING":
				console.log("Phone is ringing");
				break;
			case "OFFHOOK":
				console.log("Phone is off-hook");
				onRing = true;
				break;
			case "IDLE":
				console.log("Phone is idle");
				if(onRing == true)
				{
					onRing = false;
					navigator.notification.confirm(
						'Voulez-vous relancer la lecture ?',  // message
						onConfirmRelauchPlay,            // fonction de callback appelée avec l'indice du bouton pressé
						'Flux',            // titre
						['Oui','Non']  // libellés des boutons
					);
				}
				break;
		}
	});*/
	
	function onPhoneStateChanged(phoneState) 
	{
		switch (phoneState) {
			case "RINGING":
				console.log('Phone is ringing.');
				break;
			case "OFFHOOK":
				console.log('Phone is off the hook.');
				onRing = true;
				break;
			case "IDLE":
				console.log('Phone has returned to the idle state.');
				if(onRing == true)
				{
					onRing = false;
					g.pause();
    				g.play();
				}
				break;
			default:
				// no default...
		}
	}
	
	function onDeviceReady()
	{
		PhoneListener.start(onPhoneStateChanged);
		// or...
		// PhoneListener.stop(onSuccess,onError);
	}
	
	function changeOrientation() {
		switch (window.orientation) {
			case 0:
				// portrait, home bottom
				/*$("#_gPlayer").removeClass("landscape");*/
				$(".gear").removeClass("landscape");
				$("#btn_dedicace").removeClass("landscape");
				$("#btn_dedicace2").removeClass("landscape");
				$("#btn_dedicace3").removeClass("landscape");
				break;
			case 180:
				// portrait, home top
				/*$("#_gPlayer").removeClass("landscape");*/
				$(".gear").removeClass("landscape");
				$("#btn_dedicace").removeClass("landscape");
				$("#btn_dedicace2").removeClass("landscape");
				$("#btn_dedicace3").removeClass("landscape");
				break;
			case -90:
				// landscape, home left
				/*$("#_gPlayer").addClass("landscape");*/
				$(".gear").addClass("landscape");
				$("#btn_dedicace").addClass("landscape");
				$("#btn_dedicace2").addClass("landscape");
				$("#btn_dedicace3").addClass("landscape");
				break;
			case 90:
				// landscape, home right
				/*$("#_gPlayer").addClass("landscape");*/
				$(".gear").addClass("landscape");
				$("#btn_dedicace").addClass("landscape");
				$("#btn_dedicace2").addClass("landscape");
				$("#btn_dedicace3").addClass("landscape");
				break;
		}
	}
	
	window.onorientationchange = function () {
		changeOrientation();
	}

    document.addEventListener("backbutton", showConfirm, false);
	console.log(navigator.connection.type);
	console.log(navigator.onLine);
	
	function selectNumContact() {
		var fields = ["phoneNumbers"];
		navigator.contacts.find(fields, onSuccessSelect, onErrorSelect);
	}
	
	function onSuccessSelect(contacts) {
		for (var i = 0; i < contacts.length; i++) {
			console.log(contacts[i].phoneNumbers);
		}
	}

	function onErrorSelect(contactError) {
		console.log('error select contact');
	}
	
	function refreshConnect()
	{
		var statutConnect = navigator.onLine;
	
		if (statutConnect==false) 
		{
			onOffline();
			console.log('OFFLINE');
		}
		else
		{
			console.log('ONLINE');
		}
	}
	
	setInterval(refreshConnect,6000);
	
}

function onConfirmRelauchPlay(button)
{
	if (button == 1) 
    {
    	console.log('Relauch flux');
		g.pause();
    	g.play();
    }
    else 
    {
    	console.log('Windows close');
        pausegear();
		return;
    }
}

// process the confirmation dialog result
function onConfirm(button) {
    //alert('Vous avez appuyé sur le bouton ' + button);
    if (button == 1) 
    {
    	console.log('App close');
    	navigator.app.exitApp();
    }
    else 
    {
    	console.log('Windows close');
		return;
    }
}

function quitConfirm() {
	navigator.notification.confirm(
		'Voulez-vous quitter l\'application ?',  // message
		onConfirm,            // fonction de callback appelée avec l'indice du bouton pressé
		'Quitter',            // titre
		['Oui','Non']  // libellés des boutons
    );
}

function showConfirm() {
	
	console.log(pageEnCours);
	
	if(pageEnCours == 0)
	{
		navigator.notification.confirm(
			'Voulez-vous quitter l\'application ?',  // message
			onConfirm,            // fonction de callback appelée avec l'indice du bouton pressé
			'Quitter',            // titre
			['Oui','Non']  // libellés des boutons
    	);
	}
	else if(pageEnCours == 1 || pageEnCours == 2 || pageEnCours == 3 || pageEnCours == 4 || pageEnCours == 5 || pageEnCours == 6 || pageEnCours == 7 || pageEnCours == 8 || pageEnCours == 9 || pageEnCours == 10 || pageEnCours == 14 || pageEnCours == 16)
	{
		goDirect();
		pageEnCours=0;
	}
	else if(pageEnCours == 11)
	{
		Dedicace.backStep1();
		pageEnCours=10;
	}
	else if(pageEnCours == 12)
	{
		console.log('Dedicace._rechercheStep : '+Dedicace._rechercheStep);
		if(Dedicace._rechercheStep == 0)
		{
			Dedicace.backStep1bis(0);
			pageEnCours=11;
		}
		else if(Dedicace._rechercheStep == 1)
		{
			Dedicace.backStep1bis(1);
			pageEnCours = 12;
		}
	}
	else if(pageEnCours == 13)
	{
		Dedicace.backStep2();
		pageEnCours=12;
	}
	else if(pageEnCours == 15)
	{
		goVideos();
		pageEnCours=3;
	}
	else
	{
		navigator.notification.confirm(
			'Voulez-vous quitter l\'application ?',  // message
			onConfirm,            // fonction de callback appelée avec l'indice du bouton pressé
			'Quitter',            // titre
			['Oui','Non']  // libellés des boutons
    	);
	}
}

$(document).ready(function () {
	ismobile = (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()));
	istablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
	jembe.settings.set({'param':'status-bar-style', 'value':'dark'});
	jembe.alert.notify({'tickerText': 'Sun Radio', 'contentTitle': 'Sun Radio', 'contentText': '', 'flag': 'service'});
	jembe.control.listenState(minimizeAPI);
	
	$('#page_contact .c_telecharger').on(getClickEvent(), function() {
        Contact.select_options();
    });
	
	if(isphonegap == true)
	{
		var localStorage_tuto0 = localStorage.getItem("tuto0");
		
		if(localStorage_tuto0)
		{
			console.log('passage 1');
		}
		else
		{
			console.log('passage 2');
			tuto.init();
		}
	}
	
	$(document).keypress(function(e) {
	if( e.which == 13 ){
		console.log('entrée');
		console.log(pageEnCours);
		if(pageEnCours == 6)
		{
			//login
			ConnectLogin.sendForm();
		}
		else if(pageEnCours == 7)
		{
			//register
			ConnectLogin.sendFormRegister();
		}
		else if(pageEnCours == 11)
		{
			//dedicace
			console.log('entrée search 1');
			Dedicace.launch_search();
		}
		else if(pageEnCours == 12)
		{
			//dedicace
			console.log('entrée search 2');
			Dedicace.launch_search();
		}
	}
});

    Flux.init();
	
});

function minimizeAPI(newState) {
	if(newState=="resume") {
		// come back
	} else {
		_my_date_to_quit=(new Date()).getTime();
	}
}

function openMenuAndroid() {
	if(menu_open_android) {
		$('#btn_android_footerHome').slideUp();
		menu_open_android=false;
	} else {
		$('#btn_android_footerHome').slideDown();
		menu_open_android=true;
	}
}

function onOffline() {
	navigator.notification.confirm(
        'La connexion est perdue. Veuillez vérifier l\'état du réseau.',  // message
        newCheckReseau,            // fonction de callback appelée avec l'indice du bouton pressé
        'Problème réseau',            // titre
        ['Annuler','Réessayer']  // libellés des boutons
    );
}

function newCheckReseau(button) {
	if (button == 1) 
    {
    	console.log('App close');
    	navigator.app.exitApp();
    }
    else 
    {
		setTimeout(function(){ 
			console.log('Retest');
			var statutConnect = navigator.onLine;
			if (statutConnect==false) 
			{
				onOffline();
			}
			else
			{
				Flux.init();
			}
			return;
		}, 3000);
    }
}

var getMouseY = function(e){
    if ('ontouchmove' in window) {
        //iOS & android
        mouseY = e.originalEvent.targetTouches[0].pageY;
        return mouseY;
    } else if(window.navigator.msPointerEnabled) {
        //Win8
        mouseY = e.originalEvent.targetTouches[0].pageY;
        return mouseY;
    } else {
        mouseY = e.pageY;
        return mouseY;
    }
}

function substr (str, start, len) {
    var i = 0,
        allBMP = true,
        es = 0,
        el = 0,
        se = 0,
        ret = '';
    str += '';
    var end = str.length;
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
        case 'on':
            for (i = 0; i < str.length; i++) {
                if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                    allBMP = false;
                    break;
                }
            }

            if (!allBMP) {
                if (start < 0) {
                    for (i = end - 1, es = (start += end); i >= es; i--) {
                        if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                            start--;
                            es--;
                        }
                    }
                } else {
                    var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
                    while ((surrogatePairs.exec(str)) != null) {
                        var li = surrogatePairs.lastIndex;
                        if (li - 2 < start) {
                            start++;
                        } else {
                            break;
                        }
                    }
                }

                if (start >= end || start < 0) {
                    return false;
                }
                if (len < 0) {
                    for (i = end - 1, el = (end += len); i >= el; i--) {
                        if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                            end--;
                            el--;
                        }
                    }
                    if (start > end) {
                        return false;
                    }
                    return str.slice(start, end);
                } else {
                    se = start + len;
                    for (i = start; i < se; i++) {
                        ret += str.charAt(i);
                        if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                            se++; // Go one further, since one of the "characters" is part of a surrogate pair
                        }
                    }
                    return ret;
                }
                break;
            }
        case 'off':
        default:
            if (start < 0) {
                start += end;
            }
            end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
            return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
    }
    return undefined;
}

function print_r(array, return_val) {
    var output = '',
        pad_char = ' ',
        pad_val = 4,
        d = this.window.document,
        getFuncName = function(fn) {
            var name = (/\W*function\s+([\w\$]+)\s*\(/)
                .exec(fn);
            if (!name) {
                return '(Anonymous)';
            }
            return name[1];
        };
    repeat_char = function(len, pad_char) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += pad_char;
        }
        return str;
    };
    formatArray = function(obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0) {
            cur_depth++;
        }

        var base_pad = repeat_char(pad_val * cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
        var str = '';

        if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !==
            'PHPJS_Resource') {
            str += 'Array\n' + base_pad + '(\n';
            for (var key in obj) {
                if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
                    str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
                } else {
                    str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
                }
            }
            str += base_pad + ')\n';
        } else if (obj === null || obj === undefined) {
            str = '';
        } else { // for our "resource" class
            str = obj.toString();
        }

        return str;
    };

    output = formatArray(array, 0, pad_val, pad_char);

    if (return_val !== true) {
        if (d.body) {
            this.echo(output);
        } else {
            try {
                d = XULDocument; // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
                this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
            } catch (e) {
                this.echo(output); // Outputting as plain text may work in some plain XML
            }
        }
        return true;
    }
    return output;
}

function utf8_decode(str_data) {

    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0,
        c4 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 <= 191) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 <= 223) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else if (c1 <= 239) {
            // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            c4 = str_data.charCodeAt(i + 3);
            c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
            c1 -= 0x10000;
            tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
            tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
            i += 4;
        }
    }

    return tmp_arr.join('');
}

function preg_replace(array_pattern, array_pattern_replace, my_string)  {
	var new_string = String (my_string);
		for (i=0; i<array_pattern.length; i++) {
			var reg_exp= RegExp(array_pattern[i], "gi");
			var val_to_replace = array_pattern_replace[i];
			new_string = new_string.replace (reg_exp, val_to_replace);
		}
		return new_string;
}

function systemAccent(my_string) {
		my_string = String(my_string);
		var new_string = "";
		var pattern_accent = new Array("é", "è", "ê", "ë", "ç", "à", "â", "ä", "î", "ï", "ù", "ô", "ó", "ö");
		var pattern_replace_accent = new Array("e", "e", "e", "e", "c", "a", "a", "a", "i", "i", "u", "o", "o", "o");
		if (my_string && my_string!= "") {
			new_string = preg_replace (pattern_accent, pattern_replace_accent, my_string);
		}
		return new_string;
}