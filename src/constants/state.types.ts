import { PlayerInformationType, WinnerType } from './types'

export interface QuizStateType {
  numberOfQuestion: number
  numberOfPlayers: number
  questions: never[]
  isQuestionsFetching: boolean
  timer: number
  currentQuestion: number
  answerOrder: number[]
  isRoundFinished: boolean
  playersInformation: PlayerInformationType[]
  playersAnswers: {
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
  winner: WinnerType
}
