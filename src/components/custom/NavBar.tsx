'use client';

import Navigation from '@/types/Navigaton';
import { useUser } from '@/contexts/UserContext';
import React from 'react';
import UserMenubar from './Menubars/UserMenubar';
import MainMenubar from './Menubars/MainMenubar';

interface NavBarComponentProps {
  navigation: Navigation[];
}

const NavBar = ({ navigation }: NavBarComponentProps) => {

  const {userData, setUserData} = useUser();

  const handleSignOut = () => {
    setUserData(null);
    localStorage.clear();
  } 

  return (
    <>
      <MainMenubar navigation={navigation} />
      <UserMenubar />
    </>
  )
}

export default NavBar;
