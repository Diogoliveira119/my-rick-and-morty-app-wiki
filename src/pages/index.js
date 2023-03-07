import Head from 'next/head'
import Link from 'next/link'
// import React, { useState, useEffect } from 'react'



export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`https://rickandmortyapi.com/api/character`)
  const data = await res.json()
  console.log("this is the fetch " + data);

  // Pass data to the page via props
  return { props: { data } }
}


function Home({ data }) {
  console.log(data);

  const styles = {
    mainContent:{
      backgroundColor: 'white'
    },
    title: {
      color: "#01b1c5",
      fontSize: 20,
      fontWeight: "bold",
      margin: 20,
      fontFamily: "Helvetica",
      display:"flex",
      justifyContent: "center"
    },
    characterList: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      flex: 1,
      boxSizing: "border-box"  
    },
    button:{
      backgroundColor: "#01b1c5",
      borderRadius: 6,
      borderWidth: 0,
      boxSizing: "border-box",
      color: "#fff",
      fontSize: "100%",
      height: 44,
      lineHeight: 1.15,
      margin: 12,
      padding: 5,
      width: "10%",
      cursor: "pointer",
    },
    alive: {
      color:"green"
    },
    dead: {
      color:"red"
    },
    alien: {
      color:"blue"
    },
    normal: {
      
    },

  };
 
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <Head>
        <title>Rick & Morty Wiki</title>
      </Head>
      <div className="title" style={styles.title}>
        <h1>Rick & Morty Wiki</h1>
      </div>
      <div className='characterList' style={styles.characterList}>
        {data.results.map((result) => (
          <Link href="/characters/[id]" as={`/characters/${result.id}`}>
              <div style={{display: "flex", flex: 5, border: "2px solid black", padding: 5, margin: 10, justifyContent:"center"}}>
                <ul style={{display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems:"center", padding: 0}}>
                  <li key={result.id} style={{display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems:"center"}}>
                    <img src={result.image} alt={result.name} />
                    <h2>{result.name}</h2>
                    <h4 style={result.status === 'Alive' ? styles.alive : styles.dead}>{result.status}</h4>
                    <h4 style={result.species === 'Alien' ? styles.alien : styles.normal}>{result.species}</h4>
                  </li>
                </ul>
              </div>
          </Link>
        ))}
      </div>
      <div style={{display: "flex", justifyContent:"center"}}>
        <button style={styles.button}> Load More </button>
      </div>
    </div>
  )
}



export default Home
