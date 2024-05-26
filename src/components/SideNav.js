// src/components/SideNav.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography } from '@mui/material';
import { Home, LibraryBooks, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const SideNav = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          サイドナビ
        </Typography>
      </Toolbar>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="ホーム" />
        </ListItem>
        <ListItem button component={Link} to="/my-threads">
          <ListItemIcon><LibraryBooks /></ListItemIcon>
          <ListItemText primary="My Threads" />
        </ListItem>
        <ListItem button component={Link} to="/search-threads">
          <ListItemIcon><Search /></ListItemIcon>
          <ListItemText primary="Search Threads" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;
