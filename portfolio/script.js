document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // DADOS (ADICIONE MAIS ITENS PARA TESTAR O "VER MAIS")
    // =================================================================
    const meusProjetos = [
        {
            imagem: 'assets/images/projeto1.jpg',
            titulo: 'Projeto 1: Site Institucional',
            descricao: 'Descrição curta. Destaque as tecnologias e o propósito.',
            descricaoDetalhada: 'Aqui você coloca uma descrição muito mais completa sobre o projeto 1. Fale sobre os desafios, o processo de desenvolvimento, as tecnologias usadas (React, Node.js, etc.) e o que você aprendeu.',
            linkExterno: '#'
        },
        {
            imagem: 'assets/images/projeto2.jpg',
            titulo: 'Projeto 2: App de Tarefas',
            descricao: 'Outro projeto focado em responsividade e UX.',
            descricaoDetalhada: 'Descrição longa e detalhada do projeto 2. Explique a arquitetura, as decisões de design e como ele resolve um problema real.',
            linkExterno: '#'
        },
        {
            imagem: 'assets/images/projeto3.jpg',
            titulo: 'Projeto 3: Landing Page',
            descricao: 'Uma landing page moderna com animações e foco em conversão.',
            descricaoDetalhada: 'Descrição longa e detalhada do projeto 3. Dê todos os detalhes que um recrutador gostaria de saber.',
            linkExterno: '#'
        },
        {
            imagem: 'assets/images/projeto4.jpg',
            titulo: 'Projeto 4: Portfólio Antigo',
            descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.',
            descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.',
            linkExterno: '#'
        },
        {
            imagem: 'assets/images/projeto4.jpg',
            titulo: 'Projeto 4: Portfólio Antigo',
            descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.',
            descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.',
            linkExterno: '#'
        },
        {
            imagem: 'assets/images/projeto4.jpg',
            titulo: 'Projeto 4: Portfólio Antigo',
            descricao: 'Versão anterior do meu portfólio, desenvolvida com outras técnicas.',
            descricaoDetalhada: 'Descrição longa e detalhada do projeto 4. Mostre a sua evolução como desenvolvedor.',
            linkExterno: '#'
        }
    ];

    const meusLivros = [
        {
            imagem: 'assets/images/livro1.png',
            titulo: 'Entendo algoritmos',
            autor: '-Aditya Y. Bhargava',
            descricao: 'Um livro fantástico para criar uma base sólida sobre algoritmos e lógica.',
            descricaoDetalhada: 'O livro ajudou...'
        },
        {
            imagem: 'assets/images/livro2.png',
            titulo: 'Python para análise de dados',
            autor: '-Wes McKinney',
            descricao: 'Aprenda a utilizar python para criar análises de dados importantes',
            descricaoDetalhada: 'Detalhes sobre "CSS Secrets". Comente sobre as técnicas avançadas que você aprendeu com o livro e como aplica esses conceitos nos seus projetos para criar interfaces mais robustas e criativas.'
        },
        {
            imagem: 'assets/images/livro3.jpg',
            titulo: 'Não Me Faça Pensar',
            autor: '-Aditya Y. Bhargava',
            descricao: 'Um clássico sobre usabilidade e experiência do usuário na web.',
            descricaoDetalhada: 'Uma análise do livro "Não Me Faça Pensar" de Steve Krug, e como os princípios de usabilidade que ele ensina são aplicados no seu trabalho diário.'
        },
        {
            imagem: 'assets/images/livro3.jpg',
            titulo: 'Não Me Faça Pensar',
            autor: '-Aditya Y. Bhargava',
            descricao: 'Um clássico sobre usabilidade e experiência do usuário na web.',
            descricaoDetalhada: 'Uma análise do livro "Não Me Faça Pensar" de Steve Krug, e como os princípios de usabilidade que ele ensina são aplicados no seu trabalho diário.'
        },
        {
            imagem: 'assets/images/livro3.jpg',
            titulo: 'Não Me Faça Pensar',
            autor: '-Aditya Y. Bhargava',
            descricao: 'Um clássico sobre usabilidade e experiência do usuário na web.',
            descricaoDetalhada: 'Uma análise do livro "Não Me Faça Pensar" de Steve Krug, e como os princípios de usabilidade que ele ensina são aplicados no seu trabalho diário.'
        },
        {
            imagem: 'assets/images/livro3.jpg',
            titulo: 'Não Me Faça Pensar',
            autor: '-Aditya Y. Bhargava',
            descricao: 'Um clássico sobre usabilidade e experiência do usuário na web.',
            descricaoDetalhada: 'Uma análise do livro "Não Me Faça Pensar" de Steve Krug, e como os princípios de usabilidade que ele ensina são aplicados no seu trabalho diário.'
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
                <p>${item.autor}</p>
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
            container.innerHTML = ''; // Limpa o container antes de renderizar
            
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

        // Renderização inicial
        renderizarItens();
    }

    // Altere o '2' para o número de itens que você quer mostrar inicialmente
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
        if (event.target === modalOverlay) {
            fecharModal();
        }
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
    
    sections.forEach(section => {
        observer.observe(section);
    });

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
            if (this.mobileMenu) {
                this.addClickEvent();
            }
            return this;
        }
    }

    const mobileNavbar = new MobileNavbar(
        ".mobile-menu",
        ".nav-list",
        ".nav-list li a"
    );
    mobileNavbar.init();
});