export default defineEventHandler<TSimulation>(async (event) => {
    const body = await readBody(event);
    return {
        averageSalary: 50000,
        lowestSalary: 34000,
        highestSalary: 67000,
        parameters: {
            nameJob: body.nameJob,
            nameRegion: body.nameRegion,
            namesStack: body.namesStack,
            experience: body.experience,
            status: body.status
        }
    }
})