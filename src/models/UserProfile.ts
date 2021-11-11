import { Schema, model, ModelTypes } from "ottoman";

export interface UserProfileIF {
  firstName?: string;
  lastName?: string;
  username?: string;
  name?: string | null | undefined;
  phone?: string;
  email?: string | null | undefined;
  roles?: Array<string>;
  userid?: string;
  image?: string | null | undefined;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: number;
}

const UserSchema = new Schema(
  {
    userid: { type: String, required: true },
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
        if (data === "undefined") return data;
        const regexp =
          /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
        if (!regexp.test(data)) throw new Error("Phone Number is Invalid!");
        return data;
      },
    },
    email: {
      type: String,
      required: true,
      validator: {
        regexp:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Email Address is not valid!",
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: ModelTypes<UserProfileIF, any> = model(
  "UserProfile",
  UserSchema,
  {
    idKey: "userid",
  }
);

export default UserModel;
