<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include 'config.php';

$employee_id = $_GET['id'];

$sql = "SELECT * FROM employee WHERE employee_id = $employee_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo "Employee not found";
}

$conn->close();
?>