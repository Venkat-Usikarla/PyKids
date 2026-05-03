import { useState, useRef, useEffect } from 'react'
import styles from './CodeEditor.module.css'

// Pyodide is loaded via CDN script tag (added dynamically)
let pyodideInstance = null
let pyodideLoading = null

async function loadPyodideOnce() {
  if (pyodideInstance) return pyodideInstance
  if (pyodideLoading) return pyodideLoading

  pyodideLoading = (async () => {
    // Inject pyodide script if not present
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }
    pyodideInstance = await window.loadPyodide()
    return pyodideInstance
  })()

  return pyodideLoading
}

export default function CodeEditor({ starterCode = '', lessonId, solution = '' }) {
  const [code, setCode] = useState(starterCode)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const [pyReady, setPyReady] = useState(false)
  const [error, setError] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const textareaRef = useRef(null)

  // Pre-load Pyodide in background when component mounts
  useEffect(() => {
    loadPyodideOnce().then(() => setPyReady(true)).catch(console.error)
  }, [])

  // Handle tab key in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newCode = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newCode)
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4
      })
    }
  }

  const runCode = async () => {
    setRunning(true)
    setOutput('')
    setError(null)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    try {
      const pyodide = await loadPyodideOnce()

      // Capture stdout
      let captured = ''
      pyodide.setStdout({ batched: (s) => { captured += s + '\n' } })
      pyodide.setStderr({ batched: (s) => { captured += '❌ ' + s + '\n' } })

      await pyodide.runPythonAsync(code)
      setOutput(captured || '✅ Code ran with no output!')
    } catch (err) {
      setError(err.message)
    } finally {
      setRunning(false)
    }
  }

  const resetCode = () => {
    setCode(starterCode)
    setOutput('')
    setError(null)
    setAttempts(0)
    setShowSolution(false)
  }

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <span className={styles.dots}>
          <span style={{ background: '#FF5F56' }} />
          <span style={{ background: '#FFBD2E' }} />
          <span style={{ background: '#27C93F' }} />
        </span>
        <span className={styles.label}>🐍 Python Editor</span>
        <button onClick={resetCode} className={styles.resetBtn} title="Reset code">↩ Reset</button>
      </div>

      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        placeholder="# Write your Python code here!"
        rows={10}
      />

      <div className={styles.runRow}>
        {!pyReady && (
          <span className={styles.loading}>⚙️ Loading Python engine...</span>
        )}
        <button
          onClick={runCode}
          disabled={running || !pyReady}
          className={`${styles.runBtn} ${running ? styles.running : ''}`}
        >
          {running ? '⏳ Running...' : '▶ Run Code'}
        </button>
        {attempts >= 3 && solution && (
          <button
            onClick={() => setShowSolution(!showSolution)}
            className={styles.solutionBtn}
            title="View solution"
          >
            {showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}
          </button>
        )}
        {attempts > 0 && attempts < 3 && solution && (
          <span className={styles.attemptsHint}>
            🎯 {3 - attempts} attempt{3 - attempts === 1 ? '' : 's'} left for hint
          </span>
        )}
      </div>

      {(output || error) && (
        <div className={`${styles.output} ${error ? styles.outputError : ''}`}>
          <div className={styles.outputLabel}>Output:</div>
          <pre>{error ? `❌ Error:\n${error}` : output}</pre>
        </div>
      )}

      {showSolution && solution && (
        <div className={styles.solutionBox}>
          <div className={styles.solutionLabel}>💡 Solution:</div>
          <pre>{solution}</pre>
        </div>
      )}
    </div>
  )
}
