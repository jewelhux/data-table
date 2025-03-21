import React, { useState } from "react";
import DataTable from "../components/DataTable";
import { Button, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import CreateItemForm from "../components/CreateForm";
import EditItemForm from "../components/EditForm";

const HomePage: React.FC = () => {
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateOpen = () => {
    setCreateFormOpen(true);
  };

  const handleEditOpen = (item: any) => {
    setSelectedItem(item);
    setEditFormOpen(true);
  };

  const handleClose = () => {
    setCreateFormOpen(false);
    setEditFormOpen(false);
    setSelectedItem(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Таблица данных
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
      <Button color="primary" variant="contained" onClick={handleCreateOpen}>
        Добавить запись
      </Button>
      <DataTable onEdit={handleEditOpen} />
      <CreateItemForm open={createFormOpen} onClose={handleClose} />
      <EditItemForm
        open={editFormOpen}
        onClose={handleClose}
        item={selectedItem}
      />
    </Container>
  );
};

export default HomePage;
