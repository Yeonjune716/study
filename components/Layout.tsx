import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  bottomNav?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, header, bottomNav }) => {
  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-background relative shadow-2xl overflow-hidden">
      {header && <div className="z-20">{header}</div>}
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 pb-24 relative z-10">
        {children}
      </main>

      {bottomNav && <div className="absolute bottom-0 w-full z-30">{bottomNav}</div>}
    </div>
  );
};