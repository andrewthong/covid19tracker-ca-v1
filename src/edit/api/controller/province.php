<?php

include_once '../config/database.php';
include_once '../entities/cases.php';

// header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-type: application/json');

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$database = new Database();
$db = $database->getConnection();

$cases = new Cases($db);

$return_data = array();

$return_data['province'] = $data['province'];
$return_data['data'] = $cases->getProvinceData($data['province']);
$return_data['dailyCases'] = $cases->getProvinceCaseByDay($data['province']);
$return_data['cumulativeCases'] = $cases->getProvinceCumulativeCases($data['province']);


echo json_encode($return_data);
