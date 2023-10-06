import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const handler = async (req: NextRequest) => {
  if (req.method === "POST") {
    const { email }: any = req.body;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "banvietthenaocungdc@gmail.com",
        pass: process.env.LOZ,
      },
    });

    try {
      // Send a email
      await transporter.sendMail({
        from: "banvietthenaocungdc@gmail.com",
        to: email,
        subject: "Welcome to our application",
        text: "Thank you for signing up!",
      });

      console.log("Sent email successfully !");

      NextResponse.json(
        { message: "Email sent successfully !" },
        { status: 201 }
      );
    } catch (err: any) {
      console.log(`Oops!. Failed to send a email to user >>>> ${err.message}`);
      NextResponse.json(
        { message: "Oops!. Failed to send a email to user" },
        { status: 401 }
      );
    }
  } else {
    NextResponse.json({ message: "Method ain't allowed !" }, { status: 4001 });
  }
};
