import React from "react";
import { TableCell, TableHead as MuiTableHead, TableRow, TableCellProps, TableSortLabel } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useUtils } from "@/contexts";
import { TableHeadProps } from "./Table.types";

const TableHead: React.FC<TableHeadProps> = ({ headers }) => {
  const { states, actions } = useUtils();
  const { filter } = states;

  const handleSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = filter.orderBy === property && (filter.sort === "asc" || !filter.sort);

    actions.UPDATE_FILTER({
      ...filter,
      orderBy: property,
      sort: isAsc ? "desc" : "asc",
    });
  };

  return (
    <MuiTableHead>
      <TableRow>
        {headers.map((head, index) => (
          <TableCell
            key={index}
            align={head.align as TableCellProps["align"]}
            sortDirection={filter.orderBy === head.id ? filter.sort : false}
            sx={{
              width: head.width ? head.width : "auto",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.3px",
              color: "#36597D4D",
              opacity: 0.8,
              borderBottom: `1px solid #36597D1A`,
              px: 0,
            }}
          >
            {head.sort ? (
              <TableSortLabel
                active={filter.orderBy === head.id}
                direction={filter.orderBy === head.id ? filter.sort : "asc"}
                IconComponent={ArrowDropDown}
                onClick={(event) => handleSort(event, head.id)}
              >
                {head.label}
              </TableSortLabel>
            ) : (
              <>{head.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
