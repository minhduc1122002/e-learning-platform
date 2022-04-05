import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import './Profile.css'

function Profile() {
    const coursesEnroll = [
        {
            courseName: 'Python',
            logo: 'https://dg8krxphbh767.cloudfront.net/tracks/python.svg',
            path: 'python'
        },
        {
            courseName: 'Go',
            path: 'go',
            logo: 'https://dg8krxphbh767.cloudfront.net/tracks/go.svg'
        },
        {
            courseName: 'Javascript',
            path: 'javascript',
            logo: '	https://dg8krxphbh767.cloudfront.net/tracks/javascript.svg'
        }
    ];

  return (
    <div>
        <Navigation />
            <div className='user-profile'>
                <div className='user-avatar-profile'></div>
                <div className='user-info-profile'>
                    <h1>Minh Duc Nguyen</h1>
                    <p>minhducidol@gmail.com</p>
                </div>
            </div>
            <h1 className='user-course-label'>Courses</h1>
            <button className='btn user-courses' type='button'>
                    <strong>In Progress</strong>
            </button>
            <div className='user-courses-enroll'>
                <div className = "courses-Profile">
                    {coursesEnroll.map(courseEnroll => (
                        <a className='courseEnroll-item' href = {`/course/${courseEnroll.path}`}>
                            <img alt = {courseEnroll.path} className = {courseEnroll.path} src = {courseEnroll.logo} />
                            <div className="courseEnroll-title">{courseEnroll.courseName}</div>
                        </a>
                    ))}
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default Profile