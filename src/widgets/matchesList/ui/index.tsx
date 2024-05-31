import Match from '../../../entities/person/ui/match/index';
import { useState, useEffect } from '../../../reactor/index';
import { getMatches } from '../../../entities/person/api/index';
import { Input, Modal, Button, ButtonLink } from '../../../shared/ui/index';
import { clsx } from '../../../shared/lib/clsx/index';
import { getAge } from '../../../shared/lib/date/index';
import { store } from '../../../app/app';
import { navigateTo } from '../../../app/router';
import { EyeLoader, UserPhotoWidget } from '../../index';

const MatchesList = () => {
    const [matches, setMatches] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [active, setActive] = useState(false);
    const [matchData, setMatchData] = useState({} as any);
    const [newMatches, setNewMatches] = useState(store.getState().newMatches);

    useEffect(() => {
        const unsubscribe = store.subscribe(
            (newMatches: string[]) => {
                setNewMatches(newMatches);
            },
            ['newMatches'],
        );

        return () => {
            unsubscribe();
        };
    }, []);

    async function getMatch(name: string) {
        try {
            const response = await getMatches(name);
            console.log('matches', response);
            setMatches(response);
            setTimeout(() => {
                setLoader(false);
            }, 100);
        } catch (err) {
            return;
        }
    }

    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const id = setTimeout(() => {
            getMatch(searchName);
        }, 500);
        return () => {
            clearTimeout(id);
            setLoader(true);
        };
    }, [searchName]);

    /**
     * Обработчик изменения значения в поле поиска
     * @param {any} event - объект события
     * @return {void}
     */
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
                {!loader &&
                    matches.map((match, index) =>
                        Match({
                            person: match,
                            setActive: setActive,
                            setData: setMatchData,
                            isNew: newMatches && newMatches.includes(match.id),
                        }),
                    )}
            </div>
            <div
                className={clsx(
                    'match__placeholder',
                    matches.length !== 0 || loader ? 'any--none' : '',
                )}
            >
                К сожалению, ничего не найдено...
                <ButtonLink
                    to="/main"
                    label="К карточкам"
                    severity="success"
                    size="xl"
                    fontSize="l"
                />
            </div>
            <EyeLoader active={loader} placeholder={'Ищем ваши мэтчи...'} />

            <Modal active={active} setActive={setActive}>
                <div className="dialog dialog--card">
                    <div className="dialog__header">
                        <UserPhotoWidget
                            url={
                                matchData.photos &&
                                matchData.photos[0] &&
                                matchData.photos[0].url != ''
                                    ? matchData.photos[0].url
                                    : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                            }
                            premium={matchData.premium}
                            size="m"
                        />
                        <span className="dialog__title data__text">
                            {`${matchData.name},  ${getAge(
                                matchData.birthday,
                            )}`}
                        </span>
                    </div>
                    <p className="data__text">
                        {matchData.description
                            ? matchData.description
                            : 'Пользователь пока не рассказал о себе.'}
                    </p>
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
                                    payload: {
                                        id: matchData.id,
                                        name: matchData.name,
                                        photo:
                                            matchData.photos[0].url == ''
                                                ? 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                                                : matchData.photos[0].url,
                                    },
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
