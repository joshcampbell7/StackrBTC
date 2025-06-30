import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import data from "./data.json"
import TradingViewCard from "@/components/chart-area-interactive"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from '../model/user'


export default function Page() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("userData");
        if (stored) {
            const parsedUser: User = JSON.parse(stored);
            setUserData(parsedUser);
        } else {
            // If no user data, redirect to login
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        console.log(userData)
    }, [userData]);


    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                {userData && <SiteHeader user={userData} />}
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            {userData && <SectionCards user={userData} />}
                            <div className="px-4 lg:px-6">
                                <TradingViewCard />
                            </div>
                            <DataTable data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
