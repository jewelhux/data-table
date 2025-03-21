import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteItem } from "../services/api";
import { setItems, setLoading, setError } from "../store/slices/dataSlice";
import { RootState } from "../store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

interface DataTableProps {
  onEdit: (item: any) => void;
}

function truncateText(text: string) {
  if (text.length <= 20) {
    return text;
  } else {
    return text.slice(0, 17) + "...";
  }
}

const DataTable: React.FC<DataTableProps> = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.data
  );
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        dispatch(setLoading(true));
        try {
          const data = await fetchData(token);
          dispatch(setItems(data));
        } catch (err) {
          dispatch(setError("Ошибка загрузки данных"));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };
    loadData();
  }, [token, dispatch]);

  const handleDelete = async (id: string) => {
    if (token) {
      try {
        await deleteItem(token, id);
        const data = await fetchData(token);
        dispatch(setItems(data));
      } catch (err) {
        dispatch(setError("Ошибка удаления записи"));
      }
    }
  };

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (err) {
      return "Некорректная дата";
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        marginTop: 4,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>
              Дата подписи компании
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Название подписи компании
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Название документа
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Статус документа</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Тип документа</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Номер сотрудника</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Дата подписи</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Название подписи сотрудника
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              <TableCell>
                {truncateText(formatDate(item.companySigDate))}
              </TableCell>
              <TableCell>{truncateText(item.companySignatureName)}</TableCell>
              <TableCell>{truncateText(item.documentName)}</TableCell>
              <TableCell>{truncateText(item.documentStatus)}</TableCell>
              <TableCell>{truncateText(item.documentType)}</TableCell>
              <TableCell>{truncateText(item.employeeNumber)}</TableCell>
              <TableCell>
                {truncateText(formatDate(item.employeeSigDate))}
              </TableCell>
              <TableCell>{truncateText(item.employeeSignatureName)}</TableCell>
              <TableCell style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit(item)}
                  sx={{ marginRight: 1, textTransform: "none" }}
                >
                  Редактировать
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(item.id)}
                  sx={{ textTransform: "none" }}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
