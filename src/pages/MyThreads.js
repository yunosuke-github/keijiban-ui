import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Pagination,
  Box,
  CircularProgress,
  Paper
} from '@mui/material';
import { getCurrentUser, getMyThreads } from '../api';
import { Link } from 'react-router-dom';

const MyThreads = () => {
  const [page, setPage] = useState(1);
  const threadsPerPage = 20;
  const [myThreads, setMyThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * threadsPerPage;
  const selectedThreads = myThreads.slice(startIndex, startIndex + threadsPerPage);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const currentUser = await getCurrentUser();
        const myThreads = await getMyThreads(currentUser.id, 'created_at', 'desc');
        setMyThreads(myThreads);
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
      <Typography component="h1" variant="h4" sx={{ mt: 4, mb: 4 }}>
        My Threads
      </Typography>
      {myThreads.length === 0 ? (
        <Typography component="h2" variant="h6">
          自分が作成したスレッドはありません
        </Typography>
      ) : (
        <>
          <List>
            {selectedThreads.map((thread) => (
              <React.Fragment key={thread.id}>
                <ListItem button component={Link} to={`/threads/${thread.id}`}>
                  <ListItemText
                    primary={thread.name}
                    secondary={`作成日時: ${thread.created_at}    コメント数: ${thread.comment_count}　閲覧数: ${thread.views}`}
                  />
                  <Chip label={thread.category} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.ceil(myThreads.length / threadsPerPage)}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default MyThreads;
