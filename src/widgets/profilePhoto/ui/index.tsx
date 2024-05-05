import { InputPhoto } from '../../../shared/ui/input/inputPhoto';
import { useState } from '../../../reactor/index';
import { uploadImage, deleteImage } from '../../../features/image/api';

const ProfilePhotoWidget = () => {
    const cells: any = Array.from({ length: 5 }, (index) => {
        return [useState(null), useState(false)];
    });
    const [enabledCellId, setEnabledCell] = useState(0);
    const processUpload = (index: number) => {
        return (file: any) => {
            cells[index][1][1](true);
            cells[index][0][1](async () => {
                try {
                    const response = await uploadImage(file, `${index}`);
                    cells[index][0][1](response);
                } catch {
                    cells[index][0][1](null);
                }
            });
        };
    };
    const processLoad = (index: number) => {
        return () => {
            cells[index][1][1](false);
            processEnableNext();
        };
    };
    const processDelete = (index: number) => {
        return () => {
            const response = deleteImage(`${index}`);
            cells[index][0][1](null);
        };
    };
    const processEnableNext = () => {
        for (let index = 0; index < cells.length; index++) {
            if (!cells[index][0][0]) {
                setEnabledCell(index);
                return;
            }
        }
    };

    return (
        <div className="widget__photo-edit">
            {cells.map((cell: any, index: any) => (
                <div
                    className={
                        index === 0 ? 'grid__item--first' : 'grid__item--other'
                    }
                >
                    <InputPhoto
                        disabled={index !== enabledCellId && !cell[0][0]}
                        accept="image/*"
                        onUpload={processUpload(index)}
                        onLoad={processLoad(index)}
                        onDelete={processDelete(index)}
                        loading={cell[1][0]}
                        currentImage={cell[0][0]}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProfilePhotoWidget;
