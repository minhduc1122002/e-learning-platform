import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm'
function Test() {
    const [markdown, setMarkdown] = useState()
    return (
        <>
            <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={(e) => setMarkdown(e.target.value)}></textarea>
            <div className='test'>
            <ReactMarkdown
                children={markdown}
                remarkPlugins={[remarkGfm]}
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
        </>
    )
}

export default Test