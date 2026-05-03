import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { PROBLEMS } from '../data/problems'
import styles from './Arena.module.css'

let pyodideInstance = null
let pyodideLoading = null

async function loadPyodideOnce() {
  if (pyodideInstance) return pyodideInstance
  if (pyodideLoading) return pyodideLoading
  pyodideLoading = (async () => {
    if (!window.loadPyodide) {
      await new Promise((res, rej) => {
        const s = document.createElement('script')
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js'
        s.onload = res; s.onerror = rej
        document.head.appendChild(s)
      })
    }
    pyodideInstance = await window.loadPyodide()
    return pyodideInstance
  })()
  return pyodideLoading
}

const DIFF_COLORS = { easy: styles.easy, medium: styles.medium, hard: styles.hard }
const DIFF_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

export default function Arena() {
  const { user } = useAuth()
  const [problems] = useState(PROBLEMS)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [outputType, setOutputType] = useState('') // ok | err | wrong
  const [running, setRunning] = useState(false)
  const [pyReady, setPyReady] = useState(false)
  const [solved, setSolved] = useState(new Set())
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [justSolved, setJustSolved] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    loadPyodideOnce().then(() => setPyReady(true)).catch(console.error)
    fetchSolved()
  }, [])

  async function fetchSolved() {
    const { data } = await supabase
      .from('arena_solves')
      .select('problem_id')
      .eq('user_id', user.id)
    if (data) setSolved(new Set(data.map(r => r.problem_id)))
  }

  const filtered = problems.filter(p => {
    const matchDiff = filter === 'all' || p.diff === filter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.topic.toLowerCase().includes(search.toLowerCase())
    return matchDiff && matchSearch
  })

  function selectProblem(p) {
    setSelected(p)
    setCode(p.starter)
    setOutput('')
    setOutputType('')
    setShowHint(false)
    setShowSolution(false)
    setJustSolved(false)
    setDrawerOpen(false)
  }

  function handleKeyDown(e) {
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

  async function runCode(submit = false) {
    if (!selected) return
    setRunning(true)
    setOutput('')
    setOutputType('')

    try {
      const pyodide = await loadPyodideOnce()
      let captured = ''
      pyodide.setStdout({ batched: s => { captured += s + '\n' } })
      pyodide.setStderr({ batched: s => { captured += s + '\n' } })

      await pyodide.runPythonAsync(code)
      const trimmed = captured.trim()

      if (submit) {
        const passed = selected.check(trimmed)
        if (passed) {
          setOutput('All tests passed!')
          setOutputType('ok')
          setJustSolved(true)
          if (!solved.has(selected.id)) {
            const newSolved = new Set([...solved, selected.id])
            setSolved(newSolved)
            await supabase.from('arena_solves').upsert({
              user_id: user.id,
              problem_id: selected.id,
              solved_at: new Date().toISOString(),
            })
            await supabase.rpc('add_xp', { user_id: user.id, amount: selected.diff === 'easy' ? 10 : selected.diff === 'medium' ? 20 : 35 })
          }
        } else {
          setOutput(trimmed || '(no output)')
          setOutputType('wrong')
        }
      } else {
        setOutput(trimmed || '(no output)')
        setOutputType(trimmed ? 'run' : '')
      }
    } catch (err) {
      setOutput(err.message)
      setOutputType('err')
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className={styles.arena}>
      {/* Drawer overlay */}
      {drawerOpen && <div className={styles.overlay} onClick={() => setDrawerOpen(false)} />}

      {/* Problem Drawer */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <span>55 Challenges</span>
          <button onClick={() => setDrawerOpen(false)} className={styles.drawerClose}>✕</button>
        </div>

        <div className={styles.drawerSearch}>
          <input
            placeholder="Search problems..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.drawerFilters}>
          {['all', 'easy', 'medium', 'hard'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
            >
              {f === 'all' ? 'All' : f === 'easy' ? 'Easy' : f === 'medium' ? 'Medium' : 'Hard'}
            </button>
          ))}
        </div>

        <div className={styles.drawerStats}>
          <span>{solved.size} solved</span>
          <span>{filtered.length} shown</span>
        </div>

        <div className={styles.probList}>
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => selectProblem(p)}
              className={`${styles.probItem} ${selected?.id === p.id ? styles.probSelected : ''}`}
            >
              <span className={styles.probCheck}>{solved.has(p.id) ? '✓' : ''}</span>
              <div className={styles.probInfo}>
                <div className={styles.probName}>{p.name}</div>
                <div className={styles.probMeta}>
                  <span className={`${styles.diffBadge} ${DIFF_COLORS[p.diff]}`}>{DIFF_LABELS[p.diff]}</span>
                  <span className={styles.probTopic}>{p.topic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className={styles.main}>
        {/* Left: problem description */}
        <div className={styles.descCol}>
          {!selected ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>⚔️</div>
              <p>Select a challenge to begin</p>
              <button onClick={() => setDrawerOpen(true)} className={styles.openDrawerBtn}>
                Browse Challenges
              </button>
            </div>
          ) : (
            <>
              <div className={styles.descHeader}>
                <div className={styles.descNum}>#{selected.id.replace('p', '')}</div>
                <div className={styles.descTitle}>{selected.name}</div>
                <div className={styles.descBadges}>
                  <span className={`${styles.diffBadge} ${DIFF_COLORS[selected.diff]}`}>{DIFF_LABELS[selected.diff]}</span>
                  <span className={styles.topicBadge}>{selected.topic}</span>
                  {solved.has(selected.id) && <span className={styles.solvedBadge}>Solved</span>}
                </div>
              </div>

              <div className={styles.descSection}>
                <div className={styles.sectionLabel}>Problem</div>
                <p className={styles.descText}>{selected.desc}</p>
              </div>

              <div className={styles.descSection}>
                <div className={styles.sectionLabel}>Expected Output</div>
                <pre className={styles.sampleBox}>{selected.sample}</pre>
              </div>

              {selected.concepts?.length > 0 && (
                <div className={styles.descSection}>
                  <div className={styles.sectionLabel}>Concepts</div>
                  <div className={styles.pills}>
                    {selected.concepts.map(c => <span key={c} className={styles.pill}>{c}</span>)}
                  </div>
                </div>
              )}

              {showHint && (
                <div className={styles.hintBox}>
                  <strong>Hint:</strong> {selected.hint}
                </div>
              )}

              {showSolution && (
                <div className={styles.solutionBox}>
                  <div className={styles.solutionLabel}>Solution</div>
                  <pre className={styles.solutionCode}>{selected.solution}</pre>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: editor */}
        <div className={styles.editorCol}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.tbLeft}>
              <button onClick={() => setDrawerOpen(true)} className={styles.listBtn}>
                ☰ Problems
              </button>
              <span className={styles.langBadge}>Python</span>
              <span className={`${styles.pyStatus} ${!pyReady ? styles.pyLoading : ''}`}>
                {pyReady ? 'Ready' : 'Loading Python...'}
              </span>
            </div>
            <div className={styles.tbRight}>
              {selected && (
                <>
                  <button onClick={() => { setShowHint(h => !h); setShowSolution(false) }} className={styles.tbBtn}>
                    {showHint ? 'Hide Hint' : 'Hint'}
                  </button>
                  <button onClick={() => { setShowSolution(s => !s); setShowHint(false) }} className={styles.tbBtn}>
                    {showSolution ? 'Hide Solution' : 'Solution'}
                  </button>
                  <button onClick={() => { setCode(selected.starter); setOutput(''); setOutputType('') }} className={styles.tbBtn}>
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Code area */}
          <textarea
            ref={textareaRef}
            className={styles.codeArea}
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            placeholder="# Select a problem to start coding..."
            disabled={!selected}
          />

          {/* Feedback */}
          {outputType === 'ok' && (
            <div className={`${styles.feedback} ${styles.feedbackOk}`}>
              {justSolved && !solved.has(selected?.id) ? '🎉 Correct! Problem solved!' : '✓ All tests passed!'}
            </div>
          )}
          {outputType === 'wrong' && (
            <div className={`${styles.feedback} ${styles.feedbackWrong}`}>
              ✗ Output doesn't match expected. Check your logic.
            </div>
          )}
          {outputType === 'err' && (
            <div className={`${styles.feedback} ${styles.feedbackErr}`}>
              Error in your code — check the output below.
            </div>
          )}

          {/* Output + buttons */}
          <div className={styles.bottom}>
            <div className={styles.outputZone}>
              <div className={styles.outputBar}>
                <span className={styles.outputLabel}>Output</span>
                <button onClick={() => { setOutput(''); setOutputType('') }} className={styles.clearBtn}>Clear</button>
              </div>
              <pre className={`${styles.outputBox} ${outputType === 'err' ? styles.outputErr : outputType === 'ok' ? styles.outputOk : ''}`}>
                {output || ' '}
              </pre>
            </div>

            <div className={styles.actionCol}>
              <button
                onClick={() => runCode(false)}
                disabled={running || !pyReady || !selected}
                className={`${styles.actionBtn} ${styles.runBtn}`}
              >
                {running ? '...' : '▶ Run'}
              </button>
              <button
                onClick={() => runCode(true)}
                disabled={running || !pyReady || !selected}
                className={`${styles.actionBtn} ${styles.submitBtn}`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
