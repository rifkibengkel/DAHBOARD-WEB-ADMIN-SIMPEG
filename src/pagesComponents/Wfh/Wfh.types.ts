type ListApprovalPermission = {
  id: string;
  status: number;
  statusText: string;
  notes: string;
};

export type ListWfh = {
  id: string;
  employeName: string;
  departement: string;
  clockIn: string;
  date: null;
  status: number;
  statusText: string;
};

export type DetailWfh = {
  id: string;
  employeName: string;
  name: string;
  nip: string;
  departement: string;
  clockIn: string;
  date: string;
  approvals: ListApprovalPermission[];
  status: number;
  statusText: string;
  message: string;
};

export type ModalWfhProps = {
  keys: string | null;
};

export type WfhTableProps = Table & {
  data: ListWfh[];
  filterNew: ListWfh;
  setFilterNew: React.Dispatch<React.SetStateAction<ListWfh>>;
};
