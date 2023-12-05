//import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import db from "./Database";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Signin from "./users/Signin";
import Account from "./users/Account";
import UserTable from "./users/Table";
import Signup from "./users/Signup";

function Kanbas() {
  const [courses, setCourses] = useState(db.courses);
  const URL = "http://localhost:4000/api/courses";
  const findAllCourses = async () => {
    const response = await axios.get(URL);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);
  const [course, setCourse] = useState({objId: courses.length + 1,
    name: "Course Name", _id: "Course Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  });
  const addNewCourse = () => {
    setCourses([...courses, course]);
  };
  const deleteCourse = async(id) => {
    const response = await axios.delete(
      `${URL}/${course._id}`
    );
    if (window.confirm("Do you want to DELETE this Course?")) {
      setCourses(courses.filter((course) => course._id !== id));
      }
  };
  const updateCourse = async() => {
    const response = await axios.put(
      `${URL}/${course._id}`,
      course
    );
    if (window.confirm("Do you want to UPDATE this Course?")) {
    setCourses(
      response.data,
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
    <Provider store={store}>
    <div className="d-flex">
      <KanbasNavigation />
      <div className="" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/admin/users" element={<UserTable />} />
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
    </Provider>
  );
}
export default Kanbas;