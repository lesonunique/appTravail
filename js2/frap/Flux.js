Flux = {

    //_url_flux : 'http://www.lesonunique.com/appli/sun.js',
	
	_url_flux : 'sun.js',

    _frap_flux : '',
	
	_imagePAUSE : '',

    init : function() {
        this.getFlux();
    },

    getFlux : function() {
		//Podcasts.init();
		$(document).ready(function() {
		$.ajax({ 
			type: 'GET',
			url: Flux._url_flux,
			//timeout: 3000,
			success: function(data) {
				eval('Flux._frap_flux = '+data);
				if(Flux._frap_flux) {
					numbersRS.init();
					Podcasts.init();
					Videos.init();
					Api.init();
					Direct.init();
					if((localStorage.getItem("user_connected")) == 1)
					{
						GererFlux.init();
					}
					newAlbumPodcast();
				} else {
					console.log('connexion error flux');
				}
			},
												//alert(data); },
			error: function() {
				console.log('La requête n\'a pas abouti'); 
			}
		});
		}); //fin script Jquery    
		
    },

}
