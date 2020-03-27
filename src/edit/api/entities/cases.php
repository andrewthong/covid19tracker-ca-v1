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

        return "";
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

        return "";
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

        return "";
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

        return "";
    }

    // totalCaseProvince gets sum of cases per province
    public function totalCaseProvince()
    {
        $query = "SELECT C.province, COUNT(C.province) AS cases,(Select count(province) from new_death e where e.province = C.province) as deaths, C.source FROM new_case C GROUP BY C.province ORDER BY cases DESC";
        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return "";
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

        return "";
    }

    // individualCases: gets all cases
    public function individualCases()
    {
        $query = "SELECT * , DATE_FORMAT(DATE, '%m/%d/%y') AS dte from `new_case` ";

        $result = $this->getQry($query);

        if ($result->rowCount() > 0) {
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }

        return "";
    }

    // getProvinceData: gets deaths + cases by province
    public function getProvinceData($province)
    {
        $query_cases = "SELECT *, DATE_FORMAT(`date`, '%Y-%m-%d') AS dte FROM new_case C where C.province = '" . $province . "'";
        $query_deaths = "SELECT *, DATE_FORMAT(`date`, '%Y-%m-%d') AS dte FROM new_death D where D.province = '" . $province . "'";

        $result_cases = $this->getQry($query_cases);
        $result_deaths = $this->getQry($query_deaths);

        $data = array();

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

        return "";
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

        return "";
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
