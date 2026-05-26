const responses = {
  greeting: [
    "你好！我是AI咨询助手，很高兴为您服务。请问有什么可以帮助您的吗？",
    "您好！欢迎使用AI咨询平台。我可以帮您解答各种问题，请随时提问。",
    "嗨！我是您的AI顾问，随时准备为您提供专业的建议和帮助。"
  ],
  tech: [
    "关于技术方面的问题，我建议您可以从以下几个角度考虑：\n\n1. **需求分析** - 明确您的具体需求和目标\n2. **技术选型** - 根据项目规模选择合适的技术栈\n3. **架构设计** - 确保系统的可扩展性和维护性\n\n您能具体描述一下您的技术需求吗？",
    "技术问题通常需要综合考虑多个因素。建议先梳理清楚核心需求，然后逐步推进。您目前面临的具体技术挑战是什么？"
  ],
  business: [
    "从商业角度分析，建议您关注以下几点：\n\n1. **市场定位** - 明确目标用户群体\n2. **竞争分析** - 了解竞争对手的优势和不足\n3. **商业模式** - 设计可持续的盈利模式\n\n您想深入了解哪个方面？",
    "商业咨询需要结合具体的市场环境。建议先进行充分的市场调研，再制定相应的策略。您目前处于哪个阶段？"
  ],
  default: [
    "这是一个很好的问题。让我为您详细分析一下：\n\n首先，我建议您从多个角度来思考这个问题。每个决策都需要权衡利弊，关键是找到最适合您情况的解决方案。\n\n您能提供更多背景信息吗？这样我可以给出更精准的建议。",
    "感谢您的提问。基于我的分析，我建议采取以下步骤：\n\n1. 收集相关信息和数据\n2. 评估各种可能的方案\n3. 选择最优解并制定执行计划\n\n您希望我从哪个方面开始详细说明？",
    "这个问题涉及多个方面，让我为您梳理一下关键点：\n\n- 明确目标和预期结果\n- 分析现有资源和约束条件\n- 制定可行的行动计划\n\n您有什么具体的想法或偏好吗？"
  ]
};

function detectTopic(message) {
  const techKeywords = ['技术', '开发', '编程', '代码', '软件', '系统', '架构', '数据库', '前端', '后端', 'api', 'python', 'java', 'javascript'];
  const businessKeywords = ['商业', '营销', '市场', '盈利', '商业模式', '客户', '销售', '品牌', '竞争'];

  const lowerMessage = message.toLowerCase();

  if (techKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'tech';
  }
  if (businessKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'business';
  }
  if (lowerMessage.includes('你好') || lowerMessage.includes('嗨') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    return 'greeting';
  }
  return 'default';
}

function getAIResponse(message) {
  const topic = detectTopic(message);
  const topicResponses = responses[topic];
  const randomIndex = Math.floor(Math.random() * topicResponses.length);
  return topicResponses[randomIndex];
}

module.exports = { getAIResponse };
