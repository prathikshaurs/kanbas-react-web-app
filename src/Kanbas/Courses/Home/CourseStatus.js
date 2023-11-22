import {FaBan, FaBullhorn, FaFileImport} from "react-icons/fa";
import { BsCheckCircle, BsFillBarChartFill} from "react-icons/bs";
import "./index.css";
import {FiTarget} from "react-icons/fi";
import {IoIosNotifications} from "react-icons/io";
import {GoDotFill} from "react-icons/go";
import {FaCalendarDays} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";

function CourseStatus() {
  return (
      <>
        <div className="row">
          <div className="col">
            <p className="mb-2">Course Status</p>
          </div>
        </div>
        <div className="row">
          <div className="col pe-0">
            <button className="btn btn-light w-100 rounded-1">
              <FaBan className="me-2"/>
              Unpublish
            </button>
          </div>
          <div className="col ps-0">
            <button className="btn wd-bg-color-light-green w-100 rounded-1">
              <BsCheckCircle className="wd-color-green align-self-center me-2"/>
              Published
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-light w-100 mt-3 rounded-1 text-start">
              <FaFileImport className="me-1"/>
              Import Existing Content
            </button>
            <button className="btn btn-light w-100 mt-1 rounded-1 text-start">
              <FaFileImport className="me-1"/>
              Import from Commons
            </button>
            <button className="btn btn-light w-100 mt-1 rounded-1 text-start">
              <FiTarget className="me-1"/>
              Choose from Home Page
            </button>
            <button className="btn btn-light w-100 mt-1 rounded-1 text-start">
              <BsFillBarChartFill className="me-1"/>
              View Course Stream
            </button>
            <button className="btn btn-light w-100 mt-1 rounded-1 text-start">
              <FaBullhorn className="ms-1"/>
              New Announcement
            </button>
            <button className="btn btn-light w-100 mt-1 rounded-1 text-start">
              <BsFillBarChartFill className="me-1"/>
              New Analytics
            </button>
            <button className="btn btn-light w-100 mt-1 rounded-1 text-start">
              <IoIosNotifications className="me-1"/>
              View Course Notifications
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <p className="mb-1">To Do</p>
            <div className="wd-horiz-line"></div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-10">
            <a href="#" className="align-self-center justify-content-center">Grade
              A2 </a>
            <p className="wd-todo-subtext">100 points <GoDotFill/> Oct 2</p>
          </div>
          <div className="col-10">
            <a href="#" className="align-self-center justify-content-center">Grade
              A3 </a>
            <p className="wd-todo-subtext">100 points <GoDotFill/> Oct 10</p>
          </div>
          <div className="col-1">
            <div className="float-end"><RxCross2/>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <div className="float-start">Coming Up</div>
          </div>
          <div className="col-6">
            <div className="float-end">
              <FaCalendarDays className="fs-sm me-2 mb-2"/>
              <a href="#" className="float-end" style={{fontSize: 12}}>
                View Calendar
              </a>
            </div>
          </div>
          <div className="col mt-1">
            <div className="wd-horiz-line"></div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-1">
            <FaCalendarDays className="fs-sm me-2 mb-2" style={{marginTop: 6}}/>
          </div>
          <div className="col-11">
            <a href="#">Lecture</a>
            <p className="wd-todo-subtext mb-0">CS5610</p>
            <p className="wd-todo-subtext">Oct 15</p>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-1">
            <FaCalendarDays className="fs-sm me-2 mb-2" style={{marginTop: 6}}/>
          </div>
          <div className="col-11">
            <a href="#">Lecture</a>
            <p className="wd-todo-subtext mb-0">CS6200</p>
            <p className="wd-todo-subtext">Oct 16</p>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-1">
            <FaCalendarDays className="fs-sm me-2 mb-2" style={{marginTop: 6}}/>
          </div>
          <div className="col-11">
            <a href="#">Lecture</a>
            <p className="wd-todo-subtext mb-0">CS5610</p>
            <p className="wd-todo-subtext">Oct 19</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a href="#" className="fs-6">next week....</a>
          </div>
        </div>
      </>
  );
}

export default CourseStatus;