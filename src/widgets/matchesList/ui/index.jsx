import Match from "../../../entities/person/ui/match";

const MatchesList = () => {

    const matches = [
        {
            name: 'Иван',
            age: 25,
            image: 'https://i.pinimg.com/originals/3b/9d/7b/3b9d7b8d0d5e1c7b4f5a5c7d9e5a4d9c.jpg',
            description: 'Программист',
            interests: ['Программирование', 'Музыка', 'Спорт']
        },
        {
            name: 'Алексей',
            age: 30,
            image: 'https://i.pinimg.com/originals/3b/9d/7b/3b9d7b8d0d5e1c7b4f5a5c7d9e5a4d9c.jpg',
            description: 'Программист',
            interests: ['Программирование', 'Музыка', 'Спорт']
        },
        {
            name: 'Александр',
            age: 35,
            image: 'https://i.pinimg.com/originals/3b/9d/7b/3b9d7b8d0d5e1c7b4f5a5c7d9e5a4d9c.jpg',
            description: 'Программист',
            interests: ['Программирование', 'Музыка', 'Спорт']
        },
    ];

    return(
        <div className="matches">
            <h1 className="matches__header">Ваши мэтчи</h1>
            <div id="matches__content">
                {matches.map((match, index) => (
                    <Match key={index} person={match} />
                ))}
            </div>
        </div>
    );
};

export default MatchesList;
