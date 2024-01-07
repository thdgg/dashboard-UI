import Container from "@/components/container";
import TableUsers from "@/components/table/users";

import { useMediaQuery } from "react-responsive";

const UserManagement = () => {
  const isAboveMedium = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <Container>
      <h1 className="text-5xl font-bold">User Management</h1>
      <div className={`flex gap-3 mt-10 ${isAboveMedium ? "":  " ml-0 w-5/6"}`}>
        <TableUsers />
      </div>
    </Container>
  );
};

export default UserManagement;
