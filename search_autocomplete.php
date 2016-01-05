<?php

$hote = '127.0.0.1';
$nom_bd = 'lesonunique';
$user = 'invite';
$mot_de_passe = 'sunsql';

try {
  $connexion = new PDO('mysql:host=' . $hote . ';dbname=' . $nom_bd, $user, $mot_de_passe);
  $connexion->exec("SET CHARACTER SET utf8");
  $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    //on active la gestion des erreurs et d'exceptions
} catch (PDOException $e) {
  error_log(date("Y-m-d H:i:s") . " " . "envoiTweet.php récupération URL alias PDOException " . $e->getMessage() . " \n", 3, "/var/log/mes-erreurs.log");
  echo $e->getMessage();
  die();
}
error_log(date("Y-m-d H:i:s") . " " . "envoiTweet.php " . print_r($_GET, 1) . "\n", 3, "/var/log/visu-dedicace.log");
 
$return_arr = array();
 
if ($connexion){
    $ac_term = "%".$_GET['term']."%";
    $query = "SELECT * FROM 'musique_tbl' WHERE 'artiste' LIKE :term OR 'titre' LIKE :term OR 'album' LIKE :term";
    $result = $connexion->prepare($query);
    $result->bindValue(":term",$ac_term);
    $result->execute();
 
	while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
		$row_array['proposition'] = $row['Lieux_Adresse'];
 
		array_push($return_arr,$row_array);
    }     
}

$connexion = null;
echo json_encode($return_array);

?>