<?php
header('Access-Control-Allow-Origin: http://localhost:9090');
$content = file_get_contents('initialState.json');
echo $content;
?>