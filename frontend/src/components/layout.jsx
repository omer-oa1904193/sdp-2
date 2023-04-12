
import NavBarAuth from './nav-bars/nav-bar-auth'

export default function Layout({ children }) {
  return (
    <>
      <NavBarAuth/>
      {children}
    </>
  )
}