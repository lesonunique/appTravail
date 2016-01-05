<?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '21495370-4le8QCGRWdOZIYGc7nBTpkMqpFke7R4YIkbsmcmv6';
$oauth_access_token_secret = '41uJRfOjKFWml3OfWgjQpgyGnVIUN3N5vg8O9tdX8oqf5';
$consumer_key = 'ZPkEI2BmJBPStNVWxXfKXOiPC';
$consumer_secret = 'NCvUTjRdjrcY3h6Jk0OU8cbOh8wXMC7e8gwGol29r6IguUEiz0';
$user_id = '21495370';
$screen_name = 'lesonunique';
$count = 5;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
header('Access-Control-Allow-Headers: content-type'); 

echo $tweets;

?>