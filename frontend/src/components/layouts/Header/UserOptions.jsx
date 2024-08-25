import { useState } from "react"
import React from 'react';
import "./Header.css";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/userReducer.js";
import { useDispatch,useSelector} from "react-redux";

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);


    const options = [
        {icons:<ListAltIcon/>,name:"Orders",func:orders},
        {icons:<PersonIcon/>,name:"Profile",func:account},

        {
            icon: (
              <ShoppingCartIcon
                style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
              />
            ),
            name: `Cart(${cartItems.length})`,
            func: cart,
        },

        {icons:<ExitToAppIcon/>,name:"Logout",func:logOut},
    ];

    if(user.role==="admin"){
        options.unshift({icons:<DashboardIcon/>,name:"Dashboard",func:dashboard})
    }

    function dashboard(){
      navigate("/admin/dashboard")
    }

    function orders(){
      navigate("/orders")
    }

    function account(){
      navigate("/account")
    }

    function cart() {
      navigate("/cart");
    }

    function logOut(){
      dispatch(logout());
    }

  return (
    <>
    <Backdrop open={open} style={{zIndex:"10"}} />
    <SpeedDial
       ariaLabel="SpeedDial tooltip example"
       onClose={()=>setOpen(false)}
       onOpen={()=>setOpen(true)}
       style={{zIndex:"11"}}
       open={open}
       direction="down"
       className="speedDial"
       icon={
         <img className="speedDialIcon"
         src={user?.avatar?.url || "/logo192.png"} // Use optional chaining and default value
         alt="Profile"
         />
       }
       >

        {options.map((item)=>(
            <SpeedDialAction key={item.name} icon={item.icons} tooltripTitle={item.name} onClick={item.func}/>
        ))}
       </SpeedDial>
    </>
  )
}

export default UserOptions;