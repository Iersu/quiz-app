import { useCallback, useEffect, useReducer } from 'react'

import { getQuizQuestios } from '../services/questionServices'

import { htmlDecode, shuffleArray } from '../utils'

import { ACTIONS } from '../constants'
import { QuizStateType } from '../constants/state.types'
import { useNavigate } from 'react-router-dom'

const playerAnswersDefaultState = {
  humanPlayer: {
    answer: null,
    answerTIme: null,
  },
  autoPlayer1: {
    answer: null,
    answerTIme: null,
  },
  autoPlayer2: {
    answer: null,
    answerTIme: null,
  },
  autoPlayer3: {
    answer: null,
    answerTIme: null,
  },
}

export const initialState = {
  numberOfQuestion: 0,
  numberOfPlayers: 0,
  questions: [],
  isQuestionsFetching: false,
  timer: 15,
  currentQuestion: 0,
  answerOrder: [0, 1, 2],
  isRoundFinished: false,
  playersInformation: [
    {
      name: 'Human Player',
      score: 0,
      id: 'humanPlayer',
    },
    {
      name: 'Auto Player 1',
      score: 0,
      id: 'autoPlayer1',
    },
    {
      name: 'Auto Player 2',
      score: 0,
      id: 'autoPlayer2',
    },
    {
      name: 'Auto Player 3',
      score: 0,
      id: 'autoPlayer3',
    },
  ],
  playersAnswers: playerAnswersDefaultState,
  winner: null
}

export const reducer = (state: QuizStateType, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_NUMBER_OF_QUESTIONS:
      return {
        ...state,
        numberOfQuestion: action.numberOfQuestion,
      }
    case ACTIONS.SET_NUMBER_OF_PLAYERS:
      return {
        ...state,
        numberOfPlayers: action.numberOfPlayers,
      }
    case ACTIONS.SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      }
    case ACTIONS.SET_ANSWER_ORDER:
      return {
        ...state,
        answerOrder: action.answerOrder,
      }
    case ACTIONS.SET_IS_QUESTIONS_FETCHING:
      return {
        ...state,
        isQuestionsFetching: action.isQuestionsFetching,
      }
    case ACTIONS.SET_TIMER:
      return {
        ...state,
        timer: action.timer,
      }
    case ACTIONS.SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion,
      }
    case ACTIONS.SET_PLAYERS_INFORMATION:
      return {
        ...state,
        playersInformation: action.playersInformation,
      }
    case ACTIONS.SET_HUMAN_PLAYER_ANSWER:
      return {
        ...state,
        playersAnswers: {
          ...state.playersAnswers,
          humanPlayer: {
            answer: action.answer,
            answerTime: action.answerTime,
          },
        },
      }
    case ACTIONS.SET_AUTO_PLAYER1_ANSWER:
      return {
        ...state,
        playersAnswers: {
          ...state.playersAnswers,
          autoPlayer1: {
            answer: action.answer,
            answerTime: action.answerTime,
          },
        },
      }
    case ACTIONS.SET_AUTO_PLAYER2_ANSWER:
      return {
        ...state,
        playersAnswers: {
          ...state.playersAnswers,
          autoPlayer2: {
            answer: action.answer,
            answerTime: action.answerTime,
          },
        },
      }
    case ACTIONS.SET_AUTO_PLAYER3_ANSWER:
      return {
        ...state,
        playersAnswers: {
          ...state.playersAnswers,
          autoPlayer3: {
            answer: action.answer,
            answerTime: action.answerTime,
          },
        },
      }
    case ACTIONS.SET_IS_ROUND_FINISHED:
      return {
        ...state,
        isRoundFinished: action.isRoundFinished,
      }
    case ACTIONS.RESET_PLAYER_ANSWERS:
      return {
        ...state,
        playersAnswers: playerAnswersDefaultState,
      }
    case ACTIONS.GET_THE_WINNER:
      const initialValue: any = {
        name: null,
        score: 0,
        id: null,
      }

      return {
        ...state,
        winner: state.playersInformation.reduce(
          (accumulator: any, currentValue: any) => {
            if (accumulator?.score !== currentValue?.score && accumulator !== null) {
              if (currentValue.score > accumulator.score) {
                return currentValue
              }
              return accumulator
            } else {
              return initialValue
            }
          },
          initialValue
        )
      }
    case ACTIONS.RESET_GAME:
      return initialState
    default:
      return state
  }
}

