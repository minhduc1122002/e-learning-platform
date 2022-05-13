import React, { useEffect, useState } from 'react'
import { getBlogList } from '../../redux/blogSlice'
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import './BlogList.css'
import { useSearchParams } from 'react-router-dom';

function BlogList() {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1
    const { data, numberOfPages, total } = useSelector(
        (state) => state.blog.blogs
    )
    useEffect(() => {
        dispatch(getBlogList({page}))
    }, [dispatch, page])

    let pages = []
    const limit = 2
    const maxNext = (page + limit) > numberOfPages ? numberOfPages : (page + limit)
    const maxPrevious = (page - limit) < 1 ? 1 : (page - limit)
    if (page != 1 && page > 1) {
        pages.push(
            <>
                <a href="/blogs/?page=1" className="first-page page" key="first">
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </a>
                <a href={`/blogs/?page=${page - 1}`} className="previous-page page" key="previous">
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </a>
            </>
        )
    }
    if (page <= numberOfPages) {
        for (let i = maxPrevious; i < page; i++) {
            pages.push(<a href={`/blogs?page=${i}`} className="page" key={i}>{i}</a>);
        }
        for (let i = page; i <= maxNext; i++) {
            if (i === page) {
                pages.push(<a href={`/blogs?page=${i}`} className="page current" key={i}>{i}</a>);
            } else {
                pages.push(<a href={`/blogs?page=${i}`} className="page" key={i}>{i}</a>);
            }
        }
    }
    if (page != numberOfPages && page < numberOfPages) {
        pages.push(
            <>
                <a href={`/blogs/?page=${page + 1}`} className="next-page page" key="next">
                    <FontAwesomeIcon icon={faChevronRight}/>
                </a>
                <a href={`/blogs/?page=${numberOfPages}`} className="last-page page" key="last">
                    <FontAwesomeIcon icon={faChevronRight}/>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </a>
            </>
        )
    }

    return (
        <div>
            <Navigation/>
            {data &&
                <>
                <header className="tracks-header">
                    <div className="lg-container container">
                        <h1>{total} blogs for you to explore</h1>
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
                                {data.filter(blog => 
                                    blog.title.toLowerCase().includes(input.toLowerCase())
                                    ).map(blog => (
                                        <a href={`/blogs/${blog._id}`} className="result-item blog-item" key={blog._id}>
                                            <div className='result-wrapper'>
                                                <div class="blog-image-compact" style={{backgroundImage: `url('${blog.image}')`}}></div>
                                                <div className="blog-creator">
                                                    <div className="user-avatar" style={{backgroundImage: `url('${blog.creator.profileImage}')`}}></div>
                                                    <div className="creator-details">
                                                        <p className="creator-name">{blog.creator.fullname}</p>
                                                        <p className="blog-time">{blog.dateDiff} hours ago</p>
                                                    </div>
                                                </div>
                                                <div className='result-info'>
                                                    <div className="heading">
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
                    <section className="pagination">
                        {pages}
                    </section>
                </div>
                </>}
            <Footer/>
        </div>
    )
}

export default BlogList