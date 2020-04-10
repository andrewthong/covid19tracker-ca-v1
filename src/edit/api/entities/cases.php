<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

class Cases
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // lastUpdated: gets when db was last updated
    public function lastUpdated()
    {
        $query = "SELECT `date` FROM `new_case` ORDER BY `id` DESC LIMIT 1";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetch(PDO::FETCH_ASSOC);

            $updatedDate = date("l, F d", strtotime($row['date']));
            $atDate = date("H:i", strtotime($row['date']));

            return "Updated " . $updatedDate . " at " . $atDate . "CST";
        }

        return "";
    }

    // totalCases: gets total cases
    public function totalCases()
    {
        $query = "SELECT COUNT(Distinct C.id) AS TotalCase, COUNT(Distinct D.id) AS TotalDeath FROM new_case C, new_death D";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetch(PDO::FETCH_ASSOC);

            return array(
                'cases' => $row['TotalCase'],
                'death' => $row['TotalDeath']
              );
        }

        return new stdClass();
    }

    // cumulativeCases: gets cumulativeCases
    public function cumulativeCases()
    {
        $query = "SELECT COUNT(id) as totalGCase, DATE_FORMAT(date, '%Y-%m-%d') as dte FROM `new_case` GROUP BY dte ORDER BY dte";

        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return array();
    }

    public function dailyCaseDeath(){
        $query = "SELECT C.province, COUNT(C.province) AS cases,(Select count(province) from new_death e where e.province = C.province and DATE_FORMAT(e.date, '%Y-%m-%d')=DATE_FORMAT(C.date, '%Y-%m-%d')) as deaths FROM new_case C where DATE_FORMAT(C.date, '%Y-%m-%d')=CURDATE() GROUP BY C.province ORDER BY cases DESC";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return array();

    }

    // dailyCases: gets daily cases
    public function dailyCases()
    {
        $query = "SELECT COUNT(id) as totalGCase, DATE_FORMAT(date, '%Y-%m-%d') as dte FROM new_case GROUP BY dte ORDER BY dte";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return array();
    }

    // casesByProvince: gets cases by the province
    public function casesByProvince()
    {
        $query = "SELECT COUNT(province) AS cases, province, source FROM new_case GROUP BY province, source ORDER BY cases DESC";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return array();
    }

    // totalCaseProvince gets sum of cases per province
    public function totalCaseProvince()
    {
        $query = "SELECT new_case.province, COUNT(new_case.province) AS cases, IFNULL(deaths, 0) AS deaths FROM `new_case` LEFT JOIN (SELECT new_death.province, COUNT(new_death.province) AS deaths FROM `new_death` GROUP BY `new_death`.`province`) AS `new_death` ON `new_case`.`province` = `new_death`.`province` GROUP BY `new_case`.`province` ORDER BY cases DESC";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return array();
    }

    // deathsByProvince: gets sum of deaths per province
    public function deathsByProvince()
    {
        $query = "SELECT COUNT(province) AS cases, province FROM new_death GROUP BY province ORDER BY cases DESC";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $data = array();
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $data[$row['province']] = $row['cases'];
            }
            return $data;
        }

        return new stdClass();
    }

    // individualCases: gets all cases
    public function individualCases( $offset = 0, $limit = 100 )
    {
        $query = "SELECT * , DATE_FORMAT(DATE, '%m/%d/%y') AS dte from `new_case` ORDER BY `id` DESC LIMIT {$limit} OFFSET {$offset}";

        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return array();
    }

    // getProvinceData: gets deaths + cases by province
    public function getProvinceData( $province, $offset = 0, $limit = 100 )
    {
        $query_cases = "SELECT SQL_CALC_FOUND_ROWS *, DATE_FORMAT(`date`, '%Y-%m-%d') AS dte FROM new_case C where C.province = '{$province}' ORDER BY `id` DESC LIMIT {$limit} OFFSET {$offset}";
        $query_deaths = "SELECT SQL_CALC_FOUND_ROWS *, DATE_FORMAT(`date`, '%Y-%m-%d') AS dte FROM new_death D where D.province = '{$province}' ORDER BY `id` DESC LIMIT {$limit} OFFSET {$offset}";

        $result_cases = $this->getQry($query_cases);
        $result_cases_total = $this->getQry("SELECT FOUND_ROWS()");
        $result_deaths = $this->getQry($query_deaths);
        $result_deaths_total = $this->getQry("SELECT FOUND_ROWS()");

        // setup response
        $data = array(
            'total_cases' => 0,
            'total_deaths' => 0,
        );

        // found rows
        $data['total_cases'] = $result_cases_total->fetchColumn();
        $data['total_deaths'] = $result_deaths_total->fetchColumn();

        if ($result_cases->rowCount() > 0) {
            $row = $result_cases->fetchAll(PDO::FETCH_ASSOC);
            $data['cases'] = $row;
        }

        if ($result_deaths->rowCount() > 0) {
            $row = $result_deaths->fetchAll(PDO::FETCH_ASSOC);
            $data['deaths'] = $row;
        }

        return $data;
    }

    // getProvinceCaseByDay: gets the cases per day for province
    public function getProvinceCaseByDay($province)
    {
        $query = "SELECT COUNT(id) as totalGCase, DATE_FORMAT(date, '%Y-%m-%d') as dte FROM new_case WHERE province = '" . $province . "' GROUP BY dte ORDER BY dte";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return array();
    }

    // getProvinceCumulativeCases: gets cumulative for province
    public function getProvinceCumulativeCases($province)
    {
        $query = "SELECT COUNT(id) as totalGCase, DATE_FORMAT(date, '%Y-%m-%d') as dte FROM `new_case` WHERE province = '" . $province . "' GROUP BY dte ORDER BY dte";

        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return array();
    }

    // getQry: executes the query
    public function getQry($query)
    {
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        } catch (PDOException $e) {
            echo 'ERROR!';
            print_r($e);
        }
    }
}
