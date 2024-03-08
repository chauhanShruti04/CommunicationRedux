import React, { useEffect, useState } from "react";
import { EditUserInfo } from "./EditUserInfo";
import { DeletePopup } from "../../Popup/DeletePopup";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser, setUserData } from "../../Redux/Slice";

const ManageUser = () => {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const [DeleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [errors, setErrors] = useState({ email: "", name: "" });
 


  const toggleEdit = (item) => {
    setEditOpen(true);
    setSelectedData(item);
    setDeleteOpen(false);
  };

  const toggleDelete = (item) => {
    setDeleteOpen(true);
    setSelectedData(item);
    setEditOpen(false);
  };

  const validateForm = () => {
    let formIsValid = true;

    if (selectedData.email === "") {
      formIsValid = false;
      setErrors((prev) => ({ ...prev, email: "This Field Can't be Blank" }));
    }
    if (selectedData.username === "") {
      formIsValid = false;
      setErrors((prev) => ({ ...prev, name: "This Field Can't be Blank" }));
    }

    return formIsValid;
  };

  const handleSave = (value) => {
    if (validateForm()) {
      const updatedUsers = userData.map((user) => {
        if (user.id == selectedData?.id) {
          return {
            ...user,
            username: value.username,
            email: value.email
          };
        }
        return user;
      });
      dispatch(setUserData(updatedUsers));
      if (loggedInUser[0].email == selectedData.email) {
        const loggedUser = [{
          ...loggedInUser[0],
          email: value.email,
          username: value.username
        }];
        dispatch(setLoggedInUser(loggedUser));
      }
      setEditOpen(false);
    }
  };

  const handleDelete = () => {
    const updatedUsers = userData.filter((user) => user.id !== selectedData.id);
    dispatch(setUserData(updatedUsers));
    setDeleteOpen(false);

  };

  const closePopUp = () => {
    setDeleteOpen(false);
    setEditOpen(false);
    setErrors({ name: "", email: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: e.target.value ? "" : "This Field Can't be Blank",
      }));
    } else if (e.target.name === "username") {
      setErrors((prev) => ({
        ...prev,
        name: e.target.value ? "" : "This Field Can't be Blank",
      }));
    }
  };

  return (
    <>
      <div>
        <h1 className="heading">Users</h1>
      </div>
      <div>
        <Table bordered hover className="customTable">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">User Email ID</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr key={item?.id}>
                <td>{item?.username}</td>
                <td>{item?.email}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    className="btn"
                    onClick={() => toggleEdit(item)}
                  >
                    Edit
                  </Button>
                  {!loggedInUser.length || loggedInUser[0].email !== item.email ? (

                    <Button
                      variant="outline-dark"
                      className="btn"
                      onClick={() => toggleDelete(item)}
                    >
                      Delete
                    </Button>
                  ) : (

                    <Button
                      variant="outline-dark"
                      className="btn"
                      disabled
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <DeletePopup
        closePopUp={closePopUp}
        open={DeleteOpen}
        handleDelete={handleDelete}
      />

      <EditUserInfo
        editOpen={editOpen}
        closePopUp={closePopUp}
        selectedData={selectedData}
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
      />
    </>
  );
};

export default ManageUser;
