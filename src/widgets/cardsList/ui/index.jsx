import Card from '../../../entities/person/ui/card';

const CardsList = () => {

    const cards = [
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

    return (
        <div>
            {cards.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
};

export default CardsList;
