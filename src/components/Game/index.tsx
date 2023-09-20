import { useEffect } from 'react'
import { useQuizContext } from '../../context'
// import { shuffleArray } from '../../utils'

import {
  ScoreboardWrapper,
  ScoreboardCard,
  Points,
  TimerCard,
  HeaderWrapper,
  TimerIcon,
  Time,
  Container,
  QuestionWrapper,
  Question,
  Answer,
  AnswersContainer,
  AnswerLable,
  AnserText,
  HR,
} from './gameStyle'
import { useNavigate } from 'react-router-dom'

export const Quiz = () => {
  const {
    questions,
    answerOrder,
    currentQuestion,
    setHumanPlayerAnswer,
    playersAnswers,
    timer,
    isRoundFinished,
    winner
  } = useQuizContext()
  const navigate = useNavigate()

  const questionObj = questions[currentQuestion]
  const correctAnswer = questionObj.correct_answer
  const firstAnswer = questionObj.answers[answerOrder[0]].answer
  const secondAnswer = questionObj.answers[answerOrder[1]].answer
  const thirdAnswer = questionObj.answers[answerOrder[2]].answer
  const humanPlayerAnswer = playersAnswers.humanPlayer.answer

  const onSelectAnswer = (selectedAnswer: string) => () => {
    if (isRoundFinished) return
    setHumanPlayerAnswer(selectedAnswer, timer)
  }

  useEffect(() => {
    if (winner) navigate("/results")
    
    // no need to include navigate because it will not change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner])

  // MAP THIS
  return (
    <Container>
      <QuestionWrapper>
        <Question>{questionObj.question}</Question>
        <HR />
      </QuestionWrapper>
      <AnswersContainer isRoundFinished={isRoundFinished}>
        <Answer
          correctAnswer={firstAnswer === correctAnswer && isRoundFinished}
          selectedAnswer={humanPlayerAnswer === firstAnswer}
          onClick={onSelectAnswer(firstAnswer)}
        >
          <AnswerLable>A</AnswerLable>
          <AnserText>{firstAnswer}</AnserText>
        </Answer>
        <Answer
          correctAnswer={secondAnswer === correctAnswer && isRoundFinished}
          selectedAnswer={humanPlayerAnswer === secondAnswer}
          onClick={onSelectAnswer(secondAnswer)}
        >
          <AnswerLable>B</AnswerLable>
          <AnserText>{secondAnswer}</AnserText>
        </Answer>
        <Answer
          correctAnswer={thirdAnswer === correctAnswer && isRoundFinished}
          selectedAnswer={humanPlayerAnswer === thirdAnswer}
          onClick={onSelectAnswer(thirdAnswer)}
        >
          <AnswerLable>C</AnswerLable>
          <AnserText>{thirdAnswer}</AnserText>
        </Answer>
      </AnswersContainer>
    </Container>
  )
}

// interface PlayerType {
//   name: string
//   score: number
//   selectedAnswre: null
// }

export const Header = () => {
  const { playersInformation, numberOfPlayers, timer } = useQuizContext()

  return (
    <HeaderWrapper>
      <ScoreboardWrapper>
        {playersInformation.map((playersInfo: any, index: number) => {
          if (index < numberOfPlayers)
            return (
              <ScoreboardCard key={playersInfo.name}>
                <p>{playersInfo.name}</p>
                <Points>{playersInfo.score} pts</Points>
              </ScoreboardCard>
            )
            return null
        })}
      </ScoreboardWrapper>
      <TimerCard>
        <TimerIcon src="/assets/svgs/timer-20.svg" alt="Stopwatch" />
        <Time>{timer}</Time>
      </TimerCard>
    </HeaderWrapper>
  )
}


