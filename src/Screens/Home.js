import React, {useEffect, useState} from "react";
import blackheart from "../assets/blackheart.png";
import heartoutline from "../assets/heartoutline.png";

const Home = () => {
    const apiKey = `${process.env.REACT_APP_API_KEY}`;
    const [imageData, setImageData] = useState([]);
    const [filterOn, setFilterOn] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const toggle = () => {
        setIsLiked(!isLiked);
    }

    let startDate = '2021-12-01';
    let endDate = '2021-12-12';

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

    const Display = () => {
        return(
            <div className="row">
                <div className="column">
                    <div className="fixed-position">
                        <h1>Spacestagram</h1>
                        <h2 className="centre-subheading"> Filter by</h2>

                        <form onSubmit={changeDate} className="centre">
                            <div className="row">
                                <div className="form-column">
                                    <label>Start Date:</label>
                                </div>
                                <div className="form-column">
                                    <input type="date" id="start-date" name="start-date"/>
                                </div>

                            </div>
                            <div className="row">
                                <div className="form-column">
                                    <label>End Date:</label>
                                </div>
                                <div className="form-column">
                                    <input type="date" id="end-date" name="end-date"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-column">
                                    <input className="submit-btn" type="submit"/>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>

                <div className="column">
                    {imageData.filter((item, index) => index < Math.ceil(imageData.length / 2)).map(
                        (image, i) =>
                        <div className="image-container">
                            <img src={image.url} alt="Images from Nasa"/>

                            <div className="image-info">
                                <h2>{image.title}</h2>
                                <p>{image.date}</p>
                                <img key={image.key} id={image.key} className="heart" src={isLiked ? blackheart : heartoutline} alt="" onClick={toggle}/>
                            </div>
                        </div>)}

                </div>

                <div className="column">
                    {imageData.filter((item, index) => index > Math.ceil(imageData.length / 2)).map(
                        image =>
                        <div className="image-container">
                            <img src={image.url} alt="Images from Nasa"/>

                            <div className="image-info">
                                <h2>{image.title}</h2>
                                <p>{image.date}</p>
                                <img className="heart" src={isLiked ? blackheart : heartoutline} alt="" onClick={toggle}/>
                            </div>
                        </div>)}
                </div>
            </div>
        )
    }

    if(filterOn){
        return(
            <Display/>
        )
    }
    else{
        return(
            <Display/>
        )
    }
}


export default Home;
