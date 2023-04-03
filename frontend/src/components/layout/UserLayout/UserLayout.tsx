import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../../navbar/Navbar';

const UserLayout = () => {
  return (<>
    <Navbar />
    <Outlet />
  </>)
}

export default UserLayout