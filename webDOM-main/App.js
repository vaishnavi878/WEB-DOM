import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Editor from './Components/codeEditor'
import OfflineSync from './Hooks/offlineSync'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt, faStream, faFileDownload, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [html, setHtml] = OfflineSync('html', '')
  const [css, setCss] = OfflineSync('css', '')
  const [js, setJs] = OfflineSync('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [exp, setExp] = useState(true)
  const header = document.getElementById("head");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  function save(){
    const count = 1;
    //const htmlFile = document.getElementById("1").value;
    const data = new Blob([html], {type: "text/html" });
    //saveAs(data, count + ".html");
    //count = count+1;
    console.log(count)
  }

  function expand(){
    const header = document.getElementById("head");
    const top = document.getElementById("top");
    if (header.style.display === "none"){
      header.style.display = "flex";
      top.style.display = "flex";
    }
    else{
      header.style.display = "none";
      top.style.display = "none";
    }
  }

  return (
    <>
    <head><link rel="icon" href={faStream} /></head>
      <div className="header" id="head">
        <div className="logo"><FontAwesomeIcon icon={ faStream } /></div>
        <h1>Web DOM</h1>
        {/*<button type="button" className="save" >
          <FontAwesomeIcon icon={ faFileDownload } />
        </button>*/}
      </div>
      <div className="pane top-pane" id="top">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane bottompane">
        <FontAwesomeIcon icon={exp ? faExternalLinkAlt : faCompressAlt} onClick={() => {expand(); setExp(prevOpen => !prevOpen);}}
        style={{ position: 'absolute', right: '0', margin: '10', color: 'white', cursor: 'pointer'}} />
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

const styles = StyleSheet.create({
  editorText: {
    color: '#fff',
    fontFamily: 'arial',
  },
});

export default App;