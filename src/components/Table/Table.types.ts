type ListHeader = {
  id: string;
  align: string;
  label: string;
  sort?: boolean;
  width?: string | number;
  custom_date?: boolean;
};

export type TableHeadProps = {
  headers: ListHeader[];
};

export type TableActionProps = {
  id: number;
};

export type TableDetailProps = {
  id?: number;
  path?: string;
};

export type TableBodyProps = Pick<Table, "keys" | "isLoading" | "isError"> & {
  headers: ListHeader[];
  data: any[];
  path?: string;
};

export type TableProps = Table & {
  headers: ListHeader[];
  data: any[];
  path?: string;
  hidePagination?: boolean;
};
