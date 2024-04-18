import React from "react";
import vegLogo from "../assets/vegLogo.png";
import nonVegLogo from "../assets/nonVegLogo.jpg"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { AiFillStar } from "react-icons/ai";
import { CLOUDNARY_RES_URL } from "../constants";

function MenuCardType({ data }) {
  console.log("menucardType", data);
  return (
    <>
      {data.map((item) => {
        const { name, price, ratings, imageId, description, variantsV2, itemAttribute } =
          item?.card?.info;
        return (
          <div className="card  border-2 p-5 m-2 flex justify-between items-start shadow-lg gap-2">
            <div className="info flex flex-col gap-2 basis-2/3 flex-wrap">
              <img src={itemAttribute.vegClassifier==='VEG' ? vegLogo: nonVegLogo} alt="vegLogo" className="w-[40px] h-[40px]" />
              <div className="name text-lg font-sarif font-semibold">
                {name}
              </div>
              {(price || variantsV2?.pricingModels[0]?.price) && (
                <div className="price flex items-center">
                  <LiaRupeeSignSolid />
                  {price / 100 || variantsV2?.pricingModels[0]?.price / 100}
                </div>
              )}
              {ratings.aggregatedRating.rating && (
                <div className="rating flex items-center gap-1">
                  <AiFillStar />
                  {`${ratings.aggregatedRating.rating}(${ratings.aggregatedRating.ratingCount})`}
                </div>
              )}
              <div className="description font-thin">{description}</div>
            </div>
            <div className="res-img w-[200px] h-[200px] p-2">
              <img
                className="w-full h-full"
                src={`${CLOUDNARY_RES_URL}${imageId}`}
                alt=""
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MenuCardType;
