import { useEffect, useState } from "react";
import React from 'react'
import './LectureList.css'
function LectureList( {lectures} ) {
    return (
        <div className="lecture-list">
            {lectures?.map((lecture, index) => (
                <div className="lecture-box">
                    <div className="lecture-index">{index}</div>
                    <div className="lecture-overview">
                        <h2>{lecture.title}</h2>
                        <p>{lecture.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LectureList