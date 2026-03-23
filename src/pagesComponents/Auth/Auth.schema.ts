import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string().required("Username Required"),
  password: Yup.string().required("Password Required"),
});
