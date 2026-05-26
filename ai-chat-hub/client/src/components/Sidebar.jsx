import { useState } from 'react'

function Sidebar({ conversations, currentId, onSelect, onNew }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="mobile-header">
        <button className="menu-btn" onClick={() => setIsOpen(true)}>☰</button>
        <span>AiChat Hub</span>
      </div>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>🤖 AiChat Hub</h1>
          <button className="new-chat-btn" onClick={() => { onNew(); setIsOpen(false); }}>
            + 新建对话
          </button>
        </div>
        <div className="conversation-list">
          {conversations.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
              暂无历史会话
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${conv.id === currentId ? 'active' : ''}`}
                onClick={() => { onSelect(conv.id); setIsOpen(false); }}
              >
                <div className="title">{conv.title}</div>
                <div className="preview">{conv.lastMessage}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
