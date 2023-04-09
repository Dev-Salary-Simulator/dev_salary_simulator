export default defineEventHandler<{simulation: TSavedSimulation}>(async (event) => {
    const body: {id: string, saveName: string} = await readBody(event);
    return {
        simulation: {
            id: body.id,
            idUser: "416qd4dz13",
            saveDate: new Date(1681038476784),
            saveName: body.saveName,
            simulation: {
                averageSalary: 50000,
                lowestSalary: 34000,
                highestSalary: 67000,
                parameters: {
                    nameJob: "Developeur front-end",
                    nameRegion: "Paris France",
                    namesStack: ['Java', 'Kotlin', 'VB.Net'],
                    experience: 5,
                    status: "self-employed"
                }
            }
        }
    }
})