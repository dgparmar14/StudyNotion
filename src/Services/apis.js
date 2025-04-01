//const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log("Base url : ", BASE_URL)
export const catagories = {
    CATAGORIES_API : BASE_URL + "/course/showAllCatagory",
}

export const settingEndPosints = {  
    RESET_PASSWORD_TOKEN_API : BASE_URL + "/auth/resetPasswordToken",
    CHANGE_PASSWORD_API : BASE_URL + "/auth/resetPassword",
    UPDATE_DISPLAYPICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfileDetails",
    DELETE_PROFILE_API : BASE_URL + "/profile/deleteUserAccount",
    UPDATE_PASSWORD_API : BASE_URL + "/profile/updatePassword"
}

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOtp",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    UPDATE_CHANGE_PASSWORD_API : BASE_URL + "/auth/changePassword"
}

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA : BASE_URL + "/profile/instructorDashboard"
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/varifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourese",
    COURSE_DETAILS_API: BASE_URL + "/course/getAllCoursesDetrails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCourseCatagories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubsection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getAllInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getAllDetailsofCourse",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
     CREATE_RATING_API: BASE_URL + "/course/createRatingAndReview",
}

export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getAllReviews",
}

export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCatagoryPageDetails",
}

export const contactusEndpoint = {
     CONTACT_US_API: BASE_URL + "/reach/contact",
  }
  
export const categoryEndpoint = {
    CREATE_CATEGORY_API : BASE_URL + "/course/createCatagory",
    ADD_CATEGORY_REQUEST_API : BASE_URL + "/categoryRequest/createCategoryRequest",
    UPDATE_CATEGORY_REQUEST_API : BASE_URL + "/categoryRequest/updateCategoryRequest",
    GET_CATEGORY_REQUEST_API : BASE_URL + "/categoryRequest/getCategoryRequest",
    DELETE_CATEGORY_REQUEST_API : BASE_URL + "/categoryRequest/deleteCategoryRequest",
    GET_CATEGORY_CREATED_BY_USER_API : BASE_URL + "/categoryRequest/getCategoryRequestCreatedByUser",
    REQUEST_FOR_ADMIN : BASE_URL + "/categoryRequest/getRequestForAdmin",
    GET_CATEGORY_COURSE_DETAILS : BASE_URL + "/course/getCategoryCourseDetails"
}

export const quizEndPoint = {
    CREATE_QUIZ_API : BASE_URL + "/quiz/createQuiz",
    UPDATE_QUIZ_API : BASE_URL + "/quiz/updateQuiz",
    GET_QUIZ_API : BASE_URL + "/quiz/getQuiz",
    DELETE_QUIZ_API : BASE_URL + "/quiz/deleteQuiz",
    CHECK_RESULT_API : BASE_URL + "/quiz/checkResult",
    GET_RESULT_QUIZ_API : BASE_URL + "/quiz/getResult",
    ADD_QUESTION_API : BASE_URL + "/quiz/addQuestion",
    UPDATE_QUESTION_API : BASE_URL + "/quiz/updateQuestions",
    GET_QUESTION_API : BASE_URL + "/quiz/getAllQuestions",
    DELETE_QUESTION_API : BASE_URL + "/quiz/deleteQuestions",
}




