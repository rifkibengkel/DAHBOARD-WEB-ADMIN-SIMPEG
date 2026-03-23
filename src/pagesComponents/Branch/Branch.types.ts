type ListBranch = {
  name: string;
};

type BranchMapPointings = {
  id?: number;
  latitude: string;
  longitude: string;
};

type MapBranch = {
  cabangMapPointings: BranchMapPointings[];
};

export type DetailBranch = {
  id?: number;
  name?: string;
  cabangMapPointings: BranchMapPointings[];
};

export type MapBranchProps = {
  type: "created" | "edited";
  branch: MapBranch;
  setBranch: React.Dispatch<React.SetStateAction<DetailBranch | null>>;
};

export type SearchControlBranchProps = {
  setSelected: React.Dispatch<
    React.SetStateAction<
      | {
          coords: L.LatLngExpression;
          address: string;
        }
      | undefined
    >
  >;
};

export type GeoSearchLocationEvent = {
  location: {
    y: number;
    x: number;
    label: string;
  };
};

export type ModalAddBranchProps = {
  keys: string | null;
};

export type ModalDetailBranchProps = ModalAddBranchProps;

export type BranchTableProps = {
  keys: string | null;
  data: ListBranch[];
  isLoading: boolean;
  isError: unknown;
};
