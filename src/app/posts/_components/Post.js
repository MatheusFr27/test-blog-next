"use client";

import moment from "moment";

export default function Post({ posts }) {
  return (
    <div className="w-full mx-2 mt-10 p-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-16 lg:max-w-none lg:grid-cols-3 shadow-md">
      <article className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="text-gray-500">
            {moment(posts.created_at).format("DD/MM/YYYY")}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              {posts.title}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {posts.description}
          </p>
        </div>
      </article>
    </div>
  );
}
