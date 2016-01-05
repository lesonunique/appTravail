<?php
$json = $_POST['jsonTMP'];

$data2 = json_encode($json);

$handle = fopen("json/albumTemp.json", "w+");

fwrite($handle, $data2);
?>
