import { useCallback, useEffect, useReducer } from 'react'

import { getQuizQuestios } from '../services/questionServices'

import { htmlDecode, shuffleArray } from '../utils'

import { ACTIONS } from '../constants'
import { QuizStateType } from '../constants/state.types'
import {
  PlayerAnswerType,
  PlayerAnswersType,
  PlayerInformationType,
  QuestionResponseType,
  WinnerType,
} from '../constants/types'
import { NavigateFunction } from 'react-router-dom'

const playerAnswersDefaultState: PlayerAnswersType = {
  humanPlayer: {
    answer: null,
    answerTime: null,
  },
  autoPlayer1: {
    answer: null,
    answerTime: null,
  },
  autoPlayer2: {
    answer: null,
    answerTime: null,
  },
  autoPlayer3: {
    answer: null,
    answerTime: null,
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
  winner: {
    name: null,
    score: 0,
    id: null,
  },
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
      const initialValue: WinnerType = {
        name: '',
        score: 0,
        id: '',
      }

      return {
        ...state,
        winner: state.playersInformation.reduce((accumulator, currentValue) => {
          if (accumulator.score !== currentValue.score) {
            if (currentValue.score > accumulator.score) {
              return currentValue
            }
            return accumulator
          } else {
            return { ...currentValue, name: '' }
          }
        }, initialValue),
      }
    case ACTIONS.RESET_GAME:
      return initialState
    default:
      return state
  }
}

const useQuiz = (navigate: NavigateFunction) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const generateComputerAnswer = useCallback(
    (setComputerAnswer: (answer: string, answerTIme: number) => void) => {
      const answerChosingInterval = Math.floor(Math.random() * 12) + 1
      const randomAnswerNumber = Math.floor(Math.random() * 3)

      setTimeout(() => {
        setComputerAnswer(
          state.questions[state.currentQuestion].answers[randomAnswerNumber]
            .answer,
          answerChosingInterval
        )
      }, (15 - answerChosingInterval) * 1000)
    },
    [state.currentQuestion, state.questions]
  )

  const setAutoPlayer3Answer = useCallback(
    (answer: string, answerTime: number) => {
      dispatch({
        type: ACTIONS.SET_AUTO_PLAYER3_ANSWER,
        answer,
        answerTime,
      })
    },
    []
  )
  if (state.timer === 1 || state.isRoundFinished)
    console.log(state.playersAnswers)

  const setAutoPlayer2Answer = useCallback(
    (answer: string, answerTime: number) => {
      dispatch({
        type: ACTIONS.SET_AUTO_PLAYER2_ANSWER,
        answer,
        answerTime,
      })
    },
    []
  )

  const setAutoPlayer1Answer = useCallback(
    (answer: string, answerTime: number) => {
      dispatch({
        type: ACTIONS.SET_AUTO_PLAYER1_ANSWER,
        answer: answer,
        answerTime,
      })
    },
    []
  )

  const setNextQuestion = useCallback(() => {
    suffleAnswersOrder()
    dispatch({
      type: ACTIONS.SET_CURRENT_QUESTION,
      currentQuestion: state.currentQuestion + 1,
    })
    //suffleAnswersOrder will never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentQuestion])

  const setPlayersInfomation = useCallback(
    (playersInformation: PlayerInformationType) => {
      dispatch({
        type: ACTIONS.SET_PLAYERS_INFORMATION,
        playersInformation,
      })
    },
    []
  )

  const setHumanPlayerAnswer = useCallback(
    (answer: string, answerTime: number) => {
      dispatch({
        type: ACTIONS.SET_HUMAN_PLAYER_ANSWER,
        answer,
        answerTime,
      })
    },
    []
  )

  const suffleAnswersOrder = useCallback(() => {
    dispatch({
      type: ACTIONS.SET_ANSWER_ORDER,
      answerOrder: shuffleArray(state.answerOrder),
    })
  }, [state.answerOrder])

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
      const quizQuestions = await getQuizQuestios(numberOfQuestion)
      setQuestions(
        quizQuestions.data.results.map(
          (quizQuestion: QuestionResponseType) => ({
            ...quizQuestion,
            correct_answer: htmlDecode(quizQuestion.correct_answer),
            question: htmlDecode(quizQuestion.question),
            answers: [
              {
                answer: htmlDecode(quizQuestion.correct_answer),
              },
              {
                answer: htmlDecode(quizQuestion.incorrect_answers[0]),
              },
              {
                answer: htmlDecode(quizQuestion.incorrect_answers[1]),
              },
            ],
          })
        )
      )
    } catch {
      navigate('/error')
    }

    dispatch({
      type: ACTIONS.SET_IS_QUESTIONS_FETCHING,
      isQuestionsFetching: false,
    })
    //suffleAnswersOrder will never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setQuestions = useCallback((questions: number) => {
    dispatch({
      type: ACTIONS.SET_QUESTIONS,
      questions,
    })
  }, [])

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
    const initialValue = {
      answer: '',
      answerTime: 0,
      firstAnswerPlayer: '',
    }

    const correctAnswer = state.questions[state.currentQuestion].correct_answer
    return Object.keys(state.playersAnswers).reduce(
      (accumulator, currentValue) => {
        if (
          state.playersAnswers[currentValue as keyof PlayerAnswersType]
            .answer === correctAnswer &&
          accumulator.answerTime <
            state.playersAnswers[currentValue as keyof PlayerAnswersType]
              .answerTime
        ) {
          return {
            ...state.playersAnswers[currentValue as keyof PlayerAnswersType],
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
      state.playersInformation.map(
        (playerInfo: PlayerInformationType, index: number) => {
          if (index < state.numberOfPlayers && playerInfo.id) {
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
              score: playerInfo.score + finalPoints,
            }
          }
          return playerInfo
        }
      )
    )
  }

  useEffect(() => {
    let timer1: NodeJS.Timeout
    let timer2: NodeJS.Timeout

    if (state.numberOfPlayers && state.questions.length) {
      if (state.timer === 15) {
        Object.values(autoPlayerAnswerSetters).forEach((setter, index) => {
          if (index < state.numberOfPlayers - 1) {
            generateComputerAnswer(setter)
          }
        })
      }

      let isRoundFinished =
        Object.values(state.playersAnswers as PlayerAnswersType)
          .slice(0, state.numberOfPlayers)
          .every((player: PlayerAnswerType) => {
            return player.answer !== null
          }) || state.timer === 0

      isRoundFinished &&
        dispatch({
          type: ACTIONS.SET_IS_ROUND_FINISHED,
          isRoundFinished,
        })

      if (state.timer > 0 && !isRoundFinished) {
        timer1 = setTimeout(() => setTimer(state.timer - 1), 1000)
      }
      if (isRoundFinished) {
        calculatePlayersPoints()
        timer2 = setTimeout(() => {
          if (
            !(
              state.currentQuestion + 1 === state.questions.length &&
              isRoundFinished
            )
          ) {
            dispatch({
              type: ACTIONS.RESET_PLAYER_ANSWERS,
            })
            dispatch({
              type: ACTIONS.SET_IS_ROUND_FINISHED,
              isRoundFinished: false,
            })
            setNextQuestion()
            setTimer(15)
          } else {
            dispatch({
              type: ACTIONS.GET_THE_WINNER,
            })
            navigate('/results')
          }
        }, 4000)
      }
    }

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
    // disabled because no need to add any setter, they will not change
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
