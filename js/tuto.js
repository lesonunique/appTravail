tuto = {
	
	_tutoEnCours : false,

    init : function() {
		$('#presFullScreen').show();
		$('#page1').show();
		$('#page2').hide();
		$('#page3').hide();
		$('#page4').hide();
		localStorage.setItem("tuto0",true);
    },
	
	closeTuto : function(etape) {
		$('#presFullScreen').hide();
		tuto.tutoPart1();
	},
	
	goStep : function(etape) {
		if(etape == 1)
		{
			$('#page1').show();
			$('#page2').hide();
			$('#page3').hide();
			$('#page4').hide();
			document.getElementById("presFullScreen").style.backgroundColor="#232e87";
		}
		else if(etape == 2)
		{
			$('#page1').hide();
			$('#page2').show();
			$('#page3').hide();
			$('#page4').hide();
			document.getElementById("presFullScreen").style.backgroundColor="#33ac71";
		}
		else if(etape == 3)
		{
			$('#page1').hide();
			$('#page2').hide();
			$('#page3').show();
			$('#page4').hide();
			document.getElementById("presFullScreen").style.backgroundColor="#4B95D4";
		}
		else if(etape == 4)
		{
			$('#page1').hide();
			$('#page2').hide();
			$('#page3').hide();
			$('#page4').show();
			document.getElementById("presFullScreen").style.backgroundColor="#232e87";
		}
	},
	
	tutoPart1 : function() {
		$('#tutoFullScreen').show();
		$('#texteTuto1').show();
		document.getElementById("loginBox").style.zIndex="8000";
		document.getElementById("loginButton").style.zIndex="8000";
		
		/*
		var button = $('#loginButton');
		var box = $('#loginBox');
		var form = $('#loginForm');
		button.removeAttr('href');
		box.toggle();
		button.toggleClass('active');
		*/
		tuto._tutoEnCours = true;
		$('#loginBox').show();
		
		document.getElementById("img_1").style.borderRadius = '27.5px';
		document.getElementById("img_2").style.borderRadius = '27.5px';
		
		localStorage.setItem("tuto1",true);
	},
	
	closeTuto1 : function() {
		$('#tutoFullScreen').hide();
		$('#texteTuto1').hide();
		document.getElementById("loginBox").style.zIndex="";
		document.getElementById("loginButton").style.zIndex="";
	},
	
	tutoPart2 : function() {
		$('#tutoFullScreen').show();
		$('#texteTuto1').hide();
		$('#texteTuto2').show();
		document.getElementById("loginBox").style.zIndex="";
		document.getElementById("loginButton").style.zIndex="";
		document.getElementById("btn_dedicace_sun").style.zIndex="8000";
		//document.getElementById("btn_dedicace_noel").style.zIndex="8000";
		document.getElementById("btn_dedicace_franco").style.zIndex="8000";
		document.getElementById("btn_dedicace_sports").style.zIndex="8000";
		document.getElementById("btn_dedicace_events").style.zIndex="8000";
		document.getElementById("btn_dedicace_10080").style.zIndex="8000";
		document.getElementById("btn_dedicace_sun2").style.zIndex="8000";
		
		localStorage.setItem("tuto2",true);
	},
	
	closeTuto2 : function() {
		$('#tutoFullScreen').hide();
		$('#texteTuto2').hide();
		document.getElementById("btn_dedicace_sun").style.zIndex="";
		//document.getElementById("btn_dedicace_noel").style.zIndex="";
		document.getElementById("btn_dedicace_franco").style.zIndex="";
		document.getElementById("btn_dedicace_sports").style.zIndex="";
		document.getElementById("btn_dedicace_events").style.zIndex="";
		document.getElementById("btn_dedicace_10080").style.zIndex="";
		document.getElementById("btn_dedicace_sun2").style.zIndex="";
	},
	
	tutoPart3 : function() {
		$('#tutoFullScreen').show();
		$('#texteTuto3').show();
		document.getElementById("popoverRoue").style.zIndex="8000";
		document.getElementById("imagePochette").style.zIndex="8100";
		document.getElementById("titreSelectDedi").style.zIndex="8000";
		document.getElementById("texteTuto3").innerHTML="<span class='bold'>Selectionnez l'heure</span> en choisissant une heure de <span class='bold vert'>couleur verte</span><br/><br/><span onclick='tuto.closeTuto3();' class='bold lien'>Masquer le message tutoriel</span>";
	},
	
	tutoPart3_2 : function() {	
		document.getElementById("texteTuto3").innerHTML="<span class='bold'>Selectionnez les minutes</span><br/><br/><span class='bold vert'>Les créneaux verts</span> sont disponibles, <span class='bold rouge'>les rouges</span> sont déjà sélectionnés<br/><br/>Appuyez sur le <span class='bold'>bouton vert central</span> pour valider<br/><br/><span onclick='tuto.closeTuto3();' class='bold lien'>Masquer le message tutoriel</span>";
		
		localStorage.setItem("tuto3",true);
	},
	
	closeTuto3 : function() {
		$('#tutoFullScreen').hide();
		$('#texteTuto3').hide();
		document.getElementById("popoverRoue").style.zIndex="";
		document.getElementById("imagePochette").style.zIndex="";
		document.getElementById("titreSelectDedi").style.zIndex="";
	},
	
	clearTuto : function() {
		goDirect();
		
		localStorage.removeItem("tuto0");
		localStorage.removeItem("tuto1");
		localStorage.removeItem("tuto2");
		localStorage.removeItem("tuto3");
		
		tuto.init();
	}
}