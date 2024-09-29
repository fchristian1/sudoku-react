import React from "react";

function NineOfNine() {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-9 w-96 min-w-96 h-96 min-h-96">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((iX) => {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((iY) => {
                        return (
                            <div className="hover:bg-orange-200 cursor-pointer border border-1 border-black justify-center items-center grid grid-cols-3 text-[0.4rem] h-full w-full">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((iiX) => {
                                    return (
                                        <div className="flex justify-center ">
                                            {iiX}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    });
                })}
            </div>
        </div>
    );
}

export default NineOfNine;
