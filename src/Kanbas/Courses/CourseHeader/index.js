import {FaBars} from "react-icons/fa";
import {Link, useLocation} from "react-router-dom";
import "./index.css";

function CourseHeader({course: course}) {
  const path = useLocation().pathname;
  const courseList = [
    "Home",
    "Modules",
    "Assignments",
    "Grades"
  ]
  const assignmentList = [
    "A101",
    "A102",
    "A103",
    "A201",
    "A202",
    "A203",
    "A301",
    "A302",
    "A303",

    "A401",
    "A402",
    "A403",
    "A404",
    "A405",
    "A406",
    "A501",
    "A502",
    "A503",
    "A504",
    "A505",
    "A506",
  ]

  return (
      <>
        <div className="row d-none d-md-block pe-5">
          <div className="col-8">
            <div className="row">
              <div className="col-1 align-self-center">
                <FaBars className="wd-color-red fs-4"/>
              </div>
              <div className="col-11 align-self-center ps-0">
                <nav className="wd-bc-divider" aria-label="breadcrumb">
                  <ol className="breadcrumb fs-4 mb-0">
                    <li className="breadcrumb-item">
                      <Link key={course._id}
                            to={`/Kanbas/Courses/${course._id}`}
                      >{course.name}</Link>
                    </li>
                    {courseList.map((item, index) => (
                        path.includes(item) &&
                        <li key={index} className="breadcrumb-item active"
                            aria-current="page">
                          <Link key={index}
                                to={`/Kanbas/Courses/${course._id}/${item}`}
                          >{item}</Link>
                        </li>
                    ))}
                    {assignmentList.map((item, index) => (
                        path.includes(item) &&
                        <li key={index} className="breadcrumb-item active">
                          {item}
                        </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {/*<div className="col-4 align-self-center pe-0">
            <button className="btn btn-light rounded-1 float-end">
              Student View
            </button>
          </div>*/}
          <hr className="mt-4"/>
        </div>
      </>

  );
}

export default CourseHeader;