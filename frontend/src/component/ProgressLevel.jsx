import React from 'react';

const ProgressLevel = ({ currentExp = 0, maxExp = 100, currentLevel = 1, nextLevel = 2 }) => {
    const progress = (currentExp / maxExp) * 100;

    return (
        <div className="bg-white rounded-xl p-4 w-full">
            <div className="flex items-center gap-2 mb-2">
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.2428 10.6265C15.0989 8.49224 15.527 7.42511 16.2224 7.27721C16.4053 7.23832 16.5943 7.23832 16.7771 7.27721C17.4726 7.42511 17.9006 8.49224 18.7567 10.6265C19.2436 11.8402 19.487 12.447 19.9425 12.8598C20.0702 12.9756 20.2089 13.0787 20.3566 13.1677C20.883 13.485 21.5402 13.5438 22.8546 13.6616C25.0796 13.8608 26.1921 13.9605 26.5319 14.5948C26.6022 14.7262 26.6501 14.8684 26.6734 15.0156C26.786 15.7263 25.9682 16.4704 24.3324 17.9585L23.8782 18.3718C23.1135 19.0675 22.7311 19.4154 22.5099 19.8495C22.3773 20.11 22.2883 20.3904 22.2466 20.6797C22.1772 21.162 22.2891 21.6666 22.5131 22.6759L22.5931 23.0365C22.9947 24.8466 23.1955 25.7516 22.9448 26.1965C22.7197 26.596 22.3049 26.8519 21.8468 26.8737C21.3368 26.8981 20.6181 26.3125 19.1808 25.1413C18.2339 24.3697 17.7604 23.9839 17.2348 23.8332C16.7545 23.6954 16.2451 23.6954 15.7648 23.8332C15.2391 23.9839 14.7657 24.3697 13.8187 25.1413C12.3814 26.3125 11.6628 26.8981 11.1527 26.8737C10.6946 26.8519 10.2799 26.596 10.0547 26.1965C9.80408 25.7516 10.0049 24.8466 10.4065 23.0365L10.4865 22.6759C10.7104 21.6666 10.8224 21.162 10.7529 20.6797C10.7112 20.3904 10.6223 20.11 10.4896 19.8495C10.2684 19.4154 9.88607 19.0675 9.12134 18.3718L8.66711 17.9585C7.0314 16.4704 6.21354 15.7263 6.32617 15.0156C6.3495 14.8684 6.39733 14.7262 6.4677 14.5948C6.80743 13.9605 7.91994 13.8608 10.145 13.6616C11.4593 13.5438 12.1165 13.485 12.643 13.1677C12.7906 13.0787 12.9293 12.9756 13.0571 12.8598C13.5126 12.447 13.756 11.8402 14.2428 10.6265Z" stroke="#F97316" stroke-width="2" />
                </svg>

                <h3 className="text-lg font-semibold text-gray-800">Tiến độ thăng cấp</h3>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Cấp độ {currentLevel}</span>
                <span>Cấp độ {nextLevel}</span>
            </div>

            <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-300 to-orange-500 transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="mt-2 text-center text-sm text-gray-600">
                {currentExp}/{maxExp} Kinh nghiệm
            </div>
        </div>
    )
}

export default ProgressLevel 