const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getAIResponse } = require('../services/aiService');

const router = express.Router();

const conversations = new Map();

router.post('/send', (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: '消息不能为空' });
    }

    let convId = conversationId;
    if (!convId || !conversations.has(convId)) {
      convId = uuidv4();
      conversations.set(convId, {
        id: convId,
        title: message.substring(0, 20) + (message.length > 20 ? '...' : ''),
        messages: [],
        createdAt: new Date().toISOString()
      });
    }

    const conversation = conversations.get(convId);

    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    conversation.messages.push(userMessage);

    const aiResponse = getAIResponse(message);

    const aiMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString()
    };
    conversation.messages.push(aiMessage);

    res.json({
      conversationId: convId,
      message: aiMessage,
      conversationTitle: conversation.title
    });
  } catch (error) {
    console.error('处理消息错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.get('/history', (req, res) => {
  const history = Array.from(conversations.values()).map(conv => ({
    id: conv.id,
    title: conv.title,
    messageCount: conv.messages.length,
    lastMessage: conv.messages[conv.messages.length - 1]?.content.substring(0, 50) || '',
    createdAt: conv.createdAt
  }));

  history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(history);
});

router.get('/history/:id', (req, res) => {
  const conversation = conversations.get(req.params.id);
  if (!conversation) {
    return res.status(404).json({ error: '会话不存在' });
  }
  res.json(conversation);
});

module.exports = router;
