import nodemailer from 'nodemailer';


let mailTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user:'saurabhbarej@gmail.com',
        pass:'gvnqnphcdkqdwhrj'
    }
})



async function sendEmail(to, subject, text){
    const mailDetails = {
        from:"saurabhbarej@gmail.com",
        to,
        subject,
        text
    }
    mailTransport.sendMail(mailDetails, (err, data)=> {
        if(err){
            console.log(err);
        }
        else {
            console.log("Email send to successfully to ", to);
        }
    })
}

export default sendEmail;