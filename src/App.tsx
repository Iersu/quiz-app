import { useState } from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './globalStyle'

import { GamePage, MenuPage } from './pages'

import { theme } from './theme'
import useQuiz from './hooks/useQuiz'
import { contextFactory } from './context'
import { CONTEXT } from './constants'
import ResultsPage from './pages/ResultsPage'

function App() {
  const [selectedTheme, setSelectedTheme] = useState<'blue' | 'black' | ''>('')
  const quizHookData = useQuiz()
  const QuizContext = contextFactory(CONTEXT.QUIZ)
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <MenuPage
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
      ),
    },
    {
      path: '/game',
      element: (
        <GamePage />
        
      ),
    },
    {
      path: '/results',
      element: (
        <ResultsPage />
        
      ),
    },
  ])

  return (
    <QuizContext.Provider value={quizHookData}>
    <ThemeProvider theme={theme[selectedTheme ? selectedTheme : 'blue']}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
    </QuizContext.Provider>
  )
}

export default App
