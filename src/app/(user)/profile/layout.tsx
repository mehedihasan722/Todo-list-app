import { SideBar } from "./ProfileSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex lg:flex-row flex-col justify-start items-start gap-5 min-h-screen xl:px-5 ">
      <SideBar />
      {children}
    </div>
  );
}
