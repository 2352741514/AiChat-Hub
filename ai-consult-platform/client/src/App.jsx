import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import InputBar from './components/InputBar'

function App() {
  const [conversations, setConversations] = useState([])
  const [currentConversationId, setCurrentConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/chat/history')
      const data = await response.json()
      setConversations(data)
    } catch (error) {
      console.error('获取历史记录失败:', error)
    }
  }

  const loadConversation = async (id) => {
    try {
      const response = await fetch(`/api/chat/history/${id}`)
      const data = await response.json()
      setCurrentConversationId(id)
      setMessages(data.messages)
    } catch (error) {
      console.error('加载会话失败:', error)
    }
  }

  const sendMessage = async (content) => {
    if (!content.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          conversationId: currentConversationId
        })
      })

      const data = await response.json()

      setCurrentConversationId(data.conversationId)
      setMessages(prev => [...prev, data.message])
      fetchHistory()
    } catch (error) {
      console.error('发送消息失败:', error)
      const errorMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '抱歉，发生了错误，请稍后再试。',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const startNewConversation = () => {
    setCurrentConversationId(null)
    setMessages([])
  }

  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        currentId={currentConversationId}
        onSelect={loadConversation}
        onNew={startNewConversation}
      />
      <div className="main-content">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <InputBar onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default App
