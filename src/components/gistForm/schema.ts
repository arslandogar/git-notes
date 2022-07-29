import * as yup from 'yup';

export const schema = yup
  .object({
    description: yup.string().required(),
    public: yup.boolean().required(),
    files: yup
      .array()
      .of(
        yup.object({
          key: yup.string().required(),
          content: yup.string().required(),
        })
      )
      .required(),
  })
  .required();
