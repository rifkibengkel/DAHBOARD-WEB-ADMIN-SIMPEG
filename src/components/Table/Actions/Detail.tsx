import React from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { useUtils } from "@/contexts";
import { TableDetailProps } from "../Table.types";
import { ButtonSecondary } from "../../Button";

const TableDetail: React.FC<TableDetailProps> = ({ id, path }) => {
  const { actions } = useUtils();

  const router = useRouter();

  const handleDetail = () => {
    if (id && !path) {
      actions.SHOW_MODAL_DETAIL({
        id,
        show: true,
      });
    }

    if (path) {
      router.push(path);
    }
  };

  return (
    <>
      <ButtonSecondary onClick={handleDetail} sx={{ height: 25 }}>
        <Typography fontSize="12px">Detail</Typography>
      </ButtonSecondary>
    </>
  );
};

export default TableDetail;
