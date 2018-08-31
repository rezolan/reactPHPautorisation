<?php
header('Access-Control-Allow-Origin: http://localhost:9090');
$content = json_decode(file_get_contents('initialState.json'));
$arr = array('title' => $_POST['title'], 'description' => $_POST['description']);
$content[] = $arr;
file_put_contents('initialState.json', json_encode($content));
echo json_encode($arr);