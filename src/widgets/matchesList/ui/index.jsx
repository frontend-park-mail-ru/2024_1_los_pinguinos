import Match from '../../../entities/person/ui/match';
import { useState, useEffect } from '../../../reactor';
import { getMatches } from '../../../entities/person/api';

const MatchesList = () => {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        getMatches().then((response) => {
            setMatches(response);
        });
    }, []);

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
