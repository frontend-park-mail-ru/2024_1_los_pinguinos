import Header from '../../widgets/header/index';
import { useState } from '../../reactor/index';
import InterestsInput from '../../widgets/interestsInput';
import { register } from '../../entities/session/api';

export const Registeration = () => {
    const [form1, setForm1] = useState(true);
    const [form2, setForm2] = useState(false);
    const [form3, setForm3] = useState(false);
    const [form4, setForm4] = useState(false);
    const [error, setError] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');

    const from1to2 = () => {
        console.log('from1to2');
        setForm1(false);
        setForm2(true);
    };

    const from2to3 = () => {
        console.log('from2to3');
        setForm2(false);
        setForm3(true);
    };

    const from3to4 = () => {
        console.log('from3to4');
        setForm3(false);
        setForm4(true);
    };

    const from4to3 = () => {
        console.log('from4to3');
        setForm4(false);
        setForm3(true);
    };

    const from3to2 = () => {
        console.log('from3to2');
        setForm3(false);
        setForm2(true);
    };

    const from2to1 = () => {
        console.log('from2to1');
        setForm2(false);
        setForm1(true);
    };

    const registerUser = async () => {
        try {
            await register({
                email: email,
                name: name,
                age: age,
                interests: selectedInterests,
                password: password,
            });
        } catch (e) {
            setError(true);
        }
    };

    const interests = ['Игры', 'Музыка', 'Кино', 'Технологии'];

    const [selectedInterests, setSelectedInterests] = useState(['Кино']);

    return (
        <div>
            <Header />
            <div className="container">
                {form1 && (
                    <div className="form">
                        <div className="form__field">
                            <label htmlFor="name">Почта</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                id="email"
                            />
                        </div>
                        <button onClick={from1to2}>Next</button>
                    </div>
                )}
                {form2 && (
                    <div className="form">
                        <button onClick={() => console.log(234)}>Back</button>
                        <div className="form__field">
                            <label htmlFor="name">Имя</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                            />
                        </div>
                        <div className="form__field">
                            <label htmlFor="age">Возраст</label>
                            <input
                                onChange={(e) => setAge(e.target.value)}
                                type="date"
                                id="age"
                            />
                        </div>
                        <div className="form__field">
                            <label htmlFor="sex">Пол</label>
                            <input
                                onChange={(e) => setSex(e.target.value)}
                                type="text"
                                id="sex"
                            />
                        </div>

                        <button onClick={from2to3}>Next</button>
                    </div>
                )}
                {form3 && (
                    <div className="form">
                        <button onClick={from3to2}>Back</button>
                        <div className="form__field">
                            <label htmlFor="name">Интересы</label>
                            <InterestsInput
                                interests={interests}
                                selectedInterests={selectedInterests}
                                setSelectedInterests={setSelectedInterests}
                            />
                        </div>
                        <button onClick={from3to4}>Next</button>
                    </div>
                )}
                {form4 && (
                    <div className="form">
                        <button onClick={from4to3}>Back</button>
                        <div className="form__field">
                            <label htmlFor="name">Пароль</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                            />
                        </div>
                        {error && (
                            <div className="form__error">Произошла ошибка</div>
                        )}
                        <button onClick={registerUser}>
                            Зарегестироваться
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
