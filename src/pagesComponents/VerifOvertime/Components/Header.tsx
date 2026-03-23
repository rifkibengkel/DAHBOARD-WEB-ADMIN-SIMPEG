import React from "react";
import { Dayjs } from "dayjs";
import { DateDefault } from "@/components/Input/DatePicker";
import { SelectDefault } from "@/components/Input/Select";
import { TextFieldDefault } from "@/components/Input/TextField";
import { useUtils } from "@/contexts";
import { SearchOutlined } from "@mui/icons-material";
import { Box, FormControl, InputAdornment, Typography } from "@mui/material";
import { VerifOvertimeHeaderProps } from "../VerifOvertime.types";

const VerifOvertimeHeader: React.FC<VerifOvertimeHeaderProps> = ({ overtime_type }) => {
  const { states, actions } = useUtils();

  const [search, setSearch] = React.useState("");

  const statusOptions = [
    {
      id: -1,
      name: "Semua",
    },
    {
      id: 0,
      name: "Diproses",
    },
    {
      id: 1,
      name: "Konfirmasi",
    },
    {
      id: 2,
      name: "Disetujui",
    },
    {
      id: 3,
      name: "Ditolak",
    },
  ];

  const overtimeOptions = [
    {
      id: -1,
      name: "Semua",
    },
  ].concat(overtime_type);

  const handleChangeDate = (e: Dayjs, name: string) => {
    actions.UPDATE_FILTER({
      ...states.filter,
      [name]: e.format("YYYY-MM-DD"),
    });
    actions.UPDATE_PAGINATION({
      ...states.pagination,
      page: 1,
    });
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLDivElement> & React.ChangeEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      actions.UPDATE_FILTER({
        ...states.filter,
        search: search,
      });
      actions.UPDATE_PAGINATION({
        ...states.pagination,
        page: 1,
      });
    }
  };

  const handleStatus = (value: number, name: string) => {
    actions.UPDATE_FILTER({
      ...states.filter,
      [name]: value,
    });
    actions.UPDATE_PAGINATION({
      ...states.pagination,
      page: 1,
    });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography fontSize="22px">Approval Lembur</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControl
          sx={{
            width: 200,
          }}
        >
          <DateDefault placeholder="Pilih Tanggal" onChange={(e) => handleChangeDate(e as Dayjs, "startDate")} />
        </FormControl>
        <FormControl
          sx={{
            width: 250,
          }}
        >
          <TextFieldDefault
            placeholder="Nama Karyawan"
            onKeyDown={handleSearch}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchOutlined />
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
            placeholder="Jenis Lembur"
            onChange={(e) => handleStatus(+e.target.value, "type")}
            value={states.filter.type}
            options={overtimeOptions}
          />
        </FormControl>
        <FormControl
          sx={{
            width: 150,
          }}
        >
          <SelectDefault
            placeholder="Status"
            onChange={(e) => handleStatus(+e.target.value, "status")}
            value={states.filter.status}
            options={statusOptions}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default VerifOvertimeHeader;
