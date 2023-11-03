// import { getServerSession } from "next-auth";
import executeQuery from "../../../lib/db";

export async function GET() {
  try {
    const query = {
      query: "SELECT * FROM posts;",
      values: ["*"],
    };
    const posts = await executeQuery(query);

    return Response.json({ posts }, { status: 200 });
  } catch (e) {
    return Response.json(
      { message: "Houve um erro ao buscar pelas postagem." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description } = await request.json();

    const query = {
      query: "INSERT INTO posts (title, description) VALUES (?, ?)",
      values: [title, description],
    };

    const newPost = await executeQuery(query);

    return Response.json({ newPost }, { status: 201 });
  } catch (e) {
    return Response.json(
      { message: "Houve um erro ao salvar a postagem." },
      { status: 500 }
    );
  }
}
