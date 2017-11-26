<?php
session_start();

require_once('authenticate.php');

header("Content-type: application/json");
print(json_encode("This is my secret!"));
exit();
