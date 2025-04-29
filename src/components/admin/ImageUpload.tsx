
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, X } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

// Placeholder images from Unsplash for demo purposes
const placeholderImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1626633558329-8d5f709bb1bb?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1501556424050-d4816356b73e?auto=format&fit=crop&q=80&w=500",
];

export const ImageUpload = ({ images, onChange, maxImages = 5 }: ImageUploadProps) => {
  const [isSelectingPlaceholder, setIsSelectingPlaceholder] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    // In a real app, you'd upload the file to a server and get a URL back
    // For demo purposes, we'll use a fake URL
    const newImage = URL.createObjectURL(e.target.files[0]);
    if (maxImages === 1) {
      onChange([newImage]);
    } else {
      onChange([...images, newImage].slice(0, maxImages));
    }
    e.target.value = "";
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };
  
  const handleSelectPlaceholder = (url: string) => {
    if (maxImages === 1) {
      onChange([url]);
    } else {
      onChange([...images, url].slice(0, maxImages));
    }
    setIsSelectingPlaceholder(false);
  };
  
  return (
    <div className="space-y-4">
      {/* Image preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {images.map((image, index) => (
            <div key={index} className="group relative rounded-md overflow-hidden aspect-square">
              <img 
                src={image} 
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Upload controls */}
      {images.length < maxImages && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            className="flex-1"
          >
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            Качи изображение
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsSelectingPlaceholder(!isSelectingPlaceholder)}
            className="flex-1"
          >
            <Image className="mr-2 h-4 w-4" />
            Примерно изображение
          </Button>
        </div>
      )}
      
      {/* Placeholder image selection */}
      {isSelectingPlaceholder && (
        <div className="border rounded-md p-4 mt-4">
          <h3 className="font-medium mb-3">Избери примерно изображение</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {placeholderImages.map((url, index) => (
              <div 
                key={index}
                className="aspect-square rounded overflow-hidden cursor-pointer"
                onClick={() => handleSelectPlaceholder(url)}
              >
                <img src={url} alt={`Placeholder ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
