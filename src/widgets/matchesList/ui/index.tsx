import Match from '../../../entities/person/ui/match/index';
import { useState, useEffect } from '../../../reactor/index';
import { getMatches } from '../../../entities/person/api/index';
import { Input, Modal, Button } from '../../../shared/ui/index';
import { clsx } from '../../../clsx/index';
import { getAge } from '../../../shared/lib/index';
import { store } from '../../../app/app';
import { navigateTo } from '../../../app/router';

const MatchesList = () => {
    const [matches, setMatches] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [active, setActive] = useState(false);
    const [matchData, setMatchData] = useState({} as any);
    async function getMatch(name: string) {
        try {
            const response = await getMatches(name);
            setMatches(response);
        } catch (err) {
            return;
        }
    }
    useEffect(() => {
        const id = setTimeout(() => {
            getMatch(searchName);
        }, 500);
        return () => {
            clearTimeout(id);
        };
    }, [searchName]);
    function remapMatches(event: any) {
        setSearchName(event.target.value);
    }
    return (
        <div className="match__wrapper">
            <h1 className="match__header">Ваши мэтчи</h1>
            <div className="match__search">
                {Input({
                    type: 'text',
                    onInput: remapMatches,
                    placeholder: 'Поиск',
                    maxlength: 32,
                })}
            </div>
            <div
                className={clsx(
                    'match__container',
                    matches.length === 0 ? 'any--none' : '',
                )}
            >
                {matches.map((match, index) =>
                    Match({
                        person: match,
                        setActive: setActive,
                        setData: setMatchData,
                    }),
                )}
            </div>
            <div
                className={clsx(
                    'match__header',
                    matches.length !== 0 ? 'any--none' : '',
                )}
            >
                К сожалению, здесь пусто...
            </div>
            <Modal active={active} setActive={setActive}>
                <div className="dialog dialog--card">
                    <div className="dialog__header">
                        <img
                            src={
                                matchData.photos &&
                                matchData.photos[0] &&
                                matchData.photos[0].url != ''
                                    ? matchData.photos[0].url
                                    : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                            }
                            alt={matchData.name}
                            className="dialog__profile-picture"
                        />
                        <span className="dialog__title data__text">
                            {`${matchData.name},  ${getAge(
                                matchData.birthday,
                            )}`}
                        </span>
                    </div>
                    <p className="data__text">{matchData.description}</p>
                    <div className="dialog__button-wrap">
                        <Button
                            onClick={() => {
                                setActive(false);
                            }}
                            label="Закрыть"
                            severity="cancel"
                            fontSize="m"
                        />
                        <Button
                            onClick={() => {
                                setActive(false);
                                navigateTo('/chats');
                                store.dispatch({
                                    type: 'UPDATE_CURRENT_CHAT',
                                    payload: matchData.id,
                                });
                            }}
                            icon="icon-chat-text"
                            label="Перейти в чат"
                            severity="success"
                            fontSize="m"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MatchesList;
