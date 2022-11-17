import React, { EventHandler, FormEvent, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { FiArrowLeft, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import { BsCheckLg } from 'react-icons/bs'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { SignInSocialButton } from '../components/SignInSocialButton';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const { signIn, signInWithGoogle, user } = useContext(AuthContext)

  const { register, handleSubmit, getValues, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleLogin({ email, password }: FormData) {
    setIsLoading(true)
    try {
      await signIn({email, password})
      router.push('/cities')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignInWithGoogle() {
    event.preventDefault()

    try {
      // setIsLoading(true)
      await signInWithGoogle()
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
    <div className="w-full h-[820px] flex justify-between relative">
      <article className="h-full max-w-[704px] overflow-hidden">
        <Image src="/imgLogin.png" width="852px" height="820px" objectFit='cover' layout="fixed" />
      </article>
      <aside className="w-full max-w-[736px] flex flex-col items-start justify-between px-[160px]">
        <div className="text-complement top-9 absolute">
          <FiArrowLeft size={24} />
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="w-[416px] flex flex-col mt-40 items-start justify-between">
            <span className="font-barlow font-semibold text-4xl leading-8 text-title mb-11 h-8">Fazer login</span>
            <div className="flex flex-col w-full mb-6">
              <div className="flex flex-row items-center justify-between w-full relative">
                <input 
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="E-mail"
                  className="border-[1px] border-shape_secondary peer pt-5 placeholder-transparent rounded-t-md w-full h-[72px] pl-[24px] font-heebo font-regular text-base text-text"
                />
                <label 
                  htmlFor='email'
                  className="pl-[24px] top-3 transition-all absolute font-heebo font-regular text-sm text-complement peer-placeholder-shown:text-base peer-placeholder-shown:text-complement peer-placeholder-shown:top-6 peer-focus:top-3 peer-focus:text-sm"  
                >E-mail</label>
              </div>
              
              {/* {errors.email && <p>{errors.email?.message}</p>} */}
              <div className="flex flex-row items-center justify-between w-full relative">
                <input 
                  {...register("password")}
                  id="password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'} 
                  placeholder="Senha"
                  className="border-[1px] align-top border-shape_secondary pt-5 peer w-full placeholder-transparent rounded-b-md border-t-0 h-[72px] pl-[24px] font-heebo font-regular text-base text-text"
                  tabIndex={0}
                />
                <label 
                  htmlFor='password'
                  className="pl-[24px] top-3 transition-all absolute font-heebo font-regular text-sm text-complement peer-placeholder-shown:text-base peer-placeholder-shown:text-complement peer-placeholder-shown:top-6 peer-focus:top-3 peer-focus:text-sm"  
                >Senha</label>
                {/* {errors.passowrd && <p>{errors.password?.message}</p>} */}
                <button onClick={toggleShowPassword} className="absolute ml-[368px] text-complement">
                  {
                    passwordVisible ? (
                      <FiEyeOff size={24} color="#F25D27" title="Esconder senha" />
                    ) : (
                      <FiEye size={24} title="Ver senha" />
                    )
                  }
                </button>
              </div> 
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-4">
                <label className="relative w-6 h-6 cursor-pointer" htmlFor="check">
                  <input id="check" name="check" type="checkbox" className="cursor-pointer w-6 h-6 appearance-none rounded-lg checked:bg-success checked:border-none bg-shape border-[1px] border-shape_secondary" />
                  <BsCheckLg color="#FFF" className="absolute left-[7px] top-[7px]" size={10}/>
                </label>
                <span className="font-heebo font-regular text-base text-complement">Lembrar-me</span>
              </div>
              <a href="#" className="font-heebo font-regular text-base text-complement">Esqueci minha senha</a>
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className={`mt-8 h-[72px] bg-brand-orange rounded-md w-full font-heebo font-medium text-lg text-shape disabled:opacity-50`}
            >
              { isLoading ? 'Carregando ...' : 'Acessar plataforma' }
            </button>
            <SignInSocialButton 
              title='Entrar com Google'
              svg='/google.svg'
              onClick={handleSignInWithGoogle}
            />
          </div>
        </form>
        <span className="font-heebo font-regular mt-3 text-sm leading-[22px] text-text">
          Não tem uma conta ainda? 
          <Link href="/register">
            <a href="#" className="text-brand-orange font-medium"> Registrar agora</a>
          </Link>
        </span>
        <div className="flex gap-6 items-center mt-[80px] mb-[139px] h-[44px]">
          <FiAlertCircle size={32} color="#F25D27" />
          <span className="font-heebo font-regular text-sm leading-[22px] text-text">Acesso restrito à <br />sócios e moderadores</span>
        </div>
      </aside>
    </div>
  )
}
