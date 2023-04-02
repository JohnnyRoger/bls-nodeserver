const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const dateTime = require('node-datetime');
//* Location API
router.post("/", function (req, res, next) {
  const { performance } = require("perf_hooks");
  const mysql = require("mysql2");
  const config = {
    host: "207.148.76.241",
    user: "root",
    password: "gwapo",
    database: "blssystem",
  };

  //* Crypto Encryption
  const serial = crypto.randomBytes(16).toString("hex");
  const connection = mysql.createConnection(config);
  connection.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database is up and running.");
    }
  });
  console.log(req.body);
  //* Convert To Serial
  connection.query(
    "SELECT t1.locserial, t2.userserial from reader t1 INNER JOIN useraccount t2 ON t1.readerserial = t2.readerserial where concat(t1.lastname,', ',t1.firstname, ' ',t1.middlename) = '" + req.body.user + "'",
    function (err, rows) {
      if (!err) {
        if (rows.length > 0) {
          var startTime = performance.now();
          locationserial = rows[0]['locserial'];
          userserial = rows[0]['userserial'];
          let dt = dateTime.create();
          let formatted = dt.format('Y-m-d H:M:S');
          //* Save Reader Data
          connection.query(
            "INSERT INTO rainfall (rainfallserial,locserial,weekno,userserial,sun,mon,tue,wed,thu,fri,sat,date_created,date_encoded,date_uploaded) values ('" + req.body.id + "','" + locationserial + "','" + req.body.week + "','" + userserial
            + "','" + req.body.sunday + "','" + req.body.monday + "','" + req.body.tuesday + "','" + req.body.wednesday + "','" + req.body.thursday + "','" + req.body.friday + "','" + req.body.saturday + "','" + req.body.datecreated + "','" + req.body.datecreated + "','" + formatted + "')",
            function (err, result) {
              if (!err) {
                if (result.affectedRows != 0) {
                  res.status(200).send();
                  res.end;
                  console.log("Insertion Success!");
                } else {
                  res.status(201).send();
                  res.end;
                  console.log("Insertion Failed!");
                }
              } else {
                res.status(202).send();
                res.end;
                console.log("Invalid MySQL Query!");
                console.log(err);
              }
            }
          );
          connection.end();

          var endTime = performance.now();
          console.log(`Execution Duration: ${endTime - startTime} milliseconds`);
        } else {
          console.log("Retrieve Failed!");
        }
      } else {
        console.log("Invalid MySQL Query!");
      }
    }
  );

});



module.exports = router;
