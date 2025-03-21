import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../services/api";
import { setToken } from "../store/slices/authSlice";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      dispatch(setToken(response.data.token));
      navigate("/");
    } catch (err) {
      setError("Ошибка авторизации");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Авторизация
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Логин"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Container>
  );
};

export default LoginForm;
