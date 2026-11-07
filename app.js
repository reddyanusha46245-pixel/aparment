const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Only these tables and columns can be accessed through the API.
const tables = {
    residents: {
        primaryKey: "resident_id",
        columns: ["name", "flat_no", "phone", "email"]
    },
    maintenance_staff: {
        primaryKey: "staff_id",
        columns: ["name", "specilalization", "phone", "email"]
    },
    requests: {
        primaryKey: "request_id",
        columns: ["resident_id", "staff_id", "issue_type", "description", "request_date", "status"]
    },
    maintenance_records: {
        primaryKey: "record_id",
        columns: ["request_id", "work_description", "completion_date", "repair_cost", "remarks"]
    }
};

function validTable(table) {
    return Object.prototype.hasOwnProperty.call(tables, table);
}

// Display all records
app.get("/api/:table", (req, res) => {
    const table = req.params.table;
    if (!validTable(table)) return res.status(404).json({ error: "Table not found" });

    db.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Insert a record
app.post("/api/:table", (req, res) => {
    const table = req.params.table;
    if (!validTable(table)) return res.status(404).json({ error: "Table not found" });

    const allowed = tables[table].columns;
    const data = {};
    allowed.forEach(column => {
        if (req.body[column] !== undefined && req.body[column] !== "") {
            data[column] = req.body[column];
        }
    });

    const columns = Object.keys(data);
    if (!columns.length) return res.status(400).json({ error: "Enter at least one field" });

    const placeholders = columns.map(() => "?").join(", ");
    const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`;

    db.query(sql, Object.values(data), (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Record inserted successfully", insertId: result.insertId });
    });
});

// Update a record
app.put("/api/:table/:id", (req, res) => {
    const table = req.params.table;
    if (!validTable(table)) return res.status(404).json({ error: "Table not found" });

    const config = tables[table];
    const data = {};
    config.columns.forEach(column => {
        if (req.body[column] !== undefined) data[column] = req.body[column];
    });

    const columns = Object.keys(data);
    if (!columns.length) return res.status(400).json({ error: "No fields to update" });

    const setClause = columns.map(column => `${column} = ?`).join(", ");
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${config.primaryKey} = ?`;

    db.query(sql, [...Object.values(data), req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result.affectedRows) return res.status(404).json({ error: "Record not found" });
        res.json({ message: "Record updated successfully" });
    });
});

// Delete a record
app.delete("/api/:table/:id", (req, res) => {
    const table = req.params.table;
    if (!validTable(table)) return res.status(404).json({ error: "Table not found" });

    const key = tables[table].primaryKey;
    db.query(`DELETE FROM ${table} WHERE ${key} = ?`, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result.affectedRows) return res.status(404).json({ error: "Record not found" });
        res.json({ message: "Record deleted successfully" });
    });
});

app.listen(3006, () => {
    console.log("Server running at http://localhost:3006");
});
app.get("/testdb", (req, res) => {
    db.query("SHOW TABLES", (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        res.json(result);
    });
});