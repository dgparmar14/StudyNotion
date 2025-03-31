// import React, { useState } from 'react'
// import { Chart, registerables } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

// Chart.register(...registerables);

// function InstructorStates({courses}) {

//   const [currChart, setCurrentChart] = useState("students");

//   const generateColors = (nuOfColors)=>{
//     let colors=[];
//     for(let i=0; i<nuOfColors; i++){
//       const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() *256)})`;
//       colors.push(color);
//     }
//     return colors;
//   }

//   const chartDataForStudents = {
//     labels : courses.map((course)=>course.courseName),
//     dataSets: [
//       {
//         data : courses.map((course)=>course.totalStudentsEnrolled),
//         backgroundColor : generateColors(courses.length)
//       }

//     ]

//   }
//   const chartDesignForAmount = {
//     labels : courses.map((course)=>course.courseName),
//     dataSets : [
//       {
//         data : courses.map((course) => course.totalAmountGenerated),
//         backgroundColor : generateColors(courses.length)
//       }
//     ]
//   }
//   const options = {

//   }
//   return (
//     <div>
//       <div>
//         Visualise
//       </div>
//       <div>
//         <button onClick={() =>  setCurrentChart("students")}>Students</button>
//         <button onClick={()=> setCurrentChart("Amount")}>Amount</button>
//       </div>
//       <div>
//         <Pie data={currChart==="students" ? chartDataForStudents : chartDesignForAmount} options={options}></Pie>
//       </div>
//     </div>
//   )
// }

// export default InstructorStates

import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorStates({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students");

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    // labels: [
    //   "Web Development", "Data Science", "Machine Learning", "Cybersecurity", "Blockchain",
    //   "Artificial Intelligence", "Cloud Computing", "Full Stack Development", "UI/UX Design", "Game Development",
    //   "iOS Development", "Android Development", "Big Data", "DevOps", "Software Engineering",
    //   "Networking", "Ethical Hacking", "Data Analytics", "IoT", "Embedded Systems",
    //   "Digital Marketing", "SEO", "Graphic Design", "Database Management", "Data Visualization",
    //   "Python Development", "Java Development", "C++ Programming", "React Development", "Angular Development",
    //   "Node.js", "Spring Boot", "Machine Learning with Python", "Deep Learning", "Natural Language Processing",
    //   "Computer Vision", "AWS", "Google Cloud", "Microsoft Azure", "Cyber Threat Intelligence",
    //   "Robotics", "Automation", "AR/VR", "Business Intelligence", "Data Warehousing",
    //   "Cloud Security", "Software Testing", "Technical Writing", "Product Management", "Internship"
    // ],
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
    
  };
  console.log(chartDataStudents);

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="flex flex-col items-center w-[full]">
        {/* Large Pie Chart Container */}
        <div className="w-[80%] h-[375px] flex flex-wrap align-items-center justify-content-between">
          <Pie
            data={
              currChart === "students" ? chartDataStudents : chartIncomeData
            }
            options={{
              ...options,
              responsive: true, // Makes it adapt to screen size
              plugins: {
                legend: {
                  display: true,
                  position: "left", 
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
