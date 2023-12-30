import UserDashboardAI from "@/apis/UserDashboardAI";
import Container from "@/components/container";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useEffect } from "react";

const Home = () => {
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const [response, error, loading, refetch] = useAxios({
    axiosInstance: UserDashboardAI,
    method: "get",
    url: "/users/profile?username=" + auth?.userName,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    },
  });

  useEffect(() => {
    if (response.data) {
      setAuth({
        token: auth!.token,
        userName: auth!.userName,
        role: response.data.roles,
      });
 
    }
  }, [response]);

  return (
    <Container>
      <h1 className="text-5xl font-bold">Welcome, {auth?.role} {auth?.userName}</h1>
    </Container>
  );
};

export default Home;
