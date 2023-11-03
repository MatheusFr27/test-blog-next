import executeQuery from '../../../../lib/db'
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const newUser = await request.json()

        if (newUser.password != newUser.confirmPassword) return Response.json({ message: 'Senhas diferentes.' }, { status: 400 });

        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const query = {
            query: 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            values: [newUser.name, newUser.email, hashedPassword]
        }

        const user = await executeQuery(query)

        if (user) {
            return Response.json({ message: 'usuário registrado com sucesso.' }, { status: 201 });
        }

        return Response.json({ message: 'Usuário Invalido' }, { status: 400 });

    } catch (e) {
        return Response.json({ message: 'Houve um erro ao registrar o usuário' }, { status: 500 });
    }

}