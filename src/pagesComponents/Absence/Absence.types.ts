type ListAbsence = {
  employeName: string;
  departement: string;
  clockIn: string;
  clockOut: string;
  date: string;
  apelIn: string;
  clockOutType: number;
  clockInType: number;
  clockOutTypeText: string;
  clockInTypeText: string;
  statusText: string;
  status: number;
  workTime: string;
};

export type DetailAbsence = {
  nip: string;
  apelOutImage: string;
  apelInImage: string;
  checkInImage: string;
  checkOutImage: string;
  id: string;
  employeName: string;
  departement: string;
  absentDuaration: string;
  clockIn: string;
  clockOut: string;
  date: string;
  apelIn: string;
  clockOutType: number;
  clockInType: number;
  clockOutTypeText: string;
  clockInTypeText: string;
  statusText: string;
  workTime: string;
  message: string;
};

export type ModalAbsenceProps = {
  keys: string | null;
};

export type AbsenceTableProps = Table & {
  data: ListAbsence[];
};
