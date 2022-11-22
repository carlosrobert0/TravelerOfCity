import { Card } from "../../components/card/CardCity";
import { CardAvaliation } from "../../components/card/CardAvaliation";
import CardCategory from "../../components/card/CardCategory";

export default function Created() {
  return (
    <div className="w-full h-[820px] flex items-center justify-center">

      <main className="w-[713px] h-[640px] flex top-[76px]">

        <div className="w-[337px] h-[546px] flex flex-col items-center justify-between relative">
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2" d="M320 160C320 248.364 248.364 320 160 320C71.6445 320 0 248.364 0 160C0 71.6445 71.6445 0 160 0C248.364 0 320 71.6445 320 160Z" fill="#DCF5DD" />
            <path opacity="0.4" d="M280 160C280 226.273 226.273 280 160 280C93.7333 280 40 226.273 40 160C40 93.7333 93.7333 40 160 40C226.273 40 280 93.7333 280 160Z" fill="#DCF5DD" />
            <path d="M240 160C240 204.182 204.182 240 160 240C115.822 240 80 204.182 80 160C80 115.822 115.822 80 160 80C204.182 80 240 115.822 240 160Z" fill="#DCF5DD" />
          </svg>

          <div className="w-[337px] h-full items-center flex flex-col absolute top-[104px]">
            <div className="flex flex-col justify-center items-center relative mt-[18px]">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 40C80 62.0911 62.0911 80 40 80C17.9111 80 0 62.0911 0 40C0 17.9111 17.9111 0 40 0C62.0911 0 80 17.9111 80 40Z" fill="#BAF5BC" />
              </svg>
              <svg className="absolute top-6 left-6" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.3329 8.80005L13.1995 24.9334L5.86621 17.6" stroke="#51B853" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <h1 className="font-heebo font-medium text-[54px] leading-[58px] text-center text-title mt-10">Perfil cadastrado!</h1>
            <h2 className="font-heebo text-base leading-[26px] text-text mt-6 text-center">Você tem uma nova cidade e um novo ponto cadastrado. Continue sempre  adicionando locais incríveis.</h2>
            <button className="bg-brand-orange rounded-[10px] mt-10 w-[100px] h-[48px] items-center justify-center flex font-heebo font-medium text-base leading-[26px] text-white">
              Okay
            </button>
          </div>
        </div>

        <div className="flex flex-col ml-[115px] gap-10">
          <Card name="Florianopolis" />
          <Card name="TocadaTruta" avaliation="4.5" />
        </div>
      </main>
    </div>
  )
}