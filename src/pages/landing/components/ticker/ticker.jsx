/**
 * A Ticker component that renders a scrolling text ticker.
 *
 * @function Ticker
 * @returns {JSX.Element} The rendered Ticker component.
 */
export const Ticker = () => {
    return (
        <div className="ticker__container clearfix">
            <div className="ticker__content clearfix">
                {'бегом '.repeat(30) + 'бегом'}
            </div>
            <div className="ticker__content clearfix">
                {'бегом '.repeat(30) + 'бегом'}
            </div>
        </div>
    );
};
