import React from "react";

/**
 * DangerButton component for rendering a button with a red background indicating danger or deletion action.
 *
 * @param {string} className - Additional CSS classes to apply to the button.
 * @param {boolean} disabled - Whether the button is disabled (default: false).
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @param {Object} props - Additional props to be passed to the button element.
 * @returns {JSX.Element} - The rendered DangerButton component.
 */
export default function DangerButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
