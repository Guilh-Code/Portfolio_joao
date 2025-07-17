document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // DADOS (ATUALIZE COM SEU CONTEÚDO)
    // =================================================================
    const meusProjetos = [
        {
            imagem: 'assets/images/projeto1.jpg',
            titulo: 'Nome do Projeto 1',
            descricao: 'Descrição curta. Destaque as tecnologias e o propósito.',
            descricaoDetalhada: 'Aqui você coloca uma descrição muito mais completa sobre o projeto 1. Fale sobre os desafios, o processo de desenvolvimento, as tecnologias usadas (React, Node.js, etc.) e o que você aprendeu.',
            linkExterno: 'https://github.com/seu-usuario/seu-projeto'
        },
        {
            imagem: 'assets/images/projeto2.jpg',
            titulo: 'Nome do Projeto 2',
            descricao: 'Outro projeto focado em responsividade e UX.',
            descricaoDetalhada: 'Descrição longa e detalhada do projeto 2. Explique a arquitetura, as decisões de design e como ele resolve um problema real.',
            linkExterno: '#'
        }
    ];

    const meusLivros = [
        {
            imagem: 'assets/images/livro1.jpg',
            titulo: 'Eloquent JavaScript',
            descricao: 'Um livro fantástico para aprofundar os conhecimentos em JavaScript.',
            descricaoDetalhada: 'Uma análise mais profunda sobre o livro "Eloquent JavaScript". Explique por que você o recomenda, quais capítulos foram mais impactantes e como ele ajudou no seu desenvolvimento profissional.'
        },
        {
            imagem: 'assets/images/livro2.jpg',
            titulo: 'CSS Secrets',
            descricao: 'Soluções elegantes para problemas comuns de CSS.',
            descricaoDetalhada: 'Detalhes sobre "CSS Secrets". Comente sobre as técnicas avançadas que você aprendeu com o livro e como aplica esses conceitos nos seus projetos.'
        }
    ];

    // =================================================================
    // FUNÇÃO PARA CRIAR CARDS
    // =================================================================
    function criarCard(item, index, tipo) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-image"><img src="${item.imagem}" alt="Imagem de ${item.titulo}"></div>
            <div class="card-content">
                <h3>${item.titulo}</h3>
                <p>${item.descricao}</p>
                <button class="btn btn-modal" data-tipo="${tipo}" data-index="${index}">Mais Informações</button>
            </div>
        `;
        return card;
    }

    // =================================================================
    // LÓGICA "VER MAIS" / "MOSTRAR MENOS"
    // =================================================================
    function inicializarCarregamentoDeConteudo(containerId, data, btnId, itemsIniciais, tipo) {
        const container = document.getElementById(containerId);
        const botao = document.getElementById(btnId);
        let exibindoTodos = false;

        function renderizarItens() {
            container.innerHTML = '';
            const itensParaExibir = exibindoTodos ? data : data.slice(0, itemsIniciais);
            itensParaExibir.forEach((item, index) => {
                const itemIndexOriginal = data.indexOf(item);
                container.appendChild(criarCard(item, itemIndexOriginal, tipo));
            });
            if (data.length <= itemsIniciais) {
                botao.style.display = 'none';
            } else {
                botao.style.display = 'inline-block';
                botao.textContent = exibindoTodos ? 'Mostrar Menos' : 'Ver Mais';
            }
        }
        botao.addEventListener('click', () => {
            exibindoTodos = !exibindoTodos;
            renderizarItens();
        });
        renderizarItens();
    }

    inicializarCarregamentoDeConteudo('projetos-container', meusProjetos, 'ver-mais-projetos', 2, 'projeto');
    inicializarCarregamentoDeConteudo('livros-container', meusLivros, 'ver-mais-livros', 2, 'livro');

    // =================================================================
    // LÓGICA DO MODAL
    // =================================================================
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close');

    function abrirModal(tipo, index) {
        const data = tipo === 'projeto' ? meusProjetos : meusLivros;
        const item = data[index];
        if (!item) return;
        modalBody.innerHTML = `
            <img src="${item.imagem}" alt="Imagem de ${item.titulo}">
            <h3>${item.titulo}</h3>
            <p>${item.descricaoDetalhada}</p>
            ${tipo === 'projeto' && item.linkExterno ? `<a href="${item.linkExterno}" target="_blank" class="btn">Ver Projeto Online</a>` : ''}
        `;
        modalOverlay.classList.add('modal-visible');
    }

    function fecharModal() {
        modalOverlay.classList.remove('modal-visible');
    }

    document.addEventListener('click', (event) => {
        if (event.target.matches('.btn-modal')) {
            const tipo = event.target.dataset.tipo;
            const index = parseInt(event.target.dataset.index, 10);
            abrirModal(tipo, index);
        }
    });
    modalCloseBtn.addEventListener('click', fecharModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) fecharModal();
    });

    // =================================================================
    // ANIMAÇÃO DE SCROLL (REVELAR SEÇÕES)
    // =================================================================
    const sections = document.querySelectorAll('.section-hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));

    // =================================================================
    // LÓGICA DO MENU MOBILE
    // =================================================================
    class MobileNavbar {
        constructor(mobileMenu, navList, navLinks) {
            this.mobileMenu = document.querySelector(mobileMenu);
            this.navList = document.querySelector(navList);
            this.navLinks = document.querySelectorAll(navLinks);
            this.activeClass = "active";
            this.handleClick = this.handleClick.bind(this);
        }
        handleClick() {
            this.navList.classList.toggle(this.activeClass);
            this.mobileMenu.classList.toggle(this.activeClass);
            document.body.classList.toggle('nav-open');
        }
        addClickEvent() {
            this.mobileMenu.addEventListener("click", this.handleClick);
            this.navLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    if (this.navList.classList.contains(this.activeClass)) {
                        this.handleClick();
                    }
                });
            });
        }
        init() {
            if (this.mobileMenu) this.addClickEvent();
            return this;
        }
    }
    const mobileNavbar = new MobileNavbar(".mobile-menu", ".nav-list", ".nav-list li a");
    mobileNavbar.init();
});