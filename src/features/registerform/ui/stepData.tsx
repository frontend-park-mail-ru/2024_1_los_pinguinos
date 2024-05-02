import { TStep } from './stepEmail';
import { useState, useEffect } from '../../../reactor/index';
import { Input } from '../../../shared/ui/input/input';
import { Button } from '../../../shared/ui/button/button';
import { ButtonLink } from '../../../shared/ui/button/buttonLink';
import { Link } from '../../../shared/routing/link';
import { validateInput } from '../../../shared/lib/index';

const StepData = ({ onNavigateBack, onNavigateForward }: TStep) => {
    return (
        <div className="form__step">
            <div className="form__header">
                <Button
                    icon="icon-chevron-left"
                    fontSize="xl"
                    severity="link"
                    onClick={onNavigateBack}
                />
            </div>
            <span className="form__title">Давайте знакомиться</span>
            <div className="form__input-container">
                <Input
                    type="test"
                    autocomplete="name"
                    label="Ваше имя"
                    maxlength={32}
                    autofocus
                    onInput={(event: any) => {
                        // setCurrentEmail(event.target.value);
                        // setEmail(event.target.value);
                    }}
                    // error={emailError}
                />
                <Button
                    label="Продолжить"
                    severity="success"
                    size="max-width"
                    fontSize="l"
                    // onClick={allowContinue}
                />
            </div>
            <span className="form__error">{'formError'}</span>
        </div>
    );
};
export default StepData;
