export default defineEventHandler<{simulation: TSimulation}>(async (event) => {
    const body = await readBody(event);
    return {
        simulation: {
            averageSalary: 50000,
            lowestSalary: 34000,
            highestSalary: 67000,
            parameters: {
                nameJob: body.nameJob,
                nameRegion: "Paris France",
                namesStack: body.namesStack,
                experience: body.experience,
                status: body.status
            }
        }
    }
})