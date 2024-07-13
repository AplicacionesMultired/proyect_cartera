
+-------------+---------------+------+-----+---------+-------+
| Field       | Type          | Null | Key | Default | Extra |
+-------------+---------------+------+-----+---------+-------+
| FECHA       | date          | NO   | PRI | NULL    |       |
| RECAUDADOR  | varchar(10)   | NO   | PRI | NULL    |       |
| ID_RECAUDO  | varchar(20)   | NO   | PRI | NULL    |       |
| CAJADNO     | varchar(10)   | NO   |     | NULL    |       |
| VINCULADO   | varchar(20)   | NO   |     | NULL    |       |
| VALOR       | int           | YES  |     | 0       |       |
| ESTADO      | varchar(5)    | NO   |     | NULL    |       |
| RESPALDO    | varchar(30)   | YES  |     | NULL    |       |
| HORASYNC    | time          | YES  |     | NULL    |       |
| HORAMOVI    | time          | YES  |     | NULL    |       |
| USR_CONTEO  | varchar(15)   | YES  |     | NULL    |       |
| HORA_CONTEO | time          | YES  |     | NULL    |       |
| NOTA_CONTEO | varchar(1000) | YES  |     | NULL    |       |
| VERSION     | varchar(20)   | YES  |     | NULL    |       |
| EMPRESA     | varchar(10)   | YES  |     | NULL    |       |
+-------------+---------------+------+-----+---------+-------+

SELECT FECHA,ESTADO, SUM(VALOR) VALOR, COUNT(1) CANT
FROM DETALLERECAUDO WHERE FECHA=CURDATE() GROUP BY FECHA,ESTADO;
