import React from "react";
import { utilsReducer } from "./reducer";
import { actionsDispatch } from "./actions";
import { InitialState } from "./types";

export const INITIAL_STATE: InitialState = {
  pagination: {
    page: 1,
    limit: 10,
  },
  filter: {
    isSet: false,
    search: "",
    startDate: "",
    endDate: "",
    type: "",
    status: "",
    orderBy: "",
    sort: "desc",

    // another extended
  },
  snackbar: {
    show: false,
    type: "error",
    message: "",
    position: {
      horizontal: "center",
      vertical: "top",
    },
  },
  modal_create: false,
  modal_view: {
    id: 0,
    show: false,
  },
  modal_edit: {
    id: 0,
    show: false,
  },
  modal_detail: {
    id: 0,
    show: false,
  },
  modal_filter: false,
  modal_other: false,
  modal_confirmation: {
    show: false,
    show_reason: false,
    title: "",
    btn_cancel: "",
    btn_submit: "",
    handleSubmit: undefined,
  },
};

const UtilsContext = React.createContext({
  states: INITIAL_STATE,
  actions: actionsDispatch((value) => value),
});

export const UtilsProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [states, dispatch] = React.useReducer(utilsReducer, INITIAL_STATE);
  const actions = actionsDispatch(dispatch);

  return <UtilsContext.Provider value={{ states, actions }}>{children}</UtilsContext.Provider>;
};

export const useUtils = () => {
  return React.useContext(UtilsContext);
};
