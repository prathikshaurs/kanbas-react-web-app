import ModuleList from "./ModuleList";
import {useLocation} from "react-router-dom";

function Modules() {
  const isModule = !useLocation().pathname.includes("Home");
  return (
      <div>
        {isModule &&
            <div className="fs-3 mb-2">
              Modules
            </div>
        }
          <ModuleList/>
      </div>
  );
}

export default Modules;