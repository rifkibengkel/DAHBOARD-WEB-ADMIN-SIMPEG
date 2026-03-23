import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useSWRConfig } from "swr";
import {
  TableCell as MuiTableCell,
  TableCellProps,
  TableBody as MuiTableBody,
  TableRow,
  useTheme,
  Stack,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { useUtils } from "@/contexts";
import { handleImageLoader } from "@/libs/commons";
import { TableBodyProps } from "./Table.types";
import TableDetail from "./Actions/Detail";

const TableBody: React.FC<TableBodyProps> = (props) => {
  const { keys, headers, data, isLoading, isError, path } = props;

  const { states } = useUtils();
  const { mutate } = useSWRConfig();
  const { filter } = states;

  const theme = useTheme();

  const TableCell = () => {
    return (
      <>
        {data.map((value, index) => (
          <TableRow key={index}>
            {headers.map((head, index) => {
              if (head.custom_date) {
                return (
                  <MuiTableCell
                    key={index}
                    align={head.align as TableCellProps["align"]}
                    sx={{
                      color: theme.palette.text.primary,
                      borderBottom: `1px solid #36597D1A`,
                      px: 0,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#FFFFFF80",
                        width: 48,
                        height: 48,
                        borderRadius: "10px",
                        border: "1px solid #FFFFFFBF",
                      }}
                    >
                      <Typography fontSize="16px" fontWeight={700}>
                        {dayjs(value[head.id]).format("DD")}
                      </Typography>
                      <Typography fontSize="10px" fontWeight={700}>
                        {dayjs(value[head.id]).format("MMM")}
                      </Typography>
                    </Box>
                  </MuiTableCell>
                );
              }

              if (head.id === "detail") {
                return (
                  <MuiTableCell
                    key={index}
                    align={head.align as TableCellProps["align"]}
                    sx={{
                      borderBottom: `1px solid #36597D1A`,
                    }}
                  >
                    {path ? <TableDetail path={`${path}/${value.id}`} /> : <TableDetail id={value.id} />}
                  </MuiTableCell>
                );
              }

              if (head.id === "status") {
                return (
                  <MuiTableCell
                    key={index}
                    align={head.align as TableCellProps["align"]}
                    sx={{
                      borderBottom: `1px solid #36597D1A`,
                      px: 0,
                    }}
                  >
                    <Chip
                      label={value["status_text"]}
                      variant="outlined"
                      sx={{
                        color: value.statusColor,
                        background: value.statusBg,
                        fontSize: "12px",
                        height: 25,
                      }}
                    />
                  </MuiTableCell>
                );
              }

              if (head.id === "icon" || head.id === "image") {
                return (
                  <MuiTableCell
                    key={index}
                    align={head.align as TableCellProps["align"]}
                    sx={{
                      fontSize: "13px",
                      borderBottom: `1px solid #36597D1A`,
                      px: 0,
                    }}
                  >
                    <Image
                      crossOrigin="anonymous"
                      loader={handleImageLoader}
                      src={value.icon || value.image}
                      alt="Gambar"
                      width={35}
                      height={35}
                      style={{ borderRadius: "10px" }}
                    />
                  </MuiTableCell>
                );
              }

              return (
                <MuiTableCell
                  key={index}
                  align={head.align as TableCellProps["align"]}
                  sx={{
                    fontSize: "13px",
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid #36597D1A`,
                    px: 0,
                  }}
                >
                  {value[head.id]}
                </MuiTableCell>
              );
            })}
          </TableRow>
        ))}
      </>
    );
  };

  const TableErrorCell = () => (
    <TableRow>
      <MuiTableCell colSpan={headers.length} sx={{ borderBottom: `1px solid #36597D1A` }}>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            py: 2,
            gap: 1,
          }}
        >
          <Typography fontSize="13px" fontWeight={500}>
            Gagal memuat data,
          </Typography>
          <Typography
            fontSize="13px"
            fontWeight={500}
            color="primary"
            onClick={() => mutate(keys)}
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Coba lagi
          </Typography>
        </Stack>
      </MuiTableCell>
    </TableRow>
  );

  const TableEmptyCell = () => (
    <TableRow>
      <MuiTableCell colSpan={headers.length} sx={{ borderBottom: `1px solid #36597D1A` }}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            py: 2,
          }}
        >
          <Image src={"/assets/icons/ic_notes.png"} alt="Icon" height={122} width={115} />
          <Typography fontSize="13px" fontWeight={500} sx={{ mt: 2 }}>
            {isLoading ? "Loading..." : filter.search ? "Data tidak ditemukan" : "Data belum tersedia"}
          </Typography>
        </Stack>
      </MuiTableCell>
    </TableRow>
  );

  return <MuiTableBody>{isError ? <TableErrorCell /> : data.length > 0 ? <TableCell /> : <TableEmptyCell />}</MuiTableBody>;
};

export default TableBody;
