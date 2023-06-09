import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import Searchbar from "../components/Searchbar";
import { haze, rainy, snow, sunny } from "../assets/index";
const API_KEY = "Your API Key insert here from openweatherapi";

const Home = () => {
  // states to manange data
  const [weatherData, setWeatherData] = useState();
  const [loading, setisLoading] = useState(true);

  // async function to fetch data from api

  async function fetchWeatherData(cityName) {
    setisLoading(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(API);
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.log(error);
    }
    setisLoading(true);
  }

  useEffect(() => {
    fetchWeatherData("Layyah");
    console.log(weatherData);
  }, []);

  // show indicator on the base of condition

  if (!loading) {
    return (
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          color={"gray"}
          size={35}
          style={{ alignSelf: "center" }}
        />
      </View>
    );
  } else if (weatherData == null) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ImageBackground
          source={haze}
          style={style.backgroundImg}
          resizeMode="cover"
        >
          <Searchbar fetchWeatherData={fetchWeatherData} />
          <Text style={{ color: "white" }}>
            City Not Found! Try Different City
          </Text>
        </ImageBackground>
      </View>
    );
  }
  return (
    <View style={style.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
};

export { Home };

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
});
