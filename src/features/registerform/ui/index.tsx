import StepEmail from './stepEmail';
import StepData from './stepData';
import StepInterests from './stepInterests';
import StepPassword from './stepPassword';
import { useEffect, useState } from '../../../reactor/index';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(0);
    useEffect(() => {
        console.log(step);
        console.log(steps[step]);
    }, [step]);
    const navigateBack = () => {
        setStep((step) => step - 1);
    };
    const navigateForward = () => {
        console.log('NAV FORWARD');
        setStep((step) => step + 1);
    };
    const steps = [
        StepEmail({
            onNavigateForward: navigateForward,
            setEmail: setEmail,
            email: email,
        }),
        StepData({
            onNavigateForward: () => {
                console.log('different step');
            },
            onNavigateBack: navigateBack,
        }),
    ];
    return <form className="form">{steps[step]}</form>;
};

export default RegisterForm;
