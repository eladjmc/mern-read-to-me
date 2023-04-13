import React, { useEffect, useState } from "react";
import UserMenu from "../../components/user/UserMenu/UserMenu";
import UserDetailsCard from "../../components/user/UserDetailsCard/UserDetailsCard";
import USERS_API from "../../services/usersApi";
import { formatDate } from "../../utils/formatDate";
import { countTotalDocuments } from "../../utils/countTotalDocuments";
import { RTMSession } from "../../services/RTMSession";
import { useNavigate } from "react-router";
import { useGlobalTheme } from "../../context/ThemeContext";

interface UserDetails {
  name: string;
  age: number;
  createdAt: string;
  totalDirectories: number;
  totalDocuments: number;
}

const UserPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserDetails | null>(null);
  const navigator = useNavigate();
  const {setThemeMod} = useGlobalTheme();

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await USERS_API.getUser();
      const data:any = response.data; // Access the data property of the response object
      const userDetails: UserDetails = {
        name: data.name,
        age: data.age ? data.age : 0,
        createdAt: formatDate(data.createdAt),
        totalDirectories: data.directories.length,
        totalDocuments: countTotalDocuments(data.directories),
      };
  
      setUser(userDetails);
    } catch (error) {
      console.error(error);
      logoutUser();

    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    RTMSession.token = null;
    setThemeMod("light");
    navigator(`/login`);

  }
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <section className="page user-page">
      {!isLoading && user && (
        <>
          <UserDetailsCard userDetails={user} />
          <UserMenu handleLogout={logoutUser} />
        </>
      )}
      {isLoading && <div>im a loader</div>}
    </section>
  );
};

export default UserPage;


