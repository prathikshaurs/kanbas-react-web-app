import React from "react";
import {useParams} from "react-router-dom";
import db from "../../Database";
import {RxDragHandleDots2} from "react-icons/rx";
import {
  BsFillCheckCircleFill,
  BsLink45Deg,
  BsThreeDotsVertical
} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai";
import {GoLinkExternal} from "react-icons/go";

function ModuleList() {
  const {courseId} = useParams();
  const modules = db.modules;
  const weeks = modules.filter((module) => module.course === courseId)[0].weeks;

  return (
      <>
        {weeks.map(
            (week, index) => (
                <ul className="list-group rounded-1 pe-0 mb-4">
                  <li key={index}
                      className="list-group-item list-group-item-secondary px-2">
                    <RxDragHandleDots2/>
                    <span className="ps-2">{week.topic}</span>
                    <div className="float-end">
                      <BsFillCheckCircleFill className="wd-color-green me-3"/>
                      <AiOutlinePlus className="me-3"/>
                      <BsThreeDotsVertical/>
                    </div>
                  </li>
                  {week.headings.map((heading, index) => (
                      <ul className="ps-0 border-top-0">
                        <li key={index} className="list-group-item px-2">
                          <RxDragHandleDots2/>
                          <span className="ps-2">{heading.name}</span>
                          <div className="float-end">
                            <BsFillCheckCircleFill
                                className="wd-color-green me-3"/>
                            <BsThreeDotsVertical/>
                          </div>
                        </li>
                        {heading.objectives.map((title, index) => (
                            <li className="list-group-item px-2">
                              <RxDragHandleDots2/>
                              {heading.name === "SLIDES" &&
                                  <BsLink45Deg className="wd-color-green ms-2"/>
                              }
                              <span className={`${heading.name === "SLIDES"
                              && "ms-4"} ${heading.name !== "SLIDES"
                              && "ps-5"}`}>{title}</span>
                              {heading.name === "SLIDES" &&
                                  <GoLinkExternal className="ms-2 wd-color-red"/>
                              }
                              <div className="float-end">
                                <BsFillCheckCircleFill
                                    className="wd-color-green me-3"/>
                                <BsThreeDotsVertical/>
                              </div>
                            </li>
                        ))}
                      </ul>
                  ))}
                </ul>
            ))}
      </>
  );
}

export default ModuleList;