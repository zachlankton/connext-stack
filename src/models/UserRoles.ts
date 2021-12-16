import { Schema, model, ModelTypes } from "ottoman";
import { modelsType, ottoman } from "../db";
import { UserProfileSchema } from "./UserProfile";

export interface UserRolesIF {
  user: string;
  roles: string[];
}

const UserRolesSchema = new Schema({
  user: { type: UserProfileSchema, ref: "UserProfile" },
  roles: [String],
});

const models = ottoman.models as modelsType;
const UserRolesModel: ModelTypes<UserRolesIF, any> =
  models.UserRoles || model("UserRoles", UserRolesSchema);

export { UserRolesSchema };
export default UserRolesModel;
