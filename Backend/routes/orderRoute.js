import express from 'express';
import {isAuthenticatedUser,authorizeRoles} from "../middleware/auth.js"
//const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

import { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";
//const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require("../controllers/orderController");

const router = express.Router();



router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/order/me").get(isAuthenticatedUser,myOrders);

router.route("/admin/orders")
.get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);


export default router;