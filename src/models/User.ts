import { Schema, model, ModelTypes } from "ottoman";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  userId: string;
}

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const UserModel: ModelTypes<User, any> = model("User", UserSchema);

export default UserModel;
