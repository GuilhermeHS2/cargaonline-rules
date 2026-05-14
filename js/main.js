/* ==========================================================================
   main.js — Comportamentos comuns (menu mobile, botão imprimir, etc.)
   ========================================================================== */

(function () {
    'use strict';

    function init() {
        ligarMenuMobile();
        ligarBotaoImprimir();
        rolarAoTopo();
        ligarLoaderNavegacao();
        marcarPaginaPronta();
    }

    /* --- Loader: esconde quando o conteúdo está montado --- */
    function marcarPaginaPronta() {
        /* Pequeno atraso para garantir que nav.js já trocou os elementos.
           Usamos requestAnimationFrame para sincronizar com o paint do browser. */
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                document.body.classList.add('is-ready');
            });
        });
    }

    /* --- Loader: aparece de novo antes de trocar de página --- */
    function ligarLoaderNavegacao() {
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href]');
            if (!link) return;
            var href = link.getAttribute('href');
            if (!href) return;

            /* Ignora: âncoras (#), links externos, mailto, tel, nova aba, com Ctrl/Meta */
            if (href.charAt(0) === '#') return;
            if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) return;
            if (link.target === '_blank') return;
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;

            /* Mostra o loader; o navegador continua a navegação normalmente */
            document.body.classList.remove('is-ready');
        });

        /* Caso o usuário use os botões "voltar/avançar" do navegador */
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                /* Veio do cache (bfcache) — força o loader a sumir */
                document.body.classList.add('is-ready');
            }
        });
    }

    /* --- Menu mobile (sidebar abrir/fechar) --- */
    function ligarMenuMobile() {
        var btn = document.getElementById('btn-menu');
        var sidebar = document.getElementById('sidebar');
        var overlay = document.getElementById('sidebar-overlay');
        if (!btn || !sidebar) return;

        function fechar() {
            sidebar.classList.remove('is-aberto');
            if (overlay) overlay.classList.remove('is-aberto');
        }
        function abrir() {
            sidebar.classList.add('is-aberto');
            if (overlay) overlay.classList.add('is-aberto');
        }
        function alternar() {
            if (sidebar.classList.contains('is-aberto')) fechar(); else abrir();
        }

        btn.addEventListener('click', alternar);
        if (overlay) overlay.addEventListener('click', fechar);

        /* Fecha ao clicar em qualquer link da sidebar */
        sidebar.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', fechar);
        });

        /* Fecha ao redimensionar para desktop */
        window.addEventListener('resize', function () {
            if (window.innerWidth > 960) fechar();
        });
    }

    /* --- Botão Imprimir --- */
    function ligarBotaoImprimir() {
        var btn = document.getElementById('btn-imprimir');
        if (!btn) return;
        btn.addEventListener('click', function () {
            window.print();
        });
    }

    /* --- Rolar suavemente para âncoras (links #algo) --- */
    function rolarAoTopo() {
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href^="#"]');
            if (!link) return;
            var alvo = document.querySelector(link.getAttribute('href'));
            if (alvo) {
                e.preventDefault();
                alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    /* Inicializa depois que nav.js montou o DOM */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
    } else {
        setTimeout(init, 0);
    }
})();
