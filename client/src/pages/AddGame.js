import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserGame, fetchGames } from "../store/actions/action";
import normalBg from "../assets/gs.png";
import mlBg from "../assets/gameBg/mlbb.jpg";
import valoBg from "../assets/gameBg/valo.jpg";
import apexBg from "../assets/gameBg/apex.jpg";
import lolBg from "../assets/gameBg/lol.jpg";
import Swal from "sweetalert2";
export default function AddGame() {
	const bgset = [mlBg, apexBg, valoBg, lolBg];
	const [bg, setBg] = useState(normalBg);
	const [game, setGame] = useState(null);
	const [form, setForm] = useState({
		rank: "",
		role: "",
		matchType: "",
		aboutMe: "",
	});
	const { games } = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchGames());
		setGame(null);
		setBg(normalBg);
	}, []);
	const navigate = useNavigate();
	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};
	const onSubmitHandler = async (id) => {
		if (
			form.rank === "" ||
			form.role === "" ||
			form.matchType === "" ||
			form.aboutMe === ""
		) {
			return Swal.fire({
				title: "Error!",
				icon: "error",
				text: "Please fill all the fields!",
				background: "#303030",
				color: "#FFFFFF",
				confirmButtonColor: "#D7385E",
				confirmButtonText: "OK",
			});
		} else {
			dispatch(addUserGame(form, id))
				.then(() => navigate("/home"))
				.catch((err) => console.log(err));
		}
	};
	return (
		<div
			className="overflow-hidden h-screen flex flex-col justify-center bg-cover transition-all"
			style={{ backgroundImage: `url(${bg})` }}>
			{game ? (
				<div className="m-5 rounded-xl self-center flex flex-col bg-primary bg-opacity-95 py-10">
					<p className="text-2xl font-poppins font-medium self-center ">
						Please input your game info
					</p>
					<form
						className="container m-5 flex flex-col gap-5"
						onSubmit={(event) => {
							event.preventDefault();
							onSubmitHandler(game.id);
						}}>
						<div className="flex flex-col">
							<label className="text-lg font-poppins">Role</label>
							<select
								className="h-8 w-96"
								onChange={onChangeHandler}
								name="role">
								<option selected disabled>
									--Choose Role--
								</option>
								{game.roleList.map((role) => {
									return <option value={role}>{role}</option>;
								})}
							</select>
						</div>
						<div className="flex flex-col">
							<label className="text-lg font-poppins">Rank</label>
							<select
								className="h-8 w-96"
								onChange={onChangeHandler}
								name="rank">
								<option selected disabled>
									--Choose Rank--
								</option>
								{game.rankList.map((rank, index) => {
									return <option value={index}>{rank}</option>;
								})}
							</select>
						</div>
						<div className="flex flex-col">
							<label className="text-lg font-poppins">
								What do you play for?
							</label>
							<select
								className="h-8 w-96"
								onChange={onChangeHandler}
								name="matchType">
								<option selected disabled>
									--Choose Match Type--
								</option>
								<option value="Competitive">Competitive</option>
								<option value="Casual">Casual</option>
							</select>
						</div>
						<div className="flex flex-col">
							<label className="text-lg font-poppins">
								Describe your gameplay
							</label>
							<p className="text-sm font-thin text-dimWhite mb-1">
								eg. "i am an agressive player"
							</p>
							<input
								className="h-8 w-96"
								onChange={onChangeHandler}
								name="aboutMe"
							/>
						</div>
						<div className="flex flex-row justify-between w-3/4 ml-7">
							<button
								className="btn self-center"
								onClick={() => {
									setBg(normalBg);
									setGame(null);
								}}>
								Cancel
							</button>
							<button
								type="submit"
								className="btn self-center bg-[#D7385E] text-slate-200">
								Submit
							</button>
						</div>
					</form>
				</div>
			) : (
				<div className="m-5 rounded-xl w-5/6 self-center flex flex-col bg-primary bg-opacity-95">
					<p className="text-2xl font-poppins font-medium self-center mt-10 mb-3">
						What game are you going to play?
					</p>
					<div className="flex justify-center ">
						<div className="flex flex-wrap w-11/12 justify-around">
							{games.map((e, index) => {
								return (
									<button
										key={e.id}
										className="w-128 h-fit scale:75 rounded-2xl bg-"
										onClick={() => {
											setGame(e);
											setBg(bgset[index]);
										}}>
										<img
											src={e.imgUrl}
											className="scale-75 rounded-2xl hover:scale-90 transition-transform"
										/>
									</button>
								);
							})}
						</div>
					</div>
					<button
						className="text-xl font-poppins self-center rounded-xl hover:underline transition-colors text-white mb-10"
						onClick={() => {
							navigate("/home");
						}}>
						{"<< Go Back"}
					</button>
				</div>
			)}
		</div>
	);
}
