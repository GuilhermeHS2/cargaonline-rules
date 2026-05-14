/* ==========================================================================
   data.js — Dados centralizados do guia
   --------------------------------------------------------------------------
   ÚNICO LUGAR para alterar a estrutura do site.
   Para adicionar uma nova seção: adicione um item em SECOES e crie a página
   em pages/ com o mesmo "arquivo".
   ========================================================================== */

window.GUIA = window.GUIA || {};

/* Informações gerais do guia (aparecem no header, rodapé, home, etc.) */
GUIA.INFO = {
    titulo: 'Guia de Regras de Negócio',
    sistema: 'CargaOnline',
    subtitulo: 'Para uso da equipe de Suporte',
    versao: '1.0',
    dataVersao: 'Maio de 2026'
};

/* Lista ordenada de seções.
   campos:
   - num     → número exibido (1, 2, 2.1...)
   - titulo  → título curto (sidebar/cards)
   - desc    → descrição usada no card da home
   - arquivo → nome do arquivo em pages/
   - grupo   → agrupamento na sidebar (opcional)
   - palavrasChave → termos extras para busca (string única, separada por espaço)
*/
GUIA.SECOES = [
    {
        num: '1', titulo: 'O que é a CargaOnline', arquivo: '01-sobre.html',
        grupo: 'Visão geral',
        desc: 'Sistema de gestão para transportadoras. Cada empresa tem espaço isolado.',
        palavrasChave: 'sistema gestão transportadora módulos isolamento'
    },
    {
        num: '2', titulo: 'Tipos de Usuário', arquivo: '02-usuarios.html',
        grupo: 'Pessoas e acesso',
        desc: '6 tipos de usuário. Cadastro, login, perfis de permissão e licenças.',
        palavrasChave: 'usuários admin master gestor motorista cpf email senha login licença perfil permissão dois fatores'
    },
    {
        num: '3', titulo: 'Grupos de Capacitação', arquivo: '03-grupos-capacitacao.html',
        grupo: 'Pessoas e acesso',
        desc: 'Organização de usuários, controle de acesso, vagas, comunidade.',
        palavrasChave: 'grupos capacitação vagas horário convite link comunidade feed moderação publicações'
    },
    {
        num: '4', titulo: 'Veículos e Frotas', arquivo: '04-veiculos-frotas.html',
        grupo: 'Operação',
        desc: 'Cadastro de cavalos e carretas, composição de Frotas e vínculos.',
        palavrasChave: 'veículos cavalo carreta placa frota motorista vínculo composição'
    },
    {
        num: '5', titulo: 'Status', arquivo: '05-status.html',
        grupo: 'Operação',
        desc: 'Disponível, Em viagem, Indisponível, Sem programação. Agendamento de status.',
        palavrasChave: 'status disponível em viagem indisponível agendamento prazo cor automação'
    },
    {
        num: '6', titulo: 'Torre de Controle', arquivo: '06-torre-controle.html',
        grupo: 'Operação',
        desc: 'Módulo central de gestão de demandas em tempo real, planejamento e GPS.',
        palavrasChave: 'torre controle demanda viagem websocket tempo real planejamento timeline gps deslocamento vazio visibilidade relatório'
    },
    {
        num: '7', titulo: 'Checklist', arquivo: '07-checklist.html',
        grupo: 'Operação',
        desc: 'Inspeção de veículos pelo aplicativo. Etapas, itens, validação e manutenção.',
        palavrasChave: 'checklist inspeção etapas itens foto assinatura unidade auto início cronograma manutenção'
    },
    {
        num: '8', titulo: 'Treinamentos e Aulas', arquivo: '08-treinamentos.html',
        grupo: 'Conteúdo',
        desc: 'Plataforma de cursos para motoristas e colaboradores. Aulas, questionários e certificados.',
        palavrasChave: 'treinamento aula vídeo questionário certificado carga horária'
    },
    {
        num: '9', titulo: 'Comunicados', arquivo: '09-comunicados.html',
        grupo: 'Conteúdo',
        desc: 'Avisos e informações enviados pelo aplicativo. Agendamento e leitura.',
        palavrasChave: 'comunicado aviso notificação data envio expiração leitura categoria'
    },
    {
        num: '10', titulo: 'Gamificação (Premiação)', arquivo: '10-gamificacao.html',
        grupo: 'Conteúdo',
        desc: 'Ranking de desempenho com pontuação, premiação e telemetria.',
        palavrasChave: 'gamificação ranking pontuação prêmio telemetria aproveitamento estrelas nota frenagem aceleração velocidade'
    },
    {
        num: '11', titulo: 'CargaSign (Atividades)', arquivo: '11-cargasign.html',
        grupo: 'Conteúdo',
        desc: 'Atividades interativas com assinatura digital e etapas em sequência.',
        palavrasChave: 'cargasign atividade etapa assinatura digital contestação prazo'
    },
    {
        num: '12', titulo: 'CargaDocs (Documentos)', arquivo: '12-cargadocs.html',
        grupo: 'Documentos',
        desc: 'Documentos pessoais e da operação. Fluxo de aprovação.',
        palavrasChave: 'cargadocs documento cnh aprovação válido recusado grupo documentação'
    },
    {
        num: '13', titulo: 'Canhotos', arquivo: '13-canhotos.html',
        grupo: 'Documentos',
        desc: 'Gestão de canhotos de entrega — solicitação ao motorista ou cadastro manual.',
        palavrasChave: 'canhoto entrega foto embarcadora histórico'
    },
    {
        num: '14', titulo: 'Oferta de Frete', arquivo: '14-oferta-frete.html',
        grupo: 'Operação',
        desc: 'Bolsa de fretes — conecta embarcadores e transportadoras.',
        palavrasChave: 'oferta frete embarcador carroceria rastreador candidatar produto peso'
    },
    {
        num: '15', titulo: 'Filiais, Unidades e Grupos', arquivo: '15-filiais.html',
        grupo: 'Organização',
        desc: 'Filiais regionais, Unidades de checklist e Grupos de Agendamento.',
        palavrasChave: 'filial unidade grupo agendamento regional departamento'
    },
    {
        num: '16', titulo: 'Campos Personalizados', arquivo: '16-campos-personalizados.html',
        grupo: 'Organização',
        desc: 'Campos extras nos cadastros: texto, número, data, sim/não.',
        palavrasChave: 'campo personalizado obrigatório texto número data'
    },
    {
        num: '17', titulo: 'Notificações', arquivo: '17-notificacoes.html',
        grupo: 'Sistema',
        desc: 'Avisos enviados ao celular do usuário quando algo importante acontece.',
        palavrasChave: 'notificação celular push aplicativo'
    },
    {
        num: '18', titulo: 'Histórico e Auditoria', arquivo: '18-historico.html',
        grupo: 'Sistema',
        desc: 'Logs do Sistema — toda ação importante fica registrada.',
        palavrasChave: 'log histórico auditoria registro arquivado exclusão login'
    },
    {
        num: '19', titulo: 'Módulos Disponíveis', arquivo: '19-modulos.html',
        grupo: 'Sistema',
        desc: 'Lista completa de módulos que podem ser ativados por transportadora.',
        palavrasChave: 'módulos ativar desativar disponíveis funcionalidades'
    }
];

/* Ordem dos grupos na sidebar (controla a ordem visual) */
GUIA.GRUPOS_ORDEM = [
    'Visão geral',
    'Pessoas e acesso',
    'Operação',
    'Conteúdo',
    'Documentos',
    'Organização',
    'Sistema'
];
