import nodemailer from "nodemailer";
import path from "path";

import { MAILTRAP_PASSWORD, MAILTRAP_USER, VERIFICATION_EMAIL } from "#/utils/variables";
import { generateTemplate } from "#/mail/template";

const generateMailTransporter = () => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: MAILTRAP_USER,
          pass: MAILTRAP_PASSWORD
        }
      });
    
    return transport;
}

interface Profile {
    name: string,
    email: string,
    userId: string,
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
    const transport = generateMailTransporter();

    const {name, email, userId} = profile;
    
    const welcomeMessage = `Xin chào ${name}, Chào mừng bạn đến với NhacChill! Bạn hãy dành một chút thời gian để xác thực người dùng, Sử dụng mã OTP dưới đây để xác thực email của bạn `
    
    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Email chào mừng",
        html: generateTemplate({
          title: "Chào mừng đến với NhacChill",
          message: welcomeMessage,
          logo:"cid:logo",
          banner:"cid:welcome",
          link: "#",
          btnTitle: token
        }),
        attachments: [
          {
            filename: "logo.png",
            path: path.join(__dirname, "../mail/logo.png"),
            cid: "logo"
          }, 
          {
            filename: "welcome.png",
            path: path.join(__dirname, "../mail/welcome.png"),
            cid: "welcome"
          }
        ]
    }) 
}

interface Options {
  email: string,
  link: string,
}

export const sendForgetPasswordlink = async (options: Options) => {
  const transport = generateMailTransporter();

  const { email, link} = options;
  
  const message = `Xin chào bạn, chúng tôi vừa nhận được phản hồi rằng bạn đã quên mật khẩu của mình. Bạn có thể sử dụng link chúng tôi đã gửi bên dưới để thay đổi mật khẩu cho tài khoản của mình`
  
  transport.sendMail({
      to: email,
      from: VERIFICATION_EMAIL,
      subject: "Reset Password Link",
      html: generateTemplate({
        title: "Quên Mật Khẩu",
        message: message,
        logo:"cid:logo",
        banner:"cid:forget_password",
        link,
        btnTitle: "Đổi mật khẩu mới",
      }),
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "../mail/logo.png"),
          cid: "logo"
        }, 
        {
          filename: "forget_password.png",
          path: path.join(__dirname, "../mail/forget_password.png"),
          cid: "forget_password"
        }
      ]
  }) 
}