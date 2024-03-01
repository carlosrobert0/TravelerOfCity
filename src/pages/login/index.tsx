import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsCheckLg } from 'react-icons/bs'
import { FiAlertCircle, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'
import * as yup from 'yup'

import { SignInSocialButton } from '../../components/SignInSocialButton'
import { AuthContext } from '../../contexts/AuthContext'

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

interface FormData {
  email: string
  password: string
}

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { signIn, signInWithGoogle, user } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function handleLogin({ email, password }: FormData) {
    setIsLoading(true)
    try {
      await signIn({ email, password })
    } catch (error) {
      alert(error.message)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignInWithGoogle(event: FormEvent) {
    event.preventDefault()

    try {
      // setIsLoading(true)
      const response = await signInWithGoogle()
      console.log(response)
      router.push('/cities')
    } catch (error) {
      console.log(error)
      alert('Não foi possivel conectar a conta Google')
      // setIsLoading(false)
    } finally {
      // setIsLoading(false)
    }
  }

  function toggleShowPassword(event: FormEvent) {
    event.preventDefault()
    setPasswordVisible(!passwordVisible)
  }

  useEffect(() => {
    if (user !== null) {
      router.push('/cities')
    }
  }, [user])

  return (
    <div className="relative flex h-[820px] w-full justify-between">
      <article className="h-full max-w-[704px] overflow-hidden">
        <Image
          src="/imgLogin.png"
          width="852px"
          height="820px"
          objectFit="cover"
          layout="fixed"
          alt=""
        />
      </article>
      <aside className="flex w-full max-w-[736px] flex-col items-start justify-between px-[160px]">
        <div className="absolute top-9 text-complement">
          <Link href="/">
            <FiArrowLeft size={24} className="cursor-pointer" />
          </Link>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mt-40 flex w-[416px] flex-col items-start justify-between">
            <span className="mb-11 h-8 font-barlow text-4xl font-semibold leading-8 text-title">
              Fazer login
            </span>
            <div className="mb-6 flex w-full flex-col">
              <div className="relative flex w-full flex-row items-center justify-between">
                <input
                  {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="font-regular peer h-[72px] w-full rounded-t-md border-[1px] 
                                    border-shape_secondary pt-5 pl-[24px] font-heebo text-base text-text 
                                    placeholder-transparent"
                />
                <label
                  htmlFor="email"
                  className="font-regular absolute top-3 pl-[24px] font-heebo text-sm 
                                    text-complement transition-all peer-placeholder-shown:top-6 
                                    peer-placeholder-shown:text-base peer-placeholder-shown:text-complement 
                                    peer-focus:top-3 peer-focus:text-sm"
                >
                  E-mail
                </label>
              </div>

              {/* {errors.email && <p>{errors.email?.message}</p>} */}
              <div className="relative flex w-full flex-row items-center justify-between">
                <input
                  {...register('password')}
                  id="password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Senha"
                  className="font-regular peer h-[72px] w-full rounded-b-md border-[1px] 
                                    border-t-0 border-shape_secondary pt-5 pl-[24px] align-top font-heebo 
                                    text-base text-text placeholder-transparent"
                  tabIndex={0}
                />
                <label
                  htmlFor="password"
                  className="font-regular absolute top-3 pl-[24px] font-heebo 
                                    text-sm text-complement transition-all peer-placeholder-shown:top-6 
                                    peer-placeholder-shown:text-base peer-placeholder-shown:text-complement 
                                    peer-focus:top-3 peer-focus:text-sm"
                >
                  Senha
                </label>
                {/* {errors.passowrd && <p>{errors.password?.message}</p>} */}
                <button
                  onClick={toggleShowPassword}
                  className="absolute ml-[368px] text-complement"
                >
                  {passwordVisible ? (
                    <FiEyeOff
                      size={24}
                      color="#F25D27"
                      title="Esconder senha"
                    />
                  ) : (
                    <FiEye size={24} title="Ver senha" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <label
                  className="relative h-6 w-6 cursor-pointer"
                  htmlFor="check"
                >
                  <input
                    id="check"
                    name="check"
                    type="checkbox"
                    className="h-6 w-6 cursor-pointer appearance-none 
                                        rounded-lg border-[1px] border-shape_secondary bg-shape 
                                        checked:border-none checked:bg-success"
                  />
                  <BsCheckLg
                    color="#FFF"
                    className="absolute left-[7px] top-[7px]"
                    size={10}
                  />
                </label>
                <span className="font-regular font-heebo text-base text-complement">
                  Lembrar-me
                </span>
              </div>
              <a
                href="#"
                className="font-regular font-heebo text-base text-complement"
              >
                Esqueci minha senha
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-8 h-[72px] w-full rounded-md bg-brand-orange 
                            font-heebo text-lg font-medium text-shape disabled:opacity-50`}
            >
              {isLoading ? 'Carregando ...' : 'Acessar plataforma'}
            </button>
            <SignInSocialButton
              title="Entrar com Google"
              svg="/google.svg"
              onClick={handleSignInWithGoogle}
            />
          </div>
        </form>
        <span className="font-regular hidden mt-3 font-heebo text-sm leading-[22px] text-text">
          Não tem uma conta ainda?
          <Link href="/register">
            <a href="#" className="font-medium text-brand-orange">
              {' '}
              Registrar agora
            </a>
          </Link>
        </span>
        <div className="mt-[80px] mb-[139px] flex h-[44px] items-center gap-6">
          <FiAlertCircle size={32} color="#F25D27" />
          <span className="font-regular font-heebo text-sm leading-[22px] text-text">
            Acesso restrito à <br />
            sócios e moderadores
          </span>
        </div>
      </aside>
    </div>
  )
}
