<?php
	$SESSname = $_POST['SESSname'];
	$SESSid = $_POST['SESSid'];
	
	setcookie($SESSname,$SESSid,time()+86400,"/",".lesonunique.com",false,true)
?>