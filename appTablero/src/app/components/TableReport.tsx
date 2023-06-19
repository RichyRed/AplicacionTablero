import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Column from "./Column";

const TableReport: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: { name: string; tasks: { id: number; title: string; description: string }[] } }>({
    "column1": { name: "Columna 1", tasks: [] },
  });
  const [newColumnName, setNewColumnName] = useState("");
  const [columnCount, setColumnCount] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedColumns = localStorage.getItem("columns");
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addColumn = () => {
    if (newColumnName.trim() !== "") {
      const newColumnKey = uuidv4();
      const newColumn = {
        name: newColumnName,
        tasks: [],
      };
      setColumns((prevColumns) => ({
        ...prevColumns,
        [newColumnKey]: newColumn,
      }));
      setNewColumnName("");
      setColumnCount((prevCount) => prevCount + 1);
    }
  };

  const deleteColumn = (columnKey: string) => {
    setColumns((prevColumns) => {
      const { [columnKey]: deletedColumn, ...remainingColumns } = prevColumns;
      return remainingColumns;
    });
    setColumnCount((prevCount) => prevCount - 1);
  };

  const handleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
  };

  const columnKeys = useMemo(() => Object.keys(columns), [columns]);

  return (
    <div style={{ marginTop: "-10px" }}>
      <div style={{ position: "sticky", top: 0, backgroundColor: "#fff", padding: "10px" }}>
        <TextField
          label="Nombre de columna"
          value={newColumnName}
          onChange={handleColumnNameChange}
          style={{ marginRight: "10px" }}
          inputRef={inputRef} // Assign the input ref here
        />
        <Button variant="contained" onClick={addColumn}>
          Añadir columna
        </Button>
        <span style={{ marginLeft: "10px" }}>Tablas creadas: {columnCount}</span>
      </div>
      <div style={{ marginTop: "10px", display: "flex" }}>
        {columnKeys.map((columnKey) => (
          <div key={columnKey} style={{ flex: "0 0 300px", marginRight: "10px" }}>
            <Column column={columns[columnKey]} deleteColumn={() => deleteColumn(columnKey)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableReport;
