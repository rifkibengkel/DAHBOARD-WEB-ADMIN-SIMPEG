import React, { useEffect, useState } from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";
import dayjs from "dayjs";

interface PermissionItem {
  createdAt: string;
  employeeName: string;
  date: string;
  typeName: string;
  typeNumber: number;
  description: string;
  status_text: string;
  status: number;
  statusColor: string;
  statusBg: string;
}

interface Filter {
  employeeName: string;
  status: number;
  typeNumber: number;
  createdAt?: null | string;
}

const PermissionTable = ({ filter }: { filter: Filter }) => {
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
      label: "TANGGAL IZIN / SAKIT",
    },
    {
      id: "typeName",
      align: "left",
      label: "JENIS IZIN",
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

  const listPermission: PermissionItem[] = [
    {
      createdAt: "2025-04-09",
      employeeName: "Muhammad",
      date: `20 Jan 2024 -> 23 Jan 2024`,
      typeName: "Cuti",
      description: "Sakit Pinggang",
      typeNumber: 1,
      status: 2,
      status_text: "Diproses",
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      createdAt: "2025-04-08",
      employeeName: "Raja Muhammad",
      date: `20 Jan 2024 -> 23 Jan 2024`,
      typeName: "Cuti",
      typeNumber: 1,
      status: 2,
      description: "Sakit Pinggang",
      status_text: "Diproses",
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      createdAt: "2025-04-07",
      employeeName: "iki",
      date: `20 Jan 2024 -> 23 Jan 2024`,
      typeName: "Izin",
      typeNumber: 2,
      status: 0,
      description: "Sakit Pinggang",
      status_text: "Reject",
      statusColor: "white",
      statusBg: "#36597D",
    },
    {
      createdAt: "2025-04-06",
      employeeName: "cimol",
      date: `20 Jan 2024 -> 23 Jan 2024`,
      typeNumber: 3,
      status: 1,
      typeName: "Urusan Keluarga",
      description: "Sunatan Anak",
      status_text: "Approved",
      statusColor: "white",
      statusBg: "#36597D",
    },
  ];

  const [filteredData, setFilteredData] = useState<PermissionItem[]>(listPermission);

  useEffect(() => {
    const filtered = listPermission.filter((item) => {
      const matchesStatus = filter.status === -1 || item.status === filter.status;
      const matchesTypeName = filter.typeNumber === -1 || item.typeNumber === filter.typeNumber;
      const matchesName = filter.employeeName ? item.employeeName.toLowerCase().includes(filter.employeeName.toLowerCase()) : true;
      // const matchesStatus = filter.status ? item.status === filter.status : true;
      const matchesDate = filter.createdAt ? dayjs(item.createdAt).format("YYYY-MM-DD") === filter.createdAt : true;
      return matchesName && matchesStatus && matchesTypeName && matchesDate;
    });
    setFilteredData(filtered);
  }, [filter]);

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys={""}
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

export default PermissionTable;
