import Modules from "../Modules";
import "./index.css"
// import {BsCheckCircle, BsThreeDotsVertical} from "react-icons/bs";
// import {AiOutlinePlus} from "react-icons/ai";
import CourseStatus from "./CourseStatus";

function Home() {
  return (
      <div className="row">
        <div className="col col-xl-7 col-xxl-8">
          {/* <div className="row">
            <div className="col pe-0">
              <div className="float-end g-2">
                <button className="btn btn-light rounded-1 me-2">Collapse All
                </button>
                <button className="btn btn-light rounded-1 me-2">View Progress
                </button>
                <div className="dropdown wd-publish-dropdown me-2">
                  <button className="btn btn-light rounded-1 dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                    <BsCheckCircle className="wd-color-green align-self-center"/>
                    <div className="ms-1 d-inline-block">Publish All</div>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Publish none</a>
                    </li>
                    <li><a className="dropdown-item" href="#">Publish some</a>
                    </li>
                  </ul>
                </div>
                <button className="btn btn-danger rounded-1 mx-2">
                  <AiOutlinePlus></AiOutlinePlus>
                  Module
                </button>
                <button className="btn btn-light rounded-1 h-100">
                  <BsThreeDotsVertical/>
                </button>
              </div>
            </div>
            <div className="wd-horiz-line mt-2"></div>
          </div> */}
          <div className={'row mt-4'}>
            <Modules/>
          </div>
        </div>
        <div className="d-none d-xl-block col-xl-5 col-xxl-4 px-5">
          <CourseStatus/>
        </div>
      </div>
  );
}

export default Home;