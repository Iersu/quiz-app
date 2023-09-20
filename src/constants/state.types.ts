export interface QuizStateType {
  numberOfQuestion: number
  numberOfPlayers: number
  questions: never[]
  isQuestionsFetching: boolean
  timer: number
  currentQuestion: number
  answerOrder: number[]
  isRoundFinished: boolean
  playersInformation: {
    name: string
    score: number
  }[]
  // playersAnswers: {
  //   humanPlayer: {
  //     answer: null
  //     answerTime: null
  //   }
  //   autoPlayer1: {
  //     answer: null
  //     answerTime: null
  //   }
  //   autoPlayer2: {
  //     answer: null
  //     answerTime: null
  //   }
  //   autoPlayer3: {
  //     answer: null
  //     answerTime: null
  //   }
  // }
  playersAnswers: any
  winner: any
}
