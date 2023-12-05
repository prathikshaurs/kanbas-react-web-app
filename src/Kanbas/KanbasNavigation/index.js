import {BiUserCircle} from "react-icons/bi";
import {RiDashboard3Fill} from "react-icons/ri";
import {FaBook} from "react-icons/fa";
import {BsFillCalendar2WeekFill, BsBoxArrowInRight, BsFillPersonPlusFill} from "react-icons/bs";
import {Link, useLocation} from "react-router-dom";
import "./index.css";

function KanbasNavigation() {
  const links = ["Account", "Dashboard", "Courses", "Calendar", "SignUp", "SignIn"];

  const linkToIconMap = {
    Account: <BiUserCircle className="wd-icon"/>,
    Dashboard: <RiDashboard3Fill className="wd-icon"/>,
    Courses: <FaBook className="wd-icon"/>,
    Calendar: <BsFillCalendar2WeekFill className="wd-icon"/>,
    SignUp: <BsFillPersonPlusFill className="wd-icon"/>,
    SignIn: <BsBoxArrowInRight className="wd-icon"/>,
  };

  const {pathname} = useLocation();
  return (
      <div className="list-group wd-kanbas-navigation" >
        <Link key="northeastern-logo" to={`/Kanbas/Dashboard`} className={'wd-bg-color text-center'}>
          <img src={'../../images/northeastern_logo.png'} alt={'northeastern-logo'} className={'wd-northeastern-logo'}/>
        </Link>
        {links.map((link, index) => (
            <Link
                key={index}
                to={`/Kanbas/${link}`}
                className={`list-group-item wd-bg-color-black ${pathname.includes(
                    link) && "active"}`}
            >
              <div className="d-block text-center">
                {linkToIconMap[link]}
              </div>
              <div className="text-center wd-menu-text">
                {link}
              </div>
            </Link>
        ))}
      </div>
  );
}

export default KanbasNavigation;