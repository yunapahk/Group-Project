import { baseUrl } from "./base_url";

export const notesLoader = async () => {
  // make a call to backend index route
  const response = await fetch(`${baseUrl}/note`);
  // convert the response in a js object
  const notes = await response.json();
  // return the notes
  return notes;
};
export const noteLoader = async ({ params }) => {
  // get the id param from the params object
  const id = params.id;
  // make a call to backend show route
  const response = await fetch(`${baseUrl}/note/${id}`);
  // convert the response into a js object
  const note = await response.json();
  // return the note
  return note;
};
