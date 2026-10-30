import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { keyframes } from "@emotion/react";

// 🫨 ゴミ箱アイコンのブルブル
const shake = keyframes`
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-15deg); }
  40% { transform: rotate(12deg); }
  60% { transform: rotate(-8deg); }
  80% { transform: rotate(5deg); }
`;

// 🫨 カード全体の小さな揺れ
const cardShake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
`;

// ⚡ ひびが走る（線を描いていく）
const crackDraw = keyframes`
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
`;

// 💥 削除時：割れて落ちて消える
const crumble = keyframes`
  0% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0); }
  30% { transform: scale(1.03) rotate(-3deg); opacity: 1; }
  100% { transform: translateY(40px) scale(0.6) rotate(10deg); opacity: 0; filter: blur(4px); }
`;

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false); // カードが広がっているか
  const [hoverDel, setHoverDel] = useState<number | null>(null); // ゴミ箱にカーソル中のカード
  const [deleting, setDeleting] = useState<number | null>(null); // 割れている途中のカード

  const handleAdd = () => {
    if (name.trim() === "") return;
    setItems([...items, name]);
    setName("");
  };

  // 割れるアニメーションの後に削除する
  const startDelete = (index: number) => {
    setHoverDel(null);
    setDeleting(index);
    setTimeout(() => {
      handleDelete(index);
      setDeleting(null);
    }, 450);
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // 🧊 iPhone風ガラス（すりガラス）スタイル
  const glass = {
    bgcolor: "rgba(255, 255, 255, 0.55)", // 半透明の白
    backdropFilter: "blur(20px) saturate(180%)", // 後ろをぼかす
    WebkitBackdropFilter: "blur(20px) saturate(180%)", // Safari(iPhone)用
    border: "1px solid rgba(255, 255, 255, 0.6)", // 光るふち
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ① ヘッダー：グラデーションの帯 */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #006A6A 0%, #3FA7A7 55%, #9AD9C9 100%)",
          color: "#fff",
          pt: { xs: 5, sm: 7 },
          pb: { xs: 12, sm: 14 }, // カードが重なるスペース
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1" gutterBottom>
            持ち物管理
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            出かける前に持ち物をチェックしよう
          </Typography>
        </Container>
      </Box>

      {/* ② 飾りの丸：ガラスの後ろに色があると透明感が見える */}
      <Box
        sx={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          bgcolor: "#FFB4A2",
          top: { xs: 150, sm: 170 },
          right: { xs: -60, sm: "18%" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: "50%",
          bgcolor: "#B8C4FF",
          top: { xs: 260, sm: 280 },
          left: { xs: -40, sm: "22%" },
        }}
      />

      {/* ③ ガラスのカード：マイナスmarginでヘッダーに重ねる */}
      <Container
        maxWidth="sm"
        sx={{ mt: { xs: -8, sm: -9 }, pb: 4, position: "relative", zIndex: 1 }}
      >
        <Paper elevation={0} sx={{ ...glass, p: { xs: 2, sm: 3 } }}>
          {/* スマホは縦並び、PCは横並び */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="持ち物の名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "14px",
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleAdd}
              sx={{ minWidth: { sm: 120 }, borderRadius: "14px" }}
            >
              追加
            </Button>
          </Stack>
        </Paper>

        {/* ④ 件数 */}
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 4, mb: 1.5, ml: 1 }}
        >
          {items.length}件の持ち物
        </Typography>

        {items.length === 0 ? (
          <Paper elevation={0} sx={{ ...glass, p: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              まだ持ち物がありません
            </Typography>
          </Paper>
        ) : (
          /* ⑤ カードを重ねて表示 → カーソルを乗せると広がる */
          <Box
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={() => setOpen(true)} // スマホはタップで広がる
          >
            {items
              .map((item, index) => ({ item, index }))
              .reverse() // 新しい持ち物を一番上に
              .map(({ item, index }, pos) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    ...glass,
                    borderRadius: "18px",
                    px: 2.5,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: items.length - pos, // 上のカードほど手前
                    // 閉じている時：上に重ねる / 開いている時：すき間をあける
                    mt: pos === 0 ? 0 : open ? "12px" : "-52px",
                    // 閉じている時：後ろのカードほど小さく・薄く・少し傾ける（トランプの山）
                    transform: open
                      ? "scale(1) rotate(0deg)"
                      : `scale(${1 - pos * 0.05}) rotate(${pos === 0 ? 0 : pos % 2 ? 2 : -2}deg)`,
                    transformOrigin: "bottom center",
                    opacity: open ? 1 : pos > 2 ? 0 : 1 - pos * 0.15,
                    // バネのように少し行き過ぎて戻るカーブ ＋ 1枚ずつ順番に動く
                    transition: `margin-top 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${open ? pos * 0.07 : 0}s,
                      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 0.3s ease, box-shadow 0.3s ease`,
                    // ゴミ箱にカーソル → 赤いふち＆小さく揺れる / 削除中 → 割れて落ちる
                    borderColor: hoverDel === index ? "rgba(211, 47, 47, 0.6)" : undefined,
                    animation:
                      deleting === index
                        ? `${crumble} 0.45s ease-in forwards`
                        : hoverDel === index
                          ? `${cardShake} 0.25s ease-in-out infinite`
                          : "none",
                    // 広がっている時、カーソルを乗せたカードがポップアップ
                    "&:hover": open
                      ? {
                          transform: "translateY(-6px) scale(1.04) rotate(-1deg)",
                          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.18)",
                          zIndex: 100,
                        }
                      : {},
                  }}
                >
                  <Typography variant="body1">{item}</Typography>
                  {/* ⚡ ひび割れ（ゴミ箱から左にひびが走る） */}
                  {(hoverDel === index || deleting === index) && (
                    <Box
                      component="svg"
                      viewBox="0 0 100 40"
                      preserveAspectRatio="none"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        "& path": {
                          fill: "none",
                          stroke: "rgba(120, 20, 20, 0.55)",
                          strokeWidth: 1.5,
                          vectorEffect: "non-scaling-stroke",
                          strokeDasharray: 100,
                          animation: `${crackDraw} 0.4s ease-out forwards`,
                        },
                      }}
                    >
                      <path pathLength={100} d="M92 20 L84 14 L77 23 L68 12 L60 25 L50 15 L42 22" />
                      <path pathLength={100} d="M77 23 L74 34" />
                      <path pathLength={100} d="M68 12 L65 3" />
                      <path pathLength={100} d="M60 25 L55 36" />
                    </Box>
                  )}

                  <IconButton
                    edge="end"
                    onMouseEnter={() => setHoverDel(index)}
                    onMouseLeave={() => setHoverDel(null)}
                    onClick={() => startDelete(index)}
                    sx={{
                      transition: "color 0.2s, background-color 0.2s",
                      "&:hover": {
                        color: "error.main", // 赤に変わる
                        bgcolor: "rgba(211, 47, 47, 0.1)",
                        animation: `${shake} 0.4s ease-in-out infinite`, // ブルブル
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;