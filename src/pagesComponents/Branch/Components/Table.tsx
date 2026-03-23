import React from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";
import { BranchTableProps } from "../Branch.types";

const BranchTable: React.FC<BranchTableProps> = (props) => {
  const { keys, data, isLoading, isError } = props;

  const headers = [
    {
      id: "name",
      align: "left",
      label: "NAMA",
    },
    {
      id: "detail",
      align: "center",
      label: "ACTION",
    },
  ];

  return (
    <ContainerPaper>
      <Table headers={headers} keys={keys} data={data} isError={isError} isLoading={isLoading} hidePagination />
    </ContainerPaper>
  );
};

export default BranchTable;
