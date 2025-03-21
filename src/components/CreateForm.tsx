import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../services/api";
import { fetchData } from "../services/api";
import { setItems } from "../store/slices/dataSlice";
import { RootState } from "../store/store";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface CreateItemFormProps {
  open: boolean;
  onClose: () => void;
}

const CreateItemForm: React.FC<CreateItemFormProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    companySigDate: new Date().toISOString(),
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: new Date().toISOString(),
    employeeSignatureName: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (token) {
      try {
        const payload = {
          ...formData,
          companySigDate: new Date(formData.companySigDate).toISOString(),
          employeeSigDate: new Date(formData.employeeSigDate).toISOString(),
        };

        await createItem(token, payload);

        const data = await fetchData(token);
        dispatch(setItems(data));
        onClose(); 
      } catch (err) {
        setError("Ошибка при создании записи. Необходимо заполнить все поля.");
        console.error("Ошибка:", err);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить запись</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          label="Дата подписи компании"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={formData.companySigDate.slice(0, 16)}
          onChange={(e) =>
            setFormData({
              ...formData,
              companySigDate: e.target.value + ":00.000Z",
            })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Имя подписи компании"
          fullWidth
          margin="normal"
          value={formData.companySignatureName}
          onChange={(e) =>
            setFormData({ ...formData, companySignatureName: e.target.value })
          }
        />
        <TextField
          label="Название документа"
          fullWidth
          margin="normal"
          value={formData.documentName}
          onChange={(e) =>
            setFormData({ ...formData, documentName: e.target.value })
          }
        />
        <TextField
          label="Статус документа"
          fullWidth
          margin="normal"
          value={formData.documentStatus}
          onChange={(e) =>
            setFormData({ ...formData, documentStatus: e.target.value })
          }
        />
        <TextField
          label="Тип документа"
          fullWidth
          margin="normal"
          value={formData.documentType}
          onChange={(e) =>
            setFormData({ ...formData, documentType: e.target.value })
          }
        />
        <TextField
          label="Номер сотрудника"
          fullWidth
          margin="normal"
          value={formData.employeeNumber}
          onChange={(e) =>
            setFormData({ ...formData, employeeNumber: e.target.value })
          }
        />
        <TextField
          label="Дата подписи сотрудника"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={formData.employeeSigDate.slice(0, 16)}
          onChange={(e) =>
            setFormData({
              ...formData,
              employeeSigDate: e.target.value + ":00.000Z",
            })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Имя подписи сотрудника"
          fullWidth
          margin="normal"
          value={formData.employeeSignatureName}
          onChange={(e) =>
            setFormData({ ...formData, employeeSignatureName: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateItemForm;
