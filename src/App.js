
import "./App.scss";
import Chat from "./components/chat/Chat.tsx";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Login from "./components/Login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { useEffect } from "react";
import { auth } from "./firebase.ts";
import { login, logout } from "./features/userSlice.ts";

function App() {
	const {user} = useAppSelector((state) => state.user);

	const dispatch = useAppDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((loginUser) => {
			if (loginUser) {
				dispatch(
					login({
						uid: loginUser.uid,
						photo: loginUser.photoURL,
						email: loginUser.email,
						displayName: loginUser.displayName,
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, [dispatch]);

	return (
		<div className="app">
			{user ? (
				<>
					<Sidebar />
					<Chat />
				</>
			) : (
				<>
					<Login />
				</>
			)}
		</div>
	);
}

export default App;
