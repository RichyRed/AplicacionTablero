import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskFormData {
  title: string;
  description: string;
}

interface ColumnProps {
  column: { id: string; name: string; tasks: { id: string; title: string; description: string }[] };
  deleteColumn: () => void;
}

const Column: React.FC<ColumnProps> = ({ column, deleteColumn }) => {
  const [tasks, setTasks] = React.useState<{ id: string; title: string; description: string }[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  const addTask: SubmitHandler<TaskFormData> = (data) => {
    const { title, description } = data;
    if (title.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        title: title,
        description: description,
      };
      setTasks([...tasks, newTask]);
      reset();
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Card style={{ margin: "10px", width: "300px" }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <Typography variant="h6">{column.name}</Typography>
          <Button size="small" color="secondary" aria-label="Delete" onClick={deleteColumn}>
            <DeleteIcon />
          </Button>
        </div>
        {tasks.map((task) => (
          <Card key={task.id} style={{ marginBottom: "10px", position: "relative" }}>
            <CardContent>
              <Typography variant="subtitle1" style={{ marginBottom: "5px" }}>
                {task.title}
              </Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Button
                size="small"
                color="secondary"
                aria-label="Delete"
                onClick={() => deleteTask(task.id)}
                style={{ position: "absolute", bottom: "5px", right: "5px" }}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </CardContent>
          </Card>
        ))}
        <form onSubmit={handleSubmit(addTask)}>
          <TextField
            label="Título de tarea"
            {...register("title", { required: true })}
            fullWidth
            style={{ marginBottom: "10px" }}
            error={errors.title ? true : false}
            helperText={errors.title ? "Este campo es requerido" : ""}
          />
          <TextField
            label="Descripción de tarea"
            {...register("description")}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Añadir tarea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Column;
