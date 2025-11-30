import React from 'react'
import { useState } from 'react'
import axios from "axios";

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
        })
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center p-4"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1610471618983-c5030cb8a9dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2VhdGhlciUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D')`
            }}
        >
            <div className='bg-gradient-to-b from-gray-300/80 to-gray-500/80 p-10 mx-auto max-w-xl rounded-2xl shadow-2xl w-full'>
                
                <div>
                    <h1 className='text-black font-bold animate-pulse duration-100 text-lg md:text-2xl text-center'>
                        Weather Report
                    </h1>
                    <p className='text-black font-medium mt-4 text-sm text-center'>
                        Get real-time weather updates for any city worldwide.
                    </p>
                </div>

                <div className='flex items-center justify-center mt-7'>
                    <input
                        type='text'
                        placeholder='Please enter your city...'
                        className='border rounded-full p-2 md:p-3 shadow-xl outline-none w-48 md:w-72'
                        onChange={handleCity}
                    />
                    <button
                        className='text-white p-2 md:p-3 ml-3 bg-gray-700 rounded-lg'
                        onClick={getWeather}
                    >
                        Search
                    </button>
                </div>

                {error && (
                    <h1 className='text-red-600 text-center mt-3 font-semibold'>
                        {error}
                    </h1>
                )}

                <div className='mt-10 p-6 text-center'>
                    <h1 className='text-4xl'>🌍</h1>
                    <h1>
                        <span className='text-black font-semibold'>Country : </span>
                        <span className='text-yellow-300'>{country}</span>
                    </h1>
                </div>

                <div className='grid grid-cols-2 gap-6 mt-10 text-sm md:text-lg'>
                    <p className='rounded-lg p-2 md:bg-white/20'>
                        <span className='text-black font-medium'>⛅ Weather : </span>
                        <span className='text-yellow-400'>{weather}</span>
                    </p>

                    <p className='rounded-lg p-2 md:bg-white/20'>
                        <span className='text-black font-medium'>🔥 Temperature : </span>
                        <span className='text-yellow-400'>{temp}</span>
                    </p>

                    <p className='rounded-lg p-2 md:bg-white/20'>
                        <span className='text-black font-medium'>💧 Humidity : </span>
                        <span className='text-yellow-400'>{humidity}</span>
                    </p>

                    <p className='rounded-lg p-2 md:bg-white/20'>
                        <span className='text-black font-medium'>📝 Description : </span>
                        <span className='text-yellow-400'>{desc}</span>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Weather
