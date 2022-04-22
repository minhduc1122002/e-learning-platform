import { useState } from "react";
import React from 'react';
import './LectureList.css';
import EditLecture from "../ModificationLecture/EditLecture/EditLecture";
import DeleteLecture from "../ModificationLecture/DeleteLecture/DeleteLecture";
import AddLesson from "../ModificationLesson/AddLesson/AddLesson";
import EditLesson from "../ModificationLesson/EditLesson/EditLesson";
import DeleteLesson from "../ModificationLesson/DeleteLesson/DeleteLesson";
import AddLecture from "../ModificationLecture/AddLecture/AddLecture";

function LectureList( {lectures} ) {
    const [checkedState, setCheckedState] = useState(
        new Array(lectures.length).fill(false)
    )
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState)
    }
    
    return (
        <div className="lecture-list">
            {lectures.map((lecture, index) => (
                <div className="lecture-item" key={`lecture-${index + 1}`}>
                    <div className="lecture-box">
                        <div className="lecture-index">{index + 1}</div>
                        <div className="lecture-overview">
                        <div className="lecture-modify">
                            <h2>{lecture.title}</h2> 
                            <AddLesson />
                            <EditLecture />
                            <DeleteLecture />
                        </div>
                            <p>{lecture.description}</p>
                        </div>
                        <div className="lecture-view">
                            <button type="button" className="view-button" onClick={() => handleOnChange(index)}>
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className={checkedState[index] ? "lesson-list-show" : "lesson-list-hidden"} key={`lecture-lessons-${index + 1}`}>
                        {lecture.lessons.map((lesson, i) => (
                            <div className="lesson-box" key={`lesson-${i + 1}`}>
                                <p>{i + 1}. {lesson.title}</p>
                                <div className="lesson-modify">
                                    <EditLesson />
                                    <DeleteLesson />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <AddLecture />
        </div>
    )
}

export default LectureList