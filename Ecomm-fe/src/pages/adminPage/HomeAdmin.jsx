import { useContext } from "react";
import { AuthContext } from "../../components/context/auth.context";

const AdminPage = () => {
  const { user, setUser } = useContext(AuthContext);

  console.log("AdminPage user", user);
  return (
    <div>
      <h1>Admin Page</h1>
      <div className="account-title-2">
        <span>Welcome!</span>
        <span className="account-title-2a">
          {user.fullName || user.username}
        </span>
      </div>
    </div>
  );
};

export default AdminPage;
