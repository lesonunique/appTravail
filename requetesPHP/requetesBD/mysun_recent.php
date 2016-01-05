<?php

$user_id = $_GET["user_id"];

try
{
	// On se connecte à MySQL
	$bdd = new PDO('mysql:host=localhost;dbname=lesonunique;charset=utf8', 'invite', 'sunsql');
}
catch(Exception $e)
{
	// En cas d'erreur, on affiche un message et on arrête tout
	die('Erreur : '.$e->getMessage());
}

// Si tout va bien, on peut continuer

// On récupère tout le contenu de la table jeux_video
$reponse = $bdd->query('SELECT musique_auditeur_tbl.artiste_diffuser, musique_auditeur_tbl.titre_diffuser , musique_auditeur_tbl.id_musique ,musique_tbl.id_album FROM musique_auditeur_tbl,musique_tbl WHERE musique_auditeur_tbl.id_utilisateur = '.$user_id.' AND musique_tbl.id_musique = musique_auditeur_tbl.id_musique ORDER BY musique_auditeur_tbl.date_heure_souhaitee_diffusion DESC LIMIT 3');

// On affiche chaque entrée une à une
$inc = 1;
$nbmysun = 0;
while ($donnees = $reponse->fetch())
{
	if($inc == 1)
	{
		$artiste1 = $donnees['artiste_diffuser'];
		$titre1 = $donnees['titre_diffuser'];
		$id_musique1 = $donnees['id_musique'];
		$id_album1 = $donnees['id_album'];
		$nbmysun = 1;
	}
	else if($inc == 2)
	{
		$artiste2 = $donnees['artiste_diffuser'];
		$titre2 = $donnees['titre_diffuser'];
		$id_musique2 = $donnees['id_musique'];
		$id_album2 = $donnees['id_album'];
		$nbmysun = 2;
	}
	else if($inc == 3)
	{
		$artiste3 = $donnees['artiste_diffuser'];
		$titre3 = $donnees['titre_diffuser'];
		$id_musique3 = $donnees['id_musique'];
		$id_album3 = $donnees['id_album'];
		$nbmysun = 3;
	}
	
	$inc = $inc + 1;
}

$reponse->closeCursor(); // Termine le traitement de la requête

header('Content-type: application/json');   
?>
{
	"lastmysun": [
        {
            "artiste": "<?php echo $artiste1;?>",
            "titre": "<?php echo $titre1;?>",
            "id_musique": "<?php echo $id_musique1;?>",
            "id_album": "<?php echo $id_album1;?>"
        },
		{
            "artiste": "<?php echo $artiste2;?>",
            "titre": "<?php echo $titre2;?>",
            "id_musique": "<?php echo $id_musique2;?>",
            "id_album": "<?php echo $id_album2;?>"
        },
        {
            "artiste": "<?php echo $artiste3;?>",
            "titre": "<?php echo $titre3;?>",
            "id_musique": "<?php echo $id_musique3;?>",
            "id_album": "<?php echo $id_album3;?>"
        }
	],
	"nbmysun": <?php echo $nbmysun;?>
}