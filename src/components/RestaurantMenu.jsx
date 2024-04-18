import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { MdStars } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { RiTimerFlashFill } from "react-icons/ri";
import { RiMotorbikeFill } from "react-icons/ri";
import MenuCard from "./MenuCard";
import { useParams } from "react-router-dom";
import { MENU_API } from "../constants";

const RestaurantMenu = () => {
  const [restroMenu, setRestroMenu] = useState(undefined);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);

    const json = await data.json();
    console.log(json.data.cards);
    setRestroMenu(json?.data?.cards);
  };

  if (restroMenu === undefined) {
    return <Shimmer />;
  }

  const {
    name,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    areaName,
    sla,
    feeDetails,
  } = restroMenu[2]?.card?.card?.info;

  const deliveryInfo = feeDetails.message;
  let parts, distance, deliveryFee;
  // Split the string based on the '|' character
  if (deliveryInfo) {
    parts = deliveryInfo?.split("|");

    // Extract distance and delivery fee
    distance = parts[0]?.replace("<b>", "")?.replace("</b>", "")?.trim();
    deliveryFee = parts[1]?.trim();
  }

  return (
    <div className="menu mx-32 my-6 pb-3">
      <div className="name text-4xl font-bold font-sans py-3">{name}</div>
      <div className="outletInfo border-2 p-5  flex flex-col justify-center items-start shadow-lg gap-2">
        <div className="ratingPrice">
          <div className="flex gap-1 items-center">
            <MdStars className="text-green-600" />
            <div>{avgRatingString}</div>
            <div>{`(${totalRatingsString})`}</div>
            <BsDot />
            <div>{costForTwoMessage}</div>
          </div>
        </div>
        <div className="cuisines">{cuisines.join(", ")}</div>
        <div className="locationTime flex flex-col justify-center">
          <div className="location flex items-center gap-1">
            <ImLocation2 /> {areaName}
          </div>
          <div className="time flex items-center gap-1">
            <RiTimerFlashFill /> {sla.slaString}
          </div>
        </div>
        <div className="border w-full border-gray-200"></div>
        {deliveryInfo && <div className="message flex items-center gap-1">
          <RiMotorbikeFill /> <b>{distance}</b> | {deliveryFee}
        </div>}
      </div>
      <div className="menuCard">
        <MenuCard
          data={restroMenu[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards}
        />
      </div>
    </div>
  );
};

export default RestaurantMenu;
