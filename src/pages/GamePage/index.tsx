import { Header, Quiz } from '../../components/Game'
import { useQuizContext } from '../../context'
import { QuestionCounter, SpinnerConatiner, Wrapper } from '../../components/Game/gameStyle'

interface QuestionResponseType {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

const GamePage = () => {
  const {
    questions,
    currentQuestion,
    isQuestionsFetching
  } = useQuizContext()


  // ((currentQuestion + 1) === questions.length && isRoundFinished)
  return (
    !isQuestionsFetching ? (
      <Wrapper>
        <Header />
        <Quiz />
        <QuestionCounter>
          {currentQuestion + 1} / {questions.length}
        </QuestionCounter>
      </Wrapper>
    ) : (
      <SpinnerConatiner>
        <img src="/assets/svgs/loading-loop.svg" alt="loading" />
      </SpinnerConatiner>
    )
  )

}

export default GamePage
