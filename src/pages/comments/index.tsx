import { useEffect, useState } from 'react'
import { DialogAcceptOrDeclineAvaliation } from '../../components/Dialog/DialogAcceptOrDeclineAvaliation'
import { DialogAvaliationDetails } from '../../components/Dialog/DialogAvaliationDetails'
import Nav from '../../components/Nav'
import { NavComments } from '../../components/NavComments'
import { api } from '../../services/api'

interface CityData {
  id: string
  name: string
  image?: string
  description?: string
}
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

export default function Comments() {
  const [comments, setComments] = useState<CommentData[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAvaliationDetails, setIsOpenAvaliationsDetails] = useState(false)
  const [dataComment, setDataComment] = useState<CommentData>()
  const [selectedStatusComment, setSelectedStatusComment] = useState('')

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

  const statusComments = [
    {
      name: 'Recentes',
      status: 'new',
    },
    {
      name: 'Aceitos',
      status: 'accept',
    },
    {
      name: 'Recusados',
      status: 'decline',
    },
  ]

  useEffect(() => {
    getComments()
  }, [])

  useEffect(() => {
    console.log(comments)
  }, [])

  return (
    <>
      <div className="relative">
        <Nav />
        <header className="ml-24 flex h-24 w-full items-center justify-between bg-shape px-28">
          <h1 className="font-barlow text-4xl font-semibold leading-[46px] text-title">
            Comentários
          </h1>

          <div className="mr-28 flex flex-col">
            <NavComments
              comments={statusComments}
              handleSelectedStatusComment={setSelectedStatusComment}
              selectedStatusComment={selectedStatusComment}
            />
          </div>
        </header>
        <main className="ml-[208px] mt-12 flex items-center">
          <table className="max-h-[760px] w-[1120px] border-separate border-spacing-y-2 overflow-y-auto pb-6">
            {comments
              .filter(
                (comment: any) =>
                  selectedStatusComment === '' ||
                  comment.status === selectedStatusComment,
              )
              .sort((a, b) => {
                if (a.status === 'new' && b.status !== 'new') {
                  return -1
                } else if (a.status !== 'new' && b.status === 'new') {
                  return 1
                } else {
                  return 0
                }
              })
              .map((comment) => (
                <tr
                  key={comment.id}
                  className={`h-[88px] w-full ${
                    comment.status === 'new'
                      ? 'bg-gradient-to-r from-[#FFDB93]/30 to-shape'
                      : 'bg-shape'
                  }`}
                >
                  <td
                    className={`relative overflow-visible rounded-tl-2xl rounded-bl-2xl border-t border-b border-l pl-6 ${
                      comment.status === 'new'
                        ? 'border-[#FFDB93]'
                        : 'border-shape_secondary'
                    }`}
                    width="33%"
                  >
                    <div className="flex items-center justify-start gap-6">
                      <img
                        src="/caparao.jpg"
                        alt=""
                        className="h-14 w-14 rounded-[50%] object-cover"
                      />
                      <h4>{comment.name}</h4>
                    </div>
                    {comment.status === 'new' && (
                      <div className="absolute top-[31px] -left-12 h-[27px] w-14 rounded-lg border border-yellow bg-new_yellow text-center font-heebo text-[10px] font-bold leading-[26px] text-shape">
                        NOVO
                      </div>
                    )}
                  </td>
                  <td
                    width="7%"
                    className="border-t border-b border-shape_secondary"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-[50%] bg-[#F3F3F3]">
                      {comment.status === 'new' ? (
                        <img src="/interrogation.svg" alt="" />
                      ) : comment.status === 'accept' ? (
                        <img src="/accept.svg" alt="" />
                      ) : (
                        comment.status === 'decline' && (
                          <img src="/decline.svg" alt="" />
                        )
                      )}
                    </div>
                  </td>
                  <td className="border-t border-b border-shape_secondary">
                    <div className="flex flex-col">
                      <h4 className="font-heebo text-[10px] font-medium leading-[22px] text-complement">
                        CATEGORIA
                      </h4>
                      <h3 className="font-heebo text-base font-medium leading-6 text-text">
                        {comment.place?.category.name}
                      </h3>
                    </div>
                  </td>
                  <td className="border-t border-b border-shape_secondary">
                    <div className="flex flex-col">
                      <h4 className="font-heebo text-[10px] font-medium leading-[22px] text-complement">
                        CIDADE
                      </h4>
                      <h3 className="font-heebo text-base font-medium leading-6 text-text">
                        {comment.city.name}
                      </h3>
                    </div>
                  </td>
                  <td className="border-t border-b border-shape_secondary">
                    <div className="flex flex-col">
                      <h4 className="font-heebo text-[10px] font-medium leading-[22px] text-complement">
                        LOCAL
                      </h4>
                      <h3 className="font-heebo text-base font-medium leading-6 text-text">
                        {comment.place.name}
                      </h3>
                    </div>
                  </td>
                  <td className="rounded-tr-2xl rounded-br-2xl border-t border-b border-r border-shape_secondary pr-6">
                    <button
                      onClick={() => {
                        comment.status !== 'new'
                          ? openAvaliationDetails()
                          : openDialogAcceptOrDeclineAvaliation()
                        setDataComment(comment)
                      }}
                    >
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
