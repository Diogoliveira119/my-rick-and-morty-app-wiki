import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react';


export async function getServerSideProps({ query }) {
    // Fetch data from external API
    const { id } = query;
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }



  function Home({ data }) {
    const [charLocation, setCharLocation] = useState();

    useEffect(() => {
      fetch(data.location.url)
        .then((response) => response.json())
        .then((data2) => setCharLocation(data2));
    },[]);

     const {name, status, species, gender, origin, location, image   } = data;

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
        justifyContent: "center",
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
      display:"flex",
      justifyContent: "center",
      alignItems: "center",

    },
  }

   return (
    <div>
        <Head>
          <title>Rick & Morty Wiki</title>
        </Head>
        <div className="title" style={styles.title}>
            <h1>Rick & Morty Wiki</h1>
        </div>
      <div style={{fontFamily: "Helvetica", display: 'flex', flex:1, justifyContent: 'center', flexDirection: 'row', border:"3px solid black", boxSizing: 'border-box', width:"50%", margin: "auto", alignItems:'flex-end'}}>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', boxSizing: 'border-box', alignContent:'center', justifyContent: 'center', alignItems:'center', margin: 'auto'}}>
          <img src={image} alt={name} height="100%" style={{justifySelf:"center", alignSelf: 'center'}} />
          <div style={{display: 'flex', flex:1, justifyContent: 'center', flexDirection: 'column', marginLeft: 25}}>
            <div style={{display:"flex", flexDirection: 'column', flex: 2}}>
              <h1>Name: {name}</h1>
              <h1>From: {origin.name}</h1>
            </div>
              <div style={{display: 'flex',flex: 5, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column'}}>
                <p>
                  Current location: {charLocation?.name}
                </p>
                <p>
                  Type of location: {charLocation?.type}
                </p>
                <p>
                  Dimension: {charLocation?.dimension}
                </p>
              </div>
          </div>
        </div>
        <Link href="/" style={styles.button}> Go back </Link>
      </div>
    </div>
   )
  }
  
  
  
  export default Home