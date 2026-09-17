<?php
require_once __DIR__ . '/../../config.php';

function start_admin_session(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_name(ADMIN_SESSION_NAME);
        session_start();
    }
}

function is_logged_in(): bool
{
    start_admin_session();
    return !empty($_SESSION['admin_id']);
}

/** Call at the top of any admin page that requires a logged-in session. */
function require_login(): void
{
    if (!is_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function current_admin_username(): ?string
{
    start_admin_session();
    return $_SESSION['admin_username'] ?? null;
}

function csrf_token(): string
{
    start_admin_session();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf(?string $token): bool
{
    start_admin_session();
    return !empty($token) && !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
