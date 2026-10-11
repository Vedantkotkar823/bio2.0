import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/scienceData';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight
} from 'lucide-react';

export const InteractiveQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        margin: '2rem 0',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        background: 'linear-gradient(135deg, rgba(6, 14, 26, 0.95) 0%, rgba(4, 8, 18, 0.98) 100%)',
        position: 'relative'
      }}
      id="interactive-knowledge-check"
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="badge-pill badge-emerald">
            <Award size={13} /> MBA TECH CE ACADEMIC CHALLENGE
          </span>
          <span className="badge-pill badge-cyan">
            Elements of Biology (EOB) Knowledge Check
          </span>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {isCompleted ? 'Quiz Completed' : `Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}`}
        </div>
      </div>

      {!isCompleted ? (
        <div>
          {/* Question Text */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--silk-cyan)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.35rem' }}>
              Topic: {currentQ.category}
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 700, lineHeight: 1.45 }}>
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnBg = 'rgba(255, 255, 255, 0.03)';
              let borderCol = 'var(--border-subtle)';
              let textCol = '#cbd5e1';

              if (isSelected && !isAnswerSubmitted) {
                btnBg = 'rgba(56, 189, 248, 0.15)';
                borderCol = 'var(--silk-cyan)';
                textCol = '#ffffff';
              } else if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnBg = 'rgba(16, 185, 129, 0.2)';
                  borderCol = 'var(--silk-emerald)';
                  textCol = '#34d399';
                } else if (isSelected && !isCorrect) {
                  btnBg = 'rgba(239, 68, 68, 0.2)';
                  borderCol = '#ef4444';
                  textCol = '#f87171';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: btnBg,
                    border: `1px solid ${borderCol}`,
                    color: textCol,
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    cursor: isAnswerSubmitted ? 'default' : 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  aria-pressed={isSelected}
                >
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    border: `1px solid ${borderCol}`,
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                  {isAnswerSubmitted && isCorrect && <CheckCircle2 size={18} color="#10b981" />}
                  {isAnswerSubmitted && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswerSubmitted && (
            <div style={{
              background: selectedOption === currentQ.correctIndex ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${selectedOption === currentQ.correctIndex ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: selectedOption === currentQ.correctIndex ? '#34d399' : '#f87171',
                marginBottom: '0.4rem'
              }}>
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 size={18} /> Correct Analysis!
                  </>
                ) : (
                  <>
                    <XCircle size={18} /> Incorrect Response
                  </>
                )}
              </div>
              <p style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            {!isAnswerSubmitted ? (
              <button
                type="button"
                className="btn-primary"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                style={{ opacity: selectedOption === null ? 0.4 : 1 }}
                id="submit-quiz-answer-btn"
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                className="btn-emerald"
                onClick={handleNextQuestion}
                id="next-quiz-question-btn"
              >
                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                  <>
                    Next Question <ChevronRight size={16} />
                  </>
                ) : (
                  <>
                    View Final Results <Award size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completion Screen */
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '2px solid var(--silk-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
          }}>
            <Award size={32} color="var(--silk-emerald)" />
          </div>

          <h3 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800, marginBottom: '0.35rem' }}>
            Academic Challenge Complete!
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            You scored <strong style={{ color: 'var(--silk-emerald)', fontSize: '1.2rem' }}>{score}</strong> out of {QUIZ_QUESTIONS.length}
          </p>

          <div style={{
            maxWidth: '450px',
            margin: '0 auto 1.75rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.85rem',
            color: '#cbd5e1',
            lineHeight: 1.5
          }}>
            {score === 5 && '🌟 Outstanding Mastery! Perfect score demonstrating comprehensive understanding of spidroin mechanics, genetic engineering, and techno-economics.'}
            {score >= 3 && score < 5 && '✅ Strong Competency! Good grasp of core bioengineering and economic trade-offs in biomaterial scaling.'}
            {score < 3 && '📚 Review the interactive Stress-Strain Analyzer and Gland Anatomy Lightbox to reinforce key biological mechanisms.'}
          </div>

          <button
            type="button"
            className="btn-emerald"
            onClick={handleRestartQuiz}
            id="restart-quiz-btn"
          >
            <RotateCcw size={15} /> Retake Challenge
          </button>
        </div>
      )}
    </div>
  );
};
