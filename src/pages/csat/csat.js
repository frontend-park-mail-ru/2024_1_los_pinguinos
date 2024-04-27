import csat from './csat.hbs';
import apiHandler from '../../api/apiHandler';

class CSAT {
    async render() {
        return csat();
    }

    async controller(){
        const buttons = document.querySelectorAll('.button');
        const closeButton = document.querySelector('.button--cross');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('id');
                console.log(id);
                apiHandler.GetProfile(id).then(response => {
                    console.log(response);
                });
            });
        });
    }
}

export default CSAT;
