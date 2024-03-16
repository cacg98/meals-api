import cors from "cors";
import { CustomError } from "../common/customError";

export const corsMiddleware = () =>
  cors({
    origin: (origin, cb) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:4200",
        "https://meals-app-urmy.onrender.com",
      ];

      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return cb(null, true);
      }

      return cb(new CustomError("Not allowed by CORS", 403));
    },
  });
