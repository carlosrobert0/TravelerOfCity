import { useEffect, useState } from "react";
import { DialogAcceptOrDeclineAvaliation } from "../../components/Dialog/DialogAcceptOrDeclineAvaliation";
import { DialogAvaliationDetails } from "../../components/Dialog/DialogAvaliationDetails";
import Nav from "../../components/Nav";
import { api } from "../../services/api";

interface CommentData {
  id: string
  name: string
  avatar?: string
  description?: string
  avaliation?: number | null
  status: string
  city: CityData
  place: any
}

interface CityData {
  id: string
  name: string
  image?: string
  description?: string
}

export default function Comments() {
  const [comments, setComments] = useState<CommentData[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAvaliationDetails, setIsOpenAvaliationsDetails] = useState(false)
  const [dataComment, setDataComment] = useState<CommentData>()

  function openDialogAcceptOrDeclineAvaliation() {
    setIsOpen(true)
  }

  function closeDialogAcceptOrDeclineAvaliation() {
    setIsOpen(false)
  }

  function openAvaliationDetails() {
    setIsOpenAvaliationsDetails(true)
  }

  function closeAvaliationDetails() {
    setIsOpenAvaliationsDetails(false)
  }

  async function getComments() {
    try {
      const response = await api.get('depositions')
      console.log(response.data)
      setComments(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <>
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
          <table className="w-[1120px] border-separate border-spacing-y-2 max-h-[760px] overflow-y-auto pb-6">
            {comments
              .sort((a, b) => {
                if (a.status === 'novo' && b.status !== 'novo') {
                  return -1; 
                } else if (a.status !== 'novo' && b.status === 'novo') {
                  return 1; 
                } else {
                  return 0; 
                }
              })
              .map(comment => (
              <tr
                key={comment.id}
                className={`w-full h-[88px] ${comment.status === 'novo' ? 'bg-gradient-to-r from-[#FFDB93]/30 to-shape' : 'bg-shape'}`}>
                <td className={`pl-6 rounded-tl-2xl rounded-bl-2xl relative overflow-visible border-t border-b border-l ${comment.status === 'novo' ? 'border-[#FFDB93]' : 'border-shape_secondary'}`} width="33%">
                  <div className="flex items-center justify-start gap-6">
                    <img src="/caparao.jpg" alt="" className="object-cover w-14 h-14 rounded-[50%]" />
                    <h4>{comment.name}</h4>
                  </div>
                  {comment.status === 'novo' && (
                    <div
                      className="w-14 h-[27px] bg-new_yellow border text-center border-yellow rounded-lg absolute font-heebo font-bold text-[10px] leading-[26px] text-shape top-[31px] -left-12"
                    >NOVO</div>
                  )}
                </td>
                <td width="7%" className="border-t border-b border-shape_secondary">
                  <div className="bg-[#F3F3F3] rounded-[50%] h-6 w-6 flex items-center justify-center">
                    {
                      comment.status === 'novo' ? <img src="/interrogation.svg" alt="" /> :
                      comment.status === 'accept' ? <img src="/accept.svg" alt="" /> :
                      comment.status === 'decline' && <img src="/decline.svg" alt="" />
                    }
                  </div>
                </td>
                <td className="border-t border-b border-shape_secondary">
                  <div className="flex flex-col">
                    <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">CATEGORIA</h4>
                    <h3 className="font-heebo font-medium text-base leading-6 text-text">{comment.place?.category.name}</h3>
                  </div>
                </td>
                <td className="border-t border-b border-shape_secondary">
                  <div className="flex flex-col">
                    <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">CIDADE</h4>
                    <h3 className="font-heebo font-medium text-base leading-6 text-text">
                      {comment.city.name}
                    </h3>
                  </div>
                </td>
                <td className="border-t border-b border-shape_secondary">
                  <div className="flex flex-col">
                    <h4 className="font-heebo font-medium text-[10px] leading-[22px] text-complement">LOCAL</h4>
                    <h3 className="font-heebo font-medium text-base leading-6 text-text">{comment.place.name}</h3>
                  </div>
                </td>
                <td className="pr-6 rounded-tr-2xl rounded-br-2xl border-t border-b border-r border-shape_secondary">
                  <button onClick={() => {
                    comment.status !== 'novo' ? 
                    openAvaliationDetails() : 
                    openDialogAcceptOrDeclineAvaliation()
                    setDataComment(comment)
                  }
                  }>
                    <img src="/seta.svg" alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </main>
      </div>
      <DialogAcceptOrDeclineAvaliation
        isOpen={isOpen}
        onClose={closeDialogAcceptOrDeclineAvaliation}
        dataComment={dataComment}
      />
      <DialogAvaliationDetails 
        isOpen={isOpenAvaliationDetails} 
        dataComment={dataComment} 
        onClose={closeAvaliationDetails}
      />
    </>
  )
}