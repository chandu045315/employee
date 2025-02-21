<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include 'config.php';

$sql = "SELECT e.employee_id, e.employee_name, d.department_name, p.position_name 
        FROM employee e
        JOIN department d ON e.department_id = d.department_id
        JOIN position p ON e.position_id = p.position_id";
$result = $conn->query($sql);

$employees = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
}

echo json_encode($employees);
$conn->close();
?>