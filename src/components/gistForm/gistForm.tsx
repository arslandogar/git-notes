import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { schema } from './schema';
import { FormData, Props } from './types';

export const GistForm: FC<Props> = ({ gistId, defaultValues, onSubmitForm, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultValues
      ? defaultValues
      : {
          description: '',
          public: false,
          files: [
            {
              key: '',
              content: '',
            },
          ],
        },

    resolver: yupResolver(schema),
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'files',
  });

  const onSubmit = (formData: FormData) => {
    const files = {} as any;
    formData.files.forEach((file) => {
      files[file.key] = {
        content: file.content,
      };
    });
    const gistDTO = {
      description: formData.description,
      public: formData.public,
      files: files,
    };

    if (gistId) {
      onSubmitForm({ gist_id: gistId, ...gistDTO });
    } else {
      onSubmitForm(gistDTO);
    }
  };

  console.log(errors);

  return (
    <form className="form-control py-10 w-full " onSubmit={handleSubmit(onSubmit)}>
      <label className="label cursor-pointer w-32">
        <span className="label-text">Public Gist</span>
        <input
          disabled={isLoading}
          type="checkbox"
          className="checkbox checkbox-primary my-3"
          {...register('public')}
        />
      </label>
      <input
        disabled={isLoading}
        type="text"
        placeholder="Enter gist description..."
        className=" input input-bordered w-full my-3"
        {...register('description')}
      />
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            disabled={isLoading}
            type="text"
            placeholder="Enter gist file name..."
            className="input input-bordered w-full my-3"
            {...register(`files.${index}.key`)}
          />
          <textarea
            disabled={isLoading}
            placeholder="Enter gist file content..."
            className="textarea textarea-bordered w-full h-80 my-3"
            {...register(`files.${index}.content`)}
          />
        </div>
      ))}
      <button
        disabled={isLoading}
        className="btn btn-primary text-white w-48 my-3"
        onClick={() => append({ key: '', content: '' })}
      >
        Add file
      </button>
      <button
        type="submit"
        className={`${isLoading ? 'loading' : ''} btn btn-primary text-white w-48 my-3`}
      >
        {gistId ? 'Update Gist' : 'Create Gist'}
      </button>
    </form>
  );
};
