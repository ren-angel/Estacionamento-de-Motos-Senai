CREATE TABLE IF NOT EXISTS tbl_usuarios (
	usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    SN VARCHAR(10) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_alunos (
	aluno_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    turma VARCHAR(20) NOT NULL,
    placa CHAR(7) UNIQUE NOT NULL,
    status_pagamento BOOLEAN DEFAULT(TRUE) NOT NULL,
    dia_pago_aluno DATE NOT NULL,
    limite_estacionamento DATE NOT NULL,
    termino_curso DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_pagamentos (
	pagamento_id INT PRIMARY KEY AUTO_INCREMENT,
    valor DECIMAL(6,2) NOT NULL,
	dia_pago_pagamento DATE NOT NULL
);