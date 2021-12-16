import { useState } from "react";
import { connextFormSubmit } from "src/utils/connextForm";
import Img from "@/components/utils/CachedImg";
import ToastComponent from "@/components/utils/Toast";

export default function UserProfileForm(props: any) {
  const { user, roles } = props.user;
  const { toast, Toast } = ToastComponent();
  const [rolesList, setRolesList] = useState(roles);

  const addRole = (ev: any) => {
    ev.preventDefault();
    const roles = [...rolesList.roles, ""];
    setRolesList({ ...rolesList, roles });
  };

  const handleSubmit = async (ev: any) => {
    const res: any = await connextFormSubmit(ev);
    if (res.success) return toast("success");
    toast("error");
  };

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

          <p>Roles</p>
          <input type="hidden" defaultValue={user.userid} name="roles.user" />
          <input type="hidden" defaultValue={rolesList.id} name="roles.id" />

          {rolesList.roles.map((role: any, idx: number) => (
            <select key={idx} name={`roles.roles[${idx}]`} defaultValue={role}>
              <option>ADMIN</option>
              <option>USER</option>
              <option>Purchasing</option>
              <option>Sales</option>
            </select>
          ))}

          {/* These inputs are here just for testing purposes */}
          <div style={{ display: "none" }}>
            <input type="hidden" defaultValue={user.userid} name="test1" />
            <input type="hidden" defaultValue={rolesList.id} name="test2" />
            {rolesList.roles.map((role: any, idx: number) => (
              <input
                key={idx}
                type="hidden"
                defaultValue={role}
                name={`test3.roles[${idx}].role`}
              />
            ))}
          </div>

          <button onClick={addRole}>Add</button>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
