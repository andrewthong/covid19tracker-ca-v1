<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

class Cases {
  private $conn;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function lastUpdated() {
    $query = "SELECT `date` FROM `new_case` ORDER BY `id` DESC LIMIT 1";
    $result = $this->getQry($query);

    if($result->rowCount() > 0) {
      $row = $result->fetch(PDO::FETCH_ASSOC);

      $updatedDate = date("l, F d", strtotime($row['date']));
      $atDate = date("H:i", strtotime($row['date']));

      return "Updated " . $updatedDate . " at " . $atDate . "CST";
    }

    return "";

  }

  public function totalCases() {
    $query = "SELECT COUNT(Distinct C.id) AS TotalCase, COUNT(Distinct D.id) AS TotalDeath FROM new_case C, new_death D";
    $result = $this->getQry($query);

    if($result->rowCount() > 0) {
      $row = $result->fetch(PDO::FETCH_ASSOC);

      return array(
        'cases' => $row['TotalCase'],
        'death' => $row['TotalDeath']
      );
    }

    return "";

  }

  public function cumulativeCases(){
    $query = "SELECT COUNT(id) as totalGCase, DATE_FORMAT(date, '%Y-%m-%d') as dte FROM `new_case` GROUP BY dte ORDER BY dte";

    $result = $this->getQry($query);

    if($result->rowCount() > 0) {
      $row = $result->fetchAll(PDO::FETCH_ASSOC);
      return $row;
    }

    return "";
  }

  public function dailyCases(){
    $query = "SELECT COUNT(id) as totalGCase, DATE_FORMAT(date, '%Y-%m-%d') as dte FROM new_case GROUP BY dte ORDER BY dte";
    $result = $this->getQry($query);

    if($result->rowCount() > 0) {
      $row = $result->fetchAll(PDO::FETCH_ASSOC);
      return $row;
    }

    return "";
  }

  public function casesByProvince(){
    $query = "SELECT COUNT(province) AS cases, province, source FROM new_case GROUP BY province ORDER BY cases DESC";
    $result = $this->getQry($query);

    if($result->rowCount() > 0) {
      $row = $result->fetchAll(PDO::FETCH_ASSOC);
      return $row;
    }

    return "";
  }

  public function deathsByProvince(){
    $query = "SELECT COUNT(province) AS cases, province FROM new_death GROUP BY province ORDER BY cases DESC";
    $result = $this->getQry($query);

    if($result->rowCount() > 0) {
      $data = array();
      while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[$row['province']] = $row['cases'];
      }
      return $data;
    }

    return "";
  }

  public function totalCasesByProvince(){
    $query = "SELECT id FROM `new_case` WHERE date LIKE '%".date('Y-m-d')."%'";

    $result = $this->getQry($query);

    if($result->rowCount() > 0) {
      $row = $result->fetchAll(PDO::FETCH_ASSOC);
      return $row;
    }

    return "";
  }

  public function individualCases(){
    $query = "SELECT * , DATE_FORMAT(DATE, '%m/%d/%y') AS dte from `new_case` ";

    $result = $this->getQry($query);

    if($result->rowCount() > 0) {
      $row = $result->fetchAll(PDO::FETCH_ASSOC);
      return $row;
    }

    return "";
  }



  public function getQry($query){
    try {
      $stmt = $this->conn->prepare($query);
      $stmt->execute();

      return $stmt;
    } catch(PDOException $e){
        echo 'ERROR!';
        print_r($e);
    }
  }

}


?>
