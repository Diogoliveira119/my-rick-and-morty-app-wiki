import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'



// export async function getServerSideProps(context) {
//     // Fetch data from external API
//     const res = await fetch(`https://rickandmortyapi.com/api/character`)
//     const data = await res.json()
//     console.log("this is the fetch " + data);

//     // Pass data to the page via props
//     return { props: { data } }
// }


function Search({ }) {
    // console.log(data);

    const [char, setChar] = useState();

    const styles = {
        mainContent: {
            backgroundColor: 'white'
        },
        title: {
            color: "#01b1c5",
            fontSize: 20,
            fontWeight: "bold",
            margin: 20,
            fontFamily: "Helvetica",
            display: "flex",
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
        button: {
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        alive: {
            color: "green"
        },
        dead: {
            color: "red"
        },
        alien: {
            color: "blue"
        },
        normal: {

        },

    };

    // useEffect(() => console.log(char), [char])

    async function getMoreChars() {
        console.log("Entrou " + char.info.next);
        const a = await fetch(char.info.next);
        const b = await a.json();
        console.log(b);
        setChar((char) => ({
            ...char, results: [...char.results, ...b.results],
            info: b.info
        }));
    }

    async function searchChars(c) {
        c.preventDefault();
        const charName = c.target.char.value
        console.log(charName);
        const a = await fetch(`https://rickandmortyapi.com/api/character/?name=${charName}`);
        const b = await a.json();
        console.log(b);
        setChar(b)
    }


    return (
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Helvetica", textDecoration: "none" }}>
            <Head>
                <title>Rick & Morty Wiki</title>
            </Head>
            <div className="title" style={styles.title}>
                <h1>Rick & Morty Wiki</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }} class="container__item">
                <form onSubmit={searchChars} class="form">
                    <input type="name" id='char' name='char' class="form__field" placeholder="Find your favorite character" />
                    <button style={{borderRadius: 6}} type="Submit" class="btn btn--primary btn--inside uppercase">Find</button>
                </form>
            </div>
            <div className='characterList' style={styles.characterList}>
                {char?.results.map((result) => (
                    <Link style={{display: "flex", width: "20%",}} href="/character/[id]" as={`/character/${result.id}`}>
                        <div key={result.id} style={{ backgroundColor: "rgba(1, 177, 197, 0.7)", display: "flex", flex: 5, border: "2px solid rgba(1, 177, 197, 1)", borderRadius: 10, padding: 5, margin: 10, justifyContent: "center" }}>
                            <ul style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", padding: 0}}>
                                <li style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center" }}>
                                    <img style={{ borderRadius: 10, width: 100, height: 100 }} src={result.image} alt={result.name} />
                                    <h2>{result.name}</h2>
                                    <h4 style={result.status === 'Alive' ? styles.alive : styles.dead}>{result.status}</h4>
                                    <h4 style={result.species === 'Alien' ? styles.alien : styles.normal}>{result.species}</h4>
                                </li>
                            </ul>
                        </div>
                    </Link>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link href="/" style={styles.button}> Go back </Link>
                {char && <button onClick={getMoreChars} style={styles.button}> Load More </button>}
            </div>
        </div>
    )
}



export default Search
