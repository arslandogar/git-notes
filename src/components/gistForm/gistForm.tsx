/* eslint-disable react/display-name */
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, forwardRef, Ref } from 'react';
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

  return (
    <form className="form-control py-10 w-full " onSubmit={handleSubmit(onSubmit)}>
      <label className="label cursor-pointer w-32" htmlFor="public">
        <span className="label-text">Public Gist</span>
        <InputComponent
          disabled={isLoading}
          type="checkbox"
          className="checkbox checkbox-primary"
          error={errors.public?.message}
          {...register('public')}
        />
      </label>
      <InputComponent
        disabled={isLoading}
        placeholder="Enter gist description..."
        error={errors.description?.message}
        {...register('description')}
      />
      {fields.map((field, index) => (
        <div key={field.id}>
          <InputComponent
            disabled={isLoading}
            placeholder="Enter gist file name..."
            error={errors.files?.[index]?.key?.message}
            {...register(`files.${index}.key`)}
          />
          <InputComponent
            disabled={isLoading}
            placeholder="Enter gist file content..."
            className="textarea textarea-bordered w-full h-80"
            elementType="textarea"
            error={errors.files?.[index]?.content?.message}
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
        disabled={isLoading}
        type="submit"
        className={`${isLoading ? 'loading' : ''} btn btn-primary text-white w-48 my-3`}
      >
        {gistId ? 'Update Gist' : 'Create Gist'}
      </button>
    </form>
  );
};

const InputComponent = forwardRef(
  (
    {
      isLoading,
      error,
      type = 'text',
      className = 'input input-bordered w-full',
      elementType = 'input',
      ...rest
    }: {
      isLoading?: boolean;
      error?: string;
      type?: string;
      placeholder?: string;
      className?: string;
      elementType?: 'input' | 'textarea';
    },
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const commonClass = 'my-3';
    return (
      <>
        {error ? <p className="alert alert-error w-1/3">{error}</p> : null}
        {elementType === 'input' ? (
          <input
            ref={ref as Ref<HTMLInputElement>}
            disabled={isLoading}
            type={type}
            className={`${className} ${commonClass}`}
            {...rest}
          />
        ) : (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            disabled={isLoading}
            className={`${className} ${commonClass}`}
            {...rest}
          />
        )}
      </>
    );
  }
);
