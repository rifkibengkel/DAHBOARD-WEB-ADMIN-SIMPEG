import { DateDefault } from "@/components/Input/DatePicker";
import { SelectDefault } from "@/components/Input/Select";
import { TextFieldDefault } from "@/components/Input/TextField";
import { Box, FormControl, IconButton, InputAdornment, Typography } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface Filter {
  status: number;
  name: string;
  typeCuty: number;
  date?: string | null;
}

interface LeaveHeaderProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

const LeaveHeader: React.FC<LeaveHeaderProps> = ({ filter, setFilter }) => {
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: ["date", "status", "typeCuty"].includes(name) ? Number(value) : value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFilter((prev) => ({
      ...prev,
      date: date ? date.format("YYYY-MM-DD") : null, // Format date menjadi string
    }));
  };

  // const handleDateChange = (date: Date | null) => {
  //   if (date) {
  //     const year = new Date(date).getFullYear();
  //     setFilter((prev) => ({ ...prev, year }));
  //   }
  // };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography fontSize="22px">Cuti</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControl sx={{ width: 200 }}>
          <DateDefault
            placeholder="Pilih Tanggal"
            value={filter.date && dayjs(filter.date).isValid() ? dayjs(filter.date) : null}
            onChange={handleDateChange}
          />
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <TextFieldDefault
            placeholder="Nama Karyawan"
            value={filter.name}
            name="name"
            onChange={handleFilter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      if (filter.name) {
                        setFilter((prev) => ({ ...prev, name: "" }));
                      }
                    }}
                    disabled={!filter.name}
                  >
                    {filter.name ? <ClearIcon /> : ""}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ width: 150 }}>
          <SelectDefault
            name="typeCuty"
            placeholder="Jenis Cuti"
            value={filter.typeCuty}
            onChange={handleFilter}
            options={[
              { id: 1, name: "Harian" },
              { id: 2, name: "Sakit" },
            ]}
          />
        </FormControl>
        <FormControl sx={{ width: 150 }}>
          <SelectDefault
            name="status"
            placeholder="Status"
            value={filter.status}
            onChange={handleFilter}
            options={[
              { id: 1, name: "In Review" },
              { id: 2, name: "Approved" },
              { id: 3, name: "Reject" },
            ]}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default LeaveHeader;
