import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ripple from "../assets/ripple.svg";

import {
  editUser,
  editUserGame,
  fetchGames,
  fetchUserById,
  followFriendInProfile,
} from "../store/actions/action";
export default function Profile() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [clicked, setClicked] = useState(false);
  const [modalClick, setModalClick] = useState(false);
  const { userDetail, games, loading } = useSelector((state) => state);
  const [form, setForm] = useState({
    username: userDetail?.user?.username,
    password: "",
    domisili: userDetail?.user?.domisili,
    image: "",
  });

  const [editGame, setEditGame] = useState({
    rank: "",
    role: "",
    matchType: "",
    aboutMe: "",
  });

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchGames);
    // eslint-disable-next-line
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("domisili", form.domisili);
    if (form.image) formData.append("image", form.image);
    dispatch(editUser(formData, userDetail?.user?.id));
    setClicked(false);
  };

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    if (name === "image") {
      let image = event.target.files[0];
      value = image;
    }
    setForm({ ...form, [name]: value });
  };

  const onChangeModal = (event) => {
    let { name, value } = event.target;
    setEditGame({ ...editGame, [name]: value });
  };

  const onSubmitModal = (gameId) => {
    dispatch(editUserGame(editGame, gameId));
    dispatch(fetchUserById(id));
    setModalClick(false);
  };
  if (loading) {
    return (
      <div className="bg-black w-screen h-screen absolute opacity-50 flex justify-center items-center">
        <img src={ripple} />
      </div>
    );
  }

  return (
    <div className="flex xl:flex-row 2xs:flex-col text-slate-200 xl:w-full xl:min-h-screen font-poppins">
      <Link
        to="/home"
        className="flex flex-row gap-2 fixed p-5 text-xl hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="flex justify-center self-center w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <p className="mb-1">Home</p>
      </Link>
      <div className="flex xl:flex-row 2xs:flex-col xl:gap-10 w-screen h-content 2xs:py-5 xl:px-5 2xs:px-2">
        {clicked ? (
          <form
            className="flex flex-col w-full basis-1/4 transition-all"
            enctype="multipart/form-data"
            onSubmit={onSubmitHandler}
          >
            <div className="flex mt-10 justify-center">
              <label
                className="w-40 h-40 rounded-full absolute hover:bg-black hover:bg-opacity-75 opacity-0 hover:opacity-100 flex justify-center items-center hover:border-white btn"
                htmlFor="upload"
              >
                <div className="flex flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </div>
              </label>
              <input
                id="upload"
                type="file"
                className="hidden"
                name="image"
                onChange={onChangeHandler}
              />
              <img
                src={userDetail?.user?.profPict}
                className="w-40 h-40 rounded-full"
                alt="placeholder profile"
              ></img>
            </div>
            <div className="flex mt-5 justify-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col text-center">
                  <label htmlFor="username">Username</label>
                  <input
                    type="username"
                    className="rounded-md"
                    name="username"
                    value={form.username}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="flex flex-col text-center">
                  <label htmlFor="domisili">Domicile</label>
                  <input
                    type="text"
                    className="rounded-md"
                    name="domisili"
                    value={form.domisili}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="flex flex-col text-center">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="rounded-md"
                    name="password"
                    value={form.password}
                    onChange={onChangeHandler}
                  />
                  <p className="text-sm text-start text-[#979797]">
                    Confirm changes with password
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="h-full">
                    <button
                      className="btn-sm btn-outline border border-red-500  rounded-lg text-red-500 hover:text-white hover:border-red-500 hover:bg-red-500 transition-all m-2"
                      onClick={() => {
                        setClicked(false);
                      }}
                    >
                      cancel
                    </button>
                  </div>
                  <div className="h-full">
                    <button
                      className="btn-sm btn-outline border border-sky-400 rounded-lg text-sky-400 hover:text-white hover:border-sky-400 hover:bg-sky-400 transition-all m-2"
                      type="submit"
                    >
                      done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col w-full basis-1/4 transition-all">
            <div className="flex mt-10 justify-center">
              <img
                src={userDetail?.user?.profPict}
                className="w-40 h-40 rounded-full"
                alt="placeholder profile"
              ></img>
            </div>
            <div className="flex mt-5 justify-center">
              <p>
                <strong>@{userDetail?.user?.username}</strong>
              </p>
            </div>
            <div className="flex mt-3 justify-center">
              {+localStorage.getItem("id") === userDetail?.user?.id ? (
                <button
                  className="btn rounded-full bg-[#D7385E] text-[#F8EFD4]"
                  onClick={() => setClicked(true)}
                >
                  Edit Profile
                </button>
              ) : userDetail?.follower?.filter(
                  (e) => e.FollowerId === +localStorage.getItem("id")
                ).length > 0 ? (
                <p className="flex self-center text-slate-200"> FOLLOWED </p>
              ) : (
                <button
                  className="btn rounded-full bg-[#D7385E] text-[#F8EFD4]"
                  onClick={() =>
                    dispatch(followFriendInProfile(userDetail.user.id))
                  }
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        )}
        {userDetail?.user?.Posts.length > 0 ? (
          <div className="flex flex-col w-full basis-1/2 gap-3 xl:mt-0 md:mt-4">
            {userDetail?.user?.Posts.map((post) => {
              return (
                <div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
                  <div className="card-body text-start">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-2">
                        <h2 className="card-title text-2xl">
                          @{userDetail?.user?.username}
                        </h2>
                        <p className="text-sm text-gray-400">
                          | {post?.Game?.name}
                        </p>
                      </div>
                      <p className="text-end text-slate-300 text-sm">
                        {" "}
                        {new Date(post.createdAt)
                          .toDateString()
                          .slice(4, 15)}{" "}
                      </p>
                    </div>
                    <p>{post.content}</p>
                    {post.imgUrl ? (
                      <figure className="pt-5 w-64 h-auto">
                        <img
                          src={post.imgUrl}
                          alt="Shoes"
                          className="rounded-xl w-full"
                        />
                      </figure>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
            <div className="card-body text-start">
              <h2 className="card-title">@developer</h2>
              <p>Post something to share the joy!</p>
              <figure className="pt-5">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/gamers-play-online-video-game-5071155-4231654.png"
                  alt="Shoes"
                  className="rounded-xl w-full"
                />
              </figure>
              <div className="flex justify-end">
                <label
                  htmlFor="modal-post"
                  className="btn bg-[#D7385E] text-slate-200"
                  onClick={() => {
                    navigation("/home");
                  }}
                >
                  Make Posts!
                </label>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col xl:mt-0 2xs:mt-4 w-full basis-1/4">
          {userDetail?.user?.UserGames.length > 0 ? (
            <div className=" w-full gap-5 flex flex-col">
              {userDetail?.user?.UserGames.map((game) => {
                return (
                  <div
                    className="card xl:w-96 md:w-full h-auto flex justify-center"
                    key={game.id}
                  >
                    <label
                      htmlFor={game.id}
                      className="btn bg-primary hover:bg-primary hover:border-primary border-primary hover:scale-105 w-fit h-fit hover:bg-none"
                    >
                      <img src={game.Game.imgUrl} />
                    </label>
                    <input
                      type="checkbox"
                      id={game.id}
                      className="modal-toggle"
                    />
                    <label
                      className="bg-black flex flex-col items-center bg-opacity-90 h-auto modal"
                      htmlFor={game.id}
                    >
                      <label
                        className="modal-box relative flex flex-col gap-5"
                        htmlFor=""
                      >
                        <div className="flex flex-row justify-center border-b border-gray-600 pb-2">
                          <p className="text-slate-300 text-lg font-semibold">
                            {userDetail.user.username}'s {game.Game.name}{" "}
                            profile
                          </p>
                        </div>
                        {modalClick ? (
                          <form className="flex flex-col gap-3">
                            <div className="flex flex-row w-full justify-around">
                              <div>
                                <p className="text-slate-300 text-sm text-center font-semibold">
                                  Rank
                                </p>
                                <select
                                  className="text-sm rounded-sm  bg-[#20252e]"
                                  onChange={onChangeModal}
                                  name="rank"
                                  value={editGame.rank}
                                >
                                  {game.Game.rankList.map((rank, index) => {
                                    return (
                                      <option value={index}>{rank}</option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div>
                                <p className="text-slate-300 text-sm text-center font-semibold">
                                  Type
                                </p>
                                <select
                                  className="text-sm rounded-sm  bg-[#20252e]"
                                  onChange={onChangeModal}
                                  name="matchType"
                                  value={editGame.matchType}
                                >
                                  <option value="Competitive">
                                    Competitive
                                  </option>
                                  <option value="Casual">Casual</option>
                                </select>
                              </div>

                              <div className="">
                                <p className="text-slate-300 text-sm text-center font-semibold">
                                  Role
                                </p>
                                <select
                                  className="text-sm rounded-sm  bg-[#20252e]"
                                  onChange={onChangeModal}
                                  name="role"
                                  value={editGame.role}
                                >
                                  {game.Game.roleList.map((role) => {
                                    return <option value={role}>{role}</option>;
                                  })}
                                </select>
                              </div>
                            </div>

                            <div className="">
                              <p className="text-slate-300 text-sm mb-2 font-semibold">
                                About
                              </p>
                              <input
                                className="text-slate-300 text-sm bg-[#20252e] p-2 rounded-md w-full"
                                value={editGame.aboutMe}
                                onChange={onChangeModal}
                                name="aboutMe"
                              />
                            </div>
                            <div className="flex flex-row justify-evenly">
                              <button
                                className="btn w-fit btn-sm hover:bg-red-500 hover:text-white border-none"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setModalClick(false);
                                  setEditGame({
                                    rank: "",
                                    role: "",
                                    matchType: "",
                                    aboutMe: "",
                                  });
                                }}
                              >
                                Cancel
                              </button>
                              <label
                                onClick={(e) => {
                                  onSubmitModal(game.id);
                                }}
                                className="btn w-fit btn-sm hover:bg-info hover:text-white border-none"
                                type="submit"
                              >
                                Submit
                              </label>
                            </div>
                          </form>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-row w-full justify-around">
                              <div>
                                <p className="text-slate-300 text-sm text-center font-semibold">
                                  Rank
                                </p>
                                <p className="text-slate-300 text-sm text-center">
                                  {game.Game.rankList[game.rank]}
                                </p>
                              </div>
                              <div>
                                <p className="text-slate-300 text-sm text-center font-semibold">
                                  Type
                                </p>
                                <p className="text-slate-300 text-sm text-center">
                                  {game.matchType}
                                </p>
                              </div>

                              <div>
                                <p className="text-slate-300 text-sm text-center font-semibold">
                                  Role
                                </p>
                                <p className="text-slate-300 text-sm text-center">
                                  {game.role}
                                </p>
                              </div>
                            </div>
                            <div className="">
                              <p className="text-slate-300 text-sm mb-2 font-semibold">
                                About
                              </p>
                              <p className="text-slate-300 text-sm bg-[#111419] p-2 rounded-md">
                                {game.aboutMe}
                              </p>
                            </div>
                            {+localStorage.getItem("id") !==
                            userDetail?.user?.id ? null : (
                              <button
                                className="btn w-fit self-end btn-sm hover:bg-tertiary hover:text-white border-none"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setModalClick(true);
                                  setEditGame({
                                    rank: game.rank,
                                    role: game.role,
                                    matchType: game.matchType,
                                    aboutMe: game.aboutMe,
                                  });
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        )}
                      </label>
                    </label>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card xl:w-96 md:w-full h-flex justify-center bg-primary rounded shadow-xl shadow-black gap-3 p-3">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/video-game-controller-6852037-5663146.png" />
              <p>Add a game to show people your game profile!</p>
              <button
                className="btn bg-tertiary w-32 text-white self-center"
                onClick={() => {
                  navigation("/addgame");
                }}
              >
                Add Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
