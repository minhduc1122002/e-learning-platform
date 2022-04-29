import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { addLessontoLecture, reset } from '../../../redux/lectureSlice';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import "github-markdown-css/github-markdown-light.css"
import { toast } from 'react-toastify'
import './LessonModal.css'

function AddLesson( {isOpen, setIsOpen, lecture, setLecture} ) {
    const [inputs, setInputs] = useState({})
    const [isEdit, setIsEdit] = useState(true)
    const dispatch = useDispatch()

    const { isLoading, isError, message, isSuccess } = useSelector(
        (state) => state.lecture
    )

    useEffect(() => {
        if (isError[4]) {
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
        if (isSuccess[4]) {
            dispatch(reset())
            handleClose()
        }
        toast.clearWaitingQueue();
    }, [isError, message, dispatch, isSuccess])

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
    const handleClose = () => {
        setIsOpen(false)
        setLecture({})
        setInputs({})
    }
    const handleAddLesson = (e) => {
        e.preventDefault()
        dispatch(addLessontoLecture({...inputs, lectureId: lecture._id}))
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
                <div className="add-field">
                    <form className="add-form">
                    <div className="header-add">
                        <h1>Add Lesson</h1>
                    </div>

                    <div className="add-form-inputs">
                        <label htmlFor="title" className="label-add">
                        <strong>TITLE (Required)</strong>
                        </label>
                        <input
                        id="title"
                        name="title"
                        className="input-add"
                        placeholder="Title"
                        onChange={handleChange}
                        />
                    </div>

                    <div className="add-form-inputs">
                        <label htmlFor="description" className="label-add">
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

                    <div className="add-form-inputs">
                    <label htmlFor="path" className="label-add">
                        <strong>VIDEO</strong>
                    </label>
                    <input
                        id="video"
                        name="video"
                        className="input-add"
                        placeholder="Video"
                        onChange={handleChange}
                    />
                    </div>
        
                    <div className="btn-list">
                        <button className="btn-primary" onClick={handleAddLesson} type="button" disabled={isLoading[4] || isError[4]}>Submit</button>
                        <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
                    </div>
                    </form>
                </div>
                </div>
            </Modal>
        </div>
    )
}
Modal.setAppElement("#root");
export default AddLesson