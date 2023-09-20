import {
  PageWrapper,
  Title,
  Container
} from './menuStyle'

const Menu = ({children, ...props}: any) => {
  return (
    <PageWrapper {...props}>
      <Container>
        <Title>
            QUIZ
        </Title>
        {children}
      </Container>
      </PageWrapper>
  )
}

export default Menu