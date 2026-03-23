import React, { useEffect, useMemo, useState } from "react";
import { ContainerPaper } from "@/components/Container";
import { Table } from "@/components/Table";
import { WfhTableProps } from "../Wfh.types";
import dayjs from "dayjs";

const WfhTable: React.FC<WfhTableProps> = (props) => {
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

  const listWfh = useMemo(() => {
    return data.map((wfh) => ({
      ...wfh,
      departement: wfh.departement,
      date: wfh.date,
      employeName: wfh.employeName,
      clockIn: wfh.clockIn || "-",
      status_text: wfh.statusText,
      statusColor: "white",
      statusBg: wfh.status === 0 ? "#36597D" : wfh.status === 1 ? "#5DDEBF" : "#FF165C",
    }));
  }, [data]);

  const [filteredData, setFilteredData] = useState(listWfh);

  useEffect(() => {
    const filtered = listWfh.filter((item) => {
      const matchesName = props.filterNew?.employeName
        ? item.employeName.toLowerCase().includes(props.filterNew.employeName.toLowerCase())
        : true;
      const matchesDate = props.filterNew.date ? dayjs(item.date).format("YYYY-MM-DD") === props.filterNew.date : true;
      const matchesStatus = props.filterNew.status === -1 || item.status === props.filterNew.status;
      return matchesName && matchesStatus && matchesDate;
    });

    setFilteredData(filtered);
  }, [listWfh, props.filterNew]);

  return (
    <ContainerPaper>
      <Table
        headers={headers}
        keys={keys}
        data={filteredData}
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

export default WfhTable;
