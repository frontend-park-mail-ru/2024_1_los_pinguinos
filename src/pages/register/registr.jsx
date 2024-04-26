import Header from '../../widgets/header/index';
import { useState } from '../../reactor/index';
import InterestsInput from '../../widgets/interestsInput';

export const Registeration = () => {
    const [form1, setForm1] = useState(false);
    const [form2, setForm2] = useState(false);
    const [form3, setForm3] = useState(true);
    const [form4, setForm4] = useState(false);

    const interests = [
        'Игры',
        'Музыка',
        'Кино',
        'Технологии',
    ];

    const [selectedInterests, setSelectedInterests] = useState(['Кино']);

    return (
        <div>
            <Header />
            <div className="container">
                {form1 && (
                    <div className="form">
                        <div className="form__field">
                            <label htmlFor="name">Почта</label>
                            <input type="text" id="email" />
                        </div>
                    </div>
                )}
                {form2 && (
                    <div className="form">
                        <div className="form__field">
                            <label htmlFor="name">Имя</label>
                            <input type="text" id="name" />
                        </div>
                        <div className="form__field">
                            <label htmlFor="surname">Возраст</label>
                            <input type="date" id="age" />
                        </div>
                        <div className="form__field">
                            <label htmlFor="surname">Пол</label>
                            <input type="text" id="sex" />
                        </div>
                    </div>
                )}
                {form3 && (
                    <div>
                        <div className="form">
                            <div className="form__field">
                                <label htmlFor="name">Интересы</label>
                                <InterestsInput
                                    interests={interests}
                                    selectedInterests={selectedInterests}
                                    setSelectedInterests={setSelectedInterests}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setForm3(false);
                                setForm1(true);
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
                {form4 && (
                    <div>
                        <div className="form">
                            <div className="form__field">
                                <label htmlFor="name">Пароль</label>
                                <input type="password" id="password" />
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setForm3(false);
                                setForm1(true);
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

