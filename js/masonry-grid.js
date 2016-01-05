$(document).ready( function() {

	/*var cw = $('.grid-item').width();
	$('.grid-item').css({'height':cw+'px'});
	
	var cw2 = $('.grid-item--width2').width();
	$('.grid-item--width2').css({'height':cw2*0.3+'px'});
	
	console.log(cw);
	console.log(cw2);*/

  	$('.grid').masonry({
    	itemSelector: '.grid-item',
		percentPosition: true
  	});
  
});