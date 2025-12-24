import { motion } from "framer-motion"

function App() {

  return (
    <>
    <motion.div
    initial={{ opacity:0.5, scale:0.5}}
    animate={{ opacity:1, scale:1}}
    transition={{ duration:0.5}}
    >
      this is a frmaer component
    </motion.div>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
