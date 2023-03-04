import {Outlet, useMatch, useMatches} from "@tanstack/react-location";
import React, {useContext} from "react";
import {AuthNavBar} from "src/components/common/layouts/AuthNavBar/AuthNavBar.jsx";
import {GuestNavBar} from "src/components/common/layouts/GuestNavBar/GuestNavBar.jsx";
import {UserContext} from "src/contexts/UserContext.js";

export function RootLayout() {
    const userContext = useContext(UserContext);
    const {route} = useMatches().slice(-1)[0]
    return <>
        {!(route?.meta?.hideHeader) ?
            (
                userContext.user ?
                    <AuthNavBar></AuthNavBar>
                    :
                    <GuestNavBar></GuestNavBar>
            )
            : ""
        }
        <div className={`${!route?.meta?.hideHeader ? "page-with-header" : ""}`}>
            <Outlet/>
        </div>
    </>;
}