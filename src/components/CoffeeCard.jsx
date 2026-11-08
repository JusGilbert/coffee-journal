function CoffeeCard({ id, name, place, rating, notes, music, vibe, onDelete }) {
  return (
    <article className="coffee-card">
      <h2> {name}</h2>
      <p>Place: {place}</p>
      <p>Rating: {rating} / 5</p>
      <p>Notes: {notes}</p>
      <p>Music: {music}</p>
      <p>Vibe: {vibe}</p>
      <button className="delete-button" onClick={() => onDelete(id)}>
  Delete
</button>
    </article>
  );
}

export default CoffeeCard;
