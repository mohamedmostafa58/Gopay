import { useEffect, useState } from "react";
import Startinstructions from "./StartInstruction/Startinstructions";
import Video from "./video/Video";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Videocapture() {
  const [start, setStart] = useState(false);
  const { authToken, user } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  useEffect(()=>{
    if(!authToken){
      navigate("/")
    }
  })
  return (
    <>
      <div className="bg-blue-50 max-w-[100vw]">
        {!start ? (
          <Startinstructions start={start} setstart={setStart} />
        ) : (
          <Video />
        )}
      </div>
    </>
  );
}
export default Videocapture;
