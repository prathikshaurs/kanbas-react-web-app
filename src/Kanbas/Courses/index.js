import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams
} from "react-router-dom";
import "./index.css";
import CourseHeader from "./CourseHeader";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import Grades from "./Grades";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import CourseNavigation from "./CourseNavigation";

function Courses({courses}) {
  const {courseId} = useParams();
  const url = useLocation();
  console.log(courses);
  console.log(courseId);
  const course = courses.find((course) => course._id === courseId);
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
              <Route
                  path="Assignments/:assignmentId"
                  element={<AssignmentEditor/>}
              />
              <Route path="Grades" element={<Grades/>}/>
            </Routes>
          </div>
        </div>
      </>
  );

}

export default Courses;