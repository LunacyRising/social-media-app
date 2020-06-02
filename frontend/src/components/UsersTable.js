import React, { useState } from "react";
import EditForm from "./EditForm";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import {
  Paper,
  Button,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Tooltip
} from "@material-ui/core/";
import { useDispatch } from "react-redux";
import { deleteUserAction } from "../actions/userActions/deleteUserAction";
import { fetchUsers } from "../actions/userActions/fetchUsersAction";

////////////////////////////////////////////////////////////////////////
const UsersTable = ({ users, token, messageCode, reloadTable }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(1);
  const [usersPerPage] = useState(10);

  // get current Users
  const indexOfLastUser = currentUser * usersPerPage;
  const indexOfTheFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfTheFirstUser, indexOfLastUser);

  /////////////////////////////////////////////////////////////////////////
  const FormDefaultValues = {
    name: "",
    email: "",
    role: "",
    id: null
  };
  const [formValues, setFormValues] = useState(FormDefaultValues);
  const { name, email, role, id } = formValues;
  ////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();

  const removeUser = id => {
    dispatch(deleteUserAction({ token, id }));
    dispatch(fetchUsers({ token, id }));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  const editUser = (id, name, email, role) => {
    setFormValues({ name, email, role, id });
    setFormOpen(!formOpen);
  };
  ////////////////////////////////////////////////////
  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  /////////////////////////////////////////////////////
  return (
    <>
      {formOpen ? (
        <EditForm
          name={name}
          email={email}
          role={role}
          id={id}
          handleChange={handleChange}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          reloadAfterEdit={reloadTable}
          editUser={editUser}
        />
      ) : (
        <>
          <Pagination
            setCurrentUser={setCurrentUser}
            usersPerPage={usersPerPage}
            currentUser={currentUser}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">EDIT</TableCell>
                  <TableCell align="center">DELETE</TableCell>
                  <TableCell align="center">NAME</TableCell>
                  <TableCell align="center">EMAIL</TableCell>
                  <TableCell align="center">ROLE</TableCell>
                  <TableCell align="center">PASSWORD</TableCell>
                  <TableCell align="center">ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUsers.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Tooltip title="Edit" placement="top">
                        <Button
                          className={user.role === "admin" && "protectAdmin"}
                          onClick={() =>
                            editUser(user._id, user.name, user.email, user.role)
                          }
                        >
                          <EditOutlinedIcon></EditOutlinedIcon>
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="delete" placement="top">
                        <Button
                          className={user.role === "admin" && "protectAdmin"}
                          type="button"
                          onClick={() => removeUser(user._id)}
                        >
                          <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Link to={`/admin/users/${user._id}`} target="_blank">
                        {user.name}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {user.email}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {user.role}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {user.password}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {user._id}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default UsersTable;
