import { Schema, model } from "ottoman";
import { UserProfileSchema } from "./UserProfile";

const UserRolesSchema = new Schema({
  user: { type: UserProfileSchema, ref: "UserProfile" },
  roles: [String],
});

const UserRolesModel = model("UserRoles", UserRolesSchema);

export { UserRolesSchema };
export default UserRolesModel;
