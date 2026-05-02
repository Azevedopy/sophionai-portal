// js/dados-aulas.js
const cursoData = {
    titulo: "Como lidar com clientes difíceis",
    progresso: 60,
    aulas: [
        {
            id: "aula-1",
            modulo: 1,
            titulo: "Aula 1: Introdução e Inteligência Emocional",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Exemplo Rick Roll (pode ser trocado depois)
            descricao: `<p>Nesta primeira aula do módulo avançado, abordamos a importância da inteligência emocional como alicerce para qualquer negociação e reversão de cenário crítico no suporte. Sem controle emocional, o atendente acaba refletindo a frustração do cliente, gerando um efeito bola de neve indesejado.</p>
                        <h4>O que você aprenderá neste módulo:</h4>
                        <ul>
                            <li><strong>Identificação de Gatilhos:</strong> Como reconhecer o exato momento em que o cliente perde a paciência.</li>
                            <li><strong>A pausa de ouro:</strong> A técnica dos 5 segundos antes de redigir ou falar qualquer coisa em situações de estresse.</li>
                            <li><strong>Escuta Ativa Verdadeira:</strong> Como mostrar para o cliente que o problema dele não é "só mais um ticket".</li>
                        </ul>`,
            material: [
                { tipo: 'pdf', nome: 'Resumo da Aula', tamanho: '1.2 MB', link: '#' },
                { tipo: 'audio', nome: 'Áudio da Aula', tamanho: '15 MB', link: '#' }
            ],
            status: "concluida" // concluida, atual, bloqueada
        },
        {
            id: "aula-2",
            modulo: 1,
            titulo: "Aula 2: Escuta Ativa na Prática",
            videoUrl: "videos/aula2.mp4", // Exemplo de VÍDEO LOCAL (Hospedado na própria pasta)
            descricao: `<p>Aprenda como aplicar a escuta ativa no seu dia a dia.</p>
                        <p>Muitas vezes, o cliente só quer ser ouvido. Cortar o cliente ou tentar dar a solução rápido demais pode gerar mais atrito do que resolver o problema.</p>`,
            material: [
                { tipo: 'pdf', nome: 'Checklist de Escuta', tamanho: '0.5 MB', link: '#' }
            ],
            status: "concluida"
        },
        {
            id: "aula-3",
            modulo: 1,
            titulo: "Aula 3: O Método RESET",
            videoUrl: "https://www.youtube.com/embed/1vPECGzxl08",
            descricao: `<p>O Método RESET é a estrutura principal que utilizamos para desarmar clientes enfurecidos e trazer a conversa de volta para a racionalidade.</p>
                        <p>A sigla significa:</p>
                        <ul>
                            <li><strong>R</strong>espirar</li>
                            <li><strong>E</strong>scutar</li>
                            <li><strong>S</strong>intetizar</li>
                            <li><strong>E</strong>mpatizar</li>
                            <li><strong>T</strong>ratar</li>
                        </ul>`,
            material: [],
            status: "atual"
        },
        {
            id: "aula-4",
            modulo: 2,
            titulo: "Aula 4: Lidando com Churn",
            videoUrl: "",
            descricao: `<p>Técnicas avançadas para clientes que já solicitaram o cancelamento.</p>`,
            material: [],
            status: "bloqueada"
        },
        {
            id: "aula-5",
            modulo: 2,
            titulo: "Aula 5: Reversão de NPS Detrator",
            videoUrl: "",
            descricao: `<p>Como transformar uma nota 0 em um promotor da sua marca através de um follow-up perfeito.</p>`,
            material: [],
            status: "bloqueada"
        }
    ]
};
