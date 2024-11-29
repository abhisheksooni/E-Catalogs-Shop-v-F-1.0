import React, { useState } from 'react'


function ReviewCard({srcImg, Name}) {

    const [Hover, Sethover] = useState(false);


    return (
        <>
            <div
                onMouseEnter={() => Sethover(true)}
                onMouseLeave={() => Sethover(false)}
                className={` min-w-[269px] max-w-[270px] ease-out duration-200 bg-c1 rounded-2xl cursor-pointer ${Hover ? "scale-[.96]" : "scale-100 "
                    }`}
            >
                <div className=" p-4 text-c5">
                    <div className=" flex items-center justify-between">
                        {/* <ReactStarss value={3.5} count={5} size={24} color2={"#ffd700"} /> */}
                        <p className="  text-sm">16-Jan-24</p>
                    </div>
                    <p className="px-2 py-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam debitis eligendi tempora doloremque sapiente aspernatur commodi unde illum, ab molestias omnis, obcaecati maxime. Consequuntur aspernatur nostrum impedit dolores?</p>
                    <div className=" flex items-center">
                        <img src={srcImg} alt="" className="w-12 h-12 bg-red-500 rounded-full" />
                        <p className="ml-4 ">{Name}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewCard