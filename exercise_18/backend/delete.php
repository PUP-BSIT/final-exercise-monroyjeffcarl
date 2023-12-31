<?php
$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'];

$sql = "DELETE FROM mood_entries WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$result = $stmt->execute();

if ($result) {
    echo json_encode(['message' => 'Mood entry deleted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error deleting mood entry']);
}
?>
