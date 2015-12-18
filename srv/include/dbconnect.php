<?php
class dbconnect
{
    public function Connect()
    {
        require_once '../srv/include/config.php';

        /*
         * finally return a connection
         */

        $pdo = new PDO(DB_HOST_PDO, DB_USERNAME, DB_PASSWORD);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }
}
?>