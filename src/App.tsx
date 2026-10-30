import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = () => {
    if (name.trim() === "") return;
    setItems([...items, name]);
    setName("");
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    // 背景色はテーマの background.default を使う
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 3, sm: 6 } }}>
      {/* 3. Layout：PCでも横に広がりすぎないように幅を制限 */}
      <Container maxWidth="sm">
        {/* 2. Typography：見出し */}
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          持ち物管理
        </Typography>
        {/* 2. Typography：補足説明 */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          出かける前に持ち物をチェックしよう
        </Typography>

        {/* 3. Layout：スマホは縦並び、PCは横並び */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="持ち物の名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleAdd}
            sx={{ minWidth: { sm: 120 } }}
          >
            追加
          </Button>
        </Stack>

        {/* 2. Typography：件数（補足情報） */}
        <Typography variant="caption" sx={{ display: "block", mt: 3, mb: 1 }}>
          {items.length}件の持ち物
        </Typography>

        <Paper elevation={1}>
          {items.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 3, textAlign: "center" }}
            >
              まだ持ち物がありません
            </Typography>
          ) : (
            <List>
              {items.map((item, index) => (
                <ListItem
                  key={index}
                  divider={index < items.length - 1}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  {/* 2. Typography：本文 */}
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default App;