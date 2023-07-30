import React from "react";

// A reusable page component that displays a header with a title and optional buttons, and a main content section.
// Props:
// - title: The title of the page.
// - buttons: Optional buttons to be displayed in the header.
// - children: The main content of the page.
export const PageComponent = ({ title, buttons = "", children }) => {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow">
        <div className="flex mx-auto justify-between items-center max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>

          {/* Optional buttons */}
          {buttons}
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
};
