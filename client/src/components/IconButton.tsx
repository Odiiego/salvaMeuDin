import React, { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  errors?: boolean;
  className?: string;
  badge?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function IconButton({
  children,
  errors,
  className,
  badge,
  onClick,
}: IconButtonProps) {
  const style = className;
  return (
    <button
      onClick={onClick}
      className={`w-[30px] h-[30px] text-downriver-950 relative inline-flex items-center justify-start overflow-hidden font-medium transition-all rounded hover:bg-aquamarine-50 focus:bg-aquamarine-50 group ${style}`}
      type="submit"
    >
      <span
        className={`w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out transition-all translate-y-full group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-focus:ml-0 group-focus:mb-32 group-focus:translate-x-0
        ${
          badge
            ? 'bg-downriver-950 duration-1000 mb-0 ml-0'
            : 'duration-500 mb-10 ml-10 '
        }
        ${errors ? 'bg-red-500' : 'bg-aquamarine-600'}`}
      ></span>
      <span className="relative w-full transition-colors duration-300 ease-in-out group-hover:text-aquamarine-50 group-focus:text-aquamarine-50">
        {children}
      </span>
    </button>
  );
}

export default IconButton;
