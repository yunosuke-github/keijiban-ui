import React, {useEffect, useState} from 'react';
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
  CircularProgress
} from '@mui/material';
import {getThreads} from "../api";
import {Link} from "react-router-dom";

const NewThreads = () => {

  const [page, setPage] = useState(1);
  const threadsPerPage = 20;
  const [newThreads, setNewThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * threadsPerPage;
  const selectedThreads = newThreads.slice(startIndex, startIndex + threadsPerPage);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const newThreads = await getThreads('created_at', 'desc');
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
      <Typography component="h1" variant="h4" sx={{ mt: 4, mb: 4 }}>
        新着スレッド一覧
      </Typography>
      <List>
        {selectedThreads.map((thread) => (
          <React.Fragment key={thread.id}>
            <ListItem button component={Link} to={`/threads/${thread.id}`}>
              <ListItemText primary={thread.name} secondary={`作成日時: ${thread.created_at}    コメント数: ${thread.comment_count}　閲覧数: ${thread.views}`} />
              <Chip label={thread.category} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(newThreads.length / threadsPerPage)}
          page={page}
          onChange={handleChange}
        />
      </Box>
    </Container>
  );
};

export default NewThreads;
