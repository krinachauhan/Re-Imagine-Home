import * as Yup from "yup";

export const validationSchemaRegister = Yup.object({
  firstName: Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required("Please enter your first name"),
  lastName: Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required("Please enter your last name"),
  // emailID: Yup.string().email('Invalid email address').required("Please enter your email"),
  password: Yup.string().min(6, 'Too Short!').required("Please enter your password"),
  // confirm_password: Yup.string()
  //   .required()
  //   .oneOf([Yup.ref("password"), null], "Password must match"),
});
