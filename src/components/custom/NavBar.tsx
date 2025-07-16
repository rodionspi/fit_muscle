'use client';

import Navigation from '@/types/Navigaton';
import React from 'react';
import UserMenubar from './Menubars/UserMenubar';
import MainMenubar from './Menubars/MainMenubar';

interface NavBarComponentProps {
  navigation: Navigation[];
}

const NavBar = ({ navigation }: NavBarComponentProps) => {
  return (
    <>
      <MainMenubar navigation={navigation} />
      <UserMenubar />
    </>
  )
}

export default NavBar;
