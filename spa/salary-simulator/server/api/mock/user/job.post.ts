export default defineEventHandler<{currentJob: TJob}>(async (event) => {
    const body: {nameJob: string, nameStack: string[], nameRegion: string, salary: number, experience: number, status: string} = await readBody(event);
    return {
        currentJob: {
            id: "4q694da",
            idUser: "dz4ad1",
            nameJob: body.nameJob,
            namesStack: body.nameStack,
            nameRegion: body.nameRegion,
            salary: body.salary,
            experience: body.experience,
            active: true,
            status: body.status
        },
    }
})