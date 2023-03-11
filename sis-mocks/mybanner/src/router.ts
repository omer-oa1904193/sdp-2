import express from "express";
import UserService from "./services/UserService.js";

export const router = express.Router();

router.get("/users/", UserService.getUsers);