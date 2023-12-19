import mongoose from "mongoose"

export const dbConnect = () => mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.error(err))
