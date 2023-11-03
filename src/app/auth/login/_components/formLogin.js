'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormStatus } from 'react-dom';

export default function FormLogin() {

    const { pending } = useFormStatus()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loadingButton, setLoadingButton] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setLoadingButton(true)
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        setLoadingButton(false)

        if (result?.error) {
            console.log(result)
            return
        }

    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="border-b border-gray-900/10 pb-4">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Acessando conta</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Entre na sua conta e crie novas postagens.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">

                            {/* E-mail */}
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" autoComplete="email" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded" placeholder="janesmith@email.com" />
                                    </div>
                                </div>
                            </div>

                            {/* Senhas */}
                            <div className="sm:col-span-4">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded" />
                                    </div>
                                </div>
                            </div>

                            {/* Botão */}
                            <div className="sm:col-span-4">
                                <div className="flex justify-center align-center">
                                    <button type='submit' aria-disabled={pending} className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                        {loadingButton ? (
                                            <div style={{ borderTopColor: "transparent" }} className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
                                        ) : (
                                            <span>Acessar</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className='flex justify-center mt-3 mb-6'>

                <button className="flex items-center justify-center px-2 py-1 border-2 rounded-lg font-medium border-black sm:col-span-4" onClick={() => signIn('google')}>
                    <span className="mr-2">
                        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                            <path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                            <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                            <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                            <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                        </svg>
                    </span>
                    <span>Acessar com Google</span>
                </button>
            </div>
        </section>
    )
}