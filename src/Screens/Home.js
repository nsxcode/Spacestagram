import React, {useEffect, useState} from "react";


const Home = () => {
    console.log(process.env.REACT_APP_API_KEY);
    const apiKey = `${process.env.REACT_APP_API_KEY}`;
    const [imageData, setImageData] = useState([]);
    const [filterOn, setFilterOn] = useState(false);
    let startDate = '2021-12-01';
    let endDate = '2021-12-31';

    const fetchImages = ( prop ) => {
        fetch(`https://api.nasa.gov/planetary/apod?&start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
                .then(result => result.json())
                .then(resultItem => {
                    for(let i = 0; i < resultItem.length; i++){
                        setImageData(lastItem=>[...lastItem, resultItem[i]])
                    }
                })
    }

    useEffect(() => fetchImages(), [])

    const changeDate = (inputDate) => {
        inputDate.preventDefault() //Prevents from refreshing automatically on form submit
        startDate = inputDate.target[0].value;
        endDate = inputDate.target[1].value;
        setImageData([]);
        setFilterOn(true)
        fetchImages();
    }

    if(filterOn){
        return(
            <div><form onSubmit={changeDate}>
                <label>Start Date:</label>
                <input type="date" id="start-date" name="start-date"/>
                <label>End Date:</label>
                <input type="date" id="end-date" name="end-date"/>
                <input type="submit"/>
            </form>
                {imageData.map(e => <img src={e.url} alt="Images from Nasa"/>)}</div>
        )
    }
    else{
        return(
            <div>
                <form onSubmit={changeDate}>
                    <label>Start Date:</label>
                    <input type="date" id="start-date" name="start-date"/>
                    <label>End Date:</label>
                    <input type="date" id="end-date" name="end-date"/>
                    <input type="submit"/>
                </form>
                {imageData.map(image => <img src={image.url} alt="Images from Nasa"/>)}
            </div>
        )
    }
}

export default Home;
