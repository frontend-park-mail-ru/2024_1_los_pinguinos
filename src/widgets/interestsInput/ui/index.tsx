import { InputCheckbox } from '../../../shared/ui';

const InterestsInput = ({
    interests,
    selectedInterests,
    setSelectedInterests,
}) => {
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
