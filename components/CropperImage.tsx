'use client';

import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import InputWithLabel from './InputWithLabel';
import { ChangeEventHandler, useRef, useState, useTransition } from 'react';
import LoadingButton from './LoadingButton';
import { toast } from 'sonner';
import { useModalDialog } from './ModalDialog';

type Props = {
  saveCropImgAction: (img: File) => Promise<void>;
};

const CropperImage = ({ saveCropImgAction }: Props) => {
  const [image, setImage] = useState<string>();
  const cropperRef = useRef<ReactCropperElement>(null);
  const [isPending, startTransition] = useTransition();
  const { closeDialog } = useModalDialog();
  const fileRef = useRef<File>();

  const handleChangeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || !files.length) {
      return;
    }
    fileRef.current = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCroppedBlob: () => Promise<Blob> = async () => {
    return new Promise((resolve, reject) => {
      if (!cropperRef.current) {
        reject('cropperRef is null');
        return;
      }
      cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
        if (!blob) {
          reject('blob is null');
          return;
        }
        resolve(blob);
      });
    });
  };

  const handleSaveCropImg = () => {
    if (!cropperRef.current) {
      return;
    }

    if (!image) {
      toast.warning('请选择图片');
      return;
    }

    startTransition(async () => {
      try {
        const blob = await getCroppedBlob();
        const file = fileRef.current!;
        await saveCropImgAction(new File([blob], file.name, { type: 'image/png', lastModified: file.lastModified }));
        closeDialog();
        toast.success('保存成功');
      } catch (e) {
        toast.error('保存失败');
      }
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <InputWithLabel name="cropperImg" label="选择图片" type="file" accept="image/*" onChange={handleChangeImage} />
        <LoadingButton text="保存" isLoading={isPending} type="button" onClick={handleSaveCropImg} />
      </div>
      <Cropper
        ref={cropperRef}
        style={{ height: 300, width: '100%' }}
        zoomTo={0.5}
        aspectRatio={1}
        preview=".img-preview"
        src={image}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        guides={true}
      />
      <h1>Preview</h1>
      <div className="img-preview" style={{ width: '100%', float: 'left', height: '300px', overflow: 'hidden' }} />
    </div>
  );
};

export default CropperImage;
