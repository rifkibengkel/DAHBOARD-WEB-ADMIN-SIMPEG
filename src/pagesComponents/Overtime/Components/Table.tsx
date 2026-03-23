import React from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";

const OvertimeTable: React.FC = () => {
  const headers = [
    {
      id: "date",
      align: "left",
      label: "TGL",
      custom_date: true,
    },
    {
      id: "overtime_date",
      align: "left",
      label: "TGL LEMBUR",
    },
    {
      id: "overtime_hour",
      align: "left",
      label: "JAM LEMBUR",
    },
    {
      id: "name",
      align: "left",
      label: "NAMA KARYAWAN",
    },
    {
      id: "desc",
      align: "left",
      label: "DESKRIPSI",
    },
    {
      id: "type",
      align: "left",
      label: "JENIS LEMBUR",
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

  const listOvertime = [
    {
      date: "2022-01-01",
      overtime_date: "2022-01-01",
      overtime_hour: "08:00 -> 10:00",
      name: "Raja Muhammad",
      desc: "Lorem ipsum dolor sit amet",
      type: "Seharian",
      status_text: "In Review",
      statusColor: "white",
      statusBg: "#36597D",
    },
  ];

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys={""}
        data={listOvertime}
        page={1}
        countPage={1}
        totalPage={1}
        totalPerPage={10}
        isError={null}
        isLoading={false}
      />
    </ContainerPaper>
  );
};

export default OvertimeTable;
