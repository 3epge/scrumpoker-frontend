import React, { useState } from 'react'

function LoginForm({Login}) {

    const [details, setDetails] = useState({name: "", email: "", point: null});

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Welcome to Scrum Poker</h2>
                <h5>Please enter your email to log in.</h5>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email} required />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Display Name (optional):</label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <button type="submit">Start</button>
            </div>
        </form>
    )
}

export default LoginForm
