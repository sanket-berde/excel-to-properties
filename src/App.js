import React, { useEffect } from "react";
import "./App.css";
import ExcelToProperties from "./components/ExcelToProperties";
import PropertiesToExcel from "./components/PropertiesToExcel";

function App() {

  useEffect(() => {
    [...window.document.querySelectorAll('.tabs-stage > div')].forEach(elem => {
      elem.style.display = 'none';
    });
    window.document.querySelector('.tabs-stage > div:first-child').style.display = 'block';
    window.document.querySelector('.tabs-nav li:first-child').classList.add('tab-active');

    // Change tab class and display content
    [...window.document.querySelectorAll('.tabs-nav a')].forEach((item) => {
        item.addEventListener('click', function(event) {
          event.preventDefault();
  
        [...window.document.querySelectorAll('.tabs-nav li')].forEach(liElem => {
          liElem.classList.remove('tab-active');
        });
        event.target.parentElement.classList.add('tab-active');
        [...window.document.querySelectorAll('.tabs-stage > div')].forEach(elem => {
          elem.style.display = 'none';
        });
        window.document.querySelector(event.target.getAttribute('href')).style.display = 'block';
      }, false);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="tabs">
          <ul className="tabs-nav">
            <li>
              <a href="#tab-1">Excel to Properties</a>
            </li>
            <li>
              <a href="#tab-2">Properties to Excel</a>
            </li>
          </ul>
          <div className="tabs-stage">
            <div id="tab-1" class="tab-data">
              <p>
                <h2 style={{ marginBottom: "10px" }}>
                  Upload an excel file with appropriate format
                </h2>
                <ExcelToProperties />
              </p>
            </div>
            <div id="tab-2" class="tab-data">
              <p>
                <h2 style={{ marginBottom: "10px" }}>
                  Generate Excel From properties files
                </h2>
                <PropertiesToExcel />
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
