import React from 'react'
import { useEffect, useState } from "react";
import { publicRequest } from "../../request";
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import "./Lesson.css"
import "github-markdown-css/github-markdown-light.css"
import ReactPlayer from 'react-player'

function Lesson( {lessonId} ) {
    const [lesson, setLesson] = useState({})

    const videoStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }

    
    useEffect(() => {
      const getLesson = async () => {
          try {
              const res = await publicRequest.get(`/lectures/lessons/${lessonId}`)
              console.log(res.data)
              setLesson(res.data[0])
          } catch (err) {
              console.log(err)
          }
      }
      getLesson()
    }, [lessonId])

    return (
      <div className='lesson'>
        <div className='lesson-content'>
          <ReactMarkdown
                className='markdown-body'
                children={lesson.articles}
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
            <div className='video-container'>
                <ReactPlayer 
                    url={lesson.video}
                    controls={true}
                    style={videoStyle}
                    width= "100%"
                    height= "auto"
                />
            </div>
          </div>
      </div>
    )
}

export default Lesson