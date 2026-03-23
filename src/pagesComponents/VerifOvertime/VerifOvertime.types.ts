type VerifOvertimeDocument = {
  uuid: string;
  description: string;
  document: string;
};

interface ListOvertime {
  id: string;
  date: string;
  name: string;
  status: number;
  statusText: string;
  type: string;
  startTime: string;
  endTime: string;
}

type ListApprovalOvertime = {
  id: string;
  status: number;
  statusText: string;
  notes: string;
  position: string;
};

export type DetailOvertime = {
  id: string;
  date: string;
  name: string;
  departement: string;
  nip: string;
  status: string;
  category: string;
  startTime: string;
  endTime: string;
  description: string;
  documents: VerifOvertimeDocument[];
  approvals: ListApprovalOvertime[];
  message: string;
};

export type VerifOvertimePageProps = {
  overtime_type: Options[];
};

export type VerifOvertimeHeaderProps = {
  overtime_type: Options[];
};

export type ModalVerifOvertimeProps = {
  keys: string | null;
};

export type VerifOvertimeTableProps = Table & {
  data: ListOvertime[];
};
