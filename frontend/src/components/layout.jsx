import RouteGuard from "@/components/RouteGuard.jsx";
import NavBarAuth from "./nav-bars/nav-bar-auth";
import NavBarPublic from "./nav-bars/nav-bar-public";

export default function Layout({children, pageProps}) {
    if (pageProps.routeMetaData?.requiresAuth) {
        return (
            <>
                <RouteGuard>
                    <NavBarAuth/>
                    {children}
                </RouteGuard>
            </>
        )
    } else {
        return (
            <>
                <NavBarPublic/>
                {children}
            </>
        )
    }

}