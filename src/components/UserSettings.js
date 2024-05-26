import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Avatar, Tabs, Tab } from '@mui/material';
import { getCurrentUser, updateUser } from '../api';

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(true);  // 編集モードをデフォルトに設定
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setName(currentUser.name);
      setEmail(currentUser.email);
      setAvatar(currentUser.avatar);
    };
    fetchUser();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(user.id, { name: name });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ color: '#FFFFFF', borderRadius: 2, p: 4, mt: 8 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Settings
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
        <Tab label="Profile" />
        <Tab label="Security" />
        <Tab label="User API keys" />
        <Tab label="Legacy" />
      </Tabs>
      <Box sx={{ mt: 4 }}>
        {tabIndex === 0 && user && (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar src={avatar} sx={{ width: 100, height: 100, mb: 2 }} />
            </Box>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2, input: { color: '#FFFFFF' }, '.MuiInputLabel-root': { color: '#888888' } }}
              InputLabelProps={{ style: { color: '#888888' } }}
            />
            <TextField
              label="Email address"
              fullWidth
              value={email}
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2, input: { color: '#FFFFFF' }, '.MuiInputLabel-root': { color: '#888888' } }}
              InputLabelProps={{ style: { color: '#888888' } }}
            />
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ mt: 2 }}
            >
              保存
            </Button>
          </Box>
        )}
        {tabIndex !== 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {tabIndex === 1 && 'Security settings...'}
            {tabIndex === 2 && 'User API keys settings...'}
            {tabIndex === 3 && 'Legacy settings...'}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserSettings;
