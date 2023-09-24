import { useQuizContext } from '../../context'

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
  AnswerLabel,
  AnserText,
  HR,
  SpinnerConatiner,
} from './gameStyle'
import { ICONS } from '../../constants'
import { PlayerInformationType } from '../../constants/types'

export const Quiz = () => {
  const {
    questions,
    answerOrder,
    currentQuestion,
    setHumanPlayerAnswer,
    playersAnswers,
    timer,
    isRoundFinished,
  } = useQuizContext()

  const questionObj = questions[currentQuestion]
  const correctAnswer = questionObj?.correct_answer
  const firstAnswer = questionObj?.answers[answerOrder[0]].answer
  const secondAnswer = questionObj?.answers[answerOrder[1]].answer
  const thirdAnswer = questionObj?.answers[answerOrder[2]].answer
  const humanPlayerAnswer = playersAnswers?.humanPlayer.answer

  const onSelectAnswer = (selectedAnswer: string) => () => {
    if (isRoundFinished) return
    setHumanPlayerAnswer(selectedAnswer, timer)
  }

  return (
    <Container>
      <QuestionWrapper>
        <Question>{questionObj?.question}</Question>
        <HR />
      </QuestionWrapper>
      <AnswersContainer $isRoundFinished={isRoundFinished}>
        <Answer
          $correctanswer={firstAnswer === correctAnswer && isRoundFinished}
          $selectedanswer={humanPlayerAnswer === firstAnswer}
          onClick={onSelectAnswer(firstAnswer)}
        >
          <AnswerLabel>A</AnswerLabel>
          <AnserText>{firstAnswer}</AnserText>
        </Answer>
        <Answer
          $correctanswer={secondAnswer === correctAnswer && isRoundFinished}
          $selectedanswer={humanPlayerAnswer === secondAnswer}
          onClick={onSelectAnswer(secondAnswer)}
        >
          <AnswerLabel>B</AnswerLabel>
          <AnserText>{secondAnswer}</AnserText>
        </Answer>
        <Answer
          $correctanswer={thirdAnswer === correctAnswer && isRoundFinished}
          $selectedanswer={humanPlayerAnswer === thirdAnswer}
          onClick={onSelectAnswer(thirdAnswer)}
        >
          <AnswerLabel>C</AnswerLabel>
          <AnserText>{thirdAnswer}</AnserText>
        </Answer>
      </AnswersContainer>
    </Container>
  )
}

export const Header = () => {
  const { playersInformation, numberOfPlayers, timer, playersAnswers } =
    useQuizContext()

  return (
    <HeaderWrapper>
      <ScoreboardWrapper>
        {playersInformation
          .slice(0, numberOfPlayers)
          .map((playersInfo: PlayerInformationType) => {
            return (
              <ScoreboardCard key={playersInfo.name}>
                <p>{playersInfo.name}</p>
                <Points>{playersInfo.score} pts</Points>
                {playersAnswers[playersInfo.id].answer &&
                  playersInfo.id !== 'humanPlayer' && (
                    <img src={ICONS.checkMark.link} alt={ICONS.checkMark.alt} />
                  )}
              </ScoreboardCard>
            )
          })}
      </ScoreboardWrapper>
      <TimerCard>
        <TimerIcon src={ICONS.timer.link} alt={ICONS.timer.alt} />
        <Time>{timer}</Time>
      </TimerCard>
    </HeaderWrapper>
  )
}

export const Spinner = () => (
  <SpinnerConatiner>
    <img src={ICONS.spinner.link} alt={ICONS.spinner.alt} />
  </SpinnerConatiner>
)
