import React, { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import "github-markdown-css/github-markdown-light.css"
import './NewBlog.css'
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../redux/blogSlice';
import { useNavigate } from 'react-router-dom';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

function NewBlog() {
    const [content, setContent] = useState("")
    const [header, setHeader] = useState("")
    const [blogImage, setblogImage] = useState('')
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleContent = (e) => {
        setContent(e.target.value)
    }
    const handleAddBlog = (e) => {
        e.preventDefault()
        let blog = {
            creator: user._id,
            title: header,
            articles: content
        }
        if (blogImage) {
            const storage = getStorage(app);
            const storageRef = ref(storage, `blogs/${blogImage.name}`)
            const uploadTask = uploadBytesResumable(storageRef, blogImage)

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        blog.image = downloadURL
                        dispatch(createBlog({...blog, navigate}))
                    });
                }
            );
        } else {
            dispatch(createBlog({...blog, navigate}))
        }
    }
    return (
        <>
            <Navigation />
            <div className='newblog-wrapper'>
                <div spellcheck="false" placeholder="Title" role="textbox" contenteditable="true" class="newblog-title" onInput={(e) => setHeader(e.currentTarget.textContent)}></div>
                <div class="create-blog">
                    <div class="rc-md-editor" style={{marginBottom: "31px", height: "calc(100vh - 100px)"}}>
                        <div class="editor-container">
                            <section class="sec-md">
                                <textarea name="textarea" placeholder="Nội dung viết ở đây" class="blog-texteditor section-container" wrap="hard" onChange={handleContent}></textarea>
                            </section>
                            <section class="sec-html">
                                <div class="section-container html-wrap">
                                    <ReactMarkdown
                                        className='markdown-body'
                                        children={content}
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
                            </section>
                        </div>
                    </div>
                    <div className='submit-btn-list'>
                        <div className="btn-primary" onClick={handleAddBlog}>Submit</div>
                        <div class="faux-button">
                            <div class="btn-enhanced">Upload new image</div>
                            <input type="file" id="avatar" onChange={(e) => setblogImage(e.target.files[0])} />
                            <div class="hover-bg"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NewBlog