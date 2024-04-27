import csatOverview from './csatOverview.hbs';
import apiHandler from '../../api/apiHandler';

function countFrequency(arr) {
    // Map to store the frequency of each element
    const frequency = new Map();

    // Count each element's frequency
    for (const element of arr) {
        if (frequency.has(element)) {
            frequency.set(element, frequency.get(element) + 1);
        } else {
            frequency.set(element, 1);
        }
    }

    // Convert the frequency map to an array of counts, maintaining the order of first occurrence
    const result = [];
    for (const element of arr) {
        if (frequency.has(element)) {
            result.push(frequency.get(element));
            frequency.delete(element); // Delete the element to avoid counting it again
        }
    }

    return result;
}



class CSATOverview {
    async render() {

        const result = await apiHandler.getRates();
        const result1 = result.map((el) => {
            return [el[0], el[1]].concat(countFrequency(el.slice(2)));
        });

        return csatOverview({ questions: result1 });
    }

    async controller() {

    }
}

export default CSATOverview;
