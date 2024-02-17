'use client';

import { Album } from './data-type';
import { CellContext } from '@tanstack/react-table';
import SeeImage from '@/components/SeeImage';

const ImageCell = <TValue,>(data: CellContext<Album, TValue>) => {
  const {
    row: { original },
  } = data;

  if (!original || !original.image) {
    return null;
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${original.image}?t=${original.updatedAt}`;

  console.log(imageUrl);

  return <SeeImage url={imageUrl} />;
};

export default ImageCell;
