<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

class Locations
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getLocations()
    {
        $query = "SELECT * FROM locations";
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
