import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteComment, updateComment } from '../../../redux/blogSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import './Comment.css'

function Comment( {comment, creator} ) {
    const [isActive, setIsActive] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [content, setContent] = useState(comment.content)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const handleDeleteComment = (e) => {
        e.preventDefault()
        const comment = JSON.parse(e.target.dataset.onclickparam)
        dispatch(deleteComment({...comment, creator}))
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            setIsActive(false)
        }
        if (e.key === 'Enter') {
            e.preventDefault()
            const { oldContent, ...others } = comment
            const newComment = {...others, content}
            dispatch(updateComment({...newComment, creator}))
            setIsEdit(false)
        }
    }
    const handleBlur = () => {
        if (isActive) {
            setIsActive(false)
        }
    }
    const mouseEnter = () => {
        if (!isOpen) {
            setIsOpen(true)
        }
    }
    const mouseLeave = () => {
        if (isOpen) {
            setIsOpen(false)
        }
    }
    return (
        <div className='comment' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="user-avatar" style={{backgroundImage: `url('${comment.commentator.profileImage}')`}}></div>
                {!isEdit ? 
                <div className='comment-body'>
                    <h5>{comment.commentator.fullname}</h5> 
                    <p>{comment.content}</p> 
                </div> : 
                <div className="comment-box">
                    <div className="comment-input" tabIndex="0" suppressContentEditableWarning={true} contentEditable="true" placeholder="Viết bình luận của bạn..." role="textbox" aria-multiline="true" spellCheck="false" onKeyPress={handleKeyPress} onInput={(e) => setContent(e.currentTarget.textContent)}>
                        {comment.content}
                    </div>
                </div>
                }
            {isOpen && 
                <div className='modify-comment' tabIndex={ 0 } onClick={() => setIsActive(!isActive)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div> 
            }
            { isActive && (user?._id === comment.commentator._id || user?._id === creator) && 
                <div className='comment-dropdown' onMouseLeave={handleBlur}>
                    <ul>
                        <li><button type='button' onClick={handleDeleteComment} data-onclickparam={JSON.stringify(comment)}>Delete Comment</button></li>
                        {user?._id === comment.commentator._id && <li><button onClick={() => setIsEdit(!isEdit)}>Edit Comment</button></li>}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Comment