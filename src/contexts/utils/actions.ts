import React from "react";
import { Action, ModalCRUD, ModalConfirmation, Snackbar } from "./types";

export const actionsTypes = {
  CLEAR_STATE: "CLEAR_STATE",
  UPDATE_PAGINATION: "UPDATE_PAGINATION",
  UPDATE_FILTER: "UPDATE_FILTER",
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  SHOW_MODAL_CREATE: "SHOW_MODAL_CREATE",
  SHOW_MODAL_VIEW: "SHOW_MODAL_VIEW",
  SHOW_MODAL_EDIT: "SHOW_MODAL_EDIT",
  SHOW_MODAL_DETAIL: "SHOW_MODAL_DETAIL",
  SHOW_MODAL_FILTER: "SHOW_MODAL_FILTER",
  SHOW_MODAL_OTHER: "SHOW_MODAL_OTHER",
  SHOW_MODAL_CONFIRMATION: "SHOW_MODAL_CONFIRMATION",
};

export const actionsDispatch = (dispatch: React.Dispatch<Action>) => ({
  CLEAR_STATE: () => dispatch({ type: actionsTypes.CLEAR_STATE, payload: {} }),
  UPDATE_PAGINATION: (value: Pagination) => dispatch({ type: actionsTypes.UPDATE_PAGINATION, payload: value }),
  UPDATE_FILTER: (value: Filter) => dispatch({ type: actionsTypes.UPDATE_FILTER, payload: value }),
  SHOW_SNACKBAR: (value: Snackbar) => dispatch({ type: actionsTypes.SHOW_SNACKBAR, payload: value }),
  SHOW_MODAL_CREATE: (value: boolean) => dispatch({ type: actionsTypes.SHOW_MODAL_CREATE, payload: value }),
  SHOW_MODAL_VIEW: (value: ModalCRUD) => dispatch({ type: actionsTypes.SHOW_MODAL_VIEW, payload: value }),
  SHOW_MODAL_EDIT: (value: ModalCRUD) => dispatch({ type: actionsTypes.SHOW_MODAL_EDIT, payload: value }),
  SHOW_MODAL_DETAIL: (value: ModalCRUD) => dispatch({ type: actionsTypes.SHOW_MODAL_DETAIL, payload: value }),
  SHOW_MODAL_FILTER: (value: boolean) => dispatch({ type: actionsTypes.SHOW_MODAL_FILTER, payload: value }),
  SHOW_MODAL_OTHER: (value: boolean) => dispatch({ type: actionsTypes.SHOW_MODAL_OTHER, payload: value }),
  SHOW_MODAL_CONFIRMATION: (value: ModalConfirmation) => dispatch({ type: actionsTypes.SHOW_MODAL_CONFIRMATION, payload: value }),
});
