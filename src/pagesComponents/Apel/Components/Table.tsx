import React from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";

const ApelTable: React.FC = () => {
  const headers = [
    {
      id: "date",
      align: "left",
      label: "TGL",
      custom_date: true,
    },
    {
      id: "apel_date",
      align: "left",
      label: "TANGGAL APEL",
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

  const listApel = [
    {
      date: "2022-01-01",
      apel_date: "22 Jan 2024 -> 23 Jan 2024",
      name: "Raja Muhammad",
      desc: "Lorem ipsum dolor sit amet",
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
        data={listApel}
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

export default ApelTable;
