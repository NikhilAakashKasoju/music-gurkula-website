-- Music Gurukula backend schema.
-- Import with: mysql -u root -p music_gurukula < schema.sql
-- (create the database first: CREATE DATABASE music_gurukula CHARACTER SET utf8mb4;)

CREATE TABLE IF NOT EXISTS admin_users (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS enquiries (
    id                   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name                 VARCHAR(150) NOT NULL,
    phone                VARCHAR(30)  NOT NULL,
    email                VARCHAR(150) NULL,
    -- Raw value submitted by the form (usually a program slug, occasionally free text).
    program_of_interest  VARCHAR(100) NOT NULL,
    -- Auto-segregated category this enquiry was filed under. One of:
    -- hindustani-vocals, hindustani-tabla, hindustani-flute, bharatanatyam, general.
    path_slug            VARCHAR(50)  NOT NULL DEFAULT 'general',
    preferred_timing     VARCHAR(150) NULL,
    message              TEXT NULL,
    -- Where the enquiry came from, e.g. "home_contact_form" or "program_page:hindustani-tabla".
    source               VARCHAR(100) NOT NULL DEFAULT 'unknown',
    status               ENUM('new','contacted','enrolled','closed') NOT NULL DEFAULT 'new',
    created_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_path_slug (path_slug),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
