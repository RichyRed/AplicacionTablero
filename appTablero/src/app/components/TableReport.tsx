import * as React from "react";
import { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Add } from "@mui/icons-material";

interface Task {
  id: number;
  title: string;
  description: string;
}

interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

const ColumnContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const TaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const TableReport = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, name: "Columna 1", tasks: [] },
    { id: 2, name: "Columna 2", tasks: [] },
    { id: 3, name: "Columna 3", tasks: [] },
  ]);

  const handleAddTask = (columnId: number) => {
    const taskTitle = prompt("Ingrese el título de la tarea");
    const taskDescription = prompt("Ingrese la descripción de la tarea");

    if (taskTitle && taskDescription) {
      const newTask: Task = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
      };

      const updatedColumns = columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });

      setColumns(updatedColumns);
    }
  };

  const handleDeleteTask = (columnId: number, taskId: number) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        const updatedTasks = column.tasks.filter((task) => task.id !== taskId);
        return {
          ...column,
          tasks: updatedTasks,
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleUpdateColumnName = (columnId: number) => {
    const columnName = prompt("Ingrese el nuevo nombre de la columna");

    if (columnName) {
      const updatedColumns = columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            name: columnName,
          };
        }
        return column;
      });

      setColumns(updatedColumns);
    }
  };

  return (
    <Grid container spacing={2}>
      {columns.map((column) => (
        <Grid item xs={4} key={column.id}>
          <ColumnContainer elevation={3}>
            <Typography variant="h6">{column.name}</Typography>
            <Button size="small" onClick={() => handleUpdateColumnName(column.id)}>
              Editar nombre
            </Button>
            <Button size="small" onClick={() => handleAddTask(column.id)}>
              <Add />
              Añadir tarea
            </Button>
            {column.tasks.map((task) => (
              <TaskCard key={task.id} elevation={2}>
                <Typography variant="subtitle1">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteTask(column.id, task.id)}
                >
                  Eliminar
                </Button>
              </TaskCard>
            ))}
          </ColumnContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default TableReport;
