import { useNavigate } from 'react-router-dom'
import { Box } from '../../atoms'
import { Menu, Select } from '../../components'
import { PlayerSelectButton } from '../../components/Menu/menuStyle'
import {  useQuizContext } from '../../context'

const MenuPage = ({selectedTheme, setSelectedTheme}: any) => {
  const {
    setNumberOfQuestion,
    setNumberOfPlayers,
    numberOfQuestion,
  } = useQuizContext()
  const navigate = useNavigate();

  const handleThemeSelect = (event: any) => {
    if (event.target.value === '') return
    setSelectedTheme(event.target.value)
  }

  const onNumberOfQuestionsChange = async (event: any) => {
    if (event.target.value === '') return
    setNumberOfQuestion(event.target.value)
  }

  const handlePlayerSelect = (players: number) => () => {
    setNumberOfPlayers(players)
    navigate("/game")
    
  }

  return (
    <Menu>
          {!numberOfQuestion ? (
            <div>
              <Select onChange={handleThemeSelect} value={selectedTheme}>
                <option value="">SELECT THEME</option>
                <option key="blue" value="blue">
                  BLUE THEME
                </option>
                <option key="black" value="black">
                  BLACK THEME
                </option>
              </Select>
              <Box pt="25px">
                <Select
                  onChange={onNumberOfQuestionsChange}
                  value={numberOfQuestion}
                >
                  <option value="">NUMBER OF QUESTIONS</option>
                  <option value={2}>10</option>{/* put it back to 10 */}
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </Select>
              </Box>
            </div>
          ) : (
            <>
              <PlayerSelectButton onClick={handlePlayerSelect(2)}>
                2 PLAYERS
              </PlayerSelectButton>
              <PlayerSelectButton onClick={handlePlayerSelect(3)}>
                3 PLAYERS
              </PlayerSelectButton>
              <PlayerSelectButton onClick={handlePlayerSelect(4)}>
                4 PLAYERS
              </PlayerSelectButton>
            </>
          )}
        </Menu>
  )
}

export default MenuPage