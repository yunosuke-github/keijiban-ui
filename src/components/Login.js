// src/components/Login.js
import React, {useState} from 'react';
import {Box, Button, Container, Link, TextField, Typography} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {getCurrentUser, loginUser, setAuthToken} from '../api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { access_token } = await loginUser({ email, password });
      setAuthToken(access_token);
      const currentUser = await getCurrentUser();
      onLogin(currentUser);
      navigate('/');
    } catch (error) {
      console.error(error.message);
      // エラーメッセージを表示する処理を追加できます
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, pt: 2, pb: 2 }}
            onClick={handleLogin}
          >
            ログイン
          </Button>
          <Link component={RouterLink} to="/create-user" variant="body2" sx={{ color: '#10a37f' }}>
            新規ユーザー登録
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
