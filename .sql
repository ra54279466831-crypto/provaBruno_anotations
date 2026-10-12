CREATE DATABASE anotations;
use anotations;

show tables;

drop table anotation;
drop table clientes;

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    foto_perfil VARCHAR(255),
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(254) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL UNIQUE,
    data_nasc DATE NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    pin VARCHAR(255) NOT NULL
);

CREATE TABLE anotation (
    id_anotation INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    mensagem VARCHAR(1000) NOT NULL,
    favorita BOOLEAN DEFAULT FALSE,
    categoria ENUM(
        'padrão',
        'importante',
        'pessoal',
        'secreto'
    ) NOT NULL,
    cor VARCHAR(7) not null,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
);

select * from clientes;