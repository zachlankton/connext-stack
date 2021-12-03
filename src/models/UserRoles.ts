import { Schema, model, getDefaultInstance } from "ottoman";
import { modelsType } from "../db";
import { UserProfileSchema } from "./UserProfile";

const UserRolesSchema = new Schema({
  user: { type: UserProfileSchema, ref: "UserProfile" },
  roles: [String],
});

const ottoman = getDefaultInstance();
const models = ottoman.models as modelsType;
const UserRolesModel = models.UserRoles || model("UserRoles", UserRolesSchema);

export { UserRolesSchema };
export default UserRolesModel;
