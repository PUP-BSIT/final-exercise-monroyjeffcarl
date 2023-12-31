<?php
$input = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO mood_entries (date, sleep_duration, expected_mood, actual_mood, notes) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdsss", 
    $input['date'],
    $input['sleep_duration'],
    $input['expected_mood'],
    $input['actual_mood'],
    $input['notes']
);
$result = $stmt->execute();

if ($result) {
    echo json_encode(['message' => 'Mood entry created successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error creating mood entry']);
}
?>
