import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/HomePage";
import { useState } from "react";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Navbar from "./Components/Common/Navbar";
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import ContactPage from "./Pages/ContactPage";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Components/Cores/Dashboard/Profile";
import PrivateRoute from "./Components/Cores/Auth/PrivateRoute";
import EnrolledCourses from "./Components/Cores/Dashboard/EnrolledCourses";
import Cart from "./Components/Cores/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./Utils/Constants";
import { useSelector } from "react-redux";
import MyCourses from "./Components/Cores/Dashboard/MyCourses";
import NewCourse from "./Components/Cores/Dashboard/NewCourse";
import EditCourse from "./Components/Cores/Dashboard/EditCourse";
import Cataloug from "./Pages/Cataloug";
import Error from "./Components/Common/Error";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoSection from "./Components/Cores/ViewCourse/VideoSection";
import Details from "./Components/Cores/Dashboard/InstructorDashboard/Details";
import Settings from "./Components/Cores/Dashboard/Settings/ProfileSetting";


function App() {
  //console.log("inside App");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user} = useSelector( (state) => state.profile)
  
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn}></SignUp>}></Route>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/changePassword/:id" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="/emailVerification" element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route element={
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }>
          <Route path="/dashboard/settings" element={<Settings></Settings>}></Route>
          <Route path="/dashboard/my-profile" element={<Profile></Profile>}></Route>
          {
            user!==null && user.accountType===ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>}></Route>
                <Route path="/dashboard/cart" element={<Cart></Cart>}></Route>
              </>
            
            )
          }
          {
            user!==null && user.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/my-courses" element={<MyCourses></MyCourses>}></Route>
                <Route path="/dashboard/add-course" element={<NewCourse></NewCourse>}></Route>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse></EditCourse>}></Route>
                <Route path="/dashboard/instructor" element={<Details></Details>}></Route>
              </>
            )
          }
          
        </Route>
        <Route path="/catalouge/:catagoryname" element={<Cataloug></Cataloug>}></Route>
        <Route path="course/:courseId" element={<CourseDetails></CourseDetails>}></Route>
       
        <Route path="*" element={<Error></Error>}></Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse></ViewCourse>
          </PrivateRoute>
        }>
        {
          user!==null && user.accountType===ACCOUNT_TYPE.STUDENT &&
          <>
            <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element=<VideoSection></VideoSection>></Route>
          </>
        }
          
        </Route>

        
        
      </Routes>


     
    </div>
  );
}

export default App;
