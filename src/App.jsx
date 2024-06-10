
import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch'
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';

function App() {
  
  const randomId = Math.floor(Math.random() *126) + 1;
  const [inputValue, setInputValue] = useState(randomId);
  const [location, getLocation, isLoading, hasError] = useFetch();

    useEffect (() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation (url);
  }, [inputValue]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase()); 
    textInput.current.value = "";
  }

  return (
    <div className='app'>
      {
        isLoading ?
          <figure className='app__img'><img src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1264.gif" alt="Loading" /></figure>
          :
          <> 
            <img className='app__img-title' src="https://www.silenzine.com/wp-content/uploads/2017/06/rick-morty-header.jpg" alt="Rick and Morty" />
            <form className= "app__form" onSubmit={handleSubmit}>
              <input className='app__form-input' ref={textInput} type="number" />
              <button className='app__form-btn'>Search</button>
            </form>
            {
              hasError || !+inputValue ?
               <h2>❌ Hey! you must provide an id from 1 to 126 😢</h2>
               :
               <> 
                <LocationCard
              info={location}     
                />
                <div className='app__container'>
              {
                location?.residents.map((character) => (
                  <ResidentCard 
                    key={character}
                    info={character}
                  />
                ))
              }
              </div>
              </>
               
            }
         </>   
      }
     </div>
  )
}

export default App
