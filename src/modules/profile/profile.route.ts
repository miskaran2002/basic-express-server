import { Router } from "express";
import { profileController } from "./profile.controller";


const router= Router();

export const profileRoute=router;

router.post("/",profileController.createProfile);