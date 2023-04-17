import React, { useEffect, useState } from "react";
import UserMenu from "../../components/user/UserMenu/UserMenu";
import UserDetailsCard from "../../components/user/UserDetailsCard/UserDetailsCard";
import USERS_API from "../../services/usersApi";
import { formatDate } from "../../utils/formatDate";
import { countTotalDocuments } from "../../utils/countTotalDocuments";
import { RTMSession } from "../../services/RTMSession";
import { useNavigate } from "react-router";
import { useGlobalTheme } from "../../context/ThemeContext";
import {  Skeleton, Stack } from "@mui/material";
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
  const { setThemeMod } = useGlobalTheme();

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await USERS_API.getUser();
      const data: any = response.data; // Access the data property of the response object
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
  };

  const handleDeleteDirectories = async () => {
    setIsLoading(true);
    try {
      await USERS_API.deleteAllDirectories();
      await getUserDetails();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      await USERS_API.deleteCurrentUser();
      logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <section className="page user-page">
      {!isLoading && user && (
        <>
          <UserDetailsCard userDetails={user} />
          <UserMenu
            handleLogout={logoutUser}
            handleDeleteDirectories={handleDeleteDirectories}
            handleDeleteUser={handleDeleteUser}
          />
        </>
      )}
      {isLoading && (
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="rectangular" sx={{ fontSize: "1rem" , animationDuration: "1s"}} />

          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular"  sx={{ animationDuration: "1s"}}  width={40} height={40} />
          <Skeleton variant="rectangular" sx={{ animationDuration: "1s"}} width={210} height={60} />
          <Skeleton variant="rounded" sx={{ animationDuration: "1s"}} width={210} height={60} />
        </Stack>
      )}
    </section>
  );
};

export default UserPage;
