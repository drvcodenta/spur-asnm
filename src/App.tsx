import Chatbot from "./Chatbot"

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <p>
        click here to view chatbot
      </p>
      
      <svg 
        className="absolute top-80 left-[calc(56%)]"
        width="300" 
        height="300" 
        viewBox="0 0 600 500"
      >
        <path
          d="M 10 10 Q 400 200, 550 450"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="fixed bottom-10 right-90">
        <Chatbot />
      </div>
    </div>
  )
}

export default App
