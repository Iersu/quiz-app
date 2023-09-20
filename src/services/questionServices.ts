import axios from 'axios'

export const getQuizQuestios = (numberOfQuestions: number) =>
  axios.get(
    `https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`
  )
