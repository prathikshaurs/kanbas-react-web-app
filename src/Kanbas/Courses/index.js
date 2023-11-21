import {Navigate, Route, Routes, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./index.css";
import CourseHeader from "./CourseHeader";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import Grades from "./Grades";
import CourseNavigation from "./CourseNavigation";
import axios from "axios";

function Courses() {
  const {courseId} = useParams();
  const URL = "http://localhost:4000/api/courses";
  const [course, setCourse] = useState([]);

  const findCourseById = async (courseId) => {
    const response = await axios.get(`${URL}/${courseId}`);
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  return (
      <>
        <CourseHeader course={course}/>
        <div className="row mt-4 px-3 px-md-0">
          <div className="col-md-2 d-none d-md-block">
            <div className="row">
              <div className="col">
                <p className="wd-course-id">{course.term}</p>
              </div>
            </div>
            <CourseNavigation/>
          </div>
          <div className="col col-md-10">
            <Routes>
              <Route path="/" element={<Navigate to="Home"/>}/>
              <Route path="Home" element={<Home/>}/>
              <Route path="Modules" element={<Modules/>}/>
              <Route path="Assignments" element={<Assignments/>}/>
              <Route path="Grades" element={<Grades/>}/>
              {/* <Route path="AddAssignment" element={<AddEditAssignment/>}/> */}
              {/* <Route path="EditAssignment/:assignmentId" element={<AddEditAssignment/>}/> */}
            </Routes>
          </div>
        </div>
      </>
  );
}
export default Courses;