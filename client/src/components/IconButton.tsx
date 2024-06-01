import React, { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  errors?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function IconButton({ children, errors, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-[30px] h-[30px] text-downriver-950 relative inline-flex items-center justify-start overflow-hidden font-medium transition-all rounded hover:bg-aquamarine-50 group focus:bg-aquamarine-50 group"
      type="submit"
    >
      <span
        className={`w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-10 ml-10 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-focus:ml-0 group-focus:mb-32 group-focus:translate-x-0 ${
          errors ? 'bg-red-500' : 'bg-aquamarine-600'
        }`}
      ></span>
      <span className="relative w-full transition-colors duration-300 ease-in-out group-hover:text-aquamarine-50 group-focus:text-aquamarine-50">
        {children}
      </span>
    </button>
  );
}

export default IconButton;
