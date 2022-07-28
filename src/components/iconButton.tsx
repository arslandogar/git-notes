import { FC } from 'react';

interface Props {
  onClick: () => void;
  icon: string;
  isLoading?: boolean;
  color?: 'primary' | 'blue';
  text?: string;
}

export const IconButton: FC<Props> = ({ color = 'primary', isLoading, onClick, text, icon }) => {
  return (
    <button
      className={`btn btn-ghost btn-sm text-${color === 'primary' ? color : `${color}-600`} ${
        isLoading ? 'loading' : ''
      }`}
      onClick={onClick}
    >
      <i className={icon}></i>
      {text ? <span className="ml-2">{text}</span> : null}
    </button>
  );
};
