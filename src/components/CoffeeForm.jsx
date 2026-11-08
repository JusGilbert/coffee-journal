import { useState } from "react";

const emptyForm = {
  name: "",
  place: "",
  rating: 3,
  notes: "",
  music: "",
  vibe: "",
};

function CoffeeForm({ onAddCoffee }) {
  const [formData, setFormData] = useState(emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.name.trim() === "") return;
    onAddCoffee({ ...formData, rating: Number(formData.rating) });
    setFormData(emptyForm);
  }

  return (
    <form className="coffee-form" onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="What did you drink?"
      />
      <input
        name="place"
        value={formData.place}
        onChange={handleChange}
        placeholder="Where did you get it?"
      />
      <input
        name="rating"
        type="number"
        min="1"
        max="5"
        step="0.5"
        value={formData.rating}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Any notes?"
      />
      <input
        name="music"
        value={formData.music}
        onChange={handleChange}
        placeholder="What music was playing?"
      />
      <input
        name="vibe"
        value={formData.vibe}
        onChange={handleChange}
        placeholder="What was the vibe?"
      />
      <button type="submit">Add Coffee</button>
    </form>
  );
}
export default CoffeeForm;
