import { useState } from "../../../reactor";
import { clsx } from "../../../clsx";

const InterestButton = ({ interest, isActive, onClick }) => {

    const handleClick = () => {
        onClick(interest);
    };

    return (
        <button onClick={handleClick} className={clsx('form__button', 'form__button--checkbox', isActive && 'form__button--checkbox-selected')}>
            {interest}
        </button>
    );
}

export default InterestButton;