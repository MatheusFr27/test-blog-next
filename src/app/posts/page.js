"use client";

import AvatarComponent from "./_components/Avatar";
import PostComponent from "./_components/Post";
import CreatePostModalComponent from "./_components/CreatePostModal";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Posts() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/login')
    }
  })

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function getPosts() {
    fetch("/api/posts", { method: "GET" })
      .then(async (response) => {
        if (response.status != 200) setError(true);

        const results = await response.json();

        setPosts(results.posts);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  function displayModal() {
    setShowModal(!showModal);
  }

  return (
    <section className="container mx-auto flex flex-col">
      <AvatarComponent />
      <p className="ml-6 mt-2">
        Visualize seus blog's existentes e comece a criar novos!
      </p>
      <div className="flex align-end justify-end">
        <button
          onClick={() => displayModal()}
          className=" my-4 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Criar nova postagem</span>
        </button>
      </div>
      {error ? (
        <h1 className="font-bold text-2xl text-center mt-6">
          Nenhuma postagem encontrada!
        </h1>
      ) : (
        <section>
          {loading ? (
            // Loading
            <div className="flex items-center justify-center">
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
              ></div>
              <p className="ml-2">carregando as postagens...</p>
            </div>
          ) : (
            // Posts
            <section className="flex flex-col items-center justify-center">
              {posts.map((e, i) => (
                <PostComponent key={i} posts={e} />
              ))}
            </section>
          )}
        </section>
      )}

      <CreatePostModalComponent
        show={showModal}
        closeModal={displayModal}
        reloadPosts={getPosts}
      />
    </section>
  );
}
