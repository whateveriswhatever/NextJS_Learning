import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already existed" },
        { status: 404 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(`savedUser: ${savedUser}`);

    // send a verified email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // send a email to user
    await sendSignupEmail(savedUser.email);

    return NextResponse.json(
      { message: "User was erected successfully!", success: true, savedUser },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

interface IEmail {
  email: any;
}

const sendSignupEmail = async ({ email }: IEmail) => {
  try {
    const res = await fetch("/api/send_user_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      console.log("Signup email successfully !");
    } else {
      console.error("Error in sending signup email: ");
      NextResponse.json(
        { error: "Error in sending signup email" },
        { status: 401 }
      );
    }
  } catch (err: any) {
    console.log(`Failed to send signup email to user ! >>>> ${err.message}`);
    NextResponse.json(
      { message: "Failed to send signup email to user ! " },
      { status: 400 }
    );
  }
};
