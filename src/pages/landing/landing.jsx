import { Ticker } from './components/ticker/ticker.jsx';
import { logo, reviews, points } from './const.js';
import { Reactor } from '../../reactor/index.js';

export const Landing = () => {
    const [state, setState] = Reactor.useState(0);
    Reactor.useEffect(() => {
        console.log('REACTOR', state);
    }, [state]);

    return (
        <div className="landing-wrapper">
            <div className="landing__header">
                <div className="logo__container" data-link data-url="/">
                    <img
                        alt="logo"
                        data-link
                        data-url="/"
                        className="header__logo--landing"
                        src={logo}
                    />
                    <p data-link data-url="/" className="logo__text">
                        jimder
                    </p>
                </div>
                <button
                    className="button button--xl button--info button--link"
                    data-link
                    data-url="/login"
                >
                    войти
                </button>
            </div>
            <div className="landing__slide slide--first">
                <img
                    alt="landing-pic"
                    className="landing__picture"
                    src="https://los_ping.hb.ru-msk.vkcs.cloud/landingGroup.webp"
                />
                <div className="landing__side-container">
                    <p className="landing__title">
                        Ты готов? Потому что они —{' '}
                        <b className="landing__title title--highlight">да</b>
                    </p>
                    <button
                        onClick={() => setState((c) => c + 1)}
                        className="button button--success button--xl"
                        data-link
                        data-url="/register"
                    >
                        Регистрация {state}
                    </button>
                </div>
            </div>
            <div className="landing__slide slide--second">
                <div className="landing__points">
                    {points.map((point, idx) => (
                        <div key={idx} className="point">
                            <img
                                alt="pointImg"
                                className="point__image"
                                src={point.icon}
                            />
                            <p className="point__text">{point.text}</p>
                        </div>
                    ))}
                </div>
                <div className="landing__info">
                    <p className="landing__title">
                        Найди людей с похожими{' '}
                        <b className="landing__title title--highlight">
                            интересами.
                        </b>
                    </p>
                    <p className="landing__text">
                        Находи людей для совместного занятия любыми
                        активностями.
                    </p>
                    <p className="landing__text">
                        Некому подстраховать когда делаешь жим лежа? Не
                        проблема, мы поможем вам найти нужного человека.
                    </p>
                    <p className="landing__text">
                        В вас горит страсть к сражению? Хотите бить чужие
                        рекорды и ставить свои? Тогда приступаем!
                    </p>
                </div>
            </div>
            <Ticker />
            <div className="landing__slide slide--third">
                {reviews.map((review, idx) => (
                    <div key={idx} className="review">
                        <div className="review__header">
                            <img
                                alt="reviewAvatar"
                                className="review__avatar"
                                src={review.avatar}
                            />
                            <p className="review__title">{review.title}</p>
                        </div>
                        <p className="review__text">{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
