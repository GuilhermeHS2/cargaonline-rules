/* ==========================================================================
   nav.js — Constrói cabeçalho e sidebar a partir de data.js
   --------------------------------------------------------------------------
   Cada página do site só precisa ter:
   <div id="app-header-mount"></div>
   <div id="app-sidebar-mount"></div>
   E declarar a constante PAGINA_ATUAL (nome do arquivo) no <head>.
   ========================================================================== */

(function () {
    'use strict';

    /* Detecta se estamos dentro de /pages/ ou na raiz para ajustar caminhos */
    function caminhoBase() {
        var caminho = window.location.pathname.replace(/\\/g, '/');
        var dentroDePages = /\/pages\//.test(caminho);
        return {
            raiz: dentroDePages ? '../' : '',
            pages: dentroDePages ? '' : 'pages/'
        };
    }

    /* --- Header --- */
    function montarHeader() {
        var mount = document.getElementById('app-header-mount');
        if (!mount) return;
        var b = caminhoBase();
        var info = window.GUIA.INFO;

        mount.outerHTML = ''
            + '<header class="app-header">'
            + '  <button class="menu-toggle" id="btn-menu" aria-label="Abrir menu">&#9776;</button>'
            + '  <a href="' + b.raiz + 'index.html" class="app-header__logo">'
            + '    <span class="app-header__logo-img" id="logo-mount">'
            + montarLogoPlaceholder(b)
            + '    </span>'
            + '    <span class="app-header__title">'
            +        info.sistema
            + '      <small>' + info.titulo + '</small>'
            + '    </span>'
            + '  </a>'
            + '  <div class="app-header__actions">'
            + '    <div class="busca">'
            + '      <span class="busca__icone" aria-hidden="true">&#128269;</span>'
            + '      <input id="busca-input" class="busca__input" type="search" placeholder="Buscar nas regras..." autocomplete="off">'
            + '      <div id="busca-resultados" class="busca-resultados" role="listbox"></div>'
            + '    </div>'
            + '    <button class="btn btn--texto-oculto-mobile" id="btn-imprimir" title="Imprimir ou salvar como PDF">'
            + '      &#128424; <span>Imprimir</span>'
            + '    </button>'
            + '  </div>'
            + '</header>';
    }

    /* Placeholder do logo: tenta carregar /assets/logo/logo.png; se não existir, mostra inicial */
    function montarLogoPlaceholder(b) {
        return '<img src="' + b.raiz + 'assets/logo/logo.png" alt="Logo" '
            + 'onerror="this.style.display=\'none\';this.parentNode.innerText=\'C\';">';
    }

    /* --- Sidebar --- */
    function montarSidebar() {
        var mount = document.getElementById('app-sidebar-mount');
        if (!mount) return;
        var b = caminhoBase();
        var paginaAtual = window.PAGINA_ATUAL || '';

        /* Agrupa seções por "grupo" */
        var grupos = {};
        window.GUIA.SECOES.forEach(function (s) {
            var g = s.grupo || 'Outros';
            if (!grupos[g]) grupos[g] = [];
            grupos[g].push(s);
        });

        var ordemGrupos = window.GUIA.GRUPOS_ORDEM.slice();
        Object.keys(grupos).forEach(function (g) {
            if (ordemGrupos.indexOf(g) === -1) ordemGrupos.push(g);
        });

        var html = '';
        ordemGrupos.forEach(function (g) {
            if (!grupos[g]) return;
            html += '<div class="app-sidebar__group">';
            html += '  <div class="app-sidebar__group-title">' + escapar(g) + '</div>';
            grupos[g].forEach(function (s) {
                var ativo = (s.arquivo === paginaAtual) ? ' is-active' : '';
                html += ''
                    + '<a class="app-sidebar__link' + ativo + '" href="' + b.pages + s.arquivo + '">'
                    + '  <span class="app-sidebar__num">' + escapar(s.num) + '</span>'
                    + '  <span>' + escapar(s.titulo) + '</span>'
                    + '</a>';
            });
            html += '</div>';
        });

        mount.outerHTML = ''
            + '<aside class="app-sidebar" id="sidebar" aria-label="Navegação principal">'
            +    html
            + '</aside>'
            + '<div class="sidebar-overlay" id="sidebar-overlay"></div>';
    }

    /* --- Navegação anterior / próximo no rodapé --- */
    function montarNavRodape() {
        var mount = document.getElementById('nav-rodape-mount');
        if (!mount) return;
        var b = caminhoBase();
        var paginaAtual = window.PAGINA_ATUAL || '';
        var secoes = window.GUIA.SECOES;
        var idx = -1;
        for (var i = 0; i < secoes.length; i++) {
            if (secoes[i].arquivo === paginaAtual) { idx = i; break; }
        }
        if (idx === -1) { mount.outerHTML = ''; return; }

        var anterior = idx > 0 ? secoes[idx - 1] : null;
        var proximo  = idx < secoes.length - 1 ? secoes[idx + 1] : null;

        var html = '<nav class="nav-rodape" aria-label="Navegação entre seções">';
        if (anterior) {
            html += ''
                + '<a href="' + b.pages + anterior.arquivo + '">'
                + '  <span>&larr; Anterior</span>'
                + '  <strong>' + escapar(anterior.num) + '. ' + escapar(anterior.titulo) + '</strong>'
                + '</a>';
        } else {
            html += '<a href="' + b.raiz + 'index.html"><span>&larr;</span><strong>Voltar ao início</strong></a>';
        }
        if (proximo) {
            html += ''
                + '<a class="is-prox" href="' + b.pages + proximo.arquivo + '">'
                + '  <span>Próximo &rarr;</span>'
                + '  <strong>' + escapar(proximo.num) + '. ' + escapar(proximo.titulo) + '</strong>'
                + '</a>';
        }
        html += '</nav>';
        mount.outerHTML = html;
    }

    /* --- Rodapé padrão --- */
    function montarFooter() {
        var mount = document.getElementById('app-footer-mount');
        if (!mount) return;
        var info = window.GUIA.INFO;
        mount.outerHTML = ''
            + '<footer class="app-footer">'
            + '  ' + escapar(info.sistema) + ' &mdash; ' + escapar(info.titulo)
            + '  &mdash; Versão ' + escapar(info.versao) + ' &middot; ' + escapar(info.dataVersao)
            + '</footer>';
    }

    /* Utilitário simples para escapar HTML */
    function escapar(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /* Inicialização */
    function init() {
        montarHeader();
        montarSidebar();
        montarNavRodape();
        montarFooter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
