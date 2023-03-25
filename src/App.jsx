import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [alunos, setAlunos] = useState([]);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [bimestre, setBimestre] = useState("");


  function limparCampos(){
    setId("");
    setNome("");
    setMatricula("");
    setCurso("");
    setBimestre("");
  }

  async function getAlunos() {
    try {
      const response = await axios.get("https://api-aluno.vercel.app/aluno");
      setAlunos(response.data);
    } catch (error) {
      alert("Erro ao buscar dados.");
    }
  }

  async function addAluno(event){
    event.preventDefault();

    try{
      await axios.post("https://api-aluno.vercel.app/aluno", {
        nome: nome,
        matricula: matricula,
        curso: curso,
        bimestre: bimestre,
    });
    limparCampos();
    getAlunos();

    } catch (error) {
      alert("Erro a cadastrar novo aluno")
    }
  }

  async function deleteAluno(id){
    
    try{ 
      await axios.delete(`https://api-aluno.vercel.app/aluno/${id}`);
      getAlunos();
    } catch (error){
      alert("Erro em deletar aluno")
    }
  }

  function preencheCampos(aluno){
    setId(aluno._id);
    setNome(aluno.nome);
    setMatricula(aluno.matricula);
    setCurso(aluno.curso);
    setBimestre(aluno.bimestre);
  }

  async function editAluno(){
    event.preventDefault();
    try{
      await axios.put(`https://api-aluno.vercel.app/aluno/${id}`, {
        nome: nome,
        matricula: matricula,
        curso: curso,
        bimestre: bimestre,
      });
      limparCampos();
      getAlunos();
    } catch (error){
      alert ("Erro ao tentar editar aluno.")
    }
  }

  useEffect(() => {
    getAlunos();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>

      <form onSubmit={id ? editAluno : addAluno}>
        <input type="text"
        placeholder="Informe seu nome"
        value={nome}
        onChange={(event) => setNome(event.target.value)} />

        <input type="text"
        placeholder="Informe sua matricula"
        value={matricula}
        onChange={(event) => setMatricula(event.target.value)} />

        <input type="text"
        placeholder="Informe seu curso"
        value={curso}
        onChange={(event) => setCurso(event.target.value)} />

        <input type="text"
        placeholder="Informe seu bimestre"
        value={bimestre}
        onChange={(event) => setBimestre(event.target.value)} />

        <input type="submit" />

      </form>

      <ul>
        {alunos.map((aluno) => (
          <li key={aluno._id}>
            <h3>{aluno.nome}</h3>
            <p> {aluno.matricula} </p>
            <p> {aluno.curso} </p>
            <p> {aluno.bimestre} </p>
            <button onClick={() => deleteAluno(aluno._id)} > Apagar </button>
            <button onClick={() => preencheCampos(aluno)}> Editar </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
