import { useEffect, useState } from "react";
import Rating from "./Rating";

function Loader() {
	return <p className="loader">Loading...</p>;
}

const KEY = "e00621ca";
export default function MovieDetails({
	selectedId,
	setSelectedId,
	watched,
	setWatched,
}) {
	const [loading, setLoading] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState({});
	const [rating, setRating] = useState(0);
	const {
		Actors,
		Director,
		Poster,
		Runtime,
		Plot,
		Released,
		imdbRating,
		Title,
		Genre,
		imdbID,
	} = selectedMovie;

	useEffect(() => {
		const fetchSelected = async function () {
			try {
				setLoading(true);
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
				);
				const data = await response.json();
				setSelectedMovie(data);
			} finally {
				setLoading(false);
			}
		};

		fetchSelected();
	}, [selectedId]);

	useEffect(() => {
		document.title = Title;
		return () => (document.title = "usePopCorn");
	}, [Title]);

	const handleAddMovie = function () {
		const newMovie = {
			Title,
			imdbID,
			Poster,
			Runtime: +parseInt(Runtime),
			userRating: rating,
			imdbRating: +imdbRating,
		};
		if (watched.every((movie) => movie.imdbID !== imdbID)) {
			setWatched([...watched, newMovie]);
			setSelectedId(null);
		}
	};

	const isWatched = watched.some((movie) => movie.imdbID === selectedId);
	const isWatchedRate = watched.find((_) => isWatched)?.userRating;

	return (
		<div className="details">
			<button
				className="btn-back"
				onClick={setSelectedId.bind(selectedId, null)}
			>
				<ion-icon name="arrow-back-outline"></ion-icon>
			</button>
			{loading ? (
				<Loader />
			) : (
				<>
					<header>
						<img src={Poster} alt={Title} />
						<div className="details-overview">
							<h2>{Title}</h2>
							<p>
								{Released} - {Runtime}
							</p>
							<p>{Genre}</p>
							<p>⭐️ {imdbRating} IMDb Rating</p>
						</div>
					</header>
					<section>
						<div className="rating">
							{isWatched ? (
								<p>The movie was rated with {isWatchedRate} stars</p>
							) : (
								<Rating maxLength={10} onSetRating={setRating} />
							)}
							{rating > 0 && (
								<button className="btn-add" onClick={handleAddMovie}>
									+ Add to list
								</button>
							)}
						</div>
						<p>
							<em>{Plot}</em>
						</p>
						<p>{Actors}</p>
						<p>Directed by {Director}</p>
					</section>
				</>
			)}
		</div>
	);
}
