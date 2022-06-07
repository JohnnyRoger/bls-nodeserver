var express = require("express");
var router = express.Router();

//* Select Location API
router.get("/", function (req, res, next) {
  const { performance } = require("perf_hooks");
  const mysql = require("mysql2");
  const config = {
    host: "207.148.76.241",
    user: "root",
    password: "gwapo",
    database: "blssystem",
  };
  const connection = mysql.createConnection(config);
  connection.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database is up and running.");
    }
  });
  connection.query(
    "SELECT t2.locname, t1.lastname, t1.firstname, t1.middlename, t1.address, t1.contactno, t1.designation  FROM reader t1" +
    " INNER JOIN location t2 ON t1.locserial = t2.locserial",
    function (err, rows) {
      if (!err) {
        if (rows.length > 0) {
          var startTime = performance.now();
          const result = JSON.stringify(rows);
          //res.status(200).send();
          res.send(result);
          res.end;
          var endTime = performance.now();
          console.log(`Execution Duration: ${endTime - startTime} milliseconds`);
          console.log("Retrieve Success!");
        } else {
          res.status(201).send();
          res.end;
          console.log("Retrieve Failed!");
        }
      } else {
        res.status(202).send();
        res.end;
        console.log("Invalid MySQL Query!");
      }
    }
  );

  connection.end();
});

module.exports = router;
