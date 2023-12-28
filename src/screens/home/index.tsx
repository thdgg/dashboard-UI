import Container from "@/components/container";
import useAuth from "@/hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  return (
    <Container>
      <h1 className="text-5xl font-bold">Welcome, {auth?.userName}</h1>
    </Container>
  );
};

export default Home;
