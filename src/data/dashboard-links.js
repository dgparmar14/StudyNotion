import { icons } from "react-icons";
import { ACCOUNT_TYPE } from  "../Utils/Constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },
  {
    id : 7,
    name : "Manage Categories",
    path : "/dashboard/manageCategories",
    type : ACCOUNT_TYPE.ADMIN,
    icon : "VscOutput"
  },
  {
    id: 8,
    name : "Category Requests",
    path : "/dashboard/categoryRequests",
    type : ACCOUNT_TYPE.ADMIN,
    icon : "VscRequestChanges"
  },
  {
    id : 9,
    name : "Add Category",
    path : "dashboard/createCategory",
    type : ACCOUNT_TYPE.ADMIN,
    icon : "VscAdd"
  },
  {
    id : 10,
    name : "Category Requests",
    path : "dashboard/categoryRequestsByUser",
    type : ACCOUNT_TYPE.INSTRUCTOR,
    icon : "VscRequestChanges"
  }
];
