

-- Servers Table: Stores managed systems
CREATE TABLE servers (
    server_id INT AUTO_INCREMENT PRIMARY KEY,
    hostname VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    os_type VARCHAR(50) NOT NULL,
    Auth_code VARCHAR(10) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_patch_date DATETIME
);

-- Patches Table: Stores available updates
CREATE TABLE patches (
    patch_id INT AUTO_INCREMENT PRIMARY KEY,
    patch_name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    description TEXT,
    severity ENUM('low', 'medium', 'high', 'critical')
);

-- Deployments Table: Tracks patch applications
CREATE TABLE deployments (
    deployment_id INT AUTO_INCREMENT PRIMARY KEY,
    server_id INT NOT NULL,
    patch_id INT NOT NULL,
    deployment_date DATETIME NOT NULL,
    success BOOLEAN NOT NULL,
    notes TEXT,
    FOREIGN KEY (server_id) REFERENCES servers(server_id) ON DELETE CASCADE,
    FOREIGN KEY (patch_id) REFERENCES patches(patch_id) ON DELETE CASCADE
);

-- Users Table: Manages authentication
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

-- Logs Table: Records system events
CREATE TABLE logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    action VARCHAR(50) NOT NULL,
    user_id INT,
    deployment_id INT,
    message TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (deployment_id) REFERENCES deployments(deployment_id) ON DELETE SET NULL
);