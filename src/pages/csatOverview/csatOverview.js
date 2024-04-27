import csatOverview from './csatOverview.hbs';
import apiHandler from '../../api/apiHandler';

const questions = [
    ['СВАЙПЫ', 5, 1, 23, 40, 50, 10000],
    ['МЭТЧИ', 5, 1, 23, 430, 520, 10000],
];

class CSATOverview {
    async render() {
        return csatOverview({ questions: questions });
    }

    async controller() {}
}

export default CSATOverview;
