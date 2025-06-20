import { useState, useMemo } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { DashboardWidget } from "../components/DashboardWidget";
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

const mockData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    department: "Engineering",
    lastLogin: "2024-01-15",
    joinDate: "2022-03-15",
    salary: 85000,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
    department: "Marketing",
    lastLogin: "2024-01-14",
    joinDate: "2022-05-20",
    salary: 65000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
    department: "Sales",
    lastLogin: "2024-01-10",
    joinDate: "2021-11-12",
    salary: 55000,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "Active",
    department: "Engineering",
    lastLogin: "2024-01-15",
    joinDate: "2023-01-08",
    salary: 75000,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "Active",
    department: "HR",
    lastLogin: "2024-01-13",
    joinDate: "2020-07-22",
    salary: 80000,
  },
  {
    id: 6,
    name: "Diana Martinez",
    email: "diana@example.com",
    role: "Editor",
    status: "Pending",
    department: "Marketing",
    lastLogin: "2024-01-12",
    joinDate: "2023-09-15",
    salary: 62000,
  },
  {
    id: 7,
    name: "Eva Garcia",
    email: "eva@example.com",
    role: "Viewer",
    status: "Active",
    department: "Sales",
    lastLogin: "2024-01-14",
    joinDate: "2022-12-01",
    salary: 58000,
  },
  {
    id: 8,
    name: "Frank Lee",
    email: "frank@example.com",
    role: "Admin",
    status: "Active",
    department: "Engineering",
    lastLogin: "2024-01-15",
    joinDate: "2021-04-10",
    salary: 90000,
  },
  {
    id: 9,
    name: "Grace Kim",
    email: "grace@example.com",
    role: "Editor",
    status: "Inactive",
    department: "Design",
    lastLogin: "2024-01-08",
    joinDate: "2023-06-30",
    salary: 68000,
  },
  {
    id: 10,
    name: "Henry Davis",
    email: "henry@example.com",
    role: "Viewer",
    status: "Active",
    department: "Support",
    lastLogin: "2024-01-13",
    joinDate: "2022-08-18",
    salary: 45000,
  },
];

export const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = mockData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "All" || item.role === filterRole;
      const matchesStatus = filterStatus === "All" || item.status === filterStatus;
      const matchesDepartment = filterDepartment === "All" || item.department === filterDepartment;
      return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    });

    if (sortDirection && sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
    }

    return filtered;
  }, [searchTerm, filterRole, filterStatus, filterDepartment, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    if (sortDirection === "asc") return <ArrowUp className="w-4 h-4" />;
    if (sortDirection === "desc") return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Data Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage and analyze your data with advanced filtering, sorting, and search capabilities.
          </p>
        </div>

        <DashboardWidget title="Employee Management System">
          {/* Search and Filter Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 w-full bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={filterRole}
                  onChange={(e) => {
                    setFilterRole(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                >
                  <option value="All">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>

                <select
                  value={filterDepartment}
                  onChange={(e) => {
                    setFilterDepartment(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                  <option value="Design">Design</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {filteredAndSortedData.length} of {mockData.length} employees
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  {[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { key: "role", label: "Role" },
                    { key: "department", label: "Department" },
                    { key: "status", label: "Status" },
                    { key: "salary", label: "Salary" },
                    { key: "lastLogin", label: "Last Login" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      onClick={() => handleSort(key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{label}</span>
                        {getSortIcon(key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{item.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.role === "Admin"
                            ? "bg-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : item.role === "Editor"
                            ? "bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-slate-200 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
                        }`}
                      >
                        {item.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{item.department}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">${item.salary.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{item.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of{" "}
              {filteredAndSortedData.length} results
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Last
              </button>
            </div>
          </div>
        </DashboardWidget>
      </div>
    </DashboardLayout>
  );
};
