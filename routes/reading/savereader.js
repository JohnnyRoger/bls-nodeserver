const express = require('express');
const router = express.Router();
const crypto = require("crypto");
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

  //* Get Location Serail
  connection.query(
    "SELECT t1.locserial AS 'locname' FROM location t1 WHERE t1.locname = '" + req.body.setlocation + "'",
    function (err, rows) {
      if (!err) {
        if (rows.length > 0) {
          var startTime = performance.now();
          const locationserial = rows[0]['locname'];
          //* Save Reader Data
          connection.query(
            "INSERT INTO reader (readerserial,locserial,lastname,firstname,middlename,address,contactno,designation) values ('" + serial + "','" + locationserial + "','" + req.body.setlastname + "','" + req.body.setfirstname + "','" + req.body.setmiddlename + "','" + req.body.setaddress + "','" + req.body.setcontactno + "','" + req.body.setdesignation + "')",
            function (err, result) {
              if (!err) {
                if (result.affectedRows != 0) {
                  var startTime = performance.now();
                  res.status(200).send();
                  res.end;
                  var endTime = performance.now();
                  console.log(`Execution Duration: ${endTime - startTime} milliseconds`);
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
              }
            }
          );
          connection.end();
          var endTime = performance.now();
          console.log(`Execution Duration: ${endTime - startTime} milliseconds`);
          console.log("Serial Matching Success!");
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
