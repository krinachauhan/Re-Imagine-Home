import * as Yup from "yup";

export const validationSchemaLogin = Yup.object({
  emailID: Yup.string().email('Invalid email address').required("Please enter your email"),
  password: Yup.string().min(6, 'Too Short!').required("Please enter your password"),
});
