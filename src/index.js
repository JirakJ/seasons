import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from "./SeasonDisplay";
import "semantic-ui-css/semantic.min.css";
import Spinner from "./Spinner";

const App = () => {
    const [ lattitude, setLatitude ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState('');
    window.navigator.geolocation.getCurrentPosition(
        (position) => setLatitude(position.coords.latitude),
        (err) => setErrorMessage(err.message)
    );

    const renderContent = () => {
        if(errorMessage!=='' && lattitude === null){
            return <div>Error: {errorMessage}</div>;
        }
        if(lattitude !== null && errorMessage===''){
            return <SeasonDisplay lat={lattitude} />;
        }
        return <Spinner message={'Please accept location request'}/>;
    }

    return (
        <div className="border red">
            {renderContent()}
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector("#root"));
