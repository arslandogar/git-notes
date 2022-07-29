import { FC } from 'react';

interface Props {
  message?: string;
}

export const ErrorFallback: FC<Props> = ({ message = 'Ooops, something went wrong :( ' }) => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">{message}</h2>
      <button
        className="btn btn-error text-white mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>
  );
};
