import { useEffect, useState } from "react";
import CourseList from "../components/CourseList/CourseList";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import { publicRequest } from "../request";

function Home() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await publicRequest.get("/courses")
                setCourses(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getCourses()
    }, [])
    return (
        <>
            <Navigation/>
            <CourseList courses={courses}/>
            <Footer/>
        </>
    );
  }
  
  export default Home;