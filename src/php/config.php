<?php
$host = 'localhost';
$user = "mysql";
$pass = "mysql";
$db = "newsapp";
      //Open a new connection to the MySQL server
$mysqli = new mysqli($host, $user, $pass, $db);

//Output any connection error
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}

?>
