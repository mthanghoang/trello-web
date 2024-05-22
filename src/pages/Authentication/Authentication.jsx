import Container from '@mui/material/Container'
import LogInForm from '~/components/Form/Login'

function Authentication() {
  return (
    <Container disableGutters maxWidth={false} sx={{
      height: '100vh',
      display: 'flex'
    }}>
      <LogInForm />
    </Container>
  )
}

export default Authentication