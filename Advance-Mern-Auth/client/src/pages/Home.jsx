
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const{userData} = useAuth();
  return (
    <div className=" flex flex-col justify-center items-center mt-24  ">
      <img
        className="w-44 h-44 animate-bounce "
        src={assets.header_img}
        alt=""
      />
      <h1 className="text-2xl font-semibold flex justify-center items-center gap-4">
        Hey {userData ? userData.name : "Developer"}! {" "}
        <img className="w-10 h-10 " src={assets.hand_wave} alt="" />
      </h1>
      <h2 className="text-4xl font-bold">Welcom to our app</h2>
      <p className="text-sm max-w-md w-full text-gray-500 my-5 text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus iure
        corrupti distinctio eligendi omnis alias aspernatur molestias sit vitae
        velit, cupiditate nobis.
      </p>
      <button className="border border-gray-500 hover:bg-gray-100 transition-all duration-300 px-6 py-2 rounded-full cursor-pointer">
        Get Start
      </button>
    </div>
  );
};

export default Home;
