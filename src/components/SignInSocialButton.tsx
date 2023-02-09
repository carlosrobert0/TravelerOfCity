import React, { ButtonHTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
    title: string
    svg: string
}

export function SignInSocialButton({ title, svg, ...rest }: Props) {
    return (
        <button
            className="mt-4 mb-4 flex h-14 w-full items-center justify-center rounded-md"
            {...rest}
        >
            <div className="flex h-full items-center justify-center border-r border-[#f0f2f5] p-4">
                <ReactSVG src={svg} />
            </div>

            <h2 className="text-center font-heebo text-sm">{title}</h2>
        </button>
    )
}
