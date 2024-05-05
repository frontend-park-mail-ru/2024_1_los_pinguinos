import StepEmail from './stepEmail';
import StepData from './stepData';
import StepInterests from './stepInterests';
import StepPassword from './stepPassword';
import { useEffect, useState } from '../../../reactor/index';
import { register } from '../../../entities/session/api/index';
import { redirectTo } from '../../../app/Router';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [gender, setGender] = useState('');
    const [interests, setInterests] = useState([]);
    const [password, setPassword] = useState('');

    const [step, setStep] = useState(0);
    useEffect(() => {
        console.log(step);
    }, [step]);
    const navigateBack = () => {
        setStep((step) => {
            return step - 1 > 0 ? step - 1 : 0;
        });
    };
    const navigateForward = () => {
        // console.log('NAV FORWARD', step);
        setStep((step) => step + 1);
    };

    async function handleSubmit(event: any) {
        event.preventDefault();
        console.log('SHOULD PROCESS NAVIGATE');
        try {
            const response = await register(
                email,
                password,
                name,
                gender,
                date,
                interests,
            );
            redirectTo('/profile');
        } catch {
            console.log('error');
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {StepEmail({
                display: step === 0,
                onNavigateForward: navigateForward,
                email: email,
                setEmail: setEmail,
            })}
            {StepData({
                display: step === 1,
                onNavigateBack: navigateBack,
                onNavigateForward: navigateForward,
                name: name,
                setName: setName,
                date: date,
                setDate: setDate,
                gender: gender,
                setGender: setGender,
            })}
            {StepInterests({
                display: step === 2,
                onNavigateBack: navigateBack,
                onNavigateForward: navigateForward,
                interests: interests,
                setInterests: setInterests,
            })}
            {StepPassword({
                display: step === 3,
                onNavigateBack: navigateBack,
                onNavigateForward: handleSubmit,
                password: password,
                setPassword: setPassword,
            })}
        </form>
    );
};

export default RegisterForm;
