import { useState, useEffect } from '../../../reactor';

const Footer = () => {
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        const indicator = document.querySelector('.nav-indicator');
        const items = document.querySelectorAll('.nav-item');
        console.log('items', items);

        function handleIndicator(el) {
            items.forEach((item) => {
                item.classList.remove('is-active');
                item.removeAttribute('style');
                if (item.tagName === 'a') {
                    item.removeAttribute('style');
                }
            });

            indicator.style.width = `${el.offsetWidth}px`;
            indicator.style.left = `${el.offsetLeft}px`;
            indicator.style.backgroundColor = el.getAttribute('active-color');

            el.classList.add('is-active');
            el.style.color = el.getAttribute('active-color');
        }

        items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                setActiveItem(e.target);
                handleIndicator(e.target);
            });
            item.classList.contains('is-active') && handleIndicator(item);
        });

        // Clean-up function
        return () => {
            items.forEach((item) => {
                item.removeEventListener('click', () => {});
            });
        };
    }, []); // Run only once on component mount

    return (
        <nav className="nav">
            {/* <a
                href="#"
                className={`nav-item ${activeItem === null ? 'is-active' : ''}`}
                active-color="orange"
            > */}
            {/* {window.innerWidth > 520 ? ( */}
                <a
                    href="#"
                    className={`nav-item ${
                        activeItem === null ? 'is-active' : ''
                    }`}
                    active-color="orange"
                >
                    Карточки
                </a>
            {/* // ) : (
            //     <svg
            //         class={`nav-item ${activeItem === null ? 'is-active' : ''}`}
            //         active-color="orange"
            //         style={{ height: '31px' }}
            //         version="1.1"
            //         xmlns="http://www.w3.org/2000/svg"
            //         x="0px"
            //         y="0px"
            //         viewBox="0 0 511.999 511.999"
            //     >
            //         <g>
            //             <g>
            //                 <path
            //                     d="M187.712,436.096c-1.611-3.878-6.059-5.719-9.939-4.107l-8.252,3.426c-17.816,7.397-38.329-1.084-45.729-18.906 l-66.16-159.364c-1.611-3.878-6.059-5.719-9.939-4.107c-3.878,1.61-5.717,6.059-4.107,9.938l66.16,159.364 c8.01,19.295,26.736,30.956,46.429,30.956c6.401,0,12.906-1.233,19.178-3.835l8.252-3.426 C187.482,444.424,189.322,439.974,187.712,436.096z"
            //                     fill="#000000"
            //                     style="fill: currentColor;"
            //                 ></path>
            //             </g>
            //         </g>
            //         <g>
            //             <g>
            //                 <path
            //                     d="M258.263,61.685c-10.613-25.561-40.043-37.722-65.612-27.107L30.975,101.699c-12.382,5.141-22.021,14.795-27.142,27.186 c-5.121,12.391-5.111,26.033,0.029,38.415l30.615,73.745c1.216,2.925,4.044,4.69,7.026,4.69c0.971,0,1.96-0.188,2.914-0.584 c3.878-1.61,5.717-6.059,4.107-9.938l-30.615-73.744c-3.583-8.63-3.591-18.139-0.021-26.776 c3.569-8.637,10.287-15.366,18.918-18.949l161.676-67.121c17.82-7.4,38.336,1.077,45.733,18.892 c1.61,3.878,6.058,5.719,9.939,4.107C258.034,70.013,259.873,65.563,258.263,61.685z"
            //                     fill="#000000"
            //                     style="fill: currentColor;"
            //                 ></path>
            //             </g>
            //         </g>
            //         <g>
            //             <g>
            //                 <path
            //                     d="M476.295,118.627l-42.487-12.817c-4.021-1.212-8.264,1.063-9.477,5.084c-1.213,4.02,1.064,8.263,5.085,9.476 l42.487,12.817c18.47,5.571,28.963,25.13,23.391,43.6l-79.75,264.376c-5.57,18.469-25.131,28.966-43.601,23.392l-167.599-50.557 c-8.947-2.699-16.307-8.721-20.725-16.956c-4.419-8.235-5.365-17.698-2.666-26.645l79.751-264.377 c2.699-8.948,8.721-16.308,16.956-20.727c8.236-4.418,17.698-5.365,26.645-2.666l99.731,30.084 c4.021,1.212,8.263-1.063,9.477-5.084c1.213-4.02-1.064-8.263-5.085-9.476l-99.731-30.084 c-12.833-3.872-26.412-2.515-38.227,3.825c-11.815,6.338-20.455,16.899-24.327,29.735l-79.75,264.376 c-3.872,12.837-2.515,26.413,3.824,38.228c6.339,11.814,16.899,20.454,29.735,24.326l167.599,50.557 c4.816,1.453,9.68,2.144,14.471,2.144c21.561-0.001,41.541-14.022,48.083-35.704l79.75-264.375 C517.848,154.682,502.794,126.621,476.295,118.627z"
            //                     fill="#000000"
            //                     style="fill: currentColor;"
            //                 ></path>
            //             </g>
            //         </g>
            //     </svg>
            // )} */}
            {/* </a> */}
            <a
                href="#"
                className={`nav-item ${
                    activeItem === null
                        ? ''
                        : activeItem.textContent === 'About'
                        ? 'is-active'
                        : ''
                }`}
                active-color="green"
            >
                Мэтчи
            </a>
            <a
                href="#"
                className={`nav-item ${
                    activeItem === null
                        ? ''
                        : activeItem.textContent === 'Testimonials'
                        ? 'is-active'
                        : ''
                }`}
                active-color="blue"
            >
                Чаты
            </a>
            <a
                href="#"
                className={`nav-item ${
                    activeItem === null
                        ? ''
                        : activeItem.textContent === 'Blog'
                        ? 'is-active'
                        : ''
                }`}
                active-color="red"
            >
                Настройки
            </a>
            <span className="nav-indicator"></span>
        </nav>
    );
};

export default Footer;
