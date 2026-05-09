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
const DIFF_LABELS  = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
const XP_VALUES    = { easy: 10, medium: 20, hard: 35 }
const MAX_TRIES_FOR_SOLUTION = 3

export default function Arena() {
  const { user } = useAuth()
  const [filter, setFilter]           = useState('all')
  const [search, setSearch]           = useState('')
  const [selected, setSelected]       = useState(null)
  const [code, setCode]               = useState('')
  const [output, setOutput]           = useState('')
  const [outputType, setOutputType]   = useState('')   // ok | err | wrong | run
  const [running, setRunning]         = useState(false)
  const [pyReady, setPyReady]         = useState(false)
  const [solved, setSolved]           = useState(new Set())
  const [tries, setTries]             = useState(0)    // submit attempts on current problem
  const [showSolution, setShowSolution] = useState(false)
  const [showHint, setShowHint]       = useState(false)
  const [drawerOpen, setDrawerOpen]   = useState(true)
  const textareaRef = useRef(null)

  useEffect(() => {
    loadPyodideOnce().then(() => setPyReady(true)).catch(console.error)
    fetchSolved()
  }, [])

  async function fetchSolved() {
    const { data } = await supabase
      .from('arena_solves').select('problem_id').eq('user_id', user.id)
    if (data) setSolved(new Set(data.map(r => r.problem_id)))
  }

  const filtered = PROBLEMS.filter(p => {
    const matchDiff   = filter === 'all' || p.diff === filter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.topic.toLowerCase().includes(search.toLowerCase())
    return matchDiff && matchSearch
  })

  function selectProblem(p) {
    setSelected(p)
    setCode(p.starter)
    setOutput('')
    setOutputType('')
    setTries(0)
    setShowSolution(false)
    setShowHint(false)
    setDrawerOpen(false)
  }

  // ── Tab / indentation handling ──────────────────────────
  function handleKeyDown(e) {
    const ta = textareaRef.current
    if (!ta) return

    if (e.key === 'Tab') {
      e.preventDefault()
      const start = ta.selectionStart
      const end   = ta.selectionEnd
      const val   = ta.value

      if (e.shiftKey) {
        // Shift+Tab: remove up to 4 leading spaces from current line
        const lineStart = val.lastIndexOf('\n', start - 1) + 1
        const line      = val.slice(lineStart)
        const spaces    = line.match(/^ {1,4}/)?.[0] ?? ''
        if (spaces) {
          const newVal = val.slice(0, lineStart) + val.slice(lineStart + spaces.length)
          setCode(newVal)
          requestAnimationFrame(() => {
            ta.selectionStart = ta.selectionEnd = start - spaces.length
          })
        }
      } else {
        // Tab: insert 4 spaces
        const newVal = val.slice(0, start) + '    ' + val.slice(end)
        setCode(newVal)
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 4
        })
      }
      return
    }

    // Enter: auto-indent to match current line's indentation
    if (e.key === 'Enter') {
      e.preventDefault()
      const start     = ta.selectionStart
      const val       = ta.value
      const lineStart = val.lastIndexOf('\n', start - 1) + 1
      const line      = val.slice(lineStart, start)
      const indent    = line.match(/^(\s*)/)[1]
      // If line ends with colon, add an extra level
      const extra     = line.trimEnd().endsWith(':') ? '    ' : ''
      const insert    = '\n' + indent + extra
      const newVal    = val.slice(0, start) + insert + val.slice(ta.selectionEnd)
      setCode(newVal)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + insert.length
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
        const newTries = tries + 1
        setTries(newTries)

        const passed = selected.check(trimmed)
        if (passed) {
          setOutputType('ok')
          setOutput('All tests passed!')
          if (!solved.has(selected.id)) {
            setSolved(prev => new Set([...prev, selected.id]))
            await supabase.from('arena_solves').upsert({
              user_id: user.id,
              problem_id: selected.id,
              solved_at: new Date().toISOString(),
            })
            await supabase.rpc('add_xp', {
              user_id: user.id,
              amount: XP_VALUES[selected.diff] ?? 10,
            })
          }
        } else {
          setOutputType('wrong')
          setOutput(trimmed || '(no output)')
        }
      } else {
        setOutput(trimmed || '(no output)')
        setOutputType('run')
      }
    } catch (err) {
      setOutput(err.message)
      setOutputType('err')
    } finally {
      setRunning(false)
    }
  }

  const canSeeSolution = tries >= MAX_TRIES_FOR_SOLUTION
  const isSolved       = selected && solved.has(selected.id)

  const easyCount   = PROBLEMS.filter(p => p.diff === 'easy').length
  const mediumCount = PROBLEMS.filter(p => p.diff === 'medium').length
  const hardCount   = PROBLEMS.filter(p => p.diff === 'hard').length

  return (
    <div className={styles.arena}>
      {drawerOpen && <div className={styles.overlay} onClick={() => setDrawerOpen(false)} />}

      {/* ── Problem Drawer ───────────────────────────────── */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <span>{PROBLEMS.length} Challenges</span>
          <button onClick={() => setDrawerOpen(false)} className={styles.drawerClose}>✕</button>
        </div>

        {/* Stats row */}
        <div className={styles.diffStats}>
          <span className={styles.easyTag}>Easy {easyCount}</span>
          <span className={styles.mediumTag}>Med {mediumCount}</span>
          <span className={styles.hardTag}>Hard {hardCount}</span>
        </div>

        <div className={styles.drawerSearch}>
          <input
            placeholder="Search problems or topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.drawerFilters}>
          {['all','easy','medium','hard'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.drawerMeta}>
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
              <span className={`${styles.probCheck} ${solved.has(p.id) ? styles.probCheckDone : ''}`}>
                {solved.has(p.id) ? '✓' : ''}
              </span>
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

      {/* ── Main ─────────────────────────────────────────── */}
      <div className={styles.main}>

        {/* Left: problem description */}
        <div className={styles.descCol}>
          {!selected ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>⚔️</div>
              <p>Pick a challenge to start coding</p>
              <button onClick={() => setDrawerOpen(true)} className={styles.openDrawerBtn}>
                Browse Challenges
              </button>
            </div>
          ) : (
            <>
              <div className={styles.descHeader}>
                <div className={styles.descNum}>#{selected.id}</div>
                <div className={styles.descTitle}>{selected.name}</div>
                <div className={styles.descBadges}>
                  <span className={`${styles.diffBadge} ${DIFF_COLORS[selected.diff]}`}>{DIFF_LABELS[selected.diff]}</span>
                  <span className={styles.topicBadge}>{selected.topic}</span>
                  {isSolved && <span className={styles.solvedBadge}>Solved</span>}
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

              {/* Hint — always available */}
              <div className={styles.descSection}>
                <button
                  onClick={() => setShowHint(h => !h)}
                  className={styles.hintToggle}
                >
                  {showHint ? 'Hide Hint ▲' : 'Show Hint ▼'}
                </button>
                {showHint && (
                  <div className={styles.hintBox}>{selected.hint}</div>
                )}
              </div>

              {/* Solution — locked until 3 failed submits */}
              <div className={styles.descSection}>
                {canSeeSolution ? (
                  <>
                    <button
                      onClick={() => setShowSolution(s => !s)}
                      className={styles.solutionToggle}
                    >
                      {showSolution ? 'Hide Solution ▲' : 'View Solution ▼'}
                    </button>
                    {showSolution && (
                      <div className={styles.solutionBox}>
                        <pre className={styles.solutionCode}>{selected.solution}</pre>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.solutionLocked}>
                    🔒 Solution unlocks after {MAX_TRIES_FOR_SOLUTION} attempts
                    {tries > 0 && (
                      <span className={styles.triesLeft}>
                        {' '}({MAX_TRIES_FOR_SOLUTION - tries} left)
                      </span>
                    )}
                  </div>
                )}
              </div>
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
                {pyReady ? '● Ready' : '● Loading...'}
              </span>
            </div>
            <div className={styles.tbRight}>
              {selected && (
                <>
                  {tries > 0 && !isSolved && (
                    <span className={styles.tryCounter}>
                      {tries}/{MAX_TRIES_FOR_SOLUTION} attempts
                    </span>
                  )}
                  <button
                    onClick={() => { setCode(selected.starter); setOutput(''); setOutputType(''); setTries(0); setShowSolution(false) }}
                    className={styles.tbBtn}
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Code editor */}
          <textarea
            ref={textareaRef}
            className={styles.codeArea}
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="# Select a problem to start coding..."
            disabled={!selected}
          />

          {/* Feedback strip */}
          {outputType === 'ok' && (
            <div className={`${styles.feedback} ${styles.feedbackOk}`}>
              ✓ Correct! {!isSolved ? `+${XP_VALUES[selected?.diff] ?? 10} XP earned` : 'Already solved'}
            </div>
          )}
          {outputType === 'wrong' && (
            <div className={`${styles.feedback} ${styles.feedbackWrong}`}>
              ✗ Output doesn't match.
              {!canSeeSolution && ` ${MAX_TRIES_FOR_SOLUTION - tries} attempt${MAX_TRIES_FOR_SOLUTION - tries !== 1 ? 's' : ''} until solution unlocks.`}
              {canSeeSolution && ' Solution is now unlocked in the left panel.'}
            </div>
          )}
          {outputType === 'err' && (
            <div className={`${styles.feedback} ${styles.feedbackErr}`}>
              ✗ Error — check output below.
            </div>
          )}

          {/* Output + action buttons */}
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
