const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const express = require("express");
const connection = require('../../database/config')
const router = express.Router();

router.get("/", function (req, res, next) {
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
        "SELECT * FROM sendingmail WHERE issend = 0",
        function (err, rows) {
            if (!err) {
                rows.forEach(function (result) {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'blssystem2022@gmail.com',
                            pass: 'yxkgdxobkchrzdnu'
                        }
                    });
                    const mailOptions = {
                        from: 'blssystem2022@gmail.com',
                        to: result.emailto,
                        subject: result.subject,
                        text: 'Test email from node server.',
                        attachments: [{
                            filename: result.filename,
                            path: '../util/content/' + result.filename,
                            contentType: 'application/pdf'
                        }],
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                });
                res.status(200).send();
                res.end;

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
