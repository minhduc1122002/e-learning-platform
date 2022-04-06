import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import './Profile.css'
import { publicRequest } from "../../request";
import { useLocation } from "react-router-dom"

function Profile() {
    const [profile, setProfile] = useState({})
    const [coursesEnrolled, setCoursesEnrolled] = useState([])
    const location = useLocation();
    const profileId = location.pathname.split("/")[2];

    useEffect(() => {
        const getProfile = async () => {
            try {
                const user = await publicRequest.get(`/users/find/${profileId}`)
                const course = await publicRequest.get(`/users/my_course/${profileId}`)
                setProfile(user.data)
                setCoursesEnrolled(course.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProfile()
    }, [profileId])

    
    return (
        <div>
            <Navigation />
                <div className='user-profile'>
                    <div className='user-avatar-profile' style={{backgroundImage: `url('${profile.profileImage}')`}}></div>
                    <div className='user-info'>
                        <div className='username'>
                            <h1>{profile.username}</h1>
                        </div>
                        <div className="name">{profile.fullname}</div>
                        <div className='user-details'>
                            <div className="location">
                                <img alt="Located in" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/location-bd26e6dfc9d9d8b448b8e1f4637792133e507d2e.svg"/>
                                {profile.location}
                            </div>
                            <div className="joined">
                                <img role="presentation" alt="" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/clock-0de46e42eaaa13df638aa34b8f027f4ca1939bc9.svg"/>
                                <time>Joined Mar 2022</time>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='user-about'>
                    <div className='user-bio'>
                        <div className='user-label'>
                            <h1>Bio</h1>
                            <hr/>
                        </div>
                        <blockquote>
                            <p><em>"{profile.bio}"</em></p>
                        </blockquote>
                    </div>
                    <div className='user-course'>
                        <div className='user-label'>
                            <h1>Courses</h1>
                            <hr/>
                        </div>
                        <div className="enroll-list">
                            {coursesEnrolled.map(courseEnroll => (
                                <a className='enroll-item' href = {`/course/${courseEnroll.path}`}>
                                    <img alt = {courseEnroll.path} className = {courseEnroll.path} src = {courseEnroll.image} />
                                    <div className="enroll-item-title">{courseEnroll.title}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default Profile