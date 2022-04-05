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

function Lesson( {lessonId} ) {
    const [lesson, setLesson] = useState({})

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
            <iframe width="1280" height="720" src="https://www.youtube.com/embed/DmaGYyjDzTM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </div>
    )
}

export default Lesson