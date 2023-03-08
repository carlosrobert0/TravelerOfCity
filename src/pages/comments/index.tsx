import Nav from "../../components/Nav";

export default function Comments() {
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
        </table>
      </main>
    </div>
  )
}