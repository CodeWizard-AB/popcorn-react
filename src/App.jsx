import { useEffect, useState } from "react";
import { NavBar, SearchBar, MoviesCount } from "./components/Header";
import MoviesList from "./components/MoviesList";
import { WatchedList, WatchedSummary } from "./components/WatchedList";
import MovieDetails from "./components/MovieDetails";

const KEY = "e00621ca";
export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedId, setSelectedId] = useState(null);

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
				// if (data.Response === "False") throw new Error("Movie not found!");

				setMovies(data.Search);
			} catch ({ message }) {
				setError(message);
			} finally {
				setLoading(false);
			}

			if (!query.length) {
				setMovies([]);
				setError(null);
				return;
			}
		};

		fetchMovies();
	}, [query]);

	const handleSelectedMovie = (id) =>
		setSelectedId(selectedId === id ? null : id);

	return (
		<>
			<NavBar>
				<SearchBar query={query} setQuery={setQuery} />
				<MoviesCount movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{loading && <Loader />}
					{error && !loading && <ErrorMessage error={error} />}
					{!loading && !error && (
						<MoviesList movies={movies} setSelectedId={handleSelectedMovie} />
					)}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							setSelectedId={setSelectedId}
							watched={watched}
							setWatched={setWatched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function Box({ children }) {
	const [open, setOpen] = useState(true);

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

function ErrorMessage({ error }) {
	return <p className="error">{error}</p>;
}
