<?php
$fileDir = dirname(__FILE__);
$baseDir = dirname($fileDir);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $jsonString = file_get_contents($baseDir.'/data/links.json');
  $json = json_encode($jsonString);

  if($json == false){
    echo "Couldnt output links";
    return;
  }
  header('Content-Type: application/json');
  echo $json;
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // …
}else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  // …
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  // …
}
