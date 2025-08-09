import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount >= 10) {
          clearInterval(timer)
          window.close()
          return prevCount
        }
        return prevCount + 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="counter">
      {count}
    </div>
  )
}

export default App
