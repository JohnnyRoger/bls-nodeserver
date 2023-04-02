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
    passwordSha1: Buffer.from('d6f0ad7752f4a2931bbd0251e64d5bbda8c9ab19', 'hex'),
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

  //* Convert To Serial
  connection.query(
    "SELECT locserial,(select e1.growerserial from grower e1 where e1.growername = '" + req.body.grower + "') 'growerserial', " +
    " (select e1.readerserial from reader e1 where concat(e1.lastname,', ',e1.firstname, ' ',e1.middlename) = '" + req.body.reader + "') 'readerserial' " +
    " from location where locname = '" + req.body.location + "'",
    function (err, rows) {
      if (!err) {
        if (rows.length > 0) {
          var startTime = performance.now();
          locationserial = rows[0]['locserial'];
          growerserial = rows[0]['growerserial'];
          readerserial = rows[0]['readerserial'];
          let dt = dateTime.create();
          let formatted = dt.format('Y-m-d H:M:S');
          //* Save Reader Data
          connection.query(
            "INSERT IGNORE INTO header (headerserial,locserial,week,growerserial,readerserial,stationno,spraytype,week3color,week5color,week7color,week9color,remarks,dateencoded,dateuploaded,isdelete) values ('" + req.body.id + "','" + locationserial + "','" + req.body.week + "','" + growerserial
            + "','" + readerserial + "','" + req.body.station + "','" + req.body.spraytype + "','" + req.body.w3color + "','" + req.body.w5color + "','" + req.body.w7color + "','" + req.body.w9color + "','" + req.body.remarks + "','" + req.body.dateencoded + "', '" + formatted + "', 0)",
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
                //console.log("Invalid MySQL Query!");
                console.log(err);
              }
              connection.end();
            }
          );


          var endTime = performance.now();
          console.log(`Execution Duration: ${endTime - startTime} milliseconds`);
        } else {
          console.log("Retrieve Failed!");
        }
      } else {
        console.log("Invalid MySQL Query!");
      }
      connection.end();
    }
  );

});



module.exports = router;
