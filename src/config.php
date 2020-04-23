<?php
    $servername = "localhost:3306";
    $username = "root";
    $password = "password";
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

	switch ($_SERVER["SCRIPT_NAME"]) {
		case "/index.php":
			$CURRENT_PAGE = "Graphs"; 
			break;
		case "/cases.php":
			$CURRENT_PAGE = "Cases"; 
			break;
        default:
            echo $_SERVER["SCRIPT_NAME"];
			$CURRENT_PAGE = "Graphs";
	}
?>
