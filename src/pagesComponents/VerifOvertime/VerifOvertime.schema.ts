import * as Yup from "yup";

export const VerifOvertimeSchema = Yup.object({
  status: Yup.number().required("Status Required").min(1, "Status Required"),
  notes: Yup.string().when("status", { is: 2, then: (schema) => schema.required("Alasan Required") }),
});
