import * as Yup from "yup";

export const AddBranchSchema = Yup.object({
  name: Yup.string().required("Nama Required"),
});

export const EditBranchSchema = Yup.object({
  name: Yup.string().required("Nama Required"),
});
