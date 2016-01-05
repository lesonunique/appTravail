<?php

require_once 'oauth/twitteroauth.php';
 
define('consumer_key', 'ZPkEI2BmJBPStNVWxXfKXOiPC');
define('consumer_secret', 'NCvUTjRdjrcY3h6Jk0OU8cbOh8wXMC7e8gwGol29r6IguUEiz0');
define('token', '21495370-4le8QCGRWdOZIYGc7nBTpkMqpFke7R4YIkbsmcmv6');
define('secret', '41uJRfOjKFWml3OfWgjQpgyGnVIUN3N5vg8O9tdX8oqf5');
 
$toa = new TwitterOAuth(consumer_key, consumer_secret, token, secret);
 
$ret = $toa->get('users/show', array('screen_name' => 'lesonunique','count' => '1000'));

$nbFollow = $ret->followers_count;

header('Content-type: application/json');  
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
header('Access-Control-Allow-Headers: content-type'); 
header('Access-Control-Allow-Credentials: true');

?>
{
"nbFollowers": "<?php echo $nbFollow;?>"
}
<?php

?>