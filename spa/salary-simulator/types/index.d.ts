declare global {
    type TUser = {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        birthday: Date;
        currentJob: TJob;
        oldJobs: TJob[];
    }

    type TJob = {
        id: string;
        idUser: string;
        nameJob: string;
        namesStack: string[];
        nameRegion: string;
        salary: number;
        experience: number;
        active: boolean;
    }
    
    type TSimulation = {
        averageSalary: number;
        lowestSalary: number;
        highestSalary: number;
        parameters: {
            nameJob: string;
            namesStack: string[];
            experience: number;
            status: string;
        }
    }

    type TSavedSimulation = {
        id: string;
        idUser: string;
        saveName: string;
        saveDate: Date;
        simulation: TSimulation;
    }

    // DTO
    type DTOSimulation = {
        nameJob: string;
        namesStack: string[];
        experience: number;
        status: string;
    }
}

export {};