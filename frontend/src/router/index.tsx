import React from "react";
import {RootLayout} from "../components/common/layouts/RootLayout";
import {privateRoutes} from "./private";
import {publicRoutes} from "./public";

export const routes = [
    {
        path: "",
        element: <RootLayout></RootLayout>,
        children: [
            ...publicRoutes,
            // ...(privateRoutes.map(r => ({...r, element: <RouteProtector>{r.element}</RouteProtector>}))),
            {
                path: "*",
                element: <></>
            }
        ]
    }
];