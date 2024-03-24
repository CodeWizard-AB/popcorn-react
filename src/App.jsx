import { useEffect, useState } from "react";
import { NavBar, SearchBar, MoviesCount } from "./components/Header";
import { tempMovieData, tempWatchedData } from "./App";
import MoviesList from "./components/MoviesList";
import { WatchedList, WatchedSummary } from "./components/WatchedList";

const KEY = "e00621ca";
export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMovies = async function () {
			try {
				setLoading(true);
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
				);
				if (!response.ok)
					throw new Error("Something went wrong while fetching movies!");

				const data = await response.json();
				if (!data.Response) throw new Error("Movie not found!");

				setMovies(data.Search);
			} catch ({ message }) {
				console.log(message);
			} finally {
				setLoading(false);
			}

			if (!query.length) {
				setMovies([]);
				return;
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
				<Box>{loading ? <Loader /> : <MoviesList movies={movies} />}</Box>
				<Box>
					<WatchedSummary watched={tempWatchedData} />
					<WatchedList watched={tempWatchedData} />
				</Box>
			</Main>
		</>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function Box({ children }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="box">
			<button className="btn-toggle" onClick={setOpen.bind(open, !open)}>
				{open ? "-" : "+"}
			</button>
			{open && children}
		</div>
	);
}

function Loader() {
	return <p className="loader">Loading...</p>;
}
