import React from "react";
import { CLOUDNARY_RES_URL } from "../constants";

function RestaurantCard({ restaurant }) {
  //   console.log(restaurant);
  //   console.log(restaurant?.name);
  return (
    <div className="restaurantCard w-[200px] bg-gray-100 border hover:border-1 hover:border-black hover:cursor-pointer">
      <div className="res-img w-[200px] h-[200px] p-2">
        <img
          className="w-full h-full"
          src={`${CLOUDNARY_RES_URL}${restaurant?.cloudinaryImageId}`}
          alt=""
        />
      </div>
      <div className="res-info p-2 flex flex-col gap-y-1">
        <p className="text-[16px] font-medium">{restaurant?.name}</p>
        <p>{restaurant?.cuisines?.join(", ")}</p>
        <p>{restaurant?.avgRating}</p>
        <p>{restaurant?.costForTwo}</p>
        <p>{restaurant?.sla?.slaString}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;
