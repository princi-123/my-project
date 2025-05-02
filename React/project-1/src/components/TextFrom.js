import React, {useState} from 'react'

export default function TextFrom(props) {
    const handleUpClick = () => {
        console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("converted to uppercase!", "success");
    }
    const handleLoClick = () => {
        console.log("Uppercase was clicked" + text);
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("converted to lowercase!", "success");
    }
    const handleClearClick = () => {
        console.log("Uppercase was clicked" + text);
        let newText = '';
        setText(newText);
        props.showAlert("Text cleared!", "success");
    }
    const handleOnChange = (event) => {
        console.log("On Change");
        setText(event.target.value);
        props.showAlert("Extra spaces removed!", "success");
    }

    const handleCopy = () => {
        console.log("I am copy");
        var text = document.getElementById("myBox");
        text.select();
        text.setSelectionRange(0,9999);
        navigator.clipboard.writeText(text.value);
    }
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    }
    const [text, setText] = useState('Enter text here2');
    // text = "new text"; //Wrong way to change the state
    // setText = ("new text"); // Corrent way to change the state
  return (
    <>
    <div className="container">
        <h1 style={{color: props.mode === 'light' ? 'black' : 'white'}}>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} style= {{backgroundColor: props.mode==='light'?'white':'lightgray',
                color: props.mode=== 'dark'?'white':'black'}}id="myBox" rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleCopy}>copy Text</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
    </div>
    <div className="container my-3" style={{color: props.mode=== 'dark'?'white':'black'}}>
        <h1>your text summary</h1>
        <p>{text.split(" ").filter((element)=>{return element.length!=0}).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length}Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter something in the textbox above to preview it here"}</p>
    </div>
    </>
  )
}
