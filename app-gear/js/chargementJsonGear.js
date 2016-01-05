function newAlbumPodcast()
{
	$.ajax
	({
		url: 'app-gear/json/album.json', 		
		method: 'GET',
		dataType: 'json',
		success: function(getJson) 
		{
			var jsonActuel=getJson;
							
			$.ajax
			({
				url: 'http://lesonunique.com/services/lastpodcast', 		
				method: 'GET',
				dataType: 'json',
				success: function(pod) 
				{
					jsonActuel.entries.push({"title":""+pod.nodes[0].node.title+"", "author":"Dernier Podcast", "media":""+pod.nodes[0].node.son+"", "link":"", "color":"#56B0E8" });
					newAlbumPodcast2(jsonActuel);
				},
				error: function() 
				{
					console.log("Pas d'éléments");
				}
			});
		},
		error: function() 
		{
			console.log("Pas d'éléments");
		}
	});
					
}
				
function newAlbumPodcast2(jsonNew)
{
	$.ajax
	({
		url: 'app-gear/creerJSON.php',  
		type: 'POST',
		data : {jsonTMP: jsonNew},
		success: function() 
		{		
			g.album('app-gear/json/albumTemp.json');
		},
		error: function() 
		{
			console.log("error");
		}
	});					
}