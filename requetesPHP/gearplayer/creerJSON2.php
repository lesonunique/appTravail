<?php
$json = $_POST['jsonTMP'];

$data2 = json_encode($json);

$data3 = '{"entries":'.$data2.'}';

$handle = fopen("json/albumTemp.json", "w+");

fwrite($handle, $data3);
?>
