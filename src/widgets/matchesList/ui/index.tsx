import Match from '../../../entities/person/ui/match/index';
import { useState, useEffect } from '../../../reactor/index';
import { getMatches } from '../../../entities/person/api/index';

const MatchesList = () => {
    const [matches, setMatches] = useState([]);

    // useEffect( () => {

    // }, []);
    async function getMatch() {
        console.log('trying');
        try {
            const response = await getMatches();
            setMatches(response);
        } catch (err) {
            console.log(err);
        }
    }

    getMatch();

    return (
        <div className="matches">
            <h1 className="matches__header">Ваши мэтчи</h1>
            <div id="matches__content">
                {matches.map((match, index) => Match({ person: match }))}
            </div>
        </div>
    );
};

export default MatchesList;
