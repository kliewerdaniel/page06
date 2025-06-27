import React from 'react';

export const InfoBlock: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-4 my-6 rounded-md">
    {title && <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">{title}</h3>}
    <div className="text-blue-700 dark:text-blue-300">{children}</div>
  </div>
);

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl font-bold mt-12 mb-6 border-b-2 pb-2">{children}</h2>
);

export const SubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-3xl font-semibold mt-8 mb-4">{children}</h3>
);

export const CustomTable: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto my-6">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && child.type === 'thead' ? child : null
        )}
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && child.type === 'tbody' ? child : null
        )}
      </tbody>
    </table>
  </div>
);

export const ChecklistItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start mb-2">
    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{children}</span>
  </li>
);
