import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

type sendingConditions = {
  email: string;
  emailType: string;
  userId: string | number | any;
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: sendingConditions) => {
  try {
    // create a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidation: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidation: true }
      );
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "administrator",
        pass: "helloNodeMailer",

        // TODO: add these credentials to .env file
      },
    });

    const mailerOptions = {
      from: "banvietthenaocungdc@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verifying email" : "Reset password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verifying your email" : "Reset your password"
      } </p>`,
    };

    const mailResponding = await transport.sendMail(mailerOptions);

    return mailResponding;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
