import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const UsersSchema = new Schema({
  username: {
    //email will be stored in username
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  salt: {
    required: true,
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export type mongoDocument = {
  _id: mongoose.Types.ObjectId;
};

export type User = InferSchemaType<typeof UsersSchema> & mongoDocument;

export default model<User>("userdetails", UsersSchema);
