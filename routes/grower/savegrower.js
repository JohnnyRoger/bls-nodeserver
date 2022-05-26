const express = require('express');
const router = express.Router();
const crypto = require("crypto");
//* Location API
router.post("/", function (req, res, next) {
    const {performance} = require("perf_hooks");
    const mysql = require("mysql2");
    const config = {
      host: "31.187.75.30",
      user: "justexplore",
      password: "@Slasher15@",
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
    
    connection.query(
        "INSERT INTO location (locserial,locname,address,incharge,contactno) values ('" + serial + "','" + req.body.setname + "','" + req.body.setaddress + "','" + req.body.setincharge + "','" + req.body.setcontactno + "')",
        function (err, result) {
          if (!err) {
            if (result.affectedRows!=0) {
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



});

module.exports = router;
