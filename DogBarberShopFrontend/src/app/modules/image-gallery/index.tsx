import Marquee from '@/components/ui/marquee';
import React from 'react';
import Image from "next/image";

const ImageGallery: React.FC = () => {
    // Add your component logic here

    return (
        <section id="gallery" className="flex flex-col max-w-5xl mb-16">
        <h2 className="text-3xl font-semibold text-white mb-6 mt-6 text-center">
          גלריה
        </h2>
        <Marquee repeat={10} pauseOnHover={true}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Image
              key={num}
              src={`/dog-${num}.jpg`}
              alt={`כלב מאושר ${num}`}
              width={300}
              height={300}
              className="rounded-lg shadow-lg"
            />
          ))}
        </Marquee>
      </section>
    );
};

export default ImageGallery;