import { InputCheckbox } from '../../../shared/ui/index';
import { useState, useEffect } from '../../../reactor/index';
import { getInterests } from '../../../entities/session/api';

const InterestsInput = ({ selectedInterests, setSelectedInterests }) => {
    const toggleInterest = (event: any) => {
        const interest = event.target.value;
        setSelectedInterests((prevSelectedInterests) => {
            if (prevSelectedInterests.includes(interest)) {
                return prevSelectedInterests.filter(
                    (selectedInterest) => selectedInterest !== interest,
                );
            } else {
                return [...prevSelectedInterests, interest];
            }
        });
    };
    const [gotInterests, setGotInterests] = useState([]);
    const interests = gotInterests;
    async function getAppInterests() {
        let appInterests = (await getInterests()) as any;
        appInterests = Array.from(appInterests, (interest: any) => {
            return interest.name;
        });
        setGotInterests(appInterests);
        return appInterests;
    }
    useEffect(() => {
        if (gotInterests.length === 0) getAppInterests();
        return () => {};
    }, [gotInterests]);

    return interests.map((interest, index) => (
        <InputCheckbox
            key={index}
            label={interest}
            value={interest}
            checked={selectedInterests.includes(interest)}
            onChange={toggleInterest}
        />
    ));
};

export default InterestsInput;
