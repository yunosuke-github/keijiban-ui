import React, {useEffect, useState} from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PopularThreads from './pages/PopularThreads';
import NewThreads from './pages/NewThreads';
import UserSettingsPage from './pages/UserSettingsPage';
import MainLayout from './layouts/MainLayout';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateThread from "./pages/CreateThread";
import CreateUser from "./pages/CreateUser";
import {getCurrentUser, loadAuthToken, setAuthToken} from "./api";
import {Box, CircularProgress} from "@mui/material";
import ThreadDetail from "./pages/ThreadDetail";
import MyThreads from "./pages/MyThreads";
import SearchThreads from "./pages/SearchThreads";

const drawerWidth = 240;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', email: '' });
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    loadAuthToken(); // アプリケーションの初期化時にトークンをロード
    const storedToken = localStorage.getItem('authToken');

    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        // ユーザー情報を更新する処理（必要に応じて）
        setUser(currentUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error.message);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    if (storedToken) {
      fetchUser();
    } else {
      setLoading(false);
    }

  }, []);

  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser({ username: '', email: '' });
    setIsLoggedIn(false);
    setAuthToken(null); // ログアウト時にトークンをクリア
  };

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <MainLayout user={user} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}>
          <Route index element={<HomePage onLogout={handleLogout} />} />
          <Route path="/user-settings" element={<UserSettingsPage user={user} onUpdate={handleUpdate} />} />
          <Route path="popular-threads" element={<PopularThreads />} />
          <Route path="new-threads" element={<NewThreads />} />
          <Route path="my-threads" element={<MyThreads />} />
          <Route path="search-threads" element={<SearchThreads />} />
          <Route path="create-thread" element={<CreateThread />} />
          <Route path="threads/:threadId" element={<ThreadDetail />} />
          {/* 他のルートもここに追加可能 */}
        </Route>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
