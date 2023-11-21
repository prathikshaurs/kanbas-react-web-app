import {Link} from "react-router-dom";
import "./index.css"
import {BsThreeDotsVertical} from "react-icons/bs";
import {IoNewspaperOutline} from "react-icons/io5";
import {AiFillEdit} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";

function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}) {
  return (
      <>
        <div className={'d-none d-md-block'}>
          <div className={'fs-1'}>Dashboard</div>
          <hr/>
        </div>
        <h2>Published Courses ({courses.length})</h2>
        <input value={course.name} className="form-control w-25"
               onChange={(e) => setCourse(
                   {...course, name: e.target.value})}/>
        <input value={course._id} className="form-control w-25 mt-2"
               onChange={(e) => setCourse(
                   {...course, _id: e.target.value})}/>
        {/* <input value={course.number} className="form-control w-25 mt-2"
               onChange={(e) => setCourse(
                   {...course, number: e.target.value})}/> */}
        <input value={course.startDate} className="form-control w-25 mt-2"
               type="date"
               onChange={(e) => setCourse(
                   {...course, startDate: e.target.value})}/>
        <input value={course.endDate} className="form-control w-25 mt-2"
               type="date"
               onChange={(e) => setCourse(
                   {...course, endDate: e.target.value})}/>
        {/* <input value={course.term} className="form-control w-25 mt-2"
               onChange={(e) => setCourse(
                   {...course, term: e.target.value})}/> */}
        <button className="btn btn-success me-3 mt-2" onClick={addNewCourse}>Add
        </button>
        <button className="btn btn-primary mt-2" onClick={updateCourse}>Update
        </button>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {courses.map((course, index) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3 pt-4"
                   key={course._id}>
                <div className="card wd-card-style">
                  <div className="wd-card-length wd-bg-color">
                    <BsThreeDotsVertical className="wd-color-col float-end"/>
                  </div>
                  <div className="card-body">
                    <Link
                        key={course._id}
                        to={`/Kanbas/Courses/${course._id}`}
                        className="text-decoration-none"
                    >
                      <p className="wd-card-heading-fontsize wd-color wd-card-ellipsis mb-1">{course.name}</p>
                      <p className="wd-card-subheading-fontsize wd-card-subheading-col wd-card-ellipsis mb-1">
                        {course._id}</p>
                      <p className="wd-card-small-fontsize wd-card-subheading-col wd-card-ellipsis">
                        {course.term}</p>
                    </Link>
                    <IoNewspaperOutline/>
                    <AiFillEdit className={'wd-cursor-pointer mx-2'}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCourse(course)
                                }}/>
                    <MdDeleteForever
                        className={'wd-cursor-pointer wd-color-red'}
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCourse(course._id)
                        }}/>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </>
  );
}

export default Dashboard;