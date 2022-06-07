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
  connection.query("SELECT t1.headerserial 'serial', CONCAT(t2.lastname, ', ', t2.firstname, ' ', t2.middlename) 'reader', t3.locname 'location', t1.`week` 'week', t1.stationno 'station', t4.growername 'grower', " +
    " t1.spraytype 'spraytype', t1.week3color 'week3color', t1.week5color 'week5color', t1.week7color 'week7color', t1.week9color 'week9color',t1.remarks 'remarks', t1.dateencoded 'dateencoded', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'yli1', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'yls1', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'ylf1', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'tlf1', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'ust1', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'st1', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'w31', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'w51', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'w71', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'w91', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 1' and e1.headerserial = t1.headerserial) 'le1', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'yli2', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'yls2', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'ylf2', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'tlf2', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'ust2', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'st2', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'w32', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'w52', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'w72', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'w92', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 2' and e1.headerserial = t1.headerserial) 'le2', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'yli3', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'yls3', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'ylf3', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'tlf3', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'ust3', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'st3', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'w33', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'w53', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'w73', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'w93', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 3' and e1.headerserial = t1.headerserial) 'le3', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'yli4', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'yls4', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'ylf4', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'tlf4', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'ust4', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'st4', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'w34', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'w54', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'w74', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'w94', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 4' and e1.headerserial = t1.headerserial) 'le4', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'yli5', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'yls5', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'ylf5', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'tlf5', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'ust5', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'st5', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'w35', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'w55', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'w75', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'w95', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 5' and e1.headerserial = t1.headerserial) 'le5', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'yli6', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'yls6', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'ylf6', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'tlf6', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'ust6', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'st6', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'w36', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'w56', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'w76', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'w96', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 6' and e1.headerserial = t1.headerserial) 'le6', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'yli7', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'yls7', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'ylf7', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'tlf7', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'ust7', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'st7', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'w37', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'w57', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'w77', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'w97', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 7' and e1.headerserial = t1.headerserial) 'le7', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'yli8', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'yls8', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'ylf8', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'tlf8', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'ust8', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'st8', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'w38', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'w58', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'w78', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'w98', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 8' and e1.headerserial = t1.headerserial) 'le8', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'yli9', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'yls9', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'ylf9', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'tlf9', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'ust9', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'st9', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'w39', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'w59', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'w79', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'w99', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 9' and e1.headerserial = t1.headerserial) 'le9', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'yli10', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'yls10', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'ylf10', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'tlf10', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'ust10', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'st10', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'w310', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'w510', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'w710', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'w910', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'SAMPLE 10' and e1.headerserial = t1.headerserial) 'le10', " +
    " (SELECT e1.yli from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'ylia', " +
    " (SELECT e1.yls from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'ylsa', " +
    " (SELECT e1.ylf from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'ylfa', " +
    " (SELECT e1.tlf from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'tlfa', " +
    " (SELECT e1.ust from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'usta', " +
    " (SELECT e1.st from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'sta', " +
    " (SELECT e1.wk3 from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'w3a', " +
    " (SELECT e1.wk5 from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'w5a', " +
    " (SELECT e1.wk7 from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'w7a', " +
    " (SELECT e1.wk9 from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'w9a', " +
    " (SELECT e1.le from details e1 where e1.sampleno = 'AVERAGE' and e1.headerserial = t1.headerserial) 'lea' " +
    " FROM header t1 " +
    " INNER JOIN reader t2 ON t1.readerserial = t2.readerserial " +
    " INNER JOIN location t3 ON t1.locserial = t3.locserial" +
    " INNER JOIN grower t4 ON t1.growerserial = t4.growerserial" +
    " INNER JOIN details t5 ON t1.headerserial = t5.headerserial" +
    " GROUP BY t1.headerserial;",
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
          console.log("reading Successfully Retrieve");
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
