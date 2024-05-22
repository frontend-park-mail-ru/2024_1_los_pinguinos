/**
 * A PhotoInput component that renders a composite file input for photo uploads.
 *
 * @function PhotoInput
 * @param {TPhotoInput} props - The properties of the photo input component.
 * @returns {JSX.Element} The rendered photo input component.
 */
const PhotoInput = ({ onChange, value, ...props }) => {
    return (
        <div className="photoInput">
            <button className="photoInput__button">
                <input
                    type="file"
                    onChange={onChange}
                    value={value}
                    {...props}
                />
                <span>Загрузить фото</span>
            </button>
        </div>
    );
};

export default PhotoInput;
