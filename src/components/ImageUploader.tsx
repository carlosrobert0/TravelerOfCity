import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { ChangeEvent, useEffect, useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import { storage } from '../services/firebase'

interface ImageUploaderProps {
  onImageURLChange: (imageURL: string) => void
  hasIcon?: boolean
  imageData?: any
}

export function ImageUploader({
  onImageURLChange,
  hasIcon = false,
}: ImageUploaderProps) {
  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    onImageURLChange(imageURL)
  }, [imageURL, onImageURLChange])

  useEffect(() => {
    console.log('chegou')
    console.log(imageURL)
  }, [imageURL])

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    console.log('yes')
    const file = event.target.files?.[0]
    console.log('file', file)
    if (!file) return
    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    console.log(storageRef, uploadTask)
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageURL(url)
        })
      },
    )
  }

  const removeImageFromStorage = async (imagePath) => {
    const storageRef = ref(storage, imagePath)

    try {
      await deleteObject(storageRef)
      setImageURL('')
    } catch (error) {
      console.error('Error removing image:', error)
    }
  }

  return (
    <>
      {imageURL ? (
        <div className="relative w-full">
          <img
            alt="Imagem da cidade ou local"
            src={imageURL}
            className={`flex ${
              hasIcon ? 'h-[120px] w-[120px]' : 'h-64 w-full'
            } flex-col rounded-lg object-none`}
          />
          <div className="absolute top-4 right-4 flex gap-1">
            <button
              onClick={() => removeImageFromStorage(imageURL)}
              className="top-4 right-4 flex h-10 w-10 items-center justify-center rounded border-[1px] border-shape_secondary bg-background text-text"
            >
              <FiTrash size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className={`dark:hover:bg-bray-800 flex ${
              hasIcon ? 'h-[120px] w-[120px]' : 'h-64 w-full'
            } border-shape-secondary 
              dark:border-shape-secondary cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-background hover:bg-background dark:bg-background dark:hover:border-gray-500 dark:hover:bg-background`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex flex-col gap-4 font-heebo text-base text-brand-orange">
                  {hasIcon ? ' + ' : '+ Adicionar uma foto'}
                </span>
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        </div>
      )}
    </>
  )
}
