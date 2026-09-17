<?php
/**
 * POST /api/enquiries.php
 *
 * Receives an enquiry from the Next.js frontend (the homepage general
 * enquiry form, or a program page's "ask about this program" form),
 * auto-segregates it into a program path, and stores it for the admin
 * dashboard.
 *
 * Expected JSON body:
 * {
 *   "name": "Priya S.",
 *   "phone": "+91 90000 00000",
 *   "email": "priya@example.com",           // optional
 *   "program_of_interest": "hindustani-tabla", // slug, or "general"
 *   "preferred_timing": "Weekday evenings",  // optional
 *   "message": "...",                        // optional
 *   "source": "home_contact_form"            // or "program_page:<slug>"
 * }
 */

require_once __DIR__ . '/../includes/cors.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../db.php';

apply_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    // Also accept classic form-encoded submissions as a fallback.
    $data = $_POST;
}

$name = clean_str($data['name'] ?? null, 150);
$phone = clean_str($data['phone'] ?? null, 30);
$email = clean_str($data['email'] ?? null, 150);
$programRaw = clean_str($data['program_of_interest'] ?? null, 100);
$timing = clean_str($data['preferred_timing'] ?? null, 150);
$message = clean_str($data['message'] ?? null, 2000);
$source = clean_str($data['source'] ?? null, 100) ?? 'unknown';

$errors = [];

if ($name === null) {
    $errors[] = 'Please share your name.';
}
if ($phone === null) {
    $errors[] = 'Please share a phone or WhatsApp number.';
}
if (!is_valid_email($email)) {
    $errors[] = 'That email address doesn\'t look right.';
}

if (!empty($errors)) {
    json_response(['success' => false, 'message' => implode(' ', $errors)], 422);
}

$pathSlug = resolve_path_slug($programRaw);

$pdo = get_db();

try {
    $stmt = $pdo->prepare(
        'INSERT INTO enquiries
            (name, phone, email, program_of_interest, path_slug, preferred_timing, message, source)
         VALUES
            (:name, :phone, :email, :program_of_interest, :path_slug, :preferred_timing, :message, :source)'
    );

    $stmt->execute([
        ':name'                => $name,
        ':phone'               => $phone,
        ':email'               => $email,
        ':program_of_interest' => $programRaw ?? 'general',
        ':path_slug'           => $pathSlug,
        ':preferred_timing'    => $timing,
        ':message'             => $message,
        ':source'              => $source,
    ]);
} catch (PDOException $e) {
    error_log('[music-gurukula] Failed to insert enquiry: ' . $e->getMessage());
    json_response([
        'success' => false,
        'message' => 'We could not save your enquiry. Please try again shortly.',
    ], 500);
}

json_response([
    'success' => true,
    'message' => "Thank you, {$name}! We'll be in touch within two working days.",
    'path'    => $pathSlug,
]);
