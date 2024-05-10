import { clsx } from '../../../clsx/index';
import imageCreate from './assets/create.svg';

export type TInputPhoto = {
    accept: TAccept;
    onUpload: (event: any) => void;
    onLoad: (event: any) => void;
    onDelete: (event: any) => void;
    disabled?: boolean;
    maxFileSize?: number;
    currentImage?: string;
    loading?: boolean;
};

export type TAccept = 'image/*';

export const InputPhoto = ({
    accept,
    onUpload,
    onLoad,
    onDelete,
    disabled,
    maxFileSize = 10000000,
    loading,
    currentImage,
}: TInputPhoto) => {
    const handleFileUpload = (event: any) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        let file: File = null;
        if (target && target.files) {
            file = target.files[0];
        }
        if (file) {
            if (file.size > maxFileSize) {
                return;
            }
            onUpload(file);
            target.value = null;
        }
    };
    const defaultImage = `data:image/svg+xml,${imageCreate}`;
    return (
        <div
            className={clsx(
                'input-container__photo',
                disabled && 'any--disabled',
                !(currentImage || loading) && 'any',
            )}
        >
            <div
                className={clsx('input__loader', !loading && 'any--none')}
            ></div>
            <span
                className={clsx(
                    'icon-trash3',
                    'photo__cross',
                    (!currentImage || loading) && 'any--none',
                )}
                onClick={onDelete}
            ></span>
            <img
                className={clsx('profile__photo', loading && 'any--none')}
                src={currentImage || defaultImage}
                onLoad={onLoad}
            />
            <input
                className={clsx(
                    'any--hidden',
                    'input__photo',
                    (currentImage || loading) && 'any--none',
                )}
                type="file"
                accept={accept}
                onChange={handleFileUpload}
                disabled={currentImage || loading}
            ></input>
        </div>
    );
};
