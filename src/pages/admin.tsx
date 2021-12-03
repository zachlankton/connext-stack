import getUserSession from "src/utils/getUserSession";

const Admin = ({ data }: { data: any }) => {
  return (
    <>
      <h1>Admin</h1>
      <h4>{data.test}</h4>;
    </>
  );
};

export async function getServerSideProps(context: any) {
  const user = await getUserSession(context.req);
  const data: any = {};

  if (user && user.hasRole("ADMIN")) {
    data.test = "User has admin role!";
  } else {
    data.test = "You do not have permission!";
  }

  // Pass data to the page via props
  return { props: { data } };
}

export default Admin;
