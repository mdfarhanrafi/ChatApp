import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
export default function ChatLayout({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
       <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
    </div>
  );
}
