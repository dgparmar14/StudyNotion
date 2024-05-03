const nodeMailer = require("nodemailer");
require("dotenv").config();

const MailSender = async(email, title, body) => {
    try{
        // console.log('Creation of transpoter started');
        const transporter = nodeMailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        });
        // console.log("Trasporetr created")
        // console.log(email);
        
        let info = await transporter.sendMail({
            from : "Study Notion || Codehelp -by Babbar",
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`
        });
        // console.log(email);
        // console.log("Mail sent")
        // console.log("Info : ", info);

        return info;
    }
    catch(err){
        console.error(err.message);

    }
}

module.exports = MailSender;