<?php

  $translations = array(
    'covid-19-tracker' => array(
      'fr' => 'Algorithme de suivi de la COVID-19 Canada',
      'en' => 'COVID-19 Tracker Canada'
    ),
    'updated' => array(
      'fr' => 'Mis à jour',
      'en' => 'Updated'
    ),
    'think-you-might-have' => array(
      'fr' => '<b>Vous pensez avoir contracté la COVID-19?</b><br>  Composez le <i>811</i> ou le <i>1-866-797-0000</i> si vous résidez en Ontario',
      'en' => '<b>Think you may have COVID-19?</b><br> Call <i>811</i> or <i>1-866-797-0000</i> in Ontario'
    ),
    'self-assess' => array(
      'fr' => 'Démarrer l’auto-évaluation COVID-19',
      'en' => 'Launch COVID-19 Self Assessment'
    ),
    'outside-canada' => array(
      'fr' => 'Vous êtes présentement à l’extérieur du Canada? Voici ce que vous devez savoir',
      'en' => "Currently Outside of Canada? Here's what you need to know"
    ),
    'gov-instructions' => array(
      'fr' => 'Directives du Gouvernement du Canada',
      'en' => 'Instructions from the Government of Canada'
    ),
    'be-prepared' => array(
      'fr' => 'Soyez prêts',
      'en' => 'Be Prepared'
    ),
    'learn-more' => array(
      'fr' => 'En apprendre plus au sujet de la COVID-19',
      'en' => 'Learn more about COVID-19'
    ),
    'canada-cumulative' => array(
      'fr' => 'Cas cumulatifs au Canada',
      'en' => 'Canada Cumulative Cases'
    ),
    'deaths' => array(
      'fr' => 'Décès',
      'en' => 'Deaths'
    ),
    'by-province' => array(
      'fr' => 'Par Province',
      'en' => 'By Province'
    ),
    'total-by-province' => array(
      'fr' => 'Nombre de cas total par province',
      'en' => 'Total Cases By Province'
    ),
    'source' => array(
      'fr' => 'Source',
      'en' => 'Source'
    ),
    'individual-cases' => array(
      'fr' => 'Cas individuels',
      'en' => 'Individual Cases'
    ),
    'travel-history' => array(
      'fr' => 'Historique de voyage',
      'en' => 'Travel History'
    ),
    'age' => array(
      'fr' => 'Âge',
      'en' => 'Age'
    ),
    'city' => array(
      'fr' => 'Ville',
      'en' => 'City'
    ),
    'date' => array(
      'fr' => 'Date',
      'en' => 'Date'
    ),
    'patient-no' => array(
      'fr' => 'Numéro de patient',
      'en' => 'Patient #'
    ),
    'confirmed-presumptive' => array(
      'fr' => 'Confirmé/présumé',
      'en' => 'Confirmed/Presumptive'
    ),
    'mar-17-text' => array(
      'fr' => '*Le 17 mars, le nombre total de cas par région a été annoncé en Colombie Britannique bien qu’aucun détail régional n’ait été fourni le 16 mars; par conséquent, bien que le nombre total de cas rapporté pour chaque région de la Colombie Britannique est exact pour la période du 16 au 17 mars, il est impossible ce confirmer le nombre de cas par région par jour pour cette période. Ces chiffres relèvent donc purement de la spéculation.',
      'en' => '*On March 17th, region totals were announced in BC after no region details were provided on March 16th; therefore, while the totals for each BC region reported are accurate over March 16th and 17th, regions per day cannot be confirmed and as such are purely speculative.'
    ),
    'mar-24-text' => array(
      'fr' => '**Le 24 mars, le nombre total de cas par région du Québec a été mis à jour suite à une modification dans la manière de classifier les cas en attente de confirmation et les cas de non-résidents; puisqu’il est impossible de savoir de quelle région proviennent ces cas, le nombre total de cas par région du Québec pour le 24 mars relève donc purement de la spéculation.',
      'en' => '**On March 24th, region totals were updated in Quebec that reassigned previous pending and non-resident cases; as it is impossible to know where each specific case was reassigned, regions from Quebec cases on March 24th cannot be verified and as such are purely speculative.'
    ),
    'doing-research' => array(
      'fr' => 'Vous faites de la recherche ou avez besoin des données brutes?',
      'en' => 'Doing research or need the raw data?'
    ),
    'request-data' => array(
      'fr' => 'Demander les données',
      'en' => 'Request Data'
    ),
    'copyright' => array(
      'fr' => 'Droits d’auteur © COVID19Tracker.ca 2020 // COVID19Tracker.ca rapporte les cas présumés et les cas confirmés de la COVID-19 en temps quasi-réel // contact@covid19tracker.ca',
      'en' => 'Copyright © COVID19Tracker.ca 2020 // COVID19Tracker.ca reports both presumptive and confirmed cases in near real-time // contact@covid19tracker.ca'
    )
  );


  $current_language = 'en';
  if(isset($_GET['lang']) && $_GET['lang']=='fr') {
    $current_language = 'fr';
  }

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title><?php echo $translations['covid-19-tracker'][$current_language]; ?></title>

    <link href="css/styles.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.0/moment.min.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@turf/turf@5.1.6/turf.min.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css" rel="stylesheet" />
    <script src="assets/demo/datatables-demo.js"></script>
    <script type="text/javascript" src="js/mapbox_map.js"></script>
    <script type="text/javascript" src="js/drawChart.js"></script>
    <script type="text/javascript" src="js/state.js"></script>
    <script type="text/javascript" src="js/config.js"></script>


    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-160029240-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-160029240-1');
    </script>
</head>

