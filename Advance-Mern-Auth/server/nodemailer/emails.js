import transporter from "./email.config.js"
import { PASSWORD_RESET_OTP_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_MESSAGE_TEMPLATE } from "./emailTemplate.js"

const FROM = "'Torapixels' <no-reply@yourapp.com>" // this can be any address

// welcome email
export const sendWelcomeEmail = async(email,name)=>{
    try {
        const info = transporter.sendMail({
            from: FROM,
            to: email,
            subject: "Welcome to Torapixels",
            html: WELCOME_MESSAGE_TEMPLATE.replace("{userName}",name)
        })
        console.log('Welcome email send to emailId : ',(await info).messageId)
    } catch (error) {
        console.log('Error Sending Email Address :',error.message)
    }
}


//  send Verify Otp Email
export const sendVerifyOtpEmail = async(email,otp)=>{
    try {
        const info = transporter.sendMail({
            from: FROM,
            to: email,
            subject: "Verification Otp ",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otp)
        });
        console.log('Verification otp is send to :',(await info).messageId)
    } catch (error) {
        console.log('Error in verification otp email :',error.message)
    }
}


// Send reset otp email
export const sendResetOTPEmail = async(email,otp)=>{
    try {
        const info = await transporter.sendMail({
            from: FROM,
            to: email,
            subject : "Reset Password Email",
            html: PASSWORD_RESET_OTP_TEMPLATE.replace("{resetOtp}", otp)
        })
        console.log('Reset Password opt is send succesffully on email id :',info.messageId)
    } catch (error) {
        console.log('Error while sending reset otp email',error.message)
    }
}