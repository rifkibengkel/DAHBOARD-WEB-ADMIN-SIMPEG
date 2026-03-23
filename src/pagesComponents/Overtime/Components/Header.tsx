import { DateDefault } from "@/components/Input/DatePicker";
import { SelectDefault } from "@/components/Input/Select";
import { TextFieldDefault } from "@/components/Input/TextField";
import { SearchOutlined } from "@mui/icons-material";
import { Box, FormControl, InputAdornment, Typography } from "@mui/material";

const OvertimeHeader = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography fontSize="22px">Lembur</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControl
          sx={{
            width: 200,
          }}
        >
          <DateDefault placeholder="Pilih Tanggal" />
        </FormControl>
        <FormControl
          sx={{
            width: 250,
          }}
        >
          <TextFieldDefault
            placeholder="Nama Karyawan"
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
          <SelectDefault placeholder="Jenis Lembur" options={[]} />
        </FormControl>
        <FormControl
          sx={{
            width: 150,
          }}
        >
          <SelectDefault placeholder="Status" options={[]} />
        </FormControl>
      </Box>
    </Box>
  );
};

export default OvertimeHeader;
