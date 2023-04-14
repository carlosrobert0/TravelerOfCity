import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

interface CommentData {
  id: string
  name: string
  avatar?: string
  description?: string
  status: string
  city_id: string
  place_id: string
}

interface CityData {
  id: string
  name: string
  image?: string
  description?: string
}

export default function Comments() {
  const [comments, setComments] = useState<CommentData[]>([])
  const [cities, setCities] = useState<CityData[]>([])

  const router = useRouter()

  const cookies = parseCookies()

  const { signOutApplication } = useAuth()

  async function getComments() {
    try {
      const response = await api.get('depositions')
      setComments(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getCities() {
    try {
      const response = await api.get('cities', {
        headers: {
          Authorization: `Bearer ${cookies['caparao.token']}`,
        },
      })
      setCities(response.data)
    } catch (error) {
      if (error.response.status === 401) {
        signOutApplication(router)
      }
    }
  }

  function renderCityName(city_id: string) {
    const city = cities.filter(c => c.id === city_id)
    return city[0]?.name
  }

  useEffect(() => {
    getComments()
    getCities()
  }, [])

  return (
    <div className="relative">
      <Nav />
      <header className="ml-24 bg-shape h-24 w-full flex items-center justify-between px-28">
        <h1 className="font-barlow text-4xl leading-[46px] text-title font-semibold">Comentários</h1>

        <ul className="flex gap-8 mr-24 text-complement text-base leading-[26px] font-roboto">
          <li className="text-title font-bold border-b-2 border-brand-orange">Todos</li>
          <li>Recentes</li>
          <li>Velhos</li>
          <li>Aceitos</li>
          <li>Recusados</li>
        </ul>

      </header>
      <main className="ml-[208px] mt-12 flex items-center">
        <table className="w-[1120px] border-separate border-spacing-y-2 max-h-[760px] overflow-y-scroll">
          <tr
            className="w-full h-[88px] bg-shape">
            <td className="pl-6 rounded-tl-2xl rounded-bl-2xl">
              <div className="flex items-center justify-center gap-6">
                <img src="/caparao.jpg" alt="" className="object-cover w-14 h-14 rounded-[50%]" />
                <h4>Tiago Luchtenbeerg</h4>
              </div>
            </td>
            <td width="7%">
              <div className="bg-[#F3F3F3] rounded-[50%] h-6 w-6 flex items-center justify-center">
                <img src="/interrogation.svg" alt="" />
              </div>
            </td>
            <td>
              <div className="flex flex-col">
                <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">CATEGORIA</h4>
                <h3 className="font-heebo font-medium text-base leading-6 text-text">Eventos Organizados</h3>
              </div>
            </td>
            <td>
              <div className="flex flex-col">
                <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">CIDADE</h4>
                <h3 className="font-heebo font-medium text-base leading-6 text-text">Rio do Sul</h3>
              </div>
            </td>
            <td>
              <div className="flex flex-col">
                <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">LOCAL</h4>
                <h3 className="font-heebo font-medium text-base leading-6 text-text">Rua Doce dos Encantos</h3>
              </div>
            </td>
            <td className="pr-[38px] rounded-tr-2xl rounded-br-2xl">
              <img src="/seta.svg" alt="" />
            </td>
          </tr>
          {comments.map(comment => (
            <tr
              key={comment.id}
              className="w-full h-[88px] bg-shape">
              <td className="pl-6 rounded-tl-2xl rounded-bl-2xl">
                <div className="flex items-center justify-center gap-6">
                  <img src={comment.avatar} alt="" className="object-cover w-14 h-14 rounded-[50%]" />
                  <h4>{comment.name}</h4>
                </div>
              </td>
              <td width="7%">
                <div className="bg-[#F3F3F3] rounded-[50%] h-6 w-6 flex items-center justify-center">
                  <img src="/interrogation.svg" alt="" />
                </div>
              </td>
              <td>
                <div className="flex flex-col">
                  <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">CATEGORIA</h4>
                  <h3 className="font-heebo font-medium text-base leading-6 text-text">Eventos Organizados</h3>
                </div>
              </td>
              <td>
                <div className="flex flex-col">
                  <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">CIDADE</h4>
                  <h3 className="font-heebo font-medium text-base leading-6 text-text">
                    {renderCityName(comment.city_id)}
                  </h3>
                </div>
              </td>
              <td>
                <div className="flex flex-col">
                  <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">LOCAL</h4>
                  <h3 className="font-heebo font-medium text-base leading-6 text-text">{comment.place_id}</h3>
                </div>
              </td>
              <td className="pr-[38px] rounded-tr-2xl rounded-br-2xl">
                <img src="/seta.svg" alt="" />
              </td>
            </tr>
          ))}
        </table>
      </main>
    </div>
  )
}