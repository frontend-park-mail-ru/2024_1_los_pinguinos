import { getAge } from '../../../../shared/lib/date/index';
import './index.css';
import { store } from '../../../../app/app';

const Match = ({ person, setActive, setData, isNew }: any) => {
    return (
        <div
            match-after-text={isNew ? 'Новый' : ''}
            match-after-type="badge top right"
            className="match__card"
            onClick={() => {
                setActive(true);
                setData(person);
                store.dispatch({
                    type: 'REMOVE_NEW_MATCH',
                    payload: person.id,
                });
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
