import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import botLogo from "./assets/bot-logo.png"
import { chatAPI } from "./api"

function Chatbot() {
  // UI state
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey 👋, how can we help you today?", sender: "bot" }
  ])
  const [inputWarning, setInputWarning] = useState<string | null>(null)
  
  // Backend state
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  
  const  messagesEndRef = useRef<HTMLDivElement>(null)

// Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send message to backend
  const MAX_MESSAGE_LENGTH = 1000
  const handleSend = async () => {
    const trimmed = message.trim()
    if (!trimmed || isTyping) {
      setInputWarning(!trimmed ? "Please enter a message." : null)
      return
    }
    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      setInputWarning(`Message too long (max ${MAX_MESSAGE_LENGTH} characters).`)
      return
    }
    setInputWarning(null)

    // Add user message to UI
    const userMsg = { id: Date.now(), text: trimmed, sender: "user" }
    setMessages(prev => [...prev, userMsg])
    setMessage("")
    setIsTyping(true)

    try {
      // Call backend API
      const response = await chatAPI.sendMessage(trimmed, sessionId || undefined)

      // Save session
      setSessionId(response.sessionId)
      localStorage.setItem('chat_session', response.sessionId)

      // Add bot reply to UI
      const botMsg = { id: Date.now() + 1, text: response.reply, sender: "bot" }
      setMessages(prev => [...prev, botMsg])

    } catch (error) {
      // Show error to user
      let errMsg = "Error connecting to server. Please try again."
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        errMsg += ` (${(error as { message: string }).message})`
      } else if (typeof error === 'string') {
        errMsg += ` (${error})`
      }
      const errorMsg = { id: Date.now() + 1, text: errMsg, sender: "bot" }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  // Closed state - show button
  if (!isOpen) {
    return (
      <button 
        id="chatbot-circle"
        onClick={() => setIsOpen(true)} 
        className="w-16 h-16 rounded-full bg-white shadow-lg"
      >
        <img src={botLogo} alt="Chat" className="w-full h-full rounded-full" />
      </button>
    )
  }

  // Open state - show chat window
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-112.5 h-125 flex flex-col bg-white rounded-lg shadow-2xl"
    >
      {/* Header */}
      <div className="flex gap-3 p-4 bg-blue-600 text-white rounded-t-lg">
        <img src={botLogo} alt="Spur" className="w-8 h-8 rounded-full" />
        <h3 className="flex-1 font-semibold">Shoe Shop Support</h3>
        <button onClick={() => setIsOpen(false)} className="text-xl">✕</button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 mb-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.sender === 'bot' && <img src={botLogo} alt="Bot" className="w-10 h-10 rounded-full" />}
            <div
              className={`p-3 rounded-lg max-w-md ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white'}`}
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 mb-4">
            <img src={botLogo} alt="Bot" className="w-10 h-10 rounded-full" />
            <div className="bg-white p-3 rounded-lg">Typing...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 border-2 border-blue-400 rounded-full px-4 py-2">
            <input 
              type="text" 
              value={message}
              maxLength={MAX_MESSAGE_LENGTH + 1}
              onChange={(e) => {
                setMessage(e.target.value)
                if (e.target.value.trim().length > MAX_MESSAGE_LENGTH) {
                  setInputWarning(`Message too long (max ${MAX_MESSAGE_LENGTH} characters).`)
                } else {
                  setInputWarning(null)
                }
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..." 
              className="flex-1 outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={!message.trim() || isTyping}
              className={`w-8 h-8 rounded-full ${!message.trim() || isTyping ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
            >
              ➤
            </button>
          </div>
          {inputWarning && (
            <div className="text-xs text-red-500 px-2 pt-1">{inputWarning}</div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Chatbot