const useQuiz = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const generateComputerAnswer = (
    setComputerAnswer: (answer: string, answerTIme: number) => void
  ) => {
    const answerChosingInterval = Math.floor(Math.random() * 14)
    const randomAnswerNumber = Math.floor(Math.random() * 3)

    setTimeout(() => {
      setComputerAnswer(
        state.questions[state.currentQuestion].answers[randomAnswerNumber]
          .answer,
        15 - answerChosingInterval
      )
    }, answerChosingInterval * 1000) //answerChosingInterval * maybe fixed
  }

  const setAutoPlayer3Answer = (answer: string, answerTime: number) => {
    dispatch({
      type: ACTIONS.SET_AUTO_PLAYER3_ANSWER,
      answer,
      answerTime,
    })
  }

  const setAutoPlayer2Answer = (answer: string, answerTime: number) => {
    dispatch({
      type: ACTIONS.SET_AUTO_PLAYER2_ANSWER,
      answer,
      answerTime,
    })
  }

  const setAutoPlayer1Answer = (answer: string, answerTime: number) => {
    dispatch({
      type: ACTIONS.SET_AUTO_PLAYER1_ANSWER,
      answer: answer,
      answerTime,
    })
  }

  const setNextQuestion = () => {
    suffleAnswersOrder()
    dispatch({
      type: ACTIONS.SET_CURRENT_QUESTION,
      currentQuestion: state.currentQuestion + 1,
    })
  }

  const setPlayersInfomation = (playersInformation: any) => {
    dispatch({
      type: ACTIONS.SET_PLAYERS_INFORMATION,
      playersInformation,
    })
  }

  const setHumanPlayerAnswer = (answer: string, answerTime: number) => {
    dispatch({
      type: ACTIONS.SET_HUMAN_PLAYER_ANSWER,
      answer,
      answerTime,
    })
  }

  const suffleAnswersOrder = useCallback(() => {
    dispatch({
      type: ACTIONS.SET_ANSWER_ORDER,
      answerOrder: shuffleArray(state.answerOrder),
    })
  }, [])

  const setNumberOfQuestion = useCallback(async (numberOfQuestion: number) => {
    dispatch({
      type: ACTIONS.SET_NUMBER_OF_QUESTIONS,
      numberOfQuestion,
    })
    suffleAnswersOrder()
    dispatch({
      type: ACTIONS.SET_IS_QUESTIONS_FETCHING,
      isQuestionsFetching: true,
    })
    try {
      const quizQuestion = await getQuizQuestios(numberOfQuestion)
      setQuestions(
        quizQuestion.data.results.map((item: any) => ({
          ...item,
          correct_answer: htmlDecode(item.correct_answer),
          question: htmlDecode(item.question),
          answers: [
            {
              answer: htmlDecode(item.correct_answer),
            },
            {
              answer: htmlDecode(item.incorrect_answers[0]),
            },
            {
              answer: htmlDecode(item.incorrect_answers[1]),
            },
          ],
        }))
      )
    } catch (e) {
      console.log(e)
    }

    dispatch({
      type: ACTIONS.SET_IS_QUESTIONS_FETCHING,
      isQuestionsFetching: false,
    })
  }, [])

  const setQuestions = (questions: number) => {
    dispatch({
      type: ACTIONS.SET_QUESTIONS,
      questions,
    })
  }

  const setNumberOfPlayers = useCallback((numberOfPlayers: number) => {
    dispatch({
      type: ACTIONS.SET_NUMBER_OF_PLAYERS,
      numberOfPlayers,
    })
  }, [])

  const setTimer = useCallback((timer: number) => {
    dispatch({
      type: ACTIONS.SET_TIMER,
      timer,
    })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({
      type: ACTIONS.RESET_GAME,
    })
  }, [])

  const autoPlayerAnswerSetters = {
    autoPlayer1: setAutoPlayer1Answer,
    autoPlayer2: setAutoPlayer2Answer,
    autoPlayer3: setAutoPlayer3Answer,
  }

  const findFirstCorrectAnswer = () => {
    const initialValue: any = {
      answer: null,
      answerTime: 0,
      firstAnswerPlayer: null,
    }

    const correctAnswer = state.questions[state.currentQuestion].correct_answer
    return Object.keys(state.playersAnswers).reduce(
      (accumulator, currentValue) => {
        if (
          state.playersAnswers[currentValue].answer === correctAnswer &&
          accumulator.answerTime < state.playersAnswers[currentValue].answerTime
        ) {
          return {
            ...state.playersAnswers[currentValue],
            firstAnswerPlayer: currentValue,
          }
        }
        return accumulator
      },
      initialValue
    )
  }

  const calculatePlayersPoints = () => {
    const correctAnswer = state.questions[state.currentQuestion].correct_answer
    const { firstAnswerPlayer } = findFirstCorrectAnswer()

    setPlayersInfomation(
      state.playersInformation.map((playerInfo: any, index: number) => {
        if (index < state.numberOfPlayers) {
          let finalPoints = 0

          if (state.playersAnswers[playerInfo.id].answer === correctAnswer) {
            if (playerInfo.id === firstAnswerPlayer) {
              finalPoints = 15
            } else {
              finalPoints = 10
            }
          } else if (state.playersAnswers[playerInfo.id].answer === null) {
            finalPoints = -10
          } else {
            finalPoints = -5
          }
          return {
            ...playerInfo,
            score: 10, // score: playerInfo.score + finalPoints
          }
        }
        return playerInfo
      })
    )
  }

  useEffect(() => {
    if (state.numberOfPlayers && state.questions.length) {
      let isRoundFinished =
        Object.values(state.playersAnswers)
          .slice(0, state.numberOfPlayers)
          .every((player: any, index: number) => {
            return player.answer !== null
          }) || state.timer === 0

      isRoundFinished &&
        dispatch({
          type: ACTIONS.SET_IS_ROUND_FINISHED,
          isRoundFinished,
        })

      if (state.timer === 15) {
        Object.values(autoPlayerAnswerSetters).forEach((setter, index) => {
          if (index < state.numberOfPlayers - 1) {
            generateComputerAnswer(setter) // GENEREATE COMPUTER ANSWER
          }
        })
      }

      state.timer > 0 &&
        !isRoundFinished &&
        setTimeout(() => setTimer(state.timer - 1), 1000)

      if (isRoundFinished) {
        calculatePlayersPoints()
        setTimeout(() => {
          if (!((state.currentQuestion + 1) === state.questions.length && isRoundFinished)) {
            dispatch({
              type: ACTIONS.RESET_PLAYER_ANSWERS,
            })
            dispatch({
              type: ACTIONS.SET_IS_ROUND_FINISHED,
              isRoundFinished: false,
            })
            setNextQuestion()
            setTimer(15)
          }
          else {
            dispatch({
              type: ACTIONS.GET_THE_WINNER
            })
          }
        }, 4000) // 4 sec
      }
    }
  }, [state.timer, state.numberOfPlayers, state.questions])

  return {
    ...state,
    setNumberOfQuestion,
    setNumberOfPlayers,
    setTimer,
    setPlayersInfomation,
    setHumanPlayerAnswer,
    setNextQuestion,
    findFirstCorrectAnswer,
    resetGame,
  }
}

export default useQuiz
