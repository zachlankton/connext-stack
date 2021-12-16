import { Schema, model, ModelTypes } from "ottoman";
import { modelsType, ottoman } from "../db";

export interface UserProfileIF {
  firstName?: string;
  lastName?: string;
  username?: string;
  name?: string | null | undefined;
  phone?: string;
  roles?: Array<string>;
  userid?: string;
  image?: string | null | undefined;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: number;
}

const UserProfileSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
      validator: {
        regexp:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Email Address is not valid!",
      },
    },
    firstName: String,
    lastName: String,
    username: String,
    street: String,
    city: String,
    state: String,
    zipCode: Number,
    name: String,
    phone: {
      type: String,
      required: false,
      validator: (data: any) => {
        if (data === "undefined" || data === "") return data;
        const regexp =
          /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
        if (!regexp.test(data))
          throw new Error("Phone Number is Invalid! -> '" + data + "'");
        return data;
      },
    },
  },
  {
    timestamps: true,
  }
);

UserProfileSchema.pre("validate", function (doc) {
  // Unfortunately this needs to be done to validate userid as an email
  // the save validate hook built in to ottoman skips modleKey and ID_KEY
  UserProfileSchema.validate(doc);
});

export { UserProfileSchema };
const models = ottoman.models as modelsType;

const UserModel: ModelTypes<UserProfileIF, any> =
  models.UserProfile ||
  model("UserProfile", UserProfileSchema, {
    idKey: "userid",
  });

export default UserModel;
