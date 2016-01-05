$(function(){

	$.ajax({
		url: 'twitter/tweets/get_tweets.php',
		type: 'GET',
		success: function(response) {
			
			//document.getElementById("nbLikesFacebook").innerHTML=numbersRS._like_facebook;

			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				
				var $tweets = $('<ul></ul>');
				
				$.each(response, function(i, obj) {
					
					/*
					var textTweet = obj.text;
					textTweet.replaceBetween(4, 9, "Hi");
					*/
					
					$tweets.append('<li>' + obj.text + '<span>' + obj.created_at + '</span></li>');
					/*$tweets.append('<li>Report #Hellfest2015 Day1\n11h05 - 1er concert les @StickyBoys ont enflamm\u00e9s la main stage 1 ! #Hellfest http:\/\/t.co\/paJ3OjutSX<span>' + obj.created_at + '</span></li>');*/
					/*<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore <a href="#">@Neque</a><span>10 minutes ago</span></li>	*/				
				});

				$('.tweets-container').html($tweets);

			} else {
				$('.tweets-container p:first').text('Problème de chargement des Tweets de SUN');
			}
		},
		error: function(errors) {
			$('.tweets-container p:first').text('Problème de chargement des Tweets de SUN');
		}
	});
	
});

/*
String.prototype.replaceBetween = function(start, end, what) 
{
	return this.substring(0, start) + what + this.substring(end);
};
*/