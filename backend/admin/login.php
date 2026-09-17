<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/../db.php';

start_admin_session();

if (is_logged_in()) {
    header('Location: dashboard.php');
    exit;
}

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim((string) ($_POST['username'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        $error = 'Please enter your username and password.';
    } else {
        $pdo = get_db();
        $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = :username LIMIT 1');
        $stmt->execute([':username' => $username]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            header('Location: dashboard.php');
            exit;
        }

        $error = 'Incorrect username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin login — Music Gurukula</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<div class="mg-login-shell">
  <div class="mg-login-card">
    <div class="mg-brand">
      <span class="mg-brand-badge">♪</span>
      <span class="mg-brand-name">Music <em>Gurukula</em></span>
    </div>
    <h1>Admin dashboard</h1>
    <p class="mg-subtitle">Sign in to view and manage enquiries.</p>

    <?php if ($error): ?>
      <div class="mg-alert"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form method="post" novalidate>
      <div class="mg-field">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" autocomplete="username" required>
      </div>
      <div class="mg-field">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" autocomplete="current-password" required>
      </div>
      <button type="submit" class="mg-btn mg-btn-primary">Sign in</button>
    </form>
  </div>
</div>
</body>
</html>
