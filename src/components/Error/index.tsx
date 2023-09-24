import { ROUTES } from '../../constants'
import { ErrorLink, ErrorText, ErrorWrapper } from './errorStyle'

const Error = () => {
  return (
    <ErrorWrapper>
      <ErrorText>Something went wrong, try again.</ErrorText>
      <ErrorLink to={ROUTES.HOME}>HOME PAGE</ErrorLink>
    </ErrorWrapper>
  )
}

export default Error
