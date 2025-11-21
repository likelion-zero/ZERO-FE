import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovingCircles from "@/features/Loading/components/MovingCircles";

import { post } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

const LoadingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { songId } = location.state || {}; 

    useEffect(() => {
        if (!songId) {
            navigate('/');
            return;
        }

        const requestSunoGeneration = async () => {
            try {
                const response = await post(ENDPOINTS.CREATE_SONG(songId), {});
                console.log("Suno 응답:", response); 
                const isSuccess = 
                    response && 
                    response.code === 200 && 
                    response.data && 
                    response.data.status === "SUCCESS";

                if (isSuccess) {
                    console.log(`생성 완료! /player/${songId} 로 이동합니다.`);
                    navigate(`/player/${songId}`);
                } else {
                    throw new Error("Suno generation failed or pending");
                }

            } catch (error) {
                console.error("곡 생성 실패:", error);
                navigate('/'); 
            }
        };

        requestSunoGeneration();

    }, [songId, navigate]);

    return(
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#EF521F] font-inter text-white text-center p-4 gap-13 md:gap-20">
            <div className="text-6xl md:text-7xl font-semibold mb-6 md:mb-12 leading-tight text-left w-full max-w-md">
                Creating <br/> Your Song
            </div>

            <MovingCircles />

            <div className="text-6xl md:text-7xl font-semibold mt-6 md:mt-12 rotate-180 leading-tight text-left w-full max-w-md">
                Creating <br /> Your Song
            </div>
        </div>
    );
};

export default LoadingPage;