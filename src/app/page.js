'use client'

import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <h1 className='text-4xl font-semibold tracking-wide'>Bem-vindo ao Blog teste</h1>
          <h3 className='text-md font-normal underline decoration-red-500'>em NextJs</h3>
        </div>

        <p className="m-10 font-light">Publique suas postagens simples e fácil para que seus seguidores possam consumir seu conteúdo!</p>


        <Link href={'/auth/login'} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded inline-flex items-center shadow-lg">
          <span>Acessar blog</span>
        </Link>


      </main>
    </section>
  )
}
