import Link from "next/link";
import { connextFormSubmit, getFormSubmission } from "src/utils/connextForm";
import getUserSession from "src/utils/getUserSession";

const Admin = (props: any) => {
  const data = props.data || props;

  const handleSubmit = async (ev: any) => {
    const res = await connextFormSubmit(ev);
    console.log(res);
  };

  return (
    <>
      <h1>Admin</h1>
      <Link href="/admin/userlist">
        <a>
          <button>User List</button>
        </a>
      </Link>
      {data.noPermission ? <h4>No Permission</h4> : <h4>{data?.test}</h4>}

      <form method="post" onSubmit={handleSubmit}>
        <input name="first_name" type="text" />
        <input type="submit" />
      </form>
    </>
  );
};
export default Admin;

export async function getServerSideProps(context: any) {
  const user = await getUserSession(context.req);
  if (user.notLoggedIn || user.hasNoRole("ADMIN")) return user.noPermission;

  const data: any = {};
  data.test = "User has admin role!";

  const formData = await getFormSubmission(context.req);
  console.log(formData);

  return { props: { data } };
}
