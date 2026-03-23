import React from "react";
import { Stack, Table as MuiTable, TableContainer, Typography, useTheme, Pagination, PaginationItem } from "@mui/material";
import { useUtils } from "@/contexts";
import { SelectDefault } from "../Input/Select";
import { TableProps } from "./Table.types";
import TableHead from "./Header";
import TableBody from "./Body";

const Table: React.FC<TableProps> = (props) => {
  const { headers, keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError, path, hidePagination } = props;

  const { states, actions } = useUtils();
  const { pagination } = states;

  const theme = useTheme();

  const startIndex = countPage && +countPage === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endIndex = countPage ? Math.min(pagination.page * pagination.limit, +countPage) : 0;

  const handleChangePage = (e: React.FormEvent<unknown>, newPage: number) => {
    actions.UPDATE_PAGINATION({
      ...pagination,
      page: newPage,
    });
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    actions.UPDATE_PAGINATION({
      ...pagination,
      page: 1,
      limit: +e.target.value,
    });
  };

  return (
    <Stack sx={{ p: 3, gap: 3 }}>
      {/* Table */}
      <TableContainer>
        <MuiTable>
          <TableHead headers={headers} />
          <TableBody keys={keys} headers={headers} data={data} isLoading={isLoading} isError={isError} path={path} />
        </MuiTable>
      </TableContainer>

      {/* Pagination */}
      {!hidePagination && (
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontSize="13px" color={theme.palette.text.secondary}>
            Menampilkan {startIndex} - {endIndex} dari {countPage} data
          </Typography>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
              <Typography fontSize="12px" color={theme.palette.text.secondary}>
                Rows Page
              </Typography>
              <SelectDefault
                value={totalPerPage}
                onChange={handleChangeLimit}
                options={[
                  { id: 10, name: "10" },
                  { id: 50, name: "50" },
                  { id: 100, name: "100" },
                ]}
                sx={{
                  width: 80,
                  ".MuiSelect-icon": {
                    margin: "2px 0px 0px 0px !important",
                  },
                  ".MuiSelect-select": {
                    padding: "5px 15px !important",
                  },
                }}
              />
            </Stack>
            <Pagination
              count={totalPage}
              page={page}
              defaultPage={1}
              onChange={handleChangePage}
              color="primary"
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    transition: "none",
                    "&.Mui-selected": {
                      color: theme.palette.common.white,
                      background: "#36597D",
                      ":hover": {
                        background: "#36597D",
                      },
                    },
                  }}
                />
              )}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Table;
