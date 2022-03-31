import React from 'react'
import "./Enroll.css"

function Enroll( {course} ) {
  return (
    <div className="enroll-container">
        <div className="enroll-intro">
            <h1>Want to learn and master {course.title}?</h1>
            <p>
                Join Exercism’s {course.title} Track for access to {" "}
                <em className="c-underline">
                    <strong>131 exercises</strong>
                </em>
                {" "}grouped into 14 {course.title} Concepts, all{" "}
                <em className="c-underline">
                    <strong>100% free.</strong>
                </em>
            </p>
            <button className="enroll-button" type="button">
                Join the {course.title} Track
            </button>  
        </div>
        <div className="icon-graphics">
            <img alt="Python" src={course.image}/>
        </div>
    </div>
  )
}

export default Enroll