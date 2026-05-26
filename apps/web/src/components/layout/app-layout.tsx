import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    `pb-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
      isActive
        ? "border-blue-600 text-blue-600" // Active state: Blue line and text
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900" // Inactive + Hover state
    }`;
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <h1 className="text-xl font-bold">Salary Management</h1>

          <nav className="flex gap-4">
            <NavLink to="/" className={getNavClasses}>
              Employees
            </NavLink>

            <NavLink to="/analytics" className={getNavClasses}>
              Analytics
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
