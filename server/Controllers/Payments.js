const {instance} = require("../Configs/Razorpay");
const User = require("../Models/User");
const Cource = require("../Models/Cource");
const CourseProgress = require("../Models/CourceProgress");
const mailSender = require("../Utils/MailSender");
const { default: mongoose } = require("mongoose");
const { courseEnrollmentEmail } = require("../templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../templates/paymentSuccessEmail");
const crypto = require("crypto")
exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Cource.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            //console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    
    const options = {
        amount: totalAmount * 100,
        currency : "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        return res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        //console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }
}

exports.verifyPayment = async(req, res)=> {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");


        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrolledStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});
}


const enrolledStudents = async(courses, userId, res)=>{
    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Cource.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            courseId : courseId,
            userId : userId,
            completedVideos : []
         })

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                cources: courseId,
                courceProgress : courseProgress._id
            }},{new:true});

       

            
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courceName}`,
            courseEnrollmentEmail(enrolledCourse.courceName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    
}


exports.sendEmailPaymentSuccess = async(req, res)=>{
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}

//One import of mail format

// exports.capturepayment = async (req, res) => {
//     //get courseId and UserId
//     const {course_id} = req.body;
//     const userId = req.user.id
//     //Validations
//     //Valid courseId
//     if(!course_id){
//         return res.status(400).json({
//             success : false,
//             message : "Please provide valid courseid"
//         })
//     };

//     //Valid courseDetails
//     let cource;
//     try{
//         cource = await Cource.findById(course_id);
//         if(!cource){
//             return res.status(404).json({
//                 success : false,
//                 message : "Course do not exist"
//             })
//         }

//         //User already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(cource.studentsEnrolled.includes(uid)){
//             return res.status(404).json({
//                 success : false,
//                 message : "Student is already enrolled"
//             })
//         }
//     }catch(error){
//         console.error(error);
//         return res.status(500).json({
//             success : false,
//             message : error.message
//         })

//     }

//     //order create
//     const price = cource.price;
//     const currency = "INR";

//     const options = {
//         amount : price * 100,
//         currency,
//         reciept : Math.random(Date.now()).toString(),
//         notes : {
//             courceId : course_id,
//             userId
//         }
    
//     }

     
//     try{
//         const paymentResponce = await instance.orders.create(options);
//         console.log(error);

//         //return responce
//         return res.status(400).json({
//             success : true,
//             message : "Order creared successfully",
//             cource : cource.courceName,
//             courceDescription : cource.description,
//             thumbnail : cource.thumbNail,
//             orderId : paymentResponce.orderId,
//             currency : paymentResponce.currency,
//             amount : paymentResponce.amount
//         })
//     }
//     catch(error){
//         console.error(error);
//         return res.status(500).json({
//             success : false,
//             message : "Could not create order",
//             error : error.message
//         })
//     }

// }

// exports.varifySecretKey = async (req, res) => {
//     const webHookSecret = "12345668";

//     const signature = req.headers("x-razorpay-signature");

//     const shasum = crypto.createHmac("sha256", webHookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(shasum === digest){
//         connsole.log("Payment is authorized");

//         const {courceId, userId} = req.body.payload.payment.entity.notes;

//         try{
//             const courceUpdate = await Cource.findOneAndUpdate({_id : courceId},
//                                                                 {
//                                                                     $push : {
//                                                                         studentsEnrolled : userId
//                                                                     }
//                                                                 },
//                                                                 {new : true});
//             if(!courceUpdate){
//                 return res.status(500).json({
//                     success : false,
//                     message : "Cource not found"
//                 })
//             }

//             const enrollStudent = await User.findOneAndUpdate({_id : userId},
//                                                             {
//                                                                 $push : {
//                                                                     cources : courceId
//                                                                 }
//                                                             },
//                                                             {new : true});
//             if(!enrollStudent){
//                 return res.status(500).json({
//                     success : false,
//                     message : "Student not found"
//                 })
//             }

//             console.log(enrollStudent);

//             const emailResponce = await mailSender(enrollStudent.email,
//                                                 "Congratulations from codehelp",
//                                                 "Concgratulations ypu have successfully enrolled in new Codehelp course")

//             connsole.log(emailResponce);
//             return res.status(200).json({
//                 success : true,
//                 message : "Signature varified and cource added"
//             })

//         }
//         catch(error){
//             console.error(error);
//             return res.status(200).json({
//                 success : false,
//                 message : error.message
//             })

//         }
//     }
//     else{
//         return res.status(500).json({
//             success : false,
//             message : error.message
//         })
//     }
// }