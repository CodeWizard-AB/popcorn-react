import { useState } from "react";

export default function Rating({ maxLength = 5, onSetRating }) {
	const [rate, setRate] = useState(0);
	const [hoverRate, setHoverRate] = useState(0);

	return (
		<div className="rating-container">
			{Array.from({ length: maxLength }, (_, i) => (
				<Star
					key={i}
					onSetHoverRate={setHoverRate.bind(hoverRate, i + 1)}
					resetRate={setHoverRate.bind(hoverRate, 0)}
					activeStar={hoverRate ? hoverRate >= i + 1 : rate >= i + 1}
					onSetRate={() => {
						const rating = i + 1;
						setRate(rating);
						onSetRating(rating);
					}}
				/>
			))}
			<p className="rating-count">{rate || ""}</p>
		</div>
	);
}

function Star({ onSetHoverRate, onSetRate, resetRate, activeStar }) {
	return (
		<span
			role="button"
			className="stars"
			onClick={onSetRate}
			onMouseEnter={onSetHoverRate}
			onMouseLeave={resetRate}
		>
			{activeStar ? (
				<ion-icon name="star"></ion-icon>
			) : (
				<ion-icon name="star-outline"></ion-icon>
			)}
		</span>
	);
}
