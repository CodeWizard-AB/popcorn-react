import { useEffect, useState } from "react";
import { NavBar, SearchBar, MoviesCount } from "./components/Header";
import { tempMovieData, tempWatchedData } from "./App";
const KEY = "e00621ca";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("");
	useEffect(() => {
		const fetchMovies = async function () {
			try {
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
				);
				if (!response.Response) throw new Error("Movie not found 😕");

				const data = await response.json();
				console.log(data);
			} catch ({ message }) {
				console.log(message);
			} finally {
			}
		};

		fetchMovies();
	}, [query]);
	return (
		<>
			<NavBar>
				<SearchBar query={query} setQuery={setQuery} />
				<MoviesCount movies={movies} />
			</NavBar>
			<Main>
				<Box>
					
				</Box>
				<Box></Box>
			</Main>
		</>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function Box() {
	return <div className="box"></div>;
}
