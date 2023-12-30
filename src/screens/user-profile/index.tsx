import UserDashboardAI from "@/apis/UserDashboardAI";
import Container from "@/components/container";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";

interface UserDetails {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  createTime: string;
}

const UserProfile = () => {
  const { auth } = useAuth();
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
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (response?.data) {
      setUserDetails(response.data.userDetails);
    }
  }, [response]);

  useEffect(() => {
    if (userDetails) {
      auth!.userId = userDetails.id;
    }
  }, []);

  const formattedCreateTime = userDetails
    ? new Date(userDetails.createTime).toISOString().split("T")[0]
    : "";

  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <img src={"https://picsum.photos/200"} alt="" />
        <h1 className="text-2xl font-bold my-2">{auth?.userName}</h1>
        <span className="flex flex-col font-thin items-center justify-center">
          <p>Joined {formattedCreateTime}</p>
          <p>Role: {auth?.role}</p>
        </span>
      </div>
    </Container>
  );
};

export default UserProfile;
