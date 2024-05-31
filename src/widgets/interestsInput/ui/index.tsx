import { InputCheckbox } from '../../../shared/ui/index';
import { useState, useEffect } from '../../../reactor/index';
import { getInterests } from '../../../entities/session/api';
import { store } from '../../../app/app';

/**
 * A InterestsInput component that renders checkboxes for selecting interests.
 *
 * @function InterestsInput
 * @param {any} props - The properties of the interests input component.
 * @returns {JSX.Element[]} The rendered interests input component.
 */
const InterestsInput = ({ selectedInterests, setSelectedInterests }) => {
    /**
     * Toggles the selected state of an interest.
     *
     * @function toggleInterest
     * @param {any} event - The change event.
     */
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

    /**
     * Fetches the available interests and updates the state.
     *
     * @function getAppInterests
     * @returns {Promise<string[]>} The fetched interests.
     */
    async function getAppInterests() {
        try {
            let appInterests = (await getInterests()) as any;
            store.dispatch({
                type: 'UPDATE_SOMETHING',
                payload: { applicationInterests: appInterests },
            });
            // console.log(appInterests.interests);
            appInterests = Array.from(
                store.getState().applicationInterests,
                (interest: any) => {
                    return interest.name;
                },
            );
            setGotInterests(appInterests);
            return appInterests;
        } catch {
            return [];
        }
    }
    useEffect(() => {
        if (!store.getState().applicationInterests) getAppInterests();
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
