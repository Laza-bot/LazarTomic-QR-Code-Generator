import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [temp, setTemp] = useState(""); // Temporary input
    const [word, setWord] = useState(""); // Final word for QR Code
    const [size, setSize] = useState(400); // QR code size
    const [bgColor, setBgColor] = useState("ffffff"); // QR code background color
    const [qrCode, setQrCode] = useState(""); // QR code link
    const [darkMode, setDarkMode] = useState(false); // Light/Dark mode toggle

    // Generate QR Code whenever text, size, or background color changes
    useEffect(() => {
        setQrCode(
            `http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`
        );
    }, [word, size, bgColor]);

    // Handle input change
    const handleClick = () => {
        setWord(temp); // Set the input as the word to be encoded
    };

    // Toggle Dark Mode
    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    return (
        <div className="App">
            {/* Dark Mode Toggle */}
            <button
                className="toggle-dark-mode"
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
            </button>

            <h1>LT QR Code Generator</h1>
            <div className="input-box">
                <div className="gen">
                    <input
                        type="text"
                        placeholder="Enter text"
                        onChange={(e) => setTemp(e.target.value)}
                    />
                    <button className="button" onClick={handleClick}>
                        Generate
                    </button>
                </div>
                <div className="extra">
                    <h5>Background Color:</h5>
                    <input
                        type="color"
                        value={`#${bgColor}`}
                        onChange={(e) =>
                            setBgColor(e.target.value.substring(1)) /* Background color */
                        }
                    />
                    <h5>Size:</h5>
                    <input
                        type="range"
                        min="200"
                        max="600"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>
            </div>
            <div className="output-box">
                <img src={qrCode} alt="Generated QR Code" />
                <a href={qrCode} download="QRCode">
                    <button className="button download-button">Download</button>
                </a>
            </div>
        </div>
    );
}

export default App;