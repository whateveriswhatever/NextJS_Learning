import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found !",
      data: user,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};
