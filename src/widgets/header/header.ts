import { store } from '../../..';
import headerTemplate from './header.hbs';
import { Person } from '../../entities/person/model';
class Header {
    render() {
        return headerTemplate(null);
    }

    controller() {
        const header = document.querySelector('.header') as HTMLElement;
        store.subscribe((state: Person) => {
            if (state) {
                header.innerHTML = headerTemplate(state);
            }
        });
    }
}

export default Header;