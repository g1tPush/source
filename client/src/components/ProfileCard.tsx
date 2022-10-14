import storage from "../features/storage";
import { updateUser } from "../api/apiCalls";
import Input from "./Input";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../features/hooks";
import {
  updateUser as updateUserAct,
  logout,
} from "../features/registration/registrationSlice";
const defaultProfileImage = require("../assets/profile.png");

interface contentStructure {
  id: number;
  username: string;
  email?: string;
  image?: string;
}

const ProfileCard = ({ user }: { user?: contentStructure }) => {
  const [inEditMode, setEditMode] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState(user?.username);

  const { id, username } = useAppSelector((state) => ({
    id: state.registration.id,
    username: state.registration.username,
  }));

  const onClickSave = async () => {
    setUpdateApiProgress(true);
    try {
      await updateUser(String(id), { username: newUsername! });
      setEditMode(false);
      dispatch(updateUserAct(newUsername!));
    } catch (error) {}
    setUpdateApiProgress(false);
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(username);
  };
  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteUser(String(id!));
      navigate("/");
      dispatch(logout());
    } catch (error) {}

    setDeleteApiProgress(false);
  };

  let content;

  if (inEditMode) {
    content = (
      <>
        <Input
          label="Change your username"
          id="username"
          initialValue={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />
        <ButtonWithProgress
          onClick={onClickSave}
          apiProgress={updateApiProgress}
        >
          Save
        </ButtonWithProgress>{" "}
        <button className="btn btn-outline-secondary" onClick={onClickCancel}>
          Cancel
        </button>
      </>
    );
  } else {
    content = (
      <>
        <h3>{newUsername}</h3>
        {user?.id === id && (
          <>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </div>
            <div className="pt-2">
              <button
                className="btn btn-danger"
                onClick={() => setModalVisible(true)}
              >
                Delete My Account
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <img
            src={defaultProfileImage}
            alt="profile"
            width="200"
            height="200"
            className="rounded-circle shadow"
          />
        </div>
        <div className="card-body">{content}</div>
      </div>
      {modalVisible && (
        <Modal
          content="Are you sure to delete your account?"
          onClickCancel={() => setModalVisible(false)}
          onClickConfirm={onClickDelete}
          apiProgress={deleteApiProgress}
        />
      )}
    </>
  );
};

export default ProfileCard;
