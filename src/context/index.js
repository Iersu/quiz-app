import { createContext, useContext } from 'react'
import { CONTEXT } from '../constants'

const contexts = {}

export const contextFactory = (contextName) => {
  if (!contexts[contextName]) {
    contexts[contextName] = createContext({})
  }

  return contexts[contextName]
}

export const useQuizContext = () => useContext(contexts[CONTEXT.QUIZ])
