import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import StoryComponent from './components/StoryComponent';
import UserService from './services/UserService';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import StoryService from './services/StoryService';

var stompClient = null

function App() {

  const [user, setUser] = useState({id: "", name: "", email: ""});
  const [notification, setNotification] = useState("");
  const [active, setActive] = useState({id: "", name: ""})
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);

  const Login = details => {
    UserService.addUser(details).then((response) => {
      setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        point: response.data.point
      });
      connect();
    })
  }

  const Logout = () => {
    UserService.removeUser(user.id).then((response) => {
      if(response.data) setUser({id: "", name: "", email: ""});
    })
  }

  const connect = () => {
    var socket = new SockJS("http://localhost:8080/api/websocket");
    stompClient = Stomp.over(socket)
    stompClient.connect({}, onConnected, onError)
    
  }

  const onConnected = () => {
    stompClient.subscribe('/notification', onReceived);
  }

  const onReceived = (data) => {
    if(isJsonString(data.body)){
      setShow(true)
      setResults(JSON.parse(data.body))
    }else{
      setShow(false)
      setNotification(data.body)
    }
  }

  function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  const onError = (err) => {
      console.log(err)
  }

  const sendEstimate = (point, story) => {
    setActive({id: story.id, name: story.name});
    UserService.send(user.id, point);
  }

  const restart = () => {
    StoryService.deActivate(active.id).then(() => {
      UserService.removePoints();
      setShow(false);
      setNotification("");
    })
  }

  return (
    <div className="App">
      {(user.email !== "") ? (
        show ? 
        <div className="page">
          <div className="result-page">
            <h3>Point estimates for "{active.name}"</h3>
            <div className="results">
              {
                results.map(
                  result => (result.point.slice(0, -1) === "no_idea") ? <div key={result.id}>{result.name ? result.name : result.email} has no idea.</div> : <div key={result.id}>{result.name ? result.name : result.email} gave {result.point.slice(0, -1)} points.</div>
                )
              }
            </div>
            <button onClick={restart}>Select New Story</button>
          </div>
        </div>
        :<div className="page">
          <StoryComponent Logout={Logout} sendEstimate={sendEstimate} />
          <div className="response">{notification}</div>
        </div>
      ) : (
        <LoginForm Login={Login} />
      )}
    </div>
  );
}

export default App;
