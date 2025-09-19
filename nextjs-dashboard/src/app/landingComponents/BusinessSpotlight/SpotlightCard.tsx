import Image from "next/image";

type SpotlightCardProps = {
  name: string;
  description: string;
  images: string[]; 
};

export default function SpotlightCard({ name, description, images }: SpotlightCardProps) {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white p-6 flex flex-col items-center text-center">
      {/* Title */}
      <h3 className="text-xl font-semibold">{name}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2 mb-4">{description}</p>

      {/* Image gallery */}
      <div className="flex gap-3 justify-center flex-wrap">
        {images.map((src, idx) => (
          <div key={idx} className="w-28 h-28 relative">
          <Image
            src={src}
            alt={`${name} image ${idx + 1}`}
            width={80}
            height={80}
            className="object-cover rounded-md"
          />
          </div>
        ))}
      </div>
    </div>
  );
}
