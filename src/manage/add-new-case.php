<?php
include('../config.php');

if(isset($_POST["submit"])){
	$date = date('Y-m-d H:i:s');
	$province = trim($_POST["province"]);
	$city = trim($_POST["city"]);
	$age = trim($_POST["age"]);
	$travel_history = trim($_POST["travel_history"]);
	$source = trim($_POST["source"]);
	$records = trim($_POST["records"]);
	
	$values = array();
	for($i = 0; $i < $records; $i++) {
		$values[] = "('".$province."','".$city."','".$age."','".$travel_history."','".$_POST["confirmed_presumptive"]."','".$source."','".$date."')";
	}
	
	$sql = "INSERT INTO `new_case` (`province`, `city`, `age`, `travel_history`, `confirmed_presumptive`, `source`, `date`) VALUES ".implode(",", $values);



	$conn->query("SET NAMES utf8");

	if ($conn->query($sql) === TRUE) {
		$success = 'New case created successfully.';
	} else {
		$error = "'Error: " . $sql . "<br>" . $conn->error."'";
	}

	$conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
	<link href="css/my_css.css" rel="stylesheet" />
	<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8" />

</head>
<body>


</head>
<body>

<div class="container">
	<?php
		if (isset($success)) {
			echo '<div class="col-md-12 txt-center success">'.$success.'</div>';
		}
		if (isset($error)) {
			echo '<div class="col-md-12 txt-center error">'.$error.'</div>';
		}
	?>
	<div class="add-new-form">
		<h3 class="txt-center">Add New Case</h3>


		<form name="myForm" onsubmit="return validateForm()" method="post">
		  	<div class="col-md-12 txt-center">
		  		<label for="province">Province</label>
		    	<input type="text" id="province" name="province" required>
		  	</div>

		  	<div class="col-md-12 txt-center">
		  		<label for="city">City</label>
		    	<input type="text" id="city" name="city" value="Pending" required>
		  	</div>
		  	<div class="col-md-12 txt-center">
		  		<label for="age">Age</label>
		    	<input type="text" id="age" name="age" value="Pending" required>
		  	</div>
		  	<div class="col-md-12 txt-center">
		  		<label for="travel_history">Travel History</label>
		    	<textarea id="travel_history" name="travel_history" value="Pending" required></textarea> 
		  	</div>
		  	<div class="col-md-12 txt-center">
		  		<label for="confirmed_presumptive">Confirmed/Presumptive</label>

		    	<select id="confirmed_presumptive" name="confirmed_presumptive" required>
		  			<option value="CONFIRMED">CONFIRMED</option>
		  			<option value="PRESUMPTIVE">PRESUMPTIVE</option>
		  		</select>
		  	</div>
		  	<div class="col-md-12 txt-center">
		  		<label for="source">Source</label>
		    	<input type="text" id="source" name="source" required>
			  </div>
			<div class="col-md-12 txt-center">
		  		<label for="records">Records:</label>
		    	<input type="number" id="records" name="records" min="1" value="1" required>
		  	</div>
		  	
		  	<div class="col-md-12 txt-center">
		  		<input type="submit" value="Submit" name="submit" onclick="myFunction()">
		  	</div>
    
  		</form>
	</div>


</div>

</body>
</html>
