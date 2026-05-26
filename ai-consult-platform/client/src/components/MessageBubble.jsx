function MessageBubble({ message }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  const formatContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className={`message-wrapper ${message.role}`}>
      <div className={`message-bubble ${message.role}`}>
        <div dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} />
      </div>
      <div className="message-time">{formatTime(message.timestamp)}</div>
    </div>
  )
}

export default MessageBubble
