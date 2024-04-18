import React from "react";
import MenuCardType from "./MenuCardType";

function MenuCard({ data }) {
  data = data.slice(2);
  console.log(data);

  return (
    <>
      {data.map((item) => {
        return (
          <div className="type">
            {item?.card?.card?.itemCards && (
              <>
                <div className="typeHeading p-5 font-bold text-xl">{`${item?.card?.card?.title}(${item?.card?.card?.itemCards?.length})`}</div>
                <MenuCardType data={item?.card?.card?.itemCards} />
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default MenuCard;
