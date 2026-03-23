import React from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";
import { VerifOvertimeTableProps } from "../VerifOvertime.types";

const VerifOvertimeTable: React.FC<VerifOvertimeTableProps> = (props) => {
  const { keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError } = props;

  const headers = [
    {
      id: "date",
      align: "left",
      label: "TGL",
      custom_date: true,
    },
    {
      id: "name",
      align: "left",
      label: "NAMA KARYAWAN",
    },
    {
      id: "hour",
      align: "left",
      label: "JAM LEMBUR",
    },
    {
      id: "category",
      align: "left",
      label: "JENIS LEMBUR",
    },
    {
      id: "duration",
      align: "left",
      label: "DURASI",
    },
    {
      id: "status",
      align: "center",
      label: "STATUS",
      width: 50,
    },
    {
      id: "detail",
      align: "center",
      label: "ACTION",
    },
  ];

  const listOvertime = data.map((overtime) => ({
    ...overtime,
    hour: `${overtime.startTime} -> ${overtime.endTime}`,
    status_text: overtime.statusText,
    statusColor: "white",
    statusBg: overtime.status === 0 || overtime.status === 1 ? "#36597D" : overtime.status === 2 ? "#5DDEBF" : "#FF165C",
  }));

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys={keys}
        data={listOvertime}
        page={page}
        countPage={countPage}
        totalPage={totalPage}
        totalPerPage={totalPerPage}
        isError={isError}
        isLoading={isLoading}
      />
    </ContainerPaper>
  );
};

export default VerifOvertimeTable;
