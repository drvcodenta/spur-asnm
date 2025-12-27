import { useState } from "react"
import { motion } from "framer-motion"

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {!isOpen && (
        <motion.button 
          id="chatbot-circle"
          layoutId="chatbot-container"
          onClick={() => setIsOpen(true)} 
          className="w-16 h-16 rounded-full border-2 flex items-center justify-center bg-white"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          O
        </motion.button>
      )}

      {isOpen && (
        <motion.div 
          layoutId="chatbot-container"
          className="w-96 h-125 flex flex-col border bg-white rounded-lg shadow-lg"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div 
            className="flex justify-between items-center p-4 border-b"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0 }}
          >
            <h3>Beautiful Chatbot</h3>
            <button className="hover:bg-amber-200" onClick={() => setIsOpen(false)}>✕</button>
          </motion.div>
          
          <motion.div 
            className="flex-1 p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p>Hello! I'm here to help the beautiful Spur team. How can I assist you today?</p>
          </motion.div>

          <motion.input 
            type="text" 
            placeholder="Type your message..." 
            className="w-full p-4 border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        </motion.div>
      )}
    </>
  )
}

export default Chatbot
