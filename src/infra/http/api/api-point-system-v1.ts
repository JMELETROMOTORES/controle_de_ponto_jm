import axios from 'axios';

async function fetchEmployees(employeeId: string) {
    try {
        const response = await axios.get(`http://localhost:3000/schedules/employee/${employeeId}`);
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        return [];
    }
}


export { fetchEmployees };