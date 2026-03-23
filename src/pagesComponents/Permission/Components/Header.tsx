import React from "react";
import { DateDefault } from "@/components/Input/DatePicker";
import { SelectDefault } from "@/components/Input/Select";
import { TextFieldDefault } from "@/components/Input/TextField";
import { SearchOutlined } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputAdornment, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { ClearIcon } from "@mui/x-date-pickers";

interface Filter {
  employeeName: string;
  status: number;
  typeNumber: number;
  createdAt?: null | string;
}

interface PermissionHeaders {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

const PermissionHeader: React.FC<PermissionHeaders> = ({ filter, setFilter }) => {
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: ["createdAt", "status", "typeNumber"].includes(name) ? Number(value) : value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFilter((prev) => ({
      ...prev,
      createdAt: date ? date.format("YYYY-MM-DD") : null, // Format date menjadi string
    }));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography fontSize="22px">Izin / Sakit</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControl
          sx={{
            width: 200,
          }}
        >
          <DateDefault
            placeholder="Pilih Tanggal"
            value={filter.createdAt && dayjs(filter.createdAt).isValid() ? dayjs(filter.createdAt) : null}
            onChange={handleDateChange}
          />
        </FormControl>
        <FormControl
          sx={{
            width: 250,
          }}
        >
          <TextFieldDefault
            placeholder="Nama Karyawan"
            value={filter.employeeName}
            name="employeeName"
            onChange={handleFilter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      if (filter.employeeName) {
                        setFilter((prev) => ({ ...prev, employeeName: "" }));
                      }
                    }}
                    disabled={!filter.employeeName}
                  >
                    {filter.employeeName ? <ClearIcon /> : ""}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl
          sx={{
            width: 150,
          }}
        >
          <SelectDefault
            name="typeNumber"
            placeholder="Jenis Izin"
            onChange={handleFilter}
            value={filter.typeNumber}
            options={[
              { id: 1, name: "Cuti" },
              { id: 2, name: "Izin" },
              { id: 3, name: "Urusan Keluarga" },
            ]}
          />
        </FormControl>
        <FormControl
          sx={{
            width: 150,
          }}
        >
          <SelectDefault
            name="status"
            placeholder="Status"
            onChange={handleFilter}
            value={filter.status}
            options={[
              { id: 0, name: "Reject" },
              { id: 1, name: "Approved" },
              { id: 2, name: "Di Procces" },
            ]}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default PermissionHeader;
