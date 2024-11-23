import { profileDetails } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/profile-details", profileDetails);

export default router;
