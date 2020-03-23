<?php


class Database
{
    private $host;
    private $username;
    private $password;
    private $db_name;

    public $conn;

    public function getConnection($config)
    {
        $this->host = $config->host;
        $this->username = $config->username;
        $this->password = $config->password;
        $this->db_name = $config->db_name;
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
