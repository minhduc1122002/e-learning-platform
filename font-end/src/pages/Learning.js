import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../request";
import { Link } from 'react-router-dom'
import Content from "../components/LectureList/LectureList";

function Learning() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const lecture_id = location.pathname.split("/")[3];
    const [lectures, setLectures] = useState([])
    useEffect(() => {
        const getLectures = async () => {
            try {
                const res = await publicRequest.get(`/courses/lectures/${id}`)
                console.log(res.data)
                setLectures(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getLectures()
    }, [id])

    return (
      <div className="learn">
          <div className="learn-navigation">
            {lectures.map(lecture => (
                <>
                    <Link to={`/learn/${id}/${lecture._id}`}>{lecture.title}</Link><br/>
                </>
            ))}
          </div>
          {lecture_id && <Content id={lecture_id}/>} 
      </div>
    );
  }
  
  export default Learning;