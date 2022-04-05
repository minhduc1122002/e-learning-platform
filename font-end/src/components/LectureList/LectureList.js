import { useEffect, useState } from "react";
import React from 'react'
import './LectureList.css'
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
                            <h2>{lecture.title}</h2>
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
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LectureList