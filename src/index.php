<?php
include('config.php');
$group_sql_case = "SELECT `id`,`province`, `city`, `age`, `travel_history`, `confirmed_presumptive`, `source`, `date`, COUNT(id) as totalGCase FROM `new_case` GROUP BY province ORDER BY totalGCase DESC";
$group_result = $conn->query($group_sql_case);
$group_result1 = $conn->query($group_sql_case);

$new_cases = array();
$deaths = array();
if (mysqli_num_rows($group_result1) > 0) {
    while($g_row1 = mysqli_fetch_assoc($group_result1)) {

        $sql_case_today1 = "SELECT id FROM `new_case` WHERE province LIKE '%".$g_row1["province"]."%' AND date LIKE '%".date('Y-m-d')."%' ";
        $result_case_today1 = $conn->query($sql_case_today1);
        if (mysqli_num_rows($result_case_today1) != 0) {
            $result_case_today_val1 = mysqli_num_rows($result_case_today1);
            $new_cases[] = $result_case_today_val1;
        } else $new_cases[] = 0;

        $sql_death_p1 = "SELECT id FROM `new_death` WHERE province LIKE '%".$g_row1["province"]."%'";
        $result_death_p1 = $conn->query($sql_death_p1);
        if (mysqli_num_rows($result_death_p1) != 0) {
            $result_death_val1 = mysqli_num_rows($result_death_p1);
            $deaths[] = $result_death_val1;
        } else $deaths[] = 0;
    }
}

$sql_case = "SELECT `id`,`province`, `city`, `age`, `travel_history`, `confirmed_presumptive`, `source`, `date` FROM `new_case` ORDER BY id DESC";
$result = $conn->query($sql_case);
$rows   = array();
while ($row1 = mysqli_fetch_assoc($result))
{
    $rows[] = $row1;
}

$case_per_population = array('Ontario' => '134', 'Quebec' => '82', 'British Columbia' => '46', 'Alberta' => '41', 'Manitoba' => '13', 'Saskatchewan' => '11', 'Nova Scotia' => '9.7', 'New Brunswick' => '7.5', 'Newfoundland and Labrador' => '5.2', 'Prince Edward Island' => '1.4', 'Northwest Territories' => '0.41', 'Nunavut' => '0.36', 'Yukon' => '0.36', 'Canada' => '350');
$lcase_per_population = array_change_key_case($case_per_population,CASE_LOWER);

