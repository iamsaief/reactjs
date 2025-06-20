/**
 * Data State Slice
 *
 * Manages application data including dashboard statistics, table data,
 * analytics information, and other business data that needs global state management.
 */

import { createSlice } from "@reduxjs/toolkit";

// Initial state with mock data for demonstration
const initialState = {
  stats: {
    totalUsers: 12345,
    revenue: "$45,678",
    orders: 1234,
    avgResponse: "2.4s",
  },

  tableData: {
    rows: [], // Will be populated by components
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
  },

  filters: {
    searchTerm: "",
    roleFilter: "",
    statusFilter: "",
    departmentFilter: "",
  },

  sortConfig: {
    key: "name",
    direction: "asc",
  },
};

/**
 * Data slice for managing application data
 */
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Update dashboard statistics
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },

    // Set table data
    setTableData: (state, action) => {
      state.tableData.rows = action.payload;
      state.tableData.totalCount = action.payload.length;
    },

    // Update pagination
    setCurrentPage: (state, action) => {
      state.tableData.currentPage = action.payload;
    },

    setPageSize: (state, action) => {
      state.tableData.pageSize = action.payload;
      state.tableData.currentPage = 1; // Reset to first page
    },

    // Update search term
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
      state.tableData.currentPage = 1; // Reset to first page when searching
    },

    // Update filters
    setRoleFilter: (state, action) => {
      state.filters.roleFilter = action.payload;
      state.tableData.currentPage = 1;
    },

    setStatusFilter: (state, action) => {
      state.filters.statusFilter = action.payload;
      state.tableData.currentPage = 1;
    },

    setDepartmentFilter: (state, action) => {
      state.filters.departmentFilter = action.payload;
      state.tableData.currentPage = 1;
    },

    // Update sort configuration
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },

    // Clear all filters
    clearFilters: (state) => {
      state.filters = {
        searchTerm: "",
        roleFilter: "",
        statusFilter: "",
        departmentFilter: "",
      };
      state.tableData.currentPage = 1;
    },
  },
});

// Export actions
export const {
  updateStats,
  setTableData,
  setCurrentPage,
  setPageSize,
  setSearchTerm,
  setRoleFilter,
  setStatusFilter,
  setDepartmentFilter,
  setSortConfig,
  clearFilters,
} = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
