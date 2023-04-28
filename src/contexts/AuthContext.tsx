import {
    GoogleAuthProvider, onAuthStateChanged, signInWithPopup,
    signOut
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { destroyCookie, setCookie } from 'nookies'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'

import { api } from '../services/api'
import { auth } from '../services/firebase'

type User = {
    email: string
    permissions?: string[]
    roles?: string[]
}

type SignInCredentials = {
    email: string
    password: string
}

type AuthContextData = {
    user: any
    signIn({ email, password }: SignInCredentials): Promise<void>
    signInWithGoogle(): Promise<void>
    signOutApplication(router: any): void
    logOut(): Promise<void>
    isAuthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<any>({})
    const isAuthenticated = !!user
    const router = useRouter()

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('authenticate', {
                email,
                password,
            })

            setCookie(undefined, 'caparao.token', response.data, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            })

            api.defaults.headers['Authorization'] = `Bearer ${response.data}`

            router.push('/cities')
        } catch (error) {
            console.log(error)
        }
    }

    const provider = new GoogleAuthProvider()

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)

            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            // console.log(token)
            // The signed-in user info.
            setUser(result.user)
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.customData.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
        }
    }
    
    function signOutApplication(router: any) {
        destroyCookie(undefined, 'caparao.token')
        destroyCookie(undefined, 'caparao.refreshToken')

        router.push('/login')
    }
    const logOut = async () => {
        await signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signInWithGoogle,
                isAuthenticated,
                user,
                logOut,
                signOutApplication,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }
