import { Ticker } from './components/ticker/ticker.jsx';
import { logo, reviews, points } from './const';
import { ButtonLink } from '../../shared/ui/index';
import './index.css';


/**
 * A Landing component that renders the landing page.
 *
 * @function Landing
 * @returns {JSX.Element} The rendered Landing component.
 */
export const Landing = () => {
    return (
        <div className="landing-wrapper">
            <div className="landing__header">
                <div className="logo__container" data-link data-url="/">
                    <img
                        alt="logo"
                        data-link="/"
                        className="header__logo--landing"
                        src={logo}
                    />
                    <p data-link="/" className="logo__text">
                        jimder
                    </p>
                </div>
                <ButtonLink
                    to="/login"
                    fontSize="xl"
                    severity="info"
                    label="войти"
                />
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
                    <ButtonLink
                        to="/register"
                        severity="success"
                        size="xl"
                        fontSize="xl"
                        label="Регистрация"
                    />
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
