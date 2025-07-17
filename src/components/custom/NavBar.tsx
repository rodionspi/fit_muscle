'use client';

import Navigation from '@/types/Navigaton';
import React from 'react';
import UserMenubar from './Menubars/UserMenubar';
import MainMenubar from './Menubars/MainMenubar';

interface NavBarComponentProps {
  navigation: Navigation[];
  setNavigation: React.Dispatch<React.SetStateAction<Navigation[]>>
}

const NavBar = ({ navigation, setNavigation }: NavBarComponentProps) => {
  return (
    <>
      <MainMenubar navigation={navigation} setNavigation={setNavigation}/>
      <UserMenubar />
    </>
  )
}

export default NavBar;
