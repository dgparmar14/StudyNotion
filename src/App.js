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
import AddCategory from "./Components/Cores/Dashboard/AdminPannel/AddCategory";
import ManageCategories from "./Components/Cores/Dashboard/AdminPannel/ManageCategories";
import CategoryRequests from "./Components/Cores/Dashboard/AdminPannel/CategoryRequests";
import CategoryCourseDetails from "./Components/Cores/Dashboard/AdminPannel/CatrgoryDetails";
import QuizDetails from "./Components/Common/Quiz/QuizDetails";
import QuizIntro from "./Components/Common/Quiz/QuizIntro";
import QuizResult from "./Components/Common/Quiz/QuizResult";
import QuizPage from "./Pages/Quiz";
import CategoryRequestsByUser from "./Pages/CategoryRequestsByUser";
import TakeQuiz from "./Components/Common/Quiz/TakeQuiz"

function App() {
  //console.log("inside App");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user} = useSelector( (state) => state.profile)
  
  return (
    <div className="w-screen min-h-screen  flex flex-col font-inter">
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
                
                {/* <Route path="/quiz/quiz-intro/:courseId" element={<QuizIntro></QuizIntro>}></Route> */}
                <Route path="/quiz/quiz-intro" element={<QuizIntro></QuizIntro>}></Route>
                <Route path="/dashboard/takeQuiz/:id" element={<TakeQuiz></TakeQuiz>}></Route>
                <Route path="/dashboard/quizResult" element={<QuizResult></QuizResult>}></Route>
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
                <Route path="/dashboard/categoryRequestsByUser" element={<CategoryRequestsByUser></CategoryRequestsByUser>}></Route>
                <Route path="/dashboard/takeQuiz/:id" element={<TakeQuiz></TakeQuiz>}></Route>
                <Route path="/dashboard/quiz/:categoryQuizId?" element={<QuizPage></QuizPage>}></Route>
                <Route path="/dashboard/quizResult" element={<QuizResult></QuizResult>}></Route>
              </>
            )
          
          }
          {
              user != null && user.accountType === ACCOUNT_TYPE.ADMIN && (
                <>
                  <Route path="dashboard/manageCategories" element={<ManageCategories></ManageCategories>}></Route>
                  {/* <Route path="dashboard/categoryCourseDetails/:categoryId" element={<CategoryCourseDetails></CategoryCourseDetails>}></Route> */}
                  <Route path="dashboard/categoryRequests" element={<CategoryRequests></CategoryRequests>}></Route>
                  <Route path="dashboard/createCategory" element={<AddCategory></AddCategory>}></Route>
                  <Route path="/dashboard/quiz/:categoryQuizId?" element={<QuizPage></QuizPage>}></Route>
                </>
              )
          }
          
         
        </Route>
        <Route path="/catalouge/:catagoryname" element={<Cataloug></Cataloug>}></Route>
        <Route path="course/:courseId" element={<CourseDetails></CourseDetails>}></Route>
        <Route path="/:category/:categoryId/quiz/:categoryId" element={<QuizPage></QuizPage>}></Route>
       
        <Route path="*" element={<Error></Error>}></Route>

        <Route element={
              <PrivateRoute>
                <ViewCourse/>
              </PrivateRoute>

            }>
              {
                user?.accountType===ACCOUNT_TYPE.STUDENT && (
                  <>
                  <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element=<VideoSection></VideoSection>></Route>
                    
                  </>
                )
              }



            </Route>
      </Routes>


     
    </div>
  );
}

export default App;
