export const ACTIONS = {
  SET_NUMBER_OF_PLAYERS: 'SET_NUMBER_OF_PLAYERS',
  SET_NUMBER_OF_QUESTIONS: 'SET_NUMBER_OF_QUESTIONS',
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_ANSWER_ORDER: 'SET_ANSWER_ORDER',
  SET_IS_QUESTIONS_FETCHING: 'SET_IS_QUESTIONS_FETCHING',
  SET_TIMER: 'SET_TIMER',
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION',
  SET_PLAYERS_INFORMATION: 'SET_PLAYERS_INFORMATION',
  SET_HUMAN_PLAYER_ANSWER: 'SET_HUMAN_PLAYER_ANSWER',
  SET_AUTO_PLAYER1_ANSWER: 'SET_AUTO_PLAYER1_ANSWER',
  SET_AUTO_PLAYER2_ANSWER: 'SET_AUTO_PLAYER2_ANSWER',
  SET_AUTO_PLAYER3_ANSWER: 'SET_AUTO_PLAYER3_ANSWER',
  SET_IS_ROUND_FINISHED: 'SET_IS_ROUND_FINISHED',
  RESET_PLAYER_ANSWERS: 'RESET_PLAYER_ANSWERS',
  GET_THE_WINNER: 'GET_THE_WINNER',
  RESET_GAME: 'RESET_GAME',
}

export const CONTEXT = {
  QUIZ: 'QUIZ',
}

export const ROUTES = {
  HOME: '/',
  GAME: '/game',
  RESULTS: '/results',
  ERROR: '/error',
}

export const ICONS = {
  timer: {
    link: '/assets/svgs/timer-20.svg',
    alt: 'Stopwatch',
  },
  spinner: {
    link: '/assets/svgs/loading-loop.svg',
    alt: 'Spinner',
  },
  checkMark: {
    link: '/assets/svgs/checkmark.svg',
    alt: 'Checkmark',
  },
}

export const THEMES = {
  BLUE: {
    value: 'blue',
    label: 'BLUE THEME',
  },
  RED: {
    value: 'red',
    label: 'RED THEME',
  },
  PURPLE: {
    value: 'purple',
    label: 'PURPLE THEME',
  },
}

export const NUMBER_OF_QUESTIONS = [2, 30, 50] // put it back to 10

export const NUMBER_OF_PLAYERS = [
  {
    value: 2,
    label: '2 PLAYERS',
  },
  {
    value: 3,
    label: '3 PLAYERS',
  },
  {
    value: 4,
    label: '4 PLAYERS',
  },
]
