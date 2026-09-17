<?php
/**
 * Central configuration for the Music Gurukula backend.
 *
 * Every value can be overridden with an environment variable of the same
 * name (handy for shared hosting / Docker), and falls back to the local
 * default otherwise. Copy this file's values into your host's environment
 * in production rather than editing the fallbacks in place, where possible.
 */

function env(string $key, $default = null)
{
    $value = getenv($key);
    return $value === false ? $default : $value;
}

// --- Database -----------------------------------------------------------

define('DB_HOST', env('DB_HOST', '127.0.0.1'));
define('DB_PORT', env('DB_PORT', '3306'));
define('DB_NAME', env('DB_NAME', 'music_gurukula'));
define('DB_USER', env('DB_USER', 'music_gurukula'));
define('DB_PASS', env('DB_PASS', 'change-me'));
define('DB_CHARSET', 'utf8mb4');

// --- CORS -----------------------------------------------------------------
// Origins allowed to call the public API in api/enquiries.php. Add every
// origin the Next.js frontend is served from (dev + production).
// Comma-separated in the ALLOWED_ORIGINS env var, e.g.
// "https://musicgurukula.com,https://www.musicgurukula.com"

define('ALLOWED_ORIGINS', array_filter(array_map('trim', explode(',', env(
    'ALLOWED_ORIGINS',
    'http://localhost:3000,http://127.0.0.1:3000,http://localhost:3500'
)))));

// --- Admin session ----------------------------------------------------

define('ADMIN_SESSION_NAME', 'mg_admin_session');

// --- Program paths -------------------------------------------------------
// Keep this in sync with src/lib/programs.ts on the frontend. The "slug"
// values here are what the Next.js forms send as program_of_interest, and
// what enquiries get auto-segregated into.

define('PROGRAM_PATHS', [
    'hindustani-vocals' => 'Hindustani Vocals',
    'hindustani-tabla'  => 'Hindustani Tabla',
    'hindustani-flute'  => 'Hindustani Flute',
    'bharatanatyam'     => 'Bharatanatyam',
    'general'           => 'General / Not sure yet',
]);
