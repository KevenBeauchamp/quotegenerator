import { useEffect, useState } from "react";
import './QuoteGenerator.css';
export default function Quotegenerator(props){
    const [quote_data, setQuote] = useState(false);
    const [quote_data_random, setQuoteRandom] = useState(false);
    const [quote_data_french, setQuoteFrench] = useState(false);
    const [selectCategory, setSelectedCategory] = useState("");
    const [data, setData] = useState(null);

    const backgroundMap = {
    attitude: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    business: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    education: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb",
    failure: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe",
    fear: "https://images.unsplash.com/photo-1526401485004-2fda9f17f1f5",
    happiness: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    inspirational: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
    leadership: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    life: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    love: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4",
    motivational: "https://images.unsplash.com/photo-1508780709619-79562169bc64",
    success: "https://images.unsplash.com/photo-1520974735194-8d647d2647b3",
    wisdom: "https://images.unsplash.com/photo-1500048993951-d995b6d51f8f",
    money: "https://images.unsplash.com/photo-1500048993951-d995b6d51f8f",
    default: "https://images.unsplash.com/photo-1503264116251-35a269479413"
    };
    const backgroundUrl = backgroundMap[quote_data.category] || backgroundMap.default;
    const handleChange = (event) =>{
        setSelectedCategory(event.target.value);
        // generateQuotes(event.target.value);
    }
    const generateQuotes = async(selectCategory = " ")=>{
        if (selectCategory == "random") return selectCategory == " ";
            
        let options = {
            method: 'GET',
            headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY,}
          }
          
             const url = `https://api.api-ninjas.com/v1/quotes?category=${selectCategory}`;
          
          console.log(url)
          fetch(url,options)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                  console.log("data",data)
                  console.log(data[0])
                  setQuote({
                    quote: data[0].quote,
                    author: data[0].author,
                    category: data[0].category
                  })
                })
                .catch(err => {
                    console.log(`error ${err}`)
                }); 
    }
    const generateQuotesRandom = async(selectCategory=" ")=>{
        if (selectCategory == "random") return selectCategory == " ";
            
        let options = {
            method: 'GET',
            headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY,}
          }
          
             const url = `https://api.api-ninjas.com/v1/quotes?category=${selectCategory}`;
          
        //   console.log(options)
          fetch(url,options)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                //   console.log(data)
                //   console.log("random",data[0])
                  setQuoteRandom({
                    quote: data[0].quote,
                    author: data[0].author,
                    category: data[0].category
                  })
                })
                .catch(err => {
                    console.log(`error ${err}`)
                }); 
    }
    // const generateQuotesFR = async()=>{
    //     try {
    //         const response = await fetch("https://api.quotable.io/quotes/random");
    //         const { statusCode, statusMessage, ...data } = await response.json();
    //         if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
    //         setData(data);
    //         console.log("data" , data);
    //       } catch (error) {
    //         // If the API request failed, log the error to console and update state
    //         // so that the error will be reflected in the UI.
    //         console.error(error);
    //         setData({ content: "Opps... Something went wrong" });
    //       }
        
    // }
    useEffect(
        ()=>{
            generateQuotesRandom()
            generateQuotes()
            // generateQuotesFR()
            const sevenMinutes =  7 * 60 * 1000;
            const intervalQ = setInterval(() => {
                generateQuotes();
            }, sevenMinutes); // 10 sec
            // return () => clearInterval(intervalQ);


            const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            const intervalId = setInterval(() => {
            generateQuotesRandom();
            }, oneDay);

            return () => clearInterval(intervalId,intervalQ); // Clean up
            
        },[]
    )
      
    const readQuote = () => {
    const speech = new SpeechSynthesisUtterance(`${quote_data.quote} by ${quote_data.author}`);
    window.speechSynthesis.speak(speech);
    };

      
    return(
        <>
            <div>
                <div>
                    <h2>Quote Generator</h2>
                </div>
                <div className="content">
                {quote_data_random?
                <div className="quoteDay">
                    <h2>Quote of the day</h2>
                    <p>{quote_data_random.quote}</p>
                    <h5>{quote_data_random.author}</h5>
                    {/* <span>Category : {quote_data.category}</span> */}
                </div>
                :<div className="quoteNone"></div>
                }
                {/* <div className="category">
                    <h3>Category</h3> */}
                    {/* <h5><p>Selected Category: {selectCategory}</p></h5> */}
                    {/* <div>
                    <div class="custom-select" >
                        <select value={selectCategory} onChange={handleChange} >
                            <option value="random">Random</option>
                            <option value="age"> Age</option>
                            <option value="alone">Alone</option>
                            <option value="amazing">Amazing</option>
                            <option value="anger">anger</option>
                            <option value="architecture">architecture</option>
                            <option value="art">art</option>
                            <option value="attitude">attitude</option>
                            <option value="beauty">beauty</option>
                            <option value="best">best</option>
                            <option value="birthday">birthday</option>
                            <option value="business">business</option>
                            <option value="car">car</option>
                            <option value="change"> change</option>
                            <option value="communication">communication</option>
                            <option value="computers">computers</option>
                            <option value="cool">cool</option>
                            <option value="courage">courage</option>
                            <option value="dad">dad</option>
                            <option value="dating">dating</option>
                            <option value="death">death</option>
                            <option value="design">design</option>
                            <option value="dreams">dreams</option>
                            <option value="education">education</option>
                            <option value="environmental">environmental</option>
                            <option value="equality"> equality</option>
                            <option value="experience">experience</option>
                            <option value="failure">failure</option>
                            <option value="faith">faith</option>
                            <option value="family">family</option>
                            <option value="famous">famous</option>
                            <option value="fear">fear</option>
                            <option value="fitness">fitness</option>
                            <option value="food">food</option>
                            <option value="forgiveness">forgiveness</option>
                            <option value="freedom">freedom</option>
                            <option value="friendship">friendship</option>
                            <option value="funny"> funny</option>
                            <option value="future">future</option>
                            <option value="god">god</option>
                            <option value="good">good</option>
                            <option value="government">government</option>
                            <option value="graduation">graduation</option>
                            <option value="great">great</option>
                            <option value="happiness">happiness</option>
                            <option value="health">health</option>
                            <option value="history">history</option>
                            <option value="home">home</option>
                            <option value="hope">hope</option>
                            <option value="humor"> humor</option>
                            <option value="imagination">imagination</option>
                            <option value="inspirational">inspirational</option>
                            <option value="intelligence">intelligence</option>
                            <option value="jealousy">jealousy</option>
                            <option value="knowledge">knowledge</option>
                            <option value="leadership">leadership</option>
                            <option value="learning">learning</option>
                            <option value="legal">legal</option>
                            <option value="life">life</option>
                            <option value="love">love</option>
                            <option value="marriage">marriage</option>
                            <option value="medical"> medical</option>
                            <option value="men">men</option>
                            <option value="mom">mom</option>
                            <option value="money">money</option>
                            <option value="morning">morning</option>
                            <option value="movies">movies</option>
                            <option value="success">success</option>
                        </select>
                    </div>

                    </div> */}

                {/* </div> */}
                
                {quote_data?
                <div
                //  style={{
                        
                //     backgroundImage: `url(${backgroundUrl})`,
                //      color: white;
                // } }
                className="quote">
                    
                    <p>{quote_data.quote}</p>
                    <h5>{quote_data.author}</h5>
                    <span>Category : {quote_data.category.toUpperCase()}</span>
                </div>
                :<div className="quoteNone"></div>
                }
                </div>
                    <div className="fof">
                        <div className="left">

                    </div>
                    <div className="right">
                        <button className="button" onClick={()=>generateQuotes(selectCategory)}>Generate New Quote`</button>
                        {/* <button onClick={readQuote}>🔊 Speak</button> */}
                    </div>
                </div>
                
                
            </div>
        </>
    )
}