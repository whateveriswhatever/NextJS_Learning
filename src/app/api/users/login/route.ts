import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

// interface requiredParams {
//   email: string;
//   password: string;
// }

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if the user is already existed
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "The provided user cannot be found!" },
        { status: 400 }
      );
    }
    console.log("user existed");

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(`validPassword: ${validPassword}`);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password!" }, { status: 400 });
    }

    console.log(user);

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create a token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      message: "Loged in successfully",
      success: true,
    });

    res.cookies.set("token", token, { httpOnly: true });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
