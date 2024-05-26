// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // ブルー
    },
    background: {
      default: '#202123', // ダークグレー
      paper: '#121212', // やや明るいダークグレー
    },
    text: {
      primary: '#ffffff', // 白
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1c',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0ba37f', // フォーカス時の枠線の色
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#0ba37f', // フォーカス時のラベルの色
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#1a7f64', // ボタンの背景色
            '&:hover': {
              backgroundColor: '#0ba37f', // ホバー時の背景色
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#343740', // Menuの背景色
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .Mui-selected': {
            backgroundColor: '#343740', // 選択されたページの背景色を変更
            color: '#fff', // 選択されたページの文字色を変更
          },
          '& .MuiPaginationItem-root': {
            '&:hover': {
              backgroundColor: '#343740', // ホバー時の背景色を変更
            },
          },
        },
      },
    },
  },
});

export default theme;
