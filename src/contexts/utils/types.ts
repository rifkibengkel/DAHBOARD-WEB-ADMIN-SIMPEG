import { AlertColor, SnackbarProps } from "@mui/material";

export type Snackbar = {
  show: boolean;
  type: AlertColor;
  message: string;
  position: SnackbarProps["anchorOrigin"];
};

export type ModalCRUD = {
  id: number;
  show: boolean;
};

export type ModalConfirmation = {
  show: boolean;
  show_reason?: boolean;
  title?: string;
  btn_cancel?: string;
  btn_submit?: string;
  handleSubmit?: (reason?: string) => Promise<void>;
};

export type InitialState = {
  pagination: Pagination;
  filter: Filter;
  snackbar: Snackbar;
  modal_create: boolean;
  modal_view: ModalCRUD;
  modal_edit: ModalCRUD;
  modal_detail: ModalCRUD;
  modal_filter: boolean;
  modal_other: boolean;
  modal_confirmation: ModalConfirmation;
};

export type Action = {
  type: string;
  payload: any;
};
