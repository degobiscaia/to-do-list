import type { Tarefa } from "../types/Tarefa";

const API_URL = "https://todo-list-backend-1hj4.onrender.com/tarefa";

export const buscarTarefa = async (): Promise<Tarefa[]> => {
    const response = await fetch(API_URL);
    return response.json();
};

export const criarTarefa = async (tarefa:Omit<Tarefa, "id">) => {
    await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tarefa),
        headers: {
            "Content-Type": "application/json"
        }
    });

};

export const deletarTarefa =async (id:number) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
};

export const atualizarTarefa = async (tarefa:Tarefa) => {
    await fetch(`${API_URL}/${tarefa.id}`, {
        method: 'PUT',
        body: JSON.stringify(tarefa),
        headers: {
            "Content-Type": "application/json"
        }
    });
};

