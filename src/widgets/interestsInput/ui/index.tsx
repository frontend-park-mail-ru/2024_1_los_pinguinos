import InterestButton from "../../../shared/ui/interestButton";
import { useState } from "../../../reactor";

const InterestsInput = ( { interests, selectedInterests, setSelectedInterests} ) => {
    const toggleInterest = (interest) => {
        setSelectedInterests((prevSelectedInterests) => {
          if (prevSelectedInterests.includes(interest)) {
            return prevSelectedInterests.filter((selectedInterest) => selectedInterest !== interest);
          } else {
            return [...prevSelectedInterests, interest];
          }
        });
      };

    return (
        <div className="interests-input">
            <div>
                {interests.map((interest, index) => (
                    <InterestButton
                        key={index}
                        interest={interest}
                        isActive={selectedInterests.includes(interest)}
                        onClick={toggleInterest}
                    />
                ))}
            </div>
        </div>
    );
};

export default InterestsInput;