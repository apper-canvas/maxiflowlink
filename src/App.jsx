import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import WorkflowsPage from "@/components/pages/WorkflowsPage";
import AppsPage from "@/components/pages/AppsPage";
import TemplatesPage from "@/components/pages/TemplatesPage";
import ActivityPage from "@/components/pages/ActivityPage";
import WorkflowDetailPage from "@/components/pages/WorkflowDetailPage";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface">
        <div className="flex">
          <Sidebar onClose={handleMobileMenuClose} />
          {mobileMenuOpen && <Sidebar onClose={handleMobileMenuClose} />}

          <div className="flex-1 flex flex-col min-h-screen">
            <Header 
              title="FlowLink"
              onMenuClick={handleMobileMenuToggle}
            />
            
            <main className="flex-1 p-4 lg:p-6">
              <Routes>
                <Route path="/" element={<WorkflowsPage />} />
                <Route path="/apps" element={<AppsPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/activity" element={<ActivityPage />} />
                <Route path="/workflow/:id" element={<WorkflowDetailPage />} />
              </Routes>
            </main>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;