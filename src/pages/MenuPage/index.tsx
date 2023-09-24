import { Menu } from '../../components'
import {
  PlayersSelect,
  QuestionsSelect,
  ThemesSelect,
} from '../../components/Menu'
import { Spinner } from '../../components/Game'

import { useQuizContext } from '../../context'

import { ThemeProps } from '../../constants/types'

const MenuPage = ({ selectedTheme, setSelectedTheme }: ThemeProps) => {
  const { numberOfQuestion, isQuestionsFetching } = useQuizContext()

  return isQuestionsFetching ? (
    <Spinner />
  ) : (
    <Menu>
      {!numberOfQuestion ? (
        <>
          <ThemesSelect
            setSelectedTheme={setSelectedTheme}
            selectedTheme={selectedTheme}
          />
          <QuestionsSelect />
        </>
      ) : (
        <PlayersSelect />
      )}
    </Menu>
  )
}

export default MenuPage
