import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import { useState } from 'react';
import { cn } from '../config/cn';

export default function Gallery({ images }) {
  return (
    <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg-px-8">
      <Head>
        <title>Image Gallery</title>
      </Head>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => {
          return (
            <BlurImage
              key={image.id}
              imageSrc={image.imageSrc}
              href={image.href}
              name={image.name}
              username={image.username}
            />
          );
        })}
      </div>
    </div>
  );
}

function BlurImage({ imageSrc, name, username, href }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <a href={href} className="group">
      <div className="w-full overflow-hidden bg-gray-200 relative rounded-lg aspect-square xl:aspect-[8/7]">
        <Image
          src={imageSrc}
          alt="images"
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          objectFit="cover"
          layout="fill"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{username}</p>
    </a>
  );
}

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  const { data } = await supabaseAdmin.from('images').select('*').order('id');
  return {
    props: {
      images: data,
    },
  };
}
