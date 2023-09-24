import { Header, Quiz } from '../../components/Game'
import { QuestionCounter, Wrapper } from '../../components/Game/gameStyle'

import { useQuizContext } from '../../context'

const GamePage = () => {
  const { questions, currentQuestion } = useQuizContext()

  return (
    <Wrapper>
      <Header />
      <Quiz />
      <QuestionCounter>
        {currentQuestion + 1} / {questions.length}
      </QuestionCounter>
    </Wrapper>
  )
}

export default GamePage
