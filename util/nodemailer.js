const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const emailTrigger1 = schedule.scheduleJob({ hour: 11, minute: 00 }, () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'johnnyrogers.demadara@gmail.com',
            pass: 'beekjxofcjiqpmcw'
        }
    });
    const mailOptions = {
        from: 'johnnyrogers.demadara@gmail.com',
        to: 'johnnyrogers.demadara@gmail.com',
        subject: 'Node Mailer',
        text: 'Test email from node server.',
        attachments: [{
            filename: 'testfile.pdf',
            path: './util/content/testfile.pdf',
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

const emailTrigger2 = schedule.scheduleJob({ hour: 21, minute: 00 }, () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'johnnyrogers.demadara@gmail.com',
            pass: 'beekjxofcjiqpmcw'
        }
    });
    const mailOptions = {
        from: 'johnnyrogers.demadara@gmail.com',
        to: 'mbq121590@gmail.com',
        subject: 'Node Mailer',
        text: 'Test email from node server at 5am.',
        attachments: [{
            filename: 'testfile.pdf',
            path: './content/testfile.pdf',
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

module.exports = emailTrigger1, emailTrigger2;

