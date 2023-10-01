import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    });

    connection.on("error", (err) => {
      console.log(`Oops. Something went wrong! >> Please check: ====> ${err}`);
      process.exit();
    });
  } catch (err) {
    console.log(`Oops. Something went wrong! ====> ${err}`);
  }
};
