import MovingCircles from "@/features/Loading/components/MovingCircles";

const LoadingPage = () => {
    return(
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#EF521F] font-inter text-white text-center p-4 gap-13 md:gap-20">
            <div className="text-5xl md:text-7xl font-semibold mb-6 md:mb-12 leading-tight text-left w-full max-w-md">
                Creating <br/> Your Song
            </div>

            <MovingCircles />

            <div className="text-5xl md:text-7xl font-semibold mt-6 md:mt-12 rotate-180 leading-tight text-left w-full max-w-md">
                Creating <br /> Your Song
            </div>
        </div>
    );
};

export default LoadingPage;