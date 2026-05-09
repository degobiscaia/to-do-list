import { useEffect, useState } from "react";
import type { Tarefa } from "../types/Tarefa";
import { buscarTarefa, deletarTarefa, atualizarTarefa } from "../services/Service";
import { AddTarefa } from "../components/AddTarefa";
import "../styles/style.scss";
import "../styles/media.scss";
import { ImBin } from "react-icons/im";
import { Atom } from "react-loading-indicators";


export const Home = () => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [Isloading, setIsloading] = useState(false);
    const [error, setError] = useState(false);
   // const [register,setRegister] = useState(false);

    useEffect(() => {
        carregarTarefas();
    }, []);

    const carregarTarefas = async () => {
        setIsloading(true);
        setError(true);

        try {
            const data = await buscarTarefa();
            setTarefas(data);
        } catch (error) {
            alert('Erro ao carregar tarefas');
            setError(true);
        } finally {
            setIsloading(false);
            setError(false);
        }

        /*
        if(tarefas.length === 0) {
            setRegister(true);
        }
        */
    };

    const handleDelete = async (id:number) => {
        await deletarTarefa(id);
        await carregarTarefas();
    };

    const handleToggle = async (tarefa: Tarefa) => {
        await atualizarTarefa({...tarefa, completed: !tarefa.completed});
        await carregarTarefas();
    };

    return(
        <div className="box">
            <h1>To do-List</h1>
            <AddTarefa onTarefaAdicionada={carregarTarefas}/>
            <div>{Isloading ? <div className="load"><Atom color="#fff" size="medium" text="" textColor=""/><p>Carregando...</p></div> : null}</div>
            <div>{error ? <p>Não foi possível se conectar ao servidor</p> : null}</div> 

            <div className="box-itens">
               {tarefas.map((tarefa => (
                <div key={tarefa.id} className="tarefa">
                    <div className="checkbox">
                      <input type="checkbox" checked={tarefa.completed} onChange={() => handleToggle(tarefa)}/>  
                    </div>      
                    <p className="title-task">{tarefa.title}</p>
                    <button onClick={() => handleDelete(tarefa.id)} className="btn"><ImBin size={30} className="btn_Del"/></button>
                </div>
            )))}  
            </div>
            
        </div>
    );
};