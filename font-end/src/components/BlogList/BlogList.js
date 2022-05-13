import React, { useEffect, useState } from 'react'
import { getBlogList } from '../../redux/blogSlice'
import { useSelector, useDispatch } from 'react-redux';
import './BlogList.css'

function BlogList() {
    const dispatch = useDispatch()
    
    const { data } = useSelector(
        (state) => state.blog.blogs
    )

    useEffect(() => {
        dispatch(getBlogList({ page: 1, limit: 3 }))
    }, [dispatch])

    return (
        <section className="blog-list-container">
            <div className="lg-container">
                <div className="blog-list-header">
                    <h3>Community Posts</h3>
                    <hr className="c-divider"/>
                </div>
                <div className="posts">
                    {data?.map(blog => (
                        <a className="c-blog-post e-hover-grow" href={`/blogs/${blog._id}`} key={blog._id}>
                            <div className="img" style={{backgroundImage: `url('${blog.image}')`}}></div>
                            <div className="title">{blog.title}</div>
                            <div className="byline">
                                <div className="by">{blog.creator.fullname}</div>
                                {" · "}
                                <div className='time'>{blog.dateDiff} hours ago</div>
                            </div>
                        </a>
                        )
                    )}
                </div>
                <a className="c-prominent-link" href="/blogs">
                    <span>See all community posts</span>
                    <img role="presentation" alt="" className="c-icon" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/arrow-right-0f5e363467e0c55fe280b4864639a9c677afa0d2.svg"/>
                </a>
            </div>
        </section>
    )
}

export default BlogList