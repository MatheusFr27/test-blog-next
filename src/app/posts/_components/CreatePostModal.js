"use client";

import { useState } from "react";

export default function CreatePostModal({ show, closeModal, reloadPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      title,
      description,
    };

    setLoadingButton(true);
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setLoadingButton(false);
    console.log(await response.json())
    if (response.status != 201) {
      console.log(response);
      return;
    }

    reloadPosts();
    closeModal()
  }

  return (
    <div
      className={` ${
        show ? "absolute top-0 right-0 bottom-0 left-0" : "hidden"
      } py-12 bg-gray-700 bg-opacity-90 transition duration-150 ease-in-out z-10`}
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="w-full flex justify-start text-gray-600 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="70"
              height="70"
              strokeWidth="0.8"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>post-outline</title>
              <path d="M19 5V19H5V5H19M21 3H3V21H21V3M17 17H7V16H17V17M17 15H7V14H17V15M17 12H7V7H17V12Z" />
            </svg>
          </div>
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Nova postagem
          </h1>

          {/* Content */}
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="title"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Título
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Ex.: Hoje em dia..."
            />
            <label
              htmlFor="description"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Descrição
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-blue-500 font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Ex.: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              rows={5}
            ></textarea>
            {/* Buttons */}
            <div className="flex items-center justify-start w-full">
              <button
                type="submit"
                className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out hover:bg-green-700 bg-green-600 rounded text-white px-8 py-2 text-sm"
              >
                {loadingButton ? (
                  <div
                    style={{ borderTopColor: "transparent" }}
                    className="w-5 h-5 border-4 border-green-200 rounded-full animate-spin"
                  ></div>
                ) : (
                  <span>Publicar</span>
                )}
              </button>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={() => closeModal()}
              >
                Cancelar
              </button>
            </div>
          </form>

          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
            onClick={() => closeModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
