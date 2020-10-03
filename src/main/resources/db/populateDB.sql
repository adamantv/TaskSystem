INSERT INTO "user"(id, email, enabled, password, role, username) VALUES
(1,'admin@gmail.com', TRUE, '123','ROLE_ADMIN', 'admin'),
(2,'user1@gmail.com',TRUE,'123','ROLE_USER','user1'),
(3,'user2@gmail.com',TRUE,'123','ROLE_USER','user2'),
(4,'user3@gmail.com',TRUE,'123','ROLE_USER','user3'),
(5,'user4@gmail.com',TRUE,'123','ROLE_USER','user4'),
(6,'user5@gmail.com',TRUE,'123','ROLE_USER','user5'),
(7,'user6@gmail.com',TRUE,'123','ROLE_USER','user6');

INSERT INTO task(id, text) VALUES
(1,'Заменить аккумулятор'),
(2,'Переустановить ОС'),
(3,'Заменить видеокарту'),
(4,'Проверить на наличие вирусов');


