import { useState } from "react"

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 rounded-full border-2">
        O
      </button>

      {isOpen && (
        <div className="w-96 h-125 flex flex-col">
          <div className="flex justify-between items-center p-4">
            <h3>Beautiful Chatbot</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div className="flex-1 p-4">
            <p>Hello! I'm here to help the beautiful Spur team. How can I assist you today?</p>
          </div>

          <input type="text" placeholder="Type your message..." className="w-full p-4" />
        </div>
      )}
    </>
  )
}

export default Chatbot
