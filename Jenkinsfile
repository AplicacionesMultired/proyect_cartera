pipeline {
    agent any
    
    tools {
        nodejs 'node-v22' // Asegúrate de que el nombre coincide con la configuración en Jenkins
    }

    environment {
        ENV_API = credentials('ENV_API_CARTERA')
        ENV_CLIENT_CARTERA = credentials('ENV_CLIENT_CARTERA')
    }
    
    stages {
        stage('delete workspace') {
            steps {
                dir('proyect_cartera') {
                    deleteDir()
                }
            }
        }
        stage('clone repository') {
            steps {
                script {
                    sh 'git clone https://github.com/AplicacionesMultired/proyect_cartera.git'
                }
            }
        }
        stage('install dependencies') {
            steps {
                script {
                    sh 'cd ./proyect_cartera/client && yarn'
                    sh 'cd ./proyect_cartera/api && yarn'
                }
            }
        }
        stage('copy env') {
            steps {
                script {
                    // Escribir el contenido de las credenciales en los archivos .env
                    writeFile file: './proyect_cartera/api/.env', text: "${ENV_API}"
                    writeFile file: './proyect_cartera/client/.env', text: "${ENV_CLIENT_CARTERA}"
                }
            }
        }
        stage('build client') {
            steps {
                script {
                    sh 'cd ./proyect_cartera/client && yarn build'
                    sh 'cd ./proyect_cartera/api && yarn build'
                }
            }
        }
        stage('down docker compose'){
            steps {
                script {
                    sh 'docker-compose -f ./proyect_cartera/docker-compose.yaml down'
                }
            }
        }
        stage('run docker compose'){
            steps {
                script {
                    sh 'docker-compose -f ./proyect_cartera/docker-compose.yaml up -d'
                }
            }
        }
        stage('copy dist to server'){
            steps {
                script {
                    sh 'sudo cp -r ./proyect_cartera/client/dist/* /home/containers/Nginx/html/cartera'
                }
          }
        }
        stage('reset container nginx'){
            steps {
                script {
                    sh 'sudo docker restart nginx_proxy'
                }
            }
        }
    }
}