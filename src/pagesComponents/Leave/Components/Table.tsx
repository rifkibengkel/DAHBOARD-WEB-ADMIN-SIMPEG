import React, { useEffect, useState } from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";
import dayjs, { Dayjs } from "dayjs";

interface LeaveItem {
  date?: string;
  leave_date: string;
  name: string;
  desc: string;
  type: string;
  typeCuty: number;
  status_text: string;
  status: number;
  statusColor: string;
  statusBg: string;
  categoryId?: number;
}

interface Filter {
  name: string;
  status: number;
  typeCuty: number;
  date?: null | string;
}

const LeaveTable = ({ filter }: { filter: Filter }) => {
  const headers = [
    {
      id: "date",
      align: "left",
      label: "TGL",
      custom_date: true,
    },
    {
      id: "leave_date",
      align: "left",
      label: "TANGGAL CUTI",
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
      label: "JENIS CUTI",
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

  const listLeave: LeaveItem[] = [
    {
      date: "2025-04-01",
      leave_date: "22 Jan 2024 -> 23 Jan 2024",
      name: "Rony",
      desc: "Lorem ipsum dolor sit amet",
      type: "Seharian",
      typeCuty: 1,
      status_text: "Approved",
      status: 2,
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      date: "2025-04-02",
      leave_date: "22 Jan 2024 -> 23 Jan 2024",
      name: "Rony",
      desc: "Lorem ipsum dolor sit amet",
      type: "Seharian",
      typeCuty: 1,
      status_text: "Approved",
      status: 2,
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      date: "2025-04-03",
      leave_date: "22 Jan 2024 -> 23 Jan 2024",
      name: "Rony",
      desc: "Lorem ipsum dolor sit amet",
      type: "Sakit",
      typeCuty: 2,
      status_text: "In Review",
      status: 1,
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      date: "2025-04-04",
      leave_date: "22 Jan 2024 -> 23 Jan 2024",
      name: "Raja Muhammad",
      desc: "Lorem ipsum dolor sit amet",
      type: "Sakit",
      typeCuty: 2,
      status_text: "In Review",
      status: 1,
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      date: "2025-04-05",
      leave_date: "22 Jan 2024 -> 23 Jan 2024",
      name: "Brod",
      desc: "Lorem ipsum dolor sit amet",
      type: "Sakit",
      typeCuty: 2,
      status_text: "Reject",
      status: 3,
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      date: "2025-04-05",
      leave_date: "22 Jan 2024 -> 23 Jan 2024",
      name: "Puki",
      desc: "Lorem ipsum dolor sit amet",
      type: "Sakit",
      typeCuty: 2,
      status_text: "In Review",
      status: 1,
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      date: "2025-04-05",
      leave_date: "22 Jan 2024 -> 23 Jan 2024",
      name: "Jendol",
      desc: "Lorem ipsum dolor sit amet",
      type: "Sakit",
      typeCuty: 2,
      status_text: "Reject",
      status: 3,
      statusColor: "white",
      statusBg: "#36597D",
    },
  ];

  const [filteredData, setFilteredData] = useState<LeaveItem[]>(listLeave);

  useEffect(() => {
    const filtered = listLeave.filter((item) => {
      const matchesName = filter.name ? item.name.toLowerCase().includes(filter.name.toLowerCase()) : true;
      // const matchesStatus = filter.status ? item.status === filter.status : true;
      // const matchesTypeCuty = filter.typeCuty ? item.typeCuty === filter.typeCuty : true;
      const matchesStatus = filter.status === -1 || item.status === filter.status;
      const matchesTypeCuty = filter.typeCuty === -1 || item.typeCuty === filter.typeCuty;
      const matchesDate = filter.date ? dayjs(item.date).format("YYYY-MM-DD") === filter.date : true;
      return matchesName && matchesStatus && matchesTypeCuty && matchesDate;
    });
    setFilteredData(filtered);
  }, [filter]);

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys="name"
        data={filteredData}
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

export default LeaveTable;
