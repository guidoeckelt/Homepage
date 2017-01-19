<?php
$fileDir = dirname(__FILE__);
$baseDir = dirname($fileDir);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $jsonFile = file_get_contents($baseDir.'/data/languages.json');
  // $json = json_decode($jsonFile, true);
  // $jsonString = json_encode($json);

  if($jsonFile === false){
    echo 'Couldnt output links';
    return;
  }
  header('Content-Type: application/json');
  echo $jsonFile;
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // …
}else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  // …
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  // …
}
