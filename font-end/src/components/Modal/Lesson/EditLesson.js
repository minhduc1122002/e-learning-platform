import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { updateLessontoLecture, reset } from '../../../redux/lectureSlice';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import "github-markdown-css/github-markdown-light.css"
import { toast } from 'react-toastify'
import './LessonModal.css'

function EditLesson( {isOpen, setIsOpen, lesson, setLesson} ) {
    const [inputs, setInputs] = useState({
        title: lesson.title,
        articles: lesson.articles,
        video: lesson.video
    })
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(true)
    const { message } = useSelector(
        (state) => state.lecture
    )
    const isSuccess = useSelector(
        (state) => state.lecture.isSuccess[5]
    )
    const isError = useSelector(
        (state) => state.lecture.isError[5]
    )
    const isLoading = useSelector(
        (state) => state.lecture.isLoading[5]
    )
    const handleClose = useCallback(() => {
        setIsOpen(false)
        setLesson({})
        setInputs({})
    }, [setIsOpen, setLesson])

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
    const handleEditLesson = (e) => {
        e.preventDefault()
        dispatch(updateLessontoLecture({...inputs, _id: lesson._id}))
    }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleClose}
                contentLabel="addmodal"
                className="modal-container"
                overlayClassName="c-modal"
            >
                <div className="modal-content">
                    <form className="edit-form">
                    <div className="header-edit">
                        <h1>Edit Lesson</h1>
                    </div>

                    <div className="edit-form-inputs">
                        <label htmlFor="title" className="label-edit">
                        <strong>TITLE</strong>
                        </label>
                        <input
                        name="title"
                        className="input-edit"
                        defaultValue={lesson.title}
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
                            defaultValue={lesson.articles}
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
                        <strong>VIDEO</strong>
                        </label>
                        <input
                        type="url"
                        name="video"
                        className="input-edit"
                        defaultValue={lesson.video}
                        onChange={handleChange}
                        />
                    </div>
        
                    <div className="btn-list">
                        <button className="btn-primary" onClick={handleEditLesson} type="button" disabled={isLoading || isError}>Submit</button>
                        <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
                    </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
Modal.setAppElement("#root");
export default EditLesson