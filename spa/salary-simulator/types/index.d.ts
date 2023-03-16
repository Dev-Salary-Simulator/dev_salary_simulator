declare global {
    type TUser = {
        id: string;
        firstname: string;
        lastname: string;
        birthday: Date;
        currentJob: Job;
        oldJobs: Job[];
    }

    type TJob = {
        id: string;
        idUser: string;
        nameJob: string;
        namesStack: string[];
        nameRegion: string;
        salary: number;
        experience: "0-3" | "4-8" | "8-15" | "15+";
        active: boolean;
    }
    
    type TSimulation = {
        averageSalary: number;
        lowestSalary: number;
        highestSalary: number;
        parameters: {
            nameJob: string;
            nameRegion: string;
            namesStack: string[];
            experience: "0-3" | "4-8" | "8-15" | "15+";
        }
    }

    type TSavedSimulation = {
        id: string;
        idUser: string;
        simulationName: string;
        simulationDate: Date;
        simulation: Simulation;
    }
}

export {};