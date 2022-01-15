import { FC, useRef, useState } from 'react'
import { Button, Center, Container, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'



const Login: FC = () => {
    const emailRef: any = useRef()
    const passwordRef: any = useRef()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setError(null)
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
        } catch {
            setError('Failed to Log In check your password and email')
        }
        setLoading(false)


    }


    return (
        <>
            <Container color="black">
                <Flex direction="column">


                    <div >
                        <h2 style={{ color: 'white' }}>Sign In</h2>

                        <form onSubmit={handleSubmit}>
                            <Center>

                                <FormControl color='white' width='80%'>

                                    <FormLabel htmlFor="email">
                                        <Input type="text" id="email" ref={emailRef} placeholder="Enter your email" />
                                    </FormLabel>

                                    <FormLabel htmlFor="password">
                                        <Input type="password" id="password" ref={passwordRef} placeholder="Enter your password" />
                                    </FormLabel>


                                    <Button
                                        colorScheme='green'
                                        p='5'
                                        disabled={loading}
                                        type="submit"
                                        value='Login'>Log In</Button>

                                </FormControl>
                            </Center>
                        </form>
                        <div style={{ color: 'red' }}>{error}</div>
                    </div>
                </Flex>
            </Container>

        </>
    )
}

export { Login }
