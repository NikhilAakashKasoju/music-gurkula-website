<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../db.php';

require_login();
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$body = json_decode(file_get_contents('php://input'), true) ?: $_POST;

if (!verify_csrf($body['csrf_token'] ?? null)) {
    json_response(['success' => false, 'message' => 'Session expired, please reload the page.'], 403);
}

$id = (int) ($body['id'] ?? 0);
$status = (string) ($body['status'] ?? '');
$allowedStatuses = ['new', 'contacted', 'enrolled', 'closed'];

if ($id <= 0 || !in_array($status, $allowedStatuses, true)) {
    json_response(['success' => false, 'message' => 'Invalid request.'], 422);
}

$pdo = get_db();
$stmt = $pdo->prepare('UPDATE enquiries SET status = :status WHERE id = :id');
$stmt->execute([':status' => $status, ':id' => $id]);

json_response(['success' => true]);
