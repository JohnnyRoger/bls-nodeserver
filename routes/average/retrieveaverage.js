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
  connection.query("SELECT t1.headerserial, t1.locserial, t2.locname, t1.week, " +
    " ROUND(COALESCE((SELECT SUM(e1.yli) / COUNT(t1.yli) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.yli > 0),0.00),2) 'yli', " +
    " ROUND(COALESCE((SELECT SUM(e1.yls) / COUNT(t1.yls) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.yli > 0),0.00),2) 'yls', " +
    " ROUND(COALESCE((SELECT SUM(e1.ylf) / COUNT(t1.ylf) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.ylf > 0),0.00),2) 'ylf', " +
    " ROUND(COALESCE((SELECT SUM(e1.tlf) / COUNT(t1.tlf) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.tlf > 0),0.00),2) 'tlf', " +
    " ROUND(COALESCE((SELECT SUM(e1.ust) / COUNT(t1.ust) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.ust > 0),0.00),2) 'ust', " +
    " ROUND(COALESCE((SELECT SUM(e1.st) / COUNT(t1.st) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.st > 0),0.00),2) 'st', " +
    " ROUND(COALESCE((SELECT SUM(e1.wk3) / COUNT(t1.wk3) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.wk3 > 0),0.00),2) 'wk3', " +
    " ROUND(COALESCE((SELECT SUM(e1.wk5) / COUNT(t1.wk5) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.wk5 > 0),0.00),2) 'wk5', " +
    " ROUND(COALESCE((SELECT SUM(e1.wk7) / COUNT(t1.wk7) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.wk7 > 0),0.00),2) 'wk7', " +
    " ROUND(COALESCE((SELECT SUM(e1.wk9) / COUNT(t1.wk9) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.wk9 > 0),0.00),2) 'wk9', " +
    " ROUND(COALESCE((SELECT SUM(e1.le) / COUNT(t1.le) FROM vGenAverage e1 WHERE e1.locserial = t1.locserial AND e1.le > 0),0.00),2) 'le' " +
    " FROM vGenAverage t1 " +
    " INNER JOIN location t2 ON t1.locserial = t2.locserial " +
    " INNER JOIN weekrepo t3 ON t1.week = t3.wkname " +
    " GROUP BY t1.week " +
    " ORDER BY t3.id ASC",
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
