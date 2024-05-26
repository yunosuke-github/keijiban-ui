// src/pages/UserSettingsPage.js
import React from 'react';
import UserSettings from '../components/UserSettings';

const UserSettingsPage = ({ user, onUpdate }) => {
  return <UserSettings user={user} onUpdate={onUpdate} />;
};

export default UserSettingsPage;
