import * as Yup from "yup";

export const validationSchemaUpload = Yup.object({
  themeoption: Yup.string().required("Please select an option"),
  roomoption: Yup.string().required("Please select an option"),
  color:  Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required("Please enter color"),
});