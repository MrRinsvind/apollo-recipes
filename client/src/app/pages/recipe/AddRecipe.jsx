import CKEditor from 'react-ckeditor-component'

import { Error } from 'common/widgets'


export default ({ handleChange, name, imageUrl, category, description, instructions, handleSubmit, validateForm, handleEditorChange, addRecipe, loading, error }) => (
  <div className="App">
    <h2 className="App">Add Recipe</h2>
    <form onSubmit={(event) => handleSubmit(event, addRecipe)} className="form">
      <input type="text" value={name} name="name" placeholder="Recipe Name" onChange={handleChange}/>
      <input type="text" value={imageUrl} name="imageUrl" placeholder="Recipe Image" onChange={handleChange}/>
      <select name="category" onChange={handleChange} value={category}>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <input type="text" name="description" placeholder="Add description" onChange={handleChange} value={description}/>


      <label htmlFor="instructions">Add instructions</label>
      <CKEditor
        name="instructions"
        content={instructions}
        events={{ change: handleEditorChange }}
      />
      <button onClick={(event) => handleSubmit(event, addRecipe)} disabled={loading || validateForm()} type="submit" className="button-primary">Submit</button>
      { error && <Error error={error}/> }
    </form>
  </div>
)