import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

function Body() {
  const [filteredRestroData, setFilteredRestroData] = useState([]);
  const [allRestroData, setAllRestroData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [topRatedRetroBtn, setTopRatedRetroBtn]= useState("Top Rated Restaurants");

  useEffect(() => {
    fetchData();
    console.log("useEffect...");
  }, []);

  useEffect(()=>{
    handleTopRatedRestaurants(topRatedRetroBtn)
  },[topRatedRetroBtn])

  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await response.json();
    // console.log(data);
    const restaurants =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    console.log("all restaurants: ", restaurants);
    setFilteredRestroData(restaurants);
    setAllRestroData(restaurants);
  };

  const handleTopRatedRestaurants = (result) => {
    if(result!="Top Rated Restaurants"){
      const data = allRestroData?.filter((restaurant) => {
        return restaurant?.info?.avgRating >= 4.5;
      });
      setFilteredRestroData(data);
    }else{
      setFilteredRestroData(allRestroData);
    }
  };

  const handleSearch=()=>{
    const filteredData=allRestroData.filter((restro)=> restro?.info?.name?.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredRestroData(filteredData);
  }

  console.log("body...");

  console.log("filterData Length: ", filteredRestroData?.length);

  // if(filterData?.length===0){
  //   return <Shimmer/>
  // }

  return filteredRestroData?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body border border-red-300">
      <div className="search-container flex justify-between items-center p-5">
        <div className="search flex gap-2">
          <input
            type="text"
            placeholder="search"
            className="p-1 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span
            className="p-1 border-2 bg-blue-300 hover:bg-gray-200 rounded-lg hover:cursor-pointer"
            onClick={() => handleSearch()}
          >
            Search
          </span>
        </div>
        <div className="top-rated-btn">
          <button
            className="p-1 border-2 border-black hover:bg-gray-200 rounded-lg hover:cursor-pointer"
            onClick={() => {
              topRatedRetroBtn === "Top Rated Restaurants" ? setTopRatedRetroBtn("All Rated Restaurants"): setTopRatedRetroBtn("Top Rated Restaurants")
            }}
          >
            {topRatedRetroBtn}
          </button>
        </div>
      </div>
      <div className="product-container p-5 border border-black flex gap-3 flex-wrap justify-center">
        {filteredRestroData?.map((restaurant) => {
          return (
            <Link to={`/restaurants/${restaurant?.info?.id}`} key={restaurant?.info?.id}><RestaurantCard
            restaurant={restaurant?.info}
            key={restaurant?.info?.id}
          /></Link>
          );
        })}
      </div>
    </div>
  );
}

export default Body;
