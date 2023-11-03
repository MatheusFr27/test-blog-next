
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';


export default function FormRegister() {
    const router = useRouter();
    
    const { pending } = useFormStatus()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            name,
            email,
            password,
            confirmPassword
        }

        setLoadingButton(true)
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        setLoadingButton(false)

        if (response.status != 201) {
            console.log(response)
            return
        }

        router.replace('/auth/login')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Cadastrando conta</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Crie uma conta e começe a publicar suas postagens.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                        {/* Nome de usuário */}
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nome de usuário</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input onChange={(e) => setName(e.target.value)} type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded" placeholder="janesmith" />
                                </div>
                            </div>
                        </div>

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

                        {/* Confirmar Senhas */}
                        <div className="sm:col-span-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirmar Senha</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Botão */}
                        <div className="sm:col-span-4">
                            <div className="flex justify-center align-center">
                                <button type='submit' aria-disabled={pending} className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded w-full">
                                    {loadingButton ? (
                                        <div style={{ borderTopColor: "transparent" }} className="w-8 h-8 border-4 border-green-200 rounded-full animate-spin"></div>
                                    ) : (
                                        <span>Cadastrar-se</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}