export default defineEventHandler<TSavedSimulation[]>((event) => {
    return [
        {
            id: "4za6c5d",
            idUser: "416qd4dz13",
            saveDate: new Date(1681038476784),
            saveName: "Dev Java",
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
        },
        {
            id: "gz3qz84qz",
            idUser: "4g6qf65z1a",
            saveDate: new Date(1681038476784),
            saveName: "Data python",
            simulation: {
                averageSalary: 72000,
                lowestSalary: 50000,
                highestSalary: 105000,
                parameters: {
                    nameJob: "Data scientits",
                    nameRegion: "Paris France",
                    namesStack: ['Python', 'Pandas', 'Java', 'C++'],
                    experience: 3,
                    status: "full time employee"
                }
            }
        },
        {
            id: "ry4opy9",
            idUser: "9aoizjldqs",
            saveDate: new Date(1681038476784),
            saveName: "Dev Sec.Ops.",
            simulation: {
                averageSalary: 45000,
                lowestSalary: 35000,
                highestSalary: 60000,
                parameters: {
                    nameJob: "Dev Ops",
                    nameRegion: "Tokyo",
                    namesStack: ['Jenkins', 'Linux', 'Windows', 'Python'],
                    experience: 6,
                    status: "full time employee"
                }
            }
        },
        {
            id: "ry4opy9",
            idUser: "9aoizjldqs",
            saveDate: new Date(1681038476784),
            saveName: "Back-end senior",
            simulation: {
                averageSalary: 82000,
                lowestSalary: 70000,
                highestSalary: 90000,
                parameters: {
                    nameJob: "Developeur back-end",
                    nameRegion: "Londre",
                    namesStack: ['Javascript', 'C#', 'Java', 'C++', 'Typescript'],
                    experience: 12,
                    status: "full time employee"
                }
            }
        },
        {
            id: "okpvqz465",
            idUser: "bpez654f",
            saveDate: new Date(1681038476784),
            saveName: "Chef de projet / PO",
            simulation: {
                averageSalary: 40000,
                lowestSalary: 35000,
                highestSalary: 55000,
                parameters: {
                    nameJob: "Product manager",
                    nameRegion: "Paris France",
                    namesStack: ['Jira', 'CSS', 'Excel', 'Kanban'],
                    experience: 1,
                    status: "full time employee"
                }
            }
        }
    ]
})