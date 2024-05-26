import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppBar = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateThread = () => {
    navigate('/create-thread');
  };

  const handleProfile = () => {
    navigate('/user-settings');
    handleClose();
  };

  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          掲示板アプリ
        </Typography>
        <Button variant="contained" sx={{ mr: 2 }} onClick={handleCreateThread}>
          スレッド作成
        </Button>
        {user && (
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar>{user.name[0]}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ '& .MuiPaper-root': { backgroundColor: '#343740' } }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleProfile}>Settings</MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
