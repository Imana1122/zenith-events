import React from "react";

/**
 * Checkbox component for rendering an input checkbox element.
 *
 * @param {string} className - Additional CSS classes to apply to the checkbox.
 * @param {Object} props - Additional props to be passed to the input element.
 * @returns {JSX.Element} - The rendered Checkbox component.
 */
export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                // Use tailwind CSS classes for styling the checkbox
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                // Add any additional classes provided via the className prop
                className
            }
        />
    );
}
