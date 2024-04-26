// import { PhotoInput } from "../../../shared/ui";
import { useState } from "../../../reactor";

const PhotoEdit = () => {

    const [photo, setPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);

    const handleChange = (e) => {
        const selectedPhoto = e.target.files[0];
        if (selectedPhoto) {
            setPhoto(selectedPhoto);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoUrl(reader.result);
            };
            reader.readAsDataURL(selectedPhoto);
        }
    };

    return (
        <div className="photoEdit">
            <div className="photoEdit__photo">
                <input 
                    type="file" 
                    onChange={handleChange}
                    accept="image/*"
                    style={{ display: photoUrl ? 'none' : 'block' }}
                />
                <img
                    style={{ display: photoUrl ? 'block' : 'none' }} 
                    src={photoUrl} 
                    alt="photo"
                />
                <button 
                    style={{ display: photoUrl ? 'block' : 'none' }}
                    onClick={() => {
                        setPhoto(null);
                        setPhotoUrl(null);
                    }}
                >Удалить фото</button>
            </div>
        </div>
    )
};

export default PhotoEdit;