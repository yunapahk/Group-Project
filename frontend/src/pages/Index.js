import { Link, useLoaderData, Form } from "react-router-dom";

function Index(props) {
  // GET THE DATA FROM OUR LOADER
  const Note = useLoaderData();

  return (
    <div>
      <h2>Create a Note</h2>
      <Form action="/create" method="post">
        <input type="text" name="title" placeholder="note's title" />
        <input
          type="text"
          name="description"
          placeholder="note's description"
        />
        <input type="text" name="url" placeholder="note's url" />
        <input type="submit" value="Create Note" />
      </Form>
      {Note.map((Note, index) => {
        return (
          <div key={Note._id} className="Note">
            <Link to={`/${Note._id}`}>
              <h1>{Note.title}</h1>
            </Link>
            <h3>{Note.description}</h3>
            <h3>{Note.url}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Index;
