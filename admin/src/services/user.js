export class user {

    async getalluser() {
        try {
            const res = await fetch("http://localhost:8000/admin/allusers", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json()
            return data

        } catch (e) {
            console.log(e)
        }
    }

    async userLoginHistory ({ id }) {
        try {
            const res = await fetch("http://localhost:8000/admin/user/loginhistory", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })

            const data = await res.json()
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export const users = new user()