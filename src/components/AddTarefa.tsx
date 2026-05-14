import { useState } from "react";
import { criarTarefa } from "../services/Service";
import "../styles/main.scss";
import { IoMdAdd } from "react-icons/io";


export const AddTarefa = ({onTarefaAdicionada}:any) => {
    const [title,setTitle] = useState("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        await criarTarefa({
            title,
            completed:false
        });

        setTitle("");
        onTarefaAdicionada();
    };

    return(
        <form onSubmit={handleSubmit} className="field_form">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nova Tarefa" required/>
            <button type="submit" className="btn"><IoMdAdd size={50} className="btn_Add"/></button>
        </form>
    )
}


