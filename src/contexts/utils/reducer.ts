import { INITIAL_STATE } from ".";
import { actionsTypes } from "./actions";
import { Action, InitialState, ModalCRUD, ModalConfirmation, Snackbar } from "./types";

const actionsReducer = (state: InitialState, { type, payload }: Action) => {
  switch (type) {
    case actionsTypes.CLEAR_STATE:
      return INITIAL_STATE;

    case actionsTypes.UPDATE_PAGINATION:
      return {
        ...state,
        pagination: {
          page: payload.page,
          limit: payload.limit,
        } as Pagination,
      };

    case actionsTypes.UPDATE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          isSet: payload.isSet,
          search: payload.search,
          startDate: payload.startDate,
          endDate: payload.endDate,
          type: payload.type,
          status: payload.status,
          orderBy: payload.orderBy,
          sort: payload.sort,

          // another extended
        } as Filter,
      };

    case actionsTypes.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          show: payload.show,
          type: payload.type,
          message: payload.message,
          position: {
            horizontal: payload.position.horizontal,
            vertical: payload.position.vertical,
          },
        } as Snackbar,
      };

    case actionsTypes.SHOW_MODAL_CREATE:
      return {
        ...state,
        modal_create: payload as boolean,
      };

    case actionsTypes.SHOW_MODAL_VIEW:
      return {
        ...state,
        modal_view: {
          id: payload.id,
          show: payload.show,
        } as ModalCRUD,
      };

    case actionsTypes.SHOW_MODAL_EDIT:
      return {
        ...state,
        modal_edit: {
          id: payload.id,
          show: payload.show,
        } as ModalCRUD,
      };

    case actionsTypes.SHOW_MODAL_DETAIL:
      return {
        ...state,
        modal_detail: {
          id: payload.id,
          show: payload.show,
        } as ModalCRUD,
      };

    case actionsTypes.SHOW_MODAL_FILTER:
      return {
        ...state,
        modal_filter: payload as boolean,
      };

    case actionsTypes.SHOW_MODAL_OTHER:
      return {
        ...state,
        modal_other: payload as boolean,
      };

    case actionsTypes.SHOW_MODAL_CONFIRMATION:
      return {
        ...state,
        modal_confirmation: {
          show: payload.show,
          show_reason: payload.show_reason,
          title: payload.title,
          btn_cancel: payload.btn_cancel,
          btn_submit: payload.btn_submit,
          handleSubmit: payload.handleSubmit,
        } as ModalConfirmation,
      };

    default:
      return state;
  }
};

export const utilsReducer = (state: InitialState, { type, payload }: Action) => {
  return actionsReducer(state, { type, payload });
};
