import React from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";

const SlipTable: React.FC = () => {
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
      id: "desc",
      align: "left",
      label: "DESKRIPSI",
    },
    {
      id: "type",
      align: "left",
      label: "JENIS",
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

  const listSlip = [
    {
      date: "2022-01-01",
      name: "Raja Muhammad",
      desc: "Lorem ipsum dolor sit amet",
      type: "Gaji",
      status_text: "Transfer",
      statusColor: "white",
      statusBg: "#36597D",
    },
  ];

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys={""}
        data={listSlip}
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

export default SlipTable;
