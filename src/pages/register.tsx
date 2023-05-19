import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiAlertCircle, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'
import * as yup from 'yup'

import { api } from '../services/api'

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

interface FormData {
  name: string
  email: string
  password: string
}

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleGoBack() {
    router.back()
  }

  async function handleCreateUser({ name, email, password }: FormData) {
    setLoading(true)
    try {
      if (password !== getValues('passwordConfirm')) {
        return alert('Senhas nao conferem')
      }
      await api.post('user', {
        name,
        email,
        password,
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
    <div className="flex w-full justify-between">
      <article className="h-full max-h-[820px] max-w-[704px] overflow-hidden">
        <Image
          src="/imgLogin.png"
          width="852px"
          height="820px"
          objectFit="cover"
          layout="fixed"
        />
      </article>
      <aside className="relative flex max-h-[820px] w-full max-w-[736px] flex-col items-start justify-center px-[160px]">
        <div className="absolute top-9 cursor-pointer text-complement">
          <FiArrowLeft size={24} onClick={handleGoBack} className="cursor-pointer" />
        </div>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <div className="absolute top-[186px] flex h-[495px] w-[416px] flex-col items-start justify-between">
            <span className="mb-11 h-8 font-barlow text-4xl font-semibold leading-8 text-title">
              Cadastrar conta
            </span>
            <div className="mb-6 flex w-full flex-col">
              <div className="relative flex w-full flex-row items-center justify-between">
                <input
                  {...register('name')}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome"
                  className="font-regular peer h-[72px] w-full rounded-t-md border-[1px] 
                  border-shape_secondary pt-5 pl-[24px] font-heebo text-base text-text placeholder-transparent"
                />
                <label
                  htmlFor="name"
                  className="font-regular absolute top-3 pl-[24px] font-heebo text-sm 
                  text-complement transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-complement peer-focus:top-3 peer-focus:text-sm"
                >
                  Nome
                </label>
              </div>

              <div className="relative flex w-full flex-row items-center justify-between">
                <input
                  {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="font-regular peer h-[72px] w-full border-[1px] border-t-0 
                  border-shape_secondary pt-5 pl-[24px] font-heebo text-base 
                  text-text placeholder-transparent"
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

              <div className="relative flex w-full flex-row items-center justify-between">
                <input
                  {...register('password')}
                  id="password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Senha"
                  className="font-regular peer h-[72px] w-full border-[1px] border-t-0 
                  border-shape_secondary pt-5 pl-[24px] align-top font-heebo text-base 
                  text-text placeholder-transparent"
                />
                <label
                  htmlFor="password"
                  className="font-regular absolute top-3 pl-[24px] font-heebo text-sm 
                  text-complement transition-all peer-placeholder-shown:top-6 
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

              <div className="relative flex w-full flex-row items-center justify-between">
                <input
                  {...register('passwordConfirm')}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Confirmar senha"
                  className="font-regular peer h-[72px] w-full rounded-b-md border-[1px] 
                  border-t-0 border-shape_secondary pt-5 pl-[24px] align-top font-heebo 
                  text-base text-text placeholder-transparent"
                />
                <label
                  htmlFor="passwordConfirm"
                  className="font-regular absolute top-3 pl-[24px] font-heebo 
                  text-sm text-complement transition-all peer-placeholder-shown:top-6 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-complement 
                  peer-focus:top-3 peer-focus:text-sm"
                >
                  Confirmar senha
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

            <button
              type="submit"
              disabled={loading}
              className={`mt-8 h-[72px] w-full rounded-md bg-brand-orange 
              font-heebo text-lg font-medium text-shape disabled:opacity-50`}
            >
              {loading ? 'Carregando ...' : 'Cadastrar'}
            </button>
          </div>
        </form>

        <div className="absolute top-[737px] mb-[100px] flex h-[44px] items-center gap-6">
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
