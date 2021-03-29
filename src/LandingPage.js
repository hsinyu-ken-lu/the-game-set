import './LandingPage.css';

function LandingPage(props) {

    const navigateTo = (level) => {
        props.history.push('/Game/' + level);
    }

    return (
        <div className="container">
            <div className="game-button-container">
                <button type="button" className="game-button">
                    GAME
                </button>
                <div className="level-button-container">
                    <button type="button" className="level-button" onClick={() => navigateTo('easy')}>
                        EASY
                    </button>
                    <button type="button" className="level-button" onClick={() => navigateTo('medium')}>
                        MEDIUM
                    </button>
                    <button type="button" className="level-button" onClick={() => navigateTo('hard')}>
                        HARD
                    </button>
                </div>
            </div>
            <div>
                <button type="button" className="rule-button" onClick={() => props.history.push('/rules')}>
                    RULE
                </button>
            </div>
        </div>
    );
}

export default LandingPage;