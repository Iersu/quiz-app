import { ReactNode, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  PlayerSelectButton,
  QuestionSelectWrapper,
  StyledSelect,
} from '../../components/Menu/menuStyle'
import { PageWrapper, Title, Container } from './menuStyle'

import { useQuizContext } from '../../context'

import {
  NUMBER_OF_PLAYERS,
  NUMBER_OF_QUESTIONS,
  ROUTES,
  THEMES,
} from '../../constants'
import { ThemeNameType, ThemeProps } from '../../constants/types'

export const ThemesSelect = ({
  setSelectedTheme,
  selectedTheme,
}: ThemeProps) => {
  const handleThemeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '') return
    setSelectedTheme(event.target.value as ThemeNameType)
    localStorage.setItem('theme', event.target.value)
  }

  return (
    <StyledSelect onChange={handleThemeSelect} value={selectedTheme}>
      <option value="">SELECT THEME</option>
      {Object.values(THEMES).map((color) => (
        <option key={color.value} value={color.value}>
          {color.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export const QuestionsSelect = () => {
  const { setNumberOfQuestion, numberOfQuestion } = useQuizContext()

  const onNumberOfQuestionsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '') return
    setNumberOfQuestion(event.target.value)
  }

  return (
    <QuestionSelectWrapper>
      <StyledSelect
        onChange={onNumberOfQuestionsChange}
        value={numberOfQuestion}
      >
        <option value="">NUMBER OF QUESTIONS</option>
        {NUMBER_OF_QUESTIONS.map((numberOfQuestions) => (
          <option key={numberOfQuestions} value={numberOfQuestions}>
            {numberOfQuestions}
          </option>
        ))}
        {/* put it back to 10 */}
      </StyledSelect>
    </QuestionSelectWrapper>
  )
}

export const PlayersSelect = () => {
  const { setNumberOfPlayers, questions } = useQuizContext()
  const navigate = useNavigate()

  const handlePlayerSelect = (players: number) => () => {
    setNumberOfPlayers(players)
    questions.length && navigate(ROUTES.GAME)
  }
  return (
    <>
      {NUMBER_OF_PLAYERS.map((numberOfPlayers) => (
        <PlayerSelectButton
          key={numberOfPlayers.value}
          onClick={handlePlayerSelect(numberOfPlayers.value)}
        >
          {numberOfPlayers.label}
        </PlayerSelectButton>
      ))}
    </>
  )
}

const Menu = ({ children }: { children: ReactNode }) => {
  return (
    <PageWrapper>
      <Container>
        <Title>QUIZ</Title>
        {children}
      </Container>
    </PageWrapper>
  )
}

export default Menu
