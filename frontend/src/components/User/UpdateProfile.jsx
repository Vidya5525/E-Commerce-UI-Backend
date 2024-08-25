import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from '../layouts/Loader/Loader.jsx';
import {useDispatch , useSelector} from  "react-redux";
import { updateProfile } from '../../Redux/userReducer';
import { loadUser } from '../../Redux/userReducer';
import MetaData from "../layouts/MetaData.jsx";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{user,isUpdated,loading} = useSelector(state=>state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo192.png");


    const updateProfileSubmit = (e)=>{
        e.PreventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

    }


    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatar(user.avatar.url)
        }
        if(isUpdated){
            dispatch(loadUser())
            navigate("/account")
        }
    },[user,isUpdated]);


  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Update Profile" />
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>

            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <AccountBoxIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="updateProfileBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
)};

export default UpdateProfile;


