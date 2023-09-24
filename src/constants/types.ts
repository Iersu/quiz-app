import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface PlayerAnswerType {
  answer: string | null
  answerTime: number | null
}

export interface PlayerAnswersType {
  humanPlayer: {
    answer: null | string
    answerTime: null | number
  }
  autoPlayer1: {
    answer: null | string
    answerTime: null | number
  }
  autoPlayer2: {
    answer: null | string
    answerTime: null | number
  }
  autoPlayer3: {
    answer: null | string
    answerTime: null | number
  }
}
// export interface PlayerAnswersType {
//   [key: string]: {
//     answer: string
//     answerTime: number
//   }
// }

export interface PlayerNames {
  humanPlayer: 'humanPlayer'
  autoPlayer1: 'autoPlayer1'
  autoPlayer2: 'autoPlayer2'
  autoPlayer3: 'autoPlayer3'
}

export interface PlayerInformationType {
  name: string
  score: number
  id: 'humanPlayer' | 'autoPlayer1' | 'autoPlayer2' | 'autoPlayer3' | ''
}

export interface WinnerType {
  name: null | string
  score: null | number
  id: null | string
}

export interface ThemeType {
  blue: {
    bgImage: string
    colors: {
      ctrl: string
      accentColor: string
      borderColor: string
    }
  }
  red: {
    bgImage: string
    colors: {
      ctrl: string
      accentColor: string
      borderColor: string
    }
  }
  purple: {
    bgImage: string
    colors: {
      ctrl: string
      accentColor: string
      borderColor: string
    }
  }
}

export interface SelectProps {
  children: ReactNode
}

export interface QuestionResponseType {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export interface ThemeProps {
  selectedTheme: string
  setSelectedTheme: Dispatch<SetStateAction<'' | 'blue' | 'red' | 'purple'>>
}

export type ThemeNameType = 'blue' | 'red' | 'purple' | ''
