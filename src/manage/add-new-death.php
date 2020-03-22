<?php
include('../config.php');

if(isset($_POST["submit"])){
	$date = date('Y-m-d H:i:s');
	$province = trim($_POST["province"]);

	$sql = "INSERT INTO `new_death`(`province`, `date`) VALUES ('".$province."','".$date."')";

	if ($conn->query($sql) === TRUE) {
		$success = 'New death created successfully.';
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
		<h3 class="txt-center">Add New Death</h3>
		<form name="myForm" onsubmit="return validateForm()" method="post">
		  	<div class="col-md-12 txt-center">
		  		<label for="province">Province</label>
		    	<input type="text" id="province" name="province" required>
		  	</div>
		  	
		  	<div class="col-md-12 txt-center">
		  		<input type="submit" value="Submit" name="submit" onclick="myFunction()">
		  	</div>
		    
		</form>
	</div>
</div>

</body>
</html>
