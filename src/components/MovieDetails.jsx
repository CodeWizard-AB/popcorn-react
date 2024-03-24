import { useEffect, useState } from "react";

function Loader() {
	return <p className="loader">Loading...</p>;
}

const KEY = "e00621ca";
export default function MovieDetails({ selectedId, setSelectedId }) {
	const [loading, setLoading] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState({});
	const {
		Actors,
		Director,
		Poster,
		Runtime,
		Plot,
		Released,
		imdbRating,
		Year,
		Title,
		Genre,
	} = selectedMovie;

	useEffect(() => {
		const fetchSelected = async function () {
			try {
				setLoading(true);
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
				);
				const data = await response.json();
				console.log(data);
				setSelectedMovie(data);
			} finally {
				setLoading(false);
			}
		};

		fetchSelected();
	}, [selectedId]);

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
						<div className="rating"></div>
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
