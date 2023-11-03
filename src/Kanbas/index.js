//import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import db from "./Database";
import { useState } from "react";
// import store from "./store";
// import { Provider } from "react-redux";

function Kanbas() {
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({objId: courses.length + 1,
    name: "Course Name", _id: "Course Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  });
  const addNewCourse = () => {
    setCourses([...courses, course]);
  };
  const deleteCourse = (id) => {
    if (window.confirm("Do you want to DELETE this Course?")) {
      setCourses(courses.filter((course) => course._id !== id));
      }
  };
  const updateCourse = () => {
    if (window.confirm("Do you want to UPDATE this Course?")) {
    setCourses(
      courses.map((c) => {
        if (c.objId === course.objId) {
          return course;
        } else {
          return c;
        }
      })
    );
    }
  }
  return (
    <div className="d-flex">
      <KanbasNavigation />
      <div className="" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<h1>Account</h1>} />
          <Route path="Dashboard" element={<Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/>} />
          <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
        </Routes>
      </div>
    </div>
  );
}
export default Kanbas;