// import { Lightbulb } from "lucide-react";
// import Image from "next/image";

export const ErrorStartApp = () => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-[url('/images/bg-notmobile.jpg')] bg-center bg-no-repeat bg-cover !z-20">
      <div className="w-[60%] flex flex-col justify-center items-center">
        Please try again later!
      </div>
      <div className="w-[70%] flex flex-col justify-center items-center">
        Errors occured when running app.
      </div>
    </div>
  );
};
