<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include 'config.php';

$sql = "SELECT * FROM position";
$result = $conn->query($sql);

$positions = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $positions[] = $row;
    }
}

echo json_encode($positions);
$conn->close();
?>