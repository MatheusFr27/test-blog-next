'use client'

import { useSession, signOut } from "next-auth/react";

export default function Avatar() {
    const { data: session } = useSession();

    return (
        <div className='flex flex-row items-end justify-start mt-20'>
            {session ? (
                <>
                    <img
                        width={100}
                        className="relative inline-block h-25 w-25 rounded-full object-cover object-center"
                        alt={`imagem de ${session?.user?.name}`}
                        src={`${session && session.user.image ? session.user.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}`}
                    />

                    <div className='flex flex-col ml-2 mt-4'>
                        <span className='font-light'>Olá,</span>
                        <h1 className="font-bold text-4xl">{session.user.name}</h1>
                    </div>
                </>
            ) : (
                <div className='flex items-center justify-center' >
                    <div style={{ borderTopColor: 'transparent' }} className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
                    <h1 className="font-bold text-4xl">{session ? session.user.name : 'Carregando...'}</h1>
                </div>
            )}

            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded inline-flex items-center h-8 ml-4" onClick={() => signOut()}>
                <svg className="fill-current w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                <span>Deslogar</span>
            </button>
        </div>
    )
}