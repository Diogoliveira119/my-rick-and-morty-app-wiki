import Head from 'next/head'
import Link from 'next/link'

export async function getServerSideProps({ query }) {
    // Fetch data from external API
    const { id } = query;
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const data = await res.json()
    console.log("this is the fetch " + data);
  
    // Pass data to the page via props
    return { props: { data } }
  }


  function Home({ data }) {
   console.log(data);

   return (
    <h1>{data.name}</h1>
   )
  }
  
  
  
  export default Home