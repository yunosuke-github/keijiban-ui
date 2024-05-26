// src/pages/LoginPage.js
import React from 'react';
import Login from '../components/Login';
import {Box, Container} from "@mui/material";

const LoginPage = ({ onLogin }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 画面全体の高さ
      }}
    >
      <Container maxWidth="sm">
        <Login onLogin={onLogin} />
      </Container>
    </Box>
  )
    ;
};

export default LoginPage;
