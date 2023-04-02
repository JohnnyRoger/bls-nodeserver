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
  connection.query("select t2.locname 'location', t1.weekno 'weekno', DATE_FORMAT(t1.date_created,'%Y-%m-%d %h:%i:%s %p') 'datecreated', t3.username 'user', " +
    " t1.sun 'sun', t1.mon 'mon', t1.tue 'tue', t1.wed 'wed', t1.thu 'thu', t1.fri 'fri' , t1.sat 'sat' " +
    " from rainfall t1 " +
    " inner join location t2 on t1.locserial = t2.locserial " +
    " inner join useraccount t3 on t1.userserial = t3.userserial",
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
          console.log("Reading Successfully Retrieve");
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
