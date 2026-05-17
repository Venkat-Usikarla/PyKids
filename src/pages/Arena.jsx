import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { PROBLEMS } from '../data/problems'
import styles from './Arena.module.css'

let pyodideInstance = null
let pyodideLoading  = null

async function loadPyodideOnce() {
  if (pyodideInstance) return pyodideInstance
  if (pyodideLoading)  return pyodideLoading
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

const DIFF_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
const XP_VALUE   = { easy: 10, medium: 20, hard: 35 }
const SOLUTION_AFTER_TRIES = 3
const DEMO_PROBLEM_LIMIT   = 15   // demo sees first 15 problems locked beyond

export default function Arena() {
  const { user, isDemo } = useAuth()

  const [filter,       setFilter]       = useState('all')
  const [search,       setSearch]       = useState('')
  const [selected,     setSelected]     = useState(null)
  const [code,         setCode]         = useState('')
  const [output,       setOutput]       = useState('')
  const [outputType,   setOutputType]   = useState('')
  const [running,      setRunning]      = useState(false)
  const [pyReady,      setPyReady]      = useState(false)
  const [solved,       setSolved]       = useState(new Set())
  const [tries,        setTries]        = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [showHint,     setShowHint]     = useState(false)
  const [sideOpen,     setSideOpen]     = useState(true)
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

  const isProblemLocked = (idx) => isDemo && idx >= DEMO_PROBLEM_LIMIT

  const filtered = PROBLEMS.filter(p => {
    const matchDiff   = filter === 'all' || p.diff === filter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.topic.toLowerCase().includes(search.toLowerCase())
    return matchDiff && matchSearch
  })

  function selectProblem(p, idx) {
    if (isProblemLocked(PROBLEMS.indexOf(p))) return
    setSelected(p)
    setCode(p.starter)
    setOutput('')
    setOutputType('')
    setTries(0)
    setShowSolution(false)
    setShowHint(false)
  }

  // ── Indentation ──────────────────────────────────────
  function handleKeyDown(e) {
    const ta = textareaRef.current
    if (!ta) return

    if (e.key === 'Tab') {
      e.preventDefault()
      const start = ta.selectionStart
      const end   = ta.selectionEnd
      const val   = ta.value

      if (e.shiftKey) {
        const lineStart = val.lastIndexOf('\n', start - 1) + 1
        const spaces    = val.slice(lineStart).match(/^ {1,4}/)?.[0] ?? ''
        if (spaces) {
          const newVal = val.slice(0, lineStart) + val.slice(lineStart + spaces.length)
          setCode(newVal)
          requestAnimationFrame(() => {
            ta.selectionStart = ta.selectionEnd = start - spaces.length
          })
        }
      } else {
        const newVal = val.slice(0, start) + '    ' + val.slice(end)
        setCode(newVal)
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 4
        })
      }
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const start     = ta.selectionStart
      const val       = ta.value
      const lineStart = val.lastIndexOf('\n', start - 1) + 1
      const line      = val.slice(lineStart, start)
      const indent    = line.match(/^(\s*)/)[1]
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
        if (selected.check(trimmed)) {
          setOutputType('ok')
          setOutput('All tests passed!')
          if (!solved.has(selected.id)) {
            setSolved(prev => new Set([...prev, selected.id]))
            await supabase.from('arena_solves').upsert({
              user_id: user.id, problem_id: selected.id,
              solved_at: new Date().toISOString(),
            })
            await supabase.rpc('add_xp', {
              user_id: user.id, amount: XP_VALUE[selected.diff] ?? 10,
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

  const canSeeSolution = tries >= SOLUTION_AFTER_TRIES
  const isSolved       = selected && solved.has(selected.id)

  const counts = {
    easy:   PROBLEMS.filter(p => p.diff === 'easy').length,
    medium: PROBLEMS.filter(p => p.diff === 'medium').length,
    hard:   PROBLEMS.filter(p => p.diff === 'hard').length,
  }

  return (
    <div className={styles.arena}>

      {/* ── Side panel ─────────────────────────────────── */}
      <aside className={`${styles.side} ${sideOpen ? styles.sideOpen : styles.sideClosed}`}>

        <div className={styles.sideHead}>
          <span className={styles.sideTitle}>Challenges</span>
          <button onClick={() => setSideOpen(false)} className={styles.sideCollapseBtn} title="Collapse">‹</button>
        </div>

        <div className={styles.diffRow}>
          <span className={styles.diffEasy}>{counts.easy} Easy</span>
          <span className={styles.diffMedium}>{counts.medium} Med</span>
          <span className={styles.diffHard}>{counts.hard} Hard</span>
        </div>

        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterRow}>
          {['all','easy','medium','hard'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterChip} ${filter === f ? styles.filterActive : ''} ${f !== 'all' ? styles[`filter_${f}`] : ''}`}
            >
              {f === 'all' ? 'All' : DIFF_LABEL[f]}
            </button>
          ))}
        </div>

        <div className={styles.probMeta}>
          <span>{solved.size} solved</span>
          <span>{filtered.length} shown</span>
        </div>

        <div className={styles.probList}>
          {filtered.map((p) => {
            const globalIdx = PROBLEMS.indexOf(p)
            const locked    = isProblemLocked(globalIdx)
            const done      = solved.has(p.id)
            const active    = selected?.id === p.id
            return (
              <div
                key={p.id}
                onClick={() => selectProblem(p, globalIdx)}
                className={`
                  ${styles.probRow}
                  ${active  ? styles.probActive  : ''}
                  ${locked  ? styles.probLocked  : ''}
                  ${done    ? styles.probDone    : ''}
                `}
              >
                <span className={styles.probStatus}>
                  {locked ? '🔒' : done ? <span className={styles.checkMark}>✓</span> : ''}
                </span>
                <div className={styles.probInfo}>
                  <span className={styles.probName}>{p.name}</span>
                  <span className={styles.probSub}>{p.topic}</span>
                </div>
                <span className={`${styles.diffPip} ${styles[`pip_${p.diff}`]}`} />
              </div>
            )
          })}
        </div>

        {isDemo && (
          <div className={styles.demoBanner}>
            <span className={styles.demoBannerIcon}>🔒</span>
            <div>
              <strong>Demo Access</strong>
              <p>First {DEMO_PROBLEM_LIMIT} problems unlocked.</p>
            </div>
          </div>
        )}
      </aside>

      {/* Collapsed sidebar tab */}
      {!sideOpen && (
        <button onClick={() => setSideOpen(true)} className={styles.expandTab}>
          ☰
        </button>
      )}

      {/* ── Editor panel ───────────────────────────────── */}
      <div className={styles.editorPanel}>

        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.topLeft}>
            {selected ? (
              <>
                <span className={styles.topTitle}>{selected.name}</span>
                <span className={`${styles.topDiff} ${styles[`topDiff_${selected.diff}`]}`}>
                  {DIFF_LABEL[selected.diff]}
                </span>
                {isSolved && <span className={styles.topSolved}>Solved</span>}
              </>
            ) : (
              <span className={styles.topPlaceholder}>Select a problem</span>
            )}
          </div>
          <div className={styles.topRight}>
            <span className={`${styles.pyDot} ${pyReady ? styles.pyDotOn : ''}`} />
            <span className={styles.pyLabel}>{pyReady ? 'Python Ready' : 'Loading Python...'}</span>
            {selected && (
              <>
                {tries > 0 && !isSolved && (
                  <span className={styles.attemptsChip}>
                    {tries}/{SOLUTION_AFTER_TRIES} attempts
                  </span>
                )}
                <button
                  className={styles.resetBtn}
                  onClick={() => { setCode(selected.starter); setOutput(''); setOutputType(''); setTries(0); setShowSolution(false) }}
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main split: code | info */}
        <div className={styles.workArea}>

          {/* Code + output */}
          <div className={styles.codeCol}>
            <textarea
              ref={textareaRef}
              className={styles.codeArea}
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              disabled={!selected}
              placeholder="// Select a problem from the panel to begin"
            />

            {/* Status strip */}
            {outputType && (
              <div className={`${styles.statusStrip} ${styles[`status_${outputType}`]}`}>
                {outputType === 'ok'    && `✓ Correct!${!isSolved ? ` +${XP_VALUE[selected?.diff]} XP` : ''}`}
                {outputType === 'wrong' && `✗ Output doesn't match.${canSeeSolution ? ' Solution unlocked ↗' : ` ${SOLUTION_AFTER_TRIES - tries} attempt${SOLUTION_AFTER_TRIES - tries !== 1 ? 's' : ''} until solution unlocks.`}`}
                {outputType === 'err'   && '✗ Runtime error — see output below.'}
                {outputType === 'run'   && '▶ Ran successfully.'}
              </div>
            )}

            {/* Output pane */}
            <div className={styles.outputPane}>
              <div className={styles.outputHeader}>
                <span>Output</span>
                <button className={styles.clearBtn} onClick={() => { setOutput(''); setOutputType('') }}>Clear</button>
              </div>
              <pre className={`${styles.outputContent} ${outputType === 'err' ? styles.outputErr : outputType === 'ok' ? styles.outputOk : ''}`}>
                {output || ''}
              </pre>
            </div>

            {/* Run / Submit */}
            <div className={styles.actionBar}>
              <button
                onClick={() => runCode(false)}
                disabled={running || !pyReady || !selected}
                className={`${styles.actionBtn} ${styles.runBtn}`}
              >
                {running ? '●●●' : '▶ Run'}
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

          {/* Info col: description, hint, solution */}
          <div className={styles.infoCol}>
            {!selected ? (
              <div className={styles.emptyInfo}>
                <div className={styles.emptyGlyph}>⚔️</div>
                <p>Choose a challenge from the left panel to begin.</p>
              </div>
            ) : (
              <>
                <div className={styles.infoSection}>
                  <div className={styles.infoLabel}>Problem</div>
                  <p className={styles.infoDesc}>{selected.desc}</p>
                </div>

                <div className={styles.infoSection}>
                  <div className={styles.infoLabel}>Expected Output</div>
                  <pre className={styles.sampleBox}>{selected.sample}</pre>
                </div>

                {selected.concepts?.length > 0 && (
                  <div className={styles.infoSection}>
                    <div className={styles.infoLabel}>Topics</div>
                    <div className={styles.pills}>
                      {selected.concepts.map(c => (
                        <span key={c} className={styles.pill}>{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hint */}
                <div className={styles.infoSection}>
                  <button className={styles.toggleBtn} onClick={() => setShowHint(h => !h)}>
                    {showHint ? '▲ Hide Hint' : '▼ Show Hint'}
                  </button>
                  {showHint && (
                    <div className={styles.hintBox}>{selected.hint}</div>
                  )}
                </div>

                {/* Solution */}
                <div className={styles.infoSection}>
                  {canSeeSolution ? (
                    <>
                      <button className={`${styles.toggleBtn} ${styles.toggleSolution}`} onClick={() => setShowSolution(s => !s)}>
                        {showSolution ? '▲ Hide Solution' : '▼ View Solution'}
                      </button>
                      {showSolution && (
                        <pre className={styles.solutionBox}>{selected.solution}</pre>
                      )}
                    </>
                  ) : (
                    <div className={styles.solutionLock}>
                      🔒 Solution unlocks after {SOLUTION_AFTER_TRIES} attempts
                      {tries > 0 && (
                        <span className={styles.locksIn}> — {SOLUTION_AFTER_TRIES - tries} left</span>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
