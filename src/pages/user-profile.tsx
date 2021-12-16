import { connextFormSubmit, getFormSubmission } from "src/utils/connextForm";
import Img from "@/components/utils/CachedImg";
import getUserSession from "src/utils/getUserSession";
import Models from "../models";
import ToastComponent from "@/components/utils/Toast";

export default function UserProfileForm(props: any) {
  const user = props.user;
  const { toast, Toast } = ToastComponent();
  const handleSubmit = async (ev: any) => {
    const res: any = await connextFormSubmit(ev);
    if (res.success) return toast("success");
    toast("error");
  };

  if (!user) return <h1>No User</h1>;

  return (
    <>
      <Toast />
      <h3>User Profile Form</h3>
      <div>
        <form onSubmit={handleSubmit} method="post">
          <input type="hidden" defaultValue={user.userid} name="user.userid" />
          <input type="hidden" defaultValue={user.image} name="user.image" />
          <input type="hidden" defaultValue={user.name} name="user.name" />
          <Img src={user.image} alt="User Image" />

          <label>First Name</label>
          <input name="user.firstName" defaultValue={user.firstName} />

          <label>Last Name</label>
          <input name="user.lastName" defaultValue={user.lastName} />

          <label>User Name</label>
          <input name="user.username" defaultValue={user.username} />

          <label>Phone</label>
          <input name="user.phone" defaultValue={user.phone} />

          <label>Street</label>
          <input name="user.street" defaultValue={user.street} />

          <label>City</label>
          <input name="user.city" defaultValue={user.city} />

          <label>State</label>
          <input name="user.state" defaultValue={user.state} />

          <label>Zip Code</label>
          <input name="user.zipCode" defaultValue={user.zipCode} />

          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const user = await getUserSession(context.req);
  if (user.notLoggedIn || user.hasNoRole("USER")) return user.noPermission;

  const formData = await getFormSubmission(context.req);
  if (formData) return await handleForm(formData);

  const userProfile = await Models.UserProfile.findById(user.user.email, {
    lean: true,
  });

  return { props: { user: userProfile } };
}

async function handleForm(formData: any) {
  const user = new Models.UserProfile(formData.user);

  try {
    const savedUser = await user.save();

    const data = {
      user: fixObj(savedUser),
    };

    return { props: { ...data, success: true } };
  } catch (e: any) {
    console.error(e);
    return { props: { err: e.message } };
  }
}

function fixObj(obj: any) {
  return JSON.parse(JSON.stringify(obj.toJSON()));
}
