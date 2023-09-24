import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0 20px 0;
`

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const ScoreboardCard = styled.div`
  display: flex;
  height 50px;
  border-radius: 0 10px 10px 0;
  padding-left: 30px;
  background: ${({ theme }) => theme.colors.accentColor};
`

export const ScoreboardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  ${ScoreboardCard}:nth-child(2) {
    margin-left: -10px;
    min-width: 236px;
    z-index: -1;
    background-image: linear-gradient(90deg, #cd2e4b 0%, #ff4369 100%);
  }
  ${ScoreboardCard}:nth-child(3) {
    margin-left: -10px;
    min-width: 236px;
    z-index: -2;
    background-image: linear-gradient(90deg, #cd2e4b 0%, #ff4369 100%);
  }
  ${ScoreboardCard}:nth-child(4) {
    margin-left: -10px;
    min-width: 236px;
    z-index: -3;
    background-image: linear-gradient(90deg, #cd2e4b 0%, #ff4369 100%);
  }
`

export const PlayerName = styled.p``

export const Points = styled.p`
  margin-left: 20px;
  margin-right: 15px;
`

export const TimerCard = styled.div`
  display: flex;
  align-items: center;
  height 50px;
  border-radius: 10px 0 0 10px;
  padding-right: 35px;
  padding-left: 15px;
  background: ${({ theme }) => theme.colors.accentColor}
`

export const TimerIcon = styled.img`
  color: white;
  height: 35px;
  width: 35px;
  margin-right: 15px;
  background-image: url('/assets/svgs/timer-20.svg');
`

export const Time = styled.p`
  font-size: 22px;
  margin: 0;
`

export const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const QuestionWrapper = styled.div`
  margin: 0 10px 40px 10px;
`

export const HR = styled.hr`
  border-color: ${({ theme }) => theme.colors.accentColor};
  background-color: ${({ theme }) => theme.colors.accentColor};
  margin-top: 10px;
`

export const Question = styled.h2`
  padding: 0 10px;
  margin: 0;
  text-align: center;
`
interface AnswerProps {
  $correctanswer: boolean
  $selectedanswer: boolean
}

export const Answer = styled('div')<AnswerProps>`
  display: flex;
  padding: 5px 30px 5px 10px;
  align-items: center;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
  background: ${({ $correctanswer, $selectedanswer }) =>
    ($correctanswer && 'green') || ($selectedanswer && 'orange')};
`

interface AnswerContainerProps {
  $isRoundFinished: boolean
}

export const AnswersContainer = styled('div')<AnswerContainerProps>`
  display: flex;
  user-select: none;
  ${Answer}:nth-child(n + 2) {
    margin-left: 20px;
  }

  ${Answer} {
    &: hover {
      background: ${({ $isRoundFinished }) => !$isRoundFinished && 'orange'};
    }
  }
`

export const AnswerLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  background-color: #03284dff;
  border-radius: 50%;
`

export const AnserText = styled.p`
  margin: 0;
`

export const QuestionCounter = styled.p`
  text-align: center;
`

export const SpinnerConatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 30px;
  padding: 5px 30px;
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
`

export const ResultsWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ResultsTitle = styled.h1`
  font-size: 64px;
  font-weight: bold;
`

export const WinnerName = styled.h3`
  font-size: 32px;
`
