import { InputPhoto } from '../../../shared/ui/input/inputPhoto';
import { useState } from '../../../reactor/index';
import { uploadImage, deleteImage } from '../../../features/image/api';
import { store } from '../../../app/app';

/**
 * A ProfilePhotoWidget component that renders a widget for uploading and managing profile photos.
 *
 * @function ProfilePhotoWidget
 * @returns {JSX.Element} The rendered profile photo widget.
 */
const ProfilePhotoWidget = () => {
    const userPhotos = store.getState().photos;
    const cells: any = Array.from({ length: 5 }, (_, index: number) => {
        return [
            useState(
                userPhotos
                    ? userPhotos.length > index
                        ? userPhotos[index].url
                        : null
                    : null,
            ),
            useState(false),
        ];
    });
    const [enabledCellId, setEnabledCell] = useState(0);

    /**
     * Handles the upload of a photo.
     *
     * @function processUpload
     * @param {number} index - The index of the photo cell.
     * @returns {Function} The function to handle the file upload.
     */
    const processUpload = (index: number) => {
        return (file: any) => {
            cells[index][1][1](true);
            cells[index][0][1](async () => {
                try {
                    const response = await uploadImage(file, `${index}`);
                    cells[index][0][1](response);
                    const newPhotos = Array.from(userPhotos);
                    newPhotos[index].url = response;
                    store.dispatch({
                        type: 'UPDATE_SOMETHING',
                        payload: { photos: newPhotos },
                    });
                    return response;
                } catch {
                    cells[index][0][1](null);
                    return null;
                }
            });
        };
    };

    /**
     * Handles the load event of a photo.
     *
     * @function processLoad
     * @param {number} index - The index of the photo cell.
     * @returns {Function} The function to handle the load event.
     */
    const processLoad = (index: number) => {
        return () => {
            cells[index][1][1](false);
            processEnableNext();
        };
    };

    /**
     * Handles the deletion of a photo.
     *
     * @function processDelete
     * @param {number} index - The index of the photo cell.
     * @returns {Function} The function to handle the delete event.
     */
    const processDelete = (index: number) => {
        return async () => {
            try {
                cells[index][1][1](true);
                const response = await deleteImage(`${index}`);
                cells[index][1][1](false);
                cells[index][0][1](null);
                const newPhotos = Array.from(userPhotos);
                newPhotos[index].url = null;
                store.dispatch({
                    type: 'UPDATE_SOMETHING',
                    payload: { photos: newPhotos },
                });
            } catch {
                cells[index][1][1](false);
                return;
            }
        };
    };

    /**
     * Enables the next photo cell for upload.
     *
     * @function processEnableNext
     */
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
                    {InputPhoto({
                        disabled: index !== enabledCellId && !cell[0][0],
                        accept: 'image/*',
                        onUpload: processUpload(index),
                        onLoad: processLoad(index),
                        onDelete: processDelete(index),
                        loading: cell[1][0],
                        currentImage: cell[0][0],
                    })}
                </div>
            ))}
        </div>
    );
};

export default ProfilePhotoWidget;
