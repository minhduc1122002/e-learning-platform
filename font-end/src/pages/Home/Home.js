import { useEffect, useState } from "react";
import CourseList from "../../components/CourseList/CourseList";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { useDispatch, useSelector } from 'react-redux';
import { getCourseList } from '../../redux/courseSlice'
import "./Home.css"

function Home() {
    const courses = useSelector(state => state.course.courses)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCourseList())
    }, [dispatch]);
    
    return (
        <>
            <Navigation/>
            <div className="home-header">
                <div className="home-header-container">
                    <div className="home-header-intro">
                        <h1>Get really good at programming.</h1>
                        <p>
                            Develop fluency in {courses.length} programming languages with our unique blend of learning, practice and mentoring. Exercism is fun, effective and 100% free, forever.
                        </p>
                        <div className="buttons-holder">
                            <a href="/signup" className="btn-primary" type="button">
                                Sign up for free
                            </a>
                            <a href="/courses" className="btn-secondary">
                                Explore languages
                            </a>
                        </div>
                    </div>
                    <div className="intro-image">
                        <img alt="" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/graphics/landing-page-top-74da2134b88efcf34b05e804987fdfb832771716.svg"/>
                    </div>
                </div>
            </div>
            <CourseList/>
            <Footer/>
        </>
    );
  }
  
  export default Home;