import {
  ResultsTitle,
  ResultsWrapper,
  StyledLink,
  WinnerName,
} from '../../components/Game/gameStyle'

import { useQuizContext } from '../../context'

import { ROUTES } from '../../constants'

const ResultsPage = () => {
  const { winner, resetGame } = useQuizContext()

  return (
    <ResultsWrapper>
      {winner.name ? (
        <>
          <ResultsTitle>WINNER OF THE GAME:</ResultsTitle>
          <WinnerName>{winner.name}</WinnerName>
        </>
      ) : (
        <ResultsTitle>GAME IS A TIE</ResultsTitle>
      )}
      <StyledLink to={ROUTES.HOME} onClick={resetGame}>
        PLAY AGAIN
      </StyledLink>
    </ResultsWrapper>
  )
}

export default ResultsPage
