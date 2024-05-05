import InterestsInput from '../../../widgets/interestsInput/ui';
import { Button } from '../../../shared/ui';
import { clsx } from '../../../clsx/index';
import { useEffect, useState } from '../../../reactor';
import { IStep } from '../../../shared/lib';
interface TInterestsStep extends IStep {
    setInterests: (event: any) => void;
    interests: string[];
}
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
            setStepError('pick something');
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
                {/* <span className='step'>2/3</span> */}
            </div>
            <span className="form__title">Чем будем заниматься?</span>
            <span className="form__description">
                Выберите какими типами активностей вы увлекаетесь
            </span>
            <div className="form__input-container">
                <div className="form__interest-container">
                    <InterestsInput
                        interests={['somelong interest', 'short one', 'okea']}
                        selectedInterests={interests}
                        setSelectedInterests={setInterests}
                    />
                </div>
                <Button
                    label="Продолжить"
                    severity="success"
                    size="max-width"
                    fontSize="l"
                    onClick={allowContinue}
                />
            </div>
            <span className="form__error">{stepError}</span>
        </div>
    );
};
export default StepInterests;