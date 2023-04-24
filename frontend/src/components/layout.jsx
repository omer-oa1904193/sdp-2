import RouteGuard from "@/components/RouteGuard.jsx";
import NavBarAuth from "./nav-bars/nav-bar-auth";
import NavBarPublic from "./nav-bars/nav-bar-public";

export default function Layout({children, pageProps}) {
    const routeMetaData = pageProps.routeMetaData ?? {};
    if (routeMetaData.requiresAuth) {
        return (
            <>
                <RouteGuard>
                    {routeMetaData.showHeader && <NavBarAuth/>}
                    {children}
                </RouteGuard>
            </>
        )
    } else {
        return (
            <>
                {routeMetaData.showHeader && <NavBarPublic/>}
                {children}
            </>
        )
    }

}