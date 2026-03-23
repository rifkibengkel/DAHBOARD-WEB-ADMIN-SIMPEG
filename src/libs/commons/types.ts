/* eslint-disable @typescript-eslint/no-unused-vars */

type Pagination = {
  page: number;
  limit: number;
};

type Filter = {
  isSet: boolean;
  search: string;
  startDate: string | Date;
  endDate: string | Date;
  type: string | number;
  status: string | number;
  orderBy: string;
  sort: "asc" | "desc";

  // another extended
};

type Menu = {
  id: number;
  menu: string;
  level: number;
  header: number;
  path: string;
  icon: string;
  m_insert: number;
  m_update: number;
  m_delete: number;
  m_view: number;
  m_export: number;
  m_import: number;
  m_nego: number;
  child: Menu[];
};

type Table = {
  keys: string | null;
  page?: number;
  countPage?: number;
  totalPage?: number;
  totalPerPage?: number;
  isLoading: boolean;
  isError: unknown;
};

type User = {
  id: string;
  username: string;
  photo: string;
  name: string;
  access: string;
  accessCode: string;
  employeeId: string;
  cabangId: number;
  cabang: string;
  message: string;
};

type Options = {
  id: number;
  name: string;
};

type SessionInit = {
  isLoggedIn: boolean;
  token: string;
};
