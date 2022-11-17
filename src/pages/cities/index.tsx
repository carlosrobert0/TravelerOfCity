import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

interface CityData {
  id: string;
  name: string;
  imagem?: string;
  description?: string;
}

export default function Cities() {
  const [cities, setCities] = useState<CityData[]>([] as CityData[])
  const cookies = parseCookies()
  const router = useRouter()
  const { signOutApplication } = useAuth()

  useEffect(() => {
    async function getCities() {
      try {
        const response = await api.get('cities', {
          headers: {
            Authorization: `Bearer ${cookies['caparao.token']}`
          }
        })
        console.log(response.data)
        setCities(response.data)
      } catch (error) {
        if (error.response.status === 401) {
          signOutApplication(router)
        }
      }
    }
    getCities()
  }, [])

  return (
    <div className="w-full h-[820px] flex justify-between max-h-[820px] overflow-x-hidden overflow-hidden">
      <Nav />

      <main className="flex flex-col w-full ml-24 overflow-x-hidden overflow-y-scroll">
        <Header />
        <span className="border-[1px] text-shape_secondary w-[1344px]" />
        <div className="w-full mt-12 ml-28 h-[862px] xl:28 flex flex-wrap mt-px-28 gap-x-8 gap-y-8">
          {cities.map(city => (
            <Card key={city.id} name={city.name} route="city" />
          ))}
        </div>
      </main>
    </div>
  )
}