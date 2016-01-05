numbersRS = {

    _like_facebook : '',

    _follow_twitter : '',

    init : function() {
		numbersRS.recup_facebook();
		numbersRS.recup_twitter();
    },
	
	recup_facebook : function() {
		$.ajax
		({
			url: 'https://graph.facebook.com/lesonunique?access_token=916802568376039|m6aeXFMmwjDGonfoqoZNrYldgMY', 		
			method: 'GET',
			dataType: 'json',
			success: function(data) 
			{
				console.log(data);
				numbersRS._like_facebook=data.likes;
				document.getElementById("nbLikesFacebook").innerHTML=numbersRS._like_facebook;
			},
			error: function() 
			{
				console.log('Erreur récupération Facebook');
				document.getElementById("nbLikesFacebook").innerHTML="Facebook";
			}
		});
	},
	
	recup_twitter : function() {
		var requete = $.ajax
		({
			url: 'http://www.lesonunique.com/newappli/requetesPHP/twitter/followers/recupFollowers.php',  
			type: 'GET',
			dataType: 'json',
			crossDomain: true,
			headers: 
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST',  
				'Access-Control-Allow-Headers': 'content-type', 
				'Access-Control-Allow-Credentials': true
			},
			success: function() 
			{	
				console.log('Recup twitter');
				console.log(requete);
				numbersRS._follow_twitter=requete.responseJSON.nbFollowers;
				document.getElementById("nbFollowTwitter").innerHTML=numbersRS._follow_twitter;
			},
			error: function() 
			{
				console.log('Erreur récupération Twitter');
				document.getElementById("nbFollowTwitter").innerHTML="Twitter";
			}
		});	
	}
}