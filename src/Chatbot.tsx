import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import botLogo from "./assets/bot-logo.png"

// Mock data for messages
const MOCK_MESSAGES = [
  { id: 1, text: "Hey 👋, how can we help you today?", sender: "bot", timestamp: "3:42 pm" },
  { id: 2, text: "I want to know about shipping rates", sender: "user", timestamp: "3:43 pm" },
  { id: 3, text: "Sure! We offer standard shipping to USA on orders under $50. Would you like more details?", sender: "bot", timestamp: "3:43 pm" },
  { id: 4, text: "Yes, what about international shipping?", sender: "user", timestamp: "3:44 pm" },
  { id: 5, text: "We ship to EU countries as well. Rates vary by location. Let me get you the details...", sender: "bot", timestamp: "3:44 pm" }
]

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Handle sending message
  const handleSend = () => {
    if (!message.trim() || isLoading) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
    setMessages([...messages, userMessage])
    setMessage("")
    setIsLoading(true)
    setIsTyping(true)

    // Simulate bot response after 2 seconds
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "Thanks for your message! This is a mock response. Backend integration coming soon.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
      setIsTyping(false)
    }, 2000)
  }

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Show circle button when closed
  if (!isOpen) {
    return (
      <button
        id="chatbot-circle"
        onClick={() => setIsOpen(true)} 
        className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-white overflow-hidden"
      >
        <img src={botLogo} alt="Chatbot" className="w-full h-full object-cover" />
      </button>
    )
  }

  // Show chatbot when open (with animation on mount)
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-112.5 h-125 flex flex-col bg-white rounded-lg shadow-2xl"
    >
      {/* Blue Header */}
      <div className="flex gap-3 p-4 bg-blue-600 text-white rounded-lg">
        <button className="text-2xl">←</button>
        <img src={botLogo} alt="Spur" className="w-8 h-8 rounded-full bg-white" />
        <h3 className="flex-1 font-semibold">Spur Support</h3>
        <button className="text-2xl w-8 h-8 rounded-full hover:bg-blue-700 flex items-center justify-center transition" onClick={() => setIsOpen(false)}>✕</button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 mb-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.sender === 'bot' && (
              <img src={botLogo} alt="Bot" className="w-10 h-10 rounded-full flex-shrink-0" />
            )}
            <div className={`max-w-md ${msg.sender === 'user' ? 'text-right' : ''}`}>
              <div className={`p-3 rounded-lg shadow ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
                <p>{msg.text}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 mb-4">
            <img src={botLogo} alt="Bot" className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="bg-white p-3 rounded-lg shadow">
              <p className="text-gray-500">Agent is typing...</p>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4">
        <div className="flex items-center gap-2 border-2 border-blue-400 rounded-full px-4 py-2">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..." 
            className="flex-1 outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className={`text-white w-8 h-8 rounded-full ${!message.trim() || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            ➤
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Chatbot
