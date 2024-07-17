export class myhistory {
    async allhistory () {
        try {
            const res = await fetch('http://localhost:8000/admin/userhistory', {
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

    async userhistory({id}) {
        try {
            const res = await fetch('http://localhost:8000/admin/user/history', {
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

export const history = new myhistory()