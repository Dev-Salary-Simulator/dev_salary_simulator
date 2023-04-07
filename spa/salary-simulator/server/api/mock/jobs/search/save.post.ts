export default defineEventHandler<{simulations: TSavedSimulation[]}>(async (event) => {
    const body: {saveName: string, simulation: DTOSimulation} = await readBody(event);
    const savedSimulations = useState<TSavedSimulation[]>('savedSimulations');
    const savedSimu: TSavedSimulation = {
        id: "1dz56adz3a",
        idUser: "d1eza3d",
        saveName: body.saveName,
        saveDate: new Date(),
        simulation: {
            averageSalary: 50000,
            lowestSalary: 34000,
            highestSalary: 67000,
            parameters: body.simulation
        }
    };

    return {simulations: [...savedSimulations.value, savedSimu]};
})