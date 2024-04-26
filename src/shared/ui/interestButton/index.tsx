import { useState } from "../../../reactor";

const InterestButton = ({ interest, isActive, onClick }) => {

    const handleClick = () => {
        onClick(interest);
    };

    return (
        <button onClick={handleClick} className={`form__button--checkbox ${isActive ? 'form__button--checkbox-selected' : ''}`}>
            {interest}
        </button>
    );
}

export default InterestButton;