import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { searchThreads } from '../api';
import { Link } from 'react-router-dom';

const categories = [
  'Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Ruby', 'PHP', 'Swift',
  'Kotlin', 'Go', 'Rust', 'Scala', 'Perl', 'Haskell', 'Docker', 'Kubernetes',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'AWS', 'Azure',
  'Google Cloud', 'Jenkins', 'Git', 'Linux', 'Terraform'
];

const sortOptions = [
  { value: 'created_at', label: '作成日時' },
  { value: 'name', label: 'スレッド名' },
  { value: 'views', label: '閲覧回数' },
  { value: 'category', label: 'カテゴリ' }
];

const orderOptions = [
  { value: 'asc', label: '昇順' },
  { value: 'desc', label: '降順' }
];

const SearchThreads = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('desc');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await searchThreads(query, category, sort, order);
      setThreads(response);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={8}>
          <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
            検索結果
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {threads.length > 0 ? (
                threads.map((thread) => (
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
                ))
              ) : (
                <Typography variant="body1">条件に一致するスレッドはありません</Typography>
              )}
            </List>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            検索条件
          </Typography>
          <TextField
            label="キーワード"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>カテゴリ</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="カテゴリ"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>ソート</InputLabel>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              label="ソート"
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>順序</InputLabel>
            <Select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              label="順序"
            >
              {orderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ mt: 2 }}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchThreads;
