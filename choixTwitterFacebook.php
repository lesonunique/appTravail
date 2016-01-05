<style>
a.twitter {
    background: #35aadc none repeat scroll 0 0;
    border-radius: 5px;
    float: left;
    width: 50%;
}
a.facebook {
    background: #1a4e95 none repeat scroll 0 0;
    border-radius: 5px;
    float: left;
    width: 50%;
}
a {
    display: block;
    transition: all 0.5s ease-in-out 0s;
}
a.twitter > i {
    background: #4fc4f6 none repeat scroll 0 0;
    border-radius: 5px;
}
a.facebook > i {
    background: #3468af none repeat scroll 0 0;
    border-radius: 5px;
}
a > i {
    background: #1a4e95 none repeat scroll 0 0;
    display: block;
    padding: 10px 0 5px;
}
a span {
    color: #fff;
    display: block;
    font-size: 1em;
    padding: 5px 0;
}
a {
    text-decoration: none;
	 color: #428bca;
	 text-align:center;
	 font-family:Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
}
p {
    background: #e64c65 none repeat scroll 0 0;
    border-radius: 5px;
    color: white;
    display: block;
    font-size: 1em;
    margin: 10px;
    padding: 20px 40px;
    text-decoration: none;
	font-family:Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
	text-align:center;
}
</style>
<?php
	$shareFace = $_GET["shareFace"];
	$shareTweet = $_GET["shareTweet"];
	$txtShareTweet = $_GET["txtShareTweet"];
	
	$lienFace = 'https://www.facebook.com/sharer/sharer.php?u='.$shareFace;
	$lienTweet = 'https://twitter.com/intent/tweet/?url='.$shareTweet.'&text='.$txtShareTweet;
	
	echo '<p>Sur quel réseau social voulez-vous partager ce contenu ?</p>';
	echo '<a class="facebook" href="'.$lienFace.'"><i><img alt="" src="images/facebook_icon.png"></i><span id="nbLikesFacebook">Facebook</span></a>';
	echo '<a class="twitter" href="'.$lienTweet.'"><i><img alt="" src="images/tweets.png"></i><span id="nbFollowTwitter">Twitter</span></a>';
?>