const Match = ({ person }: any) => {
    return (
        <div className="match">
            <button className="mail">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-mail"
                >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            </button>
            <div className="profile-pic profile-pic1">
                <img src={person.image} alt={person.name} />
            </div>
            <div className="data">
                <div className="data__content">
                    <span className="name">
                        {person.name}, {person.age}
                    </span>
                    <span className="about-me">{person.description}</span>
                </div>
                <div className="data-bottom">
                    <button className="match__button">Contact Me</button>
                </div>
            </div>
        </div>
    );
};

export default Match;
