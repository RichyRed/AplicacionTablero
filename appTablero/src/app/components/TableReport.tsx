import * as React from "react";
import { Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Scrollbars } from "react-custom-scrollbars";
import Column from "./Column";

const TableReport = () => {
  const [columns, setColumns] = React.useState<{ [key: string]: { name: string; tasks: { id: number; title: string; description: string }[] } }>({
    "column1": { name: "Columna 1", tasks: [] },
  });
  const [newColumnName, setNewColumnName] = React.useState("");

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
    }
  };

  const handleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
  };

  const renderThumbVertical = ({ style, ...props }: any) => {
    const thumbStyle = {
      backgroundColor: "#888",
      borderRadius: "4px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  return (
    <div style={{ marginTop: "-10px", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "sticky", top: 0, backgroundColor: "#fff", padding: "10px" }}>
        <TextField
          label="Nombre de columna"
          value={newColumnName}
          onChange={handleColumnNameChange}
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" onClick={addColumn}>
          Añadir columna
        </Button>
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <div style={{ marginTop: "10px", display: "flex" }}>
          {Object.keys(columns).map((columnKey) => (
            <div key={columnKey} style={{ flex: "0 0 300px", marginRight: "10px" }}>
              <Column column={columns[columnKey]} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200} renderThumbVertical={renderThumbVertical} style={{ height: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default TableReport;
