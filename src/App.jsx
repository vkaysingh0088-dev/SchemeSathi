
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Chat from "./pages/chat";
import Eligibility from "./pages/Eligibility";
import Upload from "./pages/upload";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-50">

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-between gap-4 bg-blue-900 px-6 py-4 text-white">

          <NavLink to="/" className="text-xl font-bold">
            SchemeSathi
          </NavLink>

          <div className="flex flex-wrap gap-5 text-sm font-medium">

            <NavLink to="/" end
              className={({ isActive }) =>
                isActive ? "text-yellow-300" : "hover:text-yellow-200"
              }
            >
              Dashboard
            </NavLink>

            <NavLink to="/chat"
              className={({ isActive }) =>
                isActive ? "text-yellow-300" : "hover:text-yellow-200"
              }
            >
              Chat
            </NavLink>

            <NavLink to="/eligibility"
              className={({ isActive }) =>
                isActive ? "text-yellow-300" : "hover:text-yellow-200"
              }
            >
              Eligibility
            </NavLink>

            <NavLink to="/upload"
              className={({ isActive }) =>
                isActive ? "text-yellow-300" : "hover:text-yellow-200"
              }
            >
              Upload
            </NavLink>

          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
