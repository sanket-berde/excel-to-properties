import React, { useState } from 'react';
import ReactExport from 'react-export-excel';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

export default function PropertiesToExcel () {
    const [languageData, setLanguageData] = useState({});
    const [translationKeys, setTranslationKeys] = useState([]);
    const [fileName, setFileName] = useState('');
    

    const getColumnData = (sheet) => sheet.headers.map((header) => <ExcelColumn label={header.value} value={header.key} />);

    const getSheetData = (sheet) => (
        <ExcelSheet data={sheet.data} name={sheet.name}>
            {getColumnData(sheet)}
        </ExcelSheet>
    );

    const formRowsData = (data) => {    
        return translationKeys.map((translationKey) => {
            const obj = {};
            const keys = Object.keys(data);

            for(let i = 0; i < keys.length; i++) {
                obj[keys[i]] = data[keys[i]][translationKey];
            }

            return { key: translationKey, ...obj };
        });
    }

    const generateSheets = (langData) => {
        const formatSheetData = {
            headers: [
                {key: 'key', value: 'Key'},
                ...Object.keys(langData).map(key => ({key, value: key}))
            ],
            data: formRowsData(langData),
            name: 'UI Translations'
        };

        console.log(formatSheetData);
        return getSheetData(formatSheetData);
    };

    const onFileChange = (e) => {
        var files = e.target.files;
        const file = files[0];

        var reader = new FileReader();
        reader.onload = function () {
            // console.log(reader.result);
            const arr = reader.result.split('\n');
            let translationKeysArr = [];

            const resultObj = arr.map((item) => {
                const index = item.indexOf('=');
                const translationKey = item.substr(0, index);

                translationKeysArr = [...new Set([...translationKeysArr, translationKey])];

                return {
                    key: translationKey,
                    value: item.substr(index + 1)
                };
            }).reduce((acc, elem) => {
                acc[elem.key] = elem.value;
                return acc;
            }, {});

            setTranslationKeys([...new Set([...translationKeys, ...translationKeysArr])]);
            setLanguageData({...languageData, [file.name]: resultObj });
            setFileName(file.name);
        };
        if(file) {
            reader.readAsText(file);
        }
    }

    return (
        <>
            {
                <ul style={{ textAlign: 'left' }}>
                    {Object.keys(languageData).map(
                        (key) => (
                            <li style={{ color: '#8ade28',}}>
                                <span style={{ marginRight: '10px' }}>&#x2713;</span>{key}
                            </li>
                        )
                    )}
                </ul>
            }
            <div style={{ marginBottom: '30px' }}>
                <label style={{}} className="btn first" htmlFor="contained-button-file-1">
                    <input accept=".properties" style={{ display: 'none' }} id="contained-button-file-1" type="file" onChange={onFileChange} />
                        Upload Properties File <span>&#8593;</span>
                </label>
                <span style={{ fontSize: 'smaller', marginRight: '10px' }}>{fileName}</span>
            </div>
            <ExcelFile
                element={
                    <button className="btn third">Submit and Generate Excel</button>
                }
                filename={`Download - ${new Date().toDateString()}`}
            >
                {generateSheets(languageData)}
            </ExcelFile>
        </>
    );
}
