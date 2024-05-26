import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem
} from '@mui/material';
import { ThumbUp, ThumbDown, MoreVert } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { createComment, getComments, getCurrentUser, getThread, updateThread, deleteThread } from '../api';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const ThreadDetail = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedThread, setEditedThread] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const thread = await getThread(threadId);
        setThread(thread);
        setEditedThread({ name: thread.name, description: thread.description });
        const comments = await getComments(threadId, 'created_at', 'desc');
        setComments(comments);
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [threadId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      thread_id: threadId,
      content: comment
    };
    try {
      await createComment(newComment);
      const comments = await getComments(threadId, 'created_at', 'desc');
      setComments(comments);
      setComment('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleDislike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
      )
    );
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEditThread = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleSaveThread = async () => {
    try {
      await updateThread(threadId, editedThread);
      setThread({ ...thread, ...editedThread });
      setIsEditing(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteThread = async () => {
    try {
      await deleteThread(threadId);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderCommentContent = (content) => {
    const codeBlockRegex = /```(.*?)\n([\s\S]*?)```/gs;
    const parts = content.split(codeBlockRegex);

    return parts.map((part, index) => {
      if (index % 3 === 2) {
        const detectedLanguage = hljs.highlightAuto(part.trim()).language || 'plaintext';
        return (
          <Box key={index} sx={{ position: 'relative' }}>
            <SyntaxHighlighter language={detectedLanguage} style={materialDark}>
              {part.trim()}
            </SyntaxHighlighter>
          </Box>
        );
      }
      return (
        <Typography variant="body1" component="span" sx={{ whiteSpace: 'pre-line' }} key={index}>
          {part}
        </Typography>
      );
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1">
            {thread.name}
          </Typography>
          {currentUser && currentUser.id === thread.user_id && (
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
          )}
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditThread}>編集</MenuItem>
            <MenuItem onClick={() => setIsDeleting(true)}>削除</MenuItem>
          </Menu>
        </Box>
        <Typography variant="body2" color="textSecondary">
          作成日時: {thread.created_at} | カテゴリ: {thread.category}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {thread.description}
        </Typography>
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 4 }}>
          <TextField
            label="コメント"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            投稿
          </Button>
        </Box>
        <List sx={{ mt: 4 }}>
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={comment.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {comment.user.name}
                      </Typography>
                      <Typography component="span" variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                        {comment.created_at}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      {renderCommentContent(comment.content)}
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <IconButton onClick={() => handleLike(comment.id)}>
                          <ThumbUp fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                          {comment.likes}
                        </Typography>
                        <IconButton onClick={() => handleDislike(comment.id)}>
                          <ThumbDown fontSize="small" />
                        </IconButton>
                        <Typography variant="body2">{comment.dislikes}</Typography>
                      </Box>
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="md" fullWidth>
        <DialogTitle>スレッドの編集</DialogTitle>
        <DialogContent>
          <TextField
            label="スレッド名"
            fullWidth
            value={editedThread.name}
            onChange={(e) => setEditedThread({ ...editedThread, name: e.target.value })}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            label="スレッドの説明"
            fullWidth
            multiline
            rows={4}
            value={editedThread.description}
            onChange={(e) => setEditedThread({ ...editedThread, description: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="primary">
            キャンセル
          </Button>
          <Button variant="contained" onClick={handleSaveThread}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
        <DialogTitle>スレッドの削除</DialogTitle>
        <DialogContent>
          <DialogContentText>本当にこのスレッドを削除しますか？この操作は元に戻せません。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleDeleteThread} color="error">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ThreadDetail;
