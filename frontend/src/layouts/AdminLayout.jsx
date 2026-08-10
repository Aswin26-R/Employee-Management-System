import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1 }}>

        <Topbar />

        <main style={{ padding: "20px" }}>
          {children}
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default AdminLayout;