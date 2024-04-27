import csatOverview from './csatOverview.hbs';
import apiHandler from '../../api/apiHandler';

class CSATOverview {
    async render() {
        const questions = await apiHandler.getRates();

        return csatOverview({ questions: questions });
    }

    async controller() {

    }
}

export default CSATOverview;
