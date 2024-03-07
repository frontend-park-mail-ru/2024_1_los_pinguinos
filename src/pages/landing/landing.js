import landing from './landing.hbs';

class Landing {

    
    async render() {
       return landing();
   }

    async controller() {
        const buttons = document.getElementsByClassName('landing-button');
        Array.from(buttons).forEach((button) => {
            button.addEventListener('click', () => {
                window.location.href = '/register';
            });
        });
        
    }

}

export default Landing;
