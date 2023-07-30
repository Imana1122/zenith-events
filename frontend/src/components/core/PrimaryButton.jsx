import React from 'react';

/**
 * PrimaryButton component for rendering a primary button with customizable styles and behaviors.
 *
 * @param {string} className - Additional CSS classes to apply to the button.
 * @param {boolean} disabled - Whether the button is disabled (default: false).
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @param {object} props - Additional props to be passed to the button element.
 * @returns {JSX.Element} - The rendered PrimaryButton component.
 */
export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type="submit"
            className={
                `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
