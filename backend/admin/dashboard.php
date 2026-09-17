<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../db.php';

require_login();
$pdo = get_db();

// --- Filters --------------------------------------------------------

$activePath = $_GET['path'] ?? 'all';
$knownPaths = array_keys(PROGRAM_PATHS);
if ($activePath !== 'all' && !in_array($activePath, $knownPaths, true)) {
    $activePath = 'all';
}

$activeStatus = $_GET['status'] ?? 'all';
$allowedStatuses = ['all', 'new', 'contacted', 'enrolled', 'closed'];
if (!in_array($activeStatus, $allowedStatuses, true)) {
    $activeStatus = 'all';
}

$search = trim((string) ($_GET['q'] ?? ''));
$page = max(1, (int) ($_GET['page'] ?? 1));
$perPage = 25;

// --- Counts per path, for the tab badges -----------------------------

$countStmt = $pdo->query('SELECT path_slug, COUNT(*) AS c FROM enquiries GROUP BY path_slug');
$countsByPath = array_fill_keys($knownPaths, 0);
$totalCount = 0;
foreach ($countStmt->fetchAll() as $row) {
    if (isset($countsByPath[$row['path_slug']])) {
        $countsByPath[$row['path_slug']] = (int) $row['c'];
    }
    $totalCount += (int) $row['c'];
}

$newCountStmt = $pdo->query("SELECT COUNT(*) AS c FROM enquiries WHERE status = 'new'");
$newCount = (int) $newCountStmt->fetch()['c'];

// --- Build the filtered query -----------------------------------------

$where = [];
$params = [];

if ($activePath !== 'all') {
    $where[] = 'path_slug = :path';
    $params[':path'] = $activePath;
}

if ($activeStatus !== 'all') {
    $where[] = 'status = :status';
    $params[':status'] = $activeStatus;
}

if ($search !== '') {
    $where[] = '(name LIKE :q OR phone LIKE :q OR email LIKE :q)';
    $params[':q'] = '%' . $search . '%';
}

$whereSql = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

$totalFilteredStmt = $pdo->prepare("SELECT COUNT(*) AS c FROM enquiries $whereSql");
$totalFilteredStmt->execute($params);
$totalFiltered = (int) $totalFilteredStmt->fetch()['c'];
$totalPages = max(1, (int) ceil($totalFiltered / $perPage));
$page = min($page, $totalPages);
$offset = ($page - 1) * $perPage;

$listStmt = $pdo->prepare(
    "SELECT * FROM enquiries $whereSql ORDER BY created_at DESC LIMIT :limit OFFSET :offset"
);
foreach ($params as $key => $value) {
    $listStmt->bindValue($key, $value);
}
$listStmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
$listStmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$listStmt->execute();
$enquiries = $listStmt->fetchAll();

