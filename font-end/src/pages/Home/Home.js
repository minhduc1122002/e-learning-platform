import { useEffect, useState } from "react";
import CourseList from "../../components/CourseList/CourseList";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { publicRequest } from "../../request";
import "./Home.css"

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
            <div className="home-header">
                <div className="home-header-container">
                    <div className="home-header-intro">
                        <h1>Get really good at programming.</h1>
                        <p>
                            Develop fluency in 57 programming languages with our unique blend of learning, practice and mentoring. Exercism is fun, effective and 100% free, forever.
                        </p>
                        <button className="enroll-button" type="button">
                            Sign up for free
                        </button>  
                    </div>
                    <div className="intro-image">
                        <img alt="Python" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/graphics/landing-page-top-74da2134b88efcf34b05e804987fdfb832771716.svg"/>
                    </div>
                </div>
            </div>
            <CourseList courses={courses}/>
            <Footer/>
        </>
    );
  }
  
  export default Home;