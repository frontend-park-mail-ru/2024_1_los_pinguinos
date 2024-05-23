import { getAge } from '../../../../shared/lib/date/index';

const Match = ({ person, setActive, setData }: any) => {
    return (
        <div
            className="match__card"
            onClick={() => {
                setActive(true);
                setData(person);
            }}
        >
            <img
                className="match__preview-photo"
                src={
                    person.photos &&
                    person.photos[0] &&
                    person.photos[0].url != ''
                        ? person.photos[0].url
                        : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                }
                alt={person.name}
            />
            <div className="match__data">
                <span className="data__text">
                    {person.name}, {getAge(person.birthday)}
                </span>
            </div>
        </div>
    );
};

export default Match;
