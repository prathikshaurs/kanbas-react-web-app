import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// import db from "../../Database";
import {RxDragHandleDots2} from "react-icons/rx";
import {BsFillCheckCircleFill, BsFillPlusSquareFill, BsCheckCircle, BsLink45Deg, BsThreeDotsVertical} 
from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {AiFillDelete, AiOutlinePlus, AiTwotoneEdit} from "react-icons/ai";
import {GoLinkExternal} from "react-icons/go";
import { findModulesForCourse, createModule, addWeekToModule, deleteModuleFromDB, updateModule } from "./client";
import {addModule,  addNewHeadingField, addNewObjectiveField, addNewWeek, deleteHeadingField, deleteModule, 
  deleteObjectiveField, setFormData, setHeading, setIDs, setModules, setObjective, setTopic, updateModuleState} 
  from "./modulesReducer";
// import * as client from "./client";

function ModuleList() {
  const {courseId} = useParams();

  const [addToggle, setAddToggle] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('in module')
    findModulesForCourse(courseId).then(modules => {
      dispatch(setModules(modules));
    });
  }, [courseId]);

  const modules = useSelector((state) => state.modulesReducer.modules);
  const formData = useSelector((state) => state.modulesReducer.formData);
  let newModule = useSelector((state) => state.modulesReducer.newModule);

  dispatch(setIDs(courseId));

  let module = modules.filter((module) => module.course === courseId)[0];
  const weeks = module?.weeks;

  const handleTopicChange = (e) => {
    dispatch(setTopic(e.target.value));
  };

  const handleHeadingChange = (e, sectionIndex, headingIndex) => {
    dispatch(setHeading({
      sectionIndex: sectionIndex,
      headingIndex: headingIndex,
      value: e.target.value
    }))
  };

  const handleObjectiveChange = (e, sectionIndex, headingIndex,
      objectiveIndex) => {
    dispatch(setObjective({
      sectionIndex: sectionIndex,
      headingIndex: headingIndex,
      objectiveIndex: objectiveIndex,
      value: e.target.value
    }));
  };

  const addNewObjective = (sectionIndex, headingIndex) => {
    dispatch(addNewObjectiveField(
    {sectionIndex: sectionIndex, headingIndex: headingIndex}));
  };

  const addNewHeading = (sectionIndex) => {
    dispatch(addNewHeadingField({sectionIndex: sectionIndex}));
  };

  const handleDeleteHeading = (sectionIndex, headingIndex) => {
    dispatch(deleteHeadingField(
        {sectionIndex: sectionIndex, headingIndex: headingIndex}));
  };

  const handleDeleteObjective = (sectionIndex, headingIndex,
      objectiveIndex) => {
    dispatch(deleteObjectiveField({
      sectionIndex: sectionIndex,
      headingIndex: headingIndex,
      objectiveIndex: objectiveIndex
    }));
  };

  const handleSave = () => {
    if (module !== undefined) {
      addWeekToModule(courseId, formData.sections[0]).then((addedWeek) => {
        dispatch(addNewWeek({courseId: courseId, week: addedWeek}));
      });
    } else {
      newModule = {
        ...newModule,
        weeks: formData.sections,
      }
      createModule(courseId, newModule).then((addedModule) => {
        dispatch(addModule(addedModule));
      });
    }
    cancel();
  };

  const handleUpdate = () => {
    const updatedWeek = formData.sections[0];
    module = {
      ...module,
      weeks: module.weeks.map((week, index) => {
        if (index === editIndex) {
          return updatedWeek;
        }
        return week;
      })
    }
    updateModule(module._id, editIndex, updatedWeek).then((newWeek) => {
      dispatch(updateModuleState(
          {moduleId: module._id, index: editIndex, week: newWeek}));
    });
    if (editIndex !== -1) {
      setEditIndex(-1);
    }
    cancel();
  }

  const cancel = () => {
    dispatch(
        setFormData({
          sections: [
            {
              topic: '',
              headings: [
                {
                  name: '',
                  objectives: [''],
                },
              ],
            },
          ],
        }));
    setAddToggle(false);
  }

  const deleteSection = (index) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      deleteModuleFromDB(module._id, index).then((status) => {
        dispatch(deleteModule({moduleId: module._id, index: index}));
      });
    }
  }

  const editSection = (index) => {
    setAddToggle(true);
    setEditIndex(index);
    dispatch(
        setFormData({
          sections: [
            {
              topic: module.weeks[index].topic,
              headings: module.weeks[index].headings,
            },
          ],
        }));
  }

  return (
      <>
        <div className="row mb-4">
          <div className="col pe-0">
            <div className="float-end g-2">
              {(module !== undefined && weeks.length !== 0) && <>
                <button className="btn btn-light rounded-1 me-2">Collapse All
                </button>
                <button className="btn btn-light rounded-1 me-2">View Progress
                </button>
                <div className="dropdown wd-publish-dropdown me-2">
                  <button className="btn btn-light rounded-1 dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                    <BsCheckCircle
                        className="wd-color-green align-self-center"/>
                    <div className="ms-1 d-inline-block">Publish All</div>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Publish none</a>
                    </li>
                    <li><a className="dropdown-item" href="#">Publish some</a>
                    </li>
                  </ul>
                </div>
              </>}
              <button className="btn btn-danger rounded-1 mx-2"
                      onClick={() => setAddToggle(true)}>
                <AiOutlinePlus></AiOutlinePlus>
                Module
              </button>
              <button className="btn btn-light rounded-1 h-100">
                <BsThreeDotsVertical/>
              </button>
            </div>
          </div>
          <div className="wd-horiz-line mt-2"></div>
        </div>
        {addToggle &&
            <div className="row mb-4">
              <div className={'col'}>
                <p>Add Module</p>
                {formData.sections.map(
                    (section, sectionIndex) => (
                        <div key={sectionIndex}>
                          <input className={'form-control w-50 my-2'}
                                 type="text"
                                 value={section.topic}
                                 placeholder="Topic"
                                 onChange={(e) => handleTopicChange(e)}/>
                          <hr className={'w-50'}/>
                          {section.headings.map((heading, headingIndex) => (
                              <div key={headingIndex}>
                                <input
                                    value={heading.name}
                                    onChange={(e) =>
                                        handleHeadingChange(e, sectionIndex,
                                            headingIndex)}
                                    className={'form-control w-50 mb-2 d-inline-block me-2'}
                                    placeholder="Heading name"/>
                                {headingIndex + 1 === section.headings.length
                                    &&
                                    <BsFillPlusSquareFill
                                        className={'me-2 wd-cursor-pointer'}
                                        onClick={() => addNewHeading(
                                            sectionIndex)}></BsFillPlusSquareFill>}
                                {headingIndex !== 0 &&
                                    <AiFillDelete
                                        className={'wd-cursor-pointer wd-color-red'}
                                        onClick={() => handleDeleteHeading(
                                            sectionIndex, headingIndex)}/>}
                                {heading.objectives.map(
                                    (objective, objectiveIndex) => (
                                        <div key={objectiveIndex}>
                                          <input
                                              onChange={(e) =>
                                                  handleObjectiveChange(
                                                      e,
                                                      sectionIndex,
                                                      headingIndex,
                                                      objectiveIndex
                                                  )}
                                              value={objective}
                                              className={'form-control w-50 mb-2 d-inline-block me-2'}
                                              placeholder="Objective"/>
                                          {objectiveIndex + 1
                                              === heading.objectives.length
                                              &&
                                              <BsFillPlusSquareFill
                                                  className={'me-2 wd-cursor-pointer'}
                                                  onClick={() => addNewObjective(
                                                      sectionIndex,
                                                      headingIndex)}></BsFillPlusSquareFill>}
                                          {objectiveIndex !== 0 &&
                                              <AiFillDelete
                                                  className={'wd-cursor-pointer wd-color-red'}
                                                  onClick={() => handleDeleteObjective(
                                                      sectionIndex,
                                                      headingIndex,
                                                      objectiveIndex)}/>}
                                        </div>
                                    ))}
                                <hr className={'w-50'}/>
                              </div>
                          ))}
                        </div>
                    ))}
                <div className={'row'}>
                  <div className={'col'}>
                    {editIndex === -1 && <button
                        className="btn btn-success rounded-1 mx-2"
                        onClick={() => handleSave()}>Save
                    </button>}
                    {editIndex !== -1 && <button
                        className="btn btn-success rounded-1 mx-2"
                        onClick={() => handleUpdate()}>Update
                    </button>}
                    <button className="btn btn-danger rounded-1 mx-2"
                            onClick={() => cancel()}>Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
        }
        {(!weeks || weeks.length === 0) &&
            <div className="row">
              <div className="col">
                <h1>No modules found</h1>
              </div>
            </div>
        }
        {module !== undefined && module.weeks !== [] && weeks.map(
            (week, moduleIndex) => (
                <ul className="list-group rounded-1 pe-0 mb-4"
                    key={moduleIndex}>
                  <li key={moduleIndex}
                      className="list-group-item list-group-item-secondary px-2">
                    <RxDragHandleDots2/>
                    <span className="ps-2">{week.topic}</span>
                    <div className="float-end">
                      <AiTwotoneEdit title={'Edit Module'}
                                     onClick={() => editSection(moduleIndex)}
                                     className={'wd-cursor-pointer me-3'}/>
                      <AiFillDelete title={'Delete Module'}
                                    onClick={() => deleteSection(moduleIndex)}
                                    className={'wd-cursor-pointer wd-color-red me-3'}/>
                      <BsFillCheckCircleFill className="wd-color-green me-3"/>
                      <AiOutlinePlus className="me-3"/>
                      <BsThreeDotsVertical/>
                    </div>
                  </li>
                  {week.headings.map((heading, headingIndex) => (
                      <ul className="ps-0 border-top-0" key={headingIndex}>
                        <li key={headingIndex}
                            className="list-group-item px-2">
                          <RxDragHandleDots2/>
                          <span className="ps-2">{heading.name}</span>
                          <div className="float-end">
                            <BsFillCheckCircleFill
                                className="wd-color-green me-3"/>
                            <BsThreeDotsVertical/>
                          </div>
                        </li>
                        {heading.objectives.map((title, objIndex) => (
                            <li className="list-group-item px-2"
                                key={objIndex}>
                              <RxDragHandleDots2/>
                              {heading.name === "SLIDES" &&
                                  <BsLink45Deg
                                      className="wd-color-green ms-2"/>
                              }
                              <span className={`${heading.name === "SLIDES"
                              && "ms-4"} ${heading.name !== "SLIDES"
                              && "ps-5"}`}>{title}</span>
                              {heading.name === "SLIDES" &&
                                  <GoLinkExternal
                                      className="ms-2 wd-color-red"/>
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