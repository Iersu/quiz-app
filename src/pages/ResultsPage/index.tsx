import { useState } from 'react'
import { Box, Text } from '../../atoms'
import { contextFactory, useQuizContext } from '../../context'
import { StyledLink } from '../../components/Game/gameStyle'

const ResultsPage = () => {
  const { winner, resetGame } = useQuizContext()

  const handleGameReset = () => {
    resetGame()
  }

  return (
    <Box height="100vh" display="flex" flexDirection='column' alignItems="center" justifyContent="center">
      {
        winner.name ?
          (
            <>
              <Text fontSize='64px' fontWeight='bold'>
                WINNER OF THE GAME:
              </Text>
              <Text fontSize='32px'>
                {winner.name}
              </Text>
            </>
          ) : (
            <Text fontSize='64px' fontWeight='bold'>
              GAME I A TIE
            </Text>
          )
      }
      <StyledLink to={"/"} onClick={handleGameReset}>PLAY AGANE</StyledLink>
    </Box>
  )
}

export default ResultsPage