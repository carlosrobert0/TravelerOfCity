import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FiAlertCircle, FiCamera, FiEdit3, FiTrash } from 'react-icons/fi';

import CardCountPlacesByCategory from '../../components/card/CardCountPlacesByCategory';
import { CardPlace } from '../../components/card/CardPlace';
import { IconsHandleCard } from '../../components/IconsHandleCard';
import Nav from '../../components/Nav';
import { NavCategories } from '../../components/NavCategories';
import { api } from '../../services/api';
import { renderIconNameByCategoryName } from '../../utils/renderIconNameByCategoryName';
import { CityFormData } from './create';

export default function City() {
  const [city, setCity] = useState<CityFormData | null | any>();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const [hasProminence] = useState(true);

  const { id } = router.query;

  function handleGoBack() {
    router.back();
  }

  async function getCity() {
    const response = await api.get(`/cities/${id}`);
    setCity(response.data);
  }

  async function getCategories() {
    const response = await api.get('/categories');
    console.log(response.data);
    setCategories(response.data);
  }

  useEffect(() => {
    getCategories();
    getCity();
  }, []);

  return (
    <div className="flex h-[2000px] w-screen justify-between overflow-hidden overflow-x-hidden">
      <Nav />

      <main className="relative ml-24 flex w-full flex-col overflow-x-hidden overflow-y-scroll">
        <header className={`flex h-[96px] w-full items-center bg-shape px-20`}>
          <BsArrowLeft
            onClick={handleGoBack}
            className="my-6 w-[128px] font-barlow text-4xl font-semibold leading-10 text-complement"
          />
          <div className="ml-[700px] mr-6 flex gap-1">
            <button
              onClick={() => router.push(`/cities/edit/${city?.id}`)}
              className="top-4 right-16 flex h-10 w-10 items-center justify-center 
                rounded-l-xl border-[1px] border-shape_secondary bg-shape text-text"
            >
              <FiEdit3 size={20} />
            </button>
            <button
              onClick={() => router.push(`/cities/delete/${id}`)}
              className="top-4 right-4 flex h-10 w-10 items-center justify-center 
                rounded-r-xl border-[1px] border-shape_secondary bg-shape text-text"
            >
              <FiTrash size={20} />
            </button>
          </div>
          <Link href={`/place/create/${city?.id}`}>
            <a
              className="flex h-[48px] w-[216px] items-center justify-center 
              rounded-lg bg-success font-heebo text-base font-medium leading-[26px] text-shape"
            >
              + Adicionar um local
            </a>
          </Link>
        </header>
        <hr className="w-[1344px] border bg-shape_secondary" />
        <div className="h-[862px] w-full flex-1">
          <Image
            alt={city?.name}
            src={city?.image}
            objectFit="cover"
            width={1440}
            height={340}
          />

          <section className="flex gap-[103px] px-28 pt-20">
            <div className="flex flex-col">
              <h1 className="mb-10 font-barlow text-[54px] font-semibold leading-[54px] text-title">
                {city?.name}
              </h1>
              <h3 className="font-regular mb-8 w-[506px] font-heebo text-xl leading-[30px] text-title">
                {city?.description}
              </h3>
            </div>
            <div className="flex gap-4">
              {categories?.map((category: any) => {
                const places = category?.Places.filter(
                  (place: any) => place.city_id === id
                );
                const count = places?.length;
                return (
                  <CardCountPlacesByCategory
                    key={category.id}
                    count={count > 0 && count < 9 ? `0${count}` : `${count}`}
                    title={category.name}
                    icon={renderIconNameByCategoryName(category.name)}
                  />
                );
              })}
            </div>
          </section>

          <section className="ml-28 mt-[120px] flex flex-col gap-8">
            <h3 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
              Top avaliados
            </h3>
            <div className="flex justify-start gap-8">
              {city?.places.map((placeByCityId: any) => {
                return (
                  <CardPlace
                    key={placeByCityId?.id}
                    place_id={placeByCityId?.id}
                    name={placeByCityId?.name}
                    category_name={placeByCityId?.category?.name}
                    icon={renderIconNameByCategoryName(placeByCityId?.category?.name)}
                    avaliation={placeByCityId?.Depositions}
                    image={placeByCityId?.image}
                  />
                );
              })}
            </div>
          </section>

          {!hasProminence ? (
            <section
              className="relative mb-20 mt-20 ml-28 flex h-[286px] 
                w-[1120px] items-center justify-center overflow-hidden rounded-2xl 
                border-[2px] border-dashed border-shape_secondary bg-shape"
            >
              <h1 className="text-center font-heebo text-base leading-[26px] text-brand-orange">
                Crie um destaque arrastando um card aqui
              </h1>
            </section>
          ) : (
            <section
              className="relative mb-20 mt-20 ml-28 
                flex h-[286px] w-[1120px] justify-between overflow-hidden rounded-2xl border-[1px] border-shape_secondary bg-shape"
            >
              <div className="mt-[43px] ml-16 mr-[60px] flex h-[194px] w-[560px] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-8 w-[119px] items-center justify-center gap-2 rounded-2xl 
                      bg-brand-orange text-shape"
                  >
                    <FiAlertCircle size={20} />
                    <h6 className="font-barlow text-sm font-semibold leading-4">
                      Destaque
                    </h6>
                  </span>
                  <div className="flex h-[26px] w-[200px] gap-6">
                    <FiCamera size={24} color="#F25D27" />
                    <h4 className="font-barlow text-base font-medium leading-[26px] text-text">
                      Pontos turísticos
                    </h4>
                  </div>
                </div>
                <h1 className="mt-8 mb-4 font-barlow text-4xl font-semibold leading-9 text-title">
                  Praia dos Ingleses
                </h1>
                <h4 className="font-regular font-heebo text-base leading-[26px] text-text">
                  Uma parte do paraíso na terra. Frequentemente com águas claras
                  em tons verdes e azuis. Um dos locais mais preferidos por
                  turistas e viajantes.
                </h4>
              </div>
              <Image
                alt=""
                src="/imgDestaque.png"
                objectFit="cover"
                width="650px"
                height="286px"
                className="ml-10"
              />
              <div className="absolute top-4 right-4">
                <IconsHandleCard id={city?.id} module="cities" />
              </div>
            </section>
          )}

          <section className="ml-28 flex h-[756px] w-full flex-col">
            <div className="mb-12 flex w-[1120px] items-end justify-between">
              <h1 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
                Conheça todos
              </h1>
              <div className="flex flex-col">
                <NavCategories
                  categories={categories}
                  handleSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-8">
                {city?.places
                  .filter(
                    (placeByCityId: any) =>
                      selectedCategory === '' ||
                      placeByCityId.category_id === selectedCategory
                  )
                  .map((placeByCityId: any) => {
                    return (
                      <CardPlace
                        key={placeByCityId?.id}
                        place_id={placeByCityId?.id}
                        name={placeByCityId?.name}
                        category_name={placeByCityId?.category?.name}
                        icon={renderIconNameByCategoryName(placeByCityId?.category?.name)}
                        avaliation={placeByCityId?.Depositions}
                        image={placeByCityId?.image}
                      />
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
