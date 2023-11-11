ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';


CREATE DATABASE IF NOT EXISTS vbooks;
USE vbooks;
CREATE TABLE IF NOT EXISTS livre (
    id INT AUTO_INCREMENT,
    titre VARCHAR(255),
    auteur VARCHAR(255),
    description TEXT,
    date INT,
    PRIMARY KEY (id)
);