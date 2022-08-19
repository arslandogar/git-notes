import { FC } from 'react';

interface Props {
  /**
   * Called when the user clicks the button
   */
  onClick: () => void;
  /**
   * Icon to display
   */
  icon: string;
  /**
   * If true, a spinner will be displayed in the button
   */
  isLoading?: boolean;
  /**
   * Color of the button
   * @default 'primary'
   */
  color?: 'primary' | 'blue';
  /**
   * Text to display in the button
   */
  text?: string;
  /**
   * Count to display in the button
   */
  count?: number;
}

/**
 * A button with an icon, text and a count
 */
export const IconButton: FC<Props> = ({
  count,
  color = 'primary',
  isLoading,
  onClick,
  text,
  icon,
}) => {
  return (
    <button
      className={`btn btn-ghost btn-sm text-${color === 'primary' ? color : `${color}-600`} ${
        isLoading ? 'loading' : ''
      }`}
      onClick={onClick}
    >
      <i className={icon}></i>
      {text ? <span className="ml-2">{text}</span> : null}
      {typeof count === 'number' ? (
        <span className="ml-2 badge badge-outline">{` ${count}`}</span>
      ) : null}
    </button>
  );
};
