import React, { Suspense } from 'react';
import NavTabs from '@/components/NavBar/navtabs';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tabs = ["Trending", "Popular", "Top Rated", "Upcoming", "Contact Us"] //, "Search", "About Us", "Contact Us", "Settings"]
  return (
    <div>
        <div className="flex flex-col">
          <Suspense fallback={<p className="text-4xl text-center justify-center">Loading...</p>}>
            <NavTabs tabs={tabs} homeRoute="/"></NavTabs>
          </Suspense>
        </div>
        <main className="flex-grow p-4 text-white select-text">
          <Suspense fallback={<p className="text-4xl text-center justify-center">Loading...</p>}>
            {children}
          </Suspense>
        </main>
        <footer className="text-white py-4 text-center shadow-md"> 
           {/* bg-slate-100  */}
            <div className="container mx-auto">
            &copy; {new Date().getFullYear()} Movies.db. All rights reserved.
            </div>
        </footer>
    </div>
  );
};

export default DashboardLayout;
