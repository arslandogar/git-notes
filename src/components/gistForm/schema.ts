import * as yup from 'yup';

export const schema = yup
  .object({
    description: yup.string().required('Description is required'),
    public: yup.boolean().required('Public is required'),
    files: yup
      .array()
      .of(
        yup.object({
          key: yup.string().required("File's name is required"),
          content: yup.string().required("File's content is required"),
        })
      )
      .required('Files are required'),
  })
  .required();
