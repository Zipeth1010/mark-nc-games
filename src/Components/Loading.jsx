import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className=" flex align-middle justify-center items-center w-screen h-screen bg-orange">
      <ReactLoading type={"bars"} color={"#fff"} height={300} width={180} />
    </div>
  );
};

export default Loading;
