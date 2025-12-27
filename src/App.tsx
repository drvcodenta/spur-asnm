import Chatbot from "./Chatbot"
import Xarrow from "react-xarrows"

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <p id="chatbot-text">
        click here to view chatbot
      </p>
      
      <Xarrow
        start="chatbot-text"
        end="chatbot-circle"
        color="black"
        strokeWidth={1}
        headSize={10}
        path="smooth"
      />

      <div className="fixed bottom-10 right-10">
        <Chatbot />
      </div>
    </div>
  )
}

export default App
