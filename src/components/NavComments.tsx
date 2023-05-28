interface NavCommentsProps {
  selectedStatusComment: string | ''
  handleSelectedStatusComment: (selectedStatusComment?: string) => void
  comments: any[]
}

export function NavComments({
  selectedStatusComment,
  handleSelectedStatusComment,
  comments,
}: NavCommentsProps) {
  return (
    <>
      <nav className="flex h-[38px] w-full items-start justify-end gap-8">
        <button
          onClick={() => handleSelectedStatusComment('')}
          className={`font-regular font-heebo text-base leading-[26px] text-text ${
            selectedStatusComment === '' &&
            'font-hoboto font-bold text-title underline decoration-brand-orange underline-offset-[20px]'
          }`}
        >
          Todos
        </button>
        {comments.map((comment: any) => (
          <button
            key={comment.status}
            onClick={() => handleSelectedStatusComment(comment.status)}
            className={`font-regular font-heebo text-base leading-[26px] text-text ${
              selectedStatusComment === comment.status &&
              'font-hoboto font-bold text-title underline decoration-brand-orange underline-offset-[20px]'
            }`}
          >
            {comment.name}
          </button>
        ))}
      </nav>
      <hr className="bg-shape_secondary" />
    </>
  )
}
