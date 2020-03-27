<?php

include_once '../config/database.php';
include_once '../entities/locations.php';
$config = include('../config/configs.php');

// header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-type: application/json');

$json = file_get_contents("php://input");

$database = new Database();
$db = $database->getConnection($config);

$locations = new Locations($db);

$return_data = array();
$return_data['locations'] = $locations->getLocations();

echo json_encode($return_data);