function build_url(array $overrides): string
{
    $current = [
        'path' => $_GET['path'] ?? 'all',
        'status' => $_GET['status'] ?? 'all',
        'q' => $_GET['q'] ?? '',
        'page' => $_GET['page'] ?? 1,
    ];
    $merged = array_merge($current, $overrides);
    $merged = array_filter($merged, fn ($v) => $v !== '' && $v !== 'all' && $v != 1);
    return 'dashboard.php' . ($merged ? '?' . http_build_query($merged) : '');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Enquiries — Music Gurukula admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<div class="mg-shell">
  <div class="mg-topbar">
    <div class="mg-brand">
      <span class="mg-brand-badge">♪</span>
      <span class="mg-brand-name">Music <em>Gurukula</em> · Admin</span>
    </div>
    <div class="mg-topbar-user">
      <span>Signed in as <?= htmlspecialchars(current_admin_username() ?? '') ?></span>
      <a href="logout.php">Log out</a>
    </div>
  </div>

  <div class="mg-main">
    <h1 class="mg-page-title">Enquiries</h1>
    <p class="mg-page-subtitle">
      Every enquiry from the website is auto-segregated by program of interest.
    </p>

    <div class="mg-stats">
      <div class="mg-stat-card">
        <div class="mg-stat-value"><?= (int) $totalCount ?></div>
        <div class="mg-stat-label">Total enquiries</div>
      </div>
      <div class="mg-stat-card">
        <div class="mg-stat-value"><?= (int) $newCount ?></div>
        <div class="mg-stat-label">New, unactioned</div>
      </div>
      <?php foreach (PROGRAM_PATHS as $slug => $label): if ($slug === 'general') continue; ?>
      <div class="mg-stat-card">
        <div class="mg-stat-value"><?= (int) $countsByPath[$slug] ?></div>
        <div class="mg-stat-label"><?= htmlspecialchars($label) ?></div>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="mg-tabs">
      <a class="mg-tab <?= $activePath === 'all' ? 'active' : '' ?>" href="<?= build_url(['path' => 'all', 'page' => 1]) ?>">
        All <span class="count"><?= (int) $totalCount ?></span>
      </a>
      <?php foreach (PROGRAM_PATHS as $slug => $label): ?>
      <a class="mg-tab <?= $activePath === $slug ? 'active' : '' ?>" href="<?= build_url(['path' => $slug, 'page' => 1]) ?>">
        <?= htmlspecialchars($label) ?> <span class="count"><?= (int) $countsByPath[$slug] ?></span>
      </a>
      <?php endforeach; ?>
    </div>

    <form class="mg-toolbar" method="get">
      <?php if ($activePath !== 'all'): ?>
        <input type="hidden" name="path" value="<?= htmlspecialchars($activePath) ?>">
      <?php endif; ?>
      <input type="search" name="q" placeholder="Search name, phone, email…" value="<?= htmlspecialchars($search) ?>">
      <select name="status">
        <option value="all" <?= $activeStatus === 'all' ? 'selected' : '' ?>>All statuses</option>
        <option value="new" <?= $activeStatus === 'new' ? 'selected' : '' ?>>New</option>
        <option value="contacted" <?= $activeStatus === 'contacted' ? 'selected' : '' ?>>Contacted</option>
        <option value="enrolled" <?= $activeStatus === 'enrolled' ? 'selected' : '' ?>>Enrolled</option>
        <option value="closed" <?= $activeStatus === 'closed' ? 'selected' : '' ?>>Closed</option>
      </select>
      <button type="submit" class="mg-btn" style="background:#eee;">Filter</button>
      <?php if ($search !== '' || $activeStatus !== 'all'): ?>
        <a class="mg-btn" style="background:#eee;" href="<?= build_url(['q' => '', 'status' => 'all', 'page' => 1]) ?>">Clear</a>
      <?php endif; ?>
    </form>

    <div class="mg-table-wrap">
      <?php if (empty($enquiries)): ?>
        <div class="mg-empty">No enquiries match these filters yet.</div>
      <?php else: ?>
      <table class="mg-table">
        <thead>
          <tr>
            <th>Received</th>
            <th>Student / contact</th>
            <th>Program</th>
            <th>Timing &amp; notes</th>
            <th>Source</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($enquiries as $row): ?>
          <tr>
            <td class="mg-muted">
              <?= htmlspecialchars(date('d M Y', strtotime($row['created_at']))) ?><br>
              <?= htmlspecialchars(date('h:i A', strtotime($row['created_at']))) ?>
            </td>
            <td>
              <strong><?= htmlspecialchars($row['name']) ?></strong><br>
              <span class="mg-muted"><?= htmlspecialchars($row['phone']) ?></span>
              <?php if (!empty($row['email'])): ?>
                <br><span class="mg-muted"><?= htmlspecialchars($row['email']) ?></span>
              <?php endif; ?>
            </td>
            <td>
              <span class="mg-badge mg-badge-<?= htmlspecialchars($row['path_slug']) ?>">
                <?= htmlspecialchars(path_label($row['path_slug'])) ?>
              </span>
            </td>
            <td style="max-width:240px;">
              <?php if (!empty($row['preferred_timing'])): ?>
                <div><?= htmlspecialchars($row['preferred_timing']) ?></div>
              <?php endif; ?>
              <?php if (!empty($row['message'])): ?>
                <div class="mg-muted"><?= nl2br(htmlspecialchars($row['message'])) ?></div>
              <?php endif; ?>
            </td>
            <td class="mg-muted"><?= htmlspecialchars($row['source']) ?></td>
            <td>
              <select class="mg-status-select" data-id="<?= (int) $row['id'] ?>" onchange="updateStatus(this)">
                <?php foreach (['new', 'contacted', 'enrolled', 'closed'] as $s): ?>
                  <option value="<?= $s ?>" <?= $row['status'] === $s ? 'selected' : '' ?>><?= ucfirst($s) ?></option>
                <?php endforeach; ?>
              </select>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
      <?php endif; ?>
    </div>

    <?php if ($totalPages > 1): ?>
    <div class="mg-pagination">
      <?php for ($p = 1; $p <= $totalPages; $p++): ?>
        <a class="<?= $p === $page ? 'active' : '' ?>" href="<?= build_url(['page' => $p]) ?>"><?= $p ?></a>
      <?php endfor; ?>
    </div>
    <?php endif; ?>
  </div>
</div>

<script>
const CSRF_TOKEN = <?= json_encode(csrf_token()) ?>;

async function updateStatus(select) {
  const id = select.dataset.id;
  const status = select.value;
  select.disabled = true;
  try {
    const res = await fetch('update_status.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, csrf_token: CSRF_TOKEN }),
    });
    const data = await res.json();
    if (!data.success) {
      alert(data.message || 'Could not update status.');
    }
  } catch (e) {
    alert('Could not reach the server.');
  } finally {
    select.disabled = false;
  }
}
</script>
</body>
</html>
