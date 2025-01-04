
import React from "react";
import "./App.scss";
import Chat from "./components/chat/Chat.tsx";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Login from "./components/Login/Login.tsx";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { useEffect } from "react";
import { auth } from "./firebase.ts";
import { login, logout } from "./features/userSlice.ts";

function App() {

	//Reduxストアの状態を取得する
	const user = useAppSelector( state => state.user );

	const dispatch = useAppDispatch();

	useEffect(() => {
		//onAuthStateChanged：認証状態の変化で発火する関数
		auth.onAuthStateChanged( loginUser => {
			//もしログインユーザーが存在すれば、ユーザーの情報(payload)をセットする
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
				//でなければログアウトする(userSliceで定義したアクションクリエーター)
				dispatch(logout());
			}
		});
	}, [dispatch]);

	return (
		// ユーザーが存在する時チャット画面を表示し、存在しない場合ログイン画面を表示する
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
