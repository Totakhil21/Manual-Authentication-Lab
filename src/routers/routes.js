import express from "express";
import authCtl from "../controllers/auth.controller.js";
import pageCtl from "../controllers/page.controller.js";
import {isloggedIn, hasRole} from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";
import req from "express/lib/request.js";


const router = express.Router();

router.get("/", pageCtl.homePage);

router.get("/login", authCtl.loginPage);
router.post("/login", authCtl.login);

router.get("/register", authCtl.registerPage);
router.post("/register", authCtl.register);

router.get("/dashboard", isloggedIn, pageCtl.dashboardPage);
console.log(req.user);

router.get("/admin", isloggedIn, hasRole("admin"), pageCtl.adminPage);

router.get("/logout", logout);

export default router;