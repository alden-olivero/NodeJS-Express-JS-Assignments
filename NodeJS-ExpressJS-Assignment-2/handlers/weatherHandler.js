const fs=require("fs");

const cities=JSON.parse(fs.readFileSync(`${__dirname}/../data/weather.json`));

exports.showAllDetails =(req,res)=>{
  res.status(200)
  .json({
    status:"Success",
    results:cities.length,
    data:{
      cities
    }
  });
};

//show cities with rainy weather 
exports.showRainDetails = (req, res) => {

  const filteredCities = cities
    .filter(city => city.weather && city.weather.some(weather => weather.main === "Rain"))
    .map(city => city.city.name);

  res.status(200).json({
    status: "Success",
    results: filteredCities.length,
    data: {
      citiesWithRain: filteredCities
    }
  });
}; 

exports.changeRainDetails = (req, res) => {
  const cityName = req.params.cityName.toLowerCase();
  
  const city = cities.find(c => c.city && c.city.name && c.city.name.toLowerCase() === cityName);
  if (city) {
      city.weather.forEach(weather => (weather.main = "No Rain"));
      fs.writeFileSync(`${__dirname}/../data/weather.json`, JSON.stringify(cities, null, 2));
      res.json({ message:`Rain details updated to 'No Rain' for city ${cityName}` });
  } else {
      res.status(404).json({ message: "City not found" });
  }
};

exports.showDetailOfSpecificCity = (req, res) => {
  const cityName = req.params.cityName.toLowerCase();
  const city = cities.find(c => c.city && c.city.name && c.city.name.toLowerCase() === cityName);

  if (!city) {
      return res.status(404).json({ message: 'City not found' });
  }

  res.status(200).json({
      status: "Success",
      data: {
          city
      }
  });
};

exports.addCityWeather=(req,res)=>{
  const newCityID = cities[cities.length - 1].id + 1;
  const newCity=Object.assign({id:newCityID},req.body);
  cities.push(newCity);

  fs.writeFile(`${__dirname}/../data/weather.json`,JSON.stringify(cities),(err)=>{
    if(err) throw err;
    res.status(201).json({
      message:"City weather added successfully",
      data:{
        newCity
      }
    });
  });
};
exports.removeCity = (req, res) => {
  const cityName = req.params.cityName.toLowerCase();
  const cityIndex = cities.findIndex(city => city && city.city && city.city.name && city.city.name.toLowerCase() === cityName);

  if (cityIndex === -1) {
      return res.status(404).json({ message: 'City not found' });
  }
  const removedCity = cities.splice(cityIndex, 1);

  fs.writeFileSync(`${__dirname}/../data/weather.json`, JSON.stringify(cities, null, 2));

  res.status(200).json({
      status: "Success",
      message: "City removed successfully",
      removedCity: removedCity[0]
  });
};