import { Connection } from "mongoose";

declare global {
  let mongoose: any;
}

export const mongoose = global.mongoose || new Connection();

if (process.env.NODE_ENV !== "production") global.mongoose = mongoose;
