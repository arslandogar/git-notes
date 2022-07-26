import { FC } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rightIcon?: string;
  leftIcon?: string;
}

export const Input: FC<Props> = ({ value, onChange, placeholder, rightIcon, leftIcon }) => {
  return (
    <div className="relative">
      {leftIcon ? (
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <i className="fa-solid fa-magnifying-glass w-5 h-5"></i>
        </div>
      ) : null}
      <input
        type="text"
        id="searchGists"
        className="input bg-primary placeholder-white text-white border-white md:input-lg"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      {rightIcon ? (
        <div className="flex absolute inset-y-0 right-4 items-center pl-3 pointer-events-none">
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </div>
      ) : null}
    </div>
  );
};
