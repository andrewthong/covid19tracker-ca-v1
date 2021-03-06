<?php

include_once '../config/database.php';
include_once '../entities/cases.php';

$config = include('../config/configs.php');

// header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-type: application/json');

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$database = new Database();
$db = $database->getConnection($config);

$cases = new Cases($db);

// data needed
$return_data = array();

$return_data['casePerPopulation'] = array( 'Ontario' => '134', 'Quebec' => '82', 'British Columbia' => '46',
  'Alberta' => '41', 'Manitoba' => '13', 'Saskatchewan' => '11', 'Nova Scotia' => '9.7','New Brunswick' => '7.5',
  'Newfoundland and Labrador' => '5.2', 'Prince Edward Island' => '1.4', 'Northwest Territories' => '0.41',
  'Nunavut' => '0.36', 'Yukon' => '0.36', 'Canada' => '350'
);

$return_data['lastUpdate'] = $cases->lastUpdated();
$return_data['totalCases'] = $cases->totalCases();
$return_data['cumulativeCases'] = $cases->cumulativeCases();
$return_data['dailyCases'] = $cases->dailyCases();
$return_data['dailyCaseDeath'] = $cases->dailyCaseDeath();
$return_data['casesByProvince'] = $cases->casesByProvince();
$return_data['deathsByProvince'] = $cases->deathsByProvince();
$return_data['individualCases'] = $cases->individualCases();
$return_data['totalCaseProvince'] = $cases->totalCaseProvince();




// print_r($return_data);
echo json_encode($return_data);
