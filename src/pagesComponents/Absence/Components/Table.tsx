import React from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";
import { AbsenceTableProps } from "../Absence.types";

const AbsenceTable: React.FC<AbsenceTableProps> = (props) => {
  const { keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError } = props;

  const headers = [
    {
      id: "date",
      align: "left",
      label: "TGL",
      custom_date: true,
    },
    {
      id: "employeName",
      align: "left",
      label: "NAMA KARYAWAN",
    },
    {
      id: "departement",
      align: "left",
      label: "DEPARTEMENT",
    },
    {
      id: "clockIn",
      align: "left",
      label: "JAM MASUK",
    },
    {
      id: "clockInTypeText",
      align: "left",
      label: "TIPE MASUK",
    },
    {
      id: "clockOut",
      align: "left",
      label: "JAM KELUAR",
    },
    {
      id: "clockOutTypeText",
      align: "left",
      label: "TIPE KELUAR",
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

  const listAbsence = data.map((absence) => ({
    ...absence,
    clockIn: absence.clockIn || "-",
    clockOut: absence.clockOut || "-",
    status_text: absence.statusText,
    statusColor: "white",
    statusBg: absence.status === 1 ? "#36597D" : "#FF165C",
  }));

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys={keys}
        data={listAbsence}
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

export default AbsenceTable;
