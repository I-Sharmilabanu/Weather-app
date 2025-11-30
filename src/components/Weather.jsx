import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { cloneElement } from 'react';

function Weather() {
    const [city, setcity] = useState("")
    const [country, setcountry] = useState("")
    const [weather, setweather] = useState("")
    const [temp, settemp] = useState("")
    const [humidity, sethumitidy] = useState("")

    const [desc, setdesc] = useState("")
    const [error, setError] = useState("");

    function handleCity(evt) {
        setcity(evt.target.value)

    }
    function getWeather() {

        var weatherdata = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c6b750f00a30b7e1b3b5aa8dabaa033`)

        weatherdata.then(function (success) {
            console.log(success.data);
            setcountry(success.data.sys.country);
            setweather(success.data.weather[0].main);
            settemp(success.data.main.temp);
            sethumitidy(success.data.main.humidity);
            setdesc(success.data.weather[0].description);
            setError("");

        })
        weatherdata.catch(function (error) {
            console.log("city not found", error);
            setError("City not found");
        }

        )
    }
    return (
        <div>
            <div className='bg-gradient-to-b from-gray-300 to-gray-500 p-20 mx-auto max-w-xl items-center shadow-xl h-4/5'>
                <div>
                    <h1 className='text-black font-bold animate-pulse duration-100 text-lg md:text-2xl'>Weather Report</h1>
                    <p className='text-black font-medium mt-3 text-sm transform translate-x-3   duration-200'>you get  weather condition world wide..</p>

                </div>
                <div >
                    <input type='text' placeholder='please enter you city. . .' className='border rounded-full md:p-3 mt-3 shadow-xl outline-none'
                        onChange={handleCity} />
                    <button className='text-white p-1 md:p-3 ml-3 bg-gray-600 rounded-full '
                        onClick={getWeather}>search</button>

                </div>
                {error && (
                    <h1 className='text-red-500 text-center mt-3 font-semibold'>
                        {error}
                    </h1>
                )}
                <div className='mt-10 p-6'>
                    <h1>🌍</h1>
                    <h1><span className='text-black font-semibold'>Country : </span>

                        <span className='text-yellow-300'>{country}</span>
                    </h1>
                </div>

                <div className='grid grid-cols-2 text-white gap-20 mt-10 text-sm md:text-lg'>
                    <p className=' bg-white/20 rounded-lg '><span className='text-black font-medium'>⛅Weather :   </span>
                        <span className='text-yellow-400'>{weather}</span></p>
                    <p className=' bg-white/20 rounded-lg '><span className='text-black font-medium'>🔥Temprature : </span>
                        <span className='text-yellow-400'>{temp}</span></p>
                    <p className=' bg-white/20 rounded-lg '><span className='text-black font-medium'>💧Humitidy : </span>
                        <span className='text-yellow-400'>{humidity}</span></p>
                    <p className=' bg-white/20 rounded-lg '><span className='text-black font-medium'>📝Description : </span>
                        <span className='text-yellow-400'>{desc}</span></p>


                </div>


            </div>
        </div>
    )
}

export default Weather 