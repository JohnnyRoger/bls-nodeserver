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

  connection.query("SELECT t1.headerserial 'headerserial', 'AVERAGE' AS 'average', " +
    " ROUND(COALESCE(SUM(t5.yli) / (SELECT COUNT(e1.yli) FROM details e1 WHERE e1.yli > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'yli', " +
    " ROUND(COALESCE(SUM(t5.yls) / (SELECT COUNT(e1.yls) FROM details e1 WHERE e1.yls > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'yls', " +
    " ROUND(COALESCE(SUM(t5.ylf) / (SELECT COUNT(e1.ylf) FROM details e1 WHERE e1.ylf > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'ylf', " +
    " ROUND(COALESCE(SUM(t5.tlf) / (SELECT COUNT(e1.tlf) FROM details e1 WHERE e1.tlf > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'tlf', " +
    " ROUND(COALESCE(SUM(t5.ust) / (SELECT COUNT(e1.ust) FROM details e1 WHERE e1.ust > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'ust', " +
    " ROUND(COALESCE(SUM(t5.st) / (SELECT COUNT(e1.st) FROM details e1 WHERE e1.st > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'st', " +
    " ROUND(COALESCE(SUM(t5.wk3) / (SELECT COUNT(e1.wk3) FROM details e1 WHERE e1.wk3 > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'wk3', " +
    " ROUND(COALESCE(SUM(t5.wk5) / (SELECT COUNT(e1.wk5) FROM details e1 WHERE e1.wk5 > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'wk5', " +
    " ROUND(COALESCE(SUM(t5.wk7) / (SELECT COUNT(e1.wk7) FROM details e1 WHERE e1.wk7 > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'wk7', " +
    " ROUND(COALESCE(SUM(t5.wk9) / (SELECT COUNT(e1.wk9) FROM details e1 WHERE e1.wk9 > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'wk9', " +
    " ROUND(COALESCE(SUM(t5.le) / (SELECT COUNT(e1.le) FROM details e1 WHERE e1.le > 0 AND e1.headerserial = t1.headerserial),0.0),2) 'le' " +
    " FROM header t1" +
    " INNER JOIN details t5 ON  t1.headerserial = t5.headerserial" +
    " WHERE t1.headerserial = headerserial" +
    " GROUP BY t1.headerserial",
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
          console.log("Average Successfully Retrieve");
        } else {
          res.status(201).send();
          res.end;
          console.log("Retrieve Failed!");
        }
      } else {
        res.status(202).send();
        res.end;
        console.log(err);
      }
    }
  );

  connection.end();
});

module.exports = router;
