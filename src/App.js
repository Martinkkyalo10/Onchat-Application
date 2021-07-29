import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';


const App = () => {
    if (!localStorage.getItem('username')) return <LoginForm />

    return (
        <ChatEngine
            height='100vh'
            projectID={'f930fd3c-a591-495c-b369-400adb47d71f'}
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}

            // chat engine customerzation
            // render customized chat feed component
            renderChatFeed={(chatAppProps) => <ChatFeed  {...chatAppProps} />}

        />
    );
}

export default App;