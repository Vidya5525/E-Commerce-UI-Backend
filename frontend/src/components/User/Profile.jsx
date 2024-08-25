// import React, { Fragment, useEffect } from "react";
// import MetaData from '../layouts/MetaData.jsx';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Loader from '../layouts/Loader/Loader.jsx';
// import "./Profile.css";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//     const navigate = useNavigate();
//     const {user,isAuthenticated,loading} = useSelector(state=>state.user);

//     useEffect(()=>{
//         if(isAuthenticated === false){
//           navigate("/login");
//       }

//     },[history,isAuthenticated]);


//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title={`${user.name}'s Profile`} />
//           <div className="profileContainer">
//             <div>
//               <h1>My Profile</h1>
//               <img src={user.avatar.url} alt={user.name} />
//               <Link to="/me/update">Edit Profile</Link>
//             </div>
//             <div>
//               <div>
//                 <h4>Full Name</h4>
//                 <p>{user.name}</p>
//               </div>
//               <div>
//                 <h4>Email</h4>
//                 <p>{user.email}</p>
//               </div>
//               <div>
//                 <h4>Joined On</h4>
//                 <p>{String(user.createdAt).substring(0, 10)}</p>
//               </div>

//               <div>
//                 <Link to="/orders">My Orders</Link>
//                 <Link to="/password/update">Change Password</Link>
//               </div>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// }

// export default Profile;

import React, { Fragment, useEffect } from "react";
import MetaData from '../layouts/MetaData.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../layouts/Loader/Loader.jsx';
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, loading } = useSelector(state => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img
                                src={user?.avatar?.url || "/logo192.png"} // Use optional chaining and fallback image
                                alt={user.name || "User"}
                            />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{user.createdAt ? String(user.createdAt).substring(0, 10) : "N/A"}</p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Profile;



