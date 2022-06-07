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

  //* Save Reader Data
  connection.query(
    "INSERT INTO details (detailserial,headerserial,sampleno,yli,yls,ylf,tlf,ust,st,wk3,wk5,wk7,wk9,le) values ('" + serial + "','" + req.body.id + "','" + req.body.sampleno + "','" + req.body.yli
    + "','" + req.body.yls + "','" + req.body.ylf + "','" + req.body.tlf + "','" + req.body.ust + "','" + req.body.st + "','" + req.body.w3 + "','" + req.body.w5 + "','" + req.body.w7 + "','" + req.body.w9 + "','" + req.body.le + "')",
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

});



module.exports = router;
