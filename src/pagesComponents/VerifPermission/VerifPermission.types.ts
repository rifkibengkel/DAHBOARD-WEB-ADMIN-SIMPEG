type VerifPermissionDocument = {
  uuid: string;
  description: string;
  document: string;
};

type ListApprovalPermission = {
  id: string;
  status: number;
  statusText: string;
  notes: string;
  position: string;
};

type ListPermission = {
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

export type DetailPermission = {
  id: string;
  createdAt: string;
  name: string;
  departement: string;
  nip: string;
  days: number;
  startDate: string;
  endDate: string;
  status: number;
  statusText: string;
  categoryName: string;
  typeName: string;
  description: string;
  documents: VerifPermissionDocument[];
  approvals: ListApprovalPermission[];
  message: string;
};

export type VerifPermissionPageProps = {
  permission_type: Options[];
};

export type VerifPermissionHeaderProps = {
  permission_type: Options[];
};

export type ModalVerifPermissionProps = {
  keys: string | null;
};

export type VerifPermissionTableProps = Table & {
  data: ListPermission[];
};
