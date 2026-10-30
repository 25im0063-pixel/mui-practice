import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.tsx'

// 🎨 アプリ全体のテーマ（Material Design 3 を参考）
const theme = createTheme({
  // 1. Color：配色をここで一括管理
  palette: {
    primary: { main: '#006A6A' },        // メインの色（ボタン・見出し）
    secondary: { main: '#4A6363' },      // サブの色
    background: {
      default: '#F4FBFA',                // 画面の背景
      paper: '#FFFFFF',                  // カードの背景
    },
  },
  // 2. Typography：文字の役割ごとに大きさ・太さを整理
  typography: {
    fontFamily: '"Noto Sans JP", "Yu Gothic UI", "Hiragino Sans", sans-serif',
    h4: { fontWeight: 700 },             // 見出し
    body1: { fontSize: '1rem' },         // 本文
    caption: { color: '#6F7979' },       // 補足情報
  },
  // 角丸（MD3は丸みのあるデザイン）
  shape: { borderRadius: 12 },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)