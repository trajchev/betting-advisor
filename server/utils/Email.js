const nodemailer = require('nodemailer');

class Email {

    constructor(user, url) {

        this.to = user.email;
        this.username = user.username;
        this.url = url;
        this.from = `Ivan <${process.env.EMAIL_FROM}>`;

    }

    newTransport() {

        if (process.env.NODE_ENV === 'production') {
            // Sendgrid
            return nodemailer.createTransport({
                service: 'Sendgrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

    }

    // Send the mail
    async send(template, subject) {

        // Define the html for the email
        const html = '<b>Hello from the testing mail</b>';

        // Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            html: html,
            text: 'Sample email text'
        }

        // Create transport and send mail
        await this.newTransport().sendMail(mailOptions);

    }

    async sendWelcome() {
        await this.send('Welcome', 'Welcome to the Betting Advisor family');
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (Act quickly)');
    }

}

module.exports = Email;