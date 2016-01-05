Api = {

    init : function(){
        this.initVar();
    },

    initVar : function() {
        //$('#num_message').attr('href','tel:'+Flux._frap_flux.telephone_msg);
		if(isphonegap == true)
		{
			$('#num_message').attr('href',"javascript:window.open('tel:"+Flux._frap_flux.telephone_msg+"','_blank','location=yes,hardwareback=yes');");
			$('#num_standard').attr('href',"javascript:window.open('tel:"+Flux._frap_flux.telephone_std+"','_blank','location=yes,hardwareback=yes');");
		}
		else
		{
			$('#num_message').attr('href','tel:'+Flux._frap_flux.telephone_msg);
			$('#num_standard').attr('href','tel:'+Flux._frap_flux.telephone_std);
			
			$('#javascriptLienfacebook').attr('href','http://www.facebook.com/lesonunique');
			$('#javascriptLientwitter').attr('href','http://twitter.com/lesonunique');
		}
		
        //$('#num_standard').attr('href','tel:'+Flux._frap_flux.telephone_std);

        $('#informations_bloc').html(Flux._frap_flux.informations);
        $('#version_bloc').html(Flux._frap_flux.version);

        for(var d=0;d<Flux._frap_flux.destinataires.length;d++) {
            this._list_destinataire += '<option value="'+Flux._frap_flux.destinataires[d].mail+'">'+Flux._frap_flux.destinataires[d].nom+'</option>';
        }
        $('#c_destinataire').append(this._list_destinataire);
    }

}