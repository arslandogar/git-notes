import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  className?: string;
  onClick?: () => void;
}

export const Button: FC<Props> = ({ children, type, className, onClick }) => {
  return (
    <button className={`btn btn-${type} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
