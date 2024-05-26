import { Button } from '../../../shared/ui/index';
import { store } from '../../../app/app';
import { useEffect, useState } from '../../../reactor/index';
const ProfileSubscribtion = () => {
    const [subStatus, setSubStatus] = useState(false);
    useEffect(() => {
        const subscribeStatus = store.subscribe(
            (subscribtion: boolean) => {
                setSubStatus(subscribtion);
            },
            ['subscribtion'],
        );
    }, []);
    return (
        <div className="profile__content-column">
            <p className="profile__text">
                Преимущества подписки:{'\n'} - Бесконечные лайки
            </p>
            <Button
                label="Оформить подписку"
                size="m"
                fontSize="m"
                severity="success"
                onClick={() => {}}
            />
        </div>
    );
};

export default ProfileSubscribtion;
