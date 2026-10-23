import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <Typography variant="h4" gutterBottom>
        持ち物管理
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          label="持ち物の名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (name.trim() === "") return;
            setItems([...items, name]);
            setName("");
          }}
        >
          追加
        </Button>
      </Stack>
      <Paper elevation={3} sx={{ mt: 3 }}>
        <List>
          {items.map((item, index) => (
                      <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            {item}
          </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default App;
