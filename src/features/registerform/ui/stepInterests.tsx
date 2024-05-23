import InterestsInput from '../../../widgets/interestsInput/ui';
import { Button } from '../../../shared/ui';
import { clsx } from '../../../shared/lib/clsx/index';
import { useEffect, useState } from '../../../reactor';
import { IStep } from '../../../shared/lib';
interface TInterestsStep extends IStep {
    setInterests: (event: any) => void;
    interests: string[];
}

/**
 * A StepInterests component that renders the step for entering user interests.
 *
 * @function StepInterests
 * @param {TInterestsStep} props - The properties of the step interests component.
 * @returns {JSX.Element} The rendered step interests component.
 */
const StepInterests = ({
    display,
    onNavigateBack,
    onNavigateForward,
    interests,
    setInterests,
}: TInterestsStep) => {
    const [stepError, setStepError] = useState('');
    useEffect(() => {
        if (interests.length > 0) {
            setStepError('');
        }
    }, [interests]);
    const allowContinue = () => {
        if (interests.length === 0) {
            setStepError('Выберите хотя бы один интерес');
            return;
        }
        if (onNavigateForward) onNavigateForward();
    };

    return (
        <div className={clsx('form__step', !display && 'any--none')}>
            <div className="form__header">
                <Button
                    icon="icon-chevron-left"
                    fontSize="xl"
                    severity="link"
                    onClick={onNavigateBack}
                />
                <span className="form__description step__counter">2/3</span>
            </div>
            <span className="form__title">Чем будем заниматься?</span>
            <span className="form__description">
                Выберите какими типами активностей вы увлекаетесь
            </span>
            <div className="form__input-container">
                <div className="form__interest-container">
                    {InterestsInput({
                        selectedInterests: interests,
                        setSelectedInterests: setInterests,
                    })}
                </div>
                <Button
                    label="Продолжить"
                    severity="success"
                    size="max-width"
                    fontSize="l"
                    onClick={allowContinue}
                />
            </div>
            <span className={clsx(!stepError && 'any--none', 'form__error')}>
                {stepError}
            </span>
        </div>
    );
};
export default StepInterests;
