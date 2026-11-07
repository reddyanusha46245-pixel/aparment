APARTMENT MAINTENANCE REQUEST MANAGEMENT SYSTEM
================================================

PROJECT DATABASE
Database name: apartment_maintanance

TABLES
1. residents
2. maintenance_staff
3. requests
4. maintenance_records

IMPORTANT
This starter project assumes the column names shown in schema.sql.
If you already created the tables with different column names, update app.js
and public/script.js to match your actual columns.

SETUP
1. Extract this ZIP file.
2. Open the extracted folder in VS Code.
3. Open db.js and replace YOUR_MYSQL_PASSWORD with your MySQL root password.
4. In MySQL Workbench or phpMyAdmin, open and run schema.sql.
   IMPORTANT: schema.sql creates tables only if they do not already exist.
   If your tables already exist, do not blindly run it; compare the columns first.
5. Open the VS Code terminal in this project folder.
6. Run:
       npm install
7. Start the server:
       npm start
8. Open this URL in your browser:
       http://localhost:3000

FEATURES
- View records from all four tables
- Insert records
- Update records
- Delete records
- Shared pink and dark styling

TABLE COLUMNS ASSUMED
residents:
  resident_id, resident_name, flat_no, phone, email

maintenance_staff:
  staff_id, staff_name, job_role, phone, email

requests:
  request_id, resident_id, staff_id, request_title, description,
  request_date, status

maintenance_records:
  record_id, request_id, work_description, completion_date,
  repair_cost, remarks

The maintenance_records table name is spelled exactly as requested.
If your existing MySQL table is named maintance_records (without the second
"e" in maintenance), either rename it in MySQL or update the project references.
