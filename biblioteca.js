
class Livro {
    constructor(titulo, autor) {
      this.titulo = titulo;
      this.autor = autor;
      this.disponivel = true;  // Inicialmente o livro está disponível
    }
  }
  
  
  class Usuario {
    constructor(nome, email, telefone) {
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
      this.emprestimos = []; 
    }
  
    pegarEmprestado(livro) {
      if (livro.disponivel) {
        livro.disponivel = false;
        const emprestimo = new Emprestimo(livro, this);
        this.emprestimos.push(emprestimo);
        return emprestimo;
      } else {
        console.log(`O livro "${livro.titulo}" não está disponível para empréstimo.`);
      }
    }
  }
  
  
  class Emprestimo {
    constructor(livro, usuario) {
      this.livro = livro;
      this.usuario = usuario;
      this.dataEmprestimo = new Date();
      this.dataDevolucao = new Date(this.dataEmprestimo);
      this.dataDevolucao.setDate(this.dataDevolucao.getDate() + 7); // Devolução em 7 dias
      this.devolvido = false;
      this.multa = 0;
    }
  
    calcularMulta() {
      if (this.devolvido === false && new Date() > this.dataDevolucao) {
        const diasAtraso = Math.floor((new Date() - this.dataDevolucao) / (1000 * 60 * 60 * 24));
        this.multa = diasAtraso * 1; // Multa de R$ 1,00 por dia
      }
    }
  
    devolver() {
      this.devolvido = true;
      this.calcularMulta();
      this.livro.disponivel = true;
    }
  }
  
  const livro1 = new Livro('O Hobbit', 'J.R.R. Tolkien');
  const livro2 = new Livro('1984', 'George Orwell');
  const livro3 = new Livro('harry potter e o prisioneiro de azkaban', 'J. K. Rowling');
  
 
  const usuario1 = new Usuario('Alice', 'alice@email.com', '123456789');
  const usuario2 = new Usuario('Bob', 'bob@email.com', '987654321');
  const usuario3 = new Usuario('Carlos', 'carlos@email.com', '456789123');
  
 
  const emprestimo1 = usuario1.pegarEmprestado(livro1);
  const emprestimo2 = usuario2.pegarEmprestado(livro2);
  const emprestimo3 = usuario3.pegarEmprestado(livro3);
  
  setTimeout(() => {
    emprestimo2.devolver();
    console.log(`Multa do empréstimo de ${emprestimo2.usuario.nome}: R$ ${emprestimo2.multa}`);
  }, 5000); 
  
  function exibirLivrosDisponiveis() {
    const livrosDisponiveis = [livro1, livro2, livro3].filter(livro => livro.disponivel);
    console.log('Livros Disponíveis:');
    livrosDisponiveis.forEach(livro => console.log(`${livro.titulo} de ${livro.autor}`));
  }
  
  function exibirLivrosEmprestados() {
    const livrosEmprestados = [livro1, livro2, livro3].filter(livro => !livro.disponivel);
    console.log('Livros Emprestados:');
    livrosEmprestados.forEach(livro => console.log(`${livro.titulo} de ${livro.autor}`));
  }
  
  function exibirUsuariosCadastrados() {
    console.log('Usuários Cadastrados:');
    [usuario1, usuario2, usuario3].forEach(usuario => console.log(`${usuario.nome} - ${usuario.email}`));
  }
  
  function exibirUsuariosComEmprestimos() {
    console.log('Usuários com Empréstimos:');
    [usuario1, usuario2, usuario3].forEach(usuario => {
      if (usuario.emprestimos.length > 0) {
        console.log(`${usuario.nome} - ${usuario.emprestimos.map(emprestimo => emprestimo.livro.titulo).join(', ')}`);
      }
    });
  }
  
  function exibirEmprestimosAtivos() {
    console.log('Empréstimos Ativos:');
    [emprestimo1, emprestimo2, emprestimo3].forEach(emprestimo => {
      if (!emprestimo.devolvido) {
        console.log(`${emprestimo.livro.titulo} - Emprestado para ${emprestimo.usuario.nome}`);
      }
    });
  }
  
  function exibirEmprestimosConcluidos() {
    console.log('Empréstimos Concluídos:');
    [emprestimo1, emprestimo2, emprestimo3].forEach(emprestimo => {
      if (emprestimo.devolvido) {
        console.log(`${emprestimo.livro.titulo} - Devolvido por ${emprestimo.usuario.nome}`);
      }
    });
  }
  
  function exibirEmprestimosComMulta() {
    console.log('Empréstimos com Multa:');
    [emprestimo1, emprestimo2, emprestimo3].forEach(emprestimo => {
      if (emprestimo.multa > 0) {
        console.log(`${emprestimo.livro.titulo} - Multa: R$ ${emprestimo.multa}`);
      }
    });
  }
  

  exibirLivrosDisponiveis();
  exibirLivrosEmprestados();
  exibirUsuariosCadastrados();
  exibirUsuariosComEmprestimos();
  exibirEmprestimosAtivos();
  exibirEmprestimosConcluidos();
  setTimeout(() => exibirEmprestimosComMulta(), 6000);


  //maria clara e luis emerson trabalho em conjunto //
  