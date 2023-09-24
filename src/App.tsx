import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from './globalStyle'
import { ErrorPage, GamePage, MenuPage, ResultsPage } from './pages'

import useQuiz from './hooks/useQuiz'
import { contextFactory } from './context'

import { CONTEXT, ROUTES } from './constants'
import { ThemeNameType, ThemeType } from './constants/types'

import { theme } from './theme'

function App() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeNameType>('')
  const navigate = useNavigate()
  const quizHookData = useQuiz(navigate)
  const QuizContext = contextFactory(CONTEXT.QUIZ)
  const savedTheme = localStorage.getItem('theme')

  return (
    <QuizContext.Provider value={quizHookData}>
      <ThemeProvider
        theme={
          theme[
            savedTheme
              ? (savedTheme as keyof ThemeType)
              : selectedTheme || 'blue'
          ]
        }
      >
        <GlobalStyles />
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <MenuPage
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
              />
            }
          />
          <Route path={ROUTES.GAME} element={<GamePage />} />
          <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
        </Routes>
      </ThemeProvider>
    </QuizContext.Provider>
  )
}

export default App
