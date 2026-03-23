import React from "react";
import dayjs from "dayjs";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";
import { VerifLeaveTableProps } from "../VerifLeave.types";

const VerifLeaveTable: React.FC<VerifLeaveTableProps> = (props) => {
  const { keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError } = props;

  const headers = [
    {
      id: "createdAt",
      align: "left",
      label: "TGL",
      custom_date: true,
    },
    {
      id: "employeeName",
      align: "left",
      label: "NAMA KARYAWAN",
    },
    {
      id: "date",
      align: "left",
      label: "TANGGAL CUTI",
    },
    {
      id: "typeName",
      align: "left",
      label: "JENIS CUTI",
    },
    {
      id: "description",
      align: "left",
      label: "DESKRIPSI",
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

  const listLeave = data.map((leave) => ({
    ...leave,
    date: `${dayjs(leave.startDate).format("DD MMM YYYY")} -> ${dayjs(leave.endDate).format("DD MMM YYYY")}`,
    typeName: leave.typeName ? leave.typeName : "-",
    status_text: leave.statusText,
    statusColor: "white",
    statusBg: leave.status === 0 || leave.status === 1 ? "#36597D" : leave.status === 2 ? "#5DDEBF" : "#FF165C",
  }));

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys={keys}
        data={listLeave}
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

export default VerifLeaveTable;
