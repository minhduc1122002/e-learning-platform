import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { updateBlog, reset } from '../../../redux/blogSlice';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import "github-markdown-css/github-markdown-light.css"
import { toast } from 'react-toastify'

function EditBlog( {isOpen, setIsOpen, blog, setBlog} ) {
    const user = useSelector(state => state.auth.user)
    const [inputs, setInputs] = useState({
        _id: blog._id,
        creator: user._id,
        title: blog.title,
        articles: blog.articles,
        image: blog.image
    })
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(true)

    const { message } = useSelector(
        (state) => state.lecture
    )
    const isSuccess = useSelector(
        (state) => state.blog.isSuccess[4]
    )
    const isError = useSelector(
        (state) => state.blog.isError[4]
    )
    const isLoading = useSelector(
        (state) => state.blog.isLoading[4]
    )

    const handleClose = useCallback(() => {
        setIsOpen(false)
        setBlog({})
        setInputs({})
    }, [setIsOpen, setBlog])

    useEffect(() => {
        if (isError) {
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => {
                  dispatch(reset())
                }
            })
        }
        if (isSuccess) {
            dispatch(reset())
            handleClose()
        }
        toast.clearWaitingQueue();
    }, [isError, message, dispatch, isSuccess, handleClose])

    const handleEdit = (e) => {
      e.preventDefault()
      setIsEdit(true)
    }

    const handleChange = (e) => {
        setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleView = (e) => {
        e.preventDefault()
        setIsEdit(false)
    }

    const handleEditBlog = (e) => {
        e.preventDefault()
        dispatch(updateBlog(inputs))
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleClose}
                contentLabel="editmodal"
                className="modal-container"
                overlayClassName="c-modal"
            >
                <div className="modal-content">
                    <form className="edit-form">
                    <div className="header-edit">
                        <h1>Edit Blog</h1>
                    </div>

                    <div className="edit-form-inputs">
                        <label htmlFor="title" className="label-edit">
                        <strong>TITLE</strong>
                        </label>
                        <input
                            name="title"
                            className="input-edit"
                            defaultValue={blog.title}
                            onChange={handleChange}
                        />
                    </div>
        
                    <div className="edit-form-inputs">
                        <label htmlFor="description" className="label-edit">
                        <strong>ARTICLES</strong>
                        </label>
                        <div className="btn-edit-list">
                        <div className="tab-nav">
                            <button onClick={handleEdit} className={isEdit ? "edit-selected" : "not-selected"}>Edit Markdown</button>
                            <button onClick={handleView} className={!isEdit ? "edit-selected" : "not-selected"}>Preview</button>
                        </div>
                        </div>
                        <textarea
                            className={!isEdit ? 'hidden' : 'articles'}
                            name="articles"
                            style={{height: "300px", width: "100%", resize: "vertical", borderTop: 0, borderRadius: 0}}
                            defaultValue={blog.articles}
                            onChange={handleChange}
                        />
                        <div className={!isEdit ? 'markdown-wrap' : 'hidden'}>
                        <ReactMarkdown
                            className='markdown-body'
                            children={inputs.articles}
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
                        </div>
                    </div>
        
                    <div className="edit-form-inputs">
                        <label htmlFor="image" className="label-edit">
                        <strong>Image</strong>
                        </label>
                        <input
                        type="url"
                        name="image"
                        className="input-edit"
                        defaultValue={blog.image}
                        onChange={handleChange}
                        />
                    </div>
        
                    <div className="btn-list">
                        <button className="btn-primary" onClick={handleEditBlog} type="button">Submit</button>
                        <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
                    </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default EditBlog