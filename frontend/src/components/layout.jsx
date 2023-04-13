import RouteGuard from "@/components/RouteGuard.jsx";
import NavBarAuth from "./nav-bars/nav-bar-auth"

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
                {/*<NavBarGuest/>*/}
                {children}
            </>
        )
    }

}