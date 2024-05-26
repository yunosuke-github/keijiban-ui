import React, { useEffect, useState } from 'react';
import {Container, Typography, Box, Chip, List, ListItem, ListItemText, Divider, CircularProgress} from '@mui/material';
import { Link } from 'react-router-dom';
import { getThreads } from '../api';

const Home = ({ username, onLogout }) => {
  const [popularThreads, setPopularThreads] = useState([]);
  const [newThreads, setNewThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const popularThreads = await getThreads('views', 'desc', 5);
        setPopularThreads(popularThreads);
        const newThreads = await getThreads('created_at', 'desc', 5);
        setNewThreads(newThreads);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            人気スレッド
          </Typography>
          <List>
            {popularThreads.map((thread) => (
              <React.Fragment key={thread.id}>
                <ListItem button component={Link} to={`/threads/${thread.id}`}>
                  <ListItemText primary={thread.name} secondary={`作成日時: ${thread.created_at} コメント数: ${thread.comment_count}`} />
                  <Chip label={thread.category} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            <ListItem button component={Link} to="/popular-threads">
              <ListItemText primary="もっと見る" sx={{ textAlign: 'center', color: '#10a37f' }} />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            新着スレッド
          </Typography>
          <List>
            {newThreads.map((thread) => (
              <React.Fragment key={thread.id}>
                <ListItem button component={Link} to={`/threads/${thread.id}`}>
                  <ListItemText primary={thread.name} secondary={`作成日時: ${thread.created_at} コメント数: ${thread.comment_count}`} />
                  <Chip label={thread.category} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            <ListItem button component={Link} to="/new-threads">
              <ListItemText primary="もっと見る" sx={{ textAlign: 'center', color: '#10a37f' }} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
