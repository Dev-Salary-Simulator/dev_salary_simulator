export default defineEventHandler<{currentJob: TJob}>(async (event) => {
    const body: {nameJob: string, nameStack: string[], salary: number, experience: number, status: string} = await readBody(event);
    return {
        currentJob: {
            id: "4q694da",
            idUser: "dz4ad1",
            nameJob: body.nameJob,
            namesStack: body.nameStack,
            nameRegion: "Paris France",
            salary: body.salary,
            experience: body.experience,
            active: true,
            status: body.status
        },
    }
})