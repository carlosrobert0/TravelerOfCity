import { ChangeEvent, useState } from "react"
import { FiTrash } from "react-icons/fi";

interface ImageUploaderProps {
  onImageChange: (imageBase64: string) => void
  imageData?: string
}

export function ImageUploader({ onImageChange, imageData }: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        onImageChange(reader.result as string);
      };
    }
  };

  return (
    <>
      {
        imageData ? (
          <div className="relative w-full" >
            <img
              src={imageData}
              className="flex h-64 w-full flex-col object-none rounded-lg"
            />
            <div className="flex gap-1 absolute top-4 right-4">
              <button
                onClick={() => setImagePreview(null)}
                className="top-4 right-4 flex h-10 w-10 items-center justify-center rounded border-[1px] border-shape_secondary bg-background text-text">
                <FiTrash size={20} />
              </button>
            </div>
          </div>
        ) :
          imagePreview ? (
            <div className="relative w-full" >
              <img
                src={imagePreview}
                className="flex h-64 w-full flex-col object-none rounded-lg"
              />
              <div className="flex gap-1 absolute top-4 right-4">
                <button
                  onClick={() => setImagePreview(null)}
                  className="top-4 right-4 flex h-10 w-10 items-center justify-center rounded border-[1px] border-shape_secondary bg-background text-text">
                  <FiTrash size={20} />
                </button>
              </div>
            </div>) : (
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer 
          bg-background flex-col items-center justify-center rounded-lg border-2 border-dashed border-shape-secondary hover:bg-background dark:border-shape-secondary dark:bg-background dark:hover:border-gray-500 dark:hover:bg-background"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-heebo text-base text-brand-orange">
                      + Adicionar uma foto
                    </span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )
      }
    </>
  )
}