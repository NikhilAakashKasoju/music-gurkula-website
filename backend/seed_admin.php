<?php
/**
 * One-time helper to create (or reset) an admin dashboard user.
 *
 * Usage (from the backend/ folder):
 *   php seed_admin.php <username> <password>
 *
 * Run this from the command line only — it is not reachable over HTTP.
 * Delete it, or move it outside the web root, once you've created your
 * admin account(s).
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('This script can only be run from the command line.');
}

require_once __DIR__ . '/db.php';

$username = $argv[1] ?? null;
$password = $argv[2] ?? null;

if (!$username || !$password) {
    fwrite(STDERR, "Usage: php seed_admin.php <username> <password>\n");
    exit(1);
}

if (strlen($password) < 8) {
    fwrite(STDERR, "Please choose a password with at least 8 characters.\n");
    exit(1);
}

$pdo = get_db();
$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare(
    'INSERT INTO admin_users (username, password_hash)
     VALUES (:username, :hash)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)'
);
$stmt->execute([':username' => $username, ':hash' => $hash]);

echo "Admin user '{$username}' is ready.\n";
