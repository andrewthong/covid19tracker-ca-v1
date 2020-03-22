<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'agulbs');
define('DB_PASS', 'alek07652');
define('DB_SCHEMA', 'ausrwmfh_database');

class Database
{
   private $host = "localhost";
   private $username = "agulbs";
   private $password = "alek07652";
   private $db_name = "ausrwmfh_database";

   public $conn;

   public function getConnection()
   {
       $this->conn = null;

       try {
           $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
           $this->conn->exec("set names utf8");
       } catch (PDOException $exception) {
           echo "Connection error: " . $exception->getMessage();
       }

       return $this->conn;
   }
}

?>
