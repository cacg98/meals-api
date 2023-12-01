import mongoose from "mongoose";

export default main().then(
    () => console.log('db connected')
).catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URI);
}