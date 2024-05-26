import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import {createThread, createUser} from "../api";
import {useNavigate} from "react-router-dom";

const categories = [
  'Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Ruby', 'PHP', 'Swift',
  'Kotlin', 'Go', 'Rust', 'Scala', 'Perl', 'Haskell', 'Docker', 'Kubernetes',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'AWS', 'Azure',
  'Google Cloud', 'Jenkins', 'Git', 'Linux', 'Terraform'
];

const CreateThread = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // スレッド作成処理をここに追加
    try {
      const thread = await createThread({ name: title, category: category, description: description });
      navigate(`/threads/${thread.id}`);
    } catch (error) {
      console.error(error.message);
      // エラーメッセージを表示する処理を追加できます
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          スレッド作成
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="スレッド名"
            inputProps={{ maxLength: 50 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            select
            margin="normal"
            required
            fullWidth
            label="カテゴリ"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="スレッドの説明"
            inputProps={{ maxLength: 400 }}
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, pt: 2, pb: 2}}
          >
            作成
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateThread;
