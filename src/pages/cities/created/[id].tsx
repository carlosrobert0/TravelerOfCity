import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CardCity } from '../../../components/card/CardCity';
import { CardPlace } from '../../../components/card/CardPlace';
import { api } from '../../../services/api';
import { renderIconNameByCategoryName } from '../../../utils/renderIconNameByCategoryName';

export default function Created() {
  const [city, setCity] = useState<any>();

  const place = city?.places[city?.places?.length - 1]
  const router = useRouter();

  const {id} = router.query;

  async function getCity() {
    try {
      const response = await api.get(`cities/${id}`);

      setCity(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCity();
  }, [id]);

  return (
    <div className="flex h-[820px] w-full items-center justify-center">
      <main className="top-[76px] flex h-[640px] w-[713px]">
        <div className="relative flex h-[546px] w-[337px] flex-col items-center justify-between">
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M320 160C320 248.364 248.364 320 160 320C71.6445 320 0 248.364 0 160C0 71.6445 71.6445 0 160 0C248.364 0 320 71.6445 320 160Z"
              fill="#DCF5DD"
            />
            <path
              opacity="0.4"
              d="M280 160C280 226.273 226.273 280 160 280C93.7333 280 40 226.273 40 160C40 93.7333 93.7333 40 160 40C226.273 40 280 93.7333 280 160Z"
              fill="#DCF5DD"
            />
            <path
              d="M240 160C240 204.182 204.182 240 160 240C115.822 240 80 204.182 80 160C80 115.822 115.822 80 160 80C204.182 80 240 115.822 240 160Z"
              fill="#DCF5DD"
            />
          </svg>

          <div className="absolute top-[104px] flex h-full w-[337px] flex-col items-center">
            <div className="relative mt-[18px] flex flex-col items-center justify-center">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M80 40C80 62.0911 62.0911 80 40 80C17.9111 80 0 62.0911 0 40C0 17.9111 17.9111 0 40 0C62.0911 0 80 17.9111 80 40Z"
                  fill="#BAF5BC"
                />
              </svg>
              <svg
                className="absolute top-6 left-6"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.3329 8.80005L13.1995 24.9334L5.86621 17.6"
                  stroke="#51B853"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <h1 className="mt-10 text-center font-heebo text-[54px] font-medium leading-[58px] text-title">
              Perfil cadastrado!
            </h1>
            <h2 className="mt-6 text-center font-heebo text-base leading-[26px] text-text">
              Você tem uma nova cidade e um novo ponto cadastrado. Continue
              sempre adicionando locais incríveis.
            </h2>
            <button
              onClick={() => router.push(`/cities/${cityId}`)}
              className="mt-10 flex h-[48px] w-[100px] items-center justify-center 
              rounded-[10px] bg-brand-orange font-heebo text-base font-medium leading-[26px] text-white"
            >
              Okay
            </button>
          </div>
        </div>

        <div className="ml-[115px] flex flex-col gap-10">
          <CardCity
            name={city?.name}
            id={city?.id}
            image={city?.image}
            countPlaces={city?.places?.length}
          />
          <CardPlace
            place_id={place?.id}
            name={place?.name}
            category_name={place?.category?.name}
            icon={renderIconNameByCategoryName(place?.category?.name)}
            avaliation={place?.Depositions}
            image={place?.image}
          />
        </div>
      </main>
    </div>
  );
}
