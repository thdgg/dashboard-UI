import UserDashboardAI from "@/apis/UserDashboardAI";
import Container from "@/components/container";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useEffect } from "react";
import { HomeData } from "./HomeData";
import Counter from "@/components/counter";

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
  console.log("/users/profile?username=" + auth?.userName);

  useEffect(() => {
    if (response.data) {
      setAuth({
        token: auth!.token,
        userName: auth!.userName,
        role: response.data.role,
      });
 
    }
  }, [response]);

  return (
    <Container>
      <div>
        <h1 className="text-5xl font-bold">Welcome, {auth?.userName}</h1>
        <div className="flex gap-3 mt-10">
          {HomeData.map((data, index) => (
            <span className="" key={index}>
              <Counter data={data} />
            </span>
          ))
          }
        </div>
        
      </div>
      
    </Container>
  );
};

export default Home;
