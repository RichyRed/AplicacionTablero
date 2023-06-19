import * as React from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

interface ColumnProps {
  column: { id: number; name: string; tasks: { id: number; title: string; description: string }[] };
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const [tasks, setTasks] = React.useState<{ id: number; title: string; description: string }[]>([]);
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [newTaskDescription, setNewTaskDescription] = React.useState("");

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        description: newTaskDescription,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const handleTaskTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleTaskDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDescription(event.target.value);
  };

  return (
    <Card style={{ margin: "10px", width: "300px" }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          {column.name}
        </Typography>
        {tasks.map((task) => (
          <Card key={task.id} style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="subtitle1" style={{ marginBottom: "5px" }}>
                {task.title}
              </Typography>
              <Typography variant="body2">{task.description}</Typography>
            </CardContent>
          </Card>
        ))}
        <TextField
          label="Título de tarea"
          value={newTaskTitle}
          onChange={handleTaskTitleChange}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Descripción de tarea"
          value={newTaskDescription}
          onChange={handleTaskDescriptionChange}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <Button variant="contained" onClick={addTask} fullWidth>
          Añadir tarea
        </Button>
      </CardContent>
    </Card>
  );
};

export default Column;
