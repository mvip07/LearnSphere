"use client";

import Navbar from "../Navbar/Navbar";
import CabinetSideBar from "../Sidebar/Sidebar";
import { CABINETSIDEBAR } from "@/assets/utils/sideBarData";
import { useAppContext } from "@/context/AppContext";

const CabinetLayout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAppContext();

    if (!user) return null;

    return (
        <main id="main" className="p-4">
            <CabinetSideBar sidebar={CABINETSIDEBAR} />
            <Navbar />
            {children}
        </main>
    );
};

export default CabinetLayout;
