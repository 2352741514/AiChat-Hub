import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0) {
    return (
      <div className="chat-window">
        <div className="welcome-screen">
          <div className="icon">🤖</div>
          <h2>AiChat Hub</h2>
          <p>我是您的AI咨询助手，可以为您提供专业的建议和解答。请在下方输入您的问题开始对话。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow
