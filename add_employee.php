<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include 'config.php';

$employee_name = $_POST['employee_name'];
$department_id = $_POST['department_id'];
$position_id = $_POST['position_id'];

$sql = "INSERT INTO employee (employee_name, department_id, position_id) 
        VALUES ('$employee_name', $department_id, $position_id)";

if ($conn->query($sql) === TRUE) {
    echo "Employee added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>