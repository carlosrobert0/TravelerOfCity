import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { api } from "../services/api";
import { auth } from "../services/firebase";

type User = {
  email: string;
  permissions?: string[]
  roles?: string[]
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  user: any;
  signIn({ email, password }: SignInCredentials): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signOutApplication(router: any): void;
  logOut(): Promise<void>;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>({})
  const isAuthenticated = !!user
  const router = useRouter()

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("authenticate", {
        email,
        password
      })

      console.log(response.data)

      setCookie(undefined, 'caparao.token', response.data, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      api.defaults.headers['Authorization'] = `Bearer ${response.data}`

      router.push("/cities")
    } catch (error) {
      console.log(error)
    }
  }

  const provider = new GoogleAuthProvider()

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // console.log(token)
      // The signed-in user info.
     setUser(result.user);
      console.log(result.user)
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  // async function signInWithGoogle() {
  //   try {
  //     const CLIENT_ID = ''
  //     const REDIRECT_URI = ''
  //     const RESPONSE_TYPE = ''
  //     const SCOPE = ''
  //     // const RESPONSE_TYPE = "token"
  //     // const SCOPE = encodeURI("profile email")

  //     // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

  //     // const { type, params } = await AuthSession
  //     // .startAsync({ authUrl }) as AuthorizationResponse;

  //     // if(type === 'success') {
  //     //   const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
  //     //   const userInfo = await response.json()

  //     //   setUser({
  //     //     id: userInfo.id,
  //     //     email: userInfo.email,
  //     //     name: userInfo.given_name,
  //     //     photo: userInfo.picture
  //     //   })
  //     // }
  //     alert('fala mano ta tentando logar no caparao turismo com a sua conta do google?')
  //   } catch (error) {
  //     throw new Error
  //   }

  // try {
  // const result = await Google.logInAsync({
  //   iosClientId: '',
  //   androidClientId: '',
  //   scopes: ['profile', 'email']
  // })

  // if(result.type === 'success'){
  //   const userLogged = {
  //     id: String(result.user.id),
  //     email: result.user.email!,
  //     name: result.user.name!,
  //     photo: result.user.photoUrl!
  //   }
  // }

  // setUser(userLogged)
  // await AsyncStore.setItem('@gofinances:user', JSON.stringify(userLogged))
  // } catch (error) {

  // }

  function signOutApplication(router: any) {
    destroyCookie(undefined, 'caparao.token')
    destroyCookie(undefined, 'caparao.refreshToken')

    router.push('/')
  }
  const logOut = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
      console.log('user', currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
      signInWithGoogle,
      isAuthenticated,
      user,
      logOut,
      signOutApplication
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }