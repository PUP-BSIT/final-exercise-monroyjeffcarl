<?php
$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'];
$date = $input['date'];
$sleepDuration = $input['sleep_duration'];
$expectedMood = $input['expected_mood'];
$actualMood = $input['actual_mood'];
$notes = $input['notes'];

$sql = "UPDATE moods SET date = ?, sleep_duration = ?, expected_mood = ?, actual_mood = ?, notes = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdsdssi", $date, $sleepDuration, $expectedMood, $actualMood, $notes, $id);
$result = $stmt->execute();

if ($result) {
    echo json_encode(['message' => 'Mood entry updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error updating mood entry']);
}
?>
