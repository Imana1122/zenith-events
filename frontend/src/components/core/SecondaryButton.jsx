import React from 'react';

/**
 * SecondaryButton component for rendering a secondary button with customizable styles and behaviors.
 *
 * @param {string} type - The type attribute of the button (default: 'button').
 * @param {string} className - Additional CSS classes to apply to the button.
 * @param {boolean} disabled - Whether the button is disabled (default: false).
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @param {object} props - Additional props to be passed to the button element.
 * @returns {JSX.Element} - The rendered SecondaryButton component.
 */
export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
