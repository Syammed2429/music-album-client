import React from 'react'
import { auth } from '../firebase'



export const AuthContext = React.createContext();

export const useAuth = () => {
    return React.useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState()

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)

    }

    const logout = () => {
        return auth.signOut();
    }

    React.useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unSubscribe
    }, []);


    return <AuthContext.Provider
        value={{
            currentUser,
            signUp,
            login,
            logout
        }}>
        {children}
    </AuthContext.Provider>

}