/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';


export default function ExcelToProperties({ onChange }) {
    const [fileName, setFileName] = useState('');
    const [fileData, setFileData] = useState([]); 
    const [columnHeaders, setHeaders] = useState([]); 

    const parseJSONToProperty = (obj) => ((obj && Object.keys(obj).map(item  => `${item}=${obj[item]}`)) || []);    


    const fileChange = (e) => {
        setFileName(e.target.files[0] && e.target.files[0].name);
        const { target } = e;
        readXlsxFile(target.files[0]).then((rows) => {
            // First element in the array is headers. So, neglect first row.
            const headers = rows.splice(0, 1)[0];

            let data = rows.map((row) =>
                row.reduce((acc, item, index) => {
                    acc[headers[index]] = item;
                    return acc;
                }, {}),
            );
            setFileData(data);
            setHeaders(headers);
        });
    };

    const keyName = columnHeaders[0];
    const finalObj = columnHeaders.slice(1).reduce((headerAccum, header) => {
        const obj = fileData.reduce((rowAccum, row) => {
            // row = { key: 'hello', en: 'Hello', fi: 'Hie', sv: 'Hola' };
            // rowAccum = { en: { hello: 'Hello'}, fi: { hello: 'Hie'}, sv: { hello: 'Hola'}}
            
            rowAccum[header] = { ...rowAccum[header], [row[keyName]]: row[header] };
            return rowAccum;
        }, {});    
        headerAccum = {...headerAccum, ...obj}; 
        return headerAccum;
    }, {});

    console.log(finalObj);

    return (
        <div className="excel-to-properties-container" style={{
            width: '100%'
        }}>
            <div style={{ marginBottom: '30px' }}>
                <label style={{}} className="btn first" htmlFor="contained-button-file">
                    <input accept=".xlsx, .xls" style={{ display: 'none' }} id="contained-button-file" type="file" onChange={fileChange} />
                        Upload Excel <span>&#8593;</span>
                </label>
                <span style={{ fontSize: 'smaller', marginRight: '10px' }}>{fileName}</span>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {columnHeaders.map((item, index) => {
                    const mappedArr = parseJSONToProperty(finalObj[item]);
                    return (index !== 0 && 
                        (
                        <div style={{ margin: '10px', border: '1px solid #FFF', padding: '10px', flexBasis: '30%' }}>
                            <h5 style={{ margin: '10px auto'}}>{item.replace('.properties', '')}</h5>
                            <textarea style={{ width: '90%', minHeight: '200px'}}name={item} onClick={(e) => { e.target.select();  }} value={mappedArr.join('\n')} placeholder={item} />
                            <a style={{
                                    display: 'block',
                                    fontSize: '20px',
                                    color: '#F44336',
                                    cursor: 'pointer'
                            }} 
                            href="abc"
                            onClick={(e) => { e.target.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(mappedArr.join('\n')); }}download={`${item.toLowerCase()}.properties`}>
                                {`${item.toLowerCase().replace('.properties', '')}.properties`}
                            </a>
                        </div>
                        )
                        ) || null
                })}
            </div>
        </div>
    );
}
