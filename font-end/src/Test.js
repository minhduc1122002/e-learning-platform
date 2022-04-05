import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { publicRequest, userRequest } from "./request";
function Test() {
    const [markdown, setMarkdown] = useState()
    const [code, setCode] = useState()
    const handleDes = (e) => {
        const text = e.target.value
        setMarkdown(text)
    }
    const handleCode = (e) => {
        const text = e.target.value
        setCode(text)
    }
    const handleClick = async () => {
        const course = {
            path: "python",
            title: "Python",
            description: markdown,
            image: "https://dg8krxphbh767.cloudfront.net/tracks/python.svg",
            code: code
        }
        const lesson = {
            title: "Not Java",
            articles: markdown,
            video: "https://www.youtube.com/embed/FQnPH-UqnRA?list=RDMMFQnPH-UqnRA",
        }
        try {
            const res = await publicRequest.put(`/lectures/lessons/62382a5ae8a0b97b77e6da92`, lesson)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={handleDes}></textarea>
            <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={handleCode}></textarea>
            <div className='test'>
            <ReactMarkdown
                children={markdown}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                    <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={vscDarkPlus}
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
            <button type="button" onClick={handleClick}>Submit</button>
        </>
    )
}

export default Test