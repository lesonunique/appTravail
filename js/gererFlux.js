GererFlux = {
	
	fluxBase : '',
	
	choix : '',
	
	lien : '',

    init: function () {
		var JSONperso0 = localStorage.getItem("fluxactifs");
		var JSONperso = JSON.parse(JSONperso0);
		console.log(JSONperso);
		//chargeMYflux2(JSONperso.fluxactifs.noel,JSONperso.fluxactifs.sports,JSONperso.fluxactifs[10080]);
		chargeMYflux2(0,JSONperso.fluxactifs.sports,JSONperso.fluxactifs[10080],JSONperso.fluxactifs.franco);
    },
	
	listFlux: function () {
		
    },
	
	checkBox: function () {
		/*if (document.getElementById('SELECTnoel').checked)
		{
        	var fluxnoel = 1;
        } 
		else
		{
        	var fluxnoel = 0;
        }*/
		
		if (document.getElementById('SELECTfranco').checked)
		{
        	var fluxfranco = 1;
        } 
		else
		{
        	var fluxfranco = 0;
        }
		
		if (document.getElementById('SELECTsports').checked) 
		{
        	var fluxsports = 1;
        } 
		else
		{
        	var fluxsports = 0;
        }
		
		if (document.getElementById('SELECT10080').checked)
		{
        	var flux10080 = 1;
        } 
		else
		{
        	var flux10080 = 0;
        }
		
		//chargeMYflux(fluxnoel,fluxsports,flux10080);
		chargeMYflux(0,fluxsports,flux10080,fluxfranco);
	},
	
	viderFlux: function () {
		localStorage.setItem("fluxperso",0);
		localStorage.setItem("fluxactifs","");
		localStorage.setItem("JSONfluxperso","");
	}
	
}