const CardControllers = () => {

    const handleLike = () => {
        console.log('Like');
    };

    const handleDislike = () => {
        console.log('Dislike');
    };

    return (
        <div>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDislike}>Dislike</button>
        </div>
    );
};

export default CardControllers;
