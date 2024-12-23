import React, { Suspense } from 'react';
import NavTabs from '@/components/NavBar/navtabs';
import Loading from '@/components/loading';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tabs = ["Trending", "Popular", "Top Rated", "Upcoming", "Contact Us"] //, "Search", "About Us", "Contact Us", "Settings"]
  return (
    <div>
        <div className="flex flex-col">
          <Suspense fallback={<Loading />}>
            <NavTabs tabs={tabs} homeRoute="/"></NavTabs>
          </Suspense>
        </div>
        <main className="flex-grow p-4 text-white select-text">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>
    </div>
  );
};

export default DashboardLayout;
