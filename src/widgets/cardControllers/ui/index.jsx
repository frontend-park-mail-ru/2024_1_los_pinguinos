import { like, dislike } from '../../../features/like/api';

const CardControllers = () => {
    // useEffect(() => {
    //     store.subscribe(() => {
    //         console.log(store.getState().currentCard);
    //     });
    // }, [discard]);

    // const [discard, setDiscard] = useState(false);
    // const currentCard = store.getState().currentCard;
    const getCurrent = () => {
        const cards = document.querySelectorAll('.card');
        const currentCard = cards[cards.length - 1].id.split('-')[1];

        return +currentCard;
    };

    const handleLike = () => {
        const currentCard = getCurrent();
        like(currentCard);

        const cards = document.querySelectorAll('.card');
        const currentcard = cards[cards.length - 1];
        currentcard.style.transition = 'transform 0.5s ease-in-out';
        currentcard.remove();
    };

    const handleDislike = () => {
        const currentCard = getCurrent();
        dislike(currentCard);

        const cards = document.querySelectorAll('.card');
        const currentcard = cards[cards.length - 1];
        currentcard.style.transition = 'transform 0.5s ease-in-out';
        currentcard.remove();
    };

    return (
        <div className="card-controllers">
            {/* <button onClick={handleLike}>Like</button> */}
            <svg
                style={{ cursor: 'pointer', height: '80px' }}
                onClick={handleDislike}
                fill="#d53939"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="cross-circle"
                class="icon glyph"
                stroke="#d53939"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,12.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.42,9.71,15.71a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.58,12,8.29,9.71A1,1,0,0,1,9.71,8.29L12,10.58l2.29-2.29a1,1,0,0,1,1.42,1.42L13.42,12Z"></path>
                </g>
            </svg>
            <svg
                style={{ cursor: 'pointer', height: '80px' }}
                onClick={handleLike}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                        fill="#45d96a"
                    ></path>{' '}
                </g>
            </svg>

            {/* <button onClick={handleDislike}>Dislike</button> */}
        </div>
    );
};

export default CardControllers;
