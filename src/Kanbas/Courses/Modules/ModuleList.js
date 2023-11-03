import React, {useState} from "react";
import {useParams} from "react-router-dom";
import db from "../../Database";
import {RxDragHandleDots2} from "react-icons/rx";
import {BsFillCheckCircleFill, BsFillPlusSquareFill, BsCheckCircle, BsLink45Deg, BsThreeDotsVertical} 
from "react-icons/bs";
import {AiFillDelete, AiOutlinePlus, AiTwotoneEdit} from "react-icons/ai";
import {GoLinkExternal} from "react-icons/go";

function ModuleList() {
  const {courseId} = useParams();
  const [modules, setModules] = useState(db.modules);
  const [formData, setFormData] = useState({
    sections: [
      {topic: '',headings: [{name: '',objectives: [''],},],},],});
  const [newModule, setNewModule] = useState({
    _id: courseId,
    course: courseId,
    weeks: formData.sections
  });

  const [addToggle, setAddToggle] = useState(false);
  console.log(courseId);
  let module = modules.filter((module) => module.course === courseId)[0];
  console.log(module);
  const weeks = module?.weeks;
  const handleTopicChange = (e) => {
    const updatedFormData = {...formData};
    updatedFormData.sections[0].topic = e.target.value;
    setFormData(updatedFormData);
  };

  const handleHeadingChange = (e, sectionIndex, headingIndex) => {
    const updatedFormData = {...formData};
    updatedFormData.sections[sectionIndex].headings[headingIndex].name =
        e.target.value;
    setFormData(updatedFormData);
  };

  const handleObjectiveChange = (e, sectionIndex, headingIndex,
      objectiveIndex) => {
    const updatedFormData = {...formData};
    updatedFormData.sections[sectionIndex].headings[headingIndex].objectives[
        objectiveIndex
        ] = e.target.value;
    setFormData(updatedFormData);
  };

  const addNewObjective = (sectionIndex, headingIndex) => {
    const updatedFormData = {...formData};
    updatedFormData.sections[sectionIndex].headings[headingIndex].objectives.push(
        ''
    );
    setFormData(updatedFormData);
  };

  const addNewSection = () => {
    const updatedFormData = {...formData};
    updatedFormData.sections.push({
      topic: '',
      headings: [{name: '', objectives: ['']}],
    });
    setFormData(updatedFormData);
  };

  const addNewHeading = (sectionIndex) => {
    const updatedFormData = {...formData};
    updatedFormData.sections[sectionIndex].headings.push({
      name: '',
      objectives: [''],
    });
    setFormData(updatedFormData);
  };

  const handleDeleteHeading = (sectionIndex, headingIndex) => {
    const updatedFormData = {...formData};
    updatedFormData.sections[sectionIndex].headings.splice(headingIndex, 1);
    setFormData(updatedFormData);
  };

  const handleDeleteObjective = (sectionIndex, headingIndex,
      objectiveIndex) => {
    const updatedFormData = {...formData};
    updatedFormData.sections[sectionIndex].headings[headingIndex].objectives.splice(
        objectiveIndex,
        1
    );
    setFormData(updatedFormData);
  };

  const handleSave = () => {
    console.log(formData);
    if (module !== undefined) {
      module.weeks.push(formData.sections[0]);
      console.log(module);
      setModules(modules.map((m) => m._id === module._id ? module : m));
    } else {
      setNewModule(newModule => {
        newModule.weeks = formData.sections;
        return newModule;
      })
      setModules([...modules, newModule]);
    }
    console.log(modules);
    cancel();
  };

  const cancel = () => {
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
    })
    setAddToggle(false);
  }

  const deleteSection = (index) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      console.log(module.weeks[index]);
      module.weeks.splice(index, 1);
      setModules(modules.map((m) => m._id === module._id ? module : m));
    }
  }

  const editSection = (index) => {
    console.log(module.weeks[index].topic);
    setFormData({
      sections: [
        {
          topic: module.weeks[index].topic,
          headings: module.weeks[index].headings,
        },
      ],
    })
    setAddToggle(true);
  }

  return (
      <>
        <div className="row mb-4">
          <div className="col pe-0">
            <div className="float-end g-2">
              {module !== undefined && <>
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
                {formData.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <input className={'form-control w-50 my-2'} type="text"
                             value={section.topic}
                             placeholder="Topic"
                             onChange={handleTopicChange}/>
                      <hr className={'w-50'}/>
                      {section.headings.map((heading, headingIndex) => (
                          <div key={headingIndex}>
                            <input
                                value={heading.name}
                                onChange={(e) => handleHeadingChange(e,
                                    sectionIndex, headingIndex)}
                                className={'form-control w-50 mb-2 d-inline-block me-2'}
                                placeholder="Heading name"/>
                            {headingIndex + 1 === section.headings.length &&
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
                                          onChange={(e) => handleObjectiveChange(
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
                                                  sectionIndex, headingIndex,
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
                    <button className="btn btn-success rounded-1 mx-2"
                            onClick={handleSave}>Save
                    </button>
                    <button className="btn btn-danger rounded-1 mx-2"
                            onClick={cancel}>Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
        }
        {module === undefined &&
            <div className="row">
              <div className="col">
                <h1>No modules found</h1>
              </div>
            </div>
        }
        {module !== undefined && weeks.map(
            (week, index) => (
                <ul className="list-group rounded-1 pe-0 mb-4">
                  <li key={index}
                      className="list-group-item list-group-item-secondary px-2">
                    <RxDragHandleDots2/>
                    <span className="ps-2">{week.topic}</span>
                    <div className="float-end">
                      <AiTwotoneEdit title={'Edit Module'}
                                     onClick={() => editSection(index)}
                                     className={'wd-cursor-pointer me-3'}/>
                      <AiFillDelete title={'Delete Module'}
                                    onClick={() => deleteSection(index)}
                                    className={'wd-cursor-pointer wd-color-red me-3'}/>
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
                            <li className="list-group-item px-2" key={index}>
                              <RxDragHandleDots2/>
                              {heading.name === "SLIDES" &&
                                  <BsLink45Deg className="wd-color-green ms-2"/>
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