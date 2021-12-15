import getUserSession from "src/utils/getUserSession";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Models from "@/models/index";
import UserProfileForm from "@/components/UserProfileForm";
import { useState } from "react";
import { getFormSubmission } from "src/utils/connextForm";
import Img from "@/components/utils/CachedImg";

const Admin = (props: any) => {
  const { users, roles } = props;
  type selectedUserType = [selectedUser: any, setSelectedUser: any];
  const [selectedUser, setSelectedUser]: selectedUserType = useState({});

  if (props.noPermission) return <h1>Not Authorized</h1>;

  const selected = (grid: any) => {
    const selected = grid.api.getSelectedRows()[0] || {};
    const userRoles = roles.find(
      (role: any) => role.user === selected.userid
    ) || { roles: [] };
    const user = {
      userid: "",
      firstName: "",
      lastName: "",
      username: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      name: "",
      phone: "",
      ...selected,
    };
    setSelectedUser({});
    setSelectedUser({ user, roles: userRoles });
  };

  const ImgRender = (data: any) => (
    <Img src={data.value} alt="User Image" style={{ width: 40 }} />
  );

  const rowKey = (data: { userid: any }) => data.userid;

  const defaultColDef = {
    flex: 1,
    minWidth: 200,
    filter: true,
    floatingFilter: true,
    sortable: true,
    unSortIcon: true,
  };

  return (
    <>
      <h1>User List</h1>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          frameworkComponents={{ imgRender: ImgRender }}
          rowData={users}
          getRowNodeId={rowKey}
          rowSelection="single"
          onSelectionChanged={selected}
          defaultColDef={defaultColDef}
        >
          <AgGridColumn
            field="image"
            headerName=""
            filter={false}
            sortable={false}
            floatingFilter={false}
            cellRenderer="imgRender"
            maxWidth={60}
          />
          <AgGridColumn field="userid" />
          <AgGridColumn field="name" />
        </AgGridReact>
      </div>
      {selectedUser.user && <UserProfileForm user={selectedUser} />}
    </>
  );
};
export default Admin;

export async function getServerSideProps(context: any) {
  const user = await getUserSession(context.req);
  if (user.notLoggedIn || user.hasNoRole("ADMIN")) return user.noPermission;

  const formData = await getFormSubmission(context.req);
  if (formData) return handleForm(formData);

  const users = (await Models.UserProfile.find(undefined, { lean: true })).rows;
  const roles = (await Models.UserRoles.find(undefined, { lean: true })).rows;

  return { props: { users, roles } };
}

function handleForm(formData: any) {
  console.log(formData);

  return { props: { data: formData } };
}
