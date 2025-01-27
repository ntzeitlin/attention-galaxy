import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        cohort: 0,
    });
    let navigate = useNavigate();

    const registerNewUser = () => {
        const newUser = {
            ...user,
            cohort: parseInt(user.cohort),
        };

        createUser(newUser).then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem(
                    "attention_astronaut",
                    JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff,
                    })
                );

                navigate("/");
            }
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        getUserByEmail(user.email).then((response) => {
            if (response.length > 0) {
                // Duplicate email. No good.
                window.alert("Account with that email address already exists");
            } else {
                // Good email, create user.
                registerNewUser();
            }
        });
    };

    const updateUser = (evt) => {
        const copy = { ...user };
        copy[evt.target.id] = evt.target.value;
        setUser(copy);
    };

    return (
        <main className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h1 className="header">Attention Galaxy</h1>
                <h2>Please Register</h2>
                <fieldset className="auth-fieldset">
                    <div>
                        <input
                            onChange={updateUser}
                            type="text"
                            id="fullName"
                            placeholder="Enter your name"
                            required
                            autoFocus
                        />
                    </div>
                </fieldset>
                <fieldset className="auth-fieldset">
                    <div>
                        <input
                            onChange={updateUser}
                            type="email"
                            id="email"
                            placeholder="Email address"
                            required
                        />
                    </div>
                </fieldset>
                <fieldset className="auth-fieldset">
                    <div>
                        <input
                            onChange={updateUser}
                            type="number"
                            id="cohort"
                            placeholder="Cohort #"
                            required
                        />
                    </div>
                </fieldset>
                <fieldset className="auth-fieldset">
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </fieldset>
            </form>
        </main>
    );
};
