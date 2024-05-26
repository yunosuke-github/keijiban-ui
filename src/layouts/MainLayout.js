import React, {useEffect} from 'react';
import {Box, CssBaseline, Container, Toolbar, CircularProgress} from '@mui/material';
import {Outlet, useNavigate} from 'react-router-dom';
import AppBar from '../components/AppBar';
import SideNav from '../components/SideNav';
import { getCurrentUser } from '../api';

const drawerWidth = 240;

const MainLayout = ({ user, onLogout }) => {

  const navigate = useNavigate();
  // const [loading, setLoading] = React.useState(true);


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       // ユーザー情報を更新する処理（必要に応じて）
  //       console.log(currentUser);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error.message);
  //       onLogout();
  //       navigate('/login');
  //     }
  //   };
  //
  //   fetchUser();
  // }, [onLogout, navigate]);

  // if (loading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar user={user} onLogout={onLogout} />
      <SideNav />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: `calc(100% - ${drawerWidth}px)`}}
      >
        <Toolbar />
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
