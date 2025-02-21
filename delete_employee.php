<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php';

$employee_id = $_POST['employee_id'];

$sql = "DELETE FROM employee WHERE employee_id = $employee_id";

if ($conn->query($sql)) {
    echo json_encode(["message" => "Employee deleted successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>