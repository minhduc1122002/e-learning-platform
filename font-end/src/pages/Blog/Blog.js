import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import { useLocation, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import './Blog.css'
import { useSelector, useDispatch } from 'react-redux';
import { commentBlog, getBlog, likeBlog } from '../../redux/blogSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import "github-markdown-css/github-markdown-light.css"
import EditBlog from '../../components/Modal/Blog/EditBlog'
import DeleteBlog from '../../components/Modal/Blog/DeleteBlog'
import Comment from '../../components/Modal/Comment/Comment'

function Blog() {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState("")
    const [blogSelected, setBlogSelected] = useState({})
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const location = useLocation()
    const blogId = location.pathname.split("/")[2]
    const blog = useSelector(state => state.blog.blog)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getBlog(blogId))
    }, [dispatch, blogId]);

    const handleLike = (e) => {
        e.preventDefault()
        if (!user) {
            return navigate("/login")
        }
        dispatch(likeBlog({blogId, userId: user._id}))
    }
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleComment = (e) => {
        if (!user) {
            return navigate("/login")
        }
        setContent(e.currentTarget.textContent)
    }
    const handleOpen = () => {
        if (!user) {
            return navigate("/login")
        }
        setIsOpen(true)
    }
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            const comment = {
                userId: user._id,
                content: content
            }
            dispatch(commentBlog({blogId, ...comment}))
            e.currentTarget.textContent = ""
            setContent("")
        }
    }
    const handleEdit = () => {
        setEditModal(true)
        setBlogSelected(blog)
    }
    const handleDelete = () => {
        setDeleteModal(true)
        setBlogSelected(blog)
    }
    return (
        <>
            {editModal && <EditBlog isOpen={editModal} setIsOpen={setEditModal} blog={blogSelected} setBlog={setBlogSelected}/>}
            {deleteModal && <DeleteBlog isOpen={deleteModal} setIsOpen={setDeleteModal} blog={blogSelected} setBlog={setBlogSelected}/>}
            <Modal
                isOpen={isOpen}
                onRequestClose={handleClose}
                contentLabel="modal-comment"
                className="modal-vertical"
                overlayClassName="comment-o-modal"
            >
                {blog && user && 
                    <div className='v-modal-body'>
                        <div className="comment-box">
                            <div className="user-avatar" style={{backgroundImage: `url('${user.profileImage}')`}}></div>
                            <div className="comment-input" tabIndex="0" contentEditable="true" placeholder="Viết bình luận của bạn..." role="textbox" aria-multiline="true" spellCheck="false" onInput={handleComment} onKeyPress={handleKeyPress}></div>
                        </div>
                            {blog.comments.length > 0 && blog.comments.map(comment => (
                                <>
                                    <Comment comment={comment} creator={blog.creator._id} key={comment._id}/>
                                </>
                            ))}
                    </div>
                }
            </Modal>
            {blog &&
                <> 
                    <Navigation/>
                    <div className='blog-container'>
                        <div className='blog-stats'>
                            <div className='stats-container'>
                                <h1>{blog.creator.fullname}</h1>
                                <hr/>
                                <div className='blog-btn'>
                                    <button onClick={handleLike} type="button" className='like-btn'>
                                        <FontAwesomeIcon icon={faHeart} className={blog.likes.includes(user?._id) ? "liked" : "not-liked"}/>
                                        <span>{blog.likes.length}</span>
                                    </button>
                                    <button type="button" className='comment-btn' onClick={handleOpen}>
                                        <FontAwesomeIcon icon={faComment}/>
                                        <span>{blog.comments.length}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='blog-content'>
                            <article>
                                <h1>{blog.title}</h1>
                                <div className="blog-details">
                                    <div className="blog-creator">
                                        <a href={`/profiles/${blog.creator._id}`}>
                                        <div className="user-avatar" style={{backgroundImage: `url('${blog.creator.profileImage}')`}}></div>
                                        </a>
                                        <div className="creator-details">
                                            <a href={`/profiles/${blog.creator._id}`}><p className="creator_name">{blog.creator.fullname}</p></a>
                                            <p className="BlogDetail_time__J0n0e">{blog.dateDiff} hours ago</p>
                                        </div>
                                        {(user?.isAdmin || (user?._id === blog.creator._id)) && <div className='modify-btn'>
                                            <div className="edit">
                                                <button className="fa-edit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit}/></button>
                                            </div>
                                            <div className="delete">
                                                <button className="delete-fa-icon" onClick={handleDelete}><FontAwesomeIcon icon ={faTrash}/></button>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <ReactMarkdown
                                    className='markdown-body'
                                    children={blog.articles}
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                    code({node, inline, className, children, ...props}) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={atomOneLight}
                                            language={match[1]}
                                            showLineNumbers={true}
                                            PreTag="div"
                                            className="code-container"
                                            {...props}
                                        />
                                        ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                        )
                                    }
                                    }}
                                />
                            </article>
                            <div className='blog-btn'>
                                <button onClick={handleLike} type="button" className='like-btn'>
                                    <FontAwesomeIcon icon={faHeart} className={blog.likes.includes(user?._id) ? "liked" : "not-liked"}/>
                                    <span>{blog.likes.length}</span>
                                </button>
                                <button type="button" className='comment-btn' onClick={handleOpen}>
                                    <FontAwesomeIcon icon={faComment}/>
                                    <span>{blog.comments.length}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            }
        </>
    )
}

export default Blog