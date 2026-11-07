CREATE DATABASE IF NOT EXISTS apartment_maintanance;
USE apartment_maintanance;

-- Run this file only if you are creating these tables for the first time.
-- If your tables already exist, compare their column names with this schema first.

CREATE TABLE IF NOT EXISTS residents (
    resident_id INT AUTO_INCREMENT PRIMARY KEY,
    resident_name VARCHAR(100) NOT NULL,
    flat_no VARCHAR(20) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS maintenance_staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_name VARCHAR(100) NOT NULL,
    job_role VARCHAR(60),
    phone VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    resident_id INT NOT NULL,
    staff_id INT NULL,
    request_title VARCHAR(150) NOT NULL,
    description VARCHAR(500),
    request_date DATE,
    status VARCHAR(30) DEFAULT 'Pending',
    FOREIGN KEY (resident_id) REFERENCES residents(resident_id),
    FOREIGN KEY (staff_id) REFERENCES maintenance_staff(staff_id)
);

CREATE TABLE IF NOT EXISTS maintenance_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    work_description VARCHAR(255),
    completion_date DATE,
    repair_cost DECIMAL(10,2),
    remarks VARCHAR(255),
    FOREIGN KEY (request_id) REFERENCES requests(request_id)
);
