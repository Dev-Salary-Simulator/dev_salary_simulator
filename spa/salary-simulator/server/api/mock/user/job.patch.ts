export default defineEventHandler<{user: TUser}>((event) => {
    return {
        user:{
            id: "dz4ad1",
            firstname: 'Rudolph',
            lastname: 'Guinguant',
            birthday: new Date(1680194520330),
            email: "r.guinguant@example.com",
            currentJob: null,
            oldJobs: [{
                id: "4q694da",
                idUser: "dz4ad1",
                nameJob: "Software engineer",
                namesStack: ["Typescript", "React", "Nuxt"],
                nameRegion: "France",
                salary: 50000,
                experience: 4,
                active: true,
                status: "full time employee"
            },{
                id: "jt465hr",
                idUser: "dz4ad1",
                nameJob: "Developer front-end",
                namesStack: ["Javascript", "React"],
                nameRegion: "France",
                salary: 35000,
                experience: 2,
                active: false,
                status: "self-employed"
            },{
                id: "v94e1v",
                idUser: "dz4ad1",
                nameJob: "Help desk",
                namesStack: ['Php', 'CSS', 'HTML'],
                nameRegion: "France",
                salary: 25000,
                experience: 1,
                active: false,
                status: "self-employed"
            }]
        }
    }
})