
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
    )
}

export default PhotoInput;