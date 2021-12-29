import * as React from 'react';
import '../styles/ui.css';
import Table from './Table';
import { useCreateTable } from '../contexts/table/hooks';

declare function require(path: string): any;

const App = ({}) => {
    const { currentTable } = useCreateTable();

    const onCreate = () => {
        parent.postMessage(
            { pluginMessage: { type: 'create-table', currentTable } },
            '*'
        );
    };

    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, message } = event.data.pluginMessage;
            if (type === 'create-table') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <div>
            <img src={require('../assets/logo.svg')} />
            <Table />
            <button id="create" onClick={onCreate}>
                Create
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
