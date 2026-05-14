/* ==========================================================================
   search.js — Busca interna nas seções do guia
   --------------------------------------------------------------------------
   Indexa título + descrição + palavras-chave (definidos em data.js)
   e mostra resultados em tempo real.
   ========================================================================== */

(function () {
    'use strict';

    function caminhoBase() {
        var dentroDePages = /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));
        return dentroDePages ? '' : 'pages/';
    }

    /* Normaliza texto: minúsculas + remove acentos */
    function normalizar(s) {
        return String(s || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '');
    }

    /* Destaca termos dentro de um texto, devolvendo HTML seguro */
    function destacar(texto, termos) {
        var resultado = escapar(texto);
        termos.forEach(function (t) {
            if (!t) return;
            var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            resultado = resultado.replace(re, '<mark>$1</mark>');
        });
        return resultado;
    }

    function escapar(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /* Pontua um item: + por título, + por descrição, + por palavra-chave */
    function pontuar(secao, termos) {
        var titulo = normalizar(secao.titulo);
        var desc = normalizar(secao.desc);
        var chaves = normalizar(secao.palavrasChave || '');
        var num = normalizar(secao.num);
        var score = 0;
        var todosCasaram = true;

        termos.forEach(function (t) {
            var encontrou = false;
            if (titulo.indexOf(t) !== -1) { score += 10; encontrou = true; }
            if (num === t)                { score += 8;  encontrou = true; }
            if (desc.indexOf(t) !== -1)   { score += 4;  encontrou = true; }
            if (chaves.indexOf(t) !== -1) { score += 3;  encontrou = true; }
            if (!encontrou) todosCasaram = false;
        });

        return todosCasaram ? score : 0;
    }

    function buscar(consulta) {
        consulta = normalizar(consulta).trim();
        if (!consulta) return [];

        var termos = consulta.split(/\s+/).filter(Boolean);
        var resultados = [];

        window.GUIA.SECOES.forEach(function (s) {
            var p = pontuar(s, termos);
            if (p > 0) resultados.push({ secao: s, score: p });
        });

        resultados.sort(function (a, b) { return b.score - a.score; });
        return resultados.slice(0, 8);
    }

    function renderizarResultados(consulta) {
        var caixa = document.getElementById('busca-resultados');
        if (!caixa) return;

        if (!consulta.trim()) {
            caixa.classList.remove('is-aberto');
            caixa.innerHTML = '';
            return;
        }

        var resultados = buscar(consulta);
        var termos = normalizar(consulta).split(/\s+/).filter(Boolean);
        var base = caminhoBase();

        if (resultados.length === 0) {
            caixa.innerHTML = '<div class="busca-resultados__vazio">Nenhuma regra encontrada para "' + escapar(consulta) + '"</div>';
        } else {
            caixa.innerHTML = resultados.map(function (r) {
                var s = r.secao;
                return ''
                    + '<a class="busca-resultados__item" href="' + base + s.arquivo + '">'
                    + '  <div class="busca-resultados__item-titulo">'
                    +    destacar(s.num + '. ' + s.titulo, termos)
                    + '  </div>'
                    + '  <div class="busca-resultados__item-trecho">'
                    +    destacar(s.desc, termos)
                    + '  </div>'
                    + '</a>';
            }).join('');
        }

        caixa.classList.add('is-aberto');
    }

    function init() {
        var input = document.getElementById('busca-input');
        var caixa = document.getElementById('busca-resultados');
        if (!input || !caixa) return;

        var timer = null;
        input.addEventListener('input', function () {
            clearTimeout(timer);
            timer = setTimeout(function () { renderizarResultados(input.value); }, 100);
        });

        input.addEventListener('focus', function () {
            if (input.value.trim()) renderizarResultados(input.value);
        });

        /* Fechar ao clicar fora */
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.busca')) {
                caixa.classList.remove('is-aberto');
            }
        });

        /* Tecla ESC limpa a busca */
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                input.value = '';
                caixa.classList.remove('is-aberto');
                input.blur();
            }
        });
    }

    /* O input só existe depois que o nav.js montar o header.
       nav.js é carregado antes; init aqui aguarda DOM pronto. */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            /* Pequena espera para garantir que o header foi montado */
            setTimeout(init, 0);
        });
    } else {
        setTimeout(init, 0);
    }
})();
