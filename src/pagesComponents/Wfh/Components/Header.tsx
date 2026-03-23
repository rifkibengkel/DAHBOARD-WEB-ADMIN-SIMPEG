import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateDefault } from "@/components/Input/DatePicker";
import { SelectDefault } from "@/components/Input/Select";
import { TextFieldDefault } from "@/components/Input/TextField";
import { useUtils } from "@/contexts";
import { SearchOutlined } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputAdornment, Typography } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { ListWfh } from "@/pagesComponents/Wfh/Wfh.types";

interface LeaveHeaderProps {
  filterNew: ListWfh;
  setFilterNew: React.Dispatch<React.SetStateAction<ListWfh>>;
}

const WfhHeader: React.FC<LeaveHeaderProps> = ({ filterNew, setFilterNew }) => {
  const { states, actions } = useUtils();

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilterNew((prev) => ({
      ...prev,
      [name]: ["date", "status", "typeCuty"].includes(name) ? Number(value) : value,
    }));
    actions.UPDATE_PAGINATION({
      ...states.pagination,
      page: 1,
    });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFilterNew((prev: any) => ({
      ...prev,
      date: date ? date.format("YYYY-MM-DD") : null, // Format date menjadi string
    }));
    actions.UPDATE_PAGINATION({
      ...states.pagination,
      page: 1,
    });
  };

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

  const handleStatus = (value: number) => {
    actions.UPDATE_FILTER({
      ...states.filter,
      status: value,
    });
    actions.UPDATE_PAGINATION({
      ...states.pagination,
      page: 1,
    });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography fontSize="22px">Wfa</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControl sx={{ width: 200 }}>
          <DateDefault
            placeholder="Tanggal"
            value={filterNew.date && dayjs(filterNew.date).isValid() ? dayjs(filterNew.date) : null}
            onChange={handleDateChange}
          />
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <TextFieldDefault
            placeholder="Nama Karyawan"
            // onKeyDown={handleSearch}
            value={filterNew.employeName}
            name="employeName"
            // onChange={(e) => setSearch(e.target.value)}
            onChange={handleFilter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      if (filterNew.employeName) {
                        setFilterNew((prev) => ({ ...prev, employeName: "" }));
                      }
                    }}
                    disabled={!filterNew.employeName}
                  >
                    {filterNew.employeName ? <ClearIcon /> : ""}
                  </IconButton>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ width: 150 }}>
          <SelectDefault
            placeholder="Status"
            name="status"
            value={filterNew.status}
            onChange={handleFilter}
            options={[
              { id: 1, name: "Approved" },
              { id: 2, name: "Reject" },
            ]}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default WfhHeader;
