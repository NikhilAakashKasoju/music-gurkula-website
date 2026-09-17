<?php
/**
 * Small shared helpers used by both the public API and the admin dashboard.
 */

require_once __DIR__ . '/../config.php';

/**
 * Turn whatever the frontend sent as "program of interest" into one of the
 * known path slugs, so every enquiry can be auto-segregated even if the
 * value doesn't match exactly (extra whitespace, different casing, a
 * display name instead of a slug, etc). Anything unrecognised files under
 * "general" rather than being rejected.
 */
function resolve_path_slug(?string $raw): string
{
    $known = array_keys(PROGRAM_PATHS);

    if ($raw === null) {
        return 'general';
    }

    $slug = strtolower(trim($raw));
    $slug = preg_replace('/\s+/', '-', $slug);

    if (in_array($slug, $known, true)) {
        return $slug;
    }

    // Fall back to matching against the human-readable labels too, in case
    // a future form ever posts "Hindustani Tabla" instead of the slug.
    foreach (PROGRAM_PATHS as $pathSlug => $label) {
        if (strtolower($label) === strtolower(trim($raw))) {
            return $pathSlug;
        }
    }

    return 'general';
}

function path_label(string $slug): string
{
    return PROGRAM_PATHS[$slug] ?? ucwords(str_replace('-', ' ', $slug));
}

function is_valid_email(?string $email): bool
{
    if ($email === null || $email === '') {
        return true; // email is optional
    }
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/** Trim a string and cap its length, returning null for empty results. */
function clean_str(?string $value, int $maxLength = 255): ?string
{
    if ($value === null) {
        return null;
    }
    $value = trim(strip_tags($value));
    if ($value === '') {
        return null;
    }
    return mb_substr($value, 0, $maxLength);
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}
