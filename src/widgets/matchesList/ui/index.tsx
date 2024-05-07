import Match from '../../../entities/person/ui/match/index';
import { useState, useEffect } from '../../../reactor/index';
import { getMatches } from '../../../entities/person/api/index';
import { Input } from '../../../shared/ui/index';

const MatchesList = () => {
    const [matches, setMatches] = useState([]);
    const [searchName, setSearchName] = useState('');
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
        }, 200);
        return () => {
            clearTimeout(id);
        };
    }, [searchName]);

    return (
        <div className="matches">
            <h1 className="matches__header">Ваши мэтчи</h1>
            <div>
                <Input
                    type="text"
                    onInput={(event) => setSearchName(event.target.value)}
                    placeholder="Поиск"
                />
            </div>
            {matches.length != 0 ? (
                <div id="matches__content">
                    {matches.map((match, index) => Match({ person: match }))}
                </div>
            ) : (
                <p
                    style={{
                        fontSize: 'large',
                        fontWeight: '800',
                        color: 'white',
                    }}
                >
                    Нет мэтчей
                </p>
            )}
        </div>
    );
};

export default MatchesList;