<body class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="index.html"><?php echo $translations['covid-19-tracker'][$current_language]; ?></a>
    </nav>
    <div class="sb-sidenav-footer">
    </div>
    <div id="layoutSidenav_content">
        <main id="mainData">
            <div class="container-fluid">
                <br>
                <br>
                <h2 class="mt-4" id="updateTime"></h2>
                <br>
                <div class="row">

                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-danger text-white mb-4">
                            <div class="card-body"><?php echo $translations['think-you-might-have'][$current_language]; ?></div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="https://public.ehealthsask.ca/sites/COVID-19/"><?php echo $translations['self-assess'][$current_language]; ?></a>
                                <div class="small text-white"><svg class="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                                    </svg><!-- <i class="fas fa-angle-right"></i> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-primary text-white mb-4">
                            <div class="card-body"><?php echo $translations['outside-canada'][$current_language]; ?></div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/latest-travel-health-advice.html"><?php echo $translations['gov-instructions'][$current_language]; ?></a>
                                <div class="small text-white"><svg class="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                                    </svg><!-- <i class="fas fa-angle-right"></i> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-primary text-white mb-4">
                            <div class="card-body"><b><?php echo $translations['be-prepared'][$current_language]; ?></b><br><?php echo $translations['learn-more'][$current_language]; ?></div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/being-prepared.html"><?php echo $translations['learn-more'][$current_language]; ?></a>
                                <div class="small text-white"><svg class="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                                    </svg><!-- <i class="fas fa-angle-right"></i> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <br>
                <div class="row">
                    <div class="col-xl-6" id="displayMap">
                        <div class="card mb-4">
                            <div class="card-header"><i class="fas fa-chart-bar mr-1"></i><?php echo $translations['by-map'][$current_language]; ?></div>
                            <div class="card-body" style="padding:0px;">
                                <div id="map"></div>
                                <div id="map-overlay"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6" id="displayCumulative">
                        <div class="card mb-4">
                            <div class="card-header"><i class="fas fa-chart-area mr-1"></i><?php echo $translations['canada-cumulative'][$current_language]; ?>: <i><b><span id="totalCases"></span><?php echo $translations['cases'][$current_language]; ?> / <span id="totalDeath"></span> <?php echo $translations['deaths'][$current_language]; ?></b></i></div>
                            <div class="card-body"><canvas id="cumulativeCaseChart" width="100%"></canvas></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-6">
                        <div class="card mb-4">
                            <div class="card-header"><i class="fas fa-chart-area mr-1"></i><span id="newCasesByDay"><?php echo $translations['canada-new'][$current_language]; ?></span></div>
                            <div class="card-body" id="dailyCaseChartDiv"><canvas id="dailyCaseChart" width="100%" height="40"></canvas></div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="card mb-4">
                            <div class="card-header"><i class="fas fa-chart-bar mr-1"></i><span id="newCasesByProvince"><?php echo $translations['by-province'][$current_language]; ?></span></div>
                            <div class="card-body" id="provinceCasesChartDiv"><canvas id="provinceCasesChart" width="100%" height="40"></canvas></div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary" onClick="goAdvanced()">Advanced</button>

                <br>
                <br>
                <div class="card mb-4">
                    <div class="card-header"><i class="fas fa-table mr-1"></i><?php echo $translations['total-by-province'][$current_language]; ?></div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable1" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Province</th>
                                        <th><?php echo $translations['total-cases'][$current_language]; ?></th>
                                        <th>Infected per 100 000</th>
                                        <th><?php echo $translations['deaths'][$current_language]; ?></th>
                                        <th><?php echo $translations['source'][$current_language]; ?></th>
                                    </tr>
                                </thead>
                                <tfoot>

                                    <tr>
                                        <td><i><b>Canada</b></i></td>
                                        <td><i><b id="totalCasesCanada"></i></b></td>
                                        </b></i></td>
                                        <td>
                                            <b id="infectedPerCanada"></b>

                                        </td>
                                        <td><i><b class="death_total"></b></i></td>
                                        <td><a href="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection.html">Source</a></td>
                                    </tr>
                                </tfoot>
                                <tbody id="totalCasesProvinceTable">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-header"><i class="fas fa-table mr-1"></i><?php echo $translations['individual-cases'][$current_language]; ?></div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="individualCaseTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th><?php echo $translations['patient-no'][$current_language]; ?></th>
                                        <th><?php echo $translations['date'][$current_language]; ?></th>
                                        <th>Province</th>
                                        <th><?php echo $translations['city'][$current_language]; ?></th>
                                        <th><?php echo $translations['age'][$current_language]; ?></th>
                                        <th><?php echo $translations['travel-history'][$current_language]; ?></th>
                                        <th><?php echo $translations['confirmed-presumptive'][$current_language]; ?></th>
                                        <th><?php echo $translations['source'][$current_language]; ?></th>
                                    </tr>
                                </thead>

                                <tfoot>
                                    <tr>
                                        <th><?php echo $translations['patient-no'][$current_language]; ?></th>
                                        <th><?php echo $translations['date'][$current_language]; ?></th>
                                        <th>Province</th>
                                        <th><?php echo $translations['city'][$current_language]; ?></th>
                                        <th><?php echo $translations['age'][$current_language]; ?></th>
                                        <th><?php echo $translations['travel-history'][$current_language]; ?></th>
                                        <th><?php echo $translations['confirmed-presumptive'][$current_language]; ?></th>
                                        <th><?php echo $translations['source'][$current_language]; ?></th>
                                    </tr>
                                </tfoot>
                                <tbody>

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
                    <div class="text-muted"><?php echo $translations['copyright'][$current_language]; ?></div>

                </div>
            </div>
        </footer>
    </div>
    </div>



</html>
