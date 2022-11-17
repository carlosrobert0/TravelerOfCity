import React, { ButtonHTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg';

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  title: string;
  svg: string;
}

export function SignInSocialButton({
  title,
  svg,
  ...rest
}: Props) {
  return (
    <button className="h-14 rounded-md flex items-center justify-center w-full mt-4 mb-4"{...rest}>
      <div className="h-full flex justify-center items-center p-4 border-[#f0f2f5] border-r">
        <ReactSVG src={svg} />
      </div>

      <h2 className="text-center font-heebo text-sm">
        {title}
      </h2>
    </button>
  )
}