/*echo "<pre>";
print_r($lcase_per_population);exit;*/
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <?php
            include 'head.php'
        ?>
    </head>
    <body class="sb-nav-fixed">
        <?php
            include 'navbar.php'
        ?>
            <div class="sb-sidenav-footer">
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid">
                        <br>
                        <br>
                        <?php
                        	$updatedDate = date("l, F d", strtotime($rows[0]['date']));
                        	$atDate = date("H:i", strtotime($rows[0]['date']));
                        ?>
                        <h2 class="mt-4">Updated <?php echo $updatedDate; ?> at <?php echo $atDate; ?> CST</h2>
                        <br>

                        <?php
                            include 'info_cards.php'
                        ?>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header"><i class="fas fa-chart-bar mr-1"></i>By Map</div>
                                    <div class="card-body" style="padding:0px;"><div id="map" ></div></div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header"><i class="fas fa-chart-area mr-1"></i>Canada Cumulative Cases: <i><b><?php echo mysqli_num_rows($result); ?> cases / <span class="death_total"></span> death</b></i></div>
                                    <div class="card-body"><canvas id="myAreaChart" width="100%"></canvas></div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header"><i class="fas fa-chart-area mr-1"></i>Canada New Cases</div>
                                    <div class="card-body"><canvas id="myAreaChart2" width="100%" height="40"></canvas></div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header"><i class="fas fa-chart-bar mr-1"></i>By Province</div>
                                    <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                                </div>
                            </div>
                        </div>


                        <div class="card mb-4">
                            <div class="card-header"><i class="fas fa-table mr-1"></i>Total Cases By Province</div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable1" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Province</th>
                                                <th>Total Cases</th>
                                                <th>Infected per 100 000</th>
                                                <th>Deaths</th>
                                                <th>Source</th>
                                            </tr>
                                        </thead>
                                        <tfoot>

                                            <tr>
                                                <td><i><b>Canada</b></i></td>
                                                <td><i><b><?php echo mysqli_num_rows($result);


                                                    $sql_total_today = "SELECT id FROM `new_case` WHERE date LIKE '%".date('Y-m-d')."%' ";
                                                    $result_total_today = $conn->query($sql_total_today);

                                                            if (mysqli_num_rows($result_total_today) != 0) {
                                                                $result_total_today_val = mysqli_num_rows($result_total_today);
                                                                echo ' (+'.mysqli_num_rows($result_total_today).' today)';
                                                            }
                                                        ?>


                                                    </i></b></td>




                                                </b></i></td>
                                                <td>
                                                	<b><?php
                                                		$getDividedCVal = getDividedVal('canada', $lcase_per_population, mysqli_num_rows($result));


														echo $getDividedCVal;
                                                	?></b>

                                                </td>
                                                <td><i><b class="death_total"></b></i></td>
                                                <td><a href="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection.html">Source</a></td>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                        	<?php
                                        		if (mysqli_num_rows($group_result) > 0) {
												    // output data of each row
												    while($g_row = mysqli_fetch_assoc($group_result)) {
											?>
											<tr>
                                                <td><?php echo $g_row["province"]; ?></td>
                                                <?php
                                                	$sql_case_today = "SELECT id FROM `new_case` WHERE province LIKE '%".$g_row["province"]."%' AND date LIKE '%".date('Y-m-d')."%' ";
													$result_case_today = $conn->query($sql_case_today);
                                                ?>
                                                <td><?php echo $g_row["totalGCase"]; ?> <b>
                                                	<i>
                                                		<?php
                                                			if (mysqli_num_rows($result_case_today) != 0) {
                                                                $result_case_today_val = mysqli_num_rows($result_case_today);
                                                				echo '(+'.mysqli_num_rows($result_case_today).' today)';
                                                			}
                                                		?>


                                                	</i></b></td>
                                                <?php
                                                	$sql_death_p = "SELECT id FROM `new_death` WHERE province LIKE '%".$g_row["province"]."%'";
													$result_death_p = $conn->query($sql_death_p);
                                                ?>
                                                <td><?php

                                                	$lower_province = strtolower($g_row["province"]);
                                                	$getDividedVal = getDividedVal($lower_province, $lcase_per_population, $g_row["totalGCase"]);


													echo $getDividedVal;



                                                ?></td>
                                                <td class="death_sum"><?php $result_death_val = mysqli_num_rows($result_death_p); echo $result_death_val ?></td>
                                                <td><a href='<?php echo $g_row["source"]; ?>'>Source</a></td>
                                            </tr>
											<?php

												    }
												} else {
												    echo "<h5 class='txt-center'>No Data Found</h5>";
												}
                                        	?>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

						<?php
							function getDividedVal($lower_province, $lcase_per_population, $totalGCase)
							{
								if (array_key_exists($lower_province, $lcase_per_population)) {

								    $dividedVal = ($totalGCase) / ($lcase_per_population[$lower_province]);
								    return number_format((float)$dividedVal, 2, '.', '');
								}
							}
						?>

                        <div class="card mb-4">
                            <div class="card-header"><i class="fas fa-table mr-1"></i>Individual Cases</div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Patient #</th>
                                                <th>Date</th>
                                                <th>Province</th>
                                                <th>City</th>
                                                <th>Age</th>
                                                <th>Travel History</th>
                                                <th>Confirmed/Presumptive</th>
                                                <th>Source</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Patient #</th>
                                                <th>Date</th>
                                                <th>Province</th>
                                                <th>City</th>
                                                <th>Age</th>
                                                <th>Travel History</th>
                                                <th>Confirmed/Presumptive</th>
                                                <th>Source</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                        	<?php
                                        		if (mysqli_num_rows($result) > 0) {
												    // output data of each row
												    foreach ($rows as $row) {

											?>
											<tr>
                                                <td><?php echo $row["id"]; ?></td>
                                                <td><?php echo date('d/m/y', strtotime($row["date"])); ?></td>
                                                <td><?php echo $row["province"]; ?></td>
                                                <td><?php echo $row["city"]; ?></td>
                                                <td><?php echo $row["age"]; ?></td>
                                                <td><?php echo $row["travel_history"]; ?></td>
                                                <td><?php echo $row["confirmed_presumptive"]; ?></td>
                                                <td><a href='<?php echo $row["source"]; ?>'>Source</a></td>
                                            </tr>
											<?php

												    }
												}
                                        	?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; COVID19Tracker.ca 2020</div>

                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
        <!-- <script src="assets/demo/chart-area-demo.js"></script> -->
        <!-- <script src="assets/demo/chart-bar-demo.js"></script> -->
        <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
        <script src="assets/demo/datatables-demo.js"></script>
		<style type="text/css">
			.txt-center{
				text-align: center;
			}
		</style>

		<script>



			var sum = 0;
			$(".death_sum").each(function() {


				//add only if the value is number
				if(!isNaN($(this).html()) && $(this).html().length!=0) {
					sum += parseFloat($(this).html());
				}



			});
			//.toFixed() method will roundoff the final sum to 2 decimal places
			$(".death_total").html(sum);

		</script>

		<script>
        $(document).ready(function () {
            showGraph();
            showGraphArea();
            showGraphArea2();

            makeMap();
        });


        function showGraph()
        {
            $.post("case_chart_bar.php",
            function (data)
            {
                //console.log(data);
                var name = [];
                var marks = [];

                for (var i in data) {
                    name.push(data[i].province);
                    marks.push(data[i].totalGCase);
                }

                var new_cases = <?php echo json_encode($new_cases) ?>;
                var deaths = <?php echo json_encode($deaths) ?>;

                for(let i=0;i<name.length;i++) {
                    // if(simplemaps_canadamap_mapdata.state_specific.AB.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.AB.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.BC.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.BC.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.SK.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.SK.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.MB.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.MB.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.ON.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.ON.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.QC.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.QC.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.NB.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.NB.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.PE.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.PE.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.NS.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.NS.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.BC.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.NL.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.SK.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.NU.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.MB.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.NT.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                    //
                    // else if(simplemaps_canadamap_mapdata.state_specific.ON.name == name[i])
                    //     simplemaps_canadamap_mapdata.state_specific.YT.description = marks[i]+" Cases"+((new_cases[i]!=0)?" (+"+new_cases[i]+" today)":"")+"<br>"+deaths[i]+" deaths";
                }

                // simplemaps_canadamap.refresh();

                var chartdata = {
                    labels: name,
                    /*labels : ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island", "Northwest Territories", "Nunavut", "Yukon", "Repatriated Canadians"],*/
                    datasets: [
                        {
                            label: "Cases",
                            backgroundColor: "rgba(2,117,216,1)",
                            borderColor: "rgba(2,117,216,1)",
                            data: marks
                        }
                    ]
                };
                Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
                Chart.defaults.global.defaultFontColor = '#292b2c';

                var graphTarget = $("#myBarChart");

                var barGraph = new Chart(graphTarget, {
                    type: 'bar',
                    data: chartdata,
                    options: {
                    scales: {
                        xAxes: [{
                        time: {
                            unit: 'month'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 14
                        }
                        }],
                        yAxes: [{
                        ticks: {
                            min: 0,
                            maxTicksLimit: 10
                        },
                        gridLines: {
                            display: true
                        }
                        }],
                    },
                    legend: {
                        display: false
                    }
                    }
                });
            });
        }

        function showGraphArea()
        {

            var toShortFormat = function(dt){
                var month_names =["Jan","Feb","Mar",
                                    "Apr","May","Jun",
                                    "Jul","Aug","Sep",
                                    "Oct","Nov","Dec"];

                var day = dt.getDate();
                var month_index = dt.getMonth();
                var year = dt.getFullYear();

                return "" + month_names[month_index] + " " + day;
            };



            $.post("case_chart_area.php",
            function (data)
            {
                //console.log(data);
                var name = [];
                var marks = [];
                var sum = 0;
                for (var i in data) {
                    var ddate = data[i].date;
                    var cdate = toShortFormat(new Date(ddate));
                    name.push(cdate);

                    sum += parseInt(data[i].totalGCase);
                    marks.push(sum);
                }


                var chartdata = {
                    labels: name,
                    datasets: [
                        {
                            label: "Cases",
                            lineTension: 0.3,
                            backgroundColor: "rgba(2,117,216,0.2)",
                            borderColor: "rgba(2,117,216,1)",
                            pointRadius: 5,
                            pointBackgroundColor: "rgba(2,117,216,1)",
                            pointBorderColor: "rgba(255,255,255,0.8)",
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(2,117,216,1)",
                            pointHitRadius: 50,
                            pointBorderWidth: 2,
                            data: marks
                        }
                    ]
                };
                Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
                Chart.defaults.global.defaultFontColor = '#292b2c';

                var graphTarget = $("#myAreaChart");

                var barGraph = new Chart(graphTarget, {
                    type: 'line',
                    data: chartdata,
                    options: {
                        scales: {
                            xAxes: [{
                            time: {
                                unit: 'date'
                            },
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 7
                            }
                            }],
                            yAxes: [{
                            ticks: {
                                min: 0,
                                maxTicksLimit: 5
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, .125)",
                            }
                            }],
                        },
                        legend: {
                            display: false
                        }
                        }
                });
            });
        }

        function showGraphArea2()
        {

            var toShortFormat = function(dt){
                var month_names =["Jan","Feb","Mar",
                                    "Apr","May","Jun",
                                    "Jul","Aug","Sep",
                                    "Oct","Nov","Dec"];

                var day = dt.getDate();
                var month_index = dt.getMonth();
                var year = dt.getFullYear();

                return "" + month_names[month_index] + " " + day;
            };



            $.post("case_chart_area_2.php",
            function (data)
            {
                console.log(data);
                var name = [];
                var marks = [];
                var sum = 0;
                for (var i in data) {
                    var ddate = data[i].date;
                    var cdate = toShortFormat(new Date(ddate));
                    name.push(cdate);

                    num = parseInt(data[i].totalGCase);
                    marks.push(num);
                }


                var chartdata = {
                    labels: name,
                    datasets: [
                        {
                            label: "Cases",
                            lineTension: 0.3,
                            backgroundColor: "rgba(2,117,216,0.2)",
                            borderColor: "rgba(2,117,216,1)",
                            pointRadius: 5,
                            pointBackgroundColor: "rgba(2,117,216,1)",
                            pointBorderColor: "rgba(255,255,255,0.8)",
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(2,117,216,1)",
                            pointHitRadius: 50,
                            pointBorderWidth: 2,
                            data: marks
                        }
                    ]
                };
                Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
                Chart.defaults.global.defaultFontColor = '#292b2c';

                var graphTarget = $("#myAreaChart2");

                var barGraph = new Chart(graphTarget, {
                    type: 'line',
                    data: chartdata,
                    options: {
                        scales: {
                            xAxes: [{
                            time: {
                                unit: 'date'
                            },
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 7
                            }
                            }],
                            yAxes: [{
                            ticks: {
                                min: 0,
                                maxTicksLimit: 5
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, .125)",
                            }
                            }],
                        },
                        legend: {
                            display: false
                        }
                        }
                });
            });
        }



        </script>
    </body>
</html>
