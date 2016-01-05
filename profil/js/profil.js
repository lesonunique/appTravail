/*(function(){
            var menu_trigger = $("[data-card-menu]");
            var back_trigger = $("[data-card-back]");
            
            menu_trigger.click(function(){
                $(".card, body").toggleClass("show-menu");
            });    
               
            back_trigger.click(function(){
                $(".card, body").toggleClass("show-menu");
            });       
        })();*/
		
function dessinCercleFLAT(cible, chargeActu, total){
	 pourcentage = Math.round((chargeActu * 100) /total);
	 var dateActu = new Date();
	 timeActu= dateActu.getTime();
	 
	 //var bg = cible;
	 var bg = document.getElementById(cible);
	 var ctx = bg.getContext('2d');
	 // netoyage du canvas existant
	 ctx.clearRect ( 0 , 0 , 160 , 160 );
	 // definition d'un cercle complet
	 var circ = Math.PI * 2;
	 var quart = Math.PI / 2;
	 var circSTART = Math.PI / 8;
	 var circEND = Math.PI / 4;
	 
	 // creation d'un cercle de progression
	 var ctx = ctx = bg.getContext('2d');
	 ctx.strokeStyle = '#CFD8DC';
	 ctx.lineWidth = 16;
	 ctx.beginPath();
	 ctx.arc(80, 80, 70, 0, circ, false);
	 /*ctx.arc(80, 80, 70, 0, circ, false);*/
	 ctx.stroke();
	 
	 // creation d'un cercle de progression
	 var ctx = ctx = bg.getContext('2d');
	 ctx.strokeStyle = '#f49500';
	 ctx.lineWidth = 10;
	 ctx.beginPath();
	 ctx.shadowOffsetY = 0;
	 ctx.arc(80, 80, 70, -(quart), ((circ) * pourcentage/100) - quart, false);
	 /*ctx.arc(80, 80, 70, -(circSTART), ((circ) * pourcentage/100) - quart, false);*/
	 ctx.stroke();
}