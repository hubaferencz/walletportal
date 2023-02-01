import React, { useState } from "react";

import Header from "../partials/Header";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";

import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8"></div>

            <div className="grid grid-cols-10 gap-6">
              <DashboardCard06 />
              <DashboardCard05 />
              {/* <DashboardCard02 /> */}
              <DashboardCard07 />
              <DashboardCard03 />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;
