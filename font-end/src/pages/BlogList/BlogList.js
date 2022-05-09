import React, { useEffect, useState } from 'react'
import { getBlogList } from '../../redux/blogSlice'
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import './BlogList.css'

function BlogList() {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const { blogs } = useSelector(
        (state) => state.blog
    )
    useEffect(() => {
        dispatch(getBlogList())
    }, [dispatch])

    return (
        <div>
            <Navigation/>
            <header className="tracks-header">
                <div className="lg-container container">
                    <h1>{blogs.length} blogs for you to explore</h1>
                    <p>
                        Want to share your experience and knowledge to everyone across the world ?
                        <a href="/newblog"> Create your own blog now</a>
                    </p>
                </div>
            </header>
            <div className='search-container'>
                <section className="c-search-bar">
                    <div className="lg-container">
                        <input type="text" placeholder="Search language tracks" className='search-bar' onChange={(e) => setInput(e.target.value)}/>
                    </div>
                </section>
                <section className='courses'>
                    <div className="lg-container">
                        <div className='result-courses'>
                            {blogs.filter(blog => 
                                blog.title.toLowerCase().includes(input.toLowerCase())
                                ).map(blog => (
                                    <a href={`/blogs/${blog._id}`} className="result-item blog-item" key={blog._id}>
                                        <div className='result-wrapper'>
                                            <div className="blog-creator">
                                                <div className="user-avatar" style={{backgroundImage: `url('${blog.creator.profileImage}')`}}></div>
                                                <div className="creator-details">
                                                    <p className="creator-name">{blog.creator.fullname}</p>
                                                    <p className="blog-time">{blog.dateDiff} hours ago</p>
                                                </div>
                                            </div>
                                            <div className='result-info'>
                                                <div className="heading">
                                                    {blog.image && <img alt={blog._id} className="small-icon" src={blog.image}/>}
                                                    <h3 className="title">{blog.title}</h3>
                                                </div>
                                                <ul className="counts"> 
                                                    <li>
                                                        <FontAwesomeIcon icon={faHeart} className="r-icon"/>
                                                        {blog.likes.length} likes
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faComment} className="r-icon"/>
                                                        {blog.comments.length} comments
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {blog.image && <img alt={blog._id} className="blog-image" src={blog.image}/>}
                                    </a>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default BlogList