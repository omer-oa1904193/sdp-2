import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const HomePage: React.FC = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user || localStorage.authToken) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router, userContext.user]);

  return (
    <>
      <h1>This is the home page</h1>
      <a href="/login">Login</a>
    </>
  );
};

export default HomePage;
