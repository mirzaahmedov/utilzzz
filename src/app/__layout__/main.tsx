import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="flex flex-col">
      <Header />
      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
