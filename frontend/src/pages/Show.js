import { useLoaderData, Form } from "react-router-dom";

function Show(props) {
  const Note = useLoaderData();
  console.log(Note);

  return (
    <div className="Note">
      <h1>{Note.title}</h1>
      <h2>{Note.description}</h2>
      <h2>{Note.url}</h2>

      <h2>Update {Note.title}</h2>
      <Form action={`/update/${Note._id}`} method="post">
        <input
          type="text"
          name="title"
          placeholder="Note's title"
          defaultValue={Note.title}
        />
        <input
          type="text"
          name="description"
          placeholder="Note's description"
          defaultValue={Note.description}
        />
        <input
          type="text"
          name="url"
          placeholder="Note's url"
          defaultValue={Note.url}
        />
        <input type="submit" value="Update Note" />
      </Form>

      <h2>Delete Note</h2>
      <Form action={`/delete/${Note._id}`} method="post">
        <input type="submit" value="Delete Note" />
      </Form>
    </div>
  );
}

export default Show;
