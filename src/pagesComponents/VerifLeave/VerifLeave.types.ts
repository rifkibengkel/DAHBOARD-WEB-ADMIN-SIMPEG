type VerifLeaveDocument = {
  uuid: string;
  description: string;
  document: string;
};

type ListApprovalLeave = {
  id: string;
  status: number;
  statusText: string;
  notes: string;
  position: string;
};

type ListLeave = {
  id: string;
  createdAt: string;
  days: number;
  startDate: string;
  endDate: string;
  status: number;
  statusText: string;
  categoryName: string;
  typeName: string;
  description: string;
  employeeName: string;
};

export type DetailLeave = {
  id: string;
  createdAt: string;
  days: number;
  name: string;
  departement: string;
  nip: string;
  startDate: string;
  endDate: string;
  status: number;
  statusText: string;
  categoryName: string;
  typeName: string;
  description: string;
  documents: VerifLeaveDocument[];
  approvals: ListApprovalLeave[];
  message: string;
};

export type ModalVerifLeaveProps = {
  keys: string | null;
};

export type VerifLeaveTableProps = Table & {
  data: ListLeave[];
};
