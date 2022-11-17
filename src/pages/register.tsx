import React, { useState } from 'react'
import Image from 'next/image'
import { FiArrowLeft, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import { BsCheckLg } from 'react-icons/bs'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../services/api';
import Link from 'next/link';
import { useRouter } from 'next/router';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const { register, handleSubmit, getValues, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function handleGoBack() {
    router.back()
  }

  async function handleCreateUser({ name, email, password }: FormData) {
    setLoading(true)
    try {
      if (password !== getValues('passwordConfirm')) {
        return alert("Senhas nao conferem")
      }
      await api.post("user", {
        name,
        email,
        password
      })

      setLoading(false)
      router.push('/')
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  function toggleShowPassword(event: any) {
    event.preventDefault()
    setPasswordVisible(!passwordVisible)
  }

  return (
    <div className="w-full flex justify-between">
      <article className="h-full max-w-[704px] max-h-[820px] overflow-hidden">
        <Image src="/imgLogin.png" width="852px" height="820px" objectFit='cover' layout="fixed" />
      </article>
      <aside className="w-full max-w-[736px] max-h-[820px] flex flex-col items-start justify-center px-[160px] relative">
        <div className="text-complement top-9 absolute cursor-pointer">
          <FiArrowLeft size={24} onClick={handleGoBack} />
        </div>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <div className="w-[416px] h-[495px] flex flex-col top-[186px] items-start justify-between absolute">
            <span className="font-barlow font-semibold text-4xl leading-8 text-title mb-11 h-8">Cadastrar conta</span>
            <div className="flex flex-col w-full mb-6">
              <div className="flex flex-row items-center justify-between w-full relative">
                <input 
                  {...register("name")}
                  id="name"
                  name="name"
                  type="text" 
                  placeholder="Nome"
                  className="border-[1px] border-shape_secondary peer pt-5 placeholder-transparent rounded-t-md w-full h-[72px] pl-[24px] font-heebo font-regular text-base text-text"
                />
                <label 
                  htmlFor='name'
                  className="pl-[24px] top-3 transition-all absolute font-heebo font-regular text-sm text-complement peer-placeholder-shown:text-base peer-placeholder-shown:text-complement peer-placeholder-shown:top-6 peer-focus:top-3 peer-focus:text-sm"  
                >Nome</label>
              </div>
              
              <div className="flex flex-row items-center justify-between w-full relative">
                <input 
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="E-mail"
                  className="border-[1px] border-shape_secondary peer pt-5 placeholder-transparent border-t-0 w-full h-[72px] pl-[24px] font-heebo font-regular text-base text-text"
                />
                <label 
                  htmlFor='email'
                  className="pl-[24px] top-3 transition-all absolute font-heebo font-regular text-sm text-complement peer-placeholder-shown:text-base peer-placeholder-shown:text-complement peer-placeholder-shown:top-6 peer-focus:top-3 peer-focus:text-sm"  
                >E-mail</label>
              </div>

              <div className="flex flex-row items-center justify-between w-full relative">
                <input 
                  {...register("password")}
                  id="password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'} 
                  placeholder="Senha"
                  className="border-[1px] align-top border-shape_secondary pt-5 peer w-full placeholder-transparent border-t-0 h-[72px] pl-[24px] font-heebo font-regular text-base text-text"
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

              <div className="flex flex-row items-center justify-between w-full relative">
                <input 
                  {...register("passwordConfirm")}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={passwordVisible ? 'text' : 'password'} 
                  placeholder="Confirmar senha"
                  className="border-[1px] align-top border-shape_secondary pt-5 peer w-full rounded-b-md placeholder-transparent border-t-0 h-[72px] pl-[24px] font-heebo font-regular text-base text-text"
                />
                <label 
                  htmlFor='passwordConfirm'
                  className="pl-[24px] top-3 transition-all absolute font-heebo font-regular text-sm text-complement peer-placeholder-shown:text-base peer-placeholder-shown:text-complement peer-placeholder-shown:top-6 peer-focus:top-3 peer-focus:text-sm"  
                >Confirmar senha</label>
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

            <button 
              type="submit"
              disabled={loading}
              className={`mt-8 h-[72px] bg-brand-orange rounded-md w-full font-heebo font-medium text-lg text-shape disabled:opacity-50`}
            >
              { loading ? 'Carregando ...' : 'Cadastrar' }
            </button>
          </div>
        </form>
        
        <div className="flex gap-6 items-center top-[737px] mb-[100px] h-[44px] absolute">
          <FiAlertCircle size={32} color="#F25D27" />
          <span className="font-heebo font-regular text-sm leading-[22px] text-text">Acesso restrito à <br />sócios e moderadores</span>
        </div>
      </aside>
    </div>
  )
}
