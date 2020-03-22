<?php
$servername = "localhost";
$username = "ausrwmfh_database";
$password = "**********";
$dbname = "ausrwmfh_database";
/* $servername = "localhost";
$username = "root";
$password = "";
$dbname = "covid_tracker"; */

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
date_default_timezone_set('Canada/Mountain');
