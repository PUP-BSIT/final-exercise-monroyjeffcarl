CREATE TABLE moods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    sleep_duration DECIMAL(5, 2) NOT NULL,
    expected_mood VARCHAR(20) NOT NULL,
    actual_mood VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);