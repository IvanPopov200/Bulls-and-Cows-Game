import "./style.css";
import { useState, useEffect } from "react";

const hiddenNumber = () => {
  const generateHiddenNumber = Math.floor(Math.random() * 9000 + 1000);
  if (checkHiddenUnique(generateHiddenNumber)) {
    return generateHiddenNumber;
  } else {
    return hiddenNumber;
  }
};

const checkHiddenUnique = (givenNumber) => {
  return !/(.).*?\1/.test(givenNumber);
};

const testInput = (hiddenNumber, inputData) => {
  let bull = 0;
  let cow = 0;
  for (let i = 0; i < hiddenNumber.length; i++) {
    if (
      inputData.includes(hiddenNumber[i]) &&
      hiddenNumber[i] === inputData[i]
    ) {
      bull++;

      if (bull === 4) {
        return alert("We Got a Winner!");
        
      }
    } else if (inputData.includes(hiddenNumber[i])) {
      cow++;
    }
  }
  return {
    inputData: inputData,
    bull: bull,
    cow: cow,
  };
};

function App() {
  useEffect(() => {
    setgenerated(hiddenNumber());
  }, []);

  const [generatedNumber, setgenerated] = useState(0);
  const [checkBull, setcheckBull] = useState(0);
  const [checkCow, setcheckCow] = useState(0);
  const [inputData, setData] = useState("");
  const [historyInput, sethistoryInput] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData === "") {
      return alert("Please enter a 4 digits number!");
    } else if (inputData.length < 4) {
      return alert("Please enter a 4 digits number!");
    }

    const testresult = testInput(generatedNumber.toString(), inputData);
    setcheckBull(testresult.bull);
    setcheckCow(testresult.cow);
  
    if (historyInput.length <= 10) {
      sethistoryInput((history) => [
        ...history,
        testresult,
      ]);
    }
    else{
      sethistoryInput([
        testresult,
      
      ]);
    }
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setData(e.target.value);
  };

  return (
    <div className='page-wrapper'>
      <div className='game-wrapper'>
        <div className='header-wrapper'>
          <h1>Bulls And Cows Game!</h1>
        </div>
        <div className='container-wrapper'>
        <div className='input-wrapper'>
          <form action=''>
            <input type='text' required maxLength='4' onChange={handleInput} />
            <button onClick={handleSubmit}>Guess!</button>
          </form>
        </div>
        <div className='display-wrapper'>
          <div className='display-result'>
            <h3>
              Bulls: {checkBull} Cows: {checkCow}
            </h3>
          </div>
          <div className='display-input'>
            <ul>
              {historyInput.map((history, index) => {
                return (
                  <li key={index}>
                    {history.inputData}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
export { hiddenNumber, checkHiddenUnique, testInput };