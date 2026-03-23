import React from "react";
import dayjs from "dayjs";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";
import { VerifPermissionTableProps } from "../VerifPermission.types";

const VerifPermissionTable: React.FC<VerifPermissionTableProps> = (props) => {
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
      label: "TANGGAL IZIN / SAKIT",
    },
    {
      id: "categoryName",
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

  const listPermission = data.map((permission) => ({
    ...permission,
    date: `${dayjs(permission.startDate).format("DD MMM YYYY")} -> ${dayjs(permission.endDate).format("DD MMM YYYY")}`,
    status_text: permission.statusText,
    statusColor: "white",
    statusBg: permission.status === 0 || permission.status === 1 ? "#36597D" : permission.status === 2 ? "#5DDEBF" : "#FF165C",
  }));

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys={keys}
        data={listPermission}
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

export default VerifPermissionTable;
