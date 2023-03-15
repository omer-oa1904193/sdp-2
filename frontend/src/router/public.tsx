import React from "react";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";

export const publicRoutes = [
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "login/",
        element: <LoginPage/>,
        meta: {
            hideHeader: true
        }
    },
];