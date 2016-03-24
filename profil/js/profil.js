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
	pourcentage = (Math.round((chargeActu * 100) /total))*0.676;
	var dateActu = new Date();
	var colorRound = '#f49500';
	timeActu= dateActu.getTime();
	 
	var pourcentagevalue = Math.round((chargeActu * 100) /total);
	if(pourcentagevalue == 100)
	{
		colorRound = '#7ef400';
	}
	else if(pourcentagevalue < 100 && pourcentagevalue >= 90)
	{
		colorRound = '#a6f400';
	}
	else if(pourcentagevalue < 90 && pourcentagevalue >= 80)
	{
		colorRound = '#c3f400';
	}
	else if(pourcentagevalue < 80 && pourcentagevalue >= 70)
	{
		colorRound = '#f4f100';
	}
	else if(pourcentagevalue < 70 && pourcentagevalue >= 60)
	{
		colorRound = '#f4c900';
	}
	else if(pourcentagevalue < 60 && pourcentagevalue >= 50)
	{
		colorRound = '#f49500';
	}
	else if(pourcentagevalue < 50 && pourcentagevalue >= 40)
	{
		colorRound = '#f47e00';
	}
	else if(pourcentagevalue < 40 && pourcentagevalue >= 30)
	{
		colorRound = '#f45600';
	}
	else if(pourcentagevalue < 30 && pourcentagevalue >= 20)
	{
		colorRound = '#f43f00';
	}
	else if(pourcentagevalue < 20 && pourcentagevalue >= 10)
	{
		colorRound = '#f41d00';
	}
	else if(pourcentagevalue < 10 && pourcentagevalue >= 0)
	{
		colorRound = '#c80202';
		if(pourcentagevalue < 6)
		{
			pourcentage = 5*0.676;
		}
	}
	else
	{
		colorRound = '#f49500';
	}
	 
	//var bg = cible;
	var bg = document.getElementById(cible);
	var ctx = bg.getContext('2d');
	// netoyage du canvas existant
	ctx.clearRect ( 0 , 0 , 160 , 160 );
	// definition d'un cercle complet
	/*var circ = Math.PI * 2;
	var quart = Math.PI / 2;
	var circSTART = Math.PI / 8;
	var circEND = Math.PI / 4;*/
	var circ = Math.PI * 2;
	var quart = Math.PI / 2;
	var circSTART = Math.PI / 8;
	var circEND = Math.PI / 4;
	 
	// creation d'un cercle de progression
	var ctx = ctx = bg.getContext('2d');
	ctx.strokeStyle = '#CFD8DC';
	ctx.lineWidth = 16;
	ctx.beginPath();
	ctx.arc(80, 80, 70, Math.PI - (Math.PI*0.2), 0 + (Math.PI*0.2), false);
	/*ctx.arc(80, 80, 70, 0, circ, false);*/
	ctx.stroke();
	 
	// creation d'un cercle de progression
	var ctx = ctx = bg.getContext('2d');
	ctx.strokeStyle = colorRound;
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.shadowOffsetY = 0;
	//ctx.arc(80, 80, 70,  Math.PI - (Math.PI*0.2) , (Math.PI*0.2) * (pourcentage/100), false);
	ctx.arc(80, 80, 70, -(quart * 2.35), ((circ) * pourcentage/100) - (quart * 2.35), false);
	/*ctx.arc(80, 80, 70, -(circSTART), ((circ) * pourcentage/100) - quart, false);*/
	ctx.stroke();
}