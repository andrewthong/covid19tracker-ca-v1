<?php
header('Content-Type: application/json');

require_once('config.php');

$sqlQuery = "SELECT `id`,`province`, `city`, `age`, `travel_history`, `confirmed_presumptive`, `source`, `date`, COUNT(id) as totalGCase FROM `new_case` GROUP BY DATE_FORMAT(date, '%y-%m-%d') ORDER BY date";

$result = mysqli_query($conn,$sqlQuery);

$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

mysqli_close($conn);

echo json_encode($data);
?>